import type { Metadata } from "next";
import RashiToday from "@/components/home/RashiToday";
import { getServerNow } from "@/lib/ist-time";

export const metadata: Metadata = {
  title: "आज का आशीर्वाद · ₹11 Daily Blessing | ShubhMarg",
  description:
    "Unlock today's Aaj Ka Aashirwad — a simple ₹11 daily blessing and rashi reading.",
};

export default function AashirwadPage() {
  return (
    <main className="min-h-screen bg-[#FBF6EC] pt-24 pb-36">
      <h1 className="font-devanagari text-center text-3xl sm:text-4xl text-[#2A1810] px-4">
        आज का आशीर्वाद
      </h1>
      <RashiToday serverNow={getServerNow()} />
    </main>
  );
}
