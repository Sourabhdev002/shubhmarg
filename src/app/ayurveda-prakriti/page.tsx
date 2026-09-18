"use client";

import React, { useState } from "react";
import { Sparkles, Loader2, Leaf, Wind, Flame, Droplets } from "lucide-react";
import VedicReportRenderer from "@/components/reports/VedicReportRenderer";

export default function AyurvedaPrakritiPage() {
  const [name, setName] = useState("");
  const [bodyFrame, setBodyFrame] = useState("Lean / Slender / Fast Movement");
  const [digestionType, setDigestionType] = useState("Irregular & Variable Appetite (Vishamagni)");
  const [sleepPattern, setSleepPattern] = useState("Light, Restless & Easily Disturbed");
  const [stressReaction, setStressReaction] = useState("Anxiety, Nervous Energy & Worry");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/ayurveda-prakriti", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim() || "Seeker",
          bodyFrame,
          digestionType,
          sleepPattern,
          stressReaction,
        }),
      });

      const data = await res.json();
      if (data.success && data.report) {
        setResult(data.report);
      } else {
        setError(data.error || "Failed to analyze Ayurvedic constitution.");
      }
    } catch {
      setError("An unexpected network error occurred.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FBF6EC] text-[#2A1810] pt-24 pb-28 px-4 sm:px-6">
      {/* Deep herbal emerald background glow */}
      <div className="pointer-events-none fixed top-0 right-0 w-[50vw] h-[50vw] max-w-96 max-h-96 bg-emerald-600/15 rounded-full blur-[130px]" />
      <div className="pointer-events-none fixed bottom-0 left-0 w-[50vw] h-[50vw] max-w-96 max-h-96 bg-[#d4af37]/15 rounded-full blur-[130px]" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 mb-3">
            <Leaf className="w-4 h-4 text-emerald-400" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-300">
              Charaka Samhita Tridosha &amp; Astro-Ayurveda
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-serif text-[#2A1810] tracking-wide mb-3">
            Ayurvedic Prakriti &amp; Doshic Pulse Analyzer
          </h1>
          <p className="text-[#2E1D14] text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Discover your unique bio-elemental constitution (*Vata, Pitta, Kapha*), uncover current metabolic imbalances, and receive personalized dietary &amp; herbal remedies.
          </p>
        </div>

        {/* ── 3 Dosha Concept Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-cyan-950/30 border border-cyan-500/40 rounded-2xl p-4 text-center">
            <Wind className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-cyan-300 font-serif">वात (Vata)</h4>
            <p className="text-[11px] text-[#EAE3D2] font-medium mt-1">Air &amp; Ether • Governs movement, nervous system, and creativity.</p>
          </div>
          <div className="bg-amber-950/30 border border-amber-500/40 rounded-2xl p-4 text-center">
            <Flame className="w-6 h-6 text-amber-400 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-amber-300 font-serif">पित्त (Pitta)</h4>
            <p className="text-[11px] text-[#EAE3D2] font-medium mt-1">Fire &amp; Water • Governs digestion, intellect, and transformation.</p>
          </div>
          <div className="bg-emerald-950/30 border border-emerald-500/40 rounded-2xl p-4 text-center">
            <Droplets className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-emerald-300 font-serif">कफ (Kapha)</h4>
            <p className="text-[11px] text-[#EAE3D2] font-medium mt-1">Earth &amp; Water • Governs physical stability, stamina, and lubrication.</p>
          </div>
        </div>

        {/* Form Card */}
        <form onSubmit={handleAnalyze} className="bg-[#FFFDF8] border border-[#B8860B]/20 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#2A1810] mb-2">
                Seeker Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#FDFBF7] border border-[#B8860B]/30 rounded-xl px-3.5 py-2.5 text-sm text-[#2A1810] placeholder-[#8B7E74] focus:outline-none focus:border-emerald-600 shadow-sm font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#2A1810] mb-2">
                Physical Body Frame
              </label>
              <select
                value={bodyFrame}
                onChange={(e) => setBodyFrame(e.target.value)}
                className="w-full bg-[#FDFBF7] border border-[#B8860B]/30 rounded-xl px-3.5 py-2.5 text-sm text-[#2A1810] focus:outline-none focus:border-emerald-600 shadow-sm font-medium"
              >
                <option value="Lean / Slender / Fast Movement">Lean / Slender Frame, Light Bones (Vata)</option>
                <option value="Medium / Muscular / Sharp Features">Medium / Athletic Frame, Sharp Features (Pitta)</option>
                <option value="Broad / Sturdy / Heavy Build">Broad / Sturdy Frame, Solid Bones (Kapha)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#2A1810] mb-2">
                Digestive Fire (Agni)
              </label>
              <select
                value={digestionType}
                onChange={(e) => setDigestionType(e.target.value)}
                className="w-full bg-[#FDFBF7] border border-[#B8860B]/30 rounded-xl px-3.5 py-2.5 text-sm text-[#2A1810] focus:outline-none focus:border-emerald-600 shadow-sm font-medium"
              >
                <option value="Irregular & Variable Appetite (Vishamagni)">Irregular &amp; Gas Prone (Vata)</option>
                <option value="Strong & Intense Hunger / Acidic (Tikshnagni)">Intense Hunger / Quick Digestion (Pitta)</option>
                <option value="Slow & Heavy Digestion (Mandagni)">Slow &amp; Sluggish Digestion (Kapha)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#2A1810] mb-2">
                Sleep Quality
              </label>
              <select
                value={sleepPattern}
                onChange={(e) => setSleepPattern(e.target.value)}
                className="w-full bg-[#FDFBF7] border border-[#B8860B]/30 rounded-xl px-3.5 py-2.5 text-sm text-[#2A1810] focus:outline-none focus:border-emerald-600 shadow-sm font-medium"
              >
                <option value="Light, Restless & Easily Disturbed">Light, Restless Sleep (Vata)</option>
                <option value="Moderate Sleep, Wakes Up Alert">Moderate, Vivid Dreams (Pitta)</option>
                <option value="Deep, Heavy & Hard to Wake">Deep, Heavy Sleep (Kapha)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#2A1810] mb-2">
                Stress Reaction
              </label>
              <select
                value={stressReaction}
                onChange={(e) => setStressReaction(e.target.value)}
                className="w-full bg-[#FDFBF7] border border-[#B8860B]/30 rounded-xl px-3.5 py-2.5 text-sm text-[#2A1810] focus:outline-none focus:border-emerald-600 shadow-sm font-medium"
              >
                <option value="Anxiety, Nervous Energy & Worry">Anxiety &amp; Worry (Vata)</option>
                <option value="Irritability, Anger & Impatience">Anger &amp; Frustration (Pitta)</option>
                <option value="Withdrawal, Lethargy & Stubbornness">Lethargy &amp; Withdrawal (Kapha)</option>
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
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 text-white font-extrabold text-sm uppercase tracking-wider shadow-[0_4px_25px_rgba(16,185,129,0.35)] hover:brightness-110 active:scale-[0.98] disabled:opacity-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Calculating Tridosha Ratios &amp; Doshic Vikriti...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Analyze My Prakriti &amp; Reveal Planetary Diet</span>
              </>
            )}
          </button>
        </form>

        {/* Results */}
        {result && (
          <div className="bg-[#0b120c] border-2 border-emerald-500/50 rounded-3xl p-6 sm:p-10 shadow-2xl animate-fadeIn">
            <div className="flex items-center justify-between pb-4 border-b border-emerald-500/30 mb-6">
              <div className="flex items-center gap-2">
                <Leaf className="w-5 h-5 text-emerald-400" />
                <h2 className="text-xl font-bold font-serif !text-emerald-300" style={{ color: "#6ee7b7" }}>
                  Ayurvedic Prakriti &amp; Astro-Diet Assessment
                </h2>
              </div>
              <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-3 py-1 rounded-full font-bold">
                Tridosha Harmonized
              </span>
            </div>

            <VedicReportRenderer content={result} />
          </div>
        )}
      </div>
    </main>
  );
}
