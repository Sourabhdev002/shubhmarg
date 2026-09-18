"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, Compass } from "lucide-react";
import Link from "next/link";
import DirectWhatsAppButton from "@/components/shared/DirectWhatsAppButton";

export interface HouseDetail {
  houseNumber: number;
  sanskritName: string;
  domain: string;
  rulingSign: string;
  karakaPlanet: string;
  status: "Highly Auspicious" | "Active Transition" | "Planetary Friction" | "Karmic Maturation";
  statusColor: string;
  significance: string;
  currentInsight: string;
  prescribedRemedy: string;
  serviceId: string;
  serviceName: string;
  price: number;
}

const DEFAULT_HOUSES: HouseDetail[] = [
  {
    houseNumber: 1,
    sanskritName: "तनु भाव (Tanu Bhava)",
    domain: "Self, Vitality & Physical Aura",
    rulingSign: "Mesha / Aries",
    karakaPlanet: "Surya (Sun)",
    status: "Highly Auspicious",
    statusColor: "text-emerald-400 border-emerald-500/40 bg-emerald-500/10",
    significance: "Governs core health, willpower, personal charisma, and foundational life direction.",
    currentInsight: "Your 1st house receives a favorable benefic aspect, expanding personal presence and decisiveness.",
    prescribedRemedy: "Offer morning Arghya to Surya Dev with copper vessel.",
    serviceId: "kundli",
    serviceName: "1st House Vitality & Life Direction Guidance",
    price: 1101,
  },
  {
    houseNumber: 2,
    sanskritName: "धन भाव (Dhana Bhava)",
    domain: "Accumulated Wealth & Speech",
    rulingSign: "Vrishabha / Taurus",
    karakaPlanet: "Guru (Jupiter)",
    status: "Active Transition",
    statusColor: "text-amber-400 border-amber-500/40 bg-amber-500/10",
    significance: "Governs liquid savings, family heritage, investments, and verbal diplomacy.",
    currentInsight: "Jupiter's transit activates liquid cash inflows, but Rahu's subtle shadow requires caution against impulsive capital allocation.",
    prescribedRemedy: "Kanakadhara Stotram recitation on Fridays + Gotra-energized Gomti Chakra.",
    serviceId: "annual-varshphal",
    serviceName: "2nd House Wealth & Capital Protection Dossier",
    price: 3100,
  },
  {
    houseNumber: 3,
    sanskritName: "सहज भाव (Sahaja Bhava)",
    domain: "Courage, Sibling Bonds & Travel",
    rulingSign: "Mithuna / Gemini",
    karakaPlanet: "Mangal (Mars)",
    status: "Highly Auspicious",
    statusColor: "text-emerald-400 border-emerald-500/40 bg-emerald-500/10",
    significance: "Governs initiative, commercial communication, younger siblings, and short ventures.",
    currentInsight: "Strong Mars placement bestows fearless execution. Ideal window for new marketing or digital initiatives.",
    prescribedRemedy: "Hanuman Chalisa recitation on Tuesdays.",
    serviceId: "vedic-guidance",
    serviceName: "3rd House Initiative Guidance",
    price: 501,
  },
  {
    houseNumber: 4,
    sanskritName: "मातृ / सुख भाव (Sukha Bhava)",
    domain: "Mother, Property, Vehicles & Mental Peace",
    rulingSign: "Karka / Cancer",
    karakaPlanet: "Chandra (Moon)",
    status: "Planetary Friction",
    statusColor: "text-red-400 border-red-500/40 bg-red-500/10",
    significance: "Governs real estate acquisitions, vehicles, mother's wellbeing, and inner emotional tranquility.",
    currentInsight: "Saturn's 10th aspect causes restlessness or property dispute delays. Immediate subtle neutralization advised.",
    prescribedRemedy: "Offer milk to Shivling on Mondays + Vastu realignment of North-East corner.",
    serviceId: "temple-puja",
    serviceName: "4th House Emotional & Property Shanti Puja",
    price: 2100,
  },
  {
    houseNumber: 5,
    sanskritName: "पुत्र / बुद्धि भाव (Putra Bhava)",
    domain: "Intellect, Progeny & Purva Punya",
    rulingSign: "Simha / Leo",
    karakaPlanet: "Guru (Jupiter)",
    status: "Highly Auspicious",
    statusColor: "text-emerald-400 border-emerald-500/40 bg-emerald-500/10",
    significance: "Governs creative genius, stock investments, children's growth, and past-life merits (*Purva Punya*).",
    currentInsight: "Purva Punya is highly active. Auspicious timing for expanding creative ventures and spiritual sadhana.",
    prescribedRemedy: "Chant Gayatri Maha Mantra 108 times at sunrise.",
    serviceId: "vedic-guidance",
    serviceName: "5th House Purva Punya Alignment",
    price: 501,
  },
  {
    houseNumber: 6,
    sanskritName: "रिपु / रोग भाव (Ripu Bhava)",
    domain: "Overcoming Enemies, Debts & Health Resistance",
    rulingSign: "Kanya / Virgo",
    karakaPlanet: "Mangal / Shani",
    status: "Active Transition",
    statusColor: "text-amber-400 border-amber-500/40 bg-amber-500/10",
    significance: "Governs legal disputes, competitive victories, debt clearance, and biological immunity.",
    currentInsight: "Planetary positions support complete victory over competitors, provided digestive health is protected.",
    prescribedRemedy: "Feed street animals on Saturdays + Maha Mrityunjaya Japa.",
    serviceId: "tatkal-express",
    serviceName: "6th House Conflict & Health Neutralization",
    price: 2499,
  },
  {
    houseNumber: 7,
    sanskritName: "कलत्र / जाया भाव (Kalatra Bhava)",
    domain: "Marriage, Life Partner & Business Partnerships",
    rulingSign: "Tula / Libra",
    karakaPlanet: "Shukra (Venus)",
    status: "Planetary Friction",
    statusColor: "text-red-400 border-red-500/40 bg-red-500/10",
    significance: "Governs marital bliss, spouse's personality, trade agreements, and foreign public alliances.",
    currentInsight: "Rahu-Ketu nodal axis exerts subtle friction on the 7th house, triggering avoidable miscommunication in intimate bonds.",
    prescribedRemedy: "Joint Gauri-Shankar worship + Gotra Shanti ritual at Kashi.",
    serviceId: "marriage",
    serviceName: "7th House Marriage & Relationship Kundli Guidance",
    price: 1501,
  },
  {
    houseNumber: 8,
    sanskritName: "आयु / रन्ध्र भाव (Ayu Bhava)",
    domain: "Longevity, Occult & Sudden Transformations",
    rulingSign: "Vrischika / Scorpio",
    karakaPlanet: "Shani (Saturn)",
    status: "Karmic Maturation",
    statusColor: "text-purple-400 border-purple-500/40 bg-purple-500/10",
    significance: "Governs inheritance, unearned wealth, longevity, metaphysical research, and sudden life pivots.",
    currentInsight: "Intense transformational energy. Ideal for deep ancestral meditation and shedding outmoded belief systems.",
    prescribedRemedy: "Light mustard oil Diya under Peepal tree on Saturday evenings.",
    serviceId: "karmic-debt",
    serviceName: "8th House Ancestral Karma Neutralization",
    price: 2100,
  },
  {
    houseNumber: 9,
    sanskritName: "भाग्य / धर्म भाव (Bhagya Bhava)",
    domain: "Supreme Luck, Dharma & Guru Blessings",
    rulingSign: "Dhanu / Sagittarius",
    karakaPlanet: "Guru (Jupiter)",
    status: "Highly Auspicious",
    statusColor: "text-[#ffd700] border-amber-500/40 bg-amber-500/10",
    significance: "The most auspicious Trikona house governing divine fortune, higher learning, pilgrimage, and father's grace.",
    currentInsight: "Bhagya house is radiant. Obstacles melt away when initiating righteous pilgrimages or philanthropic acts.",
    prescribedRemedy: "Respect elders, donate yellow fruits on Thursdays, wear consecrated yellow sapphire.",
    serviceId: "energized-gemstone",
    serviceName: "9th House Bhagya Gemstone & Ring Consecration",
    price: 5500,
  },
  {
    houseNumber: 10,
    sanskritName: "कर्म / राज्य भाव (Karma Bhava)",
    domain: "Career Peak, Authority & Public Status",
    rulingSign: "Makara / Capricorn",
    karakaPlanet: "Surya / Budha / Shani",
    status: "Active Transition",
    statusColor: "text-amber-400 border-amber-500/40 bg-amber-500/10",
    significance: "Governs professional reputation, executive promotions, business scaling, and societal standing.",
    currentInsight: "You are entering a 45-day career pivot window. New responsibilities require razor-sharp strategic alignment.",
    prescribedRemedy: "Surya Ashtakam at dawn + Copper Aditya Yantra at workplace.",
    serviceId: "tatkal-express",
    serviceName: "10th House Executive Career Guidance",
    price: 2499,
  },
  {
    houseNumber: 11,
    sanskritName: "लाभ / आय भाव (Labha Bhava)",
    domain: "Income Streams, Large Gains & High Network",
    rulingSign: "Kumbha / Aquarius",
    karakaPlanet: "Guru (Jupiter)",
    status: "Highly Auspicious",
    statusColor: "text-emerald-400 border-emerald-500/40 bg-emerald-500/10",
    significance: "Governs multiple revenue streams, realization of long-held desires, and influential social circles.",
    currentInsight: "Labha lord is exceptionally well-placed, opening doors for lucrative partnership contracts.",
    prescribedRemedy: "Lakshmi Kubera Mantra chanting on Friday evenings.",
    serviceId: "business-retainer",
    serviceName: "11th House Corporate & Wealth Retainer",
    price: 11000,
  },
  {
    houseNumber: 12,
    sanskritName: "मोक्ष / व्यय भाव (Moksha Bhava)",
    domain: "Foreign Lands, Spiritual Liberation & Subconscious Rest",
    rulingSign: "Meena / Pisces",
    karakaPlanet: "Ketu / Shani",
    status: "Karmic Maturation",
    statusColor: "text-purple-400 border-purple-500/40 bg-purple-500/10",
    significance: "Governs international relocation, meditation, hospital/expenses management, and spiritual Moksha.",
    currentInsight: "High resonance with overseas opportunities and spiritual solitude. Unnecessary expenditures must be monitored.",
    prescribedRemedy: "Meditation before sleep + Saturday charity to hospitals / elderly homes.",
    serviceId: "voice-dossier",
    serviceName: "12th House Foreign Settlement & Spoken Dossier",
    price: 1999,
  },
];

