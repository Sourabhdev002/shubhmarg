-- Migration: Add privacy consent tracking
ALTER TABLE guidance_requests 
ADD COLUMN privacy_consent BOOLEAN NOT NULL DEFAULT FALSE,
ADD COLUMN privacy_consent_at TIMESTAMPTZ;
