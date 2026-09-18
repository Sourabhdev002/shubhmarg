"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { DailyPanchang, CalendarEventWithOccurrence } from "@/types/calendar";
import { playPanchangChime, playTempleBellResonance } from "@/lib/celestialAudio";
import { getDailyMuhuratTimings, getActiveChoghadiya, getActiveHora } from "@/lib/vedic-clock";
import {
  Sparkles,
  ChevronRight,
  ShieldAlert,
  CheckCircle2,
  Clock,
  Compass,
  X,
  ExternalLink,
  Bell,
  Flame,
  Share2,
} from "lucide-react";
import { cn } from "@/utils/cn";
import { RealisticTempleBell3D } from "@/components/ui/RealisticTempleBell3D";
import MoonPhaseGlyph from "./MoonPhaseGlyph";
import SankalpMandala, { recordSankalpToday } from "./SankalpMandala";

interface Props {
  panchang?: DailyPanchang | null;
  event?: CalendarEventWithOccurrence | null;
}

type PanchangTab = "overview" | "muhurats" | "angas" | "choghadiya";

interface ShubhKaryaItem {
  id: string;
  titleHi: string;
  titleEn: string;
  status: "shubh" | "labh" | "caution" | "uttam";
  statusTextHi: string;
  statusTextEn: string;
  isActiveNow?: boolean;
  isCaution?: boolean;
  windowTime: string;
  oneLiner: string;
  shastricRule: string;
  remedy?: string;
  icon3d: string;
  badgeGlow: string;
  audioFreq: number;
}

interface DailyMantraInfo {
  deityHi: string;
  deityEn: string;
  moolMantra: string;
  transliteration: string;
  significance: string;
  frequency: number;
}

const PRESIDING_MANTRAS: Record<number, DailyMantraInfo> = {
  0: { // Sunday (Surya)
    deityHi: "भगवान सूर्य देव (Surya Dev)",
    deityEn: "Surya Dev (The Sun God)",
    moolMantra: "ॐ ह्रां ह्रीं ह्रौं सः सूर्याय नमः",
    transliteration: "Om Hraam Hreem Hroum Sah Suryaya Namah",
    significance: "Bestows prana vitality, radiant clarity, and removes professional darkness.",
    frequency: 528,
  },
  1: { // Monday (Shiva & Chandra)
    deityHi: "भगवान शिव व चन्द्र देव",
    deityEn: "Lord Shiva & Chandra Dev",
    moolMantra: "ॐ नमः शिवाय • ॐ श्रां श्रीं श्रौं सः चन्द्रमसे नमः",
    transliteration: "Om Namah Shivaya • Om Shram Shreem Shroum Sah Chandraya Namah",
    significance: "Brings deep emotional equilibrium, mental peace, and removes anxiety.",
    frequency: 432,
  },
  2: { // Tuesday (Hanuman & Mangal)
    deityHi: "संकटमोचन हनुमान व मंगल देव",
    deityEn: "Lord Hanuman & Mangal Dev",
    moolMantra: "ॐ क्रां क्रीं क्रौं सः भौमाय नमः • ॐ हं हनुमते नमः",
    transliteration: "Om Kram Kreem Kroum Sah Bhaumaya Namah • Om Ham Hanumate Namah",
    significance: "Ignites unyielding courage, removes obstacles, and protects all assets.",
    frequency: 741,
  },
  3: { // Wednesday (Ganesha & Budha)
    deityHi: "विघ्नहर्ता गणेश व बुध देव",
    deityEn: "Lord Ganesha & Budha Dev",
    moolMantra: "ॐ गं गणपतये नमः • ॐ ब्रां ब्रीं ब्रौं सः बुधाय नमः",
    transliteration: "Om Gam Ganapataye Namah • Om Bram Breem Broum Sah Budhaya Namah",
    significance: "Sharpens intellect, grants business prosperity, and dissolves hindrances.",
    frequency: 639,
  },
  4: { // Thursday (Vishnu & Brihaspati)
    deityHi: "भगवान श्री हरि विष्णु व बृहस्पति",
    deityEn: "Lord Vishnu & Guru Brihaspati",
    moolMantra: "ॐ नमो भगवते वासुदेवाय • ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः",
    transliteration: "Om Namo Bhagavate Vasudevaya • Om Gram Greem Groum Sah Gurave Namah",
    significance: "Expands wisdom, grants spiritual grace, and secures auspicious destiny.",
    frequency: 486,
  },
  5: { // Friday (Mahalakshmi & Shukra)
    deityHi: "माता महालक्ष्मी व शुक्राचार्य",
    deityEn: "Maa Mahalakshmi & Shukra Dev",
    moolMantra: "ॐ श्रीं ह्रीं क्लीं महालक्ष्म्यै नमः • ॐ द्रां द्रीं द्रौं सः शुक्राय नमः",
    transliteration: "Om Shreem Hreem Kleem Mahalakshmaye Namah",
    significance: "Invokes boundless wealth, domestic harmony, aesthetic joy, and divine grace.",
    frequency: 528,
  },
  6: { // Saturday (Shani Dev & Bhairava)
    deityHi: "न्यायाधिपति शनि देव व भैरव",
    deityEn: "Lord Shani Dev & Bhairava",
    moolMantra: "ॐ प्रां प्रीं प्रौं सः शनैश्चराय नमः • ॐ शं शनैश्चराय नमः",
    transliteration: "Om Pram Preem Proum Sah Shanaishcharaya Namah",
    significance: "Pacifies karmic debt, grants discipline, endurance, and profound protection.",
    frequency: 396,
  },
};

// ── Canonical Sanskrit Ephemeris Translators for Sacred Sankalp ──
const toSanskritPanchang = (
  month?: string,
  paksha?: string,
  tithi?: string,
  nakshatra?: string,
  dayIdx = 5
) => {
  const MONTH_MAP: Record<string, string> = {
    chaitra: "चैत्र", vaishakha: "वैशाख", jyeshtha: "ज्येष्ठ", ashadha: "आषाढ़",
    shravana: "श्रावण", bhadrapada: "भाद्रपद", bhadra: "भाद्रपद", ashvina: "आश्विन", ashwin: "आश्विन",
    kartika: "कार्तिक", kartik: "कार्तिक", margashirsha: "मार्गशीर्ष", pausha: "पौष",
    magha: "माघ", phalguna: "फाल्गुन"
  };
  const PAKSHA_MAP: Record<string, string> = {
    shukla: "शुक्ल", krishna: "कृष्ण"
  };
  const TITHI_MAP: Record<string, string> = {
    pratipada: "प्रतिपदा", dwitiya: "द्वितीया", tritiya: "तृतीया", chaturthi: "चतुर्थी",
    panchami: "पञ्चमी", shashthi: "षष्ठी", saptami: "सप्तमी", ashtami: "अष्टमी",
    navami: "नवमी", dashami: "दशमी", ekadashi: "एकादशी", dvadashi: "द्वादशी",
    trayodashi: "त्रयोदशी", chaturdashi: "चतुर्दशी", purnima: "पूर्णिमा", amavasya: "अमावस्या"
  };
  const NAKSHATRA_MAP: Record<string, string> = {
    ashwini: "अश्विनी", bharani: "भरणी", krittika: "कृत्तिका", rohini: "रोहिणी",
    mrigashirsha: "मृगशिरा", ardra: "आर्द्रा", punarvasu: "पुनर्वसु", pushya: "पुष्य",
    ashlesha: "आश्लेषा", magha: "मघा", purvaphalguni: "पूर्वाफाल्गुनी", uttaraphalguni: "उत्तराफाल्गुनी",
    hasta: "हस्त", chitra: "चित्रा", swati: "स्वाति", vishakha: "विशाखा",
    anuradha: "अनुराधा", jyeshtha: "ज्येष्ठा", mula: "मूल", purvaashadha: "पूर्वाषाढ़ा",
    uttaraashadha: "उत्तराषाढ़ा", shravana: "श्रवण", dhanishta: "धनिष्ठा", shatabhisha: "शतभिषा",
    purvabhadrapada: "पूर्वभाद्रपदा", uttarabhadrapada: "उत्तरभाद्रपदा", revati: "रेवती"
  };
  const VARA_MAP = [
    "भानुवासरे", // Sun
    "सोमवासरे",  // Mon
    "भौमवासरे",  // Tue
    "सौम्यवासरे", // Wed
    "बृहस्पतिवासरे", // Thu
    "भृगुवासरे", // Fri
    "स्थिरवासरे"   // Sat
  ];

  const clean = (s?: string) => s?.toLowerCase().replace(/[^a-z]/g, "") || "";
  return {
    sanskritMonth: MONTH_MAP[clean(month)] || month || "भाद्रपद",
    sanskritPaksha: PAKSHA_MAP[clean(paksha)] || paksha || "कृष्ण",
    sanskritTithi: TITHI_MAP[clean(tithi)] || tithi || "अष्टमी",
    sanskritNakshatra: NAKSHATRA_MAP[clean(nakshatra)] || nakshatra || "रोहिणी",
    sanskritVara: VARA_MAP[dayIdx] || "भृगुवासरे",
  };
};

