import type { Metadata } from "next";
import UniversalMuhurtaFinder from "@/components/shared/UniversalMuhurtaFinder";
import LiveAltarStatusCapacity from "@/components/shared/LiveAltarStatusCapacity";
import WhatsAppProofShowcase from "@/components/shared/WhatsAppProofShowcase";

export const metadata: Metadata = {
  title: "Universal Muhurta Finder — Auspicious Timings for Every Ceremony — ShubhMarg",
  description: "Find the top 3 most auspicious Vedic dates & Choghadiya windows for Griha Pravesh, Marriage, Business Launch, Vehicle Delivery, or Surgery in the next 90 days.",
};

export default function MuhurtaFinderPage() {
  return (
    <main className="min-h-screen bg-[#FBF6EC] text-[#2A1810] pt-24 pb-32 px-4 sm:px-6">
      <div className="pointer-events-none fixed top-0 right-0 w-[65vw] h-[65vw] max-w-[600px] max-h-[600px] bg-amber-500/10 rounded-full blur-[160px]" />
      <div className="pointer-events-none fixed bottom-0 left-0 w-[65vw] h-[65vw] max-w-[600px] max-h-[600px] bg-[#d4af37]/15 rounded-full blur-[160px]" />
      <div className="relative z-10 max-w-4xl mx-auto space-y-10">
        <LiveAltarStatusCapacity />
        <UniversalMuhurtaFinder />
        <div className="mt-10">
          <WhatsAppProofShowcase />
        </div>
      </div>
    </main>
  );
}
