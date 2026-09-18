import React from "react";
import CalendarEventForm from "../CalendarEventForm";
import Link from "next/link";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { supabaseServer } from "@/lib/supabase";
import { verifyAdminAuth } from "@/lib/admin-auth";
import { CalendarEvent } from "@/types/calendar";

export const metadata = {
  title: "Edit Calendar Event - Admin",
};

export default async function EditCalendarEventPage({ params }: { params: Promise<{ id: string }> }) {
  const isAuthorized = await verifyAdminAuth();
  if (!isAuthorized) {
    return <div>Unauthorized</div>;
  }

  const { id } = await params;

  const { data, error } = await supabaseServer
    .from("calendar_events")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-red-100 text-center space-y-4">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-6 h-6 text-red-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Event Not Found</h2>
          <Link href="/admin/calendar" className="text-brand-maroon hover:underline block mt-4">
            Return to Calendar
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link 
          href="/admin/calendar"
          className="text-sm font-medium text-brand-gold-dark hover:text-brand-maroon flex items-center gap-1.5 w-fit mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Calendar
        </Link>
        <h1 className="text-2xl font-bold text-charcoal font-serif">Edit Event</h1>
      </div>
      
      <CalendarEventForm initialData={data as CalendarEvent} isEdit />
    </div>
  );
}
