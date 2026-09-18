export const WealthIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="lotusPink" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F98A8A" />
        <stop offset="50%" stopColor="#D14D69" />
        <stop offset="100%" stopColor="#8A1C35" />
      </linearGradient>
      
      <linearGradient id="goldPot" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFF4D9" />
        <stop offset="50%" stopColor="#E2A63B" />
        <stop offset="100%" stopColor="#A84C1C" />
      </linearGradient>

      <filter id="iconShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="6" stdDeviation="4" floodColor="#2F0A0A" floodOpacity="0.3" />
      </filter>
    </defs>

    <g filter="url(#iconShadow)">
      {/* Background Radiance */}
      <circle cx="50" cy="50" r="35" fill="none" stroke="#F9C338" strokeWidth="1" strokeDasharray="2 4" opacity="0.5" />
      <circle cx="50" cy="50" r="40" fill="none" stroke="#D14D69" strokeWidth="1" strokeDasharray="1 8" opacity="0.3" />

      {/* Abundance Pot (Kalash) */}
      <path d="M 30 70 C 20 90, 80 90, 70 70 C 75 60, 65 55, 60 55 L 40 55 C 35 55, 25 60, 30 70 Z" fill="url(#goldPot)" />
      
      {/* Pot Rim */}
      <ellipse cx="50" cy="55" rx="12" ry="4" fill="#A84C1C" />
      <ellipse cx="50" cy="53" rx="14" ry="5" fill="url(#goldPot)" />

      {/* Lotus Flower emerging from Pot */}
      {/* Outer Petals */}
      <path d="M 50 50 C 20 40, 20 20, 50 35 C 80 20, 80 40, 50 50 Z" fill="url(#lotusPink)" opacity="0.8" />
      {/* Inner Petals */}
      <path d="M 50 50 C 35 40, 35 25, 50 15 C 65 25, 65 40, 50 50 Z" fill="url(#lotusPink)" />
      {/* Center Bud */}
      <path d="M 50 50 C 45 40, 48 30, 50 20 C 52 30, 55 40, 50 50 Z" fill="#F9C338" />
      
      {/* Falling Coins */}
      <circle cx="35" cy="45" r="3" fill="#FFF4D9" />
      <circle cx="28" cy="55" r="2.5" fill="#E2A63B" />
      <circle cx="65" cy="45" r="3" fill="#FFF4D9" />
      <circle cx="72" cy="55" r="2.5" fill="#E2A63B" />

      {/* Base grounding line */}
      <path d="M 25 88 L 75 88" stroke="#4B1515" strokeWidth="3" strokeLinecap="round" />
    </g>
  </svg>
);
