"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCheck, FileText, Play, ShieldCheck, BadgeCheck, Search, Lock } from "lucide-react";

/**
 * VerifiedDelivery — a trust section that SHOWS the real deliverable landing on
 * WhatsApp (audio dossier + certified PDF), then lets anyone VERIFY a report by
 * its Reference ID. Two halves of one trust loop:
 *   1. "This is what you actually receive" (WhatsApp-style proof mock).
 *   2. "And every report is authenticated — verify it yourself" (reuses /report/<ref>).
 *
 * On-brand: WhatsApp-cream chat surface, temple gold/saffron frame, dark ink.
 * Motion = whileInView transform/opacity only (once) → iOS-safe.
 *
 * NOTE: the chat bubbles are an illustrative representation of the delivery format,
 * not a specific customer's private messages.
 */

const BUBBLES: { from: "desk" | "seeker"; text: string; kind?: "audio" | "pdf" }[] = [
  { from: "seeker", text: "Namaste 🙏 I booked the Kundli reading. Ref: SM-8F3A2K" },
  { from: "desk", text: "Namaste 🙏 Your personalised reading is ready. Sending your audio dossier & certified PDF now." },
  { from: "desk", text: "Pandit Ji — Spoken Audio Dossier (12:40)", kind: "audio" },
  { from: "desk", text: "ShubhMarg_Certified_Kundli_SM-8F3A2K.pdf", kind: "pdf" },
  { from: "seeker", text: "Received both 🙏 This is so detailed, thank you Pandit Ji 🌸" },
];

