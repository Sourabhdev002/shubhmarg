"use client";

import React, { useState } from "react";
import { Compass, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import SanctifiedVerdictStickyBar from "@/components/shared/SanctifiedVerdictStickyBar";

interface VastuZone {
  id: string;
  name: string;
  sanskrit: string;
  direction: string;
  element: string;
  deity: string;
  governs: string;
  idealUsage: string;
  doshaWarning: string;
  metallicRemedy: string;
}

const VASTU_ZONES: VastuZone[] = [
  { id: "ne", name: "North-East (Ishanya)", sanskrit: "ईशान्य", direction: "NE (45°)", element: "Water / Ether (Jal/Akash)", deity: "Lord Shiva & Brihaspati", governs: "Clarity of Mind, Spiritual Grace, Vision & Health", idealUsage: "Mandir / Meditation Room / Clean open space", doshaWarning: "Toilet or heavy junk here creates severe brain fog, neurological stress, and financial stagnation.", metallicRemedy: "Install Brass/Copper Pyramid or Silver Ganga Jal Kalash" },
  { id: "n", name: "North (Kuber Sthan)", sanskrit: "उत्तर", direction: "N (0°)", element: "Water (Jal)", deity: "Lord Kuber & Mercury", governs: "Cash Inflows, Career Growth & Client Opportunities", idealUsage: "Cashbox / Living Room / Main Entrance", doshaWarning: "Kitchen or clutter in North blocks new business leads and delays client payments.", metallicRemedy: "Place Kuber Yantra or Green aventurine plant" },
  { id: "e", name: "East (Indra Sthan)", sanskrit: "पूर्व", direction: "E (90°)", element: "Air (Vayu)", deity: "Surya Deva & Indra", governs: "Social Connections, Networking & Societal Reputation", idealUsage: "Balcony / Main Entry / Social Lounge", doshaWarning: "Blocked East direction prevents promotion and creates isolation from influential circles.", metallicRemedy: "Install Surya Brass Wall Plate or Crystal Chandelier" },
  { id: "se", name: "South-East (Agneya)", sanskrit: "आग्नेय", direction: "SE (135°)", element: "Fire (Agni)", deity: "Agni Deva & Venus", governs: "Cash Liquidity, Digestive Health, Passion & Drive", idealUsage: "Kitchen / Gas Burner / Electrical Hub", doshaWarning: "Water tank or bedroom in SE causes sudden cash burn, legal expenses, and digestive ailments.", metallicRemedy: "Red Jasper stone or Agni Copper Swastika" },
  { id: "s", name: "South (Yama Sthan)", sanskrit: "दक्षिण", direction: "S (180°)", element: "Fire/Earth", deity: "Lord Yama & Mars", governs: "Fame, Restful Sleep, Brand Recognition & Legal Success", idealUsage: "Bedroom / Heavy Storage", doshaWarning: "Water underground in South ruins public reputation and causes insomnia.", metallicRemedy: "Copper Helix or Red Coral Pyramid" },
  { id: "sw", name: "South-West (Nairritya)", sanskrit: "नैर्ऋत्य", direction: "SW (225°)", element: "Earth (Prithvi)", deity: "Nirriti & Rahu", governs: "Stability, Master Authority, Relationship Foundation & Skill", idealUsage: "Master Bedroom / Heavy Safe / Head of Family", doshaWarning: "Cut, slope, or toilet in SW causes severe divorce risks and unstable family hierarchy.", metallicRemedy: "Heavy Brass Helix or Yellow Jaisalmer Stone" },
  { id: "w", name: "West (Varuna Sthan)", sanskrit: "पश्चिम", direction: "W (270°)", element: "Space (Akash)", deity: "Lord Varuna & Saturn", governs: "Gains, Profit Realization, Business Margins & Karma", idealUsage: "Dining Room / Study / Profit Ledger Safe", doshaWarning: "Entrance in low-energy West zones causes work without financial reward.", metallicRemedy: "Silver/Brass Helix or Shani Rahu Yantra" },
  { id: "nw", name: "North-West (Vayavya)", sanskrit: "वायव्य", direction: "NW (315°)", element: "Air (Vayu)", deity: "Vayu Deva & Moon", governs: "Support from Banks, Friends, Travel & Foreign Deals", idealUsage: "Guest Room / Dispatch Goods / Finished Stock", doshaWarning: "Cut in NW causes abandonment by banking partners and loneliness during crises.", metallicRemedy: "White Marble sphere or Vayu Brass Pyramid" },
];

export default function Interactive16ZoneVastuRadar() {
  const [selectedZoneIndex, setSelectedZoneIndex] = useState(0);
  const activeZone = VASTU_ZONES[selectedZoneIndex];

  return (
    <div className="my-10 bg-gradient-to-b from-[#180c09] via-[#240f0c] to-[#0d0403] border-2 border-[#d4af37] rounded-3xl p-6 sm:p-12 shadow-[0_20px_80px_rgba(212,175,55,0.35)] relative overflow-hidden text-center">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 bg-blue-600/15 rounded-full blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 w-96 h-96 bg-[#d4af37]/15 rounded-full blur-[140px]" />

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Header Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#d4af37] text-[11px] font-extrabold uppercase tracking-widest mb-3">
          <Compass className="w-3.5 h-3.5 text-amber-300" />
          <span>Vedic Architecture &amp; Spatial Energy Balance</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-bold font-serif text-white tracking-wide mb-2">
          ॥ १६ दिशा वैदिक वास्तु ऊर्जा रडार ॥
        </h2>
        <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto mb-8 font-light leading-relaxed">
          Based on the classical *Mayamatam* and *Vishwakarma Prakash*, explore the 16 cardinal energy fields of your home or office to unlock wealth, restful sleep, and mental clarity.
        </p>

        {/* ── Interactive 8 Cardinal Direction Selector ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-8">
          {VASTU_ZONES.map((zone, idx) => {
            const isSelected = selectedZoneIndex === idx;
            return (
              <button
                key={zone.id}
                type="button"
                onClick={() => setSelectedZoneIndex(idx)}
                className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "bg-gradient-to-b from-[#3a180b] to-[#1c0a05] border-2 border-[#d4af37] shadow-[0_0_20px_rgba(212,175,55,0.4)] scale-105"
                    : "bg-black/60 hover:bg-black/85 border-white/10 text-gray-400"
                }`}
              >
                <span className="text-base font-devanagari font-bold text-[#d4af37] block">
                  {zone.sanskrit}
                </span>
                <span className="text-[11px] font-bold text-white block mt-1">
                  {zone.name.split(" ")[0]} ({zone.direction.split(" ")[0]})
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Detailed Zone Diagnostic Stage ── */}
        <div className="bg-gradient-to-br from-[#241108] to-black/95 border-2 border-[#d4af37] rounded-3xl p-6 sm:p-9 shadow-2xl relative text-left">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#d4af37]/30 mb-6">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37] font-mono">
                Zone Direction: {activeZone.direction} • Element: {activeZone.element}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-serif text-white mt-0.5">
                {activeZone.name}
              </h3>
              <p className="text-xs text-amber-200/90 font-medium mt-0.5">
                Governing Deity &amp; Cosmic Planet: <strong>{activeZone.deity}</strong>
              </p>
            </div>

            <div className="px-4 py-2 rounded-2xl bg-amber-500/20 border border-amber-400/40 text-amber-300 text-center">
              <span className="text-[9px] uppercase font-bold tracking-widest block">Cosmic Domain</span>
              <span className="text-xs font-bold text-white">{activeZone.governs}</span>
            </div>
          </div>

          {/* 2 Detailed Insight Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-xs">
            <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-2xl p-4">
              <span className="text-[10px] uppercase text-emerald-400 font-bold tracking-widest block mb-1">
                ✅ Auspicious Usage
              </span>
              <p className="text-white font-medium mb-1">{activeZone.idealUsage}</p>
              <p className="text-gray-300 leading-relaxed font-light">
                Maintains uninterrupted high-frequency energy flow across the entire premises.
              </p>
            </div>

            <div className="bg-red-950/40 border border-red-500/30 rounded-2xl p-4">
              <span className="text-[10px] uppercase text-red-400 font-bold tracking-widest block mb-1">
                ⚠️ Dosha &amp; Energy Blockage Warning
              </span>
              <p className="text-gray-200 leading-relaxed font-light">{activeZone.doshaWarning}</p>
            </div>
          </div>

          {/* Non-Destructive Metallic Remedy */}
          <div className="p-4 rounded-2xl bg-black/60 border border-[#d4af37]/30 mb-6 flex items-start gap-3 text-xs">
            <Sparkles className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#d4af37] block mb-0.5">
                Non-Destructive Vedic Energy Neutralizer
              </span>
              <p className="text-gray-200 font-medium">{activeZone.metallicRemedy}</p>
            </div>
          </div>

          {/* High-Ticket Remote Floor Plan Audit Bridge */}
          <div className="bg-gradient-to-r from-[#38160a] via-[#1f0904] to-[#38160a] border-2 border-amber-500/50 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-xl">
            <div>
              <h4 className="text-base font-serif font-bold text-white mb-1">
                Book Complete Floor-Plan Vastu Consecration Audit
              </h4>
              <p className="text-xs text-gray-300 leading-relaxed font-light">
                Send your home/office architectural layout on WhatsApp. Pandit Ji will overlay the 16-zone Shakti Chakra and prescribe zero-breakage metallic remedies.
              </p>
            </div>

            <div className="flex flex-col gap-2 shrink-0 w-full sm:w-auto">
              <Link
                href="/request-guidance?service=vastu"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#ffd700] to-[#d4af37] text-black font-extrabold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 flex items-center justify-center gap-1.5 transition-all"
              >
                <span>Book Vastu Audit (₹3,100)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Sticky Action Bar */}
        <SanctifiedVerdictStickyBar
          serviceId="vastu"
          serviceName={`16-Zone Vastu Energy Audit (${activeZone.name.split(" ")[0]})`}
          price={3100}
          badge="Vastu Energy Calibrated"
        />
      </div>
    </div>
  );
}
