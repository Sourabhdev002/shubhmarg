import Link from "next/link";
import { ArrowRight, Flame } from "lucide-react";
import { ctaPriceLabel } from "@/lib/service-catalog";

/**
 * Gotra Sankalp booking card shown at the top of the tool pages.
 * Honest by design: no simulated "slots left" counter or fake live indicator.
 * (Component name kept so the 23 pages that use it need no change.)
 */
interface AltarStatusProps {
  location?: string;
  ritualName?: string;
}

export default function LiveAltarStatusCapacity({
  location = "Kashi (Varanasi)",
  ritualName = "Evening Sandhya Gotra Sankalp & Shanti Path",
}: AltarStatusProps) {
  return (
    <div className="bg-[#FFFDF8] border-2 border-[#B8860B]/30 rounded-3xl p-5 sm:p-7 shadow-[0_14px_40px_-18px_rgba(107,42,20,0.25)] relative overflow-hidden">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 relative z-10">
        <div className="space-y-1.5 max-w-2xl">
          <div className="flex items-center gap-2">
            <Flame className="w-3.5 h-3.5 text-[#C25E10]" aria-hidden="true" />
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#C25E10]">
              Gotra Sankalp • {location}
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-bold font-serif text-[#2A1810]">
            {ritualName}
          </h3>

          <p className="text-xs text-[#6B5A48]">
            Pandit Ji takes your name and Gotra in a personal Sankalp, and you receive the details on WhatsApp.
          </p>
        </div>

        <Link
          href="/request-guidance?service=temple-puja"
          className="w-full lg:w-auto px-5 py-3.5 rounded-2xl bg-gradient-to-r from-[#d4af37] via-[#e5c453] to-[#d4af37] text-black font-extrabold text-xs uppercase tracking-wider shadow-[0_4px_20px_rgba(212,175,55,0.35)] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8791E]"
        >
          <span>Book Gotra Sankalp · {ctaPriceLabel("temple-puja")}</span>
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}