export const SERVICE_PRICING: Record<string, number> = {
  // Classical Guidance Services
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

  // Sacred Offerings & Consecrated Rituals
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

  // Aliases used by tool-page CTAs (previously fell back to 501 = revenue/trust leak).
  // Prices match how each is advertised on its tool page.
  "deep-kundli": 1500,      // Manglik-Free / full kundli certified report
  "yantra-kavach": 1100,    // Raksha Kavach / Yantra consecration
  "vastu": 1101,            // Vastu analysis & remedies
  "jyotish": 501,           // general astrology reading (same as vedic-guidance)
  "prashna": 501,           // single-question Prashna
  "muhurta": 251,           // common misspelling of "muhurat"
};

export function getServicePrice(serviceId: string): number {
  return SERVICE_PRICING[serviceId] || 501;
}
