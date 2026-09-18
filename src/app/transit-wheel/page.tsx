import { Metadata } from "next";
import PlanetaryTransitWheel from "@/components/home/3d/PlanetaryTransitWheel";
import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Interactive 3D Planetary Transit Wheel (Gochara) | ShubhMarg",
  description: "Explore the live 3D Vedic Navagraha transits, planetary periods (Dasha), and Saturn Sade Sati timelines.",
};

export default function TransitWheelPage() {
  return (
    <main className="min-h-screen bg-[#FBF6EC] text-[#2A1810] pt-24 pb-28 px-4 sm:px-6">
      {/* Ambient background glow */}
      <div className="pointer-events-none fixed top-0 right-0 w-[50vw] h-[50vw] max-w-96 max-h-96 bg-[#d4af37]/10 rounded-full blur-[120px]" />
      <div className="pointer-events-none fixed bottom-0 left-0 w-[50vw] h-[50vw] max-w-96 max-h-96 bg-[#72232b]/15 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFDF8] border border-[#B8860B]/30 mb-3">
            <Sparkles className="w-4 h-4 text-[#C25E10] animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#C25E10]">
              Live 3D Navagraha Celestial Observatory
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-serif text-[#2A1810] tracking-wide mb-3">
            Planetary Transit Wheel (Gochara)
          </h1>
          <p className="text-[#6B5A48] text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Real-time astronomical mapping of the 9 Grahas across the 12 Vedic Rashis. Click any planet to reveal its astrological influence on your current Dasha.
          </p>
        </div>

        {/* 3D Wheel Container */}
        <div className="mb-10">
          <PlanetaryTransitWheel />
        </div>

        {/* Additional Transit & Sade Sati Guidance Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-[#FFFDF8] border border-[#B8860B]/20 rounded-2xl p-5">
            <div className="w-9 h-9 rounded-xl bg-[#C25E10]/10 border border-[#C25E10]/30 flex items-center justify-center mb-3">
              <Clock className="w-5 h-5 text-[#C25E10]" />
            </div>
            <h3 className="text-sm font-bold text-[#2A1810] mb-1">Saturn Sade Sati Analysis</h3>
            <p className="text-xs text-[#6B5A48] leading-relaxed mb-3">
              Understand the 7.5-year transit of Shani Dev through your 12th, 1st, and 2nd houses from Moon sign.
            </p>
            <Link
              href="/request-guidance?service=jyotish"
              className="text-[11px] font-bold text-[#C25E10] uppercase tracking-wider inline-flex items-center gap-1 hover:underline"
            >
              <span>Analyze My Sade Sati</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="bg-[#FFFDF8] border border-[#B8860B]/20 rounded-2xl p-5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center mb-3">
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>
            <h3 className="text-sm font-bold text-[#2A1810] mb-1">Jupiter (Guru) Blessing</h3>
            <p className="text-xs text-[#6B5A48] leading-relaxed mb-3">
              Jupiter&apos;s 1-year transit brings auspicious windows for marriage, career promotion, and spiritual awakening.
            </p>
            <Link
              href="/request-guidance?service=muhurta"
              className="text-[11px] font-bold text-[#C25E10] uppercase tracking-wider inline-flex items-center gap-1 hover:underline"
            >
              <span>Find Auspicious Timings</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="bg-[#FFFDF8] border border-[#B8860B]/20 rounded-2xl p-5">
            <div className="w-9 h-9 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="text-sm font-bold text-[#2A1810] mb-1">Rahu-Ketu Karmic Axis</h3>
            <p className="text-xs text-[#6B5A48] leading-relaxed mb-3">
              The nodal eclipse axis reveals your soul&apos;s karmic debts and upcoming major life transformations.
            </p>
            <Link
              href="/request-guidance?service=prashna"
              className="text-[11px] font-bold text-[#C25E10] uppercase tracking-wider inline-flex items-center gap-1 hover:underline"
            >
              <span>Ask Specific Question</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
