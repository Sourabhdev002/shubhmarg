"use client";

import React, { useState } from "react";
import { Moon, Sparkles, Loader2, CloudMoon } from "lucide-react";
import VedicReportRenderer from "@/components/reports/VedicReportRenderer";
import SealedGotraDestinyEnvelope from "@/components/shared/SealedGotraDestinyEnvelope";
import InstantPrashnaDiya from "@/components/shared/InstantPrashnaDiya";
import SanctifiedVerdictStickyBar from "@/components/shared/SanctifiedVerdictStickyBar";
import VedicCalculationLoader from "@/components/shared/VedicCalculationLoader";

const POPULAR_DREAM_SYMBOLS = [
  "White Elephant / Gajraj",
  "Flowing Sacred River",
  "Temple Deity & Gold Diya",
  "Flying in Blue Sky",
  "Snake Shedding Skin",
  "Rising Golden Surya (Sun)",
];

export default function DreamDecoderPage() {
  const [dreamText, setDreamText] = useState("");
  const [prahara, setPrahara] = useState("Last Quarter (Brahma Muhurta / 3 AM - 6 AM)");
  const [emotion, setEmotion] = useState("Peaceful & Uplifted");
  const [isDecoding, setIsDecoding] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleQuickPick = (symbol: string) => {
    setDreamText((prev) => (prev ? `${prev}, seeing ${symbol}` : `I saw ${symbol} in my dream.`));
  };

  const handleDecode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dreamText.trim()) {
      setError("Please describe what you saw in your dream.");
      return;
    }

    setIsDecoding(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/dream-decode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dreamText: dreamText.trim(),
          prahara,
          emotion,
        }),
      });

      const data = await res.json();
      if (data.success && data.decoding) {
        setResult(data.decoding);
      } else {
        setError(data.error || "Failed to decode dream according to Swapna Shastra.");
      }
    } catch {
      setError("An unexpected network error occurred.");
    } finally {
      setIsDecoding(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FBF6EC] text-[#2A1810] pt-24 pb-28 px-4 sm:px-6">
      {/* Deep indigo moonlit glow */}
      <div className="pointer-events-none fixed top-0 right-0 w-[50vw] h-[50vw] max-w-96 max-h-96 bg-indigo-600/15 rounded-full blur-[130px]" />
      <div className="pointer-events-none fixed bottom-0 left-0 w-[50vw] h-[50vw] max-w-96 max-h-96 bg-purple-900/20 rounded-full blur-[130px]" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 mb-3">
            <CloudMoon className="w-4 h-4 text-indigo-400" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-indigo-300">
              Classical Purana Swapna Shastra
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-serif text-[#2A1810] tracking-wide mb-3">
            Vedic Dream Decoding Engine
          </h1>
          <p className="text-[#6B5A48] text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Uncover the celestial omens and spiritual messages behind your dreams based on the ancient *Agni Purana* and *Brihat Samhita* dream treatises.
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleDecode} className="bg-[#FFFDF8] border border-[#B8860B]/20 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl mb-10">
          {/* Quick Symbol Chips */}
          <div className="mb-4">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#2A1810] mb-2">
              Common Auspicious Symbols (Click to Add):
            </label>
            <div className="flex flex-wrap gap-2">
              {POPULAR_DREAM_SYMBOLS.map((symbol) => (
                <button
                  key={symbol}
                  type="button"
                  onClick={() => handleQuickPick(symbol)}
                  className="px-3 py-1.5 rounded-xl bg-black/40 hover:bg-indigo-900/30 border border-white/10 hover:border-indigo-400/40 text-xs text-gray-300 transition-all cursor-pointer"
                >
                  + {symbol}
                </button>
              ))}
            </div>
          </div>

          {/* Dream Description Field */}
          <div className="mb-5">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#6B5A48] mb-2">
              Describe What You Saw in Your Dream
            </label>
            <textarea
              required
              rows={4}
              placeholder="e.g. I saw myself climbing steps of an ancient golden temple on a hilltop, and a priest handed me a lotus flower as the sun was rising..."
              value={dreamText}
              onChange={(e) => setDreamText(e.target.value)}
              className="w-full bg-black/50 border border-white/15 rounded-2xl p-4 text-sm text-white focus:outline-none focus:border-indigo-400"
            />
          </div>

          {/* Timing & Emotion Pickers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#6B5A48] mb-2">
                Hour / Prahara of the Night
              </label>
              <select
                value={prahara}
                onChange={(e) => setPrahara(e.target.value)}
                className="w-full bg-black/40 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-400"
              >
                <option value="First Watch / Early Night (9 PM - 12 AM)" className="bg-[#1a1a1a]">First Watch (9 PM - 12 AM) — Manifests in 1 Year</option>
                <option value="Second Watch / Midnight (12 AM - 3 AM)" className="bg-[#1a1a1a]">Midnight Watch (12 AM - 3 AM) — Manifests in 6 Months</option>
                <option value="Last Quarter (Brahma Muhurta / 3 AM - 6 AM)" className="bg-[#1a1a1a]">Brahma Muhurta (3 AM - 6 AM) — Manifests in 10-30 Days</option>
                <option value="Daytime Nap" className="bg-[#1a1a1a]">Daytime Nap — Generally Psychological</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#6B5A48] mb-2">
                Feeling Upon Waking Up
              </label>
              <select
                value={emotion}
                onChange={(e) => setEmotion(e.target.value)}
                className="w-full bg-black/40 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-400"
              >
                <option value="Peaceful & Uplifted" className="bg-[#1a1a1a]">Peaceful &amp; Joyful</option>
                <option value="Anxious or Restless" className="bg-[#1a1a1a]">Anxious or Heavy</option>
                <option value="Confused & Intrigued" className="bg-[#1a1a1a]">Curious &amp; Intrigued</option>
                <option value="Neutral" className="bg-[#1a1a1a]">Neutral</option>
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
            disabled={isDecoding}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 text-white font-extrabold text-sm uppercase tracking-wider shadow-[0_4px_25px_rgba(99,102,241,0.35)] hover:brightness-110 active:scale-[0.98] disabled:opacity-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {isDecoding ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Decoding Vedic Omens from Purana Texts...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Decode Dream &amp; Reveal Vedic Message</span>
              </>
            )}
          </button>
        </form>

        {/* ── Sacred Dream Decoding Loading Experience ── */}
        {isDecoding && (
          <VedicCalculationLoader
            title="Swapna Shastra Purana Decoding"
            stages={[
              "Analyzing Archetypal Dream Imagery & Subconscious Symbols...",
              "Evaluating Lunar Prahara Window (Brahma Muhurta / Night Quarter)...",
              "Cross-Referencing Agni Purana & Vishnu Purana Swapna Shastra Chapters...",
              "Determining Omens, Manifestation Timing & Karmic Messages...",
              "Synthesizing Pandit Ji's Auspicious Dream Guidance & Shanti Remedies...",
            ]}
            estimatedSeconds={5}
          />
        )}

        {/* Results */}
        {result && (
          <div className="bg-[#100b14] border-2 border-indigo-500/50 rounded-3xl p-6 sm:p-10 shadow-2xl animate-fadeIn">
            <div className="flex items-center justify-between pb-4 border-b border-indigo-500/30 mb-6">
              <div className="flex items-center gap-2">
                <Moon className="w-5 h-5 text-indigo-400" />
                <h2 className="text-xl font-bold font-serif text-indigo-300">
                  Swapna Shastra Astrological Interpretation
                </h2>
              </div>
              <span className="text-xs bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 px-3 py-1 rounded-full font-bold">
                Purana Analysis
              </span>
            </div>

            <VedicReportRenderer content={result} />

            {/* Sealed Gotra Destiny Envelope */}
            <SealedGotraDestinyEnvelope
              seekerName="Seeker"
              toolName="Swapna Shastra Dream Decoder"
              serviceId="vedic-guidance"
              serviceName="Prashna & Dream Interpretation Guidance"
              price={501}
              highlightWarning="This dream sequence indicates a pivotal karmic turning point. Standard dream books lack birth Kundli correlation. Pandit Ji has sealed your exact Gotra Shanti remedy."
            />

            {/* Instant 1-Question Diya Dispatch */}
            <InstantPrashnaDiya toolName="Swapna Dream Decoder" />
          </div>
        )}

        {/* Floating Consecration Bar */}
        {result && (
          <SanctifiedVerdictStickyBar
            serviceId="vedic-guidance"
            serviceName="Dream Interpretation Guidance"
            price={501}
            badge="Live Swapna Shanti Session Open"
          />
        )}
      </div>
    </main>
  );
}
