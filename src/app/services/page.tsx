import { Metadata } from "next";
import ServicesContent from "@/components/services/ServicesContent";

export const metadata: Metadata = {
  title: "Vedic Services & Consultations | ShubhMarg",
  description: "Explore ShubhMarg authentic Vedic guidance services — Prashna Horary, Jyotish Natal Horoscope, Muhurta Auspicious Timing, and Vastu Shastra.",
};

export default function ServicesPage() {
  return <ServicesContent />;
}