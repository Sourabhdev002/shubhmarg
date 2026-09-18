"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Package, ShieldCheck, ArrowRight, X } from "lucide-react";
import Link from "next/link";
import DirectWhatsAppButton from "./DirectWhatsAppButton";

interface JapaModalProps {
  isOpen: boolean;
  onClose: () => void;
  mantraName: string;
  completedCount: number;
}

export default function JapaMalaDedicationModal({
  isOpen,
  onClose,
  mantraName,
  completedCount: _completedCount,
}: JapaModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-lg rounded-3xl border-2 border-[#d4af37] bg-gradient-to-b from-[#1e0e09] via-[#2a130b] to-[#120704] p-6 sm:p-8 shadow-[0_0_80px_rgba(212,175,55,0.4)] text-center overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-full bg-white/5 border border-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Consecrated Glow Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#d4af37] text-[10px] font-extrabold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>108-Bead Purna Consecration Achieved</span>
          </div>

          <h3 className="text-2xl font-bold font-serif text-white mb-2">
            ॥ पावन जप समर्पण ॥
          </h3>

          <p className="text-xs text-gray-300 leading-relaxed mb-6">
            You have successfully completed 108 repetitions of <strong>{mantraName}</strong>. In Vedic tradition, dedicating your Japa merits at a consecrated temple altar solidifies spiritual and karmic protection.
          </p>

          {/* Prasad Offer Card */}
          <div className="bg-black/60 border border-[#d4af37]/40 rounded-2xl p-5 mb-6 text-left">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold font-serif text-white">
                  Dedicate Japa &amp; Receive Consecrated Prasad
                </h4>
                <p className="text-[11px] text-gray-300">
                  Pandit Ji chants your Gotra in Kashi and dispatches blessed Gangajal, Raksha Sutra, and Vibhuti to your home.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2.5">
            <Link
              href="/request-guidance?service=temple-puja"
              onClick={onClose}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#d4af37] via-[#e5c453] to-[#d4af37] text-black font-extrabold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 flex items-center justify-center gap-2 transition-all"
            >
              <span>Dedicate Merits &amp; Receive Prasad (₹2,100)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <DirectWhatsAppButton
              variant="compact"
              serviceName={`Dedication of 108 ${mantraName} Japa`}
              price="₹2,100"
              className="w-full justify-center py-2.5"
            />
          </div>

          <p className="text-[10px] text-gray-400 mt-3 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>100% Guaranteed Consecrated Sankalp &amp; Doorstep Delivery</span>
          </p>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
