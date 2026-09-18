"use server";

import { supabaseServer } from "@/lib/supabase";
import { CalendarEvent } from "@/types/calendar";
import { verifyAdminAuth } from "@/lib/admin-auth";
import { revalidatePath } from "next/cache";
import type { GenerationSummary } from "@/lib/calendar-engine";

export async function getCalendarEvents(): Promise<{ success: boolean; data?: CalendarEvent[]; error?: string }> {
  try {
    const isAuthorized = await verifyAdminAuth();
    if (!isAuthorized) {
      return { success: false, error: "Unauthorized access." };
    }
    const { data, error } = await supabaseServer
      .from("calendar_events")
      .select("*")
      .order("date", { ascending: true });

    if (error) {
      console.error("Error fetching calendar events:", JSON.stringify(error, null, 2));
      return { success: false, error: "Unable to load calendar events." };
    }

    return { success: true, data: data as CalendarEvent[] };
  } catch (error) {
    console.error("Unexpected error fetching calendar events:", error);
    return { success: false, error: "An unexpected error occurred." };
  }
}

export async function deleteCalendarEvent(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const isAuthorized = await verifyAdminAuth();
    if (!isAuthorized) {
      return { success: false, error: "Unauthorized access." };
    }
    const { error } = await supabaseServer
      .from("calendar_events")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting event:", JSON.stringify(error, null, 2));
      return { success: false, error: "Unable to delete event." };
    }

    revalidatePath("/admin/calendar");
    revalidatePath("/shubh-calendar");
    revalidatePath("/");
    
    return { success: true };
  } catch (error) {
    console.error("Unexpected error deleting event:", error);
    return { success: false, error: "An unexpected error occurred." };
  }
}

export async function saveCalendarEvent(
  data: Partial<CalendarEvent>,
  isEdit: boolean
): Promise<{ success: boolean; error?: string }> {
  try {
    const isAuthorized = await verifyAdminAuth();
    if (!isAuthorized) {
      return { success: false, error: "Unauthorized access." };
    }

    // Basic validation
    if (!data.slug || !data.name || !data.event_type) {
      return { success: false, error: "Missing required fields." };
    }

    if (isEdit && data.id) {
      const { error } = await supabaseServer
        .from("calendar_events")
        .update({ ...data, updated_at: new Date().toISOString() })
        .eq("id", data.id);

      if (error) throw error;
    } else {
      // Remove id if it exists for a new event insert
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...insertData } = data;
      const { error } = await supabaseServer
        .from("calendar_events")
        .insert([insertData]);

      if (error) throw error;
    }

    revalidatePath("/admin/calendar");
    revalidatePath("/shubh-calendar");
    revalidatePath("/");
    
    return { success: true };
  } catch (error: unknown) {
    console.error("Error saving event:", error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "An unexpected error occurred while saving." };
  }
}

export async function generateCalendarMonthAction(year: number, month: number): Promise<{ success: boolean; insertedCount: number; error?: string; summary?: GenerationSummary }> {
  try {
    const isAuthorized = await verifyAdminAuth();
    if (!isAuthorized) {
      return { success: false, insertedCount: 0, error: "Unauthorized access." };
    }
    
    // Dynamically import the engine to keep it out of the client bundle if needed
    const { generateCalendarMonth } = await import("@/lib/calendar-engine");
    const result = await generateCalendarMonth(year, month);
    
    if (result.success) {
      revalidatePath("/admin/calendar");
      revalidatePath("/shubh-calendar");
      revalidatePath("/");
    }
    
    return {
      success: result.success,
      insertedCount: result.inserted,
      error: result.error,
      summary: result
    };
  } catch (error: unknown) {
    console.error("Error generating calendar month:", error);
    if (error instanceof Error) {
      return { success: false, insertedCount: 0, error: error.message };
    }
    return { success: false, insertedCount: 0, error: "An unexpected error occurred." };
  }
}
