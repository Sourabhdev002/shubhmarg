"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useWallet, formatPaise } from "@/hooks/useWallet";
import TopupDrawer from "@/components/wallet/TopupDrawer";
import { motion } from "framer-motion";
import {
  Wallet, Plus, ArrowUpRight, ArrowDownLeft, RotateCcw,
  Loader2, LogOut, RefreshCw, Clock, ChevronRight, ShieldCheck,
} from "lucide-react";
import Link from "next/link";

function TxIcon({ type }: { type: string }) {
  if (type === "credit") return <div className="w-8 h-8 rounded-full bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center shrink-0"><ArrowDownLeft className="w-4 h-4 text-emerald-400" /></div>;
  if (type === "debit")  return <div className="w-8 h-8 rounded-full bg-red-500/15 border border-red-500/25 flex items-center justify-center shrink-0"><ArrowUpRight className="w-4 h-4 text-red-400" /></div>;
  return <div className="w-8 h-8 rounded-full bg-sky-500/15 border border-sky-500/25 flex items-center justify-center shrink-0"><RotateCcw className="w-4 h-4 text-sky-400" /></div>;
}

export default function WalletPage() {
  const router = useRouter();
  const { user, loading: authLoading, signOut } = useAuth();
  const { balance_paise, transactions, loading: walletLoading, refresh } = useWallet();
  const [topupOpen, setTopupOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  // Redirect if not logged in
  if (!authLoading && !user) {
    router.replace("/login?redirect=/wallet");
    return null;
  }

  async function handleSignOut() {
    setSigningOut(true);
    await signOut();
    router.push("/");
  }

  const isLoading = authLoading || walletLoading;

  return (
    <div className="min-h-[100dvh] bg-[#080604] relative overflow-x-hidden">
      {/* Ambient glows */}
      <div className="pointer-events-none fixed top-0 right-[-10%] w-[70vw] max-w-[500px] aspect-square bg-[#d4af37]/8 blur-[140px] rounded-full" />
      <div className="pointer-events-none fixed bottom-0 left-[-10%] w-[60vw] max-w-[400px] aspect-square bg-[#72232b]/12 blur-[130px] rounded-full" />

      <div className="relative z-10 max-w-lg mx-auto px-5 py-8 pb-32">

        {/* Page header */}
        <div className="flex items-center justify-between mb-7">
          <div>
            <h1 className="text-[1.5rem] font-bold font-serif text-white">My Wallet</h1>
            <p className="text-[12px] text-white/40 mt-0.5">
              {user?.phone ?? user?.email ?? ""}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => refresh()} className="w-9 h-9 rounded-full bg-white/6 border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors">
              <RefreshCw className="w-4 h-4" />
            </button>
            <button onClick={handleSignOut} disabled={signingOut} className="w-9 h-9 rounded-full bg-white/6 border border-white/10 flex items-center justify-center text-white/50 hover:text-red-400 transition-colors">
              {signingOut ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogOut className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Balance card */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl overflow-hidden mb-6"
          style={{ background: "linear-gradient(135deg, #1c1208 0%, #271a0c 50%, #1a0f07 100%)" }}
        >
          {/* Gold border */}
          <div className="absolute inset-0 rounded-3xl pointer-events-none" style={{ boxShadow: "inset 0 0 0 1px rgba(212,175,55,0.25)" }} />

          {/* Grain texture */}
          <div className="absolute inset-0 opacity-[0.06] pointer-events-none bg-[radial-gradient(circle,#d4af37_1px,transparent_1px)] [background-size:18px_18px]" />

          {/* Glow */}
          <div className="absolute -top-8 -right-8 w-48 h-48 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative p-6 sm:p-7">
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#d4af37] to-[#8a6520] flex items-center justify-center shadow-[0_4px_12px_rgba(212,175,55,0.4)]">
                  <Wallet className="w-4 h-4 text-[#0a0604]" />
                </div>
                <span className="text-[12px] font-bold uppercase tracking-widest text-[#d4af37]/70">ShubhMarg Wallet</span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400/80 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Active
              </span>
            </div>

            <div className="mb-6">
              <p className="text-[11px] text-white/40 uppercase tracking-widest mb-1">Available Balance</p>
              {isLoading ? (
                <div className="h-10 w-32 bg-white/10 rounded-lg animate-pulse" />
              ) : (
                <p className="text-[2.5rem] font-black font-serif leading-none" style={{ background: "linear-gradient(135deg, #f5d97a 0%, #d4af37 50%, #b8860b 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  ₹{formatPaise(balance_paise)}
                </p>
              )}
            </div>

            <button
              onClick={() => setTopupOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#d4af37] to-[#c9a24a] text-[#0a0604] text-[12px] font-black uppercase tracking-wider shadow-[0_4px_20px_rgba(212,175,55,0.4)] hover:brightness-110 transition-all active:scale-95"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Money
            </button>
          </div>
        </motion.div>

        {/* Quick actions */}
        <div className="grid grid-cols-3 gap-3 mb-7">
          {[
            { label: "Top Up", icon: Plus, action: () => setTopupOpen(true), color: "text-[#d4af37]", bg: "bg-[#d4af37]/10 border-[#d4af37]/20" },
            { label: "Services", icon: ChevronRight, href: "/services", color: "text-white/70", bg: "bg-white/5 border-white/10" },
            { label: "Guidance", icon: ChevronRight, href: "/request-guidance", color: "text-white/70", bg: "bg-white/5 border-white/10" },
          ].map(({ label, icon: Icon, action, href, color, bg }) => {
            const cls = `glass-deep ${bg} border rounded-2xl p-4 flex flex-col items-center gap-2 transition-all lift-on-hover cursor-pointer`;
            const inner = <><div className={`w-9 h-9 rounded-xl ${bg} border flex items-center justify-center`}><Icon className={`w-4 h-4 ${color}`} /></div><span className={`text-[11px] font-bold ${color}`}>{label}</span></>;
            if (href) return <Link key={label} href={href} className={cls}>{inner}</Link>;
            return <button key={label} onClick={action} className={cls}>{inner}</button>;
          })}
        </div>

        {/* Transactions */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[14px] font-bold font-serif text-white">Recent Transactions</h2>
            <span className="text-[10px] text-white/35 font-semibold uppercase tracking-wider">Last 20</span>
          </div>

          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map(i => <div key={i} className="h-16 bg-white/5 rounded-2xl animate-pulse" />)}
            </div>
          ) : transactions.length === 0 ? (
            <div className="glass-deep border border-white/8 rounded-2xl p-8 text-center">
              <Clock className="w-8 h-8 text-white/20 mx-auto mb-3" />
              <p className="text-[13px] text-white/40 font-serif">No transactions yet</p>
              <p className="text-[11px] text-white/25 mt-1">Add money to get started</p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {transactions.map((tx, i) => (
                <motion.div
                  key={tx.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.35 }}
                  className="glass-deep border border-white/8 rounded-2xl p-3.5 flex items-center gap-3"
                >
                  <TxIcon type={tx.type} />
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-white truncate">{tx.description}</p>
                    <p className="text-[10px] text-white/35 mt-0.5">
                      {new Date(tx.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      {tx.status === "pending" && <span className="ml-1.5 text-amber-400/80">· Pending</span>}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className={`text-[14px] font-black font-serif ${tx.type === "credit" || tx.type === "refund" ? "text-emerald-400" : "text-red-400"}`}>
                      {tx.type === "credit" || tx.type === "refund" ? "+" : "-"}₹{formatPaise(tx.amount_paise)}
                    </p>
                    {tx.balance_after != null && (
                      <p className="text-[10px] text-white/30">bal ₹{formatPaise(tx.balance_after)}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Security note */}
        <div className="mt-8 flex items-center justify-center gap-2 text-[11px] text-white/25">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400/40" />
          Wallet secured by Supabase Auth · All transactions encrypted
        </div>
      </div>

      <TopupDrawer open={topupOpen} onClose={() => setTopupOpen(false)} onSuccess={() => { setTimeout(refresh, 1500); }} />
    </div>
  );
}
