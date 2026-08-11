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
      return { success: false, error: error.message || "Failed to fetch guidance requests." };
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
      return { success: false, error: error.message || "Failed to update request status." };
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
      return { success: false, error: error.message || "Failed to update payment status." };
    }

    return { success: true, paid_at: status === 'paid' ? now : undefined };
  } catch (error) {
    console.error("Unexpected error updating payment status:", error);
    return { success: false, error: "An unexpected error occurred." };
  }
}
