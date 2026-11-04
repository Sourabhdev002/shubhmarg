import Hero from "@/components/home/Hero";
import PricingGrid from "@/components/home/PricingGrid";
import PractitionerBio from "@/components/home/PractitionerBio";
import TestimonialCarousel from "@/components/home/TestimonialCarousel";
import TempleBellStrip from "@/components/home/TempleBellStrip";
import CelestialLiveTicker from "@/components/home/CelestialLiveTicker";
import { getTodayEvent, getDailyPanchang, getUpcomingEvents } from "@/lib/calendar";
import { buildFestivalItems } from "@/lib/festival-images";
import { getServerNow } from "@/lib/ist-time";
import UpcomingFestivals from "@/components/home/UpcomingFestivals";

import FreeToolsRow from "@/components/home/FreeToolsRow";
import TodaysPaath from "@/components/home/TodaysPaath";
import { getTodaysPaath, LISTED_PAATHS } from "@/lib/paath/registry";
import VerifiedDelivery from "@/components/home/VerifiedDelivery";
import FestivalDayRibbon from "@/components/home/FestivalDayRibbon";
import ChooseByConcern from "@/components/home/ChooseByConcern";
import RashiToday from "@/components/home/RashiToday";
import Reveal3D from "@/components/ui/Reveal3D";
import { Reveal } from "@/components/ui/Reveal";
import AstrologerRoster from "@/components/home/AstrologerRoster";
import AashirwadStrip from "@/components/home/AashirwadStrip";

export const revalidate = 3600;

export default async function Home() {
  const [todayEvent, todayPanchang, upcomingEvents] = await Promise.all([
    getTodayEvent(),
    getDailyPanchang(),
    getUpcomingEvents(),
  ]);
  const serverNow = getServerNow();
  const todayYmd = new Date(serverNow).toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
  const festivals = buildFestivalItems(upcomingEvents, todayYmd, 10);

  const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(
    new Date().toLocaleDateString("en-US", { weekday: "short", timeZone: "Asia/Kolkata" }),
  );
  const todaysPaath = getTodaysPaath(weekday < 0 ? 0 : weekday);
  const pick = (p: { slug: string; titleHi: string; titleEn: string }) => ({ slug: p.slug, titleHi: p.titleHi, titleEn: p.titleEn });
  const otherPaaths = LISTED_PAATHS.filter((p) => p.slug !== todaysPaath.slug).map(pick);

  return (
    <div className="bg-[#FBF6EC] text-[#2A1810] min-h-screen selection:bg-[#E8791E]/25 selection:text-[#2A1810]">
      <Hero panchang={todayPanchang} />

      <FestivalDayRibbon event={todayEvent} />

      <CelestialLiveTicker panchang={todayPanchang} event={todayEvent} />

      <TempleBellStrip />

      <AashirwadStrip />

      <div className="section-seam" />

      <Reveal><RashiToday serverNow={serverNow} /></Reveal>

      <div className="section-seam" />

      {festivals.length > 0 && (
        <>
          <UpcomingFestivals festivals={festivals} />
          <div className="section-seam" />
        </>
      )}

      <TodaysPaath weekday={weekday < 0 ? 0 : weekday} paath={pick(todaysPaath)} others={otherPaaths} />

      <div className="section-seam" />

      <Reveal><ChooseByConcern /></Reveal>

      <div className="section-seam" />

      <Reveal3D><PricingGrid /></Reveal3D>

      <div className="section-seam" />

      <Reveal><AstrologerRoster /></Reveal>

      <div className="section-seam" />

      <Reveal><VerifiedDelivery /></Reveal>

      <div className="section-seam" />

      <Reveal><TestimonialCarousel /></Reveal>

      <div className="section-seam" />

      <Reveal3D origin="left"><PractitionerBio /></Reveal3D>

      <div className="section-seam" />

      <FreeToolsRow />
    </div>
  );
}
