"use client";

import React from "react";
import { AlertCircle, CheckCircle2, Sparkles, ArrowRight, Compass } from "lucide-react";
import Link from "next/link";
import DirectWhatsAppButton from "./DirectWhatsAppButton";

interface TwoTimelinesProps {
  toolName?: string;
  seekerName?: string;
  category?: string;
  unremediedTitle?: string;
  unremediedPoints?: string[];
  sanctifiedTitle?: string;
  sanctifiedPoints?: string[];
  serviceId?: string;
  serviceName?: string;
  price?: number | string;
}

export default function TwoTimelinesVisualizer({
  toolName: _toolName = "Vedic Guidance",
  seekerName = "Seeker",
  category: _category = "Career, Wealth & Relationship Destiny",
  unremediedTitle = "Path of Unremedied Cosmic Friction (Default Trajectory)",
  unremediedPoints = [
    "Prolonged subconscious hesitation & delayed decision-making during Rahu-Shani transit peak.",
    "Avoidable financial leakage or repeated near-miss deals due to discord in the 10th/11th house.",
    "Mental fatigue and recurring friction in family or partnership conversations.",
  ],
  sanctifiedTitle = "Path of Consecrated Gotra Alignment (Remedial Trajectory)",
  sanctifiedPoints = [
    "Immediate clearing of subtle vibrational blockages via personalized Sanskrit Beej Mantra.",
    "Auspicious 28-day breakthrough window unlocked for wealth investments and new agreements.",
    "Harmonized mental calm, protected auric field, and direct guidance from Pandit Ji.",
  ],
  serviceId = "vedic-guidance",
  serviceName = "Pandit Ji's Consecrated Gotra Remedy Guidance",
  price = 501,
}: TwoTimelinesProps) {
  return (
    <div className="my-10 bg-[#FFFDF8] border-2 border-[#B8860B]/30 rounded-3xl p-6 sm:p-9 shadow-[0_20px_70px_rgba(0,0,0,0.8)] relative overflow-hidden">
      {/* Background glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 w-80 h-80 bg-[#d4af37]/15 rounded-full blur-[100px]" />
      <div className="pointer-events-none absolute -left-20 -bottom-20 w-80 h-80 bg-[#72232b]/25 rounded-full blur-[100px]" />

      {/* Header */}
      <div className="relative z-10 text-center mb-8 pb-6 border-b border-[#B8860B]/20">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#d4af37]/15 border border-[#B8860B]/30 text-[#C25E10] text-[10px] font-extrabold uppercase tracking-widest mb-3">
          <Compass className="w-3.5 h-3.5" />
          <span>Vedic Parallel Destiny Simulator</span>
        </div>
        <h3 className="text-xl sm:text-3xl font-bold font-serif text-[#2A1810] tracking-wide">
          The Two Trajectories Ahead for {seekerName}
        </h3>
        <p className="text-xs sm:text-sm text-[#6B5A48] max-w-xl mx-auto mt-1">
          Planetary transits do not dictate a single fixed fate. They present a fork in the road between unremedied friction and consecrated alignment.
        </p>
      </div>

      {/* Two Timelines Grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Timeline A: Unremedied Friction */}
        <div className="bg-gradient-to-b from-red-950/30 to-black/60 border-2 border-red-500/40 rounded-3xl p-6 relative flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-red-600 bg-red-500/10 px-2.5 py-1 rounded-full border border-red-500/30">
                Timeline A • Inaction
              </span>
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>

            <h4 className="text-base sm:text-lg font-bold font-serif text-[#FFFDF8] mb-3">
              {unremediedTitle}
            </h4>

            <ul className="space-y-3 text-xs text-[#6B5A48]">
              {unremediedPoints.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-red-500/20 text-red-600 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5 border border-red-500/30">
                    ✕
                  </span>
                  <span className="leading-relaxed text-red-100/90">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-red-500/20 text-[11px] text-red-300/80 italic">
            &ldquo;Ignoring planetary friction leaves your outcomes to the mercy of malefic transit turbulence.&rdquo;
          </div>
        </div>

        {/* Timeline B: Sanctified Consecration */}
        <div className="bg-gradient-to-b from-[#2a1708]/80 to-black/60 border-2 border-[#d4af37] rounded-3xl p-6 relative flex flex-col justify-between shadow-[0_0_40px_rgba(212,175,55,0.2)]">
          <div className="absolute -top-3 left-6 bg-gradient-to-r from-[#d4af37] to-amber-400 text-black text-[10px] font-extrabold uppercase tracking-widest px-3 py-0.5 rounded-full shadow-md">
            ★ Auspicious Consecrated Path ★
          </div>

          <div>
            <div className="flex items-center justify-between gap-2 mb-3 mt-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#C25E10] bg-[#d4af37]/15 px-2.5 py-1 rounded-full border border-[#d4af37]/30">
                Timeline B • Gotra Consecration
              </span>
              <Sparkles className="w-5 h-5 text-[#C25E10]" />
            </div>

            <h4 className="text-base sm:text-lg font-bold font-serif text-[#FFFDF8] mb-3">
              {sanctifiedTitle}
            </h4>

            <ul className="space-y-3 text-xs text-[#6B5A48]">
              {sanctifiedPoints.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed text-gray-100 font-medium">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-[#d4af37]/20 text-[11px] text-[#C25E10] font-medium">
            ✨ Consecrated Gotra Sankalp realigns planetary forces to work in your favor.
          </div>
        </div>
      </div>

      {/* Direct Leap Action Banner */}
      <div className="relative z-10 bg-[#FBF6EC] border border-[#B8860B]/30 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-5">
        <div>
          <h4 className="text-base font-bold font-serif text-[#2A1810] mb-1">
            Choose the Consecrated Trajectory for {seekerName}
          </h4>
          <p className="text-xs text-[#6B5A48]">
            Pandit Ji personally sanctifies your Gotra and provides your custom spoken remedies on WhatsApp.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto shrink-0">
          <Link
            href={`/request-guidance?service=${serviceId}`}
            className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-[#d4af37] via-[#e5c453] to-[#d4af37] text-black font-extrabold text-xs uppercase tracking-wider shadow-[0_4px_25px_rgba(212,175,55,0.4)] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <span>Activate Timeline B ({typeof price === "number" ? `₹${price}` : price})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <DirectWhatsAppButton
            variant="compact"
            serviceName={serviceName}
            price={price}
            seekerName={seekerName}
            className="w-full sm:w-auto py-3 px-4 justify-center text-xs"
          />
        </div>
      </div>
    </div>
  );
}
