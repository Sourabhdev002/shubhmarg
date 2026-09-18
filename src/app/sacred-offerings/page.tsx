"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Flame, Zap, Mic, BookOpen, Gem, Briefcase, CheckCircle2, ArrowRight } from "lucide-react";

const SACRED_SERVICES = [
  {
    id: "temple-puja",
    badge: "Most Popular • 100% Home Delivery",
    title: "Remote Temple Sankalp Puja & Prasad Delivery",
    subtitle: "Consecrated Puja at Kashi Vishwanath / Ujjain Mahakal",
    price: "₹2,100",
    originalPrice: "₹4,500",
    icon: Flame,
    color: "from-amber-500/20 to-orange-500/10",
    borderColor: "border-amber-500/50",
    features: [
      "Vedic Pandit Ji chants your Name & Gotra in sacred Sankalp",
      "Consecrated Prasad, Raksha Sutra & Gangajal shipped to your home",
      "Energized Copper Yantra for home/office prosperity",
      "Personalized audio blessing of your Sankalp ritual & Certified PDF sent on WhatsApp",
    ],
    ctaText: "Book Temple Sankalp Puja",
    popular: true,
    href: "/request-guidance?service=puja&tier=temple",
  },
  {
    id: "tatkal-express",
    badge: "Emergency Decision • Under 120 Mins",
    title: "2-Hour Tatkal Express Guidance",
    subtitle: "For Urgent Interviews, Visas, Deals & High-Stakes Dilemmas",
    price: "₹2,499",
    originalPrice: "₹4,999",
    icon: Zap,
    color: "from-red-500/20 to-amber-500/10",
    borderColor: "border-red-500/50",
    features: [
      "Priority VIP queue jump — delivered within 2 hours",
      "Direct actionable clarity on your immediate critical decision",
      "Exact auspicious Muhurta hours for signing/interview",
      "Emergency protective Kavach mantra and quick remedies",
    ],
    ctaText: "Get 2-Hour Express Guidance",
    popular: false,
    href: "/request-guidance?service=express&tier=tatkal",
  },
  {
    id: "voice-dossier",
    badge: "Intimate Pandit Ji Spoken Audio",
    title: "Pandit Ji’s Personal Voice Audio Dossier",
    subtitle: "10–15 Min Custom High-Fidelity Spoken Recording",
    price: "₹1,999",
    originalPrice: "₹3,500",
    icon: Mic,
    color: "from-purple-500/20 to-indigo-500/10",
    borderColor: "border-purple-500/50",
    features: [
      "Personal audio recording of Pandit Ji addressing you by name",
      "Detailed verbal answers to your 3 deepest life questions",
      "Spoken pronunciation and rhythm of your personal Beej Mantra",
      "Downloadable studio MP3 sent directly to your WhatsApp",
    ],
    ctaText: "Order Spoken Audio Dossier",
    popular: false,
    href: "/request-guidance?service=voice&tier=audio-dossier",
  },
  {
    id: "annual-varshphal",
    badge: "Full 12-Month Roadmap",
    title: "365-Day Royal Varshphal Annual Book",
    subtitle: "25+ Page Gold-Embossed Annual Destiny Dossier",
    price: "₹2,999",
    originalPrice: "₹6,000",
    icon: BookOpen,
    color: "from-yellow-500/20 to-amber-500/10",
    borderColor: "border-yellow-500/50",
    features: [
      "Month-by-month financial, career, and marital transit forecast",
      "Exact dates for wealth investments and property purchases",
      "Critical warning windows for health and travel cautions",
      "Quarterly customized Vedic remedies and fast dates",
    ],
    ctaText: "Order 365-Day Varshphal",
    popular: false,
    href: "/request-guidance?service=varshphal&tier=annual",
  },
  {
    id: "energized-gemstone",
    badge: "100% Lab Certified • Ready to Wear",
    title: "Consecrated Gemstone & Rudraksha Ring",
    subtitle: "108-Mantra Energized Natural Gemstone or Nepal Rudraksha",
    price: "₹5,500+",
    originalPrice: "₹11,000",
    icon: Gem,
    color: "from-emerald-500/20 to-teal-500/10",
    borderColor: "border-emerald-500/50",
    features: [
      "100% Natural, untreated, Govt-lab certified gemstone",
      "Energized in your name during your exact planetary Muhurta",
      "Set in pure Silver, Copper, or Panchdhatu ring/pendant",
      "Free insured domestic and international doorstep shipping",
    ],
    ctaText: "Consult for Consecrated Gemstone",
    popular: false,
    href: "/request-guidance?service=gemstone&tier=energized",
  },
  {
    id: "business-retainer",
    badge: "For Founders & Shop Owners",
    title: "Vyapar Vastu & Business Retainer",
    subtitle: "Quarterly Growth, Muhurta Dates & Cashbox Energy Audit",
    price: "₹11,000",
    originalPrice: "₹25,000",
    icon: Briefcase,
    color: "from-cyan-500/20 to-blue-500/10",
    borderColor: "border-cyan-500/50",
    features: [
      "Full Vastu audit for office, factory, or retail showroom",
      "Auspicious contract signing & hiring Muhurta calendar",
      "Brand name & partnership Kundli alignment",
      "Direct VIP access to Pandit Ji for quarterly strategy calls",
    ],
    ctaText: "Enroll in Business Retainer",
    popular: false,
    href: "/request-guidance?service=business&tier=retainer",
  },
];

