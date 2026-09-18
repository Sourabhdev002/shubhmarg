"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-ivory">
      {/* Warm parchment background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, #FDFBF7 0%, #F4EFE6 100%)",
        }}
        aria-hidden="true"
      />
      
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="relative z-10 w-24 h-24 sm:w-32 sm:h-32 opacity-80"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Simple but elegant mandala geometry */}
          <circle cx="50" cy="50" r="45" stroke="#C99B41" strokeWidth="0.5" strokeDasharray="2 4" />
          <circle cx="50" cy="50" r="40" stroke="#734914" strokeWidth="1" />
          <circle cx="50" cy="50" r="38" stroke="#F5D796" strokeWidth="0.5" />
          <path d="M 50 15 L 55 45 L 85 50 L 55 55 L 50 85 L 45 55 L 15 50 L 45 45 Z" fill="#F5D796" opacity="0.3" stroke="#C99B41" strokeWidth="0.5" />
          <path d="M 50 25 L 53 47 L 75 50 L 53 53 L 50 75 L 47 53 L 25 50 L 47 47 Z" fill="#C99B41" opacity="0.5" />
          <circle cx="50" cy="50" r="10" fill="#734914" />
          <circle cx="50" cy="50" r="5" fill="#F5D796" />
        </svg>
      </motion.div>
    </div>
  );
}
