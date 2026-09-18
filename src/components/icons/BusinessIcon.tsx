export const BusinessIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="coinFace" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFF4D9" />
        <stop offset="50%" stopColor="#E2A63B" />
        <stop offset="100%" stopColor="#A84C1C" />
      </linearGradient>
      
      <linearGradient id="coinEdge" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#A84C1C" />
        <stop offset="100%" stopColor="#4B1515" />
      </linearGradient>
      
      <linearGradient id="leafGrad" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#4A6B52" />
        <stop offset="100%" stopColor="#8CC096" />
      </linearGradient>

      <filter id="iconShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#4B1515" floodOpacity="0.3" />
      </filter>
      <filter id="coinShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="3" stdDeviation="2" floodColor="#2F0A0A" floodOpacity="0.4" />
      </filter>
    </defs>

    <g filter="url(#iconShadow)">
      {/* Background Leaves/Growth */}
      <path d="M 50 85 C 40 55, 15 45, 25 25 C 35 35, 50 45, 50 85 Z" fill="url(#leafGrad)" />
      <path d="M 50 85 C 60 50, 85 40, 75 20 C 65 30, 50 40, 50 85 Z" fill="url(#leafGrad)" opacity="0.9" />
      
      {/* Stack of Coins */}
      {/* Bottom Coin */}
      <g filter="url(#coinShadow)">
        <ellipse cx="50" cy="78" rx="20" ry="8" fill="url(#coinEdge)" />
        <ellipse cx="50" cy="75" rx="20" ry="8" fill="url(#coinFace)" />
        <ellipse cx="50" cy="75" rx="14" ry="5" stroke="#A84C1C" strokeWidth="1" />
      </g>
      
      {/* Middle Coin */}
      <g filter="url(#coinShadow)">
        <ellipse cx="50" cy="68" rx="20" ry="8" fill="url(#coinEdge)" />
        <ellipse cx="50" cy="65" rx="20" ry="8" fill="url(#coinFace)" />
        <ellipse cx="50" cy="65" rx="14" ry="5" stroke="#A84C1C" strokeWidth="1" />
      </g>
      
      {/* Top Coin */}
      <g filter="url(#coinShadow)">
        <ellipse cx="50" cy="58" rx="20" ry="8" fill="url(#coinEdge)" />
        <ellipse cx="50" cy="55" rx="20" ry="8" fill="url(#coinFace)" />
        <ellipse cx="50" cy="55" rx="14" ry="5" stroke="#A84C1C" strokeWidth="1" />
        {/* Subtle star inside top coin */}
        <path d="M 50 51 L 52 54 L 56 54 L 53 56 L 54 59 L 50 57 L 46 59 L 47 56 L 44 54 L 48 54 Z" fill="#FFF4D9" />
      </g>
      
      {/* Base grounding line */}
      <path d="M 20 88 L 80 88" stroke="#4B1515" strokeWidth="3" strokeLinecap="round" />
    </g>
  </svg>
);
