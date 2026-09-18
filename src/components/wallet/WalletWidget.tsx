"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useWallet, formatPaise } from "@/hooks/useWallet";
import TopupDrawer from "./TopupDrawer";
import { Wallet, Plus, Loader2, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * WalletWidget — shown in the site header when user is logged in.
 * Shows balance pill + quick top-up button.
 * When not logged in, shows a "Wallet" login CTA.
 */
export default function WalletWidget() {
  const { user, loading: authLoading } = useAuth();
  const { balance_paise, loading: walletLoading, refresh } = useWallet();
  const [topupOpen, setTopupOpen] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  if (authLoading) {
    return (
      <div className="w-9 h-9 rounded-full bg-gradient-to-b from-[#FFF6E6] to-[#FCE9CC] border border-[#E8791E]/40 flex items-center justify-center shadow-sm">
        <Loader2 className="w-4 h-4 text-[#C25E10]/60 animate-spin" />
      </div>
    );
  }

  // Not logged in — show wallet login CTA
  if (!user) {
    return (
      <motion.div whileTap={{ scale: 0.96 }} whileHover={{ y: -1 }} className="inline-flex">
        <Link
          href="/login"
          className="flex items-center gap-1.5 h-9 pl-2 pr-3 rounded-full border border-[#E8791E]/40 bg-gradient-to-b from-[#FFF6E6] to-[#FCE9CC] text-[#C25E10] text-[11px] font-bold hover:border-[#E8791E]/70 hover:shadow-[0_2px_10px_rgba(232,121,30,0.25)] transition-all shadow-sm"
          title="Sign in to ShubhMarg"
        >
          <span className="w-6 h-6 rounded-full bg-gradient-to-br from-[#F5A623] to-[#C25E10] flex items-center justify-center shadow-[0_2px_6px_rgba(194,94,16,0.4)]">
            <Wallet className="w-3.5 h-3.5 text-white" />
          </span>
          <span className="tracking-wide">Sign In</span>
        </Link>
      </motion.div>
    );
  }

  // Logged in — show balance + quick top-up
  return (
    <>
      <div className="flex items-center gap-1.5">
        {/* Balance pill — links to full wallet page */}
        <motion.div whileTap={{ scale: 0.96 }} whileHover={{ y: -1 }} className="inline-flex">
          <Link
            href="/wallet"
            className="flex items-center gap-1.5 h-9 pl-1.5 pr-3 rounded-full border border-[#E8791E]/40 bg-gradient-to-b from-[#FFF6E6] to-[#FCE9CC] hover:border-[#E8791E]/70 hover:shadow-[0_2px_10px_rgba(232,121,30,0.25)] transition-all shadow-sm group"
            title="My Wallet"
          >
            <span className="w-6 h-6 rounded-full bg-gradient-to-br from-[#F5A623] to-[#C25E10] flex items-center justify-center shadow-[0_2px_6px_rgba(194,94,16,0.4)] shrink-0">
              <Wallet className="w-3.5 h-3.5 text-white" />
            </span>
            <AnimatePresence mode="wait">
              {walletLoading ? (
                <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <Loader2 className="w-3 h-3 text-[#C25E10]/60 animate-spin" />
                </motion.span>
              ) : (
                <motion.span
                  key={balance_paise}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  className="text-[12px] font-black text-[#C25E10] font-serif leading-none"
                >
                  ₹{formatPaise(balance_paise)}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        </motion.div>

        {/* Quick top-up button */}
        <motion.button
          onClick={() => setTopupOpen(true)}
          whileTap={{ scale: 0.9 }}
          whileHover={{ y: -1 }}
          className="w-9 h-9 rounded-full bg-gradient-to-br from-[#F5A623] to-[#C25E10] border border-[#E8791E]/50 flex items-center justify-center text-white shadow-[0_2px_10px_rgba(194,94,16,0.35)] hover:shadow-[0_4px_14px_rgba(232,121,30,0.5)] transition-all"
          title="Add money"
          aria-label="Add money to wallet"
        >
          <Plus className="w-4 h-4" strokeWidth={2.5} />
        </motion.button>
      </div>

      <TopupDrawer
        open={topupOpen}
        onClose={() => setTopupOpen(false)}
        onSuccess={() => {
          setTimeout(() => {
            refresh();
            setSuccessToast("Wallet credited! Your balance has been updated.");
            setTimeout(() => setSuccessToast(null), 4000);
          }, 1500);
        }}
      />
      {/* Success toast */}
      <AnimatePresence>
        {successToast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-[calc(6rem+env(safe-area-inset-bottom,0px))] left-1/2 -translate-x-1/2 z-[99] flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-600 text-white text-[12px] font-bold shadow-[0_8px_24px_rgba(0,0,0,0.3)] whitespace-nowrap"
          >
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            {successToast}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
