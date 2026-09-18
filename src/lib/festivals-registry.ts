/**
 * Client-side festival registry — detects the active festival by date (IST),
 * independent of the Supabase calendar. Used for the launch-day festive greeting.
 *
 * Dates are YYYY-MM-DD (IST). A festival shows on its date and can optionally
 * lead in by `showDaysBefore`. Update yearly as lunar dates shift.
 */

export interface FestivalDef {
  key: string;
  name: string;
  hindi: string;
  greeting: string;         // short blessing line
  dates: string[];          // IST dates it is active (YYYY-MM-DD)
  showDaysBefore?: number;   // optional lead-in days
  image: string;            // /public path
  accent: string;           // hex accent for the greeting
  glyph: string;            // small emoji/symbol
  petal: string;            // petal color for falling motion
}

export const FESTIVALS: FestivalDef[] = [
  {
    key: "janmashtami",
    name: "Krishna Janmashtami",
    hindi: "कृष्ण जन्माष्टमी",
    greeting: "May Lord Krishna bless your path with joy, wisdom & divine guidance.",
    // 2025/2026 Janmashtami dates (update yearly). Includes a launch-friendly window.
    dates: ["2025-08-16", "2026-09-04", "2026-09-05", "2027-08-25"],
    showDaysBefore: 0,
    image: "/images/festivals/krishna_flute.jpg",
    accent: "#3B5BA5",       // peacock blue-indigo — Krishna
    glyph: "🦚",
    petal: "#F5A623",
  },
];

/** Get today's date in IST as YYYY-MM-DD */
function todayIST(): string {
  return new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
}

/** Returns the active festival for today (IST), or null. */
export function getActiveFestival(): FestivalDef | null {
  const today = todayIST();
  for (const f of FESTIVALS) {
    if (f.dates.includes(today)) return f;
  }
  return null;
}
