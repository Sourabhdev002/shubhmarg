"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { CalendarDays, TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";
import DirectWhatsAppButton from "@/components/shared/DirectWhatsAppButton";
import VedicCalculationLoader from "@/components/shared/VedicCalculationLoader";
import SanctifiedVerdictStickyBar from "@/components/shared/SanctifiedVerdictStickyBar";

const RASHIS = [
  "Mesha (Aries)", "Vrishabha (Taurus)", "Mithuna (Gemini)", "Karka (Cancer)",
  "Simha (Leo)", "Kanya (Virgo)", "Tula (Libra)", "Vrischika (Scorpio)",
  "Dhanu (Sagittarius)", "Makara (Capricorn)", "Kumbha (Aquarius)", "Meena (Pisces)",
];

const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

interface MonthData {
  month: string;
  color: "green" | "amber" | "red";
  bestDates: string;
  avoidDates: string;
  advice: string;
  investType: string;
}

function generateCalendarForRashi(rashiIndex: number): MonthData[] {
  // Deterministic pseudo-random based on rashi index
  const seed = (rashiIndex + 1) * 7;
  return MONTH_NAMES.map((month, i) => {
    const val = (seed + i * 13 + i * i) % 10;
    const color: "green" | "amber" | "red" = val < 4 ? "green" : val < 7 ? "amber" : "red";
    const greenDates = [`${(i * 3 + 1) % 28 + 1}`, `${(i * 5 + 7) % 28 + 1}`, `${(i * 7 + 11) % 28 + 1}`];
    const redDates = [`${(i * 4 + 3) % 28 + 1}`, `${(i * 6 + 9) % 28 + 1}`];
    const investTypes = ["Equity & Stocks", "Gold & Precious Metals", "Real Estate", "Fixed Deposits", "Mutual Funds", "Business Expansion", "Property Registration", "Loan Applications", "New Ventures", "Crypto & Digital", "Government Bonds", "Insurance Policies"];
    return {
      month,
      color,
      bestDates: greenDates.join(", "),
      avoidDates: redDates.join(", "),
      advice: color === "green" ? "Excellent window for major financial decisions. Jupiter & Venus favor expansion." : color === "amber" ? "Proceed cautiously. Saturn transits suggest moderate, not aggressive investments." : "Avoid signing contracts, taking new loans, or making large irreversible financial commitments.",
      investType: investTypes[i],
    };
  });
}

