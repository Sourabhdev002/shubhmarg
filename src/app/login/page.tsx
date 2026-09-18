"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ArrowRight, ShieldCheck, Loader2, ChevronLeft, Sparkles } from "lucide-react";
import Link from "next/link";

type Step = "choose" | "email" | "otp";

/** Google "G" logo mark (inline SVG so it needs no asset). */
function GoogleMark() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.76h3.56c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.56-2.76c-.98.66-2.23 1.06-3.72 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.11a6.6 6.6 0 0 1 0-4.22V7.05H2.18a11 11 0 0 0 0 9.9l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.05l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" />
    </svg>
  );
}

export default function LoginPage() {
  const { sendEmailOtp, verifyEmailOtp, signInWithGoogle } = useAuth();
  const router = useRouter();

  const [step, setStep] = useState<Step>("choose");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const [redirectTo] = useState(() =>
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("redirect") ?? "/wallet"
      : "/wallet"
  );

  async function handleGoogle() {
    setError("");
    setGoogleLoading(true);
    const { error: err } = await signInWithGoogle(redirectTo);
    // On success the browser redirects to Google; if we get here it failed.
    if (err) { setError(err); setGoogleLoading(false); }
  }

  async function handleSendEmailOtp(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error: err } = await sendEmailOtp(email.trim().toLowerCase());
    setLoading(false);
    if (err) { setError(err); return; }
    setStep("otp");
  }

  async function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error: err } = await verifyEmailOtp(email.trim().toLowerCase(), otp.trim());
    setLoading(false);
    if (err) { setError(err); return; }
    router.push(redirectTo);
    router.refresh();
  }

  return (
    <div className="min-h-[100dvh] bg-[#080604] flex flex-col items-center justify-center px-5 py-12 relative overflow-hidden">
      {/* Ambient glows */}
      <div className="pointer-events-none absolute top-0 right-[-10%] w-[70vw] max-w-[500px] aspect-square bg-[#d4af37]/10 blur-[60px] md:blur-[130px] rounded-full" />
      <div className="pointer-events-none absolute bottom-0 left-[-10%] w-[70vw] max-w-[500px] aspect-square bg-[#72232b]/15 blur-[60px] md:blur-[140px] rounded-full" />

      <div className="relative z-10 w-full max-w-sm">

        {/* Logo / brand — premium gold medallion */}
        <div className="text-center mb-8">
          <div className="relative inline-flex items-center justify-center mb-4">
            {/* Soft aura glow behind the seal */}
            <motion.span
              aria-hidden
              className="absolute w-20 h-20 rounded-full bg-[#d4af37]/25 blur-2xl"
              animate={{ opacity: [0.35, 0.6, 0.35], scale: [1, 1.08, 1] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Rotating fine gold ring */}
            <span aria-hidden className="absolute w-[68px] h-[68px] rounded-full border border-[#f5d97a]/40 [mask-image:linear-gradient(transparent,black,transparent)] animate-[spin_12s_linear_infinite]" />
            {/* The medallion */}
            <motion.div
              className="relative w-16 h-16 rounded-full flex items-center justify-center ring-1 ring-[#f5d97a]/50 shadow-[0_10px_34px_-6px_rgba(212,175,55,0.65),inset_0_2px_4px_rgba(255,244,194,0.7),inset_0_-3px_6px_rgba(120,80,20,0.5)]"
              style={{ background: "radial-gradient(circle at 35% 28%, #fff4c2 0%, #f5d97a 30%, #d4af37 62%, #a9791a 100%)" }}
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="font-devanagari text-[#3a2408] text-[28px] font-black leading-none drop-shadow-[0_1px_1px_rgba(255,255,255,0.6)]">ॐ</span>
            </motion.div>
          </div>
          <h1 className="text-2xl font-bold font-serif" style={{ color: "#FFFDF8" }}>ShubhMarg</h1>
          <p className="text-[13px] text-white/60 mt-1">Sign in to access your wallet</p>
        </div>

        {/* Card */}
        <div className="glass-deep border border-[#d4af37]/18 rounded-3xl overflow-hidden">
          {/* Gold top line */}
          <div className="h-[2px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />

          <div className="p-7">
            <AnimatePresence mode="wait">

              {/* ── Step 1: Choose method (Google-first) ── */}
              {step === "choose" && (
                <motion.div key="choose" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.3 }}>
                  <div className="mb-6 text-center">
                    <h2 className="text-[1.3rem] font-bold font-serif" style={{ color: "#FFFDF8" }}>Welcome</h2>
                    <p className="text-[13px] text-white/60 mt-1">Continue in one tap — no password needed</p>
                  </div>

                  {/* Primary: Google one-click */}
                  <button
                    onClick={handleGoogle}
                    disabled={googleLoading}
                    className="w-full flex items-center justify-center gap-3 bg-white text-[#1a1c20] font-bold text-[14px] rounded-2xl py-3.5 shadow-[0_6px_20px_rgba(0,0,0,0.35)] hover:brightness-95 active:scale-[0.98] transition-all disabled:opacity-60"
                  >
                    {googleLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <GoogleMark />}
                    <span>Continue with Google</span>
                  </button>

                  {/* Divider */}
                  <div className="flex items-center gap-3 my-5">
                    <span className="h-px flex-1 bg-white/10" />
                    <span className="text-[11px] uppercase tracking-widest text-white/35">or</span>
                    <span className="h-px flex-1 bg-white/10" />
                  </div>

                  {/* Secondary: email */}
                  <button
                    onClick={() => { setStep("email"); setError(""); }}
                    className="w-full flex items-center justify-center gap-2 border border-white/15 text-white/80 font-semibold text-[13px] rounded-2xl py-3 hover:bg-white/5 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    Continue with Email
                  </button>

                  {error && (
                    <p className="mt-4 text-[12px] text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2">{error}</p>
                  )}
                </motion.div>
              )}

              {/* ── Step 2: Email entry ── */}
              {step === "email" && (
                <motion.div key="email" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.3 }}>
                  <button onClick={() => { setStep("choose"); setError(""); }} className="flex items-center gap-1 text-[12px] text-white/55 mb-5 hover:text-white/80 transition-colors">
                    <ChevronLeft className="w-3.5 h-3.5" /> Back
                  </button>

                  <div className="mb-6">
                    <span className="eyebrow-pill mb-3 inline-flex">
                      <Mail className="w-3 h-3" />
                      Email Login
                    </span>
                    <h2 className="text-[1.3rem] font-bold font-serif mt-2" style={{ color: "#FFFDF8" }}>Enter your email</h2>
                    <p className="text-[13px] text-white/60 mt-1">We&apos;ll send a 6-digit code to your inbox</p>
                  </div>

                  <form onSubmit={handleSendEmailOtp} className="space-y-4">
                    <input
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autoFocus
                      className="w-full bg-white/5 border border-white/12 rounded-2xl px-4 py-3.5 text-white text-[15px] placeholder-white/30 focus:outline-none focus:border-[#d4af37]/60 transition-colors"
                    />

                    {error && (
                      <p className="text-[12px] text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2">{error}</p>
                    )}

                    <button
                      type="submit"
                      disabled={loading || !email.includes("@")}
                      className="btn-gold w-full text-[13px] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Send Code <ArrowRight className="w-4 h-4" /></>}
                    </button>
                  </form>
                </motion.div>
              )}

              {/* ── Step 3: OTP ── */}
              {step === "otp" && (
                <motion.div key="otp" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.3 }}>
                  <button onClick={() => { setStep("email"); setOtp(""); setError(""); }} className="flex items-center gap-1 text-[12px] text-white/55 mb-5 hover:text-white/80 transition-colors">
                    <ChevronLeft className="w-3.5 h-3.5" /> Change email
                  </button>

                  <div className="mb-6">
                    <span className="eyebrow-pill mb-3 inline-flex">
                      <Sparkles className="w-3 h-3" />
                      Verify
                    </span>
                    <h2 className="text-[1.3rem] font-bold font-serif mt-2" style={{ color: "#FFFDF8" }}>Enter the code</h2>
                    <p className="text-[13px] text-white/60 mt-1">
                      Sent to <span className="text-[#d4af37] font-semibold">{email}</span>
                    </p>
                  </div>

                  <form onSubmit={handleVerifyOtp} className="space-y-4">
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="6-digit code"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      maxLength={6}
                      required
                      autoFocus
                      className="w-full bg-white/5 border border-white/12 rounded-2xl px-5 py-3.5 text-white text-[18px] font-mono tracking-[0.4em] text-center placeholder-white/30 focus:outline-none focus:border-[#d4af37]/60 transition-colors"
                    />

                    {error && (
                      <p className="text-[12px] text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2">{error}</p>
                    )}

                    <button
                      type="submit"
                      disabled={loading || otp.length < 6}
                      className="btn-gold w-full text-[13px] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Verify &amp; Continue <ArrowRight className="w-4 h-4" /></>}
                    </button>

                    <button
                      type="button"
                      onClick={handleSendEmailOtp}
                      className="w-full text-[12px] text-white/45 hover:text-white/70 transition-colors py-1"
                    >
                      Didn&apos;t receive? Resend code
                    </button>
                  </form>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>

        {/* Trust */}
        <div className="mt-5 flex items-center justify-center gap-1.5 text-[11px] text-white/45">
          <ShieldCheck className="w-3 h-3 text-emerald-400/70" />
          Secure sign-in · We never share your details
        </div>

        <div className="mt-4 text-center text-[12px] text-white/40">
          By continuing, you agree to our{" "}
          <Link href="/terms" className="text-[#d4af37]/70 hover:text-[#d4af37] transition-colors underline underline-offset-2">Terms</Link>
          {" "}&amp;{" "}
          <Link href="/privacy-policy" className="text-[#d4af37]/70 hover:text-[#d4af37] transition-colors underline underline-offset-2">Privacy Policy</Link>
        </div>
      </div>
    </div>
  );
}
