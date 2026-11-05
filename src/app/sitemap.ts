import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://shubhmarg.com";

  const routes = [
    { path: "",              priority: 1.0, freq: "daily"   },
    { path: "/shubh-calendar", priority: 0.9, freq: "daily" },
    { path: "/services",     priority: 0.9, freq: "weekly"  },
    { path: "/request-guidance", priority: 0.9, freq: "weekly" },
    { path: "/about",        priority: 0.7, freq: "monthly" },
    { path: "/contact",      priority: 0.7, freq: "monthly" },
    { path: "/support",      priority: 0.6, freq: "weekly"  },
    { path: "/terms",        priority: 0.4, freq: "monthly" },
    { path: "/privacy-policy", priority: 0.4, freq: "monthly" },
    { path: "/refunds",      priority: 0.4, freq: "monthly" },
    { path: "/disclaimer",   priority: 0.3, freq: "monthly" },
    // Devotional + free daily-use pages (high search demand)
    { path: "/hanuman-chalisa", priority: 0.9, freq: "monthly" },
    { path: "/free-reading",  priority: 0.9, freq: "weekly"  },
    { path: "/daily-horoscope", priority: 0.8, freq: "daily" },
    { path: "/quick-answer",  priority: 0.8, freq: "weekly"  },
    { path: "/sacred-offerings", priority: 0.8, freq: "weekly" },
    { path: "/faq",           priority: 0.6, freq: "monthly" },
    // Vedic tools
    ...[
      "/ayurveda-prakriti", "/baby-cosmic-blueprint", "/baby-name", "/chakra-scanner", "/compatibility",
      "/decision-clock", "/deepdaan-sanctum", "/digital-sankalp", "/disha-shoola", "/dosha-scanner",
      "/dream-decoder", "/emergency", "/garbh-sanskar", "/gemstone-calculator", "/graha-sos",
      "/japa-mala", "/karmic-debt", "/karmic-rin-resolver", "/kuldevta-resolver", "/kundli-xray",
      "/manglik-rescue", "/muhurta-finder", "/name-calculator", "/navamsha-d9", "/palm-scanner",
      "/past-life-reader", "/pitru-vault", "/prasad-tracker", "/prashna-kundli", "/rajayoga-scanner",
      "/raksha-kavach", "/shani-sade-sati", "/sound-sanctuary", "/spouse-predictor", "/transit-wheel",
      "/vastu-compass", "/vastu-scanner", "/wealth-calendar", "/yantra-altar", "/yoni-wheel",
    ].map((path) => ({ path, priority: 0.7, freq: "monthly" })),
  ];

  return routes.map(({ path, priority, freq }) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: freq as MetadataRoute.Sitemap[0]["changeFrequency"],
    priority,
  }));
}