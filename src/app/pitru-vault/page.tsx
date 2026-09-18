import type { Metadata } from "next";
import PitruTarpanVault from "@/components/shared/PitruTarpanVault";
import LiveAltarStatusCapacity from "@/components/shared/LiveAltarStatusCapacity";
import WhatsAppProofShowcase from "@/components/shared/WhatsAppProofShowcase";

export const metadata: Metadata = {
  title: "Golden Gotra Pitru Vault & Monthly Amavasya Tarpan — ShubhMarg",
  description: "Record your 3-generation ancestral lineage and generate an authentic Sanskrit Pitru Tarpan Ledger for monthly Amavasya Shanti Pujas in Varanasi.",
};

export default function PitruVaultPage() {
  return (
    <main className="min-h-screen bg-[#FBF6EC] text-[#2A1810] pt-24 pb-32 px-4 sm:px-6">
      {/* Background ambient lighting */}
      <div className="pointer-events-none fixed top-0 right-0 w-[65vw] h-[65vw] max-w-[600px] max-h-[600px] bg-[#d4af37]/15 rounded-full blur-[160px]" />
      <div className="pointer-events-none fixed bottom-0 left-0 w-[65vw] h-[65vw] max-w-[600px] max-h-[600px] bg-[#72232b]/25 rounded-full blur-[160px]" />

      <div className="relative z-10 max-w-4xl mx-auto space-y-10">
        {/* Live Altar Status Banner */}
        <LiveAltarStatusCapacity />

        {/* ── 1. Pitru Tarpan Vault Stage ── */}
        <PitruTarpanVault />

        {/* ── 2. Tangible Proof of Consecration ── */}
        <div className="mt-10">
          <WhatsAppProofShowcase />
        </div>
      </div>
    </main>
  );
}
