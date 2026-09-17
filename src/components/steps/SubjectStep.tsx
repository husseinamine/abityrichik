import React from 'react';
import { Mascot } from '../Mascot';
import { SpeechBubble } from '../SpeechBubble';
import { DuolingoButton } from '../DuolingoButton';
import { EGE_SUBJECTS } from '../../data/programs';
import type { SubjectId } from '../../types/onboarding';
import { ArrowRight, Check } from 'lucide-react';

interface SubjectStepProps {
  userName: string;
  selectedSubjects: SubjectId[];
  onToggleSubject: (id: SubjectId) => void;
  onNext: () => void;
  onBack: () => void;
}

export const SubjectStep: React.FC<SubjectStepProps> = ({
  userName,
  selectedSubjects,
  onToggleSubject,
  onNext,
  onBack,
}) => {
  const displayName = userName.trim() || 'Друг';
  const canProceed = selectedSubjects.length >= 2;

  return (
    <div className="flex-1 flex flex-col justify-between px-4 sm:px-5 pb-4 sm:pb-6 overflow-hidden">
      {/* Scrollable upper area */}
      <div className="flex-1 overflow-y-auto pt-1 sm:pt-2 pb-3 sm:pb-4">
        {/* Mascot Header */}
        <div className="flex items-start justify-center max-w-full mb-2 sm:mb-6 shrink-0">
          <div className="shrink-0 mt-2 sm:mt-6 scale-90 sm:scale-100">
            <Mascot />
          </div>
          <div className="shrink-0 -ml-2 sm:-ml-3 mt-0 z-10">
            <SpeechBubble lines={[`${displayName}, какие`, 'предметы сдаёшь?']} />
          </div>
        </div>

        {/* Instructions */}
        <div className="text-center mb-2.5 sm:mb-4">
          <p className="text-xs font-bold uppercase tracking-wider text-[#355278]">
            Выбери минимум 2–3 предмета ЕГЭ
          </p>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 max-w-5xl mx-auto">
          {EGE_SUBJECTS.map((subject) => {
            const isSelected = selectedSubjects.includes(subject.id);

            return (
              <button
                key={subject.id}
                type="button"
                onClick={() => onToggleSubject(subject.id)}
                className={`w-full p-3 sm:p-4 rounded-xl sm:rounded-2xl flex items-center justify-between text-left transition-all duration-75 select-none cursor-pointer ${
                  isSelected
                    ? 'bg-[#F0F7FF] border-2 border-[#1677FF] border-b-[4px] border-b-[#0A4EA8] active:translate-y-[2px] active:border-b-2'
                    : 'bg-white border-2 border-[#D3E2F4] border-b-[4px] border-b-[#BACEE5] hover:bg-[#F9FAFB] active:translate-y-[2px] active:border-b-2'
                }`}
              >
                <span
                  className={`font-bold text-sm sm:text-base leading-snug ${
                    isSelected ? 'text-[#0E2E59]' : 'text-[#2B4365]'
                  }`}
                >
                  {subject.name}
                </span>

                {/* Checkbox badge */}
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors shrink-0 ml-2 ${
                    isSelected
                      ? 'bg-[#1677FF] text-white'
                      : 'border-2 border-[#CADDF4] bg-white'
                  }`}
                >
                  {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                </div>
              </button>
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
          disabled={!canProceed}
          className="flex-1"
          icon={<ArrowRight className="w-5 h-5 stroke-[3]" />}
        >
          Далее
        </DuolingoButton>
      </div>
    </div>
  );
};
