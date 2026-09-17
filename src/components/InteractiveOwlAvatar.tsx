import React from "react";

export type LookDirection = "up" | "down" | "neutral";

interface InteractiveOwlAvatarProps {
  lookDirection?: LookDirection;
  className?: string;
}

export const InteractiveOwlAvatar: React.FC<InteractiveOwlAvatarProps> = ({
  lookDirection = "neutral",
  className = "",
}) => {
  // Eye pupil vertical offset based on look direction
  const pupilOffsetY =
    lookDirection === "down" ? 3.5 : lookDirection === "up" ? -3.5 : 0;
  const headOffsetY =
    lookDirection === "down" ? 1.5 : lookDirection === "up" ? -1.5 : 0;
  const headRotate =
    lookDirection === "down" ? 2 : lookDirection === "up" ? -2 : 0;

  return (
    <div
      className={`relative flex items-center justify-center select-none overflow-hidden ${className}`}
      title={
        lookDirection === "down"
          ? "СОВА смотрит вниз на программы"
          : lookDirection === "up"
          ? "СОВА смотрит вверх"
          : "СОВА следит за твоим выбором"
      }
    >
      <svg
        viewBox="0 0 110 110"
        className="w-full h-full overflow-visible transition-transform duration-300 ease-out"
        style={{
          transform: `translateY(${headOffsetY}px) rotate(${headRotate}deg)`,
        }}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Soft Background Glow inside Avatar */}
        <circle cx="55" cy="55" r="50" fill="#EFF6FF" />

        {/* Left/Right Owl Ear Tufts behind cap */}
        <path d="M30 38 L22 22 L38 30 Z" fill="#1E40AF" />
        <path d="M80 38 L88 22 L72 30 Z" fill="#1E40AF" />

        {/* Owl Head & Body Silhouette */}
        <path
          d="M55 24 C32 24 24 46 24 74 C24 94 36 104 55 104 C74 104 86 94 86 74 C86 46 78 24 55 24 Z"
          fill="#1D4ED8"
        />

        {/* Cream Belly & Chest Plaque */}
        <path
          d="M55 58 C41 58 34 68 34 84 C34 98 42 103 55 103 C68 103 76 98 76 84 C76 68 69 58 55 58 Z"
          fill="#F8FAFC"
        />

        {/* Scalloped Feathers */}
        <path
          d="M50 78 Q55 82 60 78"
          stroke="#93C5FD"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M45 88 Q50 92 55 88"
          stroke="#93C5FD"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M55 88 Q60 92 65 88"
          stroke="#93C5FD"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />

        {/* Eye Socket White Bases */}
        <circle cx="42" cy="48" r="14" fill="#FFFFFF" />
        <circle cx="68" cy="48" r="14" fill="#FFFFFF" />
        {/* Eye Socket Soft Cream Rings */}
        <circle cx="42" cy="48" r="13" fill="#FEF3C7" />
        <circle cx="68" cy="48" r="13" fill="#FEF3C7" />

        {/* Left Pupil (Interactive glide) */}
        <circle
          cx="42"
          cy={48 + pupilOffsetY}
          r="9"
          fill="#0F172A"
          className="transition-all duration-250 ease-out"
        />
        {/* Left Eye Sparkle / Highlight */}
        <circle
          cx="39.5"
          cy={45 + pupilOffsetY}
          r="3"
          fill="#FFFFFF"
          className="transition-all duration-250 ease-out"
        />
        <circle
          cx="44"
          cy={51 + pupilOffsetY}
          r="1.5"
          fill="#FFFFFF"
          className="transition-all duration-250 ease-out"
        />

        {/* Right Pupil (Interactive glide) */}
        <circle
          cx="68"
          cy={48 + pupilOffsetY}
          r="9"
          fill="#0F172A"
          className="transition-all duration-250 ease-out"
        />
        {/* Right Eye Sparkle / Highlight */}
        <circle
          cx="65.5"
          cy={45 + pupilOffsetY}
          r="3"
          fill="#FFFFFF"
          className="transition-all duration-250 ease-out"
        />
        <circle
          cx="70"
          cy={51 + pupilOffsetY}
          r="1.5"
          fill="#FFFFFF"
          className="transition-all duration-250 ease-out"
        />

        {/* Cute Beak */}
        <path
          d="M55 49 L58 57 Q55 60 52 57 Z"
          fill="#F59E0B"
          stroke="#D97706"
          strokeWidth="1.2"
          strokeLinejoin="round"
          className="transition-transform duration-250 ease-out"
          style={{
            transform: `translateY(${pupilOffsetY * 0.4}px)`,
          }}
        />

        {/* =================================================== */}
        {/* ACADEMIC CAP (Конфедератка / Mortarboard)          */}
        {/* =================================================== */}
        <g>
          {/* Cap Skull Base */}
          <path
            d="M42 27 C42 27 44 34 55 34 C66 34 68 27 68 27 Z"
            fill="#0F172A"
          />
          {/* Main Diamond Top Board */}
          <polygon
            points="55,9 95,20 55,31 15,20"
            fill="#0F172A"
            stroke="#1E293B"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* Cap Edge Highlight */}
          <line x1="16" y1="20" x2="55" y2="30.5" stroke="#334155" strokeWidth="1.2" />
          <line x1="55" y1="30.5" x2="94" y2="20" stroke="#334155" strokeWidth="1.2" />

          {/* Golden Center Button */}
          <circle cx="55" cy="20" r="3" fill="#F59E0B" stroke="#D97706" strokeWidth="0.8" />

          {/* Golden Tassel hanging down */}
          <path
            d="M55 20 C66 20 80 24 81 33 C82 37 80 41 80 45"
            stroke="#F59E0B"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          <polygon
            points="77,44 83,44 84,52 76,52"
            fill="#FBBF24"
            stroke="#D97706"
            strokeWidth="0.8"
          />
        </g>
      </svg>
    </div>
  );
};
