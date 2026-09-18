import React from "react";
import SupportRequestForm from "@/components/support/SupportRequestForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support | ShubhMarg",
  description: "Contact ShubhMarg support for assistance with your guidance requests.",
};

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-brand-ivory py-16 px-6 pb-nav-safe">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold tracking-wide text-brand-maroon font-serif mb-4">
            Support
          </h1>
          <p className="text-brand-charcoal/70 text-lg">
            How can we assist you today? Please fill out the form below and we will respond as soon as possible.
          </p>
        </div>

        <div className="bg-[#fbf9f4] sm:rounded-2xl p-6 sm:p-10 shadow-[0_8px_40px_rgba(212,175,55,0.08)] sm:border sm:border-[#d4af37]/30 overflow-hidden relative">
          <SupportRequestForm />
        </div>
      </div>
    </div>
  );
}

