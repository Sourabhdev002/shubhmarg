"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, Copy, CheckCircle2, HeartHandshake, ShieldCheck, QrCode, ArrowRight } from "lucide-react";
import QRCode from "react-qr-code";
import { buildUpiUri, formatAmount } from "@/lib/upi";
import { getUpiVpa, getUpiPayeeName } from "@/lib/upi-config";
import { waLink } from "@/config/contact";
import { getPaytmLink } from "@/config/paytm-links";
import PayNowButton from "@/components/shared/PayNowButton";

/**
 * DonateModal — a ShubhMarg-branded "Scan to Donate" widget.
 *
 * The temple-aesthetic answer to a generic donate popup: marble + saffron + gold,
 * amount presets, a real UPI QR, copy-link, and an "I Have Paid" → WhatsApp confirm.
 *
 * NOTE on the payee name: the modal DISPLAYS "ShubhMarg" and sets pn=ShubhMarg on
 * the UPI link, but a payer's UPI app (GPay/PhonePe) shows the BANK-REGISTERED name
 * on the VPA. To show "ShubhMarg" inside the payment app, the VPA must belong to a
 * business/merchant account registered as ShubhMarg. The widget is ready either way.
 */

const PRESETS = [51, 101, 251, 501, 1100];

// Spring presets from motion-and-trends playbook
const SMOOTH = { type: "spring" as const, stiffness: 260, damping: 28 };
const SNAPPY = { type: "spring" as const, stiffness: 400, damping: 30 };

interface DonateModalProps {
  open: boolean;
  onClose: () => void;
  /** Optional display name for the cause/foundation. Defaults to "ShubhMarg". */
  causeName?: string;
}

