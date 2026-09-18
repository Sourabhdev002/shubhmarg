import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServer } from "@/lib/supabase-server";
import { supabaseServer } from "@/lib/supabase";
import { sendTopupAlert } from "@/lib/telegram";

export const dynamic = "force-dynamic";

/**
 * POST /api/wallet/topup-claim
 * Called when the customer taps "I have paid".
 * Marks the pending top-up as claimed and pings the owner on Telegram
 * with Approve/Reject buttons. Does NOT credit the wallet — the owner decides.
 *
 * Body: { topup_reference: string, utr?: string }
 */
export async function POST(req: NextRequest) {
  const supabase = await createSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: { topup_reference?: string; utr?: string };
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid body" }, { status: 400 }); }

  const ref = (body.topup_reference ?? "").trim();
  if (!ref) return NextResponse.json({ error: "topup_reference required" }, { status: 400 });
  const utr = (body.utr ?? "").trim() || null;

  // Load the pending top-up (must belong to this user)
  const { data: tx, error } = await supabaseServer
    .from("wallet_transactions")
    .select("id, user_id, status, amount_paise, topup_amount, topup_reference")
    .eq("topup_reference", ref)
    .eq("user_id", user.id)
    .single();

  if (error || !tx) return NextResponse.json({ error: "Top-up not found" }, { status: 404 });
  if (tx.status === "completed") return NextResponse.json({ error: "Already credited" }, { status: 409 });

  // Record the UTR (if given) and keep status pending — owner will approve.
  await supabaseServer
    .from("wallet_transactions")
    .update({ topup_utr: utr })
    .eq("id", tx.id);

  // Ping owner on Telegram
  await sendTopupAlert({
    txId: tx.id,
    amountInr: Math.round(tx.amount_paise / 100),
    exactAmount: Number(tx.topup_amount),
    phone: user.phone ?? user.email ?? "unknown",
    topupReference: tx.topup_reference!,
    utr,
  });

  return NextResponse.json({ success: true, status: "pending_approval" });
}
