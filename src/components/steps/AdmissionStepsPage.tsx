import React, { useState } from "react";
import {
  ADMISSION_STEPS_DATA,
  PLAIN_TEXT_GUIDE,
  OFFICIAL_REGULATIONS,
} from "../../data/admissionSteps";
import { AcademicOwl } from "../AcademicOwl";
import { ClickableTerm } from "./ClickableTerm";
import { TermModal } from "./TermModal";
import { DuolingoButton } from "../DuolingoButton";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  FileText,
  Flag,
  ExternalLink,
  BookOpen,
  ArrowLeftRight,
  Clock,
  Sparkles,
  Check,
} from "lucide-react";

export type AdmissionTabMode = "steps" | "plain" | "official";

interface AdmissionStepsPageProps {
  onBackToCatalog: () => void;
  onNavigateToComparison: () => void;
  comparisonCount: number;
  userName?: string;
}

export const AdmissionStepsPage: React.FC<AdmissionStepsPageProps> = ({
  onBackToCatalog,
  onNavigateToComparison,
  comparisonCount,
  userName = "Абитуриент",
}) => {
  const [activeMode, setActiveMode] = useState<AdmissionTabMode>("steps");
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [activeTermId, setActiveTermId] = useState<string | null>(null);
  const [completedSteps, setCompletedSteps] = useState<number[]>([1]); // step 1 completed by default (choosing programs)

  const currentStep = ADMISSION_STEPS_DATA[currentStepIndex];
  const totalSteps = ADMISSION_STEPS_DATA.length;

  const toggleStepCompleted = (stepId: number) => {
    setCompletedSteps((prev) =>
      prev.includes(stepId) ? prev.filter((id) => id !== stepId) : [...prev, stepId]
    );
  };

  const handleNextStep = () => {
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#F8FAFC] overflow-y-auto relative pb-16">
      {/* Top Sticky Header */}
      <div className="sticky top-0 z-30 bg-white border-b-2 border-[#E2EEFC] px-3.5 sm:px-8 py-3 shadow-2xs">
        <div className="max-w-4xl mx-auto w-full">
          {/* Top Breadcrumb & Quick Nav */}
          <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onBackToCatalog}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-500 hover:text-[#0E2E59] transition-colors cursor-pointer flex items-center gap-1 text-xs font-bold"
              >
                <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
                <span className="hidden sm:inline">В каталог</span>
              </button>

              <span className="text-slate-300">/</span>

              <span className="text-xs font-black text-[#0E2E59]">
                Этапы поступления 2026
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onNavigateToComparison}
                className="px-3 py-1.5 rounded-xl hover:bg-slate-100 text-slate-600 hover:text-[#0E2E59] font-bold text-xs cursor-pointer flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeftRight className="w-3.5 h-3.5 text-[#1677FF]" />
                <span className="hidden sm:inline">Сравнение</span>
                {comparisonCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-[#1677FF] text-white text-[10px] font-black flex items-center justify-center">
                    {comparisonCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Title Row */}
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-3">
              <AcademicOwl variant="explaining" size="sm" className="hidden xs:inline-flex" />
              <div>
                <h1 className="text-base sm:text-xl font-black text-[#0E2E59] leading-tight">
                  Как поступить в российский вуз
                </h1>
                <p className="text-[11px] sm:text-xs text-slate-500 font-semibold">
                  Интерактивный гид от СОВЫ по приёмной кампании
                </p>
              </div>
            </div>
          </div>

          {/* 3 Main Mode Switcher Buttons */}
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100/90 rounded-2xl border border-slate-200">
            <button
              type="button"
              onClick={() => setActiveMode("steps")}
              className={`py-2 px-2 sm:px-4 rounded-xl font-black text-xs sm:text-sm text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeMode === "steps"
                  ? "bg-[#1677FF] text-white shadow-sm border-b-[3px] border-b-[#0A4EA8]"
                  : "text-slate-600 hover:text-[#0E2E59] hover:bg-white/60"
              }`}
            >
              <span>По шагам</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveMode("plain")}
              className={`py-2 px-2 sm:px-4 rounded-xl font-black text-xs sm:text-sm text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeMode === "plain"
                  ? "bg-[#1677FF] text-white shadow-sm border-b-[3px] border-b-[#0A4EA8]"
                  : "text-slate-600 hover:text-[#0E2E59] hover:bg-white/60"
              }`}
            >
              <span>Простым текстом</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveMode("official")}
              className={`py-2 px-2 sm:px-4 rounded-xl font-black text-xs sm:text-sm text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeMode === "official"
                  ? "bg-[#1677FF] text-white shadow-sm border-b-[3px] border-b-[#0A4EA8]"
                  : "text-slate-600 hover:text-[#0E2E59] hover:bg-white/60"
              }`}
            >
              <span>Официально</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Body Content Container */}
      <div className="max-w-4xl mx-auto w-full px-3.5 sm:px-8 py-5">
        {/* ========================================================= */}
        {/* MODE 1: ПО ШАГАМ (Step-by-step) */}
        {/* ========================================================= */}
        {activeMode === "steps" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Stepper Progress Indicator */}
            <div className="bg-white rounded-2xl border-2 border-[#E2EEFC] p-4 shadow-2xs">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black text-[#1677FF] uppercase tracking-wider">
                  Шаг {currentStepIndex + 1} из {totalSteps}
                </span>
                <span className="text-xs font-bold text-slate-400">
                  {currentStep.dates}
                </span>
              </div>

              {/* Connected Dots Progress Line */}
              <div className="flex items-center justify-between relative px-2">
                {/* Horizontal Background Track */}
                <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 bg-slate-100 z-0" />
                {/* Active Colored Progress Fill */}
                <div
                  className="absolute left-6 top-1/2 -translate-y-1/2 h-1 bg-[#1677FF] transition-all duration-300 z-0"
                  style={{
                    width: `${(currentStepIndex / (totalSteps - 1)) * 88}%`,
                  }}
                />

                {ADMISSION_STEPS_DATA.map((step, idx) => {
                  const isCurrent = idx === currentStepIndex;
                  const isCompleted = completedSteps.includes(step.id);
                  const isPast = idx < currentStepIndex;

                  return (
                    <button
                      key={step.id}
                      type="button"
                      onClick={() => setCurrentStepIndex(idx)}
                      className={`relative z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center font-black text-xs transition-all cursor-pointer ${
                        isCurrent
                          ? "bg-[#1677FF] text-white ring-4 ring-blue-100 scale-110 shadow-md border-2 border-white"
                          : isCompleted || isPast
                          ? "bg-emerald-500 text-white hover:scale-105"
                          : "bg-white border-2 border-slate-300 text-slate-400 hover:border-[#1677FF] hover:text-[#1677FF]"
                      }`}
                      title={`Шаг ${step.id}: ${step.title}`}
                    >
                      {isCompleted || isPast ? (
                        <Check className="w-4 h-4 stroke-[3]" />
                      ) : (
                        step.id
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Steps Quick Selector Pills (Mobile Friendly) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-100">
                {ADMISSION_STEPS_DATA.map((step, idx) => {
                  const isCurrent = idx === currentStepIndex;
                  const isDone = completedSteps.includes(step.id);

                  return (
                    <button
                      key={step.id}
                      type="button"
                      onClick={() => setCurrentStepIndex(idx)}
                      className={`p-2 rounded-xl text-left text-xs font-bold transition-all cursor-pointer flex items-center gap-2 border ${
                        isCurrent
                          ? "bg-[#EFF6FF] border-[#1677FF] text-[#1677FF]"
                          : isDone
                          ? "bg-emerald-50/70 border-emerald-200 text-emerald-800"
                          : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 ${
                          isCurrent
                            ? "bg-[#1677FF] text-white"
                            : isDone
                            ? "bg-emerald-500 text-white"
                            : "bg-slate-200 text-slate-500"
                        }`}
                      >
                        {isDone ? "✓" : step.id}
                      </div>
                      <span className="truncate">{step.shortTitle}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Current Step Main Stage Card */}
            <div className="bg-white rounded-3xl border-2 border-[#D3E2F4] border-b-[5px] border-b-[#BACEE5] p-5 sm:p-7 shadow-xs space-y-6">
              {/* Step Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#EFF6FF] text-[#1677FF] border border-[#BFDBFE] font-black text-sm flex items-center justify-center shrink-0">
                    {currentStep.id}
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-black text-[#0E2E59] leading-snug">
                      {currentStep.title}
                    </h2>
                    <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5 mt-0.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {currentStep.dates}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => toggleStepCompleted(currentStep.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 border ${
                    completedSteps.includes(currentStep.id)
                      ? "bg-emerald-500 text-white border-emerald-600 shadow-xs"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-600 border-slate-200"
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>
                    {completedSteps.includes(currentStep.id)
                      ? "Шаг выполнен ✓"
                      : "Отметить выполненным"}
                  </span>
                </button>
              </div>

              {/* Owl Speech Bubble Section */}
              <div className="flex flex-col md:flex-row items-start gap-4 sm:gap-6 bg-[#F0F7FF] border-2 border-[#BFDBFE] rounded-2xl p-4 sm:p-6 relative">
                {/* Academic Owl Mascot */}
                <div className="flex md:flex-col items-center gap-3 shrink-0 mx-auto md:mx-0">
                  <AcademicOwl variant="explaining" size="lg" className="drop-shadow-sm" />
                  <div className="text-center">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#1677FF] text-white font-black text-[10px] uppercase tracking-wider">
                      СОВА-эксперт
                    </span>
                  </div>
                </div>

                {/* Speech Bubble with Clickable Terms */}
                <div className="flex-1 min-w-0 space-y-3">
                  <div className="text-xs sm:text-sm font-extrabold text-[#1D4ED8]">
                    {userName ? `${userName}, ` : ''}{currentStep.owlSpeech.intro}
                  </div>

                  <div className="text-slate-800 text-xs sm:text-sm leading-relaxed">
                    {currentStep.owlSpeech.parts.map((part, pIdx) => {
                      if (part.termId) {
                        return (
                          <ClickableTerm
                            key={pIdx}
                            termId={part.termId}
                            onOpenTerm={(tid) => setActiveTermId(tid)}
                          >
                            {part.text}
                          </ClickableTerm>
                        );
                      }
                      return <span key={pIdx}>{part.text}</span>;
                    })}
                  </div>

                  {/* Owl Takeaway Tip */}
                  <div className="mt-3 p-3 rounded-xl bg-white border border-[#BFDBFE] text-xs font-bold text-[#0E2E59] flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-[#1677FF]">Главный совет: </strong>
                      {currentStep.owlSpeech.takeaway}
                    </span>
                  </div>
                </div>
              </div>

              {/* Example Card («На твоём примере») */}
              <div className="bg-[#F5F3FF] border-2 border-[#DDD6FE] rounded-2xl p-4 sm:p-5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-lg bg-[#8B5CF6] text-white flex items-center justify-center">
                    <Flag className="w-3.5 h-3.5" />
                  </div>
                  <h4 className="font-black text-sm text-[#5B21B6]">
                    {currentStep.example.title}
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed mb-2">
                  {currentStep.example.description}
                </p>
                <div className="inline-block bg-white px-3 py-1 rounded-xl text-xs font-black text-[#6D28D9] border border-[#C4B5FD]">
                  ✓ {currentStep.example.highlight}
                </div>
              </div>

              {/* Official Law Source Box */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-1.5 font-black text-slate-700">
                    <FileText className="w-4 h-4 text-[#1677FF]" />
                    <span>Официальный регламент:</span>
                  </div>
                  <span className="font-mono text-[11px] text-slate-400">
                    {currentStep.official.legalArticle}
                  </span>
                </div>
                <p className="text-slate-600 font-medium italic mb-2">
                  «{currentStep.official.ruleText}»
                </p>
                <span className="text-[11px] text-slate-500 font-bold block">
                  Источник: {currentStep.official.sourceName}
                </span>
              </div>

              {/* Step Action Checklist */}
              <div className="space-y-2">
                <span className="text-xs font-black uppercase tracking-wider text-slate-400 block">
                  Чек-лист этапа:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {currentStep.checklist.map((item, cIdx) => (
                    <div
                      key={cIdx}
                      className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2 text-xs"
                    >
                      <div className="w-4 h-4 rounded-md bg-[#EFF6FF] text-[#1677FF] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                        ✓
                      </div>
                      <span className="text-slate-700 font-medium leading-snug">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step Navigation Controls (Prev / Next) */}
              <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  disabled={currentStepIndex === 0}
                  className="px-4 py-2.5 rounded-xl border-2 border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-xs cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Назад</span>
                </button>

                <div className="text-xs font-bold text-slate-400">
                  {currentStepIndex + 1} из {totalSteps}
                </div>

                {currentStepIndex < totalSteps - 1 ? (
                  <DuolingoButton
                    onClick={handleNextStep}
                    className="!h-10 !px-5 !text-xs"
                    icon={<ChevronRight className="w-4 h-4" />}
                  >
                    Следующий шаг
                  </DuolingoButton>
                ) : (
                  <DuolingoButton
                    onClick={onBackToCatalog}
                    variant="secondary"
                    className="!h-10 !px-5 !text-xs"
                    icon={<CheckCircle2 className="w-4 h-4" />}
                  >
                    В каталог программ
                  </DuolingoButton>
                )}
              </div>
            </div>

            {/* Bottom Tab / Banner: Owl with Glossary prompt (As in sketch) */}
            <div
              onClick={() => setActiveTermId("vpp")}
              className="bg-white hover:bg-[#F0F7FF] border-2 border-[#1677FF] border-b-[4px] border-b-[#0A4EA8] rounded-2xl p-4 sm:p-5 shadow-sm transition-all cursor-pointer flex items-center justify-between gap-4 group"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <AcademicOwl variant="reading" size="sm" className="shrink-0 group-hover:scale-105 transition-transform" />
                <div className="min-w-0">
                  <h4 className="text-sm font-black text-[#0E2E59] group-hover:text-[#1677FF] transition-colors">
                    Не понимаешь термин?
                  </h4>
                  <p className="text-xs text-slate-500 font-semibold truncate">
                    Нажми на любое выделенное слово в тексте или открой справочник — и СОВА всё объяснит!
                  </p>
                </div>
              </div>

              <div className="shrink-0">
                <span className="px-3 py-1.5 rounded-xl bg-[#EFF6FF] text-[#1677FF] border border-[#BFDBFE] font-black text-xs flex items-center gap-1 group-hover:bg-[#1677FF] group-hover:text-white transition-colors">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Словарь терминов</span>
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* MODE 2: ПРОСТЫМ ТЕКСТОМ (Plain text conversational) */}
        {/* ========================================================= */}
        {activeMode === "plain" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Header Box */}
            <div className="bg-white rounded-3xl border-2 border-[#D3E2F4] border-b-[5px] border-b-[#BACEE5] p-5 sm:p-7 shadow-xs">
              <div className="flex items-center gap-3.5 mb-3">
                <AcademicOwl variant="happy" size="md" />
                <div>
                  <h2 className="text-lg sm:text-2xl font-black text-[#0E2E59]">
                    {PLAIN_TEXT_GUIDE.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 font-bold">
                    {PLAIN_TEXT_GUIDE.subtitle}
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed bg-[#EFF6FF] border border-[#BFDBFE] rounded-2xl p-4 mt-4">
                {PLAIN_TEXT_GUIDE.lead}
              </p>
            </div>

            {/* Articles Sections with Clickable Terms */}
            {PLAIN_TEXT_GUIDE.sections.map((sec, sIdx) => (
              <div
                key={sIdx}
                className="bg-white rounded-2xl border-2 border-slate-200 p-5 sm:p-6 shadow-2xs space-y-3"
              >
                <h3 className="text-base sm:text-lg font-black text-[#0E2E59]">
                  {sec.heading}
                </h3>

                {sec.content && (
                  <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                    {sec.content}
                  </p>
                )}

                {sec.bulletPoints && (
                  <ul className="space-y-2 mt-2">
                    {sec.bulletPoints.map((bp, bIdx) => (
                      <li
                        key={bIdx}
                        className="text-xs sm:text-sm text-slate-700 font-medium flex items-start gap-2"
                      >
                        <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                          ★
                        </span>
                        <span>{bp}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Term Chips for This Section */}
                {sec.terms && sec.terms.length > 0 && (
                  <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] font-bold text-slate-400">
                      Термины из раздела:
                    </span>
                    {sec.terms.map((tId) => (
                      <ClickableTerm
                        key={tId}
                        termId={tId}
                        onOpenTerm={(tid) => setActiveTermId(tid)}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ========================================================= */}
        {/* MODE 3: ОФИЦИАЛЬНО (Regulations & Calendar) */}
        {/* ========================================================= */}
        {activeMode === "official" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Regulatory Basis Header */}
            <div className="bg-white rounded-3xl border-2 border-[#D3E2F4] border-b-[5px] border-b-[#BACEE5] p-5 sm:p-7 shadow-xs space-y-3">
              <div className="flex items-center gap-3">
                <AcademicOwl variant="reading" size="md" />
                <div>
                  <h2 className="text-lg sm:text-xl font-black text-[#0E2E59]">
                    {OFFICIAL_REGULATIONS.title}
                  </h2>
                  <p className="text-xs text-slate-500 font-bold">
                    {OFFICIAL_REGULATIONS.subtitle}
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium bg-slate-50 border border-slate-200 rounded-2xl p-4">
                {OFFICIAL_REGULATIONS.basis}
              </p>
            </div>

            {/* Official Timeline Calendar Table */}
            <div className="bg-white rounded-2xl border-2 border-slate-200 p-5 sm:p-6 shadow-2xs space-y-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#1677FF]" />
                <h3 className="text-base font-black text-[#0E2E59]">
                  Официальный календарь приёмной кампании 2026
                </h3>
              </div>

              <div className="divide-y divide-slate-100">
                {OFFICIAL_REGULATIONS.calendar.map((item, cIdx) => (
                  <div
                    key={cIdx}
                    className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs sm:text-sm"
                  >
                    <div className="sm:w-44 shrink-0 font-black text-[#1677FF] bg-[#EFF6FF] px-2.5 py-1 rounded-lg border border-[#BFDBFE] inline-block">
                      {item.date}
                    </div>
                    <div className="flex-1 font-semibold text-slate-700">
                      {item.event}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Law Articles Excerpts */}
            <div className="bg-white rounded-2xl border-2 border-slate-200 p-5 sm:p-6 shadow-2xs space-y-4">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-600" />
                <h3 className="text-base font-black text-[#0E2E59]">
                  Ключевые статьи и нормативы
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {OFFICIAL_REGULATIONS.keyArticles.map((art, aIdx) => (
                  <div
                    key={aIdx}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5"
                  >
                    <span className="text-[11px] font-black uppercase text-[#1677FF]">
                      {art.num}
                    </span>
                    <h4 className="font-bold text-xs text-[#0E2E59]">
                      {art.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      {art.summary}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Official External Links */}
            <div className="bg-white rounded-2xl border-2 border-slate-200 p-5 sm:p-6 shadow-2xs space-y-3">
              <h3 className="text-base font-black text-[#0E2E59]">
                Официальные государственные ресурсы:
              </h3>
              <div className="space-y-2">
                {OFFICIAL_REGULATIONS.links.map((link, lIdx) => (
                  <a
                    key={lIdx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-[#F8FAFC] hover:bg-[#EFF6FF] border border-slate-200 hover:border-[#1677FF] transition-all flex items-center justify-between gap-3 text-xs group"
                  >
                    <div>
                      <span className="font-black text-[#0E2E59] group-hover:text-[#1677FF] transition-colors block">
                        {link.title}
                      </span>
                      <span className="text-slate-400 text-[11px] font-medium">
                        {link.note}
                      </span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#1677FF] transition-colors shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Pop-up Term Modal Explaining Official Term via Academic Owl */}
      <TermModal
        termId={activeTermId}
        onClose={() => setActiveTermId(null)}
        onSelectTerm={(tid) => setActiveTermId(tid)}
      />
    </div>
  );
};
