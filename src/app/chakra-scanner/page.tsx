"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, Loader2, Zap } from "lucide-react";
import VedicReportRenderer from "@/components/reports/VedicReportRenderer";
import SanctifiedVerdictStickyBar from "@/components/shared/SanctifiedVerdictStickyBar";
import SealedGotraDestinyEnvelope from "@/components/shared/SealedGotraDestinyEnvelope";
import InstantPrashnaDiya from "@/components/shared/InstantPrashnaDiya";

const CHAKRAS_LIST = [
  { name: "Sahasrara (Crown)", location: "Crown of Head", beej: "ॐ (AUM)", color: "border-purple-500 text-purple-400 bg-purple-500/10", element: "Pure Consciousness" },
  { name: "Ajna (Third Eye)", location: "Between Eyebrows", beej: "ॐ (OM)", color: "border-indigo-500 text-indigo-400 bg-indigo-500/10", element: "Intuition & Light" },
  { name: "Vishuddha (Throat)", location: "Throat Center", beej: "हं (HAM)", color: "border-cyan-500 text-cyan-400 bg-cyan-500/10", element: "Ether / Space" },
  { name: "Anahata (Heart)", location: "Center of Chest", beej: "यं (YAM)", color: "border-emerald-500 text-emerald-400 bg-emerald-500/10", element: "Air & Compassion" },
  { name: "Manipura (Solar)", location: "Navel Center", beej: "रं (RAM)", color: "border-amber-500 text-amber-400 bg-amber-500/10", element: "Fire & Willpower" },
  { name: "Swadhisthana (Sacral)", location: "Lower Abdomen", beej: "वं (VAM)", color: "border-orange-500 text-orange-400 bg-orange-500/10", element: "Water & Flow" },
  { name: "Muladhara (Root)", location: "Base of Spine", beej: "लं (LAM)", color: "border-red-500 text-red-400 bg-red-500/10", element: "Earth & Grounding" },
];

