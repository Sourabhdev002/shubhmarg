-- Migration: 07_calendar_occurrences
-- Description: Split calendar_events into editorial content and calculated dates (occurrences)

-- 1. Create the occurrences table
CREATE TABLE IF NOT EXISTS public.calendar_occurrences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID NOT NULL REFERENCES public.calendar_events(id) ON DELETE CASCADE,
    date DATE NOT NULL, -- India (Asia/Kolkata) date
    tithi_name TEXT,
    lunar_month TEXT,
    calculation_source TEXT, -- e.g. "prokerala-api", "manual"
    calculation_version TEXT, -- e.g. "2026-v1"
    is_verified BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    -- A specific event should only occur once per date
    UNIQUE(event_id, date)
);

-- 2. Migrate existing data (if any was manually entered during phase 1/2)
INSERT INTO public.calendar_occurrences (event_id, date, tithi_name, lunar_month, calculation_source, calculation_version)
SELECT id, date, tithi_name, lunar_month, 'legacy_manual', 'v1'
FROM public.calendar_events
WHERE date IS NOT NULL;

-- 3. (Skipped) Do not drop columns from calendar_events to remain non-destructive
-- ALTER TABLE public.calendar_events 
-- DROP COLUMN IF EXISTS date,
-- DROP COLUMN IF EXISTS tithi_name,
-- DROP COLUMN IF EXISTS lunar_month;

-- 4. RLS Policies for occurrences
ALTER TABLE public.calendar_occurrences ENABLE ROW LEVEL SECURITY;

-- Allow public read access to occurrences if their parent event is published
CREATE POLICY "Allow public read access for occurrences of published events"
ON public.calendar_occurrences
FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM public.calendar_events 
        WHERE id = calendar_occurrences.event_id 
        AND published = true
    )
);

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.calendar_occurrences;
