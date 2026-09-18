import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Daily Horoscope | ShubhMarg",
  description: "Daily Vedic horoscope and panchang insights from ShubhMarg.",
  robots: { index: false, follow: true },
};

export default function DailyHoroscopePage() {
  return (
    <div className="min-h-screen bg-brand-ivory pb-nav-safe">
      <div className="pt-32 pb-16 px-6 text-center max-w-2xl mx-auto">
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-gold mb-5">Coming Soon</p>
        <h1 className="text-4xl sm:text-5xl font-bold font-serif text-brand-charcoal leading-tight mb-6">Daily Horoscope</h1>
        <p className="text-brand-charcoal/60 text-lg leading-relaxed mb-10">
          We are preparing authentic daily Vedic insights, panchang details, and auspicious timing for each day. This section will be available very soon.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/shubh-calendar" className="inline-block rounded-full bg-brand-maroon px-8 py-4 text-sm font-bold tracking-widest uppercase text-white shadow-md hover:bg-brand-maroon-dark transition-all active:scale-[0.98]">
            View Shubh Calendar
          </Link>
          <Link href="/" className="inline-block rounded-full border border-brand-gold/30 px-8 py-4 text-sm font-bold tracking-widest uppercase text-brand-charcoal hover:bg-brand-gold/10 transition-all active:scale-[0.98]">
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}