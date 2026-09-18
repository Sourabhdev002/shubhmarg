import { Metadata } from "next";
import FreeReadingForm from "@/components/guidance/FreeReadingForm";

export const metadata: Metadata = {
  title: "Free Mini Birth Chart Reading | ShubhMarg",
  description: "Get a free 3-line Vedic birth chart summary instantly. No payment required.",
};

export default function FreeReadingPage() {
  return (
    <main className="min-h-screen bg-brand-ivory pb-36">
      <div className="bg-gradient-to-b from-[#1a0a08] to-[#2a1210] pt-28 pb-16 px-6 text-center border-b border-brand-gold/10">
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-brand-gold/20 border border-brand-gold/30 rounded-full px-4 py-1.5 mb-5">
            <span className="text-[11px] font-bold text-brand-gold uppercase tracking-wider">100% Free — No Payment</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-serif text-white leading-tight mb-3">
            Free Mini Birth Chart Reading
          </h1>
          <p className="text-white/50 text-[15px] max-w-md mx-auto">
            Enter your birth details and get an instant 3-line Vedic summary of your chart — completely free.
          </p>
        </div>
      </div>

      <FreeReadingForm />
    </main>
  );
}