import { Metadata } from "next";
import GuidanceRequestForm from "@/components/guidance/GuidanceRequestForm";
import { ShieldCheck, Lock, Clock, Sparkles, MessageCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import WhatsAppProofShowcase from "@/components/shared/WhatsAppProofShowcase";
import { ShubhMargEmblem } from "@/components/brand/ShubhMargLogo";
import GlobalDeskBadge from "@/components/shared/GlobalDeskBadge";
import { waLink } from "@/config/contact";
import GuidancePageTracker from "@/components/analytics/GuidancePageTracker";

export const metadata: Metadata = {
  title: "Request Guidance | ShubhMarg",
  description: "Request personalized Vedic guidance and traditional spiritual services.",
};

export default function RequestGuidancePage() {
  const whatsappUrl = waLink("Namaste Pandit Ji 🙏 I would like to directly request guidance for Personalized Vedic Consultation. Please share details for Gotra Sankalp.");

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#FFFDF8] via-[#FAF5EC] to-[#F5EAD6] pb-32">
      <GuidancePageTracker />
      {/* Hero Header — Royal Kashi Astrological Atelier Aesthetic */}
      <div className="relative overflow-hidden pt-24 pb-8 sm:pt-28 sm:pb-10 border-b border-[#D4AF37]/20 bg-gradient-to-b from-[#FFFDF9] via-[#FAF4E8] to-[#F5EAD6]">
        
        {/* Radiant Diya Sunburst Aura */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(212,175,55,0.14)_0%,rgba(194,94,16,0.05)_45%,transparent_70%)] pointer-events-none" />

        {/* Decorative Sacred Yantra with gentle aura */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[540px] h-[540px] opacity-[0.07] pointer-events-none">
          <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-[#8B1A1A]" strokeWidth="0.4">
            <polygon points="50,5 95,72 5,72" /><polygon points="50,95 5,28 95,28" />
            <circle cx="50" cy="50" r="40" /><circle cx="50" cy="50" r="28" /><circle cx="50" cy="50" r="15" />
          </svg>
        </div>

        <div className="mx-auto max-w-3xl px-4 text-center relative z-10">
          {/* Sacred Sanskrit Invocation */}
          <p className="text-[11px] sm:text-xs font-serif tracking-[0.25em] text-[#8B1A1A] mb-2 font-bold select-none">
            ॥ ॐ श्री गणेशाय नमः • ॐ श्री गुरवे नमः ॥
          </p>

          {/* Royal Seal Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/15 via-white/90 to-amber-500/15 border border-[#D4AF37]/45 shadow-xs mb-3">
            <ShubhMargEmblem size={18} />
            <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#C25E10]">
              Personalized Jyotish Guidance
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#2A1810] font-serif leading-tight">
            Consult Our Verified{" "}
            <span className="bg-gradient-to-r from-[#8B1A1A] via-[#C25E10] to-[#701313] bg-clip-text text-transparent">
              Vedic Acharya
            </span>
          </h1>

          <p className="mt-2 text-xs sm:text-sm text-[#6B5A48] max-w-lg mx-auto leading-relaxed">
            Direct Vedic guidance individually charted by our verified Kashi practitioner. Delivered as an authentic <strong className="text-[#2A1810] font-semibold">Studio Audio Dossier (MP3)</strong> and <strong className="text-[#2A1810] font-semibold">Certified PDF Report</strong>.
          </p>

          {/* Unified VIP Concierge & Trust Strip (Replaces bulky stacked cards) */}
          <div className="mt-4 max-w-xl mx-auto rounded-2xl bg-white/90 backdrop-blur-md border border-[#D4AF37]/40 p-3 sm:p-3.5 shadow-[0_6px_20px_rgba(212,175,55,0.12)]">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5">
              <div className="flex items-center gap-2.5 text-left">
                <div className="w-8 h-8 rounded-xl bg-emerald-600/10 border border-emerald-600/25 flex items-center justify-center text-emerald-700 shrink-0">
                  <MessageCircle className="w-4 h-4 fill-emerald-600/15" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wide">
                      Instant WhatsApp Concierge
                    </span>
                  </div>
                  <p className="text-[11px] text-[#6B5A48]">
                    Prefer 1-tap chat over form? Message Pandit Ji&apos;s desk directly.
                  </p>
                  <div className="mt-1.5">
                    <GlobalDeskBadge variant="light" />
                  </div>
                </div>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-bold text-xs shadow-xs hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 shrink-0"
              >
                <span>Chat on WhatsApp</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Micro Trust Guarantee Bar */}
            <div className="mt-2.5 pt-2 border-t border-[#D4AF37]/20 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-[10px] text-[#6B5A48]">
              <span className="flex items-center gap-1 font-semibold text-[#2A1810]">
                <Lock className="w-3 h-3 text-[#C25E10]" /> 100% Confidential
              </span>
              <span className="text-[#D4AF37]/70">•</span>
              <span className="flex items-center gap-1 font-semibold text-[#2A1810]">
                <Clock className="w-3 h-3 text-[#C25E10]" /> 2-3 Day Turnaround
              </span>
              <span className="text-[#D4AF37]/70">•</span>
              <span className="flex items-center gap-1 font-semibold text-[#2A1810]">
                <ShieldCheck className="w-3 h-3 text-emerald-700" /> Sacred Money-Back Guarantee
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Main Luxury Atelier Form */}
      <div className="relative z-10 -mt-2">
        <GuidanceRequestForm />
      </div>

      {/* What You Receive on WhatsApp (Collapsible / Compact Atelier Proof) */}
      <div className="max-w-xl mx-auto px-4 mt-6 mb-8">
        <WhatsAppProofShowcase />
      </div>

      {/* Sacred Discretion & Refund Oath */}
      <div className="max-w-xl mx-auto px-4 text-center">
        <p className="text-[11px] text-[#6B5A48]/80 leading-relaxed">
          Your sacred details are encrypted and shared exclusively with our verified practitioner.{" "}
          <Link href="/privacy-policy" className="text-[#8B1A1A] underline underline-offset-2 font-semibold hover:text-[#550A0A]">
            Privacy Charter
          </Link>
          {" "}•{" "}
          <Link href="/refunds" className="text-[#8B1A1A] underline underline-offset-2 font-semibold hover:text-[#550A0A]">
            Sacred Refund Policy
          </Link>
        </p>
      </div>
    </main>
  );
}