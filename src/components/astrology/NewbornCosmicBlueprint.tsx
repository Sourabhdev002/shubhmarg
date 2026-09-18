"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Baby, Share2, ArrowRight, Crown } from "lucide-react";
import Link from "next/link";
import DirectWhatsAppButton from "@/components/shared/DirectWhatsAppButton";
import VedicCalculationLoader from "@/components/shared/VedicCalculationLoader";
import SanctifiedVerdictStickyBar from "@/components/shared/SanctifiedVerdictStickyBar";

const NAKSHATRAS = [
  { id: "0", name: "Ashwini", rashi: "Mesha (Aries)", syllables: "Chu, Che, Cho, La", deity: "Ashwini Kumaras", element: "Earth", luckyNumber: 7, luckyColor: "Blood Red", gem: "Cat's Eye (Lehsuniya)", trait: "Swift healer, courageous pioneer, athletic vitality" },
  { id: "1", name: "Bharani", rashi: "Mesha (Aries)", syllables: "Li, Lu, Le, Lo", deity: "Yama Deva", element: "Earth", luckyNumber: 9, luckyColor: "Crimson", gem: "Natural Diamond", trait: "Immense endurance, noble creative force, transformative resilience" },
  { id: "2", name: "Krittika", rashi: "Vrishabha (Taurus)", syllables: "A, I, U, E", deity: "Agni Deva", element: "Fire", luckyNumber: 1, luckyColor: "Golden Yellow", gem: "Natural Ruby (Manik)", trait: "Sharp intellect, penetrating focus, leadership fire, truth-seeker" },
  { id: "3", name: "Rohini", rashi: "Vrishabha (Taurus)", syllables: "O, Va, Vi, Vu", deity: "Brahma / Chandra", element: "Water", luckyNumber: 2, luckyColor: "Cream White", gem: "Natural Pearl (Moti)", trait: "Mesmerizing beauty, artistic grace, luxurious taste, magnetic charm" },
  { id: "4", name: "Mrigashira", rashi: "Mithuna (Gemini)", syllables: "Ve, Vo, Ka, Ki", deity: "Soma (Moon)", element: "Air", luckyNumber: 2, luckyColor: "Silver Grey", gem: "Natural Pearl", trait: "Curious seeker, gentle intellect, exploratory nature" },
  { id: "5", name: "Ardra", rashi: "Mithuna (Gemini)", syllables: "Ku, Gha, Ng, Chha", deity: "Rudra (Shiva)", element: "Water", luckyNumber: 4, luckyColor: "Deep Green", gem: "Hessonite (Gomed)", trait: "Intense emotional depth, transformative storms, brilliant researcher" },
  { id: "6", name: "Punarvasu", rashi: "Karka (Cancer)", syllables: "Ke, Ko, Ha, Hi", deity: "Aditi (Mother of Gods)", element: "Air", luckyNumber: 3, luckyColor: "Yellow Gold", gem: "Yellow Sapphire (Pukhraj)", trait: "Eternal optimist, nurturing renewal, philosophical wisdom" },
  { id: "7", name: "Pushya", rashi: "Karka (Cancer)", syllables: "Hu, He, Ho, Da", deity: "Brihaspati (Jupiter)", element: "Water", luckyNumber: 3, luckyColor: "Saffron Orange", gem: "Yellow Sapphire", trait: "Supreme nurturer, ethical foundation, auspicious provider" },
  { id: "8", name: "Ashlesha", rashi: "Karka (Cancer)", syllables: "Di, Du, De, Do", deity: "Naga Serpent", element: "Water", luckyNumber: 5, luckyColor: "Black-Green", gem: "Natural Emerald (Panna)", trait: "Hypnotic intuition, mystical depth, keen psychological insight" },
  { id: "9", name: "Magha", rashi: "Simha (Leo)", syllables: "Ma, Mi, Mu, Me", deity: "Pitru Deva (Ancestors)", element: "Fire", luckyNumber: 1, luckyColor: "Royal Gold", gem: "Dragon's Eye / Cat's Eye", trait: "Regal ancestral authority, commanding presence, noble lineage pride" },
  { id: "10", name: "Purva Phalguni", rashi: "Simha (Leo)", syllables: "Mo, Ta, Ti, Tu", deity: "Bhaga (God of Fortune)", element: "Fire", luckyNumber: 6, luckyColor: "Light Brown", gem: "Natural Diamond", trait: "Creative luxury, romantic charisma, joyful artistic brilliance" },
  { id: "11", name: "Uttara Phalguni", rashi: "Kanya (Virgo)", syllables: "Te, To, Pa, Pi", deity: "Aryaman (Nobility)", element: "Fire", luckyNumber: 1, luckyColor: "Azure Blue", gem: "Natural Ruby", trait: "Generous patron, noble contracts, enduring partnerships" },
];

