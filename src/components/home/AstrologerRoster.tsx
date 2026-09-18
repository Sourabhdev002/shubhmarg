"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, BadgeCheck, MessageCircle, Zap } from "lucide-react";
import { GUIDES, Guide } from "@/lib/guides";
import { useT } from "@/context/LanguageContext";
import { cn } from "@/utils/cn";

function RosterAvatar({ guide, size }: { guide: Guide; size: number }) {
  const [err, setErr] = useState(false);
  const initial = guide.name.replace(/^(Acharya|Pandit|Guru Maa|Guru|Shri|Jyotishi)\s+/i, "").charAt(0);
  return (
    <div className="relative shrink-0 rounded-full overflow-hidden" style={{
      width: size, height: size,
      background: `linear-gradient(135deg, ${guide.accent}, #6b4e18)`,
      boxShadow: `0 0 0 2px ${guide.accent}66, 0 4px 16px rgba(0,0,0,0.5)`,
    }}>
      {!err ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={guide.avatar} alt={guide.name} onError={() => setErr(true)} className="w-full h-full object-cover" loading="lazy" />
      ) : (
        <span className="absolute inset-0 flex items-center justify-center font-serif font-bold text-[#2A1810]" style={{ fontSize: size * 0.4 }}>{initial}</span>
      )}
      <span className="absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#FFFDF8] shadow-[0_0_6px_rgba(52,211,153,0.7)]" />
    </div>
  );
}

function openGuideChat(guideId: string) {
  window.dispatchEvent(new CustomEvent("shubhmarg:open-guide", { detail: { guideId } }));
}

export default function AstrologerRoster() {
  const t = useT();
  const [showAll, setShowAll] = useState(false);

  return (
    <section className="relative section-py overflow-hidden surface-bronze">
      <span className="ember-br" />
      <div className="pointer-events-none absolute top-10 right-1/4 w-80 h-80 bg-[#F5A623]/[0.10] rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-4xl mx-auto section-px">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFFDF8] border border-[#B8860B]/30 mb-3 shadow-[0_2px_10px_rgba(107,42,20,0.1)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8791E] animate-pulse" />
            <span className="text-[11px] font-sans font-bold tracking-[0.2em] text-[#C25E10] uppercase">
              {t("roster.eyebrow")}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-[#2A1810] mt-1 tracking-tight">{t("roster.title")}</h2>
          <div className="flex items-center justify-center gap-3 my-2.5 opacity-70">
            <div className="w-8 h-px bg-gradient-to-r from-transparent to-[#B8860B]" />
            <span className="text-[#D4AF37] text-xs">✦</span>
            <div className="w-8 h-px bg-gradient-to-l from-transparent to-[#B8860B]" />
          </div>
          <p className="text-[#2E1D14] text-xs sm:text-sm max-w-sm mx-auto mt-2 leading-relaxed font-sans font-medium">{t("roster.sub")}</p>
        </div>

        <div className="space-y-3">
          {GUIDES.map((g, i) => (
            <motion.div
              key={g.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.45, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                "surface-bronze-glass card-light-sweep border border-[#D4AF37]/25 hover:border-[#D4AF37]/55 rounded-2xl overflow-hidden shadow-[0_8px_25px_rgba(0,0,0,0.85)] transition-all duration-300",
                i >= 2 && !showAll && "hidden sm:block"
              )}
            >
              <div className="h-[1.5px] w-full" style={{ background: `linear-gradient(to right, transparent, ${g.accent}55, transparent)` }} />
              <div className="flex items-center gap-3 p-3.5 sm:gap-4 sm:p-4">
                <RosterAvatar guide={g} size={54} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h3 className="text-[15px] sm:text-[16px] font-bold font-serif text-[#2A1810] truncate">{g.name}</h3>
                    {g.verified && <BadgeCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                  </div>
                  <p className="text-[11.5px] text-[#C25E10] font-semibold mt-0.5 truncate">{g.specialty}</p>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <div className="flex items-center gap-0.5">
                      <Star className="w-2.5 h-2.5 fill-[#E8791E] text-[#E8791E]" />
                      <span className="text-[11px] font-bold text-[#C25E10]">{g.rating.toFixed(1)}</span>
                    </div>
                    <span className="text-[10px] text-[#2E1D14] font-medium">· {g.experience}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <div className="text-right">
                    <span className="text-[14px] sm:text-[15px] font-bold text-[#C25E10] font-serif">₹{g.pricePerMin}</span>
                    <span className="text-[9.5px] text-[#2E1D14] font-medium ml-1">{t("roster.per_min")}</span>
                  </div>
                  <button
                    onClick={() => openGuideChat(g.id)}
                    className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wide border border-[#D4AF37]/50 bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] text-[#0B0807] hover:brightness-110 transition-all active:scale-95 shadow-md cursor-pointer"
                  >
                    <MessageCircle className="w-3 h-3" />
                    {t("roster.chat")}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile View All Astrologers Toggle */}
        <div className="flex sm:hidden justify-center mt-3">
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#FFF9EE] via-[#FFF3D6] to-[#FFF9EE] border border-[#D4AF37]/60 text-[#8C3F08] text-xs font-bold shadow-xs active:scale-95 transition-all cursor-pointer"
          >
            <span>{showAll ? "Show Top Acharyas ▲" : `View All ${GUIDES.length} Verified Astrologers ▾`}</span>
          </button>
        </div>

        <div className="mt-6 flex items-center justify-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#FFFDF8] border border-[#B8860B]/30 px-4 py-2 text-[11px] text-[#C25E10] font-semibold shadow-[0_2px_10px_rgba(107,42,20,0.1)]">
            <Zap className="w-3.5 h-3.5 fill-[#E8791E] stroke-0" />
            {t("roster.free")}
          </div>
        </div>
      </div>
    </section>
  );
}
