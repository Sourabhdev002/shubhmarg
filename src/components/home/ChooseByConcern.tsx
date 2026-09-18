"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ShieldCheck, FileText, Volume2 } from "lucide-react";
import TiltCard from "@/components/ui/TiltCard";
import { useT } from "@/context/LanguageContext";
import VedicArtifactIcon, { VedicArtifactName } from "@/components/ui/VedicArtifactIcon";

type ConcernDef = {
  titleKey: string;
  subKey: string;
  href: string;
  artifact: VedicArtifactName;
  sanskritBadge: string;
  shastraTag: string;
  royalPill?: string;
  highlights: [string, string];
};

const CONCERNS: ConcernDef[] = [
  {
    titleKey: "concern.love.title",
    subKey: "concern.love.sub",
    href: "/request-guidance?service=vedic-guidance&concern=love",
    artifact: "spouse-blueprint",
    sanskritBadge: "प्रेम योग",
    shastraTag: "D9 Navamsha & Synastry",
    royalPill: "Most Consulted",
    highlights: ["Spouse Arrival Timing", "7th House Karmic Bonds"],
  },
  {
    titleKey: "concern.career.title",
    subKey: "concern.career.sub",
    href: "/request-guidance?service=vedic-guidance&concern=career",
    artifact: "decision-clock",
    sanskritBadge: "कर्म भाव",
    shastraTag: "D10 Dasamsa Leadership",
    highlights: ["Promotion & Dasha Shift", "Favorable Muhurta Windows"],
  },
  {
    titleKey: "concern.marriage.title",
    subKey: "concern.marriage.sub",
    href: "/compatibility",
    artifact: "kundli-milan",
    sanskritBadge: "विवाह मिलान",
    shastraTag: "36-Guna Ashtakoota",
    royalPill: "Royal Union",
    highlights: ["36-Point In-Depth Milan", "Manglik & Nadi Remediation"],
  },
  {
    titleKey: "concern.money.title",
    subKey: "concern.money.sub",
    href: "/request-guidance?service=vedic-guidance&concern=money",
    artifact: "gemstone-calculator",
    sanskritBadge: "धन लक्ष्मी",
    shastraTag: "D2 Hora & Kubera Yogas",
    royalPill: "High Net-Worth",
    highlights: ["Dhana Bhava Wealth Cycles", "Consecrated Ratna Guide"],
  },
  {
    titleKey: "concern.health.title",
    subKey: "concern.health.sub",
    href: "/request-guidance?service=vedic-guidance&concern=health",
    artifact: "chakra-scanner",
    sanskritBadge: "स्वास्थ्य आरोग्य",
    shastraTag: "Ayur-Jyotish Diagnostics",
    highlights: ["Vital Prana & Marma Points", "Graha Shanti Prescriptions"],
  },
  {
    titleKey: "concern.family.title",
    subKey: "concern.family.sub",
    href: "/request-guidance?service=muhurat&concern=family",
    artifact: "garbh-sanskar",
    sanskritBadge: "पारिवारिक सौख्य",
    shastraTag: "16-Zone Vastu & Sukha",
    highlights: ["Domestic Peace & Bandhu", "Pitru & Kuldevta Harmony"],
  },
];

