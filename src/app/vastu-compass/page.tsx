import type { Metadata } from "next";
import Interactive16ZoneVastuRadar from "@/components/sanctum/Interactive16ZoneVastuRadar";
import LiveAltarStatusCapacity from "@/components/shared/LiveAltarStatusCapacity";
import WhatsAppProofShowcase from "@/components/shared/WhatsAppProofShowcase";

export const metadata: Metadata = {
  title: "16-Zone Sacred Vedic Vastu Compass & Energy Radar — ShubhMarg",
  description: "Explore the 16 cardinal Shakti Chakra zones of your home or office, identify doshas, and discover zero-breakage metallic Vedic remedies.",
};

export default function VastuCompassPage() {
  return (
    <main className="min-h-screen bg-[#FBF6EC] text-[#2A1810] pt-24 pb-32 px-4 sm:px-6">
      {/* Background ambient lighting */}
      <div className="pointer-events-none fixed top-0 right-0 w-[65vw] h-[65vw] max-w-[600px] max-h-[600px] bg-blue-600/10 rounded-full blur-[160px]" />
      <div className="pointer-events-none fixed bottom-0 left-0 w-[65vw] h-[65vw] max-w-[600px] max-h-[600px] bg-[#72232b]/25 rounded-full blur-[160px]" />

      <div className="relative z-10 max-w-4xl mx-auto space-y-10">
        {/* Live Altar Capacity Banner */}
        <LiveAltarStatusCapacity />

        {/* ── 1. Vastu Compass Stage ── */}
        <Interactive16ZoneVastuRadar />

        {/* ── 2. Tangible Proof of Consecration ── */}
        <div className="mt-10">
          <WhatsAppProofShowcase />
        </div>
      </div>
    </main>
  );
}
