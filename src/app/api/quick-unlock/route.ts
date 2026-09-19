import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase";
import { sendTopupAlert } from "@/lib/telegram";
import { getGeminiClient, GEMINI_FLASH_MODEL } from "@/lib/gemini";

export const dynamic = "force-dynamic";

// Generate a REAL, warm, personalized daily blessing via Gemini (instant, free).
async function generateBlessing(rashiKey: string, rashiEn: string): Promise<string> {
  try {
    const ai = getGeminiClient();
    const today = new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" });
    const prompt =
      "You are a warm, wise Vedic astrologer at ShubhMarg. Write a SHORT personal daily guidance " +
      "for the " + rashiKey + " (" + rashiEn + ") moon-sign for " + today + ". " +
      "3-4 sentences, in warm Hinglish (Hindi in Roman script mixed with simple English). " +
      "Cover: today's energy, one practical action, and one gentle remedy or shubh advice. " +
      "Be specific and caring, not generic. No preamble, just the guidance. Do not use markdown.";
    const res = await ai.models.generateContent({
      model: GEMINI_FLASH_MODEL,
      contents: prompt,
    });
    const text = (res.text || "").trim();
    if (text) return text;
  } catch (e) {
    console.warn("blessing gen fallback:", e);
  }
  // Fallback if Gemini unavailable
  return "Aaj aapke liye shubh din hai. Ek rukA hua kaam aage badhega. Subah surya ko jal arpit karein aur apne isht dev ka smaran karein - din mangalmay rahega.";
}

// POST /api/quick-unlock
// FAST tripwire: no login, no UTR. Pay UPI QR, tap "I've Paid", get REAL guidance instantly.
export async function POST(req: NextRequest) {
  let body: { product?: string; rashi?: string; rashiEn?: string; name?: string; phone?: string; amount?: number };
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid body" }, { status: 400 }); }

  const product = (body.product || "aaj-ka-aashirwad").trim();
  const amount = Number(body.amount) || 11;
  const rashi = (body.rashi || "").trim();
  const rashiEn = (body.rashiEn || "").trim();
  const name = (body.name || "").trim();
  const phone = (body.phone || "").trim();

  const ref = "QK-" + Date.now().toString(36).toUpperCase() + Math.random().toString(36).slice(2, 5).toUpperCase();

  // Generate the real personalized blessing.
  const blessing = await generateBlessing(rashi || "Mesh", rashiEn || "Aries");

  // Log (best-effort).
  try {
    await supabaseServer.from("quick_unlocks").insert({
      reference_id: ref, product, rashi: rashi || null,
      customer_name: name || null, customer_phone: phone || null,
      amount, status: "claimed",
    });
  } catch (e) { console.warn("quick-unlock log skipped:", e); }

  // Alert owner on Telegram to verify the payment on Paytm.
  try {
    await sendTopupAlert({
      txId: ref, amountInr: amount, exactAmount: amount,
      phone: phone || name || "guest",
      topupReference: ref + " (" + product + (rashi ? ", " + rashi : "") + ")",
      utr: null,
    });
  } catch (e) { console.warn("quick-unlock telegram skipped:", e); }

  return NextResponse.json({ success: true, reference: ref, blessing });
}
