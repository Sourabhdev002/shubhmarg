export const TrishulIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFF4D9" />
        <stop offset="50%" stopColor="#E2A63B" />
        <stop offset="100%" stopColor="#A84C1C" />
      </linearGradient>
      <linearGradient id="silverGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#E5E7EB" />
        <stop offset="100%" stopColor="#9CA3AF" />
      </linearGradient>
      <filter id="iconShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#4B1515" floodOpacity="0.3" />
      </filter>
    </defs>
    <g filter="url(#iconShadow)">
      {/* Central Staff */}
      <rect x="47" y="20" width="6" height="70" rx="3" fill="url(#goldGrad)" />
      
      {/* Central Spear */}
      <path d="M 50 10 L 56 25 L 44 25 Z" fill="url(#silverGrad)" />
      
      {/* Left Prong */}
      <path d="M 47 40 C 25 40, 25 15, 30 15 C 33 15, 33 25, 38 25 C 35 32, 38 35, 47 35 Z" fill="url(#goldGrad)" />
      <path d="M 30 15 L 34 22 L 26 22 Z" fill="url(#silverGrad)" />
      
      {/* Right Prong */}
      <path d="M 53 40 C 75 40, 75 15, 70 15 C 67 15, 67 25, 62 25 C 65 32, 62 35, 53 35 Z" fill="url(#goldGrad)" />
      <path d="M 70 15 L 74 22 L 66 22 Z" fill="url(#silverGrad)" />
      
      {/* Damaru (Drum) */}
      <path d="M 35 55 L 65 55 L 45 65 L 55 65 Z" fill="#8A2B35" />
      <path d="M 35 75 L 65 75 L 45 65 L 55 65 Z" fill="#8A2B35" />
      
      {/* Damaru Strings */}
      <line x1="35" y1="55" x2="65" y2="75" stroke="#E2A63B" strokeWidth="1.5" />
      <line x1="65" y1="55" x2="35" y2="75" stroke="#E2A63B" strokeWidth="1.5" />
    </g>
  </svg>
);
