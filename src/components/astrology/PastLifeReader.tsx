"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Eye } from "lucide-react";
import Link from "next/link";
import DirectWhatsAppButton from "@/components/shared/DirectWhatsAppButton";
import VedicCalculationLoader from "@/components/shared/VedicCalculationLoader";
import SanctifiedVerdictStickyBar from "@/components/shared/SanctifiedVerdictStickyBar";

const HOUSES = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th"];

interface PastLifeReading {
  rahuHouse: string;
  ketuHouse: string;
  pastOccupation: string;
  pastOccupationIcon: string;
  pastGeography: string;
  pastGeoIcon: string;
  pastPersonality: string;
  unfinishedKarma: string;
  thisLifeMission: string;
  missionIcon: string;
  soulAge: string;
  pastLifeEra: string;
  karmaIntensity: string;
}

const PAST_LIFE_MAP: Record<string, PastLifeReading> = {
  "1-7": { rahuHouse: "1st", ketuHouse: "7th", pastOccupation: "Royal Diplomat or Marriage Counselor", pastOccupationIcon: "👑", pastGeography: "A prosperous ancient court — possibly Vijayanagara or a Mughal darbar", pastGeoIcon: "🏛️", pastPersonality: "You were deeply devoted to partnerships and sacrificed your own identity for others. You lived through your spouse or partner.", unfinishedKarma: "Excessive dependence on others for self-worth. You gave up your personal ambitions to keep harmony in relationships.", thisLifeMission: "To build a powerful, independent identity. This life demands you stand alone before you partner. Your soul craves self-sovereignty.", missionIcon: "🔱", soulAge: "Mature Soul (4th-5th incarnation cycle)", pastLifeEra: "Medieval Period (800-1400 CE)", karmaIntensity: "Moderate" },
  "2-8": { rahuHouse: "2nd", ketuHouse: "8th", pastOccupation: "Tantric Healer or Occult Practitioner", pastOccupationIcon: "🔮", pastGeography: "A remote Himalayan cave monastery or ancient Varanasi cremation grounds", pastGeoIcon: "🏔️", pastPersonality: "You possessed deep occult knowledge, performed death rituals, and understood the mysteries of transformation. You were feared and revered.", unfinishedKarma: "Misuse of occult power for personal gain. Knowledge of death rituals created karmic debts with departed souls.", thisLifeMission: "To build stable, honest material wealth through transparent means. Your soul must learn the value of simple, ethical earning.", missionIcon: "💰", soulAge: "Old Soul (6th-7th incarnation cycle)", pastLifeEra: "Ancient Period (1500-500 BCE)", karmaIntensity: "Intense" },
  "3-9": { rahuHouse: "3rd", ketuHouse: "9th", pastOccupation: "Wandering Monk, Philosopher, or University Teacher", pastOccupationIcon: "📜", pastGeography: "Nalanda or Takshashila — ancient centers of learning and philosophy", pastGeoIcon: "🏫", pastPersonality: "You were a revered teacher who spent lifetimes accumulating spiritual wisdom. You were dogmatic and rigid in your beliefs.", unfinishedKarma: "Spiritual arrogance. You believed your path was the only truth and dismissed other viewpoints as inferior.", thisLifeMission: "To become a communicator, writer, and practical doer. Less philosophy, more action. Your soul needs courage over contemplation.", missionIcon: "✍️", soulAge: "Old Soul (5th-6th incarnation cycle)", pastLifeEra: "Classical Period (500 BCE - 500 CE)", karmaIntensity: "Moderate" },
  "4-10": { rahuHouse: "4th", ketuHouse: "10th", pastOccupation: "Powerful King, General, or Political Leader", pastOccupationIcon: "⚔️", pastGeography: "A vast empire — possibly Maurya, Chola, or Rajput kingdoms", pastGeoIcon: "🗡️", pastPersonality: "You held enormous worldly power and public authority. You were feared, respected, and made decisions affecting thousands of lives.", unfinishedKarma: "Neglect of family and emotional life in pursuit of power. Your children and spouse suffered your absence.", thisLifeMission: "To build a warm, nurturing home. Career ambition must yield to emotional security. Your soul craves the peace you denied your family.", missionIcon: "🏠", soulAge: "Mature Soul (4th incarnation cycle)", pastLifeEra: "Medieval Period (500-1200 CE)", karmaIntensity: "High" },
  "5-11": { rahuHouse: "5th", ketuHouse: "11th", pastOccupation: "Community Leader, Social Reformer, or Guild Master", pastOccupationIcon: "🤝", pastGeography: "A thriving trading city — Lothal, Surat, or Southeast Asian maritime ports", pastGeoIcon: "⛵", pastPersonality: "You organized communities, managed trade networks, and prioritized collective welfare over personal desires.", unfinishedKarma: "Suppression of personal creativity and romance for community obligations. You never pursued your own passions.", thisLifeMission: "To explore personal creative expression, romance, and children. Your soul demands you create something uniquely yours — art, love, legacy.", missionIcon: "🎭", soulAge: "Mature Soul (3rd-4th incarnation cycle)", pastLifeEra: "Ancient Maritime Period (300 BCE - 800 CE)", karmaIntensity: "Moderate" },
  "6-12": { rahuHouse: "6th", ketuHouse: "12th", pastOccupation: "Ascetic Renunciant, Forest Hermit, or Sannyasi", pastOccupationIcon: "🙏", pastGeography: "A remote forest ashram — Dandakaranya, Naimisharanya, or Rishikesh banks", pastGeoIcon: "🌿", pastPersonality: "You renounced the material world entirely. You meditated in isolation, avoided human contact, and sought Moksha through extreme austerity.", unfinishedKarma: "Escapism disguised as spirituality. You fled from life's challenges rather than facing them.", thisLifeMission: "To serve others through practical work — healthcare, service, routine discipline. Your soul must engage with the messy, real world.", missionIcon: "⚕️", soulAge: "Old Soul (7th-8th incarnation cycle)", pastLifeEra: "Vedic Period (2000-1000 BCE)", karmaIntensity: "Intense" },
  "7-1": { rahuHouse: "7th", ketuHouse: "1st", pastOccupation: "Fierce Independent Warrior or Lone Explorer", pastOccupationIcon: "🏹", pastGeography: "Frontier lands — Khyber Pass, Central Asian steppes, or tribal territories", pastGeoIcon: "🏜️", pastPersonality: "You were intensely self-reliant, refused help from anyone, and lived by your own rules. A lone wolf who trusted no one.", unfinishedKarma: "Extreme selfishness and inability to compromise. You hurt those who tried to love you.", thisLifeMission: "To learn partnership, compromise, and genuine intimacy. Your soul must dissolve ego boundaries and merge with another.", missionIcon: "💍", soulAge: "Young Soul (2nd-3rd incarnation cycle)", pastLifeEra: "Tribal Period (3000-1500 BCE)", karmaIntensity: "High" },
  "8-2": { rahuHouse: "8th", ketuHouse: "2nd", pastOccupation: "Wealthy Merchant, Banker, or Land Owner", pastOccupationIcon: "💎", pastGeography: "A prosperous trading hub — ancient Pataliputra, Ujjain, or Silk Road caravanserai", pastGeoIcon: "🏪", pastPersonality: "You accumulated vast material wealth, owned lands, and controlled resources. Your voice and words carried authority.", unfinishedKarma: "Hoarding wealth while others starved. You prioritized material security over generosity.", thisLifeMission: "To explore the hidden, mystical dimensions of life. Embrace transformation, research, and occult wisdom. Let go of material attachments.", missionIcon: "🔮", soulAge: "Mature Soul (3rd incarnation cycle)", pastLifeEra: "Classical Period (300 BCE - 600 CE)", karmaIntensity: "Moderate" },
  "9-3": { rahuHouse: "9th", ketuHouse: "3rd", pastOccupation: "Skilled Craftsman, Scribe, or Messenger", pastOccupationIcon: "📝", pastGeography: "A busy marketplace — Hampi bazaar, Mohenjo-daro craft district, or temple workshop", pastGeoIcon: "🏺", pastPersonality: "You were practical, detail-oriented, and worked with your hands. You valued skill over theory and action over philosophy.", unfinishedKarma: "Intellectual laziness. You avoided deeper questions about life's meaning, focusing only on immediate tasks.", thisLifeMission: "To pursue higher education, philosophy, dharma, and spiritual teaching. Your soul must become the guru you once dismissed.", missionIcon: "📚", soulAge: "Young Soul (2nd incarnation cycle)", pastLifeEra: "Indus Valley Period (2500-1500 BCE)", karmaIntensity: "Low" },
  "10-4": { rahuHouse: "10th", ketuHouse: "4th", pastOccupation: "Devoted Homemaker, Farmer, or Village Elder", pastOccupationIcon: "🌾", pastGeography: "A peaceful agricultural village — Gangetic plains, Kerala backwaters, or Tamil countryside", pastGeoIcon: "🏡", pastPersonality: "You were deeply rooted in home, family, and land. You never ventured beyond your village. Comfort was your kingdom.", unfinishedKarma: "Fear of the outside world. You avoided public responsibility and leadership when your community needed you.", thisLifeMission: "To build a powerful public career and legacy. Leave the comfort zone. Your soul demands worldly achievement and recognition.", missionIcon: "🏆", soulAge: "Young Soul (1st-2nd incarnation cycle)", pastLifeEra: "Agricultural Period (1000-500 BCE)", karmaIntensity: "Low" },
  "11-5": { rahuHouse: "11th", ketuHouse: "5th", pastOccupation: "Royal Artist, Poet, Dancer, or Temple Musician", pastOccupationIcon: "🎶", pastGeography: "A royal court — Thanjavur Nayak palace, Jaipur Maharaja's court, or Gupta-era Nalanda", pastGeoIcon: "🎪", pastPersonality: "You were a celebrated creative genius — a dancer, musician, or poet who lived for self-expression and romantic passion.", unfinishedKarma: "Narcissistic creativity. You used your gifts for personal glory rather than community benefit.", thisLifeMission: "To channel creativity into community building, humanitarian causes, and large-scale social impact. Art must serve the many.", missionIcon: "🌍", soulAge: "Mature Soul (4th-5th incarnation cycle)", pastLifeEra: "Golden Age (300-800 CE)", karmaIntensity: "Moderate" },
  "12-6": { rahuHouse: "12th", ketuHouse: "6th", pastOccupation: "Military Commander, Physician, or Healer", pastOccupationIcon: "🛡️", pastGeography: "A battlefield or military hospital — Kurukshetra, Kalinga, or Maratha campaign grounds", pastGeoIcon: "⚔️", pastPersonality: "You served others through discipline, health, and protection. You fought wars, healed soldiers, and maintained order.", unfinishedKarma: "Over-attachment to duty at the cost of spiritual growth. You served the body but neglected the soul.", thisLifeMission: "To seek spiritual liberation, meditation, and moksha. Your soul has served enough — now it must dissolve into the divine.", missionIcon: "🕉️", soulAge: "Ancient Soul (8th+ incarnation cycle)", pastLifeEra: "Epic Period (Mahabharata/Ramayana era)", karmaIntensity: "Intense" },
};

