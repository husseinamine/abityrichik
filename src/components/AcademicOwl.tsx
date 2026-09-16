import React from "react";

export type OwlVariant = "explaining" | "happy" | "reading" | "pointing" | "compact";
export type OwlSize = "xs" | "sm" | "md" | "lg" | "xl";

interface AcademicOwlProps {
  variant?: OwlVariant;
  size?: OwlSize;
  className?: string;
}

const SIZE_MAP: Record<OwlSize, string> = {
  xs: "w-8 h-8",
  sm: "w-12 h-12",
  md: "w-20 h-20 sm:w-24 sm:h-24",
  lg: "w-28 h-28 sm:w-36 sm:h-36",
  xl: "w-40 h-40 sm:w-48 sm:h-48",
};

export const AcademicOwl: React.FC<AcademicOwlProps> = ({
  variant = "explaining",
  size = "md",
  className = "",
}) => {
  const sizeClass = SIZE_MAP[size] || SIZE_MAP.md;

  return (
    <div className={`relative inline-flex items-center justify-center select-none shrink-0 ${sizeClass} ${className}`}>
      <svg
        viewBox="0 0 160 170"
        className="w-full h-full overflow-visible drop-shadow-sm"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Soft shadow */}
        <ellipse cx="80" cy="162" rx="42" ry="6" fill="#CBD5E1" opacity="0.6" />

        {/* Feet / Talons */}
        <path d="M62 154 C62 159 56 162 52 161" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
        <path d="M68 154 C68 160 64 163 60 162" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
        <path d="M92 154 C92 160 96 163 100 162" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
        <path d="M98 154 C98 159 104 162 108 161" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />

        {/* Owl Body & Head */}
        <path
          d="M80 34 C44 34 38 72 38 114 C38 144 54 156 80 156 C106 156 122 144 122 114 C122 72 116 34 80 34 Z"
          fill="#1D4ED8"
        />

        {/* Soft Left/Right Ear Tufts behind cap */}
        <path d="M48 42 L36 24 L56 34 Z" fill="#1E40AF" />
        <path d="M112 42 L124 24 L104 34 Z" fill="#1E40AF" />

        {/* Belly Plaque */}
        <path
          d="M80 82 C60 82 50 96 50 120 C50 142 62 150 80 150 C98 150 110 142 110 120 C110 96 100 82 80 82 Z"
          fill="#EFF6FF"
        />

        {/* Scalloped Belly Feathers */}
        <path d="M72 104 Q80 110 88 104" stroke="#93C5FD" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M66 118 Q74 124 82 118" stroke="#93C5FD" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M78 118 Q86 124 94 118" stroke="#93C5FD" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M72 132 Q80 138 88 132" stroke="#93C5FD" strokeWidth="2.5" strokeLinecap="round" fill="none" />

        {/* Eye Cream Backgrounds */}
        <circle cx="63" cy="67" r="19" fill="#FFFFFF" />
        <circle cx="97" cy="67" r="19" fill="#FFFFFF" />
        <circle cx="63" cy="67" r="18" fill="#FEF3C7" />
        <circle cx="97" cy="67" r="18" fill="#FEF3C7" />

        {/* Eye Irises */}
        <circle cx="63" cy="67" r="13" fill="#1E293B" />
        <circle cx="97" cy="67" r="13" fill="#1E293B" />

        {/* Eye Highlights */}
        <circle cx="60" cy="63" r="4.5" fill="#FFFFFF" />
        <circle cx="94" cy="63" r="4.5" fill="#FFFFFF" />
        <circle cx="66" cy="71" r="2" fill="#FFFFFF" />
        <circle cx="100" cy="71" r="2" fill="#FFFFFF" />

        {/* Cute Beak */}
        <path
          d="M80 67 L85 78 Q80 82 75 78 Z"
          fill="#F59E0B"
          stroke="#D97706"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* Left Wing (Resting or holding scroll) */}
        {variant === "reading" ? (
          <path
            d="M40 94 C32 104 36 126 50 128 C52 118 52 108 46 96 Z"
            fill="#1E40AF"
          />
        ) : (
          <path
            d="M42 88 C30 102 32 128 46 138 C48 126 48 106 46 92 Z"
            fill="#1E40AF"
          />
        )}

        {/* Right Wing according to variant */}
        {variant === "explaining" || variant === "pointing" ? (
          /* Wing Pointing / Gesturing up and to the right */
          <g>
            <path
              d="M116 92 C126 84 146 72 152 64 C148 78 136 100 118 116 Z"
              fill="#2563EB"
              stroke="#1D4ED8"
              strokeWidth="2"
            />
            {/* Motion sparkles near gesture */}
            <circle cx="148" cy="56" r="2.5" fill="#F59E0B" />
            <path d="M142 48 L144 54 L150 56 L144 58 L142 64 L140 58 L134 56 L140 54 Z" fill="#F59E0B" />
          </g>
        ) : variant === "happy" ? (
          /* Both wings raised happily */
          <path
            d="M118 90 C132 80 144 92 136 114 C128 118 122 110 118 96 Z"
            fill="#1E40AF"
          />
        ) : (
          /* Resting right wing */
          <path
            d="M118 88 C130 102 128 128 114 138 C112 126 112 106 114 92 Z"
            fill="#1E40AF"
          />
        )}

        {/* Diploma / Book if reading */}
        {variant === "reading" && (
          <g transform="translate(46, 114) rotate(-12)">
            <rect x="0" y="0" width="32" height="14" rx="3" fill="#FFFBEB" stroke="#D97706" strokeWidth="1.5" />
            <rect x="13" y="0" width="5" height="14" fill="#DC2626" />
            <line x1="4" y1="5" x2="11" y2="5" stroke="#D97706" strokeWidth="1" />
            <line x1="4" y1="9" x2="11" y2="9" stroke="#D97706" strokeWidth="1" />
            <line x1="20" y1="5" x2="28" y2="5" stroke="#D97706" strokeWidth="1" />
            <line x1="20" y1="9" x2="28" y2="9" stroke="#D97706" strokeWidth="1" />
          </g>
        )}

        {/* ======================================= */}
        {/* ACADEMIC CAP (Конфедератка / Mortarboard) */}
        {/* ======================================= */}
        <g>
          {/* Cap Skull Base */}
          <path
            d="M62 38 C62 38 64 48 80 48 C96 48 98 38 98 38 Z"
            fill="#0F172A"
          />
          {/* Main Diamond Top Board */}
          <polygon
            points="80,12 138,28 80,44 22,28"
            fill="#0F172A"
            stroke="#1E293B"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* Soft highlight on cap edge */}
          <line x1="24" y1="28" x2="80" y2="43" stroke="#334155" strokeWidth="1.5" />
          <line x1="80" y1="43" x2="136" y2="28" stroke="#334155" strokeWidth="1.5" />

          {/* Central Golden Button */}
          <circle cx="80" cy="28" r="4" fill="#F59E0B" stroke="#D97706" strokeWidth="1" />

          {/* Golden Tassel hanging down to the right */}
          <path
            d="M80 28 C95 28 114 34 116 46 C117 52 115 58 115 64"
            stroke="#F59E0B"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Tassel Fringe / Brush */}
          <polygon
            points="111,62 119,62 121,74 109,74"
            fill="#FBBF24"
            stroke="#D97706"
            strokeWidth="1"
          />
          <line x1="113" y1="74" x2="113" y2="77" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="115" y1="74" x2="115" y2="78" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="117" y1="74" x2="117" y2="77" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
};
