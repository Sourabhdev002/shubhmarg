import type { Metadata } from "next";
import VedicSoundSanctuary from "@/components/audio/VedicSoundSanctuary";
import BhajanLibrary from "@/components/audio/BhajanLibrary";
import BespokeConsecratedAudioStudio from "@/components/audio/BespokeConsecratedAudioStudio";
import LiveAltarStatusCapacity from "@/components/shared/LiveAltarStatusCapacity";
import WhatsAppProofShowcase from "@/components/shared/WhatsAppProofShowcase";

export const metadata: Metadata = {
  title: "432Hz Vedic Sound Therapy & Custom Chanting Sanctum — ShubhMarg",
  description: "Experience 432Hz solfeggio cosmic Tanpura drone therapy, Rigvedic chants, and custom Gotra Aarti, Graha Shanti and Bhajans consecrated by authentic Acharyas.",
};

export default function SoundSanctuaryPage() {
  return (
    <main className="min-h-screen bg-[#FBF6EC] text-[#2A1810] pt-24 pb-28 px-4 sm:px-6">
      {/* Ambient background lighting */}
      <div className="pointer-events-none fixed top-0 right-0 w-[60vw] h-[60vw] max-w-[500px] max-h-[500px] bg-[#d4af37]/10 rounded-full blur-[140px]" />
      <div className="pointer-events-none fixed bottom-0 left-0 w-[60vw] h-[60vw] max-w-[500px] max-h-[500px] bg-[#72232b]/20 rounded-full blur-[140px]" />

      <div className="relative z-10 max-w-5xl mx-auto space-y-12">
        {/* Live Altar Capacity Banner */}
        <LiveAltarStatusCapacity />

        {/* ── 432Hz Vedic Sound Therapy Stage ── */}
        <VedicSoundSanctuary />

        {/* ── Sacred Bhajan Library — listen to our bhajans & buy, or request custom ── */}
        <BhajanLibrary />

        {/* ── Bespoke Consecrated Audio Studio (Custom Bhajans, Gotra Aarti & Graha Shanti) ── */}
        <BespokeConsecratedAudioStudio />

        {/* ── Proof of Consecration Showcase ── */}
        <WhatsAppProofShowcase />
      </div>
    </main>
  );
}
