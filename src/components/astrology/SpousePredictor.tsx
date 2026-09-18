"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart, ArrowRight } from "lucide-react";
import Link from "next/link";
import DirectWhatsAppButton from "@/components/shared/DirectWhatsAppButton";
import VedicCalculationLoader from "@/components/shared/VedicCalculationLoader";
import SanctifiedVerdictStickyBar from "@/components/shared/SanctifiedVerdictStickyBar";

const SIGNS = ["Aries (Mesha)", "Taurus (Vrishabha)", "Gemini (Mithuna)", "Cancer (Karka)", "Leo (Simha)", "Virgo (Kanya)", "Libra (Tula)", "Scorpio (Vrischika)", "Sagittarius (Dhanu)", "Capricorn (Makara)", "Aquarius (Kumbha)", "Pisces (Meena)"];

interface SpouseProfile {
  appearance: string;
  complexion: string;
  build: string;
  height: string;
  distinctiveFeature: string;
  personality: string;
  temperament: string;
  profession: string;
  professionIcon: string;
  meetingMethod: string;
  directionOfOrigin: string;
  marriageWindow: string;
  luckyMarriageDay: string;
}

const SPOUSE_PROFILES: SpouseProfile[] = [
  { appearance: "Sharp, angular features with an athletic build. Strong jawline. Piercing, confident eyes.", complexion: "Wheatish to fair with a warm, reddish undertone", build: "Athletic and muscular", height: "Above average (5'8\"-6'1\")", distinctiveFeature: "A scar or mark on the face/forehead. Naturally bold eyebrows.", personality: "Fiercely independent, competitive, action-oriented, impatient but passionately loyal", temperament: "Fire — quick to anger, quick to forgive", profession: "Military, Police, Surgery, Sports, Engineering, or Entrepreneurship", professionIcon: "⚔️", meetingMethod: "Through a competitive environment — gym, sports event, or workplace rivalry that turns to attraction", directionOfOrigin: "East", marriageWindow: "Mars or Venus Mahadasha/Antardasha period", luckyMarriageDay: "Tuesday (Mangalvar)" },
  { appearance: "Beautiful, sensual features with large expressive eyes. Full lips. Naturally attractive aura.", complexion: "Fair to very fair with a glowing, healthy complexion", build: "Well-proportioned, slightly curvaceous", height: "Average to slightly above (5'4\"-5'9\")", distinctiveFeature: "A dimple or beauty mark. Unusually attractive neck/throat area.", personality: "Calm, patient, luxury-loving, deeply sensual, stubborn but utterly devoted", temperament: "Earth — slow to change, deeply committed once decided", profession: "Banking, Finance, Fashion, Hospitality, Agriculture, or Food Industry", professionIcon: "💎", meetingMethod: "Through a social gathering involving food, music, or luxury — a wedding, restaurant, or art exhibition", directionOfOrigin: "South-East", marriageWindow: "Venus Mahadasha/Antardasha period", luckyMarriageDay: "Friday (Shukravar)" },
  { appearance: "Youthful, expressive face that looks younger than actual age. Quick, animated movements.", complexion: "Fair with a changeable, mercurial complexion", build: "Lean and slender", height: "Average (5'4\"-5'8\")", distinctiveFeature: "Expressive hands. Talks with hand gestures constantly. A mole near the shoulder.", personality: "Witty, intellectual, dual-natured, restless but endlessly entertaining", temperament: "Air — mentally stimulating but emotionally unpredictable", profession: "Journalism, Writing, IT, Teaching, Sales, or Travel Industry", professionIcon: "📱", meetingMethod: "Through social media, dating apps, a chance meeting while traveling, or introduced by a sibling/cousin", directionOfOrigin: "West", marriageWindow: "Mercury Mahadasha/Antardasha period", luckyMarriageDay: "Wednesday (Budhvar)" },
  { appearance: "Soft, rounded features with nurturing, motherly/fatherly eyes. Gentle, comforting presence.", complexion: "Fair to medium with a moon-like luminescence", build: "Soft, medium build", height: "Average (5'3\"-5'7\")", distinctiveFeature: "Round face. Chest or stomach area is prominent. Emotional eyes that reveal inner feelings.", personality: "Deeply emotional, family-oriented, protective, moody but unconditionally caring", temperament: "Water — deeply feeling, empathic, sometimes clingy", profession: "Healthcare, Nursing, Education, Real Estate, Interior Design, or Food/Dairy", professionIcon: "🏠", meetingMethod: "Through family introduction, neighborhood, or a childhood acquaintance reconnection", directionOfOrigin: "North", marriageWindow: "Moon or Venus Mahadasha/Antardasha period", luckyMarriageDay: "Monday (Somvar)" },
  { appearance: "Regal, commanding presence. Broad shoulders. Naturally draws attention in any room.", complexion: "Fair to golden-toned with a radiant, sun-like glow", build: "Broad-shouldered, dignified posture", height: "Above average (5'7\"-6'2\")", distinctiveFeature: "Thick, lustrous hair. A prominent forehead. Lion-like mane or regal bearing.", personality: "Proud, generous, dramatic, attention-loving but fiercely loyal and protective", temperament: "Fire — charismatic leader, occasionally egoistic", profession: "Government, Politics, Entertainment, Fashion, Management, or Creative Direction", professionIcon: "👑", meetingMethod: "Through a public event, stage performance, office leadership role, or glamorous social function", directionOfOrigin: "East", marriageWindow: "Sun or Venus Mahadasha/Antardasha period", luckyMarriageDay: "Sunday (Ravivar)" },
  { appearance: "Clean, refined features with an intelligent, analytical gaze. Well-groomed, meticulous appearance.", complexion: "Fair with clear, unblemished skin", build: "Lean, well-maintained", height: "Average to slightly below (5'2\"-5'7\")", distinctiveFeature: "Delicate fingers. A critical, observant eye. Often wears glasses or has excellent attention to detail in dress.", personality: "Perfectionist, health-conscious, service-oriented, critical but deeply caring in practical ways", temperament: "Earth — methodical, reliable, occasionally over-analytical", profession: "Medicine, Accounting, Data Science, Pharmacy, Editing, or Quality Control", professionIcon: "🔬", meetingMethod: "Through workplace, health/wellness retreat, yoga class, or professional networking event", directionOfOrigin: "South", marriageWindow: "Mercury Mahadasha/Antardasha period", luckyMarriageDay: "Wednesday (Budhvar)" },
  { appearance: "Harmonious, symmetrical features. Natural beauty with balanced proportions. Elegant movements.", complexion: "Fair to very fair with a soft, Venus-blessed glow", build: "Balanced, graceful", height: "Average (5'4\"-5'9\")", distinctiveFeature: "A charming smile. Attractive cheekbones. Dimples or a beauty mark near the lip.", personality: "Diplomatic, romantic, beauty-loving, indecisive but deeply committed to fairness and harmony", temperament: "Air — socially elegant, avoids conflict, highly aesthetic", profession: "Law, Fashion Design, Interior Design, Diplomacy, HR, or Beauty Industry", professionIcon: "⚖️", meetingMethod: "Through a mutual friend at a social gathering, art event, or through a formal matchmaking process", directionOfOrigin: "West", marriageWindow: "Venus Mahadasha/Antardasha period", luckyMarriageDay: "Friday (Shukravar)" },
  { appearance: "Intense, magnetic eyes that feel like they can see through you. Sharp, defined features.", complexion: "Wheatish to dark with a mysterious, intense aura", build: "Lean but powerful, wiry strength", height: "Average to above average (5'5\"-5'11\")", distinctiveFeature: "Piercing eyes. A scar or mark in a private area. Naturally intense gaze that makes others uncomfortable.", personality: "Deeply passionate, secretive, possessive, jealous but transformatively loyal — loves with total intensity", temperament: "Water — emotionally volcanic, all-or-nothing commitment", profession: "Research, Psychology, Surgery, Detective/Intelligence, Occult, or Inheritance Management", professionIcon: "🔮", meetingMethod: "Through a crisis situation, hospital visit, research project, or an intense chance encounter that feels fated", directionOfOrigin: "North", marriageWindow: "Mars or Ketu Mahadasha/Antardasha period", luckyMarriageDay: "Tuesday (Mangalvar)" },
  { appearance: "Tall, athletic frame with an open, optimistic expression. Natural outdoor person.", complexion: "Fair to wheatish with a sun-tanned, healthy glow", build: "Tall, athletic, long-limbed", height: "Tall (5'8\"-6'3\")", distinctiveFeature: "Strong thighs/hips. An open, infectious laugh. Often has a mark on the thigh or hip area.", personality: "Adventurous, philosophical, brutally honest, restless but deeply inspiring and wisdom-giving", temperament: "Fire — enthusiastic, freedom-loving, occasionally preachy", profession: "Education, Law, Travel, Publishing, Export Business, or Religious/Spiritual Teaching", professionIcon: "🏹", meetingMethod: "While traveling, at a university, religious gathering, or through a long-distance/cross-cultural connection", directionOfOrigin: "South-East", marriageWindow: "Jupiter Mahadasha/Antardasha period", luckyMarriageDay: "Thursday (Guruvar)" },
  { appearance: "Mature, serious features. Looks older or more authoritative than actual age. Prominent bone structure.", complexion: "Wheatish to dark with a Saturn-influenced, serious complexion", build: "Lean, bony, angular", height: "Average to tall (5'6\"-6'0\")", distinctiveFeature: "Prominent cheekbones. Thin lips. A serious, mature expression even in youth. Dark under-eyes.", personality: "Ambitious, disciplined, workaholic, emotionally reserved but deeply responsible and committed long-term", temperament: "Earth — slow-building trust, rock-solid once committed", profession: "Government, Administration, Mining, Construction, Agriculture, or Traditional Family Business", professionIcon: "🏛️", meetingMethod: "Through professional or business connection, arranged marriage, or introduced by an elder/authority figure", directionOfOrigin: "West", marriageWindow: "Saturn or Venus Mahadasha/Antardasha period", luckyMarriageDay: "Saturday (Shanivar)" },
  { appearance: "Unique, unconventional features. Stands out in a crowd. Eccentric personal style.", complexion: "Variable — can be any shade but always with a distinctive, unusual quality", build: "Lean, tall, angular", height: "Tall (5'8\"-6'2\")", distinctiveFeature: "Unusual hair style/color. Distinctive fashion sense. A birthmark or mole in an unusual location.", personality: "Eccentric, progressive, emotionally detached, humanitarian but unpredictable in romance", temperament: "Air — intellectually stimulating but emotionally distant", profession: "Technology, Science, Social Activism, NGO, Space/Aviation, or Startup Innovation", professionIcon: "🚀", meetingMethod: "Through social media, tech meetup, activist group, friend circle, or a completely unexpected digital encounter", directionOfOrigin: "North-West", marriageWindow: "Saturn or Rahu Mahadasha/Antardasha period", luckyMarriageDay: "Saturday (Shanivar)" },
  { appearance: "Dreamy, ethereal features with large, soulful eyes. Soft, gentle presence.", complexion: "Fair to very fair with a translucent, almost otherworldly quality", build: "Soft, medium, slightly plump", height: "Average to below average (5'1\"-5'7\")", distinctiveFeature: "Beautiful, expressive feet. Large, dreamy eyes. A birthmark on the feet or ankle.", personality: "Deeply intuitive, artistic, spiritually inclined, escapist but profoundly compassionate and selfless", temperament: "Water — emotionally absorptive, psychically sensitive", profession: "Music, Film, Spiritual Healing, Hospital/Charity, Photography, or Maritime/Fisheries", professionIcon: "🎨", meetingMethod: "Through a spiritual retreat, hospital, charity event, near water (beach/lake), or in a dream-like coincidence", directionOfOrigin: "North-East", marriageWindow: "Jupiter or Venus Mahadasha/Antardasha period", luckyMarriageDay: "Thursday (Guruvar)" },
];

