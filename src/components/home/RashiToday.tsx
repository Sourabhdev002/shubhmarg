"use client";

import React, { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Compass,
  Gem,
  Volume2,
  CheckCircle2,
  Orbit,
  ChevronDown,
} from "lucide-react";
import { RASHIS, RashiInfo } from "@/lib/zodiac-data";
import { RashiMedallionCard } from "./3d/RashiMedallionCard";
import { ZODIAC_GLYPH_PATHS } from "@/lib/shubhmarg-assets";
import { useT } from "@/context/LanguageContext";
import { waLink } from "@/config/contact";
import { pixelContact } from "@/components/analytics/pixelEvents";
import QuickUnlockModal from "@/components/home/QuickUnlockModal";

// Dynamic load the 3D WebGL Constellation Canvas for instant performance & SSR safety
const Rashi3DCanvas = dynamic(() => import("./3d/Rashi3DCanvas"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-44 sm:h-52 rounded-2xl bg-[#F5EAD6] border border-[#B8860B]/20 flex items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <span className="w-5 h-5 border-2 border-[#E8791E] border-t-transparent rounded-full animate-spin" />
        <span className="text-[10px] text-[#6B5A48] uppercase tracking-[0.25em] font-mono">
          Aligning 3D Constellation...
        </span>
      </div>
    </div>
  ),
});

