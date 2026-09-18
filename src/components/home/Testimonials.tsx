"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "The Kundli reading was incredibly detailed and accurate. Panditji explained everything in simple language and the remedies he suggested have genuinely helped me.",
    name: "Priya S.",
    location: "Mumbai",
    service: "Jyotish Reading",
  },
  {
    quote: "I was confused about a major career decision. The Prashna guidance gave me exactly the clarity I needed. Very professional and completely confidential.",
    name: "Rahul M.",
    location: "Bengaluru",
    service: "Prashna Consultation",
  },
  {
    quote: "We consulted for our wedding Muhurta. The dates provided were perfectly aligned and the entire process was smooth, respectful, and traditional.",
    name: "Anita & Vikram P.",
    location: "Delhi",
    service: "Muhurta Selection",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-brand-parchment py-20 sm:py-28 border-t border-brand-gold/10 overflow-hidden relative">
      {/* Faint background pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <svg className="w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
          <pattern id="vedic-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="1" fill="#D4AF37" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#vedic-grid)" />
        </svg>
      </div>

      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-gold mb-4">Testimonials</p>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-brand-charcoal">
            Words from Our Seekers
          </h2>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative bg-[#fbf9f4] rounded-2xl p-7 border border-brand-gold/20 shadow-[0_4px_20px_rgba(212,175,55,0.06)] flex flex-col"
            >
              {/* Gold top accent */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent rounded-t-2xl" />

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, s) => (
                  <svg key={s} className="w-4 h-4 text-brand-gold" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>

              {/* Quote mark */}
              <span className="text-[60px] text-brand-gold/15 font-serif leading-none -mt-4 -mb-2 select-none" aria-hidden="true">&ldquo;</span>

              <p className="text-brand-charcoal/80 text-[14px] leading-relaxed flex-1 font-sans italic">
                {t.quote}
              </p>

              <div className="mt-6 pt-5 border-t border-brand-gold/10 flex items-center justify-between">
                <div>
                  <p className="text-[14px] font-bold text-brand-charcoal font-serif">{t.name}</p>
                  <p className="text-[12px] text-brand-charcoal/50">{t.location}</p>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold bg-brand-gold/10 px-2.5 py-1 rounded-full">
                  {t.service}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}