"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Star } from "lucide-react";
import Link from "next/link";
import CosmicReadingLoader from "./CosmicReadingLoader";

export default function FreeReadingForm() {
  const [form, setForm] = useState({ name: "", dob: "", tob: "", place: "" });
  const [loading, setLoading] = useState(false);
  const [reading, setReading] = useState<string | null>(null);
  const [error, setError] = useState("");

  const isValid = form.name.trim() && form.dob && form.place.trim();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || loading) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/free-reading", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.reading) {
        setReading(data.reading);
      } else {
        setError(data.error || "Could not generate reading.");
      }
    } catch {
      setError("Network error. Please try again.");
    }
    setLoading(false);
  };

  // While the reading is being generated, show the "consulting the cosmos" ritual
  // loader so the wait feels intentional and on-brand instead of a dead spinner.
  if (loading && !reading) {
    return <CosmicReadingLoader />;
  }

  if (reading) {
    return (
      <div className="mx-auto max-w-lg px-4 py-10">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="bg-[#fbf9f4] border border-brand-gold/20 rounded-2xl p-6 shadow-[0_8px_30px_rgba(212,175,55,0.08)]">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-4 h-4 text-brand-gold" />
              <p className="text-[12px] font-bold uppercase tracking-widest text-brand-gold">Your Mini Reading</p>
            </div>
            <p className="text-brand-charcoal text-[15px] leading-relaxed whitespace-pre-wrap font-serif italic">
              {reading}
            </p>
          </div>

          <div className="bg-brand-maroon/5 border border-brand-maroon/20 rounded-2xl p-6 text-center">
            <p className="text-[14px] text-brand-charcoal/80 mb-4">
              Want the <strong>full detailed reading</strong> with remedies, dasha analysis, and specific guidance?
            </p>
            <Link
              href="/request-guidance?service=kundli"
              className="inline-flex items-center justify-center gap-2 bg-brand-maroon text-white font-bold text-[13px] tracking-widest uppercase py-3.5 px-8 rounded-full shadow-md hover:bg-brand-maroon-dark active:scale-[0.98] transition-all"
            >
              Get Full Reading — ₹1,101
            </Link>
          </div>

          <div className="text-center">
            <Link href="/quick-answer" className="text-brand-maroon font-bold text-[12px] uppercase tracking-widest underline underline-offset-2">
              Or ask a quick question — ₹99
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-[12px] font-bold uppercase tracking-widest text-brand-charcoal/50 mb-1.5">Name</label>
          <input type="text" value={form.name} onChange={e => setForm(p => ({...p, name: e.target.value}))} placeholder="Your name" required
            className="w-full bg-[#fbf9f4] border border-brand-gold/20 rounded-xl px-4 py-3 text-[15px] text-brand-charcoal placeholder:text-brand-charcoal/30 focus:border-brand-gold/50 focus:outline-none" style={{ fontSize: "16px" }} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[12px] font-bold uppercase tracking-widest text-brand-charcoal/50 mb-1.5">Date of Birth <span className="text-red-400">*</span></label>
            <input type="date" value={form.dob} onChange={e => setForm(p => ({...p, dob: e.target.value}))} required
              className="w-full bg-[#fbf9f4] border border-brand-gold/20 rounded-xl px-4 py-3 text-[15px] text-brand-charcoal focus:border-brand-gold/50 focus:outline-none" style={{ fontSize: "16px" }} />
          </div>
          <div>
            <label className="block text-[12px] font-bold uppercase tracking-widest text-brand-charcoal/50 mb-1.5">Birth Time</label>
            <input type="time" value={form.tob} onChange={e => setForm(p => ({...p, tob: e.target.value}))}
              className="w-full bg-[#fbf9f4] border border-brand-gold/20 rounded-xl px-4 py-3 text-[15px] text-brand-charcoal focus:border-brand-gold/50 focus:outline-none" style={{ fontSize: "16px" }} />
          </div>
        </div>
        <div>
          <label className="block text-[12px] font-bold uppercase tracking-widest text-brand-charcoal/50 mb-1.5">Birth Place <span className="text-red-400">*</span></label>
          <input type="text" value={form.place} onChange={e => setForm(p => ({...p, place: e.target.value}))} placeholder="City, State" required
            className="w-full bg-[#fbf9f4] border border-brand-gold/20 rounded-xl px-4 py-3 text-[15px] text-brand-charcoal placeholder:text-brand-charcoal/30 focus:border-brand-gold/50 focus:outline-none" style={{ fontSize: "16px" }} />
        </div>

        {error && <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700">{error}</div>}

        <button type="submit" disabled={!isValid || loading}
          className="w-full flex items-center justify-center gap-2 bg-brand-maroon text-white font-bold text-[14px] tracking-widest uppercase py-4 rounded-full shadow-[0_4px_20px_rgba(75,21,21,0.3)] hover:bg-brand-maroon-dark active:scale-[0.98] disabled:opacity-50 transition-all min-h-[56px]"
          style={{ touchAction: "manipulation" }}
        >
          {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Generating...</> : <>Get My Free Reading &rarr;</>}
        </button>

        <p className="text-center text-[11px] text-brand-charcoal/40">No payment. No sign-up. Instant result.</p>
      </form>
    </div>
  );
}