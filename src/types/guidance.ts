export interface GuidanceFormData {
  concern: string;
  fullName: string;
  email: string;
  dateOfBirth: string;
  timeOfBirth: string; // optional
  birthPlace: string;
  currentCity: string;
  preferredLanguage: string;
  question: string;
  service: string;
  privacyConsent: boolean;
}

export const initialGuidanceFormData: GuidanceFormData = {
  concern: "",
  fullName: "",
  email: "",
  dateOfBirth: "",
  timeOfBirth: "",
  birthPlace: "",
  currentCity: "",
  preferredLanguage: "",
  question: "",
  service: "",
  privacyConsent: false,
};
