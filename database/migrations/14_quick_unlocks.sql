-- Migration 14: quick_unlocks
-- Records every Rs11 "Aaj Ka Aashirwad" unlock (and similar small instant products).
-- Written by POST /api/quick-unlock using the service_role key (best-effort log).
-- Run once in Supabase -> SQL Editor. Safe to re-run (IF NOT EXISTS).

CREATE TABLE IF NOT EXISTS public.quick_unlocks (
    id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    reference_id   TEXT NOT NULL UNIQUE,
    product        TEXT NOT NULL,
    rashi          TEXT,
    customer_name  TEXT,
    customer_phone TEXT,
    amount         NUMERIC(10,2) NOT NULL CHECK (amount > 0),
    status         TEXT NOT NULL DEFAULT 'claimed'
                   CHECK (status IN ('claimed', 'verified', 'rejected'))
);

CREATE INDEX IF NOT EXISTS quick_unlocks_created_at_idx ON public.quick_unlocks (created_at DESC);

-- Private table: no anon/authenticated policies. Only the server (service_role) reads/writes.
ALTER TABLE public.quick_unlocks ENABLE ROW LEVEL SECURITY;
GRANT SELECT, INSERT, UPDATE ON public.quick_unlocks TO service_role;