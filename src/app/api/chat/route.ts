import { NextRequest, NextResponse } from "next/server";
import { getGuide } from "@/lib/guides";

// Force runtime-only — never pre-render at build time
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { messages, guideId } = await req.json();
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const guide = getGuide(guideId);

    const { getGeminiClient, GEMINI_FLASH_MODEL } = await import("@/lib/gemini");
    const ai = getGeminiClient();

    // Map conversation history to Gemini format (user vs model)
    const contents = messages.slice(-12).map((m: { role: string; content: string }) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const response = await ai.models.generateContent({
      model: GEMINI_FLASH_MODEL,
      contents,
      config: {
        systemInstruction: guide.systemPrompt,
        temperature: 0.8,
        maxOutputTokens: 800,
      },
    });

    const reply = response.text ?? "Namaste. Kripya dobara poochiye.";
    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Chat error:", err);
    return NextResponse.json({
      reply: "Namaste. Abhi thoda technical issue aa gaya. Kripya shubhmarg.com/support pe likhein."
    }, { status: 200 });
  }
}