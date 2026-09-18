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
  ];

  return routes.map(({ path, priority, freq }) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: freq as MetadataRoute.Sitemap[0]["changeFrequency"],
    priority,
  }));
}