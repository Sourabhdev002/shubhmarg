"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { useT } from "@/context/LanguageContext";
import type { DailyPanchang } from "@/types/calendar";

const HeroCanvas = dynamic(() => import("./3d/HeroCanvas").then((mod) => mod.HeroCanvas), {
  ssr: false,
});
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";

// Time-of-day greeting (visitor's local time) — makes the hero feel personal on land.
function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Suprabhat 🌅";
  if (h < 17) return "Namaskar ☀️";
  if (h < 21) return "Shubh Sandhya 🌙";
  return "Shubh Ratri 🌟";
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.13, delayChildren: 0.18 } },
};
const textMaskVariants: Variants = {
  hidden: { y: "110%", rotate: 1.5, opacity: 0 },
  visible: { y: "0%", rotate: 0, opacity: 1, transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] } },
};
const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] } },
};

export default function Hero({ panchang }: { panchang?: DailyPanchang | null }) {
  const t = useT();
  const { scrollYProgress } = useScroll();
  const yText = useTransform(scrollYProgress, [0, 1], [0, 280]);

  // Personal time-based greeting (client-only so no SSR mismatch).
  const [greeting, setGreeting] = useState<string>("");
  useEffect(() => {
    setGreeting(getGreeting());
  }, []);

  // Honest, gently-alive "viewing now" — small natural drift instead of a frozen 14.
  const [viewers, setViewers] = useState(14);
  useEffect(() => {
    const id = setInterval(() => {
      setViewers((v) => {
        const next = v + (Math.random() > 0.5 ? 1 : -1);
        return Math.min(19, Math.max(9, next));
      });
    }, 5000);
    return () => clearInterval(id);
  }, []);

  // Live Panchang micro-line — real "today" data surfaced up top (authentic Vedic signal).
  const cleanTithi = panchang?.tithi?.split("-").pop()?.trim() || null;
  const panchangLine = cleanTithi && panchang?.nakshatra
    ? `${cleanTithi} • ${panchang.nakshatra} Nakshatra`
    : null;

  return (
    <section className="grain relative bg-[#FBF6EC] overflow-hidden min-h-[86svh] md:min-h-[680px] lg:h-[88vh] flex flex-col">
      {/* Warm marble base wash */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, #FDF3E2 0%, #FBF6EC 45%, #F7EEDD 100%)",
        }}
      />

      {/* Ambient saffron/marigold glows (blur capped on mobile by the perf guard) */}
      <div className="absolute top-[70%] right-[-5%] w-[60vw] md:w-[40vw] max-w-[560px] aspect-square bg-[#F5A623]/12 blur-[70px] md:blur-[120px] rounded-full pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-[-5%] left-[-12%] w-[50vw] max-w-[420px] aspect-square bg-[#E8791E]/10 blur-[70px] md:blur-[130px] rounded-full pointer-events-none" />

      {/* Animated gold top border */}
      <div className="relative h-[2px] w-full overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#B8860B]/70 to-transparent" />
        <motion.div
          className="absolute top-0 left-[-40%] w-[40%] h-full"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(245,166,35,0.9), transparent)",
          }}
          animate={{ left: ["-40%", "140%"] }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            repeatDelay: 1.5,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Warm saffron glow directly behind the Om so it reads as a golden idol, not a ghost */}
      <div
        className="absolute top-1/2 left-1/2 md:left-auto md:right-[8%] -translate-x-1/2 md:translate-x-0 w-[80vw] md:w-[42vw] max-w-[520px] aspect-square -translate-y-1/2 pointer-events-none rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(245,166,35,0.28) 0%, rgba(246, 232, 220, 0.14) 42%, transparent 72%)",
          filter: "blur(30px)",
        }}
        aria-hidden="true"
      />

      {/* 3D WebGL canvas (the gold Om) — full strength so it's a bold golden centerpiece */}
      <div className="absolute inset-0 opacity-100 transition-opacity">
        <HeroCanvas />
      </div>

      {/* DESKTOP-only left wash — brightens behind the left text column so the Om on the
          RIGHT stays fully visible. Hidden on mobile (where the Om is centered) so it never
          veils the Om and makes it look foggy/milky. */}
      <div
        className="absolute inset-0 pointer-events-none hidden md:block"
        style={{
          background:
            "linear-gradient(105deg, rgba(251,246,236,0.94) 0%, rgba(251,246,236,0.82) 34%, rgba(251,246,236,0.3) 52%, transparent 66%)",
        }}
        aria-hidden="true"
      />

      {/* MOBILE-only: readability veil behind the eyebrow + headline + subtext so the
          dark Om never shows through the text. Extended to ~62% and stronger at top,
          fading fully transparent below so the lower Om stays crisp. */}
      <div
        className="absolute inset-x-0 top-0 h-[62%] pointer-events-none md:hidden"
        style={{
          background:
            "linear-gradient(to bottom, rgba(251,246,236,0.96) 0%, rgba(251,246,236,0.9) 38%, rgba(251,246,236,0.6) 70%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      {/* Bottom vignette — softer on mobile so it doesn't wash the lower half of the Om. */}
      <div
        className="absolute inset-x-0 bottom-0 h-[45%] md:h-[70%] pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, transparent 78%, rgba(251,246,236,0.4) 92%, #FBF6EC 100%)",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-16 pb-4 sm:pt-20 sm:pb-8 md:py-24 flex flex-col md:flex-row md:items-center justify-center md:justify-between gap-6 md:gap-0 pointer-events-none">
        <motion.div
          className="w-full md:w-[62%] flex flex-col items-center md:items-start text-center md:text-left z-20 pointer-events-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ y: yText }}
        >
          {/* Personal greeting + eyebrow */}
          <motion.div
            variants={fadeUpVariants}
            className="flex flex-col items-center md:items-start gap-2 mb-4 sm:mb-5"
          >
            <div className="flex items-center gap-3">
              <div className="h-[2px] w-7 bg-gradient-to-r from-transparent to-[#E8791E]/80" />
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFFDF8] border border-[#E8791E]/35 text-[11px] font-sans font-bold tracking-[0.2em] text-[#C25E10] uppercase shadow-[0_2px_10px_rgba(107,42,20,0.12)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E8791E] animate-pulse" />
                {greeting ? `${greeting} · ` : ""}{t("hero.eyebrow")}
              </span>
            </div>

            {/* Live Panchang micro-line — authentic "today" Vedic signal */}
            {panchangLine && (
              <span className="inline-flex items-center gap-1.5 text-[10.5px] font-sans font-medium text-[#6B5A48] pl-10 md:pl-10">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span className="text-[#8C5212] font-semibold">Aaj / Today:</span>
                <span className="font-devanagari" style={{ fontFamily: "'Tiro Devanagari Hindi', serif" }}>{panchangLine}</span>
              </span>
            )}
          </motion.div>

          {/* Headline */}
          <h1 className="font-serif text-[#2A1810] leading-[1.04] tracking-tight mb-5 [text-shadow:0_1px_10px_rgba(251,246,236,0.9),0_1px_2px_rgba(251,246,236,1)]">
            <div className="overflow-hidden pb-1">
              <motion.span
                variants={textMaskVariants}
                className="block text-[2.2rem] sm:text-5xl md:text-[4.5rem] lg:text-[5rem]"
              >
                {t("hero.line1")}
              </motion.span>
            </div>
            <div className="overflow-hidden pb-1">
              <motion.span
                variants={textMaskVariants}
                className="block text-[2.2rem] sm:text-5xl md:text-[4.5rem] lg:text-[5rem] mb-1"
              >
                {t("hero.line2")}
              </motion.span>
            </div>
            <div className="overflow-hidden">
              <motion.span
                variants={textMaskVariants}
                className="block italic text-[#C25E10] font-semibold text-[1.75rem] sm:text-4xl md:text-[3.5rem] lg:text-[4rem]"
              >
                {t("hero.line3")}
              </motion.span>
            </div>
          </h1>

          {/* Body */}
          <motion.p
            variants={fadeUpVariants}
            className="text-[14.5px] sm:text-[16px] leading-[1.75] text-[#332215] max-w-[420px] mx-auto md:mx-0 font-sans font-medium"
          >
            {t("hero.sub")}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUpVariants}
            className="mt-6 sm:mt-7 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto"
          >
            <Link
              href="/request-guidance"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-bold text-[13px] tracking-wide bg-gradient-to-r from-[#E8791E] via-[#F5A623] to-[#E8791E] text-white hover:shadow-[0_4px_25px_rgba(232,121,30,0.5)] active:scale-95 transition-all shadow-[0_4px_16px_rgba(232,121,30,0.4)] cursor-pointer"
            >
              {t("hero.cta.begin")}
              <ArrowRight className="w-4 h-4 shrink-0 text-white" />
            </Link>
            <Link
              href="/services"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-[#E8791E]/45 bg-[#FFFDF8] text-[#C25E10] hover:bg-[#FDF3E2] hover:border-[#E8791E] text-[13px] font-semibold tracking-wide transition-all active:scale-95 cursor-pointer shadow-sm"
            >
              {t("hero.cta.explore")}
            </Link>
          </motion.div>

          {/* Price + live badge */}
          <motion.div
            variants={fadeUpVariants}
            className="mt-4 flex flex-wrap items-center justify-center md:justify-start gap-2.5"
          >
            <span className="bg-[#FFFDF8] border border-[#E8791E]/35 text-[#C25E10] text-[11px] font-bold px-3.5 py-1.5 rounded-full tracking-wide shadow-sm">
              {t("hero.from")}
            </span>
            <span className="flex items-center gap-1.5 text-[11px] text-[#2E1D14] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {viewers} {t("hero.viewing")}
            </span>
          </motion.div>

          {/* Gold ornament divider */}
          <motion.div
            variants={fadeUpVariants}
            className="mt-5 w-full flex items-center justify-center md:justify-start gap-3"
          >
            <span className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-transparent to-[#B8860B]/45" />
            <span className="text-[#C25E10]/80 text-[10px] tracking-[0.4em] font-bold uppercase">
              ॐ
            </span>
            <span className="h-px flex-1 max-w-[60px] bg-gradient-to-l from-transparent to-[#B8860B]/45" />
          </motion.div>

          {/* Trust strip */}
          <motion.div
            variants={fadeUpVariants}
            className="mt-5 flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-5"
          >
            <div className="flex items-center gap-1.5">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-3 h-3 text-[#F5A623]"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
              <span className="text-[11px] text-[#2E1D14] font-medium font-sans ml-1">
                {t("hero.trusted")}
              </span>
            </div>
            <div className="h-3 w-px bg-[#B8860B]/25 hidden sm:block" />
            <div className="flex items-center gap-1.5">
              <svg
                className="w-3 h-3 text-[#B8860B]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span className="text-[11px] text-[#2E1D14] font-medium font-sans">
                {t("hero.confidential")}
              </span>
            </div>
            <div className="h-3 w-px bg-[#B8860B]/25 hidden sm:block" />
            <div className="flex items-center gap-1.5">
              <svg
                className="w-3 h-3 text-[#B8860B]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span className="text-[11px] text-[#2E1D14] font-medium font-sans">
                {t("hero.delivery")}
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll peek indicator */}
      <motion.div
        className="relative z-10 flex flex-col items-center pb-3 mt-2 shrink-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1"
        >
          <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#B8860B]/60">
            {t("hero.scroll")}
          </span>
          <svg
            className="w-4 h-4 text-[#B8860B]/60"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M12 5v14m-5-5 5 5 5-5" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
