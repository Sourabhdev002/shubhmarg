-- Migration: 06_calendar_events
-- Description: Creates the calendar_events table for the ShubhMarg Mobile-First Hindu Calendar

CREATE TABLE IF NOT EXISTS public.calendar_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    event_type TEXT NOT NULL, -- festival, ekadashi, purnima, amavasya, sankranti, vrat
    date DATE NOT NULL, -- India (Asia/Kolkata) date
    tithi_name TEXT,
    lunar_month TEXT,
    description TEXT,
    significance TEXT,
    puja_guidance TEXT,
    mantra TEXT,
    dos TEXT,
    donts TEXT,
    image_url TEXT,
    seo_title TEXT,
    seo_description TEXT,
    published BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE public.calendar_events ENABLE ROW LEVEL SECURITY;

-- Allow public read access to published events
CREATE POLICY "Allow public read access for published calendar events"
ON public.calendar_events
FOR SELECT
USING (published = true);

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.calendar_events;
