export const GuidanceIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="compassBase" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFF4D9" />
        <stop offset="70%" stopColor="#DEBE84" />
        <stop offset="100%" stopColor="#917548" />
      </radialGradient>
      
      <linearGradient id="compassRing" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8A2B35" />
        <stop offset="100%" stopColor="#4B1515" />
      </linearGradient>

      <linearGradient id="needleLight" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#F9C338" />
        <stop offset="100%" stopColor="#FFF4D9" />
      </linearGradient>

      <filter id="iconShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="6" stdDeviation="4" floodColor="#2F0A0A" floodOpacity="0.3" />
      </filter>
      <filter id="needleShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="#2F0A0A" floodOpacity="0.5" />
      </filter>
    </defs>

    <g filter="url(#iconShadow)">
      {/* Outer Ring */}
      <circle cx="50" cy="50" r="35" fill="url(#compassBase)" stroke="#B89947" strokeWidth="2" />
      <circle cx="50" cy="50" r="30" fill="none" stroke="url(#compassRing)" strokeWidth="4" strokeDasharray="2 4" />
      <circle cx="50" cy="50" r="26" fill="none" stroke="#B89947" strokeWidth="1" />
      
      {/* Eight Direction Markers */}
      <g stroke="#8A2B35" strokeWidth="1.5" strokeLinecap="round">
        <line x1="50" y1="20" x2="50" y2="24" />
        <line x1="50" y1="80" x2="50" y2="76" />
        <line x1="20" y1="50" x2="24" y2="50" />
        <line x1="80" y1="50" x2="76" y2="50" />
        <line x1="28" y1="28" x2="31" y2="31" />
        <line x1="72" y1="72" x2="69" y2="69" />
        <line x1="28" y1="72" x2="31" y2="69" />
        <line x1="72" y1="28" x2="69" y2="31" />
      </g>

      {/* Center Rose / Compass Needle */}
      <g filter="url(#needleShadow)">
        {/* North-South Needle */}
        <polygon points="50,22 55,50 50,78 45,50" fill="url(#compassRing)" />
        <polygon points="50,22 55,50 50,50" fill="#4B1515" />
        
        {/* East-West Needle */}
        <polygon points="22,50 50,45 78,50 50,55" fill="url(#needleLight)" />
        <polygon points="50,45 78,50 50,50" fill="#E2A63B" />
      </g>
      
      {/* Center Pin */}
      <circle cx="50" cy="50" r="4" fill="#FFF4D9" />
      <circle cx="50" cy="50" r="2" fill="#4B1515" />

      {/* Base grounding line */}
      <path d="M 25 90 L 75 90" stroke="#4B1515" strokeWidth="3" strokeLinecap="round" />
    </g>
  </svg>
);
