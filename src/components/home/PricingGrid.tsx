"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Clock, ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import { useT } from "@/context/LanguageContext";
import { inrToThbDisplay } from "@/config/contact";
import VedicArtifactIcon from "@/components/ui/VedicArtifactIcon";

type ServiceDef = {
  nameKey: string;
  descKey: string;
  price: number;
  time: string;
  href: string;
  hot: boolean;
  badge: string;
  sanskritSeal: string;
  shastraTag: string;
  artifact: string;
  proofs: [string, string];
};

const SERVICES: ServiceDef[] = [
  {
    nameKey: "pricing.svc.quick",
    descKey: "pricing.svc.quick.desc",
    price: 99,
    time: "1 hr",
    href: "/quick-answer",
    hot: false,
    badge: "⚡ 1-HR TATKAL",
    sanskritSeal: "त्वरित समाधान",
    shastraTag: "Prashna Shastra",
    artifact: "tatkal-express",
    proofs: ["Direct WhatsApp Audio", "No Birth Chart Needed"],
  },
  {
    nameKey: "pricing.svc.prashna",
    descKey: "pricing.svc.prashna.desc",
    price: 501,
    time: "2-3 days",
    href: "/request-guidance?service=vedic-guidance",
    hot: true,
    badge: "🔥 MOST POPULAR",
    sanskritSeal: "प्रश्न मीमांसा",
    shastraTag: "Horary Divination",
    artifact: "kundli-engine",
    proofs: ["Deep Karmic Root Analysis", "Exact Remedial Guidance"],
  },
  {
    nameKey: "pricing.svc.muhurta",
    descKey: "pricing.svc.muhurta.desc",
    price: 701,
    time: "3-5 days",
    href: "/request-guidance?service=muhurat",
    hot: false,
    badge: "AUSPICIOUS TIMING",
    sanskritSeal: "शुभ मुहूर्त",
    shastraTag: "Panchang Calibrated",
    artifact: "muhurta-finder",
    proofs: ["Planetary Hora Alignment", "Choghadiya Shuddhi Windows"],
  },
  {
    nameKey: "pricing.svc.baby",
    descKey: "pricing.svc.baby.desc",
    price: 999,
    time: "3-5 days",
    href: "/baby-name",
    hot: false,
    badge: "SACRED SANSKAR",
    sanskritSeal: "नामकरण संस्कार",
    shastraTag: "Svara Shastra",
    artifact: "baby-cosmic",
    proofs: ["Nakshatra Pada Sounds", "Meaning & Numerology Sync"],
  },
  {
    nameKey: "pricing.svc.kundli",
    descKey: "pricing.svc.kundli.desc",
    price: 1101,
    time: "3-5 days",
    href: "/request-guidance?service=kundli",
    hot: true,
    badge: "👑 ROYAL DOSSIER",
    sanskritSeal: "सम्पूर्ण जन्मपत्री",
    shastraTag: "Parashara Classical",
    artifact: "kundli-xray",
    proofs: ["12 Bhavas & Dasha Cycles", "Consecrated Gemstone Guide"],
  },
  {
    nameKey: "pricing.svc.compat",
    descKey: "pricing.svc.compat.desc",
    price: 1501,
    time: "3-5 days",
    href: "/compatibility",
    hot: false,
    badge: "SACRED UNION",
    sanskritSeal: "अष्टकूट गुण मिलान",
    shastraTag: "D9 Navamsha Synastry",
    artifact: "kundli-milan",
    proofs: ["36-Point In-Depth Milan", "Manglik & Nadi Remediation"],
  },
];

