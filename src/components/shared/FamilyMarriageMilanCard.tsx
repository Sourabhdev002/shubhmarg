"use client";

import React from "react";
import { Users, PhoneCall, ShieldCheck, Share2 } from "lucide-react";
import Link from "next/link";

interface FamilyMilanProps {
  partner1Name?: string;
  partner2Name?: string;
  totalScore?: number;
  verdict?: string;
  nadiScore?: number;
  bhakootScore?: number;
  ganaScore?: number;
}

export default function FamilyMarriageMilanCard({
  partner1Name = "Seeker (Var)",
  partner2Name = "Partner (Vadhu)",
  totalScore = 28,
  verdict = "Uttam (Highly Auspicious Match)",
  nadiScore = 8,
  bhakootScore = 7,
  ganaScore = 6,
}: FamilyMilanProps) {
  const p1 = partner1Name.trim() || "Groom (Var)";
  const p2 = partner2Name.trim() || "Bride (Vadhu)";

  const shareText = encodeURIComponent(
    `🙏 *ShubhMarg Vedic Kundli Milan Summary* 🙏\n\n*Var:* ${p1}\n*Vadhu:* ${p2}\n*Ashtakoot Guna Score:* ${totalScore} / 36\n*Vedic Verdict:* ${verdict}\n*Nadi Match:* ${nadiScore}/8 | *Bhakoot Match:* ${bhakootScore}/7 | *Gana Match:* ${ganaScore}/6\n\n_Consecrated under traditional Jyotish guidelines by ShubhMarg Pandit Ji._\nTo arrange a joint family discussion with Pandit Ji, please visit https://shubhmarg.com/request-guidance?service=marriage`
  );

  const whatsappShareUrl = `https://wa.me/?text=${shareText}`;

  return (
    <div className="my-8 bg-gradient-to-b from-[#20100c] via-[#2d140f] to-[#160a08] border-2 border-[#d4af37] rounded-3xl p-6 sm:p-9 shadow-2xl relative overflow-hidden">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-[#d4af37]/30">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#d4af37]/15 border border-[#B8860B]/30 px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-widest text-[#C25E10]">
          <Users className="w-4 h-4 text-[#C25E10]" />
          <span>Parent &amp; Family In-Laws Summary Mode</span>
        </div>

        <span className="text-xs font-serif text-[#C25E10] font-bold">
          ॥ शुभ विवाह गुण मिलान ॥
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Printable Parent Card Mockup */}
        <div className="lg:col-span-6 bg-[#fbf9f4] text-brand-charcoal rounded-2xl p-6 shadow-xl border border-brand-gold/30 relative">
          {/* Watermark seal */}
          <div className="text-center pb-3 border-b border-brand-charcoal/10">
            <span className="font-devanagari text-brand-maroon text-xs font-bold">शुभ मार्ग ज्योतिष कार्यालय</span>
            <h4 className="text-base font-serif font-bold text-brand-maroon mt-0.5">
              Official Ashtakoot Milan Summary
            </h4>
          </div>

          <div className="my-4 text-center">
            <p className="text-xs text-brand-charcoal/70 uppercase tracking-widest font-semibold">
              Prospective Alliance
            </p>
            <p className="text-lg font-serif font-bold text-brand-charcoal my-0.5">
              {p1} &amp; {p2}
            </p>
            <div className="inline-block px-3 py-1 bg-amber-100 border border-amber-300 rounded-full text-xs font-bold text-amber-900 mt-1">
              Guna Milan: <span className="font-mono text-sm">{totalScore} / 36</span> — {verdict}
            </div>
          </div>

          {/* Key Compatibility Pillars */}
          <div className="grid grid-cols-3 gap-2 text-center text-xs py-2 bg-brand-charcoal/5 rounded-xl border border-brand-charcoal/10 my-3">
            <div>
              <span className="text-[10px] text-brand-charcoal/60 block">Nadi (Health)</span>
              <strong className="text-brand-maroon">{nadiScore}/8</strong>
            </div>
            <div>
              <span className="text-[10px] text-brand-charcoal/60 block">Bhakoot (Love)</span>
              <strong className="text-brand-maroon">{bhakootScore}/7</strong>
            </div>
            <div>
              <span className="text-[10px] text-brand-charcoal/60 block">Gana (Nature)</span>
              <strong className="text-brand-maroon">{ganaScore}/6</strong>
            </div>
          </div>

          <p className="text-[11px] text-center text-brand-charcoal/60 italic">
            &ldquo;Prepared for family elders to evaluate spiritual harmony, longevity, and lineage growth.&rdquo;
          </p>
        </div>

        {/* Action Panel for Seekers & Parents */}
        <div className="lg:col-span-6 space-y-4">
          <div>
            <h4 className="text-xl font-bold font-serif text-[#FFFDF8] mb-1">
              Share Respectfully with Parents &amp; Arrange Family Consultation
            </h4>
            <p className="text-xs text-amber-100/80 leading-relaxed font-light">
              Indian marriage alliances require respectful alignment between both families. Share this clean summary directly with parents, or arrange a private joint family call with Pandit Ji.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            {/* 1-Tap WhatsApp Share */}
            <a
              href={whatsappShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Summary Card with Parents on WhatsApp</span>
            </a>

            {/* Joint Family Call Booking */}
            <Link
              href="/request-guidance?service=marriage"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#d4af37] via-[#e5c453] to-[#d4af37] text-black font-extrabold text-xs uppercase tracking-wider shadow-[0_4px_25px_rgba(212,175,55,0.4)] hover:brightness-110 flex items-center justify-center gap-2 transition-all"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Book Joint Family Consultation with Pandit Ji (₹1,501)</span>
            </Link>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-amber-100/80 pt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#F5A623]" />
            <span>Includes Manglik Dosha cancellation check &amp; Auspicious Wedding Muhurtas.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
