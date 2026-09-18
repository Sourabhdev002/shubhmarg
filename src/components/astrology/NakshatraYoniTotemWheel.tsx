"use client";

import React, { useState } from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import SanctifiedVerdictStickyBar from "@/components/shared/SanctifiedVerdictStickyBar";

interface NakshatraYoni {
  id: string;
  nakshatra: string;
  yoniAnimal: string;
  animalSanskrit: string;
  temperament: string;
  compatibleYonis: string[];
  enemyYonis: string[];
  magneticAttractionScore: number;
}

const NAKSHATRA_YONIS: NakshatraYoni[] = [
  { id: "0", nakshatra: "Ashwini (Aries)", yoniAnimal: "Sacred Stallion (Horse)", animalSanskrit: "अश्व योनि", temperament: "Speed, swift vitality, independence, restlessness, and courage.", compatibleYonis: ["Shatabhisha (Horse)", "Revati (Elephant)", "Bharani (Elephant)"], enemyYonis: ["Hasta (Buffalo)", "Swati (Buffalo)"], magneticAttractionScore: 92 },
  { id: "1", nakshatra: "Bharani (Aries)", yoniAnimal: "Divine Elephant (Gaja)", animalSanskrit: "गज योनि", temperament: "Immense physical endurance, nobility, deep loyalty, and royal patience.", compatibleYonis: ["Revati (Elephant)", "Ashwini (Horse)"], enemyYonis: ["Dhanishta (Lion)", "Purva Bhadrapada (Lion)"], magneticAttractionScore: 90 },
  { id: "2", nakshatra: "Krittika (Taurus)", yoniAnimal: "Sacred Ram / Sheep (Mesh)", animalSanskrit: "मेष योनि", temperament: "Penetrating focus, digestive fire, protective instinct, and straightforward will.", compatibleYonis: ["Pushya (Goat)"], enemyYonis: ["Chitra (Tiger)", "Vishakha (Tiger)"], magneticAttractionScore: 84 },
  { id: "3", nakshatra: "Rohini (Taurus)", yoniAnimal: "Cosmic Serpent (Sarpa)", animalSanskrit: "सर्प योनि", temperament: "Irresistible hypnotic magnetism, artistic grace, deep intuition, and charm.", compatibleYonis: ["Mrigashira (Serpent)"], enemyYonis: ["Uttara Ashadha (Mongoose)"], magneticAttractionScore: 96 },
  { id: "4", nakshatra: "Mrigashira (Gemini)", yoniAnimal: "Cosmic Serpent (Sarpa)", animalSanskrit: "सर्प योनि", temperament: "Curious seeker, sharp observation, seductive intellect, and adaptability.", compatibleYonis: ["Rohini (Serpent)"], enemyYonis: ["Uttara Ashadha (Mongoose)"], magneticAttractionScore: 94 },
  { id: "5", nakshatra: "Ardra (Gemini)", yoniAnimal: "Sacred Hound (Dog)", animalSanskrit: "श्वान योनि", temperament: "Fierce loyalty, investigative intellect, emotional depth, and truth-seeking.", compatibleYonis: ["Mula (Dog)"], enemyYonis: ["Magha (Rat)", "Purva Phalguni (Rat)"], magneticAttractionScore: 86 },
  { id: "6", nakshatra: "Punarvasu (Cancer)", yoniAnimal: "Divine Feline (Cat)", animalSanskrit: "मार्जार योनि", temperament: "Self-reliance, gentle grace, renewal after storms, and quiet wisdom.", compatibleYonis: ["Ashlesha (Cat)"], enemyYonis: ["Magha (Rat)", "Purva Phalguni (Rat)"], magneticAttractionScore: 88 },
  { id: "7", nakshatra: "Pushya (Cancer)", yoniAnimal: "Sacred Goat (Aja)", animalSanskrit: "छाग योनि", temperament: "Nurturing, foundational provider, peaceful endurance, and ethical devotion.", compatibleYonis: ["Krittika (Sheep)"], enemyYonis: ["Chitra (Tiger)", "Vishakha (Tiger)"], magneticAttractionScore: 91 },
  { id: "8", nakshatra: "Magha (Leo)", yoniAnimal: "Royal Rat / Mouse (Mushaka)", animalSanskrit: "मूषक योनि", temperament: "Sharp discernment, ancestral authority, resourceful survivor, and dignity.", compatibleYonis: ["Purva Phalguni (Rat)"], enemyYonis: ["Punarvasu (Cat)", "Ashlesha (Cat)"], magneticAttractionScore: 82 },
  { id: "9", nakshatra: "Chitra (Virgo/Libra)", yoniAnimal: "Royal Bengal Tiger (Vyaghra)", animalSanskrit: "व्याघ्र योनि", temperament: "Architectural beauty, solitary power, magnetic roar, and striking elegance.", compatibleYonis: ["Vishakha (Tiger)"], enemyYonis: ["Pushya (Goat)", "Krittika (Sheep)"], magneticAttractionScore: 89 },
  { id: "10", nakshatra: "Dhanishta (Aquarius)", yoniAnimal: "Imperial Lion (Simha)", animalSanskrit: "सिंह योनि", temperament: "Unmatched rhythmic majesty, wealth magnetism, generosity, and sovereign pride.", compatibleYonis: ["Purva Bhadrapada (Lion)"], enemyYonis: ["Bharani (Elephant)", "Revati (Elephant)"], magneticAttractionScore: 95 },
  { id: "11", nakshatra: "Revati (Pisces)", yoniAnimal: "Celestial Elephant (Gaja)", animalSanskrit: "गज योनि", temperament: "Universal empathy, protective benevolence, spiritual journeys, and gentle wealth.", compatibleYonis: ["Bharani (Elephant)", "Ashwini (Horse)"], enemyYonis: ["Dhanishta (Lion)", "Purva Bhadrapada (Lion)"], magneticAttractionScore: 95 },
];

