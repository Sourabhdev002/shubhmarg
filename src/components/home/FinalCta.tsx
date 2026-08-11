import React from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function FinalCta() {
  return (
    <section className="bg-brand-maroon py-24 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at center, #B89947 2px, transparent 2px)", backgroundSize: "48px 48px" }}></div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center mb-6">
            <Sparkles className="h-10 w-10 text-brand-gold" />
          </div>
          <h2 className="text-4xl font-bold tracking-wide text-brand-ivory sm:text-5xl font-serif leading-tight">
            Every journey begins with a question.
          </h2>
          <p className="mt-6 text-xl leading-8 text-brand-parchment/80 font-serif italic">
            Allow us to illuminate your path through authentic Vedic wisdom.
          </p>
          <div className="mt-12 flex items-center justify-center gap-x-6">
            <Link
              href="/request-guidance"
              className="inline-flex justify-center rounded-sm bg-brand-ivory px-10 py-4 text-base font-semibold tracking-wider uppercase text-brand-maroon shadow-sm hover:bg-brand-parchment transition-all border border-brand-ivory"
            >
              Begin Your Guidance
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
