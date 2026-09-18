import { NextRequest, NextResponse } from "next/server";
import { calculateAshtakootMilan, NAKSHATRAS, RASHIS } from "@/lib/guna-milan";

export const dynamic = "force-dynamic";

function generateFallbackCompatibilityNarrative(
  p1Name: string,
  p2Name: string,
  p1Rashi: string,
  p2Rashi: string,
  p1Nak: string,
  p2Nak: string,
  milan: ReturnType<typeof calculateAshtakootMilan>
): string {
  const isAuspicious = milan.totalScore >= 18;

  return `### 🌟 ॥ शुभ विवाह गुण मिलान एवं पावन वैदिक परामर्श ॥

> ॐ श्रीं ह्रीं क्लीं ग्लौं गं गणपतये वर वरद सर्वजनं मे वशमानय स्वाहा ॥
> "When two souls unite in Dharma, their planetary energies combine to create mutual spiritual and material growth."

---

### 1. Overall Relationship Energy & Ashtakoot Synthesis
The Ashtakoot Kundli Milan between **${p1Name}** (Moon in *${p1Rashi}*, Nakshatra *${p1Nak}*) and **${p2Name}** (Moon in *${p2Rashi}*, Nakshatra *${p2Nak}*) reveals a total score of **${milan.totalScore} out of 36 Gunas**, conferring a traditional verdict of **${milan.compatibilityVerdict}**.

${
  isAuspicious
    ? `This score of **${milan.totalScore}/36** exceeds the classical threshold of 18 Gunas, indicating strong natural alignment across temperamental, intellectual, and psychological dimensions. The planetary friendship (Graha Maitri: ${milan.grahaMaitri.obtained}/5) and elemental resonance provide a solid foundation for long-term marital bliss, emotional security, and mutual prosperity.`
    : `While the baseline score is **${milan.totalScore}/36**, classical Jyotish emphasizes that Ashtakoot points represent only the surface of compatibility. Deeper planetary house placements (7th house Jupiter/Venus aspects, D9 Navamsha chart harmony, and mutual Lagna friendship) can neutralize numerical imbalances through conscious understanding and proper Vedic remedial synchronization.`
}

---

### 2. Core Compatibility Pillars
* **Mental & Emotional Friendship (Graha Maitri: ${milan.grahaMaitri.obtained}/5):** ${milan.grahaMaitri.description}. A strong Graha Maitri ensures that everyday disagreements dissolve quickly without lingering resentment.
* **Temperamental Harmony (Gana: ${milan.gana.obtained}/6):** ${milan.gana.description}. Both partners naturally complement each other's life approach when personal space and mutual respect are honored.
* **Health & Progeny Vitality (Nadi: ${milan.nadi.obtained}/8):** ${milan.nadi.description}. Physiological alignment supports strong joint vitality, emotional longevity, and healthy family growth.
* **Love & Mutual Attraction (Bhakoot: ${milan.bhakoot.obtained}/7):** ${milan.bhakoot.description}. Supports enduring affection, financial cooperation, and emotional fulfillment.

---

### 3. Sattvic Vedic Remedies for Lifelong Harmony (Upayas)
1. **Joint Gauri-Shankar / Radha-Krishna Archana:** Performing joint prayers on Mondays or Fridays fosters eternal marital devotion and softens any transit planetary friction.
2. **Mutual Gotra Shanti & Sankalp:** Reciting the *Maha Mrityunjaya Mantra* together 11 times weekly strengthens auric protection around both partners.
3. **Charity & Annadanam on Purnima:** Jointly donating grain or feeding cows (*Go Seva*) on full moon days resolves subtle generational doshas.

---

### 4. Pandit Ji's Reassuring Concluding Blessing
*May the divine grace of Mahadev and Goddess Parvati bless the sacred union of **${p1Name}** and **${p2Name}** with unbroken harmony, longevity, prosperous lineage, and peaceful coexistence.*`;
}

