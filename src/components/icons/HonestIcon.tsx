export const HonestIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#A84C1C" />
        <stop offset="100%" stopColor="#4B1515" />
      </linearGradient>
      <linearGradient id="shieldRim" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFF4D9" />
        <stop offset="100%" stopColor="#E2A63B" />
      </linearGradient>
      <filter id="iconShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#4B1515" floodOpacity="0.4" />
      </filter>
    </defs>
    <g filter="url(#iconShadow)">
      {/* Shield Body */}
      <path d="M 25 20 L 75 20 C 75 50, 60 75, 50 85 C 40 75, 25 50, 25 20 Z" fill="url(#shieldGrad)" stroke="url(#shieldRim)" strokeWidth="4" strokeLinejoin="round" />
      
      {/* Inner Star */}
      <polygon points="50,30 55,42 68,42 58,50 62,62 50,55 38,62 42,50 32,42 45,42" fill="url(#shieldRim)" />
    </g>
  </svg>
);
