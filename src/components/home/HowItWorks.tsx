import React from "react";

const steps = [
  {
    number: "१",
    subtitle: "Step 01",
    title: "Share your question",
    description: "Offer your details and the guidance you are seeking. We approach every inquiry with confidentiality and respect.",
  },
  {
    number: "२",
    subtitle: "Step 02",
    title: "Receive guidance",
    description: "An authentic assessment of your chart or question is conducted to provide traditional insight.",
  },
  {
    number: "३",
    subtitle: "Step 03",
    title: "Follow your chosen path",
    description: "Receive your traditional guidance and remedies. The path you walk is ultimately your own choice.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-brand-ivory py-24 sm:py-32 relative">
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] mix-blend-overlay pointer-events-none"></div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="max-w-2xl text-center mx-auto">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-gold-dark">
            The Journey
          </p>
          <h2 className="mt-4 text-4xl font-bold tracking-wide text-brand-maroon sm:text-5xl font-serif">
            A simple path from question to clarity.
          </h2>
        </div>

        <div className="mx-auto mt-20 max-w-5xl">
          <div className="grid gap-12 md:grid-cols-3 md:gap-8">
            {steps.map((step, index) => (
              <div key={step.number} className="relative flex flex-col items-center text-center p-6">
                {/* Visual Connector for Desktop */}
                {index !== steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-full border-t border-brand-gold/40 border-dashed" aria-hidden="true" />
                )}
                <div className="relative mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-brand-parchment text-4xl text-brand-saffron font-devanagari border-2 border-brand-gold/30 shadow-sm z-10">
                  {step.number}
                </div>
                <span className="text-xs tracking-widest text-brand-gold-dark uppercase mb-2">{step.subtitle}</span>
                <h3 className="text-2xl font-bold text-brand-maroon font-serif">
                  {step.title}
                </h3>
                <p className="mt-4 leading-relaxed text-charcoal/80">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