export default function SpousePredictor() {
  const [selectedSign, setSelectedSign] = useState(0);
  const [seekerName, setSeekerName] = useState("");
  const [gender, setGender] = useState("Male");
  const [isReading, setIsReading] = useState(false);
  const [profile, setProfile] = useState<SpouseProfile | null>(null);

  const handlePredict = (e: React.FormEvent) => {
    e.preventDefault();
    setIsReading(true);
    setTimeout(() => {
      setProfile(SPOUSE_PROFILES[selectedSign]);
      setIsReading(false);
    }, 2200);
  };

  const cleanName = seekerName.trim() || "Seeker";
  const spouseWord = gender === "Male" ? "Wife" : "Husband";

  return (
    <div className="my-10 bg-[#FFFDF8] border-2 border-pink-500/50 rounded-[2.5rem] p-6 sm:p-12 shadow-[0_25px_100px_rgba(236,72,153,0.25)] relative overflow-hidden text-center">
      <div className="pointer-events-none absolute -top-40 -left-40 w-[450px] h-[450px] bg-pink-500/15 rounded-full blur-[150px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 w-[450px] h-[450px] bg-rose-500/15 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/15 border border-pink-400/40 text-pink-300 text-[11px] font-extrabold uppercase tracking-widest mb-3">
          <Heart className="w-3.5 h-3.5" />
          <span>7th House Spouse Appearance &amp; Destiny</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-bold font-serif text-[#2A1810] tracking-wide mb-2">
          ॥ भावी जीवनसाथी रूपरेखा ॥
        </h2>
        <p className="text-xs sm:text-sm text-[#6B5A48] max-w-xl mx-auto mb-8 font-light leading-relaxed">
          Your <strong>7th house lord&apos;s sign placement</strong> reveals your future spouse&apos;s physical appearance, personality, profession, and how you will meet. Based on classical Brihat Parashara Hora Shastra methodology.
        </p>

        <form onSubmit={handlePredict} className="bg-[#FBF6EC] border border-[#B8860B]/20 rounded-3xl p-5 sm:p-8 mb-8 text-left backdrop-blur-xl shadow-[0_14px_40px_-18px_rgba(107,42,20,0.25)] space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-pink-400 mb-1">Your Name</label>
              <input type="text" placeholder="e.g. Ananya Singh" value={seekerName} onChange={(e) => setSeekerName(e.target.value)} className="w-full bg-[#FBF6EC] border border-[#B8860B]/20 rounded-xl px-4 py-2.5 text-xs text-[#2A1810] placeholder-[#6B5A48]/60 focus:outline-none focus:border-pink-400" />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-pink-400 mb-1">Your Gender</label>
              <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full bg-[#FBF6EC] border border-[#B8860B]/20 rounded-xl px-4 py-2.5 text-xs text-[#2A1810] focus:outline-none focus:border-pink-400">
                <option value="Male" className="bg-[#1a1a1a]">Male (Predicting Wife)</option>
                <option value="Female" className="bg-[#1a1a1a]">Female (Predicting Husband)</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-pink-400 mb-1">7th House Lord&apos;s Sign</label>
              <select value={selectedSign} onChange={(e) => setSelectedSign(Number(e.target.value))} className="w-full bg-[#FBF6EC] border border-[#B8860B]/20 rounded-xl px-4 py-2.5 text-xs text-[#2A1810] focus:outline-none focus:border-pink-400">
                {SIGNS.map((s, i) => (<option key={i} value={i} className="bg-[#1a1a1a]">{s}</option>))}
              </select>
            </div>
          </div>
          <button type="submit" disabled={isReading} className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-600 via-rose-500 to-pink-600 text-[#2A1810] font-extrabold text-sm uppercase tracking-wider shadow-[0_4px_25px_rgba(236,72,153,0.4)] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer">
            <Heart className="w-5 h-5" /><span>Reveal My Future {spouseWord}</span>
          </button>
        </form>

        {isReading && (
          <VedicCalculationLoader title={`Visualizing Your Future ${spouseWord}...`} stages={["Analyzing 7th House Lord's Rashi & Navamsha placement...", "Computing physical appearance from planetary aspects...", "Determining profession from 10th-from-7th analysis...", "Calculating marriage timing from Dasha sequence..."]} estimatedSeconds={2} />
        )}

        {profile && !isReading && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 text-left animate-fadeIn">
            <div className="bg-gradient-to-br from-[#251030] via-[#150820] to-[#0a0410] border-2 border-pink-500/40 rounded-[2rem] p-6 sm:p-10 shadow-2xl">
              <div className="text-center pb-5 border-b-2 border-pink-500/25 mb-6">
                <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-pink-400 block mb-1">Future {spouseWord} Blueprint for {cleanName}</span>
                <h3 className="text-2xl sm:text-3xl font-bold font-serif text-[#2A1810]">Your Destined {spouseWord}&apos;s Profile</h3>
                <span className="text-xs text-amber-200/80 italic">7th Lord in {SIGNS[selectedSign]}</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 text-xs">
                {[
                  { label: "Complexion", value: profile.complexion },
                  { label: "Build", value: profile.build },
                  { label: "Height", value: profile.height },
                  { label: "Distinctive Feature", value: profile.distinctiveFeature },
                ].map((item, i) => (
                  <div key={i} className="bg-[#FBF6EC] border border-pink-500/20 rounded-2xl p-3 text-center">
                    <span className="text-[9px] uppercase text-[#6B5A48] tracking-widest block mb-0.5">{item.label}</span>
                    <span className="text-xs font-bold text-pink-200">{item.value}</span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-pink-950/25 border border-pink-500/25 mb-4">
                <span className="text-[10px] uppercase font-bold tracking-widest text-pink-300 block mb-1">👤 Physical Appearance</span>
                <p className="text-sm text-gray-200 font-light">{profile.appearance}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 text-xs sm:text-sm">
                <div className="bg-[#FBF6EC] border border-[#B8860B]/20 rounded-2xl p-4">
                  <span className="text-[10px] uppercase text-amber-400 font-bold tracking-widest block mb-1">🧠 Personality &amp; Temperament</span>
                  <p className="text-gray-200 font-light mb-1">{profile.personality}</p>
                  <span className="text-[10px] text-purple-300 font-bold">Temperament: {profile.temperament}</span>
                </div>
                <div className="bg-[#FBF6EC] border border-[#B8860B]/20 rounded-2xl p-4">
                  <span className="text-[10px] uppercase text-emerald-600 font-bold tracking-widest block mb-1">{profile.professionIcon} Likely Profession</span>
                  <p className="text-gray-200 font-light">{profile.profession}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 text-xs">
                <div className="bg-[#FBF6EC] border border-[#B8860B]/20 rounded-2xl p-3.5">
                  <span className="text-[10px] uppercase text-pink-300 font-bold tracking-widest block mb-0.5">💑 How You Will Meet</span>
                  <p className="text-[#2A1810] font-light">{profile.meetingMethod}</p>
                </div>
                <div className="bg-[#FBF6EC] border border-[#B8860B]/20 rounded-2xl p-3.5">
                  <span className="text-[10px] uppercase text-blue-300 font-bold tracking-widest block mb-0.5">🧭 Direction of Origin</span>
                  <p className="text-[#2A1810] font-medium">{profile.directionOfOrigin} of your birthplace</p>
                </div>
                <div className="bg-[#FBF6EC] border border-[#B8860B]/20 rounded-2xl p-3.5">
                  <span className="text-[10px] uppercase text-[#C25E10] font-bold tracking-widest block mb-0.5">📅 Marriage Window</span>
                  <p className="text-[#2A1810] font-medium">{profile.marriageWindow}</p>
                  <span className="text-[10px] text-emerald-600 block mt-0.5">Lucky Day: {profile.luckyMarriageDay}</span>
                </div>
              </div>

              <div className="bg-gradient-to-r from-[#38102a] via-[#1f0818] to-[#38102a] border-2 border-pink-500/50 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-xl">
                <div>
                  <h4 className="text-base font-serif font-bold text-[#2A1810] mb-1">Get Full Marriage Timing + Spouse Matching Report</h4>
                  <p className="text-xs text-[#6B5A48] leading-relaxed font-light">Pandit Ji analyzes your complete D1 + D9 chart to predict exact marriage year, spouse meeting circumstances, and compatibility factors.</p>
                </div>
                <div className="flex flex-col gap-2 shrink-0 w-full sm:w-auto">
                  <Link href="/request-guidance?service=deep-kundli" className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-pink-600 via-rose-500 to-pink-600 text-[#2A1810] font-extrabold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 flex items-center justify-center gap-1.5 transition-all">
                    <span>Spouse Report (₹999)</span><ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <DirectWhatsAppButton variant="compact" serviceName={`Future ${spouseWord} Prediction for ${cleanName}`} price={2100} className="w-full justify-center py-2 text-xs" />
                </div>
              </div>
            </div>

            <SanctifiedVerdictStickyBar serviceId="deep-kundli" serviceName={`Future ${spouseWord} Prediction Report`} price={999} badge="💍 Spouse Blueprint Revealed" />
          </motion.div>
        )}
      </div>
    </div>
  );
}
