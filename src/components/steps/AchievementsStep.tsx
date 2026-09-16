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
    <div className="flex-1 flex flex-col justify-between px-5 pb-6 overflow-hidden">
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto pt-2 pb-4">
        {/* Mascot Header */}
        <div className="flex items-start justify-center max-w-full mb-6">
          <div className="shrink-0 mt-6">
            <Mascot />
          </div>
          <div className="shrink-0 -ml-2 sm:-ml-3 mt-0 z-10">
            <SpeechBubble lines={[`${displayName}, есть`, 'достижения?']} />
          </div>
        </div>

        <div className="flex flex-col gap-4 max-w-xl mx-auto w-full">
          {/* Individual Achievements Card */}
          <div className="bg-white border-2 border-[#D3E2F4] border-b-[4px] border-b-[#BACEE5] rounded-2xl p-5">
            <div className="flex items-center gap-2.5 mb-2 text-[#0E2E59]">
              <div className="w-9 h-9 rounded-xl bg-[#EBF4FE] border border-[#CADDF4] flex items-center justify-center text-[#1677FF] shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <span className="font-bold text-base sm:text-lg">Индивидуальные достижения (ИД)</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-500 mb-4 leading-relaxed">
              Аттестат с отличием / золотая медаль, победы в перечневых олимпиадах, значок ГТО или волонтёрство. Прибавляются к твоей сумме ЕГЭ (максимум — 10 баллов суммарно во всех вузах).
            </p>

            <div className="flex items-center justify-between bg-[#F1F6FD] border border-[#CADDF4] rounded-xl p-2.5">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#355278] pl-2">
                Баллов за достижения:
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onChangeAchievements(Math.max(0, achievements - 1))}
                  className="w-9 h-9 rounded-lg bg-white border border-[#CADDF4] border-b-2 border-b-[#A8C6EB] flex items-center justify-center text-[#254670] hover:bg-slate-50 active:translate-y-[1px] active:border-b-0 cursor-pointer"
                  aria-label="Уменьшить"
                >
                  <Minus className="w-4 h-4 stroke-[2.5]" />
                </button>

                <span className="w-8 text-center font-black text-xl text-[#0E2E59]">
                  {achievements}
                </span>

                <button
                  type="button"
                  onClick={() => onChangeAchievements(Math.min(10, achievements + 1))}
                  className="w-9 h-9 rounded-lg bg-white border border-[#CADDF4] border-b-2 border-b-[#A8C6EB] flex items-center justify-center text-[#254670] hover:bg-slate-50 active:translate-y-[1px] active:border-b-0 cursor-pointer"
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
