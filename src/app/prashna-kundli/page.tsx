"use client";

import React, { useState } from "react";
import { Sparkles, Loader2, HelpCircle, Dices } from "lucide-react";
import VedicReportRenderer from "@/components/reports/VedicReportRenderer";
import SealedGotraDestinyEnvelope from "@/components/shared/SealedGotraDestinyEnvelope";
import InstantPrashnaDiya from "@/components/shared/InstantPrashnaDiya";
import SanctifiedVerdictStickyBar from "@/components/shared/SanctifiedVerdictStickyBar";
import VedicCalculationLoader from "@/components/shared/VedicCalculationLoader";

export default function PrashnaKundliPage() {
  const [name, setName] = useState("");
  const [question, setQuestion] = useState("");
  const [city, setCity] = useState("Mumbai");
  const [prashnaNumber, setPrashnaNumber] = useState(108);
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleRandomNumber = () => {
    const rand = Math.floor(Math.random() * 249) + 1;
    setPrashnaNumber(rand);
  };

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) {
      setError("Please enter your specific question.");
      return;
    }

    setIsCalculating(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/prashna-calc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim() || "Seeker",
          question: question.trim(),
          city: city.trim() || "India",
          prashnaNumber,
        }),
      });

      const data = await res.json();
      if (data.success && data.reading) {
        setResult(data.reading);
      } else {
        setError(data.error || "Failed to cast Prashna Kundli. Please try again.");
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
            <HelpCircle className="w-4 h-4 text-[#C25E10]" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#C25E10]">
              Classical Prashna Shastra (No Birth Time Needed)
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-serif text-[#2A1810] tracking-wide mb-3">
            Prashna Kundli (Instant Horary Question Chart)
          </h1>
          <p className="text-[#2E1D14] text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Don&apos;t know your exact birth date or time? Ask your immediate question and pick a sacred seed number (1–249) to cast an instant Vedic Horary chart.
          </p>
        </div>

        {/* Form Card */}
        <form onSubmit={handleCalculate} className="bg-[#FFFDF8] border border-[#B8860B]/20 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#2E1D14] mb-2">
                Your Name
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
                Your Current City
              </label>
              <input
                type="text"
                placeholder="e.g. Delhi / Mumbai"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-[#FDFBF7] border border-[#B8860B]/30 rounded-xl px-3.5 py-2.5 text-sm text-[#2A1810] placeholder-[#8B7E74] focus:outline-none focus:border-[#C25E10] shadow-sm font-medium"
              />
            </div>
          </div>

          {/* Question Field */}
          <div className="mb-5">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#2E1D14] mb-2">
              Your Specific Burning Question
            </label>
            <textarea
              required
              rows={3}
              placeholder="e.g. Will my business partnership succeed? When will my career shift happen? Will I be able to purchase my home this year?"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full bg-[#FDFBF7] border border-[#B8860B]/30 rounded-2xl p-4 text-sm text-[#2A1810] placeholder-[#8B7E74] focus:outline-none focus:border-[#C25E10] shadow-sm font-medium"
            />
          </div>

          {/* Seed Number Selector */}
          <div className="bg-[#FDFBF7] border border-[#B8860B]/25 rounded-2xl p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#8B2500]">
                Sacred Prashna Seed Number: <span className="text-[#2A1810] text-base font-extrabold">#{prashnaNumber}</span> (1 to 249)
              </label>
              <button
                type="button"
                onClick={handleRandomNumber}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FDF3E2] hover:bg-[#FBE9CE] border border-[#B8860B]/30 rounded-xl text-xs font-bold text-[#2E1D14] transition-all cursor-pointer shadow-sm"
              >
                <Dices className="w-3.5 h-3.5 text-[#C25E10]" />
                <span>Pick Random Seed</span>
              </button>
            </div>

            <input
              type="range"
              min={1}
              max={249}
              value={prashnaNumber}
              onChange={(e) => setPrashnaNumber(parseInt(e.target.value, 10))}
              className="w-full accent-[#C25E10] cursor-pointer"
            />
            <p className="text-[11px] text-[#2E1D14] font-medium mt-1">
              Select any number between 1 and 249 that intuitively comes to your mind.
            </p>
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
                <span>Casting Prashna Kundli &amp; Planetary Ephemeris...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Cast Prashna Kundli &amp; Get Direct Verdict</span>
              </>
            )}
          </button>
        </form>

        {/* ── Sacred Prashna Calculation Loading Experience ── */}
        {isCalculating && (
          <VedicCalculationLoader
            title={`Casting Horary Chart for Seed #${prashnaNumber}`}
            stages={[
              `Casting Ephemeris Chart for Prashna Seed #${prashnaNumber}...`,
              "Calculating Planetary Hora, Ascendant Degree & Moon Sub-Lord...",
              "Analyzing Ithasala & Nakshatra Transit Combinations (Krishnamurti Padhdhati)...",
              "Evaluating Auspicious Timing Window & Clear Horary Verdict...",
              "Synthesizing Pandit Ji's Direct Prashna Advice & Shanti Mantra...",
            ]}
            estimatedSeconds={5}
          />
        )}

        {/* Results */}
        {result && (
          <div className="bg-[#140c08] border-2 border-[#d4af37]/70 rounded-3xl p-6 sm:p-10 shadow-2xl animate-fadeIn">
            <div className="flex items-center justify-between pb-4 border-b border-[#d4af37]/40 mb-6">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#d4af37]" />
                <h2 className="text-xl font-bold font-serif !text-[#d4af37]" style={{ color: "#d4af37" }}>
                  Prashna Horary Astrological Assessment
                </h2>
              </div>
              <span className="text-xs bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/40 px-3 py-1 rounded-full font-bold">
                Seed: #{prashnaNumber}
              </span>
            </div>

            <VedicReportRenderer content={result} />

            {/* Sealed Gotra Destiny Envelope */}
            <SealedGotraDestinyEnvelope
              seekerName={name.trim() || "Seeker"}
              toolName="Prashna Horary Astrology (Seed #{prashnaNumber})"
              serviceId="tatkal-express"
              serviceName="2-Hour Tatkal Express Guidance"
              price={2499}
              highlightWarning="This specific Prashna seed reveals a critical turning point that requires immediate decisive action in your current planetary Hora."
            />

            {/* Instant 1-Question Diya Dispatch */}
            <InstantPrashnaDiya toolName="Prashna Horary Engine" />
          </div>
        )}

        {/* Floating Consecration Bar */}
        {result && (
          <SanctifiedVerdictStickyBar
            serviceId="tatkal-express"
            serviceName="2-Hour Tatkal Express Guidance"
            price={2499}
            badge="Live 2-Hour Tatkal Queue Open"
          />
        )}
      </div>
    </main>
  );
}
