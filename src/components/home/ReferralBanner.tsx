"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function ReferralBanner() {
  return (
    <section className="bg-brand-maroon py-12 sm:py-16 overflow-hidden relative border-t border-brand-maroon-light/20">
      {/* Decorative dots */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice">
          <pattern id="rdots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="12" cy="12" r="1.5" fill="#D4AF37" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#rdots)" />
        </svg>
      </div>

      <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left"
        >
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
              <span className="text-brand-gold text-xl">🎁</span>
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-gold">Refer a Friend</p>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold font-serif text-white mb-2">
              Share the Path, Earn a Blessing
            </h3>
            <p className="text-white/60 text-[14px] max-w-lg">
              Refer a friend to ShubhMarg and when they complete their first consultation, you receive a complimentary <strong className="text-white/80">Prashna consultation</strong> — a ₹501 value, our gift to you.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href="/request-guidance"
              className="inline-flex items-center gap-2 bg-brand-gold text-[#1a0505] font-bold text-[13px] uppercase tracking-widest px-7 py-3.5 rounded-full hover:bg-brand-gold-light active:scale-[0.98] transition-all shadow-[0_4px_20px_rgba(212,175,55,0.3)] min-h-[50px] whitespace-nowrap"
              style={{ touchAction: "manipulation" }}
            >
              Start Now
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}