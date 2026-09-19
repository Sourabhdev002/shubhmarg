import "server-only";

/**
 * Telegram bot helper — sends wallet top-up alerts to the owner
 * with one-tap Approve / Reject inline buttons.
 *
 * Setup:
 *  1. Message @BotFather on Telegram → /newbot → get TELEGRAM_BOT_TOKEN
 *  2. Message your new bot once, then visit
 *     https://api.telegram.org/bot<TOKEN>/getUpdates to find your chat id
 *  3. Set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in env
 *  4. Set the webhook (one-time):
 *     https://api.telegram.org/bot<TOKEN>/setWebhook?url=https://YOURSITE/api/telegram-webhook&secret_token=<TELEGRAM_WEBHOOK_SECRET>
 */

const TG_API = "https://api.telegram.org";

function botToken(): string { return process.env.TELEGRAM_BOT_TOKEN || ""; }
function chatId(): string { return process.env.TELEGRAM_CHAT_ID || ""; }

export function telegramConfigured(): boolean {
  return Boolean(botToken() && chatId());
}

/** Verify the secret token Telegram sends with each webhook call. */
export function verifyTelegramSecret(provided: string | null): boolean {
  const expected = process.env.TELEGRAM_WEBHOOK_SECRET || "";
  // Fail CLOSED in production: an unset secret must never allow unauthenticated
  // callers to approve/reject wallet top-ups. Only relax the check in dev.
  if (!expected) return process.env.NODE_ENV !== "production";
  if (!provided) return false;
  return provided === expected;
}

interface TopupAlert {
  txId: string;
  amountInr: number;
  exactAmount: number;
  phone: string;
  topupReference: string;
  utr?: string | null;
}

/** Send the "new top-up pending" message with Approve / Reject buttons. */
export async function sendTopupAlert(alert: TopupAlert): Promise<boolean> {
  if (!telegramConfigured()) {
    console.warn("Telegram not configured — skipping top-up alert");
    return false;
  }

  const text =
    `🔔 *Wallet Top-Up Pending*\n\n` +
    `💰 Amount: *₹${alert.amountInr}*\n` +
    `🎯 Exact paid: *₹${alert.exactAmount.toFixed(2)}*\n` +
    `📱 User: \`${alert.phone}\`\n` +
    `🔖 Ref: \`${alert.topupReference}\`\n` +
    (alert.utr ? `🧾 UTR: \`${alert.utr}\`\n` : "") +
    `\n_Check your Paytm/bank app, then tap below._`;

  const body = {
    chat_id: chatId(),
    text,
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [[
        { text: "✅ Approve & Credit", callback_data: `approve:${alert.txId}` },
        { text: "❌ Reject", callback_data: `reject:${alert.txId}` },
      ]],
    },
  };

  try {
    const res = await fetch(`${TG_API}/bot${botToken()}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return res.ok;
  } catch (e) {
    console.error("Telegram sendTopupAlert failed:", e);
    return false;
  }
}

/** Simple info-only alert for Rs11 quick-unlocks (no Approve button - content already delivered). */
export async function sendQuickUnlockAlert(info: { amountInr: number; product: string; rashi?: string | null; ref: string; }): Promise<boolean> {
  if (!telegramConfigured()) return false;
  const text =
    "\ud83d\udcb0 *New Payment Received* (verify on Paytm)\n\n" +
    "\ud83e\ude94 Product: *" + info.product + "*\n" +
    (info.rashi ? "\u2648 Rashi: *" + info.rashi + "*\n" : "") +
    "\ud83d\udcb5 Amount: *\u20b9" + info.amountInr + "*\n" +
    "\ud83d\udd16 Ref: `" + info.ref + "`\n\n" +
    "_Customer already got their reading. Just confirm \u20b9" + info.amountInr + " landed in your Paytm._";
  try {
    const res = await fetch(`${TG_API}/bot${botToken()}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId(), text, parse_mode: "Markdown" }),
    });
    return res.ok;
  } catch (e) {
    console.error("Telegram sendQuickUnlockAlert failed:", e);
    return false;
  }
}

/** Answer a callback query (removes the loading spinner on the tapped button). */
export async function answerCallback(callbackQueryId: string, text: string): Promise<void> {
  try {
    await fetch(`${TG_API}/bot${botToken()}/answerCallbackQuery`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ callback_query_id: callbackQueryId, text }),
    });
  } catch (e) {
    console.error("Telegram answerCallback failed:", e);
  }
}

/** Edit the original message text after a decision (so buttons disappear). */
export async function editMessage(messageChatId: number | string, messageId: number, newText: string): Promise<void> {
  try {
    await fetch(`${TG_API}/bot${botToken()}/editMessageText`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: messageChatId,
        message_id: messageId,
        text: newText,
        parse_mode: "Markdown",
      }),
    });
  } catch (e) {
    console.error("Telegram editMessage failed:", e);
  }
}