export default function GlassAstralPanchang({ panchang, event }: Props) {
  const getLiveISTMinutes = () => {
    const now = new Date();
    const ist = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
    return ist.getHours() * 60 + ist.getMinutes();
  };

  const [currentMinutes, setCurrentMinutes] = useState<number>(getLiveISTMinutes);
  const [activeTab, setActiveTab] = useState<PanchangTab>("overview");
  const [selectedKarya, setSelectedKarya] = useState<string | null>(null);
  const [bellRinging, setBellRinging] = useState<boolean>(false);
  const [sankalpSealed, setSankalpSealed] = useState<boolean>(false);
  const [streakDays, setStreakDays] = useState<number>(1);
  const [copiedShare, setCopiedShare] = useState<boolean>(false);
  const [muhurats, setMuhurats] = useState<ReturnType<typeof getDailyMuhuratTimings> | null>(null);
  const [activeChoghadiya, setActiveChoghadiya] = useState<ReturnType<typeof getActiveChoghadiya> | null>(null);
  const [activeHora, setActiveHora] = useState<ReturnType<typeof getActiveHora> | null>(null);
  const [showDeepEphemeris, setShowDeepEphemeris] = useState<boolean>(false);

  useEffect(() => {
    try {
      const todayKey = new Date().toISOString().slice(0, 10);
      if (localStorage.getItem(`shubhmarg_sankalp_${todayKey}`) === "sealed") {
        // Client-only localStorage hydration; must run post-mount.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSankalpSealed(true);
      }
      const savedStreak = parseInt(localStorage.getItem("shubhmarg_sankalp_streak") || "1", 10);
      if (!isNaN(savedStreak) && savedStreak > 0) {
         
        setStreakDays(savedStreak);
      }
    } catch {}
  }, []);

  useEffect(() => {
    const updateTime = () => {
      setCurrentMinutes(getLiveISTMinutes());
      setMuhurats(getDailyMuhuratTimings());
      setActiveChoghadiya(getActiveChoghadiya());
      setActiveHora(getActiveHora());
    };

    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  // Format time with automatic UTC ephemeris to IST conversion (prevents 12:34 AM sunrise bug)
  const formatTime12h = (timeStr?: string | null, defaultHour = 6, defaultMin = 4) => {
    if (!timeStr) {
      return `${defaultHour.toString().padStart(2, "0")}:${defaultMin.toString().padStart(2, "0")}`;
    }
    const match = timeStr.match(/(\d{1,2}):(\d{2})/);
    if (!match) {
      return `${defaultHour.toString().padStart(2, "0")}:${defaultMin.toString().padStart(2, "0")}`;
    }
    let h = parseInt(match[1], 10);
    let m = parseInt(match[2], 10);

    // If hours are 00..03, time is stored in UTC; convert to IST (+5 hours 30 mins)
    if (h < 4) {
      const totalIstMins = (h * 60 + m + 330) % 1440;
      h = Math.floor(totalIstMins / 60);
      m = totalIstMins % 60;
    }

    const h12 = h > 12 ? h - 12 : h === 0 ? 12 : h;
    return `${h12.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
  };

  // 5 Canonical Vedic Angas
  const rawTithi = panchang?.tithi?.split("-")[1] || panchang?.tithi || "Ashtami";
  const tithiName = rawTithi.replace(/^(Krishna|Shukla)\s*/i, "").trim() || "Ashtami";
  const pakshaName = panchang?.paksha?.split("-")[0] || panchang?.paksha || "Krishna";
  const nakshatraName = panchang?.nakshatra || "Rohini";
  const monthName = panchang?.lunar_month || "Bhadrapada";
  const yogaName = panchang?.yoga || "Harshana";
  const karanaName = panchang?.karana || "Baalava";

  // Weekday & Ruling Deity
  const istDate = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
  const daysOfWeek = [
    { en: "Sunday", hi: "रविवार", lord: "Surya Dev (Sun)", dishaShoola: "West (पश्चिम)", remedy: "Consume betel leaf (पान) before departure" },
    { en: "Monday", hi: "सोमवार", lord: "Chandra Dev (Moon)", dishaShoola: "East (पूर्व)", remedy: "Look into a mirror or consume milk before departure" },
    { en: "Tuesday", hi: "मंगलवार", lord: "Mangal Dev (Mars)", dishaShoola: "North (उत्तर)", remedy: "Consume jaggery (गुड़) before departure" },
    { en: "Wednesday", hi: "बुधवार", lord: "Budha Dev (Mercury)", dishaShoola: "North (उत्तर)", remedy: "Consume sesame seeds (तिल) before departure" },
    { en: "Thursday", hi: "गुरुवार", lord: "Brihaspati (Jupiter)", dishaShoola: "South (दक्षिण)", remedy: "Consume yellow mustard or curd before departure" },
    { en: "Friday", hi: "शुक्रवार", lord: "Shukra Dev (Venus)", dishaShoola: "West (पश्चिम)", remedy: "Consume barley (जौ) or curd-jaggery before departure" },
    { en: "Saturday", hi: "शनिवार", lord: "Shani Dev (Saturn)", dishaShoola: "East (पूर्व)", remedy: "Consume ginger (अदरक) before departure" },
  ];
  const currentDay = daysOfWeek[istDate.getDay()];
  const todayDayIndex = istDate.getDay();
  const todayMantra: DailyMantraInfo = PRESIDING_MANTRAS[todayDayIndex] || PRESIDING_MANTRAS[0];

  // Pure Devanagari Sanskrit Ephemeris terms for Sacred Sankalp
  const sanskritPanchang = useMemo(() => {
    return toSanskritPanchang(monthName, pakshaName, tithiName, nakshatraName, todayDayIndex);
  }, [monthName, pakshaName, tithiName, nakshatraName, todayDayIndex]);

  const sunriseTime = formatTime12h(panchang?.sunrise, 6, 4);
  const sunriseMins = 364; // ~06:04 AM IST
  const sunsetMins = 1119; // ~06:39 PM IST
  const daylightDuration = sunsetMins - sunriseMins;
  const isDay = currentMinutes >= sunriseMins && currentMinutes <= sunsetMins;
  const activeProgress = isDay
    ? Math.max(0.04, Math.min(0.96, (currentMinutes - sunriseMins) / daylightDuration))
    : (currentMinutes > sunsetMins ? 0.98 : 0.02);

  const getVedicPahar = (progress: number) => {
    if (!isDay) return "रात्रि काल • Night Vigil";
    if (progress < 0.25) return "प्रथम प्रहर • Morning";
    if (progress < 0.5) return "द्वितीय प्रहर • Forenoon";
    if (progress < 0.75) return "तृतीय प्रहर • Afternoon";
    return "चतुर्थ प्रहर • Sandhya (Dusk)";
  };

  const handleAudioFeedback = (freq: number) => {
    try {
      playPanchangChime(freq, 1.8);
    } catch {}
  };

  const handleRingTempleBell = () => {
    setBellRinging(true);
    // Tactile haptic vibration for temple bell strike
    try {
      if (typeof navigator !== "undefined" && navigator.vibrate) {
        navigator.vibrate([45, 85, 45]);
      }
    } catch {}
    try {
      playTempleBellResonance(todayMantra.frequency || 432);
    } catch {}
    setTimeout(() => {
      setBellRinging(false);
    }, 3800);
  };

  const handleSealSankalp = () => {
    handleRingTempleBell();
    setSankalpSealed(true);
    try {
      const todayKey = new Date().toISOString().slice(0, 10);
      localStorage.setItem(`shubhmarg_sankalp_${todayKey}`, "sealed");
      const currentStreak = parseInt(localStorage.getItem("shubhmarg_sankalp_streak") || "0", 10);
      const newStreak = currentStreak > 0 ? currentStreak : 1;
      localStorage.setItem("shubhmarg_sankalp_streak", newStreak.toString());
      setStreakDays(newStreak);
      // Also record in the Sankalp Journal so the sacred mandala lights up today's petal.
      recordSankalpToday();
    } catch {}
  };

  const handleShareSankalp = () => {
    const shareText = `🌸 आज का शुभ संकल्प (${currentDay.hi}) 🌸\n` +
      `अधिष्ठाता: ${todayMantra.deityHi}\n` +
      `मूल मंत्र: ${todayMantra.moolMantra}\n` +
      `पञ्चाङ्ग: ${sanskritPanchang.sanskritPaksha} ${sanskritPanchang.sanskritTithi} • ${sanskritPanchang.sanskritNakshatra} नक्षत्र\n` +
      `शुभ मुहूर्त: ${muhurats?.abhijit?.timeRange || "11:54 AM – 12:46 PM"}\n` +
      `शुभमार्ग पर दैनिक वैदिक मार्गदर्शन: https://shubhmarg.in`;
    
    if (typeof window !== "undefined") {
      const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
      window.open(whatsappUrl, "_blank");
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 3000);
    }
  };

  const handleShareCompletePanchang = () => {
    const shareText =
      `🕉️ शुभ प्रभात • आज का वैदिक पञ्चाङ्ग 🕉️\n` +
      `📅 ${currentDay.hi} (${currentDay.en}) • ${sanskritPanchang.sanskritPaksha} ${sanskritPanchang.sanskritTithi}\n` +
      `🌟 नक्षत्र: ${sanskritPanchang.sanskritNakshatra} | सूर्योदय: ${sunriseTime} AM\n\n` +
      `🟢 अभिजीत मुहूर्त (सर्वश्रेष्ठ): ${muhurats?.abhijit?.timeRange || "11:54 AM – 12:46 PM"}\n` +
      `🔴 राहु काल (वर्ज्य): ${muhurats?.rahuKaal?.timeRange || "10:30 AM – 12:00 PM"}\n` +
      `🧭 दिशा शूल: ${currentDay.dishaShoola} (परिहार: ${currentDay.remedy})\n\n` +
      `🔔 आज के अधिष्ठाता: ${todayMantra.deityHi}\n` +
      `📿 दैनिक मूल मंत्र: ${todayMantra.moolMantra}\n\n` +
      `शुभमार्ग — आपका दैनिक सनातन मार्गदर्शन:\nhttps://shubhmarg.in/#todays-panchang`;

    if (typeof window !== "undefined") {
      const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
      window.open(whatsappUrl, "_blank");
    }
  };

  const isAbhijitNow = Boolean(muhurats?.abhijit?.isNow);
  const isRahuNow = Boolean(muhurats?.rahuKaal?.isNow);

  // Dynamic live cosmic time evaluation for the 4 pillars
  const isPropertyActiveNow = isAbhijitNow;
  const isGoldActiveNow = currentMinutes >= 720 && currentMinutes <= 810; // 12:00 PM - 01:30 PM (Labh)
  const isTravelCautionNow = isRahuNow; // 10:30 AM - 12:00 PM (Rahu Kaal / Disha Shoola)
  const isSpiritualActiveNow =
    (currentMinutes >= 240 && currentMinutes <= 360) || (currentMinutes >= 1050 && currentMinutes <= 1170); // Brahma or Godhuli

  // ── 3D HOLOGRAPHIC "AAJ KA SHUBH KARYA" DATASET ──
  const shubhKaryaList: ShubhKaryaItem[] = [
    {
      id: "property",
      titleHi: "गृह व वाहन",
      titleEn: "Property & Assets",
      status: "shubh",
      statusTextHi: isPropertyActiveNow ? "🟢 अभी सक्रिय" : "शुभ वेला",
      statusTextEn: isPropertyActiveNow ? "Active Now" : "Auspicious",
      isActiveNow: isPropertyActiveNow,
      windowTime: muhurats?.abhijit?.timeRange || "11:54 AM – 12:46 PM",
      oneLiner: "Token booking, registry, vehicle delivery blessed",
      shastricRule: "Abhijit Muhurta nullifies all planetary doshas. Ideal for initiating real estate agreements, down payments, and taking delivery of vehicles.",
      icon3d: "/vedic-icons/action-property.webp",
      badgeGlow: isPropertyActiveNow
        ? "from-emerald-500/30 to-emerald-600/15 text-emerald-800 border-emerald-500 shadow-[0_0_14px_rgba(16,185,129,0.4)]"
        : "from-emerald-50 to-emerald-100 text-emerald-800 border-emerald-400/50 shadow-2xs",
      audioFreq: 528,
    },
    {
      id: "gold",
      titleHi: "स्वर्ण व निवेश",
      titleEn: "Gold & Wealth",
      status: "labh",
      statusTextHi: isGoldActiveNow ? "🟢 अभी सक्रिय" : "लाभ वेला",
      statusTextEn: isGoldActiveNow ? "Active Now" : "Favorable",
      isActiveNow: isGoldActiveNow,
      windowTime: "12:00 PM – 01:30 PM",
      oneLiner: "Bullion purchases, SIPs, and asset allocations blessed",
      shastricRule: "Labh & Amrit Choghadiya alignment protects financial capital. Highly favorable for purchasing bullion, opening fixed deposits, or trading assets.",
      icon3d: "/vedic-icons/action-gold.webp",
      badgeGlow: isGoldActiveNow
        ? "from-amber-500/30 to-amber-600/15 text-amber-900 border-amber-500 shadow-[0_0_14px_rgba(245,158,11,0.4)]"
        : "from-amber-50 to-amber-100 text-amber-900 border-amber-400/50 shadow-2xs",
      audioFreq: 639,
    },
    {
      id: "travel",
      titleHi: "यात्रा व गमन",
      titleEn: "Travel & Journey",
      status: "caution",
      statusTextHi: isTravelCautionNow ? "⚠️ वर्ज्य अभी" : "दिशा शूल",
      statusTextEn: isTravelCautionNow ? "Inauspicious Now" : `Caution (${currentDay.dishaShoola.split(" ")[0]})`,
      isActiveNow: isTravelCautionNow,
      isCaution: true,
      windowTime: "10:30 AM – 12:00 PM",
      oneLiner: `Disha Shoola active in ${currentDay.dishaShoola}`,
      shastricRule: `Traveling towards ${currentDay.dishaShoola} requires prior Shastric remedy. Journeys towards North and East are unhindered.`,
      remedy: currentDay.remedy,
      icon3d: "/vedic-icons/action-travel.webp",
      badgeGlow: isTravelCautionNow
        ? "from-rose-500/30 to-rose-600/15 text-rose-800 border-rose-500 shadow-[0_0_14px_rgba(244,63,94,0.4)]"
        : "from-rose-50 to-rose-100 text-rose-800 border-rose-400/50 shadow-2xs",
      audioFreq: 741,
    },
    {
      id: "spiritual",
      titleHi: "पूजा व संकल्प",
      titleEn: "Spiritual & Puja",
      status: "uttam",
      statusTextHi: isSpiritualActiveNow ? "🟢 अभी सक्रिय" : "अति उत्तम",
      statusTextEn: isSpiritualActiveNow ? "Active Now" : "Most Sacred",
      isActiveNow: isSpiritualActiveNow,
      windowTime: "ब्रह्म व गोधूली वेला",
      oneLiner: `${nakshatraName} + ${tithiName} multiplies mantra potency`,
      shastricRule: `${nakshatraName} Nakshatra combined with ${tithiName} creates a sacred cosmic alignment. Reciting Vishnu Sahasranama or lighting a cow-ghee lamp yields lasting peace.`,
      icon3d: "/vedic-icons/action-spiritual.webp",
      badgeGlow: isSpiritualActiveNow
        ? "from-[#D4AF37]/30 to-[#E8791E]/15 text-[#8C3F08] border-[#D4AF37] shadow-[0_0_14px_rgba(212,175,55,0.4)]"
        : "from-orange-50 to-orange-100 text-[#8C3F08] border-[#D4AF37]/50 shadow-2xs",
      audioFreq: 432,
    },
  ];

  // Cheap .find() over a 4-item array — no memoization needed (avoids depending on a
  // per-render-recreated array, which breaks React Compiler memoization preservation).
  const activeKaryaDetail = shubhKaryaList.find((k) => k.id === selectedKarya);

  // Live Shastric Alignment Banner
  const liveAlignment = useMemo(() => {
    if (isAbhijitNow) {
      return {
        status: "शुभ मुहूर्त सक्रिय • Abhijit Window Active",
        detail: `अभिजीत मुहूर्त: ${muhurats?.abhijit?.timeRange || "11:54 AM – 12:46 PM"}`,
        theme: "bg-emerald-100 text-emerald-800 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.25)]",
        dot: "bg-emerald-400 shadow-[0_0_12px_#34D399]",
      };
    }
    if (isRahuNow) {
      return {
        status: "राहु काल प्रभावी • Inauspicious Window",
        detail: `राहु काल: ${muhurats?.rahuKaal?.timeRange || "10:30 AM – 12:00 PM"} (Avoid New Ventures)`,
        theme: "bg-rose-100 text-rose-800 border-rose-500/50 shadow-[0_0_20px_rgba(244,63,94,0.25)]",
        dot: "bg-rose-400 shadow-[0_0_12px_#FB7185]",
      };
    }
    return {
      status: `${pakshaName} ${tithiName} • ${getVedicPahar(activeProgress)}`,
      detail: `चन्द्र राशि: ${monthName} • नक्षत्र: ${nakshatraName}`,
      theme: "bg-[#FDF3E2] text-[#C25E10] border-[#B8860B]/40 shadow-[0_4px_16px_-6px_rgba(184,134,11,0.3)]",
      dot: "bg-[#E8791E] shadow-[0_0_12px_#E8791E]",
    };
  }, [isAbhijitNow, isRahuNow, pakshaName, tithiName, activeProgress, monthName, nakshatraName, muhurats]);

  return (
    <div id="todays-panchang" className="w-full relative select-none scroll-mt-24 max-w-5xl mx-auto pb-2 sm:pb-3">
      {/* ── 3D CONSECRATED ROYAL OBSIDIAN-GOLD TABLET ── */}
      <div className="relative rounded-[28px] sm:rounded-[34px] bg-gradient-to-b from-[#FFFDF8] via-[#FBF6EC] to-[#F5EAD6] border border-[#B8860B]/30 shadow-[0_25px_70px_-20px_rgba(107,42,20,0.28)] p-4 sm:p-7 backdrop-blur-md overflow-hidden">
        
        {/* Dynamic Multi-Color Cosmic Caustics */}
        <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[520px] h-[520px] bg-gradient-to-b from-[#E8791E]/15 via-[#D4AF37]/10 to-transparent blur-[120px] rounded-full" />
        <div className="pointer-events-none absolute -bottom-32 right-10 w-96 h-96 bg-[#C25E10]/12 blur-[100px] rounded-full" />
        <div className="pointer-events-none absolute top-1/3 left-4 w-72 h-72 bg-[#9B51E0]/08 blur-[90px] rounded-full" />

        {/* ── 1. ROYAL EPHEMERIS HEADER (3D Coin, Telemetry & 1-Tap Share) ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 pb-4 mb-4 border-b border-[#D4AF37]/30 relative z-10">
          <div className="flex items-center gap-3.5">
            {/* Consecrated 3D ॐ Gold Coin with continuous floating tilt */}
            <motion.div
              animate={{
                rotateY: [0, 15, 0, -15, 0],
                y: [0, -3, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FFEAA7] via-[#D4AF37] to-[#8C6818] p-[1.5px] shadow-[0_0_25px_rgba(212,175,55,0.45)] shrink-0"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="w-full h-full rounded-[14px] bg-gradient-to-b from-[#FFFDF8] to-[#FDF3E2] flex items-center justify-center border border-[#E8791E]/40 shadow-inner">
                <span className="font-devanagari text-[#C25E10] text-2xl font-black leading-none drop-shadow-[0_2px_8px_rgba(232,121,30,0.9)]">
                  ॐ
                </span>
              </div>
            </motion.div>

            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2
                  className="text-2xl sm:text-3xl font-extrabold font-serif tracking-tight leading-none text-[#2A1810] drop-shadow-[0_2px_12px_rgba(212,175,55,0.4)]"
                  style={{ color: "#2A1810" }}
                >
                  Today&apos;s Panchang &amp; Muhurat
                </h2>
                <span className="text-[9.5px] uppercase tracking-[0.22em] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#FDF3E2] text-[#C25E10] border border-[#B8860B]/40 shadow-[0_0_10px_rgba(212,175,55,0.2)]">
                  Jaipur Ephemeris • Live 3D
                </span>
              </div>
              <p className="text-[12.5px] text-[#2E1D14] font-semibold mt-1 font-sans flex items-center gap-1.5 flex-wrap">
                <MoonPhaseGlyph paksha={pakshaName} tithi={tithiName} size={18} />
                <span>
                  {currentDay.hi} ({currentDay.en}) • {pakshaName} {tithiName} • {nakshatraName} Nakshatra
                </span>
              </p>
            </div>
          </div>

          {/* Right Action Stack: Quick WhatsApp Share & Live Alignment Pill */}
          <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
            <button
              onClick={handleShareCompletePanchang}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100 border border-emerald-500/40 hover:border-emerald-500 text-emerald-700 text-xs font-mono font-bold transition-all shadow-md cursor-pointer active:scale-95 shrink-0"
              title="Share today's auspicious timings on WhatsApp"
            >
              <Share2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>शेयर पञ्चाङ्ग</span>
            </button>

            <div className={cn("inline-flex items-center gap-2.5 px-4 py-2 rounded-full border shadow-lg backdrop-blur-md transition-all", liveAlignment.theme)}>
              <span className={cn("w-2.5 h-2.5 rounded-full animate-pulse shrink-0", liveAlignment.dot)} />
              <div className="text-left">
                <p className="text-[11.5px] font-bold leading-tight uppercase tracking-wider">{liveAlignment.status}</p>
                <p className="text-[10px] opacity-85 leading-tight font-mono">{liveAlignment.detail}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sacred Festival Banner */}
        {event && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-gradient-to-r from-[#D4AF37]/20 via-[#E8791E]/20 to-[#D4AF37]/20 border border-[#D4AF37]/50 text-xs text-[#C25E10] shadow-[0_4px_20px_rgba(212,175,55,0.15)] backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4 text-[#FFD166] shrink-0 animate-pulse" />
            <span>
              Today&apos;s Consecrated Festival: <strong className="font-bold text-[#2A1810] text-sm">{event.name.replace(/^[\d\s-]+\s*/, "")}</strong>
            </span>
          </motion.div>
        )}

        {/* ── 1b. CONSECRATED MANDIR SANCTUM & DAILY SANKALP (UNIFIED TEMPLE ALAR) ── */}
        <div className="mb-5 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#FFFDF9] via-[#FCF8F1] to-[#F8F1E2] border border-[#D4AF37]/50 p-3.5 sm:p-5 shadow-[0_12px_32px_-12px_rgba(74,38,14,0.22)] relative overflow-hidden">
          {/* Corner Royal Filigree Accents */}
          <span className="absolute top-2.5 left-2.5 w-3 h-3 border-t border-l border-[#D4AF37]/60 rounded-tl pointer-events-none" />
          <span className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b border-r border-[#D4AF37]/60 rounded-br pointer-events-none" />

          {/* Ambient Golden Halo */}
          <div className="pointer-events-none absolute -top-16 -right-16 w-64 h-64 bg-gradient-to-br from-[#E8791E]/15 to-[#D4AF37]/20 blur-3xl rounded-full" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 w-64 h-64 bg-[#D4AF37]/10 blur-3xl rounded-full" />

          {/* Sanctum Top Ribbon */}
          <div className="flex items-center justify-between gap-2 pb-2.5 mb-3 border-b border-[#D4AF37]/25 relative z-10 flex-wrap">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-[#C25E10] text-sm">𑁍</span>
              <h3 className="text-xs sm:text-sm font-serif font-black tracking-wide text-[#22130A] uppercase drop-shadow-xs truncate">
                दैनिक संकल्प एवं अधिष्ठाता • Daily Sanctum
              </h3>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FFF5E5] text-[#8C3F08] border border-[#E8791E]/30 text-[9.5px] font-mono font-bold shadow-2xs">
                🔥 {streakDays} Day Streak
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FFF8EB] border border-[#D4AF37]/45 text-[9.5px] font-mono font-bold text-[#8C3F08] shadow-2xs">
                <span className={cn("w-1.5 h-1.5 rounded-full", bellRinging ? "bg-amber-400 animate-ping" : "bg-emerald-500")} />
                <span>{todayMantra.frequency} Hz</span>
              </span>
              <span className="hidden xs:inline-flex items-center px-2 py-0.5 rounded-full bg-[#FFF8EB] border border-[#D4AF37]/40 text-[9.5px] font-mono text-[#8C3F08]">
                {sanskritPanchang.sanskritPaksha} {sanskritPanchang.sanskritTithi}
              </span>
            </div>
          </div>

          {/* Sanctum Upper Stage: 3D Bell + Deity & Mool Mantra */}
          <div className="relative z-10 mb-3">
            <div className="flex items-center gap-3 sm:gap-4 relative">
              {/* Custom 3D Suspended Temple Bell with Pendulum Physics & Transparent Altar Integration */}
              <div className="shrink-0 flex items-center justify-center">
                <RealisticTempleBell3D
                  isRinging={bellRinging}
                  onStrike={handleRingTempleBell}
                  size={72}
                />
              </div>

              {/* Deity & Presiding Mool Mantra */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1 mb-0.5">
                  <span className="text-[10.5px] uppercase font-mono tracking-wider text-[#C25E10] font-bold flex items-center gap-1 truncate">
                    <Flame className="w-3 h-3 text-[#E8791E] shrink-0" />
                    <span className="truncate">{todayMantra.deityHi}</span>
                  </span>
                  <span className="text-[9px] font-mono font-bold text-[#8C3F08] bg-[#FFF5E5] px-2 py-0.5 rounded-full border border-[#E8791E]/25 shrink-0">
                    {currentDay.hi}
                  </span>
                </div>

                <p
                  className="text-xs sm:text-[14px] font-serif font-black text-[#1E120A] tracking-wide leading-snug"
                  style={{ fontFamily: "'Tiro Devanagari Hindi', serif" }}
                >
                  {todayMantra.moolMantra}
                </p>
                <p className="text-[9.5px] sm:text-[10px] text-[#8C5212] font-sans italic truncate mt-0.5">
                  {todayMantra.transliteration}
                </p>
              </div>
            </div>
          </div>

          {/* Consecrated Sankalp Shloka (Integrated Parchment Altar) */}
          <div className="relative z-10 pt-2.5 border-t border-[#D4AF37]/25 space-y-1">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[9.5px] uppercase font-mono tracking-wider text-[#8C3F08] font-bold flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 text-[#C25E10]" />
                <span>संकल्प पाठ • Sacred Consecration Vow</span>
              </span>
            </div>

            <p
              className="text-[12px] sm:text-[13px] text-[#22130A] font-serif leading-relaxed font-bold tracking-wide"
              style={{ fontFamily: "'Tiro Devanagari Hindi', serif" }}
            >
              &ldquo;ॐ तत्सत्। मम आत्मनः श्रुतिस्मृतिपुराणोक्त फलप्राप्त्यर्थं, {todayMantra.deityHi} प्रीत्यर्थं, अद्य {sanskritPanchang.sanskritMonth} मासे, {sanskritPanchang.sanskritPaksha} पक्षे, {sanskritPanchang.sanskritTithi} तिथौ, {sanskritPanchang.sanskritNakshatra} नक्षत्रे, {sanskritPanchang.sanskritVara}, शुभ संकल्पं करिष्ये।&rdquo;
            </p>
            <p className="text-[10px] sm:text-[10.5px] text-[#635342] font-sans italic leading-snug">
              For spiritual harmony and divine grace, I align my mind and deeds with cosmic truth and auspicious conduct.
            </p>
          </div>

          {/* ONE Unified Master Consecration Action */}
          <div className="relative z-10 pt-2.5 mt-2 border-t border-[#D4AF37]/25">
            {sankalpSealed ? (
              <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-2 p-2 sm:p-2.5 rounded-xl bg-gradient-to-r from-emerald-50 via-emerald-100/70 to-emerald-50 border border-emerald-500/45 text-emerald-900 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                <div className="flex items-center gap-2 min-w-0 w-full sm:w-auto">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-xs sm:text-sm font-serif font-bold text-emerald-900">
                    ॐ संकल्प सिद्धम् • Consecrated Today ✓
                  </span>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <button
                    onClick={handleShareSankalp}
                    className="flex-1 sm:flex-none text-[10.5px] font-mono font-bold text-emerald-800 hover:text-emerald-950 bg-emerald-100 px-3 py-1.5 rounded-lg border border-emerald-500/40 hover:border-emerald-500 transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <Share2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{copiedShare ? "Opened WhatsApp!" : "Share Blessing"}</span>
                  </button>
                  <button
                    onClick={handleRingTempleBell}
                    className="text-[10.5px] font-mono uppercase font-bold text-[#8C3F08] hover:text-[#2A1810] bg-[#FFF8EB] px-2.5 py-1.5 rounded-lg border border-[#D4AF37]/40 hover:border-[#D4AF37] transition-all cursor-pointer shrink-0 flex items-center gap-1"
                  >
                    <Bell className="w-3.5 h-3.5 text-[#C25E10]" />
                    <span>Re-Chime</span>
                  </button>
                </div>
              </div>
            ) : (
              <div>
                {/* Threshold invocation — crossing the mandir door. In Sanatan tradition
                    the temple bell (ghanta) is rung before darshan to announce arrival to
                    the deity and still the mind. This turns the tap into a real ritual. */}
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="mb-2.5 flex items-start gap-2 px-3 py-2 rounded-xl bg-[#FFF8EB]/80 border border-[#D4AF37]/30"
                >
                  <span className="text-[#C25E10] text-sm leading-none mt-0.5 shrink-0">𑁍</span>
                  <p className="text-[10.5px] sm:text-[11px] text-[#5A3A1E] leading-snug font-sans">
                    <span className="font-devanagari font-bold text-[#8B1A1A]" style={{ fontFamily: "'Tiro Devanagari Hindi', serif" }}>
                      शुद्ध मन से प्रवेश करें
                    </span>{" "}
                    — Pause a breath. As you would at a mandir door, ring the bell to still the
                    mind and announce your arrival before making today&apos;s sacred resolve.
                  </p>
                </motion.div>

                <motion.button
                  onClick={handleSealSankalp}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F5A623] to-[#E8791E] hover:from-[#E2C875] hover:to-[#F59E0B] text-[#120B07] font-serif font-black text-xs sm:text-[13px] tracking-wider transition-all duration-300 shadow-[0_4px_18px_rgba(212,175,55,0.45)] hover:shadow-[0_6px_24px_rgba(232,121,30,0.55)] flex items-center justify-center gap-2 cursor-pointer select-none"
                >
                  <motion.div
                    animate={bellRinging ? { rotate: [-24, 24, -16, 16, -8, 8, 0] } : { rotate: 0 }}
                    transition={{ duration: 1.2 }}
                  >
                    <Bell className="w-4 h-4 fill-current text-[#120B07]" />
                  </motion.div>
                  <span>घंटा नाद के साथ संकल्प लें • Strike Bell &amp; Consecrate Sankalp</span>
                </motion.button>
              </div>
            )}
          </div>

          {/* Sankalp Journal Mandala — seeker's private 30-day sacred practice tracker.
              Lights up today's petal live when the bell is struck. */}
          <SankalpMandala />
        </div>

        {/* ── 2. "AAJ KA SHUBH KARYA" 3D LIVE RADAR ACTION DECK ── */}
        <div className="mb-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.7)] animate-pulse" />
              <h3
                className="text-sm sm:text-base font-serif font-bold uppercase tracking-wider text-[#2A1810] flex items-center gap-2 flex-wrap"
                style={{ color: "#2A1810" }}
              >
                <span className="font-devanagari font-bold text-sm sm:text-base text-[#C25E10]" style={{ color: "#2A1810" }}>
                  आज का शुभ कार्य
                </span>
                <span className="text-[#B8860B]/50 hidden sm:inline">•</span>
                <span className="text-[#2A1810] text-xs sm:text-sm font-sans font-semibold tracking-normal">
                  Live Cosmic Muhurta Radar
                </span>
              </h3>
            </div>

            {/* Disha Shoola Astrolabe Bar */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#FFF8EB] via-[#FDF3DE] to-[#FFF8EB] border border-[#D4AF37]/45 text-[10px] font-mono text-[#8C3F08] self-start sm:self-auto shadow-xs">
              <Compass className="w-3.5 h-3.5 text-[#C25E10] shrink-0 animate-spin [animation-duration:25s]" />
              <span>दिशा शूल: <strong className="text-rose-700 font-bold">{currentDay.dishaShoola.split(" ")[0]} (वर्ज्य)</strong></span>
              <span className="text-[#D4AF37]">•</span>
              <span className="text-[#635342] truncate max-w-[190px] sm:max-w-none">
                परिहार: <strong>{currentDay.remedy.split("(")[0].replace("Consume ", "")}</strong>
              </span>
            </div>
          </div>

          {/* 4 Pillars 3D Perspective Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3" style={{ perspective: "1200px" }}>
            {shubhKaryaList.map((item, idx) => {
              const isSelected = selectedKarya === item.id;

              return (
                <motion.button
                  key={item.id}
                  onClick={() => {
                    handleAudioFeedback(item.audioFreq);
                    setSelectedKarya(isSelected ? null : item.id);
                  }}
                  whileHover={{
                    scale: 1.02,
                    y: -2,
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className={cn(
                    "relative p-2.5 sm:p-3.5 rounded-2xl border text-left transition-all duration-300 cursor-pointer select-none overflow-hidden group flex flex-col justify-between",
                    item.isActiveNow && !isSelected && "ring-2 ring-emerald-500/70 shadow-[0_0_18px_rgba(16,185,129,0.35)] bg-gradient-to-b from-[#FFFDF9] via-[#F4FBF5] to-[#EAF6ED]",
                    isSelected
                      ? "bg-gradient-to-b from-[#FDF3E2] to-[#F5EAD6] border-[#E8791E] shadow-[0_12px_34px_-14px_rgba(232,121,30,0.4)] ring-2 ring-[#E8791E]/60"
                      : !item.isActiveNow && "bg-gradient-to-b from-[#FFFDF9] via-[#FCF8F1] to-[#F8F1E2] border-[#D4AF37]/35 hover:border-[#E8791E]/60 shadow-[0_8px_20px_-10px_rgba(74,38,14,0.16)]"
                  )}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Corner Royal Filigree */}
                  <span className="absolute top-1.5 left-1.5 w-2 h-2 border-t border-l border-[#D4AF37]/45 rounded-tl pointer-events-none" />
                  <span className="absolute bottom-1.5 right-1.5 w-2 h-2 border-b border-r border-[#D4AF37]/45 rounded-br pointer-events-none" />

                  {/* Top Bar: 3D Floating Asset & Status Badge */}
                  <div>
                    <div className="flex items-start justify-between gap-1.5 mb-2">
                      {/* Photorealistic 3D Vedic Asset with Continuous Float */}
                      <motion.div
                        animate={{
                          y: [0, -3, 0],
                        }}
                        transition={{
                          duration: 3 + idx * 0.4,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl overflow-hidden border-2 border-[#D4AF37]/60 bg-[#0D0907] shadow-[0_6px_18px_-4px_rgba(201,162,74,0.4)] shrink-0 group-hover:border-[#E8791E] transition-colors"
                        style={{ transform: "translateZ(20px)" }}
                      >
                        <Image
                          src={item.icon3d}
                          alt={item.titleEn}
                          fill
                          className="object-cover scale-[1.3] group-hover:scale-[1.4] transition-transform duration-500"
                          sizes="56px"
                        />
                      </motion.div>

                      {/* Auspicious Status Pill */}
                      <span
                        className={cn(
                          "text-[8px] sm:text-[9px] font-black uppercase px-2 py-0.5 rounded-full border leading-tight shrink-0 mt-0.5 shadow-2xs truncate max-w-[100px]",
                          item.badgeGlow
                        )}
                        style={{ transform: "translateZ(18px)" }}
                      >
                        {item.statusTextHi}
                      </span>
                    </div>

                    {/* Title Section */}
                    <div style={{ transform: "translateZ(14px)" }}>
                      <p className="font-serif font-bold text-xs sm:text-[13.5px] text-[#22130A] leading-tight group-hover:text-[#9E430A] transition-colors">
                        {item.titleHi}
                      </p>
                      <p className="text-[9.5px] sm:text-[10px] text-[#635342] font-sans mt-0.5 truncate">
                        {item.titleEn}
                      </p>
                    </div>
                  </div>

                  {/* Muhurat Timing Pill - Zero Truncation / Single-Line Wrap-Safe */}
                  <div className="mt-2.5 pt-1.5 border-t border-[#D4AF37]/20 flex items-center justify-between gap-1" style={{ transform: "translateZ(10px)" }}>
                    <div className="flex items-center gap-1 min-w-0">
                      <Clock className="w-3 h-3 text-[#C25E10] shrink-0" />
                      <span className="text-[8.5px] sm:text-[9.5px] font-mono font-bold text-[#843D0A] whitespace-nowrap leading-tight tracking-tight">
                        {item.windowTime}
                      </span>
                    </div>
                    <ChevronRight className={cn(
                      "w-3 h-3 text-[#C25E10] shrink-0 transition-transform duration-200",
                      isSelected ? "rotate-90 text-[#9E430A]" : "group-hover:translate-x-0.5"
                    )} />
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* ── 3D EXPANDED SHASTRIC GUIDANCE ORACLE DRAWER (COMPACT LUXURY INSPECTOR) ── */}
          <AnimatePresence>
            {activeKaryaDetail && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.99 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.99 }}
                transition={{ type: "spring", stiffness: 450, damping: 28 }}
                className="mt-3 overflow-hidden rounded-2xl bg-gradient-to-b from-[#FFFDF9] via-[#FCF8F1] to-[#F8F1E2] border border-[#D4AF37]/45 p-3.5 sm:p-4 shadow-[0_14px_36px_-12px_rgba(74,38,14,0.22)] relative"
              >
                {/* Corner Filigrees */}
                <span className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-[#D4AF37]/50 rounded-tl pointer-events-none" />
                <span className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-[#D4AF37]/50 rounded-br pointer-events-none" />

                {/* Header row with title, window pill, status badge, and close button */}
                <div className="flex items-center justify-between gap-2 pb-2.5 mb-2.5 border-b border-[#D4AF37]/25">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="relative w-9 h-9 rounded-lg overflow-hidden border border-[#D4AF37]/60 bg-[#0D0907] shrink-0">
                      <Image
                        src={activeKaryaDetail.icon3d}
                        alt={activeKaryaDetail.titleEn}
                        fill
                        style={{ transform: "scale(1.3)" }}
                        className="object-cover"
                        sizes="32px"
                      />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm sm:text-base font-serif font-extrabold text-[#22130A] tracking-tight truncate">
                        {activeKaryaDetail.titleHi} • {activeKaryaDetail.titleEn}
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className={cn(
                      "text-[9px] font-bold uppercase px-2 py-0.5 rounded-full border shadow-2xs",
                      activeKaryaDetail.badgeGlow
                    )}>
                      {activeKaryaDetail.statusTextHi}
                    </span>
                    <button
                      onClick={() => setSelectedKarya(null)}
                      className="p-1 rounded-full bg-[#FFF8EB] hover:bg-[#FDF3DE] text-[#843D0A] border border-[#D4AF37]/40 transition-all cursor-pointer ml-1"
                      title="Close"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* 2-Column Info Grid: Shastric Guidance & Timing/Remedy */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  <div className="p-2.5 rounded-xl bg-[#FFFDF8] border border-[#D4AF37]/30 shadow-2xs">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-[#8C3F08] font-bold block mb-1">
                      📜 शास्त्र सम्मत विधि • Classical Guidance
                    </span>
                    <p className="text-[11.5px] text-[#2A1810] leading-relaxed font-sans">
                      {activeKaryaDetail.shastricRule}
                    </p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#FFFDF8] border border-[#D4AF37]/30 shadow-2xs flex flex-col justify-between">
                    <div>
                      <span className="text-[9px] font-mono uppercase tracking-wider text-[#C25E10] font-bold block mb-1">
                        ⏰ मुहूर्त काल • Timing &amp; Alignment
                      </span>
                      <p className="text-xs font-mono font-bold text-[#843D0A]">
                        {activeKaryaDetail.windowTime}
                      </p>
                      <p className="text-[10.5px] text-[#635342] mt-0.5 font-sans">
                        {activeKaryaDetail.oneLiner}
                      </p>
                    </div>

                    {activeKaryaDetail.remedy && (
                      <div className="mt-2 flex items-center gap-2 p-1.5 rounded-lg bg-rose-50 border border-rose-400/40 text-rose-800 text-[10.5px]">
                        <ShieldAlert className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                        <span>
                          <strong>परिहार:</strong> {activeKaryaDetail.remedy}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Quick Action Footer */}
                <div className="flex items-center justify-between gap-2 pt-2.5 mt-2.5 border-t border-[#D4AF37]/20 flex-wrap">
                  <button
                    onClick={() => {
                      const text = `🌸 शुभ कार्य मुहूर्त (${activeKaryaDetail.titleHi}) 🌸\n` +
                        `समय: ${activeKaryaDetail.windowTime}\n` +
                        `स्थिति: ${activeKaryaDetail.statusTextHi}\n` +
                        `नियम: ${activeKaryaDetail.shastricRule}\n` +
                        (activeKaryaDetail.remedy ? `परिहार: ${activeKaryaDetail.remedy}\n` : "") +
                        `शुभमार्ग — https://shubhmarg.in`;
                      if (typeof window !== "undefined") {
                        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, "_blank");
                      }
                    }}
                    className="text-[10px] font-mono font-bold text-emerald-800 hover:text-emerald-950 bg-emerald-100 px-2.5 py-1 rounded-lg border border-emerald-500/40 hover:border-emerald-500 transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs"
                  >
                    <Share2 className="w-3 h-3 text-emerald-600" />
                    <span>Share Muhurat on WhatsApp</span>
                  </button>

                  <Link
                    href="/shubh-calendar"
                    className="inline-flex items-center gap-1 text-[10px] font-mono text-[#C25E10] hover:text-[#C25E10] transition-all ml-auto"
                  >
                    <span>Full Muhurat Calendar</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── 3b. MOBILE EPHEMERIS ACCORDION TRIGGER ── */}
        <div className="block sm:hidden mt-3 mb-2">
          <button
            type="button"
            onClick={() => {
              handleAudioFeedback(432);
              setShowDeepEphemeris((prev) => !prev);
            }}
            className="w-full flex items-center justify-between px-4 py-2.5 rounded-2xl bg-gradient-to-r from-[#FFF9EE] via-[#FFF3D6] to-[#FFF9EE] border border-[#D4AF37]/65 shadow-[0_4px_14px_rgba(184,134,11,0.14)] active:scale-[0.99] transition-all cursor-pointer text-left"
          >
            <div className="flex items-center gap-2 min-w-0">
              <Sparkles className="w-4 h-4 text-[#C25E10] shrink-0" />
              <div className="min-w-0">
                <p className="text-[12px] font-bold text-[#8C3F08] font-serif leading-tight truncate">
                  {showDeepEphemeris ? "Hide Shastric Ephemeris & Timings" : "Explore Deep Ephemeris & Timings"}
                </p>
                <p className="text-[10px] text-[#6B5542] font-sans truncate">
                  Abhijit, Rahu Kaal, 5 Angas &amp; Hora
                </p>
              </div>
            </div>
            <span className="text-[11px] font-bold text-[#C25E10] bg-[#FFF2DE] px-2.5 py-1 rounded-full border border-[#D4AF37]/50 shrink-0 ml-2">
              {showDeepEphemeris ? "Close ▲" : "View ▾"}
            </span>
          </button>
        </div>

        {/* ── 4 & 5. SHASTRA NAVIGATION & PANELS (Desktop: Always, Mobile: Toggleable) ── */}
        <div className={cn(showDeepEphemeris ? "block" : "hidden sm:block")}>
          {/* ── 4. SHASTRA NAVIGATION TABS (Molten Gold Glider) ── */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-[#FBF6EC] border border-[#B8860B]/25 mb-4 overflow-x-auto hide-scrollbar shadow-inner">
          {[
            { id: "overview" as const, label: "दैनिक अवलोकन • Overview" },
            { id: "muhurats" as const, label: "शुभ-अशुभ मुहूर्त • Muhurats" },
            { id: "angas" as const, label: "पञ्चाङ्ग अङ्ग • 5 Limbs" },
            { id: "choghadiya" as const, label: "चौघड़िया व होरा • Choghadiya" },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  handleAudioFeedback(528);
                  setActiveTab(tab.id);
                }}
                className={cn(
                  "relative px-4 py-2 rounded-full text-xs font-bold tracking-wide whitespace-nowrap flex items-center gap-1.5 shrink-0 cursor-pointer transition-colors duration-200",
                  isActive ? "text-[#2A1810] font-black" : "text-[#2E1D14] hover:text-[#2A1810] font-bold"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="shastraPanchangTabGlider"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FFEAA7] via-[#D4AF37] to-[#E8791E] shadow-[0_0_20px_rgba(212,175,55,0.6)]"
                    transition={{ type: "spring", stiffness: 480, damping: 28 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ── 5. SHASTRA CONTENT PANELS ── */}
        <div className="min-h-[140px]">
          <AnimatePresence mode="wait">
            {/* PANEL 1: OVERVIEW */}
            {activeTab === "overview" && (
              <motion.div
                key="panel-overview"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
                className="space-y-3"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Abhijit Window Tile */}
                  <div className={cn(
                    "flex items-center justify-between p-3.5 rounded-2xl border transition-all",
                    isAbhijitNow
                      ? "bg-emerald-50 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                      : "bg-[#FFFDF8] border-emerald-600/30"
                  )}>
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-9 h-9 rounded-xl flex items-center justify-center shrink-0",
                        isAbhijitNow ? "bg-emerald-500 text-black shadow-[0_0_15px_#10B981]" : "bg-emerald-100 text-emerald-700 border border-emerald-500/40"
                      )}>
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-serif font-bold text-sm text-[#2A1810]">अभिजीत मुहूर्त (Abhijit)</span>
                          {isAbhijitNow && (
                            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-emerald-500 text-black uppercase">
                              Active Now
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-[#2E1D14] font-medium">Best for signing deals &amp; key beginnings</p>
                      </div>
                    </div>
                    <span className="font-mono text-xs font-bold text-emerald-800 whitespace-nowrap ml-2">
                      {muhurats?.abhijit?.timeRange || "11:54 AM – 12:46 PM"}
                    </span>
                  </div>

                  {/* Rahu Kaal Warning Tile */}
                  <div className={cn(
                    "flex items-center justify-between p-3.5 rounded-2xl border transition-all",
                    isRahuNow
                      ? "bg-rose-50 border-rose-500/50 shadow-[0_0_20px_rgba(244,63,94,0.2)]"
                      : "bg-[#FFFDF8] border-rose-500/30"
                  )}>
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-9 h-9 rounded-xl flex items-center justify-center shrink-0",
                        isRahuNow ? "bg-rose-500 text-white shadow-[0_0_15px_#F43F5E]" : "bg-rose-100 text-rose-700 border border-rose-500/40"
                      )}>
                        <ShieldAlert className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-serif font-bold text-sm text-[#2A1810]">राहु काल (Rahu Kaal)</span>
                          {isRahuNow && (
                            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-rose-500 text-white uppercase">
                              Avoid Now
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-[#2E1D14] font-medium">Avoid purchases, travel &amp; contracts</p>
                      </div>
                    </div>
                    <span className="font-mono text-xs font-bold text-rose-800 whitespace-nowrap ml-2">
                      {muhurats?.rahuKaal?.timeRange || "10:30 AM – 12:00 PM"}
                    </span>
                  </div>
                </div>

                {/* 5 Angas Micro Strip — Horizontal Smooth Rail on Mobile, 5-col Grid on Desktop */}
                <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar sm:grid sm:grid-cols-5 pt-1">
                  {[
                    { label: "तिथि", en: "TITHI", val: tithiName, freq: 486 },
                    { label: "वार", en: "VARA", val: currentDay.hi, freq: 528 },
                    { label: "नक्षत्र", en: "NAKSHATRA", val: nakshatraName, freq: 432 },
                    { label: "योग", en: "YOGA", val: yogaName, freq: 639 },
                    { label: "करण", en: "KARANA", val: karanaName, freq: 741 },
                  ].map((anga) => (
                    <button
                      key={anga.en}
                      onClick={() => handleAudioFeedback(anga.freq)}
                      className="min-w-[105px] sm:min-w-0 flex-1 px-3 py-2 sm:p-2.5 rounded-xl bg-[#FFFDF8] border border-[#B8860B]/25 hover:border-[#E8791E] flex flex-col items-center justify-center text-center transition-all cursor-pointer active:scale-95 shadow-md group shrink-0"
                      title="Tap for sacred chime resonance"
                    >
                      <span className="text-[8px] font-mono font-bold tracking-wider text-[#2E1D14] uppercase block">{anga.en}</span>
                      <span className="text-xs sm:text-sm font-serif font-bold text-[#2A1810] group-hover:text-[#C25E10] whitespace-nowrap block mt-0.5">{anga.val}</span>
                      <span className="text-[9.5px] text-[#E8791E] font-devanagari block mt-0.5 font-bold">{anga.label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* PANEL 2: ALL MUHURATS */}
            {activeTab === "muhurats" && (
              <motion.div
                key="panel-muhurats"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3.5"
              >
                {/* Auspicious Group */}
                <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-500/30 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#34D399]" />
                    <span>शुभ वेला • Auspicious Windows</span>
                  </div>

                  <div className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-[#FFFDF8] border border-emerald-600/30">
                    <span className="font-semibold text-[#2A1810]">अभिजीत मुहूर्त (Abhijit)</span>
                    <span className="font-mono font-bold text-emerald-800">{muhurats?.abhijit?.timeRange || "11:54 AM – 12:46 PM"}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-[#FFFDF8] border border-[#B8860B]/20">
                    <span className="font-semibold text-[#2A1810]">ब्रह्म मुहूर्त (Brahma)</span>
                    <span className="font-mono font-bold text-[#C25E10]">{muhurats?.brahmaMuhurta?.timeRange || "04:24 AM – 05:12 AM"}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-[#FFFDF8] border border-[#B8860B]/20">
                    <span className="font-semibold text-[#2A1810]">गोधूली वेला (Godhuli)</span>
                    <span className="font-mono font-bold text-[#C25E10]">{muhurats?.godhuli?.timeRange || "06:25 PM – 06:50 PM"}</span>
                  </div>
                </div>

                {/* Cautionary Group */}
                <div className="p-3.5 rounded-2xl bg-rose-50/70 border border-rose-500/30 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-rose-800 uppercase tracking-wider mb-1">
                    <span className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_#FB7185]" />
                    <span>अशुभ काल • Cautionary Windows</span>
                  </div>

                  <div className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-[#FFFDF8] border border-rose-500/30">
                    <span className="font-semibold text-[#2A1810]">राहु काल (Rahu Kaal)</span>
                    <span className="font-mono font-bold text-rose-800">{muhurats?.rahuKaal?.timeRange || "10:30 AM – 12:00 PM"}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-[#FFFDF8] border border-[#B8860B]/20">
                    <span className="font-semibold text-[#2A1810]">यमगण्ड (Yamaganda)</span>
                    <span className="font-mono font-bold text-[#C25E10]">{muhurats?.yamaganda?.timeRange || "03:00 PM – 04:30 PM"}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-[#FFFDF8] border border-[#B8860B]/20">
                    <span className="font-semibold text-[#2A1810]">गुलिक काल (Gulika)</span>
                    <span className="font-mono font-bold text-[#C25E10]">09:00 AM – 10:30 AM</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* PANEL 3: 5 VEDIC ANGAS */}
            {activeTab === "angas" && (
              <motion.div
                key="panel-angas"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
                className="grid grid-cols-2 sm:grid-cols-5 gap-2.5"
              >
                {[
                  { hi: "तिथि", en: "Tithi", val: tithiName, desc: `${pakshaName} Paksha`, freq: 486 },
                  { hi: "वार", en: "Vara", val: currentDay.hi, desc: currentDay.lord, freq: 528 },
                  { hi: "नक्षत्र", en: "Nakshatra", val: nakshatraName, desc: "Brahma / Prajapati", freq: 432 },
                  { hi: "योग", en: "Yoga", val: yogaName, desc: "Auspicious Union", freq: 639 },
                  { hi: "करण", en: "Karana", val: karanaName, desc: "Half Lunar Day", freq: 741 },
                ].map((c) => (
                  <button
                    key={c.en}
                    onClick={() => handleAudioFeedback(c.freq)}
                    className="p-3.5 rounded-2xl bg-[#FFFDF8] border border-[#B8860B]/25 hover:border-[#E8791E] flex flex-col items-center justify-center text-center gap-0.5 shadow-md transition-all cursor-pointer active:scale-95 group"
                  >
                    <span className="text-[9px] font-mono font-bold text-[#2E1D14] uppercase tracking-wider">{c.en}</span>
                    <p className="text-base font-serif font-bold text-[#2A1810] group-hover:text-[#C25E10] leading-tight">{c.val}</p>
                    <span className="text-[10px] text-[#E8791E] font-devanagari font-semibold">{c.hi}</span>
                    <p className="text-[9px] text-[#2E1D14] font-medium truncate max-w-full mt-0.5">{c.desc}</p>
                  </button>
                ))}
              </motion.div>
            )}

            {/* PANEL 4: CHOGHADIYA & HORA */}
            {activeTab === "choghadiya" && (
              <motion.div
                key="panel-choghadiya"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3.5"
              >
                {/* Active Choghadiya */}
                <div className="p-4 rounded-2xl bg-[#FFFDF8] border border-[#B8860B]/35 shadow-md flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#2E1D14] tracking-wider block font-mono">वर्तमान चौघड़िया • Current Choghadiya</span>
                    <p className="text-lg font-serif font-bold text-[#2A1810] mt-0.5">
                      {activeChoghadiya?.name || "Amrit"} ({activeChoghadiya?.isAuspicious ? "शुभ • Auspicious" : "अशुभ • Inauspicious"})
                    </p>
                    <p className="text-[11px] text-[#2E1D14] font-medium mt-0.5">{activeChoghadiya?.idealActivities || "Best for all auspicious tasks"}</p>
                  </div>
                  <span className={cn(
                    "px-3 py-1 rounded-full text-[10.5px] font-bold uppercase border",
                    activeChoghadiya?.isAuspicious
                      ? "bg-emerald-100 text-emerald-700 border-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                      : "bg-rose-100 text-rose-700 border-rose-500/50 shadow-[0_0_10px_rgba(244,63,94,0.3)]"
                  )}>
                    {activeChoghadiya?.isAuspicious ? "Shubh" : "Avoid"}
                  </span>
                </div>

                {/* Active Hora */}
                <div className="p-4 rounded-2xl bg-[#FFFDF8] border border-[#B8860B]/35 shadow-md flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#2E1D14] tracking-wider block font-mono">वर्तमान होरा • Planetary Hora</span>
                    <p className="text-lg font-serif font-bold text-[#2A1810] mt-0.5">
                      {activeHora?.sanskrit || "Shukra"} Hora ({activeHora?.planet || "Venus"})
                    </p>
                    <p className="text-[11px] text-[#2E1D14] font-medium mt-0.5">{activeHora?.bestFor || "Creative & financial initiatives"}</p>
                  </div>
                  <span className="font-mono text-xs font-bold text-[#C25E10] bg-[#FDF3E2] px-3 py-1 rounded-full border border-[#B8860B]/40">
                    {activeHora?.activeTimeRange || "12:00 - 13:00"}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        </div>

        {/* ── 5b. TOMORROW PEEK — retention hook. Uses only 100% deterministic data
             (weekday + ruling deity) — NO faked tithi ephemeris. Sends seekers to the
             full calendar for tomorrow's real Panchang. ── */}
        {(() => {
          const tomorrowIdx = (todayDayIndex + 1) % 7;
          const tomorrow = daysOfWeek[tomorrowIdx];
          const TOMORROW_ESSENCE: Record<number, string> = {
            0: "Radiant vitality & professional clarity",
            1: "Emotional calm & maternal blessings",
            2: "Courage & victory over obstacles",
            3: "Sharp intellect & agile trade",
            4: "Wisdom & spiritual expansion",
            5: "Wealth, beauty & domestic harmony",
            6: "Discipline & karmic reward",
          };
          return (
            <Link
              href="/shubh-calendar"
              className="group mt-5 relative flex items-center gap-3 sm:gap-4 pt-4 border-t border-dashed border-[#D4AF37]/40 hover:border-[#E8791E]/60 transition-colors"
            >
              <span className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#FDF3E2] to-[#F5EAD6] border border-[#B8860B]/45 text-[#8C3F08] text-[9.5px] font-sans font-black uppercase tracking-[0.22em] shadow-2xs">
                <span
                  className="font-devanagari text-[11px] leading-none text-[#8B1A1A]"
                  style={{ fontFamily: "'Tiro Devanagari Hindi', serif" }}
                >
                  कल
                </span>
                <span>Tomorrow</span>
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[12px] sm:text-[13px] font-semibold text-[#2A1810] leading-tight truncate">
                  <span
                    className="font-devanagari text-[#8B1A1A]"
                    style={{ fontFamily: "'Tiro Devanagari Hindi', serif" }}
                  >
                    {tomorrow.hi}
                  </span>{" "}
                  <span className="text-[#6B5A48] font-normal">({tomorrow.en})</span>
                  <span className="text-[#D4AF37] mx-1.5">•</span>
                  <span className="text-[#C25E10] font-bold">{tomorrow.lord}</span>
                </p>
                <p className="text-[10.5px] text-[#6B5A48] font-sans italic leading-tight mt-0.5 truncate">
                  {TOMORROW_ESSENCE[tomorrowIdx]}
                </p>
              </div>
              <span className="shrink-0 inline-flex items-center gap-1 text-[10.5px] font-bold text-[#C25E10] group-hover:text-[#8B1A1A] transition-colors uppercase tracking-wider">
                <span className="hidden sm:inline">Full Panchang</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>
          );
        })()}

        {/* ── 6. ROYAL FOOTER CTA ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 mt-4 border-t border-[#D4AF37]/30 text-center sm:text-left">
          <p className="text-xs text-[#2E1D14] font-medium">
            काशी-जयपुर निर्णय सिन्धु पद्धति • Real-Time Ephemeris by Royal Acharyas
          </p>
          <Link
            href="/shubh-calendar"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#FFEAA7] via-[#D4AF37] to-[#E8791E] text-[#120B07] text-xs font-black shadow-[0_4px_20px_rgba(212,175,55,0.4)] hover:brightness-110 active:scale-95 transition-all"
          >
            <span>Full Hindu Calendar &amp; Muhurats</span>
            <ChevronRight className="w-4 h-4 text-[#120B07]" />
          </Link>
        </div>

      </div>
    </div>
  );
}
