"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Lock, ShieldCheck } from "lucide-react";
import { getPaytmLink } from "@/config/paytm-links";

/**
 * PayNowButton — a trusted "Secure Checkout" button backed by a Paytm hosted
 * payment link (p.ppsl.io / p.paytm.me). Opens Paytm's own secure checkout
 * page, which accepts UPI, cards, and netbanking, on desktop AND all phones.
 *
 * DESIGN (research-backed, see checkout/trust-badge UX studies):
 *  - The label states exactly what happens ("Pay ₹X Securely"), not a vague
 *    "Pay on Paytm" — clearer CTAs convert better (Baymard).
 *  - A lock icon + a compact trust row ("Secured by Paytm · UPI · Cards ·
 *    Netbanking") sits directly beside the button — trust signals lift
 *    conversion most when placed next to the pay action and kept few (CXL).
 *  - Names the recognized processor (Paytm) rather than a self-made seal.
 *
 * Resolves the link via getPaytmLink(amount): exact FIXED link for the amount,
 * else the GENERIC "any amount" link, else null → renders nothing so the
 * caller's QR stays the sole path (graceful, roll out flow-by-flow).
 *
 * For a GENERIC link (payer types the amount on Paytm's page) the exact rupees
 * are pre-copied to the clipboard on tap so the payer just pastes them.
 *
 * Confirmation is unchanged: after paying, the payer returns and uses the
 * existing "I've Paid" / UTR + Telegram-approve flow.
 */

interface PayNowButtonProps {
  /** Amount in rupees. Picks a FIXED link and pre-copies for GENERIC links. */
  amount: number;
  label?: string;
  className?: string;
  /** Hide the trust row under the button (e.g. when space is tight). */
  hideTrust?: boolean;
  /** Called after the link opens (e.g. fire a pixel / advance to "confirm"). */
  onOpened?: () => void;
}

const SNAPPY = { type: "spring" as const, stiffness: 400, damping: 30 };

export default function PayNowButton({
  amount,
  label,
  className = "",
  hideTrust = false,
  onOpened,
}: PayNowButtonProps) {
  const reduce = useReducedMotion();
  const link = getPaytmLink(amount);

  // No Paytm link configured for this amount → render nothing, keep QR fallback.
  if (!link) return null;

  const isAnyAmount = !isFixedForAmount(amount);
  const text = label ?? `Pay \u20b9${amount} Securely`;

  const handleClick = async () => {
    // For an "any amount" link, pre-copy the exact rupees so the payer can paste it.
    if (isAnyAmount && typeof navigator !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(String(amount));
      } catch {
        /* clipboard optional — the amount is also shown on-page */
      }
    }
    onOpened?.();

    // Mobile: same-tab navigation hands off reliably to Paytm's secure page.
    // Desktop: new tab so the payer keeps this confirmation page.
    const isMobile =
      typeof navigator !== "undefined" &&
      /android|iphone|ipad|ipod|mobile/i.test(navigator.userAgent);
    if (isMobile) window.location.href = link;
    else window.open(link, "_blank", "noopener,noreferrer");
  };

  return (
    <div className={className}>
      <motion.button
        type="button"
        whileTap={reduce ? undefined : { scale: 0.98 }}
        whileHover={reduce ? undefined : { y: -1 }}
        transition={SNAPPY}
        onClick={handleClick}
        className="w-full inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-4 font-bold text-white bg-gradient-to-br from-[#0F9BE0] via-[#00B9F5] to-[#0086C9] shadow-[0_12px_34px_-10px_rgba(0,134,201,0.65)]"
        aria-label={`${text} — secure checkout by Paytm`}
      >
        <Lock className="w-4 h-4" aria-hidden="true" />
        <span>{text}</span>
      </motion.button>

      {!hideTrust && (
        <div className="mt-2 flex items-center justify-center gap-1.5 text-[10.5px] font-semibold text-[#6B5A48]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#0086C9]" aria-hidden="true" />
          <span>Secured by Paytm</span>
          <span className="text-[#B8860B]/50">·</span>
          <span>UPI · Cards · Netbanking</span>
        </div>
      )}
    </div>
  );
}

/** True when a dedicated FIXED link exists for this exact amount. */
function isFixedForAmount(amount: number): boolean {
  const forAmount = getPaytmLink(amount);
  const generic = getPaytmLink(undefined);
  return Boolean(forAmount) && forAmount !== generic;
}
