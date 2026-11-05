export interface GuidanceFormData {
  concern: string;
  fullName: string;
  email: string; // legacy; the server builds the email when `phone` is sent
  phone?: string; // 10-digit Indian mobile (raw input is re-normalized server-side)
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
