"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Phone, ArrowRight, Zap } from "lucide-react";
import Link from "next/link";
import SanctifiedVerdictStickyBar from "@/components/shared/SanctifiedVerdictStickyBar";

interface CrisisType {
  id: string;
  name: string;
  icon: string;
  afflictingGraha: string;
  grahaColor: string;
  immediateMantra: string;
  directionToFace: string;
  immediateDonation: string;
  emergencyAdvice: string;
}

const CRISIS_TYPES: CrisisType[] = [
  { id: "health", name: "Health Emergency / Surgery", icon: "🏥", afflictingGraha: "Surya (Sun) + Ketu", grahaColor: "text-red-400", immediateMantra: "ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्। उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय माऽमृतात्॥", directionToFace: "East (Purva) facing the Sun", immediateDonation: "Donate wheat, jaggery, or copper vessels to a temple within 24 hours.", emergencyAdvice: "Light a ghee Diya facing East at sunrise for 11 consecutive mornings. Recite Maha Mrityunjaya Mantra 108 times daily." },
  { id: "legal", name: "Court Case / Legal Battle", icon: "⚖️", afflictingGraha: "Shani (Saturn) + Rahu", grahaColor: "text-blue-400", immediateMantra: "ॐ शं शनैश्चराय नमः। ॐ रां राहवे नमः॥", directionToFace: "West (Paschim) facing the setting Sun", immediateDonation: "Donate black sesame seeds (Kala Til) and a black blanket to an elderly person.", emergencyAdvice: "Visit a Hanuman temple every Saturday. Recite Hanuman Chalisa 7 times before each court date." },
  { id: "financial", name: "Sudden Financial Loss / Bankruptcy", icon: "💸", afflictingGraha: "Rahu + Shani in 2nd/11th House", grahaColor: "text-amber-400", immediateMantra: "ॐ ह्रीं श्रीं लक्ष्मीभ्यो नमः। ॐ यक्षाय कुबेराय वैश्रवणाय नमः॥", directionToFace: "North (Uttar) — the direction of Lord Kuber", immediateDonation: "Donate coins to a Lakshmi-Narayana temple; offer rice and turmeric.", emergencyAdvice: "Place a Kuber Yantra in your North-East cashbox. Avoid lending money on Tuesdays and Saturdays." },
  { id: "relationship", name: "Relationship Breakdown / Divorce Threat", icon: "💔", afflictingGraha: "Mangal (Mars) + Shukra (Venus) Affliction", grahaColor: "text-pink-400", immediateMantra: "ॐ शुक्राय नमः। ॐ क्लीं कामदेवाय विद्महे पुष्पबाणाय धीमहि तन्नो अनंग प्रचोदयात्॥", directionToFace: "South-East (Agneya) — the direction of harmony", immediateDonation: "Offer white sweets and fragrant flowers at a Shiva-Parvati temple together.", emergencyAdvice: "Both partners should recite Shiva-Parvati Stotra on Monday evenings. Fast on the 1st Monday of every month." },
  { id: "accident", name: "Accident / Travel Mishap", icon: "🚗", afflictingGraha: "Mars + Rahu Conjunction", grahaColor: "text-red-400", immediateMantra: "ॐ हनुमते नमः। ॐ ऐं ह्रीं क्लीं चामुण्डायै विच्चे॥", directionToFace: "South (Dakshin) facing a Hanuman image", immediateDonation: "Donate red lentils (Masoor Dal) and sindoor to a Hanuman temple immediately.", emergencyAdvice: "Carry a silver Hanuman pendant while traveling. Recite Bajrang Baan before every long journey." },
  { id: "career", name: "Sudden Job Loss / Career Sabotage", icon: "💼", afflictingGraha: "Saturn + Sun Combustion (Asta Graha)", grahaColor: "text-blue-400", immediateMantra: "ॐ सूर्याय नमः। ॐ घृणिः सूर्य आदित्य। ॐ प्रां प्रीं प्रौं सः शनैश्चराय नमः॥", directionToFace: "East (Purva) at sunrise", immediateDonation: "Offer water (Arghya) to Surya Deva in a copper vessel every sunrise for 43 days.", emergencyAdvice: "Wear a Ruby (Manik) or Garnet on your right ring finger after Pandit Ji's consultation." },
];

