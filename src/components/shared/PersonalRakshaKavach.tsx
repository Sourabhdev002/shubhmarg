"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, QrCode, ArrowRight } from "lucide-react";
import Link from "next/link";
import DirectWhatsAppButton from "@/components/shared/DirectWhatsAppButton";
import VedicCalculationLoader from "@/components/shared/VedicCalculationLoader";
import SanctifiedVerdictStickyBar from "@/components/shared/SanctifiedVerdictStickyBar";

interface NakshatraKavach {
  id: string;
  name: string;
  deity: string;
  beejMantra: string;
  protectionMantra: string;
  yantraSymbol: string;
  element: string;
  shieldDomain: string;
  dailyPractice: string;
}

const KAVACH_DATA: NakshatraKavach[] = [
  { id: "ashwini", name: "Ashwini", deity: "Ashwini Kumaras", beejMantra: "ॐ अश्विनीकुमाराभ्यां नमः", protectionMantra: "ॐ ह्रां ह्रीं ह्रूं सः अश्विनीनाथाय रक्षां कुरु कुरु स्वाहा॥", yantraSymbol: "🐎", element: "Prithvi (Earth)", shieldDomain: "Protection from health emergencies, travel accidents, and physical injuries.", dailyPractice: "Recite 11 times at sunrise facing East. Carry a copper talisman." },
  { id: "bharani", name: "Bharani", deity: "Yama Dharmaraja", beejMantra: "ॐ यमाय धर्मराजाय नमः", protectionMantra: "ॐ ऐं ह्रीं क्लीं यमान्तकाय रक्षां कुरु कुरु स्वाहा॥", yantraSymbol: "🐘", element: "Prithvi (Earth)", shieldDomain: "Protection from untimely death, legal judgments, and karmic debts.", dailyPractice: "Recite 21 times before sleeping. Keep a silver Yama Yantra at home." },
  { id: "krittika", name: "Krittika", deity: "Agni Deva", beejMantra: "ॐ अग्नये स्वाहा", protectionMantra: "ॐ रां रां अग्निदेवाय सर्वरक्षां कुरु कुरु स्वाहा॥", yantraSymbol: "🔥", element: "Agni (Fire)", shieldDomain: "Protection from enemies, black magic, workplace sabotage, and evil eye.", dailyPractice: "Light a ghee lamp at dawn and dusk. Wear a natural Ruby." },
  { id: "rohini", name: "Rohini", deity: "Brahma / Chandra", beejMantra: "ॐ ब्रह्मणे नमः। ॐ चन्द्राय नमः", protectionMantra: "ॐ श्रीं सोमाय रक्षां कुरु कुरु सर्वसौभाग्यं देहि देहि स्वाहा॥", yantraSymbol: "🌙", element: "Jala (Water)", shieldDomain: "Protection from emotional manipulation, relationship betrayal, and beauty-related jealousy.", dailyPractice: "Offer white flowers to Chandra every Monday. Wear a natural pearl." },
  { id: "mrigashira", name: "Mrigashira", deity: "Soma (Moon God)", beejMantra: "ॐ सोमाय नमः", protectionMantra: "ॐ ह्रीं सोमनाथाय मृगशिरसे रक्षां कुरु कुरु स्वाहा॥", yantraSymbol: "🦌", element: "Vayu (Air)", shieldDomain: "Protection from restlessness, indecision, anxiety, and nervous system disorders.", dailyPractice: "Meditate for 11 minutes at moonrise. Wear a natural pearl on Monday." },
  { id: "ardra", name: "Ardra", deity: "Rudra (Shiva)", beejMantra: "ॐ नमः शिवाय", protectionMantra: "ॐ हौं रुद्राय आर्द्रानक्षत्राय सर्वविघ्ननाशनाय नमः स्वाहा॥", yantraSymbol: "💧", element: "Jala (Water)", shieldDomain: "Protection from sudden storms, emotional breakdowns, destructive patterns, and chronic grief.", dailyPractice: "Pour water on Shivalinga every Monday. Chant Rudram 11 times." },
  { id: "punarvasu", name: "Punarvasu", deity: "Aditi (Divine Mother)", beejMantra: "ॐ अदित्यै नमः", protectionMantra: "ॐ ह्रीं श्रीं अदित्यै पुनर्वसुनक्षत्राय रक्षां कुरु कुरु स्वाहा॥", yantraSymbol: "🏹", element: "Vayu (Air)", shieldDomain: "Protection from repeated losses, cyclical failures, and family separation.", dailyPractice: "Offer ghee and sesame in Havan every Thursday. Wear Yellow Sapphire." },
  { id: "pushya", name: "Pushya", deity: "Brihaspati (Jupiter)", beejMantra: "ॐ बृहस्पतये नमः", protectionMantra: "ॐ ग्रां ग्रीं ग्रौं सः गुरवे रक्षां कुरु कुरु स्वाहा॥", yantraSymbol: "⭐", element: "Jala (Water)", shieldDomain: "Protection from financial fraud, business betrayal, and children's safety.", dailyPractice: "Donate yellow sweets at temple every Thursday. Wear Yellow Sapphire." },
  { id: "ashlesha", name: "Ashlesha", deity: "Naga Serpent", beejMantra: "ॐ नागराजाय नमः", protectionMantra: "ॐ फट् नागदेवताभ्यां अश्लेषानक्षत्राय सर्ववशीकरणाय नमः स्वाहा॥", yantraSymbol: "🐍", element: "Jala (Water)", shieldDomain: "Protection from hidden enemies, psychic attacks, snake-related fears, and Naga Dosha.", dailyPractice: "Offer milk and turmeric at a Naga temple on Naga Panchami." },
];

