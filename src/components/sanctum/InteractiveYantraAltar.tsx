"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import SanctifiedVerdictStickyBar from "@/components/shared/SanctifiedVerdictStickyBar";

interface SacredYantra {
  id: string;
  name: string;
  sanskritName: string;
  purpose: string;
  beejMantra: string;
  geometry: string;
  benefits: string[];
}

const SACRED_YANTRAS: SacredYantra[] = [
  {
    id: "sri-yantra",
    name: "Maha Meru Sri Yantra (Supreme Abundance)",
    sanskritName: "श्री यन्त्रम्",
    purpose: "Cosmic Wealth, Mahalakshmi Magnet & Aura Amplification",
    beejMantra: "ॐ श्रीं ह्रीं क्लीं श्रीं कमले कमलालये प्रसीद प्रसीद श्रीं ह्रीं श्रीं ॐ महालक्ष्म्यै नमः॥",
    geometry: "9 Interlocking Triangles • 43 Sub-Triangles • Bindu Point",
    benefits: ["Radiates immense wealth and removes ancestral financial blockages", "Creates a powerful energetic shield over the entire home", "Aligns household Vastu with divine cosmic geometry"],
  },
  {
    id: "kuber-yantra",
    name: "Lord Kuber Yantra (Treasury & Cashflow)",
    sanskritName: "कुबेर यन्त्रम्",
    purpose: "Cash Liquidity, Business Profits & Wealth Retention",
    beejMantra: "ॐ यक्षाय कुबेराय वैश्रवणाय धनधान्याधिपतये धनधान्यसमृद्धिं मे देहि दापय स्वाहा॥",
    geometry: "72-Grid Magic Square Matrix of Supreme Inflows",
    benefits: ["Unlocks stalled payments and accelerating trade profits", "Prevents unnecessary financial drains and wasteful expenditure", "Essential for office cashboxes and home treasuries"],
  },
  {
    id: "surya-yantra",
    name: "Surya Aditya Yantra (Executive Power & Vitality)",
    sanskritName: "सूर्य यन्त्रम्",
    purpose: "Societal Authority, Government Success & Fatherly Grace",
    beejMantra: "ॐ ह्रां ह्रीं ह्रौं सः सूर्याय नमः॥ ॐ घृणिः सूर्याय नमः॥",
    geometry: "Solar Wheel with 12 Petals of the Adityas",
    benefits: ["Strengthens weak Sun placements in the 1st or 10th house", "Elevates executive reputation and promotion prospects", "Bestows unshakeable confidence and biological vitality"],
  },
  {
    id: "mrityunjaya-yantra",
    name: "Maha Mrityunjaya Yantra (Kavach & Health Shield)",
    sanskritName: "महामृत्युंजय यन्त्रम्",
    purpose: "Cellular Healing, Accident Protection & Long Life",
    beejMantra: "ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय माऽमृतात्॥",
    geometry: "8-Petal Lotus of Lord Shiva with Protective Circle",
    benefits: ["Dissolves severe health anxieties and chronic ailments", "Protects travelers against untoward incidents", "Calms Rahu-Ketu psychic disturbances"],
  },
];

