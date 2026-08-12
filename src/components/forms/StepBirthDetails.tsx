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
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
        Your Details
      </h2>
      <p className="mt-2 text-sm text-slate-600">
        Please provide accurate details for personalized guidance.
      </p>

      <div className="mt-8 space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-slate-900">
              Full Name <span className="text-red-500">*</span>
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="fullName"
                id="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-2.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6 px-3"
                placeholder="Enter your full name"
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-900">
              Email Address <span className="text-red-500">*</span>
            </label>
            <div className="mt-2">
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-2.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6 px-3"
                placeholder="you@example.com"
              />
            </div>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="dateOfBirth" className="block text-sm font-medium text-slate-900">
              Date of Birth <span className="text-red-500">*</span>
            </label>
            <div className="mt-2">
              <input
                type="date"
                name="dateOfBirth"
                id="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-2.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6 px-3"
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between">
              <label htmlFor="timeOfBirth" className="block text-sm font-medium text-slate-900">
                Time of Birth
              </label>
              <span className="text-sm text-slate-500" id="timeOfBirth-optional">
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
                className="block w-full rounded-md border-0 py-2.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6 px-3"
              />
            </div>
            <p className="mt-1 text-xs text-slate-500">
              Required only for accurate Kundli/astrological analysis.
            </p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="birthPlace" className="block text-sm font-medium text-slate-900">
              Place of Birth <span className="text-red-500">*</span>
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="birthPlace"
                id="birthPlace"
                value={formData.birthPlace}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-2.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6 px-3"
                placeholder="City, State, Country"
              />
            </div>
          </div>
          <div>
            <label htmlFor="currentCity" className="block text-sm font-medium text-slate-900">
              Current City <span className="text-red-500">*</span>
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="currentCity"
                id="currentCity"
                value={formData.currentCity}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-2.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6 px-3"
                placeholder="Where you live now"
              />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="preferredLanguage" className="block text-sm font-medium text-slate-900">
            Preferred Language <span className="text-red-500">*</span>
          </label>
          <div className="mt-2">
            <select
              id="preferredLanguage"
              name="preferredLanguage"
              value={formData.preferredLanguage}
              onChange={handleChange}
              className="block w-full rounded-md border-0 py-2.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:max-w-xs sm:text-sm sm:leading-6 px-3"
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
