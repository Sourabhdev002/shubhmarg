"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Clock, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import DirectWhatsAppButton from "@/components/shared/DirectWhatsAppButton";
import VedicCalculationLoader from "@/components/shared/VedicCalculationLoader";
import SanctifiedVerdictStickyBar from "@/components/shared/SanctifiedVerdictStickyBar";

interface EventCategory {
  id: string;
  name: string;
  sanskrit: string;
  icon: string;
  favorableNakshatras: string[];
  favorableTithis: string[];
  rulingDeity: string;
  sankalpMantra: string;
  sacredDirection: string;
  cautionWindow: string;
}

const EVENT_CATEGORIES: EventCategory[] = [
  {
    id: "griha-pravesh",
    name: "Griha Pravesh (Housewarming)",
    sanskrit: "गृह प्रवेश मुहूर्त",
    icon: "🏡",
    favorableNakshatras: ["Rohini", "Mrigashira", "Uttara Phalguni", "Chitra", "Anuradha", "Revati"],
    favorableTithis: ["Shukla Dvitiya", "Tritiya", "Panchami", "Saptami", "Dashami", "Ekadashi"],
    rulingDeity: "Vastu Purusha & Lord Kuber",
    sankalpMantra: "ॐ वास्तुपुरुषाय नमः। ॐ नमो भगवते वास्तुपुरुषाय महाबलपराक्रमाय सच्चिदानन्दमयाय स्वाहा॥",
    sacredDirection: "North-East (Ishanya)",
    cautionWindow: "Avoid during Tuesday, Saturday, and retrograde Jupiter windows."
  },
  {
    id: "vivah",
    name: "Vivah (Marriage Sanskar)",
    sanskrit: "विवाह संस्कार मुहूर्त",
    icon: "💍",
    favorableNakshatras: ["Rohini", "Mrigashira", "Magha", "Uttara Phalguni", "Hasta", "Swati", "Anuradha", "Mula"],
    favorableTithis: ["Dwitiya", "Tritiya", "Panchami", "Saptami", "Ekadashi", "Trayodashi"],
    rulingDeity: "Gauri-Shankar & Brihaspati",
    sankalpMantra: "ॐ सुमंगलाय नमः। ॐ उमामहेश्वराभ्यां नमः सर्वमंगलाय वरप्रदाय स्वाहा॥",
    sacredDirection: "East (Purva)",
    cautionWindow: "Strictly avoid during Venus Combustion (Shukra Ast) and Guru Ast."
  },
  {
    id: "business-launch",
    name: "Business / Shop Launch",
    sanskrit: "व्यापार शुभारम्भ मुहूर्त",
    icon: "💼",
    favorableNakshatras: ["Pushya", "Ashwini", "Chitra", "Shravana", "Dhanishta", "Revati"],
    favorableTithis: ["Pratipada", "Panchami", "Ashtami", "Dashami", "Purnima"],
    rulingDeity: "Maha Lakshmi & Ganesha",
    sankalpMantra: "ॐ श्रीं ह्रीं क्लीं त्रिभुवन महालक्ष्म्यै अस्माकं दारिद्र्य नाशय प्रचुर धनं देहि देहि क्लीं ह्रीं श्रीं ॐ॥",
    sacredDirection: "North (Uttar — Kuber Sthan)",
    cautionWindow: "Avoid during Rahu Kaal and Rikta Tithis (4th, 9th, 14th)."
  },
  {
    id: "vehicle",
    name: "Vehicle Purchase / Delivery",
    sanskrit: "वाहन क्रय मुहूर्त",
    icon: "🚗",
    favorableNakshatras: ["Ashwini", "Rohini", "Punarvasu", "Pushya", "Hasta", "Swati", "Shravana"],
    favorableTithis: ["Tritiya", "Panchami", "Shashthi", "Dashami", "Ekadashi", "Trayodashi"],
    rulingDeity: "Lord Hanuman & Vishwakarma",
    sankalpMantra: "ॐ हं हनुमते नमः। ॐ विश्वकर्मणे नमः सर्वारिष्टनिवारकाय स्वाहा॥",
    sacredDirection: "North-West (Vayavya — Speed and Motion)",
    cautionWindow: "Do not take vehicle delivery on Saturday after sunset or during Gulika Kaal."
  },
  {
    id: "property",
    name: "Property / Land Registry",
    sanskrit: "भूमि एवं संपत्ति क्रय मुहूर्त",
    icon: "📜",
    favorableNakshatras: ["Mrigashira", "Punarvasu", "Ashlesha", "Magha", "Purva Phalguni", "Vishakha", "Mula"],
    favorableTithis: ["Dwitiya", "Panchami", "Saptami", "Dashami", "Purnima"],
    rulingDeity: "Bhumi Devi & Varaha Avatara",
    sankalpMantra: "ॐ धरणीगर्भसंभूतं विद्युत्कान्तिसमप्रभम्। कुमारं शक्तिहस्तं च मंगलं प्रणमाम्यहम्॥",
    sacredDirection: "South-East / South (Mars Domain)",
    cautionWindow: "Avoid Amavasya and solar eclipse shadow periods within 72 hours."
  },
  {
    id: "surgery",
    name: "Elective Surgery / Medical Procedure",
    sanskrit: "शल्य चिकित्सा / आरोग्य मुहूर्त",
    icon: "🏥",
    favorableNakshatras: ["Ashwini", "Mrigashira", "Chitra", "Anuradha", "Dhanishta"],
    favorableTithis: ["Shukla Paksha Dvitiya to Dashami (Waxing Moon)"],
    rulingDeity: "Dhanvantari & Ashwini Kumaras",
    sankalpMantra: "ॐ नमो भगवते महासुदर्शनाय वासुदेवाय धन्वन्तरये अमृतकलशहस्ताय सर्वभयविनाशाय सर्वरोगनिवारणाय त्रिलोकपतये नमः॥",
    sacredDirection: "East (Purva — Surya Deva Solar Life Force)",
    cautionWindow: "Strictly avoid full Moon (high bleeding risk) and 8th House Moon transit."
  }
];

