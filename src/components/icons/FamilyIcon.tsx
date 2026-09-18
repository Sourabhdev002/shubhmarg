export const FamilyIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#A84C1C" />
        <stop offset="100%" stopColor="#4B1515" />
      </linearGradient>
      
      <radialGradient id="headGrad" cx="30%" cy="30%" r="60%">
        <stop offset="0%" stopColor="#FFF4D9" />
        <stop offset="50%" stopColor="#E2A63B" />
        <stop offset="100%" stopColor="#A84C1C" />
      </radialGradient>

      <linearGradient id="archGrad" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stopColor="#B89947" />
        <stop offset="100%" stopColor="#F9C338" />
      </linearGradient>

      <filter id="iconShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#4B1515" floodOpacity="0.25" />
      </filter>
      <filter id="figureShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="2" dy="2" stdDeviation="2" floodColor="#2F0A0A" floodOpacity="0.3" />
      </filter>
    </defs>

    <g filter="url(#iconShadow)">
      {/* Protective Arch / Home Symbol */}
      <path d="M 20 85 L 20 40 C 20 20, 80 20, 80 40 L 80 85" fill="none" stroke="url(#archGrad)" strokeWidth="6" strokeLinecap="round" />
      
      {/* Background/Parent Figure 1 */}
      <g filter="url(#figureShadow)">
        <circle cx="40" cy="45" r="8" fill="url(#headGrad)" />
        <path d="M 25 85 Q 40 55 55 85 Z" fill="url(#bodyGrad)" />
      </g>
      
      {/* Background/Parent Figure 2 */}
      <g filter="url(#figureShadow)">
        <circle cx="60" cy="50" r="7" fill="url(#headGrad)" />
        <path d="M 45 85 Q 60 60 75 85 Z" fill="url(#bodyGrad)" />
      </g>
      
      {/* Foreground Child Figure */}
      <g filter="url(#figureShadow)">
        <circle cx="50" cy="65" r="6" fill="url(#headGrad)" />
        <path d="M 40 85 Q 50 70 60 85 Z" fill="url(#bodyGrad)" />
      </g>

      {/* Base grounding line */}
      <path d="M 15 88 L 85 88" stroke="#4B1515" strokeWidth="3" strokeLinecap="round" />
    </g>
  </svg>
);
