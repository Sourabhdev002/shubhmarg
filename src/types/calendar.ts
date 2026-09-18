export interface CalendarEvent {
  id: string;
  slug: string;
  name: string;
  event_type: string;
  description?: string | null;
  significance?: string | null;
  puja_guidance?: string | null;
  mantra?: string | null;
  dos?: string | null;
  donts?: string | null;
  image_url?: string | null;
  seo_title?: string | null;
  seo_description?: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface CalendarOccurrence {
  id: string;
  event_id: string;
  date: string; // YYYY-MM-DD
  tithi_name?: string | null;
  lunar_month?: string | null;
  calculation_source?: string | null;
  calculation_version?: string | null;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

// Joined type for frontend rendering
export interface CalendarEventWithOccurrence extends CalendarEvent {
  occurrence_id: string;
  date: string;
  tithi_name?: string | null;
  lunar_month?: string | null;
}

export interface DailyPanchang {
  date: string;
  tithi: string | null;
  paksha: string | null;
  lunar_month: string | null;
  nakshatra: string | null;
  yoga: string | null;
  karana: string | null;
  sunrise: string | null;
  sunset: string | null;
  moonrise: string | null;
  moonset: string | null;
}
