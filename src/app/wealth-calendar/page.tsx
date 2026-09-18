import type { Metadata } from "next";
import VedicWealthCalendar from "@/components/shared/VedicWealthCalendar";
import LiveAltarStatusCapacity from "@/components/shared/LiveAltarStatusCapacity";
import WhatsAppProofShowcase from "@/components/shared/WhatsAppProofShowcase";

export const metadata: Metadata = {
  title: "Vedic Wealth Calendar — 12-Month Financial Astrology Planner — ShubhMarg",
  description: "Generate your personalized 12-month Vedic wealth calendar with Green, Amber, and Red investment zones based on your Rashi and planetary transits.",
};

export default function WealthCalendarPage() {
  return (
    <main className="min-h-screen bg-[#FBF6EC] text-[#2A1810] pt-24 pb-32 px-4 sm:px-6">
      <div className="pointer-events-none fixed top-0 right-0 w-[65vw] h-[65vw] max-w-[600px] max-h-[600px] bg-emerald-500/10 rounded-full blur-[160px]" />
      <div className="pointer-events-none fixed bottom-0 left-0 w-[65vw] h-[65vw] max-w-[600px] max-h-[600px] bg-[#d4af37]/15 rounded-full blur-[160px]" />
      <div className="relative z-10 max-w-4xl mx-auto space-y-10">
        <LiveAltarStatusCapacity />
        <VedicWealthCalendar />
        <div className="mt-10"><WhatsAppProofShowcase /></div>
      </div>
    </main>
  );
}
