"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  Crown, 
  Sparkles,
  Headphones,
  FileText,
  SlidersHorizontal,
  LayoutGrid
} from "lucide-react";
import { ShubhMargEmblem } from "@/components/brand/ShubhMargLogo";
import PremiumVedicIcon from "@/components/ui/PremiumVedicIcon";

interface ServiceItem {
  id: string;
  name: string;
  sanskrit: string;
  badge: string | null;
  tagline: string;
  description: string;
  includes: string[];
  price: number;
  deliveryDays: string;
  highlight: boolean;
  serviceParam: string;
  vedicIcon: string;
}

const services: ServiceItem[] = [
  {
    id: "prashna",
    name: "Prashna Horary",
    sanskrit: "प्रश्न ज्योतिष",
    badge: "Most Chosen",
    tagline: "Instant query chart cast for immediate life decisions",
    description: "A specific question answered through the cosmic chart cast at the exact divine moment of inquiry. Pinpoint clarity without needing exact birth time.",
    includes: [
      "Single focused life question analysis",
      "Immediate Horary planetary chart calculation",
      "Personalized Studio Audio Dossier (MP3)",
      "Certified Remedial PDF sent on WhatsApp",
    ],
    price: 501,
    deliveryDays: "2-3",
    highlight: true,
    serviceParam: "vedic-guidance",
    vedicIcon: "kundli-engine",
  },
  {
    id: "jyotish",
    name: "Jyotish Natal Reading",
    sanskrit: "जन्म कुण्डली",
    badge: "Complete Blueprint",
    tagline: "Full 12-house natal horoscope, dashas & transits",
    description: "Comprehensive reading of your natal Lagna, Navamsha (D9), Vimshottari Mahadasha timeline, and upcoming transits for career, wealth, and marriage.",
    includes: [
      "Complete 12-house natal horoscope analysis",
      "Active Mahadasha & Antardasha roadmap",
      "Planetary transits & Sade Sati timeline",
      "Personalized gemstone & mantra prescription",
    ],
    price: 1100,
    deliveryDays: "3-5",
    highlight: false,
    serviceParam: "kundli",
    vedicIcon: "kundli-xray",
  },
  {
    id: "muhurta",
    name: "Muhurta Timing",
    sanskrit: "शुभ मुहूर्त",
    badge: "Auspicious Windows",
    tagline: "Cosmic alignment for weddings, business & travel",
    description: "Calculates the most auspicious cosmic alignment for critical life events — marriage, business founding, real estate, or Griha Pravesh.",
    includes: [
      "Event-specific planetary timing calculations",
      "Shortlist of 3-5 verified auspicious windows",
      "Tithi, Nakshatra, Yoga & Karana purification",
      "Do's & Don'ts guidance dossier",
    ],
    price: 701,
    deliveryDays: "2-3",
    highlight: false,
    serviceParam: "muhurat",
    vedicIcon: "muhurta-finder",
  },
  {
    id: "vastu",
    name: "Vastu Shastra Audit",
    sanskrit: "वास्तु शास्त्र",
    badge: "Home & Business",
    tagline: "Energy harmonization for residential & commercial spaces",
    description: "Spatial assessment of your residence or workplace according to directional energies and the five sacred elements to dissolve friction and invoke prosperity.",
    includes: [
      "Detailed floor plan directional review",
      "Brahmasthan & 16-zone energy audit",
      "Non-demolition remedial adjustments",
      "Certified Vastu Dossier with remedial layout",
    ],
    price: 2100,
    deliveryDays: "5-7",
    highlight: false,
    serviceParam: "business",
    vedicIcon: "vastu-compass",
  },
];

