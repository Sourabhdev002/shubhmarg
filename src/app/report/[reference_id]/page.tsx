import { notFound } from "next/navigation";
import { supabaseServer } from "@/lib/supabase";
import { GuidanceRequest } from "@/types/admin";
import RoyalVedicReport from "@/components/reports/RoyalVedicReport";
import { generateVedicGuidanceReport } from "@/services/report-generator";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ reference_id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { reference_id } = await params;
  return {
    title: `Vedic Guidance Report - ${reference_id} | ShubhMarg`,
    description: "Official Vedic Astrological Guidance & Planetary Assessment Report",
  };
}

export default async function ReportPage({ params }: PageProps) {
  const { reference_id } = await params;

  const { data: request, error } = await supabaseServer
    .from("guidance_requests")
    .select("*")
    .eq("reference_id", reference_id)
    .single();

  if (error || !request) {
    notFound();
  }

  let reportText = request.notes;

  // Auto-generate full reading via Gemini if notes are not yet generated
  if (!reportText || reportText.length < 50) {
    try {
      const generated = await generateVedicGuidanceReport(request as GuidanceRequest);
      if (generated.success && generated.report) {
        reportText = generated.report;
      }
    } catch {
      reportText = "Your personalized Vedic guidance report is being prepared. Please refresh in a moment.";
    }
  }

  return <RoyalVedicReport request={request as GuidanceRequest} reportContent={reportText || ""} />;
}
