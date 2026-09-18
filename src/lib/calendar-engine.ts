import { supabaseServer } from "./supabase";
import { fetchPanchangFestivals, fetchAdvancedPanchang } from "./astrologyapi";
import { getCatalogEntry } from "./event-catalog";

export interface GenerationSummary {
  success: boolean;
  requested: number;
  received: number;
  mapped: number;
  inserted: number;
  updated: number;
  unmapped: string[];
  failed: number;
  error?: string;
}

export async function generateCalendarMonth(year: number, month: number): Promise<GenerationSummary> {
  const summary: GenerationSummary = {
    success: true,
    requested: 0,
    received: 0,
    mapped: 0,
    inserted: 0,
    updated: 0,
    unmapped: [],
    failed: 0,
  };

  try {
    // 1. Fetch existing editorial events from our DB
    const { data: events, error: eventsError } = await supabaseServer
      .from("calendar_events")
      .select("id, slug");

    if (eventsError) throw eventsError;

    const eventSlugToId = new Map(events?.map((e) => [e.slug, e.id]));
    const occurrencesToUpsert: {
      event_id: string;
      date: string;
      tithi_name: string | null;
      lunar_month: string | null;
      calculation_source: string;
      calculation_version: string;
      is_verified: boolean;
      source_name: string;
      variant: string | null;
    }[] = [];
    
    const panchangToUpsert: {
      date: string;
      tithi: string | null;
      paksha: string | null;
      lunar_month: string | null;
      nakshatra: string | null;
      yoga: string | null;
      karana: string | null;
      sunrise: string | null;
      sunset: string | null;
      moonrise: string | null;
      moonset: string | null;
    }[] = [];

    // Calculate days in the month
    const daysInMonth = new Date(year, month, 0).getDate();
    summary.requested = daysInMonth;

    // 2. Fetch data from AstrologyAPI for each day sequentially
    for (let day = 1; day <= daysInMonth; day++) {
      try {
        // Sleep 1 second before fetching for the day
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const response = await fetchPanchangFestivals(day, month, year);
        
        // Sleep 1 second before fetching advanced_panchang
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Fetch daily panchang
        const panchangResponse = await fetchAdvancedPanchang(day, month, year);
        const pDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        
        panchangToUpsert.push({
          date: pDate,
          tithi: panchangResponse.tithi?.details?.tithi_name || null,
          paksha: panchangResponse.paksha || null,
          lunar_month: panchangResponse.hindu_maah?.purnimanta || null,
          nakshatra: panchangResponse.nakshatra?.details?.nak_name || null,
          yoga: panchangResponse.yog?.details?.yog_name || null,
          karana: panchangResponse.karan?.details?.karan_name || null,
          sunrise: panchangResponse.sunrise || null,
          sunset: panchangResponse.sunset || null,
          moonrise: panchangResponse.moonrise || null,
          moonset: panchangResponse.moonset || null
        });

        if (response.festivals && Array.isArray(response.festivals)) {
          // AstrologyAPI sometimes returns ["Festival1,Festival2"]
          const festivalNames = response.festivals.flatMap(f => f.split(',').map(s => s.trim()));
          summary.received += festivalNames.length;
          
          const processedEventIds = new Set<string>();

          for (const festName of festivalNames) {
            const entry = getCatalogEntry(festName);
            
            if (entry && entry.publish && entry.slug) {
              const eventId = eventSlugToId.get(entry.slug);
              
              if (eventId) {
                if (!processedEventIds.has(eventId)) {
                  summary.mapped += 1;
                  processedEventIds.add(eventId);
                  occurrencesToUpsert.push({
                    event_id: eventId,
                    date: pDate,
                    tithi_name: panchangResponse.tithi?.details?.tithi_name || null,
                    lunar_month: panchangResponse.hindu_maah?.purnimanta || null,
                    calculation_source: 'astrologyapi',
                    calculation_version: '2026-v1',
                    is_verified: true,
                    source_name: festName,
                    variant: entry.variant
                  });
                }
              } else {
                if (!summary.unmapped.includes(festName)) {
                  summary.unmapped.push(festName);
                }
              }
            } else {
              if (!summary.unmapped.includes(festName)) {
                summary.unmapped.push(festName);
              }
            }
          }
        }
      } catch (apiError: unknown) {
        const msg = apiError instanceof Error ? apiError.message : String(apiError);
        console.error(`[Calendar Engine] API fetch failed for ${year}-${month}-${day}:`, msg);
        summary.failed += 1;
        // If it's an Auth Error or Rate Limit, we should stop the month completely
        if (msg.includes("Auth Error") || msg.includes("429")) {
          throw new Error(`Critical API Error on day ${day}: ${msg}`);
        }
        // Otherwise, continue to next day but record failure
      }
    }

    if (panchangToUpsert.length > 0) {
      const { error: pError } = await supabaseServer
        .from("calendar_panchang")
        .upsert(panchangToUpsert, {
          onConflict: 'date',
          ignoreDuplicates: false
        });
      if (pError) throw pError;
    }

    if (occurrencesToUpsert.length === 0) {
      return summary;
    }

    // 3. Upsert into database safely (Idempotency)
    const { error: insertError } = await supabaseServer
      .from("calendar_occurrences")
      .upsert(occurrencesToUpsert, { 
        onConflict: 'event_id,date,variant',
        ignoreDuplicates: false 
      });

    if (insertError) throw insertError;

    summary.inserted = occurrencesToUpsert.length;

    return summary;
  } catch (error: unknown) {
    console.error("[Calendar Engine] Error generating calendar:", error);
    summary.success = false;
    summary.error = error instanceof Error ? error.message : "Unknown error";
    return summary;
  }
}

