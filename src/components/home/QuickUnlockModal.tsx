"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import QRCode from "react-qr-code";
import { X, CheckCircle2, Loader2, Smartphone, ShieldCheck, Sparkles } from "lucide-react";
import { getUpiVpa, getUpiPayeeName } from "@/lib/upi-config";
import { pixelInitiateCheckout, pixelLead } from "@/components/analytics/pixelEvents";

interface Props {
  open: boolean;
  onClose: () => void;
  rashiKey: string;
  rashiEn: string;
  blessing: string; // the full personal guidance shown AFTER payment
  amount?: number;
}

type Step = "pay" | "verifying" | "done";

export default function QuickUnlockModal({ open, onClose, rashiKey, rashiEn, blessing, amount = 11 }: Props) {
  const [step, setStep] = useState<Step>("pay");
  const [mounted, setMounted] = useState(false);

  // portal mount guard
  if (typeof window !== "undefined" && !mounted) setMounted(true);
  if (!open || !mounted) return null;

  const vpa = getUpiVpa();
  const payee = getUpiPayeeName();
  const upiUri =
    `upi://pay?pa=${vpa}&pn=${encodeURIComponent(payee)}` +
    `&am=${amount}.00&cu=INR&tn=${encodeURIComponent("ShubhMarg Aaj Ka Aashirwad " + rashiKey)}`;

  const handlePaid = async () => {
    setStep("verifying");
    pixelInitiateCheckout(amount);
    try {
      await fetch("/api/quick-unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product: "aaj-ka-aashirwad", rashi: `${rashiKey} (${rashiEn})`, amount }),
      });
    } catch { /* deliver anyway */ }
    pixelLead("aaj-ka-aashirwad");
    setTimeout(() => setStep("done"), 900);
  };

  return createPortal(
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[95] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.97 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-md rounded-3xl bg-gradient-to-b from-[#FFFDF9] via-[#FCF6EA] to-[#F5EAD6] border border-[#D4AF37]/45 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)] overflow-hidden"
        >
          <button onClick={onClose} className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-[#6B5A48] transition-colors">
            <X className="w-4 h-4" />
          </button>

          {step === "pay" && (
            <div className="p-6 text-center">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFF3D6] border border-[#D4AF37]/50 mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#C25E10]" />
                <span className="text-[10.5px] font-bold uppercase tracking-widest text-[#8C3F08]">Aaj Ka Aashirwad</span>
              </div>
              <h3 className="text-xl font-bold font-cormorant text-[#2A1810]">Scan &amp; Pay {"\u20b9"}{amount}</h3>
              <p className="text-[12px] text-[#6B5A48] mt-1 mb-4">{rashiKey} ({rashiEn}) {"\u2022"} GPay / PhonePe / Paytm</p>

              <div className="inline-block p-3 bg-white rounded-2xl border border-[#D4AF37]/30 shadow-sm">
                <QRCode value={upiUri} size={180} level="M" fgColor="#1a0f09" />
              </div>

              <a href={upiUri} className="mt-4 w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-[14px] bg-gradient-to-r from-[#E8791E] via-[#F5A623] to-[#E8791E] text-white shadow-[0_4px_16px_rgba(232,121,30,0.4)] active:scale-95 transition-all">
                <Smartphone className="w-4 h-4" /> Pay {"\u20b9"}{amount} in UPI app
              </a>

              <button onClick={handlePaid} className="mt-3 w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-[14px] bg-gradient-to-r from-[#25D366] to-[#1EB955] text-white shadow-[0_4px_16px_rgba(30,185,85,0.4)] active:scale-95 transition-all">
                <CheckCircle2 className="w-4 h-4" /> I&apos;ve Paid {"\u2014"} Show my Aashirwad
              </button>
              <p className="text-[10px] text-[#8C5212]/70 mt-2 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Instant {"\u00b7"} 100% confidential
              </p>
            </div>
          )}

          {step === "verifying" && (
            <div className="p-10 text-center">
              <Loader2 className="w-8 h-8 text-[#E8791E] animate-spin mx-auto mb-3" />
              <p className="text-[14px] font-serif text-[#2A1810]">Aapka aashirwad taiyaar ho raha hai{"\u2026"}</p>
            </div>
          )}

          {step === "done" && (
            <div className="p-6 text-center">
              <div className="w-14 h-14 rounded-full bg-emerald-500/15 flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-7 h-7 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold font-cormorant text-[#2A1810] mb-1">Aaj Ka Aashirwad {"\u00b7"} {rashiKey}</h3>
              <div className="mt-3 rounded-2xl bg-[#FBF6EC] border border-[#D4AF37]/30 p-4 text-left">
                <p className="text-[14px] font-cormorant font-semibold text-[#2A1810] leading-relaxed">{"\u201c"}{blessing}{"\u201d"}</p>
              </div>
              <p className="text-[11px] text-[#6B5A48] mt-3">Ek diya aapke naam se prajwalit kiya gaya hai {"\ud83e\ude94"}. Aapka poora margdarshan WhatsApp par bhi bheja jaayega.</p>
              <button onClick={onClose} className="mt-4 px-6 py-2.5 rounded-full font-bold text-[13px] bg-[#2A1810] text-[#FDF5E6] active:scale-95 transition-all">Dhanyavaad {"\ud83d\ude4f"}</button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