// Deterministic Star Rating Component
function StarRating({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`text-sm ${
            star <= count
              ? "text-[#E8791E] drop-shadow-[0_0_4px_rgba(232,121,30,0.4)]"
              : "text-[#6B5A48]/40"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
}

const LUCKY_COLORS = [
  { name: "Surya Gold", hex: "#C9A24A" },
  { name: "Crimson Ruby", hex: "#D64527" },
  { name: "Emerald Sage", hex: "#2EAA68" },
  { name: "Cosmic Azure", hex: "#466B99" },
  { name: "Amethyst Violet", hex: "#8B5FBF" },
  { name: "Saffron Amber", hex: "#E0A030" },
];

// ── "Aaj Ka Ek Line" — the one instant verdict a seeker actually came for ──
// Deterministic per (sign + calendar day): picks the sign's strongest aspect today
// and returns a punchy line + a cosmic "mood" that colours the medallion aura.
type DailyMood = "auspicious" | "favourable" | "steady" | "reflective";

interface DailyVerdict {
  line: string;
  mood: DailyMood;
  ringColor: string;   // aura colour for the mood ring
  chipClass: string;   // pill styling for the verdict banner
  label: string;       // short mood label
}

const MOOD_STYLE: Record<DailyMood, { ringColor: string; chipClass: string; label: string }> = {
  auspicious: {
    ringColor: "#E8791E",
    chipClass: "bg-gradient-to-r from-[#FFF3E0] to-[#FDE8C4] text-[#8B3A05] border-[#E8791E]/45",
    label: "अति शुभ • Highly Auspicious",
  },
  favourable: {
    ringColor: "#D4A537",
    chipClass: "bg-gradient-to-r from-[#FFF8EB] to-[#FBEFD0] text-[#7A5A10] border-[#D4A537]/50",
    label: "शुभ • Favourable",
  },
  steady: {
    ringColor: "#2EAA68",
    chipClass: "bg-gradient-to-r from-[#EAF7EF] to-[#DCF0E4] text-[#1B6B42] border-[#2EAA68]/40",
    label: "स्थिर • Steady",
  },
  reflective: {
    ringColor: "#466B99",
    chipClass: "bg-gradient-to-r from-[#EAF0F7] to-[#DDE7F2] text-[#2E4A6B] border-[#466B99]/40",
    label: "मननशील • Reflective",
  },
};

// One-liners keyed by the day's strongest life aspect. Two variants each so the
// verdict subtly rotates across days without ever feeling random.
const VERDICT_LINES: Record<"love" | "career" | "finance" | "energy", string[]> = {
  love:    ["Warmth flows in relationships — speak from the heart today.", "A tender conversation heals more than you expect."],
  career:  ["Bold career moves are blessed — act with confidence.", "Leadership shines today; take the initiative you delayed."],
  finance: ["A favourable window for money matters and smart saving.", "Trust your instinct on a financial decision — it's aligned."],
  energy:  ["High vitality — channel it into one focused task.", "Your drive is strong; begin what you've been postponing."],
};

function getDailyVerdict(rashi: RashiInfo): DailyVerdict {
  // Day seed: same result all day, changes tomorrow. IST-safe enough for a mood.
  const now = new Date();
  const dayNum = Math.floor(
    new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })).getTime() / 86400000
  );
  const aspects = [
    { key: "love" as const, val: rashi.stars.love },
    { key: "career" as const, val: rashi.stars.career },
    { key: "finance" as const, val: rashi.stars.finance },
    { key: "energy" as const, val: rashi.stars.energy },
  ];
  // Rotate which of the top aspects leads today (adds daily variety, stays honest).
  const sorted = [...aspects].sort((a, b) => b.val - a.val);
  const lead = sorted[(dayNum + rashi.id) % 2 === 0 ? 0 : Math.min(1, sorted.length - 1)];
  const variants = VERDICT_LINES[lead.key];
  const line = variants[(dayNum + rashi.id) % variants.length];

  const avg = (rashi.stars.love + rashi.stars.career + rashi.stars.finance + rashi.stars.energy) / 4;
  const mood: DailyMood =
    lead.val >= 5 || avg >= 4.5 ? "auspicious"
    : avg >= 4 ? "favourable"
    : avg >= 3.4 ? "steady"
    : "reflective";

  return { line, mood, ...MOOD_STYLE[mood] };
}

export default function RashiToday() {
  const t = useT();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [copiedMantra, setCopiedMantra] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [unlockOpen, setUnlockOpen] = useState(false);

  const today = new Date();
  const dateLabel = today.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const selectedRashi: RashiInfo | null =
    selectedId !== null ? RASHIS[selectedId] || null : null;

  const luckyColor = selectedRashi
    ? LUCKY_COLORS[selectedId! % LUCKY_COLORS.length]
    : LUCKY_COLORS[0];

  const verdict = selectedRashi ? getDailyVerdict(selectedRashi) : null;

  const handleCopyMantra = (mantra: string) => {
    navigator.clipboard.writeText(mantra);
    setCopiedMantra(true);
    setTimeout(() => setCopiedMantra(false), 2000);
  };

  return (
    <section id="rashi-today" style={{ scrollMarginTop: "72px" }} className="relative pt-6 sm:pt-10 pb-10 sm:pb-16 overflow-hidden surface-obsidian">
      {/* 6-Layer Celestial Background System */}
      {/* Layer 1: Ivory Base (surface-obsidian renders bright) */}
      {/* Layer 2: Subtle Warm Saffron Radial Glow */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[650px] bg-[#F5A623]/[0.10] rounded-full blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 right-10 w-96 h-96 bg-[#F5A623]/[0.10] rounded-full blur-[130px]" />

      {/* Layer 4: Faint Celestial Orbit Rings */}
      <div className="pointer-events-none absolute top-12 left-1/2 -translate-x-1/2 w-[900px] h-[900px] border border-[#B8860B]/[0.10] rounded-full" />
      <div className="pointer-events-none absolute top-28 left-1/2 -translate-x-1/2 w-[720px] h-[720px] border border-dashed border-[#B8860B]/[0.08] rounded-full" />

      {/* Layer 5: Very low-opacity Vedic Mandala Watermark */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] opacity-[0.06] bg-[radial-gradient(circle_at_center,#B8860B_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        {/* Editorial Manuscript Section Header */}
        <div className="text-center mb-9 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFFDF8] border border-[#B8860B]/30 mb-3 shadow-[0_2px_10px_rgba(107,42,20,0.1)]">
            <span className="text-[#E8791E] text-xs">✦</span>
            <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.28em] text-[#C25E10]">
              {t("rashi.eyebrow")}
            </p>
            <span className="text-[#E8791E] text-xs">✦</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-serif text-[#2A1810] tracking-wide">
            {t("rashi.title")}
          </h2>

          {/* Ornamental Divider */}
          <div className="flex items-center justify-center gap-2.5 mt-3.5">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#D4AF37]/60" />
            <span className="text-[#E8791E] text-xs sm:text-sm">𑁍</span>
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#D4AF37]/60" />
          </div>

          <p className="text-[#2E1D14] text-xs sm:text-sm mt-3.5 font-sans font-medium">
            {t("rashi.tapPrompt")} &bull;{" "}
            <span className="text-[#C25E10] font-semibold">{dateLabel}</span>
          </p>
        </div>

        {/* 12 Rashi Medallion Grid */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3 px-1">
            <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-[#2E1D14]">
              {t("rashi.selectPrompt")}
            </p>
            <span className="text-[10px] text-[#B8860B] font-serif">{t("rashi.signs")}</span>
          </div>

          {/* Card-less medallion grid — circles float directly on the cream */}
          <div
            role="tablist"
            aria-label="Vedic Zodiac Signs"
            className="grid grid-cols-4 sm:grid-cols-6 gap-y-4 gap-x-1 sm:gap-x-2"
          >
            {RASHIS.map((rashi, i) => (
              <motion.div
                key={rashi.key}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.5,
                  delay: (i % 6) * 0.05 + Math.floor(i / 6) * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative"
              >
                <RashiMedallionCard
                  rashi={rashi}
                  isActive={selectedId === rashi.id}
                  onSelect={() => {
                    setSelectedId(rashi.id);
                    setDetailsOpen(false);
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Revealed Celestial Reading Panel */}
        <AnimatePresence mode="wait">
          {selectedRashi ? (
            <motion.div
              key={selectedRashi.key}
              initial={{ opacity: 0, y: 20, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.99 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 relative rounded-3xl border border-[#B8860B]/25 bg-[#FFFDF8] p-6 sm:p-9 overflow-hidden shadow-[0_20px_55px_-26px_rgba(107,42,20,0.28)]"
            >
              {/* Corner Ambient Glow */}
              <div
                className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full blur-[110px] opacity-25"
                style={{ backgroundColor: selectedRashi.elementColor }}
              />

              {/* Reading Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-[#B8860B]/20">
                <div className="flex items-center gap-4">
                  {/* Master 3D Emblem Medallion with live "cosmic mood" aura ring —
                      the rotating halo colour reflects today's energy for this sign. */}
                  <div className="relative shrink-0">
                    {verdict && (
                      <>
                        <motion.span
                          aria-hidden
                          className="pointer-events-none absolute -inset-1.5 rounded-[20px]"
                          style={{ background: `conic-gradient(from 0deg, transparent, ${verdict.ringColor}, transparent 65%)` }}
                          animate={{ rotate: 360 }}
                          transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.span
                          aria-hidden
                          className="pointer-events-none absolute -inset-2 rounded-[22px] blur-md"
                          style={{ background: verdict.ringColor, opacity: 0.18 }}
                          animate={{ opacity: [0.12, 0.28, 0.12] }}
                          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                        />
                      </>
                    )}
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#D4AF37] via-[#F3E5AB] to-[#AA8822] p-[1.5px] shadow-[0_4px_24px_rgba(212,175,55,0.4)] overflow-hidden">
                    {selectedRashi.image ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={selectedRashi.image}
                        alt={`${selectedRashi.key} 3D Vedic Medallion`}
                        className="w-full h-full object-cover rounded-2xl"
                      />
                    ) : (
                      <div className="w-full h-full rounded-2xl bg-[#FDF3E2] flex items-center justify-center text-[#C25E10]">
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d={ZODIAC_GLYPH_PATHS[selectedRashi.key] || ""} />
                        </svg>
                      </div>
                    )}
                  </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2.5">
                      <h3 className="text-2xl sm:text-3xl font-bold font-serif text-[#2A1810] tracking-wide">
                        {selectedRashi.key}
                      </h3>
                      <span className="text-sm text-[#2E1D14] font-medium font-sans">
                        ({selectedRashi.en})
                      </span>
                      <span className="px-2.5 py-0.5 text-xs font-serif font-bold text-[#C25E10] bg-[#FDF3E2] rounded-md border border-[#B8860B]/30">
                        {selectedRashi.sanskrit}
                      </span>
                    </div>
                    <p className="text-xs text-[#2E1D14] font-semibold tracking-wider mt-1">
                      {t("rashi.rulingGraha")}{" "}
                      <span className="text-[#C25E10] font-semibold">
                        {selectedRashi.rulingPlanet} {selectedRashi.rulingPlanetSymbol}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Auspicious Badges */}
                <div className="flex items-center gap-2 flex-wrap sm:justify-end">
                  <span className="px-3 py-1 rounded-full bg-[#FDF3E2] border border-[#B8860B]/30 text-[11px] text-[#C25E10] font-medium flex items-center gap-1.5 shadow-sm">
                    <Compass className="w-3.5 h-3.5 text-[#B8860B]" />
                    {selectedRashi.luckyDirection}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#FDF3E2] border border-[#B8860B]/30 text-[11px] text-[#C25E10] font-medium flex items-center gap-1.5 shadow-sm">
                    <Gem className="w-3.5 h-3.5 text-[#B8860B]" />
                    {selectedRashi.gemstone}
                  </span>
                </div>
              </div>

              {/* 3D WebGL Constellation Canvas */}
              <div className="mb-4">
                <Rashi3DCanvas rashi={selectedRashi} />
              </div>

              {/* ── "AAJ KA EK LINE" — instant daily verdict (the thing they came for) ── */}
              {verdict && (
                <motion.div
                  key={`verdict-${selectedRashi.id}`}
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className={`mb-5 rounded-2xl border px-4 py-3.5 flex items-start gap-3 shadow-[0_6px_20px_-10px_rgba(107,42,20,0.25)] ${verdict.chipClass}`}
                >
                  <span
                    className="mt-0.5 w-2.5 h-2.5 rounded-full shrink-0 animate-pulse"
                    style={{ backgroundColor: verdict.ringColor, boxShadow: `0 0 10px ${verdict.ringColor}` }}
                  />
                  <div className="min-w-0">
                    <p className="text-[9.5px] font-bold uppercase tracking-[0.2em] opacity-80 mb-0.5">
                      आज का एक वचन • Today for {selectedRashi.key} · {verdict.label}
                    </p>
                    <p className="text-[13.5px] sm:text-[15px] font-serif font-semibold leading-snug">
                      &ldquo;{verdict.line}&rdquo;
                    </p>
                  </div>
                </motion.div>
              )}

              {/* ── SINGLE COLLAPSIBLE FULL READING (defaults closed) ── */}
              {verdict && (
                <div className="mb-5 rounded-2xl border border-[#E8791E]/35 bg-gradient-to-r from-[#FFF6E9] to-[#FDECD2] px-4 py-3.5 flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
                  <p className="text-[12.5px] text-[#4A2A15] font-sans font-medium leading-snug">Aaj ka <strong className="text-[#C25E10]">poora personal margdarshan</strong> + aapke naam ka <strong className="text-[#C25E10]">diya</strong> - sirf <strong>₹11</strong>.</p>
                  <button type="button" onClick={() => { pixelContact("aaj_ka_aashirwad_11"); setUnlockOpen(true); }} className="shrink-0 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full font-bold text-[13px] bg-gradient-to-r from-[#E8791E] via-[#F5A623] to-[#E8791E] text-white shadow-[0_4px_16px_rgba(232,121,30,0.45)] active:scale-95 transition-all cursor-pointer"><span>Paayein - ₹11</span><ArrowRight className="w-4 h-4" /></button>
                </div>
              )}

              <button
                type="button"
                onClick={() => setDetailsOpen((v) => !v)}
                aria-expanded={detailsOpen}
                className="w-full flex items-center justify-between gap-2 px-5 py-4 rounded-2xl bg-gradient-to-r from-[#FDF3E2] to-[#F5EAD6] border border-[#B8860B]/30 cursor-pointer active:scale-[0.99] hover:brightness-[1.02] transition-all shadow-[0_2px_12px_rgba(107,42,20,0.08)]"
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm text-[#E8791E]">✦</span>
                  <span className="text-[12px] font-bold uppercase tracking-[0.22em] text-[#C25E10] font-mono text-left">
                    {detailsOpen ? t("rashi.hideReading") : t("rashi.viewReading")}
                  </span>
                </div>
                <motion.span
                  animate={{ rotate: detailsOpen ? 180 : 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="shrink-0 text-[#B8860B]"
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {detailsOpen && (
                  <motion.div
                    key="full-reading-body"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pt-6">
                      {/* TODAY'S GUIDANCE: Editorial Reading */}
                      <div className="mb-7 p-5 rounded-2xl bg-[#FBF6EC] border border-[#B8860B]/20">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs text-[#E8791E]">✦</span>
                          <h4 className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#C25E10] font-mono">
                            {t("rashi.guidance")}
                          </h4>
                        </div>
                        <p className="text-[#2A1810] text-sm sm:text-base leading-relaxed font-serif italic mb-2">
                          &ldquo;{selectedRashi.reading}&rdquo;
                        </p>
                        <p className="text-xs text-[#2E1D14] leading-relaxed font-sans pt-2 border-t border-[#B8860B]/20 font-normal">
                          {selectedRashi.guidanceText}
                        </p>
                      </div>

                      {/* 4 Life Aspect Ratings (Star Ratings + Progress) */}
                      <div className="mb-7">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#2E1D14] font-mono">
                            {t("rashi.aspects")}
                          </h4>
                          <span className="text-[10px] text-[#B8860B] font-serif">{t("rashi.gochara")}</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          {[
                            { label: t("rashi.aspect.love"), stars: selectedRashi.stars.love, pct: selectedRashi.stars.love * 20, color: "#E05A5A" },
                            { label: t("rashi.aspect.career"), stars: selectedRashi.stars.career, pct: selectedRashi.stars.career * 20, color: "#D4AF37" },
                            { label: t("rashi.aspect.finance"), stars: selectedRashi.stars.finance, pct: selectedRashi.stars.finance * 20, color: "#38BDF8" },
                            { label: t("rashi.aspect.energy"), stars: selectedRashi.stars.energy, pct: selectedRashi.stars.energy * 20, color: "#34D399" },
                          ].map((aspect, idx) => (
                            <div
                              key={aspect.label}
                              className="p-3.5 rounded-xl bg-[#FBF6EC] border border-[#B8860B]/20 flex flex-col justify-between"
                            >
                              <div className="flex items-center justify-between mb-1.5">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C25E10]">
                                  {aspect.label}
                                </span>
                                <StarRating count={aspect.stars} />
                              </div>
                              <div className="h-1.5 rounded-full bg-[#B8860B]/15 overflow-hidden p-[1px]">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${aspect.pct}%` }}
                                  transition={{ duration: 0.8, delay: 0.1 + idx * 0.1, ease: "easeOut" }}
                                  className="h-full rounded-full"
                                  style={{ backgroundColor: aspect.color }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Active Celestial Influences (Navagrahas) */}
                      <div className="mb-7">
                        <div className="flex items-center gap-2 mb-3">
                          <Orbit className="w-3.5 h-3.5 text-[#B8860B]" />
                          <h4 className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#2E1D14] font-mono">
                            {t("rashi.influences")}
                          </h4>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                          {selectedRashi.celestialInfluences.map((inf) => (
                            <div
                              key={inf.planet}
                              className="p-3 rounded-xl bg-[#FBF6EC] border border-[#B8860B]/20 flex flex-col"
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs font-bold font-serif text-[#C25E10]">
                                  {inf.planet} ({inf.sanskrit})
                                </span>
                                <span className="w-1.5 h-1.5 rounded-full bg-[#E8791E]/70" />
                              </div>
                              <p className="text-[11px] text-[#2E1D14] leading-snug font-normal">
                                {inf.effect}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Auspicious Metrics & Beej Mantra */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 pt-5 border-t border-[#B8860B]/20">
                        <div className="p-3.5 rounded-xl bg-[#FBF6EC] border border-[#B8860B]/20 text-center">
                          <p className="text-[10px] uppercase tracking-wider text-[#2E1D14] font-semibold mb-1">{t("rashi.luckyNumber")}</p>
                          <p className="text-lg font-bold text-[#C25E10] font-mono">
                            {selectedRashi.id + 1} &amp; {((selectedRashi.id * 3 + 7) % 9) + 1}
                          </p>
                        </div>

                        <div className="p-3.5 rounded-xl bg-[#FBF6EC] border border-[#B8860B]/20 text-center flex flex-col items-center justify-center">
                          <p className="text-[10px] uppercase tracking-wider text-[#2E1D14] font-semibold mb-1">{t("rashi.luckyShade")}</p>
                          <div className="flex items-center gap-2">
                            <span
                              className="w-3.5 h-3.5 rounded-full inline-block border border-[#D4AF37]/40 shadow-sm"
                              style={{ backgroundColor: luckyColor.hex }}
                            />
                            <span className="text-xs font-bold text-[#C25E10]">{luckyColor.name}</span>
                          </div>
                        </div>

                        <div className="p-3.5 rounded-xl bg-[#FBF6EC] border border-[#B8860B]/20 text-center">
                          <div className="flex items-center justify-center gap-1.5 mb-1 text-[10px] uppercase tracking-wider text-[#2E1D14] font-semibold">
                            <Volume2 className="w-3 h-3 text-[#B8860B]" /> {t("rashi.beejMantra")}
                          </div>
                          <button
                            type="button"
                            onClick={() => handleCopyMantra(selectedRashi.mantra)}
                            className="text-[11px] font-serif text-[#C25E10] hover:underline cursor-pointer truncate max-w-full block mx-auto transition-colors"
                            title={t("rashi.copyTitle")}
                          >
                            {copiedMantra ? (
                              <span className="text-emerald-400 inline-flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3 inline" /> {t("rashi.copied")}
                              </span>
                            ) : (
                              selectedRashi.mantra
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Master Editorial Call to Action */}
                      <Link
                        href="/quick-answer"
                        className="w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl bg-gradient-to-r from-[#E8791E] via-[#F5A623] to-[#E8791E] text-white font-black uppercase tracking-[0.16em] text-xs sm:text-sm shadow-[0_8px_30px_rgba(232,121,30,0.35)] hover:brightness-105 active:scale-[0.98] transition-all"
                      >
                        <Sparkles className="w-4 h-4" />
                        {t("rashi.cta")}
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 rounded-3xl text-center relative overflow-hidden border border-[#B8860B]/25"
              style={{
                background: "linear-gradient(160deg, #FFFDF8 0%, #FBF6EC 55%, #F5EAD6 100%)",
              }}
            >
              {/* ── Breathing animated gold border ── */}
              <motion.div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                animate={{
                  boxShadow: [
                    "inset 0 0 0 1px rgba(212,175,55,0.18), 0 0 0 1px rgba(212,175,55,0.10)",
                    "inset 0 0 0 1px rgba(243,229,171,0.45), 0 0 18px 4px rgba(212,175,55,0.20)",
                    "inset 0 0 0 1px rgba(212,175,55,0.18), 0 0 0 1px rgba(212,175,55,0.10)",
                  ],
                }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* ── Horizontal shimmer sweep (loops every 2.4s) ── */}
              <motion.div
                className="pointer-events-none absolute top-0 left-[-55%] w-[45%] h-full -skew-x-[18deg]"
                animate={{ left: ["-55%", "120%"] }}
                transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 0.8, ease: "easeInOut" }}
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(255,245,190,0.07) 40%, rgba(224,195,106,0.13) 50%, rgba(255,245,190,0.07) 60%, transparent 100%)",
                }}
              />

              {/* ── Radial ambient glow behind icon ── */}
              <motion.div
                className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-72 h-40 rounded-full blur-3xl"
                animate={{ opacity: [0.08, 0.18, 0.08] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                style={{ background: "radial-gradient(ellipse at center, rgba(224,195,106,1) 0%, transparent 70%)" }}
              />

              {/* ── Floating sparkle particles ── */}
              {[
                { x: "15%", delay: 0,    dur: 3.2 },
                { x: "82%", delay: 0.7,  dur: 2.8 },
                { x: "50%", delay: 1.4,  dur: 3.6 },
                { x: "28%", delay: 2.0,  dur: 2.5 },
                { x: "70%", delay: 0.4,  dur: 3.0 },
              ].map((p, i) => (
                <motion.span
                  key={i}
                  className="pointer-events-none absolute text-[#E8791E] text-[10px] select-none"
                  style={{ left: p.x, top: "18%" }}
                  animate={{ y: [-6, -22, -6], opacity: [0, 0.7, 0] }}
                  transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
                >
                  ✦
                </motion.span>
              ))}

              <div className="relative z-10 p-10 sm:p-14">
                {/* ── Multi-ring pulsing beacon ── */}
                <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                  {/* Outermost ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full border border-[#D4AF37]/30"
                    animate={{ scale: [1, 1.55, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
                  />
                  {/* Middle ring */}
                  <motion.div
                    className="absolute inset-1.5 rounded-full border border-[#D4AF37]/45"
                    animate={{ scale: [1, 1.38, 1], opacity: [0.65, 0, 0.65] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut", delay: 0.35 }}
                  />
                  {/* Inner ring */}
                  <motion.div
                    className="absolute inset-3 rounded-full border border-[#E8791E]/60"
                    animate={{ scale: [1, 1.22, 1], opacity: [0.8, 0, 0.8] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut", delay: 0.7 }}
                  />
                  {/* Core icon */}
                  <motion.div
                    className="relative w-14 h-14 rounded-full bg-gradient-to-br from-[#FDF3E2] to-[#F5EAD6] border border-[#B8860B]/40 flex items-center justify-center shadow-[0_2px_14px_rgba(232,121,30,0.18)]"
                    animate={{ scale: [1, 1.06, 1] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <motion.span
                      className="text-2xl text-[#E8791E]"
                      animate={{ rotate: [0, 22, 0, -22, 0], scale: [1, 1.15, 1] }}
                      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      ✦
                    </motion.span>
                  </motion.div>
                </div>

                {/* ── Heading ── */}
                <motion.h3
                  className="text-base sm:text-lg font-serif font-bold mb-2"
                  animate={{ opacity: [0.85, 1, 0.85] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                  style={{
                    background: "linear-gradient(90deg, #2A1810 0%, #C25E10 60%, #E8791E 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {t("rashi.empty.title")}
                </motion.h3>

                <p className="text-[#2E1D14] font-medium text-xs sm:text-sm max-w-sm mx-auto leading-relaxed">
                  {t("rashi.empty.desc")}
                </p>

                {/* ── Refined Gold Pill Indicator ── */}
                <div className="mt-6 flex items-center justify-center gap-2">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="relative overflow-hidden rounded-full transition-all duration-500"
                      style={{
                        width: i === 1 ? 32 : 8,
                        height: 8,
                        background:
                          i === 1
                            ? "linear-gradient(90deg, #a07828 0%, #E0C36A 48%, #C9A24A 100%)"
                            : "transparent",
                        border:
                          i === 1
                            ? "1px solid rgba(224,195,106,0.55)"
                            : "1px solid rgba(201,162,74,0.20)",
                        boxShadow:
                          i === 1
                            ? "0 0 10px 2px rgba(201,162,74,0.32), inset 0 0 5px rgba(255,245,180,0.18)"
                            : "none",
                      }}
                    >
                      {i === 1 && (
                        <motion.span
                          className="absolute top-0 left-[-60%] w-[50%] h-full -skew-x-[18deg]"
                          animate={{ left: ["-60%", "160%"] }}
                          transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 1.6, ease: "easeInOut" }}
                          style={{
                            background:
                              "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                          }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    
      {selectedRashi && verdict && (
        <QuickUnlockModal
          open={unlockOpen}
          onClose={() => setUnlockOpen(false)}
          rashiKey={selectedRashi.key}
          rashiEn={selectedRashi.en}
          blessing={verdict.line}
          amount={11}
        />
      )}
</section>
  );
}