export default function PastLifeReader() {
  const [rahuHouse, setRahuHouse] = useState("1st");
  const [ketuHouse, setKetuHouse] = useState("7th");
  const [seekerName, setSeekerName] = useState("");
  const [isReading, setIsReading] = useState(false);
  const [reading, setReading] = useState<PastLifeReading | null>(null);

  const handleRead = (e: React.FormEvent) => {
    e.preventDefault();
    setIsReading(true);
    setTimeout(() => {
      const rhNum = HOUSES.indexOf(rahuHouse) + 1;
      const khNum = HOUSES.indexOf(ketuHouse) + 1;
      const key = `${rhNum}-${khNum}`;
      const found = PAST_LIFE_MAP[key] || PAST_LIFE_MAP["1-7"];
      setReading(found);
      setIsReading(false);
    }, 2500);
  };

  const cleanName = seekerName.trim() || "Seeker";

  // Auto-set Ketu opposite to Rahu
  const handleRahuChange = (val: string) => {
    setRahuHouse(val);
    const idx = HOUSES.indexOf(val);
    setKetuHouse(HOUSES[(idx + 6) % 12]);
  };

  return (
    <div className="my-10 bg-[#FFFDF8] border-2 border-[#d4af37] rounded-[2.5rem] p-6 sm:p-12 shadow-[0_25px_100px_rgba(212,175,55,0.3)] relative overflow-hidden text-center">
      <div className="pointer-events-none absolute -top-40 -left-40 w-[450px] h-[450px] bg-purple-500/15 rounded-full blur-[150px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 w-[450px] h-[450px] bg-indigo-500/15 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/15 border border-purple-400/40 text-purple-300 text-[11px] font-extrabold uppercase tracking-widest mb-3">
          <Eye className="w-3.5 h-3.5" />
          <span>Rahu-Ketu Past-Life Karmic Analysis</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-bold font-serif text-[#2A1810] tracking-wide mb-2">
          ॥ पूर्व जन्म पत्रिका ॥
        </h2>
        <p className="text-xs sm:text-sm text-[#6B5A48] max-w-xl mx-auto mb-8 font-light leading-relaxed">
          Your Rahu (North Node) reveals <strong>your soul&apos;s mission this life</strong>. Your Ketu (South Node) reveals <strong>who you were in your past life</strong>. This analysis uses classical Parashari methodology to decode your karmic journey across incarnations.
        </p>

        <form onSubmit={handleRead} className="bg-[#FBF6EC] border border-[#B8860B]/20 rounded-3xl p-5 sm:p-8 mb-8 text-left backdrop-blur-xl shadow-[0_14px_40px_-18px_rgba(107,42,20,0.25)] space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-[#C25E10] mb-1">Your Name</label>
              <input type="text" placeholder="e.g. Priya Kapoor" value={seekerName} onChange={(e) => setSeekerName(e.target.value)} className="w-full bg-[#FBF6EC] border border-[#B8860B]/20 rounded-xl px-4 py-2.5 text-xs text-[#2A1810] placeholder-[#6B5A48]/60 focus:outline-none focus:border-[#d4af37]" />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-[#C25E10] mb-1">Rahu (North Node) House</label>
              <select value={rahuHouse} onChange={(e) => handleRahuChange(e.target.value)} className="w-full bg-[#FBF6EC] border border-[#B8860B]/20 rounded-xl px-4 py-2.5 text-xs text-[#2A1810] focus:outline-none focus:border-[#d4af37]">
                {HOUSES.map((h) => (<option key={h} value={h} className="bg-[#1a1a1a]">{h} House</option>))}
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-[#C25E10] mb-1">Ketu (South Node) House</label>
              <input type="text" readOnly value={`${ketuHouse} House (auto-calculated)`} className="w-full bg-[#FBF6EC] border border-[#B8860B]/20 rounded-xl px-4 py-2.5 text-xs text-[#6B5A48] cursor-not-allowed" />
            </div>
          </div>
          <button type="submit" disabled={isReading} className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 text-[#2A1810] font-extrabold text-sm uppercase tracking-wider shadow-[0_4px_25px_rgba(147,51,234,0.4)] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer">
            <Eye className="w-5 h-5" /><span>Reveal My Past Life</span>
          </button>
        </form>

        {isReading && (
          <VedicCalculationLoader title="Traversing Karmic Timelines..." stages={["Tracing Ketu's South Node — your soul's point of origin...", "Decoding past-life occupation from 12th-from-Ketu...", "Mapping unfinished karmic debts across incarnations...", "Revealing Rahu's North Node dharmic mission for this life..."]} estimatedSeconds={2.5} />
        )}

        {reading && !isReading && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 text-left animate-fadeIn">
            <div className="bg-[#FFFDF8] border-2 border-[#d4af37] rounded-[2rem] p-6 sm:p-10 shadow-[0_20px_80px_rgba(212,175,55,0.3)] relative">
              <div className="pointer-events-none absolute top-3 left-4 text-[#C25E10]/40 text-xs font-serif">✦ ॥ पूर्व जन्म ॥ ✦</div>
              <div className="pointer-events-none absolute top-3 right-4 text-[#C25E10]/40 text-xs font-serif">✦ ॥ कर्म फल ॥ ✦</div>

              <div className="text-center pb-5 border-b-2 border-[#d4af37]/30 mb-6">
                <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#C25E10] block mb-1">Poorva Janma Patrika — Past-Life Karmic Scroll</span>
                <h3 className="text-2xl sm:text-3xl font-bold font-serif text-[#2A1810]">{cleanName}&apos;s Soul Journey</h3>
                <div className="flex items-center justify-center gap-3 mt-2 text-xs">
                  <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 font-bold">{reading.soulAge}</span>
                  <span className="px-3 py-1 rounded-full bg-amber-500/20 text-[#C25E10] border border-amber-500/30 font-bold">{reading.pastLifeEra}</span>
                </div>
              </div>

              {/* Past Life Identity */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-indigo-950/40 border border-indigo-500/30 rounded-2xl p-5">
                  <span className="text-3xl block mb-1">{reading.pastOccupationIcon}</span>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-300 block mb-1">Past-Life Occupation</span>
                  <p className="text-base font-bold text-[#2A1810] font-serif">{reading.pastOccupation}</p>
                </div>
                <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-2xl p-5">
                  <span className="text-3xl block mb-1">{reading.pastGeoIcon}</span>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-300 block mb-1">Past-Life Geography</span>
                  <p className="text-base font-bold text-[#2A1810] font-serif">{reading.pastGeography}</p>
                </div>
              </div>

              {/* Past-Life Personality */}
              <div className="p-5 rounded-2xl bg-[#FBF6EC] border border-[#B8860B]/20 mb-4">
                <span className="text-[10px] uppercase font-bold tracking-widest text-purple-300 block mb-1">🧬 Past-Life Personality & Nature</span>
                <p className="text-sm text-gray-200 font-light leading-relaxed">{reading.pastPersonality}</p>
              </div>

              {/* Unfinished Karma */}
              <div className="p-5 rounded-2xl bg-red-950/30 border border-red-500/30 mb-4">
                <span className="text-[10px] uppercase font-bold tracking-widest text-red-300 block mb-1">⚖️ Unfinished Karma Carried Forward</span>
                <p className="text-sm text-gray-200 font-light leading-relaxed">{reading.unfinishedKarma}</p>
              </div>

              {/* This-Life Mission */}
              <div className="p-5 rounded-2xl bg-[#d4af37]/10 border-2 border-[#B8860B]/30 mb-6">
                <span className="text-3xl block mb-1">{reading.missionIcon}</span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#C25E10] block mb-1">🔑 This-Life Dharmic Mission</span>
                <p className="text-base text-[#2A1810] font-serif font-semibold leading-relaxed">{reading.thisLifeMission}</p>
                <span className={`inline-block mt-2 px-3 py-1 rounded-full text-[10px] font-bold border ${reading.karmaIntensity === "Intense" ? "bg-red-500/20 text-red-300 border-red-500/40" : reading.karmaIntensity === "High" ? "bg-amber-500/20 text-[#C25E10] border-amber-500/40" : "bg-blue-500/20 text-blue-300 border-blue-500/40"}`}>Karma Intensity: {reading.karmaIntensity}</span>
              </div>

              {/* High-Ticket CTA */}
              <div className="bg-gradient-to-r from-[#2a1045] via-[#180828] to-[#2a1045] border-2 border-purple-500/50 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-xl">
                <div>
                  <h4 className="text-base font-serif font-bold text-[#2A1810] mb-1">Unlock Full 7-Page Past-Life Dossier</h4>
                  <p className="text-xs text-[#6B5A48] leading-relaxed font-light">Pandit Ji prepares a detailed 7-page report with past-life karmic debt quantification, remedial mantras, and Rahu-Ketu transit predictions.</p>
                </div>
                <div className="flex flex-col gap-2 shrink-0 w-full sm:w-auto">
                  <Link href="/request-guidance?service=deep-kundli" className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 text-[#2A1810] font-extrabold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 flex items-center justify-center gap-1.5 transition-all">
                    <span>Full Dossier (₹1,500)</span><ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <DirectWhatsAppButton variant="compact" serviceName={`Past-Life Karmic Dossier for ${cleanName}`} price={1500} className="w-full justify-center py-2 text-xs" />
                </div>
              </div>
            </div>

            <SanctifiedVerdictStickyBar serviceId="deep-kundli" serviceName="Past-Life Karmic Dossier" price={1500} badge="🔮 Past Life Revealed" />
          </motion.div>
        )}
      </div>
    </div>
  );
}
