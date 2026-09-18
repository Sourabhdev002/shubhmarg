import "server-only";

const ASTROLOGY_API_ACCESS_TOKEN = process.env.ASTROLOGY_API_ACCESS_TOKEN;
const BASE_URL = "https://json.astrologyapi.com/v1";

interface ApiPayload {
  day: number;
  month: number;
  year: number;
  hour: number;
  min: number;
  lat: number;
  lon: number;
  tzone: number;
}

export interface AdvancedPanchangResponse {
  tithi: {
    details: {
      tithi_name: string;
      tithi_number: number;
      special_festival?: string;
    };
    end_time: {
      hour: number;
      minute: number;
      second: number;
    };
  };
  nakshatra: {
    details: {
      nak_name: string;
    };
  };
  yog: {
    details: {
      yog_name: string;
    };
  };
  karan: {
    details: {
      karan_name: string;
    };
  };
  hindu_maah: {
    purnimanta: string;
    amanta: string;
  };
  paksha: string;
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
}

export interface PanchangFestivalResponse {
  festivals: string[] | string;
}

async function callAstrologyApi<T>(endpoint: string, payload: ApiPayload): Promise<T> {
  if (!ASTROLOGY_API_ACCESS_TOKEN) {
    throw new Error("Missing ASTROLOGY_API_ACCESS_TOKEN in environment.");
  }

  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    method: "POST",
    headers: {
      "x-astrologyapi-key": ASTROLOGY_API_ACCESS_TOKEN,
      "Content-Type": "application/json",
      "Accept-Language": "en"
    },
    body: JSON.stringify(payload),
    next: { revalidate: 3600 },
  });

  if (response.status === 429) {
    // Fail fast for rate limit to prevent blocking the serverless thread
    throw new Error(`AstrologyAPI Error: 429 Too Many Requests`);
  }

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      throw new Error(`AstrologyAPI Auth Error: ${response.status}`);
    }
    throw new Error(`AstrologyAPI Error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  
  if (data && data.status === false) {
    if (data.error === "TOO_MANY_REQUESTS") {
       // Fail fast for internal rate limit flag
       throw new Error(`AstrologyAPI Error: 429 Too Many Requests (Internal)`);
    }
    // Allow 'No festivals today' to pass through gracefully
    if (data.festivals === "No festivals today.") {
      return { festivals: [] } as unknown as T;
    }
    throw new Error(`AstrologyAPI internal error: ${JSON.stringify(data)}`);
  }

  return data as T;
}

export async function fetchAdvancedPanchang(day: number, month: number, year: number, lat: number = 28.6139, lon: number = 77.2090, tzone: number = 5.5): Promise<AdvancedPanchangResponse> {
  return callAstrologyApi<AdvancedPanchangResponse>("advanced_panchang", {
    day,
    month,
    year,
    hour: 5,
    min: 30,
    lat,
    lon,
    tzone
  });
}

export async function fetchPanchangFestivals(day: number, month: number, year: number, lat: number = 28.6139, lon: number = 77.2090, tzone: number = 5.5): Promise<PanchangFestivalResponse> {
  return callAstrologyApi<PanchangFestivalResponse>("panchang_festival", {
    day,
    month,
    year,
    hour: 0,
    min: 1,
    lat,
    lon,
    tzone
  });
}
