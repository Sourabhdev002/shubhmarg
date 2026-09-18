import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const {
      name = "Seeker",
      physicalSymptom = "Fatigue & Low Stamina",
      emotionalState = "Anxiety & Overthinking",
      primaryBlock = "Career & Financial Confidence",
    } = await req.json();

    const { getGeminiClient, GEMINI_FLASH_MODEL } = await import("@/lib/gemini");
    const ai = getGeminiClient();

    const prompt = `You are a revered master of classical Vedic Kundalini Yoga and Subtle Energy Anatomy (Shat-Chakra Vidya).

SEEKER'S BIO-ENERGY PROFILE:
- Seeker: ${name}
- Primary Physical Indicator: ${physicalSymptom}
- Emotional Frequency: ${emotionalState}
- Core Life Blockage Area: ${primaryBlock}

7-CHAKRA & KUNDALINI DIAGNOSTIC:
1. **Primary Blocked Chakra Identification**:
   - Identify the most constrained energy vortex among the 7 (Muladhara, Swadhisthana, Manipura, Anahata, Vishuddha, Ajna, Sahasrara).
   - Explain its astrological governing planet (e.g. Muladhara = Shani/Mangal, Manipura = Surya, Anahata = Shukra, Vishuddha = Budha).
2. **Subtle Energy Flow & Prana Assessment**:
   - Describe how the Prana / Apana energy flow is currently interacting with their emotional and physical state.
3. **Sacred Beej Mantra & Sound Frequency Upaya**:
   - Exact Beej Mantra (e.g. LAM, VAM, RAM, YAM, HAM, AUM) with chanting count and vocal pitch.
4. **Pranayama & Yogic Mudra Prescription**:
   - Prescribe 1 specific mudra (e.g. Prithvi Mudra, Gyan Mudra, Surya Mudra) and 1 breathing technique (e.g. Anulom Vilom, Bhramari).
5. **Aura Shielding & Gemstone / Color Resonance**:
   - Optimal color to wear, incense (e.g. Sandalwood, Camphor), and grounding crystal.
6. **Pandit Ji's Concluding Blessings**: A warm, serene blessing.

Tone: Sacred, deeply perceptive, empowering, and authentic. Clean Markdown.`;

    const response = await ai.models.generateContent({
      model: GEMINI_FLASH_MODEL,
      contents: prompt,
      config: {
        temperature: 0.7,
        maxOutputTokens: 2000,
      },
    });

    const report = response.text || "Chakra energy assessment generated successfully.";

    return NextResponse.json({
      success: true,
      report,
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error("Chakra Scan Error:", errorMsg);
    return NextResponse.json({ success: false, error: "Failed to complete Chakra aura scan." }, { status: 500 });
  }
}
