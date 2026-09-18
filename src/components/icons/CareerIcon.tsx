export const CareerIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="careerSunBody" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFF4D9" />
        <stop offset="50%" stopColor="#E2A63B" />
        <stop offset="100%" stopColor="#A84C1C" />
      </radialGradient>
      
      <linearGradient id="mountainFront" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#C2A36B" />
        <stop offset="100%" stopColor="#826829" />
      </linearGradient>
      
      <linearGradient id="mountainBack" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#8A2B35" />
        <stop offset="100%" stopColor="#4B1515" />
      </linearGradient>

      <linearGradient id="sunRays" x1="50%" y1="100%" x2="50%" y2="0%">
        <stop offset="0%" stopColor="#E2A63B" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#FFF4D9" stopOpacity="0" />
      </linearGradient>

      <filter id="iconShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#4B1515" floodOpacity="0.3" />
      </filter>
      <filter id="sunGlowFilter" x="-40%" y="-40%" width="180%" height="180%">
        <feGaussianBlur stdDeviation="8" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>

    <g filter="url(#iconShadow)">
      {/* Background Sun Rays */}
      <g stroke="url(#sunRays)" strokeWidth="3" strokeLinecap="round">
        <line x1="50" y1="50" x2="50" y2="15" />
        <line x1="50" y1="50" x2="25" y2="25" />
        <line x1="50" y1="50" x2="75" y2="25" />
        <line x1="50" y1="50" x2="15" y2="50" />
        <line x1="50" y1="50" x2="85" y2="50" />
      </g>

      {/* 3D Sun */}
      <circle cx="50" cy="55" r="22" fill="url(#careerSunBody)" filter="url(#sunGlowFilter)" />
      <circle cx="50" cy="55" r="18" fill="url(#careerSunBody)" />

      {/* Background Mountain */}
      <path d="M 15 85 L 45 45 L 60 65 L 70 55 L 85 85 Z" fill="url(#mountainBack)" />
      
      {/* Foreground Mountain / Path */}
      <path d="M 25 85 L 55 55 L 75 85 Z" fill="url(#mountainFront)" />
      
      {/* Golden Steps / Path upwards */}
      <path d="M 50 85 L 45 75 L 55 75 L 50 65 L 60 65" fill="none" stroke="#FFF4D9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      
      {/* Base grounding line */}
      <path d="M 10 85 L 90 85" stroke="#4B1515" strokeWidth="3" strokeLinecap="round" />
    </g>
  </svg>
);
