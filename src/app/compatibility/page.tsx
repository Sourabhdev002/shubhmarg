"use client";

import React, { useState } from "react";
import { Heart, Sparkles, Loader2, AlertCircle } from "lucide-react";
import { NAKSHATRAS, RASHIS, AshtakootBreakdown } from "@/lib/guna-milan";
import AstrologicalGapDiagnosis from "@/components/shared/AstrologicalGapDiagnosis";
import FamilyMarriageMilanCard from "@/components/shared/FamilyMarriageMilanCard";
import VedicReportRenderer from "@/components/reports/VedicReportRenderer";
import VedicCalculationLoader from "@/components/shared/VedicCalculationLoader";

export default function CompatibilityPage() {
  const [partner1Name, setPartner1Name] = useState("");
  const [partner1Rashi, setPartner1Rashi] = useState("0");
  const [partner1Nakshatra, setPartner1Nakshatra] = useState("0");

  const [partner2Name, setPartner2Name] = useState("");
  const [partner2Rashi, setPartner2Rashi] = useState("6");
  const [partner2Nakshatra, setPartner2Nakshatra] = useState("14");

  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<{
    milanBreakdown: AshtakootBreakdown;
    aiNarrative: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!partner1Name.trim() || !partner2Name.trim()) {
      setError("Please enter names for both partners.");
      return;
    }

    setIsCalculating(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/compatibility-calc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          partner1: {
            name: partner1Name.trim(),
            rashiIndex: partner1Rashi,
            nakshatraIndex: partner1Nakshatra,
          },
          partner2: {
            name: partner2Name.trim(),
            rashiIndex: partner2Rashi,
            nakshatraIndex: partner2Nakshatra,
          },
        }),
      });

      const data = await res.json();
      if (data.success) {
        setResult({
          milanBreakdown: data.milanBreakdown,
          aiNarrative: data.aiNarrative,
        });
      } else {
        setError(data.error || "Failed to calculate compatibility.");
      }
    } catch {
      setError("An unexpected network error occurred.");
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FBF6EC] text-[#2A1810] pt-24 pb-28 px-4 sm:px-6">
      {/* Background ambient orbs */}
      <div className="pointer-events-none fixed top-0 right-0 w-[50vw] h-[50vw] max-w-96 max-h-96 bg-[#d4af37]/10 rounded-full blur-[120px]" />
      <div className="pointer-events-none fixed bottom-0 left-0 w-[50vw] h-[50vw] max-w-96 max-h-96 bg-[#72232b]/20 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 mb-3">
            <Heart className="w-4 h-4 text-pink-400 fill-pink-400" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-pink-300">
              Vedic Ashtakoot 36-Guna Milan
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-serif text-[#2A1810] tracking-wide mb-3">
            Kundli Milan &amp; Relationship Compatibility
          </h1>
          <p className="text-[#2E1D14] text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Calculate authentic 36-point Guna Milan scores and receive Pandit Ji&apos;s compassionate Vedic guidance and non-fearful remedies.
          </p>
        </div>

        {/* Dual Input Form */}
        <form onSubmit={handleCalculate} className="bg-[#FFFDF8] border border-[#B8860B]/20 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
            {/* Partner 1 Details */}
            <div className="bg-[#FDFBF7] border border-[#B8860B]/25 rounded-2xl p-5 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#C25E10] mb-4 flex items-center gap-2">
                <span>Partner 1 (Seeker)</span>
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#2E1D14] mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter partner 1's name"
                    value={partner1Name}
                    onChange={(e) => setPartner1Name(e.target.value)}
                    className="w-full bg-[#FFFDF8] border border-[#B8860B]/30 rounded-xl px-3.5 py-2.5 text-sm text-[#2A1810] placeholder-[#8B7E74] focus:outline-none focus:border-[#C25E10] shadow-sm font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2E1D14] mb-1">Moon Sign (Rashi)</label>
                  <select
                    value={partner1Rashi}
                    onChange={(e) => setPartner1Rashi(e.target.value)}
                    className="w-full bg-[#FFFDF8] border border-[#B8860B]/30 rounded-xl px-3.5 py-2.5 text-sm text-[#2A1810] focus:outline-none focus:border-[#C25E10] shadow-sm font-medium"
                  >
                    {RASHIS.map((rashi, idx) => (
                      <option key={rashi} value={idx}>{rashi}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2E1D14] mb-1">Birth Nakshatra</label>
                  <select
                    value={partner1Nakshatra}
                    onChange={(e) => setPartner1Nakshatra(e.target.value)}
                    className="w-full bg-[#FFFDF8] border border-[#B8860B]/30 rounded-xl px-3.5 py-2.5 text-sm text-[#2A1810] focus:outline-none focus:border-[#C25E10] shadow-sm font-medium"
                  >
                    {NAKSHATRAS.map((nak, idx) => (
                      <option key={nak} value={idx}>{idx + 1}. {nak}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Partner 2 Details */}
            <div className="bg-[#FDFBF7] border border-[#B8860B]/25 rounded-2xl p-5 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#9F1239] mb-4 flex items-center gap-2">
                <span>Partner 2</span>
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#2E1D14] mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter partner 2's name"
                    value={partner2Name}
                    onChange={(e) => setPartner2Name(e.target.value)}
                    className="w-full bg-[#FFFDF8] border border-[#B8860B]/30 rounded-xl px-3.5 py-2.5 text-sm text-[#2A1810] placeholder-[#8B7E74] focus:outline-none focus:border-[#C25E10] shadow-sm font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2E1D14] mb-1">Moon Sign (Rashi)</label>
                  <select
                    value={partner2Rashi}
                    onChange={(e) => setPartner2Rashi(e.target.value)}
                    className="w-full bg-[#FFFDF8] border border-[#B8860B]/30 rounded-xl px-3.5 py-2.5 text-sm text-[#2A1810] focus:outline-none focus:border-[#C25E10] shadow-sm font-medium"
                  >
                    {RASHIS.map((rashi, idx) => (
                      <option key={rashi} value={idx}>{rashi}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2E1D14] mb-1">Birth Nakshatra</label>
                  <select
                    value={partner2Nakshatra}
                    onChange={(e) => setPartner2Nakshatra(e.target.value)}
                    className="w-full bg-[#FFFDF8] border border-[#B8860B]/30 rounded-xl px-3.5 py-2.5 text-sm text-[#2A1810] focus:outline-none focus:border-[#C25E10] shadow-sm font-medium"
                  >
                    {NAKSHATRAS.map((nak, idx) => (
                      <option key={nak} value={idx}>{idx + 1}. {nak}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-500/15 border border-red-500/30 rounded-xl text-xs text-red-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="mt-6">
            <button
              type="submit"
              disabled={isCalculating}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-500 via-[#d4af37] to-pink-500 text-black font-extrabold text-sm uppercase tracking-wider shadow-[0_4px_25px_rgba(212,175,55,0.35)] hover:shadow-[0_4px_35px_rgba(212,175,55,0.5)] active:scale-[0.98] disabled:opacity-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {isCalculating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-black" />
                  <span>Calculating 36 Gunas &amp; Consulting Astrological Wisdom...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-black" />
                  <span>Calculate 36-Guna Milan &amp; Guidance</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* ── Sacred Vedic Loading Experience ── */}
        {isCalculating && (
          <VedicCalculationLoader
            title="Ashtakoot 36-Guna Kundli Milan Calculation"
            stages={[
              "Aligning Both Partners' Birth Rashis & Nakshatra Degrees...",
              "Computing 8 Pillars: Nadi, Bhakoot, Gana, Graha Maitri, Yoni, Tara, Vashya, Varna...",
              "Evaluating Manglik Dosha & Navamsha Compatibility Alignments...",
              "Consulting Brihat Parashara Hora Shastra & Auspicious Marriage Timings...",
              "Synthesizing Pandit Ji's Compassionate Non-Fearful Remedies...",
            ]}
            estimatedSeconds={5}
          />
        )}

        {/* Results Section */}
        {result && (
          <div className="space-y-8 animate-fadeIn">
            {/* Scorecard Hero */}
            <div className="bg-gradient-to-br from-[#1c120e] to-[#25100c] border-2 border-[#d4af37]/60 rounded-3xl p-6 sm:p-8 shadow-2xl text-center">
              <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-bold">
                Ashtakoot Guna Milan Result
              </span>

              <div className="my-4 flex items-baseline justify-center gap-2">
                <span className="text-6xl sm:text-7xl font-extrabold font-serif text-[#d4af37]">
                  {result.milanBreakdown.totalScore}
                </span>
                <span className="text-2xl sm:text-3xl text-amber-200/60 font-serif">/ 36</span>
              </div>

              <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm font-bold text-white mb-2">
                Verdict: <span className="text-[#d4af37]">{result.milanBreakdown.compatibilityVerdict}</span>
              </div>

              <p className="text-xs text-[#EAE3D2] font-medium max-w-md mx-auto">
                (A score of 18 or above is traditionally auspicious for marital harmony and mutual growth)
              </p>
            </div>

            {/* Ashtakoot 8-Category Breakdown Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              {[
                { title: "Varna", score: result.milanBreakdown.varna.obtained, max: 1, desc: result.milanBreakdown.varna.description },
                { title: "Vashya", score: result.milanBreakdown.vashya.obtained, max: 2, desc: result.milanBreakdown.vashya.description },
                { title: "Tara", score: result.milanBreakdown.tara.obtained, max: 3, desc: result.milanBreakdown.tara.description },
                { title: "Yoni", score: result.milanBreakdown.yoni.obtained, max: 4, desc: result.milanBreakdown.yoni.description },
                { title: "Graha Maitri", score: result.milanBreakdown.grahaMaitri.obtained, max: 5, desc: result.milanBreakdown.grahaMaitri.description },
                { title: "Gana", score: result.milanBreakdown.gana.obtained, max: 6, desc: result.milanBreakdown.gana.description },
                { title: "Bhakoot", score: result.milanBreakdown.bhakoot.obtained, max: 7, desc: result.milanBreakdown.bhakoot.description },
                { title: "Nadi", score: result.milanBreakdown.nadi.obtained, max: 8, desc: result.milanBreakdown.nadi.description },
              ].map((item) => (
                <div key={item.title} className="bg-[#FFFDF8] border border-[#B8860B]/20 rounded-2xl p-4 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] text-[#2E1D14] uppercase tracking-widest font-bold block">{item.title}</span>
                    <span className="text-xl font-bold text-[#C25E10] font-serif my-1 block">
                      {item.score} <span className="text-xs text-[#2E1D14] font-sans font-medium">/ {item.max}</span>
                    </span>
                  </div>
                  <p className="text-[10px] text-[#2E1D14] leading-tight mt-1 font-medium">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Pandit Ji's AI Relationship Narrative */}
            <div className="bg-[#140e0b] border-2 border-[#d4af37]/60 rounded-3xl p-6 sm:p-10 shadow-2xl">
              <div className="flex items-center gap-2 pb-4 border-b border-[#d4af37]/30 mb-6">
                <Sparkles className="w-5 h-5 text-[#d4af37]" />
                <h2 className="text-xl font-bold font-serif !text-[#d4af37]" style={{ color: "#d4af37" }}>
                  Pandit Ji&apos;s Compatibility &amp; Remedial Narrative
                </h2>
              </div>

              <VedicReportRenderer content={result.aiNarrative} />

              {/* Astrological Gap Bridge to Paid Guidance */}
              <AstrologicalGapDiagnosis
                toolName="Ashtakoot Kundli Milan (36-Guna)"
                planetaryAlertTitle="Nadi & Bhakoot Planetary Dosha Analysis Required"
                planetaryAlertDesc="While numerical Guna scores provide baseline compatibility, long-term marital longevity is governed by planetary house placements (Mangal Drishti, 7th & 8th House Dasha). Pandit Ji analyzes both birth charts together for customized remedial synchronization."
                recommendedServiceId="marriage"
                recommendedServiceName="Comprehensive Marriage & Relationship Kundli Guidance"
                price={1501}
              />

              {/* Family & In-Laws Dignified WhatsApp Summary Card */}
              <FamilyMarriageMilanCard
                partner1Name={partner1Name || "Var (Groom)"}
                partner2Name={partner2Name || "Vadhu (Bride)"}
                totalScore={result.milanBreakdown.totalScore}
                verdict={result.milanBreakdown.compatibilityVerdict}
                nadiScore={result.milanBreakdown.nadi.obtained}
                bhakootScore={result.milanBreakdown.bhakoot.obtained}
                ganaScore={result.milanBreakdown.gana.obtained}
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}