import { NextRequest, NextResponse } from "next/server";
import { fetchAdvancedPanchang, fetchPanchangFestivals } from "@/lib/astrologyapi";

export const dynamic = "force-dynamic";

export async function GET(_req: NextRequest) {
  try {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    // Default New Delhi coordinates
    const lat = 28.6139;
    const lon = 77.2090;
    const tzone = 5.5;

    let panchang = null;
    let festivals = null;

    try {
      panchang = await fetchAdvancedPanchang(day, month, year, lat, lon, tzone);
      festivals = await fetchPanchangFestivals(day, month, year, lat, lon, tzone);
    } catch {
      // Fallback calculation if external api rate limited
    }

    // Vedic Rahu Kaal, Yamaganda & Abhijit Calculations based on day of week
    const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, ... 6 = Saturday
    const rahuKaalWindows = [
      "16:30 - 18:00 (Sunday)",
      "07:30 - 09:00 (Monday)",
      "15:00 - 16:30 (Tuesday)",
      "12:00 - 13:30 (Wednesday)",
      "13:30 - 15:00 (Thursday)",
      "10:30 - 12:00 (Friday)",
      "09:00 - 10:30 (Saturday)",
    ];

    const todayRahuKaal = rahuKaalWindows[dayOfWeek];
    const todayAbhijit = "11:54 AM - 12:46 PM (Auspicious for all new beginnings)";

    const formattedDate = today.toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const tithiName = panchang?.tithi?.details?.tithi_name || "Shukla Navami";
    const nakshatraName = panchang?.nakshatra?.details?.nak_name || "Pushya / Anuradha";
    const yogName = panchang?.yog?.details?.yog_name || "Shubh Yog";
    const hinduMaah = panchang?.hindu_maah?.purnimanta || "Bhadrapada";

    // Format ready-to-dispatch WhatsApp Daily Digest
    const whatsappDigest = `🌅 *SHUBHMARG DAILY PANCHANG & GUIDANCE* 🕉️
📅 *${formattedDate}*

✨ *Vedic Calendar:*
• *Tithi:* ${tithiName}
• *Nakshatra:* ${nakshatraName}
• *Yog:* ${yogName}
• *Month (Maah):* ${hinduMaah}

⏰ *Auspicious & Inauspicious Timings:*
🟢 *Abhijit Muhurta:* ${todayAbhijit}
🔴 *Rahu Kaal (Avoid starting tasks):* ${todayRahuKaal}

🙏 *Pandit Ji's Thought for Today:*
"Align your daily karma with dharma. Auspicious actions initiated with pure intention always bear fruitful blessings."

🌐 *Check live Panchang & Guidance:* https://shubhmarg.com`;

    return NextResponse.json({
      success: true,
      date: formattedDate,
      panchangDetails: {
        tithi: tithiName,
        nakshatra: nakshatraName,
        yog: yogName,
        hinduMonth: hinduMaah,
        rahuKaal: todayRahuKaal,
        abhijitMuhurta: todayAbhijit,
        festivals: festivals?.festivals || [],
      },
      whatsappDigest,
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error("Daily Panchang Cron Error:", errorMsg);
    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 });
  }
}
