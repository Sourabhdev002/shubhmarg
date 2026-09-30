"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Smartphone, CheckCircle2 } from "lucide-react";
import { getMerchantVpa, getMerchantPayeeName } from "@/lib/upi-config";

/**
 * UpiPayButton — true one-tap "click & pay" UPI on mobile.
 *
 * On a phone, tapping this fires a `upi://pay` INTENT with a prefilled amount +
 * payee. Android shows the "Pay with" chooser (GPay / PhonePe / Paytm / any UPI
 * app) with the amount already filled — the customer just picks an app and
 * enters their PIN. No typing, no card page.
 *
 * WHY THIS WORKS HERE: the VPA is a Paytm MERCHANT VPA (paytmqr…@paytm). A
 * merchant VPA lets the amount-prefilled intent open cleanly; personal VPAs make
 * many apps reject the prefilled amount ("limit exceeded" catch-all error).
 *
 * The URI is NPCI-clean: amount as exactly two decimals, minimal params, values
 * URL-encoded — malformed params are the #1 cause of the "limit exceeded" error.
 *
 * FALLBACKS: if the generic intent is flaky on a device, the buttons below let
 * the payer force a specific app (tez:// GPay, phonepe://, paytmmp:// Paytm).
 *
 * ON DESKTOP: `upi://` has no handler, so this component hides its intent action
 * and the caller's QR remains the path. We only show it on touch devices.
 *
 * CONFIRMATION is unchanged: after paying, the payer taps the caller's existing
 * "I've Paid" / UTR + Telegram-approve flow.
 */

interface UpiPayButtonProps {
  /** Amount in rupees (paise allowed, e.g. 500.07). */
  amount: number;
  /** Short transaction note (shown in the UPI app). */
  note?: string;
  className?: string;
  /** Fired when a UPI app is launched (e.g. advance UI to "confirm"). */
  onLaunched?: () => void;
}

const SNAPPY = { type: "spring" as const, stiffness: 400, damping: 30 };

/** Build a clean, NPCI-compliant upi:// intent URI (amount = exactly 2 decimals). */
function buildIntent(vpa: string, name: string, amount: number, note?: string): string {
  const p = new URLSearchParams();
  p.set("pa", vpa);
  p.set("pn", name);
  p.set("am", amount.toFixed(2));
  p.set("cu", "INR");
  if (note) p.set("tn", note);
  return `upi://pay?${p.toString()}`;
}

/** App-specific scheme variants for forced fallbacks. */
function buildForApp(scheme: string, vpa: string, name: string, amount: number, note?: string): string {
  const p = new URLSearchParams();
  p.set("pa", vpa);
  p.set("pn", name);
  p.set("am", amount.toFixed(2));
  p.set("cu", "INR");
  if (note) p.set("tn", note);
  return `${scheme}//upi/pay?${p.toString()}`;
}

export default function UpiPayButton({ amount, note, className = "", onLaunched }: UpiPayButtonProps) {
  const reduce = useReducedMotion();
  const [showApps, setShowApps] = useState(false);

  // Only meaningful on touch devices — upi:// has no desktop handler.
  const isTouch =
    typeof navigator !== "undefined" &&
    (/android|iphone|ipad|ipod|mobile/i.test(navigator.userAgent) ||
      (typeof window !== "undefined" && "ontouchstart" in window));

  if (!isTouch || amount <= 0) return null;

  const vpa = getMerchantVpa();
  const name = getMerchantPayeeName();
  const genericIntent = buildIntent(vpa, name, amount, note);

  const launch = (uri: string) => {
    onLaunched?.();
    window.location.href = uri; // same-tab hand-off = reliable app open on mobile
  };

  return (
    <div className={className}>
      {/* Primary: generic UPI intent → OS app chooser, amount prefilled */}
      <motion.button
        type="button"
        whileTap={reduce ? undefined : { scale: 0.97 }}
        transition={SNAPPY}
        onClick={() => launch(genericIntent)}
        className="w-full inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 font-bold text-white bg-gradient-to-r from-[#1EB955] to-[#25D366] shadow-[0_10px_30px_-10px_rgba(30,185,85,0.7)]"
        aria-label={`Pay ₹${amount.toFixed(2)} by UPI — one tap`}
      >
        <Smartphone className="w-4 h-4" aria-hidden="true" />
        {`Pay \u20b9${amount.toFixed(2)} \u2014 One Tap (UPI)`}
      </motion.button>

      <button
        type="button"
        onClick={() => setShowApps((s) => !s)}
        className="mt-2 w-full text-center text-[11px] font-semibold text-[#6B5A48] hover:text-[#2A1810] transition-colors"
      >
        {showApps ? "Hide app options" : "Didn't open? Choose your app"}
      </button>

      {showApps && (
        <div className="mt-2 grid grid-cols-3 gap-2">
          <AppButton label="Google Pay" onClick={() => launch(buildForApp("tez:", vpa, name, amount, note))} />
          <AppButton label="PhonePe" onClick={() => launch(buildForApp("phonepe:", vpa, name, amount, note))} />
          <AppButton label="Paytm" onClick={() => launch(buildForApp("paytmmp:", vpa, name, amount, note))} />
        </div>
      )}
    </div>
  );
}

function AppButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex flex-col items-center justify-center gap-1 rounded-xl border border-[#B8860B]/25 bg-[#FFFDF8] px-2 py-2.5 text-[11px] font-bold text-[#2A1810] hover:border-[#E8791E]/50 transition-colors"
    >
      <CheckCircle2 className="w-3.5 h-3.5 text-[#C25E10]" />
      {label}
    </button>
  );
}
