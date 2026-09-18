import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us | ShubhMarg",
  description: "ShubhMarg connects you with authentic Vedic practitioners for traditional guidance rooted in India's timeless wisdom.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-brand-ivory pb-nav-safe">

      {/* Hero */}
      <div className="relative overflow-hidden bg-brand-maroon pt-32 pb-24 px-6 text-center">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.06]">
          <svg viewBox="0 0 100 100" className="w-[500px] h-[500px] fill-none stroke-[#d4af37]" strokeWidth="0.5">
            <polygon points="50,5 95,95 5,95" /><polygon points="50,95 5,5 95,5" />
            <circle cx="50" cy="50" r="40" /><circle cx="50" cy="50" r="28" /><circle cx="50" cy="50" r="15" />
          </svg>
        </div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#d4af37] mb-5">Our Story</p>
          <h1 className="text-4xl sm:text-5xl font-bold font-serif text-white leading-tight mb-6">
            Rooted in Tradition,<br className="hidden sm:block" /> Built for Today
          </h1>
          <p className="text-white/70 text-lg font-light leading-relaxed max-w-2xl mx-auto">
            ShubhMarg was founded to make authentic Vedic wisdom accessible — not watered-down, not commercialised, but genuine traditional guidance from practitioners who have studied these sciences for decades.
          </p>
        </div>
      </div>

      {/* Mission */}
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="grid gap-12 md:grid-cols-2 items-center">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-gold mb-4">Our Mission</p>
            <h2 className="text-3xl font-bold font-serif text-brand-charcoal leading-snug mb-6">Clarity on the Path Forward</h2>
            <p className="text-brand-charcoal/70 leading-relaxed mb-4">
              We believe every person deserves access to genuine Vedic counsel — Jyotish, Vastu, Muhurta, and Prashna — without mysticism or vagueness. Our practitioners bring years of authentic study to each consultation.
            </p>
            <p className="text-brand-charcoal/70 leading-relaxed">
              Every guidance request on ShubhMarg is handled with confidentiality, respect, and a commitment to the traditional texts these sciences are drawn from.
            </p>
          </div>
          <div className="relative rounded-2xl border border-brand-gold/20 bg-[#fbf9f4] p-10 shadow-[0_8px_40px_rgba(212,175,55,0.08)] overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent" />
            <div className="space-y-6">
              {[
                { label: "Founded", value: "2024" },
                { label: "Services", value: "Jyotish · Vastu · Muhurta · Prashna" },
                { label: "Languages", value: "Hindi & English" },
                { label: "Reach", value: "India & Global Diaspora" },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-baseline border-b border-brand-gold/10 pb-4 last:border-0 last:pb-0">
                  <span className="text-[12px] font-bold uppercase tracking-widest text-brand-charcoal/40">{label}</span>
                  <span className="text-[14px] font-semibold text-brand-charcoal text-right">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="bg-brand-charcoal py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-gold mb-4 text-center">Our Values</p>
          <h2 className="text-3xl font-bold font-serif text-white text-center mb-14">What We Stand For</h2>
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              { title: "Authenticity", description: "We work only with practitioners trained in traditional lineages — no shortcuts, no diluted interpretations." },
              { title: "Confidentiality", description: "Every inquiry is handled with complete privacy. Your details are never shared outside the consultation." },
              { title: "Respect", description: "We approach each person's situation without judgment, honouring the sensitivity of the guidance being sought." },
            ].map(({ title, description }) => (
              <div key={title} className="rounded-xl border border-brand-gold/10 bg-white/5 p-7">
                <div className="w-8 h-[2px] bg-brand-gold mb-5" />
                <h3 className="text-[18px] font-bold font-serif text-white mb-3">{title}</h3>
                <p className="text-white/60 text-[14px] leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-bold font-serif text-brand-charcoal mb-4">Ready to Begin?</h2>
        <p className="text-brand-charcoal/60 mb-10 text-lg">Submit your request and receive authentic Vedic guidance within 3-5 business days.</p>
        <Link href="/request-guidance" className="inline-block rounded-full bg-brand-maroon px-10 py-4 text-sm font-bold tracking-widest uppercase text-white shadow-md hover:bg-brand-maroon-dark transition-all active:scale-[0.98]">
          Request Guidance
        </Link>
      </div>
    </div>
  );
}