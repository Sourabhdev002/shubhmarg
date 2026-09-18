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
    setTimeout(() => {
      onNext();
    }, 350);
  };

  const isSelected = (concern: string) => formData.concern === concern;

  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight text-brand-charcoal sm:text-4xl font-serif">
        What are you seeking guidance about?
      </h2>
      <p className="mt-3 text-[15px] sm:text-base text-brand-charcoal/70">
        Select the main area of your life where you need clarity.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {CONCERNS.map((concern) => {
          const selected = isSelected(concern);
          return (
            <button
              key={concern}
              onClick={() => handleSelect(concern)}
              className={`relative flex cursor-pointer rounded-xl border p-5 focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:ring-offset-2 transition-all duration-300 active:scale-[0.98] overflow-hidden group ${
                selected
                  ? "border-[#d4af37] shadow-[0_4px_20px_rgba(212,175,55,0.15)] bg-white"
                  : "border-[#d4af37]/20 bg-[#fbf9f4]/50 hover:shadow-[0_4px_20px_rgba(212,175,55,0.1)] hover:-translate-y-0.5 hover:bg-[#fbf9f4]"
              }`}
            >
              {/* Subtle selected/hover gradient */}
              <div className={`absolute inset-0 bg-gradient-to-r from-[#d4af37]/10 to-transparent transition-opacity duration-300 pointer-events-none ${selected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
              
              <div className="flex w-full items-center justify-between relative z-10">
                <div className="flex items-center">
                  <div className="text-[15px] sm:text-[16px]">
                    <p className={`font-serif font-bold ${selected ? "text-brand-maroon" : "text-brand-charcoal group-hover:text-brand-maroon transition-colors"}`}>
                      {concern}
                    </p>
                  </div>
                </div>
                {selected && (
                  <div className="shrink-0 text-[#d4af37]">
                    <CheckCircle2 className="h-6 w-6 drop-shadow-sm" />
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>


    </div>
  );
}
