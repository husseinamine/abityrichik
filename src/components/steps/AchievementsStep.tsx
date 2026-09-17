import React from 'react';
import { Mascot } from '../Mascot';
import { SpeechBubble } from '../SpeechBubble';
import { DuolingoButton } from '../DuolingoButton';
import { ArrowRight, Award, Minus, Plus } from 'lucide-react';

interface AchievementsStepProps {
  userName: string;
  achievements: number;
  onChangeAchievements: (val: number) => void;
  onSubmit: () => void;
  onBack: () => void;
}

export const AchievementsStep: React.FC<AchievementsStepProps> = ({
  userName,
  achievements,
  onChangeAchievements,
  onSubmit,
  onBack,
}) => {
  const displayName = userName.trim() || 'Друг';

  return (
    <div className="flex-1 flex flex-col justify-between px-4 sm:px-5 pb-4 sm:pb-6 overflow-hidden">
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto pt-1 sm:pt-2 pb-3 sm:pb-4">
        {/* Mascot Header */}
        <div className="flex items-start justify-center max-w-full mb-2 sm:mb-6 shrink-0">
          <div className="shrink-0 mt-2 sm:mt-6 scale-90 sm:scale-100">
            <Mascot />
          </div>
          <div className="shrink-0 -ml-2 sm:-ml-3 mt-0 z-10">
            <SpeechBubble lines={[`${displayName}, есть`, 'достижения?']} />
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:gap-4 max-w-xl mx-auto w-full">
          {/* Individual Achievements Card */}
          <div className="bg-white border-2 border-[#D3E2F4] border-b-[4px] border-b-[#BACEE5] rounded-xl sm:rounded-2xl p-4 sm:p-5">
            <div className="flex items-center gap-2.5 mb-2 text-[#0E2E59]">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#EBF4FE] border border-[#CADDF4] flex items-center justify-center text-[#1677FF] shrink-0">
                <Award className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <span className="font-bold text-sm sm:text-lg">Индивидуальные достижения (ИД)</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-500 mb-3 sm:mb-4 leading-relaxed">
              Аттестат с отличием, медаль, олимпиады, значок ГТО или волонтёрство. Прибавляются к сумме ЕГЭ (максимум — 10 баллов суммарно).
            </p>

            <div className="flex items-center justify-between bg-[#F1F6FD] border border-[#CADDF4] rounded-xl p-2 sm:p-2.5">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#355278] pl-1 sm:pl-2">
                Баллов за достижения:
              </span>

              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  type="button"
                  onClick={() => onChangeAchievements(Math.max(0, achievements - 1))}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white border border-[#CADDF4] border-b-2 border-b-[#A8C6EB] flex items-center justify-center text-[#254670] hover:bg-slate-50 active:translate-y-[1px] active:border-b-0 cursor-pointer"
                  aria-label="Уменьшить"
                >
                  <Minus className="w-4 h-4 stroke-[2.5]" />
                </button>

                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={2}
                  value={achievements}
                  onChange={(e) => {
                    const cleaned = e.target.value.replace(/\D/g, '');
                    if (cleaned === '') {
                      onChangeAchievements(0);
                    } else {
                      onChangeAchievements(Math.min(10, Math.max(0, parseInt(cleaned, 10))));
                    }
                  }}
                  onFocus={(e) => e.target.select()}
                  className="w-10 text-center font-black text-lg sm:text-xl text-[#0E2E59] bg-white border border-[#CADDF4] rounded-lg h-8 sm:h-9 focus:outline-none focus:border-[#1677FF]"
                  aria-label="Баллы за достижения"
                />

                <button
                  type="button"
                  onClick={() => onChangeAchievements(Math.min(10, achievements + 1))}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white border border-[#CADDF4] border-b-2 border-b-[#A8C6EB] flex items-center justify-center text-[#254670] hover:bg-slate-50 active:translate-y-[1px] active:border-b-0 cursor-pointer"
                  aria-label="Увеличить"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dual Bottom Buttons */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-center gap-4 max-w-md mx-auto w-full">
        <DuolingoButton variant="secondary" onClick={onBack} className="flex-1">
          Назад
        </DuolingoButton>
        <DuolingoButton
          onClick={onSubmit}
          className="flex-1"
          icon={<ArrowRight className="w-5 h-5 stroke-[3]" />}
        >
          Рассчитать программы
        </DuolingoButton>
      </div>
    </div>
  );
};
