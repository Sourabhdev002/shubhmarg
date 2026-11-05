/**
 * Literal snapshot of the order-flow behaviour BEFORE the order-flow-fixes work.
 * Copied verbatim from the unfixed code. Do not "update" these to match new code;
 * they are the baseline that must be preserved (tasks 2 and 3.7).
 */

export interface LegacyService {
  id: string;
  name: string;
  price: number;
  delivery: string;
  desc: string;
}

/** The 12 services in the old GuidanceRequestForm.tsx SERVICES list. */
export const LEGACY_FORM_SERVICES: LegacyService[] = [
  { id: "vedic-guidance", name: "Prashna (1 Question)", price: 501, delivery: "2-3 days", desc: "Specific answer with remedial guidance" },
  { id: "kundli", name: "Jyotish / Kundli Reading", price: 1101, delivery: "3-5 days", desc: "Full planetary horoscope chart analysis" },
  { id: "muhurat", name: "Muhurta (Auspicious Timing)", price: 251, delivery: "2-3 days", desc: "Marriage, business, travel or griha pravesh" },
  { id: "career-business", name: "Career & Business Advice", price: 501, delivery: "2-3 days", desc: "10th house analysis & wealth timings" },
  { id: "marriage", name: "Marriage & Relationships", price: 1501, delivery: "3-5 days", desc: "Gun Milan, compatibility & remedies" },
  { id: "remedy", name: "Remedies & Solutions", price: 1101, delivery: "3-5 days", desc: "Custom gemstone, mantra & puja remedy" },
  { id: "temple-puja", name: "Remote Temple Sankalp Puja", price: 2100, delivery: "Kashi/Ujjain + Prasad", desc: "Live priest sankalp with sanctified prasad" },
  { id: "tatkal-express", name: "2-Hour Tatkal Express Guidance", price: 2499, delivery: "Within 120 Mins", desc: "Emergency priority guidance direct on phone" },
  { id: "voice-dossier", name: "Pandit Ji Voice Audio Dossier", price: 1999, delivery: "Studio MP3 on WhatsApp", desc: "Personalized deep-dive audio recording" },
  { id: "annual-varshphal", name: "365-Day Royal Varshphal Book", price: 2999, delivery: "25+ Page Gold Dossier", desc: "Full year month-by-month predictive report" },
  { id: "energized-gemstone", name: "Consecrated Gemstone Ring", price: 5500, delivery: "Lab Certified + Ring", desc: "Prana-pratishtha energized authentic stone" },
  { id: "business-retainer", name: "Vyapar Vastu & Business Retainer", price: 11000, delivery: "Quarterly VIP Retainer", desc: "Ongoing strategic Vedic advisory for business" },
];

/** The same-price entries of the old ALIAS_MAP (the only remaps that stay). */
export const LEGACY_SAME_PRICE_ALIASES: Record<string, string> = {
  puja: "temple-puja",
  express: "tatkal-express",
  voice: "voice-dossier",
  varshphal: "annual-varshphal",
  gemstone: "energized-gemstone",
  business: "business-retainer",
};

/** The old server allow-list in src/app/request-guidance/actions.ts. */
export const LEGACY_SERVER_ALLOW_LIST: string[] = [
  "vedic-guidance",
  "career-business",
  "marriage",
  "kundli",
  "muhurat",
  "remedy",
  "jaap",
  "quick-answer",
  "emergency",
  "baby-name",
  "compatibility",
  "free-reading",
  "temple-puja",
  "puja",
  "tatkal-express",
  "express",
  "voice-dossier",
  "voice",
  "annual-varshphal",
  "varshphal",
  "energized-gemstone",
  "gemstone",
  "business-retainer",
  "business",
  "deep-kundli",
  "yantra-kavach",
  "vastu",
  "jyotish",
  "prashna",
  "muhurta",
];

/** Frozen copy of SERVICE_PRICING values (pricing.ts must not change). */
export const LEGACY_PRICING: Record<string, number> = {
  "vedic-guidance": 501,
  "career-business": 501,
  "marriage": 1501,
  "kundli": 1101,
  "muhurat": 251,
  "remedy": 1101,
  "jaap": 2101,
  "quick-answer": 99,
  "emergency": 499,
  "baby-name": 999,
  "compatibility": 1501,
  "free-reading": 0,
  "temple-puja": 2100,
  "puja": 2100,
  "tatkal-express": 2499,
  "express": 2499,
  "voice-dossier": 1999,
  "voice": 1999,
  "annual-varshphal": 2999,
  "varshphal": 2999,
  "energized-gemstone": 5500,
  "gemstone": 5500,
  "business-retainer": 11000,
  "business": 11000,
  "deep-kundli": 1500,
  "yantra-kavach": 1100,
  "vastu": 1101,
  "jyotish": 501,
  "prashna": 501,
  "muhurta": 251,
};

/** Saved email formats (row shape). */
export const LEGACY_PHONE_EMAIL = (phone10: string) => `${phone10}@phone.shubhmarg.com`;
export const LEGACY_QUICK_EMAIL = (phone10: string) => `${phone10}@quick.shubhmarg.com`;
