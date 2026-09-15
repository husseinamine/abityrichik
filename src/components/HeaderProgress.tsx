import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface HeaderProgressProps {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  canGoBack: boolean;
}

export const HeaderProgress: React.FC<HeaderProgressProps> = ({
  currentStep,
  totalSteps,
  onBack,
  canGoBack,
}) => {
  const progressPercent = Math.min(100, Math.max(0, (currentStep / totalSteps) * 100));

  return (
    <div className="w-full flex items-center justify-between gap-4 px-6 pt-5 pb-3">
      {/* Back Arrow Button */}
      <button
        type="button"
        onClick={onBack}
        disabled={!canGoBack}
        className={`p-2 -ml-2 rounded-xl transition-colors flex items-center justify-center ${
          canGoBack
            ? 'text-[#364A63] hover:text-[#0F2851] hover:bg-slate-100 active:scale-95 cursor-pointer'
            : 'text-slate-200 cursor-not-allowed opacity-30'
        }`}
        aria-label="Назад"
      >
        <ArrowLeft className="w-6 h-6 stroke-[2.5]" />
      </button>

      {/* Enlarged Progress Pill Bar */}
      <div className="flex-1 h-4.5 sm:h-5 bg-[#E2EEFC] border border-[#CADDF4] rounded-full overflow-hidden p-[2px]">
        <div
          className="h-full bg-[#1677FF] rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Step Counter */}
      <div className="text-[#2B4365] font-bold text-base tabular-nums select-none min-w-[44px] text-right">
        {currentStep} / {totalSteps}
      </div>
    </div>
  );
};
