export const PersonalizedIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="mandalaPink" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F98A8A" />
        <stop offset="100%" stopColor="#D14D69" />
      </linearGradient>
      <radialGradient id="mandalaGold" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFF4D9" />
        <stop offset="100%" stopColor="#E2A63B" />
      </radialGradient>
      <filter id="iconShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#8A1C35" floodOpacity="0.3" />
      </filter>
    </defs>
    <g filter="url(#iconShadow)">
      {/* Outer Mandala Petals */}
      <g stroke="url(#mandalaGold)" strokeWidth="2" fill="url(#mandalaPink)">
        {[...Array(8)].map((_, i) => (
          <path 
            key={`petal-${i}`}
            d="M 50 20 C 65 35, 65 65, 50 80 C 35 65, 35 35, 50 20" 
            transform={`rotate(${i * 45} 50 50)`} 
            opacity="0.8"
          />
        ))}
      </g>
      {/* Inner Mandala Core */}
      <circle cx="50" cy="50" r="16" fill="url(#mandalaGold)" />
      <circle cx="50" cy="50" r="8" fill="#8A1C35" />
    </g>
  </svg>
);
