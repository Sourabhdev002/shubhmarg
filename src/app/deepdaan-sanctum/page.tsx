import type { Metadata } from "next";
import VirtualDeepdaanSanctum from "@/components/sanctum/VirtualDeepdaanSanctum";
import LiveAltarStatusCapacity from "@/components/shared/LiveAltarStatusCapacity";
import WhatsAppProofShowcase from "@/components/shared/WhatsAppProofShowcase";

export const metadata: Metadata = {
  title: "Virtual Deepdaan & Sacred Ganga Sanctum — ShubhMarg",
  description: "Light your sacred Gotra Diya, offer pushpanjali, and ring the consecrated temple bell in our Kashi virtual sanctum.",
};

export default function DeepdaanSanctumPage() {
  return (
    <main className="min-h-screen bg-[#FBF6EC] text-[#2A1810] pt-24 pb-32 px-4 sm:px-6">
      {/* Background ambient lighting */}
      <div className="pointer-events-none fixed top-0 right-0 w-[65vw] h-[65vw] max-w-[600px] max-h-[600px] bg-[#d4af37]/15 rounded-full blur-[160px]" />
      <div className="pointer-events-none fixed bottom-0 left-0 w-[65vw] h-[65vw] max-w-[600px] max-h-[600px] bg-[#72232b]/25 rounded-full blur-[160px]" />

      <div className="relative z-10 max-w-4xl mx-auto space-y-10">
        {/* Live Altar Capacity Banner */}
        <LiveAltarStatusCapacity />

        {/* ── Virtual Sanctum Stage ── */}
        <VirtualDeepdaanSanctum />

        {/* ── Proof of Consecration Showcase ── */}
        <div className="mt-10">
          <WhatsAppProofShowcase />
        </div>
      </div>
    </main>
  );
}
