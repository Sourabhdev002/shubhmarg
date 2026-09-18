import React from "react";
import { getEventBySlug } from "@/lib/calendar";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, Info, BookOpen } from "lucide-react";

export const revalidate = 3600;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  
  if (!event) return { title: "Event Not Found" };

  return {
    title: (event.seo_title || event.name).replace(/^[\d\s-]+\s*/, '') + " - ShubhMarg Hindu Calendar",
    description: event.seo_description || event.description,
    openGraph: {
      title: (event.seo_title || event.name).replace(/^[\d\s-]+\s*/, ''),
      description: event.seo_description || event.description || "",
      images: event.image_url ? [event.image_url] : [],
    },
  };
}

export default async function FestivalPage({ params }: Props) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  const hasDate = 'date' in event && event.date;
  const dateObj = hasDate ? new Date(event.date as string) : null;
  const dateStr = dateObj ? dateObj.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }) : null;

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-8 bg-brand-ivory min-h-screen pb-[calc(8rem+env(safe-area-inset-bottom,0px))]">
      <Link 
        href="/shubh-calendar"
        className="inline-flex items-center gap-2 text-brand-gold-dark hover:text-brand-maroon transition-colors mb-6 font-medium text-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Calendar
      </Link>

      <header className="mb-8 space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-brand-saffron/20 text-brand-maroon text-xs font-bold uppercase tracking-wider">
            {event.event_type}
          </span>
          {'tithi_name' in event && event.tithi_name && (
            <span className="px-3 py-1 rounded-full bg-brand-charcoal/5 text-brand-charcoal/80 text-xs font-bold tracking-wider">
              {event.tithi_name as string}
            </span>
          )}
        </div>
        
        <h1 className="text-4xl sm:text-5xl font-bold font-serif text-brand-maroon leading-tight">
          {event.name.replace(/^[\d\s-]+\s*/, '')}
        </h1>
        
        {hasDate && (
          <div className="flex items-center gap-2 text-brand-charcoal/70 font-medium pb-4 border-b border-brand-gold/20">
            <Calendar className="w-5 h-5 text-brand-gold-dark" />
            <time dateTime={event.date as string}>{dateStr} (IST)</time>
          </div>
        )}
      </header>

      {event.image_url && (
        <figure className="mb-10 rounded-2xl overflow-hidden shadow-lg border border-brand-gold/10 relative w-full aspect-video">
          <Image 
            src={event.image_url} 
            alt={event.name}
            fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </figure>
      )}

      <div className="space-y-10">
        {event.description && (
          <section className="prose prose-brand max-w-none">
            <p className="text-lg leading-relaxed text-brand-charcoal/90">{event.description}</p>
          </section>
        )}

        {event.significance && (
          <section className="bg-[#fff8f0] rounded-2xl p-6 sm:p-8 border border-brand-gold/20">
            <h2 className="text-2xl font-bold font-serif text-brand-maroon flex items-center gap-3 mb-4">
              <Info className="w-6 h-6 text-brand-gold-dark" />
              Significance
            </h2>
            <div className="text-[#1A1C20]/80 whitespace-pre-wrap leading-relaxed">
              {event.significance}
            </div>
          </section>
        )}

        {event.puja_guidance && (
          <section className="bg-[#ffffff] rounded-2xl p-6 sm:p-8 shadow-sm border border-brand-gold/20">
            <h2 className="text-2xl font-bold font-serif text-brand-maroon flex items-center gap-3 mb-4">
              <BookOpen className="w-6 h-6 text-brand-gold-dark" />
              Puja Guidance
            </h2>
            <div className="text-brand-charcoal/80 whitespace-pre-wrap leading-relaxed">
              {event.puja_guidance}
            </div>
            
            {event.mantra && (
              <div className="mt-6 p-6 rounded-xl text-center italic shadow-inner" style={{ background: "#1A1C20", color: "#FF9933" }}>
                {event.mantra}
              </div>
            )}
          </section>
        )}

        {(event.dos || event.donts) && (
          <section className="grid sm:grid-cols-2 gap-6">
            {event.dos && (
              <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
                <h3 className="text-xl font-bold text-green-800 mb-3">Do&apos;s</h3>
                <div className="text-green-700/80 whitespace-pre-wrap text-sm leading-relaxed">
                  {event.dos}
                </div>
              </div>
            )}
            
            {event.donts && (
              <div className="bg-red-50 rounded-2xl p-6 border border-red-100">
                <h3 className="text-xl font-bold text-red-800 mb-3">Don&apos;ts</h3>
                <div className="text-red-700/80 whitespace-pre-wrap text-sm leading-relaxed">
                  {event.donts}
                </div>
              </div>
            )}
          </section>
        )}
      </div>
    </article>
  );
}
