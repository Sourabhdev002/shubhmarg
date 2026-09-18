import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Emergency Prashna - 30 Min Reply | ShubhMarg",
  description: "Urgent Vedic answer within 30 minutes on WhatsApp. ₹499. For time-sensitive decisions.",
};

export default function EmergencyPage() {
  return (
    <main className="min-h-screen bg-brand-ivory pb-36">
      <div className="bg-gradient-to-b from-[#1a0a08] to-[#2a1210] pt-28 pb-16 px-6 text-center border-b border-brand-gold/10">
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-red-500/20 border border-red-400/30 rounded-full px-4 py-1.5 mb-5">
            <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
            <span className="text-[11px] font-bold text-red-300 uppercase tracking-wider">Urgent — 30 Min Reply</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-serif text-white leading-tight mb-3">Emergency Prashna</h1>
          <p className="text-white/50 text-[15px] max-w-md mx-auto mb-6">
            Need an answer RIGHT NOW? Get a Vedic Prashna response within 30 minutes on WhatsApp.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="bg-white/10 border border-white/15 rounded-full px-3 py-1.5 text-[11px] text-white/70 font-medium">30 Min Guaranteed</span>
            <span className="bg-white/10 border border-white/15 rounded-full px-3 py-1.5 text-[11px] text-white/70 font-medium">WhatsApp Delivery</span>
            <span className="bg-white/10 border border-white/15 rounded-full px-3 py-1.5 text-[11px] text-white/70 font-medium">No Birth Details Needed</span>
            <span className="bg-white/10 border border-white/15 rounded-full px-3 py-1.5 text-[11px] text-white/70 font-medium">₹499</span>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-10">
        {/* When to use */}
        <div className="bg-[#fbf9f4] border border-brand-gold/20 rounded-2xl p-6 mb-6 shadow-sm">
          <h3 className="text-[14px] font-bold text-brand-charcoal mb-4 uppercase tracking-widest">Best For</h3>
          <ul className="space-y-3 text-[14px] text-brand-charcoal/70">
            {["Job offer expiring today — should I accept?", "Should I sign this contract/agreement?", "Is today auspicious for starting something?", "Should I travel today or postpone?", "Quick yes/no on an urgent decision"].map(item => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="text-brand-gold shrink-0">⚡</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* How it works */}
        <div className="bg-brand-charcoal rounded-2xl p-6 mb-8 text-white">
          <h3 className="text-[14px] font-bold mb-4 uppercase tracking-widest text-brand-gold">How It Works</h3>
          <div className="space-y-4">
            <div className="flex gap-3">
              <span className="w-7 h-7 rounded-full bg-brand-gold text-[#1a0505] flex items-center justify-center text-[12px] font-black shrink-0">1</span>
              <p className="text-white/80 text-[14px]">Submit your urgent question below</p>
            </div>
            <div className="flex gap-3">
              <span className="w-7 h-7 rounded-full bg-brand-gold text-[#1a0505] flex items-center justify-center text-[12px] font-black shrink-0">2</span>
              <p className="text-white/80 text-[14px]">Pay ₹499 via UPI (link sent on WhatsApp)</p>
            </div>
            <div className="flex gap-3">
              <span className="w-7 h-7 rounded-full bg-brand-gold text-[#1a0505] flex items-center justify-center text-[12px] font-black shrink-0">3</span>
              <p className="text-white/80 text-[14px]">Receive Prashna answer within 30 minutes on WhatsApp</p>
            </div>
          </div>
        </div>

        {/* Availability */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-6 flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
          <p className="text-[13px] text-emerald-700 font-medium">
            Available now — 9 AM to 9 PM IST daily
          </p>
        </div>

        <Link
          href="/quick-answer"
          className="flex items-center justify-center gap-2 w-full bg-red-600 text-white font-bold text-[14px] tracking-widest uppercase py-4 rounded-full shadow-[0_4px_20px_rgba(220,38,38,0.3)] hover:bg-red-700 active:scale-[0.98] transition-all min-h-[56px]"
        >
          ⚡ Submit Urgent Question — ₹499 &rarr;
        </Link>
        <p className="text-center text-[11px] text-brand-charcoal/40 mt-3">Full refund if answer not delivered in 30 minutes</p>

        {/* Not urgent? */}
        <div className="mt-8 pt-6 border-t border-brand-gold/10 text-center">
          <p className="text-[13px] text-brand-charcoal/50 mb-3">Not urgent? Save money with regular Prashna</p>
          <Link href="/request-guidance?service=vedic-guidance" className="text-brand-maroon font-bold text-[12px] uppercase tracking-widest underline underline-offset-2">
            Regular Prashna — ₹501 (2-3 days) &rarr;
          </Link>
        </div>
      </div>
    </main>
  );
}