export interface HoraPeriod {
  planet: string;
  sanskrit: string;
  startHour: number;
  endHour: number;
  nature: "Auspicious" | "Neutral" | "Challenging";
  bestFor: string;
}

export interface ChoghadiyaPeriod {
  name: string;
  nature: "Amrit (Nectar - Best)" | "Shubh (Auspicious)" | "Labh (Gainful)" | "Chara (Mobile/Travel)" | "Rog (Illness - Avoid)" | "Kaal (Loss - Avoid)" | "Udveg (Anxiety - Avoid)";
  isAuspicious: boolean;
  idealActivities: string;
}

const HORA_ORDER = [
  { planet: "Sun", sanskrit: "Surya", nature: "Auspicious", bestFor: "Government work, authority, signing agreements, leadership" },
  { planet: "Venus", sanskrit: "Shukra", nature: "Auspicious", bestFor: "Purchases, luxury, creative work, romance, jewelry" },
  { planet: "Mercury", sanskrit: "Budha", nature: "Auspicious", bestFor: "Trade, accounts, study, technology, business meetings" },
  { planet: "Moon", sanskrit: "Chandra", nature: "Auspicious", bestFor: "Travel, liquid investments, meeting loved ones, food" },
  { planet: "Saturn", sanskrit: "Shani", nature: "Challenging", bestFor: "Real estate, deep research, discipline, physical labour" },
  { planet: "Jupiter", sanskrit: "Guru", nature: "Auspicious", bestFor: "Spiritual work, major investments, education, new beginnings" },
  { planet: "Mars", sanskrit: "Mangal", nature: "Challenging", bestFor: "Courage, physical sports, surgery, construction" },
] as const;

export function getActiveHora(date: Date = new Date()) {
  const dayOfWeek = date.getDay(); // 0 = Sun, 1 = Mon ...
  const hour = date.getHours();

  // Day starts at 6:00 AM in standard Vedic ephemeris
  const hoursSinceSunrise = (hour - 6 + 24) % 24;

  // Starting ruler of day
  const dayRulerIndexMap = [0, 3, 6, 2, 5, 1, 4]; // Sun, Moon, Mars, Mer, Jup, Ven, Sat
  const dayStartPlanetIndex = dayRulerIndexMap[dayOfWeek];

  const currentHoraIndex = (dayStartPlanetIndex + hoursSinceSunrise) % 7;
  const currentHora = HORA_ORDER[currentHoraIndex];

  return {
    planet: currentHora.planet,
    sanskrit: currentHora.sanskrit,
    nature: currentHora.nature,
    bestFor: currentHora.bestFor,
    activeTimeRange: `${hour}:00 - ${(hour + 1) % 24}:00`,
  };
}

export function getActiveChoghadiya(date: Date = new Date()): ChoghadiyaPeriod {
  const hour = date.getHours();
  // 6:00 to 18:00 is Day, 18:00 to 6:00 is Night
  const timeSlot = Math.floor(((hour - 6 + 24) % 24) / 1.5) % 8;

  const dayChoghadiyaSequence: ChoghadiyaPeriod[] = [
    { name: "Shubh", nature: "Shubh (Auspicious)", isAuspicious: true, idealActivities: "Ceremonies, education, signing contracts, investments" },
    { name: "Rog", nature: "Rog (Illness - Avoid)", isAuspicious: false, idealActivities: "Only medical treatments, avoid starting new ventures" },
    { name: "Udveg", nature: "Udveg (Anxiety - Avoid)", isAuspicious: false, idealActivities: "Routine work only, avoid crucial decisions" },
    { name: "Chara", nature: "Chara (Mobile/Travel)", isAuspicious: true, idealActivities: "Journeys, vehicle purchases, moving, trade" },
    { name: "Labh", nature: "Labh (Gainful)", isAuspicious: true, idealActivities: "Financial gains, business launch, profit initiatives" },
    { name: "Amrit", nature: "Amrit (Nectar - Best)", isAuspicious: true, idealActivities: "All auspicious tasks, marriage talks, medical recovery" },
    { name: "Kaal", nature: "Kaal (Loss - Avoid)", isAuspicious: false, idealActivities: "Avoid financial investments and legal filings" },
    { name: "Shubh", nature: "Shubh (Auspicious)", isAuspicious: true, idealActivities: "General positive beginnings and consultations" },
  ];

  return dayChoghadiyaSequence[timeSlot];
}

export interface MuhuratWindow {
  name: string;
  sanskrit: string;
  timeRange: string;
  isAuspicious: boolean;
  isNow: boolean;
  description: string;
}

