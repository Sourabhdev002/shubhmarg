"use client";

import React, { useState } from "react";
import { Compass, ArrowRight } from "lucide-react";
import Link from "next/link";

interface DashaPeriod {
  planet: string;
  sanskritName: string;
  durationYears: number;
  rulerDeity: string;
  nature: "Spiritual Breakthrough" | "Material Wealth & Ambition" | "Karmic Maturation & Discipline" | "Wisdom & Expansion" | "Dynamic Energy" | "Intellect & Trade";
  color: string;
  bgGlow: string;
  description: string;
}

const VEDIC_DASHAS: DashaPeriod[] = [
  { planet: "Ketu", sanskritName: "केतु", durationYears: 7, rulerDeity: "Lord Ganesha", nature: "Spiritual Breakthrough", color: "text-amber-400", bgGlow: "from-amber-500/20 to-orange-500/10", description: "Subconscious awakening, shedding old karmic baggage, and sudden intuitive clarity." },
  { planet: "Venus (Shukra)", sanskritName: "शुक्र", durationYears: 20, rulerDeity: "Goddess Mahalakshmi", nature: "Material Wealth & Ambition", color: "text-pink-300", bgGlow: "from-pink-500/20 to-purple-500/10", description: "Peak period for relationship bliss, creative arts, vehicle/home purchases, and worldly prosperity." },
  { planet: "Sun (Surya)", sanskritName: "सूर्य", durationYears: 6, rulerDeity: "Surya Narayana", nature: "Dynamic Energy", color: "text-yellow-400", bgGlow: "from-yellow-500/20 to-amber-500/10", description: "Authority, fatherly support, government recognition, and core vitality expansion." },
  { planet: "Moon (Chandra)", sanskritName: "चन्द्र", durationYears: 10, rulerDeity: "Lord Shiva", nature: "Wisdom & Expansion", color: "text-cyan-200", bgGlow: "from-cyan-500/20 to-blue-500/10", description: "Emotional peace, motherly blessings, public popularity, and intuitive travel." },
  { planet: "Mars (Mangal)", sanskritName: "मंगल", durationYears: 7, rulerDeity: "Lord Hanuman / Kartikeya", nature: "Dynamic Energy", color: "text-red-400", bgGlow: "from-red-500/20 to-orange-500/10", description: "Real estate ventures, physical courage, sibling partnerships, and assertive breakthroughs." },
  { planet: "Rahu", sanskritName: "राहु", durationYears: 18, rulerDeity: "Goddess Durga", nature: "Material Wealth & Ambition", color: "text-purple-400", bgGlow: "from-purple-500/20 to-indigo-500/10", description: "Rapid foreign expansion, technological mastery, unconventional growth, and intense ambition." },
  { planet: "Jupiter (Guru)", sanskritName: "बृहस्पति", durationYears: 16, rulerDeity: "Lord Brahma / Dakshinamurthy", nature: "Wisdom & Expansion", color: "text-[#ffd700]", bgGlow: "from-amber-500/20 to-yellow-500/10", description: "Supreme auspiciousness: marriage, childbirth, spiritual wisdom, and righteous wealth accumulation." },
  { planet: "Saturn (Shani)", sanskritName: "शनि", durationYears: 19, rulerDeity: "Lord Shiva / Hanuman", nature: "Karmic Maturation & Discipline", color: "text-blue-300", bgGlow: "from-blue-500/20 to-slate-500/10", description: "Enduring foundation building, karmic justice, long-term investments, and profound patience." },
  { planet: "Mercury (Budha)", sanskritName: "बुध", durationYears: 17, rulerDeity: "Lord Vishnu", nature: "Intellect & Trade", color: "text-emerald-400", bgGlow: "from-emerald-500/20 to-teal-500/10", description: "Commercial enterprise, mathematical intelligence, sharp communication, and business contracts." },
];

