import type { Metadata } from "next";
import NavamshaD9SoulmateBlueprint from "@/components/astrology/NavamshaD9SoulmateBlueprint";
import LiveAltarStatusCapacity from "@/components/shared/LiveAltarStatusCapacity";
import WhatsAppProofShowcase from "@/components/shared/WhatsAppProofShowcase";

export const metadata: Metadata = {
  title: "Navamsha (D9) Soulmate & Marriage Blueprint — ShubhMarg",
  description: "Discover your soulmate's character, spiritual compatibility, and post-marriage financial destiny through classical Navamsha D9 astrology.",
};

export default function NavamshaD9Page() {
  return (
    <main className="min-h-screen bg-[#FBF6EC] text-[#2A1810] pt-24 pb-32 px-4 sm:px-6">
      {/* Background ambient lighting */}
      <div className="pointer-events-none fixed top-0 right-0 w-[65vw] h-[65vw] max-w-[600px] max-h-[600px] bg-pink-500/10 rounded-full blur-[160px]" />
      <div className="pointer-events-none fixed bottom-0 left-0 w-[65vw] h-[65vw] max-w-[600px] max-h-[600px] bg-[#d4af37]/15 rounded-full blur-[160px]" />

      <div className="relative z-10 max-w-4xl mx-auto space-y-10">
        {/* Live Altar Capacity Banner */}
        <LiveAltarStatusCapacity />

        {/* ── 1. Navamsha D9 Soulmate Stage ── */}
        <NavamshaD9SoulmateBlueprint />

        {/* ── 2. Tangible Proof of Consecration ── */}
        <div className="mt-10">
          <WhatsAppProofShowcase />
        </div>
      </div>
    </main>
  );
}