export function getDailyMuhuratTimings(date: Date = new Date()): {
  rahuKaal: MuhuratWindow;
  abhijit: MuhuratWindow;
  yamaganda: MuhuratWindow;
  brahmaMuhurta: MuhuratWindow;
  godhuli: MuhuratWindow;
  activeWindow: MuhuratWindow | null;
} {
  const istDate = new Date(date.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
  const day = istDate.getDay(); // 0 = Sun, 1 = Mon ... 6 = Sat
  const currentMinutes = istDate.getHours() * 60 + istDate.getMinutes();

  // Rahu Kaal standard daylight divisions (8 periods of 90 min from ~06:00 to ~18:00)
  const rahuWindows = [
    { startM: 990, endM: 1080, str: "04:30 PM – 06:00 PM" }, // Sun
    { startM: 450, endM: 540,  str: "07:30 AM – 09:00 AM" }, // Mon
    { startM: 900, endM: 990,  str: "03:00 PM – 04:30 PM" }, // Tue
    { startM: 720, endM: 810,  str: "12:00 PM – 01:30 PM" }, // Wed
    { startM: 810, endM: 900,  str: "01:30 PM – 03:00 PM" }, // Thu
    { startM: 630, endM: 720,  str: "10:30 AM – 12:00 PM" }, // Fri
    { startM: 540, endM: 630,  str: "09:00 AM – 10:30 AM" }, // Sat
  ];

  const yamaWindows = [
    { startM: 720, endM: 810, str: "12:00 PM – 01:30 PM" }, // Sun
    { startM: 630, endM: 720, str: "10:30 AM – 12:00 PM" }, // Mon
    { startM: 540, endM: 630, str: "09:00 AM – 10:30 AM" }, // Tue
    { startM: 450, endM: 540, str: "07:30 AM – 09:00 AM" }, // Wed
    { startM: 360, endM: 450, str: "06:00 AM – 07:30 AM" }, // Thu
    { startM: 900, endM: 990, str: "03:00 PM – 04:30 PM" }, // Fri
    { startM: 810, endM: 900, str: "01:30 PM – 03:00 PM" }, // Sat
  ];

  const rw = rahuWindows[day];
  const yw = yamaWindows[day];

  // Abhijit is roughly 11:54 AM - 12:46 PM (midday)
  const abhijitM = { startM: 714, endM: 766, str: "11:54 AM – 12:46 PM" };
  const brahmaM = { startM: 264, endM: 312, str: "04:24 AM – 05:12 AM" };
  const godhuliM = { startM: 1105, endM: 1130, str: "06:25 PM – 06:50 PM" };

  const isRahuNow = currentMinutes >= rw.startM && currentMinutes < rw.endM;
  const isAbhijitNow = currentMinutes >= abhijitM.startM && currentMinutes < abhijitM.endM && day !== 3;
  const isBrahmaNow = currentMinutes >= brahmaM.startM && currentMinutes < brahmaM.endM;
  const isGodhuliNow = currentMinutes >= godhuliM.startM && currentMinutes < godhuliM.endM;

  const rahuKaal: MuhuratWindow = {
    name: "Rahu Kaal",
    sanskrit: "राहु काल",
    timeRange: rw.str,
    isAuspicious: false,
    isNow: isRahuNow,
    description: "Inauspicious window. Avoid starting new ventures, signing agreements, or initiating journeys.",
  };

  const abhijit: MuhuratWindow = {
    name: "Abhijit Muhurta",
    sanskrit: "अभिजीत मुहूर्त",
    timeRange: abhijitM.str,
    isAuspicious: true,
    isNow: isAbhijitNow,
    description: "Supreme auspicious midday window. Excellent for all new beginnings and sacred tasks.",
  };

  const yamaganda: MuhuratWindow = {
    name: "Yamaganda",
    sanskrit: "यमगण्ड काल",
    timeRange: yw.str,
    isAuspicious: false,
    isNow: currentMinutes >= yw.startM && currentMinutes < yw.endM,
    description: "Challenging time. Avoid major financial decisions or legal commitments.",
  };

  const brahmaMuhurta: MuhuratWindow = {
    name: "Brahma Muhurta",
    sanskrit: "ब्रह्म मुहूर्त",
    timeRange: brahmaM.str,
    isAuspicious: true,
    isNow: isBrahmaNow,
    description: "Pre-dawn divine hour. Sacred for meditation, mantra japa, and spiritual awakening.",
  };

  const godhuli: MuhuratWindow = {
    name: "Godhuli Muhurta",
    sanskrit: "गोधूली वेला",
    timeRange: godhuliM.str,
    isAuspicious: true,
    isNow: isGodhuliNow,
    description: "Twilight period after sunset. Blessed for peace, domestic harmony, and evening prayers.",
  };

  let activeWindow: MuhuratWindow | null = null;
  if (isRahuNow) activeWindow = rahuKaal;
  else if (isAbhijitNow) activeWindow = abhijit;
  else if (isBrahmaNow) activeWindow = brahmaMuhurta;
  else if (isGodhuliNow) activeWindow = godhuli;

  return {
    rahuKaal,
    abhijit,
    yamaganda,
    brahmaMuhurta,
    godhuli,
    activeWindow,
  };
}

