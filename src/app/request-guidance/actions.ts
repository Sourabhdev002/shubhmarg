"use server";

import { supabaseServer } from "@/lib/supabase";
import { GuidanceFormData } from "@/types/guidance";
import { getServicePrice } from "@/lib/pricing";

// Very basic server-side rate limiting/duplicate prevention logic
// In a real production app, this would use Redis or similar.
const recentSubmissions = new Set<string>();

const CONCERNS = [
  "Career / Job",
  "Business",
  "Marriage / Relationship",
  "Family",
  "Education",
  "Finance",
  "Property",
  "General Guidance",
  "Spiritual Guidance",
  "Other",
];

const SERVICES = [
  "vedic-guidance",
  "career-business",
  "marriage",
  "kundli",
  "muhurat",
  "remedy",
  "jaap",
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
    if (!formData.dateOfBirth || isNaN(Date.parse(formData.dateOfBirth))) {
      return { success: false, error: "A valid date of birth is required." };
    }
    if (formData.timeOfBirth && !/^([01]\d|2[0-3]):([0-5]\d)$/.test(formData.timeOfBirth)) {
      return { success: false, error: "Time of birth must be in valid HH:MM format if provided." };
    }
    if (!formData.birthPlace || formData.birthPlace.trim().length < 2) {
      return { success: false, error: "Birth place is required." };
    }
    if (!formData.currentCity || formData.currentCity.trim().length < 2) {
      return { success: false, error: "Current city is required." };
    }
    if (!formData.preferredLanguage) {
      return { success: false, error: "Preferred language is required." };
    }
    if (!formData.question || formData.question.trim().length < 10) {
      return { success: false, error: "Please provide a question (minimum 10 characters)." };
    }
    if (formData.question.length > 2000) {
      return { success: false, error: "Question is too long (maximum 2000 characters)." };
    }
    if (!CONCERNS.includes(formData.concern)) {
      return { success: false, error: "Invalid area of concern selected." };
    }
    if (!SERVICES.includes(formData.service)) {
      return { success: false, error: "Invalid service selected." };
    }

    // 3. Generate Reference ID
    // Format: SHUBH-XXXXXX
    const randomChars = Math.random().toString(36).substring(2, 8).toUpperCase();
    const referenceId = `SHUBH-${randomChars}`;

    // 4. Calculate pricing
    const paymentAmount = getServicePrice(formData.service);

    // 5. Insert into Supabase
    const { error: dbError } = await supabaseServer
      .from('guidance_requests')
      .insert([
        {
          reference_id: referenceId,
          concern: formData.concern,
          full_name: formData.fullName.trim(),
          date_of_birth: formData.dateOfBirth,
          time_of_birth: formData.timeOfBirth || null,
          birth_place: formData.birthPlace.trim(),
          current_city: formData.currentCity.trim(),
          preferred_language: formData.preferredLanguage,
          question: formData.question.trim(),
          service: formData.service,
          payment_amount: paymentAmount,
        }
      ]);

    if (dbError) {
      // Intentionally not exposing the exact DB error string to the client for security
      return { success: false, error: "We encountered an error saving your request. Please try again later." };
    }

    // 5. Mark as recently submitted to prevent instant double clicks
    recentSubmissions.add(dedupeKey);
    setTimeout(() => {
      recentSubmissions.delete(dedupeKey);
    }, 60000); // 1 minute cooldown

    return { success: true, referenceId };
  } catch {
    return { success: false, error: "An unexpected server error occurred. Please try again." };
  }
}
