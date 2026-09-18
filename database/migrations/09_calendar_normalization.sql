-- Phase 9B Minimal Schema Migration Proposal
-- Adds normalization fields to calendar_occurrences without destroying existing data.

ALTER TABLE public.calendar_occurrences
ADD COLUMN source_name text,
ADD COLUMN variant text;

-- Notes: 
-- 1. `event_type` is already a column in `calendar_events` (canonical metadata), so we do NOT need it in `calendar_occurrences`. The `calendar_occurrences` table only needs to store properties unique to the specific provider calculation (source_name and variant).
-- 2. `variant` allows multiple regional variants of the same event_id on the same (or different) dates without colliding, but we need to update the UNIQUE constraint.
-- 3. The current UNIQUE constraint is `ON CONFLICT (event_id, date)`. This would block "Janmashtami (Standard)" and "Janmashtami (ISKCON)" from occurring on the same date.
-- Proposed Constraint Update (Requires dropping the old constraint if it was explicitly named, or altering it):

-- ALTER TABLE public.calendar_occurrences DROP CONSTRAINT calendar_occurrences_event_id_date_key;
-- ALTER TABLE public.calendar_occurrences ADD CONSTRAINT calendar_occurrences_event_id_date_variant_key UNIQUE NULLS NOT DISTINCT (event_id, date, variant);
