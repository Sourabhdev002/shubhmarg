"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Loader2, ArrowRight, Smartphone, Copy, Clock, AlertCircle } from "lucide-react";
import QRCode from "react-qr-code";
import { initiateTopup, claimTopup, checkTopupStatus } from "@/hooks/useWallet";

const PRESETS = [100, 200, 500, 1000, 2000];

interface TopupDrawerProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

type TopupStep = "select" | "pay" | "waiting" | "credited" | "rejected";

interface TopupData {
  topup_reference: string;
  amount_inr: number;
  exact_amount: number;
  upi_uri: string;
  upi_vpa: string;
}

export default function TopupDrawer({ open, onClose, onSuccess }: TopupDrawerProps) {
  const [step, setStep] = useState<TopupStep>("select");
  const [selected, setSelected] = useState<number>(500);
  const [custom, setCustom] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [topupData, setTopupData] = useState<TopupData | null>(null);
  const [copied, setCopied] = useState(false);
  const [utrInput, setUtrInput] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Portal target only exists on the client.
  useEffect(() => { setMounted(true); }, []);

  const amount = custom ? Math.floor(Number(custom)) : selected;

  // Poll for owner approval while waiting
  useEffect(() => {
    if (step !== "waiting" || !topupData) return;
    pollRef.current = setInterval(async () => {
      const status = await checkTopupStatus(topupData.topup_reference);
      if (status === "completed") {
        setStep("credited");
        onSuccess?.();
      } else if (status === "failed") {
        setStep("rejected");
      }
    }, 4000);
    return () => { if (pollRef.current) clearInterval(pollRef.current); };
  }, [step, topupData, onSuccess]);

  async function handleInitiate() {
    if (!amount || amount < 100) { setError("Minimum top-up is ₹100"); return; }
    if (amount > 5000) { setError("Maximum top-up is ₹5000 per transaction"); return; }
    setError("");
    setLoading(true);
    const data = await initiateTopup(amount);
    setLoading(false);
    if (data.error) { setError(data.error); return; }
    setTopupData(data);
    setStep("pay");
  }

  function copyUpi() {
    if (!topupData?.upi_vpa) return;
    navigator.clipboard.writeText(topupData.upi_vpa).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  }

  async function handleClaim(e: React.FormEvent) {
    e.preventDefault();
    if (!topupData) return;
    setError("");
    setSubmitting(true);
    const res = await claimTopup(topupData.topup_reference, utrInput.trim() || undefined);
    setSubmitting(false);
    if (res.error) { setError(res.error); return; }
    setStep("waiting");
  }

  function reset() {
    if (pollRef.current) clearInterval(pollRef.current);
    setStep("select"); setSelected(500); setCustom(""); setError("");
    setTopupData(null); setUtrInput(""); setLoading(false); setSubmitting(false);
  }

  function handleClose() { reset(); onClose(); }

  if (!mounted) return null;

  // Portal to document.body so the fixed drawer escapes the fixed/backdrop-blur
  // <header> ancestor (a backdrop-filter creates a containing block for fixed
  // descendants, which was pinning the sheet to the top of the screen).
  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[80]"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={handleClose}
          />
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-[81] max-w-md mx-auto"
            initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 320 }}
          >
            {/* Cap height to the viewport and scroll internally so a tall sheet
                never overflows off the top of the screen on short devices. */}
            <div className="bg-[#100c09] border border-[#d4af37]/20 rounded-t-3xl overflow-hidden shadow-[0_-20px_60px_rgba(0,0,0,0.6)] max-h-[90dvh] flex flex-col">
              <div className="flex justify-center pt-3 pb-1 shrink-0">
                <div className="w-10 h-1 rounded-full bg-white/15" />
              </div>
              <div className="h-[1.5px] mx-5 bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent mb-1 shrink-0" />

              <div className="px-5 pb-[calc(2rem+env(safe-area-inset-bottom))] pt-3 overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h3 className="text-[1.1rem] font-bold font-serif text-white">
                      {step === "select" && "Add Money to Wallet"}
                      {step === "pay" && "Complete Payment"}
                      {step === "waiting" && "Waiting for Confirmation"}
                      {step === "credited" && "Money Added!"}
                      {step === "rejected" && "Payment Not Received"}
                    </h3>
                    {step === "pay" && topupData && (
                      <p className="text-[11px] text-white/45 mt-0.5">
                        Pay exactly <span className="text-[#d4af37] font-bold">₹{topupData.exact_amount.toFixed(2)}</span> via UPI
                      </p>
                    )}
                  </div>
                  <button onClick={handleClose} className="w-8 h-8 rounded-full bg-white/8 flex items-center justify-center text-white/60 hover:text-white transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* ── STEP: Select ── */}
                {step === "select" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-5 gap-2">
                      {PRESETS.map(p => (
                        <button
                          key={p}
                          onClick={() => { setSelected(p); setCustom(""); }}
                          className={`rounded-xl py-2.5 text-[12px] font-bold transition-all border ${
                            selected === p && !custom
                              ? "bg-[#d4af37]/20 border-[#d4af37]/60 text-[#f5d97a]"
                              : "bg-white/5 border-white/10 text-white/60 hover:border-[#d4af37]/30"
                          }`}
                        >
                          ₹{p}
                        </button>
                      ))}
                    </div>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#d4af37] font-bold text-[15px]">₹</span>
                      <input
                        type="number" min={100} max={5000} placeholder="Custom amount"
                        value={custom}
                        onChange={e => { setCustom(e.target.value); setSelected(0); }}
                        className="w-full bg-white/5 border border-white/12 rounded-xl pl-8 pr-4 py-3 text-white text-[14px] placeholder-white/30 focus:outline-none focus:border-[#d4af37]/50"
                      />
                    </div>
                    {error && <p className="text-[12px] text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2">{error}</p>}
                    <button onClick={handleInitiate} disabled={loading || !amount || amount < 100} className="btn-gold w-full text-[13px] disabled:opacity-50">
                      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Add ₹{amount || "—"} <ArrowRight className="w-4 h-4" /></>}
                    </button>
                    <p className="text-center text-[11px] text-white/30">Min ₹100 · Max ₹5,000 per transaction</p>
                  </div>
                )}

                {/* ── STEP: Pay ── */}
                {step === "pay" && topupData && (
                  <div className="space-y-4">
                    <div className="flex flex-col items-center gap-3 p-4 bg-white rounded-2xl">
                      <QRCode value={topupData.upi_uri} size={160} />
                      <p className="text-[11px] text-gray-500 text-center">Scan with GPay, PhonePe, Paytm or any UPI app</p>
                    </div>
                    <div className="glass-deep rounded-xl p-4 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[11px] text-white/45">Pay exactly</span>
                        <span className="text-[16px] font-black text-[#d4af37] font-serif">₹{topupData.exact_amount.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] text-white/45">UPI ID</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[12px] font-mono text-white/80">{topupData.upi_vpa}</span>
                          <button onClick={copyUpi} className="text-[#d4af37] hover:text-[#f5d97a]">
                            {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>
                    </div>

                    <form onSubmit={handleClaim} className="space-y-3">
                      <div>
                        <label className="text-[11px] font-bold uppercase tracking-wider text-white/45 block mb-1.5">
                          <Smartphone className="w-3 h-3 inline mr-1" />
                          UTR / Transaction ID (optional)
                        </label>
                        <input
                          type="text" placeholder="12-digit UTR from your UPI app"
                          value={utrInput}
                          onChange={e => setUtrInput(e.target.value.replace(/\s/g, ""))}
                          className="w-full bg-white/5 border border-white/12 rounded-xl px-4 py-3 text-white text-[13px] font-mono placeholder-white/25 focus:outline-none focus:border-[#d4af37]/50"
                        />
                      </div>
                      {error && <p className="text-[12px] text-red-400">{error}</p>}
                      <button type="submit" disabled={submitting} className="btn-gold w-full text-[12px] disabled:opacity-50">
                        {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "I Have Paid ✓"}
                      </button>
                      <p className="text-center text-[11px] text-white/30">Tap after paying — we&apos;ll confirm within a few minutes</p>
                    </form>
                  </div>
                )}

                {/* ── STEP: Waiting for owner approval ── */}
                {step === "waiting" && (
                  <div className="text-center py-6 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-[#d4af37]/12 border border-[#d4af37]/30 flex items-center justify-center mx-auto relative">
                      <Clock className="w-7 h-7 text-[#d4af37]" />
                      <div className="absolute inset-0 rounded-full border-2 border-[#d4af37]/40 border-t-transparent animate-spin" />
                    </div>
                    <div>
                      <h4 className="text-[1.05rem] font-bold font-serif text-white">Confirming your payment</h4>
                      <p className="text-[13px] text-white/45 mt-1.5 leading-relaxed">
                        We&apos;re verifying your payment. Your wallet will be credited as soon as it&apos;s confirmed — usually within a few minutes. You can keep this open or close it.
                      </p>
                    </div>
                    <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#d4af37]/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-pulse" />
                      Checking automatically...
                    </div>
                    <button onClick={handleClose} className="text-[12px] text-white/40 hover:text-white/60 transition-colors">Close &amp; check later</button>
                  </div>
                )}

                {/* ── STEP: Credited ── */}
                {step === "credited" && (
                  <div className="text-center py-6 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="text-[1.1rem] font-bold font-serif text-white">₹{topupData?.amount_inr} Added!</h4>
                      <p className="text-[13px] text-white/45 mt-1">Your wallet has been credited successfully.</p>
                    </div>
                    <button onClick={handleClose} className="btn-gold w-full text-[13px]">Done</button>
                  </div>
                )}

                {/* ── STEP: Rejected ── */}
                {step === "rejected" && (
                  <div className="text-center py-6 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-red-500/12 border border-red-400/30 flex items-center justify-center mx-auto">
                      <AlertCircle className="w-8 h-8 text-red-400" />
                    </div>
                    <div>
                      <h4 className="text-[1.05rem] font-bold font-serif text-white">Payment Not Received</h4>
                      <p className="text-[13px] text-white/45 mt-1.5 leading-relaxed">
                        We couldn&apos;t confirm your payment. If money was deducted, please contact support with your UTR and we&apos;ll sort it out quickly.
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={reset} className="flex-1 py-3 rounded-full border border-white/15 text-white/70 text-[12px] font-bold hover:bg-white/5 transition-colors">Try Again</button>
                      <a href="/support" className="flex-1 btn-gold text-[12px]">Contact Support</a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
