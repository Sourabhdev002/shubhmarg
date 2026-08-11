"use client";

import { useState } from "react";
import { GuidanceFormData, initialGuidanceFormData } from "@/types/guidance";
import StepConcern from "@/components/forms/StepConcern";
import StepBirthDetails from "@/components/forms/StepBirthDetails";
import StepQuestion from "@/components/forms/StepQuestion";
import StepService from "@/components/forms/StepService";
import StepReview from "@/components/forms/StepReview";
import { CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { submitGuidanceRequest } from "@/app/request-guidance/actions";

const STEPS = [
  { id: 1, name: "Concern" },
  { id: 2, name: "Details" },
  { id: 3, name: "Question" },
  { id: 4, name: "Service" },
  { id: 5, name: "Review" },
];

export default function GuidanceRequestForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<GuidanceFormData>(initialGuidanceFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [referenceId, setReferenceId] = useState("");
  const [submitError, setSubmitError] = useState("");

  const updateForm = (fields: Partial<GuidanceFormData>) => {
    setFormData((prev) => ({ ...prev, ...fields }));
    if (submitError) setSubmitError(""); // Clear error on edit
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 5));
  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    if (submitError) setSubmitError("");
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError("");
    
    const result = await submitGuidanceRequest(formData);
    
    if (result.success && result.referenceId) {
      setReferenceId(result.referenceId);
      setIsSuccess(true);
    } else {
      setSubmitError(result.error || "An unexpected error occurred.");
    }
    
    setIsSubmitting(false);
  };

  if (isSuccess) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 text-center animate-in zoom-in-95 duration-500">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 className="h-10 w-10 text-green-600" />
        </div>
        <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 font-serif">
          Request Received
        </h2>
        <p className="mt-4 text-lg text-slate-600 font-serif">
          Thank you, {formData.fullName}. We have securely logged your request.
        </p>
        <div className="mt-8 rounded-sm border border-brand-gold/30 bg-brand-parchment p-6">
          <p className="text-xs font-semibold text-brand-gold-dark uppercase tracking-widest">Reference ID</p>
          <p className="mt-2 text-2xl font-bold text-brand-maroon tracking-wider font-mono">{referenceId}</p>
        </div>
        <div className="mt-8 text-left text-charcoal/80 space-y-4">
          <p><strong>Next steps:</strong></p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Your request requires payment to be processed.</li>
            <li>Once you complete the offering via UPI, our practitioners will begin their review.</li>
          </ul>
        </div>
        <div className="mt-10 flex flex-col items-center gap-4">
          <Link
            href={`/payment/${referenceId}`}
            className="rounded-sm bg-brand-maroon px-10 py-4 text-sm md:text-base font-bold tracking-widest uppercase text-brand-ivory shadow-sm hover:bg-brand-maroon-dark transition-all border border-brand-maroon w-full max-w-xs text-center"
          >
            Complete Offering
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      {/* Progress Bar */}
      <nav aria-label="Progress">
        <ol role="list" className="space-y-4 md:flex md:space-x-8 md:space-y-0">
          {STEPS.map((step) => (
            <li key={step.name} className="md:flex-1">
              <div
                className={`group flex flex-col border-l-4 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4 ${
                  currentStep > step.id
                    ? "border-amber-600"
                    : currentStep === step.id
                    ? "border-amber-600"
                    : "border-slate-200"
                }`}
              >
                <span
                  className={`text-sm font-medium ${
                    currentStep > step.id
                      ? "text-amber-600"
                      : currentStep === step.id
                      ? "text-amber-600"
                      : "text-slate-500"
                  }`}
                >
                  Step {step.id}
                </span>
                <span className="text-sm font-medium text-slate-900">{step.name}</span>
              </div>
            </li>
          ))}
        </ol>
      </nav>

      <div className="mt-12 bg-white sm:rounded-2xl sm:p-8 sm:shadow-sm sm:ring-1 sm:ring-slate-200">
        {submitError && (
          <div className="mb-8 rounded-md bg-red-50 p-4 border border-red-200">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Submission failed</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{submitError}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <StepConcern formData={formData} updateForm={updateForm} onNext={nextStep} />
        )}
        {currentStep === 2 && (
          <StepBirthDetails
            formData={formData}
            updateForm={updateForm}
            onNext={nextStep}
            onBack={prevStep}
          />
        )}
        {currentStep === 3 && (
          <StepQuestion
            formData={formData}
            updateForm={updateForm}
            onNext={nextStep}
            onBack={prevStep}
          />
        )}
        {currentStep === 4 && (
          <StepService
            formData={formData}
            updateForm={updateForm}
            onNext={nextStep}
            onBack={prevStep}
          />
        )}
        {currentStep === 5 && (
          <StepReview
            formData={formData}
            onSubmit={handleSubmit}
            onBack={prevStep}
            isSubmitting={isSubmitting}
          />
        )}
      </div>
    </div>
  );
}
