import Link from "next/link";
import { Flame } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-ivory border-b-8 border-brand-maroon flex min-h-[90vh] items-center justify-center">
      {/* Subtle background texture pattern */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at center, #6B1C23 1px, transparent 1px)", backgroundSize: "32px 32px" }}></div>
      
      {/* Signature ShubhMarg Visual Motif (Subtle Mandala Geometry) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
        <svg width="800" height="800" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-brand-maroon">
          <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.5" />
          <path d="M50 2 L50 98 M2 50 L98 50 M16 16 L84 84 M16 84 L84 16" stroke="currentColor" strokeWidth="0.25" />
          <rect x="25" y="25" width="50" height="50" stroke="currentColor" strokeWidth="0.5" transform="rotate(45 50 50)" />
          <rect x="25" y="25" width="50" height="50" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="28" stroke="currentColor" strokeWidth="0.25" strokeDasharray="1 1" />
          <circle cx="50" cy="50" r="15" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </div>
      
      <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8 text-center flex flex-col items-center z-10 w-full">
        
        <div className="mb-10">
          <h2 className="text-4xl md:text-5xl font-devanagari text-brand-saffron opacity-80 mb-4 tracking-[0.3em]">
            शुभ मार्ग
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl lg:text-[7rem] font-bold tracking-[0.15em] uppercase text-brand-maroon font-serif leading-none">
            SHUBHMARG
          </h1>

          <div className="mt-12 mb-8 inline-flex items-center gap-4 px-6 py-2">
            <Flame className="h-6 w-6 text-brand-saffron opacity-80" />
            <span className="text-lg md:text-xl font-semibold text-brand-gold-dark tracking-[0.2em] uppercase">Traditional Vedic Guidance</span>
            <Flame className="h-6 w-6 text-brand-saffron opacity-80" />
          </div>

          <p className="mx-auto mt-6 max-w-3xl text-xl md:text-2xl leading-relaxed text-charcoal/90 font-serif italic font-light">
            An authentic digital sanctuary for personalized Vedic insights,
            honoring ancient wisdom through a modern, transparent experience.
          </p>

          <div className="mt-16 flex flex-col sm:flex-row gap-6 justify-center sm:items-center">
            <Link
              href="/request-guidance"
              className="inline-flex justify-center items-center rounded-sm bg-brand-maroon px-12 py-5 text-sm md:text-base font-bold tracking-widest uppercase text-brand-ivory shadow-sm border border-brand-maroon hover:bg-brand-ivory hover:text-brand-maroon transition-colors duration-300"
            >
              Begin Your Guidance
            </Link>

            <Link
              href="/daily-horoscope"
              className="inline-flex justify-center items-center rounded-sm border border-brand-gold-dark bg-transparent px-12 py-5 text-sm md:text-base font-bold tracking-widest uppercase text-brand-gold-dark hover:bg-brand-gold/10 transition-colors duration-300"
            >
              Explore Today&apos;s Insight
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
