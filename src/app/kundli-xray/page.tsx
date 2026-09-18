import type { Metadata } from "next";
import KundliDiamondXRay from "@/components/astrology/KundliDiamondXRay";
import NineDashaTimeline from "@/components/astrology/NineDashaTimeline";
import WhatsAppProofShowcase from "@/components/shared/WhatsAppProofShowcase";
import LiveAltarStatusCapacity from "@/components/shared/LiveAltarStatusCapacity";

export const metadata: Metadata = {
  title: "12-House Cosmic Kundli X-Ray & Heatmap — ShubhMarg",
  description: "Interactive North Indian Diamond Kundli X-Ray. Inspect all 12 Bhavas, planetary strengths, and unlock customized Gotra remedies.",
};

export default function KundliXRayPage() {
  return (
    <main className="min-h-screen bg-[#FBF6EC] text-[#2A1810] pt-24 pb-28 px-4 sm:px-6">
      {/* Background ambient orbs */}
      <div className="pointer-events-none fixed top-0 right-0 w-[50vw] h-[50vw] max-w-96 max-h-96 bg-[#d4af37]/10 rounded-full blur-[130px]" />
      <div className="pointer-events-none fixed bottom-0 left-0 w-[50vw] h-[50vw] max-w-96 max-h-96 bg-[#72232b]/20 rounded-full blur-[130px]" />

      <div className="relative z-10 max-w-5xl mx-auto space-y-12">
        {/* Live Altar Status */}
        <LiveAltarStatusCapacity />

        {/* ── 1. Interactive 12-House Cosmic X-Ray ── */}
        <KundliDiamondXRay />

        {/* ── 2. 9-Dasha Lifetime Horizon ── */}
        <NineDashaTimeline currentDashaIndex={5} />

        {/* ── 3. Tangible Proof of Consecration ── */}
        <WhatsAppProofShowcase />
      </div>
    </main>
  );
}