import CosmicMuhurtaBanner from "@/components/shared/CosmicMuhurtaBanner";
import WhatsAppProofShowcase from "@/components/shared/WhatsAppProofShowcase";
import DirectWhatsAppButton from "@/components/shared/DirectWhatsAppButton";
import LiveAltarStatusCapacity from "@/components/shared/LiveAltarStatusCapacity";

export default function SacredOfferingsPage() {
  return (
    <main className="min-h-screen bg-[#FBF6EC] text-[#2A1810] pt-24 pb-28 px-4 sm:px-6">
      {/* Ambient background glow */}
      <div className="pointer-events-none fixed top-0 right-0 w-[50vw] h-[50vw] max-w-96 max-h-96 bg-[#d4af37]/10 rounded-full blur-[130px]" />
      <div className="pointer-events-none fixed bottom-0 left-0 w-[50vw] h-[50vw] max-w-96 max-h-96 bg-[#72232b]/20 rounded-full blur-[130px]" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFDF8] border border-[#B8860B]/30 mb-3">
            <Sparkles className="w-4 h-4 text-[#C25E10]" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#C25E10]">
              Consecrated Vedic Services &amp; Pujas
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-serif text-[#2A1810] tracking-wide mb-3">
            Sacred Offerings &amp; Personal Guidance
          </h1>
          <p className="text-[#2E1D14] text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Choose your consecrated Vedic service. Every ritual and report is meticulously prepared with traditional sacred Sanskrit protocols and genuine Pandit Ji consecration.
          </p>
        </div>

        {/* ── 1. Cosmic Muhurta Countdown Banner ── */}
        <div className="mb-6">
          <CosmicMuhurtaBanner />
        </div>

        {/* ── Live Altar Status & Gotra Capacity Cap ── */}
        <div className="mb-12">
          <LiveAltarStatusCapacity />
        </div>

        {/* ── 2. 6 High-Converting Offerings Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {SACRED_SERVICES.map((srv) => {
            const Icon = srv.icon;
            return (
              <div
                key={srv.id}
                className={`bg-gradient-to-b ${srv.color} bg-black/60 border-2 ${srv.borderColor} rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-2xl relative transition-all duration-300 hover:scale-[1.02] ${
                  srv.popular ? "ring-2 ring-[#d4af37] shadow-[0_0_40px_rgba(212,175,55,0.25)]" : ""
                }`}
              >
                {srv.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#d4af37] via-amber-300 to-[#d4af37] text-black text-[10px] font-extrabold uppercase tracking-widest px-4 py-1 rounded-full shadow-md">
                    ★ Most Requested Offering ★
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37] bg-black/50 px-2.5 py-1 rounded-full border border-white/10">
                      {srv.badge}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-[#d4af37]" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold font-serif !text-[#FFFDF8] mb-1" style={{ color: "#FFFDF8" }}>
                    {srv.title}
                  </h3>
                  <p className="text-xs text-[#EAE3D2] mb-4 leading-relaxed font-medium">
                    {srv.subtitle}
                  </p>

                  <div className="flex items-baseline gap-2 mb-6 pb-4 border-b border-white/10">
                    <span className="text-3xl font-extrabold font-mono text-white">
                      {srv.price}
                    </span>
                    <span className="text-xs text-stone-400 line-through">
                      {srv.originalPrice}
                    </span>
                    <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider ml-auto">
                      Dakshina Included
                    </span>
                  </div>

                  <ul className="space-y-2.5 mb-6 text-xs text-[#FFFDF8]">
                    {srv.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2.5">
                  <Link
                    href={srv.href}
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#d4af37] via-[#e5c453] to-[#d4af37] hover:brightness-110 text-black font-extrabold text-xs uppercase tracking-wider shadow-[0_4px_20px_rgba(212,175,55,0.3)] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{srv.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <DirectWhatsAppButton
                    variant="compact"
                    serviceName={srv.title}
                    price={srv.price}
                    className="w-full justify-center py-2.5"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* ── 3. WhatsApp Direct Desk Card ── */}
        <div className="mb-14">
          <DirectWhatsAppButton
            variant="card"
            serviceName="Temple Sankalp Puja & Personal Vedic Guidance"
          />
        </div>

        {/* ── 4. Interactive Proof Showcase (Voice Note, Prasad Box, Certificate) ── */}
        <div className="mb-14">
          <WhatsAppProofShowcase />
        </div>

      </div>
    </main>
  );
}
