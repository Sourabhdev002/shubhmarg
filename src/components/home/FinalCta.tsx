"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { motion } from "framer-motion";

export default function FinalCta() {
  return (
    <section className="bg-[#2a0808] relative overflow-hidden flex items-center min-h-[400px] md:min-h-[360px] lg:min-h-[380px] w-full border-t border-b border-[#3d1515]">
      
      {/* Subtle Vedic mandala patterns at edges (simulated via CSS radial gradients & SVG shapes) */}
      <div className="absolute top-[-50%] left-[-10%] w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)] rounded-full mix-blend-screen pointer-events-none" aria-hidden="true" />
      <div className="absolute top-[-50%] right-[-10%] w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)] rounded-full mix-blend-screen pointer-events-none" aria-hidden="true" />

      {/* Decorative Mandala SVG - Left */}
      <div className="absolute top-[-20%] left-[-5%] opacity-[0.03] pointer-events-none z-0 w-[400px] h-[400px]">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-[#D4AF37]">
          <path d="M50 0 C60 20 80 40 100 50 C80 60 60 80 50 100 C40 80 20 60 0 50 C20 40 40 20 50 0 Z" />
          <circle cx="50" cy="50" r="30" stroke="#D4AF37" strokeWidth="2" fill="none" />
          <circle cx="50" cy="50" r="40" stroke="#D4AF37" strokeWidth="1" strokeDasharray="2,2" fill="none" />
        </svg>
      </div>

      {/* Decorative Mandala SVG - Right */}
      <div className="absolute top-[-20%] right-[-5%] opacity-[0.03] pointer-events-none z-0 w-[400px] h-[400px]">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-[#D4AF37]">
          <path d="M50 0 C60 20 80 40 100 50 C80 60 60 80 50 100 C40 80 20 60 0 50 C20 40 40 20 50 0 Z" />
          <circle cx="50" cy="50" r="30" stroke="#D4AF37" strokeWidth="2" fill="none" />
          <circle cx="50" cy="50" r="40" stroke="#D4AF37" strokeWidth="1" strokeDasharray="2,2" fill="none" />
        </svg>
      </div>

      {/* Background rich gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(74,21,21,0.6)_0%,transparent_80%)] pointer-events-none z-0" aria-hidden="true" />
      
      {/* Left Artwork: Lotus & Diya */}
      <motion.div 
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="absolute left-[-15%] sm:left-[-10%] md:left-[-5%] lg:left-[0%] xl:left-[5%] bottom-[-10%] w-[350px] h-[350px] md:w-[450px] md:h-[450px] lg:w-[550px] lg:h-[550px] opacity-20 md:opacity-100 pointer-events-none z-10"
      >
        <div className="relative w-full h-full [mask-image:radial-gradient(circle_at_center,black_40%,transparent_70%)] [-webkit-mask-image:radial-gradient(circle_at_center,black_40%,transparent_70%)] mix-blend-lighten">
          <Image 
            src="/images/guidance/cta-lotus.jpg" 
            alt="Lotus and Diya" 
            fill 
            className="object-cover" 
            priority
          />
        </div>
      </motion.div>

      {/* Right Artwork: Incense & Scripture */}
      <motion.div 
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 }}
        className="absolute right-[-15%] sm:right-[-10%] md:right-[-5%] lg:right-[0%] xl:right-[5%] bottom-[-10%] w-[350px] h-[350px] md:w-[450px] md:h-[450px] lg:w-[550px] lg:h-[550px] opacity-20 md:opacity-100 pointer-events-none z-10"
      >
        <div className="relative w-full h-full [mask-image:radial-gradient(circle_at_center,black_40%,transparent_70%)] [-webkit-mask-image:radial-gradient(circle_at_center,black_40%,transparent_70%)] mix-blend-lighten">
          <Image 
            src="/images/guidance/cta-incense.jpg" 
            alt="Incense and Scripture" 
            fill 
            className="object-cover" 
            priority
          />
        </div>
      </motion.div>

      {/* Main CTA Content */}
      <div className="mx-auto max-w-7xl px-6 relative z-20 w-full flex flex-col items-center justify-center py-16 md:py-0">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-xl text-center bg-[#2a0808]/40 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none p-6 md:p-0 rounded-2xl md:rounded-none"
        >
          <h2 className="text-[28px] md:text-[34px] lg:text-[40px] font-bold tracking-tight text-white font-serif leading-[1.2] drop-shadow-lg mb-2">
            Looking for personalized guidance?
          </h2>
          
          {/* Subtle gold separator line with diamond */}
          <div className="flex items-center justify-center my-4 md:my-5 gap-3">
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#cba358]" />
            <div className="w-2.5 h-2.5 rotate-45 border-[1px] border-[#cba358] bg-transparent" />
            <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#cba358]" />
          </div>

          <p className="text-[15px] md:text-[17px] leading-relaxed text-[#f4e8d3] drop-shadow-md mb-8 md:mb-10 font-medium">
            Share what you are looking for and begin your consultation request.
          </p>

          <div className="flex justify-center">
            <Button
              href="/request-guidance"
              className="bg-gradient-to-b from-[#ca9d42] to-[#b38024] hover:from-[#dabb5d] hover:to-[#c28f30] text-white font-bold tracking-[0.08em] uppercase text-[13px] md:text-[14px] px-8 md:px-10 py-4 md:py-5 rounded-full shadow-[0_0_20px_rgba(202,157,66,0.3)] hover:shadow-[0_0_25px_rgba(202,157,66,0.5)] transition-all duration-300 border border-[#e8cc83]/50 inline-flex items-center gap-2 group"
            >
              GET PERSONALIZED GUIDANCE
              <span className="text-[16px] group-hover:translate-x-1 transition-transform duration-300">&rarr;</span>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
