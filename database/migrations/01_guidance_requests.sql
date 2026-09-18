-- Migration: Create guidance_requests table

-- Create an enum for request status
CREATE TYPE request_status AS ENUM ('pending', 'reviewing', 'completed', 'cancelled');

-- Create the main table
CREATE TABLE guidance_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    reference_id TEXT NOT NULL UNIQUE,
    status request_status NOT NULL DEFAULT 'pending',
    
    -- Request details
    concern TEXT NOT NULL,
    full_name TEXT NOT NULL,
    date_of_birth DATE NOT NULL,
    time_of_birth TIME, -- Optional
    birth_place TEXT NOT NULL,
    current_city TEXT NOT NULL,
    preferred_language TEXT NOT NULL,
    question TEXT NOT NULL,
    service TEXT NOT NULL,
    notes TEXT
);

-- Enable Row Level Security (RLS)
ALTER TABLE guidance_requests ENABLE ROW LEVEL SECURITY;

-- Note: We are explicitly NOT creating any RLS policies for anonymous users.
-- This ensures that customers cannot read, update, or delete requests.
-- All insertions will be handled server-side using the SUPABASE_SERVICE_ROLE_KEY,
-- which intentionally bypasses RLS after performing strict data validation.

-- Grant necessary privileges to the service_role
GRANT ALL ON public.guidance_requests TO service_role;

