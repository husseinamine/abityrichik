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
    <div className="h-full max-h-[100dvh] flex flex-col justify-between bg-gradient-to-b from-[#F0F7FF] via-[#F8FAFC] to-white p-3 sm:p-5 md:p-8 overflow-hidden select-none">
      {/* ========================================================================= */}
      {/* 70% HERO SECTION: СОВА МАШЕТ КРЫЛОМ И ПРИВЕТСТВИЕ                        */}
      {/* ========================================================================= */}
      <div className="flex-1 flex flex-col items-center justify-center py-1 sm:py-4 text-center min-h-0">
        {/* Subtle Top Badge */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[#1677FF] font-black text-[10px] sm:text-xs uppercase tracking-wider mb-1 sm:mb-2 shrink-0 animate-in fade-in duration-300">
          <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-500" />
          <span>СОВА — Выбор Абитуриента 2026</span>
        </div>

        {/* Big Greeting Heading above Owl */}
        <h1 className="text-base xs:text-lg sm:text-2xl md:text-3xl font-black text-[#0E2E59] max-w-lg mx-auto leading-tight mb-1 sm:mb-2 shrink-0 animate-in fade-in duration-300">
          Привет! Я СОВА, давай я помогу тебе с поступлением!
        </h1>

        {/* Mascot standing and waving wing - responsive height so it never pushes the screen */}
        <div className="relative my-0.5 sm:my-2 flex flex-col items-center justify-center shrink min-h-0 animate-in zoom-in-95 duration-400">
          <AcademicOwl
            variant="waving"
            size="lg"
            className="w-24 h-24 xs:w-28 xs:h-28 sm:w-44 sm:h-44 md:w-52 md:h-52 drop-shadow-md"
          />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ПОЛЕ КАК НА ФОТОГРАФИИ: "ОДНА ЦЕЛЬ — ТВОЙ ОСОЗНАННЫЙ ВЫБОР"              */}
      {/* Все поля некликабельные, кроме нижнего                                    */}
      {/* ========================================================================= */}
      <div className="w-full max-w-xl mx-auto space-y-2 sm:space-y-3 shrink-0 pb-1 sm:pb-3">
        {/* Visual Logic Board (Non-clickable informative card) */}
        <div className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl border-2 border-[#D3E2F4] border-b-[4px] border-b-[#BACEE5] p-2.5 sm:p-4 shadow-2xs space-y-1.5 sm:space-y-2.5 pointer-events-none select-none">
          {/* Board Title */}
          <div className="text-center">
            <h2 className="font-black text-xs sm:text-sm text-[#0E2E59] tracking-tight">
              Одна цель — твой осознанный выбор
            </h2>
          </div>

          {/* 3 Step Cards in a 3-column row on ALL screen sizes */}
          <div className="grid grid-cols-3 gap-1.5 sm:gap-3 items-stretch">
            {/* Step 1: Понять */}
            <div className="bg-[#F8FAFC] border-2 border-slate-200/80 rounded-xl sm:rounded-2xl p-2 sm:p-3 text-center flex flex-col items-center justify-center gap-1 shadow-2xs">
              <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-[#1677FF] text-white flex items-center justify-center shrink-0 shadow-2xs">
                <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
              </div>
              <div className="min-w-0 w-full">
                <span className="font-black text-[11px] sm:text-xs text-[#0E2E59] block leading-tight">
                  Понять
                </span>
                <span className="text-[9px] sm:text-[11px] text-slate-400 font-semibold leading-tight block truncate mt-0.5">
                  Что значит
                </span>
              </div>
            </div>

            {/* Step 2: Сравнить */}
            <div className="bg-[#F8FAFC] border-2 border-slate-200/80 rounded-xl sm:rounded-2xl p-2 sm:p-3 text-center flex flex-col items-center justify-center gap-1 shadow-2xs">
              <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-[#0284C7] text-white flex items-center justify-center shrink-0 shadow-2xs">
                <SlidersHorizontal className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
              </div>
              <div className="min-w-0 w-full">
                <span className="font-black text-[11px] sm:text-xs text-[#0E2E59] block leading-tight">
                  Сравнить
                </span>
                <span className="text-[9px] sm:text-[11px] text-slate-400 font-semibold leading-tight block truncate mt-0.5">
                  В чём разница
                </span>
              </div>
            </div>

            {/* Step 3: Выбрать */}
            <div className="bg-[#F8FAFC] border-2 border-slate-200/80 rounded-xl sm:rounded-2xl p-2 sm:p-3 text-center flex flex-col items-center justify-center gap-1 shadow-2xs">
              <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-[#8B5CF6] text-white flex items-center justify-center shrink-0 shadow-2xs">
                <Target className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
              </div>
              <div className="min-w-0 w-full">
                <span className="font-black text-[11px] sm:text-xs text-[#0E2E59] block leading-tight">
                  Выбрать
                </span>
                <span className="text-[9px] sm:text-[11px] text-slate-400 font-semibold leading-tight block truncate mt-0.5">
                  Что твоё
                </span>
              </div>
            </div>
          </div>

          {/* Cheerful Handwritten Note from Owl */}
          <div className="flex items-center justify-center gap-1 pt-0.5 text-center">
            <span className="text-[10px] sm:text-xs font-black text-[#1D4ED8] flex items-center gap-1 leading-tight">
              Не бойся вопросов — они помогают выбрать!
              <Heart className="w-3 h-3 text-rose-500 fill-rose-500 inline shrink-0" />
            </span>
          </div>

          {/* 3 Downward Arrows pointing to Action Button */}
          <div className="flex items-center justify-center gap-12 sm:gap-24 text-slate-300 py-0.5">
            <ArrowDown className="w-3 h-3 stroke-[2.5]" />
            <ArrowDown className="w-3 h-3 stroke-[2.5]" />
            <ArrowDown className="w-3 h-3 stroke-[2.5]" />
          </div>
        </div>

        {/* Action Button: 100% visible on mobile without scroll */}
        <div className="w-full">
          <button
            type="button"
            onClick={onNext}
            className="w-full h-12 sm:h-14 rounded-2xl bg-[#1677FF] hover:bg-[#156FE6] text-white text-sm sm:text-base font-black border-b-[4px] sm:border-b-[5px] border-b-[#0A4EA8] active:translate-y-[2px] transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md group"
          >
            <span>Давай приступим</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[3] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
