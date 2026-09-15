import React from 'react';
import { Mascot } from '../Mascot';
import { SpeechBubble } from '../SpeechBubble';
import { DuolingoButton } from '../DuolingoButton';
import { EGE_SUBJECTS } from '../../data/programs';
import type { SubjectId } from '../../types/onboarding';
import { ArrowRight, Minus, Plus } from 'lucide-react';

interface ScoresStepProps {
  userName: string;
  selectedSubjects: SubjectId[];
  scores: Partial<Record<SubjectId, number>>;
  onChangeScore: (id: SubjectId, score: number) => void;
  onNext: () => void;
  onBack: () => void;
}

export const ScoresStep: React.FC<ScoresStepProps> = ({
  userName,
  selectedSubjects,
  scores,
  onChangeScore,
  onNext,
  onBack,
}) => {
  const displayName = userName.trim() || 'Друг';
  const subjectNameMap = new Map(EGE_SUBJECTS.map((s) => [s.id, s.name]));

  const handleStepScore = (id: SubjectId, delta: number) => {
    const current = scores[id] ?? 80;
    const nextVal = Math.min(100, Math.max(0, current + delta));
    onChangeScore(id, nextVal);
  };

  const handleDirectInput = (id: SubjectId, valStr: string) => {
    const parsed = parseInt(valStr, 10);
    if (isNaN(parsed)) {
      onChangeScore(id, 0);
    } else {
      onChangeScore(id, Math.min(100, Math.max(0, parsed)));
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between px-5 pb-6 overflow-hidden">
      {/* Scrollable middle section */}
      <div className="flex-1 overflow-y-auto pt-2 pb-4">
        {/* Mascot Header */}
        <div className="flex items-start justify-center max-w-full mb-6">
          <div className="shrink-0 mt-6">
            <Mascot />
          </div>
          <div className="shrink-0 -ml-2 sm:-ml-3 mt-0 z-10">
            <SpeechBubble lines={[`${displayName}, введи`, 'свои баллы']} />
          </div>
        </div>

        <div className="text-center mb-4">
          <p className="text-xs font-bold uppercase tracking-wider text-[#355278]">
            Баллы от 0 до 100 по выбранным предметам
          </p>
        </div>

        {/* Score Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 max-w-5xl mx-auto">
          {selectedSubjects.map((subId) => {
            const score = scores[subId] ?? 80;
            const name = subjectNameMap.get(subId) || subId;

            return (
              <div
                key={subId}
                className="bg-white border-2 border-[#D3E2F4] border-b-[4px] border-b-[#BACEE5] rounded-2xl p-4 flex items-center justify-between"
              >
                <div className="flex flex-col">
                  <span className="font-bold text-sm sm:text-base text-[#0E2E59]">
                    {name}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400">
                    Балл ЕГЭ (0–100)
                  </span>
                </div>

                {/* Stepper & Input */}
                <div className="flex items-center gap-1.5 bg-[#F1F6FD] border border-[#CADDF4] rounded-xl p-1 shrink-0 ml-2">
                  <button
                    type="button"
                    onClick={() => handleStepScore(subId, -5)}
                    className="w-8 h-8 rounded-lg bg-white border border-[#CADDF4] border-b-2 border-b-[#A8C6EB] flex items-center justify-center text-[#254670] hover:bg-slate-50 active:translate-y-[1px] active:border-b-0 cursor-pointer"
                    aria-label="Уменьшить на 5"
                  >
                    <Minus className="w-4 h-4 stroke-[2.5]" />
                  </button>

                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={score}
                    onChange={(e) => handleDirectInput(subId, e.target.value)}
                    className="w-12 text-center font-extrabold text-lg text-[#0F2851] bg-transparent focus:outline-none"
                  />

                  <button
                    type="button"
                    onClick={() => handleStepScore(subId, 5)}
                    className="w-8 h-8 rounded-lg bg-white border border-[#CADDF4] border-b-2 border-b-[#A8C6EB] flex items-center justify-center text-[#254670] hover:bg-slate-50 active:translate-y-[1px] active:border-b-0 cursor-pointer"
                    aria-label="Увеличить на 5"
                  >
                    <Plus className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dual Bottom Buttons */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-center gap-4 max-w-md mx-auto w-full">
        <DuolingoButton variant="secondary" onClick={onBack} className="flex-1">
          Назад
        </DuolingoButton>
        <DuolingoButton
          onClick={onNext}
          className="flex-1"
          icon={<ArrowRight className="w-5 h-5 stroke-[3]" />}
        >
          Далее
        </DuolingoButton>
      </div>
    </div>
  );
};
