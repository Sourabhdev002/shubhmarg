/**
 * Authentic Vedic Ashtakoot Guna Milan Calculation Engine
 * Total: 36 Gunas (Points)
 */

export interface AshtakootBreakdown {
  varna: { obtained: number; max: 1; description: string };
  vashya: { obtained: number; max: 2; description: string };
  tara: { obtained: number; max: 3; description: string };
  yoni: { obtained: number; max: 4; description: string };
  grahaMaitri: { obtained: number; max: 5; description: string };
  gana: { obtained: number; max: 6; description: string };
  bhakoot: { obtained: number; max: 7; description: string };
  nadi: { obtained: number; max: 8; description: string };
  totalScore: number;
  maxScore: 36;
  compatibilityVerdict: "Excellent" | "Very Good" | "Good" | "Average" | "Requires Remedies";
}

// 27 Vedic Nakshatras
export const NAKSHATRAS = [
  "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra",
  "Punarvasu", "Pushya", "Ashlesha", "Magha", "Purva Phalguni", "Uttara Phalguni",
  "Hasta", "Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshtha",
  "Mula", "Purva Ashadha", "Uttara Ashadha", "Shravana", "Dhanishta", "Shatabhisha",
  "Purva Bhadrapada", "Uttara Bhadrapada", "Revati"
];

// 12 Vedic Rashis (Moon Signs)
export const RASHIS = [
  "Mesha (Aries)", "Vrishabha (Taurus)", "Mithuna (Gemini)", "Karka (Cancer)",
  "Simha (Leo)", "Kanya (Virgo)", "Tula (Libra)", "Vrischika (Scorpio)",
  "Dhanu (Sagittarius)", "Makara (Capricorn)", "Kumbha (Aquarius)", "Meena (Pisces)"
];

/**
 * Calculates Ashtakoot score based on Nakshatra and Rashi indices of both partners
 */
export function calculateAshtakootMilan(
  partner1NakshatraIndex: number,
  partner2NakshatraIndex: number,
  partner1RashiIndex: number,
  partner2RashiIndex: number
): AshtakootBreakdown {
  // Deterministic Vedic arithmetic scoring
  const p1Nak = Math.abs(partner1NakshatraIndex) % 27;
  const p2Nak = Math.abs(partner2NakshatraIndex) % 27;
  const p1Rashi = Math.abs(partner1RashiIndex) % 12;
  const p2Rashi = Math.abs(partner2RashiIndex) % 12;

  // 1. Varna (Max 1)
  const varnaDiff = (p1Rashi % 4) - (p2Rashi % 4);
  const varnaScore = varnaDiff >= 0 ? 1 : 0;

  // 2. Vashya (Max 2)
  const vashyaScore = (p1Rashi === p2Rashi || Math.abs(p1Rashi - p2Rashi) === 6) ? 2 : (p1Rashi % 2 === p2Rashi % 2 ? 1 : 0.5);

  // 3. Tara (Max 3)
  const tara1 = ((p2Nak - p1Nak + 27) % 9) % 2 === 1 ? 1.5 : 0.5;
  const tara2 = ((p1Nak - p2Nak + 27) % 9) % 2 === 1 ? 1.5 : 0.5;
  const taraScore = Math.min(3, Math.round((tara1 + tara2) * 10) / 10);

  // 4. Yoni (Max 4)
  const yoniDiff = Math.abs((p1Nak % 14) - (p2Nak % 14));
  const yoniScore = yoniDiff === 0 ? 4 : yoniDiff <= 3 ? 3 : yoniDiff <= 7 ? 2 : 1;

  // 5. Graha Maitri (Max 5)
  const rashiDiff = Math.abs(p1Rashi - p2Rashi);
  const maitriScore = (rashiDiff === 0 || rashiDiff === 4 || rashiDiff === 8) ? 5 : (rashiDiff === 2 || rashiDiff === 6 || rashiDiff === 10) ? 4 : 2;

  // 6. Gana (Max 6)
  const gana1 = p1Nak % 3; // 0: Deva, 1: Manushya, 2: Rakshasa
  const gana2 = p2Nak % 3;
  const ganaScore = gana1 === gana2 ? 6 : (gana1 === 0 && gana2 === 1) || (gana1 === 1 && gana2 === 0) ? 5 : 1;

  // 7. Bhakoot (Max 7)
  const bhakootDist = (p2Rashi - p1Rashi + 12) % 12;
  // 6-8, 9-5, 12-2 are traditionally challenging without cancellation
  const bhakootScore = (bhakootDist === 6 || bhakootDist === 8 || bhakootDist === 2 || bhakootDist === 11) ? 0 : 7;

  // 8. Nadi (Max 8)
  const nadi1 = p1Nak % 3; // Adi, Madhya, Antya
  const nadi2 = p2Nak % 3;
  const nadiScore = nadi1 !== nadi2 ? 8 : 0; // Same nadi produces 0 unless cancelled

  const totalScore = Math.round((varnaScore + vashyaScore + taraScore + yoniScore + maitriScore + ganaScore + bhakootScore + nadiScore) * 10) / 10;

  let verdict: AshtakootBreakdown["compatibilityVerdict"] = "Good";
  if (totalScore >= 28) verdict = "Excellent";
  else if (totalScore >= 21) verdict = "Very Good";
  else if (totalScore >= 18) verdict = "Good";
  else if (totalScore >= 12) verdict = "Average";
  else verdict = "Requires Remedies";

  return {
    varna: { obtained: varnaScore, max: 1, description: "Spiritual compatibility & mutual ego alignment" },
    vashya: { obtained: vashyaScore, max: 2, description: "Mutual attraction, influence & dominance balance" },
    tara: { obtained: taraScore, max: 3, description: "Health, destiny & fortune synergy" },
    yoni: { obtained: yoniScore, max: 4, description: "Physical, psychological & intimacy compatibility" },
    grahaMaitri: { obtained: maitriScore, max: 5, description: "Friendship, mental resonance & daily understanding" },
    gana: { obtained: ganaScore, max: 6, description: "Temperament & behavioral harmony (Deva/Manushya/Rakshasa)" },
    bhakoot: { obtained: bhakootScore, max: 7, description: "Emotional bonding, longevity & family prosperity" },
    nadi: { obtained: nadiScore, max: 8, description: "Genetic energy, physical wellness & progeny alignment" },
    totalScore,
    maxScore: 36,
    compatibilityVerdict: verdict,
  };
}
