import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow local network IP for mobile testing
  allowedDevOrigins: ['192.168.1.106'],
  // Retired pages (no real priest/consecration behind them) -> nearest honest page.
  async redirects() {
    const toAnswer = [
      "chakra-scanner", "dosha-scanner", "karmic-debt", "karmic-rin-resolver",
      "kuldevta-resolver", "kundli-xray", "manglik-rescue", "navamsha-d9",
      "palm-scanner", "past-life-reader", "pitru-vault", "prasad-tracker",
      "rajayoga-scanner", "spouse-predictor", "vastu-compass", "vastu-scanner",
      "yoni-wheel", "graha-sos", "garbh-sanskar", "sacred-offerings",
      "digital-sankalp", "baby-cosmic-blueprint", "emergency", "shani-sade-sati",
    ];
    const toCalendar = ["wealth-calendar"];
    const toChalisa = ["sound-sanctuary", "deepdaan-sanctum", "yantra-altar", "raksha-kavach"];
    return [
      ...toAnswer.map((s) => ({ source: `/${s}`, destination: "/quick-answer", permanent: true })),
      ...toCalendar.map((s) => ({ source: `/${s}`, destination: "/shubh-calendar", permanent: true })),
      ...toChalisa.map((s) => ({ source: `/${s}`, destination: "/hanuman-chalisa", permanent: true })),
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