export default function PersonalRakshaKavach() {
  const [selectedNakshatraId, setSelectedNakshatraId] = useState("krittika");
  const [seekerName, setSeekerName] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [activeKavach, setActiveKavach] = useState<NakshatraKavach | null>(null);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setTimeout(() => {
      const found = KAVACH_DATA.find((k) => k.id === selectedNakshatraId) || KAVACH_DATA[2];
      setActiveKavach(found);
      setIsGenerating(false);
      setIsGenerated(true);
    }, 2000);
  };

  const cleanName = seekerName.trim() || "Seeker";

  return (
    <div className="my-10 bg-[#FFFDF8] border border-[#B8860B]/30 rounded-3xl p-6 sm:p-12 shadow-[0_16px_44px_-18px_rgba(107,42,20,0.28)] relative overflow-hidden text-center">
      <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 bg-indigo-500/15 rounded-full blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 w-96 h-96 bg-[#d4af37]/20 rounded-full blur-[140px]" />

      <div className="relative z-10 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/15 border border-indigo-400/40 text-indigo-700 text-[11px] font-extrabold uppercase tracking-widest mb-3">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>QR-Encoded Consecrated Protection Card</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-bold font-serif text-[#2A1810] tracking-wide mb-2">
          ॥ व्यक्तिगत रक्षा कवच ॥
        </h2>
        <p className="text-xs sm:text-sm text-[#6B5A48] max-w-xl mx-auto mb-8 font-light leading-relaxed">
          Generate your personalized <strong>digital Raksha Kavach</strong> based on your birth Nakshatra — featuring your specific Beej Mantra, ruling deity, protective Yantra, and a <strong>scannable QR code</strong> that plays your personal 3-minute consecrated protection chant.
        </p>

        <form onSubmit={handleGenerate} className="bg-[#FBF6EC] border border-[#B8860B]/20 rounded-3xl p-5 sm:p-7 mb-8 text-left backdrop-blur-xl shadow-[0_14px_40px_-18px_rgba(107,42,20,0.25)]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#C25E10] mb-1.5">Your Full Name (for Sankalp)</label>
              <input type="text" placeholder="e.g. Rahul Verma" value={seekerName} onChange={(e) => setSeekerName(e.target.value)} className="w-full bg-[#FBF6EC] border border-[#B8860B]/20 rounded-xl px-4 py-3 text-sm text-[#2A1810] placeholder-[#6B5A48]/60 focus:outline-none focus:border-[#d4af37]" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#C25E10] mb-1.5">Your Birth Nakshatra</label>
              <select value={selectedNakshatraId} onChange={(e) => setSelectedNakshatraId(e.target.value)} className="w-full bg-[#FBF6EC] border border-[#B8860B]/20 rounded-xl px-4 py-3 text-sm text-[#2A1810] focus:outline-none focus:border-[#d4af37]">
                {KAVACH_DATA.map((k) => (<option key={k.id} value={k.id} className="bg-[#1a1a1a]">{k.name} — {k.deity}</option>))}
              </select>
            </div>
          </div>
          <button type="submit" disabled={isGenerating} className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#d4af37] via-[#ffd700] to-[#d4af37] text-black font-extrabold text-sm uppercase tracking-wider shadow-[0_4px_25px_rgba(212,175,55,0.4)] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer">
            <ShieldCheck className="w-5 h-5" /><span>Generate My Raksha Kavach</span>
          </button>
        </form>

        {isGenerating && (
          <VedicCalculationLoader title="Consecrating Your Personal Kavach" stages={["Invoking Nakshatra Ruling Deity Energy Field...", "Encoding Beej Mantra into QR Protection Matrix...", "Aligning Yantra Sacred Geometry for Maximum Shield...", "Sealing Kavach with Vedic Consecration Sankalp..."]} estimatedSeconds={2} />
        )}

        {/* ── Kavach Result Card ── */}
        {isGenerated && activeKavach && !isGenerating && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 text-left animate-fadeIn">
            {/* Digital Kavach Card */}
            <div className="bg-[#FFFDF8] border-2 border-[#d4af37] rounded-3xl p-6 sm:p-10 shadow-[0_20px_80px_rgba(212,175,55,0.3)] relative">
              <div className="pointer-events-none absolute top-3 left-4 text-[#C25E10]/50 text-xs font-serif">✦ ॥ रक्षा ॥ ✦</div>
              <div className="pointer-events-none absolute top-3 right-4 text-[#C25E10]/50 text-xs font-serif">✦ ॥ कवच ॥ ✦</div>

              <div className="text-center pb-5 border-b-2 border-[#d4af37]/30 mb-6">
                <span className="text-5xl mb-2 block">{activeKavach.yantraSymbol}</span>
                <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#C25E10] block">Personal Raksha Kavach — {activeKavach.name} Nakshatra</span>
                <h3 className="text-2xl sm:text-3xl font-bold font-serif text-[#2A1810] mt-1">Protection Shield for {cleanName}</h3>
                <p className="text-xs text-[#C25E10] mt-1 font-serif italic">Consecrated by ShubhMarg Kashi Vishwanath Peeth</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6 text-xs">
                {[
                  { label: "Ruling Deity", value: activeKavach.deity },
                  { label: "Cosmic Element", value: activeKavach.element },
                  { label: "Kavach Symbol", value: activeKavach.yantraSymbol + " " + activeKavach.name },
                ].map((item, i) => (
                  <div key={i} className="bg-[#FBF6EC] border border-[#d4af37]/25 rounded-2xl p-3 text-center">
                    <span className="text-[9px] uppercase text-[#6B5A48] tracking-widest block mb-0.5">{item.label}</span>
                    <span className="text-sm font-bold text-[#C25E10]">{item.value}</span>
                  </div>
                ))}
              </div>

              {/* Beej Mantra */}
              <div className="p-4 rounded-2xl bg-[#FBF6EC] border border-[#d4af37]/30 mb-4 text-center">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#C25E10] block mb-1">🔱 Your Personal Beej Mantra</span>
                <p className="text-base font-serif text-[#9E2A1E] italic font-semibold leading-relaxed">&ldquo;{activeKavach.beejMantra}&rdquo;</p>
              </div>

              {/* Full Protection Mantra */}
              <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 mb-4 text-center">
                <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-300 block mb-1">🛡️ Full Raksha Kavach Mantra (Recite 11x Daily)</span>
                <p className="text-sm font-serif text-indigo-50 italic font-semibold leading-relaxed">&ldquo;{activeKavach.protectionMantra}&rdquo;</p>
              </div>

              {/* Shield Domain + Daily Practice */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-xs sm:text-sm">
                <div className="bg-[#FBF6EC] border border-[#B8860B]/20 rounded-2xl p-4">
                  <span className="text-[10px] uppercase text-[#C25E10] font-bold tracking-widest block mb-1">🛡️ Shield Domain</span>
                  <p className="text-[#2A1810] font-light">{activeKavach.shieldDomain}</p>
                </div>
                <div className="bg-[#FBF6EC] border border-[#B8860B]/20 rounded-2xl p-4">
                  <span className="text-[10px] uppercase text-emerald-700 font-bold tracking-widest block mb-1">📿 Daily Practice</span>
                  <p className="text-[#2A1810] font-light">{activeKavach.dailyPractice}</p>
                </div>
              </div>

              {/* QR Code Visual (placeholder representation) */}
              <div className="p-6 rounded-2xl bg-white text-black text-center mb-6">
                <div className="w-40 h-40 mx-auto bg-black/10 border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center gap-2 mb-3">
                  <QrCode className="w-16 h-16 text-[#6B5A48]" />
                  <span className="text-[10px] text-[#6B5A48] font-mono">QR Activated Upon Order</span>
                </div>
                <p className="text-xs font-bold text-gray-700">Scan to play your consecrated 3-minute {activeKavach.name} Kavach Mantra audio</p>
              </div>

              {/* High-Ticket Physical Kavach Order */}
              <div className="bg-gradient-to-r from-[#38160a] via-[#1f0904] to-[#38160a] border-2 border-amber-500/50 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-xl">
                <div>
                  <h4 className="text-base font-serif font-bold text-[#FFFDF8] mb-1">Order Physical Brass-Etched Raksha Kavach</h4>
                  <p className="text-xs text-amber-100/80 leading-relaxed font-light">Physical brass-etched pocket card with your personal QR mantra code, consecrated at Kashi altar and delivered to your doorstep.</p>
                </div>
                <div className="flex flex-col gap-2 shrink-0 w-full sm:w-auto">
                  <Link href="/request-guidance?service=yantra-kavach" className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#ffd700] to-[#d4af37] text-black font-extrabold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 flex items-center justify-center gap-1.5 transition-all">
                    <span>Brass Kavach (₹1,100)</span><ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <DirectWhatsAppButton variant="compact" serviceName={`Silver Kavach Locket (${activeKavach.name})`} price={2500} className="w-full justify-center py-2 text-xs" />
                </div>
              </div>
            </div>

            <SanctifiedVerdictStickyBar serviceId="yantra-kavach" serviceName={`${activeKavach.name} Raksha Kavach`} price={1100} badge="🛡️ Kavach Consecrated" />
          </motion.div>
        )}
      </div>
    </div>
  );
}
