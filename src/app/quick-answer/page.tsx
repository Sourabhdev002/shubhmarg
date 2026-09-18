import { Metadata } from "next";
import QuickAnswerForm from "@/components/guidance/QuickAnswerForm";

export const metadata: Metadata = {
  title: "Quick Answer in 1 Hour | ShubhMarg",
  description: "Get a yes/no Vedic answer to one question within 1 hour via WhatsApp. Only ₹99.",
};

export default function QuickAnswerPage() {
  return (
    <main className="min-h-screen bg-brand-ivory pb-36">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#1a0a08] to-[#2a1210] pt-28 pb-16 px-6 text-center border-b border-brand-gold/10">
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 rounded-full px-4 py-1.5 mb-5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider">Available Now - Reply in 1 Hour</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-serif text-white leading-tight mb-3">
            Quick Answer — ₹99
          </h1>
          <p className="text-white/50 text-[15px] max-w-md mx-auto">
            One question. One clear answer. Delivered on WhatsApp within 1 hour.
          </p>
        </div>
      </div>

      {/* How it works strip */}
      <div className="max-w-lg mx-auto px-4 -mt-5 relative z-10">
        <div className="bg-[#fbf9f4] border border-brand-gold/20 rounded-2xl p-5 shadow-[0_8px_30px_rgba(212,175,55,0.08)] grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-[22px] font-bold text-brand-maroon font-serif">1</p>
            <p className="text-[11px] text-brand-charcoal/50 font-medium">Ask your question</p>
          </div>
          <div>
            <p className="text-[22px] font-bold text-brand-maroon font-serif">2</p>
            <p className="text-[11px] text-brand-charcoal/50 font-medium">Pay ₹99</p>
          </div>
          <div>
            <p className="text-[22px] font-bold text-brand-maroon font-serif">3</p>
            <p className="text-[11px] text-brand-charcoal/50 font-medium">Answer on WhatsApp</p>
          </div>
        </div>
      </div>

      <QuickAnswerForm />
    </main>
  );
}