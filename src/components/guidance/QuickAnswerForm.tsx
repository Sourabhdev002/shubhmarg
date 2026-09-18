"use client";

import { useState } from "react";
import { ShieldCheck, Clock, Loader2, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function QuickAnswerForm() {
  const [form, setForm] = useState({ name: "", phone: "", question: "" });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const isValid = form.name.trim() && form.phone.trim().length >= 10 && form.question.trim();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || submitting) return;
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/quick-answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
      } else {
        setError(data.error || "Something went wrong.");
      }
    } catch {
      setError("Network error. Please try again.");
    }
    setSubmitting(false);
  };

  if (success) {
    return (
      <div className="mx-auto max-w-lg px-4 py-12 text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center mb-5">
          <CheckCircle2 className="w-8 h-8 text-emerald-500" />
        </div>
        <h2 className="text-2xl font-bold font-serif text-brand-charcoal mb-2">Question Received!</h2>
        <p className="text-brand-charcoal/60 mb-6">You will receive your answer on WhatsApp within 1 hour.</p>
        <p className="text-[13px] text-brand-charcoal/40 mb-8">Payment link sent to your WhatsApp. Answer delivered after ₹99 payment.</p>
        <Link href="/" className="text-brand-maroon font-bold text-[13px] uppercase tracking-widest">
          &larr; Back Home
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-8">
      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block text-[12px] font-bold uppercase tracking-widest text-brand-charcoal/50 mb-1.5">
            Your Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={form.name}
            onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Your name"
            required
            className="w-full bg-[#fbf9f4] border border-brand-gold/20 rounded-xl px-4 py-3 text-[15px] text-brand-charcoal placeholder:text-brand-charcoal/30 focus:border-brand-gold/50 focus:outline-none"
            style={{ fontSize: "16px" }}
          />
        </div>

        <div>
          <label className="block text-[12px] font-bold uppercase tracking-widest text-brand-charcoal/50 mb-1.5">
            WhatsApp Number <span className="text-red-400">*</span>
          </label>
          <input
            type="tel"
            value={form.phone}
            onChange={e => setForm(prev => ({ ...prev, phone: e.target.value }))}
            placeholder="+91 98765 43210"
            required
            inputMode="tel"
            className="w-full bg-[#fbf9f4] border border-brand-gold/20 rounded-xl px-4 py-3 text-[15px] text-brand-charcoal placeholder:text-brand-charcoal/30 focus:border-brand-gold/50 focus:outline-none"
            style={{ fontSize: "16px" }}
          />
        </div>

        <div>
          <label className="block text-[12px] font-bold uppercase tracking-widest text-brand-charcoal/50 mb-1.5">
            Your Question <span className="text-red-400">*</span>
          </label>
          <textarea
            value={form.question}
            onChange={e => setForm(prev => ({ ...prev, question: e.target.value }))}
            placeholder="Ask any one specific question — career, relationship, travel, health..."
            required
            rows={3}
            className="w-full bg-[#fbf9f4] border border-brand-gold/20 rounded-xl px-4 py-3 text-[15px] text-brand-charcoal placeholder:text-brand-charcoal/30 focus:border-brand-gold/50 focus:outline-none resize-none"
            style={{ fontSize: "16px" }}
          />
          <p className="text-[11px] text-brand-charcoal/40 mt-1">No birth details needed for quick answer</p>
        </div>

        {error && <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700">{error}</div>}

        <button
          type="submit"
          disabled={!isValid || submitting}
          className="w-full flex items-center justify-center gap-2 bg-brand-maroon text-white font-bold text-[14px] tracking-widest uppercase py-4 rounded-full shadow-[0_4px_20px_rgba(75,21,21,0.3)] hover:bg-brand-maroon-dark active:scale-[0.98] disabled:opacity-50 transition-all min-h-[56px]"
          style={{ touchAction: "manipulation" }}
        >
          {submitting ? <><Loader2 className="w-5 h-5 animate-spin" /> Sending...</> : <>Get Answer — ₹99 &rarr;</>}
        </button>

        <div className="flex items-center justify-center gap-4 pt-1">
          <div className="flex items-center gap-1.5 text-brand-charcoal/40">
            <Clock className="w-3.5 h-3.5" /><span className="text-[10px] font-semibold">1 Hour Reply</span>
          </div>
          <div className="w-px h-3 bg-brand-charcoal/15" />
          <div className="flex items-center gap-1.5 text-brand-charcoal/40">
            <ShieldCheck className="w-3.5 h-3.5" /><span className="text-[10px] font-semibold">100% Private</span>
          </div>
        </div>
      </form>
    </div>
  );
}