-- Migration: 08_calendar_panchang
-- Description: Store daily panchang calculation from AstrologyAPI to serve Homepage and general panchang needs

CREATE TABLE IF NOT EXISTS public.calendar_panchang (
    date DATE PRIMARY KEY,
    tithi TEXT,
    paksha TEXT,
    lunar_month TEXT,
    nakshatra TEXT,
    yoga TEXT,
    karana TEXT,
    sunrise TEXT,
    sunset TEXT,
    moonrise TEXT,
    moonset TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE public.calendar_panchang ENABLE ROW LEVEL SECURITY;

-- Allow public read access to panchang data
CREATE POLICY "Allow public read access for panchang"
ON public.calendar_panchang
FOR SELECT
USING (true);

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.calendar_panchang;
