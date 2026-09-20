"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { pixelContact } from "@/components/analytics/pixelEvents";

// "Aaj Ka Aashirwad" - the Rs11 first-yes, surfaced high on the homepage as a
// premium inline temple strip (NOT a floating bar). Tapping it smooth-scrolls
// down to the Rashi section, where the seeker picks their sign and unlocks via
// the existing QuickUnlockModal flow. One price, one action, no confusion.
export default function AashirwadStrip() {
  const reduce = useReducedMotion();

  const goRashi = () => {
    pixelContact("aashirwad_strip_11");
    const el = document.getElementById("rashi-today");
    if (el) el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  return (
    <section className="relative section-px py-5 sm:py-7 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-3xl mx-auto"
      >
        <button
          type="button"
          onClick={goRashi}
          className="group relative w-full flex items-center gap-3 sm:gap-4 rounded-2xl px-4 sm:px-6 py-4 sm:py-5 text-left bg-gradient-to-r from-[#FFFDF8] via-[#FDF3DE] to-[#FCEBCF] border border-[#D4AF37]/45 shadow-[0_10px_30px_-14px_rgba(184,134,11,0.28),inset_0_1px_2px_rgba(255,255,255,0.9)] hover:border-[#E8791E]/60 active:scale-[0.99] transition-all duration-300 overflow-hidden"
        >
          {/* soft ambient glow */}
          <span className="pointer-events-none absolute -right-10 -top-10 w-40 h-40 rounded-full bg-[#F5A623]/15 blur-[60px]" />

          {/* diya / offering medallion */}
          <span className="relative shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#F5A623] via-[#E8791E] to-[#C25E10] flex items-center justify-center shadow-[0_6px_16px_-4px_rgba(232,121,30,0.55),inset_0_1px_0_rgba(255,255,255,0.35)]">
            <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-white" strokeWidth={2.2} />
          </span>

          <div className="relative min-w-0 flex-1">
            <p className="text-[9.5px] sm:text-[10.5px] font-bold uppercase tracking-[0.22em] text-[#C25E10] mb-0.5">
              {"\u0906\u091C \u0915\u093E \u0906\u0936\u0940\u0930\u094D\u0935\u093E\u0926"} {"\u00b7"} Aaj Ka Aashirwad
            </p>
            <p className="text-[13.5px] sm:text-[15px] font-cormorant font-semibold text-[#2A1810] leading-snug">
              Apni rashi ka aaj ka poora margdarshan + aapke naam ka diya
            </p>
          </div>

          {/* Rs11 CTA */}
          <span className="relative shrink-0 inline-flex items-center gap-1.5 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full font-black text-[13px] sm:text-[14px] text-white bg-gradient-to-r from-[#E8791E] via-[#F5A623] to-[#E8791E] shadow-[0_4px_16px_rgba(232,121,30,0.45)] group-hover:brightness-105 transition-all">
            <span>{"\u20B9"}11</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </button>
      </motion.div>
    </section>
  );
}