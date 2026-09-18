"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Flower2, Leaf, Sparkles, Wallet, CheckCircle2, Loader2, X, ShieldCheck } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useWallet, walletSpend, formatPaise } from "@/hooks/useWallet";
import { waLink } from "@/config/contact";

/**
 * DigitalChadhava — micro sacred offerings paid instantly from the WALLET.
 *
 * Small, emotional, repeat-friendly offerings (diya, flowers, prasad, abhishek)
 * in the devotee's name — ₹51–₹501, paid in ONE TAP from wallet balance.
 * Falls back to WhatsApp when signed out or balance is low.
 */

interface Offering {
  id: string;
  name: string;
  hindi: string;
  desc: string;
  ritual: string; /** one-line ritual detail — the "un-fakeable specificity" */
  amount: number;
  icon: typeof Flame;
  accent: string;
}

const OFFERINGS: Offering[] = [
  {
    id: "diya",
    name: "Deepdaan",
    hindi: "दीपदान",
    desc: "Ghee lamp lit in your name",
    ritual: "Panchamukhi diya · Ganga ghat ritual",
    amount: 51,
    icon: Flame,
    accent: "#E8791E",
  },
  {
    id: "pushp",
    name: "Pushpanjali",
    hindi: "पुष्पांजलि",
    desc: "Sacred flowers offered to the deity",
    ritual: "108 marigolds · Shodashopachar vidhi",
    amount: 101,
    icon: Flower2,
    accent: "#D4A537",
  },
  {
    id: "tulsi",
    name: "Tulsi & Bhog",
    hindi: "तुलसी व भोग",
    desc: "Tulsi, dal & bhog in your gotra",
    ritual: "Naivedya offering · Gotra sankalp",
    amount: 251,
    icon: Leaf,
    accent: "#22A55B",
  },
  {
    id: "abhishek",
    name: "Rudra Abhishek",
    hindi: "रुद्र अभिषेक अंश",
    desc: "A share in the sacred abhishek seva",
    ritual: "Panchamrit · Bilva patra · Rudri path",
    amount: 501,
    icon: Sparkles,
    accent: "#C25E10",
  },
];

type Status = "idle" | "creating" | "paying" | "done" | "error";