export default function PricingGrid() {
  const t = useT();
  const [showAllServices, setShowAllServices] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <section className="section-py relative overflow-hidden surface-maroon-wash">
      {/* Sacred Temple Ambient Glow */}
      <span className="glow-fill" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#F5A623]/[0.10] rounded-full blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-20 right-10 w-96 h-96 bg-[#D4AF37]/[0.12] rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-5xl mx-auto section-px">
        {/* Section Grand Header */}
        <div className="text-center mb-8 sm:mb-11">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#FFF9EE] via-[#FFF3D6] to-[#FFF9EE] border border-[#D4AF37]/60 mb-3 shadow-[0_4px_14px_rgba(184,134,11,0.18)]">
            <Sparkles className="w-3.5 h-3.5 text-[#C25E10] animate-pulse" />
            <span className="text-[11px] font-sans font-bold tracking-[0.2em] text-[#8C3F08] uppercase">
              {t("pricing.eyebrow")} • CONSECRATED PARASHARA SERVICES
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-[#2A1810] mt-1 tracking-tight">
            {t("pricing.title")}
          </h2>
          <div className="flex items-center justify-center gap-3 my-2.5 opacity-80">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#B8860B]" />
            <span className="text-[#C25E10] text-sm">𑁍</span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#B8860B]" />
          </div>
          <p className="text-xs sm:text-sm text-[#2E1D14] max-w-xl mx-auto leading-relaxed font-sans font-medium">
            Every consultation is personally calculated by verified Acharyas from Varanasi &amp; Haridwar. 100% confidential and authentic.
          </p>
        </div>

        {/* 6 Royal Consecrated Treasury Cards (Side-by-Side 2 Columns on Mobile) */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 lg:gap-5">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.nameKey}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className={i >= 4 && !showAllServices ? "hidden sm:flex" : "flex"}
            >
              {/* Featured (Most Popular) card gets a gentle breathing gold aura so the
                  eye lands on the hero offer — the single strongest documented lever. */}
              {s.hot && !reduceMotion && (
                <motion.span
                  aria-hidden
                  className="pointer-events-none absolute -inset-1 rounded-[20px] bg-gradient-to-r from-[#E8791E]/30 via-[#F5A623]/25 to-[#D4AF37]/30 blur-md z-0"
                  animate={{ opacity: [0.35, 0.7, 0.35] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
              <Link
                href={s.href}
                style={{ touchAction: "manipulation" }}
                className={`relative z-10 w-full rounded-2xl p-px bg-gradient-to-b ${
                  s.hot
                    ? "from-[#E8791E]/80 via-[#D4AF37]/50 to-[#E8791E]/70 shadow-[0_12px_30px_-8px_rgba(194,94,16,0.35)]"
                    : "from-[#D4AF37]/60 via-[#D4AF37]/25 to-[#D4AF37]/50 shadow-[0_8px_22px_-8px_rgba(74,38,14,0.16)]"
                } hover:shadow-[0_14px_30px_-8px_rgba(194,94,16,0.28)] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 group overflow-hidden flex flex-col`}
              >
                {/* ── Imperial Ivory & 24K Gold Card Body ── */}
                <div className="relative rounded-[calc(1rem-1px)] bg-gradient-to-b from-[#FFFDF9] via-[#FCF8F1] to-[#F8F1E2] border border-[#D4AF37]/35 p-2.5 sm:p-4 lg:p-5 flex flex-col flex-1 overflow-hidden justify-between">
                  {/* Consecration light-sweep — slow diagonal shine on the featured card only */}
                  {s.hot && !reduceMotion && (
                    <motion.span
                      aria-hidden
                      className="pointer-events-none absolute top-0 -left-1/3 w-1/3 h-full skew-x-[-18deg] z-[1]"
                      style={{ background: "linear-gradient(90deg, transparent, rgba(255,245,200,0.55), transparent)" }}
                      animate={{ left: ["-40%", "140%"] }}
                      transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 2.6, ease: "easeInOut" }}
                    />
                  )}
                  {/* Corner Royal Filigree Accents */}
                  <span className="absolute top-1.5 left-1.5 sm:top-2.5 sm:left-2.5 w-2 h-2 sm:w-2.5 sm:h-2.5 border-t border-l border-[#D4AF37]/50 rounded-tl pointer-events-none" />
                  <span className="absolute bottom-1.5 right-1.5 sm:bottom-2.5 sm:right-2.5 w-2 h-2 sm:w-2.5 sm:h-2.5 border-b border-r border-[#D4AF37]/50 rounded-br pointer-events-none" />

                  {/* Watermark Sacred Sri Yantra */}
                  <svg
                    className="pointer-events-none absolute -bottom-6 -right-6 w-24 h-24 sm:w-32 sm:h-32 text-[#843D0A] opacity-[0.03] group-hover:opacity-[0.07] group-hover:scale-110 transition-all duration-700"
                    viewBox="0 0 100 100"
                    fill="currentColor"
                  >
                    <polygon points="50,5 95,85 5,85" stroke="currentColor" strokeWidth="1" fill="none" />
                    <polygon points="50,95 5,15 95,15" stroke="currentColor" strokeWidth="1" fill="none" />
                    <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="1" fill="none" />
                    <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="1" fill="none" />
                  </svg>

                  {/* Ambient Golden Halo */}
                  <div className="pointer-events-none absolute -top-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br from-[#E8791E]/12 to-[#D4AF37]/18 blur-xl group-hover:scale-125 transition-transform duration-700" />

                  {/* Card Content Top Section */}
                  <div>
                    {/* Top Row: 3D Medallion + Sanskrit Seal & Badge */}
                    <div className="flex items-start justify-between gap-1.5 sm:gap-2.5 mb-2 sm:mb-3">
                      {/* 3D Vedic Medallion on obsidian gold-ring podium (real-jewel feel) */}
                      <div className="relative shrink-0 group-hover:scale-105 transition-transform duration-300">
                        {/* warm gold aura behind the podium */}
                        <span className="pointer-events-none absolute -inset-0.5 rounded-2xl bg-gradient-to-tr from-[#D4AF37]/45 to-[#E8791E]/30 blur-[6px] opacity-50 group-hover:opacity-90 transition-opacity duration-500" />
                        <div className="relative p-0.5 sm:p-1 rounded-2xl bg-[#0D0907] border-2 border-[#D4AF37]/55 shadow-[0_5px_16px_-4px_rgba(201,162,74,0.4)] group-hover:border-[#E8791E]/80 transition-colors duration-300">
                          <div className="hidden sm:block">
                            <VedicArtifactIcon name={s.artifact} size={44} priority={i < 2} />
                          </div>
                          <div className="block sm:hidden">
                            <VedicArtifactIcon name={s.artifact} size={34} priority={i < 2} />
                          </div>
                        </div>
                      </div>

                      {/* Right Badges & Sanskrit Consecrated Seal */}
                      <div className="flex flex-col items-end gap-0.5 sm:gap-1 min-w-0">
                        {s.hot ? (
                          <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-gradient-to-r from-[#9E430A] via-[#C25E10] to-[#D4AF37] text-white text-[7.5px] sm:text-[9px] font-sans font-black tracking-wider uppercase shadow-xs whitespace-nowrap">
                            <Sparkles className="w-2 h-2 text-amber-200 shrink-0" />
                            <span>{s.badge}</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-[#FFF8EB] text-[#8C3F08] border border-[#D4AF37]/45 text-[7.5px] sm:text-[8.5px] font-mono font-bold tracking-tight shadow-2xs whitespace-nowrap">
                            <span>{s.badge}</span>
                          </span>
                        )}

                        {/* Traditional Sanskrit Seal */}
                        <span
                          className="font-serif text-[9.5px] sm:text-[11.5px] font-bold text-[#8C5212] tracking-tight truncate max-w-full"
                          style={{ fontFamily: "'Tiro Devanagari Hindi', serif" }}
                        >
                          {s.sanskritSeal}
                        </span>

                        {/* Soft social-proof signal on the featured offer */}
                        {s.hot && (
                          <span className="inline-flex items-center gap-0.5 text-[7px] sm:text-[8.5px] font-sans font-bold text-emerald-700">
                            <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                            Seekers&apos; pick
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Price with 24K Gold Honorific */}
                    <div className="flex items-baseline gap-1 mb-0.5">
                      <span className="text-[20px] sm:text-[25px] font-bold font-serif text-[#843D0A] leading-none tracking-tight font-cormorant">
                        ₹{s.price.toLocaleString("en-IN")}
                      </span>
                      <span className="text-[8px] sm:text-[9px] font-sans font-semibold text-[#8C5212]/70 uppercase tracking-wider">
                        • Dakshina
                      </span>
                    </div>
                    {/* Approximate Thai Baht for international (Thailand) visitors */}
                    <div className="mb-1 text-[9px] sm:text-[10px] font-sans font-medium text-[#8C5212]/60">
                      ≈ {inrToThbDisplay(s.price)} <span className="opacity-70">THB</span>
                    </div>

                    {/* Service Name */}
                    <h3 className="text-[13px] sm:text-[15.5px] font-serif font-bold text-[#22130A] group-hover:text-[#9E430A] transition-colors leading-tight mb-1 font-cormorant truncate">
                      {t(s.nameKey)}
                    </h3>

                    <span className="inline-block text-[8.5px] sm:text-[9.5px] font-mono font-bold text-[#9E430A] bg-[#FFF5E5] px-1.5 py-0.2 rounded border border-[#E8791E]/20 mb-1.5 truncate max-w-full">
                      {s.shastraTag}
                    </span>

                    <p className="text-[10px] sm:text-[11.5px] text-[#2E1D14] leading-snug mb-2 font-sans font-medium line-clamp-2">
                      {t(s.descKey)}
                    </p>

                    {/* Shastric Proofs / Deliverable Assurance */}
                    <div className="space-y-0.5 mb-2.5 pt-1.5 border-t border-[#D4AF37]/20">
                      {s.proofs.map((proof, idx) => (
                        <div key={idx} className="flex items-center gap-1 text-[9px] sm:text-[10.5px] text-[#2A1810] font-sans font-semibold">
                          <span className="text-[#C25E10] text-[8px] shrink-0">✦</span>
                          <span className="truncate">{proof}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom: SLA Delivery Time + Molten Gold CTA */}
                  <div className="pt-2 border-t border-[#D4AF37]/25 flex items-center justify-between gap-1">
                    <div className="flex items-center gap-1 text-[9px] sm:text-[10.5px] font-semibold text-[#8C5212] font-mono shrink-0">
                      <Clock className="w-3 h-3 text-[#C25E10] shrink-0" />
                      <span className="truncate">{s.time}</span>
                    </div>

                    <span className="relative inline-flex items-center gap-0.5 sm:gap-1 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full overflow-hidden bg-gradient-to-r from-[#D4AF37] via-[#F5A623] to-[#E8791E] text-[#120B07] text-[9.5px] sm:text-[11px] font-sans font-extrabold uppercase tracking-wide shadow-[0_3px_10px_rgba(212,175,55,0.4)] group-hover:shadow-[0_5px_16px_rgba(232,121,30,0.5)] group-hover:scale-[1.04] transition-all shrink-0">
                      {/* shimmer sweep on hover */}
                      <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                      <span className="relative">Consult</span>
                      <ArrowRight className="relative w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[2.5] transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile View All Services Toggle */}
        <div className="flex sm:hidden justify-center mt-3">
          <button
            type="button"
            onClick={() => setShowAllServices(!showAllServices)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#FFF9EE] via-[#FFF3D6] to-[#FFF9EE] border border-[#D4AF37]/60 text-[#8C3F08] text-xs font-bold shadow-xs active:scale-95 transition-all cursor-pointer"
          >
            <span>{showAllServices ? "Show Top Offerings ▲" : `View All ${SERVICES.length} Consecrated Services ▾`}</span>
          </button>
        </div>

        {/* ── Luxury Trust & Consecration Strip ── */}
        <div className="mt-8 text-center space-y-2">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-[#FFFDF8] border border-[#D4AF37]/45 text-[11.5px] text-[#2A1810] font-sans font-semibold shadow-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>100% Confidential • Delivered via Private WhatsApp Audio &amp; Written Dossier</span>
          </div>

          <div>
            <Link
              href="/free-reading"
              className="text-[12.5px] text-[#C25E10] font-bold underline underline-offset-2 hover:text-[#E8791E] transition-colors"
            >
              {t("pricing.free_cta")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
