import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-brand-ivory text-brand-maroon px-6 text-center">
      <div className="max-w-md space-y-6">
        <h2 className="text-3xl font-serif text-brand-maroon-dark">
          The path you seek cannot be found.
        </h2>
        <p className="text-lg text-brand-maroon/80">
          The page you requested may have moved or no longer exists.
        </p>
        <div className="pt-4">
          <Link
            href="/"
            className="inline-block px-6 py-2 bg-brand-gold text-brand-ivory rounded-md hover:bg-brand-gold-dark transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
