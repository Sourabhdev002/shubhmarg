"use client";

import React, { useState } from "react";
import { Scale, ArrowRight } from "lucide-react";
import Link from "next/link";
import SanctifiedVerdictStickyBar from "@/components/shared/SanctifiedVerdictStickyBar";

interface VedicRin {
  id: string;
  name: string;
  sanskrit: string;
  debtTo: string;
  originatingKarma: string;
  manifestationInLife: string;
  sacredPayoffSadhana: string;
  consecrationPuja: string;
  recommendedSponsorship: number;
}

const VEDIC_RINS: VedicRin[] = [
  {
    id: "deva-rin",
    name: "Deva Rin (Cosmic Divine Debt)",
    sanskrit: "देव ऋण",
    debtTo: "The 33 Cosmic Devas & Planetary Archetypes",
    originatingKarma: "Benefiting from sunlight, rainfall, breath, and earth without reciprocal gratitude or sacred Havan offerings in past lifetimes.",
    manifestationInLife: "Unexpected sudden financial freezes, unexplainable obstacles right before major victories, and spiritual restlessness.",
    sacredPayoffSadhana: "Perform daily Gayatri Mantra japa at sunrise; offer water to Surya Deva in a copper vessel; light evening ghee lamps.",
    consecrationPuja: "Maha Ganapati & Navagraha Shanti Havan at Kashi Peeth",
    recommendedSponsorship: 1501,
  },
  {
    id: "pitru-rin",
    name: "Pitru Rin (Ancestral Lineage Debt)",
    sanskrit: "पितृ ऋण",
    debtTo: "The 3 Generations of Departed Ancestors",
    originatingKarma: "Forgetting ancestral traditions, neglecting family elders, or failure to perform annual Shradh/Tarpan rituals.",
    manifestationInLife: "Delays in marriage, repeated marital discord, fertility challenges, or recurring chronic ancestral health patterns.",
    sacredPayoffSadhana: "Feed black cows, crows, or dogs on Amavasya days; plant sacred Peepal/Banyan saplings; honor living elders.",
    consecrationPuja: "Manikarnika Ghat Amavasya Pitru Tarpan Sankalp",
    recommendedSponsorship: 2100,
  },
  {
    id: "rishi-rin",
    name: "Rishi Rin (Vedic Sages & Guru Debt)",
    sanskrit: "ऋषि ऋण",
    debtTo: "The Saptarishis & Lineage Preceptors",
    originatingKarma: "Acquiring spiritual, technical, or intellectual knowledge without honoring the teachers or passing wisdom to deserving students.",
    manifestationInLife: "Mental confusion, inability to retain high focus, academic bottlenecks, and failure to monetize valuable expertise.",
    sacredPayoffSadhana: "Gift books, study stationery, or sponsor the education of underprivileged Sanskrit students (Vidyarthis).",
    consecrationPuja: "Vedic Vidyarthi Veda-Patha Sponsorship at Varanasi Gurukul",
    recommendedSponsorship: 1101,
  },
  {
    id: "manushya-rin",
    name: "Manushya Rin (Societal & Human Debt)",
    sanskrit: "मनुष्य ऋण",
    debtTo: "Fellow Human Beings & Society",
    originatingKarma: "Exploiting community resources, unfair business margins, or hoarding excess wealth without societal charity.",
    manifestationInLife: "Betrayals by business partners, employee turnover, and public misunderstandings.",
    sacredPayoffSadhana: "Organize Annadaan (free sacred food distribution) to pilgrims; support destitute families with dignity.",
    consecrationPuja: "Kashi Temple Annadaan & Sadhu Seva Seva",
    recommendedSponsorship: 1100,
  },
];

