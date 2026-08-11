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
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
        Your Question
      </h2>
      <p className="mt-2 text-sm text-slate-600">
        Tell us what you are seeking guidance about. The more specific you are, the better the guidance can be.
      </p>

      <div className="mt-8">
        <label htmlFor="question" className="block text-sm font-medium leading-6 text-slate-900">
          What is on your mind? <span className="text-red-500">*</span>
        </label>
        <div className="mt-2">
          <textarea
            id="question"
            name="question"
            rows={5}
            value={formData.question}
            onChange={handleChange}
            className="block w-full rounded-md border-0 py-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6 px-3 resize-y"
            placeholder="e.g. I am facing a dilemma regarding a career change..."
            maxLength={1000}
          />
        </div>
        <div className="mt-2 flex items-start justify-between text-xs text-slate-500">
          <p>Minimum 10 characters.</p>
          <p>{formData.question.length} / 1000</p>
        </div>
      </div>

      <div className="mt-6 rounded-md bg-blue-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <Info className="h-5 w-5 text-blue-400" aria-hidden="true" />
          </div>
          <div className="ml-3 flex-1 md:flex md:justify-between">
            <p className="text-sm text-blue-700">
              Your privacy is respected. Please share only what you feel comfortable with. Avoid providing highly sensitive financial or medical information.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="text-sm font-semibold text-slate-900 hover:text-amber-700 transition-colors"
        >
          &larr; Back
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!isFormValid}
          className="rounded-full bg-slate-900 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          Next step
        </button>
      </div>
    </div>
  );
}
