import Link from "next/link";
import { Metadata } from "next";
import { BookOpen, AlertCircle, Scale, CreditCard, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | ShubhMarg",
  description: "Terms and conditions for using ShubhMarg services.",
};

const sections = [
  {
    icon: BookOpen,
    title: "Nature of Service",
    content: "ShubhMarg provides traditional Vedic guidance and astrological insights. Our services are strictly informational and spiritual in nature. They do not constitute professional medical, legal, financial, or psychological advice."
  },
  {
    icon: AlertCircle,
    title: "No Guarantees",
    content: "We honour traditional practices, but we do not guarantee any specific spiritual, personal, or material outcomes. The insights provided should be used as perspective. The path you walk is ultimately your own choice."
  },
  {
    icon: Scale,
    title: "Limitation of Advice",
    content: "The guidance offered by ShubhMarg is not a substitute for professional advice. In the event of an emergency or severe distress, please seek appropriate professional help immediately."
  },
  {
    icon: CreditCard,
    title: "Payment & Fulfillment",
    content: "Guidance preparation begins only after your offering (payment) has been successfully verified. If a payment fails or cannot be verified, service fulfillment will be paused until resolved."
  },
  {
    icon: Phone,
    title: "Contact",
    content: "For support or inquiries regarding these terms, please reach out to our team using the support form below."
  },
];

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-brand-ivory pb-36 md:pb-20">

      {/* Header */}
      <div className="bg-brand-maroon pt-32 pb-16 px-6 text-center">
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-gold mb-4">Legal</p>
        <h1 className="text-4xl sm:text-5xl font-bold font-serif text-white mb-3">Terms of Service</h1>
        <p className="text-white/50 text-[13px]">Last updated: January 2025</p>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-6 py-12 space-y-6">
        {sections.map(({ icon: Icon, title, content }) => (
          <div key={title} className="bg-[#fbf9f4] rounded-2xl border border-brand-gold/15 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-brand-gold" />
              </div>
              <h2 className="text-[17px] font-bold font-serif text-brand-charcoal">{title}</h2>
            </div>
            <p className="text-brand-charcoal/70 text-[14px] leading-relaxed">{content}</p>
          </div>
        ))}

        <div className="rounded-2xl border border-brand-gold/20 bg-[#fbf9f4] p-6 text-center">
          <p className="text-brand-charcoal/60 text-[14px] mb-4">Questions about these terms?</p>
          <Link href="/support" className="inline-block rounded-full bg-brand-maroon px-7 py-3 text-[12px] font-bold tracking-widest uppercase text-white hover:bg-brand-maroon-dark transition-all active:scale-[0.98]">
            Contact Support
          </Link>
        </div>

        <div className="pt-4">
          <Link href="/" className="text-[13px] font-bold uppercase tracking-widest text-brand-maroon">
            &larr; Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}