/**
 * Paytm hosted Payment Links — the ONE place these live.
 *
 * These are dashboard-created "Payment Links" (https://p.paytm.me/PYTMPS/XXXX),
 * NOT an API integration — no API key, no secret, no code on Paytm's side.
 *
 * WHY hosted links over raw `upi://` deep links:
 *   - `upi://pay?...` does nothing on desktop and is flaky on iOS (our own
 *     payment-page comments admit our VPAs are "scan-only").
 *   - A `p.paytm.me` link opens a real checkout everywhere: on mobile it deep-
 *     links into the Paytm app if installed (else mobile web), and on desktop it
 *     opens web checkout. One link works on every device + accepts UPI/cards.
 *
 * TWO KINDS of dashboard link (both created for free in the Paytm dashboard):
 *   - FIXED   → "Quick Payment Link" with an Amount set. One locked price,
 *               reusable by many payers (e.g. Rashi ₹11).
 *   - GENERIC → "Detailed / Quick Payment Link" with Amount left BLANK. The
 *               payer types the amount. ONE such link covers every dynamic
 *               flow (wallet top-up, guidance dakshina, custom donation).
 *               (Dashboard note: "If amount is not specified the customer can
 *               choose the amount she/he wishes to pay.")
 *
 * CONFIRMATION: because there is no API, Paytm cannot notify the site that a
 * payment happened. Confirmation stays on the EXISTING Telegram-approve / UTR
 * flow (owner sees the amount before crediting). Nothing about that changes.
 *
 * HOW TO SET: create the link in the Paytm dashboard, copy its p.paytm.me URL,
 * and paste it below (or set the matching NEXT_PUBLIC_PAYTM_* env var, which
 * wins over the inline value). Leave a value as "" to keep that flow on the
 * existing UPI-QR fallback — the site degrades gracefully, never breaks.
 */

const env = (v: string | undefined) => (v && v.trim() ? v.trim() : "");

/**
 * GENERIC "any amount" link — payer types the amount on Paytm's page.
 * This single link backs wallet top-ups, guidance orders, and custom donations.
 * Create it with the Amount field left BLANK.
 */
export const PAYTM_GENERIC_LINK =
  env(process.env.NEXT_PUBLIC_PAYTM_GENERIC_LINK) ||
  "https://p.ppsl.io/PYTMPS/M4Fmjk"; // "ShubhMarg Dakshina" — Amount blank → payer types any amount

/** FIXED-amount links, keyed by their rupee amount. Create each with a set Amount. */
export const PAYTM_FIXED_LINKS: Record<number, string> = {
  11: env(process.env.NEXT_PUBLIC_PAYTM_LINK_11) || "https://p.ppsl.io/PYTMPS/bBHmjk",   // Rashi Aashirwad
  51: env(process.env.NEXT_PUBLIC_PAYTM_LINK_51) || "",   // Donate
  99: env(process.env.NEXT_PUBLIC_PAYTM_LINK_99) || "https://p.ppsl.io/PYTMPS/upVmjk",   // Quick Answer
  101: env(process.env.NEXT_PUBLIC_PAYTM_LINK_101) || "", // Donate
  251: env(process.env.NEXT_PUBLIC_PAYTM_LINK_251) || "", // Donate
  501: env(process.env.NEXT_PUBLIC_PAYTM_LINK_501) || "", // Donate
  1100: env(process.env.NEXT_PUBLIC_PAYTM_LINK_1100) || "", // Donate
};

/**
 * Resolve the best Paytm link for a given amount.
 *   1. Exact FIXED link for that amount, if one is configured.
 *   2. Else the GENERIC "any amount" link, if configured.
 *   3. Else null → caller should fall back to the existing UPI-QR flow.
 */
export function getPaytmLink(amount?: number): string | null {
  if (typeof amount === "number" && PAYTM_FIXED_LINKS[amount]) {
    return PAYTM_FIXED_LINKS[amount];
  }
  if (PAYTM_GENERIC_LINK) return PAYTM_GENERIC_LINK;
  return null;
}

/** True when at least one Paytm link is configured (used to show/hide the button). */
export function paytmLinksConfigured(): boolean {
  return Boolean(PAYTM_GENERIC_LINK) || Object.values(PAYTM_FIXED_LINKS).some(Boolean);
}
