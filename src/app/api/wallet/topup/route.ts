import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServer } from "@/lib/supabase-server";
import { supabaseServer } from "@/lib/supabase";
import { getUpiVpa, getUpiPayeeName } from "@/lib/upi-config";

export const dynamic = "force-dynamic";

// Allowed top-up range (rupees). Must stay in sync with the TopupDrawer UI.
const MIN_TOPUP_INR = 100;
const MAX_TOPUP_INR = 5000;

function generateTopupRef(): string {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `TUP-${ts}-${rand}`;
}

/** POST /api/wallet/topup — create a pending top-up transaction and return UPI details */
export async function POST(req: NextRequest) {
  const supabase = await createSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: { amount: number };
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid body" }, { status: 400 }); }

  const amount = Number(body.amount);
  // Whole rupees only, within the allowed range. Matches the UI (₹100–₹5,000).
  if (!Number.isInteger(amount) || amount < MIN_TOPUP_INR || amount > MAX_TOPUP_INR) {
    return NextResponse.json(
      { error: `Enter a whole amount between ₹${MIN_TOPUP_INR} and ₹${MAX_TOPUP_INR.toLocaleString("en-IN")}` },
      { status: 400 }
    );
  }

  const topupReference = generateTopupRef();
  // Use a unique paise suffix for exact-amount matching (amount + 0.07 etc)
  // We use the last 2 digits of user id hash as paise offset (1-99 range)
  const paiseOffset = (parseInt(user.id.replace(/-/g, "").slice(-4), 16) % 99) + 1;
  const exactAmount = amount + paiseOffset / 100; // e.g. 500.43

  // Create pending transaction
  const { data: tx, error } = await supabaseServer
    .from("wallet_transactions")
    .insert({
      user_id: user.id,
      type: "credit",
      status: "pending",
      amount_paise: amount * 100,
      description: `Wallet top-up ₹${amount}`,
      topup_reference: topupReference,
      topup_amount: exactAmount,
    })
    .select("id, topup_reference, topup_amount")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const upiVpa = getUpiVpa();
  const payeeName = getUpiPayeeName();
  const upiUri = `upi://pay?pa=${upiVpa}&pn=${encodeURIComponent(payeeName)}&am=${exactAmount.toFixed(2)}&cu=INR&tn=${encodeURIComponent("ShubhMarg Wallet " + topupReference)}`;

  return NextResponse.json({
    topup_reference: tx.topup_reference,
    amount_inr: amount,
    exact_amount: exactAmount,
    upi_vpa: upiVpa,
    payee_name: payeeName,
    upi_uri: upiUri,
    tx_id: tx.id,
  });
}
