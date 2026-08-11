import { GuidanceFormData } from "@/types/guidance";
import { CheckCircle2 } from "lucide-react";

interface Props {
  formData: GuidanceFormData;
  updateForm: (fields: Partial<GuidanceFormData>) => void;
  onNext: () => void;
}

const CONCERNS = [
  "Career / Job",
  "Business",
  "Marriage / Relationship",
  "Family",
  "Education",
  "Finance",
  "Property",
  "General Guidance",
  "Spiritual Guidance",
  "Other",
];

export default function StepConcern({ formData, updateForm, onNext }: Props) {
  const handleSelect = (concern: string) => {
    updateForm({ concern });
  };

  const isSelected = (concern: string) => formData.concern === concern;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
        What are you seeking guidance about?
      </h2>
      <p className="mt-2 text-sm text-slate-600">
        Select the main area of your life where you need clarity.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {CONCERNS.map((concern) => {
          const selected = isSelected(concern);
          return (
            <button
              key={concern}
              type="button"
              onClick={() => handleSelect(concern)}
              className={`relative flex cursor-pointer rounded-xl border p-4 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-all ${
                selected
                  ? "border-amber-600 bg-amber-50 shadow-sm"
                  : "border-slate-200 bg-white hover:border-amber-300 hover:bg-stone-50"
              }`}
            >
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center">
                  <div className="text-sm">
                    <p
                      className={`font-medium ${
                        selected ? "text-amber-900" : "text-slate-900"
                      }`}
                    >
                      {concern}
                    </p>
                  </div>
                </div>
                {selected && (
                  <div className="shrink-0 text-amber-600">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-10 flex justify-end">
        <button
          type="button"
          onClick={onNext}
          disabled={!formData.concern}
          className="rounded-full bg-slate-900 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          Next step
        </button>
      </div>
    </div>
  );
}
