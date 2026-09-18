"use server";

import { supabaseServer } from "@/lib/supabase";
import { SupportRequest, SupportStatus } from "@/types/support";
import { revalidatePath } from "next/cache";

export async function getSupportRequests() {
  try {
    const { data, error } = await supabaseServer
      .from("support_requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching support requests:", error);
      return { success: false, error: "Database error fetching support requests." };
    }

    return { success: true, data: data as SupportRequest[] };
  } catch (err) {
    console.error("Unexpected error fetching support requests:", err);
    return { success: false, error: "An unexpected error occurred." };
  }
}

export async function updateSupportStatus(requestId: string, newStatus: SupportStatus) {
  try {
    const { error } = await supabaseServer
      .from("support_requests")
      .update({ status: newStatus })
      .eq("id", requestId);

    if (error) {
      console.error("Error updating status:", error);
      return { success: false, error: "Failed to update status." };
    }

    revalidatePath("/admin/support-requests");
    return { success: true };
  } catch (err) {
    console.error("Unexpected error updating status:", err);
    return { success: false, error: "An unexpected error occurred." };
  }
}
