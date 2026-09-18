"use client";

import React, { useState, useEffect, useRef } from "react";
import { Gem, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import DirectWhatsAppButton from "./DirectWhatsAppButton";

interface GemstoneRitualProps {
  gemstoneName?: string;
  sanskritName?: string;
  planet?: string;
  metal?: string;
  finger?: string;
  price?: number | string;
}

export default function GemstonePranaPratishthaRitual({
  gemstoneName = "Yellow Sapphire (Pukhraj)",
  sanskritName: _sanskritName = "Pushparag",
  planet: _planet = "Guru (Jupiter)",
  metal = "Gold or Panchdhatu",
  finger = "Index Finger (Tarjani)",
  price = "₹5,500+",
}: GemstoneRitualProps) {
  const [holding, setHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isConsecrated, setIsConsecrated] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startHold = () => {
    if (isConsecrated) return;
    setHolding(true);
  };

  const endHold = () => {
    if (isConsecrated) return;
    setHolding(false);
    setProgress(0);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  useEffect(() => {
    if (holding && !isConsecrated) {
      timerRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsConsecrated(true);
            setHolding(false);
            if (timerRef.current) clearInterval(timerRef.current);
            return 100;
          }
          return prev + 2; // ~5 seconds to fill
        });
      }, 100);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [holding, isConsecrated]);

  return (
    <div className="my-10 bg-[#FFFDF8] border-2 border-emerald-500/50 rounded-3xl p-6 sm:p-9 shadow-[0_14px_40px_-18px_rgba(107,42,20,0.25)] relative overflow-hidden">
      {/* Glow */}
      <div className="pointer-events-none absolute right-0 top-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px]" />

      <div className="relative z-10 text-center max-w-2xl mx-auto mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 text-[10px] font-extrabold uppercase tracking-widest mb-2">
          <Gem className="w-3.5 h-3.5" />
          <span>Interactive Planetary Consecration Ritual</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#2A1810]">
          Simulate Prana Pratishtha Energization for {gemstoneName}
        </h3>
        <p className="text-xs text-[#6B5A48] mt-1">
          In Vedic tradition, a natural gemstone remains inert until energized with 108 Sanskrit Beej Mantras during its auspicious planetary Muhurta.
        </p>
      </div>

      {/* Hold-to-Energize Touch Interaction */}
      <div className="relative z-10 flex flex-col items-center justify-center my-6">
        <div
          onMouseDown={startHold}
          onMouseUp={endHold}
          onMouseLeave={endHold}
          onTouchStart={startHold}
          onTouchEnd={endHold}
          className={`relative w-28 h-28 rounded-full flex flex-col items-center justify-center cursor-pointer select-none transition-all duration-300 ${
            isConsecrated
              ? "bg-gradient-to-br from-emerald-500 to-teal-600 shadow-[0_0_60px_rgba(16,185,129,0.7)] scale-110"
              : holding
              ? "bg-gradient-to-br from-[#d4af37] to-amber-600 scale-105 shadow-[0_0_40px_rgba(212,175,55,0.6)]"
              : "bg-[#FBF6EC] border-2 border-emerald-500/40 hover:border-emerald-400"
          }`}
        >
          {/* Progress Ring */}
          {!isConsecrated && holding && (
            <svg className="absolute -inset-2 w-32 h-32 -rotate-90 pointer-events-none">
              <circle
                cx="64"
                cy="64"
                r="60"
                stroke="#10b981"
                strokeWidth="4"
                fill="none"
                strokeDasharray="377"
                strokeDashoffset={377 - (377 * progress) / 100}
                strokeLinecap="round"
              />
            </svg>
          )}

          <Gem className={`w-10 h-10 ${isConsecrated ? "text-[#2A1810] animate-pulse" : holding ? "text-black animate-spin" : "text-emerald-600"}`} />
          <span className={`text-[9px] font-bold uppercase tracking-wider mt-1 ${isConsecrated ? "text-[#2A1810]" : holding ? "text-black" : "text-[#6B5A48]"}`}>
            {isConsecrated ? "Consecrated" : holding ? `${progress}%` : "Hold 5s"}
          </span>
        </div>

        <p className="text-xs font-semibold text-[#C25E10] mt-3">
          {isConsecrated
            ? "✨ Planetary Vibration Harmonized (108-Mantra Energized)"
            : holding
            ? "Chanting Sanskrit Vedic Beej Mantras... Keep Holding"
            : "Press & Hold Thumb to Begin Consecration Ceremony"}
        </p>
      </div>

      {/* Consecrated Result & Ring Dispatch Card */}
      {isConsecrated && (
        <div className="relative z-10 bg-[#FBF6EC] border-2 border-emerald-500/60 rounded-2xl p-5 sm:p-6 mt-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>100% Natural • Govt Lab Certified • Consecrated</span>
              </div>
              <h4 className="text-base font-bold font-serif text-[#2A1810]">
                Order Your Energized {gemstoneName} Ring
              </h4>
              <p className="text-xs text-[#6B5A48]">
                Set in {metal} for your {finger}. Energized in your Gotra and dispatched with certified authenticity dossier.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto shrink-0">
              <Link
                href="/request-guidance?service=energized-gemstone"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-extrabold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 flex items-center justify-center gap-1.5"
              >
                <span>Order Ring ({price})</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <DirectWhatsAppButton
                variant="compact"
                serviceName={`Consecrated ${gemstoneName} Ring`}
                price={price}
                className="justify-center py-2.5"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
