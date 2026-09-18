import type { Metadata } from "next";
import SacredPrasadDispatchRadar from "@/components/shared/SacredPrasadDispatchRadar";
import LiveAltarStatusCapacity from "@/components/shared/LiveAltarStatusCapacity";
import WhatsAppProofShowcase from "@/components/shared/WhatsAppProofShowcase";

export const metadata: Metadata = {
  title: "Live Consecration Journey & Prasad Dispatch Radar — ShubhMarg",
  description: "Track your sacred Gotra Puja from Pandit Ji's live Kashi Vishwanath altar chanting to your doorstep insured Prasad delivery.",
};

export default function PrasadTrackerPage() {
  return (
    <main className="min-h-screen bg-[#FBF6EC] text-[#2A1810] pt-24 pb-28 px-4 sm:px-6">
      {/* Background ambient glow */}
      <div className="pointer-events-none fixed top-0 right-0 w-[50vw] h-[50vw] max-w-96 max-h-96 bg-[#d4af37]/10 rounded-full blur-[130px]" />
      <div className="pointer-events-none fixed bottom-0 left-0 w-[50vw] h-[50vw] max-w-96 max-h-96 bg-[#72232b]/20 rounded-full blur-[130px]" />

      <div className="relative z-10 max-w-5xl mx-auto space-y-12">
        {/* Live Altar Status */}
        <LiveAltarStatusCapacity />

        {/* ── Live Consecration Journey Radar ── */}
        <SacredPrasadDispatchRadar />

        {/* ── Tangible Proof of Consecration ── */}
        <WhatsAppProofShowcase />
      </div>
    </main>
  );
}
