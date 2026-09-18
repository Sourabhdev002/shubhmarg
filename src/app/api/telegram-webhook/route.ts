import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase";
import { verifyTelegramSecret, answerCallback, editMessage } from "@/lib/telegram";

export const dynamic = "force-dynamic";

/**
 * POST /api/telegram-webhook
 * Telegram calls this when the owner taps Approve / Reject on a top-up alert.
 * callback_data is "approve:<txId>" or "reject:<txId>".
 */
export async function POST(req: NextRequest) {
  // Verify Telegram's secret header
  if (!verifyTelegramSecret(req.headers.get("x-telegram-bot-api-secret-token"))) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  let update: {
    callback_query?: {
      id: string;
      data?: string;
      message?: { message_id: number; chat: { id: number } };
    };
  };
  try { update = await req.json(); } catch { return NextResponse.json({ ok: true }); }

  const cb = update.callback_query;
  if (!cb || !cb.data) return NextResponse.json({ ok: true });

  const [action, txId] = cb.data.split(":");
  const chatId = cb.message?.chat.id;
  const messageId = cb.message?.message_id;

  // Load the transaction
  const { data: tx } = await supabaseServer
    .from("wallet_transactions")
    .select("id, user_id, status, amount_paise, topup_reference")
    .eq("id", txId)
    .single();

  if (!tx) {
    await answerCallback(cb.id, "Transaction not found");
    return NextResponse.json({ ok: true });
  }

  // Already handled? (idempotent — prevents double-credit on double-tap)
  if (tx.status !== "pending") {
    await answerCallback(cb.id, `Already ${tx.status}`);
    return NextResponse.json({ ok: true });
  }

  const amountInr = Math.round(tx.amount_paise / 100);

  // ── APPROVE → credit the wallet (single atomic transaction) ──
  if (action === "approve") {
    const { data: newBalance, error: creditErr } = await supabaseServer
      .rpc("wallet_credit_topup", { p_tx_id: tx.id });

    if (creditErr) {
      console.error("telegram-webhook approve failed:", creditErr.message);
      await answerCallback(cb.id, "Failed — please retry");
      return NextResponse.json({ ok: true });
    }

    await answerCallback(cb.id, `✅ Credited ₹${amountInr}`);
    if (chatId && messageId) {
      await editMessage(chatId, messageId,
        `✅ *APPROVED*\n\nCredited *₹${amountInr}* to wallet.\nRef: \`${tx.topup_reference}\`\nNew balance: *₹${(Number(newBalance) / 100).toFixed(2)}*`);
    }
    return NextResponse.json({ ok: true });
  }

  // ── REJECT → mark failed ──
  if (action === "reject") {
    await supabaseServer
      .from("wallet_transactions")
      .update({ status: "failed" })
      .eq("id", tx.id)
      .eq("status", "pending");

    await answerCallback(cb.id, "❌ Rejected");
    if (chatId && messageId) {
      await editMessage(chatId, messageId,
        `❌ *REJECTED*\n\nTop-up of *₹${amountInr}* was not credited.\nRef: \`${tx.topup_reference}\`\nThe customer will be told the payment was not received.`);
    }
    return NextResponse.json({ ok: true });
  }

  await answerCallback(cb.id, "Unknown action");
  return NextResponse.json({ ok: true });
}
