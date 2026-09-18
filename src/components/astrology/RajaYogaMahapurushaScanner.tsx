"use client";

import React, { useState } from "react";
import { Crown, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import DirectWhatsAppButton from "@/components/shared/DirectWhatsAppButton";
import VedicCalculationLoader from "@/components/shared/VedicCalculationLoader";
import SanctifiedVerdictStickyBar from "@/components/shared/SanctifiedVerdictStickyBar";

interface RajaYoga {
  id: string;
  name: string;
  sanskritName: string;
  type: string;
  governingPlanet: string;
  peakAge: string;
  powerDescription: string;
  manifestationScope: string;
  remedyAction: string;
}

const RAJAYOGAS: RajaYoga[] = [
  {
    id: "hamsa",
    name: "Hamsa Mahapurusha Yoga (Jupiter Divine Grace)",
    sanskritName: "हंस महापुरुष योग",
    type: "Pancha Mahapurusha (Kendra Jupiter)",
    governingPlanet: "Guru (Jupiter in Cancer, Sagittarius, or Pisces)",
    peakAge: "Age 32, 40, & 48",
    powerDescription: "Endows the native with supreme spiritual wisdom, ethical authority, massive societal respect, and unshakeable philanthropic prosperity.",
    manifestationScope: "High judicial standing, advisory councils, educational institutions, and noble progeny.",
    remedyAction: "Wear 5-Mukhi Rudraksha or Natural Yellow Sapphire (Pukhraj); respect gurus and teachers on Thursdays.",
  },
  {
    id: "malavya",
    name: "Malavya Mahapurusha Yoga (Venusian Luxury & Magnetism)",
    sanskritName: "मालव्य महापुरुष योग",
    type: "Pancha Mahapurusha (Kendra Venus)",
    governingPlanet: "Shukra (Venus in Taurus, Libra, or Pisces)",
    peakAge: "Age 25, 33, & 42",
    powerDescription: "Bestows supreme artistic taste, charismatic magnetism, vehicle luxury, graceful marital harmony, and global lifestyle elegance.",
    manifestationScope: "Creative arts, luxury hospitality, cosmetics, fashion, high-end real estate, and diplomacy.",
    remedyAction: "Offer white fragrant flowers at Lakshmi temple on Fridays; wear silver or natural Diamond/White Sapphire.",
  },
  {
    id: "ruchaka",
    name: "Ruchaka Mahapurusha Yoga (Martial Executive Valor)",
    sanskritName: "रुचक महापुरुष योग",
    type: "Pancha Mahapurusha (Kendra Mars)",
    governingPlanet: "Mangal (Mars in Aries, Scorpio, or Capricorn)",
    peakAge: "Age 28, 36, & 44",
    powerDescription: "Bestows indomitable physical courage, strategic leadership, fearlessness in high-stakes competition, and decisive executive authority.",
    manifestationScope: "Defense leadership, engineering empires, real estate development, and breakthrough startups.",
    remedyAction: "Chant Hanuman Chalisa every Tuesday; donate blood or sweet jaggery to laborers.",
  },
  {
    id: "bhadra",
    name: "Bhadra Mahapurusha Yoga (Mercury Intellectual Genius)",
    sanskritName: "भद्र महापुरुष योग",
    type: "Pancha Mahapurusha (Kendra Mercury)",
    governingPlanet: "Budha (Mercury in Gemini or Virgo)",
    peakAge: "Age 24, 32, & 40",
    powerDescription: "Blesses the native with razor-sharp analytical genius, eloquent oratory, mathematical brilliance, and unmatched trading foresight.",
    manifestationScope: "Financial markets, technology architecture, publishing empires, diplomacy, and legal strategy.",
    remedyAction: "Feed green grass or spinach to cows on Wednesdays; wear Natural Emerald (Panna).",
  },
  {
    id: "sasa",
    name: "Sasa Mahapurusha Yoga (Saturnian Enduring Legacy)",
    sanskritName: "शश महापुरुष योग",
    type: "Pancha Mahapurusha (Kendra Saturn)",
    governingPlanet: "Shani (Saturn in Libra, Capricorn, or Aquarius)",
    peakAge: "Age 36, 42, & 54",
    powerDescription: "Bestows monumental patience, grassroots mass leadership, enduring institutional wealth, and supreme societal governance.",
    manifestationScope: "Political leadership, industrial empires, mining, mass organizations, and enduring legacy foundations.",
    remedyAction: "Serve underprivileged elders on Saturdays; light a sesame oil lamp under a sacred Peepal tree.",
  },
  {
    id: "gajakesari",
    name: "Gaja-Kesari Raja Yoga (Elephant-Lion Supreme Stature)",
    sanskritName: "गजकेसरी राजयोग",
    type: "Kendra Chandra-Guru Alignment",
    governingPlanet: "Jupiter & Moon in Mutual Kendra",
    peakAge: "Age 28, 35, & 45",
    powerDescription: "Creates an aura of invincible dignity, lifelong financial insulation from ruin, high reputation, and magnetic speech.",
    manifestationScope: "Societal leadership, banking institutions, global consulting, and unbroken family wealth.",
    remedyAction: "Maintain pure vegetarian diet on Ekadashis; recite Sri Vishnu Sahasranama with devotion.",
  },
];

export default function RajaYogaMahapurushaScanner() {
  const [selectedYogaId, setSelectedYogaId] = useState("hamsa");
  const [seekerName, setSeekerName] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [activeYoga, setActiveYoga] = useState(RAJAYOGAS[0]);

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    setIsScanning(true);
    setTimeout(() => {
      const found = RAJAYOGAS.find((y) => y.id === selectedYogaId) || RAJAYOGAS[0];
      setActiveYoga(found);
      setIsScanning(false);
    }, 1800);
  };

  return (
    <div className="my-10 bg-gradient-to-b from-[#1b0e0a] via-[#26120c] to-[#0f0402] border-2 border-[#d4af37] rounded-3xl p-6 sm:p-12 shadow-[0_20px_80px_rgba(212,175,55,0.35)] relative overflow-hidden text-center">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 bg-[#ffd700]/15 rounded-full blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 w-96 h-96 bg-red-600/15 rounded-full blur-[140px]" />

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Header Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#d4af37] text-[11px] font-extrabold uppercase tracking-widest mb-3">
          <Crown className="w-3.5 h-3.5 text-amber-300" />
          <span>Vedic Planetary Royalty &amp; Sovereign Authority</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-bold font-serif text-white tracking-wide mb-2">
          ॥ पंच महापुरुष एवं राजयोग महास्कैनर ॥
        </h2>
        <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto mb-8 font-light leading-relaxed">
          In classical Parashari astrology, certain planetary alignments elevate a soul to sovereign leadership, immense wealth, and societal legacy. Scan your birth chart for active Raja Yogas.
        </p>

        {/* Input Form */}
        <form onSubmit={handleScan} className="bg-black/75 border border-white/15 rounded-3xl p-5 sm:p-7 mb-8 text-left backdrop-blur-xl shadow-2xl space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#d4af37] mb-1.5">
                Your Full Name
              </label>
              <input
                type="text"
                placeholder="e.g. Vikramaditya Singh"
                value={seekerName}
                onChange={(e) => setSeekerName(e.target.value)}
                className="w-full bg-black/80 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#d4af37] mb-1.5">
                Select Raja Yoga to Inspect
              </label>
              <select
                value={selectedYogaId}
                onChange={(e) => setSelectedYogaId(e.target.value)}
                className="w-full bg-black/80 border border-white/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
              >
                {RAJAYOGAS.map((y) => (
                  <option key={y.id} value={y.id} className="bg-[#1a1a1a]">
                    {y.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={isScanning}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#d4af37] via-[#ffd700] to-[#d4af37] text-black font-extrabold text-sm uppercase tracking-wider shadow-[0_4px_25px_rgba(212,175,55,0.4)] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-black" />
            <span>Scan Chart for Active Raja Yogas</span>
          </button>
        </form>

        {/* Loading Experience */}
        {isScanning && (
          <VedicCalculationLoader
            title="Scanning 12 Bhavas for Sovereign Planetary Combinations"
            stages={[
              "Evaluating Kendra (1, 4, 7, 10) & Trikona (1, 5, 9) Planetary Strengths...",
              "Analyzing Exaltation (Uchha) & Own Sign (Swakshetra) Digbala Degrees...",
              "Calculating Exact Peak Manifestation Age & Dasha Sub-Period Triggers...",
              "Synthesizing Pandit Ji's Auspicious Raja Yoga Awakening Sadhana...",
            ]}
            estimatedSeconds={2}
          />
        )}

        {/* ── Raja Yoga Result Card ── */}
        {activeYoga && !isScanning && (
          <div className="space-y-6 text-left animate-fadeIn">
            <div className="bg-gradient-to-br from-[#241108] to-black/95 border-2 border-[#d4af37] rounded-3xl p-6 sm:p-9 shadow-2xl relative">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#d4af37]/30 mb-6">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37] font-mono">
                    Raja Yoga Manifestation for {seekerName || "Seeker"}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold font-serif text-white mt-1">
                    {activeYoga.name}
                  </h3>
                  <span className="text-xs text-amber-200/90 font-devanagari font-bold">
                    ॥ {activeYoga.sanskritName} ॥
                  </span>
                </div>

                <div className="px-4 py-2 rounded-2xl bg-amber-500/20 border border-amber-400/40 text-amber-300 text-center">
                  <span className="text-[9px] uppercase font-bold tracking-widest block">Peak Manifestation</span>
                  <span className="text-sm font-bold text-white">{activeYoga.peakAge}</span>
                </div>
              </div>

              {/* 3 Detail Boxes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-xs sm:text-sm">
                <div className="bg-black/60 border border-white/10 rounded-2xl p-5">
                  <span className="text-[10px] uppercase text-gray-400 font-bold tracking-widest block mb-1">
                    Planetary Power &amp; Alignment
                  </span>
                  <p className="text-white font-semibold mb-2">{activeYoga.governingPlanet}</p>
                  <p className="text-gray-300 font-light leading-relaxed">{activeYoga.powerDescription}</p>
                </div>

                <div className="bg-black/60 border border-white/10 rounded-2xl p-5">
                  <span className="text-[10px] uppercase text-gray-400 font-bold tracking-widest block mb-1">
                    Real-World Sovereign Manifestation
                  </span>
                  <p className="text-amber-200 font-medium mb-3">{activeYoga.manifestationScope}</p>
                  <span className="text-[10px] uppercase text-emerald-400 font-bold tracking-widest block mb-1">
                    Awakening Sadhana &amp; Gemstone
                  </span>
                  <p className="text-gray-300 font-light text-xs">{activeYoga.remedyAction}</p>
                </div>
              </div>

              {/* High-Ticket Raja Yoga Activation Consultation Bridge */}
              <div className="bg-gradient-to-r from-[#38160a] via-[#1f0904] to-[#38160a] border-2 border-amber-500/50 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-xl">
                <div>
                  <h4 className="text-base font-serif font-bold text-white mb-1">
                    Unlock 1-on-1 Raja Yoga Awakening Call with Pandit Ji
                  </h4>
                  <p className="text-xs text-gray-300 leading-relaxed font-light">
                    Pandit Ji will evaluate your exact planetary degrees, Mahadasha timeline, and prescribe an energized gemstone or yantra to activate your chart&apos;s dormant royal yoga.
                  </p>
                </div>

                <div className="flex flex-col gap-2 shrink-0 w-full sm:w-auto">
                  <Link
                    href="/request-guidance?service=deep-kundli"
                    className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#ffd700] to-[#d4af37] text-black font-extrabold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 flex items-center justify-center gap-1.5 transition-all"
                  >
                    <span>Activate Raja Yoga (₹1,501)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <DirectWhatsAppButton
                    variant="compact"
                    serviceName={`Raja Yoga Activation for ${activeYoga.name}`}
                    price={1501}
                    className="w-full justify-center py-2 text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Sticky Action Bar */}
            <SanctifiedVerdictStickyBar
              serviceId="deep-kundli"
              serviceName={`Raja Yoga Activation (${activeYoga.name})`}
              price={1501}
              badge="Raja Yoga Detected"
            />
          </div>
        )}
      </div>
    </div>
  );
}
