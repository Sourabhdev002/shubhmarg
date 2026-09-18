"use server";

import { supabaseServer } from "@/lib/supabase";
import { GuidanceFormData } from "@/types/guidance";
import { getServicePrice } from "@/lib/pricing";
import { allocateUniquePaiseAmount } from "@/lib/paise-allocation";

// Very basic server-side rate limiting/duplicate prevention logic
// In a real production app, this would use Redis or similar.
const recentSubmissions = new Set<string>();

const SERVICES = [
  "vedic-guidance",
  "career-business",
  "marriage",
  "kundli",
  "muhurat",
  "remedy",
  "jaap",
  "quick-answer",
  "emergency",
  "baby-name",
  "compatibility",
  "free-reading",
  "temple-puja",
  "puja",
  "tatkal-express",
  "express",
  "voice-dossier",
  "voice",
  "annual-varshphal",
  "varshphal",
  "energized-gemstone",
  "gemstone",
  "business-retainer",
  "business",
];

export async function submitGuidanceRequest(formData: GuidanceFormData) {
  try {
    // 1. Basic duplicate prevention
    const dedupeKey = `${formData.fullName}-${formData.dateOfBirth}-${formData.question.substring(0, 20)}`;
    if (recentSubmissions.has(dedupeKey)) {
      return { success: false, error: "It looks like you just submitted this request. Please wait a moment." };
    }
    
    // 2. Server-Side Validation
    if (!formData.fullName || formData.fullName.trim().length < 2) {
      return { success: false, error: "Full name is required and must be valid." };
    }
    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      return { success: false, error: "A valid email address is required." };
    }
    if (!formData.dateOfBirth || isNaN(Date.parse(formData.dateOfBirth))) {
      return { success: false, error: "A valid date of birth is required." };
    }
    if (formData.timeOfBirth && !/^([01]\d|2[0-3]):([0-5]\d)$/.test(formData.timeOfBirth)) {
      return { success: false, error: "Time of birth must be in valid HH:MM format if provided." };
    }
    if (!formData.birthPlace || formData.birthPlace.trim().length < 2) {
      return { success: false, error: "Birth place is required." };
    }
    // currentCity and preferredLanguage are optional in new single-page form
    // They default to birthPlace and "Hindi" respectively
    if (!formData.question || formData.question.trim().length < 10) {
      return { success: false, error: "Please provide a question (minimum 10 characters)." };
    }
    if (formData.question.length > 2000) {
      return { success: false, error: "Question is too long (maximum 2000 characters)." };
    }
    // Concern is optional in new single-page form
    // if (!CONCERNS.includes(formData.concern)) {
    //   return { success: false, error: "Invalid area of concern selected." };
    // }
    if (!SERVICES.includes(formData.service)) {
      return { success: false, error: "Invalid service selected." };
    }
    // Privacy consent is implied by form submission in new design

    // 3. Generate Reference ID
    // Format: SHUBH-XXXXXX
    const randomChars = Math.random().toString(36).substring(2, 8).toUpperCase();
    const referenceId = `SHUBH-${randomChars}`;

    // 4. Calculate pricing with unique-paise fingerprint for auto-verification
    const paymentAmount = await allocateUniquePaiseAmount(getServicePrice(formData.service));

    // 5. Insert into Supabase
    const { error: dbError } = await supabaseServer
      .from('guidance_requests')
      .insert([
        {
          reference_id: referenceId,
          concern: formData.concern,
          full_name: formData.fullName.trim(),
          email: formData.email.trim(),
          date_of_birth: formData.dateOfBirth,
          time_of_birth: formData.timeOfBirth || null,
          birth_place: formData.birthPlace.trim(),
          current_city: formData.currentCity.trim(),
          preferred_language: formData.preferredLanguage,
          question: formData.question.trim(),
          service: formData.service,
          payment_amount: paymentAmount,
          privacy_consent: true,
          privacy_consent_at: new Date().toISOString(),
        }
      ]);

    if (dbError) {
      // Intentionally not exposing the exact DB error string to the client for security
      return { success: false, error: "We encountered an error saving your request. Please try again later." };
    }

    // 6. Mark as recently submitted to prevent instant double clicks
    recentSubmissions.add(dedupeKey);
    setTimeout(() => {
      recentSubmissions.delete(dedupeKey);
    }, 60000); // 1 minute cooldown

    // 7. Send email confirmation via Supabase (best-effort, non-blocking)
    try {
      await supabaseServer.functions.invoke('send-confirmation-email', {
        body: {
          to: formData.email.trim(),
          name: formData.fullName.trim(),
          referenceId,
          service: formData.service,
          paymentAmount,
          paymentUrl: `https://shubhmarg.com/payment/${referenceId}`,
        },
      }).catch(() => {}); // Silent fail — email is best-effort
    } catch {
      // Never block submission on email failure
    }

    return { success: true, referenceId };
  } catch {
    return { success: false, error: "An unexpected server error occurred. Please try again." };
  }
}
