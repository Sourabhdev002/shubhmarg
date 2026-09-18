"use client";

import React, { useEffect, useRef, useState } from "react";
import { CalendarEventWithOccurrence } from "@/types/calendar";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar as CalendarIcon } from "lucide-react";
import { Haptics, ImpactStyle } from "@capacitor/haptics";
import { Capacitor } from "@capacitor/core";

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
  if (name.includes("ganesh")) return "/images/festivals/ganesha_modak.jpg";
  if (name.includes("sankranti")) return "/images/festivals/sankranti_sun.jpg";
  if (name.includes("onam")) return "/images/festivals/onam_boat.jpg";
  if (name.includes("raksha bandhan")) return "/images/festivals/rakhi_sweets.jpg";
  if (name.includes("karwa chauth")) return "/images/festivals/karwa_chauth.jpg";
  if (name.includes("navratri") || name.includes("durga") || name.includes("navami") || name.includes("vijayadashami")) return "/images/festivals/durga_lion.jpg";
  if (name.includes("purnima") || name.includes("amavasya")) return "/images/festivals/full_moon_lotus.jpg";
  if (name.includes("ekadashi")) return "/images/festivals/vishnu_lotus.jpg";
  if (name.includes("pitrupaksha")) return "/images/festivals/diya_kalash.jpg";
  
  return "/images/festivals/diya_kalash.jpg";
}

export default function FestivalCarousel({ events, limit }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  const displayEvents = limit ? events.slice(0, limit) : events;
  const childCount = displayEvents.length;

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollPosition = scrollRef.current.scrollLeft;
      const cardWidth = scrollRef.current.clientWidth;
      
      const newIndex = Math.round(scrollPosition / cardWidth);
      if (newIndex !== activeIndex && newIndex >= 0 && newIndex < childCount) {
        setActiveIndex(newIndex);
        
        if (Capacitor.isNativePlatform()) {
          Haptics.impact({ style: ImpactStyle.Light }).catch(() => {});
        }
      }
    }
  };

  const scrollToCard = (index: number) => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.clientWidth;
      scrollRef.current.scrollTo({
        left: index * cardWidth,
        behavior: "smooth"
      });
    }
  };

  useEffect(() => {
    if (childCount <= 1 || isPaused) return;

    const timer = setInterval(() => {
      if (scrollRef.current) {
        const nextIndex = (activeIndex + 1) % childCount;
        scrollToCard(nextIndex);
      }
    }, 4500);

    return () => clearInterval(timer);
  }, [activeIndex, childCount, isPaused]);

  if (displayEvents.length === 0) return null;

  return (
    <section className="w-full pb-12 pt-4 relative bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-[20px] sm:text-2xl font-bold font-serif text-brand-charcoal flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-brand-gold hidden sm:block" />
            Upcoming Calendar
          </h3>
          <Link 
            href="/shubh-calendar" 
            className="text-[13px] sm:text-sm font-bold text-brand-maroon hover:text-brand-maroon-light flex items-center gap-1 transition-colors min-h-[44px] px-2"
          >
            Explore <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="flex flex-row items-stretch overflow-x-auto pb-4 snap-x snap-mandatory hide-scrollbar gap-4 sm:gap-6" 
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {displayEvents.map((event) => {
            const dateObj = new Date(event.date);
            const dateDay = dateObj.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', day: '2-digit' });
            const dateMonth = dateObj.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', month: 'short' }).toUpperCase();
            const imagePath = getEventImagePath(event.name);

            return (
              <div 
                key={event.occurrence_id || event.id}
                className="w-[90vw] sm:w-[340px] md:w-[400px] flex-none snap-center"
              >
                <Link 
                  href={`/festivals/${event.slug}`} 
                  className="block group relative h-full overflow-hidden rounded-2xl bg-[#fbf9f4] border border-[#d4af37]/20 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(212,175,55,0.15)] hover:-translate-y-1.5 transition-all duration-500 p-5 sm:p-6 active:opacity-80"
                >
                  {/* Subtle hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="flex gap-4 sm:gap-5 items-center h-full relative z-10">
                    {/* Image Block */}
                    <div className="shrink-0 w-[72px] h-[72px] sm:w-[84px] sm:h-[84px] relative overflow-hidden rounded-full shadow-inner border border-brand-gold/20 group-hover:scale-105 transition-transform duration-500">
                      <Image 
                        src={imagePath} 
                        alt={event.name} 
                        fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
                        className="object-cover mix-blend-multiply" 
                      />
                    </div>
                    
                    {/* Content Block */}
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                        <span className="text-[11px] font-bold tracking-wider text-brand-maroon uppercase">{dateDay} {dateMonth}</span>
                        {event.tithi_name && (
                          <span className="inline-block px-1.5 py-0.5 bg-brand-parchment border border-brand-gold/30 rounded text-[9px] sm:text-[10px] text-brand-gold-dark font-semibold tracking-wide truncate max-w-full">
                            {event.tithi_name}
                          </span>
                        )}
                      </div>
                      <h4 className="text-[17px] sm:text-[19px] font-bold text-brand-charcoal font-serif group-hover:text-brand-maroon transition-colors line-clamp-2 leading-snug">
                        {event.name.replace(/^[\d\s-]+\s*/, '')}
                      </h4>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
        
        {/* Pagination Dots */}
        {childCount > 1 && (
          <div className="flex justify-center items-center gap-2 mt-4 sm:mt-6">
            {Array.from({ length: childCount }).map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToCard(i)}
                className={`h-2 rounded-full transition-all duration-300 min-h-[44px] flex items-center justify-center -my-4 relative`}
                aria-label={`Go to slide ${i + 1}`}
              >
                <span className={`block h-2 rounded-full transition-all duration-300 ${
                  activeIndex === i 
                    ? "w-6 bg-brand-gold" 
                    : "w-2 bg-brand-gold/30 hover:bg-brand-gold/50"
                }`} />
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
