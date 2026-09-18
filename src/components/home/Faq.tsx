"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "Is my personal information kept private?",
    a: "Absolutely. Your birth details, name, and question are seen only by our verified Vedic practitioner. We never sell, share, or publish your information. All consultations are strictly private and confidential."
  },
  {
    q: "How will I receive my guidance?",
    a: "Your guidance is prepared in writing and delivered to your registered email address within 3-5 business days of payment confirmation. You will also receive a Reference ID to track your request."
  },
  {
    q: "Do I need my exact birth time?",
    a: "An accurate birth time gives the most precise Kundli analysis. However, if you do not know your exact time, you can still receive meaningful guidance. Please mention 'time unknown' in the form and our practitioner will use available methods accordingly."
  },
  {
    q: "What if I am not satisfied with the guidance?",
    a: "If we are unable to deliver your guidance within the committed timeframe, you are eligible for a full refund. We stand behind the quality of our traditional methodology. Please contact our support team with your Reference ID."
  },
  {
    q: "Which languages is guidance available in?",
    a: "Guidance is available in both Hindi and English. You can choose your preferred language during the request form."
  },
  {
    q: "What is dakshina and why is it required?",
    a: "Dakshina is the traditional offering made to a Vedic practitioner in exchange for their knowledge and time. It is a centuries-old practice that honours the sacred exchange between seeker and guide. The dakshina amount varies by service type."
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-brand-ivory py-20 sm:py-28 border-t border-brand-gold/10">
      <div className="mx-auto max-w-3xl px-5 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-gold mb-4">FAQ</p>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-brand-charcoal">
            Questions &amp; Answers
          </h2>
          <p className="mt-4 text-brand-charcoal/60 text-[15px]">
            Everything you need to know before your first consultation.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-xl border border-brand-gold/20 bg-[#fbf9f4] overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
                style={{ touchAction: "manipulation" }}
              >
                <span className="text-[15px] font-bold text-brand-charcoal font-serif leading-snug">
                  {faq.q}
                </span>
                <span className="shrink-0 w-7 h-7 rounded-full border border-brand-gold/30 flex items-center justify-center text-brand-gold">
                  {open === i ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="px-6 pb-5 text-[14px] text-brand-charcoal/70 leading-relaxed border-t border-brand-gold/10 pt-4">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <p className="text-center text-brand-charcoal/40 text-[13px] mt-10">
          Still have questions?{" "}
          <a href="/support" className="text-brand-maroon font-semibold underline underline-offset-2">
            Contact our support team
          </a>
        </p>
      </div>
    </section>
  );
}