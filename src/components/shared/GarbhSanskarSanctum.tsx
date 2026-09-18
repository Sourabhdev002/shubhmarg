"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import DirectWhatsAppButton from "@/components/shared/DirectWhatsAppButton";
import VedicCalculationLoader from "@/components/shared/VedicCalculationLoader";
import SanctifiedVerdictStickyBar from "@/components/shared/SanctifiedVerdictStickyBar";

interface MonthSadhana {
  monthNumber: number;
  dhatuGoverned: string;
  deity: string;
  recommendedRaga: string;
  mantra: string;
  ayurvedicDiet: string;
  weeklySankalp: string;
}

const MONTH_SADHANA_DATA: MonthSadhana[] = [
  {
    monthNumber: 1,
    dhatuGoverned: "Rasa Dhatu (Essence of fluids & embryonic cellular fusion)",
    deity: "Lord Shukra (Venus) & Lord Brahma",
    recommendedRaga: "Raga Yaman (Calming, serene dusk vibration)",
    mantra: "ॐ नमो भगवते वासुदेवाय। ॐ ब्रह्मणे नमः॥",
    ayurvedicDiet: "Sweet, cool milk, medicated ghee, sweet fruits (pomegranate), avoid pungent spices.",
    weeklySankalp: "Peaceful mental dwelling; immerse in soothing spiritual narratives and devotional art."
  },
  {
    monthNumber: 2,
    dhatuGoverned: "Rakta Dhatu (Blood circulation & heart beat germination)",
    deity: "Mangala Deva (Mars) & Maha Lakshmi",
    recommendedRaga: "Raga Bhairav (Uplifting morning clarity)",
    mantra: "ॐ श्रीं ह्रीं क्लीं गजलक्ष्म्यै नमः॥",
    ayurvedicDiet: "Milk with Shatavari, sweet raisins, saffron-infused lukewarm water.",
    weeklySankalp: "Eliminate anger and conflict; surround oneself with blooming flowers and pure natural scenery."
  },
  {
    monthNumber: 3,
    dhatuGoverned: "Mamsa Dhatu (Muscle fiber & limb foundation)",
    deity: "Brihaspati (Jupiter) & Devi Saraswati",
    recommendedRaga: "Raga Bhupali (Intellect and structural stability)",
    mantra: "ॐ ऐं सरस्वत्यै नमः। ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः॥",
    ayurvedicDiet: "Cooked red rice, fresh seasonal sweet fruits, mild honey and cow milk.",
    weeklySankalp: "Study sacred scriptures, read uplifting literature, avoid loud chaotic gatherings."
  },
  {
    monthNumber: 4,
    dhatuGoverned: "Meda Dhatu (Body fat tissue & cranial nervous system)",
    deity: "Surya Deva (Sun) & Lord Rama",
    recommendedRaga: "Raga Desh (Heart center warmth and patriotism)",
    mantra: "ॐ घृणिः सूर्य आदित्यः। ॐ रां रामाय नमः॥",
    ayurvedicDiet: "Easily digestible khichdi, organic butter, curd with rock sugar.",
    weeklySankalp: "Dauhrida phase (baby’s desires manifest through mother) — fulfill wholesome cravings mindfully."
  },
  {
    monthNumber: 5,
    dhatuGoverned: "Asthi Dhatu (Bone framework & skeleton calcification)",
    deity: "Chandra Deva (Moon) & Lord Shiva",
    recommendedRaga: "Raga Bageshri (Emotional equanimity and nocturnal rest)",
    mantra: "ॐ नमः शिवाय। ॐ सोमाय नमः॥",
    ayurvedicDiet: "Ghee prepared with Brahmi, pure goat or A2 cow milk, sweet boiled rice.",
    weeklySankalp: "Deep meditative breathwork (Anulom Vilom); listen to pure Gayatri Mantra chanting at sunset."
  },
  {
    monthNumber: 6,
    dhatuGoverned: "Majja Dhatu (Bone marrow, sensory nerves & intellect)",
    deity: "Lord Shani (Saturn) & Hanuman Deva",
    recommendedRaga: "Raga Malkauns (Strength, endurance, and quiet courage)",
    mantra: "ॐ हं हनुमते नमः। ॐ शं शनैश्चराय नमः॥",
    ayurvedicDiet: "Sweet gruel, medicated ghee with Gokshura, hydration with coconut water.",
    weeklySankalp: "Foster courage and perseverance; recite Hanuman Chalisa daily for fearlessness."
  },
  {
    monthNumber: 7,
    dhatuGoverned: "Shukra / Ojas (Vital life-glow & total sensory awareness)",
    deity: "Devi Durga & Jagadamba",
    recommendedRaga: "Raga Kafi (Gentle joy and rhythmic vitality)",
    mantra: "ॐ दुं दुर्गायै नमः। ॐ ऐं ह्रीं क्लीं चामुण्डायै विच्चे॥",
    ayurvedicDiet: "Sweet puddings, kheer with cardamom, almonds soaked overnight.",
    weeklySankalp: "Avoid strenuous physical travel; practice gentle loving maternal communication with the womb."
  },
  {
    monthNumber: 8,
    dhatuGoverned: "Ojas Unstable Movement (Mother & fetus interchange vital fluids)",
    deity: "Lord Vishnu & Maha Maya",
    recommendedRaga: "Raga Bilawal (Supreme harmony and protection)",
    mantra: "ॐ नमो नारायणाय। ॐ विष्णवे नमः॥",
    ayurvedicDiet: "Rice cooked with milk and unrefined ghee; light nourishing porridges.",
    weeklySankalp: "Supreme peace and detachment from anxiety; surrender outcome to Divine grace."
  },
  {
    monthNumber: 9,
    dhatuGoverned: "Prasava Shuddhi (Labor readiness & natural childbirth vitality)",
    deity: "Devi Parvati & Dhanvantari",
    recommendedRaga: "Raga Shankara (Triumphant strength and painless emergence)",
    mantra: "ॐ ह्रीं श्रीं क्लीं ग्लौं देवकीसुत गोविन्द वासुदेव जगत्पते। देहि मे तनयं कृष्ण त्वामहं शरणं गतः॥",
    ayurvedicDiet: "Lukewarm milk with cow ghee, warm oil body massages (Abhyanga), gentle walking.",
    weeklySankalp: "Total surrender, chanting Garbh Raksha Stotra, preparing a sanctified home altar."
  }
];

