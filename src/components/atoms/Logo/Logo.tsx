import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo = ({ className = '', showText = true, size = 'md' }: LogoProps) => {
  const getSizes = () => {
    switch (size) {
      case 'sm':
        return { icon: 'w-8 h-8', text: 'text-lg' };
      case 'lg':
        return { icon: 'w-12 h-12', text: 'text-2xl' };
      default:
        return { icon: 'w-10 h-10', text: 'text-xl' };
    }
  };

  const sizes = getSizes();

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Zamel Logo Icon */}
      <div className={`${sizes.icon} relative`}>
        <svg viewBox="0 0 120 120" className="w-full h-full" fill="none">
          {/* Background Circle */}
          <rect width="120" height="120" rx="24" className="fill-gradient-primary" />
          
          {/* Letter Z with chat bubble and book elements */}
          <g transform="translate(20, 20)">
            {/* Chat bubble */}
            <path
              d="M15 25 C10 25, 5 30, 5 35 L5 50 C5 55, 10 60, 15 60 L25 60 L30 70 L35 60 L50 60 C55 60, 60 55, 60 50 L60 35 C60 30, 55 25, 50 25 Z"
              className="fill-primary-end"
            />
            
            {/* Z letter */}
            <path
              d="M20 15 L55 15 L55 25 L35 45 L55 45 L55 55 L20 55 L20 45 L40 25 L20 25 Z"
              className="fill-background"
              strokeWidth="2"
            />
            
            {/* Book base */}
            <path
              d="M10 65 Q10 60, 15 60 L65 60 Q70 60, 70 65 L70 75 Q70 80, 65 80 L15 80 Q10 80, 10 75 Z"
              className="fill-secondary"
            />
            
            {/* Book pages */}
            <path
              d="M15 62 Q20 58, 30 62 Q40 58, 50 62 Q60 58, 65 62 L65 78 Q60 74, 50 78 Q40 74, 30 78 Q20 74, 15 78 Z"
              className="fill-tertiary"
            />
            
            {/* Chat dots */}
            <circle cx="25" cy="42" r="2" className="fill-background" />
            <circle cx="33" cy="42" r="2" className="fill-background" />
            <circle cx="41" cy="42" r="2" className="fill-background" />
          </g>
        </svg>
      </div>
      
      {/* Text */}
      {showText && (
        <span className={`font-bold bg-gradient-primary bg-clip-text text-transparent ${sizes.text}`}>
          Zamel
        </span>
      )}
    </div>
  );
};