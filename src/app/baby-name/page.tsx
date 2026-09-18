import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Baby Name Consultation | ShubhMarg",
  description: "Get 5-10 auspicious baby names based on nakshatra, rashi, and Vedic numerology. ₹999.",
};

export default function BabyNamePage() {
  return (
    <main className="min-h-screen bg-brand-ivory pb-36">
      <div className="bg-gradient-to-b from-[#1a0a08] to-[#2a1210] pt-28 pb-16 px-6 text-center border-b border-brand-gold/10">
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-brand-gold/20 border border-brand-gold/30 rounded-full px-4 py-1.5 mb-5">
            <span className="text-[20px]">👶</span>
            <span className="text-[11px] font-bold text-brand-gold uppercase tracking-wider">New Service</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-serif text-white leading-tight mb-3">Baby Name Consultation</h1>
          <p className="text-white/50 text-[15px] max-w-md mx-auto mb-6">
            5-10 auspicious names based on your baby&apos;s nakshatra, rashi, and Vedic sound syllables.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="bg-white/10 border border-white/15 rounded-full px-3 py-1.5 text-[11px] text-white/70 font-medium">Nakshatra-Based</span>
            <span className="bg-white/10 border border-white/15 rounded-full px-3 py-1.5 text-[11px] text-white/70 font-medium">Rashi Matched</span>
            <span className="bg-white/10 border border-white/15 rounded-full px-3 py-1.5 text-[11px] text-white/70 font-medium">3-5 Day Delivery</span>
            <span className="bg-white/10 border border-white/15 rounded-full px-3 py-1.5 text-[11px] text-white/70 font-medium">₹999</span>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-10">
        {/* What you get */}
        <div className="bg-[#fbf9f4] border border-brand-gold/20 rounded-2xl p-6 mb-8 shadow-sm">
          <h3 className="text-[14px] font-bold text-brand-charcoal mb-4 uppercase tracking-widest">What You Receive</h3>
          <ul className="space-y-3 text-[14px] text-brand-charcoal/70">
            {["5-10 names matched to baby's nakshatra & rashi", "Meaning and significance of each name", "Lucky starting syllables from birth chart", "Gender-specific options (or unisex)", "Numerology compatibility check", "PDF delivered on WhatsApp"].map(item => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="w-4 h-4 rounded-full bg-brand-gold/15 border border-brand-gold/30 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <Link
          href="/request-guidance?service=baby-name"
          className="flex items-center justify-center gap-2 w-full bg-brand-maroon text-white font-bold text-[14px] tracking-widest uppercase py-4 rounded-full shadow-[0_4px_20px_rgba(75,21,21,0.3)] hover:bg-brand-maroon-dark active:scale-[0.98] transition-all min-h-[56px]"
        >
          Get Baby Names — ₹999 &rarr;
        </Link>
        <p className="text-center text-[11px] text-brand-charcoal/40 mt-3">Need baby&apos;s exact birth date, time, and place</p>
      </div>
    </main>
  );
}