import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { name, dob, tob, place } = await req.json();
    if (!name || !dob || !place) {
      return NextResponse.json({ error: "Name, DOB, and place are required" }, { status: 400 });
    }

    const { getGeminiClient, GEMINI_FLASH_MODEL } = await import("@/lib/gemini");
    const ai = getGeminiClient();

    const prompt = `You are an expert Vedic astrologer. Based on the following birth details, provide a SHORT 3-4 line general Vedic birth chart summary. Keep it intriguing so the person wants a full detailed reading.

Birth Details:
- Name: ${name}
- Date of Birth: ${dob}
- Time of Birth: ${tob || "Unknown"}
- Place of Birth: ${place}

Rules:
- Write exactly 3-4 lines, no more
- Mention their likely Rashi (moon sign) or Lagna based on DOB
- Give one positive trait and one area of attention
- End with something like "A detailed reading would reveal much more about your specific path..."
- Write in warm, respectful tone
- If time is unknown, mention general tendencies based on date only
- Do NOT make medical/legal predictions
- Keep it positive but honest`;

    const response = await ai.models.generateContent({
      model: GEMINI_FLASH_MODEL,
      contents: prompt,
    });

    const reading = response.text || "Unable to generate reading. Please try again.";

    // Save lead to database (non-blocking)
    try {
      const { supabaseServer } = await import("@/lib/supabase");
      const freeRefId = "FREE-" + Math.random().toString(36).substring(2, 8).toUpperCase();
      await supabaseServer.from("guidance_requests").insert([{
        reference_id: freeRefId,
        concern: 'General Guidance',
        full_name: name.trim(),
        email: 'free-reading@shubhmarg.com',
        date_of_birth: dob,
        birth_place: place.trim(),
        current_city: place.trim(),
        preferred_language: 'Hindi',
        privacy_consent: true,
        service: 'free-reading',
        payment_amount: 0,
        payment_currency: 'INR',
        payment_status: 'free',
        question: `DOB: ${dob}, TOB: ${tob || "N/A"}, Place: ${place}`,
      }]);
    } catch {}

    return NextResponse.json({ reading });
  } catch (err) {
    console.error("Free reading error:", err);
    return NextResponse.json({ error: "Could not generate reading. Please try again." }, { status: 200 });
  }
}