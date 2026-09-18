"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Heart, ShieldCheck, Gem, ChevronDown, ChevronUp } from "lucide-react";
import { ShubhMargEmblem } from "@/components/brand/ShubhMargLogo";
import GlobalDeskBadge from "@/components/shared/GlobalDeskBadge";
import { waLink } from "@/config/contact";

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} className="group relative inline-flex w-fit text-[#EAE3D2] hover:text-[#FCD34D] transition-colors duration-200 font-medium tracking-wide">
    {children}
    <span className="absolute -bottom-0.5 left-0 w-full h-[1px] bg-[#FCD34D] origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
  </Link>
);

const ALL_VEDIC_TOOLS = [
  { name: "Kundli Milan (36-Guna)", href: "/compatibility" },
  { name: "12-House Kundli X-Ray", href: "/kundli-xray" },
  { name: "16-Zone Vastu Radar", href: "/vastu-compass" },
  { name: "Shani Sade Sati", href: "/shani-sade-sati" },
  { name: "Raja Yoga Scanner", href: "/rajayoga-scanner" },
  { name: "27 Nakshatra Yoni", href: "/yoni-wheel" },
  { name: "Golden Pitru Vault", href: "/pitru-vault" },
  { name: "Navamsha D9 Soulmate", href: "/navamsha-d9" },
  { name: "4-Rin Karmic Payoff", href: "/karmic-rin-resolver" },
  { name: "24K Gold Yantra", href: "/yantra-altar" },
  { name: "432Hz Sound Sanctum", href: "/sound-sanctuary" },
  { name: "Virtual Deepdaan", href: "/deepdaan-sanctum" },
  { name: "Live Prasad Tracker", href: "/prasad-tracker" },
  { name: "Kuldevta Resolver", href: "/kuldevta-resolver" },
  { name: "Palm Scanner", href: "/palm-scanner" },
  { name: "7-Chakra Scanner", href: "/chakra-scanner" },
  { name: "3D Transits", href: "/transit-wheel" },
  { name: "Ratna Finder", href: "/gemstone-calculator" },
  { name: "Hora Clock", href: "/decision-clock" },
  { name: "Vastu Scanner", href: "/vastu-scanner" },
  { name: "Dream Decoder", href: "/dream-decoder" },
  { name: "108 Japa Mala", href: "/japa-mala" },
  { name: "Baby Certificate", href: "/baby-cosmic-blueprint" },
  { name: "Graha SOS", href: "/graha-sos" },
  { name: "Kaal Sarp Scanner", href: "/dosha-scanner" },
  { name: "Wealth Calendar", href: "/wealth-calendar" },
  { name: "Raksha Kavach", href: "/raksha-kavach" },
  { name: "Past-Life Reader", href: "/past-life-reader" },
  { name: "Spouse Blueprint", href: "/spouse-predictor" },
  { name: "Manglik Rescue", href: "/manglik-rescue" },
  { name: "Muhurta Finder", href: "/muhurta-finder" },
  { name: "Garbh Sanskar", href: "/garbh-sanskar" },
];

const FEATURED_MOBILE_TOOLS = ALL_VEDIC_TOOLS.slice(0, 8);
const REMAINING_MOBILE_TOOLS = ALL_VEDIC_TOOLS.slice(8);

