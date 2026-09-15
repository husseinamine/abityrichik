import React from 'react';

interface DuolingoButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const DuolingoButton: React.FC<DuolingoButtonProps> = ({
  variant = 'primary',
  children,
  icon,
  className = '',
  disabled,
  ...props
}) => {
  if (variant === 'secondary') {
    return (
      <button
        disabled={disabled}
        className={`h-14 px-6 rounded-2xl font-bold text-base sm:text-lg select-none transition-all duration-75 flex items-center justify-center gap-2 cursor-pointer ${
          disabled
            ? 'bg-slate-100 text-slate-300 border-2 border-slate-200 border-b-4 border-b-slate-300 cursor-not-allowed'
            : 'bg-white text-[#204068] border-2 border-[#C9DCF2] border-b-[4px] border-b-[#A8C6EB] hover:bg-[#F8FAFC] active:border-b-2 active:translate-y-[2px]'
        } ${className}`}
        {...props}
      >
        <span>{children}</span>
        {icon}
      </button>
    );
  }

  if (variant === 'ghost') {
    return (
      <button
        disabled={disabled}
        className={`h-12 px-4 rounded-xl font-semibold text-slate-500 hover:text-slate-900 transition-colors select-none flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${className}`}
        {...props}
      >
        {icon}
        <span>{children}</span>
      </button>
    );
  }

  // Primary variant (Duolingo 3D elevated)
  return (
    <button
      disabled={disabled}
      className={`h-14 px-6 rounded-2xl font-bold text-base sm:text-lg text-white select-none transition-all duration-75 flex items-center justify-center gap-2 cursor-pointer ${
        disabled
          ? 'bg-[#A0C4F7] text-white/80 border-b-[4px] border-[#7CAEF3] cursor-not-allowed'
          : 'bg-[#1677FF] hover:bg-[#1069E6] border-b-[4px] border-[#0A4EA8] active:border-b-[1px] active:translate-y-[3px]'
      } ${className}`}
      {...props}
    >
      <span>{children}</span>
      {icon}
    </button>
  );
};
