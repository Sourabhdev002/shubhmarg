import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://shubhmarg.vercel.app";
  
  const routes = [
    "",
    "/services",
    "/about",
    "/contact",
    "/daily-horoscope",
    "/terms",
    "/privacy-policy",
    "/disclaimer",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));
}
