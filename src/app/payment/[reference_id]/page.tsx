"use client";

import React, { useEffect, useState, use } from "react";
import { getPaymentRequestByReference, submitPaymentConfirmation, submitPaymentUtr } from "./actions";
import { CheckCircle2, AlertCircle, Loader2, ShieldCheck, Lock, Copy, QrCode, ArrowRight, Smartphone, ExternalLink, Wallet } from "lucide-react";
import Link from "next/link";
import QRCode from "react-qr-code";
import { formatAmount } from "@/lib/upi";
import { getUpiVpa, getUpiPayeeName } from "@/lib/upi-config";
import { useAuth } from "@/context/AuthContext";
import { useWallet, walletSpend, formatPaise } from "@/hooks/useWallet";
import { waLink } from "@/config/contact";

interface PageProps {
  params: Promise<{ reference_id: string }>;
}

interface PaymentRequest {
  id: string;
  reference_id: string;
  service: string;
  payment_status: string;
  payment_amount: number;
  payment_currency: string;
  full_name: string;
}

// ─── App icons ───────────────────────────────────────────────────────────────
const GPayIcon = () => (
  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center p-1 shadow-sm shrink-0">
    <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  </div>
);

const PhonePeIcon = () => (
  <div className="w-8 h-8 bg-[#5f259f] rounded-full flex items-center justify-center shrink-0 shadow-sm">
    <span className="text-white text-[15px] font-black leading-none">पे</span>
  </div>
);

const PaytmIcon = () => (
  <div className="bg-white px-2 py-1.5 rounded-lg shrink-0 shadow-sm flex items-center justify-center">
    <span className="text-[12px] font-black tracking-tighter leading-none">
      <span className="text-[#002970]">Pay</span><span className="text-[#00baf2]">tm</span>
    </span>
  </div>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.025 3.284l-.54 2.559 2.656-.525c.983.568 1.657.882 2.627.882 3.181 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.8-5.768-5.800zm3.385 8.163c-.144.405-.837.774-1.17.822-.312.043-.687.069-2.188-.535-1.632-.656-2.673-2.316-2.755-2.424-.08-.109-.652-.867-.652-1.652 0-.785.411-1.171.556-1.332.145-.16.317-.2.422-.2.106 0 .211 0 .304.006.101.005.234-.038.366.279.136.327.464 1.132.505 1.215.041.083.068.181.014.289-.054.108-.082.176-.162.273-.081.097-.171.216-.244.29-.083.083-.169.174-.073.339.096.165.426.702.913 1.135.628.558 1.157.73 1.322.813.165.083.262.069.359-.042.097-.111.414-.482.525-.648.111-.166.222-.138.375-.083.153.056.97.457 1.137.54.167.083.278.125.319.194.042.069.042.402-.102.807z"/>
  </svg>
);

