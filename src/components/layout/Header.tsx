"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-brand-gold/20 bg-brand-ivory/95 backdrop-blur-md">
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex flex-col items-start group">
          <span className="font-devanagari text-brand-saffron text-sm md:text-base leading-none mb-1 opacity-80 group-hover:opacity-100 transition-opacity">शुभ मार्ग</span>
          <span className="text-2xl md:text-3xl font-serif font-bold tracking-wide text-brand-maroon uppercase">
            ShubhMarg
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">

          <Link
            href="/request-guidance"
            className="rounded-md bg-brand-maroon px-8 py-3 text-sm font-semibold tracking-wide text-brand-ivory shadow-sm border border-brand-maroon-light transition hover:bg-brand-maroon-dark hover:border-brand-maroon focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-maroon"
          >
            BEGIN GUIDANCE
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-charcoal hover:bg-brand-parchment hover:text-brand-maroon focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-maroon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-expanded={isMobileMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
          {isMobileMenuOpen ? (
            <X className="block h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="block h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-brand-gold/20 bg-brand-ivory">
          <div className="space-y-1 px-4 pb-6 pt-4">

            <div className="mt-6 px-3">
              <Link
                href="/request-guidance"
                className="flex w-full items-center justify-center rounded-md bg-brand-maroon px-4 py-3 text-base font-semibold tracking-wide text-brand-ivory shadow-sm hover:bg-brand-maroon-dark"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                BEGIN GUIDANCE
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
