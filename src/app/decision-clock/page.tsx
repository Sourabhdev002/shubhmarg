"use client";

import React, { useState, useEffect } from "react";
import { Clock, CheckCircle2, XCircle, Zap } from "lucide-react";
import { getActiveHora, getActiveChoghadiya } from "@/lib/vedic-clock";
import Link from "next/link";
import CalendarSyncButton from "@/components/calendar/CalendarSyncButton";

export default function DecisionClockPage() {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [selectedActivity, setSelectedActivity] = useState("Signing Agreements / Business Deals");

  useEffect(() => {
    queueMicrotask(() => setCurrentTime(new Date()));
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (!currentTime) return null;

  const hora = getActiveHora(currentTime);
  const choghadiya = getActiveChoghadiya(currentTime);

  const formattedTime = currentTime.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  const formattedDate = currentTime.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <main className="min-h-screen bg-[#FBF6EC] text-[#2A1810] pt-24 pb-28 px-4 sm:px-6">
      {/* Ambient background glow */}
      <div className="pointer-events-none fixed top-0 right-0 w-[50vw] h-[50vw] max-w-96 max-h-96 bg-[#d4af37]/10 rounded-full blur-[120px]" />
      <div className="pointer-events-none fixed bottom-0 left-0 w-[50vw] h-[50vw] max-w-96 max-h-96 bg-[#72232b]/20 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFDF8] border border-[#B8860B]/30 mb-3">
            <Clock className="w-4 h-4 text-[#C25E10] animate-spin [animation-duration:15s]" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#C25E10]">
              Real-Time Vedic Ephemeris
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-serif text-[#2A1810] tracking-wide mb-3">
            Live Vedic Decision Clock &amp; Hora Radar
          </h1>
          <p className="text-[#2E1D14] text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-medium">
            Real-time planetary Hora and Choghadiya energy calculation. Check whether this very minute is auspicious for your crucial actions.
          </p>
        </div>

        {/* Live Clock Hero Card */}
        <div className="bg-gradient-to-br from-[#1c110c] to-[#25100c] border-2 border-[#d4af37]/60 rounded-3xl p-6 sm:p-10 shadow-2xl mb-8 text-center relative overflow-hidden">
          <div className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-bold mb-2">
            {formattedDate}
          </div>

          <div className="text-5xl sm:text-6xl font-extrabold font-mono text-white tracking-wider my-3 drop-shadow-[0_0_20px_rgba(212,175,55,0.4)]">
            {formattedTime}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
            <div className="px-4 py-1.5 rounded-full bg-black/60 border border-[#d4af37]/40 text-xs font-semibold text-white">
              Active Hora: <strong className="text-[#d4af37]">{hora.sanskrit} ({hora.planet})</strong> ({hora.activeTimeRange})
            </div>
            <div className={`px-4 py-1.5 rounded-full text-xs font-bold border ${
              choghadiya.isAuspicious
                ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                : "bg-amber-500/20 text-amber-300 border-amber-500/40"
            }`}>
              Choghadiya: {choghadiya.nature}
            </div>
          </div>
        </div>

        {/* 1-Tap Action Decision Validator */}
        <div className="bg-[#FFFDF8] border border-[#B8860B]/25 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-lg mb-8">
          <h3 className="text-base font-bold font-serif text-[#C25E10] uppercase tracking-wider mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-[#C25E10]" />
            <span>Instant Action Timing Validator</span>
          </h3>

          <label className="block text-xs font-bold text-[#2E1D14] mb-2">
            Select the activity you are about to perform right now:
          </label>

          <select
            value={selectedActivity}
            onChange={(e) => setSelectedActivity(e.target.value)}
            className="w-full bg-[#F5EAD6]/50 border border-[#B8860B]/40 rounded-2xl px-4 py-3.5 text-sm text-[#2A1810] font-medium focus:outline-none focus:border-[#E8791E] mb-6 shadow-inner cursor-pointer"
          >
            <option value="Signing Agreements / Business Deals" className="bg-[#FFFDF8] text-[#2A1810]">Signing Agreements / Business Deals</option>
            <option value="Making a Major Financial Investment" className="bg-[#FFFDF8] text-[#2A1810]">Making a Major Financial Investment</option>
            <option value="Starting a Long Journey / Travel" className="bg-[#FFFDF8] text-[#2A1810]">Starting a Long Journey / Travel</option>
            <option value="Purchasing Gold, Vehicle, or Property" className="bg-[#FFFDF8] text-[#2A1810]">Purchasing Gold, Vehicle, or Property</option>
            <option value="Initiating Medical Treatment or Surgery" className="bg-[#FFFDF8] text-[#2A1810]">Initiating Medical Treatment or Surgery</option>
            <option value="Making an Important Phone Call or Pitch" className="bg-[#FFFDF8] text-[#2A1810]">Making an Important Phone Call or Pitch</option>
          </select>

          {/* Real-time Verdict */}
          <div className={`p-5 sm:p-6 rounded-2xl border shadow-sm ${
            choghadiya.isAuspicious
              ? "bg-gradient-to-br from-emerald-50 via-[#F0FDF4] to-emerald-100/60 border-emerald-500/40 text-emerald-950"
              : "bg-gradient-to-br from-amber-50 via-[#FFFBEB] to-amber-100/60 border-amber-500/40 text-amber-950"
          }`}>
            <div className="flex items-center gap-3 mb-2">
              {choghadiya.isAuspicious ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
              ) : (
                <XCircle className="w-6 h-6 text-amber-600 shrink-0" />
              )}
              <h4 className="text-base font-bold text-[#2A1810]">
                {choghadiya.isAuspicious
                  ? `🟢 Favorable Time for ${selectedActivity}`
                  : `🟡 Cautionary Period — Proceed with Patience`}
              </h4>
            </div>

            <p className="text-xs sm:text-[13px] text-[#2E1D14] leading-relaxed mt-1 font-medium">
              Current <strong className="text-[#843D0A] font-bold">{hora.sanskrit} Hora</strong> is naturally aligned with <em>{hora.bestFor}</em>.
              Combined with the active <strong className="text-[#843D0A] font-bold">{choghadiya.nature}</strong> period ({choghadiya.idealActivities}), this window supports deliberate and focused actions.
            </p>

            {/* 1-Click Calendar Sync */}
            <div className="mt-4 pt-3 border-t border-[#B8860B]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <span className="text-[11px] text-[#2E1D14] font-bold">
                📅 Add this auspicious window to your phone calendar with 30-min reminder:
              </span>
              <CalendarSyncButton
                title={`Auspicious ${hora.planet} Hora — ${selectedActivity}`}
                description={`Auspicious Vedic window for ${selectedActivity}. Ruling Graha: ${hora.planet} (${hora.sanskrit}). Recommended by ShubhMarg.`}
                durationMinutes={60}
              />
            </div>
          </div>
        </div>

        {/* 24-Hour Hora Reference Guide */}
        <div className="bg-[#FFFDF8] border border-[#B8860B]/35 rounded-3xl p-6 sm:p-8 mb-8 shadow-sm">
          <h4 className="text-sm font-bold uppercase tracking-wider text-[#C25E10] mb-2.5 font-serif">
            About Planetary Horas &amp; Choghadiya
          </h4>
          <p className="text-xs sm:text-[13px] text-[#2E1D14] leading-relaxed font-normal">
            In Vedic astrology, each hour of the day is governed by a distinct Graha (Planet), exerting specific vibratory influences on human psychology and material results. Initiating endeavors in harmonious Horas significantly enhances auspicious outcomes.
          </p>
        </div>

        {/* 2-Hour Tatkal Express Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#200e0b] to-[#2d120a] border-2 border-[#D4AF37]/60 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div>
            <div className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-300 uppercase tracking-widest mb-1.5">
              <span>⚡ Urgent High-Stakes Dilemma</span>
            </div>
            <h4
              style={{ color: "#FFFDF8" }}
              className="text-xl sm:text-2xl font-bold font-serif text-[#FFFDF8] mb-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
            >
              Need Pandit Ji&apos;s Direct Verdict Under 2 Hours?
            </h4>
            <p className="text-xs sm:text-[13px] text-[#EAE3D2] max-w-lg font-normal leading-relaxed">
              Priority VIP queue jump for time-critical interviews, visa submissions, urgent contract signings, and high-stakes crossroads.
            </p>
          </div>
          <Link
            href="/request-guidance?service=tatkal-express"
            className="px-6 py-3.5 bg-gradient-to-r from-[#7B0F1E] via-[#9E182A] to-[#630915] border border-[#F5C842] hover:brightness-110 text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl shadow-[0_4px_20px_rgba(123,15,30,0.5)] shrink-0 flex items-center gap-2 cursor-pointer transition-all active:scale-95"
          >
            <span>Get 2-Hour Express (₹2,499)</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