export async function POST(req: NextRequest) {
  try {
    const { partner1, partner2 } = await req.json();

    if (!partner1?.name || !partner2?.name) {
      return NextResponse.json({ success: false, error: "Both partners' details are required." }, { status: 400 });
    }

    const p1NakIndex = parseInt(String(partner1.nakshatraIndex ?? "0"), 10) || 0;
    const p2NakIndex = parseInt(String(partner2.nakshatraIndex ?? "14"), 10) || 0;
    const p1RashiIndex = parseInt(String(partner1.rashiIndex ?? "0"), 10) || 0;
    const p2RashiIndex = parseInt(String(partner2.rashiIndex ?? "6"), 10) || 0;

    const p1Name = String(partner1.name).trim();
    const p2Name = String(partner2.name).trim();

    const p1Rashi = RASHIS[p1RashiIndex] || RASHIS[0];
    const p2Rashi = RASHIS[p2RashiIndex] || RASHIS[6];
    const p1Nak = NAKSHATRAS[p1NakIndex] || NAKSHATRAS[0];
    const p2Nak = NAKSHATRAS[p2NakIndex] || NAKSHATRAS[14];

    // Mathematical Ashtakoot Milan Calculation
    const milanBreakdown = calculateAshtakootMilan(p1NakIndex, p2NakIndex, p1RashiIndex, p2RashiIndex);

    let aiNarrative = "";

    try {
      const { getGeminiClient, GEMINI_FLASH_MODEL } = await import("@/lib/gemini");
      const ai = getGeminiClient();

      const prompt = `You are Pandit Ji, an experienced, wise Vedic Astrologer providing a compassionate Kundli Milan (Compatibility) narrative for a couple.

PARTNER 1:
- Name: ${p1Name}
- Moon Sign (Rashi): ${p1Rashi}
- Nakshatra: ${p1Nak}

PARTNER 2:
- Name: ${p2Name}
- Moon Sign (Rashi): ${p2Rashi}
- Nakshatra: ${p2Nak}

ASHTAKOOT GUNA MILAN RESULTS:
- Total Gunas Obtained: ${milanBreakdown.totalScore} / 36 (${milanBreakdown.compatibilityVerdict})
- Varna: ${milanBreakdown.varna.obtained}/1
- Vashya: ${milanBreakdown.vashya.obtained}/2
- Tara: ${milanBreakdown.tara.obtained}/3
- Yoni: ${milanBreakdown.yoni.obtained}/4
- Graha Maitri: ${milanBreakdown.grahaMaitri.obtained}/5
- Gana: ${milanBreakdown.gana.obtained}/6
- Bhakoot: ${milanBreakdown.bhakoot.obtained}/7
- Nadi: ${milanBreakdown.nadi.obtained}/8

PROVIDE A STRUCTURED COMPASSIONATE VEDIC ASSESSMENT IN CLEAN MARKDOWN:
1. ### Divine Blessing & Overall Relationship Energy: Warm opening with a Sanskrit Shloka reflecting on their score of ${milanBreakdown.totalScore}/36.
2. ### Key Core Strengths: 2-3 bullet points on where their planetary energies harmonize effortlessly.
3. ### Growth Areas & Dynamics to Nurture: 1-2 points on where patience or mutual space is beneficial.
4. ### Sattvic Vedic Remedies for Lifelong Harmony (Upayas): 2-3 simple, positive, non-fearful remedies.
5. ### Closing Words of Pandit Ji: An uplifting, reassuring Vedic blessing.

Tone: Reassuring, sacred, realistic, and positive. Avoid fatalistic language.`;

      const response = await ai.models.generateContent({
        model: GEMINI_FLASH_MODEL,
        contents: prompt,
        config: {
          temperature: 0.7,
          maxOutputTokens: 1800,
        },
      });

      aiNarrative = response.text || "";
    } catch (aiErr) {
      console.warn("Gemini AI unavailable for Kundli Milan, using authentic Vedic fallback:", aiErr);
    }

    // If AI narrative failed or was empty, use our authentic fallback
    if (!aiNarrative || aiNarrative.trim().length === 0) {
      aiNarrative = generateFallbackCompatibilityNarrative(
        p1Name,
        p2Name,
        p1Rashi,
        p2Rashi,
        p1Nak,
        p2Nak,
        milanBreakdown
      );
    }

    return NextResponse.json({
      success: true,
      milanBreakdown,
      aiNarrative,
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error("Compatibility API Error:", errorMsg);
    return NextResponse.json({ success: false, error: "Failed to calculate compatibility." }, { status: 500 });
  }
}
