export const EducationIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bookCover" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8A2B35" />
        <stop offset="100%" stopColor="#4B1515" />
      </linearGradient>
      
      <linearGradient id="bookPages" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFF4D9" />
        <stop offset="100%" stopColor="#DEBE84" />
      </linearGradient>

      <radialGradient id="diyaFlame" cx="50%" cy="80%" r="80%">
        <stop offset="0%" stopColor="#FFF4D9" />
        <stop offset="40%" stopColor="#F9C338" />
        <stop offset="100%" stopColor="#D94822" />
      </radialGradient>

      <filter id="iconShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="6" stdDeviation="4" floodColor="#2F0A0A" floodOpacity="0.4" />
      </filter>
      <filter id="glowFilter" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="6" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>

    <g filter="url(#iconShadow)">
      {/* Glow behind Diya */}
      <circle cx="50" cy="40" r="25" fill="#F9C338" opacity="0.2" filter="url(#glowFilter)" />

      {/* Book Base (Pages) */}
      <path d="M 20 70 L 50 80 L 80 70 L 80 60 L 50 70 L 20 60 Z" fill="url(#bookPages)" />
      
      {/* Book Cover (Top layer) */}
      <path d="M 15 65 L 50 78 L 85 65 L 50 50 Z" fill="url(#bookCover)" stroke="#B89947" strokeWidth="2" strokeLinejoin="round" />
      
      {/* Bookmark */}
      <path d="M 46 65 L 54 65 L 54 85 L 50 80 L 46 85 Z" fill="#D94822" />

      {/* Diya (Lamp) Base */}
      <path d="M 35 45 C 35 60, 65 60, 65 45 Z" fill="url(#bookPages)" stroke="#B89947" strokeWidth="1" />
      <ellipse cx="50" cy="45" rx="15" ry="4" fill="#8A2B35" />
      
      {/* Diya Flame */}
      <path d="M 50 43 C 45 43, 48 30, 50 20 C 52 30, 55 43, 50 43 Z" fill="url(#diyaFlame)" filter="url(#glowFilter)" />
    </g>
  </svg>
);