export default function Footer() {
  const [isToolsExpanded, setIsToolsExpanded] = useState(false);

  return (
    <footer className="bg-[#110a0a] text-brand-parchment relative overflow-hidden border-t border-[#d4af37]/20">
      
      {/* Subtle Oversized Mandala Watermark in the background (hidden on mobile to prevent any SVG bounds spill) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden sm:block">
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] opacity-[0.03] rotate-12">
          <svg viewBox="0 0 100 100" className="w-full h-full fill-[#D4AF37]">
            <path d="M50 0 C60 20 80 40 100 50 C80 60 60 80 50 100 C40 80 20 60 0 50 C20 40 40 20 50 0 Z" />
            <circle cx="50" cy="50" r="30" stroke="#D4AF37" strokeWidth="2" fill="none" />
            <circle cx="50" cy="50" r="40" stroke="#D4AF37" strokeWidth="1" strokeDasharray="2,2" fill="none" />
            <circle cx="50" cy="50" r="20" stroke="#D4AF37" strokeWidth="0.5" fill="none" />
          </svg>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-6 pt-8 lg:pt-16 pb-20 md:pb-14 lg:pb-20 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8 items-start justify-between">
          
          {/* Column 1: Logo, Brand & Trust Badges */}
          <div className="col-span-2 lg:col-span-3 flex flex-col items-start pb-4 border-b border-[#d4af37]/15 lg:border-0 lg:pb-0">
            <Link href="/" className="flex flex-col items-start group transition-opacity hover:opacity-90">
              <Image
                src="/logos/shubhmarg-logo-horizontal.png"
                alt="ShubhMarg Official Logo"
                width={1024}
                height={341}
                className="h-10 sm:h-11 w-auto object-contain drop-shadow-[0_2px_10px_rgba(212,175,55,0.18)]"
                priority={false}
              />
            </Link>
            <p className="mt-3 text-xs sm:text-[13px] text-[#D8CEBD] leading-[1.65] max-w-[280px] font-normal">
              Authentic traditional spiritual guidance, sacred temple pujas, and personalized Vedic calculators for the modern seeker.
            </p>
            
            {/* Trust Badges in a sleek royal obsidian pill */}
            <div className="mt-4 grid grid-cols-2 gap-2.5 w-full max-w-[280px]">
              <div className="flex items-center gap-2 p-2 rounded-xl bg-white/[0.05] border border-[#F5C842]/30">
                <ShieldCheck className="w-4 h-4 text-[#F5C842] shrink-0" />
                <span className="text-[10px] uppercase tracking-wider text-[#F5EFE6] font-bold">100% Private</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-white/[0.05] border border-[#F5C842]/30">
                <Gem className="w-4 h-4 text-[#F5C842] shrink-0" />
                <span className="text-[10px] uppercase tracking-wider text-[#F5EFE6] font-bold">Vedic Consecrated</span>
              </div>
            </div>
          </div>

          {/* ── Mobile-Optimized Directory: High Contrast, Compact & Non-bloated ── */}
          <div className="col-span-2 lg:hidden space-y-5">
            
            {/* Quick Navigation: Explore & Support side by side */}
            <div className="grid grid-cols-2 gap-4 pb-4 border-b border-[#d4af37]/15">
              <div>
                <h4
                  style={{ color: "#F5C842" }}
                  className="font-serif font-black text-xs sm:text-[13px] tracking-[0.18em] uppercase mb-2.5 drop-shadow-[0_1px_4px_rgba(245,200,66,0.35)]"
                >
                  Explore
                </h4>
                <nav className="flex flex-col gap-2 text-xs font-medium">
                  <FooterLink href="/">Home</FooterLink>
                  <FooterLink href="/sacred-offerings">Sacred Offerings</FooterLink>
                  <FooterLink href="/shubh-calendar">Vedic Panchang</FooterLink>
                  <FooterLink href="/services">Consultations</FooterLink>
                  <FooterLink href="/request-guidance">Request Guidance</FooterLink>
                  <FooterLink href="/about">About ShubhMarg</FooterLink>
                </nav>
              </div>

              <div>
                <h4
                  style={{ color: "#F5C842" }}
                  className="font-serif font-black text-xs sm:text-[13px] tracking-[0.18em] uppercase mb-2.5 drop-shadow-[0_1px_4px_rgba(245,200,66,0.35)]"
                >
                  Support
                </h4>
                <nav className="flex flex-col gap-2 text-xs font-medium">
                  <FooterLink href="/support">Help Center</FooterLink>
                  <FooterLink href="/contact">Contact Pandit Ji</FooterLink>
                  <FooterLink href="/privacy-policy">Privacy Policy</FooterLink>
                  <FooterLink href="/terms">Terms &amp; Conditions</FooterLink>
                  <FooterLink href="/refunds">Refund Policy</FooterLink>
                  <FooterLink href="/disclaimer">Disclaimer</FooterLink>
                </nav>
              </div>
            </div>

            {/* Vedic Tools (Sleek Curated Chips + Expand Toggle) */}
            <div className="pb-4 border-b border-[#d4af37]/15">
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-1.5">
                  <ShubhMargEmblem size={14} />
                  <h4
                    style={{ color: "#F5C842" }}
                    className="font-serif font-black text-xs sm:text-[13px] tracking-[0.18em] uppercase drop-shadow-[0_1px_4px_rgba(245,200,66,0.35)]"
                  >
                    Vedic Tools (32)
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => setIsToolsExpanded(!isToolsExpanded)}
                  className="text-[10px] font-bold text-amber-200 hover:text-white flex items-center gap-1 bg-amber-500/15 px-2.5 py-1 rounded-full border border-[#F5C842]/40 transition-all cursor-pointer active:scale-95"
                >
                  <span>{isToolsExpanded ? "Show Less" : "View All 32"}</span>
                  {isToolsExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </button>
              </div>

              {/* Top 8 Essential Tools */}
              <div className="grid grid-cols-2 gap-1.5">
                {FEATURED_MOBILE_TOOLS.map((t) => (
                  <Link
                    key={t.name}
                    href={t.href}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#1E150F] border border-[#F5C842]/35 text-[11px] text-[#F5EFE6] hover:text-[#FCD34D] hover:border-[#FCD34D] transition-all font-medium"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F5C842] shadow-[0_0_5px_rgba(245,200,66,0.8)] shrink-0" />
                    <span className="truncate">{t.name}</span>
                  </Link>
                ))}
              </div>

              {/* Expandable Remaining 24 Tools */}
              {isToolsExpanded && (
                <div className="grid grid-cols-2 gap-1.5 mt-2 pt-2 border-t border-[#d4af37]/15">
                  {REMAINING_MOBILE_TOOLS.map((t) => (
                    <Link
                      key={t.name}
                      href={t.href}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#19110B] border border-[#d4af37]/25 text-[11px] text-[#EAE3D2] hover:text-[#FCD34D] hover:border-[#d4af37] transition-all font-medium"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-300/60 shrink-0" />
                      <span className="truncate">{t.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* ── Desktop Multi-column Layout (Preserved on lg screens) ── */}
          <div className="hidden lg:block lg:col-span-2">
            <h4
              style={{ color: "#F5C842" }}
              className="font-serif font-black text-[13.5px] mb-3 tracking-[0.18em] uppercase drop-shadow-[0_1px_4px_rgba(245,200,66,0.35)]"
            >
              Explore
            </h4>
            <nav className="flex flex-col gap-2.5 text-[13px] font-medium">
              <FooterLink href="/">Home</FooterLink>
              <FooterLink href="/sacred-offerings">Sacred Offerings</FooterLink>
              <FooterLink href="/shubh-calendar">Vedic Panchang</FooterLink>
              <FooterLink href="/services">Consultations</FooterLink>
              <FooterLink href="/request-guidance">Request Guidance</FooterLink>
              <FooterLink href="/about">About ShubhMarg</FooterLink>
            </nav>
          </div>

          <div className="hidden lg:block lg:col-span-2">
            <h4
              style={{ color: "#F5C842" }}
              className="font-serif font-black text-[13.5px] mb-3 tracking-[0.18em] uppercase drop-shadow-[0_1px_4px_rgba(245,200,66,0.35)]"
            >
              Vedic Tools
            </h4>
            <nav className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[11.5px] font-medium">
              {ALL_VEDIC_TOOLS.map((tool) => (
                <FooterLink key={tool.name} href={tool.href}>{tool.name}</FooterLink>
              ))}
            </nav>
          </div>

          <div className="hidden lg:block lg:col-span-2">
            <h4
              style={{ color: "#F5C842" }}
              className="font-serif font-black text-[13.5px] mb-3 tracking-[0.18em] uppercase drop-shadow-[0_1px_4px_rgba(245,200,66,0.35)]"
            >
              Support
            </h4>
            <nav className="flex flex-col gap-2.5 text-[13px] font-medium">
              <FooterLink href="/support">Help Center</FooterLink>
              <FooterLink href="/contact">Contact Pandit Ji</FooterLink>
              <FooterLink href="/privacy-policy">Privacy Policy</FooterLink>
              <FooterLink href="/terms">Terms &amp; Conditions</FooterLink>
              <FooterLink href="/refunds">Refund Policy</FooterLink>
              <FooterLink href="/disclaimer">Disclaimer</FooterLink>
            </nav>
          </div>

          {/* Column 5: Newsletter & Connect */}
          <div className="col-span-2 lg:col-span-3 pt-2 lg:pt-0">
            <h4
              style={{ color: "#F5C842" }}
              className="font-serif font-black text-xs sm:text-[13.5px] mb-2 tracking-[0.18em] uppercase drop-shadow-[0_1px_4px_rgba(245,200,66,0.35)]"
            >
              The Inner Circle
            </h4>
            <p className="text-xs sm:text-[13px] text-[#D8CEBD] leading-[1.65] mb-4 font-normal">
              Receive weekly Vedic wisdom, auspicious Muhurta alerts, and blessings directly.
            </p>
            
            {/* Newsletter Input */}
            <form className="relative flex items-center w-full mb-5 group" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="w-full bg-white/[0.05] border-b border-[#F5C842]/40 py-2 px-2 text-xs sm:text-[13px] text-[#FFFDF8] placeholder:text-[#BDB19C] focus:outline-none focus:border-[#FCD34D] transition-colors font-normal rounded-t"
              />
              <button 
                type="submit" 
                className="absolute right-0 p-2 text-amber-300 group-hover:text-white hover:!text-[#f3e5ab] transition-colors cursor-pointer"
                aria-label="Subscribe"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </form>

            <h4
              style={{ color: "#F5C842" }}
              className="font-serif font-black text-xs mb-3 tracking-[0.18em] uppercase drop-shadow-[0_1px_4px_rgba(245,200,66,0.35)]"
            >
              Connect
            </h4>
            <div className="flex gap-2.5">
              <a href="https://web.facebook.com/profile.php?id=61593304228049" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-8 h-8 rounded-full border border-[#F5C842]/35 bg-white/[0.04] flex items-center justify-center text-amber-200 hover:text-[#110a0a] hover:bg-[#F5C842] hover:border-[#F5C842] hover:shadow-[0_0_15px_rgba(245,200,66,0.5)] transition-all duration-300">
                <FacebookIcon />
              </a>
              <a href="https://www.instagram.com/shubhmarg.official/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-8 h-8 rounded-full border border-[#F5C842]/35 bg-white/[0.04] flex items-center justify-center text-amber-200 hover:text-[#110a0a] hover:bg-[#F5C842] hover:border-[#F5C842] hover:shadow-[0_0_15px_rgba(245,200,66,0.5)] transition-all duration-300">
                <InstagramIcon />
              </a>
              <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="w-8 h-8 rounded-full border border-[#F5C842]/35 bg-white/[0.04] flex items-center justify-center text-amber-200 hover:text-[#110a0a] hover:bg-[#F5C842] hover:border-[#F5C842] hover:shadow-[0_0_15px_rgba(245,200,66,0.5)] transition-all duration-300">
                <YoutubeIcon />
              </a>
              <a href={waLink()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-8 h-8 rounded-full border border-[#F5C842]/35 bg-white/[0.04] flex items-center justify-center text-amber-200 hover:text-[#110a0a] hover:bg-[#F5C842] hover:border-[#F5C842] hover:shadow-[0_0_15px_rgba(245,200,66,0.5)] transition-all duration-300">
                <WhatsAppIcon />
              </a>
            </div>
          </div>
        </div>

        {/* Global desk trust chip */}
        <div className="mt-10 lg:mt-14 flex justify-center">
          <GlobalDeskBadge variant="dark" />
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 border-t border-[#d4af37]/20 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-[11.5px] text-[#D8CEBD] font-normal tracking-wide">
          <p>
            &copy; {new Date().getFullYear()} ShubhMarg. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5">
            Designed with <Heart className="w-3 h-3 text-amber-400 fill-amber-400" /> for seekers of truth
          </p>
        </div>
      </div>
    </footer>
  );
}
