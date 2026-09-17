import React, { useState } from 'react';
import { Mascot } from '../Mascot';
import { SpeechBubble } from '../SpeechBubble';
import { DuolingoButton } from '../DuolingoButton';
import { CheckCircle2, Compass, ArrowRight } from 'lucide-react';

interface KnowsScoresStepProps {
  userName: string;
  onSelectKnowsScores: (knows: boolean) => void;
  onBack: () => void;
}

export const KnowsScoresStep: React.FC<KnowsScoresStepProps> = ({
  userName,
  onSelectKnowsScores,
  onBack,
}) => {
  const [selectedChoice, setSelectedChoice] = useState<boolean | null>(null);
  const displayName = userName.trim() || 'Друг';

  const handleContinue = () => {
    if (selectedChoice !== null) {
      onSelectKnowsScores(selectedChoice);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between px-5 pb-6 overflow-hidden">
      {/* Scrollable upper area */}
      <div className="flex-1 overflow-y-auto pt-1 sm:pt-2 pb-3 flex flex-col items-center justify-center min-h-0">
        {/* Mascot & Speech Bubble */}
        <div className="flex items-start justify-center max-w-full mb-2 sm:mb-5 shrink-0">
          <div className="shrink-0 mt-2 sm:mt-5 scale-90 sm:scale-100">
            <Mascot />
          </div>
          <div className="shrink-0 -ml-2 sm:-ml-3 mt-0 z-10">
            <SpeechBubble lines={[`${displayName}, ты знаешь`, 'свои баллы ЕГЭ?']} />
          </div>
        </div>

        <div className="text-center mb-3 sm:mb-5 max-w-md shrink-0">
          <h2 className="text-lg sm:text-2xl font-black text-[#0E2E59] mb-1 leading-tight">
            У тебя уже есть баллы ЕГЭ?
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Если результаты ещё не пришли, ты можешь сразу перейти к каталогу вузов и посмотреть требования к поступлению.
          </p>
        </div>

        {/* 2 Option Cards */}
        <div className="flex flex-col gap-2.5 sm:gap-3.5 w-full max-w-md mx-auto">
          {/* Option 1: Yes, I know my scores */}
          <button
            type="button"
            onClick={() => setSelectedChoice(true)}
            className={`w-full text-left p-3.5 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3 sm:gap-3.5 ${
              selectedChoice === true
                ? 'bg-[#EFF6FF] border-[#1677FF] border-b-[5px] border-b-[#0A4EA8] scale-[1.01]'
                : 'bg-white border-[#D3E2F4] border-b-[4px] border-b-[#BACEE5] hover:border-[#1677FF] hover:bg-[#F8FAFC]'
            }`}
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-colors ${
                selectedChoice === true
                  ? 'bg-[#1677FF] text-white border-[#0A4EA8]'
                  : 'bg-[#EBF4FE] text-[#1677FF] border-[#CADDF4]'
              }`}
            >
              <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
            </div>

            <div className="flex-1">
              <span className="font-extrabold text-base text-[#0E2E59] block mb-0.5">
                Да, знаю свои баллы
              </span>
              <p className="text-xs text-slate-500 leading-snug">
                Выберу предметы и введу баллы для точного расчёта шансов на бюджет и платное.
              </p>
            </div>
          </button>

          {/* Option 2: No, I don't know yet */}
          <button
            type="button"
            onClick={() => setSelectedChoice(false)}
            className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3.5 ${
              selectedChoice === false
                ? 'bg-[#F0FDF4] border-[#16A34A] border-b-[5px] border-b-[#15803D] scale-[1.01]'
                : 'bg-white border-[#D3E2F4] border-b-[4px] border-b-[#BACEE5] hover:border-[#16A34A] hover:bg-[#F8FAFC]'
            }`}
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-colors ${
                selectedChoice === false
                  ? 'bg-[#16A34A] text-white border-[#15803D]'
                  : 'bg-[#DCFCE7] text-[#16A34A] border-[#BBF7D0]'
              }`}
            >
              <Compass className="w-5 h-5 stroke-[2.5]" />
            </div>

            <div className="flex-1">
              <span className="font-extrabold text-base text-[#0E2E59] block mb-0.5">
                Нет, ещё не знаю
              </span>
              <p className="text-xs text-slate-500 leading-snug">
                Сразу перейти к программам вузов, посмотреть минимальные баллы и правила приёма.
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* Dual Bottom Buttons */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-center gap-4 max-w-md mx-auto w-full">
        <DuolingoButton variant="secondary" onClick={onBack} className="flex-1">
          Назад
        </DuolingoButton>
        <DuolingoButton
          onClick={handleContinue}
          disabled={selectedChoice === null}
          className="flex-1"
          icon={<ArrowRight className="w-5 h-5 stroke-[3]" />}
        >
          Далее
        </DuolingoButton>
      </div>
    </div>
  );
};
