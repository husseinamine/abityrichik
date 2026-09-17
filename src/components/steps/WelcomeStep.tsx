import React from "react";
import { AcademicOwl } from "../AcademicOwl";
import {
  ArrowRight,
  ArrowDown,
  GraduationCap,
  SlidersHorizontal,
  Target,
  Sparkles,
  Heart,
} from "lucide-react";

interface WelcomeStepProps {
  onNext: () => void;
}

export const WelcomeStep: React.FC<WelcomeStepProps> = ({ onNext }) => {
  return (
    <div className="flex-1 min-h-screen flex flex-col justify-between bg-gradient-to-b from-[#F0F7FF] via-[#F8FAFC] to-white p-3.5 sm:p-6 md:p-8 overflow-y-auto select-none">
      {/* ========================================================================= */}
      {/* 70% HERO SECTION: СОВА МАШЕТ КРЫЛОМ И ПРИВЕТСТВИЕ                        */}
      {/* ========================================================================= */}
      <div className="flex-1 flex flex-col items-center justify-center py-4 sm:py-6 text-center">
        {/* Subtle Top Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[#1677FF] font-black text-xs uppercase tracking-wider mb-3 animate-in fade-in duration-300">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>СОВА — Сайт Образовательного Выбора Абитуриента</span>
        </div>

        {/* Big Greeting Heading above Owl */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0E2E59] max-w-xl mx-auto leading-tight sm:leading-snug mb-3 sm:mb-5 animate-in fade-in duration-300">
          Привет! Я СОВА, давай я помогу тебе с поступлением!
        </h1>

        {/* Mascot standing and waving wing */}
        <div className="relative my-2 sm:my-4 flex flex-col items-center justify-center animate-in zoom-in-95 duration-400">
          <AcademicOwl
            variant="waving"
            size="xl"
            className="w-48 h-48 sm:w-60 sm:h-60 md:w-68 md:h-68 drop-shadow-xl"
          />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ПОЛЕ КАК НА ФОТОГРАФИИ: "ОДНА ЦЕЛЬ — ТВОЙ ОСОЗНАННЫЙ ВЫБОР"              */}
      {/* Все поля некликабельные, кроме нижнего                                    */}
      {/* ========================================================================= */}
      <div className="w-full max-w-2xl mx-auto space-y-3 pb-2 sm:pb-4">
        {/* Visual Logic Board (Non-clickable informative card) */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl border-2 border-[#D3E2F4] border-b-[4px] border-b-[#BACEE5] p-4 sm:p-5 shadow-sm space-y-3 pointer-events-none select-none">
          {/* Board Title */}
          <div className="text-center">
            <h2 className="font-black text-sm sm:text-base text-[#0E2E59] tracking-tight">
              Одна цель — твой осознанный выбор
            </h2>
          </div>

          {/* 3 Step Cards Row */}
          <div className="relative flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-3">
            {/* Step 1: Понять */}
            <div className="w-full sm:flex-1 bg-[#F8FAFC] border-2 border-slate-200/80 rounded-2xl p-3 sm:p-3.5 text-center flex sm:flex-col items-center sm:justify-center gap-3 sm:gap-1.5 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-[#1677FF] text-white flex items-center justify-center shrink-0 shadow-xs">
                <GraduationCap className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div className="text-left sm:text-center min-w-0">
                <span className="font-black text-xs sm:text-sm text-[#0E2E59] block leading-tight">
                  Понять
                </span>
                <span className="text-[11px] sm:text-xs text-slate-500 font-medium leading-tight block mt-0.5">
                  Что происходит и что значит
                </span>
              </div>
            </div>

            {/* Connecting Arrow 1 */}
            <div className="hidden sm:flex items-center justify-center text-slate-300">
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </div>

            {/* Step 2: Сравнить */}
            <div className="w-full sm:flex-1 bg-[#F8FAFC] border-2 border-slate-200/80 rounded-2xl p-3 sm:p-3.5 text-center flex sm:flex-col items-center sm:justify-center gap-3 sm:gap-1.5 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-[#0284C7] text-white flex items-center justify-center shrink-0 shadow-xs">
                <SlidersHorizontal className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div className="text-left sm:text-center min-w-0">
                <span className="font-black text-xs sm:text-sm text-[#0E2E59] block leading-tight">
                  Сравнить
                </span>
                <span className="text-[11px] sm:text-xs text-slate-500 font-medium leading-tight block mt-0.5">
                  Чем отличаются программы
                </span>
              </div>
            </div>

            {/* Connecting Arrow 2 */}
            <div className="hidden sm:flex items-center justify-center text-slate-300">
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </div>

            {/* Step 3: Выбрать */}
            <div className="w-full sm:flex-1 bg-[#F8FAFC] border-2 border-slate-200/80 rounded-2xl p-3 sm:p-3.5 text-center flex sm:flex-col items-center sm:justify-center gap-3 sm:gap-1.5 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-[#8B5CF6] text-white flex items-center justify-center shrink-0 shadow-xs">
                <Target className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div className="text-left sm:text-center min-w-0">
                <span className="font-black text-xs sm:text-sm text-[#0E2E59] block leading-tight">
                  Выбрать
                </span>
                <span className="text-[11px] sm:text-xs text-slate-500 font-medium leading-tight block mt-0.5">
                  Что подходит именно тебе
                </span>
              </div>
            </div>
          </div>

          {/* Cheerful Handwritten Note from Owl (As in sketch) */}
          <div className="flex items-center justify-center gap-1.5 pt-1 text-center">
            <span className="text-xs sm:text-sm font-black text-[#1D4ED8] flex items-center gap-1">
              Не бойся вопросов — они помогают выбрать!
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline shrink-0" />
            </span>
          </div>

          {/* 3 Downward Arrows pointing to Action Button */}
          <div className="flex items-center justify-center gap-16 sm:gap-28 text-slate-300 pt-0.5">
            <ArrowDown className="w-3.5 h-3.5 stroke-[2.5]" />
            <ArrowDown className="w-3.5 h-3.5 stroke-[2.5]" />
            <ArrowDown className="w-3.5 h-3.5 stroke-[2.5]" />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ВМЕСТО НИЖНЕГО ПОЛЯ — БОЛЬШАЯ ЯРКАЯ КНОПКА "ДАВАЙ ПРИСТУПИМ"              */}
        {/* ========================================================================= */}
        <div className="w-full">
          <button
            type="button"
            onClick={onNext}
            className="w-full h-14 sm:h-16 rounded-2xl bg-[#1677FF] hover:bg-[#156FE6] text-white text-base sm:text-lg font-black border-b-[5px] border-b-[#0A4EA8] active:translate-y-[2px] transition-all cursor-pointer flex items-center justify-center gap-3 shadow-lg group"
          >
            <span>Давай приступим</span>
            <ArrowRight className="w-5 h-5 stroke-[3] group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