const MILESTONES = [
  { name: "Namkaran Sanskar", sanskrit: "नामकरण संस्कार", timing: "11th or 12th Day after Birth", description: "The sacred naming ceremony based on Nakshatra syllable alignment.", icon: "📛" },
  { name: "Nishkraman Sanskar", sanskrit: "निष्क्रमण संस्कार", timing: "3rd or 4th Month", description: "Baby's first sacred outdoor outing under auspicious planetary alignments.", icon: "🌤️" },
  { name: "Annaprashan Sanskar", sanskrit: "अन्नप्राशन संस्कार", timing: "6th Month (Auspicious Tithi)", description: "First solid food ceremony — cooked rice with ghee and honey.", icon: "🍚" },
  { name: "Karnavedha Sanskar", sanskrit: "कर्णवेध संस्कार", timing: "6th or 7th Month", description: "Sacred ear piercing for immune & cognitive activation.", icon: "✨" },
  { name: "Chudakarana / Mundan", sanskrit: "चूडाकरण / मुण्डन संस्कार", timing: "1st or 3rd Year (Odd Year)", description: "First sacred haircut at a holy site for ancestral blessings.", icon: "💇" },
];

export default function NewbornCosmicBlueprint() {
  const [babyName, setBabyName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [birthTime, setBirthTime] = useState("");
  const [gender, setGender] = useState("Boy");
  const [selectedNakshatraId, setSelectedNakshatraId] = useState("3");
  const [parentName, setParentName] = useState("");
  const [gotra, setGotra] = useState("");
  const [isCalculating, setIsCalculating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);

  const activeNakshatra = NAKSHATRAS.find((n) => n.id === selectedNakshatraId) || NAKSHATRAS[3];

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculating(true);
    setTimeout(() => {
      setIsCalculating(false);
      setIsGenerated(true);
    }, 2200);
  };

  const cleanBabyName = babyName.trim() || "Divine Child";

  const shareText = encodeURIComponent(
    `🌟 *${cleanBabyName}'s Vedic Cosmic Birth Certificate* 🌟\n\n⭐ *Nakshatra:* ${activeNakshatra.name}\n🔮 *Rashi:* ${activeNakshatra.rashi}\n📛 *Name Syllables:* ${activeNakshatra.syllables}\n🔢 *Lucky Number:* ${activeNakshatra.luckyNumber}\n🎨 *Lucky Color:* ${activeNakshatra.luckyColor}\n💎 *Lucky Gemstone:* ${activeNakshatra.gem}\n\n_Consecrated at ShubhMarg Kashi Vishwanath Peeth_\nhttps://shubhmarg.com/baby-cosmic-blueprint`
  );

  return (
    <div className="my-10 bg-gradient-to-b from-[#1a0d08] via-[#26110b] to-[#0f0502] border-2 border-[#d4af37] rounded-[2.5rem] p-6 sm:p-12 shadow-[0_25px_100px_rgba(212,175,55,0.35)] relative overflow-hidden text-center">
      <div className="pointer-events-none absolute -top-40 -left-40 w-[450px] h-[450px] bg-pink-400/15 rounded-full blur-[150px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 w-[450px] h-[450px] bg-[#d4af37]/20 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/15 border border-pink-400/40 text-pink-300 text-[11px] font-extrabold uppercase tracking-widest mb-3">
          <Baby className="w-3.5 h-3.5" />
          <span>Sacred First-Year Milestone Planner</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-bold font-serif text-white tracking-wide mb-2">
          ॥ नवजात शिशु वैदिक जन्म प्रमाणपत्र ॥
        </h2>
        <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto mb-8 font-light leading-relaxed">
          Generate your newborn&apos;s luxury gold-embossed Cosmic Birth Certificate with Nakshatra, name syllables, lucky gems, and all 5 sacred first-year Muhurta milestone dates.
        </p>

        {/* Input Form */}
        <form onSubmit={handleGenerate} className="bg-black/75 border border-white/15 rounded-3xl p-5 sm:p-8 mb-8 text-left backdrop-blur-xl shadow-2xl space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-[#d4af37] mb-1">Baby&apos;s Name (or leave blank)</label>
              <input type="text" placeholder="e.g. Aarav" value={babyName} onChange={(e) => setBabyName(e.target.value)} className="w-full bg-black/80 border border-white/20 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37]" />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-[#d4af37] mb-1">Date of Birth</label>
              <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} className="w-full bg-black/80 border border-white/20 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]" />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-[#d4af37] mb-1">Time of Birth</label>
              <input type="time" value={birthTime} onChange={(e) => setBirthTime(e.target.value)} className="w-full bg-black/80 border border-white/20 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-[#d4af37] mb-1">Gender</label>
              <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full bg-black/80 border border-white/20 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]">
                <option value="Boy">Boy (पुत्र)</option>
                <option value="Girl">Girl (पुत्री)</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-[#d4af37] mb-1">Birth Nakshatra</label>
              <select value={selectedNakshatraId} onChange={(e) => setSelectedNakshatraId(e.target.value)} className="w-full bg-black/80 border border-white/20 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]">
                {NAKSHATRAS.map((n) => (<option key={n.id} value={n.id} className="bg-[#1a1a1a]">{n.name} ({n.rashi})</option>))}
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-[#d4af37] mb-1">Parent&apos;s Name</label>
              <input type="text" placeholder="Father / Mother" value={parentName} onChange={(e) => setParentName(e.target.value)} className="w-full bg-black/80 border border-white/20 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37]" />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-[#d4af37] mb-1">Family Gotra</label>
              <input type="text" placeholder="e.g. Kashyap" value={gotra} onChange={(e) => setGotra(e.target.value)} className="w-full bg-black/80 border border-white/20 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37]" />
            </div>
          </div>

          <button type="submit" disabled={isCalculating} className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#d4af37] via-[#ffd700] to-[#d4af37] text-black font-extrabold text-sm uppercase tracking-wider shadow-[0_4px_25px_rgba(212,175,55,0.4)] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer">
            <Crown className="w-5 h-5" />
            <span>Generate Cosmic Birth Certificate</span>
          </button>
        </form>

        {isCalculating && (
          <VedicCalculationLoader title="Casting Newborn's Celestial Birth Map" stages={["Aligning Moon in Birth Nakshatra & Charan Pada...", "Calculating Janma Rashi & Lagna Ascendant Degrees...", "Synthesizing Lucky Number, Color & Gemstone Matrix...", "Preparing 5 Sacred First-Year Muhurta Milestone Dates..."]} estimatedSeconds={2} />
        )}

        {/* ── Gold-Embossed Cosmic Birth Certificate ── */}
        {isGenerated && !isCalculating && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 text-left animate-fadeIn">
            {/* Certificate Card */}
            <div className="bg-gradient-to-br from-[#2a1309] via-[#1a0a04] to-[#0d0402] border-2 border-[#d4af37] rounded-[2rem] p-6 sm:p-10 shadow-[0_20px_80px_rgba(212,175,55,0.3)] relative">
              <div className="pointer-events-none absolute top-3 left-4 text-[#d4af37]/40 text-xs font-serif">✦ ॥ श्री ॥ ✦</div>
              <div className="pointer-events-none absolute top-3 right-4 text-[#d4af37]/40 text-xs font-serif">✦ ॥ ॐ ॥ ✦</div>

              <div className="text-center pb-5 border-b-2 border-[#d4af37]/40 mb-6">
                <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#d4af37] block mb-1">ShubhMarg Kashi Vishwanath Peeth</span>
                <h3 className="text-3xl sm:text-4xl font-bold font-serif text-white">
                  ॥ {cleanBabyName}&apos;s Cosmic Birth Certificate ॥
                </h3>
                <p className="text-xs text-amber-200/80 mt-1 font-serif italic">&ldquo;ॐ सह नाववतु। सह नौ भुनक्तु। सह वीर्यं करवावहै॥&rdquo;</p>
              </div>

              {/* Core Details Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 text-xs font-mono">
                {[
                  { label: "Birth Nakshatra", value: activeNakshatra.name },
                  { label: "Janma Rashi", value: activeNakshatra.rashi },
                  { label: "Name Syllables", value: activeNakshatra.syllables },
                  { label: "Governing Deity", value: activeNakshatra.deity },
                  { label: "Lucky Number", value: String(activeNakshatra.luckyNumber) },
                  { label: "Lucky Color", value: activeNakshatra.luckyColor },
                  { label: "Lucky Gemstone", value: activeNakshatra.gem },
                  { label: "Cosmic Element", value: activeNakshatra.element },
                ].map((item, i) => (
                  <div key={i} className="bg-black/60 border border-[#d4af37]/30 rounded-2xl p-3 text-center">
                    <span className="text-[9px] uppercase text-gray-400 tracking-widest block mb-0.5">{item.label}</span>
                    <span className="text-sm font-bold text-[#ffd700]">{item.value}</span>
                  </div>
                ))}
              </div>

              {/* Cosmic Personality */}
              <div className="p-4 rounded-2xl bg-black/50 border border-[#d4af37]/30 mb-6 text-center">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#d4af37] block mb-1">Cosmic Personality Blueprint</span>
                <p className="text-sm text-gray-200 font-light">{activeNakshatra.trait}</p>
              </div>

              {/* 5 Sacred Milestones Timeline */}
              <div className="mb-6">
                <span className="text-[10px] uppercase font-extrabold tracking-widest text-[#d4af37] block mb-3 text-center">Sacred First-Year Milestones</span>
                <div className="space-y-2.5">
                  {MILESTONES.map((m, i) => (
                    <div key={i} className="flex items-start gap-3 bg-black/40 border border-white/10 rounded-xl p-3.5">
                      <span className="text-xl mt-0.5">{m.icon}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-bold text-white">{m.name}</span>
                          <span className="text-[10px] text-amber-300 font-devanagari">({m.sanskrit})</span>
                        </div>
                        <p className="text-[11px] text-gray-300 font-light mt-0.5">{m.description}</p>
                        <span className="text-[10px] text-emerald-400 font-bold mt-1 block">📅 Recommended: {m.timing}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Share & Order Actions */}
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <a href={`https://wa.me/?text=${shareText}`} target="_blank" rel="noopener noreferrer" className="flex-1 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all">
                  <Share2 className="w-3.5 h-3.5" /> Share with Family on WhatsApp
                </a>
              </div>

              {/* High-Ticket Physical Certificate + Kundli Call */}
              <div className="bg-gradient-to-r from-[#38160a] via-[#1f0904] to-[#38160a] border-2 border-amber-500/50 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-xl">
                <div>
                  <h4 className="text-base font-serif font-bold text-white mb-1">Order Physical Gold-Foil Framed Birth Certificate</h4>
                  <p className="text-xs text-gray-300 leading-relaxed font-light">Pandit Ji prepares a premium gold-foil printed certificate with your baby&apos;s complete Kundli, consecrated at Kashi altar, and delivered in a luxury frame.</p>
                </div>
                <div className="flex flex-col gap-2 shrink-0 w-full sm:w-auto">
                  <Link href="/request-guidance?service=deep-kundli" className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#ffd700] to-[#d4af37] text-black font-extrabold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 flex items-center justify-center gap-1.5 transition-all">
                    <span>Framed Certificate (₹3,500)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <DirectWhatsAppButton variant="compact" serviceName={`Baby ${cleanBabyName} Kundli & Milestones`} price={2100} className="w-full justify-center py-2 text-xs" />
                </div>
              </div>
            </div>

            <SanctifiedVerdictStickyBar serviceId="deep-kundli" serviceName={`${cleanBabyName}'s Cosmic Birth Certificate`} price={3500} badge="Birth Certificate Generated" />
          </motion.div>
        )}
      </div>
    </div>
  );
}
