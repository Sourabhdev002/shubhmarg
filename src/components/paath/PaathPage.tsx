import type { Metadata } from "next";
import Link from "next/link";
import ChalisaReader from "./ChalisaReader";
import type { PaathConfig } from "@/lib/paath/types";
import { LISTED_PAATHS } from "@/lib/paath/registry";

const SITE = "https://shubhmarg.com";

/** Page metadata for a paath. Unverified texts are kept out of Google until Pandit Ji confirms them. */
export function paathMetadata(p: PaathConfig): Metadata {
  const path = `/${p.slug}`;
  return {
    title: p.seoTitle,
    description: p.seoDescription,
    keywords: p.keywords,
    alternates: { canonical: path },
    robots: p.verified ? undefined : { index: false, follow: true },
    openGraph: {
      title: `${p.titleHi}: ${p.titleEn} Lyrics`,
      description: p.seoDescription,
      url: `${SITE}${path}`,
      type: "article",
      locale: "hi_IN",
      siteName: "ShubhMarg",
    },
    twitter: { card: "summary", title: `${p.titleHi}: ${p.titleEn} Lyrics`, description: p.seoDescription },
  };
}

export default function PaathPage({ paath }: { paath: PaathConfig }) {
  const path = `/${paath.slug}`;
  const others = LISTED_PAATHS.filter((p) => p.slug !== paath.slug);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE}${path}#webpage`,
        url: `${SITE}${path}`,
        name: paath.seoTitle,
        description: paath.seoDescription,
        inLanguage: paath.en ? ["hi", "en"] : ["hi"],
        isPartOf: { "@type": "WebSite", name: "ShubhMarg", url: SITE },
        mainEntity: {
          "@type": "CreativeWork",
          name: `${paath.titleEn} (${paath.titleHi})`,
          author: { "@type": "Person", name: paath.author },
          genre: "Devotional hymn",
          ...(paath.audioSrc
            ? { audio: { "@type": "AudioObject", name: `${paath.titleEn} audio`, contentUrl: `${SITE}${paath.audioSrc}`, encodingFormat: "audio/mpeg" } }
            : {}),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "ShubhMarg", item: SITE },
          { "@type": "ListItem", position: 2, name: paath.titleEn, item: `${SITE}${path}` },
        ],
      },
    ],
  };

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-[#FFFDF8] via-[#FBF6EC] to-[#F5EAD6] text-[#2A1810] pt-24 pb-32 px-4 sm:px-5 overflow-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div aria-hidden="true" className="pointer-events-none absolute top-16 left-1/2 -translate-x-1/2 w-[420px] h-[420px] rounded-full bg-[#F5A623]/15 blur-[60px] md:blur-[110px]" />

      <div className="relative max-w-2xl mx-auto">
        <nav aria-label="Breadcrumb" className="mb-4 text-[11px] text-[#6B5A48]">
          <Link href="/" className="hover:text-[#C25E10]">ShubhMarg</Link>
          <span className="mx-1.5 text-[#B8860B]/60">/</span>
          <span className="text-[#2A1810] font-semibold">{paath.titleEn}</span>
        </nav>

        <header className="text-center mb-5">
          <div className="relative inline-flex items-center justify-center mb-3">
            <span aria-hidden="true" className="w-14 h-14 rounded-full bg-gradient-to-br from-[#E8791E] to-[#F5A623] ring-4 ring-[#D4A537]/25 flex items-center justify-center text-white text-2xl font-bold shadow-[0_8px_24px_-8px_rgba(232,121,30,0.6)]">
              ॐ
            </span>
          </div>
          <h1 className="font-serif font-bold leading-tight">
            <span className="block text-3xl sm:text-5xl text-[#8B1A1A]">{paath.titleHi}</span>
            <span className="block mt-1.5 text-[13px] sm:text-sm font-sans font-semibold tracking-wide text-[#C25E10]">
              {paath.titleEn} Lyrics in Hindi{paath.en ? " & English" : ""}{paath.audioSrc ? ", with Audio" : ""}
            </span>
          </h1>
          <div aria-hidden="true" className="flex items-center justify-center gap-2 my-3">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#D4A537]" />
            <span className="text-[#D4A537] text-xs">✦</span>
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#D4A537]" />
          </div>
          <p className="text-[13px] sm:text-sm text-[#6B5A48] leading-relaxed max-w-md mx-auto">{paath.intro}</p>
        </header>

        <ChalisaReader paath={paath} />

        <section aria-labelledby="paath-faq" className="mt-8">
          <h2 id="paath-faq" className="text-lg sm:text-xl font-serif font-bold text-[#2A1810] mb-3 text-center">
            {paath.titleHi.replace(/^श्री\s*/, "")}: सामान्य प्रश्न
          </h2>
          <div className="rounded-3xl bg-[#FFFDF8] border border-[#B8860B]/25 divide-y divide-[#B8860B]/15 overflow-hidden">
            {paath.faq.map((f) => (
              <details key={f.q} className="group px-5 py-3.5">
                <summary className="flex items-center justify-between gap-3 cursor-pointer list-none text-[14px] font-semibold text-[#2A1810] [&::-webkit-details-marker]:hidden">
                  <span>{f.q}</span>
                  <span aria-hidden="true" className="shrink-0 text-[#C25E10] transition-transform group-open:rotate-45 text-lg leading-none">+</span>
                </summary>
                <p className="mt-2 text-[13px] text-[#6B5A48] leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {paath.links.map((l) => (
            <Link key={l.href} href={l.href} className="lift-on-hover rounded-2xl bg-[#FFFDF8] border border-[#B8860B]/25 px-5 py-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8791E]">
              <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#C25E10]">{l.eyebrow}</span>
              <span className="block mt-0.5 font-serif font-bold text-[#2A1810]">{l.label}</span>
            </Link>
          ))}
        </section>

        {others.length > 0 && (
          <nav aria-label="More paath" className="mt-6 text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#B8860B] mb-2">और पाठ</p>
            <div className="flex flex-wrap justify-center gap-2">
              {others.map((o) => (
                <Link key={o.slug} href={`/${o.slug}`} className="rounded-full bg-[#FFFDF8] border border-[#B8860B]/30 px-4 py-2 text-[13px] font-semibold text-[#8C3F08] hover:border-[#E8791E] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8791E]">
                  {o.titleHi}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </main>
  );
}