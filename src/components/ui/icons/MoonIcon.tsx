export const MoonIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="moonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F8FAFC" />
        <stop offset="100%" stopColor="#94A3B8" />
      </linearGradient>
      <filter id="moonGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#94A3B8" floodOpacity="0.4" />
      </filter>
    </defs>
    <path d="M65 20 A 40 40 0 1 1 35 80 A 35 35 0 1 0 65 20" fill="url(#moonGrad)" filter="url(#moonGlow)" />
  </svg>
);