export default function KundliDiamondXRay() {
  const [selectedHouseNumber, setSelectedHouseNumber] = useState<number>(1);
  const selectedHouse = DEFAULT_HOUSES.find((h) => h.houseNumber === selectedHouseNumber) || DEFAULT_HOUSES[0];

  return (
    <div className="my-10 bg-gradient-to-b from-[#180d09] via-[#24110a] to-[#100604] border-2 border-[#d4af37] rounded-3xl p-6 sm:p-10 shadow-[0_20px_80px_rgba(212,175,55,0.25)] relative overflow-hidden">
      {/* Background glow */}
      <div className="pointer-events-none absolute -right-24 -top-24 w-80 h-80 bg-[#d4af37]/15 rounded-full blur-[110px]" />
      <div className="pointer-events-none absolute -left-24 -bottom-24 w-80 h-80 bg-[#72232b]/25 rounded-full blur-[110px]" />

      {/* Header */}
      <div className="relative z-10 text-center mb-8 pb-6 border-b border-white/10">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#d4af37] text-[10px] font-extrabold uppercase tracking-widest mb-3">
          <Compass className="w-3.5 h-3.5" />
          <span>Vedic Diamond Kundli Chart X-Ray</span>
        </div>
        <h3 className="text-2xl sm:text-4xl font-bold font-serif text-white tracking-wide">
          Interactive 12-House Cosmic Heatmap
        </h3>
        <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto mt-1 font-light">
          Tap any of the 12 Bhavas (houses) in the sacred North Indian Diamond Kundli to inspect planetary strengths, active transit pressures, and prescribed Gotra remedies.
        </p>
      </div>

      {/* ── 12-House Interactive Selector Grid ── */}
      <div className="relative z-10 grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2.5 mb-8">
        {DEFAULT_HOUSES.map((house) => {
          const isSelected = house.houseNumber === selectedHouseNumber;
          return (
            <button
              key={house.houseNumber}
              type="button"
              onClick={() => setSelectedHouseNumber(house.houseNumber)}
              className={`rounded-2xl p-3 text-center transition-all duration-300 relative border flex flex-col items-center justify-between cursor-pointer ${
                isSelected
                  ? "bg-gradient-to-b from-[#3a1b0d] to-[#200d05] border-2 border-[#d4af37] shadow-[0_0_20px_rgba(212,175,55,0.5)] scale-105"
                  : "bg-black/60 hover:bg-black/80 border-white/10 text-gray-400"
              }`}
            >
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37] font-mono">
                House {house.houseNumber}
              </span>
              <span className="text-xs font-serif font-bold text-white my-0.5 truncate w-full">
                {house.sanskritName.split(" ")[0]}
              </span>
              <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full border truncate w-full ${house.statusColor}`}>
                {house.status}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Selected House Deep X-Ray Analysis Panel ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedHouse.houseNumber}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="relative z-10 bg-gradient-to-r from-black/85 via-[#220e08]/90 to-black/85 border-2 border-[#d4af37]/60 rounded-3xl p-6 sm:p-8 shadow-2xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left X-Ray Inspection Details */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#d4af37]/30">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#d4af37] text-black font-bold text-xs flex items-center justify-center font-mono">
                      {selectedHouse.houseNumber}
                    </span>
                    <h4 className="text-xl sm:text-2xl font-bold font-serif text-white">
                      {selectedHouse.sanskritName} • {selectedHouse.domain}
                    </h4>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Ruling Sign: <strong className="text-gray-200">{selectedHouse.rulingSign}</strong> • Karaka Planet: <strong className="text-[#d4af37]">{selectedHouse.karakaPlanet}</strong>
                  </p>
                </div>

                <div className={`px-3 py-1 rounded-full text-xs font-bold border ${selectedHouse.statusColor}`}>
                  {selectedHouse.status}
                </div>
              </div>

              {/* Core Significance & Insight */}
              <div className="space-y-2 text-xs sm:text-sm text-gray-300">
                <p className="leading-relaxed">
                  <strong className="text-white">Domain Focus:</strong> {selectedHouse.significance}
                </p>
                <div className="p-4 rounded-2xl bg-black/60 border border-[#d4af37]/20 text-xs text-amber-200">
                  <strong className="text-[#d4af37] uppercase tracking-wider block text-[10px] mb-1">
                    ⚡ Live Planetary Transit X-Ray Insight:
                  </strong>
                  <p className="leading-relaxed">{selectedHouse.currentInsight}</p>
                </div>
              </div>

              {/* Prescribed Remedy */}
              <div className="pt-1">
                <span className="text-[10px] uppercase tracking-widest text-[#d4af37] font-bold block mb-1">
                  Prescribed Vedic House Remedy:
                </span>
                <p className="text-xs font-semibold text-emerald-300 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{selectedHouse.prescribedRemedy}</span>
                </p>
              </div>
            </div>

            {/* Right High-Ticket House Neutralization Action */}
            <div className="lg:col-span-4 bg-gradient-to-b from-[#2a1309] to-black/80 border border-[#d4af37]/50 rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-xl">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#d4af37] font-bold block">
                  Pandit Ji Consecration
                </span>
                <h5 className="text-base font-serif font-bold text-white mt-1">
                  Neutralize House #{selectedHouse.houseNumber} Friction
                </h5>
                <p className="text-xs text-gray-300 mt-1">
                  Pandit Ji analyzes your D9 Navamsha chart and energizes your personal Gotra Beej Mantra for this house.
                </p>
              </div>

              <div className="space-y-2.5">
                <Link
                  href={`/request-guidance?service=${selectedHouse.serviceId}`}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#e5c453] to-[#d4af37] text-black font-extrabold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <span>Unlock House Guidance (₹{selectedHouse.price})</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <DirectWhatsAppButton
                  variant="compact"
                  serviceName={selectedHouse.serviceName}
                  price={selectedHouse.price}
                  className="w-full justify-center py-2 text-xs"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
