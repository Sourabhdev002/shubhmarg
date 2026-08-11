export interface GuidanceFormData {
  concern: string;
  fullName: string;
  dateOfBirth: string;
  timeOfBirth: string; // optional
  birthPlace: string;
  currentCity: string;
  preferredLanguage: string;
  question: string;
  service: string;
}

export const initialGuidanceFormData: GuidanceFormData = {
  concern: "",
  fullName: "",
  dateOfBirth: "",
  timeOfBirth: "",
  birthPlace: "",
  currentCity: "",
  preferredLanguage: "",
  question: "",
  service: "",
};
