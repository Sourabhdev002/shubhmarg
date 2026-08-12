import Link from "next/link";
import { GuidanceFormData } from "@/types/guidance";
import { SERVICE_PRICING } from "@/lib/pricing";

interface Props {
  formData: GuidanceFormData;
  updateForm: (fields: Partial<GuidanceFormData>) => void;
  onSubmit: () => void;
  onBack: () => void;
  isSubmitting: boolean;
}

export default function StepReview({ formData, updateForm, onSubmit, onBack, isSubmitting }: Props) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
        Review Your Request
      </h2>
      <p className="mt-2 text-sm text-slate-600">
        Please review your details before submitting.
      </p>

      <div className="mt-8 overflow-hidden rounded-xl border border-slate-200 bg-white">
        <dl className="divide-y divide-slate-100">
          <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-slate-900">Area of Concern</dt>
            <dd className="mt-1 text-sm leading-6 text-slate-700 sm:col-span-2 sm:mt-0">
              {formData.concern}
            </dd>
          </div>
          <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-slate-900">Full Name</dt>
            <dd className="mt-1 text-sm leading-6 text-slate-700 sm:col-span-2 sm:mt-0">
              {formData.fullName}
            </dd>
          </div>
          <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-slate-900">Email Address</dt>
            <dd className="mt-1 text-sm leading-6 text-slate-700 sm:col-span-2 sm:mt-0">
              {formData.email}
            </dd>
          </div>
          <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-slate-900">Date of Birth</dt>
            <dd className="mt-1 text-sm leading-6 text-slate-700 sm:col-span-2 sm:mt-0">
              {formData.dateOfBirth}
            </dd>
          </div>
          <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-slate-900">Time of Birth</dt>
            <dd className="mt-1 text-sm leading-6 text-slate-700 sm:col-span-2 sm:mt-0">
              {formData.timeOfBirth || "Not provided"}
            </dd>
          </div>
          <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-slate-900">Place of Birth</dt>
            <dd className="mt-1 text-sm leading-6 text-slate-700 sm:col-span-2 sm:mt-0">
              {formData.birthPlace}
            </dd>
          </div>
          <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-slate-900">Current City</dt>
            <dd className="mt-1 text-sm leading-6 text-slate-700 sm:col-span-2 sm:mt-0">
              {formData.currentCity}
            </dd>
          </div>
          <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-slate-900">Language</dt>
            <dd className="mt-1 text-sm leading-6 text-slate-700 sm:col-span-2 sm:mt-0">
              {formData.preferredLanguage}
            </dd>
          </div>
          <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-slate-900">Question</dt>
            <dd className="mt-1 text-sm leading-6 text-slate-700 sm:col-span-2 sm:mt-0">
              {formData.question}
            </dd>
          </div>
          <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 bg-slate-50 border-t border-slate-200">
            <dt className="text-sm font-medium text-slate-900">Selected Service</dt>
            <dd className="mt-1 text-sm font-semibold text-slate-900 sm:col-span-2 sm:mt-0">
              {formData.service.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
            </dd>
          </div>
          <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 bg-amber-50/50">
            <dt className="text-sm font-bold text-amber-900">Total Amount to Pay</dt>
            <dd className="mt-1 text-lg font-bold text-amber-900 sm:col-span-2 sm:mt-0">
              ₹{SERVICE_PRICING[formData.service] || 501}
            </dd>
          </div>
        </dl>
      </div>

      <div className="mt-8 rounded-md bg-amber-50 p-4 border border-amber-200">
        <p className="text-sm text-amber-800">
          <strong>Disclaimer:</strong> By submitting this request, you understand that Vedic astrology and traditional spiritual practices are intended as guidance and that specific life outcomes cannot be guaranteed.
        </p>
      </div>

      <div className="mt-6 flex items-start">
        <div className="flex h-6 items-center">
          <input
            id="consent"
            name="consent"
            type="checkbox"
            checked={formData.privacyConsent}
            onChange={(e) => updateForm({ privacyConsent: e.target.checked })}
            className="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-600"
          />
        </div>
        <div className="ml-3 text-sm leading-6">
          <label htmlFor="consent" className="font-medium text-slate-900">
            Privacy and Consent
          </label>
          <p className="text-slate-600">
            I agree to the <Link href="/privacy-policy" className="text-brand-maroon underline hover:text-brand-saffron" target="_blank">Privacy Policy</Link> and <Link href="/terms" className="text-brand-maroon underline hover:text-brand-saffron" target="_blank">Terms of Service</Link>, and I consent to ShubhMarg using the information I provide to prepare and deliver my requested guidance.
          </p>
        </div>
      </div>

      <div className="mt-10 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="text-sm font-semibold text-slate-900 hover:text-amber-700 transition-colors disabled:opacity-50"
        >
          &larr; Back to edit
        </button>
        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting || !formData.privacyConsent}
          className="rounded-full bg-amber-700 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-amber-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
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
      </div>
    </div>
  );
}
