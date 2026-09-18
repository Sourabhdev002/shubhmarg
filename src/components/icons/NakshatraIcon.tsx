export const NakshatraIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="starGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFF4D9" />
        <stop offset="50%" stopColor="#E2A63B" />
        <stop offset="100%" stopColor="#A84C1C" />
      </linearGradient>
      <filter id="iconShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#A84C1C" floodOpacity="0.4" />
      </filter>
      <filter id="glowFilter" x="-40%" y="-40%" width="180%" height="180%">
        <feGaussianBlur stdDeviation="6" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    <g filter="url(#iconShadow)">
      {/* Background Glow */}
      <circle cx="50" cy="50" r="25" fill="#E2A63B" opacity="0.2" filter="url(#glowFilter)" />
      
      {/* 8-Pointed Star (Vedic Geometry) */}
      <path d="M 50 15 L 57 43 L 85 50 L 57 57 L 50 85 L 43 57 L 15 50 L 43 43 Z" fill="url(#starGrad)" />
      <path d="M 50 25 L 55 45 L 75 50 L 55 55 L 50 75 L 45 55 L 25 50 L 45 45 Z" fill="#FFF4D9" opacity="0.7" />
      
      {/* Center Gem */}
      <circle cx="50" cy="50" r="5" fill="#A84C1C" />
    </g>
  </svg>
);