export default function ChakraScannerPage() {
  const [name, setName] = useState("");
  const [physicalSymptom, setPhysicalSymptom] = useState("Chronic Fatigue & Sluggish Energy");
  const [emotionalState, setEmotionalState] = useState("Restlessness, Anxiety & Overthinking");
  const [primaryBlock, setPrimaryBlock] = useState("Career Decisions & Financial Confidence");
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsScanning(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/chakra-scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim() || "Seeker",
          physicalSymptom,
          emotionalState,
          primaryBlock,
        }),
      });

      const data = await res.json();
      if (data.success && data.report) {
        setResult(data.report);
      } else {
        setError(data.error || "Failed to complete Chakra scan.");
      }
    } catch {
      setError("An unexpected network error occurred.");
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FBF6EC] text-[#2A1810] pt-24 pb-28 px-4 sm:px-6">
      {/* Subtle iridescent aura ambient glow */}
      <div className="pointer-events-none fixed top-0 right-0 w-[50vw] h-[50vw] max-w-96 max-h-96 bg-purple-600/15 rounded-full blur-[130px]" />
      <div className="pointer-events-none fixed bottom-0 left-0 w-[50vw] h-[50vw] max-w-96 max-h-96 bg-red-600/15 rounded-full blur-[130px]" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 mb-3">
            <Zap className="w-4 h-4 text-purple-400" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-purple-300">
              Classical Shat-Chakra &amp; Pranic Bio-Energy
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-serif text-[#2A1810] tracking-wide mb-3">
            7-Chakra &amp; Kundalini Aura Scanner
          </h1>
          <p className="text-[#6B5A48] text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Diagnose energetic blockages in your 7 subtle energy vortexes and receive exact Beej Mantra frequencies, pranayama mudras, and planetary alignments.
          </p>
        </div>

        {/* ── Visual 7-Chakra Interactive Alignment Strip ── */}
        <div className="bg-black/50 border border-white/10 rounded-3xl p-5 mb-8 overflow-x-auto">
          <div className="flex items-center justify-between min-w-[650px] gap-2">
            {CHAKRAS_LIST.map((chakra, idx) => (
              <div
                key={chakra.name}
                className={`flex-1 text-center p-3 rounded-2xl border ${chakra.color} transition-all hover:scale-105`}
              >
                <div className="text-[10px] font-mono uppercase tracking-widest opacity-80 mb-1">
                  #{7 - idx}
                </div>
                <div className="text-xs font-bold">{chakra.name.split(" ")[0]}</div>
                <div className="text-base font-serif font-bold text-white mt-0.5">{chakra.beej}</div>
                <div className="text-[9px] opacity-70 mt-1">{chakra.element}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleScan} className="bg-[#FFFDF8] border border-[#B8860B]/20 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl mb-10">
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
                className="w-full bg-black/40 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-purple-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#2A1810] mb-2">
                Primary Physical Sensation
              </label>
              <select
                value={physicalSymptom}
                onChange={(e) => setPhysicalSymptom(e.target.value)}
                className="w-full bg-black/40 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-purple-400"
              >
                <option value="Chronic Fatigue & Sluggish Energy" className="bg-[#1a1a1a]">Chronic Fatigue &amp; Low Stamina (Muladhara/Root)</option>
                <option value="Digestive Sluggishness & Acid Fire" className="bg-[#1a1a1a]">Digestive Heaviness / Low Jatharagni (Manipura/Solar)</option>
                <option value="Throat Constriction & Hesitant Speech" className="bg-[#1a1a1a]">Throat Constriction &amp; Hesitation (Vishuddha/Throat)</option>
                <option value="Chest Tightness & Emotional Heaviness" className="bg-[#1a1a1a]">Chest Heaviness &amp; Heart Ache (Anahata/Heart)</option>
                <option value="Headaches, Eye Strain & Disrupted Sleep" className="bg-[#1a1a1a]">Head Tension &amp; Restless Sleep (Ajna/Third Eye)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#2A1810] mb-2">
                Dominant Emotional State
              </label>
              <select
                value={emotionalState}
                onChange={(e) => setEmotionalState(e.target.value)}
                className="w-full bg-black/40 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-purple-400"
              >
                <option value="Restlessness, Anxiety & Overthinking" className="bg-[#1a1a1a]">Anxiety, Fear of Future &amp; Restlessness</option>
                <option value="Creative Block, Guilt & Emotional Numbness" className="bg-[#1a1a1a]">Creative Block &amp; Emotional Numbness</option>
                <option value="Anger, Frustration & Impatience" className="bg-[#1a1a1a]">Anger, Impatience &amp; Frustration</option>
                <option value="Feeling Disconnected & Lack of Life Purpose" className="bg-[#1a1a1a]">Feeling Disconnected &amp; Lack of Clarity</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#2A1810] mb-2">
                Life Blockage Area
              </label>
              <select
                value={primaryBlock}
                onChange={(e) => setPrimaryBlock(e.target.value)}
                className="w-full bg-black/40 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-purple-400"
              >
                <option value="Career Decisions & Financial Confidence" className="bg-[#1a1a1a]">Career Decisions &amp; Financial Security</option>
                <option value="Relationship Closeness & Marital Harmony" className="bg-[#1a1a1a]">Relationship Peace &amp; Marital Harmony</option>
                <option value="Spiritual Focus & Mental Equanimity" className="bg-[#1a1a1a]">Spiritual Focus &amp; Inner Peace</option>
                <option value="Physical Vitality & Wellness" className="bg-[#1a1a1a]">Physical Vitality &amp; Immunity</option>
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
            disabled={isScanning}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white font-extrabold text-sm uppercase tracking-wider shadow-[0_4px_25px_rgba(168,85,247,0.35)] hover:brightness-110 active:scale-[0.98] disabled:opacity-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {isScanning ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Scanning Subtle Prana Vortexes &amp; Aura...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Scan 7 Chakras &amp; Reveal Sound Frequencies</span>
              </>
            )}
          </button>
        </form>

        {/* Results */}
        {result && (
          <div className="bg-[#10070b] border-2 border-purple-500/50 rounded-3xl p-6 sm:p-10 shadow-2xl animate-fadeIn">
            <div className="flex items-center justify-between pb-4 border-b border-purple-500/30 mb-6">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-purple-400" />
                <h2 className="text-xl font-bold font-serif text-purple-300">
                  Kundalini &amp; Chakra Bio-Energy Assessment
                </h2>
              </div>
              <span className="text-xs bg-purple-500/20 text-purple-300 border border-purple-500/40 px-3 py-1 rounded-full font-bold">
                Aura Harmonized
              </span>
            </div>

            <VedicReportRenderer content={result} />

            {/* Sealed Gotra Destiny Envelope */}
            <SealedGotraDestinyEnvelope
              seekerName="Seeker"
              toolName="7-Chakra & Kundalini Energy Aura Scanner"
              serviceId="temple-puja"
              serviceName="Remote Temple Sankalp Puja & Energy Clearing"
              price={2100}
              highlightWarning="Severe subtle vortex blockage detected in your primary energy vortex. Pandit Ji has sealed the specific Beej Shloka rhythm and consecrated Temple Puja protocol."
            />

            {/* Consecrated Puja & Voice Blessing Upsell */}
            <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-[#1c0c16] to-[#250d1a] border-2 border-purple-500/50 flex flex-col sm:flex-row items-center justify-between gap-5">
              <div>
                <div className="inline-flex items-center gap-1 text-[10px] font-bold text-purple-300 uppercase tracking-widest mb-1">
                  <span>✨ Clear Deep Energy Blockages</span>
                </div>
                <h4 className="text-lg font-bold font-serif text-white mb-1">
                  Book Remote Temple Sankalp Puja or Spoken Audio Dossier
                </h4>
                <p className="text-xs text-gray-300">
                  Consecrated Vedic chanting performed by Pandit Ji in Kashi Vishwanath / Ujjain Mahakal with blessed Prasad delivered to your home.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 shrink-0">
                <Link
                  href="/request-guidance?service=temple-puja"
                  className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg hover:brightness-110 flex items-center justify-center gap-1.5"
                >
                  <span>Book Puja (₹2,100)</span>
                </Link>
                <Link
                  href="/request-guidance?service=voice-dossier"
                  className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md flex items-center justify-center gap-1.5"
                >
                  <span>Spoken MP3 (₹1,999)</span>
                </Link>
              </div>
            </div>

            {/* Instant 1-Question Diya Dispatch */}
            <InstantPrashnaDiya toolName="7-Chakra & Kundalini Scanner" />
          </div>
        )}

        {/* Sticky Consecration Bar */}
        {result && (
          <SanctifiedVerdictStickyBar
            serviceId="temple-puja"
            serviceName="Remote Temple Sankalp Puja"
            price={2100}
            badge="Live Chakra Energization Window"
          />
        )}
      </div>
    </main>
  );
}
