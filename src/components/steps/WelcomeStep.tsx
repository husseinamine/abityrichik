import React from 'react';
import { Mascot } from '../Mascot';
import { SpeechBubble } from '../SpeechBubble';
import { DuolingoButton } from '../DuolingoButton';
import { ArrowRight } from 'lucide-react';

interface WelcomeStepProps {
  onNext: () => void;
}

export const WelcomeStep: React.FC<WelcomeStepProps> = ({ onNext }) => {
  return (
    <div className="flex-1 flex flex-col justify-between px-6 pb-6 select-none">
      {/* Center Mascot & Bubble Scene */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="flex items-start justify-center max-w-full mb-6">
          <div className="shrink-0 mt-8 sm:mt-10">
            <Mascot />
          </div>
          <div className="shrink-0 -ml-2 sm:-ml-3 mt-0 z-10">
            <SpeechBubble lines={['Привет!', 'я СОВА.']} />
          </div>
        </div>

        <div className="max-w-xs text-center">
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#0E2A54] mb-2">
            Подбор программ в вузах России
          </h2>
          <p className="text-slate-500 text-sm leading-relaxed">
            Пройди быстрый тест по своим баллам ЕГЭ и узнай, куда ты проходишь на бюджет и коммерцию в ведущих университетах страны.
          </p>
        </div>
      </div>

      {/* Primary Duolingo Button */}
      <div className="max-w-md mx-auto w-full">
        <DuolingoButton
          onClick={onNext}
          className="w-full"
          icon={<ArrowRight className="w-5 h-5 stroke-[3]" />}
        >
          Познакомиться
        </DuolingoButton>
      </div>
    </div>
  );
};
