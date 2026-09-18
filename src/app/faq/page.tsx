import { Metadata } from "next";
import Faq from "@/components/home/Faq";

export const metadata: Metadata = {
  title: "FAQ | ShubhMarg",
  description: "Frequently asked questions about ShubhMarg Vedic guidance services.",
};

export default function FaqPage() {
  return (
    <main className="min-h-screen bg-brand-ivory pt-24 pb-36">
      <Faq />
    </main>
  );
}