import React, { useRef, useEffect } from 'react';
import { Mascot } from '../Mascot';
import { SpeechBubble } from '../SpeechBubble';
import { DuolingoButton } from '../DuolingoButton';
import { ArrowRight, User } from 'lucide-react';

interface NameStepProps {
  name: string;
  onChangeName: (name: string) => void;
  onNext: () => void;
}

export const NameStep: React.FC<NameStepProps> = ({ name, onChangeName, onNext }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const isValid = name.trim().length > 0;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && isValid) {
      onNext();
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between px-6 pb-6">
      {/* Mascot Header */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="flex items-start justify-center max-w-full mb-8">
          <div className="shrink-0 mt-8 sm:mt-10">
            <Mascot />
          </div>
          <div className="shrink-0 -ml-2 sm:-ml-3 mt-0 z-10">
            <SpeechBubble lines={['Как тебя', 'зовут?']} />
          </div>
        </div>

        {/* Input Card with Duolingo clean 3D border feel & zero fuzzy shadow */}
        <div className="w-full max-w-sm">
          <label className="block text-xs font-bold uppercase tracking-wider text-[#355278] mb-2 px-1">
            Твоё имя
          </label>
          <div className="relative flex items-center bg-[#F8FAFC] border-2 border-[#CADDF4] border-b-[4px] border-b-[#A8C6EB] rounded-2xl transition-colors focus-within:border-[#1677FF] focus-within:border-b-[#0A4EA8] focus-within:bg-white">
            <div className="pl-4 text-[#476793]">
              <User className="w-5 h-5" />
            </div>
            <input
              ref={inputRef}
              type="text"
              value={name}
              onChange={(e) => onChangeName(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Например, Александр"
              className="w-full h-14 px-3.5 bg-transparent font-bold text-lg text-[#0F2851] placeholder:text-slate-400 placeholder:font-normal focus:outline-none"
              maxLength={30}
            />
          </div>
          <p className="text-xs text-slate-400 mt-2 px-1 text-center">
            Мы будем обращаться к тебе по имени на каждом шаге
          </p>
        </div>
      </div>

      {/* Action Button */}
      <div className="max-w-md mx-auto w-full">
        <DuolingoButton
          onClick={onNext}
          disabled={!isValid}
          className="w-full"
          icon={<ArrowRight className="w-5 h-5 stroke-[3]" />}
        >
          Продолжить
        </DuolingoButton>
      </div>
    </div>
  );
};
