import { GuidanceFormData } from "@/types/guidance";
import { Info } from "lucide-react";

interface Props {
  formData: GuidanceFormData;
  updateForm: (fields: Partial<GuidanceFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StepQuestion({ formData, updateForm, onNext, onBack }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateForm({ question: e.target.value });
  };

  const isFormValid = formData.question.trim().length >= 10;

  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight text-brand-charcoal sm:text-4xl font-serif">
        Your Question
      </h2>
      <p className="mt-4 text-base text-brand-charcoal/70">
        Tell us what you are seeking guidance about. The more specific you are, the better the guidance can be.
      </p>

      <div className="mt-8">
        <label htmlFor="question" className="block text-sm font-medium leading-6 text-brand-charcoal">
          What is on your mind? <span className="text-brand-maroon">*</span>
        </label>
        <div className="mt-2">
            <textarea
              id="question"
              name="question"
              rows={5}
              value={formData.question}
              onChange={handleChange}
              className="block w-full rounded-md border-0 py-3 text-[16px] md:text-sm text-brand-charcoal shadow-[0_2px_10px_rgba(212,175,55,0.05)] ring-1 ring-inset ring-[#d4af37]/30 placeholder:text-brand-charcoal/40 focus:ring-2 focus:ring-inset focus:ring-[#d4af37] sm:leading-6 px-4 resize-y min-h-[120px] bg-white transition-all"
              placeholder="e.g. I am facing a dilemma regarding a career change..."
              maxLength={1000}
            />
        </div>
        <div className="mt-2 flex items-start justify-between text-xs text-brand-charcoal/50">
          <p>Minimum 10 characters.</p>
          <p>{formData.question.length} / 1000</p>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-[#d4af37]/20 bg-[#d4af37]/10 p-4 sm:p-5">
        <div className="flex">
          <div className="flex-shrink-0">
            <Info className="h-5 w-5 text-[#d4af37]" aria-hidden="true" />
          </div>
          <div className="ml-3 flex-1 md:flex md:justify-between">
            <p className="text-[14px] text-brand-charcoal/80 leading-relaxed font-medium">
              Your privacy is respected. Please share only what you feel comfortable with. Avoid providing highly sensitive financial or medical information.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="text-sm font-semibold text-brand-charcoal active:text-brand-maroon md:hover:text-brand-maroon transition-colors p-2 -ml-2"
        >
          &larr; Back
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!isFormValid}
          className="rounded-full bg-brand-maroon px-8 py-3.5 text-sm font-semibold text-white shadow-sm active:scale-[0.98] active:opacity-90 md:hover:bg-brand-maroon-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-maroon disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          Next step
        </button>
      </div>
    </div>
  );
}