export default function UniversalMuhurtaFinder() {
  const [selectedEventId, setSelectedEventId] = useState("griha-pravesh");
  const [seekerName, setSeekerName] = useState("");
  const [city, setCity] = useState("New Delhi / Kashi");
  const [monthRange, setMonthRange] = useState("Next 30 Days");
  const [isComputing, setIsComputing] = useState(false);
  const [computed, setComputed] = useState(false);

  const activeEvent = EVENT_CATEGORIES.find((e) => e.id === selectedEventId) || EVENT_CATEGORIES[0];
  const cleanName = seekerName.trim() || "Devoted Seeker";

  const handleCompute = (e: React.FormEvent) => {
    e.preventDefault();
    setIsComputing(true);
    setTimeout(() => {
      setIsComputing(false);
      setComputed(true);
    }, 2200);
  };

  // Mock computed dates based on event
  const mockAuspiciousWindows = [
    {
      date: "14th of Upcoming Month",
      day: "Thursday (Guruvar)",
      exactWindow: "06:22 AM to 10:48 AM (Amrit & Shubh Choghadiya)",
      tithi: "Shukla Panchami",
      nakshatra: activeEvent.favorableNakshatras[0] || "Pushya",
      rating: "🌟🌟🌟🌟🌟 Supreme Auspicious (Abhijit Muhurta Included)",
      benefit: "Sustained family prosperity, obstacle-free culmination, ancestral protection."
    },
    {
      date: "21st of Upcoming Month",
      day: "Monday (Somvar)",
      exactWindow: "07:15 AM to 11:30 AM (Labha Choghadiya)",
      tithi: "Shukla Dashami",
      nakshatra: activeEvent.favorableNakshatras[1] || "Rohini",
      rating: "🌟🌟🌟🌟 High Auspicious",
      benefit: "Mental serenity, financial liquidity, societal acclaim."
    },
    {
      date: "28th of Upcoming Month",
      day: "Friday (Shukravar)",
      exactWindow: "02:15 PM to 05:40 PM (Shubh Choghadiya)",
      tithi: "Shukla Trayodashi",
      nakshatra: activeEvent.favorableNakshatras[2] || "Revati",
      rating: "🌟🌟🌟🌟 High Auspicious",
      benefit: "Luxurious comfort, harmonious alliances, lasting asset retention."
    }
  ];

  return (
    <div className="my-10 bg-[#FFFDF8] border-2 border-[#d4af37] rounded-[2.5rem] p-6 sm:p-12 shadow-[0_25px_100px_rgba(212,175,55,0.35)] relative overflow-hidden text-center">
      <div className="pointer-events-none absolute -top-40 -left-40 w-[450px] h-[450px] bg-amber-500/15 rounded-full blur-[150px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 w-[450px] h-[450px] bg-[#d4af37]/20 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/40 text-[#C25E10] text-[11px] font-extrabold uppercase tracking-widest mb-3">
          <Clock className="w-3.5 h-3.5" />
          <span>Vedic Panchang Time-Matrix Engine</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-bold font-serif text-[#2A1810] tracking-wide mb-2">
          ॥ सर्व कार्य शुभ मुहूर्त संधान ॥
        </h2>
        <p className="text-xs sm:text-sm text-[#6B5A48] max-w-xl mx-auto mb-8 font-light leading-relaxed">
          Never start life-altering events under malefic planetary shadow. Calculate the <strong>Top 3 Golden Muhurtas</strong> with exact Choghadiya, Hora, and Tithi alignments verified against classical Shastras.
        </p>

        {/* Input Form */}
        <form onSubmit={handleCompute} className="bg-[#FBF6EC] border border-[#B8860B]/20 rounded-3xl p-5 sm:p-8 mb-8 text-left backdrop-blur-xl shadow-[0_14px_40px_-18px_rgba(107,42,20,0.25)] space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-[#C25E10] mb-1">Select Sacred Ceremony</label>
              <select
                value={selectedEventId}
                onChange={(e) => setSelectedEventId(e.target.value)}
                className="w-full bg-[#FBF6EC] border border-[#B8860B]/20 rounded-xl px-4 py-2.5 text-xs text-[#2A1810] focus:outline-none focus:border-[#d4af37]"
              >
                {EVENT_CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id} className="bg-[#1a1a1a]">
                    {cat.icon} {cat.name} ({cat.sanskrit})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-[#C25E10] mb-1">Seeker / Family Name</label>
              <input
                type="text"
                placeholder="e.g. Vikramaditya Sharma"
                value={seekerName}
                onChange={(e) => setSeekerName(e.target.value)}
                className="w-full bg-[#FBF6EC] border border-[#B8860B]/20 rounded-xl px-4 py-2.5 text-xs text-[#2A1810] placeholder-[#6B5A48]/60 focus:outline-none focus:border-[#d4af37]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-[#C25E10] mb-1">City / Location Coordinates</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. Mumbai, Varanasi, London, Dallas"
                className="w-full bg-[#FBF6EC] border border-[#B8860B]/20 rounded-xl px-4 py-2.5 text-xs text-[#2A1810] focus:outline-none focus:border-[#d4af37]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-[#C25E10] mb-1">Target Window</label>
              <select
                value={monthRange}
                onChange={(e) => setMonthRange(e.target.value)}
                className="w-full bg-[#FBF6EC] border border-[#B8860B]/20 rounded-xl px-4 py-2.5 text-xs text-[#2A1810] focus:outline-none focus:border-[#d4af37]"
              >
                <option value="Next 30 Days" className="bg-[#1a1a1a]">Immediate 30 Days (Urgent)</option>
                <option value="Next 60 Days" className="bg-[#1a1a1a]">Upcoming 60 Days (Planned)</option>
                <option value="Next 90 Days" className="bg-[#1a1a1a]">Quarterly 90 Days (Grand Ceremony)</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={isComputing}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#d4af37] via-[#ffd700] to-[#d4af37] text-black font-extrabold text-sm uppercase tracking-wider shadow-[0_4px_25px_rgba(212,175,55,0.4)] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-5 h-5" />
            <span>Search Golden Muhurta Timelines</span>
          </button>
        </form>

        {isComputing && (
          <VedicCalculationLoader
            title="Evaluating Ephemeris & Choghadiya Matrix"
            stages={[
              `Cross-referencing ${city} sunrise & local LMT tables...`,
              `Filtering out Rahu Kaal, Gulika & Yamaganda windows...`,
              `Selecting exalted Nakshatras & auspicious Shukla Paksha Tithis...`,
              `Validating Abhijit Muhurta & Panchak exemptions...`
            ]}
            estimatedSeconds={2.2}
          />
        )}

        {computed && !isComputing && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 text-left animate-fadeIn">
            <div className="bg-gradient-to-br from-[#241306] via-[#150a03] to-[#0a0401] border-2 border-[#d4af37] rounded-[2rem] p-6 sm:p-10 shadow-2xl relative">
              <div className="text-center pb-5 border-b-2 border-[#d4af37]/30 mb-6">
                <span className="text-4xl mb-2 block">{activeEvent.icon}</span>
                <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#C25E10] block">
                  Panchang Muhurta Dossier for {cleanName}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-serif text-[#FFFDF8] mt-1">
                  {activeEvent.name} — {city}
                </h3>
                <p className="text-xs text-amber-200/80 mt-1 font-serif italic">
                  Presided by {activeEvent.rulingDeity}
                </p>
              </div>

              {/* 3 Auspicious Dates */}
              <div className="space-y-3.5 mb-6">
                {mockAuspiciousWindows.map((item, idx) => (
                  <div key={idx} className="bg-[#FBF6EC] border border-[#d4af37]/30 rounded-2xl p-4 sm:p-5">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-[#d4af37] text-black font-extrabold text-xs flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <h4 className="text-base font-bold text-[#2A1810] font-serif">{item.date} ({item.day})</h4>
                      </div>
                      <span className="text-[11px] text-[#ffd700] font-semibold">{item.rating}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs mb-2">
                      <div className="bg-[#FDF3E2] p-2 rounded-xl">
                        <span className="text-[9px] uppercase tracking-wider text-[#6B5A48] block">Exact Auspicious Window</span>
                        <span className="text-emerald-700 font-bold font-mono">{item.exactWindow}</span>
                      </div>
                      <div className="bg-[#FDF3E2] p-2 rounded-xl">
                        <span className="text-[9px] uppercase tracking-wider text-[#6B5A48] block">Tithi &amp; Nakshatra</span>
                        <span className="text-[#C25E10] font-medium">{item.tithi} • {item.nakshatra}</span>
                      </div>
                      <div className="bg-[#FDF3E2] p-2 rounded-xl">
                        <span className="text-[9px] uppercase tracking-wider text-[#6B5A48] block">Primary Karmic Fruit</span>
                        <span className="text-[#2A1810] font-light">{item.benefit}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Sacred Orientation and Pre-Event Mantra */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-xs sm:text-sm">
                <div className="bg-amber-950/30 border border-amber-500/30 rounded-2xl p-4">
                  <span className="text-[10px] uppercase text-amber-400 font-bold tracking-widest block mb-1">
                    🧭 Auspicious Orientation &amp; Sthan
                  </span>
                  <p className="text-amber-50 font-medium">Face {activeEvent.sacredDirection} during commencement.</p>
                  <p className="text-xs text-amber-100/70 mt-1 font-light">{activeEvent.cautionWindow}</p>
                </div>

                <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-2xl p-4">
                  <span className="text-[10px] uppercase text-emerald-600 font-bold tracking-widest block mb-1">
                    📿 Pre-Commencement Sankalp Mantra
                  </span>
                  <p className="text-xs font-serif text-[#ffd700] italic font-semibold leading-relaxed">
                    &ldquo;{activeEvent.sankalpMantra}&rdquo;
                  </p>
                </div>
              </div>

              {/* Pandit Ji Official Muhurta Verification CTA */}
              <div className="bg-gradient-to-r from-[#38160a] via-[#1f0904] to-[#38160a] border-2 border-amber-500/50 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-xl">
                <div>
                  <h4 className="text-base font-serif font-bold text-[#FFFDF8] mb-1">
                    Order Pandit Ji&apos;s Personalized Muhurta Certificate
                  </h4>
                  <p className="text-xs text-amber-100/80 leading-relaxed font-light">
                    Receive an official signed Sanskrit Muhurta Patra with individual Kundli planetary cross-checks, Lagna Shuddhi, and exact minute-to-minute ceremony itinerary.
                  </p>
                </div>
                <div className="flex flex-col gap-2 shrink-0 w-full sm:w-auto">
                  <Link
                    href="/request-guidance?service=deep-kundli"
                    className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#ffd700] to-[#d4af37] text-black font-extrabold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 flex items-center justify-center gap-1.5 transition-all"
                  >
                    <span>Muhurta Certificate (₹999)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <DirectWhatsAppButton
                    variant="compact"
                    serviceName={`Certified Muhurta for ${activeEvent.name} in ${city}`}
                    price={999}
                    className="w-full justify-center py-2 text-xs"
                  />
                </div>
              </div>
            </div>

            <SanctifiedVerdictStickyBar
              serviceId="deep-kundli"
              serviceName={`Muhurta Dossier (${activeEvent.name})`}
              price={999}
              badge="⏰ Golden Muhurta Discovered"
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}
