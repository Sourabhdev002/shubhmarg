"use client";

import React, { useState } from "react";
import { Disc, RotateCcw } from "lucide-react";
import JapaMalaDedicationModal from "@/components/shared/JapaMalaDedicationModal";

const JAPA_MANTRAS = [
  { name: "Maha Mrityunjaya Mantra", sanskrit: "ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्। उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय माऽमृतात्॥", deity: "Lord Shiva (Healing & Vitality)" },
  { name: "Gayatri Maha Mantra", sanskrit: "ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्॥", deity: "Savita / Surya Dev (Illumination)" },
  { name: "Shiva Panchakshari", sanskrit: "ॐ नमः शिवाय॥", deity: "Lord Shiva (Inner Peace)" },
  { name: "Ganesha Moola Mantra", sanskrit: "ॐ गं गणपतये नमः॥", deity: "Lord Ganesha (Obstacle Removal)" },
  { name: "Maha Lakshmi Mantra", sanskrit: "ॐ श्रीं ह्रीं क्लीं ग्लौं गं गणपतये वर वरद सर्वजनं मे वशमानय स्वाहा॥", deity: "Goddess Mahalakshmi (Abundance)" },
];

export default function JapaMalaPage() {
  const [count, setCount] = useState(0);
  const [completedMalas, setCompletedMalas] = useState(0);
  const [selectedMantra, setSelectedMantra] = useState(JAPA_MANTRAS[0]);
  const [showDedicationModal, setShowDedicationModal] = useState(false);

  const handleBeadClick = () => {
    if (count + 1 >= 108) {
      setCount(0);
      setCompletedMalas((prev) => prev + 1);
      setShowDedicationModal(true);
    } else {
      setCount((prev) => prev + 1);
    }
  };

  const handleReset = () => {
    setCount(0);
  };

  const progressPercent = (count / 108) * 100;

  return (
    <main className="min-h-screen bg-[#FBF6EC] text-[#2A1810] pt-24 pb-28 px-4 sm:px-6">
      {/* Deep amber temple background glow */}
      <div className="pointer-events-none fixed top-1/3 left-1/2 -translate-x-1/2 w-[70vw] h-[70vw] max-w-[500px] max-h-[500px] bg-[#d4af37]/15 rounded-full blur-[140px]" />

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFDF8] border border-[#B8860B]/30 mb-3">
            <Disc className="w-4 h-4 text-[#C25E10] animate-spin [animation-duration:12s]" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#C25E10]">
              Sacred 108-Bead Meditation Sanctuary
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-serif text-[#2A1810] tracking-wide mb-2">
            Digital Rudraksha Japa Mala
          </h1>
          <p className="text-[#6B5A48] text-xs sm:text-sm max-w-lg mx-auto">
            Consecrated 108-bead japa counter. Tap the central Rudraksha bead with each breath as you chant your sacred mantra.
          </p>
        </div>

        {/* Mantra Selector */}
        <div className="bg-[#FFFDF8] border border-[#B8860B]/20 rounded-2xl p-4 mb-8">
          <label className="block text-xs font-bold uppercase tracking-wider text-[#C25E10] mb-2">
            Select Your Japa Mantra:
          </label>
          <select
            value={selectedMantra.name}
            onChange={(e) => {
              const found = JAPA_MANTRAS.find((m) => m.name === e.target.value);
              if (found) setSelectedMantra(found);
            }}
            className="w-full bg-black/60 border border-white/20 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#d4af37]"
          >
            {JAPA_MANTRAS.map((m) => (
              <option key={m.name} value={m.name} className="bg-[#1a1a1a]">{m.name} — {m.deity}</option>
            ))}
          </select>

          <div className="mt-3 p-3 bg-black/40 rounded-xl border border-[#d4af37]/20 text-center">
            <p className="text-sm sm:text-base font-serif text-[#ffd700] font-semibold leading-relaxed">
              {selectedMantra.sanskrit}
            </p>
          </div>
        </div>

        {/* ── Central Interactive Japa Bead Stage ── */}
        <div className="bg-gradient-to-b from-[#1c100b] to-[#120704] border-2 border-[#d4af37]/70 rounded-3xl p-8 sm:p-12 shadow-2xl mb-8 text-center relative overflow-hidden">
          {/* Progress Arc Info */}
          <div className="flex items-center justify-between text-xs text-gray-300 font-mono mb-6">
            <span>Completed Malas: <strong className="text-[#d4af37] text-sm">{completedMalas}</strong></span>
            <span>Bead: <strong className="text-white text-base">{count}</strong> / 108</span>
          </div>

          {/* Large Tap Button / Rudraksha Bead */}
          <button
            type="button"
            onClick={handleBeadClick}
            className="w-48 h-48 sm:w-56 sm:h-56 mx-auto rounded-full bg-gradient-to-br from-[#8a4214] via-[#572709] to-[#2b1003] border-4 border-[#d4af37] shadow-[0_0_50px_rgba(212,175,55,0.4)] hover:shadow-[0_0_70px_rgba(212,175,55,0.7)] active:scale-95 transition-all flex flex-col items-center justify-center cursor-pointer select-none group relative"
          >
            {/* Inner Ring Glow */}
            <div className="absolute inset-2 rounded-full border border-white/20 pointer-events-none" />

            <span className="text-4xl sm:text-5xl font-extrabold font-mono text-white group-hover:scale-110 transition-transform">
              {count}
            </span>
            <span className="text-[11px] uppercase tracking-widest text-[#d4af37] font-bold mt-1">
              Tap to Chant
            </span>
          </button>

          {/* Progress Bar */}
          <div className="w-full bg-black/60 h-3 rounded-full overflow-hidden mt-8 border border-white/15">
            <div
              className="bg-gradient-to-r from-[#d4af37] via-amber-400 to-[#d4af37] h-full transition-all duration-200"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-semibold text-gray-300 transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Current Round</span>
            </button>
          </div>
        </div>

        {/* Spiritual Significance Card */}
        <div className="bg-[#FFFDF8] border border-[#B8860B]/20 rounded-2xl p-5 text-xs text-[#6B5A48] leading-relaxed text-center">
          <p>
            <strong>Why 108 Beads?</strong> In Vedic cosmology, 108 represents the cosmic wholeness of existence — 12 astrological signs multiplied by the 9 Navagrahas. Completing 108 repetitions aligns individual consciousness (*Jiva*) with universal cosmic rhythm (*Brahman*).
          </p>
        </div>

        {/* 108 Beads Merit Dedication Modal */}
        <JapaMalaDedicationModal
          isOpen={showDedicationModal}
          onClose={() => setShowDedicationModal(false)}
          mantraName={selectedMantra.name}
          completedCount={completedMalas}
        />
      </div>
    </main>
  );
}
