"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { getPaytmLink } from "@/config/paytm-links";

/**
 * PayNowButton — opens the Paytm hosted checkout for a given amount.
 *
 * Resolves the right link via getPaytmLink(amount):
 *   - exact FIXED link for that amount, else the GENERIC "any amount" link.
 *   - if NEITHER is configured, this renders NOTHING (returns null) so the
 *     caller's existing UPI-QR flow stays as the sole path. The site therefore
 *     degrades gracefully — you can roll Paytm out one flow at a time.
 *
 * For a GENERIC link (payer types the amount on Paytm's page) we copy the exact
 * amount to the clipboard on tap, so the payer just pastes it into Paytm's box.
 *
 * Confirmation is unchanged: after paying, the payer returns and uses the
 * existing "I've Paid" / UTR + Telegram-approve flow.
 */

interface PayNowButtonProps {
  /** Amount in rupees. Used to pick a FIXED link and to pre-copy for GENERIC links. */
  amount: number;
  label?: string;
  className?: string;
  /** Called after the link opens (e.g. to fire a pixel / advance UI to "confirm"). */
  onOpened?: () => void;
}

const SNAPPY = { type: "spring" as const, stiffness: 400, damping: 30 };

export default function PayNowButton({
  amount,
  label = "Pay on Paytm",
  className = "",
  onOpened,
}: PayNowButtonProps) {
  const reduce = useReducedMotion();
  const link = getPaytmLink(amount);

  // No Paytm link configured for this amount → render nothing, keep UPI-QR fallback.
  if (!link) return null;

  // Whether this is the shared "any amount" link (payer must type the amount)
  // rather than a dedicated FIXED link for this exact value.
  const isAnyAmount = !isFixedForAmount(amount);

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

    // Mobile: navigate in the SAME tab so the OS reliably hands off to the Paytm
    // app (or mobile web checkout). New-tab/window.open is often blocked or opens
    // an orphan tab on mobile browsers, breaking the payment hand-off.
    // Desktop: open a new tab so the payer keeps this confirmation page.
    const isMobile =
      typeof navigator !== "undefined" &&
      /android|iphone|ipad|ipod|mobile/i.test(navigator.userAgent);

    if (isMobile) {
      window.location.href = link;
    } else {
      window.open(link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <motion.button
      type="button"
      whileTap={reduce ? undefined : { scale: 0.97 }}
      transition={SNAPPY}
      onClick={handleClick}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-bold text-white bg-gradient-to-br from-[#00B9F5] to-[#0086C9] shadow-[0_10px_30px_-10px_rgba(0,134,201,0.7)] ${className}`}
      aria-label={`${label} — ₹${amount}`}
    >
      {label}
      <ExternalLink className="w-4 h-4" aria-hidden="true" />
    </motion.button>
  );
}

/** True when a dedicated FIXED link exists for this exact amount. */
function isFixedForAmount(amount: number): boolean {
  // Re-derive without importing internals: getPaytmLink returns the FIXED link
  // for a known amount; if that differs from the generic link, it's fixed.
  const forAmount = getPaytmLink(amount);
  const generic = getPaytmLink(undefined);
  return Boolean(forAmount) && forAmount !== generic;
}
