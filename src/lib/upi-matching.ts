// Pure matching logic for the auto-verification webhook.
// Given pending orders and an incoming payment, decide which order to confirm.

export interface PendingOrderLite {
  reference_id: string;
  payment_amount: number | null;
  payment_utr: string | null;
  payment_status: string;
}

export interface IncomingPayment {
  amount: number;
  utr?: string | null;
}

export type MatchResult =
  | { status: "confirmed"; referenceId: string }
  | { status: "duplicate"; referenceId?: string }
  | { status: "no_match" };

// Orders considered "pending" (open for matching).
const PENDING = new Set(["unpaid", "payment_verification"]);

export function matchPayment(orders: PendingOrderLite[], incoming: IncomingPayment): MatchResult {
  const utr = (incoming.utr || "").trim();

  // Duplicate/replay: this UTR already recorded on ANY order.
  if (utr) {
    const already = orders.find(o => (o.payment_utr || "").trim() === utr);
    if (already) {
      // If it's already paid, it's a duplicate. If pending, it's still that order.
      if (already.payment_status === "paid") {
        return { status: "duplicate", referenceId: already.reference_id };
      }
    }
  }

  const pending = orders.filter(o => PENDING.has(o.payment_status));

  // Primary: match by exact amount among pending orders.
  const amtKey = incoming.amount.toFixed(2);
  const amountMatches = pending.filter(
    o => o.payment_amount != null && Number(o.payment_amount).toFixed(2) === amtKey
  );

  if (amountMatches.length === 1) {
    return { status: "confirmed", referenceId: amountMatches[0].reference_id };
  }

  // Amount matched more than one, OR matched none → try UTR to disambiguate.
  if (utr) {
    const utrMatches = pending.filter(o => (o.payment_utr || "").trim() === utr);
    if (utrMatches.length === 1) {
      return { status: "confirmed", referenceId: utrMatches[0].reference_id };
    }
  }

  // Zero or ambiguous after both strategies → do not auto-confirm.
  return { status: "no_match" };
}