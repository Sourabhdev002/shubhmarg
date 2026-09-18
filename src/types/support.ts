export type SupportStatus = "open" | "in_progress" | "resolved";

export interface SupportRequest {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  reference_id: string | null;
  message: string;
  status: SupportStatus;
}

export interface SupportFormData {
  fullName: string;
  email: string;
  referenceId?: string;
  message: string;
}
