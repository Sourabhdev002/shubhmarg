import type { Metadata } from "next";
import RajaYogaMahapurushaScanner from "@/components/astrology/RajaYogaMahapurushaScanner";
import LiveAltarStatusCapacity from "@/components/shared/LiveAltarStatusCapacity";
import WhatsAppProofShowcase from "@/components/shared/WhatsAppProofShowcase";

export const metadata: Metadata = {
  title: "Pancha Mahapurusha & Raja Yoga Scanner — ShubhMarg",
  description: "Scan your Vedic birth chart for royal planetary alignments (Hamsa, Malavya, Ruchaka, Bhadra, Sasa, Gajakesari) and discover your peak manifestation age.",
};

export default function RajaYogaScannerPage() {
  return (
    <main className="min-h-screen bg-[#FBF6EC] text-[#2A1810] pt-24 pb-32 px-4 sm:px-6">
      {/* Background ambient lighting */}
      <div className="pointer-events-none fixed top-0 right-0 w-[65vw] h-[65vw] max-w-[600px] max-h-[600px] bg-[#ffd700]/10 rounded-full blur-[160px]" />
      <div className="pointer-events-none fixed bottom-0 left-0 w-[65vw] h-[65vw] max-w-[600px] max-h-[600px] bg-[#72232b]/25 rounded-full blur-[160px]" />

      <div className="relative z-10 max-w-4xl mx-auto space-y-10">
        {/* Live Altar Capacity Banner */}
        <LiveAltarStatusCapacity />

        {/* ── 1. Raja Yoga Scanner Stage ── */}
        <RajaYogaMahapurushaScanner />

        {/* ── 2. Tangible Proof of Consecration ── */}
        <div className="mt-10">
          <WhatsAppProofShowcase />
        </div>
      </div>
    </main>
  );
}
