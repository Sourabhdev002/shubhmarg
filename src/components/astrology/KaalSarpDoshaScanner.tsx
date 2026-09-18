"use client";

import React, { useState } from "react";
import { Sparkles, ShieldAlert, ArrowRight } from "lucide-react";
import Link from "next/link";
import DirectWhatsAppButton from "@/components/shared/DirectWhatsAppButton";
import VedicCalculationLoader from "@/components/shared/VedicCalculationLoader";
import SanctifiedVerdictStickyBar from "@/components/shared/SanctifiedVerdictStickyBar";

interface KaalSarpType {
  id: string;
  name: string;
  sanskritName: string;
  rahuHouse: string;
  ketuHouse: string;
  affectedDomain: string;
  severity: string;
  manifestation: string;
  resolution: string;
  resolutionTemple: string;
}

const KAAL_SARP_TYPES: KaalSarpType[] = [
  { id: "anant", name: "Anant Kaal Sarp Dosha", sanskritName: "अनन्त कालसर्प दोष", rahuHouse: "1st (Lagna)", ketuHouse: "7th (Kalatra)", affectedDomain: "Self-Identity & Marriage", severity: "Intense", manifestation: "Persistent identity confusion, delayed marriage, constant struggle between personal ambition and partnership demands.", resolution: "Rahu-Ketu Shanti Havan + Naga Panchami Puja", resolutionTemple: "Trimbakeshwar Jyotirlinga, Nashik" },
  { id: "kulik", name: "Kulik Kaal Sarp Dosha", sanskritName: "कुलिक कालसर्प दोष", rahuHouse: "2nd (Dhana)", ketuHouse: "8th (Ayu)", affectedDomain: "Family Wealth & Longevity", severity: "High", manifestation: "Sudden financial drains, inheritance disputes, family health crises, and wealth stagnation despite hard work.", resolution: "Maha Mrityunjaya Japa + Silver Naga Consecration", resolutionTemple: "Mahakaleshwar Jyotirlinga, Ujjain" },
  { id: "vasuki", name: "Vasuki Kaal Sarp Dosha", sanskritName: "वासुकि कालसर्प दोष", rahuHouse: "3rd (Sahaj)", ketuHouse: "9th (Bhagya)", affectedDomain: "Courage & Fortune", severity: "Moderate", manifestation: "Suppressed courage, sibling conflicts, blocked spiritual progress, and fortune arriving late in life.", resolution: "Naga Stotra Parayana + Rahu Beej Mantra 18,000 Japa", resolutionTemple: "Kalahasti Temple, Andhra Pradesh" },
  { id: "shankhpal", name: "Shankhpal Kaal Sarp Dosha", sanskritName: "शंखपाल कालसर्प दोष", rahuHouse: "4th (Sukh)", ketuHouse: "10th (Karma)", affectedDomain: "Domestic Peace & Career", severity: "High", manifestation: "Chronic domestic unrest, property disputes, career instability, and mother's health concerns.", resolution: "Navagraha Shanti + Ganga Jal Abhishekam on Panchami", resolutionTemple: "Rameswaram Jyotirlinga, Tamil Nadu" },
  { id: "padma", name: "Padma Kaal Sarp Dosha", sanskritName: "पद्म कालसर्प दोष", rahuHouse: "5th (Putra)", ketuHouse: "11th (Labha)", affectedDomain: "Children & Gains", severity: "Moderate", manifestation: "Difficulties in conceiving, children's health issues, speculative losses, and delayed professional recognition.", resolution: "Santaan Gopal Puja + Naga Puja at Subramanya Temple", resolutionTemple: "Kukke Subramanya, Karnataka" },
  { id: "mahapadma", name: "Mahapadma Kaal Sarp Dosha", sanskritName: "महापद्म कालसर्प दोष", rahuHouse: "6th (Ripu)", ketuHouse: "12th (Moksha)", affectedDomain: "Enemies & Spiritual Liberation", severity: "Moderate", manifestation: "Hidden enemies, chronic legal battles, unexplained expenditure, and sleep disorders or psychic disturbances.", resolution: "Sarpa Suktam Parayana + Silver Snake Donation", resolutionTemple: "Nageshwar Jyotirlinga, Gujarat" },
  { id: "takshak", name: "Takshak Kaal Sarp Dosha", sanskritName: "तक्षक कालसर्प दोष", rahuHouse: "7th (Kalatra)", ketuHouse: "1st (Lagna)", affectedDomain: "Partnerships & Self", severity: "Intense", manifestation: "Multiple relationship failures, business partner betrayals, chronic marital friction, and self-sabotaging patterns.", resolution: "Kaal Sarp Nivaran Maha Puja + Naga Pratishtha", resolutionTemple: "Trimbakeshwar Jyotirlinga, Nashik" },
  { id: "karkotak", name: "Karkotak Kaal Sarp Dosha", sanskritName: "कर्कोटक कालसर्प दोष", rahuHouse: "8th (Ayu)", ketuHouse: "2nd (Dhana)", affectedDomain: "Sudden Upheavals & Wealth", severity: "Intense", manifestation: "Sudden accidents, unexpected surgeries, inheritance losses, and chronic financial insecurity.", resolution: "Maha Mrityunjaya 1.25 Lakh Japa + Rudra Abhishekam", resolutionTemple: "Mahakaleshwar Jyotirlinga, Ujjain" },
];