const SPECIAL_SERVICES = [
  { 
    name: "Free Mini-Reading", 
    price: "FREE", 
    desc: "Instant 3-line birth chart summary calculated by Vedic algorithms.", 
    href: "/free-reading", 
    badge: "Try Free", 
    vedicIcon: "rajayoga-scanner"
  },
  { 
    name: "Quick Prashna", 
    price: "₹99", 
    desc: "1 urgent question answered on WhatsApp within 1 hour.", 
    href: "/quick-answer", 
    badge: "1 Hour Delivery", 
    vedicIcon: "decision-clock"
  },
  { 
    name: "Emergency Tatkal", 
    price: "₹499", 
    desc: "Priority guidance within 30 minutes on WhatsApp for urgent decisions.", 
    href: "/emergency", 
    badge: "30 Min Tatkal", 
    vedicIcon: "tatkal-express"
  },
  { 
    name: "Auspicious Baby Name", 
    price: "₹999", 
    desc: "5-10 consecrated names based on Janam Nakshatra & Vedic syllables.", 
    href: "/baby-name", 
    badge: "Newborn Blessing", 
    vedicIcon: "baby-cosmic"
  },
  { 
    name: "Kundli Matching", 
    price: "₹1,501", 
    desc: "36-point Ashtakoot Guna Milan + Mangal Dosha analysis for couples.", 
    href: "/compatibility", 
    badge: "For Marriage", 
    vedicIcon: "kundli-milan"
  },
  { 
    name: "Remote Temple Puja", 
    price: "₹2,100", 
    desc: "Gotra Sankalp at Kashi temple with holy Prasad shipped to your door.", 
    href: "/request-guidance?service=temple-puja", 
    badge: "With Prasad Ship", 
    vedicIcon: "temple-puja"
  },
];

