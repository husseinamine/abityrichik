import React from 'react';
import { ArrowRight } from 'lucide-react';

interface BottomNavProps {
  backLabel?: string;
  nextLabel?: string;
  onBack: () => void;
  onNext: () => void;
  canGoBack: boolean;
  isLastStep: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  backLabel = 'Назад',
  nextLabel = 'Далее',
  onBack,
  onNext,
  canGoBack,
}) => {
  return (
    <div className="w-full px-6 pb-6 pt-2 flex items-center gap-3">
      {/* Secondary 'Назад' Button */}
      <button
        type="button"
        onClick={onBack}
        disabled={!canGoBack}
        className={`flex-1 h-14 rounded-2xl font-bold text-lg transition-all duration-150 flex items-center justify-center select-none ${
          canGoBack
            ? 'bg-white border-2 border-[#D2E2F5] text-[#2F4E75] hover:bg-slate-50 hover:border-[#BFD8F5] active:scale-[0.98] cursor-pointer'
            : 'bg-white/70 border-2 border-slate-200/80 text-slate-300 cursor-not-allowed'
        }`}
      >
        {backLabel}
      </button>

      {/* Primary 'Далее' Button */}
      <button
        type="button"
        onClick={onNext}
        className="flex-1 h-14 rounded-2xl bg-[#1677FF] hover:bg-[#106AE6] active:bg-[#0D5BC8] text-white font-bold text-lg shadow-[0_4px_14px_rgba(22,119,255,0.3)] transition-all duration-150 flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer select-none"
      >
        <span>{nextLabel}</span>
        <ArrowRight className="w-5 h-5 stroke-[3]" />
      </button>
    </div>
  );
};
