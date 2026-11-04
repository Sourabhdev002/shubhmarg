// Pure alert text builders. Do NOT import telegram.ts here. No phone numbers in alerts.

/** Escapes legacy Telegram Markdown special characters. */
export function escapeMarkdown(s: string): string {
  return String(s ?? "").replace(/([_*`\[\]\\])/g, "\\$1");
}

export interface OrderAlertInput {
  referenceId: string;
  service: string;
  amount: number;
  name: string;
}

export interface ClaimAlertInput extends OrderAlertInput {
  utr?: string;
}

function money(amount: number): string {
  return `₹${Number(amount).toFixed(2)}`;
}

export function buildOrderAlertText(i: OrderAlertInput): string {
  return [
    "🆕 *New order*",
    `Ref: ${escapeMarkdown(i.referenceId)}`,
    `Service: ${escapeMarkdown(i.service)}`,
    `Amount: ${money(i.amount)}`,
    `Name: ${escapeMarkdown(i.name)}`,
  ].join("\n");
}

export function buildClaimAlertText(i: ClaimAlertInput): string {
  const lines = [
    "💸 *Payment claim*",
    `Ref: ${escapeMarkdown(i.referenceId)}`,
    `Service: ${escapeMarkdown(i.service)}`,
    `Amount: ${money(i.amount)}`,
    `Name: ${escapeMarkdown(i.name)}`,
  ];
  if (i.utr) lines.push(`UTR: ${escapeMarkdown(i.utr)}`);
  return lines.join("\n");
}

/** Alert on first move to payment_verification, and always when a UTR is supplied (unless already paid). */
export function shouldSendClaimAlert(prevStatus: string, hasUtr: boolean): boolean {
  if (prevStatus === "paid") return false;
  if (hasUtr) return true;
  return prevStatus !== "payment_verification";
}
