export const MarriageIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFF4D9" />
        <stop offset="40%" stopColor="#E2A63B" />
        <stop offset="100%" stopColor="#A84C1C" />
      </linearGradient>
      
      <linearGradient id="lotusPetal" x1="50%" y1="100%" x2="50%" y2="0%">
        <stop offset="0%" stopColor="#A84C1C" />
        <stop offset="100%" stopColor="#F9C338" />
      </linearGradient>

      <filter id="iconShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#4B1515" floodOpacity="0.25" />
      </filter>
      <filter id="ringShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="2" dy="2" stdDeviation="2" floodColor="#2F0A0A" floodOpacity="0.4" />
      </filter>
    </defs>

    <g filter="url(#iconShadow)">
      {/* Base Lotus / Sacred Fire Leaves */}
      <path d="M 50 85 C 20 85, 20 60, 50 45 C 80 60, 80 85, 50 85 Z" fill="url(#lotusPetal)" opacity="0.6" />
      <path d="M 50 80 C 35 80, 35 60, 50 50 C 65 60, 65 80, 50 80 Z" fill="url(#lotusPetal)" />

      {/* Left Ring */}
      <g filter="url(#ringShadow)">
        <circle cx="40" cy="45" r="16" fill="none" stroke="url(#ringGrad)" strokeWidth="6" />
        {/* Subtle highlight line inside ring */}
        <circle cx="40" cy="45" r="18" fill="none" stroke="#FFF4D9" strokeWidth="0.5" opacity="0.8" />
      </g>
      
      {/* Right Ring */}
      <g filter="url(#ringShadow)">
        <circle cx="60" cy="45" r="16" fill="none" stroke="url(#ringGrad)" strokeWidth="6" />
        <circle cx="60" cy="45" r="18" fill="none" stroke="#FFF4D9" strokeWidth="0.5" opacity="0.8" />
      </g>

      {/* Redraw part of the Left Ring to create the interlock illusion */}
      <path d="M 40 29 A 16 16 0 0 1 54 37" fill="none" stroke="url(#ringGrad)" strokeWidth="6" strokeLinecap="round" />
      
      {/* Top Diamond / Gem */}
      <polygon points="50,20 54,26 50,32 46,26" fill="#FFF4D9" />
      
      {/* Base grounding line */}
      <path d="M 25 88 L 75 88" stroke="#4B1515" strokeWidth="3" strokeLinecap="round" />
    </g>
  </svg>
);
