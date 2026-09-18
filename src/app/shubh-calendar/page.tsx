import React from "react";
import { getUpcomingEvents, getTodayEvent, getDailyPanchang } from "@/lib/calendar";
import UpcomingEventsTimeline from "@/components/calendar/UpcomingEventsTimeline";
import TodayEventCard from "@/components/calendar/TodayEventCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ShubhMarg Hindu Calendar",
  description: "Automated mobile-first Hindu calendar with panchang details and upcoming festivals.",
};

export const revalidate = 3600;

export default async function CalendarPage() {
  const [todayEvent, upcomingEvents, todayPanchang] = await Promise.all([
    getTodayEvent(),
    getUpcomingEvents(),
    getDailyPanchang(),
  ]);

  const timelineEvents = todayEvent 
    ? upcomingEvents.filter(e => e.id !== todayEvent.id)
    : upcomingEvents;

  return (
    <div className="bg-brand-ivory min-h-screen pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="font-serif text-4xl text-brand-maroon mb-4">Hindu Calendar 2026</h1>
          <p className="font-sans text-brand-charcoal/80 text-lg">
            Upcoming festivals, vrats, and auspicious days.
          </p>
        </div>

        <div className="space-y-12">
          {/* Today section */}
          <section>
            <TodayEventCard event={todayEvent} panchang={todayPanchang} />
          </section>

          <div className="mt-8">
            <UpcomingEventsTimeline events={timelineEvents} />
          </div>
        </div>
      </div>
    </div>
  );
}

