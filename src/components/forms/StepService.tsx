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
    setTimeout(() => {
      onNext();
    }, 350);
  };

  const isSelected = (serviceId: string) => formData.service === serviceId;

  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight text-brand-charcoal sm:text-4xl font-serif">
        Select a Service
      </h2>
      <p className="mt-4 text-base text-brand-charcoal/70">
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
                      {service.name}
                    </p>
                    <p className={`text-sm mt-1 font-medium ${
                      selected ? "text-amber-700" : "text-brand-charcoal/50"
                    }`}>
                      ₹{SERVICE_PRICING[service.id] || 501}
                    </p>
                  </div>
                </div>
                {selected && (
                  <div className="shrink-0 text-[#d4af37]">
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
          className="text-sm font-semibold text-brand-charcoal active:text-brand-maroon md:hover:text-brand-maroon transition-colors p-2 -ml-2"
        >
          &larr; Back
        </button>
      </div>
    </div>
  );
}
