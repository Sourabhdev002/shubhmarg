"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Smartphone, CheckCircle2 } from "lucide-react";
import { getMerchantVpa, getMerchantPayeeName } from "@/lib/upi-config";

/**
 * UpiPayButton — one-tap "click & pay" UPI on mobile, platform-aware.
 *
 * ANDROID: fires a generic `upi://pay` INTENT with prefilled amount + payee.
 * Android shows the system "Pay with" chooser (GPay/PhonePe/Paytm/any UPI app),
 * amount already filled → customer picks an app and enters PIN. One tap.
 *
 * iOS (iPhone/iPad): `upi://` is NOT a valid iOS scheme — Safari mis-routes it
 * (commonly opens WhatsApp). iOS has no system UPI chooser and cannot detect
 * installed apps (privacy). So on iOS we DON'T fire the generic intent; instead
 * we show APP-SPECIFIC buttons using each app's own iOS scheme:
 *   Google Pay → gpay://upi/pay?...   (per Google's iOS in-app payments docs)
 *   PhonePe    → phonepe://pay?...
 *   Paytm      → paytmmp://upi/pay?...
 * The payer taps their app directly. If none is installed, the caller's QR /
 * Paytm hosted link remains the reliable path.
 *
 * WHY THE VPA WORKS: it's a Paytm MERCHANT VPA (paytmqr…@paytm); merchant VPAs
 * accept the prefilled amount (personal VPAs trigger the "limit exceeded" error).
 * The URI is NPCI-clean (amount = exactly 2 decimals, minimal, URL-encoded).
 *
 * DESKTOP: no mobile UPI handler → renders nothing; the caller's QR is the path.
 *
 * CONFIRMATION is unchanged: after paying, the payer uses the caller's existing
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

/** UPI query string, NPCI-clean (amount = exactly 2 decimals). */
function upiQuery(vpa: string, name: string, amount: number, note?: string): string {
  const p = new URLSearchParams();
  p.set("pa", vpa);
  p.set("pn", name);
  p.set("am", amount.toFixed(2));
  p.set("cu", "INR");
  if (note) p.set("tn", note);
  return p.toString();
}

/** Generic Android UPI intent (system app chooser). */
function androidIntent(vpa: string, name: string, amount: number, note?: string): string {
  return `upi://pay?${upiQuery(vpa, name, amount, note)}`;
}

/**
 * App-specific deep links. Android uses the tez:// (GPay) variant; iOS uses the
 * gpay:// variant (per Google docs). PhonePe/Paytm schemes are the same shape.
 */
function appLink(
  app: "gpay" | "phonepe" | "paytm",
  platform: "ios" | "android",
  vpa: string,
  name: string,
  amount: number,
  note?: string,
): string {
  const q = upiQuery(vpa, name, amount, note);
  switch (app) {
    case "gpay":
      return platform === "ios" ? `gpay://upi/pay?${q}` : `tez://upi/pay?${q}`;
    case "phonepe":
      return `phonepe://pay?${q}`;
    case "paytm":
      return `paytmmp://upi/pay?${q}`;
  }
}

export default function UpiPayButton({ amount, note, className = "", onLaunched }: UpiPayButtonProps) {
  const reduce = useReducedMotion();
  const [showApps, setShowApps] = useState(false);

  const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
  const isIOS = /iphone|ipad|ipod/i.test(ua);
  const isAndroid = /android/i.test(ua);
  const isTouch =
    isIOS || isAndroid || /mobile/i.test(ua) ||
    (typeof window !== "undefined" && "ontouchstart" in window);

  if (!isTouch || amount <= 0) return null;

  const vpa = getMerchantVpa();
  const name = getMerchantPayeeName();
  const platform: "ios" | "android" = isIOS ? "ios" : "android";

  const launch = (uri: string) => {
    onLaunched?.();
    window.location.href = uri; // same-tab hand-off = reliable app open on mobile
  };

  const AppRow = (
    <div className="grid grid-cols-3 gap-2">
      <AppButton label="Google Pay" onClick={() => launch(appLink("gpay", platform, vpa, name, amount, note))} />
      <AppButton label="PhonePe" onClick={() => launch(appLink("phonepe", platform, vpa, name, amount, note))} />
      <AppButton label="Paytm" onClick={() => launch(appLink("paytm", platform, vpa, name, amount, note))} />
    </div>
  );

  // iOS: no reliable generic intent → show app buttons directly.
  if (isIOS) {
    return (
      <div className={className}>
        <p className="mb-2 text-center text-[12px] font-semibold text-[#2A1810]">
          {`Pay \u20b9${amount.toFixed(2)} \u2014 tap your UPI app`}
        </p>
        {AppRow}
        <p className="mt-2 text-center text-[10.5px] text-[#6B5A48]/70">
          Opens the app with the amount filled in. No app? Scan the QR below.
        </p>
      </div>
    );
  }

  // Android: one-tap generic intent (system chooser) + app fallbacks.
  return (
    <div className={className}>
      <motion.button
        type="button"
        whileTap={reduce ? undefined : { scale: 0.97 }}
        transition={SNAPPY}
        onClick={() => launch(androidIntent(vpa, name, amount, note))}
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

      {showApps && <div className="mt-2">{AppRow}</div>}
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
