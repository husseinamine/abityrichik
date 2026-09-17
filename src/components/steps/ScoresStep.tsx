import React, { useState, useRef, useEffect } from 'react';
import { Mascot } from '../Mascot';
import { SpeechBubble } from '../SpeechBubble';
import { DuolingoButton } from '../DuolingoButton';
import { EGE_SUBJECTS } from '../../data/programs';
import type { SubjectId } from '../../types/onboarding';
import { ArrowRight, Keyboard, Sparkles } from 'lucide-react';

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

  // Local string state to allow natural typing/deleting with keyboard
  const [rawValues, setRawValues] = useState<Partial<Record<SubjectId, string>>>(() => {
    const initial: Partial<Record<SubjectId, string>> = {};
    for (const subId of selectedSubjects) {
      initial[subId] = scores[subId] !== undefined ? String(scores[subId]) : '80';
    }
    return initial;
  });

  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  // Auto-focus first input on mount
  useEffect(() => {
    if (selectedSubjects.length > 0) {
      const firstId = selectedSubjects[0];
      const timer = setTimeout(() => {
        const el = inputRefs.current[firstId];
        if (el) {
          el.focus();
          el.select();
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [selectedSubjects]);

  const handleInputChange = (subId: SubjectId, valStr: string) => {
    // Only allow digits
    const cleaned = valStr.replace(/\D/g, '');
    if (cleaned === '') {
      setRawValues((prev) => ({ ...prev, [subId]: '' }));
      onChangeScore(subId, 0);
      return;
    }
    const num = Math.min(100, Math.max(0, parseInt(cleaned, 10)));
    setRawValues((prev) => ({ ...prev, [subId]: String(num) }));
    onChangeScore(subId, num);
  };

  const handleBlur = (subId: SubjectId) => {
    const raw = rawValues[subId];
    if (raw === undefined || raw === '') {
      setRawValues((prev) => ({ ...prev, [subId]: '0' }));
      onChangeScore(subId, 0);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (index < selectedSubjects.length - 1) {
        const nextId = selectedSubjects[index + 1];
        const nextEl = inputRefs.current[nextId];
        if (nextEl) {
          nextEl.focus();
          nextEl.select();
        }
      } else {
        onNext();
      }
    }
  };

  const totalScore = selectedSubjects.reduce((sum, id) => sum + (scores[id] ?? 0), 0);
  const maxPossible = selectedSubjects.length * 100;

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

        {/* Keyboard instruction pill */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-xs font-bold text-[#1E40AF] mb-1.5">
            <Keyboard className="w-3.5 h-3.5 text-[#1677FF]" />
            <span>Ввод только с клавиатуры (от 0 до 100)</span>
          </div>
          <p className="text-[11px] text-slate-400 font-semibold">
            Нажимай Enter или Tab для перехода между предметами
          </p>
        </div>

        {/* Total score preview */}
        <div className="max-w-md mx-auto mb-4 bg-gradient-to-r from-[#EFF6FF] via-[#F8FAFC] to-[#EFF6FF] border-2 border-[#BFDBFE] rounded-2xl p-3 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#1677FF]" />
            <span className="text-xs font-bold text-[#0E2E59]">Сумма твоих баллов:</span>
          </div>
          <span className="text-base font-black text-[#1677FF]">
            {totalScore} <span className="text-xs text-slate-400 font-bold">/ {maxPossible}</span>
          </span>
        </div>

        {/* Score Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 max-w-5xl mx-auto">
          {selectedSubjects.map((subId, index) => {
            const rawVal = rawValues[subId] ?? String(scores[subId] ?? 80);
            const numVal = scores[subId] ?? 0;
            const name = subjectNameMap.get(subId) || subId;

            return (
              <div
                key={subId}
                className="bg-white border-2 border-[#D3E2F4] border-b-[4px] border-b-[#BACEE5] focus-within:border-[#1677FF] focus-within:border-b-[#0A4EA8] rounded-2xl p-4 flex items-center justify-between transition-all group"
              >
                <div className="flex flex-col min-w-0 flex-1 pr-3">
                  <span className="font-bold text-sm sm:text-base text-[#0E2E59] truncate">
                    {name}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400">
                    Балл ЕГЭ (0–100)
                  </span>
                  {numVal >= 80 ? (
                    <span className="text-[10px] font-bold text-emerald-600 mt-0.5">
                      ★ Высокий балл
                    </span>
                  ) : numVal >= 60 ? (
                    <span className="text-[10px] font-bold text-blue-600 mt-0.5">
                      ✓ Хороший балл
                    </span>
                  ) : (
                    <span className="text-[10px] font-medium text-slate-400 mt-0.5">
                      Минимум: 40–60 б.
                    </span>
                  )}
                </div>

                {/* Pure Keyboard Input */}
                <div className="flex items-center gap-1.5 bg-[#F1F6FD] border-2 border-[#CADDF4] focus-within:border-[#1677FF] focus-within:ring-4 focus-within:ring-[#1677FF]/15 rounded-2xl px-3 py-2 transition-all shrink-0">
                  <input
                    ref={(el) => {
                      inputRefs.current[subId] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={3}
                    value={rawVal}
                    onChange={(e) => handleInputChange(subId, e.target.value)}
                    onFocus={(e) => e.target.select()}
                    onBlur={() => handleBlur(subId)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    placeholder="0"
                    className="w-12 text-right font-black text-2xl text-[#0E2E59] bg-transparent focus:outline-none tracking-tight"
                    aria-label={`Балл по предмету ${name}`}
                  />
                  <span className="text-xs font-black text-slate-400 select-none">
                    / 100
                  </span>
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
