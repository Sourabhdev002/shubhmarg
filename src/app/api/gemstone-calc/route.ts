import { NextRequest, NextResponse } from "next/server";
import { LAGNA_GEMSTONES } from "@/lib/gemstones";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { name = "Seeker", lagna = "Mesha (Aries)", currentConcern = "General Prosperity & Health" } = await req.json();

    const recommendation = LAGNA_GEMSTONES[lagna] || LAGNA_GEMSTONES["Mesha (Aries)"];

    const { getGeminiClient, GEMINI_FLASH_MODEL } = await import("@/lib/gemini");
    const ai = getGeminiClient();

    const prompt = `You are Pandit Ji, an expert in classical Vedic Ratna Vidya (Gemstone Astrology) and Rudraksha therapy.

SEEKER DETAILS:
- Name: ${name}
- Ascendant (Lagna): ${lagna}
- Primary Concern: ${currentConcern}

ASTROLOGICAL GEMSTONE DATA:
- Life Stone (Lagna Lord): ${recommendation.lifeStone.name} (${recommendation.lifeStone.sanskritName}) for ${recommendation.lifeStone.planet}
- Lucky Stone (9th Bhagya Lord): ${recommendation.luckyStone.name} (${recommendation.luckyStone.sanskritName}) for ${recommendation.luckyStone.planet}
- Career/Karmic Stone: ${recommendation.careerStone.name} (${recommendation.careerStone.sanskritName}) for ${recommendation.careerStone.planet}
- Strictly Inimical / Avoid Stones: ${recommendation.strictlyAvoid.join(", ")}
- Recommended Rudraksha: ${recommendation.recommendedRudraksha.mukhi} (${recommendation.recommendedRudraksha.deity})
- Recommended Metal: ${recommendation.metal}
- Proper Finger: ${recommendation.finger}
- Prana Pratishtha Day: ${recommendation.pranaPratishthaDay}

Provide a structured, compassionate Vedic Gemstone Guidance summary:
1. **Divine Opening & Lagna Planetary Alignment**: Warm blessing acknowledging their ${lagna} ascendant.
2. **Primary Gemstone Synthesis**: Explain why ${recommendation.luckyStone.name} and ${recommendation.lifeStone.name} are supremely auspicious for them.
3. **Crucial Warning on Maraka Stones**: Clear explanation on why they must strictly avoid ${recommendation.strictlyAvoid.join(", ")}.
4. **Sacred Prana Pratishtha & Energization Ritual**: Step-by-step guidance on purifying the gemstone (Ganga Jal, Raw Milk, Panchamrit, Mantra recitation) before wearing on ${recommendation.pranaPratishthaDay}.
5. **Pandit Ji's Concluding Blessings**: A warm, reassuring blessing.

Tone: Sacred, authoritative, non-fearful, and deeply authentic. Clean Markdown.`;

    const response = await ai.models.generateContent({
      model: GEMINI_FLASH_MODEL,
      contents: prompt,
      config: {
        temperature: 0.7,
        maxOutputTokens: 1800,
      },
    });

    const aiGuidance = response.text || "Gemstone recommendation generated successfully.";

    return NextResponse.json({
      success: true,
      recommendation,
      aiGuidance,
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error("Gemstone Calc Error:", errorMsg);
    return NextResponse.json({ success: false, error: "Failed to calculate gemstone recommendations." }, { status: 500 });
  }
}
