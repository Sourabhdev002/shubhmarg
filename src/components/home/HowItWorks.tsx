"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";

const steps = [
  {
    number: "01",
    title: "Share Your Details",
    description: "Offer your details and the guidance you are seeking. We approach every inquiry with confidentiality and respect.",
  },
  {
    number: "02",
    title: "Receive Personalized Guidance",
    description: "An authentic assessment of your chart or question is conducted to provide traditional insight.",
  },
  {
    number: "03",
    title: "Move Forward With Clarity",
    description: "Receive your traditional guidance and remedies. The path you walk is ultimately your own choice.",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

export default function HowItWorks() {
  return (
    <section className="bg-brand-ivory py-24 sm:py-32 relative overflow-hidden border-t border-brand-charcoal/5">
      {/* Floating lotus ornaments — desktop only */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="absolute left-[-5%] top-1/2 -translate-y-1/2 w-48 h-48 sm:w-64 sm:h-64 opacity-40 mix-blend-multiply pointer-events-none hidden md:block"
      >
        <Image src="/images/guidance/ornamental-lotus.jpg" alt="Decorative lotus ornament" fill className="object-contain" />
      </motion.div>
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
        className="absolute right-[-5%] top-1/2 -translate-y-1/2 w-48 h-48 sm:w-64 sm:h-64 opacity-40 mix-blend-multiply pointer-events-none hidden md:block"
      >
        <Image src="/images/guidance/ornamental-lotus.jpg" alt="Decorative lotus ornament" fill className="object-contain" />
      </motion.div>

      {/* Faint yantra watermark */}
      <div className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] opacity-[0.025] pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-brand-charcoal">
          <polygon points="50,5 95,95 5,95" opacity="0.5"/>
          <polygon points="50,95 5,5 95,5" opacity="0.5"/>
          <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1" fill="none" />
          <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="1" fill="none" />
          <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="1" fill="none" />
          <circle cx="50" cy="50" r="10" stroke="currentColor" strokeWidth="1" fill="none" />
        </svg>
      </div>

      <div className="mx-auto max-w-6xl px-6 lg:px-8 relative z-10">

        {/* Header */}
        <motion.div
          className="mb-16 sm:mb-24 text-center"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-[11px] sm:text-[12px] font-sans font-bold uppercase tracking-[0.25em] text-brand-gold-dark mb-4">
            THE PROCESS
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-charcoal font-serif tracking-tight">
            How It Works
          </h2>
        </motion.div>

        {/* Steps */}
        <motion.div
          className="relative mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0 }}
        >
          {/* Horizontal gold connector — desktop only */}
          <div className="hidden md:block absolute top-[2.75rem] left-[15%] right-[15%] h-[1px] bg-brand-gold/30" />

          <div className="grid gap-16 md:grid-cols-3 md:gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                variants={itemVariants}
                className="relative flex flex-col items-center text-center px-2"
              >
                {/* Vertical gold connector — mobile only */}
                {index < steps.length - 1 && (
                  <div
                    className="md:hidden absolute top-[5.5rem] left-1/2 -translate-x-1/2 w-px h-10 bg-gradient-to-b from-brand-gold/40 to-transparent"
                    aria-hidden="true"
                  />
                )}

                {/* Step Number Circle — original ivory + gold dashed ring */}
                <div className="relative mb-8 flex h-[5.5rem] w-[5.5rem] items-center justify-center rounded-full bg-brand-ivory text-2xl sm:text-3xl font-serif text-brand-charcoal border border-brand-gold/20 shadow-[0_4px_20px_-4px_rgba(212,175,55,0.15)] z-10">
                  <div className="absolute inset-1 rounded-full border border-dashed border-brand-gold/40" />
                  <span className="relative z-10 font-medium">{step.number}</span>
                </div>

                <h3 className="text-[20px] sm:text-[22px] font-bold text-brand-charcoal font-serif mb-3">
                  {step.title}
                </h3>
                <p className="leading-relaxed text-[15px] sm:text-[16px] text-brand-charcoal/75 max-w-[300px] mx-auto relative z-10">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}