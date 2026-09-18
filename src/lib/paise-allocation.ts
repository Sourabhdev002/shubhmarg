import "server-only";
import { supabaseServer } from "@/lib/supabase";

// Assigns each order a slightly unique amount (e.g. 99.07) so the incoming
// payment amount alone identifies the order for auto-verification.
//
// Strategy: base rupee price + a paise offset (01..99) not currently in use
// among pending orders sharing that rupee band. If all 99 offsets in a band
// are taken (extremely unlikely at this scale), spill into the next rupee band.
//
// Zero-amount / non-payable services (e.g. free-reading) are returned unchanged.

const PENDING_STATUSES = ["unpaid", "payment_verification"];

export async function allocateUniquePaiseAmount(basePriceRupees: number): Promise<number> {
  // Non-payable orders keep their exact amount (no fingerprint needed).
  if (!basePriceRupees || basePriceRupees <= 0) return basePriceRupees;

  // Fetch amounts currently in use among pending orders.
  const { data, error } = await supabaseServer
    .from("guidance_requests")
    .select("payment_amount")
    .in("payment_status", PENDING_STATUSES);

  // On a read failure, fall back to base + a random offset (still valid, just
  // slightly higher collision risk than the deterministic path).
  const inUse = new Set<string>();
  if (!error && data) {
    for (const row of data) {
      if (row.payment_amount != null) {
        inUse.add(Number(row.payment_amount).toFixed(2));
      }
    }
  }

  // Try paise offsets 01..99 across a few rupee bands.
  for (let band = 0; band < 5; band++) {
    const rupees = basePriceRupees + band;
    for (let paise = 1; paise <= 99; paise++) {
      const candidate = rupees + paise / 100;
      const key = candidate.toFixed(2);
      if (!inUse.has(key)) {
        return Number(key);
      }
    }
  }

  // Extremely unlikely fallback: base + random paise.
  const fallback = basePriceRupees + Math.max(1, Math.floor(Math.random() * 99)) / 100;
  return Number(fallback.toFixed(2));
}