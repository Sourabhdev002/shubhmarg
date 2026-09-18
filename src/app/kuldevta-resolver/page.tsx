"use client";

import React, { useState } from "react";
import { Sparkles, Compass, Flame, ArrowRight, Share2, Droplets, Wind, Mountain, Sun } from "lucide-react";
import { VEDIC_GOTRAS, GotraDetail } from "@/lib/gotras";
import Link from "next/link";
import VedicCalculationLoader from "@/components/shared/VedicCalculationLoader";
import SanctifiedVerdictStickyBar from "@/components/shared/SanctifiedVerdictStickyBar";

const GOTRA_KEYS = Object.keys(VEDIC_GOTRAS);

export default function KuldevtaResolverPage() {
  const [selectedKey, setSelectedKey] = useState(GOTRA_KEYS[0]);
  const [seekerName, setSeekerName] = useState("");
  const [isResolving, setIsResolving] = useState(false);
  const [resolvedGotra, setResolvedGotra] = useState<GotraDetail | null>(VEDIC_GOTRAS[GOTRA_KEYS[0]]);

  const handleResolve = (e: React.FormEvent) => {
    e.preventDefault();
    setIsResolving(true);
    setResolvedGotra(null);

    setTimeout(() => {
      setResolvedGotra(VEDIC_GOTRAS[selectedKey] || VEDIC_GOTRAS[GOTRA_KEYS[0]]);
      setIsResolving(false);
    }, 2000);
  };

  const getElementIcon = (elem: string) => {
    if (elem.includes("Fire")) return <Flame className="w-4 h-4 text-red-400" />;
    if (elem.includes("Water")) return <Droplets className="w-4 h-4 text-cyan-400" />;
    if (elem.includes("Air")) return <Wind className="w-4 h-4 text-amber-300" />;
    if (elem.includes("Earth")) return <Mountain className="w-4 h-4 text-emerald-400" />;
    return <Sun className="w-4 h-4 text-[#ffd700]" />;
  };

  const shareText = encodeURIComponent(
    `🔱 *Vedic Gotra & Kuldevta Lineage Dossier* 🔱\n\n*Gotra:* ${resolvedGotra?.name} (${resolvedGotra?.sanskritName})\n*Primordial Rishi:* ${resolvedGotra?.rishi}\n*Pravara:* ${resolvedGotra?.pravara}\n*Kuldevta Tradition:* ${resolvedGotra?.kuldevtaTradition}\n*Sacred River:* ${resolvedGotra?.primarySacredRiver}\n\n_Resolved on ShubhMarg Vedic Sanctuary: https://shubhmarg.com/kuldevta-resolver_`
  );

  return (
    <main className="min-h-screen bg-[#FBF6EC] text-[#2A1810] pt-24 pb-28 px-4 sm:px-6">
      {/* Background sacred orbs */}
      <div className="pointer-events-none fixed top-0 right-0 w-[50vw] h-[50vw] max-w-96 max-h-96 bg-[#d4af37]/10 rounded-full blur-[130px]" />
      <div className="pointer-events-none fixed bottom-0 left-0 w-[50vw] h-[50vw] max-w-96 max-h-96 bg-[#72232b]/20 rounded-full blur-[130px]" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFDF8] border border-[#B8860B]/30 mb-3">
            <Compass className="w-4 h-4 text-[#C25E10]" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#C25E10]">
              Ancestral Lineage &amp; Rishi Vamsha
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-serif text-[#2A1810] tracking-wide mb-3">
            Gotra Rishi &amp; Kuldevta Lineage Resolver
          </h1>
          <p className="text-[#2E1D14] text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Discover your primordial Vedic Rishi roots, three-sage Pravara, ancestral Kuldevta temples, and sacred lineage Beej Mantras.
          </p>
        </div>

        {/* Selector Form */}
        <form onSubmit={handleResolve} className="bg-[#FFFDF8] border border-[#B8860B]/20 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#C25E10] mb-2">
                Your Full Name (Seeker)
              </label>
              <input
                type="text"
                placeholder="e.g. Vikram Sharma"
                value={seekerName}
                onChange={(e) => setSeekerName(e.target.value)}
                className="w-full bg-[#FDFBF7] border border-[#B8860B]/30 rounded-xl px-4 py-3 text-sm text-[#2A1810] placeholder-[#8B7E74] focus:outline-none focus:border-[#C25E10] shadow-sm font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#C25E10] mb-2">
                Select Your Vedic Gotra
              </label>
              <select
                value={selectedKey}
                onChange={(e) => setSelectedKey(e.target.value)}
                className="w-full bg-[#FDFBF7] border border-[#B8860B]/30 rounded-xl px-4 py-3 text-sm text-[#2A1810] focus:outline-none focus:border-[#C25E10] shadow-sm font-medium"
              >
                {GOTRA_KEYS.map((k) => (
                  <option key={k} value={k}>
                    {VEDIC_GOTRAS[k].name} ({VEDIC_GOTRAS[k].sanskritName}) — {VEDIC_GOTRAS[k].rishi.split("(")[0]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={isResolving}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#d4af37] via-[#e5c453] to-[#d4af37] text-black font-extrabold text-sm uppercase tracking-wider shadow-[0_4px_25px_rgba(212,175,55,0.35)] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-black" />
            <span>Resolve Rishi Pravara &amp; Kuldevta Lineage</span>
          </button>
        </form>

        {/* Loading Experience */}
        {isResolving && (
          <VedicCalculationLoader
            title="Resolving Saptarishi Vamsha & Pravara Lineage"
            stages={[
              "Tracing Saptarishi Genealogies & Ancient Vedic Sutras...",
              "Calculating Primordial Rishi Pravara & Elemental Resonance...",
              "Identifying Traditional Kuldevta, Kuldevi & Holy Rivers...",
              "Synthesizing Ancestral Gotra Beej Mantra & Shanti Guidance...",
            ]}
            estimatedSeconds={2}
          />
        )}

        {/* ── Resolved Gotra Dossier Card ── */}
        {resolvedGotra && !isResolving && (
          <div className="space-y-8 animate-fadeIn">
            {/* Hero Lineage Header */}
            <div className="bg-gradient-to-br from-[#1c0d08] to-[#2b120a] border-2 border-[#d4af37] rounded-3xl p-6 sm:p-9 shadow-2xl relative overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-4 border-b border-[#d4af37]/30">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#d4af37] text-[10px] font-extrabold uppercase tracking-widest">
                  <Flame className="w-3.5 h-3.5" />
                  <span>Consecrated Rishi Lineage</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-amber-300 font-mono">
                  {getElementIcon(resolvedGotra.element)}
                  <span>Lineage Element: <strong>{resolvedGotra.element}</strong></span>
                </div>
              </div>

              <div className="text-center my-4">
                <span className="text-4xl sm:text-5xl font-extrabold font-devanagari text-[#ffd700]">
                  ॥ {resolvedGotra.sanskritName} गोत्र ॥
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-serif !text-[#FFFDF8] mt-2" style={{ color: "#FFFDF8" }}>
                  {resolvedGotra.name} Gotra Heritage
                </h2>
                <p className="text-xs sm:text-sm text-[#FFFDF8] max-w-lg mx-auto mt-2 font-normal">
                  {resolvedGotra.lineageDescription}
                </p>
              </div>

              {/* Mantra Banner */}
              <div className="my-6 p-4 rounded-2xl bg-black/60 border border-[#d4af37]/30 text-center">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37] block mb-1">
                  Sacred Gotra Rishi Beej Gayatri
                </span>
                <p className="text-sm sm:text-base font-serif text-[#ffd700] font-semibold">
                  {resolvedGotra.beejMantra}
                </p>
              </div>

              {/* 4 Pillars Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-6 text-xs">
                <div className="bg-black/40 border border-white/10 rounded-2xl p-4">
                  <span className="text-[10px] text-[#EAE3D2] font-bold uppercase tracking-widest block mb-1">
                    Primordial Founding Sage (Rishi)
                  </span>
                  <p className="text-sm font-bold text-white font-serif">{resolvedGotra.rishi}</p>
                </div>

                <div className="bg-black/40 border border-white/10 rounded-2xl p-4">
                  <span className="text-[10px] text-[#EAE3D2] font-bold uppercase tracking-widest block mb-1">
                    Three-Sage Pravara (प्रवर)
                  </span>
                  <p className="text-sm font-bold text-[#d4af37] font-mono">{resolvedGotra.pravara}</p>
                </div>

                <div className="bg-black/40 border border-white/10 rounded-2xl p-4">
                  <span className="text-[10px] text-[#EAE3D2] font-bold uppercase tracking-widest block mb-1">
                    Ancestral Kuldevta / Kuldevi Tradition
                  </span>
                  <p className="text-xs font-semibold text-[#FFFDF8]">{resolvedGotra.kuldevtaTradition}</p>
                </div>

                <div className="bg-black/40 border border-white/10 rounded-2xl p-4">
                  <span className="text-[10px] text-[#EAE3D2] font-bold uppercase tracking-widest block mb-1">
                    Sacred River &amp; Consecration Tree
                  </span>
                  <p className="text-xs font-semibold text-[#FFFDF8]">
                    River: {resolvedGotra.primarySacredRiver} • Tree: {resolvedGotra.sacredTree}
                  </p>
                </div>
              </div>

              {/* Share & Booking Actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4 border-t border-white/10">
                <a
                  href={`https://wa.me/?text=${shareText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share Gotra Dossier on WhatsApp</span>
                </a>

                <Link
                  href="/request-guidance?service=temple-puja"
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-amber-500 text-black font-extrabold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 flex items-center justify-center gap-2 transition-all"
                >
                  <span>Book {resolvedGotra.name} Gotra Sankalp Puja (₹2,100)</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Sticky Floating Bar */}
            <SanctifiedVerdictStickyBar
              serviceId="temple-puja"
              serviceName={`${resolvedGotra.name} Gotra Ancestral Shanti Puja`}
              price={2100}
              badge={`Live ${resolvedGotra.name} Consecration Open`}
            />
          </div>
        )}
      </div>
    </main>
  );
}
