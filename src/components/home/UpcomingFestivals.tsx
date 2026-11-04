"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { CalendarDays, ArrowRight } from "lucide-react";
import { useT } from "@/context/LanguageContext";
import type { FestivalItem } from "@/lib/festival-images";

/**
 * UpcomingFestivals: home page strip of the next sacred dates, sorted by date.
 * Card-less round deity icons in a gold ring (same icons as the calendar page),
 * a date chip, the festival name and a "Today / Tomorrow / In N days" tag.
 * Mobile: horizontal snap slider with peek + edge fade. Motion: opacity/transform only.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

function dateParts(ymd: string) {
  const [y, m, d] = ymd.split("-").map(Number);
  const dt = new Date(Date.UTC(y, (m || 1) - 1, d || 1));
  return {
    day: String(d || 1).padStart(2, "0"),
    month: dt.toLocaleDateString("en-IN", { month: "short", timeZone: "UTC" }).toUpperCase(),
    weekday: dt.toLocaleDateString("en-IN", { weekday: "short", timeZone: "UTC" }),
    full: dt.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", timeZone: "UTC" }),
  };
}

export default function UpcomingFestivals({ festivals }: { festivals: FestivalItem[] }) {
  const t = useT();
  const reduce = useReducedMotion();
  if (!festivals.length) return null;

  const whenLabel = (n: number) =>
    n === 0 ? t("fest.today") : n === 1 ? t("fest.tomorrow") : t("fest.inDays").replace("{n}", String(n));

  return (
    <section aria-labelledby="upcoming-festivals-title" className="relative pt-6 sm:pt-10 pb-8 sm:pb-12 overflow-hidden surface-saffron">
      <span className="glow-fill" />
      <div className="relative z-10 max-w-6xl mx-auto section-px">
        {/* Header */}
        <div className="text-center mb-5 sm:mb-7">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFFDF8] border border-[#D4AF37]/55 shadow-[0_4px_14px_rgba(184,134,11,0.15)]">
            <CalendarDays className="w-3.5 h-3.5 text-[#C25E10]" aria-hidden="true" />
            <span className="text-[10.5px] sm:text-[11.5px] font-sans font-bold tracking-[0.22em] text-[#8C3F08] uppercase">
              {t("fest.eyebrow")}
            </span>
          </div>
          <h2 id="upcoming-festivals-title" className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold font-cormorant tracking-tight text-[#22130A] leading-tight">
            {t("fest.title")}
          </h2>
          <div className="flex items-center justify-center gap-3 my-2.5" aria-hidden="true">
            <div className="w-12 sm:w-16 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-[#B8860B]" />
            <span className="text-[#C25E10] text-sm">✦</span>
            <div className="w-12 sm:w-16 h-px bg-gradient-to-l from-transparent via-[#D4AF37] to-[#B8860B]" />
          </div>
          <p className="text-[#2E1D14] text-xs sm:text-sm max-w-md mx-auto leading-relaxed font-medium">
            {t("fest.sub")}
          </p>
        </div>

        {/* Date-wise slider */}
        <ul
          className="flex gap-3 sm:gap-4 overflow-x-auto snap-x snap-mandatory hide-scrollbar -mx-4 px-4 pb-2 pt-1 lg:justify-center"
          style={{
            WebkitMaskImage: "linear-gradient(90deg, transparent 0, #000 16px, #000 calc(100% - 16px), transparent 100%)",
            maskImage: "linear-gradient(90deg, transparent 0, #000 16px, #000 calc(100% - 16px), transparent 100%)",
          }}
        >
          {festivals.map((f, i) => {
            const d = dateParts(f.date);
            const isToday = f.daysAway === 0;
            return (
              <motion.li
                key={f.id}
                initial={reduce ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: EASE }}
                className="snap-start shrink-0 w-[118px] sm:w-[136px]"
              >
                <Link
                  href={`/festivals/${f.slug}`}
                  aria-label={`${f.name}, ${d.full}, ${whenLabel(f.daysAway)}`}
                  className="group flex flex-col items-center text-center rounded-2xl px-1.5 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8791E]"
                >
                  {/* Gold-ring deity icon with date chip */}
                  <span className="relative">
                    <span
                      className={`block w-[84px] h-[84px] sm:w-[96px] sm:h-[96px] rounded-full p-[2.5px] bg-gradient-to-br from-[#F3E5AB] via-[#D4AF37] to-[#8C6818] transition-transform duration-300 group-hover:-translate-y-1 ${
                        isToday ? "shadow-[0_0_0_4px_rgba(232,121,30,0.25),0_10px_26px_-8px_rgba(232,121,30,0.6)]" : "shadow-[0_10px_24px_-12px_rgba(107,42,20,0.45)]"
                      }`}
                    >
                      <span className="relative block w-full h-full rounded-full overflow-hidden bg-[#FFFDF8]">
                        <Image
                          src={f.icon}
                          alt=""
                          fill
                          sizes="96px"
                          unoptimized={f.remoteIcon}
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </span>
                    </span>
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#6B1E1E] border border-[#D4AF37]/70 px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-[#FFFDF8] shadow-sm">
                      {d.day} {d.month}
                    </span>
                  </span>

                  <span className="mt-4 text-[13px] sm:text-sm font-bold font-serif text-[#2A1810] leading-snug line-clamp-2 group-hover:text-[#C25E10] transition-colors">
                    {f.name}
                  </span>
                  <span
                    className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      isToday ? "bg-[#E8791E] text-white" : "bg-[#FFFDF8] border border-[#B8860B]/30 text-[#8C3F08]"
                    }`}
                  >
                    {whenLabel(f.daysAway)}
                  </span>
                  <span className="mt-0.5 text-[10px] text-[#6B5A48] line-clamp-1">{f.tithi || d.weekday}</span>
                </Link>
              </motion.li>
            );
          })}
        </ul>

        {/* View full calendar */}
        <div className="mt-4 text-center">
          <Link
            href="/shubh-calendar"
            className="group inline-flex items-center gap-1.5 text-[12px] sm:text-[13px] font-bold uppercase tracking-widest text-[#C25E10] hover:text-[#8C3F08] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8791E] rounded"
          >
            {t("fest.viewAll")}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}