export default function NakshatraYoniTotemWheel() {
  const [selectedYoniIndex, setSelectedYoniIndex] = useState(0);
  const activeYoni = NAKSHATRA_YONIS[selectedYoniIndex];

  return (
    <div className="my-10 bg-gradient-to-b from-[#180c09] via-[#240f0c] to-[#0d0403] border-2 border-[#d4af37] rounded-3xl p-6 sm:p-12 shadow-[0_20px_80px_rgba(212,175,55,0.35)] relative overflow-hidden text-center">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 bg-amber-600/15 rounded-full blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 w-96 h-96 bg-red-600/15 rounded-full blur-[140px]" />

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Header Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#d4af37] text-[11px] font-extrabold uppercase tracking-widest mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Vedic Animal Totems &amp; Instinctual Yoni Matrix</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-bold font-serif text-white tracking-wide mb-2">
          ॥ २७ नक्षत्र योनि एवं प्राण तत्त्व चक्र ॥
        </h2>
        <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto mb-8 font-light leading-relaxed">
          In Vedic astrology, each Nakshatra embodies a primordial cosmic animal totem that dictates your instinctual physical magnetism, unconscious drives, and relationship harmony.
        </p>

        {/* ── Nakshatra Selector Dropdown ── */}
        <div className="bg-black/70 border border-white/15 rounded-2xl p-4 sm:p-5 mb-8 text-left max-w-md mx-auto">
          <label className="block text-xs font-bold uppercase tracking-wider text-[#d4af37] mb-2">
            Select Your Birth Nakshatra
          </label>
          <select
            value={selectedYoniIndex}
            onChange={(e) => setSelectedYoniIndex(Number(e.target.value))}
            className="w-full bg-black/80 border border-white/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
          >
            {NAKSHATRA_YONIS.map((y, idx) => (
              <option key={y.id} value={idx} className="bg-[#1a1a1a]">
                {y.nakshatra} — {y.yoniAnimal}
              </option>
            ))}
          </select>
        </div>

        {/* ── Interactive Animal Totem Stage ── */}
        <div className="bg-gradient-to-br from-[#241108] to-black/95 border-2 border-[#d4af37] rounded-3xl p-6 sm:p-9 shadow-2xl relative text-left">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#d4af37]/30 mb-6">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37] font-mono">
                {activeYoni.nakshatra}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-serif text-white mt-0.5">
                {activeYoni.yoniAnimal}
              </h3>
              <span className="text-xs text-amber-200/90 font-devanagari font-bold">
                ॥ {activeYoni.animalSanskrit} ॥
              </span>
            </div>

            <div className="px-4 py-2 rounded-2xl bg-amber-500/20 border border-amber-400/40 text-amber-300 text-center">
              <span className="text-[9px] uppercase font-bold tracking-widest block">Magnetic Attraction</span>
              <span className="text-base font-bold text-white">{activeYoni.magneticAttractionScore}% Affinity</span>
            </div>
          </div>

          {/* Instinctual Temperament */}
          <div className="p-5 rounded-2xl bg-black/60 border border-white/10 mb-6">
            <span className="text-[10px] uppercase text-gray-400 font-bold tracking-widest block mb-1">
              Instinctual Biology &amp; Behavioral Drives
            </span>
            <p className="text-gray-200 text-sm leading-relaxed font-light">{activeYoni.temperament}</p>
          </div>

          {/* Compatibility vs Friction Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-xs">
            <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-2xl p-4">
              <span className="text-[10px] uppercase text-emerald-400 font-bold tracking-widest block mb-2">
                🌸 Most Harmonious Partner Yonis
              </span>
              <ul className="space-y-1.5 text-gray-200">
                {activeYoni.compatibleYonis.map((c, i) => (
                  <li key={i} className="flex items-center gap-1.5 font-medium">
                    <span className="text-emerald-400">✔</span> {c}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-red-950/40 border border-red-500/30 rounded-2xl p-4">
              <span className="text-[10px] uppercase text-red-400 font-bold tracking-widest block mb-2">
                ⚠️ Instinctual Friction Pairs (Mismatched Yoni)
              </span>
              <ul className="space-y-1.5 text-gray-200">
                {activeYoni.enemyYonis.map((e, i) => (
                  <li key={i} className="flex items-center gap-1.5 font-medium">
                    <span className="text-red-400">✖</span> {e}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* High-Ticket Yoni Compatibility Report Bridge */}
          <div className="bg-gradient-to-r from-[#38160a] via-[#1f0904] to-[#38160a] border-2 border-amber-500/50 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-xl">
            <div>
              <h4 className="text-base font-serif font-bold text-white mb-1">
                Order Complete Nakshatra Yoni Relationship Audit
              </h4>
              <p className="text-xs text-gray-300 leading-relaxed font-light">
                Pandit Ji will evaluate both partners&apos; subconscious animal Yoni compatibility, physical chemistry, and prescribe remedial mantras to resolve hidden intimacy clashes.
              </p>
            </div>

            <div className="flex flex-col gap-2 shrink-0 w-full sm:w-auto">
              <Link
                href="/request-guidance?service=marriage"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#ffd700] to-[#d4af37] text-black font-extrabold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 flex items-center justify-center gap-1.5 transition-all"
              >
                <span>Get Yoni Audit (₹1,101)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Sticky Action Bar */}
        <SanctifiedVerdictStickyBar
          serviceId="marriage"
          serviceName={`Nakshatra Yoni Report (${activeYoni.yoniAnimal})`}
          price={1101}
          badge="Animal Totem Aligned"
        />
      </div>
    </div>
  );
}
