"use client";

import Image from "next/image";
import Link from "next/link";
import { LISTED_PAATHS } from "@/lib/paath/registry";
import { ctaPriceLabel } from "@/lib/service-catalog";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import MobileMenu from "./MobileMenu";
import LanguageSwitcher from "./LanguageSwitcher";
import WalletWidget from "@/components/wallet/WalletWidget";


export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20);
  });

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 w-full flex justify-center transition-all duration-300",
          "backdrop-blur-xl border-b",
          // Near-opaque bg so the bar never looks see-through on mobile/iOS,
          // where backdrop-blur is capped/disabled by the perf guard.
          scrolled
            ? "bg-[#FFFDF8]/98 border-[#D4AF37]/35 shadow-[0_10px_30px_-10px_rgba(74,38,14,0.18)]"
            : "bg-[#FFFDF8]/97 border-[#D4AF37]/20 shadow-[0_2px_15px_rgba(0,0,0,0.05)]"
        )}
      >
        <div
          className={cn(
            "w-full mx-auto flex items-center justify-between px-4 sm:px-6 md:px-8 max-w-7xl transition-all duration-300",
            scrolled ? "h-12 md:h-16" : "h-14 md:h-20"
          )}
        >
          <Link href="/" className="flex items-center group transition-opacity hover:opacity-85 shrink-0">
            <Image
              src="/logos/shubhmarg-logo-horizontal.png"
              alt="ShubhMarg Official Logo"
              width={1024}
              height={341}
              className={cn(
                "h-auto object-contain transition-all duration-300",
                scrolled ? "w-28 md:w-40" : "w-32 md:w-48"
              )}
              priority
            />
          </Link>

          {/* 24K Gold Cosmic Scroll Progress Beam */}
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[2px] bg-[#D4AF37]/15 overflow-hidden">
            <motion.div
              style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
              className="w-full h-full bg-gradient-to-r from-[#D4AF37] via-[#F5A623] to-[#E8791E] shadow-[0_0_8px_rgba(212,175,55,0.7)]"
            />
          </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 lg:gap-7 md:flex">
          <Link
            href="/services"
            className="text-[12px] font-bold tracking-[0.1em] text-[#B8860B] hover:text-[#2A1810] transition-colors flex items-center gap-1.5 bg-[#F5EAD6] px-3 py-1 rounded-full border border-[#B8860B]/40 shadow-inner"
          >
            <span className="text-[10px]"></span>
            <span>PUJA &amp; GUIDANCE</span>
          </Link>

          {/* Explore menu: daily paath, free tools, and the 4 paid steps */}
          <div className="relative group">
            <button
              type="button"
              aria-haspopup="true"
              className="text-[12px] font-bold tracking-[0.1em] text-[#2A1810] hover:text-[#B8860B] focus-visible:text-[#B8860B] transition-colors flex items-center gap-1 py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#B8860B] focus-visible:outline-offset-2 rounded cursor-pointer"
            >
              <span>EXPLORE</span>
              <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180 opacity-60 text-[#B8860B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 transition-all duration-200 absolute top-full -left-28 w-[640px] bg-[#FFFDF8] border border-[#B8860B]/25 rounded-3xl p-5 shadow-[0_20px_50px_-18px_rgba(107,42,20,0.28)] z-50">
              <div className="grid grid-cols-3 gap-5">
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#B8860B] mb-2.5 pb-1 border-b border-[#B8860B]/20">Daily Paath</p>
                  <ul className="space-y-2 text-xs">
                    {LISTED_PAATHS.map((p) => (
                      <li key={p.slug}>
                        <Link href={`/${p.slug}`} className="text-[#C25E10] hover:text-[#E8791E] transition-colors block py-0.5 font-bold">{p.titleEn}</Link>
                      </li>
                    ))}
                    <li><Link href="/shubh-calendar" className="text-[#6B5A48] hover:text-[#E8791E] transition-colors block py-0.5 font-medium">Festival Calendar</Link></li>
                  </ul>
                </div>
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#B8860B] mb-2.5 pb-1 border-b border-[#B8860B]/20">Free Tools</p>
                  <ul className="space-y-2 text-xs">
                    <li><Link href="/free-reading" className="text-[#6B5A48] hover:text-[#E8791E] transition-colors block py-0.5 font-medium">Free Reading</Link></li>
                    <li><Link href="/shani-sade-sati" className="text-[#6B5A48] hover:text-[#E8791E] transition-colors block py-0.5 font-medium">Shani Sade Sati Check</Link></li>
                    <li><Link href="/manglik-rescue" className="text-[#6B5A48] hover:text-[#E8791E] transition-colors block py-0.5 font-medium">Manglik Check</Link></li>
                    <li><Link href="/compatibility" className="text-[#6B5A48] hover:text-[#E8791E] transition-colors block py-0.5 font-medium">Kundli Milan</Link></li>
                    <li><Link href="/muhurta-finder" className="text-[#6B5A48] hover:text-[#E8791E] transition-colors block py-0.5 font-medium">Shubh Muhurta</Link></li>
                  </ul>
                </div>
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#B8860B] mb-2.5 pb-1 border-b border-[#B8860B]/20">Guidance &amp; Puja</p>
                  <ul className="space-y-2 text-xs">
                    <li><Link href="/aashirwad" className="text-[#C25E10] hover:text-[#E8791E] transition-colors block py-0.5 font-bold">Aaj Ka Aashirwad · ₹11</Link></li>
                    <li><Link href="/quick-answer" className="text-[#C25E10] hover:text-[#E8791E] transition-colors block py-0.5 font-bold">Quick Answer · {ctaPriceLabel("quick-answer")}</Link></li>
                    <li><Link href="/request-guidance?service=vedic-guidance" className="text-[#C25E10] hover:text-[#E8791E] transition-colors block py-0.5 font-bold">Personal Guidance · {ctaPriceLabel("vedic-guidance")}</Link></li>
                    <li><Link href="/request-guidance?service=temple-puja" className="text-[#C25E10] hover:text-[#E8791E] transition-colors block py-0.5 font-bold">Temple Sankalp Puja · {ctaPriceLabel("temple-puja")}</Link></li>
                    <li><Link href="/services" className="text-[#6B5A48] hover:text-[#E8791E] transition-colors block py-0.5 font-medium">All services →</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <Link
            href="/shubh-calendar"
            className="nav-pill px-4 py-2 text-[12px] font-semibold tracking-[0.1em] text-[#2A1810] hover:text-[#B8860B] transition-colors"
          >
            CALENDAR
          </Link>
          <Link
            href="/support"
            className="nav-pill px-4 py-2 text-[12px] font-semibold tracking-[0.1em] text-[#2A1810] hover:text-[#B8860B] transition-colors"
          >
            SUPPORT
          </Link>
          <LanguageSwitcher />
          <WalletWidget />
          <Button
            href="/request-guidance"
            size="sm"
            className="rounded-full px-6 tracking-wider text-[12px] font-bold bg-gradient-to-r from-[#C9A646] via-[#E2C875] to-[#C9A646] text-[#0B0807] hover:shadow-[0_4px_20px_rgba(201,166,70,0.45)] hover:scale-105 active:scale-95 transition-all border-0 shadow-[0_2px_12px_rgba(201,166,70,0.3)] cursor-pointer"
          >
            BEGIN GUIDANCE
          </Button>
        </nav>

        {/* Mobile: wallet widget + language switcher + hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <WalletWidget />
          <LanguageSwitcher />
          <MobileMenu />
        </div>
      </div>
    </header>

    {/* Structural spacer matching initial header height */}
    <div className="h-14 md:h-20 shrink-0 pointer-events-none" aria-hidden="true" />
  </>
  );
}