import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { dreamText, prahara = "Last Quarter of Night (Brahma Muhurta / 3 AM - 6 AM)", emotion = "Curious & Serene" } = await req.json();

    if (!dreamText || dreamText.trim().length < 3) {
      return NextResponse.json({ success: false, error: "Please describe what you saw in your dream." }, { status: 400 });
    }

    const { getGeminiClient, GEMINI_FLASH_MODEL } = await import("@/lib/gemini");
    const ai = getGeminiClient();

    const prompt = `You are an enlightened master of classical Vedic Swapna Shastra (the sacred science of dreams from the Agni Purana, Brihat Samhita, and Atharva Veda Parisista).

SEEKER'S DREAM REPORT:
- Dream Vision: "${dreamText}"
- Time / Prahara of Dream: ${prahara}
- Emotional State upon Waking: ${emotion}

VEDIC SWAPNA SHASTRA DECODING:
1. **Sacred Vedic Symbolism (Swapna Lakshana)**:
   - Break down the core symbols seen in the dream (e.g. animals, water, flying, fire, temples, trees) and their classical Purana meanings.
2. **Manifestation Window (Kala Phala)**:
   - Based on the ${prahara}, calculate when this dream's effects typically manifest (e.g., dreams in Brahma Muhurta manifest within 10 days to a month).
3. **Spiritual & Material Significance**:
   - Is this an auspicious omen (Shubha Swapna) or a cautionary indicator (Ashubha Swapna)?
   - Explain what shifts in career, wealth, relationships, or inner health it foretells.
4. **Vedic Shanti Mantra & Pacification Upaya**:
   - Provide 1 specific Vedic Shanti Mantra (with Sanskrit and English meaning) or a simple sattvic ritual (e.g. offering water to Surya Dev, chanting Mahamrityunjaya) to neutralize any negative omen or amplify the blessings.
5. **Pandit Ji's Concluding Blessings**: A warm, reassuring Vedic blessing.

Tone: Sacred, deeply perceptive, comforting, non-fearful, and traditional. Clean Markdown.`;

    const response = await ai.models.generateContent({
      model: GEMINI_FLASH_MODEL,
      contents: prompt,
      config: {
        temperature: 0.7,
        maxOutputTokens: 2000,
      },
    });

    const decoding = response.text || "Dream decoded successfully according to Swapna Shastra.";

    return NextResponse.json({
      success: true,
      decoding,
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error("Dream Decode Error:", errorMsg);
    return NextResponse.json({ success: false, error: "Failed to decode dream. Please try again." }, { status: 500 });
  }
}
