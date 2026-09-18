"use client";

import React, { useState } from "react";
import { Heart, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import DirectWhatsAppButton from "@/components/shared/DirectWhatsAppButton";
import VedicCalculationLoader from "@/components/shared/VedicCalculationLoader";
import SanctifiedVerdictStickyBar from "@/components/shared/SanctifiedVerdictStickyBar";

const NAVAMSHA_LAGNAS = [
  { id: "0", name: "Mesha (Aries Navamsha)", lord: "Mangal (Mars)", spouseTrait: "Dynamic, ambitious, protective and courageous partner with athletic vitality.", postMarriageWealth: "Sudden rise in independent real estate and executive ventures.", harmonyScore: 88 },
  { id: "1", name: "Vrishabha (Taurus Navamsha)", lord: "Shukra (Venus)", spouseTrait: "Artistic, graceful, deeply loyal with keen appreciation for luxury and stability.", postMarriageWealth: "Steady accumulation of liquid capital, jewelry, and luxury assets.", harmonyScore: 94 },
  { id: "2", name: "Mithuna (Gemini Navamsha)", lord: "Budha (Mercury)", spouseTrait: "Intellectually stimulating, witty, versatile communicator with strong business acumen.", postMarriageWealth: "Expansion in commerce, technology, trading, and media contracts.", harmonyScore: 86 },
  { id: "3", name: "Karka (Cancer Navamsha)", lord: "Chandra (Moon)", spouseTrait: "Deeply empathetic, nurturing, family-oriented with profound emotional devotion.", postMarriageWealth: "Spiritual peace and harmonious domestic stability in joint family.", harmonyScore: 92 },
  { id: "4", name: "Simha (Leo Navamsha)", lord: "Surya (Sun)", spouseTrait: "Regal, noble, dignified leadership aura with high societal reputation.", postMarriageWealth: "Public recognition, political connections, and societal authority.", harmonyScore: 90 },
  { id: "5", name: "Kanya (Virgo Navamsha)", lord: "Budha (Mercury)", spouseTrait: "Detail-oriented, analytical, health-conscious with practical organizational genius.", postMarriageWealth: "Financial discipline, debt clearance, and methodical career advancement.", harmonyScore: 85 },
  { id: "6", name: "Tula (Libra Navamsha)", lord: "Shukra (Venus)", spouseTrait: "Diplomatic, charming, romantic peacemaker with a keen sense of justice and aesthetics.", postMarriageWealth: "Rapid expansion in public partnerships and social influence.", harmonyScore: 96 },
  { id: "7", name: "Vrischika (Scorpio Navamsha)", lord: "Mangal / Ketu", spouseTrait: "Intense, deeply intuitive, secretive, transformative and fiercely protective.", postMarriageWealth: "Unearned wealth through inheritances, investments, and research.", harmonyScore: 84 },
  { id: "8", name: "Dhanu (Sagittarius Navamsha)", lord: "Guru (Jupiter)", spouseTrait: "Philosophical, highly educated, righteous, optimistic and spiritually inclined.", postMarriageWealth: "Supreme Bhagya expansion, international pilgrimages, and noble progeny.", harmonyScore: 95 },
  { id: "9", name: "Makara (Capricorn Navamsha)", lord: "Shani (Saturn)", spouseTrait: "Pragmatic, hardworking, patient, mature and committed to long-term legacy.", postMarriageWealth: "Enduring foundation building and exponential late-career prosperity.", harmonyScore: 89 },
  { id: "10", name: "Kumbha (Aquarius Navamsha)", lord: "Shani / Rahu", spouseTrait: "Visionary, humanitarian, unconventional thinker with broad social networks.", postMarriageWealth: "Breakthrough gains through global innovations and philanthropic ventures.", harmonyScore: 87 },
  { id: "11", name: "Meena (Pisces Navamsha)", lord: "Guru (Jupiter)", spouseTrait: "Compassionate, mystical, artistic, deeply spiritual and forgiving partner.", postMarriageWealth: "Serene spiritual liberation, overseas prosperity, and cosmic peace.", harmonyScore: 93 },
];

export default function NavamshaD9SoulmateBlueprint() {
  const [selectedNavamshaId, setSelectedNavamshaId] = useState("6"); // Libra default
  const [seekerName, setSeekerName] = useState("");
  const [isCalculating, setIsCalculating] = useState(false);
  const [blueprint, setBlueprint] = useState(NAVAMSHA_LAGNAS[6]);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculating(true);
    setTimeout(() => {
      const found = NAVAMSHA_LAGNAS.find((n) => n.id === selectedNavamshaId) || NAVAMSHA_LAGNAS[0];
      setBlueprint(found);
      setIsCalculating(false);
    }, 1800);
  };

  return (
    <div className="my-10 bg-gradient-to-b from-[#18090b] via-[#240d12] to-[#0f0407] border-2 border-[#d4af37] rounded-3xl p-6 sm:p-12 shadow-[0_20px_80px_rgba(212,175,55,0.3)] relative overflow-hidden text-center">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 bg-pink-500/15 rounded-full blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 w-96 h-96 bg-[#d4af37]/15 rounded-full blur-[140px]" />

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Header Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/15 border border-pink-400/40 text-pink-300 text-[11px] font-extrabold uppercase tracking-widest mb-3">
          <Heart className="w-3.5 h-3.5" />
          <span>Navamsha D9 Chart • Dharmamsha Soulmate Portal</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-bold font-serif text-white tracking-wide mb-2">
          ॥ नवांश (D9) विवाह एवं जीवनसाथी योग ॥
        </h2>
        <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto mb-8 font-light leading-relaxed">
          While the birth chart (D1) represents the tree of life, the Navamsha chart (D9) reveals its true fruit: your soulmate&apos;s character, post-marriage financial destiny, and spiritual harmony.
        </p>

        {/* Input Form */}
        <form onSubmit={handleCalculate} className="bg-black/75 border border-white/15 rounded-3xl p-5 sm:p-7 mb-8 text-left backdrop-blur-md shadow-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#d4af37] mb-2">
                Your Full Name
              </label>
              <input
                type="text"
                placeholder="e.g. Priya Sharma"
                value={seekerName}
                onChange={(e) => setSeekerName(e.target.value)}
                className="w-full bg-black/80 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#d4af37] mb-2">
                Select 7th House Navamsha Rashi
              </label>
              <select
                value={selectedNavamshaId}
                onChange={(e) => setSelectedNavamshaId(e.target.value)}
                className="w-full bg-black/80 border border-white/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
              >
                {NAVAMSHA_LAGNAS.map((n) => (
                  <option key={n.id} value={n.id} className="bg-[#1a1a1a]">
                    {n.name} (Lord: {n.lord})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={isCalculating}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#d4af37] via-[#e5c453] to-[#d4af37] text-black font-extrabold text-sm uppercase tracking-wider shadow-[0_4px_25px_rgba(212,175,55,0.35)] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-black" />
            <span>Reveal D9 Navamsha Soulmate Blueprint</span>
          </button>
        </form>

        {/* Loading Experience */}
        {isCalculating && (
          <VedicCalculationLoader
            title="Dividing 30-Degree Rashi into 9 Harmonious Navamshas"
            stages={[
              "Calculating 9-Fold Harmonic Divisions (Navamsha Varga Chart)...",
              "Aligning 7th House Kalatra Lord & Pushkara Navamsha Degrees...",
              "Evaluating Soulmate Spiritual Resonance & Post-Marriage Bhagya...",
              "Synthesizing Pandit Ji's Auspicious Marriage Timing & Remedies...",
            ]}
            estimatedSeconds={2}
          />
        )}

        {/* ── Navamsha D9 Result Card ── */}
        {blueprint && !isCalculating && (
          <div className="space-y-6 text-left animate-fadeIn">
            <div className="bg-gradient-to-br from-[#240e14] to-black/90 border-2 border-[#d4af37] rounded-3xl p-6 sm:p-9 shadow-2xl">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#d4af37]/30 mb-6">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37] font-mono">
                    Navamsha Blueprint for {seekerName || "Seeker"}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold font-serif text-white mt-1">
                    {blueprint.name}
                  </h3>
                  <p className="text-xs text-pink-300 font-semibold mt-0.5">
                    Governing Soulmate Lord: <strong>{blueprint.lord}</strong>
                  </p>
                </div>

                <div className="bg-pink-500/20 border border-pink-500/40 text-pink-300 px-4 py-2 rounded-2xl text-center">
                  <span className="text-[9px] uppercase tracking-widest block font-bold">D9 Harmony Score</span>
                  <span className="text-xl font-bold font-serif text-white">{blueprint.harmonyScore}%</span>
                </div>
              </div>

              {/* 2 Core Columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-xs sm:text-sm">
                <div className="bg-black/60 border border-white/10 rounded-2xl p-5">
                  <span className="text-[10px] uppercase text-gray-400 font-bold tracking-widest block mb-1">
                    Soulmate Character &amp; Temperament
                  </span>
                  <p className="text-gray-200 leading-relaxed font-light">{blueprint.spouseTrait}</p>
                </div>

                <div className="bg-black/60 border border-white/10 rounded-2xl p-5">
                  <span className="text-[10px] uppercase text-gray-400 font-bold tracking-widest block mb-1">
                    Post-Marriage Bhagya &amp; Wealth
                  </span>
                  <p className="text-amber-200 leading-relaxed font-light">{blueprint.postMarriageWealth}</p>
                </div>
              </div>

              {/* High-Ticket 1-on-1 Joint Family Navamsha Call */}
              <div className="bg-gradient-to-r from-[#38121c] via-[#1f090e] to-[#38121c] border-2 border-pink-500/40 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-xl">
                <div>
                  <h4 className="text-base font-serif font-bold text-white mb-1">
                    Book Joint Family Navamsha Kundli Call with Pandit Ji
                  </h4>
                  <p className="text-xs text-gray-300 leading-relaxed font-light">
                    Pandit Ji will evaluate both partners&apos; complete D1 &amp; D9 charts together on a 45-minute confidential WhatsApp consultation call, delivering a personalized Audio Dossier and Certified PDF.
                  </p>
                </div>

                <div className="flex flex-col gap-2 shrink-0 w-full sm:w-auto">
                  <Link
                    href="/request-guidance?service=marriage"
                    className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#e5c453] to-[#d4af37] text-black font-extrabold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 flex items-center justify-center gap-1.5 transition-all"
                  >
                    <span>Book Navamsha Call (₹1,501)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <DirectWhatsAppButton
                    variant="compact"
                    serviceName="Joint Family Navamsha Consultation"
                    price={1501}
                    className="w-full justify-center py-2 text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Sticky Action Bar */}
            <SanctifiedVerdictStickyBar
              serviceId="marriage"
              serviceName="Joint Family Navamsha Kundli Consultation"
              price={1501}
              badge="D9 Soulmate Reading Complete"
            />
          </div>
        )}
      </div>
    </div>
  );
}