export default function KaalSarpDoshaScanner() {
  const [selectedDoshaId, setSelectedDoshaId] = useState("anant");
  const [seekerName, setSeekerName] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [activeDosha, setActiveDosha] = useState(KAAL_SARP_TYPES[0]);

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    setIsScanning(true);
    setTimeout(() => {
      const found = KAAL_SARP_TYPES.find((d) => d.id === selectedDoshaId) || KAAL_SARP_TYPES[0];
      setActiveDosha(found);
      setIsScanning(false);
    }, 2000);
  };

  const cleanName = seekerName.trim() || "Seeker";

  return (
    <div className="my-10 bg-gradient-to-b from-[#180808] via-[#240c0c] to-[#0d0303] border-2 border-[#d4af37] rounded-3xl p-6 sm:p-12 shadow-[0_20px_80px_rgba(212,175,55,0.3)] relative overflow-hidden text-center">
      <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 bg-purple-600/15 rounded-full blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 w-96 h-96 bg-[#d4af37]/15 rounded-full blur-[140px]" />

      <div className="relative z-10 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/15 border border-purple-400/40 text-purple-300 text-[11px] font-extrabold uppercase tracking-widest mb-3">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Rahu-Ketu Axis &amp; Kaal Sarp Nivaran</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-bold font-serif text-white tracking-wide mb-2">
          ॥ कालसर्प दोष एवं पित्र दोष महास्कैनर ॥
        </h2>
        <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto mb-8 font-light leading-relaxed">
          Kaal Sarp Dosha occurs when all 7 planets are hemmed between Rahu and Ketu. This is <strong>NOT a curse</strong> — it is a karmic maturation pattern that resolves with the prescribed Vedic Nivaran path.
        </p>

        {/* Input Form */}
        <form onSubmit={handleScan} className="bg-black/75 border border-white/15 rounded-3xl p-5 sm:p-7 mb-8 text-left backdrop-blur-xl shadow-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#d4af37] mb-1.5">Your Full Name</label>
              <input type="text" placeholder="e.g. Pooja Mishra" value={seekerName} onChange={(e) => setSeekerName(e.target.value)} className="w-full bg-black/80 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37]" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#d4af37] mb-1.5">Select Kaal Sarp Type</label>
              <select value={selectedDoshaId} onChange={(e) => setSelectedDoshaId(e.target.value)} className="w-full bg-black/80 border border-white/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4af37]">
                {KAAL_SARP_TYPES.map((d) => (<option key={d.id} value={d.id} className="bg-[#1a1a1a]">{d.name} (Rahu in {d.rahuHouse})</option>))}
              </select>
            </div>
          </div>
          <button type="submit" disabled={isScanning} className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#d4af37] via-[#ffd700] to-[#d4af37] text-black font-extrabold text-sm uppercase tracking-wider shadow-[0_4px_25px_rgba(212,175,55,0.4)] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer">
            <Sparkles className="w-5 h-5" /><span>Diagnose Kaal Sarp Dosha &amp; Nivaran Path</span>
          </button>
        </form>

        {isScanning && (
          <VedicCalculationLoader title="Scanning Rahu-Ketu Shadow Axis Alignment" stages={["Mapping Rahu's North Node House Placement...", "Tracing Ketu's South Node & Karmic Release Point...", "Evaluating All 7 Graha Hemming Between Shadow Nodes...", "Prescribing Classical Nivaran Temple & Japa Sadhana..."]} estimatedSeconds={2} />
        )}

        {/* ── Dosha Result Card ── */}
        {activeDosha && !isScanning && (
          <div className="space-y-6 text-left animate-fadeIn">
            <div className="bg-gradient-to-br from-[#241010] to-black/95 border-2 border-[#d4af37] rounded-3xl p-6 sm:p-9 shadow-2xl">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#d4af37]/30 mb-6">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37] font-mono">Dosha Assessment for {cleanName}</span>
                  <h3 className="text-2xl sm:text-3xl font-bold font-serif text-white mt-1">{activeDosha.name}</h3>
                  <span className="text-xs text-amber-200/90 font-devanagari font-bold">॥ {activeDosha.sanskritName} ॥</span>
                </div>
                <div className={`px-4 py-1.5 rounded-full text-xs font-bold border ${activeDosha.severity === "Intense" ? "bg-red-500/20 text-red-300 border-red-500/40" : activeDosha.severity === "High" ? "bg-amber-500/20 text-amber-300 border-amber-500/40" : "bg-blue-500/20 text-blue-300 border-blue-500/40"}`}>
                  {activeDosha.severity} Severity
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-6 text-xs">
                <div className="bg-black/60 border border-white/10 rounded-2xl p-4">
                  <span className="text-[10px] uppercase text-gray-400 font-bold tracking-widest block mb-1">Rahu Position</span>
                  <p className="text-sm font-bold text-purple-300">{activeDosha.rahuHouse} House</p>
                </div>
                <div className="bg-black/60 border border-white/10 rounded-2xl p-4">
                  <span className="text-[10px] uppercase text-gray-400 font-bold tracking-widest block mb-1">Ketu Position</span>
                  <p className="text-sm font-bold text-purple-300">{activeDosha.ketuHouse} House</p>
                </div>
                <div className="bg-black/60 border border-white/10 rounded-2xl p-4">
                  <span className="text-[10px] uppercase text-gray-400 font-bold tracking-widest block mb-1">Affected Life Domain</span>
                  <p className="text-sm font-bold text-amber-300">{activeDosha.affectedDomain}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-xs sm:text-sm">
                <div className="bg-red-950/30 border border-red-500/30 rounded-2xl p-5">
                  <span className="text-[10px] uppercase text-red-400 font-bold tracking-widest block mb-1">Present-Life Manifestation</span>
                  <p className="text-gray-200 leading-relaxed font-light">{activeDosha.manifestation}</p>
                </div>
                <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-2xl p-5">
                  <span className="text-[10px] uppercase text-emerald-400 font-bold tracking-widest block mb-1">✅ Classical Nivaran Remedy</span>
                  <p className="text-white font-medium mb-2">{activeDosha.resolution}</p>
                  <span className="text-[10px] uppercase text-[#d4af37] font-bold">🏛️ Sacred Temple: {activeDosha.resolutionTemple}</span>
                </div>
              </div>

              {/* Non-Fearful Shastra Reassurance */}
              <div className="p-4 rounded-2xl bg-black/60 border border-[#d4af37]/30 mb-6 text-xs sm:text-sm text-gray-300">
                <p className="leading-relaxed"><strong className="text-emerald-300">🌿 Important Shastra Clarification:</strong> Kaal Sarp Dosha is NOT a permanent curse. Classical Parashari and Jaimini texts confirm it is a temporary karmic maturation phase. With the prescribed Nivaran Puja and consistent Japa, the dosha&apos;s grip dissolves — often unlocking accelerated spiritual growth and sudden material breakthroughs in the post-remedy period.</p>
              </div>

              {/* High-Ticket Trimbakeshwar Nivaran Puja Bridge */}
              <div className="bg-gradient-to-r from-[#38160a] via-[#1f0904] to-[#38160a] border-2 border-amber-500/50 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-xl">
                <div>
                  <h4 className="text-base font-serif font-bold text-white mb-1">Book Authentic Kaal Sarp Nivaran Puja at {activeDosha.resolutionTemple}</h4>
                  <p className="text-xs text-gray-300 leading-relaxed font-light">Pandit Ji performs the complete Kaal Sarp Nivaran with 11,000 Rahu-Ketu Beej Mantra Japa, Naga Pratishtha, and Rudra Abhishekam at the sacred Jyotirlinga.</p>
                </div>
                <div className="flex flex-col gap-2 shrink-0 w-full sm:w-auto">
                  <Link href="/request-guidance?service=temple-puja" className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#ffd700] to-[#d4af37] text-black font-extrabold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 flex items-center justify-center gap-1.5 transition-all">
                    <span>Kaal Sarp Nivaran (₹5,100)</span><ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <DirectWhatsAppButton variant="compact" serviceName={`Kaal Sarp Nivaran Puja (${activeDosha.name})`} price={5100} className="w-full justify-center py-2 text-xs" />
                </div>
              </div>
            </div>

            <SanctifiedVerdictStickyBar serviceId="temple-puja" serviceName={`Kaal Sarp Nivaran (${activeDosha.resolutionTemple})`} price={5100} badge="Kaal Sarp Dosha Scanned" />
          </div>
        )}
      </div>
    </div>
  );
}
