import { Metadata } from "next";
import GuidanceRequestForm from "@/components/guidance/GuidanceRequestForm";

export const metadata: Metadata = {
  title: "Request Guidance | ShubhMarg",
  description: "Request personalized Vedic guidance and traditional spiritual services.",
};

export default function RequestGuidancePage() {
  return (
    <main className="min-h-screen bg-stone-50 pb-24">
      <div className="bg-slate-900 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Get Personalized Guidance
          </h1>
          <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
            Share your details with us securely to begin your journey toward clarity and traditional insight.
          </p>
        </div>
      </div>
      
      <div className="-mt-12 relative z-10">
        <GuidanceRequestForm />
      </div>
    </main>
  );
}
