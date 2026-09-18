export const ConfidentialityIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="lockBody" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4A6B52" />
        <stop offset="100%" stopColor="#2F4735" />
      </linearGradient>
      <linearGradient id="lockGold" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#A84C1C" />
        <stop offset="100%" stopColor="#F9C338" />
      </linearGradient>
      <filter id="iconShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#2F4735" floodOpacity="0.4" />
      </filter>
    </defs>
    <g filter="url(#iconShadow)">
      {/* Lock Shackle */}
      <path d="M 35 45 L 35 35 C 35 25, 65 25, 65 35 L 65 45" fill="none" stroke="url(#lockGold)" strokeWidth="6" strokeLinecap="round" />
      
      {/* Lock Body */}
      <rect x="25" y="45" width="50" height="40" rx="8" fill="url(#lockBody)" stroke="#E2A63B" strokeWidth="2" />
      
      {/* Keyhole */}
      <circle cx="50" cy="58" r="6" fill="#F9C338" />
      <path d="M 46 60 L 54 60 L 52 75 L 48 75 Z" fill="#F9C338" />
    </g>
  </svg>
);
