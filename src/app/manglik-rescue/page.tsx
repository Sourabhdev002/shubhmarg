import type { Metadata } from "next";
import ManglikRescueScanner from "@/components/astrology/ManglikRescueScanner";
import LiveAltarStatusCapacity from "@/components/shared/LiveAltarStatusCapacity";
import WhatsAppProofShowcase from "@/components/shared/WhatsAppProofShowcase";

export const metadata: Metadata = {
  title: "Manglik Dosha Marriage Rescue — 10-Point Classical Exception Scanner — ShubhMarg",
  description: "99% of Manglik diagnoses are wrong. Verify your chart against 10 classical cancellation rules from Brihat Parashara Hora Shastra with certified Pandit Ji declaration.",
};

export default function ManglikRescuePage() {
  return (
    <main className="min-h-screen bg-[#FBF6EC] text-[#2A1810] pt-24 pb-32 px-4 sm:px-6">
      <div className="pointer-events-none fixed top-0 right-0 w-[65vw] h-[65vw] max-w-[600px] max-h-[600px] bg-red-600/10 rounded-full blur-[160px]" />
      <div className="pointer-events-none fixed bottom-0 left-0 w-[65vw] h-[65vw] max-w-[600px] max-h-[600px] bg-[#d4af37]/15 rounded-full blur-[160px]" />
      <div className="relative z-10 max-w-4xl mx-auto space-y-10">
        <LiveAltarStatusCapacity />
        <ManglikRescueScanner />
        <div className="mt-10">
          <WhatsAppProofShowcase />
        </div>
      </div>
    </main>
  );
}
