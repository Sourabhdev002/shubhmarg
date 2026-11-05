import type { Metadata } from "next";
import ShaniSadeSatiDiagnostic from "@/components/astrology/ShaniSadeSatiDiagnostic";
import NineDashaTimeline from "@/components/astrology/NineDashaTimeline";
import LiveAltarStatusCapacity from "@/components/shared/LiveAltarStatusCapacity";
import WhatsAppProofShowcase from "@/components/shared/WhatsAppProofShowcase";
import HanumanChalisaRemedyCard from "@/components/shared/HanumanChalisaRemedyCard";

export const metadata: Metadata = {
  title: "Shani Sade Sati & Dhaiya Calculator — ShubhMarg",
  description: "Calculate your exact Saturn 7.5-year Sade Sati phase, liberation dates, and discover authentic non-fearful Vedic remedies and consecrated rings.",
};

export default function ShaniSadeSatiPage() {
  return (
    <main className="min-h-screen bg-[#FBF6EC] text-[#2A1810] pt-24 pb-32 px-4 sm:px-6">
      <h1 className="sr-only">Shani Sade Sati &amp; Dhaiya Calculator</h1>
      {/* Background ambient lighting */}
      <div className="pointer-events-none fixed top-0 right-0 w-[65vw] h-[65vw] max-w-[600px] max-h-[600px] bg-blue-500/10 rounded-full blur-[160px]" />
      <div className="pointer-events-none fixed bottom-0 left-0 w-[65vw] h-[65vw] max-w-[600px] max-h-[600px] bg-[#72232b]/25 rounded-full blur-[160px]" />

      <div className="relative z-10 max-w-5xl mx-auto space-y-12">
        {/* Live Altar Capacity Banner */}
        <LiveAltarStatusCapacity />

        {/* ── 1. Shani Sade Sati Diagnostic ── */}
        <ShaniSadeSatiDiagnostic />

        {/* Free remedy: Hanuman Chalisa (classical Shani remedy) */}
        <HanumanChalisaRemedyCard dosha="shani" />

        {/* ── 2. Lifetime 120-Year Mahadasha Horizon ── */}
        <NineDashaTimeline currentDashaIndex={7} />

        {/* ── 3. Proof of Consecration ── */}
        <WhatsAppProofShowcase />
      </div>
    </main>
  );
}
