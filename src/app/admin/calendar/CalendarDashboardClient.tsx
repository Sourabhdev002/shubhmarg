"use client";

import React, { useState } from "react";
import { CalendarEvent } from "@/types/calendar";
import { Search, Edit, Trash2, CheckCircle, XCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { deleteCalendarEvent, generateCalendarMonthAction } from "./actions";

interface Props {
  initialEvents: CalendarEvent[];
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"
];

export default function CalendarDashboardClient({ initialEvents }: Props) {
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [monthStatuses, setMonthStatuses] = useState<Array<'pending' | 'running' | 'success' | 'failed'>>(Array(12).fill('pending'));
  const [generationSummary, setGenerationSummary] = useState<{ totalInserted: number; totalMapped: number; unmapped: string[] } | null>(null);

  const filteredEvents = events.filter(
    (event) =>
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.event_type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event? This action cannot be undone.")) return;
    
    setIsDeleting(id);
    const result = await deleteCalendarEvent(id);
    setIsDeleting(null);
    
    if (result.success) {
      setEvents(events.filter((e) => e.id !== id));
    } else {
      alert(result.error || "Failed to delete event.");
    }
  };

  const startGeneration = async () => {
    setIsGenerating(true);
    setGenerationSummary(null);
    const newStatuses = [...monthStatuses];
    let hasError = false;
    
    let totalInserted = 0;
    let totalMapped = 0;
    let allUnmapped: string[] = [];

    // Find the first non-success month to allow resuming
    let startMonth = newStatuses.findIndex(s => s !== 'success');
    if (startMonth === -1) {
      // If all are success, reset to run again
      newStatuses.fill('pending');
      startMonth = 0;
    }

    for (let i = startMonth; i < 12; i++) {
      newStatuses[i] = 'running';
      setMonthStatuses([...newStatuses]);

      const res = await generateCalendarMonthAction(2026, i + 1);

      if (res.success) {
        newStatuses[i] = 'success';
        setMonthStatuses([...newStatuses]);
        if (res.summary) {
          totalInserted += res.summary.inserted;
          totalMapped += res.summary.mapped;
          allUnmapped = [...allUnmapped, ...res.summary.unmapped];
        }
      } else {
        newStatuses[i] = 'failed';
        setMonthStatuses([...newStatuses]);
        alert(`Error on ${MONTHS[i]}: ${res.error}`);
        hasError = true;
        break;
      }
    }

    setIsGenerating(false);
    if (!hasError) {
      setGenerationSummary({ totalInserted, totalMapped, unmapped: Array.from(new Set(allUnmapped)) });
    }
  };

  return (
    <div className="space-y-6">
      {/* Month Orchestrator UI */}
      <div className="bg-white rounded-xl shadow-sm border border-brand-gold/20 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-brand-maroon">Automated Calendar Generation</h2>
            <p className="text-sm text-brand-charcoal/60 mt-1">Generate Hindu occurrences for 2026 month-by-month</p>
          </div>
          <button
            onClick={startGeneration}
            disabled={isGenerating}
            className="bg-brand-gold-dark hover:bg-brand-maroon text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {isGenerating && <Loader2 className="w-4 h-4 animate-spin" />}
            {isGenerating ? "Generating..." : (monthStatuses.some(s => s === 'failed') ? "Retry Generation" : "Generate 2026")}
          </button>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {MONTHS.map((month, index) => {
            const status = monthStatuses[index];
            return (
              <div 
                key={month} 
                className={`p-3 rounded-lg border text-sm font-medium flex items-center justify-between
                  ${status === 'success' ? 'bg-green-50 border-green-200 text-green-700' : ''}
                  ${status === 'failed' ? 'bg-red-50 border-red-200 text-red-700' : ''}
                  ${status === 'running' ? 'bg-blue-50 border-blue-200 text-blue-700 animate-pulse' : ''}
                  ${status === 'pending' ? 'bg-gray-50 border-gray-200 text-gray-500' : ''}
                `}
              >
                <span>{month.substring(0,3)}</span>
                {status === 'success' && <CheckCircle className="w-4 h-4" />}
                {status === 'failed' && <XCircle className="w-4 h-4" />}
                {status === 'running' && <Loader2 className="w-4 h-4 animate-spin" />}
              </div>
            );
          })}
        </div>
        
        {generationSummary && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
            <strong>Generation Complete!</strong> 
            <p className="mt-1">Inserted/Updated: {generationSummary.totalInserted}</p>
            <p>Mapped Events: {generationSummary.totalMapped}</p>
            {generationSummary.unmapped.length > 0 && (
              <div className="mt-2 text-red-600">
                <p><strong>Unmapped Festivals (Ignored):</strong></p>
                <p className="text-xs mt-1">{generationSummary.unmapped.join(", ")}</p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-brand-gold/20 overflow-hidden">
        {/* Filters */}
        <div className="p-4 border-b border-brand-gold/10 bg-brand-saffron/5 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-charcoal/40" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-brand-gold/30 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-maroon/20 focus:border-brand-maroon bg-white"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-brand-gold/10 text-brand-charcoal/60 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-medium">Event</th>
                <th className="px-6 py-4 font-medium">Type</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredEvents.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-brand-charcoal/50">
                    No events found.
                  </td>
                </tr>
              ) : (
                filteredEvents.map((event) => (
                  <tr key={event.id} className="hover:bg-brand-saffron/5 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-brand-maroon">{event.name}</div>
                      <div className="text-xs text-brand-charcoal/60 mt-0.5">{event.slug}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide uppercase bg-brand-saffron/20 text-brand-maroon">
                        {event.event_type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {event.published ? (
                        <span className="flex items-center gap-1.5 text-xs font-medium text-green-700 bg-green-50 px-2.5 py-1 rounded-full w-fit">
                          <CheckCircle className="w-3.5 h-3.5" /> Published
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 text-xs font-medium text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full w-fit">
                          <XCircle className="w-3.5 h-3.5" /> Draft
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <div className="flex items-center justify-end gap-3">
                        <Link 
                          href={`/admin/calendar/${event.id}`}
                          className="text-brand-gold-dark hover:text-brand-maroon transition-colors"
                          title="Edit Event"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button 
                          onClick={() => handleDelete(event.id)}
                          disabled={isDeleting === event.id}
                          className={`${isDeleting === event.id ? 'opacity-50' : ''} text-red-400 hover:text-red-600 transition-colors`}
                          title="Delete Event"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
