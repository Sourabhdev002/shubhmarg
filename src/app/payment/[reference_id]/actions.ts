"use server";

import { supabaseServer } from "@/lib/supabase";

export async function getPaymentRequestByReference(referenceId: string) {
  try {
    const { data, error } = await supabaseServer
      .from("guidance_requests")
      .select("id, reference_id, service, payment_status, payment_amount, payment_currency, full_name")
      .eq("reference_id", referenceId)
      .single();

    if (error || !data) {
      return { success: false, error: "Request not found." };
    }

    return { success: true, request: data };
  } catch {
    return { success: false, error: "An unexpected error occurred." };
  }
}

export async function submitPaymentUtr(referenceId: string, utr: string) {
  try {
    // Basic validation
    const trimmedUtr = utr.trim();
    if (trimmedUtr.length < 8 || trimmedUtr.length > 20) {
      return { success: false, error: "Please enter a valid UTR or Transaction Reference number." };
    }

    // Check existing status
    const { data: request, error: fetchError } = await supabaseServer
      .from("guidance_requests")
      .select("id, payment_status")
      .eq("reference_id", referenceId)
      .single();

    if (fetchError || !request) {
      return { success: false, error: "Request not found." };
    }

    if (request.payment_status === "paid") {
      return { success: false, error: "This request has already been paid and verified." };
    }

    // Check if UTR is already used by someone else
    const { data: existingUtr } = await supabaseServer
      .from("guidance_requests")
      .select("id")
      .eq("payment_utr", trimmedUtr)
      .single();

    if (existingUtr && existingUtr.id !== request.id) {
       return { success: false, error: "This UTR has already been submitted for another request." };
    }

    // Update status to payment_verification
    const { data: updateData, error: updateError } = await supabaseServer
      .from("guidance_requests")
      .update({
        payment_status: "payment_verification",
        payment_utr: trimmedUtr,
        payment_submitted_at: new Date().toISOString(),
      })
      .eq("reference_id", referenceId)
      .select()
      .single();

    if (updateError) {
      console.error("Diagnostic - updateError:", JSON.stringify({
        code: updateError.code,
        message: updateError.message,
        details: updateError.details,
        hint: updateError.hint
      }, null, 2));
      return { success: false, error: "Failed to submit payment details. Please try again." };
    }

    console.log("Diagnostic - update returned row:", !!updateData);

    return { success: true };
  } catch {
    return { success: false, error: "An unexpected error occurred." };
  }
}

export async function submitPaymentConfirmation(referenceId: string) {
  try {
    const { data: request, error: fetchError } = await supabaseServer
      .from("guidance_requests")
      .select("id, payment_status")
      .eq("reference_id", referenceId)
      .single();

    if (fetchError || !request) {
      return { success: false, error: "Request not found." };
    }

    if (request.payment_status === "paid") {
      return { success: false, error: "This request has already been paid and verified." };
    }

    const { error: updateError } = await supabaseServer
      .from("guidance_requests")
      .update({
        payment_status: "payment_verification",
        payment_submitted_at: new Date().toISOString(),
      })
      .eq("reference_id", referenceId);

    if (updateError) {
      console.error("Payment confirmation update error:", {
        code: updateError.code,
        message: updateError.message,
        details: updateError.details,
      });
      return { success: false, error: "Failed to confirm payment. Please try again." };
    }

    return { success: true };
  } catch (err) {
    console.error("Unexpected error during payment confirmation:", err);
    return { success: false, error: "An unexpected error occurred." };
  }
}
