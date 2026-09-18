import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase";
import { getWebhookSecret } from "@/lib/upi-config";
import crypto from "crypto";

export const dynamic = "force-dynamic";

function secretOk(provided: string | null): boolean {
  const expected = getWebhookSecret();
  if (!expected || !provided) return false;
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

/**
 * POST /api/wallet/topup-confirm
 * Called by the Gmail/webhook script when a UPI credit is detected.
 * Matches on exact amount → credits wallet atomically.
 *
 * Body: { amount: number, utr: string, payerVpa?: string }
 * Header: x-webhook-secret
 */
export async function POST(req: NextRequest) {
  if (!secretOk(req.headers.get("x-webhook-secret"))) {
    return NextResponse.json({ status: "unauthorized" }, { status: 401 });
  }

  let body: { amount?: number; utr?: string; payerVpa?: string };
  try { body = await req.json(); } catch { return NextResponse.json({ status: "error" }, { status: 400 }); }

  const amount = Number(body.amount);
  if (!amount || isNaN(amount) || amount <= 0) {
    return NextResponse.json({ status: "error", reason: "invalid_amount" }, { status: 400 });
  }
  const utr = (body.utr || "").trim() || null;

  // Find matching pending top-up by exact amount (NUMERIC(10,2) comparison)
  const { data: pendingTxs, error: txErr } = await supabaseServer
    .from("wallet_transactions")
    .select("id, user_id, amount_paise, topup_reference, topup_amount, status")
    .eq("type", "credit")
    .eq("status", "pending")
    .not("topup_reference", "is", null);

  if (txErr) return NextResponse.json({ status: "error", reason: txErr.message }, { status: 500 });

  // Duplicate check
  if (utr) {
    const dup = await supabaseServer
      .from("wallet_transactions")
      .select("id")
      .eq("topup_utr", utr)
      .maybeSingle();
    if (dup.data) return NextResponse.json({ status: "duplicate" });
  }

  const amtKey = amount.toFixed(2);
  const match = (pendingTxs ?? []).find(tx =>
    tx.topup_amount !== null && Number(tx.topup_amount).toFixed(2) === amtKey
  );

  if (!match) return NextResponse.json({ status: "no_match" });

  // Record the UTR first (best-effort; the credit itself is atomic below).
  if (utr) {
    await supabaseServer
      .from("wallet_transactions")
      .update({ topup_utr: utr })
      .eq("id", match.id);
  }

  // Credit the wallet atomically (single row-locked transaction in Postgres).
  const { data: newBalance, error: creditErr } = await supabaseServer
    .rpc("wallet_credit_topup", { p_tx_id: match.id });

  if (creditErr) {
    console.error("topup-confirm credit failed:", creditErr.message);
    return NextResponse.json({ status: "error", reason: creditErr.message }, { status: 500 });
  }

  return NextResponse.json({
    status: "credited",
    topup_reference: match.topup_reference,
    balance_paise: Number(newBalance),
  });
}
