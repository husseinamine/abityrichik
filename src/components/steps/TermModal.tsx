import React, { useEffect } from "react";
import { ADMISSION_TERMS } from "../../data/admissionSteps";
import { AcademicOwl } from "../AcademicOwl";
import { X, Sparkles, BookOpen, Scale, Lightbulb, ChevronRight } from "lucide-react";

interface TermModalProps {
  termId: string | null;
  onClose: () => void;
  onSelectTerm: (termId: string) => void;
}

export const TermModal: React.FC<TermModalProps> = ({
  termId,
  onClose,
  onSelectTerm,
}) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (termId) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [termId, onClose]);

  if (!termId) return null;

  const termData = ADMISSION_TERMS[termId];
  if (!termData) return null;

  const allTermKeys = Object.keys(ADMISSION_TERMS);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      {/* Darkened Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg bg-white rounded-3xl border-2 border-[#1677FF] border-b-[6px] border-b-[#0A4EA8] shadow-2xl p-5 sm:p-6 z-10 my-auto animate-in zoom-in-95 duration-200 max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center cursor-pointer transition-colors z-20"
          aria-label="Закрыть"
        >
          <X className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Header with Owl and Title */}
        <div className="flex items-start gap-4 mb-4 pb-4 border-b border-slate-100">
          <AcademicOwl variant="explaining" size="lg" className="shrink-0 drop-shadow-md" />

          <div className="min-w-0 flex-1 pt-1">
            <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-[#1677FF] bg-[#EFF6FF] px-2 py-0.5 rounded-full border border-[#BFDBFE] mb-1.5">
              <Sparkles className="w-3 h-3 text-[#1677FF]" />
              {termData.badge}
            </span>

            <h3 className="text-xl sm:text-2xl font-black text-[#0E2E59] leading-tight">
              {termData.term}
            </h3>
            <p className="text-xs sm:text-sm font-bold text-slate-500 mt-0.5">
              {termData.fullTitle}
            </p>
          </div>
        </div>

        {/* Section 1: Owl explanation in simple words */}
        <div className="space-y-4">
          <div className="relative bg-[#EFF6FF] border-2 border-[#BFDBFE] rounded-2xl p-4 text-slate-800 text-xs sm:text-sm leading-relaxed">
            <div className="flex items-center gap-1.5 font-black text-xs text-[#1D4ED8] uppercase tracking-wider mb-1.5">
              <BookOpen className="w-4 h-4" />
              <span>Объяснение от СОВЫ простыми словами:</span>
            </div>
            <p className="font-medium text-slate-700">{termData.simpleExplanation}</p>
          </div>

          {/* Section 2: Concrete real-life example */}
          <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-4 text-xs sm:text-sm">
            <div className="flex items-center gap-1.5 font-black text-xs text-[#0E2E59] uppercase tracking-wider mb-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Наглядный пример:</span>
            </div>
            <p className="text-slate-600 font-medium leading-relaxed">{termData.example}</p>
          </div>

          {/* Section 3: Official regulation / law */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 text-xs text-slate-600">
            <div className="flex items-center gap-1.5 font-bold text-[11px] text-slate-500 uppercase tracking-wider mb-1">
              <Scale className="w-3.5 h-3.5 text-slate-400" />
              <span>Как это сформулировано в приказе Минобрнауки РФ:</span>
            </div>
            <p className="font-mono text-[11px] leading-relaxed text-slate-500 italic">
              «{termData.officialLaw}»
            </p>
          </div>

          {/* Section 4: Pro-tip from the Owl */}
          <div className="bg-amber-50/80 border-2 border-amber-200 rounded-2xl p-3.5 text-xs sm:text-sm">
            <div className="flex items-center gap-1.5 font-black text-xs text-amber-800 uppercase tracking-wider mb-1">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              <span>Совет от СОВЫ</span>
            </div>
            <p className="text-amber-900 font-semibold leading-relaxed">
              {termData.owlAdvice}
            </p>
          </div>
        </div>

        {/* Other terms quick switcher */}
        <div className="mt-5 pt-4 border-t border-slate-100">
          <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 block mb-2">
            Другие важные термины приёмной кампании:
          </span>
          <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
            {allTermKeys.map((key) => {
              const item = ADMISSION_TERMS[key];
              const isCurrent = key === termId;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => onSelectTerm(key)}
                  className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isCurrent
                      ? "bg-[#1677FF] text-white border-2 border-[#1677FF]"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
                  }`}
                >
                  {item.term}
                </button>
              );
            })}
          </div>
        </div>

        {/* Close action button */}
        <div className="mt-5">
          <button
            type="button"
            onClick={onClose}
            className="w-full h-11 rounded-2xl bg-[#1677FF] hover:bg-[#156FE6] text-white font-black text-sm border-b-[3px] border-b-[#0A4EA8] active:translate-y-[1px] transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
          >
            <span>Всё понятно, спасибо!</span>
            <ChevronRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </div>
  );
};
