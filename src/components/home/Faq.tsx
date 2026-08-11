"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is ShubhMarg?",
    answer:
      "ShubhMarg is a digital platform for personalized Vedic guidance and traditional spiritual services. We connect you with authentic practices in a respectful, transparent manner.",
  },
  {
    question: "Is the guidance personalized?",
    answer:
      "Yes. Services are personalized using the information you provide, such as birth details, to ensure guidance is relevant to your specific situation according to traditional methods.",
  },
  {
    question: "Are spiritual outcomes guaranteed?",
    answer:
      "No. Traditional spiritual practices and astrological interpretations are meant to provide perspective and guidance. They cannot and do not guarantee any particular life outcome.",
  },
  {
    question: "Will rituals and jaap actually be performed?",
    answer:
      "Yes. Only services that are genuinely available and performed by our authenticated practitioners will be presented to you as completed services. We value transparency and tradition above all.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-brand-parchment py-24 sm:py-32 border-t border-brand-gold/20">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-gold-dark">
            Questions
          </p>
          <h2 className="mt-4 text-4xl font-bold tracking-wide text-brand-maroon sm:text-5xl font-serif">
            Seek Clarity
          </h2>
        </div>

        <div className="mx-auto mt-16 divide-y divide-brand-gold/20 border-y border-brand-gold/20">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={faq.question} className="py-6">
                <dt>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    id={`faq-question-${index}`}
                    className="flex w-full items-start justify-between text-left text-charcoal focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-maroon rounded-sm p-2 -m-2 group"
                  >
                    <span className="text-xl font-serif leading-7 group-hover:text-brand-maroon transition-colors">{faq.question}</span>
                    <span className="ml-6 flex h-7 items-center" aria-hidden="true">
                      <ChevronDown
                        className={`h-5 w-5 transform transition-transform duration-200 ease-in-out text-brand-gold-dark ${
                          isOpen ? "-rotate-180" : "rotate-0"
                        }`}
                      />
                    </span>
                  </button>
                </dt>
                <dd 
                  id={`faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                  className={`mt-4 pr-12 overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-base leading-7 text-charcoal/80 font-serif italic">{faq.answer}</p>
                </dd>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
