import { GuidanceFormData } from "@/types/guidance";
import { CheckCircle2 } from "lucide-react";
import { SERVICE_PRICING } from "@/lib/pricing";

interface Props {
  formData: GuidanceFormData;
  updateForm: (fields: Partial<GuidanceFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const SERVICES = [
  { id: "vedic-guidance", name: "Personalized Vedic Guidance" },
  { id: "career-business", name: "Career & Business Guidance" },
  { id: "marriage", name: "Marriage & Relationship Guidance" },
  { id: "kundli", name: "Kundli Analysis" },
  { id: "muhurat", name: "Muhurat Guidance" },
  { id: "remedy", name: "Traditional Remedy Guidance" },
  { id: "jaap", name: "Jaap / Spiritual Service" },
];

export default function StepService({ formData, updateForm, onNext, onBack }: Props) {
  const handleSelect = (serviceId: string) => {
    updateForm({ service: serviceId });
  };

  const isSelected = (serviceId: string) => formData.service === serviceId;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
        Select a Service
      </h2>
      <p className="mt-2 text-sm text-slate-600">
        Choose the type of traditional service that best fits your needs.
      </p>

      <div className="mt-8 grid gap-4">
        {SERVICES.map((service) => {
          const selected = isSelected(service.id);
          return (
            <button
              key={service.id}
              type="button"
              onClick={() => handleSelect(service.id)}
              className={`relative flex cursor-pointer rounded-xl border p-5 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-all ${
                selected
                  ? "border-amber-600 bg-amber-50 shadow-sm"
                  : "border-slate-200 bg-white hover:border-amber-300 hover:bg-stone-50"
              }`}
            >
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center">
                  <div className="text-base">
                    <p
                      className={`font-semibold ${
                        selected ? "text-amber-900" : "text-slate-900"
                      }`}
                    >
                      {service.name}
                    </p>
                    <p className={`text-sm mt-1 font-medium ${
                      selected ? "text-amber-700" : "text-slate-500"
                    }`}>
                      ₹{SERVICE_PRICING[service.id] || 501}
                    </p>
                  </div>
                </div>
                {selected && (
                  <div className="shrink-0 text-amber-600">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                )}
              </div>
            </button>
          );
        })}
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
          disabled={!formData.service}
          className="rounded-full bg-slate-900 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          Next step
        </button>
      </div>
    </div>
  );
}
