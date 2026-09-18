import type { Metadata } from "next";
import EmergencyGrahaShantiSOS from "@/components/shared/EmergencyGrahaShantiSOS";
import LiveAltarStatusCapacity from "@/components/shared/LiveAltarStatusCapacity";

export const metadata: Metadata = {
  title: "🚨 Emergency Graha Shanti SOS — Instant Planetary Crisis Intervention — ShubhMarg",
  description: "Select your life crisis (health, legal, financial, relationship) and receive an instant 60-second Vedic Kavach Protocol with emergency mantras, directions, and Pandit Ji's 30-min hotline.",
};

export default function GrahaSosPage() {
  return (
    <main className="min-h-screen bg-[#FBF6EC] text-[#2A1810] pt-24 pb-32 px-4 sm:px-6">
      <div className="pointer-events-none fixed top-0 right-0 w-[65vw] h-[65vw] max-w-[600px] max-h-[600px] bg-red-600/10 rounded-full blur-[160px]" />
      <div className="pointer-events-none fixed bottom-0 left-0 w-[65vw] h-[65vw] max-w-[600px] max-h-[600px] bg-amber-600/10 rounded-full blur-[160px]" />
      <div className="relative z-10 max-w-4xl mx-auto space-y-10">
        <LiveAltarStatusCapacity />
        <EmergencyGrahaShantiSOS />
      </div>
    </main>
  );
}
