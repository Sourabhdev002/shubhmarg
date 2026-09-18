export const CommunicationIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bubbleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4B638A" />
        <stop offset="100%" stopColor="#1E3A8A" />
      </linearGradient>
      <filter id="iconShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#1E3A8A" floodOpacity="0.3" />
      </filter>
    </defs>
    <g filter="url(#iconShadow)">
      {/* Speech Bubble */}
      <path d="M 15 35 C 15 20, 30 15, 50 15 C 70 15, 85 20, 85 35 C 85 50, 70 55, 50 55 C 40 55, 30 53, 25 65 C 25 55, 15 50, 15 35 Z" fill="url(#bubbleGrad)" stroke="#B89947" strokeWidth="2" strokeLinejoin="round" />
      
      {/* Inner Elements (Clarity / Light) */}
      <circle cx="35" cy="35" r="3" fill="#FFF4D9" />
      <circle cx="50" cy="35" r="3" fill="#FFF4D9" />
      <circle cx="65" cy="35" r="3" fill="#FFF4D9" />
    </g>
  </svg>
);
