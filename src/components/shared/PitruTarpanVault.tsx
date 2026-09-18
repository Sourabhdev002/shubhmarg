"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Share2, Trees } from "lucide-react";
import Link from "next/link";
import SanctifiedVerdictStickyBar from "@/components/shared/SanctifiedVerdictStickyBar";

export default function PitruTarpanVault() {
  const [seekerName, setSeekerName] = useState("");
  const [gotra, setGotra] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [grandfatherName, setGrandfatherName] = useState("");
  const [greatGrandfatherName, setGreatGrandfatherName] = useState("");
  const [ancestralVillage, setAncestralVillage] = useState("");
  const [isGenerated, setIsGenerated] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerated(true);
  };

  const cleanName = seekerName.trim() || "Devoted Descendant";
  const cleanGotra = gotra.trim() || "Kashyap";
  const cleanFather = fatherName.trim() || "Pitru Deva";
  const cleanGrandfather = grandfatherName.trim() || "Pitru Deva";
  const cleanGreatGrandfather = greatGrandfatherName.trim() || "Pitru Deva";

  const shareText = encodeURIComponent(
    `🔱 *Vedic 3-Generation Pitru Tarpan Ledger* 🔱\n\n*Gotra:* ${cleanGotra}\n*Descendant:* ${cleanName}\n*Father:* ${cleanFather}\n*Grandfather:* ${cleanGrandfather}\n*Great-Grandfather:* ${cleanGreatGrandfather}\n\n_Consecrated for Monthly Amavasya Tarpana at Kashi Vishwanath Peeth: https://shubhmarg.com/pitru-vault_`
  );

  return (
    <div className="my-10 bg-[#FFFDF8] border-2 border-[#d4af37] rounded-3xl p-6 sm:p-12 shadow-[0_20px_80px_rgba(212,175,55,0.3)] relative overflow-hidden text-center">
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 bg-[#d4af37]/15 rounded-full blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 w-96 h-96 bg-red-600/15 rounded-full blur-[140px]" />

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Header Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d4af37]/15 border border-[#B8860B]/30 text-[#C25E10] text-[11px] font-extrabold uppercase tracking-widest mb-3">
          <Trees className="w-3.5 h-3.5 text-[#C25E10]" />
          <span>Ancestral Lineage &amp; Pitru Shanti Vault</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-bold font-serif text-[#2A1810] tracking-wide mb-2">
          ॥ पावन पितृ तर्पण एवं गोत्र रक्षा कोष ॥
        </h2>
        <p className="text-xs sm:text-sm text-[#6B5A48] max-w-xl mx-auto mb-8 font-light leading-relaxed">
          Record your sacred 3-generation ancestral lineage (*Pitru, Pitamaha, Prapitamaha*) to generate an official Sanskrit Tarpan Ledger for monthly Amavasya Tarpana at Kashi Manikarnika Ghat.
        </p>

        {/* Input Form */}
        <form onSubmit={handleGenerate} className="bg-[#FBF6EC] border border-[#B8860B]/20 rounded-3xl p-5 sm:p-8 mb-8 text-left backdrop-blur-xl shadow-[0_14px_40px_-18px_rgba(107,42,20,0.25)] space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-[#C25E10] mb-1">
                Your Full Name (Karta / Seeker)
              </label>
              <input
                type="text"
                placeholder="e.g. Amit Varma"
                value={seekerName}
                onChange={(e) => setSeekerName(e.target.value)}
                className="w-full bg-[#FBF6EC] border border-[#B8860B]/20 rounded-xl px-4 py-2.5 text-xs text-[#2A1810] placeholder-[#6B5A48]/60 focus:outline-none focus:border-[#d4af37]"
                required
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-[#C25E10] mb-1">
                Your Vedic Gotra
              </label>
              <input
                type="text"
                placeholder="e.g. Kashyap, Bharadwaj, Vashishta"
                value={gotra}
                onChange={(e) => setGotra(e.target.value)}
                className="w-full bg-[#FBF6EC] border border-[#B8860B]/20 rounded-xl px-4 py-2.5 text-xs text-[#2A1810] placeholder-[#6B5A48]/60 focus:outline-none focus:border-[#d4af37]"
                required
              />
            </div>
          </div>

          <div className="pt-2 border-t border-[#B8860B]/20">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#C25E10] block mb-3">
              Three Generations of Departed Ancestors (पितृ त्रयी)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div>
                <label className="block text-[10px] text-[#6B5A48] font-bold uppercase mb-1">
                  1. Father / Pitru
                </label>
                <input
                  type="text"
                  placeholder="Late Father's Name"
                  value={fatherName}
                  onChange={(e) => setFatherName(e.target.value)}
                  className="w-full bg-[#FBF6EC] border border-[#B8860B]/20 rounded-xl px-3 py-2 text-xs text-[#2A1810] placeholder-gray-600 focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-[10px] text-[#6B5A48] font-bold uppercase mb-1">
                  2. Grandfather / Pitamaha
                </label>
                <input
                  type="text"
                  placeholder="Late Grandfather's Name"
                  value={grandfatherName}
                  onChange={(e) => setGrandfatherName(e.target.value)}
                  className="w-full bg-[#FBF6EC] border border-[#B8860B]/20 rounded-xl px-3 py-2 text-xs text-[#2A1810] placeholder-gray-600 focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-[10px] text-[#6B5A48] font-bold uppercase mb-1">
                  3. Great-Grandfather
                </label>
                <input
                  type="text"
                  placeholder="Late Great-Grandfather"
                  value={greatGrandfatherName}
                  onChange={(e) => setGreatGrandfatherName(e.target.value)}
                  className="w-full bg-[#FBF6EC] border border-[#B8860B]/20 rounded-xl px-3 py-2 text-xs text-[#2A1810] placeholder-gray-600 focus:outline-none focus:border-[#d4af37]"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[10px] text-[#6B5A48] font-bold uppercase mb-1">
              Ancestral Native Origin / Village (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Varanasi, Ayodhya, Mithila, Saurashtra"
              value={ancestralVillage}
              onChange={(e) => setAncestralVillage(e.target.value)}
              className="w-full bg-[#FBF6EC] border border-[#B8860B]/20 rounded-xl px-3.5 py-2 text-xs text-[#2A1810] placeholder-gray-600 focus:outline-none focus:border-[#d4af37]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#d4af37] via-[#e5c453] to-[#d4af37] text-black font-extrabold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            <Sparkles className="w-4 h-4 text-black" />
            <span>Generate Consecrated Pitru Tarpan Ledger</span>
          </button>
        </form>

        {/* ── Generated Pitru Tarpan Ledger Card ── */}
        {isGenerated && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 text-left animate-fadeIn"
          >
            <div className="bg-gradient-to-br from-[#241108] to-black/90 border-2 border-[#d4af37] rounded-3xl p-6 sm:p-9 shadow-2xl relative">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#d4af37]/30 mb-6">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#C25E10] font-mono">
                    Official Consecrated Pitru Ledger
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold font-serif text-[#FFFDF8] mt-0.5">
                    ॥ {cleanGotra} गोत्रीय पितृ तर्पण संकल्प ॥
                  </h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#d4af37] to-[#8a4214] text-black font-black flex items-center justify-center text-sm font-devanagari shadow-lg">
                  ॥ पितृ ॥
                </div>
              </div>

              {/* Sanskrit Mantra */}
              <div className="p-4 rounded-2xl bg-[#FBF6EC] border border-[#d4af37]/30 mb-6 text-center">
                <p className="text-sm sm:text-base font-serif text-[#ffd700] italic font-semibold">
                  &ldquo;ॐ पितृभ्यो नमः। ॐ पितृगणाय विद्महे जगद्धारिणे धीमहि तन्नो पितरो प्रचोदयात्॥&rdquo;
                </p>
                <p className="text-xs text-[#6B5A48] mt-1">
                  May the divine blessings of our ancestors protect the lineage, bringing enduring peace, progeny, and prosperity.
                </p>
              </div>

              {/* 3-Generation Ancestor Tree Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-6 text-xs font-mono">
                <div className="bg-[#FBF6EC] border border-[#B8860B]/20 rounded-2xl p-4">
                  <span className="text-[10px] text-[#6B5A48] uppercase tracking-widest block mb-1">
                    Father (पितृ)
                  </span>
                  <p className="text-sm font-bold text-[#2A1810]">{cleanFather}</p>
                  <span className="text-[10px] text-[#C25E10]">Gotra: {cleanGotra}</span>
                </div>

                <div className="bg-[#FBF6EC] border border-[#B8860B]/20 rounded-2xl p-4">
                  <span className="text-[10px] text-[#6B5A48] uppercase tracking-widest block mb-1">
                    Grandfather (पितामह)
                  </span>
                  <p className="text-sm font-bold text-[#2A1810]">{cleanGrandfather}</p>
                  <span className="text-[10px] text-[#C25E10]">Gotra: {cleanGotra}</span>
                </div>

                <div className="bg-[#FBF6EC] border border-[#B8860B]/20 rounded-2xl p-4">
                  <span className="text-[10px] text-[#6B5A48] uppercase tracking-widest block mb-1">
                    Great-Grandfather (प्रपितामह)
                  </span>
                  <p className="text-sm font-bold text-[#2A1810]">{cleanGreatGrandfather}</p>
                  <span className="text-[10px] text-[#C25E10]">Gotra: {cleanGotra}</span>
                </div>
              </div>

              {/* Monthly Amavasya Temple Puja Bridge */}
              <div className="bg-gradient-to-r from-[#38160a] via-[#1f0904] to-[#38160a] border-2 border-amber-500/50 rounded-2xl p-5 mb-5 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-xl">
                <div>
                  <h4 className="text-base font-serif font-bold text-[#FFFDF8] mb-1">
                    Perform Monthly Amavasya Tarpana at Kashi Manikarnika Ghat
                  </h4>
                  <p className="text-xs text-amber-100/80 leading-relaxed font-light">
                    Pandit Ji will personally recite your 3-generation lineage Sankalp with black sesame seeds (Kala Til), Kusha grass, and sacred Ganga Jal on every Amavasya Tithi.
                  </p>
                </div>

                <div className="flex flex-col gap-2 shrink-0 w-full sm:w-auto">
                  <Link
                    href="/request-guidance?service=temple-puja"
                    className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#e5c453] to-[#d4af37] text-black font-extrabold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 flex items-center justify-center gap-1.5 transition-all"
                  >
                    <span>Book Amavasya Shanti (₹2,100)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <a
                    href={`https://wa.me/?text=${shareText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share with Family on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Sticky Action Bar */}
            <SanctifiedVerdictStickyBar
              serviceId="temple-puja"
              serviceName={`${cleanGotra} Gotra Amavasya Pitru Shanti`}
              price={2100}
              badge={`Amavasya Tarpana Open for ${cleanGotra}`}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}
