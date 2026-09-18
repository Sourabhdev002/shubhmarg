export const TithiIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFF4D9" />
        <stop offset="60%" stopColor="#B89947" />
        <stop offset="100%" stopColor="#4A3A35" />
      </radialGradient>
      <radialGradient id="crater" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#4A3A35" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#4A3A35" stopOpacity="0.1" />
      </radialGradient>
      <filter id="iconShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#2A2A2A" floodOpacity="0.4" />
      </filter>
    </defs>
    <g filter="url(#iconShadow)">
      {/* Base Moon Sphere */}
      <circle cx="50" cy="50" r="35" fill="url(#moonGlow)" />
      
      {/* Dark Side (creating a crescent/half moon look for 3D realism) */}
      <path d="M 50 15 A 35 35 0 0 1 50 85 A 25 35 0 0 0 50 15 Z" fill="#2A2A2A" opacity="0.8" />
      
      {/* Subtle Craters on the bright side */}
      <circle cx="35" cy="40" r="6" fill="url(#crater)" />
      <circle cx="45" cy="65" r="4" fill="url(#crater)" />
      <circle cx="28" cy="55" r="3" fill="url(#crater)" />
    </g>
  </svg>
);