export default function VerifiedDelivery() {
  const router = useRouter();
  const [ref, setRef] = useState("");

  const verify = (e: React.FormEvent) => {
    e.preventDefault();
    if (ref.trim()) router.push(`/report/${ref.trim().toUpperCase()}`);
  };

  return (
    <section className="relative section-py surface-bronze overflow-hidden">
      <span className="ember-tl" />
      <div className="relative z-10 max-w-5xl mx-auto section-px">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFFDF8] border border-[#B8860B]/30 mb-3 shadow-[0_2px_10px_rgba(107,42,20,0.1)]">
            <BadgeCheck className="w-3.5 h-3.5 text-[#22A55B]" />
            <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.26em] text-[#C25E10]">
              Verified Delivery
            </p>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold font-serif text-[#2A1810] tracking-wide">
            Every reading, traceable to a <span className="italic text-[#C25E10]">human hand.</span>
          </h2>
          <div className="flex items-center justify-center gap-2.5 mt-3">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#D4AF37]/60" />
            <span className="text-[#E8791E] text-xs">𑁍</span>
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#D4AF37]/60" />
          </div>
          <p className="text-[#2E1D14] text-xs sm:text-sm mt-3.5 font-sans font-medium max-w-lg mx-auto">
            You see exactly what you receive on WhatsApp — and every report carries a public <strong className="text-[#2A1810]">Chain of Custody</strong> showing which Acharya studied your Bhavas, Dashas and Nakshatras, and when.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-start">
          {/* ── LEFT: WhatsApp-style delivery proof ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-[26px] p-3 bg-gradient-to-b from-[#D4AF37]/30 to-[#B8860B]/15 shadow-[0_20px_50px_-24px_rgba(107,42,20,0.35)]"
          >
            {/* Phone-ish inner chat surface */}
            <div className="rounded-[20px] overflow-hidden border border-[#D4AF37]/30 bg-[#ECE5DB]">
              {/* WhatsApp header */}
              <div className="flex items-center gap-2.5 px-3.5 py-2.5 bg-[#075E54]">
                <span className="w-8 h-8 rounded-full overflow-hidden shrink-0 ring-2 ring-white/25 shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/icons/shubhmarg-icon-512.png"
                    alt="ShubhMarg"
                    className="w-full h-full object-cover"
                  />
                </span>
                <div className="min-w-0">
                  <p className="text-[12.5px] font-bold text-white leading-tight truncate">ShubhMarg Vedic Desk</p>
                  <p className="text-[10px] text-emerald-200 leading-tight">● online</p>
                </div>
                <span className="ml-auto inline-flex items-center gap-1 text-[9px] font-bold text-white/90 bg-white/15 rounded-full px-2 py-0.5">
                  <ShieldCheck className="w-2.5 h-2.5" /> Verified
                </span>
              </div>

              {/* Chat body */}
              <div className="p-3 space-y-2" style={{ background: "#ECE5DB" }}>
                {BUBBLES.map((b, i) => {
                  const isDesk = b.from === "desk";
                  return (
                    <div key={i} className={`flex ${isDesk ? "justify-start" : "justify-end"}`}>
                      <div
                        className={`max-w-[82%] rounded-2xl px-3 py-2 text-[12px] leading-snug shadow-sm ${
                          isDesk
                            ? "bg-white text-[#1A1C20] rounded-tl-sm"
                            : "bg-[#DCF8C6] text-[#1A1C20] rounded-tr-sm"
                        }`}
                      >
                        {b.kind === "audio" ? (
                          <span className="flex items-center gap-2">
                            <span className="w-7 h-7 rounded-full bg-[#075E54] text-white flex items-center justify-center shrink-0">
                              <Play className="w-3.5 h-3.5 fill-white" />
                            </span>
                            <span className="flex-1">
                              <span className="block h-1 rounded-full bg-[#075E54]/25 w-28 mb-1" />
                              <span className="text-[11px] text-[#4A5A55] font-medium">{b.text}</span>
                            </span>
                          </span>
                        ) : b.kind === "pdf" ? (
                          <span className="flex items-center gap-2">
                            <span className="w-7 h-7 rounded-lg bg-[#C0392B] text-white flex items-center justify-center shrink-0">
                              <FileText className="w-3.5 h-3.5" />
                            </span>
                            <span className="text-[11px] font-semibold text-[#2A1810] truncate">{b.text}</span>
                          </span>
                        ) : (
                          <span>{b.text}</span>
                        )}
                        {isDesk && (
                          <span className="flex items-center justify-end gap-0.5 mt-0.5">
                            <CheckCheck className="w-3 h-3 text-[#34B7F1]" />
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <p className="text-center text-[10px] text-[#6B5A48] mt-2.5 px-2">
              Illustrative of the delivery format. Your details always stay private.
            </p>
          </motion.div>

          {/* ── RIGHT: Authenticity + verify-any-report ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-4"
          >
            {/* ── CHAIN OF CUSTODY preview — the unique trust element no other astrology
                site does. Every reading is traceable to a NAMED human Acharya, with a
                per-reading Sankalp attached. This mock shows what every /report/<REF>
                page looks like — provable, not just promised. Illustrative preview. */}
            <div className="relative rounded-3xl bg-[#FFFDF8] border border-[#D4AF37]/45 p-4 sm:p-5 shadow-[0_14px_40px_-22px_rgba(107,42,20,0.3)] overflow-hidden">
              <span className="pointer-events-none absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[#E8791E]/10 blur-3xl" />

              {/* Top ribbon */}
              <div className="relative flex items-center justify-between gap-2 pb-3 border-b border-[#D4AF37]/25 mb-3">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-500/35 rounded-full px-2.5 py-0.5 uppercase tracking-wider">
                  <BadgeCheck className="w-3 h-3" /> Verified Reading
                </span>
                <span className="text-[10px] font-mono font-bold text-[#C25E10]">Ref SM-8F3A2K</span>
              </div>

              {/* Acharya line */}
              <div className="relative flex items-center gap-3 mb-3">
                <div className="shrink-0 w-11 h-11 rounded-full bg-gradient-to-br from-[#F3E5AB] via-[#D4AF37] to-[#8C6818] p-[1.5px] shadow-[0_4px_12px_-3px_rgba(184,134,11,0.5)]">
                  <div className="w-full h-full rounded-full bg-gradient-to-b from-[#FFFDF8] to-[#FDF3E2] border border-[#E8791E]/25 flex items-center justify-center">
                    <span className="font-devanagari text-[#C25E10] text-lg font-black leading-none">ॐ</span>
                  </div>
                </div>
                <div className="min-w-0">
                  <p className="text-[9.5px] font-bold uppercase tracking-wider text-[#6B5A48]">Prepared personally by</p>
                  <p className="text-[13px] font-bold font-serif text-[#22130A] leading-tight truncate">Acharya Vishnu Sharma</p>
                  <p className="text-[10px] text-[#C25E10] font-sans font-semibold">Verified Vedic Jyotishi · Kashi lineage</p>
                </div>
              </div>

              {/* Chain of custody stages */}
              <div className="relative">
                <p className="text-[9.5px] font-bold uppercase tracking-[0.22em] text-[#8C5212] mb-2">
                  ✦ Chain of Custody
                </p>
                <ol className="space-y-1.5 mb-3">
                  {[
                    { stage: "Sidereal Kundli cast · Lahiri ayanamsa applied", ts: "12 Mar · 10:15 AM" },
                    { stage: "12 Bhava & D9 Navamsha analysis · Dasha timeline built", ts: "12 Mar · 3:04 PM" },
                    { stage: "Remedies matched to your Nakshatra pada", ts: "13 Mar · 11:20 AM" },
                    { stage: "Reviewed, sealed and dispatched to you", ts: "14 Mar · 9:32 AM" },
                  ].map((s, i, arr) => (
                    <li key={s.stage} className="flex items-start gap-2 text-[11px] leading-tight">
                      <span className="relative shrink-0 mt-0.5">
                        <span className="w-3.5 h-3.5 rounded-full bg-[#22A55B] flex items-center justify-center">
                          <svg className="w-2 h-2 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        </span>
                        {i < arr.length - 1 && (
                          <span className="absolute left-1/2 -translate-x-1/2 top-full w-px h-2 bg-[#22A55B]/30" />
                        )}
                      </span>
                      <span className="flex-1 min-w-0 pt-0.5">
                        <span className="font-bold text-[#22130A]">{s.stage}</span>
                        <span className="block text-[9.5px] text-[#6B5A48] font-mono">{s.ts}</span>
                      </span>
                    </li>
                  ))}
                </ol>

                {/* Per-reading personal Sankalp — the truly unique piece */}
                <div className="relative rounded-xl bg-gradient-to-br from-[#FFF8EB] to-[#FDE8C4] border border-[#D4AF37]/50 p-3 pl-4">
                  <span className="absolute left-1.5 top-2 bottom-2 w-[3px] rounded-full bg-gradient-to-b from-[#E8791E] to-[#D4AF37]" />
                  <p className="text-[11.5px] italic text-[#2A1810] font-serif leading-snug">
                    &ldquo;Your Ascendant lord&apos;s placement, your D9 Navamsha, and the Antardasha you are passing through — each was studied for your specific chart before I wrote a single word of this dossier. Sealed with my personal Sankalp.&rdquo;
                  </p>
                  <p className="text-[9.5px] mt-1.5 flex items-center gap-1 text-[#8C5212] font-sans font-bold tracking-wide">
                    <BadgeCheck className="w-3 h-3 text-[#22A55B]" />
                    Acharya Vishnu Sharma
                  </p>
                </div>
              </div>

              <p className="relative text-center text-[9.5px] text-[#6B5A48] mt-3 font-sans italic">
                Every ShubhMarg report ships with this hand-signed trail.
              </p>
            </div>

            {/* Verify any report — premium gold-framed chamber */}
            <div className="relative rounded-3xl p-[1.5px] bg-gradient-to-br from-[#F3E5AB] via-[#D4AF37]/70 to-[#B8860B] shadow-[0_16px_44px_-20px_rgba(184,134,11,0.4)]">
              <div className="relative rounded-[22px] bg-gradient-to-b from-[#FFFDF9] via-[#FDF7EC] to-[#F7EDD9] p-5 sm:p-6 overflow-hidden">
                {/* Filigree corner accents */}
                <span className="absolute top-3 left-3 w-3 h-3 border-t border-l border-[#D4AF37]/60 rounded-tl pointer-events-none" />
                <span className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-[#D4AF37]/60 rounded-br pointer-events-none" />
                {/* Warm ambient glow */}
                <span className="pointer-events-none absolute -top-14 -right-10 w-40 h-40 rounded-full bg-[#E8791E]/10 blur-3xl" />

                {/* Header with gold medallion */}
                <div className="relative flex items-center gap-2.5 mb-4">
                  <span className="shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-[#FFEAA7] via-[#D4AF37] to-[#8C6818] p-[1.5px] shadow-[0_4px_12px_-3px_rgba(184,134,11,0.5)]">
                    <span className="w-full h-full rounded-[10px] bg-[#FFFDF8] flex items-center justify-center text-[#C25E10]">
                      <Search className="w-4 h-4" strokeWidth={2.4} />
                    </span>
                  </span>
                  <div>
                    <h4 className="text-[12.5px] sm:text-[13.5px] font-bold font-serif text-[#22130A] tracking-wide leading-tight">
                      Verify a Report
                    </h4>
                    <p className="text-[10px] text-[#8C6B1B] font-sans leading-tight">
                      Confirm any consecrated record is genuine
                    </p>
                  </div>
                </div>

                <form onSubmit={verify} className="relative flex flex-col sm:flex-row gap-2.5">
                  <input
                    type="text"
                    value={ref}
                    onChange={(e) => setRef(e.target.value)}
                    placeholder="Enter Reference ID (e.g. SM-8F3A2K)"
                    className="grow bg-[#FFFDF8] border border-[#D4AF37]/45 rounded-xl px-4 py-3 text-sm text-[#22130A] placeholder-[#6B5A48]/55 focus:outline-none focus:border-[#E8791E] focus:ring-1 focus:ring-[#E8791E]/40 font-mono uppercase tracking-wider shadow-[inset_0_2px_5px_rgba(107,42,20,0.08)]"
                  />
                  <button
                    type="submit"
                    className="group/btn relative shrink-0 inline-flex items-center justify-center gap-1.5 px-6 py-3 rounded-xl overflow-hidden bg-gradient-to-r from-[#D4AF37] via-[#FFEAA7] to-[#E8791E] text-[#120B07] font-extrabold text-xs uppercase tracking-wider shadow-[0_5px_18px_rgba(212,175,55,0.4)] hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer"
                  >
                    {/* shimmer sweep */}
                    <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/45 to-transparent" />
                    <ShieldCheck className="w-4 h-4 stroke-[2.4]" /> Verify
                  </button>
                </form>
                <p className="relative flex items-center gap-1.5 text-[10.5px] text-[#6B5A48] mt-3.5 font-sans">
                  <Lock className="w-3 h-3 text-[#B8860B]" /> Confidential — only your Reference ID is needed.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
