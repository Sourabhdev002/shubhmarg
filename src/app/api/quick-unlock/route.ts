import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase";
import { sendTopupAlert } from "@/lib/telegram";

export const dynamic = "force-dynamic";

// POST /api/quick-unlock
// FAST tripwire: no login, no UTR. Customer pays UPI QR, taps "I've Paid",
// content unlocks instantly. Owner gets a Telegram alert to verify on Paytm.
// Body: { product, rashi?, name?, phone?, amount? }
export async function POST(req: NextRequest) {
  let body: { product?: string; rashi?: string; name?: string; phone?: string; amount?: number };
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid body" }, { status: 400 }); }

  const product = (body.product || "aaj-ka-aashirwad").trim();
  const amount = Number(body.amount) || 11;
  const rashi = (body.rashi || "").trim();
  const name = (body.name || "").trim();
  const phone = (body.phone || "").trim();

  const ref = "QK-" + Date.now().toString(36).toUpperCase() + Math.random().toString(36).slice(2, 5).toUpperCase();

  // Log the claim (best-effort; never block delivery).
  try {
    await supabaseServer.from("quick_unlocks").insert({
      reference_id: ref,
      product,
      rashi: rashi || null,
      customer_name: name || null,
      customer_phone: phone || null,
      amount,
      status: "claimed",
    });
  } catch (e) {
    console.warn("quick-unlock log skipped:", e);
  }

  // Alert owner on Telegram to verify the payment came into Paytm.
  try {
    await sendTopupAlert({
      txId: ref,
      amountInr: amount,
      exactAmount: amount,
      phone: phone || name || "guest",
      topupReference: `${ref} (${product}${rashi ? ", " + rashi : ""})`,
      utr: null,
    });
  } catch (e) {
    console.warn("quick-unlock telegram skipped:", e);
  }

  return NextResponse.json({ success: true, reference: ref });
}