export default function NineDashaTimeline({ currentDashaIndex = 5 }: { currentDashaIndex?: number }) {
  const [selectedDasha, setSelectedDasha] = useState<DashaPeriod>(VEDIC_DASHAS[currentDashaIndex]);

  return (
    <div className="my-10 bg-gradient-to-b from-[#190d09] via-[#26120c] to-[#120704] border-2 border-[#d4af37]/60 rounded-3xl p-6 sm:p-10 shadow-[0_20px_70px_rgba(0,0,0,0.8)] relative overflow-hidden">
      {/* Background celestial glow */}
      <div className="pointer-events-none absolute -right-24 -top-24 w-80 h-80 bg-[#d4af37]/15 rounded-full blur-[110px]" />
      <div className="pointer-events-none absolute -left-24 -bottom-24 w-80 h-80 bg-red-600/15 rounded-full blur-[110px]" />

      {/* Header */}
      <div className="relative z-10 text-center mb-8 pb-6 border-b border-white/10">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#d4af37] text-[10px] font-extrabold uppercase tracking-widest mb-3">
          <Compass className="w-3.5 h-3.5" />
          <span>Vimshottari 120-Year Mahadasha Horizon</span>
        </div>
        <h3 className="text-2xl sm:text-4xl font-bold font-serif text-white tracking-wide">
          Your Lifetime Astrological Planetary Cycle
        </h3>
        <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto mt-1 font-light">
          In classical Vedic Jyotish, human life unfolds across 9 planetary Mahadashas totaling 120 years. Tap each period to reveal its governing energy and opportunities.
        </p>
      </div>

      {/* ── Horizontal Scrollable 9-Dasha Orbit Bar ── */}
      <div className="relative z-10 overflow-x-auto pb-4 pt-2 hide-scrollbar">
        <div className="flex items-center gap-3 min-w-[720px] px-1">
          {VEDIC_DASHAS.map((dasha, idx) => {
            const isSelected = selectedDasha.planet === dasha.planet;
            const isCurrent = idx === currentDashaIndex;

            return (
              <button
                key={dasha.planet}
                type="button"
                onClick={() => setSelectedDasha(dasha)}
                className={`flex-1 min-w-[105px] rounded-2xl p-3.5 text-center transition-all duration-300 relative border flex flex-col items-center justify-between cursor-pointer ${
                  isSelected
                    ? "bg-gradient-to-b from-[#3a1b0d] to-[#200d05] border-2 border-[#d4af37] shadow-[0_0_25px_rgba(212,175,55,0.5)] scale-105"
                    : "bg-black/50 hover:bg-black/80 border-white/10 text-gray-400"
                }`}
              >
                {isCurrent && (
                  <span className="absolute -top-2.5 bg-emerald-500 text-black text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shadow-md">
                    Active Dasha
                  </span>
                )}

                <span className="text-lg font-devanagari font-bold text-[#d4af37] block mt-1">
                  {dasha.sanskritName}
                </span>
                <span className="text-xs font-bold text-white block my-0.5">
                  {dasha.planet}
                </span>
                <span className="text-[10px] text-gray-400 font-mono block">
                  {dasha.durationYears} Years
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Selected Dasha Deep Inspection Card ── */}
      <div className="relative z-10 bg-gradient-to-r from-black/80 via-[#210e08]/90 to-black/80 border-2 border-[#d4af37]/40 rounded-3xl p-6 sm:p-8 mt-6 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#d4af37] bg-[#d4af37]/15 px-3 py-1 rounded-full border border-[#d4af37]/30">
                {selectedDasha.planet} Mahadasha ({selectedDasha.durationYears} Years)
              </span>
              <span className="text-xs text-amber-300 font-mono">
                Presiding Deity: <strong>{selectedDasha.rulerDeity}</strong>
              </span>
            </div>

            <h4 className="text-xl sm:text-2xl font-bold font-serif text-white">
              {selectedDasha.nature}
            </h4>

            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
              {selectedDasha.description}
            </p>
          </div>

          <div className="lg:col-span-4 bg-black/60 border border-white/15 rounded-2xl p-5 flex flex-col justify-between space-y-3">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#d4af37] font-bold block">
                Annual Transit Guidance
              </span>
              <p className="text-xs text-gray-300 mt-1">
                Unlock exact Antardasha start/end dates and Gotra-specific Shanti remedies with Pandit Ji.
              </p>
            </div>

            <Link
              href="/request-guidance?service=annual-varshphal"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#e5c453] to-[#d4af37] text-black font-extrabold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 flex items-center justify-center gap-1.5 transition-all"
            >
              <span>Get 365-Day Book (₹3,100)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
