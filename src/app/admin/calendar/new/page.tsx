import React from "react";
import CalendarEventForm from "../CalendarEventForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "New Calendar Event - Admin",
};

export default function NewCalendarEventPage() {
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
        <h1 className="text-2xl font-bold text-charcoal font-serif">Create New Event</h1>
      </div>
      
      <CalendarEventForm />
    </div>
  );
}
