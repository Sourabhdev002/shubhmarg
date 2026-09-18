"use client";

import React, { useState } from "react";
import { Sparkles, Loader2, Trees } from "lucide-react";
import VedicReportRenderer from "@/components/reports/VedicReportRenderer";
import DestinyCrisisRadar from "@/components/shared/DestinyCrisisRadar";
import SanctifiedVerdictStickyBar from "@/components/shared/SanctifiedVerdictStickyBar";

export default function KarmicDebtPage() {
  const [name, setName] = useState("");
  const [recurringHurdle, setRecurringHurdle] = useState("Sudden Financial Outflow & Stagnant Savings");
  const [gotra, setGotra] = useState("");
  const [generationPattern, setGenerationPattern] = useState("Seen Across Past 2 Generations");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/karmic-debt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim() || "Seeker",
          recurringHurdle,
          gotra: gotra.trim() || "Kashyap",
          generationPattern,
        }),
      });

      const data = await res.json();
      if (data.success && data.report) {
        setResult(data.report);
      } else {
        setError(data.error || "Failed to analyze karmic debt.");
      }
    } catch {
      setError("An unexpected network error occurred.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FBF6EC] text-[#2A1810] pt-24 pb-28 px-4 sm:px-6">
      {/* Deep ancestral amber background glow */}
      <div className="pointer-events-none fixed top-0 right-0 w-[50vw] h-[50vw] max-w-96 max-h-96 bg-[#d4af37]/10 rounded-full blur-[130px]" />
      <div className="pointer-events-none fixed bottom-0 left-0 w-[50vw] h-[50vw] max-w-96 max-h-96 bg-[#72232b]/20 rounded-full blur-[130px]" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFDF8] border border-[#B8860B]/30 mb-3">
            <Trees className="w-4 h-4 text-[#C25E10]" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#C25E10]">
              Classical Rinanubandhana &amp; Pitru Shastra
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-serif text-[#2A1810] tracking-wide mb-3">
            Ancestral Karmic Debt Diagnostic
          </h1>
          <p className="text-[#6B5A48] text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Uncover the root of recurring generational hurdles linked to the 4 primordial Vedic debts (*Pitru, Deva, Rishi, and Manushya Rina*) and receive liberating sattvic remedies.
          </p>
        </div>

        {/* Form Card */}
        <form onSubmit={handleAnalyze} className="bg-[#FFFDF8] border border-[#B8860B]/20 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#6B5A48] mb-2">
                Seeker Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-black/40 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#6B5A48] mb-2">
                Family Gotra / Clan (If Known)
              </label>
              <input
                type="text"
                placeholder="e.g. Kashyap, Bharadwaj, Vashistha"
                value={gotra}
                onChange={(e) => setGotra(e.target.value)}
                className="w-full bg-black/40 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#d4af37]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#6B5A48] mb-2">
                Primary Recurring Life Pattern
              </label>
              <select
                value={recurringHurdle}
                onChange={(e) => setRecurringHurdle(e.target.value)}
                className="w-full bg-black/40 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#d4af37]"
              >
                <option value="Sudden Financial Outflow & Stagnant Savings" className="bg-[#1a1a1a]">Sudden Financial Outflow &amp; Wealth Leakage</option>
                <option value="Unexplained Delays in Marriage & Relationship Strife" className="bg-[#1a1a1a]">Unexplained Delays in Marriage &amp; Strife</option>
                <option value="Progeny Delays & Lineage Obstacles" className="bg-[#1a1a1a]">Progeny Delays &amp; Lineage Continuity</option>
                <option value="Chronic Fatigue, Heavy Mind & Restlessness" className="bg-[#1a1a1a]">Chronic Fatigue &amp; Heavy Mental Energy</option>
                <option value="Generational Land / Property Disputes" className="bg-[#1a1a1a]">Generational Land &amp; Property Disputes</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#6B5A48] mb-2">
                Generational Occurrence
              </label>
              <select
                value={generationPattern}
                onChange={(e) => setGenerationPattern(e.target.value)}
                className="w-full bg-black/40 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#d4af37]"
              >
                <option value="First Time Encountered by Me" className="bg-[#1a1a1a]">First Time Encountered by Me</option>
                <option value="Seen Across Past 2 Generations (Parents & Grandparents)" className="bg-[#1a1a1a]">Seen Across Past 2 Generations</option>
                <option value="Known Ancestral Lineage Pattern" className="bg-[#1a1a1a]">Known Ancestral Lineage Pattern</option>
              </select>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-500/15 border border-red-500/30 rounded-xl text-xs text-red-300">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isAnalyzing}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#d4af37] via-[#e5c453] to-[#d4af37] text-black font-extrabold text-sm uppercase tracking-wider shadow-[0_4px_25px_rgba(212,175,55,0.35)] hover:brightness-110 active:scale-[0.98] disabled:opacity-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Diagnosing Rina Debts &amp; Parashara Signatures...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Analyze Karmic Lineage &amp; Reveal Sattvic Upayas</span>
              </>
            )}
          </button>
        </form>

        {/* Results */}
        {result && (
          <div className="bg-[#140c08] border-2 border-[#d4af37]/70 rounded-3xl p-6 sm:p-10 shadow-2xl animate-fadeIn">
            <div className="flex items-center justify-between pb-4 border-b border-[#d4af37]/40 mb-6">
              <div className="flex items-center gap-2">
                <Trees className="w-5 h-5 text-[#d4af37]" />
                <h2 className="text-xl font-bold font-serif text-[#d4af37]">
                  Rinanubandhana Karmic Diagnostic Assessment
                </h2>
              </div>
              <span className="text-xs bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/40 px-3 py-1 rounded-full font-bold">
                Lineage Harmonized
              </span>
            </div>

            <VedicReportRenderer content={result} />

            {/* High-Emotional Resonance Destiny Crisis Radar */}
            <DestinyCrisisRadar
              category="Ancestral Lineage & Pitru Rina Neutralization"
              frictionScore={89}
              frictionTitle="High Generational Resistance Flagged in gotra Lineage"
              planetaryCause="Recurring hurdles across generations (Pitru Rina / Deva Rina) originate from unresolved karmic imbalances that manifest as unexplainable delays in wealth accumulation and family harmony."
              emotionalStakes="Vedic scriptures (Garuda Purana) state that ancestral debts never resolve automatically by time — they compound until acknowledged and neutralized through consecrated Gotra Sankalp."
              remedyAction="Perform Remote Kashi Vishwanath / Gaya Gotra Tarpan & Sankalp Puja"
              serviceId="temple-puja"
              serviceName="Remote Temple Sankalp Puja & Prasad Delivery"
              price={2100}
            />
          </div>
        )}

        {/* Sticky Consecration Bar */}
        {result && (
          <SanctifiedVerdictStickyBar
            serviceId="temple-puja"
            serviceName="Remote Temple Sankalp Puja"
            price={2100}
            badge="Live Pitru Shanti Window Open"
          />
        )}
      </div>
    </main>
  );
}
