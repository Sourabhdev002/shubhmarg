import Hero from "@/components/home/Hero";
import PricingGrid from "@/components/home/PricingGrid";
import SocialProof from "@/components/home/SocialProof";
import PractitionerBio from "@/components/home/PractitionerBio";
import TestimonialCarousel from "@/components/home/TestimonialCarousel";
import GlassAstralPanchang from "@/components/calendar/GlassAstralPanchang";
import CelestialLiveTicker from "@/components/home/CelestialLiveTicker";
import { getTodayEvent, getDailyPanchang } from "@/lib/calendar";

import VedicToolsAndReportLookup from "@/components/home/VedicToolsAndReportLookup";
import VerifiedDelivery from "@/components/home/VerifiedDelivery";
import FestivalDayRibbon from "@/components/home/FestivalDayRibbon";
import BhajanLibrary from "@/components/audio/BhajanLibrary";
import DigitalChadhava from "@/components/home/DigitalChadhava";
import ChooseByConcern from "@/components/home/ChooseByConcern";
import RashiToday from "@/components/home/RashiToday";
import Reveal3D from "@/components/ui/Reveal3D";
import { Reveal } from "@/components/ui/Reveal";
import AstrologerRoster from "@/components/home/AstrologerRoster";

export const revalidate = 3600;

export default async function Home() {
  const [todayEvent, todayPanchang] = await Promise.all([
    getTodayEvent(),
    getDailyPanchang(),
  ]);

  return (
    <div className="bg-[#FBF6EC] text-[#2A1810] min-h-screen selection:bg-[#E8791E]/25 selection:text-[#2A1810]">
      {/* 1. HOOK - Hero */}
      <Hero panchang={todayPanchang} />

      {/* Festival ribbon - only on festival days */}
      <FestivalDayRibbon event={todayEvent} />

      {/* Thin live "cosmic now" signal */}
      <CelestialLiveTicker panchang={todayPanchang} event={todayEvent} />

      {/* Stats - quick trust bar */}
      <SocialProof />

      <div className="section-seam" />

      {/* 2. FREE TASTE + Rs11 FIRST-YES - the top converter, surfaced early */}
      <Reveal><RashiToday /></Reveal>

      <div className="section-seam" />

      {/* 3. GUIDE THEM - pick your concern -> routes to the right service */}
      <Reveal><ChooseByConcern /></Reveal>

      <div className="section-seam" />

      {/* 4. THE BUY - clear pricing */}
      <Reveal3D><PricingGrid /></Reveal3D>

      <div className="section-seam" />

      {/* 5. TALK TO AN EXPERT - astrologer roster */}
      <Reveal><AstrologerRoster /></Reveal>

      <div className="section-seam" />

      {/* 6. TRUST CLUSTER - what you receive */}
      <Reveal><VerifiedDelivery /></Reveal>

      <div className="section-seam" />

      {/* 7. TRUST - testimonials */}
      <Reveal><TestimonialCarousel /></Reveal>

      <div className="section-seam" />

      {/* 8. TRUST - founder + practitioner sankalp */}
      <Reveal3D origin="left"><PractitionerBio /></Reveal3D>

      <div className="section-seam" />

      {/* 9. DEPTH (for browsers) - live panchang & muhurat */}
      <section className="pt-4 sm:pt-8 pb-3 sm:pb-5 border-b border-[#D4AF37]/20 surface-obsidian relative overflow-hidden">
        <span className="glow-fill" />
        <div className="max-w-6xl mx-auto section-px relative z-10">
          <Reveal3D>
            <GlassAstralPanchang panchang={todayPanchang} event={todayEvent} />
          </Reveal3D>
        </div>
      </section>

      {/* 10. DEPTH - all 38 Vedic tools (moved low: for explorers, not first-time buyers) */}
      <Reveal3D><VedicToolsAndReportLookup /></Reveal3D>

      <div className="section-seam" />

      {/* 11. EXTRAS - bhajan library */}
      <Reveal><BhajanLibrary /></Reveal>

      <div className="section-seam" />

      {/* 12. EXTRAS - digital chadhava */}
      <Reveal><DigitalChadhava /></Reveal>
    </div>
  );
}
