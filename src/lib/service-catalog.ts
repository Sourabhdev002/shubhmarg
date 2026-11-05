// Pure service catalog helpers built on SERVICE_PRICING. Safe on client and server.
import { SERVICE_PRICING, getServicePrice } from "@/lib/pricing";

export type ServiceCategory = "guidance" | "offering";

export interface ServiceMeta {
  name: string;
  delivery: string;
  category: ServiceCategory;
  desc: string;
}

export interface ServiceView extends ServiceMeta {
  id: string;
  price: number;
}

/** Ids that no longer have a price entry. */
export const LEGACY_SERVICE_IDS: Record<string, string> = {
  "karmic-debt": "temple-puja",
};

/** The only remaps allowed: each alias has the identical price as its target. */
export const SAME_PRICE_ALIASES: Record<string, string> = {
  puja: "temple-puja",
  express: "tatkal-express",
  voice: "voice-dossier",
  varshphal: "annual-varshphal",
  gemstone: "energized-gemstone",
  business: "business-retainer",
};

/** Returns a catalog id, the legacy target, or null for unknown ids. */
export function resolveServiceId(raw: string | null | undefined): string | null {
  if (!raw) return null;
  if (Object.prototype.hasOwnProperty.call(SERVICE_PRICING, raw)) return raw;
  if (Object.prototype.hasOwnProperty.call(LEGACY_SERVICE_IDS, raw)) return LEGACY_SERVICE_IDS[raw];
  return null;
}

export const SERVICE_META: Record<string, ServiceMeta> = {
  // The 12 existing form entries, copied verbatim.
  "vedic-guidance": { name: "Prashna (1 Question)", delivery: "2-3 days", category: "guidance", desc: "Specific answer with remedial guidance" },
  "kundli": { name: "Jyotish / Kundli Reading", delivery: "3-5 days", category: "guidance", desc: "Full planetary horoscope chart analysis" },
  "muhurat": { name: "Muhurta (Auspicious Timing)", delivery: "2-3 days", category: "guidance", desc: "Marriage, business, travel or griha pravesh" },
  "career-business": { name: "Career & Business Advice", delivery: "2-3 days", category: "guidance", desc: "10th house analysis & wealth timings" },
  "marriage": { name: "Marriage & Relationships", delivery: "3-5 days", category: "guidance", desc: "Gun Milan, compatibility & remedies" },
  "remedy": { name: "Remedies & Solutions", delivery: "3-5 days", category: "guidance", desc: "Custom gemstone, mantra & puja remedy" },
  "temple-puja": { name: "Remote Temple Sankalp Puja", delivery: "Kashi/Ujjain + Prasad", category: "offering", desc: "Live priest sankalp with sanctified prasad" },
  "tatkal-express": { name: "2-Hour Tatkal Express Guidance", delivery: "Within 120 Mins", category: "offering", desc: "Emergency priority guidance direct on phone" },
  "voice-dossier": { name: "Pandit Ji Voice Audio Dossier", delivery: "Studio MP3 on WhatsApp", category: "offering", desc: "Personalized deep-dive audio recording" },
  "annual-varshphal": { name: "365-Day Royal Varshphal Book", delivery: "25+ Page Gold Dossier", category: "offering", desc: "Full year month-by-month predictive report" },
  "energized-gemstone": { name: "Consecrated Gemstone Ring", delivery: "Lab Certified + Ring", category: "offering", desc: "Prana-pratishtha energized authentic stone" },
  "business-retainer": { name: "Vyapar Vastu & Business Retainer", delivery: "Quarterly VIP Retainer", category: "offering", desc: "Ongoing strategic Vedic advisory for business" },

  // New entries (owner decision D9: names from tool-page wording, neutral text).
  "baby-name": { name: "Baby Name Guidance", delivery: "2-3 days", category: "guidance", desc: "Auspicious name suggestions from the birth nakshatra" },
  "emergency": { name: "Emergency Graha Shanti Guidance", delivery: "Priority response", category: "guidance", desc: "Urgent guidance and remedies for a pressing situation" },
  "jaap": { name: "Mantra Jaap Sankalp", delivery: "3-5 days", category: "offering", desc: "Mantra jaap performed on your behalf with sankalp" },
  "compatibility": { name: "Compatibility & Gun Milan", delivery: "3-5 days", category: "guidance", desc: "Kundli matching and compatibility analysis" },
  "quick-answer": { name: "Quick Answer", delivery: "After payment is confirmed", category: "guidance", desc: "A short, focused answer to one question" },
  "deep-kundli": { name: "Deep Kundli Report", delivery: "3-5 days", category: "guidance", desc: "Detailed certified kundli analysis report" },
  "yantra-kavach": { name: "Yantra & Raksha Kavach", delivery: "5-7 days", category: "offering", desc: "Yantra or kavach consecration for protection" },
  "vastu": { name: "Vastu Analysis & Remedies", delivery: "3-5 days", category: "guidance", desc: "Vastu review of your space with practical remedies" },
  "jyotish": { name: "Jyotish Consultation", delivery: "2-3 days", category: "guidance", desc: "General astrology reading and guidance" },
  "prashna": { name: "Prashna Kundli (Single Question)", delivery: "2-3 days", category: "guidance", desc: "Horary chart answer to one specific question" },
  "muhurta": { name: "Muhurta Selection", delivery: "2-3 days", category: "guidance", desc: "Auspicious date and time selection" },
};

/** Always uses getServicePrice, so the form and the server share one price source. */
export function getServiceView(id: string): ServiceView {
  const key = SAME_PRICE_ALIASES[id] ?? resolveServiceId(id) ?? id;
  const meta = SERVICE_META[key] ?? SERVICE_META["vedic-guidance"];
  return { id: key, price: getServicePrice(key), ...meta };
}

export function formatInr(n: number): string {
  return `₹${Number(n).toLocaleString("en-IN")}`;
}

/** The only way CTAs print a price. */
export function ctaPriceLabel(serviceId: string): string {
  return formatInr(getServicePrice(resolveServiceId(serviceId) ?? serviceId));
}

export function buildQuickAnswerResponse(referenceId: string, amount: number) {
  return { success: true as const, referenceId, amount };
}
