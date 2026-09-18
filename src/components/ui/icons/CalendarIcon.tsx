export const CalendarIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="calGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FDFBF7" />
        <stop offset="100%" stopColor="#EAE5D9" />
      </linearGradient>
      <linearGradient id="calHeader" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#832730" />
        <stop offset="100%" stopColor="#6B1C23" />
      </linearGradient>
      <filter id="calShadow">
        <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#6B1C23" floodOpacity="0.15" />
      </filter>
    </defs>
    <rect x="20" y="25" width="60" height="55" rx="6" fill="url(#calGrad)" filter="url(#calShadow)" />
    <path d="M20 31 C20 27.686 22.686 25 26 25 L74 25 C77.314 25 80 27.686 80 31 L80 40 L20 40 L20 31 Z" fill="url(#calHeader)" />
    <rect x="35" y="15" width="6" height="15" rx="3" fill="#D4B96F" />
    <rect x="59" y="15" width="6" height="15" rx="3" fill="#D4B96F" />
    <circle cx="35" cy="55" r="3" fill="#917631" opacity="0.5" />
    <circle cx="50" cy="55" r="3" fill="#917631" opacity="0.5" />
    <circle cx="65" cy="55" r="3" fill="#917631" opacity="0.5" />
    <circle cx="35" cy="65" r="3" fill="#917631" opacity="0.5" />
    <circle cx="50" cy="65" r="3" fill="#D94822" />
    <circle cx="65" cy="65" r="3" fill="#917631" opacity="0.5" />
  </svg>
);
