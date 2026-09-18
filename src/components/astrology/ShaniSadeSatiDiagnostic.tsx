"use client";

import React, { useState } from "react";
import { Sparkles, Compass, ArrowRight } from "lucide-react";
import Link from "next/link";
import DirectWhatsAppButton from "@/components/shared/DirectWhatsAppButton";
import VedicCalculationLoader from "@/components/shared/VedicCalculationLoader";
import SanctifiedVerdictStickyBar from "@/components/shared/SanctifiedVerdictStickyBar";

const RASHIS = [
  { id: "0", name: "Mesha (Aries)", sanskrit: "मेष", currentStatus: "Free from Sade Sati", severity: "Low", phase: "Unaffected", dates: "Next cycle begins in 2032", color: "text-emerald-400" },
  { id: "1", name: "Vrishabha (Taurus)", sanskrit: "वृषभ", currentStatus: "Free from Sade Sati", severity: "Low", phase: "Unaffected", dates: "Next cycle begins in 2034", color: "text-emerald-400" },
  { id: "2", name: "Mithuna (Gemini)", sanskrit: "मिथुन", currentStatus: "Free from Sade Sati & Dhaiya", severity: "Low", phase: "Unaffected", dates: "Completely Peaceful Transit", color: "text-emerald-400" },
  { id: "3", name: "Karka (Cancer)", sanskrit: "कर्क", currentStatus: "Ashtama Shani Dhaiya Active", severity: "Moderate", phase: "8th House Transit", dates: "Ending early 2027", color: "text-amber-400" },
  { id: "4", name: "Simha (Leo)", sanskrit: "सिंह", currentStatus: "Free from Sade Sati", severity: "Low", phase: "Unaffected", dates: "Solar Protection Active", color: "text-emerald-400" },
  { id: "5", name: "Kanya (Virgo)", sanskrit: "कन्या", currentStatus: "Free from Sade Sati", severity: "Low", phase: "Unaffected", dates: "Next cycle in 2038", color: "text-emerald-400" },
  { id: "6", name: "Tula (Libra)", sanskrit: "तुला", currentStatus: "Free from Sade Sati (Exalted Saturn Grace)", severity: "Low", phase: "Unaffected", dates: "Shani Raja Yoga Blessing", color: "text-emerald-400" },
  { id: "7", name: "Vrischika (Scorpio)", sanskrit: "वृश्चिक", currentStatus: "Kantaka Shani Dhaiya (4th House)", severity: "Moderate", phase: "4th House Sukh Bhava", dates: "Ending early 2027", color: "text-amber-400" },
  { id: "8", name: "Dhanu (Sagittarius)", sanskrit: "धनु", currentStatus: "Completely Liberated from Sade Sati", severity: "Low", phase: "Post-Liberation Growth", dates: "Golden Period Active", color: "text-emerald-400" },
  { id: "9", name: "Makara (Capricorn)", sanskrit: "मकर", currentStatus: "Final Setting Phase (Charan 3)", severity: "Moderate", phase: "Exit Phase • Wealth Maturation", dates: "Liberation in March 2025/2026", color: "text-amber-400" },
  { id: "10", name: "Kumbha (Aquarius)", sanskrit: "कुम्भ", currentStatus: "Peak Core Phase (Charan 2 - Janma Shani)", severity: "Intense", phase: "Core Crown Phase", dates: "Active through 2027", color: "text-red-400" },
  { id: "11", name: "Meena (Pisces)", sanskrit: "मीन", currentStatus: "Rising Initial Phase (Charan 1)", severity: "High", phase: "Rising 12th House Phase", dates: "Active through 2031", color: "text-red-400" },
];

