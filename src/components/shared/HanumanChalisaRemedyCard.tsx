import Link from "next/link";
import { ArrowRight, Headphones } from "lucide-react";

/**
 * HanumanChalisaRemedyCard — a calm, free remedy card that points to /hanuman-chalisa.
 * The Chalisa is the classical remedy for Shani (Sade Sati) and Mangal (Manglik) dosha,
 * so this sits on those pages as a gentle, no-cost next step.
 * Temple aesthetic: temple-white card, saffron accent, gold border, dark ink text.
 */
export default function HanumanChalisaRemedyCard({
  dosha,
  className = "",
}: {
  /** Which dosha this page is about, used in the subline. */
  dosha: "shani" | "mangal";
  className?: string;
}) {
  const subline =
    dosha === "shani"
      ? "Hanuman ji ki kripa se Shani ka prabhav shant hota hai. Shanivar ko paath karein."
      : "Mangal dosha ki shanti ke liye Mangalvar ko Hanuman Chalisa ka paath karein.";

  return (
    <Link
      href="/hanuman-chalisa"
      className={`group lift-on-hover flex items-center gap-4 rounded-3xl bg-[#FFFDF8] border border-[#B8860B]/30 px-5 py-4 sm:px-6 sm:py-5 shadow-[0_6px_24px_-12px_rgba(184,134,11,0.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8791E] ${className}`}
    >
      <span
        aria-hidden="true"
        className="shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#E8791E] to-[#F5A623] ring-2 ring-[#D4A537]/50 flex items-center justify-center text-white text-xl font-bold"
      >
        ॐ
      </span>
      <span className="flex-1 min-w-0">
        <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#C25E10]">
          Free remedy
        </span>
        <span className="block text-base sm:text-lg font-bold font-serif text-[#2A1810] leading-snug">
          Shri Hanuman Chalisa, with audio
        </span>
        <span className="block text-xs sm:text-[13px] text-[#6B5A48] leading-relaxed mt-0.5">{subline}</span>
      </span>
      <span className="shrink-0 flex items-center gap-1 text-[#C25E10] text-sm font-bold">
        <Headphones className="w-4 h-4" aria-hidden="true" />
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </span>
    </Link>
  );
}
