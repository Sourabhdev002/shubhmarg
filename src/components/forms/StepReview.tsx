"use client";

import Link from "next/link";
import { GuidanceFormData } from "@/types/guidance";
import { SERVICE_PRICING } from "@/lib/pricing";
import { motion } from "framer-motion";
import { Lock, ShieldCheck } from "lucide-react";

interface Props {
  formData: GuidanceFormData;
  updateForm: (fields: Partial<GuidanceFormData>) => void;
  onSubmit: () => void;
  onBack: () => void;
  isSubmitting: boolean;
}

export default function StepReview({ formData, updateForm, onSubmit, onBack, isSubmitting }: Props) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-brand-maroon font-serif">
        Review Your Request
      </h2>
      <p className="mt-2 text-sm sm:text-base text-brand-charcoal/70">
        Please review your details before submitting.
      </p>

      <div className="mt-6 sm:mt-8 overflow-hidden rounded-xl border border-[#d4af37]/30 bg-white shadow-[0_4px_20px_rgba(212,175,55,0.08)]">
        <dl className="divide-y divide-[#d4af37]/20">
          <div className="px-4 py-3 sm:py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-brand-maroon/80">Area of Concern</dt>
            <dd className="mt-1 text-sm leading-6 text-charcoal sm:col-span-2 sm:mt-0 font-medium">
              {formData.concern}
            </dd>
          </div>
          <div className="px-4 py-3 sm:py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-brand-maroon/80">Full Name</dt>
            <dd className="mt-1 text-sm leading-6 text-charcoal sm:col-span-2 sm:mt-0 font-medium">
              {formData.fullName}
            </dd>
          </div>
          <div className="px-4 py-3 sm:py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-brand-maroon/80">Email Address</dt>
            <dd className="mt-1 text-sm leading-6 text-charcoal sm:col-span-2 sm:mt-0 font-medium">
              {formData.email}
            </dd>
          </div>
          <div className="px-4 py-3 sm:py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-brand-maroon/80">Date of Birth</dt>
            <dd className="mt-1 text-sm leading-6 text-charcoal sm:col-span-2 sm:mt-0 font-medium">
              {formData.dateOfBirth}
            </dd>
          </div>
          <div className="px-4 py-3 sm:py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-brand-maroon/80">Time of Birth</dt>
            <dd className="mt-1 text-sm leading-6 text-charcoal sm:col-span-2 sm:mt-0 font-medium">
              {formData.timeOfBirth || "Not provided"}
            </dd>
          </div>
          <div className="px-4 py-3 sm:py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-brand-maroon/80">Place of Birth</dt>
            <dd className="mt-1 text-sm leading-6 text-charcoal sm:col-span-2 sm:mt-0 font-medium">
              {formData.birthPlace}
            </dd>
          </div>
          <div className="px-4 py-3 sm:py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-brand-maroon/80">Current City</dt>
            <dd className="mt-1 text-sm leading-6 text-charcoal sm:col-span-2 sm:mt-0 font-medium">
              {formData.currentCity}
            </dd>
          </div>
          <div className="px-4 py-3 sm:py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-brand-maroon/80">Language</dt>
            <dd className="mt-1 text-sm leading-6 text-charcoal sm:col-span-2 sm:mt-0 font-medium">
              {formData.preferredLanguage}
            </dd>
          </div>
          <div className="px-4 py-3 sm:py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-brand-maroon/80">Question</dt>
            <dd className="mt-1 text-sm leading-6 text-charcoal sm:col-span-2 sm:mt-0 font-medium">
              {formData.question}
            </dd>
          </div>
          <div className="px-4 py-3 sm:py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 bg-brand-gold/5 border-t border-brand-gold/20">
            <dt className="text-sm font-medium text-brand-maroon/80">Selected Service</dt>
            <dd className="mt-1 text-sm font-semibold text-brand-maroon sm:col-span-2 sm:mt-0">
              {formData.service.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
            </dd>
          </div>
          <div className="px-4 py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 bg-[#d4af37]/10">
            <dt className="text-sm font-bold text-brand-maroon flex items-center">Total Amount to Pay</dt>
            <dd className="mt-1 text-xl sm:text-2xl font-bold text-brand-maroon sm:col-span-2 sm:mt-0">
              ₹{SERVICE_PRICING[formData.service] || 501}
            </dd>
          </div>
        </dl>
      </div>

      <div className="mt-6 sm:mt-8 rounded-xl bg-[#d4af37]/5 p-5 border border-[#d4af37]/20">
        <p className="text-xs sm:text-sm text-brand-charcoal/80">
          <strong className="text-brand-maroon">Disclaimer:</strong> By submitting this request, you understand that Vedic astrology and traditional spiritual practices are intended as guidance and that specific life outcomes cannot be guaranteed.
        </p>
      </div>

      <div className="mt-6 flex items-start px-1">
        <div className="flex h-6 items-center">
          <input
            id="consent"
            name="consent"
            type="checkbox"
            checked={formData.privacyConsent}
            onChange={(e) => updateForm({ privacyConsent: e.target.checked })}
            className="h-4 w-4 sm:h-5 sm:w-5 rounded border-[#d4af37] text-brand-maroon focus:ring-brand-maroon cursor-pointer"
          />
        </div>
        <div className="ml-3 text-xs sm:text-sm leading-6">
          <label htmlFor="consent" className="font-medium text-charcoal cursor-pointer">
            Privacy and Consent
          </label>
          <p className="text-brand-charcoal/70 leading-relaxed mt-1">
            I agree to the <Link href="/privacy-policy" className="text-brand-saffron underline hover:text-brand-maroon transition-colors" target="_blank">Privacy Policy</Link> and <Link href="/terms" className="text-brand-saffron underline hover:text-brand-maroon transition-colors" target="_blank">Terms of Service</Link>, and I consent to ShubhMarg using the information I provide to prepare and deliver my requested guidance.
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mt-10 flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="w-full sm:w-auto py-3 text-sm font-semibold text-charcoal hover:text-brand-maroon transition-colors disabled:opacity-50 text-center"
        >
          &larr; Back to edit
        </button>
        <div className="flex flex-col items-center sm:items-end w-full sm:w-auto">
          <button
            type="button"
            onClick={onSubmit}
            disabled={isSubmitting || !formData.privacyConsent}
            className="w-full sm:w-auto rounded-sm bg-brand-maroon px-8 py-3 sm:py-4 text-sm font-bold uppercase tracking-widest text-brand-ivory shadow-md hover:bg-brand-maroon-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-maroon disabled:opacity-50 disabled:cursor-not-allowed transition-all flex justify-center items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              `Proceed to Payment (₹${SERVICE_PRICING[formData.service] || 501})`
            )}
          </button>
          
          <div className="flex items-center gap-5 mt-4 text-brand-charcoal/70 text-[11px] font-bold uppercase tracking-widest">
            <span className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-[#d4af37]" /> Secure Checkout
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" /> 100% Confidential
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
