"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function InlineAskField() {
  const [question, setQuestion] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim()) {
      router.push(`/free-reading?q=${encodeURIComponent(question.trim())}`);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative max-w-lg mx-auto"
    >
      <div className="relative">
        <input
          type="text"
          value={question}
          onChange={e => setQuestion(e.target.value)}
          placeholder="Type your question here..."
          className="w-full bg-[#FFFDF8] border-2 border-[#B8860B]/25 rounded-full pl-5 pr-14 py-4 text-[15px] text-[#2A1810] placeholder:text-[#6B5A48]/60 focus:border-[#E8791E] focus:outline-none shadow-[0_4px_20px_rgba(184,134,11,0.1)] backdrop-blur-sm transition-all"
          style={{ fontSize: "16px" }}
        />
        <button
          type="submit"
          disabled={!question.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-brand-maroon flex items-center justify-center shadow-sm disabled:opacity-30 hover:bg-brand-maroon-dark active:scale-95 transition-all"
          style={{ touchAction: "manipulation" }}
          aria-label="Get free reading"
        >
          <ArrowRight className="w-4 h-4 text-white" />
        </button>
      </div>
      <p className="text-center text-[11px] text-[#6B5A48] mt-2">
        Free instant reading &middot; No payment required
      </p>
    </motion.form>
  );
}