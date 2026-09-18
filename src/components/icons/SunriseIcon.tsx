export const SunriseIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="sunGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFF4D9" />
        <stop offset="50%" stopColor="#F9C338" />
        <stop offset="100%" stopColor="#D94822" />
      </radialGradient>
      <linearGradient id="horizonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#8A2B35" stopOpacity="0" />
        <stop offset="50%" stopColor="#B89947" />
        <stop offset="100%" stopColor="#8A2B35" stopOpacity="0" />
      </linearGradient>
      <filter id="iconShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#D94822" floodOpacity="0.3" />
      </filter>
    </defs>
    <g filter="url(#iconShadow)">
      {/* Radiant Beams */}
      <g stroke="#F9C338" strokeWidth="2" strokeLinecap="round" opacity="0.6">
        <line x1="50" y1="50" x2="50" y2="15" />
        <line x1="50" y1="50" x2="25" y2="25" />
        <line x1="50" y1="50" x2="75" y2="25" />
      </g>
      
      {/* Rising Sun Body */}
      <path d="M 30 60 A 20 20 0 0 1 70 60 Z" fill="url(#sunGrad)" />
      
      {/* Horizon Line */}
      <rect x="15" y="60" width="70" height="2" fill="url(#horizonGrad)" />
      
      {/* Ground/Water reflection */}
      <rect x="40" y="65" width="20" height="2" fill="#F9C338" opacity="0.4" />
      <rect x="45" y="70" width="10" height="1.5" fill="#F9C338" opacity="0.2" />
    </g>
  </svg>
);
