import React from 'react';

interface SpeechBubbleProps {
  lines: string[];
}

export const SpeechBubble: React.FC<SpeechBubbleProps> = ({ lines }) => {
  return (
    <div className="relative inline-block select-none">
      {/* Bubble Container */}
      <div className="relative bg-[#EDF5FE] border-[1.5px] border-[#D3E5FA] rounded-3xl px-5 py-4 sm:px-6 sm:py-5 shadow-xs">
        {/* Tail pointing toward the mascot (at bottom-left of the bubble) */}
        <div className="absolute -left-[12px] bottom-5 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[13px] border-r-[#EDF5FE] z-10" />
        <div className="absolute -left-[14px] bottom-5 w-0 h-0 border-t-[9px] border-t-transparent border-b-[9px] border-b-transparent border-r-[15px] border-r-[#D3E5FA] z-0" />

        {/* Bubble Text */}
        <div className="flex flex-col items-center justify-center text-center">
          {lines.map((line, index) => (
            <span
              key={index}
              className="text-[#0E2A54] font-bold text-xl sm:text-2xl leading-tight tracking-tight whitespace-nowrap"
            >
              {line}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
