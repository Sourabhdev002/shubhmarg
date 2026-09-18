"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShubhMargEmblem } from "@/components/brand/ShubhMargLogo";
import { ShieldCheck, Mic2, Sparkles } from "lucide-react";
import { useT } from "@/context/LanguageContext";

export default function SanctuaryTransitionBridge() {
  const t = useT();
  return (
    <div className="relative z-20 -my-3 sm:-my-4 max-w-4xl mx-auto px-4 sm:px-6 pointer-events-auto">
      {/* Decorative Outer Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/15 to-transparent blur-xl pointer-events-none" />

      {/* Main Bridge Capsule */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#FFFDF9] via-[#FDF7EB] to-[#F7EED9] border border-[#D4AF37]/45 shadow-[0_10px_30px_-10px_rgba(74,38,14,0.18)] p-3.5 sm:p-5 backdrop-blur-md"
      >
        {/* Top Filigree Accent Line */}
        <div className="flex items-center justify-center gap-3 mb-2.5">
          <div className="h-px flex-1 max-w-[80px] sm:max-w-[140px] bg-gradient-to-r from-transparent to-[#D4AF37]/70" />
          <div className="flex items-center gap-2 px-3 py-0.5 rounded-full bg-[#FFF5E5] border border-[#D4AF37]/40 shadow-xs">
            <ShubhMargEmblem size={16} />
            <span className="text-[10px] sm:text-[11px] font-serif font-bold text-[#8C3F08] tracking-widest uppercase">
              शास्त्रीय मार्गदर्शन • {t("bridge.eyebrow")}
            </span>
            <ShubhMargEmblem size={16} />
          </div>
          <div className="h-px flex-1 max-w-[80px] sm:max-w-[140px] bg-gradient-to-l from-transparent to-[#D4AF37]/70" />
        </div>

        {/* Sacred Sanskrit Invocation & Guidance Motto */}
        <div className="text-center mb-3">
          <p className="text-xs sm:text-sm font-serif font-bold text-[#2A1810] tracking-wide">
            ॥ शुभं करोति कल्याणम् आरोग्यं धनसम्पदाम् ॥
          </p>
          <p className="text-[10.5px] sm:text-[11.5px] text-[#2E1D14] font-medium font-sans mt-0.5 max-w-lg mx-auto">
            {t("bridge.motto")}
          </p>
        </div>

        {/* 3 Royal Micro-Privilege Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 pt-2.5 border-t border-[#D4AF37]/25">
          <div className="flex items-center justify-center sm:justify-start gap-2 px-3 py-1.5 rounded-xl bg-[#FFFDF8] border border-[#B8860B]/20 shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C25E10] shrink-0" />
            <span className="text-[10.5px] sm:text-[11px] font-bold text-[#2A1810]">
              {t("bridge.badge1")}
            </span>
          </div>

          <div className="flex items-center justify-center sm:justify-center gap-2 px-3 py-1.5 rounded-xl bg-[#FFFDF8] border border-[#B8860B]/20 shadow-2xs">
            <Mic2 className="w-3.5 h-3.5 text-[#C25E10] shrink-0" />
            <span className="text-[10.5px] sm:text-[11px] font-bold text-[#2A1810]">
              {t("bridge.badge2")}
            </span>
          </div>

          <div className="flex items-center justify-center sm:justify-end gap-2 px-3 py-1.5 rounded-xl bg-[#FFFDF8] border border-[#B8860B]/20 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#C25E10] shrink-0" />
            <span className="text-[10.5px] sm:text-[11px] font-bold text-[#2A1810]">
              {t("bridge.badge3")}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
