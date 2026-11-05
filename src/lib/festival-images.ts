import type { CalendarEventWithOccurrence } from "@/types/calendar";

/**
 * Festival icon mapping (the round deity icons used on the calendar page).
 * Shared by the calendar timeline, today's event card and the home festival strip.
 */
export function getFestivalIcon(eventName: string): string {
  const name = eventName.toLowerCase();
  if (name.includes("pradosh")) return "/images/festivals/shiva_lingam.jpg";
  if (name.includes("shivaratri") || name.includes("bhairav")) return "/images/festivals/shiva_lingam.jpg";
  if (name.includes("govardhan") || name.includes("gita") || name.includes("holi")) return "/images/festivals/krishna_flute.jpg";
  if (name.includes("chhath")) return "/images/festivals/sankranti_sun.jpg";
  if (name.includes("tulsi") || name.includes("vivah panchami")) return "/images/festivals/vishnu_lotus.jpg";
  if (name.includes("sankashti") || name.includes("chaturthi")) return "/images/festivals/ganesha_modak.jpg";
  if (name.includes("krishna") || name.includes("janmashtami")) return "/images/festivals/krishna_flute.jpg";
  if (name.includes("radha")) return "/images/festivals/radha_krishna.jpg";
  if (name.includes("ganesh")) return "/images/festivals/ganesha_modak.jpg";
  if (name.includes("sankranti")) return "/images/festivals/sankranti_sun.jpg";
  if (name.includes("onam")) return "/images/festivals/onam_boat.jpg";
  if (name.includes("raksha bandhan")) return "/images/festivals/rakhi_sweets.jpg";
  if (name.includes("karwa chauth")) return "/images/festivals/karwa_chauth.jpg";
  if (
    name.includes("navratri") || name.includes("durga") ||
    name.includes("navami") || name.includes("vijayadashami")
  ) return "/images/festivals/durga_lion.jpg";
  if (name.includes("purnima") || name.includes("amavasya")) return "/images/festivals/full_moon_lotus.jpg";
  if (name.includes("ekadashi")) return "/images/festivals/vishnu_lotus.jpg";
  if (name.includes("pitrupaksha")) return "/images/festivals/diya_kalash.jpg";
  return "/images/festivals/diya_kalash.jpg";
}

/** Plain, serializable festival item for the home page strip. */
export interface FestivalItem {
  id: string;
  slug: string;
  name: string;
  /** YYYY-MM-DD (IST calendar date) */
  date: string;
  tithi: string | null;
  icon: string;
  /** true when the icon is an external URL (rendered unoptimized) */
  remoteIcon: boolean;
  /** whole days from today (0 = today) */
  daysAway: number;
}

const dayNumber = (ymd: string) => {
  const [y, m, d] = ymd.slice(0, 10).split("-").map(Number);
  return Date.UTC(y, (m || 1) - 1, d || 1) / 86_400_000;
};

/**
 * Turns upcoming calendar occurrences into strip items, sorted by date.
 * `todayYmd` is today's IST date (YYYY-MM-DD) so the server decides "Today / Tomorrow".
 */
export function buildFestivalItems(
  events: CalendarEventWithOccurrence[],
  todayYmd: string,
  limit = 10,
): FestivalItem[] {
  const today = dayNumber(todayYmd);
  return events
    .filter((e) => e.date && e.slug)
    .map((e) => {
      const date = String(e.date).slice(0, 10);
      const own = e.image_url || "";
      return {
        id: String(e.occurrence_id || e.id),
        slug: e.slug,
        name: e.name.replace(/^[\d\s-]+\s*/, ""),
        date,
        tithi: e.tithi_name || null,
        icon: own || getFestivalIcon(e.name),
        remoteIcon: /^https?:\/\//i.test(own),
        daysAway: Math.max(0, Math.round(dayNumber(date) - today)),
      };
    })
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, limit);
}