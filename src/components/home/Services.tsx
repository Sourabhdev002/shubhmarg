import Link from "next/link";
import { Sparkles, Briefcase, Heart, Clock, Flame, Leaf } from "lucide-react";

const services = [
  {
    title: "Personalized Kundli",
    description: "Understand your birth chart through traditional Vedic interpretation.",
    icon: Sparkles,
  },
  {
    title: "Career & Business",
    description: "Traditional guidance for important professional decisions and new beginnings.",
    icon: Briefcase,
  },
  {
    title: "Marriage & Relationships",
    description: "Explore compatibility and traditional astrological perspectives.",
    icon: Heart,
  },
  {
    title: "Muhurat",
    description: "Find traditionally auspicious timings for important occasions.",
    icon: Clock,
  },
  {
    title: "Jaap & Spiritual Services",
    description: "Traditional prayers and spiritual practices performed by genuine practitioners when available.",
    icon: Flame,
  },
  {
    title: "Traditional Remedies",
    description: "Personalized practices suggested according to traditional Vedic approaches.",
    icon: Leaf,
  },
];

export default function Services() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">
            Our Services
          </p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Guidance for the moments that matter.
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Choose the type of guidance that best matches what you are
            currently seeking.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.title}
              className="group relative flex flex-col items-start justify-between rounded-2xl border border-slate-200 bg-stone-50 p-8 transition-all hover:shadow-md hover:border-amber-300 focus-within:ring-2 focus-within:ring-amber-500 focus-within:ring-offset-2"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-700 transition-colors group-hover:bg-amber-600 group-hover:text-white">
                  <service.icon className="h-6 w-6" aria-hidden="true" />
                </div>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-900 group-hover:text-amber-700 transition-colors">
                <Link href="/request-guidance" className="focus:outline-none">
                  <span className="absolute inset-0" aria-hidden="true" />
                  {service.title}
                </Link>
              </h3>
              <p className="mt-3 leading-7 text-slate-600">
                {service.description}
              </p>
              <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-amber-700">
                Learn more <span aria-hidden="true">&rarr;</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

