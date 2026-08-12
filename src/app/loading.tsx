export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-brand-ivory text-brand-maroon">
      <div className="flex flex-col items-center space-y-4">
        {/* Subtle brand-gold animated spinner */}
        <div 
          className="w-12 h-12 border-4 border-brand-gold/30 border-t-brand-gold rounded-full animate-spin"
          role="status"
          aria-label="Loading..."
        />
        <p className="text-brand-maroon/80 font-medium animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
}
