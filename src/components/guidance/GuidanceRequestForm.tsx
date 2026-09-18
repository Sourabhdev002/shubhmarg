"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { submitGuidanceRequest } from "@/app/request-guidance/actions";
import { 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  Loader2, 
  User, 
  MessageCircle, 
  Calendar, 
  MapPin, 
  HelpCircle,
  ArrowRight,
  Lock
} from "lucide-react";
import { ShubhMargEmblem } from "@/components/brand/ShubhMargLogo";
import PremiumVedicIcon from "@/components/ui/PremiumVedicIcon";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const SERVICE_ICON_MAP: Record<string, string> = {
  "vedic-guidance": "kundli-engine",
  "kundli": "kundli-xray",
  "muhurat": "muhurta-finder",
  "career-business": "wealth-calendar",
  "marriage": "navamsha-d9",
  "remedy": "gemstone-calculator",
  "temple-puja": "temple-puja",
  "tatkal-express": "tatkal-express",
  "voice-dossier": "voice-dossier",
  "annual-varshphal": "annual-varshphal",
  "energized-gemstone": "energized-gemstone",
  "business-retainer": "vastu-compass",
};

const SERVICES = [
  // Classical Consultations
  { id: "vedic-guidance", name: "Prashna (1 Question)", price: 501, delivery: "2-3 days", category: "guidance", popular: true, desc: "Specific answer with remedial guidance" },
  { id: "kundli", name: "Jyotish / Kundli Reading", price: 1101, delivery: "3-5 days", category: "guidance", popular: false, desc: "Full planetary horoscope chart analysis" },
  { id: "muhurat", name: "Muhurta (Auspicious Timing)", price: 251, delivery: "2-3 days", category: "guidance", popular: false, desc: "Marriage, business, travel or griha pravesh" },
  { id: "career-business", name: "Career & Business Advice", price: 501, delivery: "2-3 days", category: "guidance", popular: false, desc: "10th house analysis & wealth timings" },
  { id: "marriage", name: "Marriage & Relationships", price: 1501, delivery: "3-5 days", category: "guidance", popular: false, desc: "Gun Milan, compatibility & remedies" },
  { id: "remedy", name: "Remedies & Solutions", price: 1101, delivery: "3-5 days", category: "guidance", popular: false, desc: "Custom gemstone, mantra & puja remedy" },

  // Sacred Offerings & Pujas
  { id: "temple-puja", name: "Remote Temple Sankalp Puja", price: 2100, delivery: "Kashi/Ujjain + Prasad", category: "offering", popular: true, desc: "Live priest sankalp with sanctified prasad" },
  { id: "tatkal-express", name: "2-Hour Tatkal Express Guidance", price: 2499, delivery: "Within 120 Mins", category: "offering", popular: false, desc: "Emergency priority guidance direct on phone" },
  { id: "voice-dossier", name: "Pandit Ji Voice Audio Dossier", price: 1999, delivery: "Studio MP3 on WhatsApp", category: "offering", popular: false, desc: "Personalized deep-dive audio recording" },
  { id: "annual-varshphal", name: "365-Day Royal Varshphal Book", price: 2999, delivery: "25+ Page Gold Dossier", category: "offering", popular: false, desc: "Full year month-by-month predictive report" },
  { id: "energized-gemstone", name: "Consecrated Gemstone Ring", price: 5500, delivery: "Lab Certified + Ring", category: "offering", popular: false, desc: "Prana-pratishtha energized authentic stone" },
  { id: "business-retainer", name: "Vyapar Vastu & Business Retainer", price: 11000, delivery: "Quarterly VIP Retainer", category: "offering", popular: false, desc: "Ongoing strategic Vedic advisory for business" },
];

const ALIAS_MAP: Record<string, string> = {
  puja: "temple-puja",
  express: "tatkal-express",
  voice: "voice-dossier",
  varshphal: "annual-varshphal",
  gemstone: "energized-gemstone",
  business: "business-retainer",
};

const PROMPT_CHIPS = [
  { label: "Career Timing", query: "When will my career transition succeed and what remedial actions are recommended?" },
  { label: "Marriage & Compatibility", query: "Marriage timing, partner compatibility, and astrological remedies." },
  { label: "Financial Remedies", query: "Astrological remedy for recurring financial obstacles and wealth creation timing." },
  { label: "Health & Peace", query: "Astrological analysis for health relief, vitality, and mental peace." },
];

