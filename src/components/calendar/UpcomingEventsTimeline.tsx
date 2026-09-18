import React from "react";
import { CalendarEventWithOccurrence } from "@/types/calendar";
import Link from "next/link";
import Image from "next/image";

interface Props {
  events: CalendarEventWithOccurrence[];
  limit?: number;
}

function getEventImagePath(eventName: string): string {
  const name = eventName.toLowerCase();
  
  if (name.includes("pradosh")) return "/images/festivals/shiva_lingam.jpg";
  if (name.includes("krishna") || name.includes("janmashtami")) return "/images/festivals/krishna_flute.jpg";
  if (name.includes("radha")) return "/images/festivals/radha_krishna.jpg";
  if (name.includes("ganesh") && name.includes("chaturthi")) return "/images/festivals/ganesha_modak.jpg";
  if (name.includes("ganesh")) return "/images/festivals/ganesha_modak.jpg"; // Fallback for other ganesh (like Visarjan if we don't have water)
  if (name.includes("sankranti")) return "/images/festivals/sankranti_sun.jpg";
  if (name.includes("onam")) return "/images/festivals/onam_boat.jpg";
  if (name.includes("raksha bandhan")) return "/images/festivals/rakhi_sweets.jpg";
  if (name.includes("karwa chauth")) return "/images/festivals/karwa_chauth.jpg";
  if (name.includes("navratri") || name.includes("durga") || name.includes("navami") || name.includes("vijayadashami")) return "/images/festivals/durga_lion.jpg";
  if (name.includes("purnima") || name.includes("amavasya")) return "/images/festivals/full_moon_lotus.jpg";
  if (name.includes("ekadashi")) return "/images/festivals/vishnu_lotus.jpg";
  if (name.includes("pitrupaksha")) return "/images/festivals/diya_kalash.jpg";
  
  // Generic beautiful festival fallback
  return "/images/festivals/diya_kalash.jpg";
}

export default function UpcomingEventsTimeline({ events, limit }: Props) {
  const displayEvents = limit ? events.slice(0, limit) : events;

  if (displayEvents.length === 0) {
    return null;
  }

  return (
    <div className="relative overflow-hidden rounded-2xl bg-brand-ivory border border-brand-gold/20 shadow-premium w-full h-full p-6 sm:p-10 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[22px] sm:text-2xl font-bold font-serif text-brand-charcoal">
          Upcoming Events
        </h3>
      </div>

      {/* Events List */}
      <div className="flex flex-col flex-1 justify-center">
        {displayEvents.map((event, index) => {
          const dateObj = new Date(event.date);
          const dateDay = dateObj.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', day: '2-digit' });
          const dateMonth = dateObj.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', month: 'short' }).toUpperCase();
          
          const imagePath = getEventImagePath(event.name);

          return (
            <Link 
              key={event.occurrence_id || event.id} 
              href={`/festivals/${event.slug}`} 
              className={`group flex items-center gap-4 sm:gap-6 py-4 sm:py-5 hover:bg-brand-parchment/50 transition-colors ${index !== displayEvents.length - 1 ? 'border-b border-brand-gold/10' : ''}`}
            >
              {/* Date Block */}
              <div className="shrink-0 w-[52px] h-[52px] sm:w-[60px] sm:h-[60px] bg-brand-maroon rounded-lg sm:rounded-xl flex flex-col items-center justify-center text-brand-ivory shadow-inner">
                <span className="text-[20px] sm:text-[22px] font-bold font-serif leading-none">{dateDay}</span>
                <span className="text-[9px] sm:text-[10px] font-sans uppercase tracking-widest mt-1 opacity-90">{dateMonth}</span>
              </div>
              
              {/* Content Block */}
              <div className="flex-1 min-w-0">
                <h4 className="text-[15px] sm:text-[17px] font-bold text-brand-charcoal font-serif mb-1 group-hover:text-brand-maroon transition-colors truncate">
                  {event.name.replace(/^[\d\s-]+\s*/, '')}
                </h4>
                {event.tithi_name ? (
                  <span className="inline-block px-2.5 py-0.5 bg-brand-parchment border border-brand-gold/30 rounded text-[10px] sm:text-[11px] text-brand-gold-dark font-semibold tracking-wide">
                    {event.tithi_name}
                  </span>
                ) : (
                  <span className="inline-block px-2.5 py-0.5 bg-brand-parchment border border-brand-gold/30 rounded text-[10px] sm:text-[11px] text-brand-gold-dark font-semibold tracking-wide">
                    Festival
                  </span>
                )}
              </div>

              {/* 3D Generated Icon */}
              <div className="shrink-0 w-16 h-16 sm:w-20 sm:h-20 relative overflow-hidden rounded-full border border-brand-gold/10 shadow-sm">
                <Image 
                  src={imagePath} 
                  alt={event.name} 
                  fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
                  className="object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-500" 
                />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
