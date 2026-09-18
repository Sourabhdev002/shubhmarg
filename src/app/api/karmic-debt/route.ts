import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { name = "Seeker", recurringHurdle = "Financial Outflow Despite Hard Work", gotra = "Kashyap", generationPattern = "Repeated in Family" } = await req.json();

    const { getGeminiClient, GEMINI_FLASH_MODEL } = await import("@/lib/gemini");
    const ai = getGeminiClient();

    const prompt = `You are a venerable master of classical Vedic Karma Shastra and Rinanubandhana Vidya (the sacred science of ancestral and cosmic karmic debts from the Garuda Purana and Parashara Hora Shastra).

SEEKER'S KARMIC INQUIRY:
- Name: ${name}
- Recurring Life Pattern / Hurdle: "${recurringHurdle}"
- Lineage / Gotra: ${gotra}
- Generational Occurrence: ${generationPattern}

VEDIC RINANUBANDHANA DIAGNOSTIC:
1. **Identification of Active Karmic Debt (Rina)**:
   - Identify which of the 4 primordial debts is primarily linked to this pattern:
     * **Pitru Rina (Ancestral Lineage Debt)**: Obstacles in lineage, progeny, or family stability.
     * **Deva Rina (Cosmic & Nature Debt)**: Unsettled gratitude to natural forces and deities.
     * **Rishi Rina (Wisdom & Guru Debt)**: Neglect of sacred knowledge or teacher vows.
     * **Manushya Rina (Social & Compassion Debt)**: Unpaid societal assistance or unfulfilled charity.
2. **Astrological Planetary Signatures**:
   - Explain the planetary influences involved (e.g. Surya-Rahu/Shani conjunctions for Pitru Rina, Ketu in 8th/9th house, 5th house afflictions).
3. **Compassionate, Non-Fearful Karmic Neutralization (Upayas)**:
   - **Annadanam (Sacred Feeding)**: Feeding cows, crows, or fish on specific days.
   - **Vriksha Ropana (Tree Consecration)**: Planting or watering sacred Peepal, Banyan, or Neem trees.
   - **Pavitra Jal Arghya**: Offering morning water to Surya Dev with Gayatri Mantra.
4. **Pandit Ji's Concluding Blessings**: A warm, uplifting blessing for peace of the ancestors (*Pitru Shanti*) and liberation of the family lineage.

Tone: Deeply sacred, compassionate, liberating, non-fearful, and authentic. Clean Markdown.`;

    const response = await ai.models.generateContent({
      model: GEMINI_FLASH_MODEL,
      contents: prompt,
      config: {
        temperature: 0.7,
        maxOutputTokens: 2000,
      },
    });

    const report = response.text || "Karmic debt diagnostic generated successfully.";

    return NextResponse.json({
      success: true,
      report,
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error("Karmic Debt Error:", errorMsg);
    return NextResponse.json({ success: false, error: "Failed to generate karmic debt diagnostic." }, { status: 500 });
  }
}