export default function ServicesContent() {
  // Mobile slide index (0 to 3) or "all"
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<"slider" | "grid">("slider");
  const reduceMotion = useReducedMotion();

  const currentService = services[activeSlideIndex];

  const goToPrev = () => {
    setActiveSlideIndex((prev) => (prev > 0 ? prev - 1 : services.length - 1));
  };

  const goToNext = () => {
    setActiveSlideIndex((prev) => (prev < services.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFFDF8] via-[#FAF5EC] to-[#F5EAD6] pb-12 sm:pb-20 overflow-x-hidden">
      
      {/* ── Royal Temple Sanctum Hero ── */}
      <div className="relative overflow-hidden pt-28 pb-14 sm:pt-32 sm:pb-18 border-b border-[#D4AF37]/30 bg-gradient-to-b from-[#FFFDF9] via-[#FAF4E8] to-[#F5EAD6]">
        
        {/* Background isolated container to prevent any mobile horizontal overflow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Radiant Diya Sunburst Aura */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[500px] aspect-square bg-[radial-gradient(circle,rgba(212,175,55,0.18)_0%,rgba(194,94,16,0.07)_45%,transparent_70%)]" />

          {/* Decorative Sacred Mandala / Yantra (hidden on mobile to prevent SVG bounding spill) */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 200, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] max-w-[450px] aspect-square opacity-[0.08] hidden sm:block"
          >
            <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-[#8B1A1A]" strokeWidth="0.4">
              <polygon points="50,5 95,72 5,72" /><polygon points="50,95 5,28 95,28" />
              <circle cx="50" cy="50" r="42" /><circle cx="50" cy="50" r="30" /><circle cx="50" cy="50" r="16" />
            </svg>
          </motion.div>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          {/* Sanskrit Invocation */}
          <motion.p 
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs sm:text-sm font-serif tracking-[0.25em] text-[#8B1A1A] mb-2 font-bold select-none"
          >
            ॥ ॐ श्री गणेशाय नमः • ॐ श्री गुरवे नमः ॥
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-500/15 via-white to-amber-500/15 border border-[#D4AF37]/45 shadow-xs mb-3"
          >
            <ShubhMargEmblem size={18} />
            <span className="text-[10px] sm:text-[10.5px] font-extrabold uppercase tracking-[0.22em] text-[#C25E10]">
              Traditional Vedic Sciences
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-serif text-[#2A1810] leading-tight mb-2.5"
          >
            Sacred Vedic Services &amp;{" "}
            <span className="bg-gradient-to-r from-[#7B0F1E] via-[#C25E10] to-[#630915] bg-clip-text text-transparent">
              Consultations
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[#2E1D14] text-xs sm:text-base leading-relaxed max-w-xl mx-auto mb-5 font-medium"
          >
            Delivered as personalized <strong className="text-[#2A1810] font-bold">Studio Audio Dossiers (MP3)</strong> and <strong className="text-[#2A1810] font-bold">Certified PDF Reports</strong> directly to your WhatsApp.
          </motion.p>

          {/* Trust strip */}
          <motion.div 
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-wrap items-center justify-center gap-2 sm:gap-3"
          >
            {[
              { icon: ShieldCheck, text: "100% Confidential (Gupt)" },
              { icon: Clock, text: "2-3 Day Turnaround" },
              { icon: Crown, text: "Authentic Kashi Tradition" },
            ].map(({ icon: Icon, text }) => (
              <div 
                key={text} 
                className="flex items-center gap-1.5 bg-white/95 backdrop-blur-md border border-[#D4AF37]/40 rounded-full px-3 py-1 sm:px-3.5 sm:py-1.5 shadow-[0_2px_8px_rgba(212,175,55,0.08)]"
              >
                <span className="w-3.5 h-3.5 rounded-full bg-amber-50 flex items-center justify-center text-[#C25E10]">
                  <Icon className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#C25E10]" />
                </span>
                <span className="text-[10px] sm:text-[11px] text-[#2A1810] font-bold tracking-wide">{text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Compact Sticky Filter Bar ── */}
      <div 
        style={{ contain: "paint" }}
        className="sticky top-16 z-30 bg-[#201109]/95 backdrop-blur-md border-y border-[#D4AF37]/40 py-2.5 px-3 sm:px-4 shadow-md w-full max-w-full overflow-hidden"
      >
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-2.5 w-full min-w-0 max-w-full">
          
          {/* Quick Filter Tabs */}
          <div 
            style={{ WebkitOverflowScrolling: "touch" }}
            className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5 w-full max-w-full min-w-0 flex-1"
          >
            {services.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  setActiveSlideIndex(idx);
                  setViewMode("slider");
                }}
                className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  viewMode === "slider" && activeSlideIndex === idx
                    ? "bg-gradient-to-r from-[#D4AF37] to-amber-500 text-black shadow-md scale-[1.02]"
                    : "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white"
                }`}
              >
                <span>{s.name.split(" ")[0]}</span>
                <span className={`text-[9.5px] px-1.5 py-0.2 rounded-full font-mono ${viewMode === "slider" && activeSlideIndex === idx ? "bg-black/20 text-black font-extrabold" : "bg-white/15 text-amber-200"}`}>
                  ₹{s.price}
                </span>
              </button>
            ))}

            {/* Toggle View All Side-by-Side */}
            <button
              type="button"
              onClick={() => setViewMode(viewMode === "grid" ? "slider" : "grid")}
              className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                viewMode === "grid"
                  ? "bg-gradient-to-r from-[#7B0F1E] to-[#9E182A] text-white border border-amber-300 shadow-md"
                  : "bg-white/10 text-white/80 hover:bg-white/20"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5 text-amber-300" />
              <span>{viewMode === "grid" ? "Slide Mode" : "Grid (All 4)"}</span>
            </button>
          </div>

          {/* Status Indicator */}
          <div className="hidden md:flex items-center gap-2 text-xs text-amber-300 font-medium shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Pandit Ji Desk Online</span>
          </div>
        </div>
      </div>

      {/* ── Main Service Section ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        
        {/* SLIDER MODE (Default on mobile, beautifully framed, zero clipping) */}
        {viewMode === "slider" ? (
          <div className="max-w-xl mx-auto">
            
            {/* Top Carousel Navigation Header */}
            <div className="flex items-center justify-between mb-3 px-1">
              <button
                type="button"
                onClick={goToPrev}
                className="flex items-center gap-1 text-xs font-bold text-[#8B1A1A] hover:text-[#550A0A] bg-white/90 border border-[#D4AF37]/40 px-3 py-1.5 rounded-xl shadow-xs transition-transform active:scale-95 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </button>

              {/* Dots indicator */}
              <div className="flex items-center gap-1.5">
                {services.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveSlideIndex(i)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      activeSlideIndex === i 
                        ? "w-6 bg-[#7B0F1E]" 
                        : "w-2 bg-[#D4AF37]/40 hover:bg-[#D4AF37]"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={goToNext}
                className="flex items-center gap-1 text-xs font-bold text-[#8B1A1A] hover:text-[#550A0A] bg-white/90 border border-[#D4AF37]/40 px-3 py-1.5 rounded-xl shadow-xs transition-transform active:scale-95 cursor-pointer"
              >
                <span>Next</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Single Slide Card — 100% width, zero overflow, fully visible */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentService.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="w-full relative flex flex-col justify-between rounded-3xl bg-gradient-to-b from-[#FFFDF9] via-[#FAF5EC] to-[#F6EEE0] p-3.5 sm:p-7 border-2 border-[#D4AF37] shadow-[0_16px_40px_rgba(184,134,11,0.18)] overflow-hidden"
              >
                {/* Ornate Gold Corner Motifs */}
                <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#D4AF37]/80 pointer-events-none rounded-tl-sm" />
                <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#D4AF37]/80 pointer-events-none rounded-tr-sm" />
                <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#D4AF37]/80 pointer-events-none rounded-bl-sm" />
                <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#D4AF37]/80 pointer-events-none rounded-br-sm" />

                <div>
                  {/* Top Row: 3D Vedic Medallion + Title + Badge */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
                    <div className="flex items-start gap-2.5 min-w-0">
                      {/* Ultra-Rich Dark-Podium 3D Logo Medallion */}
                      <div className="relative shrink-0 p-1 rounded-2xl bg-[#0D0907] border-2 border-[#D4AF37]/60 shadow-[0_6px_18px_rgba(201,162,74,0.3)]">
                        <PremiumVedicIcon 
                          name={currentService.vedicIcon} 
                          size={40} 
                          className="drop-shadow-[0_4px_12px_rgba(201,162,74,0.5)]"
                        />
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h2 className="text-sm sm:text-xl font-bold font-serif text-[#2A1810] leading-tight">
                            {currentService.name}
                          </h2>
                          <span className="font-devanagari text-[#8B1A1A] font-bold text-[10px] bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200/50 shrink-0">
                            {currentService.sanskrit}
                          </span>
                        </div>
                        <p className="text-[11px] sm:text-xs text-[#2E1D14] mt-0.5 font-medium leading-snug">
                          {currentService.tagline}
                        </p>
                      </div>
                    </div>

                    {/* Top Badge */}
                    {currentService.badge && (
                      <div className="self-start sm:self-auto shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-[#7B0F1E] to-[#5C0808] border border-amber-300/80 text-amber-200 text-[8.5px] sm:text-[9px] font-extrabold uppercase tracking-wider shadow-2xs">
                        <Crown className="w-2.5 h-2.5 text-amber-300" />
                        <span>{currentService.badge}</span>
                      </div>
                    )}
                  </div>

                  {/* Turnaround Strip */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 py-1.5 px-2.5 rounded-xl bg-white/95 border border-[#D4AF37]/35 text-[10.5px] sm:text-[11px] text-[#2E1D14] mb-3 shadow-2xs font-medium">
                    <span className="flex items-center gap-1 font-semibold text-[#2A1810]">
                      <Clock className="w-3.5 h-3.5 text-[#C25E10] shrink-0" />
                      <span>{currentService.deliveryDays} Days Turnaround</span>
                    </span>
                    <span className="flex items-center gap-1 text-emerald-800 font-bold">
                      <Headphones className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      <span>Audio &amp; PDF on WhatsApp</span>
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-[#2A1810] text-[11.5px] sm:text-[13px] leading-relaxed mb-3 font-normal">
                    {currentService.description}
                  </p>

                  {/* Inclusions Checklist */}
                  <div className="mb-3.5 p-3 rounded-2xl bg-white/90 border border-[#D4AF37]/30 shadow-2xs">
                    <p className="text-[9.5px] font-extrabold uppercase tracking-widest text-[#7B0F1E] mb-2 flex items-center gap-1">
                      <FileText className="w-3 h-3 text-[#C25E10]" />
                      <span>Deliverables Included:</span>
                    </p>
                    <ul className="space-y-1.5">
                      {currentService.includes.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-xs text-[#2A1810]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Action Row: Dakshina + Full-width responsive CTA */}
                <div className="pt-3 border-t border-[#D4AF37]/25 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <div className="flex items-baseline justify-between sm:block">
                    <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#2E1D14]">
                      Sacred Dakshina
                    </span>
                    <p className="text-lg sm:text-2xl font-black font-mono text-[#7B0F1E] leading-none">
                      ₹{currentService.price.toLocaleString("en-IN")}
                      <span className="text-[10px] font-serif font-semibold text-[#2E1D14] ml-1">onward</span>
                    </p>
                  </div>

                  <Link
                    href={`/request-guidance?service=${currentService.serviceParam}`}
                    className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-2 overflow-hidden bg-gradient-to-r from-[#7B0F1E] via-[#9E182A] to-[#630915] text-white font-bold text-xs uppercase tracking-wider py-3 px-4 rounded-xl shadow-[0_6px_20px_rgba(123,15,30,0.35)] hover:brightness-110 active:scale-[0.99] transition-all border border-[#D4AF37] cursor-pointer shrink-0 text-center"
                  >
                    <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                    <ShubhMargEmblem size={16} />
                    <span className="relative">Request {currentService.name.split(" ")[0]}</span>
                    <ArrowRight className="relative w-3.5 h-3.5 text-amber-300 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        ) : (
          /* GRID MODE (All 4 cards side-by-side) */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service) => (
              <div
                key={service.name}
                className={`relative flex flex-col justify-between rounded-3xl bg-gradient-to-b from-[#FFFDF9] via-[#FAF5EC] to-[#F6EEE0] p-3.5 sm:p-7 border-2 ${
                  service.highlight 
                    ? "border-[#D4AF37] shadow-[0_16px_40px_rgba(184,134,11,0.22)]" 
                    : "border-[#D4AF37]/45 shadow-[0_12px_32px_rgba(107,42,20,0.1)]"
                } overflow-hidden`}
              >
                {/* Featured card: slow diagonal consecration light-sweep to lead the eye */}
                {service.highlight && !reduceMotion && (
                  <motion.span
                    aria-hidden
                    className="pointer-events-none absolute top-0 -left-1/3 w-1/3 h-full skew-x-[-18deg] z-[1]"
                    style={{ background: "linear-gradient(90deg, transparent, rgba(255,245,200,0.5), transparent)" }}
                    animate={{ left: ["-40%", "140%"] }}
                    transition={{ duration: 2.6, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
                  />
                )}
                {/* Ornate Gold Corner Motifs */}
                <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#D4AF37]/80 pointer-events-none rounded-tl-sm" />
                <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#D4AF37]/80 pointer-events-none rounded-tr-sm" />
                <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#D4AF37]/80 pointer-events-none rounded-bl-sm" />
                <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#D4AF37]/80 pointer-events-none rounded-br-sm" />

                <div>
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
                    <div className="flex items-start gap-2.5 min-w-0">
                      <div className="relative shrink-0 p-1 rounded-2xl bg-[#0D0907] border-2 border-[#D4AF37]/60 shadow-[0_6px_18px_rgba(201,162,74,0.3)]">
                        <PremiumVedicIcon 
                          name={service.vedicIcon} 
                          size={40} 
                          className="drop-shadow-[0_4px_12px_rgba(201,162,74,0.5)]"
                        />
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h2 className="text-sm sm:text-xl font-bold font-serif text-[#2A1810] leading-tight">
                            {service.name}
                          </h2>
                          <span className="font-devanagari text-[#8B1A1A] font-bold text-[10px] bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200/50 shrink-0">
                            {service.sanskrit}
                          </span>
                        </div>
                        <p className="text-[11px] sm:text-xs text-[#2E1D14] mt-0.5 font-medium leading-snug">
                          {service.tagline}
                        </p>
                      </div>
                    </div>

                    {service.badge && (
                      <div className="self-start sm:self-auto shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-[#7B0F1E] to-[#5C0808] border border-amber-300/80 text-amber-200 text-[8.5px] sm:text-[9px] font-extrabold uppercase tracking-wider shadow-2xs">
                        <Crown className="w-2.5 h-2.5 text-amber-300" />
                        <span>{service.badge}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 py-1.5 px-2.5 rounded-xl bg-white/95 border border-[#D4AF37]/35 text-[10.5px] sm:text-[11px] text-[#2E1D14] mb-3 shadow-2xs font-medium">
                    <span className="flex items-center gap-1 font-semibold text-[#2A1810]">
                      <Clock className="w-3.5 h-3.5 text-[#C25E10] shrink-0" />
                      <span>{service.deliveryDays} Days Turnaround</span>
                    </span>
                    <span className="flex items-center gap-1 text-emerald-800 font-bold">
                      <Headphones className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      <span>Audio &amp; PDF on WhatsApp</span>
                    </span>
                  </div>

                  <p className="text-[#2A1810] text-[11.5px] sm:text-[13px] leading-relaxed mb-3 font-normal">
                    {service.description}
                  </p>

                  <div className="mb-3.5 p-3 rounded-2xl bg-white/90 border border-[#D4AF37]/30 shadow-2xs">
                    <p className="text-[9.5px] font-extrabold uppercase tracking-widest text-[#7B0F1E] mb-2 flex items-center gap-1">
                      <FileText className="w-3 h-3 text-[#C25E10]" />
                      <span>Deliverables:</span>
                    </p>
                    <ul className="space-y-1.5">
                      {service.includes.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-xs text-[#2A1810]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#D4AF37]/25 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <div className="flex items-baseline justify-between sm:block">
                    <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#2E1D14]">
                      Dakshina
                    </span>
                    <p className="text-lg sm:text-2xl font-black font-mono text-[#7B0F1E] leading-none">
                      ₹{service.price.toLocaleString("en-IN")}
                      <span className="text-[10px] font-serif font-semibold text-[#2E1D14] ml-1">onward</span>
                    </p>
                  </div>

                  <Link
                    href={`/request-guidance?service=${service.serviceParam}`}
                    className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-2 overflow-hidden bg-gradient-to-r from-[#7B0F1E] via-[#9E182A] to-[#630915] text-white font-bold text-xs uppercase tracking-wider py-3 px-4 rounded-xl shadow-[0_6px_20px_rgba(123,15,30,0.35)] hover:brightness-110 active:scale-[0.99] transition-all border border-[#D4AF37] cursor-pointer shrink-0 text-center"
                  >
                    <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                    <ShubhMargEmblem size={16} />
                    <span className="relative">Request {service.name.split(" ")[0]}</span>
                    <ArrowRight className="relative w-3.5 h-3.5 text-amber-300 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Special Services 2-Column Mobile Grid with 3D Vedic Logos ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-4 pb-10">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/10 border border-[#D4AF37]/35 text-[#C25E10] text-[10px] font-extrabold uppercase tracking-widest mb-1.5">
            <ShubhMargEmblem size={13} />
            <span>Specialized Offerings</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#2A1810]">
            More Ways We Can Assist Your Journey
          </h2>
          <p className="text-xs text-[#2E1D14] mt-0.5 max-w-md mx-auto font-medium">
            From free natal summaries to emergency decisions and temple pujas.
          </p>
        </div>

        {/* 2 columns on mobile, 3 on desktop — cuts vertical scrolling in half! */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {SPECIAL_SERVICES.map((s, idx) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.04 }}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
            >
              <Link 
                href={s.href} 
                className="relative h-full flex flex-col justify-between bg-gradient-to-b from-[#FFFDF9] to-[#FAF5EC] border border-[#D4AF37]/40 rounded-2xl p-3.5 sm:p-5 hover:shadow-[0_12px_28px_rgba(107,42,20,0.12)] hover:border-[#D4AF37] transition-all group block shadow-2xs"
              >
                <div>
                  <div className="flex items-start justify-between gap-1 mb-2.5">
                    {/* Rich 3D Vedic medallion on obsidian gold-ring podium (matches main
                        service cards): warm gold aura behind + 2px gold ring + drop-shadow. */}
                    <div className="relative shrink-0 group-hover:scale-105 transition-transform duration-300">
                      <span className="pointer-events-none absolute -inset-0.5 rounded-[14px] bg-gradient-to-tr from-[#D4AF37]/45 to-[#E8791E]/30 blur-[6px] opacity-55 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative p-1 rounded-2xl bg-[#0D0907] border-2 border-[#D4AF37]/60 shadow-[0_5px_16px_-4px_rgba(201,162,74,0.4)] group-hover:border-[#E8791E]/80 transition-colors duration-300">
                        <PremiumVedicIcon
                          name={s.vedicIcon}
                          size={36}
                          className="drop-shadow-[0_3px_10px_rgba(201,162,74,0.5)]"
                        />
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm sm:text-base font-bold text-[#7B0F1E] font-serif tracking-tight block leading-tight">
                        {s.price}
                      </span>
                      <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded-full bg-amber-100 text-[#8B1A1A] border border-amber-300/60 inline-block mt-0.5">
                        {s.badge}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold font-serif text-[#2A1810] mb-1 group-hover:text-[#7B0F1E] transition-colors leading-tight">
                    {s.name}
                  </h3>
                  <p className="text-[10.5px] sm:text-[11.5px] text-[#2E1D14] leading-snug line-clamp-2 font-normal">
                    {s.desc}
                  </p>
                </div>

                <div className="mt-2.5 pt-2 border-t border-[#D4AF37]/20 flex items-center justify-between text-[10px] sm:text-[11px] font-bold text-[#8B1A1A] group-hover:text-[#550A0A]">
                  <span>Explore</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer reassurance */}
      <div className="max-w-xl mx-auto px-6 pb-6 text-center">
        <p className="text-[#2E1D14] font-medium text-xs leading-relaxed">
          All consultations are individually examined and consecrated by our verified Acharya. Delivered as Audio MP3 &amp; Certified PDF. Questions?{" "}
          <Link href="/support" className="text-[#7B0F1E] underline underline-offset-2 font-bold hover:text-[#550A0A]">
            Contact Acharya Desk
          </Link>
        </p>
      </div>

    </div>
  );
}
