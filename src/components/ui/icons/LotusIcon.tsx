export const LotusIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="lotusGrad" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor="#F472B6" />
        <stop offset="100%" stopColor="#BE185D" />
      </linearGradient>
      <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4ADE80" />
        <stop offset="100%" stopColor="#15803D" />
      </linearGradient>
    </defs>
    {/* Center Petal */}
    <path d="M50 20 C 65 45, 60 70, 50 80 C 40 70, 35 45, 50 20 Z" fill="url(#lotusGrad)" />
    {/* Side Petals Right */}
    <path d="M50 35 C 75 45, 80 65, 55 80 C 45 70, 50 50, 50 35 Z" fill="url(#lotusGrad)" opacity="0.9" />
    <path d="M50 50 C 85 55, 90 70, 60 80 C 50 75, 50 60, 50 50 Z" fill="url(#lotusGrad)" opacity="0.8" />
    {/* Side Petals Left */}
    <path d="M50 35 C 25 45, 20 65, 45 80 C 55 70, 50 50, 50 35 Z" fill="url(#lotusGrad)" opacity="0.9" />
    <path d="M50 50 C 15 55, 10 70, 40 80 C 50 75, 50 60, 50 50 Z" fill="url(#lotusGrad)" opacity="0.8" />
    {/* Leaves */}
    <path d="M50 80 C 70 85, 80 90, 80 95 C 60 92, 50 90, 50 85 Z" fill="url(#leafGrad)" />
    <path d="M50 80 C 30 85, 20 90, 20 95 C 40 92, 50 90, 50 85 Z" fill="url(#leafGrad)" />
  </svg>
);
