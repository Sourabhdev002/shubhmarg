-- Migration: Add payment tracking fields to guidance_requests

-- Create payment_status enum
CREATE TYPE payment_status_enum AS ENUM ('unpaid', 'payment_verification', 'paid', 'payment_failed', 'refunded');

-- Add columns to guidance_requests
ALTER TABLE guidance_requests
ADD COLUMN payment_status payment_status_enum NOT NULL DEFAULT 'unpaid',
ADD COLUMN payment_amount INTEGER,
ADD COLUMN payment_currency TEXT NOT NULL DEFAULT 'INR',
ADD COLUMN payment_utr TEXT UNIQUE,
ADD COLUMN payment_submitted_at TIMESTAMPTZ,
ADD COLUMN paid_at TIMESTAMPTZ,
ADD COLUMN payment_verified_by TEXT,
ADD COLUMN payment_verification_note TEXT;

-- Note: RLS is already enabled and service_role has privileges.
-- We do not add public RLS policies, maintaining the existing security model.
