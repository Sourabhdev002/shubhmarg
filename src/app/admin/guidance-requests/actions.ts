"use server";

import { supabaseServer } from "@/lib/supabase";
import { GuidanceRequest, RequestStatus, PaymentStatus } from "@/types/admin";
import { verifyAdminAuth } from "@/lib/admin-auth";

export async function getGuidanceRequests(): Promise<{ success: boolean; data?: GuidanceRequest[]; error?: string }> {
  try {
    const isAuthorized = await verifyAdminAuth();
    if (!isAuthorized) {
      return { success: false, error: "Unauthorized access." };
    }
    const { data, error } = await supabaseServer
      .from("guidance_requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching guidance requests:", JSON.stringify(error, null, 2));
      return { success: false, error: "Unable to load guidance requests." };
    }

    return { success: true, data: data as GuidanceRequest[] };
  } catch (error) {
    console.error("Unexpected error fetching guidance requests:", error);
    return { success: false, error: "An unexpected error occurred." };
  }
}

export async function updateGuidanceRequestStatus(
  id: string,
  status: RequestStatus
): Promise<{ success: boolean; error?: string }> {
  try {
    const isAuthorized = await verifyAdminAuth();
    if (!isAuthorized) {
      return { success: false, error: "Unauthorized access." };
    }
    const { error } = await supabaseServer
      .from("guidance_requests")
      .update({ status })
      .eq("id", id);

    if (error) {
      console.error("Error updating request status:", JSON.stringify(error, null, 2));
      return { success: false, error: "Unable to update the request status." };
    }

    return { success: true };
  } catch (error) {
    console.error("Unexpected error updating request status:", error);
    return { success: false, error: "An unexpected error occurred." };
  }
}

export async function updatePaymentStatus(
  id: string,
  status: PaymentStatus,
  note?: string
): Promise<{ success: boolean; error?: string; paid_at?: string }> {
  try {
    const isAuthorized = await verifyAdminAuth();
    if (!isAuthorized) {
      return { success: false, error: "Unauthorized access." };
    }
    const updateData: Record<string, string | null> = { payment_status: status };
    if (note !== undefined) {
      updateData.payment_verification_note = note;
    }
    
    // Set paid_at if status is 'paid'
    const now = new Date().toISOString();
    if (status === 'paid') {
      updateData.paid_at = now;
    }

    const { error } = await supabaseServer
      .from("guidance_requests")
      .update(updateData)
      .eq("id", id);

    if (error) {
      console.error("Error updating payment status:", JSON.stringify(error, null, 2));
      return { success: false, error: "Unable to update the payment status." };
    }

    return { success: true, paid_at: status === 'paid' ? now : undefined };
  } catch (error) {
    console.error("Unexpected error updating payment status:", error);
    return { success: false, error: "An unexpected error occurred." };
  }
}

export async function triggerAiReportGeneration(
  id: string
): Promise<{ success: boolean; report?: string; error?: string }> {
  try {
    const isAuthorized = await verifyAdminAuth();
    if (!isAuthorized) {
      return { success: false, error: "Unauthorized access." };
    }

    const { data: request, error } = await supabaseServer
      .from("guidance_requests")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !request) {
      return { success: false, error: "Request not found." };
    }

    const { generateVedicGuidanceReport } = await import("@/services/report-generator");
    return await generateVedicGuidanceReport(request as GuidanceRequest);
  } catch (error) {
    console.error("Unexpected error generating AI report:", error);
    return { success: false, error: "Failed to generate report." };
  }
}


// ─── Manual payment verification fallback ────────────────────────────────────
// Used when auto-verification (webhook) does not fire. Operator confirms after
// checking their bank/Paytm alert against the order's unique amount + UTR.

export async function confirmPaymentManually(
  id: string,
  note?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const isAuthorized = await verifyAdminAuth();
    if (!isAuthorized) {
      return { success: false, error: "Unauthorized access." };
    }

    const { error } = await supabaseServer
      .from("guidance_requests")
      .update({
        payment_status: "paid",
        paid_at: new Date().toISOString(),
        payment_verified_by: "admin",
        payment_verification_note: note ?? "Manually confirmed by admin",
      })
      .eq("id", id)
      .neq("payment_status", "paid"); // idempotency guard

    if (error) {
      console.error("Error confirming payment manually:", JSON.stringify(error, null, 2));
      return { success: false, error: "Unable to confirm payment." };
    }

    // Trigger report generation in the background (best-effort).
    (async () => {
      try {
        const { data: request } = await supabaseServer
          .from("guidance_requests")
          .select("*")
          .eq("id", id)
          .single();
        if (request) {
          const { generateVedicGuidanceReport } = await import("@/services/report-generator");
          await generateVedicGuidanceReport(request as GuidanceRequest);
        }
      } catch (e) {
        console.error("Manual confirm report trigger error:", e);
      }
    })();

    return { success: true };
  } catch (error) {
    console.error("Unexpected error confirming payment:", error);
    return { success: false, error: "An unexpected error occurred." };
  }
}

export async function rejectPayment(
  id: string,
  note?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const isAuthorized = await verifyAdminAuth();
    if (!isAuthorized) {
      return { success: false, error: "Unauthorized access." };
    }

    const { error } = await supabaseServer
      .from("guidance_requests")
      .update({
        payment_status: "payment_failed",
        payment_verification_note: note ?? "Payment could not be verified",
      })
      .eq("id", id);

    if (error) {
      console.error("Error rejecting payment:", JSON.stringify(error, null, 2));
      return { success: false, error: "Unable to reject payment." };
    }

    return { success: true };
  } catch (error) {
    console.error("Unexpected error rejecting payment:", error);
    return { success: false, error: "An unexpected error occurred." };
  }
}

// ─── Wallet refund ───────────────────────────────────────────────────────────
// Credits a refund into a user's wallet atomically (single Postgres transaction)
// and writes a 'refund' ledger row. Admin-only. Amount is in rupees.

export async function refundToWallet(
  userId: string,
  amountInr: number,
  reason: string,
  orderReference?: string
): Promise<{ success: boolean; balance_paise?: number; error?: string }> {
  try {
    const isAuthorized = await verifyAdminAuth();
    if (!isAuthorized) {
      return { success: false, error: "Unauthorized access." };
    }

    if (!userId) {
      return { success: false, error: "User is required." };
    }
    // Whole-paise, positive, sane upper bound to prevent fat-finger errors.
    const amountPaise = Math.round(Number(amountInr) * 100);
    if (!Number.isFinite(amountPaise) || amountPaise <= 0) {
      return { success: false, error: "Enter a valid refund amount." };
    }
    if (amountPaise > 100 * 100000) {
      return { success: false, error: "Refund exceeds the allowed limit." };
    }

    const { data: newBalance, error } = await supabaseServer.rpc("wallet_refund", {
      p_user_id: userId,
      p_amount_paise: amountPaise,
      p_reason: reason?.trim() || "Wallet refund",
      p_order_ref: orderReference?.trim() || null,
    });

    if (error) {
      const msg = error.message || "";
      if (msg.includes("wallet_not_found")) {
        return { success: false, error: "That user has no wallet." };
      }
      if (msg.includes("invalid_amount")) {
        return { success: false, error: "Enter a valid refund amount." };
      }
      console.error("refundToWallet failed:", msg);
      return { success: false, error: "Refund failed. Please retry." };
    }

    return { success: true, balance_paise: Number(newBalance) };
  } catch (error) {
    console.error("Unexpected error issuing wallet refund:", error);
    return { success: false, error: "An unexpected error occurred." };
  }
}
