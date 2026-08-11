import React from "react";
import { Check } from "lucide-react";

const points = [
  "Authentic Vedic methodologies",
  "Respectful and confidential experience",
  "No exaggerated promises or guaranteed outcomes",
  "Clear explanation of traditional practices",
  "Preservation of ancient sanctity",
  "A modern, transparent digital experience",
];

export default function WhyChoose() {
  return (
    <section className="bg-brand-parchment py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:items-center lg:gap-24 lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-gold-dark">
            Our Philosophy
          </p>
          <h2 className="mt-4 text-4xl font-bold tracking-wide text-brand-maroon sm:text-5xl font-serif">
            Tradition deserves trust.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-charcoal/80 font-serif italic">
            We built ShubhMarg around authenticity, transparency, and a profound respect for the spiritual traditions we represent. We believe that true guidance empowers you rather than binding you to false promises.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
          {points.map((point) => (
            <div
              key={point}
              className="flex items-start gap-4 rounded-sm border border-brand-gold/20 bg-brand-ivory p-6 shadow-sm transition-colors hover:border-brand-gold"
            >
              <div className="flex-shrink-0 mt-1">
                <div className="h-5 w-5 rounded-full bg-brand-maroon/10 flex items-center justify-center">
                  <Check className="h-3 w-3 text-brand-maroon" strokeWidth={3} />
                </div>
              </div>
              <p className="font-medium text-charcoal leading-snug">{point}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
