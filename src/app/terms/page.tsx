import Link from "next/link";

export const metadata = {
  title: "Terms of Service | ShubhMarg",
  description: "Terms and conditions for using ShubhMarg services.",
};

export default function TermsOfService() {
  return (
    <div className="min-h-[80vh] bg-brand-ivory text-charcoal py-16 px-6">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold font-serif text-brand-maroon">Terms of Service</h1>
        
        <div className="space-y-6 text-lg leading-relaxed font-serif">
          <section>
            <h2 className="text-2xl font-bold text-brand-maroon-dark mb-4">Nature of Service</h2>
            <p>
              ShubhMarg provides traditional Vedic guidance and astrological insights. Our services are strictly informational and spiritual in nature.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-maroon-dark mb-4">No Guarantees</h2>
            <p>
              We honor traditional practices, but we do not guarantee any specific spiritual, personal, or material outcomes. The insights provided should be used as perspective, and the path you walk is ultimately your own choice.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-brand-maroon-dark mb-4">Limitation of Advice</h2>
            <p>
              The guidance offered by ShubhMarg is not a substitute for professional medical, legal, financial, or psychological advice. In the event of an emergency or severe distress, please seek appropriate professional help.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-maroon-dark mb-4">Customer Responsibility</h2>
            <p>
              You are responsible for ensuring that the information you submit is accurate. We prepare guidance based on the exact details provided.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-maroon-dark mb-4">Payment & Fulfillment</h2>
            <p>
              Guidance preparation begins only after your offering (payment) has been successfully verified. If a payment fails or cannot be verified, we will attempt to notify you, but service fulfillment will be paused.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-maroon-dark mb-4">Contact</h2>
            <p>
              For support or inquiries regarding these terms, please reach out to:
            </p>
            <p className="mt-4 p-4 bg-brand-parchment rounded-sm border border-brand-gold/30">
              <strong className="text-brand-maroon">Support Email:</strong> [INSERT_SUPPORT_EMAIL]
              <br />
              <em className="text-sm text-charcoal/70">* This requires owner/legal review and setup of an official contact channel.</em>
            </p>
          </section>
        </div>

        <div className="pt-8 border-t border-brand-gold/20">
          <Link href="/" className="text-brand-gold-dark hover:text-brand-maroon font-semibold tracking-widest uppercase text-sm">
            &larr; Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
