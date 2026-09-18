-- Migration: Create support_requests table

CREATE TYPE support_status AS ENUM ('open', 'in_progress', 'resolved');

CREATE TABLE support_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    reference_id TEXT, -- Optional linkage to a guidance request
    message TEXT NOT NULL,
    status support_status NOT NULL DEFAULT 'open'
);

-- Enable RLS
ALTER TABLE support_requests ENABLE ROW LEVEL SECURITY;

-- Explicitly revoke access from anon and authenticated users
REVOKE ALL ON public.support_requests FROM anon, authenticated;

-- Grant access to service_role (used by server actions)
GRANT ALL ON public.support_requests TO service_role;
