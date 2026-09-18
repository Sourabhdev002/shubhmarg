import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Disclaimer | ShubhMarg",
  description: "Important disclaimers regarding ShubhMarg Vedic guidance services.",
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-brand-ivory pb-nav-safe">
      <div className="pt-32 pb-16 px-6 text-center border-b border-brand-charcoal/5">
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-gold mb-5">Legal</p>
        <h1 className="text-4xl sm:text-5xl font-bold font-serif text-brand-charcoal mb-5">Disclaimer</h1>
        <p className="text-brand-charcoal/50 text-[13px]">Last updated: January 2025</p>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-16 space-y-10">
        {[
          { heading: "For Informational Purposes Only", body: "The Vedic guidance, astrological insights, and spiritual information provided through ShubhMarg are strictly for informational and spiritual purposes. Nothing on this platform constitutes professional medical, legal, financial, or psychological advice." },
          { heading: "No Guaranteed Outcomes", body: "While our practitioners apply traditional Vedic methodologies with sincerity, we do not guarantee any specific outcomes, changes, or results from the guidance provided. The path you walk is ultimately your own choice." },
          { heading: "Not a Substitute for Professional Help", body: "If you are facing a medical emergency, legal matter, financial crisis, or mental health concern, please seek appropriate professional help immediately. Vedic guidance is a complementary perspective, not a replacement for professional services." },
          { heading: "Accuracy of Information", body: "The accuracy of any consultation depends entirely on the accuracy of the information you provide. We are not responsible for any guidance that may be inaccurate due to incorrect birth details or other information submitted." },
          { heading: "External Links", body: "Our platform may contain links to external websites. We are not responsible for the content, accuracy, or practices of any third-party websites." },
        ].map(({ heading, body }) => (
          <div key={heading}>
            <h2 className="text-[18px] font-bold font-serif text-brand-charcoal mb-3">{heading}</h2>
            <p className="text-brand-charcoal/65 leading-relaxed text-[15px]">{body}</p>
          </div>
        ))}

        <div className="pt-4">
          <Link href="/" className="text-[13px] font-bold uppercase tracking-widest text-brand-maroon hover:text-brand-maroon-light transition-colors">
            &larr; Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}