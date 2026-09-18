"use client";

import React, { useState } from "react";
import { submitSupportRequest } from "@/app/support/actions";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function SupportRequestForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    referenceId: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await submitSupportRequest(formData);

    if (res.success) {
      setSuccess(true);
    } else {
      setError(res.error || "An error occurred.");
    }
    setLoading(false);
  };

  if (success) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-8 sm:py-12 text-center bg-[#fbf9f4] border border-[#d4af37]/30 rounded-2xl shadow-[0_4px_20px_rgba(212,175,55,0.08)] px-4 sm:px-6"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
        >
          <CheckCircle2 className="h-12 w-12 sm:h-16 sm:w-16 text-[#d4af37] mb-4 drop-shadow-sm" />
        </motion.div>
        <h3 className="text-xl sm:text-2xl font-bold text-brand-maroon font-serif mb-2">Request Submitted</h3>
        <p className="text-sm sm:text-base text-brand-charcoal/80 mb-6 max-w-md">
          Thank you for reaching out. We have received your support request and will get back to you at {formData.email} as soon as possible.
        </p>
        <Link
          href="/"
          className="w-full sm:w-auto px-10 py-4 bg-brand-maroon text-white font-bold rounded-sm tracking-widest uppercase hover:bg-brand-maroon-dark shadow-[0_4px_15px_rgba(114,35,43,0.3)] transition-all inline-block"
        >
          Return Home
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.form 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onSubmit={handleSubmit} 
      className="space-y-5 sm:space-y-6"
    >
      {error && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="flex items-center gap-2 p-3 sm:p-4 text-red-800 bg-red-50 border border-red-200 rounded-sm"
        >
          <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
          <p className="text-xs sm:text-sm font-medium">{error}</p>
        </motion.div>
      )}

      <div>
        <label htmlFor="fullName" className="block text-sm font-semibold text-brand-charcoal mb-2">
          Full Name <span className="text-brand-maroon">*</span>
        </label>
        <input
          type="text"
          id="fullName"
          required
          className="block w-full rounded-md border-0 py-3 text-[16px] md:text-sm text-brand-charcoal shadow-[0_2px_10px_rgba(212,175,55,0.05)] ring-1 ring-inset ring-[#d4af37]/30 placeholder:text-brand-charcoal/40 focus:ring-2 focus:ring-inset focus:ring-[#d4af37] sm:leading-6 px-4 bg-white transition-all"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-brand-charcoal mb-2">
          Email Address <span className="text-brand-maroon">*</span>
        </label>
        <input
          type="email"
          id="email"
          required
          className="block w-full rounded-md border-0 py-3 text-[16px] md:text-sm text-brand-charcoal shadow-[0_2px_10px_rgba(212,175,55,0.05)] ring-1 ring-inset ring-[#d4af37]/30 placeholder:text-brand-charcoal/40 focus:ring-2 focus:ring-inset focus:ring-[#d4af37] sm:leading-6 px-4 bg-white transition-all"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor="referenceId" className="block text-sm font-semibold text-brand-charcoal mb-1">
          Reference ID (Optional)
        </label>
        <p className="text-xs text-brand-charcoal/60 mb-3">If your question is about a guidance request or payment, please include the reference ID here.</p>
        <input
          type="text"
          id="referenceId"
          placeholder="e.g., SHUBH-ABCDEF"
          className="block w-full rounded-md border-0 py-3 text-[16px] md:text-sm text-brand-charcoal shadow-[0_2px_10px_rgba(212,175,55,0.05)] ring-1 ring-inset ring-[#d4af37]/30 placeholder:text-brand-charcoal/40 focus:ring-2 focus:ring-inset focus:ring-[#d4af37] sm:leading-6 px-4 bg-white transition-all uppercase font-mono"
          value={formData.referenceId}
          onChange={(e) => setFormData({ ...formData, referenceId: e.target.value.toUpperCase() })}
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-brand-charcoal mb-2">
          Message <span className="text-brand-maroon">*</span>
        </label>
        <textarea
          id="message"
          required
          rows={5}
          maxLength={2000}
          className="block w-full rounded-md border-0 py-3 text-[16px] md:text-sm text-brand-charcoal shadow-[0_2px_10px_rgba(212,175,55,0.05)] ring-1 ring-inset ring-[#d4af37]/30 placeholder:text-brand-charcoal/40 focus:ring-2 focus:ring-inset focus:ring-[#d4af37] sm:leading-6 px-4 bg-white transition-all resize-none min-h-[120px]"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        />
        <div className="text-right mt-1">
          <span className="text-xs text-brand-charcoal/50">{formData.message.length}/2000</span>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center items-center rounded-sm bg-brand-maroon px-8 py-4 text-sm font-bold uppercase tracking-widest text-white shadow-[0_4px_15px_rgba(114,35,43,0.3)] hover:bg-brand-maroon-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-maroon disabled:opacity-50 transition-all border border-brand-maroon active:scale-[0.98]"
      >
        {loading ? <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" /> : "Submit Request"}
      </button>
    </motion.form>
  );
}
