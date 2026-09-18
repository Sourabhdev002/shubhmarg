export const NakshatraIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="starGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="60%" stopColor="#D4B96F" />
        <stop offset="100%" stopColor="#917631" />
      </radialGradient>
      <filter id="starGlow">
        <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#D4B96F" floodOpacity="0.8" />
      </filter>
    </defs>
    <path d="M50 10 L55 40 L85 45 L55 50 L50 80 L45 50 L15 45 L45 40 Z" fill="url(#starGrad)" filter="url(#starGlow)" />
    <circle cx="30" cy="30" r="2" fill="#D4B96F" />
    <circle cx="70" cy="25" r="1.5" fill="#D4B96F" />
    <circle cx="65" cy="70" r="2.5" fill="#D4B96F" />
    <circle cx="25" cy="65" r="1" fill="#D4B96F" />
  </svg>
);
