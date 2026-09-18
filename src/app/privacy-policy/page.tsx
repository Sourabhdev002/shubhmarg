import Link from "next/link";
import { Metadata } from "next";
import { ShieldCheck, Eye, Users, BarChart3, Trash2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | ShubhMarg",
  description: "How we collect, use, and protect your information.",
};

const sections = [
  {
    icon: Eye,
    title: "What Information We Collect",
    content: "To provide personalized Vedic guidance, we collect your name, email address, and astrological details including your birth date, birth time, and birth location. This information is essential for preparing accurate traditional guidance."
  },
  {
    icon: ShieldCheck,
    title: "Why We Collect This Information",
    content: "Your details are used strictly to deliver your requested guidance and to communicate with you about your request. We do not use your information for any other purpose."
  },
  {
    icon: Users,
    title: "Who Has Access",
    content: "Your information is accessed only by our verified Vedic practitioner for the sole purpose of fulfilling your service. We do not sell your personal information to any third party.",
    highlight: "Important: Please avoid submitting sensitive personal information that you do not wish to be processed."
  },
  {
    icon: BarChart3,
    title: "Analytics and Tracking",
    content: "We may use third-party analytics tools such as Meta Pixel to understand how visitors interact with our website and to improve our services. These tools collect anonymised usage data only."
  },
  {
    icon: Trash2,
    title: "Data Deletion and Contact",
    content: "You may request correction or deletion of your data at any time. Please contact our support team with your request and we will respond within 5 business days."
  },
];

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-brand-ivory pb-36 md:pb-20">

      {/* Header */}
      <div className="bg-brand-maroon pt-32 pb-16 px-6 text-center">
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-gold mb-4">Legal</p>
        <h1 className="text-4xl sm:text-5xl font-bold font-serif text-white mb-3">Privacy Policy</h1>
        <p className="text-white/50 text-[13px]">Last updated: January 2025</p>
      </div>

      {/* Trust badge */}
      <div className="max-w-2xl mx-auto px-6 -mt-6 relative z-10">
        <div className="bg-[#fbf9f4] rounded-2xl border border-brand-gold/20 shadow-[0_8px_30px_rgba(212,175,55,0.08)] px-5 py-4 flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-brand-gold shrink-0" />
          <p className="text-[13px] text-brand-charcoal/70">
            Your data is protected and never sold. We are committed to your privacy.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-6 py-12 space-y-6">
        {sections.map(({ icon: Icon, title, content, highlight }) => (
          <div key={title} className="bg-[#fbf9f4] rounded-2xl border border-brand-gold/15 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-brand-gold" />
              </div>
              <h2 className="text-[17px] font-bold font-serif text-brand-charcoal">{title}</h2>
            </div>
            <p className="text-brand-charcoal/70 text-[14px] leading-relaxed">{content}</p>
            {highlight && (
              <div className="mt-4 flex items-start gap-2 bg-brand-saffron/5 border border-brand-saffron/20 rounded-lg px-4 py-3">
                <span className="text-brand-saffron text-[13px] font-semibold leading-relaxed">{highlight}</span>
              </div>
            )}
          </div>
        ))}

        {/* Support link */}
        <div className="rounded-2xl border border-brand-gold/20 bg-[#fbf9f4] p-6 text-center">
          <p className="text-brand-charcoal/60 text-[14px] mb-4">Have a question about your data?</p>
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