export default function PaymentPage({ params }: PageProps) {
  const { reference_id } = use(params);
  const [request, setRequest] = useState<PaymentRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submittingConfirmation, setSubmittingConfirmation] = useState(false);
  const [confirmError, setConfirmError] = useState("");
  const [copiedApp, setCopiedApp] = useState<string | null>(null);
  const [utrInput, setUtrInput] = useState("");
  const [showUtrField, setShowUtrField] = useState(false);

  // Wallet
  const { user } = useAuth();
  const { balance_paise, refresh: refreshWallet } = useWallet();
  const [walletPaying, setWalletPaying] = useState(false);
  const [walletError, setWalletError] = useState("");

  const PRIMARY_UPI = getUpiVpa();
  const PAYEE_NAME = getUpiPayeeName();

  // Exact signed parameters decoded from the real Paytm merchant QR.
  // Used to render an on-site QR identical to the printed one (scans + pays).
  const PAYTM_QR = {
    pa: "paytmqr2810050501011nkqq2oa80eh@paytm",
    pn: "Paytm Merchant",
    mc: "5499",
    mode: "02",
    orgid: "000000",
    paytmqr: "2810050501011NKQQ2OA80EH",
    sign: "MEYCIQCJAwfHAYxX4NZ5Z8IV9+rpXmYs5gWICYBU+0jTq8iihQIhAK4IqSCUjAl+tNRYDrVOPBHq9LDOZgo63CwsZdkTiyxk",
  };

  useEffect(() => {
    getPaymentRequestByReference(reference_id).then((res) => {
      if (res.success && res.request) setRequest(res.request as PaymentRequest);
      else setError(res.error || "Failed to load.");
      setLoading(false);
    });
  }, [reference_id]);

  useEffect(() => {
    // Poll while unpaid (fast path: paid before confirming) OR verifying
    if (request?.payment_status !== "payment_verification" && request?.payment_status !== "unpaid") return;
    const id = setInterval(async () => {
      const res = await getPaymentRequestByReference(reference_id).catch(() => null);
      if (res?.success && res.request) setRequest(res.request as PaymentRequest);
    }, 5000);
    return () => clearInterval(id);
  }, [request?.payment_status, reference_id]);

  const copyUpiId = (source: string = "manual") => {
    try {
      if (navigator?.clipboard?.writeText) {
        navigator.clipboard.writeText(PRIMARY_UPI);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = PRIMARY_UPI;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
    } catch {}
    setCopiedApp(source);
    setTimeout(() => setCopiedApp(null), 6000);
  };

  // Opens the chosen UPI app using the EXACT signed Paytm QR string (the same string
  // that, when scanned, opens the "type the amount" screen with no error). We deliver
  // it as a deep link with NO amount so the signature stays valid; the customer types
  // the amount shown on the page. This mirrors the working QR-scan screen.
  // Opens the chosen app so the customer can Scan the QR (the reliable path) and also
  // copies the UPI ID as a fallback. No pre-filled intent — our VPAs are scan-only.
  const openAppToSearchAndPay = (app: "gpay" | "phonepe" | "paytm") => {
    copyUpiId(app);
    const isAndroid = typeof navigator !== "undefined" && /android/i.test(navigator.userAgent);
    const isIOS = typeof navigator !== "undefined" && /ipad|iphone|ipod/i.test(navigator.userAgent);
    const androidPkg: Record<string, string> = {
      gpay: "com.google.android.apps.nbu.paisa.user",
      phonepe: "com.phonepe.app",
      paytm: "net.one97.paytm",
    };
    const iosScheme: Record<string, string> = {
      gpay: "tez://",
      phonepe: "phonepe://",
      paytm: "paytmmp://",
    };
    let targetUrl = "";
    if (isAndroid) targetUrl = `intent:#Intent;package=${androidPkg[app]};end`;
    else if (isIOS) targetUrl = iosScheme[app];
    if (targetUrl) setTimeout(() => { window.location.href = targetUrl; }, 150);
  };


  const handleConfirmPayment = async () => {
    setConfirmError("");
    setSubmittingConfirmation(true);

    let res;
    if (utrInput.trim()) {
      res = await submitPaymentUtr(reference_id, utrInput.trim());
    } else {
      res = await submitPaymentConfirmation(reference_id);
    }

    if (res.success) {
      if (request) setRequest({ ...request, payment_status: "payment_verification" });
      if (typeof window.fbq === "function") window.fbq("trackCustom", "PaymentSubmitted");
    } else {
      setConfirmError(res.error || "Failed to confirm. Please try again.");
    }
    setSubmittingConfirmation(false);
  };

  if (loading) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center bg-[#0a0a0a]">
        <Loader2 className="h-8 w-8 animate-spin text-[#d4af37]" />
      </div>
    );
  }

  if (error || !request) {
    return (
      <div className="min-h-[100dvh] flex flex-col items-center justify-center bg-[#0a0a0a] px-6 text-center">
        <AlertCircle className="h-12 w-12 text-[#d4af37] mb-4" />
        <h1 className="text-2xl font-bold font-serif text-white mb-2">Request Not Found</h1>
        <p className="text-gray-400 mb-8">We could not locate this guidance request.</p>
        <Link href="/" className="text-sm font-bold tracking-widest text-[#d4af37] uppercase">
          ← Return Home
        </Link>
      </div>
    );
  }

  // On-site QR = the EXACT signed Paytm static QR (byte-for-byte from the printed QR
  // that scans + pays). Scanning preserves Paytm's signature so it works.
  const qrUpiUri =
    `upi://pay?pa=${PAYTM_QR.pa}` +
    `&pn=${encodeURIComponent(PAYTM_QR.pn)}` +
    `&mc=${PAYTM_QR.mc}&mode=${PAYTM_QR.mode}&orgid=${PAYTM_QR.orgid}` +
    `&paytmqr=${PAYTM_QR.paytmqr}&sign=${encodeURIComponent(PAYTM_QR.sign)}`;

  const whatsappMessage = `Namaste ShubhMarg 🙏\n\nI want to pay dakshina for my Vedic Guidance:\n• Ref ID: *${request.reference_id}*\n• Service: *${request.service.replace(/-/g, " ")}*\n• Amount: *₹${formatAmount(request.payment_amount)}*\n\nPlease share payment QR / guidance.`;
  const whatsappUrl = waLink(whatsappMessage);

  return (
    <div
      className="min-h-[100dvh] bg-[#080505] flex flex-col items-center justify-start"
      style={{
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
        backgroundImage:
          "radial-gradient(1200px 600px at 50% -10%, rgba(212,175,55,0.10), transparent 60%), radial-gradient(900px 500px at 100% 100%, rgba(114,35,43,0.16), transparent 55%), radial-gradient(700px 500px at 0% 90%, rgba(212,175,55,0.06), transparent 55%)",
      }}
    >
      {/* Ambient glows */}
      <div className="pointer-events-none fixed top-0 right-0 w-[45vw] h-[45vw] max-w-[420px] max-h-[420px] bg-[#d4af37]/12 rounded-full blur-[110px]" />
      <div className="pointer-events-none fixed bottom-0 left-0 w-[45vw] h-[45vw] max-w-[420px] max-h-[420px] bg-[#72232b]/16 rounded-full blur-[110px]" />

      {/* Premium bordered card — centered, with breathing room on desktop */}
      <div className="relative z-10 flex-1 flex flex-col w-full max-w-xl mx-auto px-4 sm:px-6 pt-[env(safe-area-inset-top,0px)] sm:my-6 sm:rounded-[28px] sm:border sm:border-[#d4af37]/15 sm:bg-white/[0.02] sm:backdrop-blur-sm sm:shadow-[0_20px_80px_-20px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.05)]">
        {/* Header */}
        <div className="pt-8 pb-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#d4af37]/50" />
            <span className="text-[#d4af37] text-sm">&#10022;</span>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#d4af37]/50" />
          </div>
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#d4af37]/80 mb-1">
            Complete Your Dakshina
          </p>
          <div className="flex items-center justify-between bg-gradient-to-br from-white/[0.08] to-white/[0.03] rounded-2xl px-5 py-4 border border-[#d4af37]/20 mt-2 shadow-[0_0_30px_rgba(212,175,55,0.08)]">
            <div className="text-left">
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-0.5">Service</p>
              <p className="text-white font-bold font-serif capitalize text-sm sm:text-base">
                {request.service.replace(/-/g, " ")}
              </p>
              <p className="text-[10px] text-gray-500 font-mono">Ref: {request.reference_id}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-0.5">Dakshina</p>
              <p className="text-4xl font-black font-serif bg-gradient-to-br from-[#f5d97a] to-[#d4af37] bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(212,175,55,0.25)]">₹{formatAmount(request.payment_amount)}</p>
            </div>
          </div>
          <p className="text-[10px] text-gray-500 mt-2.5 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3 h-3 text-[#d4af37]/70" /> Trusted by seekers across India &bull; 100% secure UPI
          </p>
        </div>

        {/* STATUS: paid */}
        {request.payment_status === "paid" && (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-12 gap-4">
            <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-2">
              <CheckCircle2 className="h-10 w-10 text-emerald-400" />
            </div>
            <h2 className="text-2xl font-bold text-white font-serif">Payment Confirmed</h2>
            <p className="text-gray-300 max-w-xs leading-relaxed text-sm">
              Your offering has been verified. Pandit Ji&apos;s automated Vedic guidance report is being prepared.
            </p>
          </div>
        )}

        {/* STATUS: verification pending */}
        {request.payment_status === "payment_verification" && (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-12 gap-4">
            <div className="w-20 h-20 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center mb-2">
              <Loader2 className="h-10 w-10 text-[#d4af37] animate-spin" />
            </div>
            <h2 className="text-2xl font-bold text-white font-serif">Verification In Progress</h2>
            <p className="text-gray-400 max-w-xs leading-relaxed text-sm">
              We received your payment confirmation. Your astrological report is being generated automatically by Gemini.
            </p>
            <p className="text-xs font-bold uppercase tracking-widest text-[#d4af37] animate-pulse mt-2">
              Checking status automatically...
            </p>
          </div>
        )}

        {/* STATUS: unpaid / payment_failed */}
        {(request.payment_status === "unpaid" || request.payment_status === "payment_failed") && (
          <div className="flex-1 flex flex-col gap-4 pb-8">
            {request.payment_status === "payment_failed" && (
              <div className="order-0 rounded-xl bg-red-500/10 border border-red-500/20 p-3 text-xs text-red-300">
                Previous verification could not find the payment. Please pay and enter the 12-digit UTR below.
              </div>
            )}

            {/* ── WALLET PAY OPTION ── */}
            {user && (
              <div className="order-0 relative rounded-2xl overflow-hidden border border-[#d4af37]/30 bg-gradient-to-br from-[#1a1206] to-[#120d06]">
                <div className="h-[1.5px] bg-gradient-to-r from-transparent via-[#d4af37]/60 to-transparent" />
                <div className="p-4 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#d4af37] to-[#8a6520] flex items-center justify-center shrink-0 shadow-[0_4px_12px_rgba(212,175,55,0.35)]">
                      <Wallet className="w-4 h-4 text-[#0a0604]" />
                    </div>
                    <div>
                      <p className="text-[13px] font-bold text-white">Pay with Wallet</p>
                      <p className="text-[11px] text-white/45">
                        Balance: <span className="text-[#d4af37] font-semibold">₹{formatPaise(balance_paise)}</span>
                        {balance_paise < Math.round(request.payment_amount * 100) && (
                          <span className="ml-1.5 text-amber-400/70">· Insufficient</span>
                        )}
                      </p>
                    </div>
                  </div>
                  {balance_paise >= Math.round(request.payment_amount * 100) ? (
                    <button
                      onClick={async () => {
                        setWalletPaying(true); setWalletError("");
                        const res = await walletSpend(reference_id);
                        setWalletPaying(false);
                        if (res.error) { setWalletError(res.error); return; }
                        setRequest({ ...request, payment_status: "paid" });
                        refreshWallet();
                      }}
                      disabled={walletPaying}
                      className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#d4af37] to-[#c9a24a] text-[#0a0604] text-[11px] font-black uppercase tracking-wide shadow-[0_4px_14px_rgba(212,175,55,0.35)] hover:brightness-110 transition-all active:scale-95 disabled:opacity-60"
                    >
                      {walletPaying ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <>Pay ₹{formatAmount(request.payment_amount)}</>}
                    </button>
                  ) : (
                    <Link href={`/wallet`} className="shrink-0 text-[11px] font-bold text-[#d4af37] underline underline-offset-2 hover:text-[#f5d97a]">
                      Top Up →
                    </Link>
                  )}
                </div>
                {walletError && <p className="text-[11px] text-red-400 px-4 pb-3">{walletError}</p>}

                <div className="flex items-center gap-2 px-4 pb-3">
                  <div className="h-px flex-1 bg-[#d4af37]/12" />
                  <span className="text-[10px] text-white/25 font-semibold uppercase tracking-widest">or pay via UPI</span>
                  <div className="h-px flex-1 bg-[#d4af37]/12" />
                </div>
              </div>
            )}

            {/* Step 1 label */}
            <div className="order-0 flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-full bg-[#d4af37] flex items-center justify-center text-black text-xs font-black shrink-0">1</div>
              <p className="text-sm font-bold text-white tracking-wide">Scan &amp; Pay the Dakshina</p>
            </div>

            {/* ── METHOD 1: Optional app helper (order-2) ── */}
            <div className="order-2 relative bg-gradient-to-br from-white/[0.06] via-white/[0.03] to-transparent border border-white/10 rounded-2xl p-5 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] overflow-hidden">
              <div className="pointer-events-none absolute -top-16 -right-16 w-40 h-40 bg-[#d4af37]/10 rounded-full blur-3xl" />
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-[#d4af37]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-white">
                    Paying on This Same Phone?
                  </span>
                </div>
                <span className="text-[10px] bg-white/10 text-gray-300 font-bold px-2 py-0.5 rounded-full">
                  Optional
                </span>
              </div>

              <p className="text-xs text-gray-300 mb-3 leading-relaxed">
                Can&apos;t scan on the same phone? Tap your app to open it, then use <strong>Pay to UPI ID</strong> and paste the ID we copy for you:
              </p>

              {/* 3 Quick Launcher Buttons */}
              <div className="grid grid-cols-3 gap-2 mb-3">
                <button
                  type="button"
                  onClick={() => openAppToSearchAndPay("gpay")}
                  className="group/btn flex flex-col items-center justify-center gap-1.5 p-3.5 rounded-2xl bg-white/[0.07] hover:bg-white/[0.12] border border-white/10 hover:border-[#d4af37]/60 hover:shadow-[0_8px_24px_-8px_rgba(212,175,55,0.4)] hover:-translate-y-0.5 active:scale-95 transition-all duration-200 text-center cursor-pointer"
                >
                  <GPayIcon />
                  <span className="text-[10px] font-bold text-white uppercase tracking-wider">Google Pay</span>
                  <span className="text-[9px] text-[#d4af37] font-medium flex items-center gap-0.5">Open App <ExternalLink className="w-2.5 h-2.5" /></span>
                </button>

                <button
                  type="button"
                  onClick={() => openAppToSearchAndPay("phonepe")}
                  className="group/btn flex flex-col items-center justify-center gap-1.5 p-3.5 rounded-2xl bg-white/[0.07] hover:bg-white/[0.12] border border-white/10 hover:border-[#d4af37]/60 hover:shadow-[0_8px_24px_-8px_rgba(212,175,55,0.4)] hover:-translate-y-0.5 active:scale-95 transition-all duration-200 text-center cursor-pointer"
                >
                  <PhonePeIcon />
                  <span className="text-[10px] font-bold text-white uppercase tracking-wider">PhonePe</span>
                  <span className="text-[9px] text-[#d4af37] font-medium flex items-center gap-0.5">Open App <ExternalLink className="w-2.5 h-2.5" /></span>
                </button>

                <button
                  type="button"
                  onClick={() => openAppToSearchAndPay("paytm")}
                  className="group/btn flex flex-col items-center justify-center gap-1.5 p-3.5 rounded-2xl bg-white/[0.07] hover:bg-white/[0.12] border border-white/10 hover:border-[#d4af37]/60 hover:shadow-[0_8px_24px_-8px_rgba(212,175,55,0.4)] hover:-translate-y-0.5 active:scale-95 transition-all duration-200 text-center cursor-pointer"
                >
                  <PaytmIcon />
                  <span className="text-[10px] font-bold text-white uppercase tracking-wider">Paytm</span>
                  <span className="text-[9px] text-[#d4af37] font-medium flex items-center gap-0.5">Open App <ExternalLink className="w-2.5 h-2.5" /></span>
                </button>
              </div>

              {/* Copy UPI ID Bar — stacked so the long ID wraps and button never clips */}
              <div className="bg-black/50 border border-white/10 rounded-xl px-3.5 py-3">
                <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Official UPI ID</p>
                <p className="text-[11px] sm:text-xs font-mono text-white font-semibold select-all break-all leading-snug mb-2.5">{PRIMARY_UPI}</p>
                <button
                  type="button"
                  onClick={() => copyUpiId("manual")}
                  className="w-full inline-flex items-center justify-center gap-1.5 text-xs font-bold text-black bg-[#d4af37] hover:bg-[#e5c453] px-3 py-2.5 rounded-lg shadow-sm transition-all cursor-pointer"
                >
                  {copiedApp ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-black" />
                      <span>UPI ID Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-black" />
                      <span>Tap to Copy UPI ID</span>
                    </>
                  )}
                </button>
              </div>

              {copiedApp && (
                <div className="mt-3 p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-2 animate-fadeIn">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span><strong>{PRIMARY_UPI} copied!</strong> Paste in the search bar to pay <strong>₹{formatAmount(request.payment_amount)}</strong>.</span>
                </div>
              )}
            </div>

            {/* ── METHOD 2: SCAN QR CODE (hero, order-1) ── */}
            <div className="order-1 relative border border-[#d4af37]/25 bg-gradient-to-b from-[#d4af37]/[0.06] via-white/[0.04] to-transparent rounded-3xl p-6 text-center overflow-hidden shadow-[0_10px_50px_-15px_rgba(0,0,0,0.7)] animate-pay-rise">
              <div className="pointer-events-none absolute -bottom-20 -left-16 w-48 h-48 bg-[#72232b]/20 rounded-full blur-3xl" />
              <div className="pointer-events-none absolute -top-20 -right-16 w-48 h-48 bg-[#d4af37]/12 rounded-full blur-3xl" />

              <div className="relative inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-[#f5d97a] mb-1.5">
                <QrCode className="w-4 h-4" />
                <span>Scan &amp; Pay Instantly</span>
              </div>
              <p className="relative text-[11px] text-gray-400 mb-4 max-w-xs mx-auto leading-relaxed">
                Open any UPI app, tap <strong className="text-gray-200">Scan</strong>, and point at this code. Amount &amp; payee fill in automatically.
              </p>

              {/* QR with ornamental gold corners */}
              <div className="relative inline-block">
                <div className="inline-block p-2.5 rounded-2xl bg-gradient-to-br from-[#f5d97a] via-[#d4af37] to-[#a3801f] animate-qr-breathe shadow-[0_8px_30px_-6px_rgba(212,175,55,0.5)]">
                  <div className="p-3.5 bg-white rounded-xl">
                    <QRCode value={qrUpiUri} size={230} level="M" fgColor="#0a0604" />
                  </div>
                </div>
                {/* corner ticks */}
                <span className="pointer-events-none absolute -top-1.5 -left-1.5 w-4 h-4 border-t-2 border-l-2 border-[#f5d97a] rounded-tl" />
                <span className="pointer-events-none absolute -top-1.5 -right-1.5 w-4 h-4 border-t-2 border-r-2 border-[#f5d97a] rounded-tr" />
                <span className="pointer-events-none absolute -bottom-1.5 -left-1.5 w-4 h-4 border-b-2 border-l-2 border-[#f5d97a] rounded-bl" />
                <span className="pointer-events-none absolute -bottom-1.5 -right-1.5 w-4 h-4 border-b-2 border-r-2 border-[#f5d97a] rounded-br" />
              </div>

              {/* payee chip */}
              <div className="relative mt-4 inline-flex items-center gap-2 bg-black/40 border border-white/10 rounded-full px-4 py-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[11px] text-gray-300">Paying <strong className="text-white">{PAYEE_NAME}</strong> &bull; <strong className="text-[#f5d97a]">₹{formatAmount(request.payment_amount)}</strong></span>
              </div>
            </div>

            {/* ── WhatsApp Instant Help ── */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="order-3 w-full py-3 px-4 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#25D366] font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-sm"
            >
              <WhatsAppIcon />
              <span>Pay &amp; Send Screenshot on WhatsApp (Instant Confirm)</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </a>

            {/* ── STEP 2: Confirm Payment / UTR Entry ── */}
            <div className="order-4 bg-white/5 border border-white/10 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[#d4af37] text-xs font-black shrink-0 border border-[#d4af37]/30">2</div>
                  <p className="text-sm font-bold text-white tracking-wide">Confirm After Paying</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowUtrField(!showUtrField)}
                  className="text-[10px] text-[#d4af37] underline font-bold"
                >
                  {showUtrField ? "Hide UTR Input" : "Add 12-digit UTR (Optional)"}
                </button>
              </div>

              {showUtrField && (
                <div className="mb-3">
                  <input
                    type="text"
                    placeholder="Enter 12-digit UPI Ref / UTR No."
                    value={utrInput}
                    onChange={(e) => setUtrInput(e.target.value)}
                    className="w-full bg-black/50 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37]"
                  />
                  <p className="text-[10px] text-gray-500 mt-1">
                    Found in your UPI app receipt (e.g. 423456789012)
                  </p>
                </div>
              )}

              {confirmError && (
                <p className="text-xs text-red-400 mb-2">{confirmError}</p>
              )}

              <button
                type="button"
                onClick={handleConfirmPayment}
                disabled={submittingConfirmation}
                className="w-full h-14 rounded-2xl bg-gradient-to-r from-[#d4af37] via-[#f5d97a] to-[#d4af37] text-black font-black uppercase tracking-wider text-sm shadow-[0_8px_30px_-6px_rgba(212,175,55,0.5)] active:scale-[0.98] disabled:opacity-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {submittingConfirmation ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-black" />
                    <span>Verifying &amp; Generating Report...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-black" />
                    <span>I Have Completed the Payment</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Wallet CTA for non-logged-in users */}
        {!user && request.payment_status !== "paid" && request.payment_status !== "payment_verification" && (
          <div className="py-3 border-t border-white/5 text-center">
            <p className="text-[11px] text-white/30">
              Have a wallet?{" "}
              <Link href={`/login?redirect=/payment/${reference_id}`} className="text-[#d4af37]/70 hover:text-[#d4af37] transition-colors font-semibold underline underline-offset-2">
                Sign in to pay instantly →
              </Link>
            </p>
          </div>
        )}

        {/* Footer badges */}
        <div className="py-4 flex items-center justify-center gap-6 border-t border-white/5">
          <div className="flex items-center gap-1.5 text-gray-600">
            <ShieldCheck className="h-3 w-3" />
            <span className="text-[9px] font-bold uppercase tracking-widest">Secure UPI</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-600">
            <Lock className="h-3 w-3" />
            <span className="text-[9px] font-bold uppercase tracking-widest">Encrypted</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-600">
            <CheckCircle2 className="h-3 w-3" />
            <span className="text-[9px] font-bold uppercase tracking-widest">NPCI Verified</span>
          </div>
        </div>
      </div>
    </div>
  );
}