export default function DonateModal({ open, onClose, causeName = "ShubhMarg" }: DonateModalProps) {
  const [mounted, setMounted] = useState(false);
  const [selected, setSelected] = useState<number>(101);
  const [custom, setCustom] = useState("");
  const [copied, setCopied] = useState(false);
  const [paidTapped, setPaidTapped] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => { setMounted(true); }, []);

  // Lock body scroll while open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  const amount = custom ? Math.max(0, Math.floor(Number(custom) || 0)) : selected;

  const vpa = getUpiVpa();
  const payeeName = getUpiPayeeName();

  // UPI intent: display name = the cause, amount pre-filled. pn is a hint; the payer's
  // app may override it with the bank-verified name on the VPA.
  const upiUri = buildUpiUri({ payeeVpa: vpa, payeeName: causeName, amount });

  const copyLink = () => {
    try {
      navigator.clipboard?.writeText(upiUri);
    } catch { /* clipboard blocked — user can still scan the QR */ }
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const whatsappMsg =
    `Namaste ${causeName} 🙏\n\nI have donated a seva contribution:\n` +
    `• Amount: *₹${formatAmount(amount)}*\n\nPlease confirm my donation. 🌸`;
  const whatsappUrl = waLink(whatsappMsg);

  const handlePaid = () => {
    setPaidTapped(true);
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  const reset = () => { setPaidTapped(false); setCustom(""); setSelected(101); setCopied(false); };
  const handleClose = () => { reset(); onClose(); };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          {/* Dimmed backdrop */}
          <motion.div
            className="fixed inset-0 z-[90] bg-[#2A1810]/45 backdrop-blur-[2px]"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Centered card */}
          <motion.div
            className="fixed inset-0 z-[91] flex items-center justify-center p-4 pointer-events-none"
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 16 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 8 }}
            transition={SMOOTH}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-label={`Donate to ${causeName}`}
              className="pointer-events-auto relative w-full max-w-sm max-h-[92dvh] overflow-y-auto rounded-[28px] bg-[#FBF6EC] border border-[#B8860B]/25 shadow-[0_30px_90px_-20px_rgba(42,24,16,0.5)]"
            >
              {/* Gold top seam */}
              <div className="h-[3px] bg-gradient-to-r from-transparent via-[#D4A537] to-transparent" />

              {/* Close */}
              <button
                onClick={handleClose}
                aria-label="Close"
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#EFE0C6] text-[#6B5A48] flex items-center justify-center hover:bg-[#E8791E]/15 hover:text-[#C25E10] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="px-6 pt-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
                {/* Header */}
                <div className="text-center mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[#F5A623] to-[#E8791E] shadow-[0_6px_18px_-4px_rgba(232,121,30,0.5)] mb-3">
                    <HeartHandshake className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-cormorant text-[1.7rem] leading-tight font-bold text-[#2A1810]">
                    Scan to Donate
                  </h3>
                  <p className="text-[12px] text-[#6B5A48] mt-0.5">
                    Support <span className="font-semibold text-[#C25E10]">{causeName}</span> · drop by drop seva
                  </p>
                </div>

                {paidTapped ? (
                  /* ── Thank-you / confirm state ── */
                  <div className="text-center py-6">
                    <div className="w-16 h-16 rounded-full bg-[#E8791E]/12 border border-[#E8791E]/30 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8 text-[#C25E10]" />
                    </div>
                    <h4 className="font-cormorant text-[1.4rem] font-bold text-[#2A1810]">Dhanyavaad 🙏</h4>
                    <p className="text-[13px] text-[#6B5A48] mt-1.5 leading-relaxed max-w-[16rem] mx-auto">
                      We opened WhatsApp so you can send your payment screenshot for instant confirmation of your ₹{formatAmount(amount)} seva.
                    </p>
                    <button
                      onClick={handleClose}
                      className="btn-gold mt-5 w-full text-[13px]"
                    >
                      Done
                    </button>
                    <button
                      onClick={() => setPaidTapped(false)}
                      className="mt-2 text-[12px] text-[#6B5A48] hover:text-[#2A1810] transition-colors"
                    >
                      ← Back
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Amount presets */}
                    <div className="grid grid-cols-5 gap-1.5 mb-3">
                      {PRESETS.map((p) => {
                        const active = selected === p && !custom;
                        return (
                          <motion.button
                            key={p}
                            whileTap={{ scale: 0.95 }}
                            transition={SNAPPY}
                            onClick={() => { setSelected(p); setCustom(""); }}
                            className={`rounded-xl py-2 text-[12px] font-bold border transition-colors ${
                              active
                                ? "bg-[#E8791E] border-[#C25E10] text-white shadow-[0_4px_12px_-3px_rgba(232,121,30,0.5)]"
                                : "bg-[#FFFDF8] border-[#B8860B]/25 text-[#6B5A48] hover:border-[#E8791E]/50"
                            }`}
                          >
                            ₹{p}
                          </motion.button>
                        );
                      })}
                    </div>

                    {/* Custom amount */}
                    <div className="relative mb-4">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C25E10] font-bold text-[15px]">₹</span>
                      <input
                        type="number"
                        min={1}
                        inputMode="numeric"
                        placeholder="Enter any amount"
                        value={custom}
                        onChange={(e) => { setCustom(e.target.value); setSelected(0); }}
                        className="w-full bg-[#FFFDF8] border border-[#B8860B]/25 rounded-xl pl-8 pr-4 py-2.5 text-[14px] text-[#2A1810] placeholder-[#6B5A48]/50 focus:outline-none focus:border-[#E8791E] transition-colors"
                      />
                    </div>

                    {/* QR */}
                    <div className="flex flex-col items-center">
                      <div className="relative inline-block p-2.5 rounded-2xl bg-gradient-to-br from-[#F5D97A] via-[#D4A537] to-[#B8860B] shadow-[0_8px_28px_-8px_rgba(184,134,11,0.55)]">
                        <div className="p-3 bg-white rounded-xl">
                          <QRCode value={upiUri} size={188} level="M" fgColor="#2A1810" />
                        </div>
                        <span className="pointer-events-none absolute -top-1.5 -left-1.5 w-4 h-4 border-t-2 border-l-2 border-[#F5A623] rounded-tl" />
                        <span className="pointer-events-none absolute -top-1.5 -right-1.5 w-4 h-4 border-t-2 border-r-2 border-[#F5A623] rounded-tr" />
                        <span className="pointer-events-none absolute -bottom-1.5 -left-1.5 w-4 h-4 border-b-2 border-l-2 border-[#F5A623] rounded-bl" />
                        <span className="pointer-events-none absolute -bottom-1.5 -right-1.5 w-4 h-4 border-b-2 border-r-2 border-[#F5A623] rounded-br" />
                      </div>
                      <p className="text-[11px] text-[#6B5A48] mt-3 flex items-center gap-1.5">
                        <QrCode className="w-3.5 h-3.5 text-[#C25E10]" />
                        Scan with GPay, PhonePe, Paytm or any UPI app
                      </p>
                    </div>

                    {/* UPI link + copy */}
                    <div className="mt-4 bg-[#FFFDF8] border border-[#B8860B]/25 rounded-xl px-3.5 py-3">
                      <p className="text-[10px] text-[#6B5A48] font-bold uppercase tracking-wider mb-1">UPI ID</p>
                      <p className="text-[12px] font-mono text-[#2A1810] font-semibold break-all leading-snug mb-2.5 select-all">{vpa}</p>
                      <motion.button
                        whileTap={{ scale: 0.98 }}
                        transition={SNAPPY}
                        onClick={copyLink}
                        className="w-full inline-flex items-center justify-center gap-1.5 text-[12px] font-bold text-[#2A1810] bg-[#EFE0C6] hover:bg-[#F3E6CE] border border-[#B8860B]/30 px-3 py-2.5 rounded-lg transition-colors"
                      >
                        {copied ? (
                          <><CheckCircle2 className="w-3.5 h-3.5 text-[#C25E10]" /> Copied UPI Link!</>
                        ) : (
                          <><Copy className="w-3.5 h-3.5" /> Copy UPI Link</>
                        )}
                      </motion.button>
                    </div>

                    {/* Pay on Paytm (hosted link — works on desktop + all phones).
                        Uses the generic "any amount" link; the amount is pre-copied so
                        the payer pastes it on Paytm's page. Renders only if configured. */}
                    {amount > 0 && getPaytmLink(amount) && (
                      <div className="mt-4">
                        <PayNowButton
                          amount={amount}
                          label={`Donate \u20b9${formatAmount(amount)} Securely`}
                          className="w-full"
                          onOpened={() => setPaidTapped(true)}
                        />
                        <p className="text-center text-[10.5px] text-[#6B5A48]/70 mt-1.5">
                          Amount copied — enter {"\u20b9"}{formatAmount(amount)} on the secure page.
                        </p>
                      </div>
                    )}

                    {/* Payee assurance chip */}
                    <div className="mt-3 flex items-center justify-center gap-2 text-[11px] text-[#6B5A48]">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#B8860B]" />
                      <span>Paying <strong className="text-[#2A1810]">{payeeName}</strong></span>
                    </div>

                    {/* Actions */}
                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={handleClose}
                        className="flex-1 py-3 rounded-full border border-[#B8860B]/30 text-[#6B5A48] text-[12px] font-bold hover:bg-[#EFE0C6] transition-colors"
                      >
                        Cancel
                      </button>
                      <motion.button
                        whileTap={{ scale: 0.98 }}
                        transition={SNAPPY}
                        onClick={handlePaid}
                        className="flex-1 btn-gold text-[12px]"
                      >
                        I Have Paid <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </div>
                    <p className="text-center text-[10.5px] text-[#6B5A48]/70 mt-2.5">
                      Tap after paying to send your screenshot for instant confirmation.
                    </p>
                  </>
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