export default function ChooseByConcern() {
  const t = useT();

  return (
    <section className="relative pt-4 sm:pt-8 pb-16 sm:pb-24 overflow-hidden surface-bronze">
      {/* Ambient Celestial Temple Light Fields */}
      <span className="glow-fill" />
      <div className="pointer-events-none absolute -top-24 left-1/4 w-[500px] h-[500px] bg-[#E8791E]/[0.08] rounded-full blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#D4AF37]/[0.10] rounded-full blur-[140px]" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#FFF8E7]/40 rounded-full blur-[100px]" />

      <div className="relative z-10 max-w-6xl mx-auto section-px">
        {/* Section Grand Header */}
        <div className="text-center mb-8 sm:mb-12">
          {/* Royal Eyebrow Crest */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#FFF9EE] via-[#FFF3D6] to-[#FFF9EE] border border-[#D4AF37]/60 mb-3.5 shadow-[0_4px_14px_rgba(184,134,11,0.18)]">
            <Sparkles className="w-3.5 h-3.5 text-[#C25E10] animate-pulse" />
            <span className="text-[10.5px] sm:text-[11.5px] font-sans font-bold tracking-[0.22em] text-[#8C3F08] uppercase">
              {t("concern.eyebrow")} • BESPOKE VEDIC SANCTUARY
            </span>
            <Sparkles className="w-3.5 h-3.5 text-[#C25E10] animate-pulse" />
          </div>

          {/* Master Cormorant Heading */}
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl xl:text-[42px] font-bold font-cormorant mt-1 tracking-tight text-[#22130A] max-w-2xl mx-auto leading-tight"
            style={{ color: "#22130A" }}
          >
            {t("concern.title")}
          </h2>

          {/* Sacred Golden Lotus Divider */}
          <div className="flex items-center justify-center gap-3 my-3">
            <div className="w-12 sm:w-16 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-[#B8860B]" />
            <span className="text-[#C25E10] text-sm">𑁍</span>
            <div className="w-12 sm:w-16 h-px bg-gradient-to-l from-transparent via-[#D4AF37] to-[#B8860B]" />
          </div>

          {/* Editorial Subtitle */}
          <p className="text-[#2E1D14] text-xs sm:text-sm lg:text-[15px] max-w-xl mx-auto leading-relaxed font-sans font-medium">
            {t("concern.sub")}
          </p>

          {/* VIP Shastric Privilege Strip */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-6 mt-4 pt-2 text-[11px] sm:text-xs text-[#2E1D14] font-sans">
            <span className="inline-flex items-center gap-1.5 bg-[#FFFDF8] px-3 py-1 rounded-full border border-[#D4AF37]/50 shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C25E10]" />
              <strong className="font-bold text-[#2A1810]">100% Confidential</strong> Client Privilege
            </span>
            <span className="inline-flex items-center gap-1.5 bg-[#FFFDF8] px-3 py-1 rounded-full border border-[#D4AF37]/50 shadow-sm">
              <FileText className="w-3.5 h-3.5 text-[#C25E10]" />
              <strong className="font-bold text-[#2A1810]">D1 to D60</strong> Shastra Rigor
            </span>
            <span className="inline-flex items-center gap-1.5 bg-[#FFFDF8] px-3 py-1 rounded-full border border-[#D4AF37]/50 shadow-sm">
              <Volume2 className="w-3.5 h-3.5 text-[#C25E10]" />
              <strong className="font-bold text-[#2A1810]">Voice Dossier</strong> by Vedic Acharya
            </span>
          </div>
        </div>

        {/* 6 Royal Consultation Doors: Swipeable Deck on Mobile, 3-Col Grand Grid on Desktop */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5 overflow-x-auto sm:overflow-visible pb-4 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory hide-scrollbar">
          {CONCERNS.map((c, i) => {
            return (
              <motion.div
                key={c.titleKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="w-[84vw] max-w-[320px] shrink-0 snap-center sm:w-auto sm:max-w-none sm:shrink flex flex-col"
              >
                <TiltCard maxTilt={6} className="h-full rounded-[22px]">
                  <Link
                    href={c.href}
                    className="card-light-sweep group relative flex flex-col justify-between h-full rounded-[22px] p-4 sm:p-5 bg-gradient-to-b from-[#FFFDF9] via-[#FCF8F1] to-[#F7EFE0] border border-[#D4AF37]/35 hover:border-[#D4AF37]/85 shadow-[0_12px_32px_-14px_rgba(74,38,14,0.18),inset_0_1px_2px_rgba(255,255,255,0.95)] hover:shadow-[0_22px_48px_-14px_rgba(184,134,11,0.28),0_0_26px_rgba(212,175,55,0.16)] transition-all duration-500 overflow-hidden"
                  >
                    {/* Corner Royal Filigree Accents */}
                    <span className="absolute top-2.5 left-2.5 w-3 h-3 border-t border-l border-[#D4AF37]/50 rounded-tl pointer-events-none group-hover:border-[#E8791E] transition-colors duration-400" />
                    <span className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b border-r border-[#D4AF37]/50 rounded-br pointer-events-none group-hover:border-[#E8791E] transition-colors duration-400" />

                    {/* Sacred Sri Yantra / 12-Fold Lotus Watermark */}
                    <svg
                      aria-hidden="true"
                      className="absolute -right-8 -bottom-8 w-36 h-36 sm:w-44 sm:h-44 text-[#D4AF37] opacity-[0.05] group-hover:opacity-[0.14] group-hover:scale-110 group-hover:rotate-12 transition-all duration-700 pointer-events-none"
                      viewBox="0 0 100 100"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="0.8"
                    >
                      <circle cx="50" cy="50" r="46" strokeDasharray="2 2" />
                      <circle cx="50" cy="50" r="38" />
                      <circle cx="50" cy="50" r="28" strokeDasharray="4 2" />
                      <circle cx="50" cy="50" r="18" />
                      <circle cx="50" cy="50" r="8" />
                      <polygon points="50,6 62,38 94,50 62,62 50,94 38,62 6,50 38,38" />
                      <polygon points="50,16 60,40 84,50 60,60 50,84 40,60 16,50 40,40" strokeDasharray="1 2" />
                    </svg>

                    <div className="relative z-10">
                      {/* Top Row: 3D Medallion on Gold Cushion + Consecrated Sanskrit Seal */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        {/* 3D 24K Gilded Cushion Pedestal */}
                        <div className="relative group-hover:scale-105 transition-transform duration-400 shrink-0">
                          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-[#D4AF37]/50 to-[#E8791E]/30 blur-md opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                          <div className="relative p-1.5 sm:p-2 rounded-2xl bg-gradient-to-br from-[#FFFDF8] via-[#FDF3DE] to-[#F3DEC0] border border-[#D4AF37]/65 shadow-[0_6px_18px_rgba(184,134,11,0.22),inset_0_1.5px_2px_rgba(255,255,255,0.95)]">
                            <VedicArtifactIcon name={c.artifact} size={44} className="drop-shadow-sm" />
                          </div>
                        </div>

                        {/* Sanskrit Consecrated Seal Badge */}
                        <div className="flex flex-col items-end">
                          <span
                            className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-serif italic font-bold text-[#843D0A] bg-gradient-to-r from-[#FFF8EB] to-[#FDE8C4] px-2.5 sm:px-3 py-1 rounded-full border border-[#D4AF37]/60 shadow-[0_2px_8px_rgba(184,134,11,0.12),inset_0_1px_1px_rgba(255,255,255,0.95)] tracking-wide group-hover:border-[#E8791E]/70 transition-colors"
                            style={{ fontFamily: "var(--font-tiro, serif)" }}
                          >
                            <span className="text-[#C25E10] text-[9px]">✦</span>
                            {c.sanskritBadge}
                          </span>
                        </div>
                      </div>

                      {/* Exclusive VIP Status Tag (Placed cleanly above title) */}
                      {c.royalPill && (
                        <div className="mb-1.5">
                          <span className="inline-flex items-center gap-1 text-[9px] font-sans font-extrabold uppercase tracking-wider bg-gradient-to-r from-[#8B3A05] via-[#A84A0A] to-[#C25E10] text-[#FFF9E6] px-2 py-0.5 rounded-md shadow-[0_2px_6px_rgba(139,58,5,0.2)]">
                            ✦ {c.royalPill}
                          </span>
                        </div>
                      )}

                      {/* Title */}
                      <h3 className="text-[16px] sm:text-[19px] font-bold font-cormorant text-[#22130A] group-hover:text-[#9E430A] leading-tight mb-1 transition-colors">
                        {t(c.titleKey)}
                      </h3>

                      {/* Editorial Subtitle */}
                      <p className="text-[11.5px] sm:text-[12.5px] text-[#2E1D14] leading-snug sm:leading-relaxed mb-2.5 font-sans font-medium min-h-[32px] sm:min-h-[36px]">
                        {t(c.subKey)}
                      </p>

                      {/* Shastric Domain Tag */}
                      <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-sans font-bold text-[#8C5212] bg-[#FDF2DE] px-2.5 py-0.5 sm:py-1 rounded-md border border-[#D4AF37]/45 tracking-wide mb-2.5">
                        <Sparkles className="w-2.5 h-2.5 text-[#C25E10]" />
                        <span>{c.shastraTag}</span>
                      </div>

                      {/* Shastric High-Value Highlights (Visible on Tablet/Desktop) */}
                      <div className="space-y-1 mb-2 hidden sm:block">
                        {c.highlights.map((h, idx) => (
                          <div key={idx} className="flex items-center gap-1.5 text-[11px] text-[#2E1D14] font-sans font-medium">
                            <span className="text-[#C25E10] text-[10px]">✧</span>
                            <span className="truncate">{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Gate: Live Astrologer Pulse + Gilded CTA */}
                    <div className="relative z-10 pt-3 border-t border-[#D4AF37]/25 flex items-center justify-between gap-2 mt-2">
                      <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-sans font-semibold text-[#2E1D14]">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="hidden xs:inline font-semibold">Verified Acharya</span>
                        <span className="xs:hidden font-semibold">Online</span>
                      </div>

                      <div className="inline-flex items-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-[#FFF8ED] to-[#FDF1D8] group-hover:from-[#9E430A] group-hover:via-[#BA580E] group-hover:to-[#D4AF37] border border-[#D4AF37]/50 group-hover:border-transparent text-[#843D0A] group-hover:text-white shadow-[0_2px_8px_rgba(184,134,11,0.12)] group-hover:shadow-[0_6px_20px_rgba(194,94,16,0.35)] transition-all duration-300">
                        <span className="text-[10px] sm:text-xs font-sans font-bold uppercase tracking-[0.14em]">
                          {t("concern.ask_now")}
                        </span>
                        <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
                      </div>
                    </div>
                  </Link>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile Swipe Hint & Dot Indicator */}
        <div className="flex sm:hidden items-center justify-center gap-2 mt-2 mb-1">
          <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#8C5212]/80">
            Swipe Sanctum Pathways
          </span>
          <div className="flex items-center gap-1">
            {CONCERNS.map((c, idx) => (
              <span
                key={idx}
                className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/50"
              />
            ))}
          </div>
        </div>

        {/* Luxury Concierge & Complimentary Inquiry Altar */}
        <div className="mt-10 sm:mt-14 max-w-3xl mx-auto p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#FFFDF8] via-[#FCF5E6] to-[#FFFDF8] border border-[#D4AF37]/50 shadow-[0_12px_32px_-10px_rgba(184,134,11,0.16)] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#9E430A] to-[#C25E10] text-[#FFF4D9] flex items-center justify-center shrink-0 shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold font-cormorant text-[#22130A]">
                {t("concern.free_cta")}
              </h4>
              <p className="text-[11px] sm:text-xs text-[#2E1D14] font-sans font-medium">
                Begin with a single confidential question, or request a complete royal horoscope analysis.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 shrink-0">
            <Link
              href="/free-reading"
              className="px-4 py-2 rounded-xl bg-[#22130A] hover:bg-[#3D2317] text-[#FDF5E6] text-xs font-sans font-bold tracking-wider uppercase shadow-md transition-all hover:shadow-lg flex items-center gap-1.5"
            >
              <span>{t("concern.free_link")}</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