export default function GuidanceRequestForm() {
  const searchParams = useSearchParams();
  const rawParam = searchParams.get("service") || "";
  const initialService = ALIAS_MAP[rawParam] || rawParam || "vedic-guidance";

  const [form, setForm] = useState({
    service: initialService,
    fullName: "",
    phone: "",
    dateOfBirth: "",
    timeOfBirth: "",
    birthPlace: "",
    question: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<{ referenceId: string; amount: number } | null>(null);

  const selectedService = SERVICES.find(s => s.id === form.service) || SERVICES[0];

  const update = (field: string, value: string) => {
    setError("");
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    // Active validation with instant auto-focus to avoid any disabled/white-fade button look
    if (!form.fullName.trim()) {
      setError("Please enter your full name for the Sankalp.");
      document.getElementById("fullName")?.focus();
      return;
    }
    if (!form.phone.trim() || form.phone.trim().length < 10) {
      setError("Please enter a valid 10-digit WhatsApp number to receive your guidance.");
      document.getElementById("phone")?.focus();
      return;
    }
    if (!form.dateOfBirth) {
      setError("Please select your Date of Birth for accurate horoscope charting.");
      document.getElementById("dob")?.focus();
      return;
    }
    if (!form.birthPlace.trim()) {
      setError("Please enter your Birth Place (City, State) to calculate Lagna (Ascendant).");
      document.getElementById("birthPlace")?.focus();
      return;
    }
    if (!form.question.trim()) {
      setError("Please write your question or intention for Pandit Ji.");
      document.getElementById("question")?.focus();
      return;
    }

    setSubmitting(true);
    setError("");

    const formData = {
      concern: "",
      fullName: form.fullName.trim(),
      email: form.phone.trim() + "@phone.shubhmarg.com", // phone as primary identifier
      dateOfBirth: form.dateOfBirth,
      timeOfBirth: form.timeOfBirth || "",
      birthPlace: form.birthPlace.trim(),
      currentCity: form.birthPlace.trim(),
      preferredLanguage: "Hindi",
      question: form.question.trim(),
      service: form.service,
      privacyConsent: true,
    };

    const result = await submitGuidanceRequest(formData);
    if (result.success && result.referenceId) {
      setSuccess({ referenceId: result.referenceId, amount: selectedService.price });
    } else {
      setError(result.error || "Something went wrong. Please try again.");
    }
    setSubmitting(false);
  };

  // ── Success State ──
  if (success) {
    return (
      <div className="mx-auto max-w-xl px-4 py-12">
        <div className="relative rounded-3xl bg-gradient-to-b from-[#FFFDF8] via-[#FAF4E8] to-[#F5EAD6] p-8 sm:p-10 border-2 border-[#D4AF37]/50 shadow-[0_20px_50px_rgba(184,134,11,0.22)] text-center overflow-hidden">
          {/* Ornate corner brackets */}
          <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-[#D4AF37] pointer-events-none rounded-tl-sm" />
          <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-[#D4AF37] pointer-events-none rounded-tr-sm" />
          <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-[#D4AF37] pointer-events-none rounded-bl-sm" />
          <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-[#D4AF37] pointer-events-none rounded-br-sm" />

          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.5 }}>
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 border-2 border-emerald-500/50 flex items-center justify-center mb-5 shadow-[0_0_24px_rgba(16,185,129,0.25)]">
              <CheckCircle2 className="w-10 h-10 text-emerald-600" />
            </div>
          </motion.div>

          <div className="flex items-center justify-center gap-2 mb-2">
            <ShubhMargEmblem size={22} />
            <span className="text-xs font-extrabold uppercase tracking-[0.25em] text-[#C25E10]">
              Sankalp Consecrated
            </span>
            <ShubhMargEmblem size={22} />
          </div>

          <h2 className="text-3xl font-bold font-serif text-[#2A1810] mb-2">
            Your Guidance is Initiated
          </h2>
          <p className="text-[#6B5A48] text-sm max-w-md mx-auto mb-6">
            Your sacred inquiry is queued with our verified Vedic practitioner. Complete the Dakshina below to begin calculations.
          </p>

          <div className="bg-white/95 border border-[#D4AF37]/50 rounded-2xl p-5 mb-8 shadow-inner">
            <p className="text-xs uppercase tracking-widest text-[#6B5A48]/70 font-semibold mb-1">Your Sacred Reference ID</p>
            <p className="text-2xl sm:text-3xl font-mono font-bold text-[#2A1810] tracking-wider selection:bg-amber-100">
              {success.referenceId}
            </p>
          </div>

          <Link
            href={`/payment/${success.referenceId}`}
            className="group relative inline-flex items-center justify-center w-full gap-3 bg-gradient-to-r from-[#7B0F1E] via-[#9E182A] to-[#630915] text-white font-bold text-sm tracking-widest uppercase py-4 px-8 rounded-2xl shadow-[0_12px_32px_rgba(123,15,30,0.5)] hover:brightness-110 active:scale-[0.99] transition-all min-h-[60px] overflow-hidden border-2 border-[#D4AF37]"
          >
            <span className="relative z-10 flex items-center gap-3">
              <ShubhMargEmblem size={26} />
              <span>Complete Dakshina of ₹{success.amount}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>

          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-[#6B5A48]">
            <Clock className="w-3.5 h-3.5 text-[#C25E10]" />
            <span>Delivery within {selectedService.delivery} directly on WhatsApp</span>
          </div>
        </div>
      </div>
    );
  }

  // Determine default category from selected service
  const initialCategory = SERVICES.find(s => s.id === initialService)?.category === "offering" ? "offering" : "guidance";
  const [activeCategory, setActiveCategory] = useState<"guidance" | "offering">(initialCategory);

  const filteredServices = SERVICES.filter(s => s.category === activeCategory);

  // Audio sample chant player
  const [isPlayingChant, setIsPlayingChant] = useState(false);
  const chantAudioRef = typeof window !== "undefined" ? new Audio("/audio/Divya Pratah Aashirwad.mp3") : null;

  const toggleChant = () => {
    if (!chantAudioRef) return;
    if (isPlayingChant) {
      chantAudioRef.pause();
      setIsPlayingChant(false);
    } else {
      chantAudioRef.play().then(() => setIsPlayingChant(true)).catch(() => {});
      chantAudioRef.onended = () => setIsPlayingChant(false);
    }
  };

  // ── Form ──
  return (
    <div className="mx-auto max-w-xl px-4 py-2 sm:py-4">
      {/* Cosmic Muhurta Live Ticker */}
      <div className="flex items-center justify-center gap-1.5 py-1 px-3 rounded-full bg-gradient-to-r from-amber-500/15 via-white to-amber-500/15 border border-[#D4AF37]/45 text-[10px] font-bold text-[#8B1A1A] mb-2.5 max-w-sm mx-auto shadow-2xs">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping shrink-0" />
        <span>Live Kashi Muhurta: Auspicious for Gotra Sankalp</span>
      </div>

      {/* Royal Manuscript Card */}
      <div className="relative rounded-3xl bg-gradient-to-b from-[#FFFDF9] via-[#FAF5EC] to-[#F6EEE0] p-4 sm:p-7 border-2 border-[#D4AF37]/45 shadow-[0_16px_40px_rgba(107,42,20,0.12),0_4px_16px_rgba(212,175,55,0.1)] overflow-hidden">
        
        {/* Ornate Gold Corner Motifs */}
        <div className="absolute top-2.5 left-2.5 w-4 h-4 border-t-2 border-l-2 border-[#D4AF37]/80 pointer-events-none rounded-tl-sm" />
        <div className="absolute top-2.5 right-2.5 w-4 h-4 border-t-2 border-r-2 border-[#D4AF37]/80 pointer-events-none rounded-tr-sm" />
        <div className="absolute bottom-2.5 left-2.5 w-4 h-4 border-b-2 border-l-2 border-[#D4AF37]/80 pointer-events-none rounded-bl-sm" />
        <div className="absolute bottom-2.5 right-2.5 w-4 h-4 border-b-2 border-r-2 border-[#D4AF37]/80 pointer-events-none rounded-br-sm" />

        {/* Top Atelier Seal Header */}
        <div className="flex items-center justify-between pb-3 mb-3.5 border-b border-[#D4AF37]/25">
          <div className="flex items-center gap-2">
            <ShubhMargEmblem size={26} />
            <div>
              <span className="text-xs font-serif font-extrabold tracking-wide text-[#7B0F1E] block leading-tight">
                Vedic Sankalp Intake
              </span>
              <span className="text-[10px] text-[#6B5A48] block font-medium">
                Gotra &amp; Lagna Jyotish
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* 1-Tap Pandit Ji Chanting Audio Sample Pill */}
            <button
              type="button"
              onClick={toggleChant}
              className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r from-[#7B0F1E] to-[#9E182A] text-white text-[9.5px] font-bold shadow-xs hover:brightness-110 active:scale-95 transition-all cursor-pointer border border-amber-300/40"
              title="Listen to Pandit Ji's Sanskrit chant sample"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-pulse shrink-0" />
              <span>{isPlayingChant ? "Chant Playing..." : "Sample Voice"}</span>
            </button>

            <div className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/95 border border-emerald-600/35 text-emerald-800 text-[9.5px] font-bold shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Desk Active</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Service Selector with Category Tabs */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-serif font-bold text-[#2A1810]">
                1. Select Sacred Offering
              </span>

              {/* Category Switcher Tabs */}
              <div className="flex bg-white/90 p-1 rounded-xl border border-[#D4AF37]/35 shadow-inner gap-1">
                <button
                  type="button"
                  onClick={() => {
                    setActiveCategory("guidance");
                    const firstInCat = SERVICES.find(s => s.category === "guidance");
                    if (firstInCat) update("service", firstInCat.id);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                    activeCategory === "guidance"
                      ? "bg-[#7B0F1E] text-white shadow-xs"
                      : "text-[#6B5A48] hover:text-[#2A1810]"
                  }`}
                >
                  Consultations (6)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveCategory("offering");
                    const firstInCat = SERVICES.find(s => s.category === "offering");
                    if (firstInCat) update("service", firstInCat.id);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                    activeCategory === "offering"
                      ? "bg-[#7B0F1E] text-white shadow-xs"
                      : "text-[#6B5A48] hover:text-[#2A1810]"
                  }`}
                >
                  Temple Pujas (6)
                </button>
              </div>
            </div>

            {/* Service Pills Grid/Carousel */}
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-amber-300/50">
              {filteredServices.map(s => {
                const isSelected = form.service === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => update("service", s.id)}
                    className={`shrink-0 px-3 py-2 rounded-xl text-xs font-medium transition-all border whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                      isSelected
                        ? "bg-gradient-to-r from-[#7B0F1E] via-[#8B1A1A] to-[#5C0A0A] text-white border-[#D4AF37] shadow-[0_3px_12px_rgba(123,15,30,0.3)] font-bold scale-[1.02]"
                        : "bg-white/95 text-[#2A1810]/85 border-[#D4AF37]/35 hover:border-[#D4AF37] hover:bg-white"
                    }`}
                    style={{ touchAction: "manipulation" }}
                  >
                    <span>{s.name}</span>
                    <span className={`font-mono text-[11px] font-bold ${isSelected ? "text-amber-200" : "text-[#7B0F1E]"}`}>
                      ₹{s.price}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Selected Service Ledger Card */}
            <div className="mt-2.5 p-3 rounded-2xl bg-gradient-to-r from-amber-500/10 via-white to-amber-500/10 border border-[#D4AF37]/40 shadow-xs">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <div className="shrink-0 p-1 rounded-xl bg-white/95 border border-[#D4AF37]/45 shadow-2xs">
                    <PremiumVedicIcon 
                      name={SERVICE_ICON_MAP[selectedService.id] || "kundli-engine"} 
                      size={36} 
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-xs sm:text-sm font-bold text-[#2A1810] font-serif leading-snug">
                        {selectedService.name}
                      </span>
                      {selectedService.popular && (
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-800 border border-amber-300/50 shrink-0">
                          Popular
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-[#6B5A48] leading-tight mt-0.5 line-clamp-1">{selectedService.desc}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <div className="text-right">
                    <span className="text-[8px] uppercase font-bold text-[#6B5A48]/70 block">Dakshina</span>
                    <span className="text-base font-black font-mono text-[#7B0F1E] leading-tight">₹{selectedService.price}</span>
                  </div>
                  <div className="h-6 w-px bg-[#D4AF37]/35" />
                  <div className="flex items-center gap-1 text-[10px] font-medium text-[#2A1810] bg-white/95 px-2 py-1 rounded-lg border border-[#D4AF37]/30 shadow-2xs">
                    <Clock className="w-3 h-3 text-[#C25E10]" />
                    <span>{selectedService.delivery}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Seeker Identification Deck (Full Name & WhatsApp in 2 Columns) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-xs font-serif font-bold text-[#2A1810] mb-1">
                Yajaman Name (यजमान नाम) <span className="text-[#8B1A1A]">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#C25E10]">
                  <User className="w-3.5 h-3.5" />
                </div>
                <input
                  id="fullName"
                  type="text"
                  value={form.fullName}
                  onChange={e => update("fullName", e.target.value)}
                  placeholder="Full name for Gotra Sankalp"
                  required
                  autoComplete="name"
                  className="w-full bg-white/95 border border-[#D4AF37]/35 rounded-xl pl-9 pr-3 py-2.5 text-[14px] font-medium text-[#2A1810] placeholder:text-[#2A1810]/40 focus:bg-white focus:border-[#7B0F1E] focus:ring-1 focus:ring-[#7B0F1E]/20 focus:outline-none transition-all shadow-2xs"
                  style={{ fontSize: "15px" }}
                />
              </div>
            </div>

            {/* Phone / WhatsApp */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="phone" className="block text-xs font-serif font-bold text-[#2A1810]">
                  WhatsApp Number <span className="text-[#8B1A1A]">*</span>
                </label>
                <span className="text-[10px] font-semibold text-emerald-800 flex items-center gap-0.5">
                  <Lock className="w-2.5 h-2.5" /> Audio Dossier Sent Here
                </span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                  <span className="flex items-center gap-1 bg-emerald-50 border border-emerald-500/35 text-emerald-800 text-[11px] font-bold px-1.5 py-0.5 rounded-md">
                    <MessageCircle className="w-3 h-3 text-emerald-600 fill-emerald-600/20" />
                    <span>+91</span>
                  </span>
                </div>
                <input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={e => update("phone", e.target.value)}
                  placeholder="98765 43210"
                  required
                  inputMode="tel"
                  autoComplete="tel"
                  className="w-full bg-white/95 border border-[#D4AF37]/35 rounded-xl pl-20 pr-3 py-2.5 text-[14px] font-medium text-[#2A1810] placeholder:text-[#2A1810]/40 focus:bg-white focus:border-[#7B0F1E] focus:ring-1 focus:ring-[#7B0F1E]/20 focus:outline-none transition-all shadow-2xs"
                  style={{ fontSize: "15px" }}
                />
              </div>
            </div>
          </div>

          {/* Live Sankalp Patram Inscription Badge */}
          {form.fullName.trim() && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }} 
              animate={{ opacity: 1, scale: 1 }}
              className="p-2.5 rounded-xl bg-gradient-to-r from-amber-500/10 via-[#FFFDF9] to-amber-500/10 border border-[#D4AF37]/50 shadow-2xs space-y-1"
            >
              <div className="flex items-center justify-between text-[10px] text-amber-900 font-bold border-b border-[#D4AF37]/25 pb-1 font-serif">
                <span>॥ श्री वैदिक संकल्प पत्रम् ॥</span>
                <span className="font-mono text-[9px] text-[#7B0F1E] bg-amber-100/70 px-1.5 py-0.2 rounded border border-amber-300/40 font-bold">
                  Kashi Peeth Sankalp
                </span>
              </div>
              <div className="flex items-center justify-between gap-2 text-xs">
                <span className="text-[#2A1810] font-serif font-bold truncate">
                  यजमान: <span className="text-[#7B0F1E] font-black">{form.fullName}</span>
                </span>
                <span className="text-[10px] text-[#6B5A48] font-semibold shrink-0">
                  {selectedService.name}
                </span>
              </div>
            </motion.div>
          )}

          {/* Janma Kundli Coordinates (Sacred Astrological Deck) */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-50/50 via-white/80 to-amber-50/30 border border-[#D4AF37]/35 shadow-2xs space-y-2.5">
            <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-1.5">
              <div className="flex items-center gap-1.5 text-xs font-serif font-bold text-[#7B0F1E]">
                <Calendar className="w-3.5 h-3.5 text-[#C25E10]" />
                <span>Janma Kundli Coordinates (जन्म विवरण)</span>
              </div>
              <span className="text-[10px] text-[#6B5A48] font-medium">For Lagna &amp; Navamsha chart</span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {/* Date of Birth */}
              <div>
                <label htmlFor="dob" className="block text-[11px] font-serif font-bold text-[#2A1810]/80 mb-1">
                  Birth Date <span className="text-[#8B1A1A]">*</span>
                </label>
                <input
                  id="dob"
                  type="date"
                  value={form.dateOfBirth}
                  onChange={e => update("dateOfBirth", e.target.value)}
                  required
                  className="w-full bg-white border border-[#D4AF37]/35 rounded-xl px-2.5 py-2 text-[13px] font-medium text-[#2A1810] focus:border-[#7B0F1E] focus:ring-1 focus:ring-[#7B0F1E]/20 focus:outline-none shadow-2xs"
                  style={{ fontSize: "14px" }}
                />
              </div>

              {/* Birth Time */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="tob" className="block text-[11px] font-serif font-bold text-[#2A1810]/80">
                    Birth Time
                  </label>
                  <span className="text-[9px] text-[#6B5A48]">Approx. OK</span>
                </div>
                <input
                  id="tob"
                  type="time"
                  value={form.timeOfBirth}
                  onChange={e => update("timeOfBirth", e.target.value)}
                  className="w-full bg-white border border-[#D4AF37]/35 rounded-xl px-2.5 py-2 text-[13px] font-medium text-[#2A1810] focus:border-[#7B0F1E] focus:ring-1 focus:ring-[#7B0F1E]/20 focus:outline-none shadow-2xs"
                  style={{ fontSize: "14px" }}
                />
              </div>
            </div>

            {/* Birth Place */}
            <div>
              <label htmlFor="birthPlace" className="block text-[11px] font-serif font-bold text-[#2A1810]/80 mb-1">
                Birth Place (जन्म स्थान) <span className="text-[#8B1A1A]">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#C25E10]">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <input
                  id="birthPlace"
                  type="text"
                  value={form.birthPlace}
                  onChange={e => update("birthPlace", e.target.value)}
                  placeholder="City, State, Country (e.g. Varanasi, Uttar Pradesh)"
                  required
                  className="w-full bg-white border border-[#D4AF37]/35 rounded-xl pl-9 pr-3 py-2 text-[13px] font-medium text-[#2A1810] placeholder:text-[#2A1810]/40 focus:border-[#7B0F1E] focus:ring-1 focus:ring-[#7B0F1E]/20 focus:outline-none shadow-2xs"
                  style={{ fontSize: "14px" }}
                />
              </div>
            </div>
          </div>

          {/* Question & Sankalp Intention */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="question" className="block text-xs font-serif font-bold text-[#2A1810]">
                Your Question / Sankalp Intention <span className="text-[#8B1A1A]">*</span>
              </label>
              <span className="text-[10px] text-[#C25E10] font-semibold flex items-center gap-0.5">
                <HelpCircle className="w-2.5 h-2.5" /> Be specific for Pandit Ji
              </span>
            </div>

            <textarea
              id="question"
              value={form.question}
              onChange={e => update("question", e.target.value)}
              placeholder="What life matter would you like Pandit Ji to examine? (e.g. career timing, marriage compatibility, business hurdles, spiritual remedy)..."
              required
              rows={2}
              className="w-full bg-white/95 border border-[#D4AF37]/35 rounded-xl px-3 py-2 text-[13px] font-medium text-[#2A1810] placeholder:text-[#2A1810]/40 focus:bg-white focus:border-[#7B0F1E] focus:ring-1 focus:ring-[#7B0F1E]/20 focus:outline-none transition-all resize-none shadow-2xs"
              style={{ fontSize: "14px" }}
            />

            {/* Micro Prompt Ideas Strip (Single compact row) */}
            <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
              <span className="text-[9px] font-bold text-[#6B5A48] uppercase tracking-wider">
                Tap idea:
              </span>
              {PROMPT_CHIPS.map(chip => (
                <button
                  key={chip.label}
                  type="button"
                  onClick={() => {
                    update("question", form.question ? `${form.question}\n${chip.query}` : chip.query);
                  }}
                  className="text-[10px] font-medium bg-white hover:bg-amber-50 border border-[#D4AF37]/40 text-[#6B5A48] hover:text-[#2A1810] px-2 py-0.5 rounded-lg shadow-2xs transition-colors cursor-pointer"
                >
                  + {chip.label}
                </button>
              ))}
            </div>
          </div>

          {/* Error notice */}
          {error && (
            <div className="bg-red-50 border border-red-300 rounded-xl p-3 text-xs text-red-800 flex items-start gap-2 shadow-2xs">
              <span className="text-sm leading-none">⚠️</span>
              <span className="font-medium">{error}</span>
            </div>
          )}

          {/* Award-Winning Royal CTA Button */}
          <div className="pt-1">
            <button
              type="submit"
              disabled={submitting}
              className="group relative w-full flex items-center justify-between bg-gradient-to-r from-[#7B0F1E] via-[#9E182A] to-[#630915] text-white font-extrabold text-xs uppercase tracking-wider py-3.5 px-5 rounded-2xl shadow-[0_10px_28px_rgba(123,15,30,0.4),0_2px_6px_rgba(0,0,0,0.15)] hover:brightness-110 active:scale-[0.99] transition-all min-h-[56px] border-2 border-[#D4AF37] cursor-pointer"
              style={{ touchAction: "manipulation" }}
            >
              {submitting ? (
                <div className="w-full flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-amber-300" />
                  <span className="font-bold tracking-wide">Initiating Sacred Sankalp Dossier...</span>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2.5 text-left">
                    <div className="w-8 h-8 rounded-full bg-black/25 flex items-center justify-center shrink-0 border border-amber-300/40 shadow-inner">
                      <ShubhMargEmblem size={22} />
                    </div>
                    <div>
                      <span className="block font-bold tracking-wide text-xs sm:text-sm text-white">
                        Submit &amp; Pay Dakshina
                      </span>
                      <span className="block text-[9px] text-amber-200 font-medium tracking-normal">
                        Personalized guidance by verified Vedic practitioner
                      </span>
                    </div>
                  </div>

                  {/* Golden Coin Price Badge */}
                  <div className="flex items-center gap-1.5 bg-gradient-to-r from-amber-400/30 to-amber-300/15 border border-amber-300/70 px-3 py-1 rounded-full text-amber-200 font-mono font-black text-xs tracking-normal shadow-inner shrink-0 group-hover:scale-105 transition-transform">
                    <span>₹{selectedService.price}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-300 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </>
              )}
            </button>
          </div>

          {/* Three-Point Sacred Trust Grid */}
          <div className="grid grid-cols-3 gap-1.5 pt-1.5 text-center border-t border-[#D4AF37]/20">
            <div className="flex flex-col items-center gap-0.5 p-1.5 rounded-xl bg-white/70 border border-[#D4AF37]/25 shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-[#7B0F1E]" />
              <span className="text-[10px] font-bold text-[#2A1810]">100% Private</span>
              <span className="text-[8px] text-[#6B5A48] leading-tight">Seen only by Pandit Ji</span>
            </div>
            <div className="flex flex-col items-center gap-0.5 p-1.5 rounded-xl bg-white/70 border border-[#D4AF37]/25 shadow-2xs">
              <Clock className="w-3.5 h-3.5 text-[#C25E10]" />
              <span className="text-[10px] font-bold text-[#2A1810]">{selectedService.delivery}</span>
              <span className="text-[8px] text-[#6B5A48] leading-tight">Delivery turnaround</span>
            </div>
            <div className="flex flex-col items-center gap-0.5 p-1.5 rounded-xl bg-white/70 border border-[#D4AF37]/25 shadow-2xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
              <span className="text-[10px] font-bold text-[#2A1810]">Full Refund</span>
              <span className="text-[8px] text-[#6B5A48] leading-tight">If unfulfilled</span>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}