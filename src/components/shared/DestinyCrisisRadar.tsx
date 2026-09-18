"use client";

import React from "react";
import { Flame, ShieldAlert, Sparkles, ArrowRight, Clock, ShieldCheck } from "lucide-react";
import Link from "next/link";
import DirectWhatsAppButton from "./DirectWhatsAppButton";

interface DestinyCrisisRadarProps {
  category?: string;
  frictionScore?: number;
  frictionTitle?: string;
  planetaryCause?: string;
  emotionalStakes?: string;
  remedyAction?: string;
  serviceId?: string;
  serviceName?: string;
  price?: number | string;
}

export default function DestinyCrisisRadar({
  category = "Career, Wealth & Marital Destiny",
  frictionScore = 84,
  frictionTitle = "Impending Karmic Crossroads & Planetary Transition Peak",
  planetaryCause = "A confluence of active transit degrees (Shani-Rahu axis) is creating subconscious resistance and timing friction in your primary house of ambition.",
  emotionalStakes = "When planetary friction exceeds 75%, effort alone produces diminished returns unless the vibrational discord is cleared through personal Gotra-specific mantra frequencies.",
  remedyAction = "Perform Remote Gotra Sankalp Shanti & Energize Personal Beej Mantra",
  serviceId = "vedic-guidance",
  serviceName = "Pandit Ji's Urgent Planetary Remedy Guidance",
  price = 501,
}: DestinyCrisisRadarProps) {
  return (
    <div className="my-10 bg-[#FFFDF8] border-2 border-red-500/60 rounded-3xl p-6 sm:p-9 shadow-[0_15px_60px_rgba(239,68,68,0.15)] relative overflow-hidden">
      {/* Background celestial grid */}
      <div className="pointer-events-none absolute -right-20 -top-20 w-80 h-80 bg-red-600/10 rounded-full blur-[100px]" />
      <div className="pointer-events-none absolute -left-20 -bottom-20 w-80 h-80 bg-[#d4af37]/10 rounded-full blur-[100px]" />

      {/* Top Warning Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-red-500/30">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/15 border border-red-500/40 text-red-700 text-[11px] font-extrabold uppercase tracking-widest">
          <ShieldAlert className="w-4 h-4 text-red-600" />
          <span>Vedic Crisis &amp; Opportunity Radar</span>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[#C25E10]">
          <Clock className="w-3.5 h-3.5" />
          <span>Active Planetary Window: Next 48–72 Hours</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Planetary Friction Gauge */}
        <div className="lg:col-span-4 bg-[#FBF6EC] border border-red-500/40 rounded-3xl p-6 text-center flex flex-col items-center justify-center relative shadow-inner">
          <span className="text-[10px] uppercase tracking-widest text-[#6B5A48] font-bold mb-2">
            Calculated Planetary Friction
          </span>

          {/* Radial Score Meter */}
          <div className="relative w-36 h-36 my-2 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" stroke="rgba(255,255,255,0.1)" strokeWidth="8" fill="none" />
              <circle
                cx="50"
                cy="50"
                r="42"
                stroke="#ef4444"
                strokeWidth="8"
                strokeDasharray="264"
                strokeDashoffset={264 - (264 * frictionScore) / 100}
                strokeLinecap="round"
                fill="none"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-extrabold font-mono text-red-600 leading-none">
                {frictionScore}%
              </span>
              <span className="text-[10px] text-[#6B5A48] font-bold uppercase tracking-wider mt-1">
                High Impact
              </span>
            </div>
          </div>

          <div className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-[#C25E10] bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            <Flame className="w-3 h-3 text-amber-400" />
            <span>Remedial Action Recommended</span>
          </div>
        </div>

        {/* Right Column: Deep Emotional Insight & Direct Remedy */}
        <div className="lg:col-span-8 space-y-4">
          <div>
            <span className="text-[11px] font-bold text-[#C25E10] uppercase tracking-widest">
              {category}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#2A1810] mt-0.5 leading-snug">
              {frictionTitle}
            </h3>
          </div>

          <p className="text-xs sm:text-sm text-[#6B5A48] leading-relaxed font-light">
            {planetaryCause}
          </p>

          {/* Emotional Resonance Blockquote */}
          <div className="p-4 rounded-2xl bg-red-950/40 border-l-4 border-red-500 text-xs sm:text-sm text-red-100 italic leading-relaxed">
            &ldquo;{emotionalStakes}&rdquo;
          </div>

          {/* Prescribed Remedy */}
          <div className="pt-2">
            <p className="text-[11px] font-bold text-[#6B5A48] uppercase tracking-widest mb-1.5">
              Prescribed Vedic Solution:
            </p>
            <p className="text-xs font-semibold text-emerald-700 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{remedyAction}</span>
            </p>
          </div>

          {/* Action Row */}
          <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Link
              href={`/request-guidance?service=${serviceId}`}
              className="px-7 py-4 rounded-2xl bg-gradient-to-r from-red-600 via-amber-500 to-red-600 text-[#2A1810] font-extrabold text-xs uppercase tracking-wider shadow-[0_4px_30px_rgba(239,68,68,0.4)] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
            >
              <span>Neutralize with Pandit Ji ({typeof price === "number" ? `₹${price}` : price})</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <DirectWhatsAppButton
              variant="compact"
              serviceName={serviceName}
              price={price}
              className="py-3.5 px-5 rounded-2xl justify-center text-xs"
            />
          </div>

          {/* 100% Dakshina Guarantee Notice */}
          <div className="flex items-center gap-2 text-[11px] text-[#6B5A48] pt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C25E10]" />
            <span>100% Dakshina Refund Guarantee if reading fails to bring direct clarity.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
