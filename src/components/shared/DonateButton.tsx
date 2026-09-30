"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { HeartHandshake } from "lucide-react";
import DonateModal from "./DonateModal";

/**
 * DonateButton — the trigger that opens the ShubhMarg "Scan to Donate" modal.
 *
 * Two variants:
 *  - "inline": a normal button you place inside a section (uses .btn-gold).
 *  - "floating": a fixed FAB (bottom-left so it doesn't clash with the chatbot orb
 *    on the bottom-right). Good for a sitewide "Donate" affordance.
 */

interface DonateButtonProps {
  variant?: "inline" | "floating";
  label?: string;
  causeName?: string;
  className?: string;
}

const SNAPPY = { type: "spring" as const, stiffness: 400, damping: 30 };

export default function DonateButton({
  variant = "inline",
  label = "Donate",
  causeName = "ShubhMarg",
  className = "",
}: DonateButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {variant === "floating" ? (
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ y: -2 }}
          transition={SNAPPY}
          onClick={() => setOpen(true)}
          aria-label={`Donate to ${causeName}`}
          className={`fixed left-4 bottom-[calc(1.25rem+env(safe-area-inset-bottom))] z-[70] inline-flex items-center gap-2 pl-3.5 pr-4 py-3 rounded-full bg-gradient-to-br from-[#F5A623] to-[#E8791E] text-white font-bold text-[13px] shadow-[0_10px_30px_-8px_rgba(232,121,30,0.6)] ${className}`}
        >
          <HeartHandshake className="w-4 h-4" />
          {label}
        </motion.button>
      ) : (
        <motion.button
          whileTap={{ scale: 0.97 }}
          transition={SNAPPY}
          onClick={() => setOpen(true)}
          className={`btn-gold ${className}`}
        >
          <HeartHandshake className="w-4 h-4" />
          {label}
        </motion.button>
      )}

      <DonateModal open={open} onClose={() => setOpen(false)} causeName={causeName} />
    </>
  );
}
