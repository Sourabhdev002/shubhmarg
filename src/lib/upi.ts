// Shared UPI URI builder. The amount MUST be rendered with exactly two decimals
// (e.g. 99.00, 99.07) — an integer amount like "99" triggers a false
// "limit exceeded" error in some UPI apps.

export interface UpiIntentParams {
  payeeVpa: string;
  payeeName: string;
  amount: number;      // rupees, may include paise (e.g. 99.07)
  currency?: string;   // default "INR"
}

export function buildUpiUri({ payeeVpa, payeeName, amount, currency }: UpiIntentParams): string {
  const params = new URLSearchParams();
  params.set("pa", payeeVpa);
  params.set("pn", payeeName);
  params.set("am", amount.toFixed(2)); // exactly two decimals
  params.set("cu", currency || "INR");
  return `upi://pay?${params.toString()}`;
}

// Formats a rupee amount for display with exactly two decimals.
export function formatAmount(amount: number): string {
  return amount.toFixed(2);
}