export default function ShaniSadeSatiDiagnostic() {
  const [selectedRashiId, setSelectedRashiId] = useState("10"); // Default Aquarius
  const [seekerName, setSeekerName] = useState("");
  const [isCalculating, setIsCalculating] = useState(false);
  const [diagnosticResult, setDiagnosticResult] = useState(RASHIS[10]);

  const handleDiagnose = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculating(true);
    setTimeout(() => {
      const found = RASHIS.find((r) => r.id === selectedRashiId) || RASHIS[0];
      setDiagnosticResult(found);
      setIsCalculating(false);
    }, 1800);
  };

  const isAffected = diagnosticResult.severity !== "Low";

  return (
    <div className="my-10 bg-gradient-to-b from-[#190d0b] via-[#24100c] to-[#0f0403] border-2 border-[#d4af37] rounded-3xl p-6 sm:p-12 shadow-[0_20px_80px_rgba(0,0,0,0.8)] relative overflow-hidden text-center">
      {/* Background celestial glow */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 bg-blue-600/15 rounded-full blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 w-96 h-96 bg-red-600/15 rounded-full blur-[140px]" />

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Header Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/15 border border-blue-400/40 text-blue-300 text-[11px] font-extrabold uppercase tracking-widest mb-3">
          <Compass className="w-3.5 h-3.5" />
          <span>Shani Mahadasha &amp; Sade Sati Armor</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-bold font-serif text-white tracking-wide mb-2">
          ॥ शनि साढ़े साती एवं ढैय्या रक्षा कवच ॥
        </h2>
        <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto mb-8 font-light leading-relaxed">
          In Vedic astrology, Lord Shani is the divine dispenser of Justice (*Karmaphala Data*). Calculate your exact 7.5-year transit phase, liberation date, and prescribed non-fearful remedies.
        </p>

        {/* Input Form */}
        <form onSubmit={handleDiagnose} className="bg-black/70 border border-white/15 rounded-3xl p-5 sm:p-7 mb-8 text-left backdrop-blur-md shadow-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#d4af37] mb-2">
                Your Full Name
              </label>
              <input
                type="text"
                placeholder="e.g. Rahul Sharma"
                value={seekerName}
                onChange={(e) => setSeekerName(e.target.value)}
                className="w-full bg-black/80 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#d4af37] mb-2">
                Select Your Moon Rashi (Birth Sign)
              </label>
              <select
                value={selectedRashiId}
                onChange={(e) => setSelectedRashiId(e.target.value)}
                className="w-full bg-black/80 border border-white/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
              >
                {RASHIS.map((r) => (
                  <option key={r.id} value={r.id} className="bg-[#1a1a1a]">
                    {r.name} — {r.currentStatus}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={isCalculating}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#d4af37] via-[#e5c453] to-[#d4af37] text-black font-extrabold text-sm uppercase tracking-wider shadow-[0_4px_25px_rgba(212,175,55,0.35)] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-black" />
            <span>Diagnose Shani Transit &amp; Armor Protocol</span>
          </button>
        </form>

        {/* Loading Experience */}
        {isCalculating && (
          <VedicCalculationLoader
            title="Calculating Saturn 7.5-Year Ephemeris Degrees"
            stages={[
              "Aligning Current Saturn (Shani Dev) Transit in Pisces/Aquarius...",
              "Evaluating Moon Sign Distance (12th, 1st, and 2nd Bhava Alignment)...",
              "Calculating Kantaka & Ashtama Shani Dhaiya Planetary Pressures...",
              "Synthesizing Pandit Ji's Non-Fearful Shanti Mantras & Kavach Remedies...",
            ]}
            estimatedSeconds={2}
          />
        )}

        {/* ── Diagnostic Result Card ── */}
        {diagnosticResult && !isCalculating && (
          <div className="space-y-6 text-left animate-fadeIn">
            <div className="bg-gradient-to-br from-[#1e0e0a] to-black/90 border-2 border-[#d4af37] rounded-3xl p-6 sm:p-9 shadow-2xl">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#d4af37]/30 mb-6">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37] font-mono">
                    Transit Assessment for {seekerName || "Seeker"}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold font-serif text-white mt-1">
                    {diagnosticResult.name} ({diagnosticResult.sanskrit})
                  </h3>
                </div>

                <div className={`px-4 py-1.5 rounded-full text-xs font-bold border ${
                  isAffected ? "bg-red-500/20 text-red-300 border-red-500/40" : "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                }`}>
                  {diagnosticResult.currentStatus}
                </div>
              </div>

              {/* Transit Horizon Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-6 text-xs">
                <div className="bg-black/60 border border-white/10 rounded-2xl p-4">
                  <span className="text-[10px] uppercase text-gray-400 font-bold tracking-widest block mb-1">
                    Active Phase
                  </span>
                  <p className="text-sm font-bold text-white">{diagnosticResult.phase}</p>
                </div>

                <div className="bg-black/60 border border-white/10 rounded-2xl p-4">
                  <span className="text-[10px] uppercase text-gray-400 font-bold tracking-widest block mb-1">
                    Planetary Intensity
                  </span>
                  <p className={`text-sm font-bold ${diagnosticResult.color}`}>{diagnosticResult.severity} Severity</p>
                </div>

                <div className="bg-black/60 border border-white/10 rounded-2xl p-4">
                  <span className="text-[10px] uppercase text-gray-400 font-bold tracking-widest block mb-1">
                    Transit Window / Liberation
                  </span>
                  <p className="text-xs font-mono font-bold text-amber-300">{diagnosticResult.dates}</p>
                </div>
              </div>

              {/* Classical Non-Fearful Shani Insight */}
              <div className="p-5 rounded-2xl bg-black/60 border border-[#d4af37]/30 mb-6 space-y-2 text-xs sm:text-sm text-gray-300">
                <p className="leading-relaxed">
                  <strong className="text-white">Ancient Shastra Guidance:</strong> Shani Sade Sati is not a curse—it is a sacred period of karmic purification and discipline. When navigated with patience, charity, and authentic Vedic remedies, Lord Shani bestows enduring wisdom, societal authority, and unshakeable inner resilience.
                </p>
                <p className="text-emerald-300 font-semibold pt-1">
                  ✨ <strong>Prescribed Daily Sadhana:</strong> Recite Hanuman Chalisa on Tuesday/Saturday evenings, light a mustard oil Diya under a Peepal tree, and avoid wearing torn black footwear.
                </p>
              </div>

              {/* High-Ticket Shani Kavach Ring & Temple Puja Action */}
              <div className="bg-gradient-to-r from-[#2f130a] via-[#1a0b06] to-[#2f130a] border-2 border-amber-500/50 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-xl">
                <div>
                  <h4 className="text-base font-serif font-bold text-white mb-1">
                    Consecrated Black Horseshoe Ring &amp; Shani Shanti Puja
                  </h4>
                  <p className="text-xs text-gray-300 leading-relaxed font-light">
                    Pandit Ji will energize an authentic iron ring (*Kale Ghode Ki Naal*) in your Gotra with 108 Shani Beej Mantras at Kashi, delivering the consecrated ring with home Prasad.
                  </p>
                </div>

                <div className="flex flex-col gap-2 shrink-0 w-full sm:w-auto">
                  <Link
                    href="/request-guidance?service=energized-gemstone"
                    className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#e5c453] to-[#d4af37] text-black font-extrabold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 flex items-center justify-center gap-1.5 transition-all"
                  >
                    <span>Get Consecrated Ring (₹3,500)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <DirectWhatsAppButton
                    variant="compact"
                    serviceName={`Shani Shanti Gotra Puja for ${diagnosticResult.name}`}
                    price={1501}
                    className="w-full justify-center py-2 text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Sticky Action Bar */}
            <SanctifiedVerdictStickyBar
              serviceId="energized-gemstone"
              serviceName={`Shani Protective Ring & Shanti Puja (${diagnosticResult.name})`}
              price={3500}
              badge={`Shani Armor Active for ${diagnosticResult.name}`}
            />
          </div>
        )}
      </div>
    </div>
  );
}
