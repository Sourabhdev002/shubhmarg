import React from "react";
import CalendarDashboardClient from "./CalendarDashboardClient";
import { getCalendarEvents } from "./actions";
import { AlertCircle, Plus } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Admin Dashboard - Calendar Events",
};

export default async function AdminCalendarPage() {
  const { success, data, error } = await getCalendarEvents();

  if (!success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-red-100 text-center space-y-4">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-6 h-6 text-red-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Failed to load data</h2>
          <p className="text-gray-500">{error || "An unknown error occurred while fetching events."}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-charcoal font-serif">Calendar Events</h1>
          <p className="text-sm text-brand-charcoal/60 mt-1">Manage Hindu calendar events and festivals (India region).</p>
        </div>
        <Link 
          href="/admin/calendar/new" 
          className="bg-brand-maroon hover:bg-brand-maroon/90 text-white px-4 py-2 rounded-md font-medium text-sm flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Event
        </Link>
      </div>
      <CalendarDashboardClient initialEvents={data || []} />
    </div>
  );
}
