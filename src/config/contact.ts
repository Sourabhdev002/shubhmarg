/**
 * Central contact + regional config — the ONE place these live.
 * Everything (buttons, footer, deep links, currency display) reads from here,
 * so changing a number/handle/rate is a single edit. Overridable via env.
 */

/* ── WhatsApp (India + international) ──────────────────────────────
   Format: digits only, with country code, no "+" or spaces (wa.me format).
   Currently a Thailand (+66) number while operating from Thailand; swap to an
   India number later by changing this one value (or NEXT_PUBLIC_WHATSAPP_NUMBER). */
export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "66969973182";

/** Build a wa.me deep link with an optional prefilled message. */
export function waLink(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/* ── LINE (Thailand's dominant chat app) ──────────────────────────
   Set this to your LINE Official Account link (https://lin.ee/XXXX) or a
   personal link (https://line.me/ti/p/~your-line-id). Empty = LINE UI hidden. */
export const LINE_URL = process.env.NEXT_PUBLIC_LINE_URL || "";

export function lineConfigured(): boolean {
  return Boolean(LINE_URL);
}

/* ── Currency display (₹ INR primary, ฿ THB approximate for Thai visitors) ──
   Display-only conversion. Actual billing is confirmed via chat/concierge.
   Approx rate: ₹1 ≈ ฿0.43  (i.e. ₹100 ≈ ฿43). Update as needed. */
// Slight buffer above market (~0.43) since this is an estimate + covers fees.
export const INR_TO_THB = Number(process.env.NEXT_PUBLIC_INR_TO_THB || "0.45");

/** Convert an INR amount to an approximate, nicely-rounded ฿ string. */
export function inrToThbDisplay(inr: number): string {
  const thb = Math.round(inr * INR_TO_THB);
  return `฿${thb.toLocaleString("en-US")}`;
}

/* -- Social media profiles ----------------------------------------------- */
export const FACEBOOK_URL =
  process.env.NEXT_PUBLIC_FACEBOOK_URL ||
  "https://web.facebook.com/profile.php?id=61593304228049";

export const INSTAGRAM_URL =
  process.env.NEXT_PUBLIC_INSTAGRAM_URL ||
  "https://www.instagram.com/shubhmarg.official/";
