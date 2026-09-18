import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { imageBase64, mimeType = "image/jpeg", dominantHand = "Right Hand", gender = "Male", age = "25-35" } = await req.json();

    if (!imageBase64) {
      return NextResponse.json({ success: false, error: "Palm image data is required." }, { status: 400 });
    }

    const { getGeminiClient, GEMINI_FLASH_MODEL } = await import("@/lib/gemini");
    const ai = getGeminiClient();

    const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, "");

    const prompt = `You are an expert master of classical Vedic Samudrika Shastra (traditional Indian Palmistry and Hand Energy science).
Analyze this palm image meticulously according to authentic ancient Samudrika principles.

Seeker Details:
- Dominant Hand: ${dominantHand}
- Gender: ${gender}
- Age Group: ${age}

Perform a profound and structured Samudrika Shastra reading:
1. **Palm Structure & Elemental Constitution**:
   - Palm shape (Earth/Water/Fire/Air), texture, and thumb will/logic alignment.
2. **Analysis of the Three Sacred Main Lines**:
   - **Jeevan Rekha (Life / Vitality Line)**: Vital energy flow, endurance, and longevity indicators.
   - **Mastishk Rekha (Head / Intellect Line)**: Mental focus, creativity, analytical depth, and decision-making clarity.
   - **Hriday Rekha (Heart / Emotional Line)**: Emotional nature, devotion, relationships, and compassion.
3. **Key Planetary Mounts (Graha Parvatas)**:
   - **Guru Parvata (Jupiter Mount - Under Index Finger)**: Leadership, ambition, and spiritual wisdom.
   - **Shukra Parvata (Venus Mount - Base of Thumb)**: Vitality, artistic passion, and marital harmony.
   - **Shani & Surya Parvatas (Saturn & Sun Mounts)**: Career stability and recognition.
4. **Natural Strengths & Auspicious Signs**: 2-3 prominent positive gifts and career inclinations.
5. **Practical Sattvic Remedies & Energy Balancers (Upayas)**: 2-3 traditional remedies (e.g. specific finger rings, hand mudras like Gyan/Prana Mudra, sacred affirmations).
6. **Pandit Ji's Concluding Blessings**: A warm, reassuring Vedic blessing.

Tone: Sacred, wise, compassionate, non-fearful, and deeply empowering. Format in clean, elegant Markdown.`;

    const response = await ai.models.generateContent({
      model: GEMINI_FLASH_MODEL,
      contents: [
        {
          role: "user",
          parts: [
            {
              inlineData: {
                data: cleanBase64,
                mimeType,
              },
            },
            {
              text: prompt,
            },
          ],
        },
      ],
      config: {
        temperature: 0.7,
        maxOutputTokens: 2200,
      },
    });

    const analysis = response.text || "Unable to complete palm scan analysis.";
    return NextResponse.json({ success: true, analysis });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error("Palm Scan Error:", errorMsg);
    return NextResponse.json({ success: false, error: "Palm analysis failed. Please try again with a clearer image." }, { status: 500 });
  }
}
