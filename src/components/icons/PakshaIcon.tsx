export const PakshaIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFF4D9" />
        <stop offset="60%" stopColor="#B89947" />
        <stop offset="100%" stopColor="#4A3A35" />
      </radialGradient>
      <filter id="iconShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#2A2A2A" floodOpacity="0.4" />
      </filter>
    </defs>
    <g filter="url(#iconShadow)">
      {/* Dark Moon (New Moon phase) */}
      <circle cx="50" cy="50" r="30" fill="#2A2A2A" />
      
      {/* Bright Crescent (Waxing/Waning visual) */}
      <path d="M 50 20 A 30 30 0 0 1 50 80 A 15 30 0 0 0 50 20 Z" fill="url(#moonGlow)" />
      
      {/* Transition line */}
      <path d="M 50 15 L 50 85" stroke="#FFF4D9" strokeWidth="1" strokeDasharray="2 4" opacity="0.3" />
    </g>
  </svg>
);