export default function GarbhSanskarSanctum() {
  const [motherName, setMotherName] = useState("");
  const [gestationMonth, setGestationMonth] = useState(4);
  const [expectedMonth, setExpectedMonth] = useState("November");
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);

  const activeSadhana = MONTH_SADHANA_DATA.find((m) => m.monthNumber === gestationMonth) || MONTH_SADHANA_DATA[3];
  const cleanMother = motherName.trim() || "Blessed Mother";

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSynthesizing(true);
    setTimeout(() => {
      setIsSynthesizing(false);
      setIsGenerated(true);
    }, 2200);
  };

  return (
    <div className="my-10 bg-gradient-to-b from-[#1c0a15] via-[#2a0e20] to-[#12050e] border-2 border-rose-400/50 rounded-[2.5rem] p-6 sm:p-12 shadow-[0_25px_100px_rgba(244,63,94,0.25)] relative overflow-hidden text-center">
      <div className="pointer-events-none absolute -top-40 -left-40 w-[450px] h-[450px] bg-rose-500/15 rounded-full blur-[150px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 w-[450px] h-[450px] bg-amber-400/15 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/15 border border-rose-400/40 text-rose-300 text-[11px] font-extrabold uppercase tracking-widest mb-3">
          <Heart className="w-3.5 h-3.5" />
          <span>Vedic Prenatal Consciousness &amp; Womb Consecration</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-bold font-serif text-white tracking-wide mb-2">
          ॥ गर्भ संस्कार वैदिक मातृत्व दीक्षा ॥
        </h2>
        <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto mb-8 font-light leading-relaxed">
          The soul inside the womb absorbs the mother&apos;s vibrations. Receive your <strong>personalized month-by-month Garbh Sanskar regimen</strong>: classical Ragas, Dhatu-nourishing Ayurvedic recipes, protective Stotras, and daily Sankalpas.
        </p>

        {/* Input Form */}
        <form onSubmit={handleGenerate} className="bg-black/75 border border-white/15 rounded-3xl p-5 sm:p-8 mb-8 text-left backdrop-blur-xl shadow-2xl space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-rose-300 mb-1">Mother&apos;s Name</label>
              <input
                type="text"
                placeholder="e.g. Radhika Sharma"
                value={motherName}
                onChange={(e) => setMotherName(e.target.value)}
                className="w-full bg-black/80 border border-white/20 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-rose-400"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-rose-300 mb-1">Current Gestational Month</label>
              <select
                value={gestationMonth}
                onChange={(e) => setGestationMonth(Number(e.target.value))}
                className="w-full bg-black/80 border border-white/20 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-rose-400"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <option key={num} value={num} className="bg-[#1a1a1a]">
                    Month {num} ({num * 4} Weeks)
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-rose-300 mb-1">Expected Delivery Month</label>
              <select
                value={expectedMonth}
                onChange={(e) => setExpectedMonth(e.target.value)}
                className="w-full bg-black/80 border border-white/20 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-rose-400"
              >
                {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((m) => (
                  <option key={m} value={m} className="bg-[#1a1a1a]">
                    {m}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSynthesizing}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-400 to-amber-300 text-black font-extrabold text-sm uppercase tracking-wider shadow-[0_4px_25px_rgba(244,63,94,0.4)] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-5 h-5" />
            <span>Generate Month {gestationMonth} Garbh Sanskar Protocol</span>
          </button>
        </form>

        {isSynthesizing && (
          <VedicCalculationLoader
            title="Harmonizing Womb Sonic & Ayurvedic Blueprint"
            stages={[
              `Accessing Sushruta Samhita Garbha Sharira teachings for Month ${gestationMonth}...`,
              `Selecting micro-frequency Vedic Raga for fetal nervous equilibrium...`,
              `Customizing Dhatu nourishment & Sattvic Ayurvedic nutrition...`,
              `Encoding Garbh Raksha Kavach Sankalp for ${cleanMother}...`
            ]}
            estimatedSeconds={2.2}
          />
        )}

        {isGenerated && !isSynthesizing && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 text-left animate-fadeIn">
            <div className="bg-gradient-to-br from-[#2b1022] via-[#190814] to-[#0d030a] border-2 border-rose-400/40 rounded-[2rem] p-6 sm:p-10 shadow-2xl relative">
              <div className="text-center pb-5 border-b-2 border-rose-400/25 mb-6">
                <span className="text-4xl mb-2 block">🌸</span>
                <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-rose-300 block">
                  Sacred Prenatal Protocol • Month {gestationMonth} of 9
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-serif text-white mt-1">
                  {cleanMother}&apos;s Womb Blessing Sadhana
                </h3>
                <p className="text-xs text-amber-200/80 mt-1 font-serif italic">
                  Presided by {activeSadhana.deity} • Expected: {expectedMonth}
                </p>
              </div>

              {/* Dhatu & Raga Information Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-rose-950/40 border border-rose-500/30 rounded-2xl p-4">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-rose-300 block mb-1">
                    🧬 Fetal Biological Formation (Dhatu)
                  </span>
                  <p className="text-sm font-semibold text-white">{activeSadhana.dhatuGoverned}</p>
                </div>
                <div className="bg-amber-950/40 border border-amber-500/30 rounded-2xl p-4">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300 block mb-1">
                    🎵 Recommended Daily Sonic Frequency (Raga)
                  </span>
                  <p className="text-sm font-semibold text-[#ffd700]">{activeSadhana.recommendedRaga}</p>
                  <span className="text-[10px] text-gray-300 block mt-0.5">Listen 20 mins daily in a quiet room.</span>
                </div>
              </div>

              {/* Sacred Daily Mantra */}
              <div className="p-5 rounded-2xl bg-black/70 border border-rose-400/30 mb-6 text-center">
                <span className="text-[10px] uppercase font-bold tracking-widest text-rose-300 block mb-1">
                  🔱 Month {gestationMonth} Garbh Raksha Beej Mantra (Chant 21x Morning &amp; Night)
                </span>
                <p className="text-sm sm:text-base font-serif text-[#ffd700] italic font-semibold leading-relaxed">
                  &ldquo;{activeSadhana.mantra}&rdquo;
                </p>
              </div>

              {/* Ayurvedic Nutrition & Mindset */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-xs sm:text-sm">
                <div className="bg-black/50 border border-white/10 rounded-2xl p-4">
                  <span className="text-[10px] uppercase text-emerald-400 font-bold tracking-widest block mb-1">
                    🍎 Ayurvedic Nutrition for Month {gestationMonth}
                  </span>
                  <p className="text-gray-200 font-light leading-relaxed">{activeSadhana.ayurvedicDiet}</p>
                </div>
                <div className="bg-black/50 border border-white/10 rounded-2xl p-4">
                  <span className="text-[10px] uppercase text-purple-400 font-bold tracking-widest block mb-1">
                    🪔 Mother&apos;s Mental &amp; Spiritual Sadhana
                  </span>
                  <p className="text-gray-200 font-light leading-relaxed">{activeSadhana.weeklySankalp}</p>
                </div>
              </div>

              {/* 9-Month Full Audio Kit CTA */}
              <div className="bg-gradient-to-r from-[#38102a] via-[#1f0818] to-[#38102a] border-2 border-rose-400/50 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-xl">
                <div>
                  <h4 className="text-base font-serif font-bold text-white mb-1">
                    Order 9-Month Complete Garbh Sanskar Audio Sanctuary Kit
                  </h4>
                  <p className="text-xs text-gray-300 leading-relaxed font-light">
                    Includes all 9 consecrated classical Ragas (studio recorded in 432Hz), full Sanskrit Garbha Gita, daily guided prenatal meditation, and personalized monthly check-ins with Pandit Ji.
                  </p>
                </div>
                <div className="flex flex-col gap-2 shrink-0 w-full sm:w-auto">
                  <Link
                    href="/request-guidance?service=voice-dossier"
                    className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-rose-500 via-pink-400 to-amber-300 text-black font-extrabold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 flex items-center justify-center gap-1.5 transition-all"
                  >
                    <span>Complete 9-Month Kit (₹2,999)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <DirectWhatsAppButton
                    variant="compact"
                    serviceName={`Garbh Sanskar Consultation for ${cleanMother}`}
                    price={1500}
                    className="w-full justify-center py-2 text-xs"
                  />
                </div>
              </div>
            </div>

            <SanctifiedVerdictStickyBar
              serviceId="voice-dossier"
              serviceName={`Garbh Sanskar Month ${gestationMonth}`}
              price={2999}
              badge="🌸 Garbh Sanskar Activated"
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}
