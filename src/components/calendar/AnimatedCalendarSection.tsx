"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

export function AnimatedCalendarContainer({ children }: { children: React.ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleViewportEnter = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      // Auto-slide to the right card on mobile after it has been seen for 2 seconds
      setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTo({
            left: scrollRef.current.clientWidth * 0.85,
            behavior: "smooth"
          });
        }
      }, 2000);
    }
  };

  return (
    <section className="bg-brand-ivory relative z-10 py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          ref={scrollRef}
          initial="hidden"
          whileInView="visible"
          onViewportEnter={handleViewportEnter}
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.2 } }
          }}
          className="flex flex-row items-stretch gap-4 sm:gap-6 md:gap-8 overflow-x-auto pb-6 snap-x snap-mandatory hide-scrollbar" 
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}

export function AnimatedCalendarCard({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0 },
        visible: { 
          opacity: 1, 
          transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
        }
      }}
      className="w-[90vw] sm:w-[70vw] md:w-1/2 flex-none snap-center flex"
    >
      {children}
    </motion.div>
  );
}
