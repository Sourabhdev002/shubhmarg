export const LotusIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="lotusPink" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F98A8A" />
        <stop offset="50%" stopColor="#D14D69" />
        <stop offset="100%" stopColor="#8A1C35" />
      </linearGradient>
      <linearGradient id="leafGreen" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#34D399" />
        <stop offset="100%" stopColor="#047857" />
      </linearGradient>
      <filter id="iconShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#8A1C35" floodOpacity="0.3" />
      </filter>
    </defs>
    <g filter="url(#iconShadow)">
      {/* Base Leaves */}
      <path d="M 50 70 C 15 70, 15 50, 30 45 C 50 55, 50 70, 50 70 Z" fill="url(#leafGreen)" />
      <path d="M 50 70 C 85 70, 85 50, 70 45 C 50 55, 50 70, 50 70 Z" fill="url(#leafGreen)" />
      
      {/* Outer Petals */}
      <path d="M 50 65 C 20 55, 15 35, 30 25 C 40 40, 50 65, 50 65 Z" fill="url(#lotusPink)" opacity="0.8" />
      <path d="M 50 65 C 80 55, 85 35, 70 25 C 60 40, 50 65, 50 65 Z" fill="url(#lotusPink)" opacity="0.8" />
      
      {/* Inner Petals */}
      <path d="M 50 65 C 30 55, 25 35, 40 15 C 45 40, 50 65, 50 65 Z" fill="url(#lotusPink)" />
      <path d="M 50 65 C 70 55, 75 35, 60 15 C 55 40, 50 65, 50 65 Z" fill="url(#lotusPink)" />
      
      {/* Center Bud */}
      <path d="M 50 65 C 42 55, 45 35, 50 20 C 55 35, 58 55, 50 65 Z" fill="#F98A8A" />
      
      {/* Base Reflection/Water */}
      <ellipse cx="50" cy="75" rx="20" ry="3" fill="#3B82F6" opacity="0.2" />
    </g>
  </svg>
);
