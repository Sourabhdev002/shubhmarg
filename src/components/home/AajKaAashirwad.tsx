"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, Flame } from "lucide-react";
import { waLink } from "@/config/contact";
import { pixelViewContent, pixelContact } from "@/components/analytics/pixelEvents";

// ── AAJ KA AASHIRWAD ─ frictionless "first yes" tripwire ─────────────────
// A cold ad visitor gets INSTANT free value (pick rashi -> personal blessing),
// then a tiny irresistible Rs11 offer via WhatsApp. No signup, no wallet.
// This is the low-risk first step that turns browsers into trusting customers.

const RASHIS = [
  { key: "Mesh", en: "Aries", hi: "मेष", bless: "Aaj aapka sahas rang laayega — ek rukA hua kaam aage badhega." },
  { key: "Vrishabh", en: "Taurus", hi: "वृषभ", bless: "Aaj sthirta aur dhan ke yog hain — dhairya se laabh milega." },
  { key: "Mithun", en: "Gemini", hi: "मिथुन", bless: "Aaj baat-cheet se naya avsar khulega — sunna faaydemand rahega." },
  { key: "Kark", en: "Cancer", hi: "कर्क", bless: "Aaj parivaar se sukh milega — mann ki baat kahein." },
  { key: "Simha", en: "Leo", hi: "सिंह", bless: "Aaj aapka tej chamkega — netritva ka samay hai." },
  { key: "Kanya", en: "Virgo", hi: "कन्या", bless: "Aaj sooksm buddhi se ek uljhan sulajhegi." },
  { key: "Tula", en: "Libra", hi: "तुला", bless: "Aaj santulan aur sambandh mazboot honge." },
  { key: "Vrishchik", en: "Scorpio", hi: "वृश्चिक", bless: "Aaj gehra badlaav shubh hai — bharosa rakhein." },
  { key: "Dhanu", en: "Sagittarius", hi: "धनु", bless: "Aaj gyaan aur yatra ke yog — aage badhein." },
  { key: "Makar", en: "Capricorn", hi: "मकर", bless: "Aaj mehnat ka phal milega — anushasan safal hoga." },
  { key: "Kumbh", en: "Aquarius", hi: "कुम्भ", bless: "Aaj nayi soch se raasta khulega." },
  { key: "Meen", en: "Pisces", hi: "मीन", bless: "Aaj aastha aur karuna se shanti milegi." },
];

export default function AajKaAashirwad() {
  const [selected, setSelected] = useState<number | null>(null);

  const pick = (i: number) => {
    setSelected(i);
    pixelViewContent(`AajKaAashirwad_${RASHIS[i].key}`);
  };

  const claim = () => {
    if (selected === null) return;
    const r = RASHIS[selected];
    pixelContact("aaj_ka_aashirwad_11");
    const msg = `Namaste Pandit Ji 🙏 Meri rashi ${r.hi} (${r.en}) hai. Main "Aaj Ka Aashirwad" (₹11) lena chahta/chahti hoon — mera aaj ka poora personal margdarshan + mere naam ka diya. Kripya bhejein.`;
    window.open(waLink(msg), "_blank");
  };

  return (
    <section className="relative section-py overflow-hidden surface-obsidian">
      <span className="glow-fill" />
      <div className="relative z-10 max-w-2xl mx-auto section-px text-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#FFF9EE] via-[#FFF3D6] to-[#FFF9EE] border border-[#D4AF37]/60 mb-3 shadow-[0_4px_14px_rgba(184,134,11,0.18)]">
          <Sparkles className="w-3.5 h-3.5 text-[#C25E10] animate-pulse" />
          <span className="text-[11px] font-sans font-bold tracking-[0.2em] text-[#8C3F08] uppercase">START HERE · FREE</span>
        </div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-cormorant text-[#2A1810] tracking-tight">
          आज का आशीर्वाद
        </h2>
        <p className="text-[13px] sm:text-sm text-[#6B5A48] font-sans font-medium mt-1 mb-1">
          Today&apos;s Blessing
        </p>
        <div className="flex items-center justify-center gap-3 my-3 opacity-70">
          <div className="w-10 h-px bg-gradient-to-r from-transparent to-[#B8860B]" />
          <span className="text-[#C25E10] text-xs">✦</span>
          <div className="w-10 h-px bg-gradient-to-l from-transparent to-[#B8860B]" />
        </div>
        <p className="text-[13px] sm:text-[14.5px] text-[#332215] font-sans font-medium max-w-md mx-auto mb-6">
          Apni rashi chunein — turant paayein aaj ka personal aashirwad, bilkul <strong>FREE</strong>.
        </p>

        {/* Rashi grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 mb-6">
          {RASHIS.map((r, i) => (
            <button
              key={r.key}
              type="button"
              onClick={() => pick(i)}
              className={`rounded-2xl px-2 py-3 border transition-all cursor-pointer ${
                selected === i
                  ? "bg-gradient-to-b from-[#E8791E] to-[#C25E10] border-[#E8791E] text-white shadow-[0_6px_18px_-4px_rgba(232,121,30,0.6)] scale-[1.03]"
                  : "bg-[#FFFDF8] border-[#D4AF37]/35 text-[#2A1810] hover:border-[#E8791E]/70 hover:-translate-y-0.5"
              }`}
            >
              <div className={`text-[17px] font-bold font-devanagari leading-none ${selected === i ? "text-white" : "text-[#C25E10]"}`} style={{ fontFamily: "'Tiro Devanagari Hindi', serif" }}>{r.hi}</div>
              <div className={`text-[9.5px] font-sans font-semibold mt-1 ${selected === i ? "text-amber-100" : "text-[#6B5A48]"}`}>{r.en}</div>
            </button>
          ))}
        </div>

        {/* Instant free blessing + soft Rs11 upsell */}
        <AnimatePresence mode="wait">
          {selected !== null && (
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-3xl p-5 sm:p-6 bg-gradient-to-b from-[#FFFDF9] via-[#FCF6EA] to-[#F5EAD6] border border-[#D4AF37]/45 shadow-[0_12px_34px_-12px_rgba(184,134,11,0.28)]"
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <Flame className="w-4 h-4 text-[#E8791E]" />
                <span className="text-[10.5px] font-sans font-bold uppercase tracking-widest text-[#8C3F08]">Aaj Ka Aashirwad · {RASHIS[selected].hi}</span>
              </div>
              <p className="text-[15px] sm:text-[16.5px] font-cormorant font-semibold text-[#2A1810] leading-snug mb-4">
                &ldquo;{RASHIS[selected].bless}&rdquo;
              </p>
              <div className="pt-3 border-t border-[#D4AF37]/25">
                <p className="text-[12px] text-[#6B5A48] font-sans mb-3">
                  Chahte hain aaj ka <strong className="text-[#C25E10]">poora personal margdarshan</strong> + aapke naam ka <strong className="text-[#C25E10]">diya</strong>?
                </p>
                <button
                  type="button"
                  onClick={claim}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-bold text-[14px] tracking-wide bg-gradient-to-r from-[#E8791E] via-[#F5A623] to-[#E8791E] text-white shadow-[0_4px_18px_rgba(232,121,30,0.45)] hover:shadow-[0_6px_26px_rgba(232,121,30,0.6)] active:scale-95 transition-all cursor-pointer"
                >
                  <span>Aaj Ka Aashirwad paayein · ₹11</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-[10px] text-[#8C5212]/70 font-sans mt-2">WhatsApp par turant · No sign-up needed</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
