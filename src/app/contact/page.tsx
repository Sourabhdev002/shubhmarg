import { Metadata } from "next";
import Link from "next/link";
import { waLink } from "@/config/contact";

export const metadata: Metadata = {
  title: "Contact Us | ShubhMarg",
  description: "Get in touch with the ShubhMarg team.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-brand-ivory pb-nav-safe">
      <div className="pt-32 pb-16 px-6 text-center max-w-3xl mx-auto">
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-gold mb-5">Get in Touch</p>
        <h1 className="text-4xl sm:text-5xl font-bold font-serif text-brand-charcoal leading-tight mb-5">We are Here to Help</h1>
        <p className="text-brand-charcoal/60 text-lg leading-relaxed">For support with an existing request, general enquiries, or partnership opportunities.</p>
      </div>

      <div className="max-w-4xl mx-auto px-6 pb-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {/* Support */}
          <div className="relative rounded-2xl border border-brand-gold/20 bg-[#fbf9f4] p-8 shadow-[0_8px_40px_rgba(212,175,55,0.06)] overflow-hidden hover:shadow-[0_8px_40px_rgba(212,175,55,0.14)] transition-shadow">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent" />
            <div className="w-10 h-10 rounded-full border border-brand-gold/30 flex items-center justify-center mb-6 text-brand-gold">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
            </div>
            <h3 className="text-[17px] font-bold font-serif text-brand-charcoal mb-2">Help &amp; Support</h3>
            <p className="text-brand-charcoal/60 text-[14px] leading-relaxed mb-6">Questions about an existing guidance request, payment, or your Reference ID?</p>
            <Link href="/support" className="text-[13px] font-bold uppercase tracking-widest text-brand-maroon hover:text-brand-maroon-light transition-colors">
              Open Support Form &rarr;
            </Link>
          </div>

          {/* Email */}
          <div className="relative rounded-2xl border border-brand-gold/20 bg-[#fbf9f4] p-8 shadow-[0_8px_40px_rgba(212,175,55,0.06)] overflow-hidden hover:shadow-[0_8px_40px_rgba(212,175,55,0.14)] transition-shadow">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent" />
            <div className="w-10 h-10 rounded-full border border-brand-gold/30 flex items-center justify-center mb-6 text-brand-gold">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
            </div>
            <h3 className="text-[17px] font-bold font-serif text-brand-charcoal mb-2">Email Us</h3>
            <p className="text-brand-charcoal/60 text-[14px] leading-relaxed mb-6">For general enquiries, feedback, or anything not covered by our support form.</p>
            <a href="mailto:namaste@shubhmarg.com" className="text-[13px] font-bold uppercase tracking-widest text-brand-maroon hover:text-brand-maroon-light transition-colors break-all">
              namaste@shubhmarg.com
            </a>
          </div>

          {/* WhatsApp */}
          <div className="relative rounded-2xl border border-brand-gold/20 bg-[#fbf9f4] p-8 shadow-[0_8px_40px_rgba(212,175,55,0.06)] overflow-hidden hover:shadow-[0_8px_40px_rgba(212,175,55,0.14)] transition-shadow sm:col-span-2 lg:col-span-1">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent" />
            <div className="w-10 h-10 rounded-full border border-brand-gold/30 flex items-center justify-center mb-6 text-brand-gold">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" /><path d="M12.004 2.003C6.476 2.003 2 6.476 2 12.003c0 1.878.494 3.64 1.355 5.168L2 22l4.955-1.301A9.96 9.96 0 0012.004 22C17.53 22 22 17.527 22 12.003c0-5.525-4.47-10-9.996-10zm0 18.182a8.178 8.178 0 01-4.176-1.144l-.3-.178-3.096.812.826-3.015-.196-.309A8.161 8.161 0 013.818 12c0-4.513 3.672-8.185 8.186-8.185 4.512 0 8.185 3.672 8.185 8.185 0 4.513-3.673 8.185-8.185 8.185z" /></svg>
            </div>
            <h3 className="text-[17px] font-bold font-serif text-brand-charcoal mb-2">WhatsApp</h3>
            <p className="text-brand-charcoal/60 text-[14px] leading-relaxed mb-6">Reach us on WhatsApp for quicker responses to time-sensitive enquiries.</p>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="text-[13px] font-bold uppercase tracking-widest text-brand-maroon hover:text-brand-maroon-light transition-colors">
              Message on WhatsApp &rarr;
            </a>
          </div>
        </div>
        <p className="text-center text-brand-charcoal/40 text-[13px] mt-10 tracking-wide">
          We typically respond within 1-2 business days. For urgent matters, WhatsApp is fastest.
        </p>
      </div>
    </div>
  );
}
