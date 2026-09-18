import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { question, prashnaNumber = 108, name = "Seeker", city = "New Delhi" } = await req.json();

    if (!question || question.trim().length < 3) {
      return NextResponse.json({ success: false, error: "Please enter your specific question." }, { status: 400 });
    }

    const num = parseInt(prashnaNumber, 10);
    const now = new Date();

    const { getGeminiClient, GEMINI_FLASH_MODEL } = await import("@/lib/gemini");
    const ai = getGeminiClient();

    const prompt = `You are Pandit Ji, a master of classical Vedic Prashna Shastra (Horary Question Astrology) following traditional Parashari & Krishnamurti principles.

PRASHNA INQUIRY DETAILS:
- Seeker Name: ${name}
- Question Asked: "${question}"
- Sacred Prashna Seed Number: ${num} (out of 249 sub-divisions)
- Moment of Inquiry: ${now.toISOString()}
- Location of Query: ${city}

PRASHNA KUNDLI ASSESSMENT:
1. **Divine Prashna Lagna & Horary Alignment**: Interpret the energy of seed number ${num} and the current celestial epoch.
2. **Direct Clear Verdict on the Question**: Give an honest, compassionate, direct answer to the seeker's question ("${question}").
3. **Timeline & Manifestation Phase**: When can favorable shifts or outcomes be expected (e.g. 2 to 4 weeks, upcoming transit, Shukla Paksha window).
4. **Key Cautionary & Actionable Advice**: What should the seeker do or avoid right now to ensure success?
5. **Sacred Prashna Upaya (Remedy)**: 1-2 simple, positive Vedic remedies to remove any planetary friction.
6. **Pandit Ji's Concluding Blessings**: A warm, reassuring blessing.

Tone: Direct, wise, encouraging, and authentic. Clean Markdown.`;

    const response = await ai.models.generateContent({
      model: GEMINI_FLASH_MODEL,
      contents: prompt,
      config: {
        temperature: 0.7,
        maxOutputTokens: 2000,
      },
    });

    const reading = response.text || "Prashna reading calculated successfully.";

    return NextResponse.json({
      success: true,
      prashnaNumber: num,
      timeOfQuery: now.toLocaleTimeString("en-IN"),
      reading,
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error("Prashna Error:", errorMsg);
    return NextResponse.json({ success: false, error: "Failed to cast Prashna Kundli. Please try again." }, { status: 500 });
  }
}
