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
      {/* 1. Hero — 3D Om, premium dark */}
      <Hero panchang={todayPanchang} />

      {/* 1aa. Festival Day Ribbon — auto-shows ONLY on calendar festival days */}
      <FestivalDayRibbon event={todayEvent} />

      {/* 1b. Real-Time Celestial Alignment Ribbon (Cosmic Now) */}
      <CelestialLiveTicker panchang={todayPanchang} event={todayEvent} />
      {/* 2. Stats — animated counters */}
      <SocialProof />

      <div className="section-seam" />

      {/* 3. Live Panchang & Muhurat — royal sanctuary */}
      <section className="pt-4 sm:pt-8 pb-3 sm:pb-5 border-b border-[#D4AF37]/20 surface-obsidian relative overflow-hidden">
        <span className="glow-fill" />
        <div className="max-w-6xl mx-auto section-px relative z-10">
          <Reveal3D>
            <GlassAstralPanchang panchang={todayPanchang} event={todayEvent} />
          </Reveal3D>
        </div>
      </section>
      {/* 4. Choose by concern */}
      <Reveal><ChooseByConcern /></Reveal>

      <div className="section-seam" />

      {/* 3b. Personalised Today for your Rashi */}
      <Reveal><RashiToday /></Reveal>

      <div className="section-seam" />

      {/* 3c. Talk to our Vedic astrologers */}
      <Reveal><AstrologerRoster /></Reveal>

      <div className="section-seam" />

      {/* 4. Sacred Vedic Tools, Voice Blessing & Report Download */}
      <Reveal3D><VedicToolsAndReportLookup /></Reveal3D>

      <div className="section-seam" />

      {/* 5. Pricing — all services visible */}
      <Reveal3D><PricingGrid /></Reveal3D>

      <div className="section-seam" />

      {/* 5b. Verified Delivery — what you receive + verify any report (trust loop) */}
      <Reveal><VerifiedDelivery /></Reveal>

      <div className="section-seam" />

      {/* 5b2. Sacred Bhajan Library — listen & buy our bhajans, or request custom */}
      <Reveal><BhajanLibrary /></Reveal>

      <div className="section-seam" />

      {/* 5b3. Digital Chadhava — micro sacred offerings paid instantly from wallet */}
      <Reveal><DigitalChadhava /></Reveal>

      <div className="section-seam" />

      {/* 5c. Testimonials — auto-sliding premium carousel */}
      <Reveal><TestimonialCarousel /></Reveal>

      <div className="section-seam" />

      {/* 6. Two Hands, One Sankalp — merged Founder + Practitioner (closing trust) */}
      <Reveal3D origin="left"><PractitionerBio /></Reveal3D>
    </div>
  );
}
