export type RequestStatus = 'pending' | 'reviewing' | 'completed' | 'cancelled';
export type PaymentStatus = 'unpaid' | 'payment_verification' | 'paid' | 'payment_failed' | 'refunded';

export interface GuidanceRequest {
  id: string;
  created_at: string;
  reference_id: string;
  status: RequestStatus;
  concern: string;
  full_name: string;
  date_of_birth: string;
  time_of_birth: string | null;
  birth_place: string;
  current_city: string;
  preferred_language: string;
  question: string;
  service: string;
  notes: string | null;
  payment_status: PaymentStatus;
  payment_amount: number | null;
  payment_currency: string;
  payment_utr: string | null;
  payment_submitted_at: string | null;
  paid_at: string | null;
  payment_verified_by: string | null;
  payment_verification_note: string | null;
}
