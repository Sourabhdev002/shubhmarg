export const ModakIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="modakGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFF4D9" />
        <stop offset="50%" stopColor="#F9C338" />
        <stop offset="100%" stopColor="#E2A63B" />
      </linearGradient>
      <linearGradient id="plateGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#E5E7EB" />
        <stop offset="100%" stopColor="#9CA3AF" />
      </linearGradient>
      <filter id="iconShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#A84C1C" floodOpacity="0.3" />
      </filter>
    </defs>
    <g filter="url(#iconShadow)">
      {/* Silver Plate */}
      <ellipse cx="50" cy="75" rx="35" ry="12" fill="url(#plateGrad)" />
      <ellipse cx="50" cy="73" rx="33" ry="10" fill="#F3F4F6" />
      
      {/* Modak Body */}
      <path d="M 50 20 C 30 50, 25 70, 50 70 C 75 70, 70 50, 50 20 Z" fill="url(#modakGrad)" />
      
      {/* Modak Folds */}
      <path d="M 50 20 C 45 45, 40 65, 50 70" stroke="#D94822" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <path d="M 50 20 C 55 45, 60 65, 50 70" stroke="#D94822" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <path d="M 50 20 L 50 70" stroke="#FFF4D9" strokeWidth="1.5" opacity="0.8" />
      
      {/* Top Saffron/Pista Garnish */}
      <circle cx="50" cy="20" r="3" fill="#D94822" />
      <circle cx="48" cy="25" r="2" fill="#10B981" />
    </g>
  </svg>
);
