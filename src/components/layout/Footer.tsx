import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-brand-brown text-brand-parchment border-t-4 border-brand-maroon">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start justify-between">
          <div className="max-w-sm">
            <Link href="/" className="flex flex-col items-start group inline-block">
              <span className="font-devanagari text-brand-gold text-sm leading-none mb-1 opacity-90">शुभ मार्ग</span>
              <span className="text-3xl font-serif font-bold tracking-wide text-brand-ivory uppercase">
                ShubhMarg
              </span>
            </Link>
            <p className="mt-4 text-sm text-brand-parchment/80 leading-relaxed">
              Traditional Vedic Guidance for Modern Life. <br/>
              Personalized services with deep respect for ancient wisdom.
            </p>
          </div>

          <div className="flex flex-col md:items-end">
            <nav className="grid grid-cols-2 sm:flex sm:flex-wrap gap-x-12 gap-y-4 text-sm font-medium tracking-wide">
              <Link href="/privacy-policy" className="hover:text-brand-gold transition-colors">PRIVACY</Link>
              <Link href="/terms" className="hover:text-brand-gold transition-colors">TERMS</Link>
            </nav>
          </div>
        </div>

        <div className="mt-16 border-t border-brand-gold/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-brand-parchment/60">
          <p>
            &copy; {new Date().getFullYear()} ShubhMarg. All rights reserved.
          </p>
          <p className="text-center md:text-right max-w-xl leading-relaxed">
            Authentic traditional spiritual guidance is provided for personal reflection. Specific life outcomes can never be guaranteed. By continuing, you respect the sanctity of this platform.
          </p>
        </div>
      </div>
    </footer>
  );
}
