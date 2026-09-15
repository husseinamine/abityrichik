import React from 'react';
import { Mascot } from '../Mascot';
import { SpeechBubble } from '../SpeechBubble';
import { DuolingoButton } from '../DuolingoButton';
import { ArrowRight, Award, Palette, Minus, Plus } from 'lucide-react';

interface AchievementsStepProps {
  userName: string;
  achievements: number;
  creativeExam: { taking: boolean; score: number };
  onChangeAchievements: (val: number) => void;
  onChangeCreativeExam: (val: { taking: boolean; score: number }) => void;
  onSubmit: () => void;
  onBack: () => void;
}

export const AchievementsStep: React.FC<AchievementsStepProps> = ({
  userName,
  achievements,
  creativeExam,
  onChangeAchievements,
  onChangeCreativeExam,
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

        <div className="flex flex-col gap-4 max-w-2xl mx-auto w-full">
          {/* Individual Achievements Card */}
          <div className="bg-white border-2 border-[#D3E2F4] border-b-[4px] border-b-[#BACEE5] rounded-2xl p-4">
            <div className="flex items-center gap-2.5 mb-2 text-[#0E2E59]">
              <div className="w-8 h-8 rounded-xl bg-[#EBF4FE] border border-[#CADDF4] flex items-center justify-center text-[#1677FF]">
                <Award className="w-4.5 h-4.5" />
              </div>
              <span className="font-bold text-base">Индивидуальные достижения (ИД)</span>
            </div>

            <p className="text-xs text-slate-500 mb-3 leading-relaxed">
              Золотая медаль, победы в олимпиадах, ГТО или волонтёрство. Прибавляются к сумме ЕГЭ (максимум — 10 баллов).
            </p>

            <div className="flex items-center justify-between bg-[#F1F6FD] border border-[#CADDF4] rounded-xl p-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#355278] pl-2">
                Баллов за ИД:
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onChangeAchievements(Math.max(0, achievements - 1))}
                  className="w-8 h-8 rounded-lg bg-white border border-[#CADDF4] border-b-2 border-b-[#A8C6EB] flex items-center justify-center text-[#254670] hover:bg-slate-50 active:translate-y-[1px] active:border-b-0 cursor-pointer"
                  aria-label="Уменьшить"
                >
                  <Minus className="w-4 h-4" />
                </button>

                <span className="w-8 text-center font-extrabold text-xl text-[#0E2E59]">
                  {achievements}
                </span>

                <button
                  type="button"
                  onClick={() => onChangeAchievements(Math.min(10, achievements + 1))}
                  className="w-8 h-8 rounded-lg bg-white border border-[#CADDF4] border-b-2 border-b-[#A8C6EB] flex items-center justify-center text-[#254670] hover:bg-slate-50 active:translate-y-[1px] active:border-b-0 cursor-pointer"
                  aria-label="Увеличить"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Creative Exam (ДВИ) Card */}
          <div className="bg-white border-2 border-dashed border-[#CADDF4] rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-[#0E2E59]">
                <div className="w-8 h-8 rounded-xl bg-[#FFF8EB] border border-[#FDE68A] flex items-center justify-center text-[#D97706]">
                  <Palette className="w-4.5 h-4.5" />
                </div>
                <span className="font-bold text-base">Творческое испытание (ДВИ)</span>
              </div>

              <input
                type="checkbox"
                id="creative-toggle"
                checked={creativeExam.taking}
                onChange={(e) =>
                  onChangeCreativeExam({
                    ...creativeExam,
                    taking: e.target.checked,
                  })
                }
                className="w-5 h-5 rounded accent-[#1677FF] cursor-pointer"
              />
            </div>

            <p className="text-xs text-slate-500 mb-3 leading-relaxed">
              Необходимо только для программ Школы дизайна.
            </p>

            {creativeExam.taking && (
              <div className="flex items-center justify-between bg-[#FFFBF0] border border-[#FDE68A] rounded-xl p-2 animate-in fade-in duration-200">
                <span className="text-xs font-bold uppercase tracking-wider text-[#92400E] pl-2">
                  Балл за ДВИ:
                </span>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={creativeExam.score}
                  onChange={(e) =>
                    onChangeCreativeExam({
                      ...creativeExam,
                      score: Math.min(100, Math.max(0, parseInt(e.target.value, 10) || 0)),
                    })
                  }
                  className="w-16 h-8 text-center font-extrabold text-base text-[#92400E] bg-white border border-[#FDE68A] rounded-lg focus:outline-none"
                />
              </div>
            )}
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
