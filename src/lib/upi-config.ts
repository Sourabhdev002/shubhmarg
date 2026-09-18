// UPI configuration — reads from env.
// Customer-facing values use NEXT_PUBLIC_ so they are available client-side.
//
// Dev-only fallbacks let the flow run locally without env setup. In production
// these MUST come from env — otherwise real payments could route to the wrong
// payee, so we fail loudly instead of silently using a placeholder.

const DEV_FALLBACK_VPA = "shubhmarg@ptyes";
const DEV_FALLBACK_PAYEE_NAME = "SOURABH JAGDHARI YADAV";

const isProd = process.env.NODE_ENV === "production";

export function getUpiVpa(): string {
  const vpa = process.env.NEXT_PUBLIC_UPI_VPA;
  if (vpa) return vpa;
  if (isProd) {
    throw new Error("NEXT_PUBLIC_UPI_VPA is not configured — refusing to use a placeholder UPI ID in production.");
  }
  return DEV_FALLBACK_VPA;
}

export function getUpiPayeeName(): string {
  const name = process.env.NEXT_PUBLIC_UPI_PAYEE_NAME || process.env.UPI_PAYEE_NAME;
  if (name) return name;
  if (isProd) {
    throw new Error("UPI payee name is not configured — set NEXT_PUBLIC_UPI_PAYEE_NAME in production.");
  }
  return DEV_FALLBACK_PAYEE_NAME;
}

// Server-only secret for the auto-verification webhook.
export function getWebhookSecret(): string {
  return process.env.UPI_WEBHOOK_SECRET || "";
}