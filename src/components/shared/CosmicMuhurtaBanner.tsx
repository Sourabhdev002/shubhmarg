"use client";

import React, { useState, useEffect } from "react";
import { Clock, ArrowRight, Flame } from "lucide-react";
import Link from "next/link";

export default function CosmicMuhurtaBanner() {
  const [timeLeft, setTimeLeft] = useState({ hours: 38, minutes: 24, seconds: 15 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 48, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-to-r from-[#200f07] via-[#2c1308] to-[#1c0c05] border-2 border-[#d4af37]/60 rounded-3xl p-5 sm:p-7 shadow-2xl relative overflow-hidden">
      {/* Background radial glow */}
      <div className="pointer-events-none absolute -right-10 -top-10 w-48 h-48 bg-[#d4af37]/15 rounded-full blur-3xl" />

      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 relative z-10">
        <div className="space-y-1.5 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#d4af37] text-[10px] font-extrabold uppercase tracking-widest">
            <Flame className="w-3.5 h-3.5" />
            <span>Active Auspicious Consecration Window (10x Potency)</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold font-serif text-white">
            Upcoming Shukla Paksha Sankalp &amp; Pushya Yoga Window
          </h3>
          <p className="text-xs text-gray-300 leading-relaxed">
            Vedic rituals, temple pujas, and gemstone energizations initiated during this active lunar Muhurta carry tenfold spiritual and material remedies according to Muhurta Chintamani.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto shrink-0">
          {/* Astrological Countdown */}
          <div className="flex items-center gap-2 bg-black/60 border border-[#d4af37]/40 px-4 py-2.5 rounded-2xl">
            <Clock className="w-4 h-4 text-[#d4af37]" />
            <div className="flex items-center gap-1 font-mono text-sm font-bold text-white">
              <span className="bg-[#1c120a] px-2 py-1 rounded border border-white/10">{String(timeLeft.hours).padStart(2, "0")}h</span>
              <span className="text-[#d4af37]">:</span>
              <span className="bg-[#1c120a] px-2 py-1 rounded border border-white/10">{String(timeLeft.minutes).padStart(2, "0")}m</span>
              <span className="text-[#d4af37]">:</span>
              <span className="bg-[#1c120a] px-2 py-1 rounded border border-white/10">{String(timeLeft.seconds).padStart(2, "0")}s</span>
            </div>
          </div>

          <Link
            href="/sacred-offerings"
            className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-gradient-to-r from-[#d4af37] via-[#e5c453] to-[#d4af37] text-black font-extrabold text-xs uppercase tracking-wider shadow-[0_4px_20px_rgba(212,175,55,0.35)] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shrink-0"
          >
            <span>Book In This Muhurta</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
