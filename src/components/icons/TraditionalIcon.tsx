export const TraditionalIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="scrollPaper" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFF4D9" />
        <stop offset="100%" stopColor="#DEBE84" />
      </linearGradient>
      <linearGradient id="scrollWood" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#8A2B35" />
        <stop offset="100%" stopColor="#4B1515" />
      </linearGradient>
      <filter id="iconShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="6" stdDeviation="4" floodColor="#2F0A0A" floodOpacity="0.25" />
      </filter>
    </defs>
    <g filter="url(#iconShadow)">
      {/* Scroll Roll Top */}
      <rect x="25" y="15" width="50" height="10" rx="3" fill="url(#scrollWood)" stroke="#B89947" strokeWidth="1" />
      <circle cx="20" cy="20" r="5" fill="#F9C338" />
      <circle cx="80" cy="20" r="5" fill="#F9C338" />

      {/* Main Paper */}
      <path d="M 30 25 L 70 25 L 70 75 L 30 75 Z" fill="url(#scrollPaper)" />
      
      {/* Scroll Roll Bottom */}
      <rect x="25" y="75" width="50" height="10" rx="3" fill="url(#scrollWood)" stroke="#B89947" strokeWidth="1" />
      <circle cx="20" cy="80" r="5" fill="#F9C338" />
      <circle cx="80" cy="80" r="5" fill="#F9C338" />

      {/* Vedic Script / Text Lines */}
      <path d="M 40 40 L 60 40 M 40 50 L 55 50 M 40 60 L 60 60" stroke="#4B1515" strokeWidth="2" strokeLinecap="round" />
    </g>
  </svg>
);
