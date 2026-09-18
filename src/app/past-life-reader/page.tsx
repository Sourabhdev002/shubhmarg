import type { Metadata } from "next";
import PastLifeReader from "@/components/astrology/PastLifeReader";
import LiveAltarStatusCapacity from "@/components/shared/LiveAltarStatusCapacity";
import WhatsAppProofShowcase from "@/components/shared/WhatsAppProofShowcase";

export const metadata: Metadata = {
  title: "Past-Life Karmic Reader — Poorva Janma Patrika — ShubhMarg",
  description: "Discover who you were in your past life using Rahu-Ketu axis analysis. Reveal your past-life occupation, geography, unfinished karma, and this-life dharmic mission.",
};

export default function PastLifeReaderPage() {
  return (
    <main className="min-h-screen bg-[#FBF6EC] text-[#2A1810] pt-24 pb-32 px-4 sm:px-6">
      <div className="pointer-events-none fixed top-0 right-0 w-[65vw] h-[65vw] max-w-[600px] max-h-[600px] bg-purple-500/10 rounded-full blur-[160px]" />
      <div className="pointer-events-none fixed bottom-0 left-0 w-[65vw] h-[65vw] max-w-[600px] max-h-[600px] bg-indigo-500/10 rounded-full blur-[160px]" />
      <div className="relative z-10 max-w-4xl mx-auto space-y-10">
        <LiveAltarStatusCapacity />
        <PastLifeReader />
        <div className="mt-10"><WhatsAppProofShowcase /></div>
      </div>
    </main>
  );
}
