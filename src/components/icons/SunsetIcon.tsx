export const SunsetIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="sunGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#F9C338" />
        <stop offset="60%" stopColor="#D94822" />
        <stop offset="100%" stopColor="#4B1515" />
      </radialGradient>
      <linearGradient id="horizonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#4B1515" stopOpacity="0" />
        <stop offset="50%" stopColor="#8A2B35" />
        <stop offset="100%" stopColor="#4B1515" stopOpacity="0" />
      </linearGradient>
      <filter id="iconShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#4B1515" floodOpacity="0.4" />
      </filter>
    </defs>
    <g filter="url(#iconShadow)">
      {/* Sinking Sun Body */}
      <path d="M 30 50 A 20 20 0 0 1 70 50 Z" fill="url(#sunGrad)" />
      
      {/* Horizon Line cutting off the sun */}
      <rect x="15" y="50" width="70" height="3" fill="url(#horizonGrad)" />
      
      {/* Diminishing rays */}
      <g stroke="#D94822" strokeWidth="1.5" strokeLinecap="round" opacity="0.4">
        <line x1="50" y1="40" x2="50" y2="25" />
        <line x1="50" y1="40" x2="35" y2="35" />
        <line x1="50" y1="40" x2="65" y2="35" />
      </g>
    </g>
  </svg>
);
