export const SunIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="sunGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFF2D1" />
        <stop offset="40%" stopColor="#F9C338" />
        <stop offset="100%" stopColor="#D94822" />
      </radialGradient>
      <filter id="sunGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#D94822" floodOpacity="0.3" />
      </filter>
    </defs>
    <circle cx="50" cy="50" r="28" fill="url(#sunGrad)" filter="url(#sunGlow)" />
    <path d="M50 8 L50 18 M50 82 L50 92 M8 50 L18 50 M82 50 L92 50 M20 20 L27 27 M73 73 L80 80 M20 80 L27 73 M73 20 L80 27" stroke="#D94822" strokeWidth="4" strokeLinecap="round" />
  </svg>
);
