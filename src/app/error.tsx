"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error internally, but don't expose it to the user.
    console.error("Global error caught:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-brand-ivory text-brand-maroon px-6 text-center">
      <div className="max-w-md space-y-6">
        <h2 className="text-3xl font-serif text-brand-maroon-dark">
          We are currently experiencing a disruption in our path.
        </h2>
        <p className="text-lg text-brand-maroon/80">
          Please try again in a moment.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <button
            onClick={() => reset()}
            className="px-6 py-2 bg-brand-gold text-brand-ivory rounded-md hover:bg-brand-gold-dark transition-colors"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-6 py-2 border border-brand-gold text-brand-gold rounded-md hover:bg-brand-gold/10 transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
