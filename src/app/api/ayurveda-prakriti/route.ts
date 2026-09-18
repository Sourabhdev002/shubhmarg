import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { name = "Seeker", bodyFrame = "Lean / Slender", digestionType = "Irregular / Variable Hunger", sleepPattern = "Light & Easily Disturbed", stressReaction = "Anxiety & Worry" } = await req.json();

    const { getGeminiClient, GEMINI_FLASH_MODEL } = await import("@/lib/gemini");
    const ai = getGeminiClient();

    const prompt = `You are a revered Vaidya and master of classical Ayurveda (Charaka Samhita, Sushruta Samhita) and Astro-Ayurveda (Vedic Doshic Jyotish).

SEEKER'S CONSTITUTIONAL ASSESSMENT:
- Seeker: ${name}
- Physical Frame & Structure: ${bodyFrame}
- Digestive Fire (Jatharagni): ${digestionType}
- Sleep Nature: ${sleepPattern}
- Emotional & Stress Temperament: ${stressReaction}

AYURVEDIC PRAKRITI ASSESSMENT:
1. **Primary & Secondary Dosha Determination**:
   - Determine the dominant constitution (e.g. Vata-Pitta, Pitta-Kapha, or Vata-Kapha).
   - Explain the elemental dominance (Air/Ether, Fire/Water, or Earth/Water).
2. **Current Doshic Imbalance (Vikriti)**:
   - Identify which Dosha is currently aggravated based on the symptoms.
3. **Planetary Astro-Ayurvedic Correlation**:
   - Relate their Doshic state to governing Navagrahas (e.g., Vata = Shani/Rahu, Pitta = Surya/Mangal, Kapha = Chandra/Guru/Shukra).
4. **Sattvic Dietary Guidance (Ahara)**:
   - Specific foods to embrace (Tastes: Sweet, Sour, Salty, Bitter, Pungent, Astringent).
   - Foods and beverages to minimize.
5. **Sacred Herbal Elixirs & Teas (Aushadhi)**:
   - Recommend 2-3 traditional herbs (e.g. Ashwagandha, Tulsi, Brahmi, Shatavari, Triphala) and preparation method.
6. **Vedic Dinacharya (Daily Routine) & Pandit Ji's Blessings**:
   - Morning ritual, ideal waking time, and a warm blessing for lifelong vitality (*Ayushya & Arogya*).

Tone: Sacred, nurturing, holistic, and deeply authentic. Clean Markdown.`;

    const response = await ai.models.generateContent({
      model: GEMINI_FLASH_MODEL,
      contents: prompt,
      config: {
        temperature: 0.7,
        maxOutputTokens: 2000,
      },
    });

    const report = response.text || "Ayurvedic Prakriti assessment generated successfully.";

    return NextResponse.json({
      success: true,
      report,
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error("Ayurveda Error:", errorMsg);
    return NextResponse.json({ success: false, error: "Failed to generate Ayurvedic assessment." }, { status: 500 });
  }
}
