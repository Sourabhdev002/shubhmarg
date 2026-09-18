"use client";

import React from "react";
import { NakshatraIcon } from "@/components/icons/NakshatraIcon";
import { SunriseIcon } from "@/components/icons/SunriseIcon";
import { LunarMonthIcon } from "@/components/icons/LunarMonthIcon";
import { FestivalIcon } from "@/components/icons/FestivalIcon";
import { Card } from "@/components/ui/Card";

const services = [
  {
    title: "Kundli Analysis",
    description: "Detailed interpretation of your birth chart to understand planetary alignments. This is an analytical guidance service, providing insights based on traditional astrological principles.",
    icon: NakshatraIcon,
  },
  {
    title: "Muhurat Consultation",
    description: "Identification of auspicious timing for starting new ventures, ceremonies, or significant life events. This service provides timing recommendations.",
    icon: SunriseIcon,
  },
  {
    title: "Remedial Guidance",
    description: "Personalized suggestions for Vedic remedies including gemstone recommendations, specific mantras, and charitable acts (dana) designed to harmonize planetary energies.",
    icon: LunarMonthIcon,
  },
  {
    title: "Puja & Anushthan Arrangements",
    description: "Coordination of specific traditional rituals performed on your behalf by authenticated practitioners. These are arranged services where actual rituals are conducted.",
    icon: FestivalIcon,
  },
];

export default function TraditionalServices() {
  return (
    <section className="bg-brand-ivory py-24 sm:py-32 border-t border-b border-brand-gold/10 overflow-hidden relative">
      <div className="absolute inset-0 ambient-mesh opacity-80 pointer-events-none"></div>
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-2xl lg:text-center mb-16">
          <h2 className="text-base font-semibold leading-7 text-brand-saffron tracking-wider uppercase">
            Vedic Services
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-brand-charcoal sm:text-4xl font-serif">
            Authentic Jyotish for Modern Challenges
          </p>
          <p className="mt-4 text-lg leading-8 text-brand-charcoal/80">
            Our practitioners use time-honored traditional techniques to analyze your charts and offer actionable remedies.
          </p>
        </div>

        <div
          className="mx-auto max-w-5xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className="h-full group">
                  <Card className="h-full flex flex-col sm:flex-row gap-6 items-start p-6 border-brand-gold/25 hover:border-brand-maroon/25 transition-colors">
                    <div className="flex-shrink-0 mt-1">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-parchment text-brand-maroon/80 group-hover:bg-brand-maroon group-hover:text-brand-ivory transition-colors shadow-sm">
                        <Icon className="h-6 w-6" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-charcoal mb-3 font-serif group-hover:text-brand-maroon transition-colors">
                        {service.title}
                      </h4>
                      <p className="text-brand-charcoal/70 text-sm leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
