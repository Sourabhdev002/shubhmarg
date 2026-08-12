import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | ShubhMarg",
  description: "How we collect, use, and protect your information.",
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-[80vh] bg-brand-ivory text-charcoal py-16 px-6">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold font-serif text-brand-maroon">Privacy Policy</h1>
        
        <div className="space-y-6 text-lg leading-relaxed font-serif">
          <section>
            <h2 className="text-2xl font-bold text-brand-maroon-dark mb-4">What Information We Collect</h2>
            <p>
              To provide personalized Vedic guidance, we collect your name, email address, and specific astrological details including your birth date, birth time, and birth location. 
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-maroon-dark mb-4">Why We Collect This Information</h2>
            <p>
              Your astrological details are essential for preparing accurate, traditional guidance and analysis. Your name and email address are used strictly to securely deliver your requested guidance and communicate regarding your request.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-maroon-dark mb-4">Who Has Access</h2>
            <p>
              Your information is accessed only by authorized ShubhMarg staff and our practitioners for the sole purpose of fulfilling your requested service. We do not sell your personal information.
            </p>
            <p className="mt-2 text-brand-saffron font-medium">
              Important: Please avoid submitting any sensitive personal information that you do not want processed.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-maroon-dark mb-4">Analytics and Tracking</h2>
            <p>
              We may use third-party tracking technologies, such as the Meta Pixel, for website analytics, conversion measurement, and advertising purposes. These tools help us understand how you interact with our website so we can improve our services and deliver relevant content.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-maroon-dark mb-4">Data Deletion and Contact</h2>
            <p>
              If you wish to have your information corrected or deleted from our records, or if you have any questions regarding how we handle your data, please contact our support team.
            </p>
            <p className="mt-4 p-4 bg-brand-parchment rounded-sm border border-brand-gold/30">
              <Link href="/support" className="text-brand-maroon hover:text-brand-maroon-dark underline font-medium">
                Click here to submit a support request
              </Link>
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
