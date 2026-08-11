import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const categories = [
  { name: "Career & Vocation", desc: "Navigate your professional path, identifying times of growth and caution.", href: "/request-guidance?service=career" },
  { name: "Business Endeavors", desc: "Insight into partnerships, expansions, and favorable timelines for enterprise.", href: "/request-guidance?service=business" },
  { name: "Marriage & Union", desc: "Compatibility assessment and guidance for harmonious relationships.", href: "/request-guidance?service=marriage" },
  { name: "Family & Kinship", desc: "Understanding familial dynamics and resolving ancestral energies.", href: "/request-guidance?service=family" },
  { name: "Education & Knowledge", desc: "Identifying favorable directions for learning and academic pursuits.", href: "/request-guidance?service=education" },
  { name: "Wealth & Prosperity", desc: "Clarity on financial decisions, investments, and wealth preservation.", href: "/request-guidance?service=finance" },
  { name: "Property & Land", desc: "Auspicious timing and considerations for real estate transactions.", href: "/request-guidance?service=property" },
  { name: "General Inquiry", desc: "A holistic overview of your current chart and planetary transits.", href: "/request-guidance?service=general" },
];

export default function GuidanceCategories() {
  return (
    <section className="bg-brand-ivory py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-brand-maroon/20 pb-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-gold-dark mb-4">
              Spheres of Life
            </p>
            <h2 className="text-4xl font-bold tracking-wide text-brand-maroon sm:text-5xl font-serif">
              Areas of Guidance
            </h2>
          </div>
          <p className="mt-6 md:mt-0 max-w-md text-lg leading-relaxed text-charcoal/80 font-serif italic text-left md:text-right">
            Find clarity through traditional astrological insight across all dimensions of your journey.
          </p>
        </div>

        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="group flex flex-col justify-center py-8 border-b border-brand-gold/20 hover:border-brand-maroon transition-colors"
              >
                <div className="flex justify-between items-center w-full">
                  <h3 className="text-2xl font-semibold text-charcoal font-serif group-hover:text-brand-maroon transition-colors">{category.name}</h3>
                  <ArrowRight className="h-5 w-5 text-brand-gold-dark opacity-50 group-hover:opacity-100 group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" />
                </div>
                <p className="mt-3 text-base text-charcoal/70 max-w-[90%] leading-relaxed">
                  {category.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