export default function VedicWealthCalendar() {
  const [seekerName, setSeekerName] = useState("");
  const [selectedRashi, setSelectedRashi] = useState(0);
  const [birthDate, setBirthDate] = useState("");
  const [isCalculating, setIsCalculating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);

  const calendarData = useMemo(() => generateCalendarForRashi(selectedRashi), [selectedRashi]);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculating(true);
    setTimeout(() => {
      setIsCalculating(false);
      setIsGenerated(true);
    }, 2200);
  };

  const greenMonths = calendarData.filter((m) => m.color === "green").length;
  const amberMonths = calendarData.filter((m) => m.color === "amber").length;
  const redMonths = calendarData.filter((m) => m.color === "red").length;

  return (
    <div className="my-10 bg-[#FFFDF8] border-2 border-[#d4af37] rounded-3xl p-6 sm:p-12 shadow-[0_20px_80px_rgba(212,175,55,0.3)] relative overflow-hidden text-center">
      <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 bg-emerald-500/15 rounded-full blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 w-96 h-96 bg-[#d4af37]/20 rounded-full blur-[140px]" />

      <div className="relative z-10 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/40 text-emerald-700 text-[11px] font-extrabold uppercase tracking-widest mb-3">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>12-Month Personalized Financial Astrology</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-bold font-serif text-[#2A1810] tracking-wide mb-2">
          ॥ वैदिक धन कैलेंडर ॥
        </h2>
        <p className="text-xs sm:text-sm text-[#6B5A48] max-w-xl mx-auto mb-8 font-light leading-relaxed">
          Your personalized <strong>12-month financial astrology planner</strong> — precise Green, Amber, and Red zones for investments, property purchases, loan applications, and business expansion based on your Rashi and Mahadasha transit.
        </p>

        <form onSubmit={handleGenerate} className="bg-[#FBF6EC] border border-[#B8860B]/20 rounded-3xl p-5 sm:p-7 mb-8 text-left backdrop-blur-xl shadow-[0_14px_40px_-18px_rgba(107,42,20,0.25)]">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#C25E10] mb-1.5">Your Full Name</label>
              <input type="text" placeholder="e.g. Rajesh Sharma" value={seekerName} onChange={(e) => setSeekerName(e.target.value)} className="w-full bg-[#FBF6EC] border border-[#B8860B]/20 rounded-xl px-4 py-3 text-sm text-[#2A1810] placeholder-[#6B5A48]/60 focus:outline-none focus:border-[#d4af37]" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#C25E10] mb-1.5">Your Janma Rashi</label>
              <select value={selectedRashi} onChange={(e) => setSelectedRashi(Number(e.target.value))} className="w-full bg-[#FBF6EC] border border-[#B8860B]/20 rounded-xl px-4 py-3 text-sm text-[#2A1810] focus:outline-none focus:border-[#d4af37]">
                {RASHIS.map((r, i) => (<option key={i} value={i} className="bg-[#1a1a1a]">{r}</option>))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#C25E10] mb-1.5">Date of Birth</label>
              <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} className="w-full bg-[#FBF6EC] border border-[#B8860B]/20 rounded-xl px-4 py-3 text-sm text-[#2A1810] focus:outline-none focus:border-[#d4af37]" />
            </div>
          </div>
          <button type="submit" disabled={isCalculating} className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#d4af37] via-[#ffd700] to-[#d4af37] text-black font-extrabold text-sm uppercase tracking-wider shadow-[0_4px_25px_rgba(212,175,55,0.4)] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer">
            <CalendarDays className="w-5 h-5" /><span>Generate My Vedic Wealth Calendar</span>
          </button>
        </form>

        {isCalculating && (
          <VedicCalculationLoader title="Computing 12-Month Financial Transit Map" stages={["Analyzing Jupiter's Transit Through Your 2nd & 11th House...", "Computing Saturn's Wealth Restriction Windows...", "Mapping Rahu-Ketu Shadow Axis on Investment Houses...", "Generating Monthly Green-Amber-Red Financial Zones..."]} estimatedSeconds={2} />
        )}

        {/* ── 12-Month Wealth Calendar ── */}
        {isGenerated && !isCalculating && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 text-left animate-fadeIn">
            {/* Summary Stats */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-emerald-900/30 border border-emerald-500/40 rounded-2xl p-4 text-center">
                <span className="text-3xl font-bold text-emerald-600">{greenMonths}</span>
                <span className="text-[10px] uppercase text-emerald-300 font-bold tracking-widest block mt-0.5">Green Months</span>
                <span className="text-[9px] text-[#6B5A48]">Expand & Invest</span>
              </div>
              <div className="bg-amber-900/30 border border-amber-500/40 rounded-2xl p-4 text-center">
                <span className="text-3xl font-bold text-amber-400">{amberMonths}</span>
                <span className="text-[10px] uppercase text-[#C25E10] font-bold tracking-widest block mt-0.5">Amber Months</span>
                <span className="text-[9px] text-[#6B5A48]">Proceed Cautiously</span>
              </div>
              <div className="bg-red-900/30 border border-red-500/40 rounded-2xl p-4 text-center">
                <span className="text-3xl font-bold text-red-600">{redMonths}</span>
                <span className="text-[10px] uppercase text-red-300 font-bold tracking-widest block mt-0.5">Red Months</span>
                <span className="text-[9px] text-[#6B5A48]">Avoid Commitments</span>
              </div>
            </div>

            {/* Monthly Cards */}
            <div className="space-y-3">
              {calendarData.map((m, i) => {
                const borderColor = m.color === "green" ? "border-emerald-500/50" : m.color === "amber" ? "border-amber-500/50" : "border-red-500/50";
                const bgColor = m.color === "green" ? "bg-emerald-950/25" : m.color === "amber" ? "bg-amber-950/25" : "bg-red-950/25";
                const badge = m.color === "green" ? "✅ EXPAND" : m.color === "amber" ? "⚠️ CAUTION" : "🔴 AVOID";
                const badgeColor = m.color === "green" ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40" : m.color === "amber" ? "bg-amber-500/20 text-[#C25E10] border-amber-500/40" : "bg-red-500/20 text-red-300 border-red-500/40";
                return (
                  <div key={i} className={`${bgColor} border ${borderColor} rounded-2xl p-4 sm:p-5`}>
                    <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                      <h4 className="text-base font-bold text-[#2A1810] font-serif">{m.month}</h4>
                      <span className={`px-3 py-0.5 rounded-full text-[10px] font-bold border ${badgeColor}`}>{badge}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs mb-2">
                      <div>
                        <span className="text-[10px] uppercase text-emerald-600 font-bold block">Best Dates</span>
                        <span className="text-[#2A1810] font-mono">{m.bestDates}</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase text-red-600 font-bold block">Avoid Dates</span>
                        <span className="text-[#2A1810] font-mono">{m.avoidDates}</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase text-[#C25E10] font-bold block">Best For</span>
                        <span className="text-[#2A1810] font-medium">{m.investType}</span>
                      </div>
                    </div>
                    <p className="text-xs text-[#6B5A48] font-light">{m.advice}</p>
                  </div>
                );
              })}
            </div>

            {/* High-Ticket Wealth Advisor CTA */}
            <div className="bg-gradient-to-r from-[#38160a] via-[#1f0904] to-[#38160a] border-2 border-amber-500/50 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-xl">
              <div>
                <h4 className="text-base font-serif font-bold text-[#FFFDF8] mb-1">Unlock 1-on-1 Vedic Wealth Strategy Call</h4>
                <p className="text-xs text-amber-100/80 leading-relaxed font-light">Pandit Ji reviews your complete Mahadasha, Antardasha, and Gochar to give precise investment timing advice personalized to your birth chart.</p>
              </div>
              <div className="flex flex-col gap-2 shrink-0 w-full sm:w-auto">
                <Link href="/request-guidance?service=deep-kundli" className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#ffd700] to-[#d4af37] text-black font-extrabold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 flex items-center justify-center gap-1.5 transition-all">
                  <span>Wealth Strategy Call (₹1,999)</span><ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <DirectWhatsAppButton variant="compact" serviceName={`Annual VIP Vedic Wealth Advisor (${RASHIS[selectedRashi]})`} price={5100} className="w-full justify-center py-2 text-xs" />
              </div>
            </div>

            <SanctifiedVerdictStickyBar serviceId="deep-kundli" serviceName="Vedic Wealth Calendar Strategy Call" price={1999} badge="📅 Calendar Generated" />
          </motion.div>
        )}
      </div>
    </div>
  );
}
