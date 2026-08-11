import React from "react";
import { Sun } from "lucide-react";

export default function VedicIntro() {
  return (
    <section className="bg-brand-parchment py-24 sm:py-32 overflow-hidden border-b border-brand-gold/20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center mb-6">
            <Sun className="h-12 w-12 text-brand-saffron opacity-80" />
          </div>
          <h2 className="text-3xl font-bold tracking-wide text-brand-maroon sm:text-4xl font-serif">
            A Return to Authentic Wisdom
          </h2>
          <div className="mt-8 relative">
            <span className="absolute -top-4 -left-4 text-6xl text-brand-gold opacity-20 font-serif">&quot;</span>
            <p className="text-xl leading-8 text-charcoal/80 font-serif italic relative z-10 px-6">
              Ancient wisdom is not lost; it simply requires a guide to translate its profound truths into modern context. We connect you with authentic traditional practices to illuminate your life&apos;s path.
            </p>
            <span className="absolute -bottom-8 -right-4 text-6xl text-brand-gold opacity-20 font-serif">&quot;</span>
          </div>
          <div className="mt-12 flex items-center justify-center gap-x-4">
            <div className="h-px w-16 bg-brand-gold/40"></div>
            <span className="text-sm font-semibold tracking-widest text-brand-gold-dark uppercase">Timeless Tradition</span>
            <div className="h-px w-16 bg-brand-gold/40"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