export default function InteractiveYantraAltar() {
  const [selectedYantraIndex, setSelectedYantraIndex] = useState(0);
  const activeYantra = SACRED_YANTRAS[selectedYantraIndex];
  const [isEnergized, setIsEnergized] = useState(false);
  const [mantraChants, setMantraChants] = useState(0);

  const handleEnergize = () => {
    setMantraChants((prev) => prev + 1);
    setIsEnergized(true);
  };

  return (
    <div className="my-10 bg-gradient-to-b from-[#1c0c08] via-[#260f0a] to-[#0d0402] border-2 border-[#d4af37] rounded-3xl p-6 sm:p-12 shadow-[0_20px_80px_rgba(212,175,55,0.35)] relative overflow-hidden text-center">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 bg-[#d4af37]/20 rounded-full blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 w-96 h-96 bg-red-600/20 rounded-full blur-[140px]" />

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Header Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#d4af37] text-[11px] font-extrabold uppercase tracking-widest mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Vedic Sacred Geometry &amp; Prana Pratishtha</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-bold font-serif text-white tracking-wide mb-2">
          24K Gold Consecrated Yantra Altar
        </h2>
        <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto mb-8 font-light leading-relaxed">
          Yantras are the physical cosmic antennas of Vedic deities. Tap the central Bindu point to activate sacred Beej Mantras and order your personal 24K Gold-Foil Pocket Yantra.
        </p>

        {/* ── 4 Yantra Selector Tabs ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-8">
          {SACRED_YANTRAS.map((yantra, idx) => {
            const isSelected = selectedYantraIndex === idx;
            return (
              <button
                key={yantra.id}
                type="button"
                onClick={() => {
                  setSelectedYantraIndex(idx);
                  setIsEnergized(false);
                }}
                className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "bg-gradient-to-b from-[#3a180b] to-[#1c0a05] border-2 border-[#d4af37] shadow-[0_0_20px_rgba(212,175,55,0.5)] scale-105"
                    : "bg-black/60 hover:bg-black/85 border-white/10 text-gray-400"
                }`}
              >
                <span className="text-base font-devanagari font-bold text-[#d4af37] block">
                  {yantra.sanskritName}
                </span>
                <span className="text-[11px] font-bold text-white block mt-1 truncate">
                  {yantra.name.split(" ")[0]} {yantra.name.split(" ")[1]}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Interactive 3D Yantra Visualizer Stage ── */}
        <div className="my-8 p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-black/90 via-[#220d07] to-black/95 border-2 border-[#d4af37] shadow-2xl relative flex flex-col items-center">
          <div className="text-center mb-6">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37] font-mono">
              Geometric Matrix: {activeYantra.geometry}
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-serif text-white mt-1">
              {activeYantra.name}
            </h3>
          </div>

          {/* Interactive Tap-to-Energize Yantra Disc */}
          <div className="relative my-4 flex items-center justify-center">
            {/* Outer Rotating Sacred Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 24, ease: "linear" }}
              className="absolute inset-0 w-56 h-56 sm:w-64 sm:h-64 rounded-full border border-dashed border-[#d4af37]/40 pointer-events-none"
            />

            {/* Glowing Golden Yantra Circle */}
            <motion.button
              type="button"
              onClick={handleEnergize}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`w-48 h-48 sm:w-56 sm:h-56 rounded-full flex flex-col items-center justify-center p-4 cursor-pointer transition-all duration-700 shadow-2xl ${
                isEnergized
                  ? "bg-gradient-to-br from-[#b37a15] via-[#ffd700] to-[#804e06] text-black shadow-[0_0_80px_rgba(255,215,0,0.8)] border-4 border-amber-100"
                  : "bg-gradient-to-br from-[#2a1309] to-black border-2 border-[#d4af37]/60 text-white"
              }`}
            >
              <span className="text-4xl sm:text-5xl font-black font-devanagari drop-shadow-md">
                {activeYantra.sanskritName.slice(0, 1)}
              </span>
              <span className="text-[10px] font-extrabold uppercase tracking-widest mt-2 font-mono">
                {isEnergized ? "✦ ENERGIZED ✦" : "Tap Center Bindu"}
              </span>
              <span className="text-[9px] opacity-80 mt-0.5">
                {mantraChants > 0 ? `${mantraChants} Japa Chants` : "Prana Pratishtha"}
              </span>
            </motion.button>
          </div>

          {/* Sacred Beej Mantra Inscription */}
          <div className="p-4 rounded-2xl bg-black/70 border border-[#d4af37]/30 my-6 text-center max-w-xl">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37] block mb-1">
              Concreated Prana Pratishtha Beej Mantra
            </span>
            <p className="text-xs sm:text-sm font-serif text-[#ffd700] italic font-semibold leading-relaxed">
              &ldquo;{activeYantra.beejMantra}&rdquo;
            </p>
          </div>

          {/* 3 Benefits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full text-xs text-left my-2">
            {activeYantra.benefits.map((b, i) => (
              <div key={i} className="bg-black/50 border border-white/10 rounded-2xl p-3.5 flex items-start gap-2">
                <span className="text-amber-400 font-bold">✦</span>
                <span className="text-gray-200">{b}</span>
              </div>
            ))}
          </div>

          {/* High-Ticket 24K Gold Pocket Yantra Delivery Bridge */}
          <div className="mt-8 pt-6 border-t border-white/10 w-full flex flex-col sm:flex-row items-center justify-between gap-5 text-left bg-gradient-to-r from-[#2f1309] to-[#1a0904] p-5 rounded-2xl border border-amber-500/40">
            <div>
              <h4 className="text-sm font-bold font-serif text-white mb-0.5">
                Order 24K Gold-Foil Consecrated {activeYantra.name.split(" ")[0]} Yantra
              </h4>
              <p className="text-xs text-gray-300 font-light">
                Pandit Ji will energize your pocket Yantra with your specific Gotra Sankalp at Kashi altar, sending it with home delivery in tamper-proof packaging.
              </p>
            </div>

            <div className="flex flex-col gap-2 shrink-0 w-full sm:w-auto">
              <Link
                href="/request-guidance?service=energized-gemstone"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#e5c453] to-[#d4af37] text-black font-extrabold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 flex items-center justify-center gap-1.5 transition-all"
              >
                <span>Order Gold Yantra (₹1,100)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Sticky Floating Bar */}
        <SanctifiedVerdictStickyBar
          serviceId="energized-gemstone"
          serviceName={`24K Gold Consecrated ${activeYantra.name}`}
          price={1100}
          badge="Prana Pratishtha Consecrated"
        />
      </div>
    </div>
  );
}
