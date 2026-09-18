import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { nameType = "Baby Name (Namkaran)", candidateName = "Aarav", nakshatra = "Ashwini", dob = "2026-08-30" } = await req.json();

    const { getGeminiClient, GEMINI_FLASH_MODEL } = await import("@/lib/gemini");
    const ai = getGeminiClient();

    const prompt = `You are Pandit Ji, an expert in Vedic Namkaran Sanskar (Sacred Naming Science) and Chaldean sound numerology.

NAMING INQUIRY:
- Purpose: ${nameType}
- Candidate Name / Current Brand Name: "${candidateName}"
- Birth Nakshatra / Inception Star: ${nakshatra}
- Date: ${dob}

VEDIC NAMING ASSESSMENT:
1. **Auspicious Syllable (Akshara) Alignment**:
   - List the 4 sacred starting sounds (Padas 1, 2, 3, 4) for ${nakshatra} (e.g. Chu, Che, Cho, La for Ashwini).
   - Evaluate if the candidate name "${candidateName}" matches the cosmic sound vibration.
2. **Chaldean & Vedic Sound Numerology**:
   - Calculate compound number and single root number (1-9) for "${candidateName}".
   - Explain its planetary ruler (e.g., Number 1 = Surya, 5 = Budha, 6 = Shukra).
3. **5 Curated Auspicious Alternative Name Suggestions**:
   - Provide 5 highly auspicious, modern yet traditional name suggestions starting with the ideal Nakshatra syllables along with their profound meanings.
4. **Vedic Namkaran Sanskar Blessing**:
   - Auspicious day, mantra chanting, and sacred dedication prayer.

Tone: Sacred, inspiring, joyful, and authentic. Clean Markdown.`;

    const response = await ai.models.generateContent({
      model: GEMINI_FLASH_MODEL,
      contents: prompt,
      config: {
        temperature: 0.7,
        maxOutputTokens: 2000,
      },
    });

    const report = response.text || "Name calculation report generated successfully.";

    return NextResponse.json({
      success: true,
      report,
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error("Name Calc Error:", errorMsg);
    return NextResponse.json({ success: false, error: "Failed to calculate Vedic naming report." }, { status: 500 });
  }
}
