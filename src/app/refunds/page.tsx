import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Refund Policy | ShubhMarg",
  description: "ShubhMarg refund and cancellation policy for Vedic guidance services.",
};

const sections = [
  { heading: "Nature of Service", body: "ShubhMarg facilitates traditional Vedic guidance services delivered by human practitioners. Because each consultation involves dedicated time, effort, and expertise, dakshinaa (service fees) are generally non-refundable once work has commenced." },
  { heading: "Eligibility for Refund", body: "A full refund will be issued if: (a) your request was submitted but dakshinaa was not successfully received by us; (b) we are unable to assign a suitable practitioner within 10 business days of confirmed payment; (c) there was a duplicate or erroneous payment on the same Reference ID." },
  { heading: "No Refund Situations", body: "Refunds will not be issued once the practitioner has commenced work on your request, regardless of whether you agree with the guidance provided. Traditional Vedic sciences involve sincere time and study — we ask that you honour this before submitting a request." },
  { heading: "Cancellation Before Work Commences", body: "If you wish to cancel your request and work has not yet begun, contact us within 24 hours of payment using your Reference ID. We will review the case and process eligible refunds within 5-7 business days to your original payment method." },
  { heading: "How to Raise a Refund Request", body: "To initiate a refund or cancellation, please use our Support form with your Reference ID and the reason for your request. Our team will respond within 2 business days." },
  { heading: "Disputes", body: "We aim to resolve every concern amicably. If you are unsatisfied with how your request was handled, please contact us before raising a dispute with your payment provider. We are committed to fair resolution." },
];

export default function RefundsPage() {
  return (
    <div className="min-h-screen bg-brand-ivory pb-nav-safe">
      <div className="pt-32 pb-16 px-6 text-center border-b border-brand-charcoal/5">
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-gold mb-5">Policies</p>
        <h1 className="text-4xl sm:text-5xl font-bold font-serif text-brand-charcoal mb-5">Refund Policy</h1>
        <p className="text-brand-charcoal/50 text-[13px] max-w-md mx-auto">Last updated: January 2025</p>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-16 space-y-10">
        {sections.map(({ heading, body }) => (
          <div key={heading}>
            <h2 className="text-[18px] font-bold font-serif text-brand-charcoal mb-3">{heading}</h2>
            <p className="text-brand-charcoal/65 leading-relaxed text-[15px]">{body}</p>
          </div>
        ))}

        <div className="flex items-center gap-4 py-4">
          <div className="flex-1 h-px bg-brand-gold/15" />
          <span className="text-brand-gold text-lg">&#10022;</span>
          <div className="flex-1 h-px bg-brand-gold/15" />
        </div>

        <div className="rounded-2xl border border-brand-gold/20 bg-[#fbf9f4] p-8 text-center shadow-[0_8px_40px_rgba(212,175,55,0.06)] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent" />
          <h3 className="text-[18px] font-bold font-serif text-brand-charcoal mb-3">Have a Question?</h3>
          <p className="text-brand-charcoal/60 text-[14px] mb-6">Our support team is here to help with any concerns about your request or payment.</p>
          <Link href="/support" className="inline-block rounded-full bg-brand-maroon px-8 py-3 text-[12px] font-bold tracking-widest uppercase text-white shadow-sm hover:bg-brand-maroon-dark transition-all active:scale-[0.98]">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}