export const FluteIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="woodGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#DEBE84" />
        <stop offset="50%" stopColor="#A84C1C" />
        <stop offset="100%" stopColor="#4B1515" />
      </linearGradient>
      <linearGradient id="featherGreen" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10B981" />
        <stop offset="100%" stopColor="#047857" />
      </linearGradient>
      <radialGradient id="featherEye" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="50%" stopColor="#1D4ED8" />
        <stop offset="100%" stopColor="#F59E0B" />
      </radialGradient>
      <filter id="iconShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#4B1515" floodOpacity="0.3" />
      </filter>
    </defs>
    <g filter="url(#iconShadow)">
      {/* Peacock Feather */}
      <path d="M 60 40 C 80 20, 90 30, 80 50 C 70 70, 40 80, 40 80 C 40 80, 50 60, 60 40 Z" fill="url(#featherGreen)" />
      {/* Feather Eye */}
      <ellipse cx="68" cy="45" rx="8" ry="12" fill="url(#featherEye)" transform="rotate(-45 68 45)" />
      
      {/* Flute */}
      <rect x="20" y="20" width="8" height="60" rx="4" fill="url(#woodGrad)" transform="rotate(-45 50 50)" />
      
      {/* Flute Holes */}
      <circle cx="35" cy="65" r="2" fill="#2A2A2A" />
      <circle cx="42" cy="58" r="2" fill="#2A2A2A" />
      <circle cx="49" cy="51" r="2" fill="#2A2A2A" />
      <circle cx="56" cy="44" r="2" fill="#2A2A2A" />
      
      {/* Flute Decoration */}
      <path d="M 22 75 L 32 85" stroke="#F9C338" strokeWidth="2" />
      <path d="M 72 25 L 82 35" stroke="#F9C338" strokeWidth="2" />
      <path d="M 27 80 L 15 90" stroke="#EF4444" strokeWidth="1.5" />
      <path d="M 30 83 L 20 95" stroke="#F59E0B" strokeWidth="1.5" />
    </g>
  </svg>
);
