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
};

export function getServicePrice(serviceId: string): number {
  return SERVICE_PRICING[serviceId] || 501;
}