export default function KarmicRinResolver() {
  const [selectedRinIndex, setSelectedRinIndex] = useState(0);
  const activeRin = VEDIC_RINS[selectedRinIndex];

  return (
    <div className="my-10 bg-[#FFFDF8] border-2 border-[#d4af37] rounded-3xl p-6 sm:p-12 shadow-[0_20px_80px_rgba(212,175,55,0.35)] relative overflow-hidden text-center">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 bg-emerald-600/15 rounded-full blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 w-96 h-96 bg-[#d4af37]/15 rounded-full blur-[140px]" />

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Header Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d4af37]/15 border border-[#B8860B]/30 text-[#C25E10] text-[11px] font-extrabold uppercase tracking-widest mb-3">
          <Scale className="w-3.5 h-3.5 text-[#C25E10]" />
          <span>Vedic 4-Rin Karmic Balance Ledger</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-bold font-serif text-[#2A1810] tracking-wide mb-2">
          ॥ चतुर्ऋण मुक्ति एवं कर्म शुद्धि चक्र ॥
        </h2>
        <p className="text-xs sm:text-sm text-[#6B5A48] max-w-xl mx-auto mb-8 font-light leading-relaxed">
          Classical Vedic Shastras define the 4 sacred debts carried by every incarnated soul. Discover your active Rinanu-bandhana and resolve karmic debts through non-fearful daily micro-sadhana.
        </p>

        {/* ── 4 Rin Selector Tabs ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-8">
          {VEDIC_RINS.map((rin, idx) => {
            const isSelected = selectedRinIndex === idx;
            return (
              <button
                key={rin.id}
                type="button"
                onClick={() => setSelectedRinIndex(idx)}
                className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "bg-gradient-to-b from-[#3a180b] to-[#1c0a05] border-2 border-[#d4af37] shadow-[0_0_20px_rgba(212,175,55,0.4)] scale-105"
                    : "bg-[#FBF6EC] hover:bg-black/85 border-[#B8860B]/20 text-[#6B5A48]"
                }`}
              >
                <span className="text-base font-devanagari font-bold text-[#C25E10] block">
                  {rin.sanskrit}
                </span>
                <span className="text-[11px] font-bold text-[#2A1810] block mt-1">
                  {rin.name.split(" ")[0]} {rin.name.split(" ")[1]}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Detailed Rin Diagnostic Card ── */}
        <div className="bg-gradient-to-br from-[#241108] to-black/95 border-2 border-[#d4af37] rounded-3xl p-6 sm:p-9 shadow-2xl relative text-left">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#d4af37]/30 mb-6">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#C25E10] font-mono">
                Debt Transferred Across Lifetimes
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-serif text-[#FFFDF8] mt-0.5">
                {activeRin.name}
              </h3>
              <p className="text-xs text-amber-200/90 font-medium mt-0.5">
                Owed to: <strong>{activeRin.debtTo}</strong>
              </p>
            </div>

            <div className="px-4 py-2 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-center">
              <span className="text-[9px] uppercase font-bold tracking-widest block">Vedic Prescription</span>
              <span className="text-xs font-bold text-emerald-50">Sadhana Payoff</span>
            </div>
          </div>

          {/* 2 Detailed Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-xs">
            <div className="bg-[#FBF6EC] border border-[#B8860B]/20 rounded-2xl p-4">
              <span className="text-[10px] uppercase text-[#6B5A48] font-bold tracking-widest block mb-1">
                Root Karmic Cause
              </span>
              <p className="text-[#2A1810] leading-relaxed font-light mb-3">{activeRin.originatingKarma}</p>

              <span className="text-[10px] uppercase text-red-600 font-bold tracking-widest block mb-1">
                Present-Life Manifestation
              </span>
              <p className="text-[#9E2A1E] leading-relaxed font-light">{activeRin.manifestationInLife}</p>
            </div>

            <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-2xl p-4">
              <span className="text-[10px] uppercase text-emerald-600 font-bold tracking-widest block mb-1">
                🌸 Personal Daily Payoff Sadhana
              </span>
              <p className="text-emerald-50 leading-relaxed font-light mb-4">{activeRin.sacredPayoffSadhana}</p>

              <span className="text-[10px] uppercase text-[#C25E10] font-bold tracking-widest block mb-1">
                🏛️ Consecrated Temple Peeth Seva
              </span>
              <p className="text-emerald-50 font-medium">{activeRin.consecrationPuja}</p>
            </div>
          </div>

          {/* High-Ticket Puja / Seva Bridge */}
          <div className="bg-gradient-to-r from-[#38160a] via-[#1f0904] to-[#38160a] border-2 border-amber-500/50 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-xl">
            <div>
              <h4 className="text-base font-serif font-bold text-[#FFFDF8] mb-1">
                Sponsor {activeRin.consecrationPuja}
              </h4>
              <p className="text-xs text-amber-100/80 leading-relaxed font-light">
                Pandit Ji will recite your personal Gotra Sankalp during evening temple rituals at Varanasi, dissolving unresolved karmic debts and sending consecrated audio blessing and Certified PDF report on WhatsApp.
              </p>
            </div>

            <div className="flex flex-col gap-2 shrink-0 w-full sm:w-auto">
              <Link
                href="/request-guidance?service=temple-puja"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#ffd700] to-[#d4af37] text-black font-extrabold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 flex items-center justify-center gap-1.5 transition-all"
              >
                <span>Sponsor Seva (₹{activeRin.recommendedSponsorship.toLocaleString()})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Sticky Action Bar */}
        <SanctifiedVerdictStickyBar
          serviceId="temple-puja"
          serviceName={`${activeRin.name.split(" ")[0]} Consecration Seva`}
          price={activeRin.recommendedSponsorship}
          badge="Karmic Rin Calibrated"
        />
      </div>
    </div>
  );
}
