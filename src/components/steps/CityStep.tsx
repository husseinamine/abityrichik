import React from 'react';
import { Mascot } from '../Mascot';
import { SpeechBubble } from '../SpeechBubble';
import { DuolingoButton } from '../DuolingoButton';
import { CITIES_LIST } from '../../data/programs';
import { ArrowRight, MapPin, Check, Globe } from 'lucide-react';

interface CityStepProps {
  userName: string;
  selectedCity: string;
  onSelectCity: (city: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export const CityStep: React.FC<CityStepProps> = ({
  userName,
  selectedCity,
  onSelectCity,
  onNext,
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
            <SpeechBubble lines={[`${displayName}, где`, 'хочешь учиться?']} />
          </div>
        </div>

        {/* Instructions */}
        <div className="text-center mb-4">
          <p className="text-xs font-bold uppercase tracking-wider text-[#355278]">
            Выбери предпочтительный город для поступления
          </p>
          <p className="text-xs text-slate-400 mt-0.5">
            Мы сразу отфильтруем программы под твой выбор
          </p>
        </div>

        {/* Cities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-w-4xl mx-auto">
          {CITIES_LIST.map((city) => {
            const isSelected = selectedCity === city;
            const isAll = city === 'Все города';

            return (
              <button
                key={city}
                type="button"
                onClick={() => onSelectCity(city)}
                className={`p-4 rounded-2xl flex items-center justify-between text-left transition-all duration-75 select-none cursor-pointer ${
                  isSelected
                    ? 'bg-[#F0F7FF] border-2 border-[#1677FF] border-b-[4px] border-b-[#0A4EA8] active:translate-y-[2px] active:border-b-2'
                    : 'bg-white border-2 border-[#D3E2F4] border-b-[4px] border-b-[#BACEE5] hover:bg-[#F9FAFB] active:translate-y-[2px] active:border-b-2'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'bg-[#1677FF] text-white'
                        : 'bg-[#EFF6FF] text-[#1677FF] border border-[#CADDF4]'
                    }`}
                  >
                    {isAll ? <Globe className="w-5 h-5" /> : <MapPin className="w-5 h-5" />}
                  </div>

                  <span
                    className={`font-bold text-base ${
                      isSelected ? 'text-[#0E2E59]' : 'text-[#2B4365]'
                    }`}
                  >
                    {city}
                  </span>
                </div>

                {/* Checkbox indicator */}
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
          className="flex-1"
          icon={<ArrowRight className="w-5 h-5 stroke-[3]" />}
        >
          Далее
        </DuolingoButton>
      </div>
    </div>
  );
};
