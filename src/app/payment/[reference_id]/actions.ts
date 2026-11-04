"use server";

import { after } from "next/server";
import { supabaseServer } from "@/lib/supabase";
import { sendPaymentClaimAlert } from "@/lib/telegram";
import { shouldSendClaimAlert } from "@/lib/telegram-messages";

interface ClaimRow {
  reference_id?: string;
  service: string | null;
  payment_amount: number | null;
  full_name: string | null;
}

/** Schedules the owner claim alert. Never throws and never blocks the response. */
function scheduleClaimAlert(referenceId: string, row: ClaimRow, utr?: string) {
  try {
    after(async () => {
      try {
        await sendPaymentClaimAlert({
          referenceId,
          service: String(row.service ?? ""),
          amount: Number(row.payment_amount ?? 0),
          name: String(row.full_name ?? ""),
          utr,
        });
      } catch {
        /* best effort */
      }
    });
  } catch {
    /* best effort */
  }
}

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
    const trimmedUtr = utr.trim();
    if (trimmedUtr.length < 8 || trimmedUtr.length > 20) {
      return { success: false, error: "Please enter a valid UTR or Transaction Reference number." };
    }

    // Check existing status
    const { data: request, error: fetchError } = await supabaseServer
      .from("guidance_requests")
      .select("id, payment_status, service, payment_amount, full_name")
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
    const { error: updateError } = await supabaseServer
      .from("guidance_requests")
      .update({
        payment_status: "payment_verification",
        payment_utr: trimmedUtr,
        payment_submitted_at: new Date().toISOString(),
      })
      .eq("reference_id", referenceId);

    if (updateError) {
      console.error("Diagnostic - updateError:", updateError);
      return { success: false, error: "Failed to submit payment details. Please try again." };
    }

    if (shouldSendClaimAlert(String(request.payment_status), true)) {
      scheduleClaimAlert(referenceId, request, trimmedUtr);
    }

    return { success: true };
  } catch {
    return { success: false, error: "An unexpected error occurred." };
  }
}

export async function submitPaymentConfirmation(referenceId: string) {
  try {
    const { data: request, error: fetchError } = await supabaseServer
      .from("guidance_requests")
      .select("id, payment_status, service, payment_amount, full_name")
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
      console.error("Payment confirmation update error:", updateError);
      return { success: false, error: "Failed to confirm payment. Please try again." };
    }

    if (shouldSendClaimAlert(String(request.payment_status), false)) {
      scheduleClaimAlert(referenceId, request);
    }

    return { success: true };
  } catch (err) {
    console.error("Unexpected error during payment confirmation:", err);
    return { success: false, error: "An unexpected error occurred." };
  }
}
