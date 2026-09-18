export const LunarMonthIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFF4D9" />
        <stop offset="60%" stopColor="#B89947" />
        <stop offset="100%" stopColor="#4A3A35" />
      </radialGradient>
      <filter id="iconShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="2" dy="2" stdDeviation="2" floodColor="#2A2A2A" floodOpacity="0.3" />
      </filter>
    </defs>
    <g filter="url(#iconShadow)">
      {/* Full Moon Base */}
      <circle cx="45" cy="55" r="25" fill="url(#moonGlow)" />
      
      {/* Overlapping Constellation / Month Marker */}
      <circle cx="65" cy="35" r="10" fill="#4B1515" stroke="#E2A63B" strokeWidth="2" />
      <circle cx="65" cy="35" r="3" fill="#FFF4D9" />
      
      <circle cx="25" cy="45" r="2" fill="#E2A63B" />
      <circle cx="35" cy="75" r="1.5" fill="#FFF4D9" />
    </g>
  </svg>
);
