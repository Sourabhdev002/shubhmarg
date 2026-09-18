import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { imageBase64, mimeType = "image/jpeg", spaceType = "Home / Living Space", mainEntranceFacing = "North" } = await req.json();

    if (!imageBase64) {
      return NextResponse.json({ success: false, error: "Image data is required." }, { status: 400 });
    }

    const { getGeminiClient, GEMINI_FLASH_MODEL } = await import("@/lib/gemini");
    const ai = getGeminiClient();

    // Clean base64 string
    const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, "");

    const prompt = `You are an expert master of authentic Vedic Vastu Shastra.
Analyze this floor plan / interior space image meticulously according to traditional Vastu Vidya.

Space Type: ${spaceType}
Main Entrance Facing: ${mainEntranceFacing}

Perform an in-depth Vastu Energy Assessment:
1. **Overall Vastu Harmony Score**: An integer score between 50 and 98.
2. **Directional Energy Breakdown**:
   - **Ishan (North-East / Water & Divine Energy)**: Assessment of clarity and openness.
   - **Agneya (South-East / Fire & Vitality)**: Kitchen/appliances/energy placement.
   - **Nairutya (South-West / Earth & Stability)**: Master bedroom/heavy structures/load stability.
   - **Vayavya (North-West / Air & Movement)**: Guest/circulation/flow.
   - **Brahmasthan (Center / Space & Cosmic Core)**: Openness and balance.
3. **Key Identified Architectural Blockages (Doshas)**: 2-3 specific observations.
4. **Actionable Sattvic Remedies (Upayas)**: 3-4 practical non-demolition remedies (e.g. specific metal pyramids, indoor plants like Tulsi/Areca, copper wire grounding, warm lighting, mirror orientation).
5. **Pandit Ji's Concluding Blessings**: A warm, reassuring Vedic summary.

Format your output in clean, elegant Markdown with clear headings and bullet points.`;

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
        maxOutputTokens: 2000,
      },
    });

    const analysis = response.text || "Unable to complete Vastu scan.";
    return NextResponse.json({ success: true, analysis });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error("Vastu Scan Error:", errorMsg);
    return NextResponse.json({ success: false, error: "Vastu scan failed. Please try again with a clearer image." }, { status: 500 });
  }
}
