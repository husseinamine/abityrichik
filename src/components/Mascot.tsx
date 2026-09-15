import React from 'react';

interface MascotProps {
  className?: string;
}

export const Mascot: React.FC<MascotProps> = ({ className = '' }) => {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 190 200"
        className="w-36 h-38 sm:w-44 sm:h-46 overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Soft ground shadow ellipse */}
        <ellipse
          cx="95"
          cy="188"
          rx="58"
          ry="8"
          fill="#E1EDFB"
        />

        {/* Outer Dotted Circle */}
        <circle
          cx="95"
          cy="92"
          r="76"
          stroke="#93C5FD"
          strokeWidth="2.5"
          strokeDasharray="7 6"
        />

        {/* Inner Dotted Circle */}
        <circle
          cx="95"
          cy="92"
          r="63"
          stroke="#BFDBFE"
          strokeWidth="2"
          strokeDasharray="4 5"
        />

        {/* Soft Pale Blue Circular Fill */}
        <circle
          cx="95"
          cy="92"
          r="62"
          fill="#F2F8FE"
        />

        {/* Bold 'X' Mascot Emblem */}
        <g stroke="#2563EB" strokeWidth="11" strokeLinecap="round">
          <line x1="72" y1="69" x2="118" y2="115" />
          <line x1="118" y1="69" x2="72" y2="115" />
        </g>
      </svg>
    </div>
  );
};
