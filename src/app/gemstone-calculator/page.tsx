"use client";

import React, { useState } from "react";
import { Sparkles, Loader2, ShieldCheck, AlertTriangle, Gem } from "lucide-react";
import { LAGNA_GEMSTONES, GemstoneRecommendation } from "@/lib/gemstones";
import VedicReportRenderer from "@/components/reports/VedicReportRenderer";
import GemstonePranaPratishthaRitual from "@/components/shared/GemstonePranaPratishthaRitual";
import VedicCalculationLoader from "@/components/shared/VedicCalculationLoader";

const ALL_LAGNAS = Object.keys(LAGNA_GEMSTONES);

export default function GemstoneCalculatorPage() {
  const [name, setName] = useState("");
  const [lagna, setLagna] = useState(ALL_LAGNAS[0]);
  const [concern, setConcern] = useState("Career Growth & Wealth");
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<{
    recommendation: GemstoneRecommendation;
    aiGuidance: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculating(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/gemstone-calc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim() || "Seeker",
          lagna,
          currentConcern: concern,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setResult({
          recommendation: data.recommendation,
          aiGuidance: data.aiGuidance,
        });
      } else {
        setError(data.error || "Failed to calculate gemstone recommendations.");
      }
    } catch {
      setError("An unexpected network error occurred.");
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FBF6EC] text-[#2A1810] pt-24 pb-28 px-4 sm:px-6">
      {/* Ambient background glow */}
      <div className="pointer-events-none fixed top-0 right-0 w-[50vw] h-[50vw] max-w-96 max-h-96 bg-[#d4af37]/10 rounded-full blur-[120px]" />
      <div className="pointer-events-none fixed bottom-0 left-0 w-[50vw] h-[50vw] max-w-96 max-h-96 bg-[#72232b]/20 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFDF8] border border-[#B8860B]/30 mb-3">
            <Gem className="w-4 h-4 text-[#C25E10]" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#C25E10]">
              Classical Vedic Ratna &amp; Rudraksha Vidya
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-serif text-[#2A1810] tracking-wide mb-3">
            Gemstone &amp; Rudraksha Recommendation Engine
          </h1>
          <p className="text-[#2E1D14] text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Calculate your auspicious Yoga-Karaka life gemstone, avoid harmful Maraka stones, and discover the exact Rudraksha Mukhi tailored to your Lagna.
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleCalculate} className="bg-[#FFFDF8] border border-[#B8860B]/20 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#2E1D14] mb-2">
                Seeker Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#FDFBF7] border border-[#B8860B]/30 rounded-xl px-3.5 py-2.5 text-sm text-[#2A1810] placeholder-[#8B7E74] focus:outline-none focus:border-[#C25E10] shadow-sm font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#2E1D14] mb-2">
                Ascendant Sign (Lagna)
              </label>
              <select
                value={lagna}
                onChange={(e) => setLagna(e.target.value)}
                className="w-full bg-[#FDFBF7] border border-[#B8860B]/30 rounded-xl px-3.5 py-2.5 text-sm text-[#2A1810] font-medium focus:outline-none focus:border-[#C25E10] shadow-sm"
              >
                {ALL_LAGNAS.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#2E1D14] mb-2">
                Primary Goal
              </label>
              <select
                value={concern}
                onChange={(e) => setConcern(e.target.value)}
                className="w-full bg-[#FDFBF7] border border-[#B8860B]/30 rounded-xl px-3.5 py-2.5 text-sm text-[#2A1810] font-medium focus:outline-none focus:border-[#C25E10] shadow-sm"
              >
                <option value="Career Growth & Wealth">Career Growth &amp; Wealth</option>
                <option value="Health & Longevity">Health &amp; Vitality</option>
                <option value="Marriage & Relationship Peace">Marriage &amp; Harmony</option>
                <option value="Spiritual & Mental Peace">Mental Peace &amp; Spiritual Growth</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={isCalculating}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#d4af37] via-[#e5c453] to-[#d4af37] text-black font-extrabold text-sm uppercase tracking-wider shadow-[0_4px_25px_rgba(212,175,55,0.35)] hover:shadow-[0_4px_35px_rgba(212,175,55,0.5)] active:scale-[0.98] disabled:opacity-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {isCalculating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Calculating Planetary Strengths &amp; Gemstones...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Calculate My Lucky Gemstones &amp; Rudraksha</span>
              </>
            )}
          </button>
        </form>

        {/* ── Sacred Gemstone Calculation Loading Experience ── */}
        {isCalculating && (
          <VedicCalculationLoader
            title="Vedic Ratna Vidya Planetary Calculation"
            stages={[
              "Analyzing Ascendant (Lagna) & 9th House Bhagya Lord...",
              "Determining Life Stone, Lucky Stone & Career Gemstone Frequencies...",
              "Evaluating Inimical Maraka Planets (Strictly Avoid Stones)...",
              "Calculating Auspicious Mukhi Rudraksha Planetary Resonance...",
              "Synthesizing Pandit Ji's Prana Pratishtha Consecration Guide...",
            ]}
            estimatedSeconds={5}
          />
        )}

        {/* Results View */}
        {result && (
          <div className="space-y-8 animate-fadeIn">
            {/* Primary Gemstone Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Lucky Gemstone */}
              <div className="bg-gradient-to-br from-[#1c120a] to-[#2a1708] border-2 border-[#d4af37]/70 rounded-3xl p-6 shadow-2xl flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest text-[#d4af37] mb-2 bg-[#d4af37]/15 px-2.5 py-1 rounded-full border border-[#d4af37]/30">
                    <Sparkles className="w-3 h-3" />
                    <span>Lucky Stone (9th Bhagya)</span>
                  </div>
                  <h3 className="text-xl font-bold font-serif !text-[#FFFDF8] mb-1" style={{ color: "#FFFDF8" }}>
                    {result.recommendation.luckyStone.name}
                  </h3>
                  <p className="text-xs text-[#d4af37] font-semibold mb-3">
                    {result.recommendation.luckyStone.sanskritName} • {result.recommendation.luckyStone.planet}
                  </p>
                  <p className="text-xs text-[#FFFDF8] leading-relaxed">
                    {result.recommendation.luckyStone.benefit}
                  </p>
                </div>
              </div>

              {/* Life Gemstone */}
              <div className="bg-gradient-to-br from-[#180e0c] to-[#22100e] border border-white/20 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-emerald-400 mb-2 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Life Stone (Lagna Lord)</span>
                  </div>
                  <h3 className="text-xl font-bold font-serif !text-[#FFFDF8] mb-1" style={{ color: "#FFFDF8" }}>
                    {result.recommendation.lifeStone.name}
                  </h3>
                  <p className="text-xs text-emerald-300 font-semibold mb-3">
                    {result.recommendation.lifeStone.sanskritName} • {result.recommendation.lifeStone.planet}
                  </p>
                  <p className="text-xs text-[#FFFDF8] leading-relaxed">
                    {result.recommendation.lifeStone.benefit}
                  </p>
                </div>
              </div>

              {/* Career Stone */}
              <div className="bg-gradient-to-br from-[#140b08] to-[#1e100a] border border-white/20 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-amber-400 mb-2 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/30">
                    <Gem className="w-3 h-3" />
                    <span>Career &amp; Growth Stone</span>
                  </div>
                  <h3 className="text-xl font-bold font-serif !text-[#FFFDF8] mb-1" style={{ color: "#FFFDF8" }}>
                    {result.recommendation.careerStone.name}
                  </h3>
                  <p className="text-xs text-amber-300 font-semibold mb-3">
                    {result.recommendation.careerStone.sanskritName} • {result.recommendation.careerStone.planet}
                  </p>
                  <p className="text-xs text-[#FFFDF8] leading-relaxed">
                    {result.recommendation.careerStone.benefit}
                  </p>
                </div>
              </div>
            </div>

            {/* Crucial Wearing Details & Avoid List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Wearing Ritual */}
              <div className="bg-[#FFFDF8] border border-[#B8860B]/20 rounded-3xl p-6">
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#C25E10] mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  <span>Consecration (Prana Pratishtha) Protocol</span>
                </h4>
                <ul className="space-y-2.5 text-xs text-[#2E1D14] font-medium">
                  <li><strong>Auspicious Metal:</strong> {result.recommendation.metal}</li>
                  <li><strong>Correct Finger:</strong> {result.recommendation.finger}</li>
                  <li><strong>Energization Day:</strong> {result.recommendation.pranaPratishthaDay}</li>
                  <li><strong>Rudraksha Pairing:</strong> {result.recommendation.recommendedRudraksha.mukhi} ({result.recommendation.recommendedRudraksha.deity})</li>
                </ul>
              </div>

              {/* Strictly Avoid Warning */}
              <div className="bg-red-950/20 border border-red-500/30 rounded-3xl p-6">
                <h4 className="text-sm font-bold uppercase tracking-wider text-red-400 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                  <span>Stones to Strictly Avoid (Maraka Grahas)</span>
                </h4>
                <p className="text-xs text-[#FFFDF8] leading-relaxed mb-3">
                  Wearing stones for dusthana or enemy lords can cause health turbulence or financial friction:
                </p>
                <div className="flex flex-wrap gap-2">
                  {result.recommendation.strictlyAvoid.map((stone) => (
                    <span key={stone} className="px-3 py-1 bg-red-500/20 border border-red-500/40 text-red-300 rounded-full text-xs font-bold">
                      ✕ {stone}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Pandit Ji's Detailed Guidance */}
            <div className="bg-[#140c08] border-2 border-[#d4af37]/70 rounded-3xl p-6 sm:p-10 shadow-2xl">
              <div className="flex items-center gap-2 pb-4 border-b border-[#d4af37]/40 mb-6">
                <Sparkles className="w-5 h-5 text-[#d4af37]" />
                <h2 className="text-xl font-bold font-serif !text-[#d4af37]" style={{ color: "#d4af37" }}>
                  Pandit Ji&apos;s Ratna Vidya Guidance
                </h2>
              </div>
              <VedicReportRenderer content={result.aiGuidance} />

              {/* Interactive Hold-to-Energize Prana Pratishtha Ritual */}
              <GemstonePranaPratishthaRitual
                gemstoneName={result.recommendation.luckyStone.name}
                sanskritName={result.recommendation.luckyStone.sanskritName}
                planet={result.recommendation.luckyStone.planet}
                metal={result.recommendation.metal}
                finger={result.recommendation.finger}
                price="₹5,500+"
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
