import { GuidanceFormData } from "@/types/guidance";

interface Props {
  formData: GuidanceFormData;
  updateForm: (fields: Partial<GuidanceFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StepBirthDetails({ formData, updateForm, onNext, onBack }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    updateForm({ [e.target.name]: e.target.value });
  };

  const isFormValid =
    formData.fullName.trim() !== "" &&
    formData.email.trim() !== "" &&
    /^\S+@\S+\.\S+$/.test(formData.email) &&
    formData.dateOfBirth.trim() !== "" &&
    formData.birthPlace.trim() !== "" &&
    formData.currentCity.trim() !== "" &&
    formData.preferredLanguage.trim() !== "";

  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight text-brand-charcoal sm:text-4xl font-serif">
        Your Details
      </h2>
      <p className="mt-4 text-base text-brand-charcoal/70">
        Please provide accurate details for personalized guidance.
      </p>

      <div className="mt-8 space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="relative">
            <input
              type="text"
              name="fullName"
              id="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="peer block w-full rounded-md border-0 pt-6 pb-2 px-4 text-[16px] md:text-sm text-brand-charcoal shadow-sm ring-1 ring-inset ring-[#d4af37]/30 placeholder:text-transparent focus:ring-2 focus:ring-inset focus:ring-[#d4af37] sm:leading-6 bg-white transition-all"
              placeholder="Full Name"
            />
            <label
              htmlFor="fullName"
              className="absolute left-4 top-2 text-xs font-medium text-brand-charcoal/50 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-[16px] peer-placeholder-shown:md:text-sm peer-placeholder-shown:text-brand-charcoal/40 peer-focus:top-2 peer-focus:text-xs peer-focus:text-[#d4af37] pointer-events-none"
            >
              Full Name <span className="text-brand-maroon">*</span>
            </label>
          </div>
          <div className="relative">
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="peer block w-full rounded-md border-0 pt-6 pb-2 px-4 text-[16px] md:text-sm text-brand-charcoal shadow-sm ring-1 ring-inset ring-[#d4af37]/30 placeholder:text-transparent focus:ring-2 focus:ring-inset focus:ring-[#d4af37] sm:leading-6 bg-white transition-all"
              placeholder="Email Address"
            />
            <label
              htmlFor="email"
              className="absolute left-4 top-2 text-xs font-medium text-brand-charcoal/50 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-[16px] peer-placeholder-shown:md:text-sm peer-placeholder-shown:text-brand-charcoal/40 peer-focus:top-2 peer-focus:text-xs peer-focus:text-[#d4af37] pointer-events-none"
            >
              Email Address <span className="text-brand-maroon">*</span>
            </label>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="dateOfBirth" className="block text-sm font-medium text-brand-charcoal">
              Date of Birth <span className="text-brand-maroon">*</span>
            </label>
            <div className="mt-2">
              <input
                type="date"
                name="dateOfBirth"
                id="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-3 text-[16px] md:text-sm text-brand-charcoal shadow-sm ring-1 ring-inset ring-[#d4af37]/30 placeholder:text-brand-charcoal/40 focus:ring-2 focus:ring-inset focus:ring-[#d4af37] sm:leading-6 px-3"
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between">
              <label htmlFor="timeOfBirth" className="block text-sm font-medium text-brand-charcoal">
                Time of Birth
              </label>
              <span className="text-sm text-brand-charcoal/50" id="timeOfBirth-optional">
                Optional
              </span>
            </div>
            <div className="mt-2">
              <input
                type="time"
                name="timeOfBirth"
                id="timeOfBirth"
                value={formData.timeOfBirth}
                onChange={handleChange}
                aria-describedby="timeOfBirth-optional"
                className="block w-full rounded-md border-0 py-3 text-[16px] md:text-sm text-brand-charcoal shadow-sm ring-1 ring-inset ring-[#d4af37]/30 placeholder:text-brand-charcoal/40 focus:ring-2 focus:ring-inset focus:ring-[#d4af37] sm:leading-6 px-3"
              />
            </div>
            <p className="mt-1 text-xs text-brand-charcoal/50">
              Required only for accurate Kundli/astrological analysis.
            </p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="relative">
            <input
              type="text"
              name="birthPlace"
              id="birthPlace"
              value={formData.birthPlace}
              onChange={handleChange}
              className="peer block w-full rounded-md border-0 pt-6 pb-2 px-4 text-[16px] md:text-sm text-brand-charcoal shadow-sm ring-1 ring-inset ring-[#d4af37]/30 placeholder:text-transparent focus:ring-2 focus:ring-inset focus:ring-[#d4af37] sm:leading-6 bg-white transition-all"
              placeholder="City, State, Country"
            />
            <label
              htmlFor="birthPlace"
              className="absolute left-4 top-2 text-xs font-medium text-brand-charcoal/50 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-[16px] peer-placeholder-shown:md:text-sm peer-placeholder-shown:text-brand-charcoal/40 peer-focus:top-2 peer-focus:text-xs peer-focus:text-[#d4af37] pointer-events-none"
            >
              Place of Birth <span className="text-brand-maroon">*</span>
            </label>
          </div>
          <div className="relative">
            <input
              type="text"
              name="currentCity"
              id="currentCity"
              value={formData.currentCity}
              onChange={handleChange}
              className="peer block w-full rounded-md border-0 pt-6 pb-2 px-4 text-[16px] md:text-sm text-brand-charcoal shadow-sm ring-1 ring-inset ring-[#d4af37]/30 placeholder:text-transparent focus:ring-2 focus:ring-inset focus:ring-[#d4af37] sm:leading-6 bg-white transition-all"
              placeholder="Where you live now"
            />
            <label
              htmlFor="currentCity"
              className="absolute left-4 top-2 text-xs font-medium text-brand-charcoal/50 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-[16px] peer-placeholder-shown:md:text-sm peer-placeholder-shown:text-brand-charcoal/40 peer-focus:top-2 peer-focus:text-xs peer-focus:text-[#d4af37] pointer-events-none"
            >
              Current City <span className="text-brand-maroon">*</span>
            </label>
          </div>
        </div>

        <div>
          <label htmlFor="preferredLanguage" className="block text-sm font-medium text-brand-charcoal">
            Preferred Language <span className="text-brand-maroon">*</span>
          </label>
          <div className="mt-2">
            <select
              id="preferredLanguage"
              name="preferredLanguage"
              value={formData.preferredLanguage}
              onChange={handleChange}
              className="block w-full rounded-md border-0 py-3 text-[16px] md:text-sm text-brand-charcoal shadow-sm ring-1 ring-inset ring-[#d4af37]/30 focus:ring-2 focus:ring-inset focus:ring-[#d4af37] sm:max-w-xs sm:leading-6 px-3"
            >
              <option value="">Select a language</option>
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="Other">Other</option>
            </select>
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