export default function DigitalChadhava() {
  const { user } = useAuth();
  const { balance_paise, loading: walletLoading, refresh } = useWallet();
  const [active, setActive] = useState<Offering | null>(null);
  const [dedication, setDedication] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [err, setErr] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const balInr = balance_paise / 100;

  const openOffering = (o: Offering) => {
    setActive(o);
    setDedication("");
    setStatus("idle");
    setErr("");
  };

  const payFromWallet = async () => {
    if (!active) return;
    setStatus("creating");
    setErr("");
    try {
      const res = await fetch("/api/chadhava", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: active.amount, offering: active.name, dedication }),
      });
      const data = await res.json();
      if (!res.ok || !data.reference_id) throw new Error(data.error || "Could not create offering");

      setStatus("paying");
      const spend = await walletSpend(data.reference_id);
      if (spend?.success) {
        setStatus("done");
        refresh();
      } else if (spend?.error?.toLowerCase().includes("insufficient")) {
        setStatus("error");
        setErr("Not enough wallet balance. Please top up and try again.");
      } else {
        setStatus("error");
        setErr(spend?.error || "Payment failed — please retry.");
      }
    } catch (e) {
      setStatus("error");
      setErr(e instanceof Error ? e.message : "Something went wrong.");
    }
  };

  const offerViaWhatsApp = (o: Offering) => {
    window.open(
      waLink(`Namaste 🙏 I wish to offer *${o.name} (${o.hindi})* — ₹${o.amount} — in my name${dedication ? ` (sankalp: ${dedication})` : ""}. Please guide me.`),
      "_blank"
    );
  };

  return (
    <section className="relative section-py overflow-hidden surface-bronze">
      <span className="ember-tl" />
      {/* ambient glows */}
      <span className="pointer-events-none absolute -bottom-20 right-10 w-80 h-80 rounded-full bg-[#E8791E]/[0.08] blur-[120px]" />
      <span className="pointer-events-none absolute top-1/3 -left-10 w-64 h-64 rounded-full bg-[#D4A537]/[0.07] blur-[100px]" />

      <div className="relative z-10 max-w-4xl mx-auto section-px">

        {/* ── Premium header ───────────────────────────────────────── */}
        <div className="text-center mb-8 sm:mb-10">
          {/* eyebrow pill */}
          <div className="eyebrow-pill mb-4">
            <Flame className="w-3 h-3 text-[#E8791E]" />
            <span>डिजिटल चढ़ावा · Sacred Offerings</span>
          </div>

          {/* headline */}
          <h2 className="text-section-title mb-3">
            Offer a diya, flowers or bhog —{" "}
            <em className="not-italic text-[#C25E10]">in one tap</em>
          </h2>

          {/* gold divider */}
          <div className="gold-divider mx-auto mb-4" />

          {/* subtitle — ShubhMarg-specific, no unverifiable external claim */}
          <p className="text-xs sm:text-sm text-[#4A3728] max-w-md mx-auto leading-relaxed font-sans mt-1">
            Performed in the <strong className="text-[#8B1A1A]">Sanatan tradition</strong> — offered in your
            name, sealed with a{" "}
            <strong className="text-[#8B1A1A]">personal Sankalp</strong> and recorded in your ShubhMarg account.
          </p>

          {/* wallet balance chip */}
          {user && (
            <div className="mt-4 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FFF8EB] border border-[#D4AF37]/50 text-[11px] font-bold text-[#8C5212] shadow-sm">
              <Wallet className="w-3.5 h-3.5 text-[#C25E10]" />
              {walletLoading
                ? "Loading wallet…"
                : <>Wallet: <span className="text-[#7B0F1E] ml-0.5">₹{formatPaise(balance_paise)}</span></>}
            </div>
          )}
        </div>

        {/* ── Offering cards ───────────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {OFFERINGS.map((o, i) => (
            <motion.button
              key={o.id}
              type="button"
              onClick={() => openOffering(o)}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4, transition: { type: "spring", stiffness: 400, damping: 28 } }}
              whileTap={{ scale: 0.97 }}
              className="group relative rounded-2xl p-[1.5px] bg-gradient-to-br from-[#F3E5AB] via-[#D4AF37]/50 to-[#8C6818] shadow-[0_12px_32px_-12px_rgba(107,42,20,0.30)] cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8791E]"
            >
              {/* inner card */}
              <div className="relative rounded-[15px] bg-gradient-to-b from-[#FFFDF9] to-[#F7EDD9] p-4 overflow-hidden flex flex-col items-center text-center h-full">

                {/* accent glow on hover */}
                <span
                  className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 w-28 h-20 rounded-full blur-2xl opacity-0 group-hover:opacity-35 transition-opacity duration-500"
                  style={{ background: o.accent }}
                />

                {/* icon medallion */}
                <span className="mb-2.5 w-12 h-12 rounded-full bg-gradient-to-br from-[#F3E5AB] via-[#D4AF37] to-[#8C6818] p-[2px] shadow-[0_4px_14px_-3px_rgba(184,134,11,0.55)] group-hover:scale-110 transition-transform duration-300">
                  <span
                    className="w-full h-full rounded-full bg-gradient-to-b from-[#FFFDF8] to-[#FDF3E2] flex items-center justify-center"
                    style={{ color: o.accent }}
                  >
                    <o.icon className="w-5 h-5" strokeWidth={2.1} />
                  </span>
                </span>

                {/* hindi name */}
                <p
                  className="text-[10px] font-bold text-[#8B1A1A] leading-tight mb-0.5"
                  style={{ fontFamily: "'Tiro Devanagari Hindi', serif" }}
                >
                  {o.hindi}
                </p>

                {/* english name */}
                <h3 className="text-[13px] font-bold font-serif text-[#22130A] leading-tight">{o.name}</h3>

                {/* desc */}
                <p className="text-[9.5px] text-[#6B5A48] leading-snug mt-1 mb-1.5 flex-1">{o.desc}</p>

                {/* ritual detail — the premium specificity line */}
                <p
                  className="text-[8.5px] font-semibold tracking-wide uppercase mb-2 leading-tight"
                  style={{ color: o.accent, opacity: 0.85 }}
                >
                  {o.ritual}
                </p>

                {/* price */}
                <span className="text-[15px] font-black font-mono text-[#7B0F1E] leading-none">₹{o.amount}</span>
              </div>
            </motion.button>
          ))}
        </div>

        {/* ── Trust strip below grid ────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[10.5px] text-[#6B5A48] font-sans font-medium"
        >
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#22A55B]" />
            Logged to your ShubhMarg account
          </span>
          <span className="hidden sm:block w-px h-3 bg-[#B8860B]/30" />
          <span className="flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-[#E8791E]" />
            Personal Sankalp with every offering
          </span>
          <span className="hidden sm:block w-px h-3 bg-[#B8860B]/30" />
          <span className="flex items-center gap-1.5">
            <Wallet className="w-3.5 h-3.5 text-[#C25E10]" />
            One-tap from wallet · No forms
          </span>
        </motion.div>

      </div>

      {/* ── Offering modal — portaled to body ─────────────────────── */}
      {mounted && createPortal(
        <AnimatePresence>
          {active && (
            <motion.div
              className="fixed inset-0 z-[95] flex items-center justify-center px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="absolute inset-0 bg-[#2A1810]/55 backdrop-blur-sm" onClick={() => setActive(null)} />
              <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.97 }}
                transition={{ type: "spring", stiffness: 240, damping: 24 }}
                className="relative w-full max-w-sm rounded-3xl bg-[#FFFDF8] border border-[#D4AF37]/40 shadow-[0_30px_80px_-20px_rgba(107,42,20,0.5)] overflow-hidden"
              >
                <div className="h-[3px] bg-gradient-to-r from-transparent via-[#E8791E] to-transparent" />
                <button
                  onClick={() => setActive(null)}
                  aria-label="Close"
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#FDF3E2] border border-[#B8860B]/25 flex items-center justify-center text-[#6B5A48] hover:text-[#C25E10] transition-colors cursor-pointer z-10"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="p-6 text-center">
                  {status === "done" ? (
                    <div className="py-4">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 18 }}
                        className="w-16 h-16 mx-auto rounded-full bg-emerald-50 border-2 border-emerald-300 flex items-center justify-center mb-4"
                      >
                        <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                      </motion.div>
                      <h3 className="text-lg font-bold font-serif text-[#22130A] mb-1">ॐ Offering accepted 🙏</h3>
                      <p className="text-[12.5px] text-[#6B5A48] mb-1">
                        Your <strong>{active.name}</strong> has been received.
                      </p>
                      <p className="text-[11px] text-[#8B5E3C] mb-4">Recorded in your ShubhMarg Sankalp. May blessings flow to you and your lineage.</p>
                      <button onClick={() => setActive(null)} className="text-[12px] font-bold text-[#C25E10] uppercase tracking-widest cursor-pointer">
                        Close
                      </button>
                    </div>
                  ) : (
                    <>
                      {/* icon */}
                      <span className="inline-block w-14 h-14 rounded-full bg-gradient-to-br from-[#F3E5AB] via-[#D4AF37] to-[#8C6818] p-[2px] mb-3">
                        <span className="w-full h-full rounded-full bg-[#FFFDF8] flex items-center justify-center" style={{ color: active.accent }}>
                          <active.icon className="w-6 h-6" />
                        </span>
                      </span>

                      <h3 className="text-lg font-bold font-serif text-[#22130A]">{active.name}</h3>
                      <p className="text-[10px] font-semibold uppercase tracking-widest mb-1" style={{ color: active.accent }}>
                        {active.ritual}
                      </p>
                      <p className="text-[11px] text-[#6B5A48] mb-4">
                        {active.desc} · <strong className="text-[#7B0F1E]">₹{active.amount}</strong>
                      </p>

                      <input
                        value={dedication}
                        onChange={(e) => setDedication(e.target.value)}
                        placeholder="Sankalp: offer in whose name? (optional)"
                        className="w-full mb-4 bg-[#FBF6EC] border border-[#D4AF37]/35 rounded-xl px-3.5 py-2.5 text-sm text-[#22130A] placeholder:text-[#A08060] focus:outline-none focus:border-[#E8791E] transition-colors"
                        style={{ fontSize: "16px" }}
                      />

                      {err && (
                        <p className="text-[12px] text-rose-700 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2 mb-3">
                          {err}
                        </p>
                      )}

                      {user ? (
                        balInr >= active.amount ? (
                          <button
                            onClick={payFromWallet}
                            disabled={status === "creating" || status === "paying"}
                            className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F5A623] to-[#E8791E] text-[#120B07] font-extrabold text-xs uppercase tracking-wide shadow-[0_4px_18px_rgba(212,175,55,0.4)] hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer disabled:opacity-60"
                          >
                            {status === "creating" || status === "paying" ? (
                              <><Loader2 className="w-4 h-4 animate-spin" /> Offering…</>
                            ) : (
                              <><Wallet className="w-4 h-4" /> Offer ₹{active.amount} from Wallet</>
                            )}
                          </button>
                        ) : (
                          <>
                            <p className="text-[11.5px] text-[#8C5212] mb-2">
                              Wallet balance ₹{formatPaise(balance_paise)} — not enough for this offering.
                            </p>
                            <a
                              href="/wallet"
                              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-[#22130A] text-[#FFF7E8] font-extrabold text-xs uppercase tracking-wide hover:bg-[#3D2317] transition-colors cursor-pointer"
                            >
                              <Wallet className="w-4 h-4 text-[#F5A623]" /> Top up wallet
                            </a>
                          </>
                        )
                      ) : (
                        <>
                          <a
                            href="/login"
                            className="w-full inline-flex items-center justify-center gap-2 py-3 mb-2 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F5A623] to-[#E8791E] text-[#120B07] font-extrabold text-xs uppercase tracking-wide shadow-[0_4px_18px_rgba(212,175,55,0.4)] hover:brightness-105 transition-all cursor-pointer"
                          >
                            <Wallet className="w-4 h-4" /> Sign in to offer from Wallet
                          </a>
                          <button
                            onClick={() => offerViaWhatsApp(active)}
                            className="w-full text-[11.5px] font-bold text-[#C25E10] underline underline-offset-2 cursor-pointer"
                          >
                            Or request via WhatsApp
                          </button>
                        </>
                      )}
                    </>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
