"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { BadgeCheck, BookOpen, ShieldCheck, Lock, HandHeart } from "lucide-react";
import { useT } from "@/context/LanguageContext";

/**
 * PractitionerBio — merged "Two Hands, One Sacred Sankalp" section.
 *
 * The unique trust element: publicly co-signed by BOTH the Founder (Aryan, who
 * guarantees the ethics) AND the Senior Acharya (who delivers the reading). Every
 * other astrology site hides one of the two — we show both, on a sacred document,
 * with real vows. This IS the "chain of accountability" made visible.
 *
 * Uses existing bio.* translations for the practitioner side; the founder side is
 * hardcoded first-person from Aryan (translations can be added later if needed).
 */

const SHARED_VOWS = [
  { icon: BookOpen,   hi: "प्रामाणिक शास्त्र", en: "Authentic Shastra" },
  { icon: ShieldCheck, hi: "सत्य वचन",        en: "Truthful counsel" },
  { icon: Lock,        hi: "गोपनीयता",         en: "Sacred privacy" },
  { icon: HandHeart,   hi: "धर्म वचन",          en: "Dharma guarantee" },
];

export default function PractitionerBio() {
  const t = useT();

  const credentials = [t("bio.cred1"), t("bio.cred2"), t("bio.cred3"), t("bio.cred4")];

  return (
    <section className="section-py surface-obsidian overflow-hidden relative">
      {/* Yantra watermark */}
      <div className="absolute right-[-5%] top-1/2 -translate-y-1/2 w-[420px] h-[420px] opacity-[0.05] pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-none" stroke="#D4AF37" strokeWidth="0.4">
          <polygon points="50,5 95,72 5,72" /><polygon points="50,95 5,28 95,28" />
          <circle cx="50" cy="50" r="45" /><circle cx="50" cy="50" r="35" />
          <circle cx="50" cy="50" r="25" /><circle cx="50" cy="50" r="15" />
        </svg>
      </div>
      <span className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[520px] h-[260px] rounded-full bg-[#E8791E]/[0.08] blur-[100px]" />

      <div className="mx-auto max-w-5xl section-px relative z-10">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-4 sm:mb-5"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFFDF8] border border-[#B8860B]/40 shadow-[0_2px_10px_rgba(107,42,20,0.08)]">
            <span className="text-[#E8791E] text-xs">✦</span>
            <span
              className="text-[10.5px] font-bold tracking-[0.28em] text-[#C25E10] uppercase font-devanagari"
              style={{ fontFamily: "'Tiro Devanagari Hindi', serif" }}
            >
              मम संकल्प
            </span>
            <span className="text-[10.5px] font-bold tracking-[0.28em] text-[#C25E10] uppercase">
              · Two Hands, One Sankalp
            </span>
            <span className="text-[#E8791E] text-xs">✦</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-[28px] p-[1.5px] bg-gradient-to-br from-[#F3E5AB] via-[#D4AF37]/70 to-[#8C6818] shadow-[0_26px_65px_-28px_rgba(107,42,20,0.4)]"
        >
          <div className="relative rounded-[26px] bg-gradient-to-b from-[#FFFDF9] via-[#FCF6EA] to-[#F7EDD9] p-5 sm:p-9 overflow-hidden">
            {/* Filigree corners */}
            <span className="absolute top-3.5 left-3.5 w-4 h-4 border-t-2 border-l-2 border-[#D4AF37]/70 rounded-tl-sm pointer-events-none" />
            <span className="absolute top-3.5 right-3.5 w-4 h-4 border-t-2 border-r-2 border-[#D4AF37]/70 rounded-tr-sm pointer-events-none" />
            <span className="absolute bottom-3.5 left-3.5 w-4 h-4 border-b-2 border-l-2 border-[#D4AF37]/70 rounded-bl-sm pointer-events-none" />
            <span className="absolute bottom-3.5 right-3.5 w-4 h-4 border-b-2 border-r-2 border-[#D4AF37]/70 rounded-br-sm pointer-events-none" />

            {/* Sacred invocation */}
            <div className="text-center mb-4">
              <p
                className="text-[13px] sm:text-[14px] font-bold text-[#8B1A1A] tracking-wider font-devanagari"
                style={{ fontFamily: "'Tiro Devanagari Hindi', serif" }}
              >
                ॥ ॐ श्री गुरवे नमः ॥
              </p>
            </div>

            {/* Headline */}
            <h2 className="text-center text-[1.55rem] sm:text-[2.1rem] lg:text-[2.6rem] font-bold font-serif text-[#22130A] leading-[1.1] tracking-tight mb-2 font-cormorant">
              Two hands. <span className="italic text-[#C25E10]">One sacred Sankalp.</span>
            </h2>
            <p className="text-center text-[12.5px] sm:text-[13.5px] text-[#2E1D14] font-sans font-medium max-w-xl mx-auto mb-6 sm:mb-8">
              The Founder guarantees the ethics. The Acharya delivers the reading. Both stand publicly behind every consultation.
            </p>

            {/* Ornamental divider */}
            <div className="flex items-center justify-center gap-2.5 mb-6">
              <span className="h-px w-14 bg-gradient-to-r from-transparent to-[#B8860B]/60" />
              <span className="text-[#E8791E] text-sm">𑁍</span>
              <span className="h-px w-14 bg-gradient-to-l from-transparent to-[#B8860B]/60" />
            </div>

            {/* ── TWO PORTRAITS ── */}
            <div className="grid md:grid-cols-[1fr_auto_1fr] gap-5 md:gap-3 items-stretch">
              {/* FOUNDER */}
              <div className="flex flex-col items-center text-center p-4 sm:p-5 rounded-2xl bg-[#FFFDF8]/85 border border-[#D4AF37]/35 shadow-[0_6px_18px_-10px_rgba(107,42,20,0.2)]">
                {/* Founder portrait — uses ShubhMarg emblem (real logo, on-brand) */}
                <div className="relative shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-[#F3E5AB] via-[#D4AF37] to-[#8C6818] p-[2px] shadow-[0_8px_24px_-6px_rgba(184,134,11,0.45)] mb-3">
                  <div className="w-full h-full rounded-full overflow-hidden border-2 border-[#FFFDF8]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/icons/shubhmarg-icon-512.png"
                      alt="Aryan — Founder of ShubhMarg"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#22A55B] border-2 border-[#FFFDF8] text-white text-[8.5px] font-bold uppercase tracking-wider shadow">
                    <BadgeCheck className="w-2.5 h-2.5" /> Founder
                  </span>
                </div>

                <h3 className="text-[1.15rem] sm:text-[1.35rem] font-bold font-serif text-[#22130A] leading-tight mt-1">
                  The ShubhMarg Custodian
                </h3>
                <p className="text-[10.5px] text-[#C25E10] font-sans font-bold uppercase tracking-[0.18em] mb-2.5">
                  Founding Sankalp · Institutional Vow
                </p>

                <p className="text-[12px] sm:text-[12.5px] text-[#2E1D14] leading-relaxed font-serif italic mb-4">
                  &ldquo;ShubhMarg was founded because too many seekers today receive generic, fear-based readings from strangers with no Shastra behind them. Our founding vow — sealed the day this house opened — is that ShubhMarg will always stand differently.&rdquo;
                </p>

                {/* Institutional wax seal */}
                <div className="mt-auto flex items-center gap-2 pt-3 border-t border-[#D4AF37]/25 w-full justify-center">
                  <span className="shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#F3E5AB] via-[#D4AF37] to-[#8C6818] p-[1.5px] shadow-sm">
                    <span className="w-full h-full rounded-full bg-[#FFFDF8] flex items-center justify-center">
                      <BadgeCheck className="w-3.5 h-3.5 text-[#22A55B]" />
                    </span>
                  </span>
                  <span className="font-cormorant italic text-[1rem] leading-none text-[#22130A]">— Sealed by ShubhMarg</span>
                </div>
              </div>

              {/* Center gold cord (desktop only) */}
              <div className="hidden md:flex flex-col items-center justify-center px-2">
                <span className="h-px w-6 bg-[#D4AF37]/40" />
                <span
                  className="font-devanagari text-[1.4rem] text-[#8C5212] my-2 leading-none"
                  style={{ fontFamily: "'Tiro Devanagari Hindi', serif" }}
                >
                  ॥
                </span>
                <span className="h-16 w-px bg-gradient-to-b from-[#D4AF37]/60 via-[#D4AF37]/30 to-[#D4AF37]/60" />
                <span className="text-[9px] font-bold uppercase tracking-widest text-[#8C5212] my-2">
                  &amp;
                </span>
                <span className="h-16 w-px bg-gradient-to-b from-[#D4AF37]/60 via-[#D4AF37]/30 to-[#D4AF37]/60" />
                <span
                  className="font-devanagari text-[1.4rem] text-[#8C5212] my-2 leading-none"
                  style={{ fontFamily: "'Tiro Devanagari Hindi', serif" }}
                >
                  ॥
                </span>
                <span className="h-px w-6 bg-[#D4AF37]/40" />
              </div>

              {/* ACHARYA */}
              <div className="flex flex-col items-center text-center p-4 sm:p-5 rounded-2xl bg-[#FFFDF8]/85 border border-[#D4AF37]/35 shadow-[0_6px_18px_-10px_rgba(107,42,20,0.2)]">
                <div className="relative shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-[#F3E5AB] via-[#D4AF37] to-[#8C6818] p-[2px] shadow-[0_8px_24px_-6px_rgba(184,134,11,0.45)] mb-3">
                  <div className="w-full h-full rounded-full overflow-hidden border-2 border-[#FFFDF8]">
                    <Image
                      src="/images/festivals/vishnu_lotus.jpg"
                      alt="Senior Vedic Acharya"
                      width={112}
                      height={112}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-600 border-2 border-[#FFFDF8] text-white text-[8.5px] font-bold uppercase tracking-wider shadow">
                    <BadgeCheck className="w-2.5 h-2.5" /> {t("bio.verified")}
                  </span>
                </div>

                <h3 className="text-[1.15rem] sm:text-[1.35rem] font-bold font-serif text-[#22130A] leading-tight mt-1">
                  {t("bio.name")}
                </h3>
                <p className="text-[10.5px] text-[#C25E10] font-sans font-bold uppercase tracking-[0.18em] mb-2.5">
                  {t("bio.specialties")}
                </p>

                <p className="text-[12px] sm:text-[12.5px] text-[#2E1D14] leading-relaxed font-serif italic mb-3">
                  &ldquo;{t("bio.desc")}&rdquo;
                </p>

                {/* Mini stats row */}
                <div className="grid grid-cols-3 gap-2 w-full mb-3">
                  <div className="text-center">
                    <p className="text-[14px] sm:text-[16px] font-bold text-[#C25E10] font-serif leading-none">500+</p>
                    <p className="text-[8px] text-[#6B5A48] uppercase tracking-wider mt-0.5">{t("bio.consultations")}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[14px] sm:text-[16px] font-bold text-[#C25E10] font-serif leading-none">15+</p>
                    <p className="text-[8px] text-[#6B5A48] uppercase tracking-wider mt-0.5">{t("bio.yrs_practice")}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[14px] sm:text-[16px] font-bold text-[#C25E10] font-serif leading-none">3-5d</p>
                    <p className="text-[8px] text-[#6B5A48] uppercase tracking-wider mt-0.5">{t("bio.avg_delivery")}</p>
                  </div>
                </div>

                {/* Acharya wax seal */}
                <div className="mt-auto flex items-center gap-2 pt-3 border-t border-[#D4AF37]/25 w-full justify-center">
                  <span className="shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#F3E5AB] via-[#D4AF37] to-[#8C6818] p-[1.5px] shadow-sm">
                    <span className="w-full h-full rounded-full bg-[#FFFDF8] flex items-center justify-center">
                      <BadgeCheck className="w-3.5 h-3.5 text-[#22A55B]" />
                    </span>
                  </span>
                  <span className="font-cormorant italic text-[1.1rem] leading-none text-[#22130A]">— Acharya</span>
                </div>
              </div>
            </div>

            {/* ── SHARED VOWS STRIP ── */}
            <div className="mt-7 sm:mt-9 pt-5 border-t border-[#D4AF37]/30">
              <p className="text-center text-[10px] font-bold tracking-[0.28em] uppercase text-[#8C5212] mb-3.5">
                — Together we vow —
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                {SHARED_VOWS.map((v) => (
                  <div
                    key={v.en}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#FFFDF8] border border-[#D4AF37]/30 shadow-[0_3px_10px_-6px_rgba(107,42,20,0.18)]"
                  >
                    <span className="shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-[#F3E5AB] via-[#D4AF37] to-[#8C6818] p-[1.5px]">
                      <span className="w-full h-full rounded-full bg-[#FFFDF8] flex items-center justify-center text-[#C25E10]">
                        <v.icon className="w-3.5 h-3.5" strokeWidth={2.3} />
                      </span>
                    </span>
                    <div className="min-w-0">
                      <p
                        className="text-[9.5px] font-bold text-[#8B1A1A] tracking-wide font-devanagari leading-tight"
                        style={{ fontFamily: "'Tiro Devanagari Hindi', serif" }}
                      >
                        {v.hi}
                      </p>
                      <p className="text-[11px] font-bold font-serif text-[#22130A] leading-tight truncate">
                        {v.en}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-[#D4AF37]/25">
                <p
                  className="text-[11px] text-[#8C5212] font-bold tracking-wider text-center sm:text-left font-devanagari"
                  style={{ fontFamily: "'Tiro Devanagari Hindi', serif" }}
                >
                  सत्यमेव जयते
                  <span className="block text-[9.5px] font-sans font-medium text-[#6B5A48] mt-0.5 tracking-normal">
                    Truth alone triumphs
                  </span>
                </p>
                <Link
                  href="/request-guidance"
                  className="group relative inline-flex items-center gap-2 px-6 py-2.5 rounded-full overflow-hidden font-extrabold text-[12px] uppercase tracking-wide bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] text-[#0B0807] hover:brightness-105 active:scale-95 transition-all shadow-[0_5px_18px_rgba(212,175,55,0.4)] cursor-pointer"
                >
                  <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                  <span className="relative">{t("bio.cta")}</span>
                  <svg className="relative w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
