export const DiyaIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="flameGrad" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor="#F9C338" />
        <stop offset="100%" stopColor="#D94822" />
      </linearGradient>
      <linearGradient id="clayGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#832730" />
        <stop offset="100%" stopColor="#511219" />
      </linearGradient>
      <filter id="flameGlow">
        <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#F9C338" floodOpacity="0.6" />
      </filter>
    </defs>
    {/* Flame */}
    <path d="M50 20 C 65 40, 60 55, 50 60 C 40 55, 35 40, 50 20 Z" fill="url(#flameGrad)" filter="url(#flameGlow)" />
    {/* Base */}
    <path d="M20 60 C 20 80, 80 80, 80 60 Z" fill="url(#clayGrad)" />
    {/* Details */}
    <path d="M25 65 C 40 75, 60 75, 75 65" stroke="#B89947" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
