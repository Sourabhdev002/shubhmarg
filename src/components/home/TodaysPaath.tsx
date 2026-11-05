"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";
import { useT } from "@/context/LanguageContext";
import { glassClass, type Surface } from "@/lib/home-surfaces";

/**
 * TodaysPaath: the home page changes with the day. Monday shows Shiv Chalisa, Friday
 * Durga, Saturday Shani (once Pandit Ji has verified those texts), otherwise Hanuman Chalisa.
 * The weekday is computed on the server in IST and passed in, so there is no hydration mismatch.
 */
interface PaathLinkInfo { slug: string; titleHi: string; titleEn: string }

export default function TodaysPaath({ weekday, paath, others, surface = "obsidian" }: { weekday: number; paath: PaathLinkInfo; others: PaathLinkInfo[]; surface?: Surface }) {
  const t = useT();
  const reduce = useReducedMotion();

  return (
    <section aria-labelledby="todays-paath-title" className={`relative pt-6 sm:pt-10 pb-8 sm:pb-12 overflow-hidden ${glassClass(surface)}`}>
      <span className="glow-fill" />
      <div className="relative z-10 max-w-3xl mx-auto section-px">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl bg-gradient-to-br from-[#FFFDF8] via-[#FFF6E6] to-[#FCEBCB] border border-[#D4A537]/45 shadow-[0_18px_44px_-24px_rgba(107,42,20,0.45)] p-5 sm:p-8 overflow-hidden"
        >
          <span aria-hidden="true" className="pointer-events-none absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#D4A537]/70 rounded-tl-sm" />
          <span aria-hidden="true" className="pointer-events-none absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#D4A537]/70 rounded-br-sm" />

          <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-7 text-center sm:text-left">
            <span aria-hidden="true" className="shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-gradient-to-br from-[#E8791E] to-[#F5A623] ring-4 ring-[#D4A537]/30 flex items-center justify-center text-white text-4xl font-bold shadow-[0_12px_30px_-10px_rgba(232,121,30,0.65)]">
              {paath.slug === "hanuman-chalisa" ? (
                <Image src="/images/paath/hanuman-chalisa.jpg" alt="" width={96} height={96} className="w-full h-full rounded-full object-cover" />
              ) : (
                "ॐ"
              )}

            </span>
            <div className="flex-1 min-w-0">
              <p className="text-[10.5px] sm:text-[11.5px] font-sans font-bold tracking-[0.22em] text-[#8C3F08] uppercase">
                {t("paath.eyebrow")} · {t(`day.${weekday}`)}
              </p>
              <h2 id="todays-paath-title" className="mt-1.5 text-2xl sm:text-3xl font-bold font-serif text-[#8B1A1A] leading-tight">
                {paath.titleHi}
              </h2>
              <p className="mt-1 text-[13px] sm:text-sm text-[#6B5A48] font-medium">{t("paath.sub")}</p>
              <Link
                href={`/${paath.slug}`}
                className="group mt-4 inline-flex items-center gap-2 btn-gold px-5 py-3 rounded-full text-sm font-bold focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8791E]"
              >
                <BookOpen className="w-4 h-4" aria-hidden="true" />
                {t("paath.read")}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {others.length > 0 && (
            <div className="mt-5 pt-4 border-t border-[#B8860B]/20 flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#B8860B]">{t("paath.more")}</span>
              {others.map((o) => (
                <Link key={o.slug} href={`/${o.slug}`} className="rounded-full bg-[#FFFDF8] border border-[#B8860B]/30 px-3.5 py-1.5 text-[12.5px] font-semibold text-[#8C3F08] hover:border-[#E8791E] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8791E]">
                  {o.titleHi}
                </Link>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}