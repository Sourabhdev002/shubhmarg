"use client";
import React, { useRef } from "react";
import { LotusIcon } from "@/components/icons/LotusIcon";
import { motion, useScroll, useTransform } from "framer-motion";

export default function VedicIntro() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [150, -150]);

  return (
    <section ref={containerRef} className="bg-brand-ivory py-24 md:py-40 overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_bottom_left,_var(--color-brand-parchment)_0%,_transparent_70%)] opacity-70" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-center">
          
          {/* Left Column: Heading */}
          <motion.div 
            className="md:col-span-5 md:pr-8"
            style={{ y: y1 }}
          >
            <div className="flex justify-start mb-8">
              <LotusIcon className="h-14 w-14 opacity-90" />
            </div>
            <h2 className="text-fluid-2xl leading-[1.1] font-bold tracking-tight text-brand-maroon font-serif">
              A Return to <br/>
              <span className="italic font-light text-brand-charcoal opacity-80">Authentic Wisdom</span>
            </h2>
            <div className="mt-12 flex items-center gap-x-4">
              <div className="h-[2px] w-16 bg-brand-gold/60"></div>
              <span className="text-xs font-bold tracking-[0.2em] text-brand-gold-dark uppercase">Timeless Tradition</span>
            </div>
          </motion.div>

          {/* Right Column: Body */}
          <motion.div 
            className="md:col-span-6 md:col-start-7 relative"
            style={{ y: y2 }}
          >
            <span className="absolute -top-10 -left-6 md:-left-16 text-[8rem] md:text-[12rem] text-brand-gold opacity-10 font-serif leading-none select-none" aria-hidden="true">&quot;</span>
            <p className="text-fluid-xl leading-snug md:leading-tight text-brand-charcoal/90 font-serif italic relative z-10">
              Ancient wisdom is not lost; it simply requires a guide to translate its profound truths into modern context. We connect you with authentic traditional practices to illuminate your life&apos;s path.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
