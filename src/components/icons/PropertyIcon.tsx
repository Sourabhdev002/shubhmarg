export const PropertyIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="roofGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#A84C1C" />
        <stop offset="100%" stopColor="#4B1515" />
      </linearGradient>
      
      <linearGradient id="wallGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFF4D9" />
        <stop offset="100%" stopColor="#DEBE84" />
      </linearGradient>

      <linearGradient id="doorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#8A2B35" />
        <stop offset="100%" stopColor="#4B1515" />
      </linearGradient>

      <filter id="iconShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="6" stdDeviation="4" floodColor="#2F0A0A" floodOpacity="0.3" />
      </filter>
    </defs>

    <g filter="url(#iconShadow)">
      {/* Architectural Base / Foundation */}
      <path d="M 15 85 L 85 85 L 80 75 L 20 75 Z" fill="url(#wallGrad)" stroke="#B89947" strokeWidth="1" />
      <path d="M 20 75 L 80 75 L 75 65 L 25 65 Z" fill="url(#wallGrad)" stroke="#B89947" strokeWidth="1" />

      {/* Main Building Body */}
      <rect x="30" y="45" width="40" height="20" fill="url(#wallGrad)" stroke="#B89947" strokeWidth="1" />
      
      {/* Pillars */}
      <rect x="25" y="45" width="6" height="20" fill="#FFF4D9" stroke="#B89947" strokeWidth="1" />
      <rect x="69" y="45" width="6" height="20" fill="#FFF4D9" stroke="#B89947" strokeWidth="1" />

      {/* Traditional Arched Door */}
      <path d="M 40 65 L 40 53 C 40 45, 60 45, 60 53 L 60 65 Z" fill="url(#doorGrad)" />

      {/* Traditional Sloped Roof (Vedic/Temple Style) */}
      <path d="M 15 45 L 50 15 L 85 45 L 75 45 L 50 25 L 25 45 Z" fill="url(#roofGrad)" />
      <path d="M 30 45 L 50 25 L 70 45 Z" fill="url(#wallGrad)" />
      
      {/* Top Kalash/Finial */}
      <circle cx="50" cy="12" r="3" fill="#F9C338" />
      <polygon points="48,15 52,15 50,8" fill="#F9C338" />

      {/* Base grounding line */}
      <path d="M 10 88 L 90 88" stroke="#4B1515" strokeWidth="3" strokeLinecap="round" />
    </g>
  </svg>
);
