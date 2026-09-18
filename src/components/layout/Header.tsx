"use client";

import Image from "next/image";
import Link from "next/link";
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
            href="/sacred-offerings"
            className="text-[12px] font-bold tracking-[0.1em] text-[#B8860B] hover:text-[#2A1810] transition-colors flex items-center gap-1.5 bg-[#F5EAD6] px-3 py-1 rounded-full border border-[#B8860B]/40 shadow-inner"
          >
            <span className="text-[10px]"></span>
            <span>SACRED OFFERINGS</span>
          </Link>

          {/* Vedic Tools Dropdown Menu */}
          <div className="relative group">
            <button
              type="button"
              aria-haspopup="true"
              className="text-[12px] font-bold tracking-[0.1em] text-[#2A1810] hover:text-[#B8860B] focus-visible:text-[#B8860B] transition-colors flex items-center gap-1 py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#B8860B] focus-visible:outline-offset-2 rounded cursor-pointer"
            >
              <span>VEDIC SANCTUARY (38)</span>
              <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180 opacity-60 text-[#B8860B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {/* Dropdown Menu Panel */}
            <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 transition-all duration-200 absolute top-full -left-28 w-[780px] bg-[#FFFDF8] border border-[#B8860B]/25 rounded-3xl p-5 shadow-[0_20px_50px_-18px_rgba(107,42,20,0.28)] z-50 backdrop-blur-xl">
              <div className="grid grid-cols-3 gap-4">
                {/* Column 1: Energy & Sacred Altars */}
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#B8860B] mb-2.5 pb-1 border-b border-[#B8860B]/20">
                    Energy &amp; Sacred Altars
                  </p>
                  <ul className="space-y-2 text-xs">
                    <li>
                      <Link href="/sound-sanctuary" className="text-[#C25E10] hover:text-[#E8791E] transition-colors block py-0.5 font-bold">432Hz Sound Sanctum
                      </Link>
                    </li>
                    <li>
                      <Link href="/deepdaan-sanctum" className="text-[#C25E10] hover:text-[#E8791E] transition-colors block py-0.5 font-bold">Virtual Deepdaan Altar
                      </Link>
                    </li>
                    <li>
                      <Link href="/yantra-altar" className="text-[#C25E10] hover:text-[#E8791E] transition-colors block py-0.5 font-bold">24K Gold Yantra Altar
                      </Link>
                    </li>
                    <li>
                      <Link href="/vastu-compass" className="text-[#C25E10] hover:text-[#E8791E] transition-colors block py-0.5 font-bold">16-Zone Vastu Radar
                      </Link>
                    </li>
                    <li>
                      <Link href="/prasad-tracker" className="text-[#6B5A48] hover:text-[#E8791E] transition-colors block py-0.5 font-medium">Live Prasad Tracker
                      </Link>
                    </li>
                    <li>
                      <Link href="/palm-scanner" className="text-[#6B5A48] hover:text-[#E8791E] transition-colors block py-0.5 font-medium">
                        Samudrika Palm Scanner
                      </Link>
                    </li>
                    <li>
                      <Link href="/chakra-scanner" className="text-[#6B5A48] hover:text-[#E8791E] transition-colors block py-0.5 font-medium">
                        7-Chakra &amp; Aura Scanner
                      </Link>
                    </li>
                    <li>
                      <Link href="/japa-mala" className="text-[#6B5A48] hover:text-[#E8791E] transition-colors block py-0.5 font-medium">
                        Digital 108 Japa Mala
                      </Link>
                    </li>
                    <li>
                      <Link href="/digital-sankalp" className="text-[#6B5A48] hover:text-[#E8791E] transition-colors block py-0.5 font-medium">
                        Virtual Diya Shrine
                      </Link>
                    </li>
                    <li>
                      <Link href="/baby-cosmic-blueprint" className="text-[#C25E10] hover:text-[#E8791E] transition-colors block py-0.5 font-bold">Baby Cosmic Certificate
                      </Link>
                    </li>
                    <li>
                      <Link href="/graha-sos" className="text-red-700 hover:text-[#E8791E] transition-colors block py-0.5 font-bold">Emergency Graha SOS
                      </Link>
                    </li>
                    <li>
                      <Link href="/garbh-sanskar" className="text-rose-700 hover:text-[#E8791E] transition-colors block py-0.5 font-bold">Garbh Sanskar Sanctum
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Column 2: Astrology & Sovereign Armor */}
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#B8860B] mb-2.5 pb-1 border-b border-[#B8860B]/20">
                    Astrology &amp; Sovereign Armor
                  </p>
                  <ul className="space-y-2 text-xs">
                    <li>
                      <Link href="/rajayoga-scanner" className="text-[#C25E10] hover:text-[#E8791E] transition-colors block py-0.5 font-bold">Raja Yoga Scanner
                      </Link>
                    </li>
                    <li>
                      <Link href="/shani-sade-sati" className="text-[#C25E10] hover:text-[#E8791E] transition-colors block py-0.5 font-bold">Shani Sade Sati Armor
                      </Link>
                    </li>
                    <li>
                      <Link href="/kundli-xray" className="text-[#C25E10] hover:text-[#E8791E] transition-colors block py-0.5 font-bold">12-House Kundli X-Ray
                      </Link>
                    </li>
                    <li>
                      <Link href="/transit-wheel" className="text-[#6B5A48] hover:text-[#E8791E] transition-colors block py-0.5 font-medium">
                        3D Planetary Transits
                      </Link>
                    </li>
                    <li>
                      <Link href="/decision-clock" className="text-[#6B5A48] hover:text-[#E8791E] transition-colors block py-0.5 font-medium">
                        Live Decision Clock (Hora)
                      </Link>
                    </li>
                    <li>
                      <Link href="/disha-shoola" className="text-[#6B5A48] hover:text-[#E8791E] transition-colors block py-0.5 font-medium">
                        Disha Shoola Travel Radar
                      </Link>
                    </li>
                    <li>
                      <Link href="/prashna-kundli" className="text-[#6B5A48] hover:text-[#E8791E] transition-colors block py-0.5 font-medium">
                        Prashna Horary Engine
                      </Link>
                    </li>
                    <li>
                      <Link href="/shubh-calendar" className="text-[#6B5A48] hover:text-[#E8791E] transition-colors block py-0.5 font-medium">
                        Live Vedic Panchang
                      </Link>
                    </li>
                    <li>
                      <Link href="/dosha-scanner" className="text-[#C25E10] hover:text-[#E8791E] transition-colors block py-0.5 font-bold">Kaal Sarp Dosha Scanner
                      </Link>
                    </li>
                    <li>
                      <Link href="/wealth-calendar" className="text-[#C25E10] hover:text-[#E8791E] transition-colors block py-0.5 font-bold">Vedic Wealth Calendar
                      </Link>
                    </li>
                    <li>
                      <Link href="/manglik-rescue" className="text-[#C25E10] hover:text-[#E8791E] transition-colors block py-0.5 font-bold">Manglik Marriage Rescue
                      </Link>
                    </li>
                    <li>
                      <Link href="/muhurta-finder" className="text-[#C25E10] hover:text-[#E8791E] transition-colors block py-0.5 font-bold">Universal Muhurta Finder
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Column 3: Karma, Lineage & Soulmates */}
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#B8860B] mb-2.5 pb-1 border-b border-[#B8860B]/20">
                    Karma, Lineage &amp; Soulmates
                  </p>
                  <ul className="space-y-2 text-xs">
                    <li>
                      <Link href="/yoni-wheel" className="text-[#C25E10] hover:text-[#E8791E] transition-colors block py-0.5 font-bold">27 Nakshatra Yoni Wheel
                      </Link>
                    </li>
                    <li>
                      <Link href="/navamsha-d9" className="text-[#C25E10] hover:text-[#E8791E] transition-colors block py-0.5 font-bold">Navamsha D9 Soulmate
                      </Link>
                    </li>
                    <li>
                      <Link href="/pitru-vault" className="text-[#C25E10] hover:text-[#E8791E] transition-colors block py-0.5 font-bold">Golden Pitru Vault
                      </Link>
                    </li>
                    <li>
                      <Link href="/karmic-rin-resolver" className="text-[#C25E10] hover:text-[#E8791E] transition-colors block py-0.5 font-bold">4-Rin Karmic Resolver
                      </Link>
                    </li>
                    <li>
                      <Link href="/kuldevta-resolver" className="text-[#6B5A48] hover:text-[#E8791E] transition-colors block py-0.5 font-medium">Gotra Rishi &amp; Kuldevta
                      </Link>
                    </li>
                    <li>
                      <Link href="/compatibility" className="text-[#6B5A48] hover:text-[#E8791E] transition-colors block py-0.5 font-medium">
                        36-Guna Kundli Milan
                      </Link>
                    </li>
                    <li>
                      <Link href="/dream-decoder" className="text-[#6B5A48] hover:text-[#E8791E] transition-colors block py-0.5 font-medium">
                        Swapna Dream Decoder
                      </Link>
                    </li>
                    <li>
                      <Link href="/gemstone-calculator" className="text-[#6B5A48] hover:text-[#E8791E] transition-colors block py-0.5 font-medium">
                        Ratna &amp; Rudraksha Finder
                      </Link>
                    </li>
                    <li>
                      <Link href="/raksha-kavach" className="text-[#C25E10] hover:text-[#E8791E] transition-colors block py-0.5 font-bold">Raksha Kavach QR Card
                      </Link>
                    </li>
                    <li>
                      <Link href="/vastu-scanner" className="text-[#6B5A48] hover:text-[#E8791E] transition-colors block py-0.5 font-medium">
                        Vedic Vastu Scanner
                      </Link>
                    </li>
                    <li>
                      <Link href="/past-life-reader" className="text-purple-700 hover:text-[#E8791E] transition-colors block py-0.5 font-bold">Past-Life Karmic Reader
                      </Link>
                    </li>
                    <li>
                      <Link href="/spouse-predictor" className="text-pink-700 hover:text-[#E8791E] transition-colors block py-0.5 font-bold">Future Spouse Blueprint
                      </Link>
                    </li>
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