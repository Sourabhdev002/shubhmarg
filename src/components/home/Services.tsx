"use client";

import Link from "next/link";
import { PersonalizedIcon } from "@/components/icons/PersonalizedIcon";
import { BusinessIcon } from "@/components/icons/BusinessIcon";
import { MarriageIcon } from "@/components/icons/MarriageIcon";
import { SunriseIcon } from "@/components/icons/SunriseIcon";
import { TrishulIcon } from "@/components/icons/TrishulIcon";
import { TraditionalIcon } from "@/components/icons/TraditionalIcon";
import { Card } from "@/components/ui/Card";
import { IconContainer } from "@/components/ui/IconContainer";

const services = [
  {
    title: "Personalized Kundli",
    description: "Understand your birth chart through traditional Vedic interpretation.",
    icon: PersonalizedIcon,
  },
  {
    title: "Career & Business",
    description: "Traditional guidance for important professional decisions and new beginnings.",
    icon: BusinessIcon,
  },
  {
    title: "Marriage & Relationships",
    description: "Explore compatibility and traditional astrological perspectives.",
    icon: MarriageIcon,
  },
  {
    title: "Muhurat",
    description: "Find traditionally auspicious timings for important occasions.",
    icon: SunriseIcon,
  },
  {
    title: "Jaap & Spiritual Services",
    description: "Traditional prayers and spiritual practices performed by genuine practitioners when available.",
    icon: TrishulIcon,
  },
  {
    title: "Traditional Remedies",
    description: "Personalized practices suggested according to traditional Vedic approaches.",
    icon: TraditionalIcon,
  },
];

export default function Services() {
  return (
    <section className="bg-brand-ivory py-24 sm:py-32 relative grain overflow-hidden border-t border-brand-gold/10">
      <div className="absolute inset-0 ambient-mesh opacity-60 pointer-events-none"></div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-saffron">
            Our Services
          </p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-brand-charcoal sm:text-5xl font-serif">
            Guidance for the moments that matter.
          </h2>
          <p className="mt-6 text-lg leading-8 text-brand-charcoal/80">
            Choose the type of guidance that best matches what you are
            currently seeking.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div key={service.title} className="h-full group relative">
              <Card className="h-full flex flex-col items-start justify-between p-8">
                <div className="flex items-center gap-4">
                  <IconContainer icon={service.icon} variant="saffron" size="md" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-brand-charcoal group-hover:text-brand-saffron transition-colors font-serif">
                  <Link href="/request-guidance" className="focus:outline-none">
                    <span className="absolute inset-0" aria-hidden="true" />
                    {service.title}
                  </Link>
                </h3>
                <p className="mt-3 leading-7 text-brand-charcoal/70 flex-grow">
                  {service.description}
                </p>
                <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-brand-saffron">
                  Learn more <span aria-hidden="true" className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

