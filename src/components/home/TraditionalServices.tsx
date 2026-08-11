import React from "react";
import { Sparkles, Moon, Sun, Star } from "lucide-react";

const services = [
  {
    title: "Kundli Analysis",
    description: "Detailed interpretation of your birth chart to understand planetary alignments. This is an analytical guidance service, providing insights based on traditional astrological principles.",
    icon: Star,
  },
  {
    title: "Muhurat Consultation",
    description: "Identification of auspicious timing for starting new ventures, ceremonies, or significant life events. This service provides timing recommendations.",
    icon: Sun,
  },
  {
    title: "Remedial Guidance",
    description: "Personalized suggestions for Vedic remedies including gemstone recommendations, specific mantras, and charitable acts (dana) designed to harmonize planetary energies.",
    icon: Moon,
  },
  {
    title: "Puja & Anushthan Arrangements",
    description: "Coordination of specific traditional rituals performed on your behalf by authenticated practitioners. These are arranged services where actual rituals are conducted.",
    icon: Sparkles,
  },
];

export default function TraditionalServices() {
  return (
    <section className="bg-brand-parchment py-24 sm:py-32 border-t border-b border-brand-gold/20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-20">
          <div className="inline-flex items-center justify-center space-x-4 mb-6">
            <div className="h-px w-8 bg-brand-gold/60"></div>
            <h2 className="text-sm font-semibold tracking-widest text-brand-gold-dark uppercase">Sacred Practices</h2>
            <div className="h-px w-8 bg-brand-gold/60"></div>
          </div>
          <h3 className="text-4xl font-bold tracking-wide text-brand-maroon sm:text-5xl font-serif">
            Traditional Vedic Services
          </h3>
          <p className="mt-6 text-xl leading-relaxed text-charcoal/80 font-serif italic">
            Rooted in authentic tradition, carefully selected for your unique journey. We clearly distinguish between astrological guidance and the arrangement of physical rituals.
          </p>
        </div>

        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className="flex flex-col sm:flex-row gap-6 items-start group">
                  <div className="flex-shrink-0 mt-1">
                    <div className="flex h-12 w-12 items-center justify-center rounded-sm border border-brand-gold/40 bg-brand-ivory group-hover:border-brand-maroon transition-colors">
                      <Icon className="h-6 w-6 text-brand-saffron" strokeWidth={1.5} />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-2xl font-semibold text-brand-maroon mb-3 font-serif">{service.title}</h4>
                    <p className="text-charcoal/85 text-base leading-relaxed">{service.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