export default function EmergencyGrahaShantiSOS() {
  const [selectedCrisisId, setSelectedCrisisId] = useState("");
  const [seekerName, setSeekerName] = useState("");
  const [isRevealed, setIsRevealed] = useState(false);

  const activeCrisis = CRISIS_TYPES.find((c) => c.id === selectedCrisisId);

  const handleReveal = (crisisId: string) => {
    setSelectedCrisisId(crisisId);
    setIsRevealed(true);
  };

  const cleanName = seekerName.trim() || "Seeker";

  return (
    <div className="my-10 bg-gradient-to-b from-[#1c0808] via-[#280c0c] to-[#0f0303] border-2 border-red-500/60 rounded-3xl p-6 sm:p-12 shadow-[0_20px_80px_rgba(220,38,38,0.25)] relative overflow-hidden text-center">
      <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 bg-red-600/20 rounded-full blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 w-96 h-96 bg-amber-600/15 rounded-full blur-[140px]" />

      <div className="relative z-10 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/20 border border-red-400/50 text-red-300 text-[11px] font-extrabold uppercase tracking-widest mb-3 animate-pulse">
          <Zap className="w-3.5 h-3.5" />
          <span>Emergency Planetary Crisis Intervention</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-bold font-serif text-white tracking-wide mb-2">
          ॥ आपातकालीन ग्रह शान्ति SOS ॥
        </h2>
        <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto mb-4 font-light leading-relaxed">
          When life strikes unexpectedly, Vedic Shastras provide <strong>instant 60-second Kavach Protocols</strong>. Select your crisis to receive your immediate emergency mantra, direction, and donation remedy.
        </p>

        {/* Name Input */}
        <div className="max-w-xs mx-auto mb-6">
          <input type="text" placeholder="Your Name (for Sankalp)" value={seekerName} onChange={(e) => setSeekerName(e.target.value)} className="w-full bg-black/80 border border-white/20 rounded-xl px-4 py-2.5 text-xs text-white text-center placeholder-gray-500 focus:outline-none focus:border-red-400" />
        </div>

        {/* ── 6 Crisis Type Selector Cards ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
          {CRISIS_TYPES.map((crisis) => {
            const isSelected = selectedCrisisId === crisis.id;
            return (
              <button key={crisis.id} type="button" onClick={() => handleReveal(crisis.id)} className={`p-4 rounded-2xl border text-center transition-all cursor-pointer ${isSelected ? "bg-red-900/40 border-2 border-red-400 shadow-[0_0_20px_rgba(220,38,38,0.4)] scale-105" : "bg-black/60 hover:bg-black/85 border-white/10"}`}>
                <span className="text-2xl block mb-1">{crisis.icon}</span>
                <span className="text-[11px] font-bold text-white block leading-tight">{crisis.name}</span>
              </button>
            );
          })}
        </div>

        {/* ── Emergency Kavach Protocol Card ── */}
        {isRevealed && activeCrisis && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 text-left animate-fadeIn">
            <div className="bg-gradient-to-br from-[#2a0e0e] to-black/95 border-2 border-red-500/50 rounded-3xl p-6 sm:p-9 shadow-2xl relative">
              <div className="pb-4 border-b border-red-500/30 mb-6">
                <span className="text-[10px] font-bold uppercase tracking-widest text-red-400 font-mono">⚡ 60-Second Emergency Kavach Protocol for {cleanName}</span>
                <h3 className="text-2xl sm:text-3xl font-bold font-serif text-white mt-1">{activeCrisis.icon} {activeCrisis.name}</h3>
                <p className="text-xs mt-1"><span className="text-gray-400">Afflicting Graha:</span> <strong className={activeCrisis.grahaColor}>{activeCrisis.afflictingGraha}</strong></p>
              </div>

              {/* Immediate Mantra */}
              <div className="p-4 rounded-2xl bg-black/70 border border-red-500/30 mb-4 text-center">
                <span className="text-[10px] uppercase font-bold tracking-widest text-red-400 block mb-1">🔱 Chant This Mantra RIGHT NOW (108 Times)</span>
                <p className="text-sm font-serif text-[#ffd700] italic font-semibold leading-relaxed">&ldquo;{activeCrisis.immediateMantra}&rdquo;</p>
              </div>

              {/* 3 Action Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 text-xs">
                <div className="bg-black/50 border border-white/10 rounded-2xl p-4">
                  <span className="text-[10px] uppercase text-amber-400 font-bold tracking-widest block mb-1">🧭 Face This Direction</span>
                  <p className="text-white font-medium">{activeCrisis.directionToFace}</p>
                </div>
                <div className="bg-black/50 border border-white/10 rounded-2xl p-4">
                  <span className="text-[10px] uppercase text-emerald-400 font-bold tracking-widest block mb-1">🎁 Donate Within 24 Hours</span>
                  <p className="text-white font-medium">{activeCrisis.immediateDonation}</p>
                </div>
                <div className="bg-black/50 border border-white/10 rounded-2xl p-4">
                  <span className="text-[10px] uppercase text-blue-400 font-bold tracking-widest block mb-1">📿 Ongoing Daily Sadhana</span>
                  <p className="text-white font-medium">{activeCrisis.emergencyAdvice}</p>
                </div>
              </div>

              {/* Emergency WhatsApp Call Bridge */}
              <div className="bg-gradient-to-r from-[#400a0a] via-[#280505] to-[#400a0a] border-2 border-red-500/60 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-xl">
                <div>
                  <h4 className="text-base font-serif font-bold text-white mb-1">🚨 Book Emergency 30-Min Graha Shanti Call</h4>
                  <p className="text-xs text-gray-300 leading-relaxed font-light">Pandit Ji will perform an immediate emergency remote consecration Havan with your Gotra Sankalp within 30 minutes of booking.</p>
                </div>
                <div className="flex flex-col gap-2 shrink-0 w-full sm:w-auto">
                  <Link href="/request-guidance?service=emergency" className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-red-600 via-red-500 to-red-600 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 flex items-center justify-center gap-1.5 transition-all">
                    <Phone className="w-3.5 h-3.5" /><span>Emergency Call (₹2,100)</span>
                  </Link>
                  <Link href="/request-guidance?service=temple-puja" className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#ffd700] to-[#d4af37] text-black font-extrabold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 flex items-center justify-center gap-1.5 transition-all">
                    <span>Urgent Kashi Havan (₹5,100)</span><ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            <SanctifiedVerdictStickyBar serviceId="emergency" serviceName={`Emergency Graha Shanti for ${activeCrisis.name}`} price={2100} badge="⚡ Crisis Kavach Active" />
          </motion.div>
        )}
      </div>
    </div>
  );
}
