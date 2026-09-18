"use server";

import { supabaseServer } from "@/lib/supabase";
import { SupportFormData } from "@/types/support";

const recentSupportSubmissions = new Set<string>();

export async function submitSupportRequest(formData: SupportFormData) {
  try {
    // 1. Basic duplicate prevention
    const dedupeKey = `${formData.email}-${formData.message.substring(0, 20)}`;
    if (recentSupportSubmissions.has(dedupeKey)) {
      return { success: false, error: "It looks like you just submitted this request. Please wait a moment." };
    }

    // 2. Server-Side Validation
    const fullName = formData.fullName?.trim() || "";
    const email = formData.email?.trim() || "";
    const message = formData.message?.trim() || "";
    const referenceId = formData.referenceId?.trim() || null;

    if (!fullName || fullName.length < 2) {
      return { success: false, error: "Full name is required and must be valid." };
    }
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return { success: false, error: "A valid email address is required." };
    }
    if (!message || message.length < 10) {
      return { success: false, error: "Please provide a detailed message (minimum 10 characters)." };
    }
    if (message.length > 2000) {
      return { success: false, error: "Message is too long (maximum 2000 characters)." };
    }

    // 3. Insert into Supabase
    const { error: dbError } = await supabaseServer
      .from("support_requests")
      .insert([
        {
          full_name: fullName,
          email,
          reference_id: referenceId,
          message,
          status: "open",
        },
      ]);

    if (dbError) {
      return { success: false, error: "We encountered an error saving your request. Please try again later." };
    }

    // 4. Mark as recently submitted
    recentSupportSubmissions.add(dedupeKey);
    setTimeout(() => {
      recentSupportSubmissions.delete(dedupeKey);
    }, 60000); // 1 minute cooldown

    return { success: true };
  } catch {
    return { success: false, error: "An unexpected server error occurred. Please try again." };
  }
}
