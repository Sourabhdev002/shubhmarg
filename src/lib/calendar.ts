import { supabasePublic } from "./supabase";
import { CalendarEventWithOccurrence, CalendarEvent } from "@/types/calendar";

// Helper to get today's date in IST format (YYYY-MM-DD)
function getTodayIST() {
  return new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
}

export function cleanEventName(name: string): string {
  if (!name) return name;
  // Strips things like "26", "26 AUG", "26AUG ", "26 August"
  return name
    .replace(/^[\d\s-]*(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\s*/i, '')
    .replace(/^[\d\s-]+\s*/, '')
    .trim();
}

interface CalendarOccurrenceRow {
  id: string;
  date: string;
  tithi_name?: string;
  lunar_month?: string;
  calendar_events: CalendarEvent;
}

// Maps Supabase join response to flattened type
function mapOccurrenceToEvent(row: CalendarOccurrenceRow): CalendarEventWithOccurrence {
  const event = row.calendar_events as CalendarEvent;
  return {
    ...event,
    name: cleanEventName(event.name),
    occurrence_id: row.id as string,
    date: row.date as string,
    tithi_name: row.tithi_name as string | undefined,
    lunar_month: row.lunar_month as string | undefined
  };
}

export async function getUpcomingEvents(): Promise<CalendarEventWithOccurrence[]> {
  const today = getTodayIST();
  
  const { data, error } = await supabasePublic
    .from("calendar_occurrences")
    .select("*, calendar_events!inner(*)")
    .eq("calendar_events.published", true)
    .gte("date", today)
    .order("date", { ascending: true });

  if (error) {
    console.error("Error fetching upcoming events:", error.message || error, error.code, error.details);
    return [];
  }

  return (data || []).map(mapOccurrenceToEvent);
}

export async function getTodayEvent(): Promise<CalendarEventWithOccurrence | null> {
  const today = getTodayIST();
  
  const { data, error } = await supabasePublic
    .from("calendar_occurrences")
    .select("*, calendar_events!inner(*)")
    .eq("calendar_events.published", true)
    .eq("date", today)
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("Error fetching today's event:", error.message || error, error.code, error.details);
    return null;
  }

  return data ? mapOccurrenceToEvent(data) : null;
}

// This returns an occurrence if available, otherwise just the event data
export async function getEventBySlug(slug: string): Promise<CalendarEventWithOccurrence | CalendarEvent | null> {
  // Try to find the closest future occurrence
  const today = getTodayIST();
  const { data: occData } = await supabasePublic
    .from("calendar_occurrences")
    .select("*, calendar_events!inner(*)")
    .eq("calendar_events.slug", slug)
    .eq("calendar_events.published", true)
    .gte("date", today)
    .order("date", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (occData) {
    return mapOccurrenceToEvent(occData);
  }

  // Fallback: just return the editorial event if no occurrence exists
  const { data: eventData, error } = await supabasePublic
    .from("calendar_events")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (error || !eventData) {
    return null;
  }
  
  eventData.name = cleanEventName(eventData.name);
  return eventData as CalendarEvent;
}

export async function getDailyPanchang(dateStr?: string) {
  const date = dateStr || getTodayIST();
  const { data, error } = await supabasePublic
    .from("calendar_panchang")
    .select("*")
    .eq("date", date)
    .maybeSingle();

  if (error) {
    console.error("Error fetching panchang:", error.message || error, error.code, error.details);
    return null;
  }
  
  return data;
}
