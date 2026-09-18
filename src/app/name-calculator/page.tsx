"use client";

import React, { useState } from "react";
import { Sparkles, Loader2, Award } from "lucide-react";
import VedicReportRenderer from "@/components/reports/VedicReportRenderer";

const ALL_NAKSHATRAS = [
  "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra",
  "Punarvasu", "Pushya", "Ashlesha", "Magha", "Purva Phalguni", "Uttara Phalguni",
  "Hasta", "Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshtha",
  "Mula", "Purva Ashadha", "Uttara Ashadha", "Shravana", "Dhanishta", "Shatabhisha",
  "Purva Bhadrapada", "Uttara Bhadrapada", "Revati"
];

export default function NameCalculatorPage() {
  const [nameType, setNameType] = useState("Baby Boy (Namkaran)");
  const [candidateName, setCandidateName] = useState("Aarav");
  const [nakshatra, setNakshatra] = useState("Ashwini");
  const [dob, setDob] = useState("2026-08-30");
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!candidateName.trim()) {
      setError("Please enter candidate name.");
      return;
    }

    setIsCalculating(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/name-calc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nameType,
          candidateName: candidateName.trim(),
          nakshatra,
          dob,
        }),
      });

      const data = await res.json();
      if (data.success && data.report) {
        setResult(data.report);
      } else {
        setError(data.error || "Failed to calculate Vedic naming report.");
      }
    } catch {
      setError("An unexpected network error occurred.");
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FBF6EC] text-[#2A1810] pt-24 pb-28 px-4 sm:px-6">
      {/* Ambient glow */}
      <div className="pointer-events-none fixed top-0 right-0 w-[50vw] h-[50vw] max-w-96 max-h-96 bg-[#d4af37]/10 rounded-full blur-[120px]" />
      <div className="pointer-events-none fixed bottom-0 left-0 w-[50vw] h-[50vw] max-w-96 max-h-96 bg-[#72232b]/20 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFDF8] border border-[#B8860B]/30 mb-3">
            <Award className="w-4 h-4 text-[#C25E10]" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#C25E10]">
              Nakshatra Charan &amp; Chaldean Sound Vibrations
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-serif text-[#2A1810] tracking-wide mb-3">
            Vedic Namkaran &amp; Brand Numerology
          </h1>
          <p className="text-[#6B5A48] text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Discover the auspicious starting syllables (*Aksharas*) according to birth Nakshatra Charan, and calculate master numerology scores for babies and business brands.
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleCalculate} className="bg-[#FFFDF8] border border-[#B8860B]/20 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#6B5A48] mb-2">
                Naming Purpose
              </label>
              <select
                value={nameType}
                onChange={(e) => setNameType(e.target.value)}
                className="w-full bg-black/40 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#d4af37]"
              >
                <option value="Baby Boy (Namkaran)" className="bg-[#1a1a1a]">Baby Boy (Namkaran)</option>
                <option value="Baby Girl (Namkaran)" className="bg-[#1a1a1a]">Baby Girl (Namkaran)</option>
                <option value="Business / Company Brand Name" className="bg-[#1a1a1a]">Business / Company Brand Name</option>
                <option value="Personal Name Numerology Change" className="bg-[#1a1a1a]">Personal Name Numerology Change</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#6B5A48] mb-2">
                Candidate / Brand Name
              </label>
              <input
                type="text"
                placeholder="e.g. Aarav, ShubhMarg, Vedant"
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
                className="w-full bg-black/40 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#d4af37]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#6B5A48] mb-2">
                Birth / Inception Nakshatra
              </label>
              <select
                value={nakshatra}
                onChange={(e) => setNakshatra(e.target.value)}
                className="w-full bg-black/40 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#d4af37]"
              >
                {ALL_NAKSHATRAS.map((item) => (
                  <option key={item} value={item} className="bg-[#1a1a1a]">{item}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#6B5A48] mb-2">
                Date of Birth / Foundation
              </label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full bg-black/40 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#d4af37]"
              />
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-500/15 border border-red-500/30 rounded-xl text-xs text-red-300">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isCalculating}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#d4af37] via-[#e5c453] to-[#d4af37] text-black font-extrabold text-sm uppercase tracking-wider shadow-[0_4px_25px_rgba(212,175,55,0.35)] hover:shadow-[0_4px_35px_rgba(212,175,55,0.5)] active:scale-[0.98] disabled:opacity-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {isCalculating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Calculating Nakshatra Pada &amp; Numerology...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Analyze Name Vibrations &amp; Get Auspicious Syllables</span>
              </>
            )}
          </button>
        </form>

        {/* Results Display */}
        {result && (
          <div className="bg-[#140c08] border-2 border-[#d4af37]/70 rounded-3xl p-6 sm:p-10 shadow-2xl animate-fadeIn">
            <div className="flex items-center justify-between pb-4 border-b border-[#d4af37]/40 mb-6">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#d4af37]" />
                <h2 className="text-xl font-bold font-serif text-[#d4af37]">
                  Vedic Namkaran &amp; Numerology Report
                </h2>
              </div>
              <span className="text-xs bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/40 px-3 py-1 rounded-full font-bold">
                {candidateName}
              </span>
            </div>

            <VedicReportRenderer content={result} />
          </div>
        )}
      </div>
    </main>
  );
}
