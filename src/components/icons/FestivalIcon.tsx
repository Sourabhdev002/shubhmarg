export const FestivalIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="diyaBody" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#E2A63B" />
        <stop offset="100%" stopColor="#A84C1C" />
      </linearGradient>
      <radialGradient id="diyaFlame" cx="50%" cy="80%" r="80%">
        <stop offset="0%" stopColor="#FFF4D9" />
        <stop offset="40%" stopColor="#F9C338" />
        <stop offset="100%" stopColor="#D94822" />
      </radialGradient>
      <filter id="iconShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#4B1515" floodOpacity="0.3" />
      </filter>
      <filter id="glowFilter" x="-40%" y="-40%" width="180%" height="180%">
        <feGaussianBlur stdDeviation="5" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    <g filter="url(#iconShadow)">
      {/* Background Glow */}
      <circle cx="50" cy="40" r="20" fill="#F9C338" opacity="0.3" filter="url(#glowFilter)" />
      
      {/* Diya Base */}
      <path d="M 20 60 C 20 80, 80 80, 80 60 Z" fill="url(#diyaBody)" />
      <ellipse cx="50" cy="60" rx="30" ry="8" fill="#4B1515" opacity="0.8" />
      
      {/* Diya Flame */}
      <path d="M 50 60 C 40 60, 45 40, 50 25 C 55 40, 60 60, 50 60 Z" fill="url(#diyaFlame)" filter="url(#glowFilter)" />
      <path d="M 50 55 C 45 55, 48 45, 50 35 C 52 45, 55 55, 50 55 Z" fill="#FFF4D9" />
    </g>
  </svg>
);
