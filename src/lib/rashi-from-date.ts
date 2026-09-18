// Lightweight DOB → Rashi (moon-sign approximation via Western sun-sign date bands).
// This is a friendly in-chat "instant Rashi" helper — NOT a full sidereal ephemeris.
// It gives an honest, useful quick result and always points to a proper paid reading
// for the exact sidereal chart. Kept dependency-free and deterministic.

export interface QuickRashi {
  key: string;      // e.g. "Simha"
  en: string;       // e.g. "Leo"
  hindi: string;    // e.g. "सिंह"
  lord: string;     // ruling planet
  element: string;  // element label
  oneLine: string;  // a warm 1-line trait
}

// Ordered by sign; band = [startMonth, startDay] inclusive → next entry's start.
const SIGNS: { key: string; en: string; hindi: string; lord: string; element: string; from: [number, number]; oneLine: string }[] = [
  { key: "Makar", en: "Capricorn", hindi: "मकर", lord: "Shani (Saturn)", element: "Earth", from: [12, 22], oneLine: "Disciplined and destined for lasting success." },
  { key: "Kumbh", en: "Aquarius", hindi: "कुम्भ", lord: "Shani & Rahu", element: "Air", from: [1, 20], oneLine: "A visionary humanitarian with original wisdom." },
  { key: "Meen", en: "Pisces", hindi: "मीन", lord: "Guru (Jupiter)", element: "Water", from: [2, 19], oneLine: "A deeply spiritual, compassionate soul." },
  { key: "Mesh", en: "Aries", hindi: "मेष", lord: "Mangal (Mars)", element: "Fire", from: [3, 21], oneLine: "A courageous pioneer with fierce drive." },
  { key: "Vrishabh", en: "Taurus", hindi: "वृषभ", lord: "Shukra (Venus)", element: "Earth", from: [4, 20], oneLine: "Grounded, loyal, and blessed with abundance." },
  { key: "Mithun", en: "Gemini", hindi: "मिथुन", lord: "Budha (Mercury)", element: "Air", from: [5, 21], oneLine: "Quick-witted, expressive, endlessly curious." },
  { key: "Kark", en: "Cancer", hindi: "कर्क", lord: "Chandra (Moon)", element: "Water", from: [6, 21], oneLine: "Intuitive, nurturing, deeply devoted to family." },
  { key: "Simha", en: "Leo", hindi: "सिंह", lord: "Surya (Sun)", element: "Fire", from: [7, 23], oneLine: "A natural leader with a radiant, royal aura." },
  { key: "Kanya", en: "Virgo", hindi: "कन्या", lord: "Budha (Mercury)", element: "Earth", from: [8, 23], oneLine: "Precise, wise, and quietly excellent at all things." },
  { key: "Tula", en: "Libra", hindi: "तुला", lord: "Shukra (Venus)", element: "Air", from: [9, 23], oneLine: "Graceful, fair, and a natural harmoniser." },
  { key: "Vrishchik", en: "Scorpio", hindi: "वृश्चिक", lord: "Mangal & Ketu", element: "Water", from: [10, 23], oneLine: "Intense, magnetic, and spiritually transformative." },
  { key: "Dhanu", en: "Sagittarius", hindi: "धनु", lord: "Guru (Jupiter)", element: "Fire", from: [11, 22], oneLine: "An optimistic seeker of truth and adventure." },
];

/** Parse many date shapes → {y,m,d} or null. Accepts YYYY-MM-DD, DD/MM/YYYY, DD-MM-YYYY. */
export function parseFlexibleDate(input: string): { y: number; m: number; d: number } | null {
  const s = input.trim();
  // ISO first
  const iso = s.match(/\b(\d{4})[-/](\d{1,2})[-/](\d{1,2})\b/);
  if (iso) {
    const y = +iso[1], m = +iso[2], d = +iso[3];
    if (m >= 1 && m <= 12 && d >= 1 && d <= 31) return { y, m, d };
  }
  // DD/MM/YYYY or DD-MM-YYYY
  const dmy = s.match(/\b(\d{1,2})[-/](\d{1,2})[-/](\d{4})\b/);
  if (dmy) {
    const d = +dmy[1], m = +dmy[2], y = +dmy[3];
    if (m >= 1 && m <= 12 && d >= 1 && d <= 31) return { y, m, d };
  }
  return null;
}

/** Map a month/day to the approximate Rashi. */
export function rashiFromMonthDay(month: number, day: number): QuickRashi {
  // Find the sign whose band the date falls into (bands wrap around Capricorn).
  // Build ordered list starting Jan so comparison is simple.
  const byStart = [...SIGNS].sort((a, b) => (a.from[0] - b.from[0]) || (a.from[1] - b.from[1]));
  let chosen = byStart[byStart.length - 1]; // default Capricorn (late Dec)
  for (const sign of byStart) {
    const [sm, sd] = sign.from;
    if (month > sm || (month === sm && day >= sd)) chosen = sign;
  }
  return {
    key: chosen.key, en: chosen.en, hindi: chosen.hindi,
    lord: chosen.lord, element: chosen.element, oneLine: chosen.oneLine,
  };
}

/** Convenience: get a QuickRashi straight from free-text a user typed. */
export function quickRashiFromText(text: string): QuickRashi | null {
  const parsed = parseFlexibleDate(text);
  if (!parsed) return null;
  return rashiFromMonthDay(parsed.m, parsed.d);
}
