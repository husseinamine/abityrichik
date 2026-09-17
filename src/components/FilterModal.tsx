import React, { useEffect } from 'react';
import { DuolingoButton } from './DuolingoButton';
import {
  X,
  SlidersHorizontal,
  ArrowUpWideNarrow,
  ArrowDownWideNarrow,
  RotateCcw,
  Building2,
  GraduationCap,
  Check,
  MapPin,
  Sparkles,
} from 'lucide-react';

export type SortOrder = 'default' | 'asc' | 'desc';
export type ScoreSortTarget = 'budget' | 'paid';

export interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  // University
  selectedUniversity: string;
  onSelectUniversity: (uni: string) => void;
  universitiesList: string[];
  // Program
  selectedProgram: string;
  onSelectProgram: (prog: string) => void;
  programsList: string[];
  // Sort
  sortOrder: SortOrder;
  onSelectSortOrder: (order: SortOrder) => void;
  sortByScoreType: ScoreSortTarget;
  onSelectSortByScoreType: (target: ScoreSortTarget) => void;
  // City
  selectedCity: string;
  onSelectCity: (city: string) => void;
  citiesList: string[];
  // Reset & Results Count
  onResetFilters: () => void;
  activeFiltersCount: number;
  filteredCount: number;
}

export const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  selectedUniversity,
  onSelectUniversity,
  universitiesList,
  selectedProgram,
  onSelectProgram,
  programsList,
  sortOrder,
  onSelectSortOrder,
  sortByScoreType,
  onSelectSortByScoreType,
  selectedCity,
  onSelectCity,
  citiesList,
  onResetFilters,
  activeFiltersCount,
  filteredCount,
}) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
      {/* Modal Container */}
      <div className="bg-white rounded-3xl border-2 border-[#CADDF4] border-b-[6px] border-b-[#A8C6EB] w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 shadow-2xl">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between shrink-0 bg-[#F8FAFC]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#EFF6FF] border-2 border-[#1677FF] border-b-[3px] border-b-[#0A4EA8] text-[#1677FF] flex items-center justify-center shrink-0">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-base sm:text-lg text-[#0E2E59] leading-tight">
                  Фильтры и сортировка
                </h3>
                {activeFiltersCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-[#1677FF] text-white text-[10px] font-black">
                    {activeFiltersCount}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 font-semibold">
                Настрой параметры поиска программ
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-500 flex items-center justify-center cursor-pointer transition-colors"
            aria-label="Закрыть"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
          {/* 1. Сортировка по проходному баллу */}
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-black uppercase tracking-wider text-[#0E2E59] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#1677FF]" />
                Сортировка по проходному баллу
              </span>

              {/* Target score toggle */}
              <div className="flex items-center gap-1 bg-[#F1F6FD] rounded-lg p-0.5 border border-[#CADDF4]">
                <button
                  type="button"
                  onClick={() => onSelectSortByScoreType('budget')}
                  className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold transition-all cursor-pointer ${
                    sortByScoreType === 'budget'
                      ? 'bg-white text-[#1677FF] shadow-2xs'
                      : 'text-slate-500 hover:text-[#0E2E59]'
                  }`}
                >
                  Бюджет
                </button>
                <button
                  type="button"
                  onClick={() => onSelectSortByScoreType('paid')}
                  className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold transition-all cursor-pointer ${
                    sortByScoreType === 'paid'
                      ? 'bg-white text-[#1677FF] shadow-2xs'
                      : 'text-slate-500 hover:text-[#0E2E59]'
                  }`}
                >
                  Платно
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {/* Option 1: Default */}
              <button
                type="button"
                onClick={() => onSelectSortOrder('default')}
                className={`w-full p-3 rounded-2xl border-2 text-left flex items-center justify-between gap-3 transition-all cursor-pointer active:translate-y-[1px] ${
                  sortOrder === 'default'
                    ? 'bg-[#EFF6FF] border-[#1677FF] border-b-[3px] border-b-[#0A4EA8] text-[#0E2E59]'
                    : 'bg-white border-slate-200 border-b-[3px] border-b-slate-300 hover:border-[#1677FF] text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                    sortOrder === 'default' ? 'bg-[#1677FF] text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-extrabold text-xs sm:text-sm block">
                      По умолчанию
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">
                      Рекомендации Совы и расчёт шансов поступления
                    </span>
                  </div>
                </div>
                {sortOrder === 'default' && (
                  <Check className="w-4 h-4 text-[#1677FF] stroke-[3] shrink-0" />
                )}
              </button>

              {/* Option 2: Ascending */}
              <button
                type="button"
                onClick={() => onSelectSortOrder('asc')}
                className={`w-full p-3 rounded-2xl border-2 text-left flex items-center justify-between gap-3 transition-all cursor-pointer active:translate-y-[1px] ${
                  sortOrder === 'asc'
                    ? 'bg-[#EFF6FF] border-[#1677FF] border-b-[3px] border-b-[#0A4EA8] text-[#0E2E59]'
                    : 'bg-white border-slate-200 border-b-[3px] border-b-slate-300 hover:border-[#1677FF] text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                    sortOrder === 'asc' ? 'bg-[#1677FF] text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    <ArrowUpWideNarrow className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-extrabold text-xs sm:text-sm block">
                      По возрастанию балла (↗️)
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">
                      От меньшего балла к большему — где проще поступить
                    </span>
                  </div>
                </div>
                {sortOrder === 'asc' && (
                  <Check className="w-4 h-4 text-[#1677FF] stroke-[3] shrink-0" />
                )}
              </button>

              {/* Option 3: Descending */}
              <button
                type="button"
                onClick={() => onSelectSortOrder('desc')}
                className={`w-full p-3 rounded-2xl border-2 text-left flex items-center justify-between gap-3 transition-all cursor-pointer active:translate-y-[1px] ${
                  sortOrder === 'desc'
                    ? 'bg-[#EFF6FF] border-[#1677FF] border-b-[3px] border-b-[#0A4EA8] text-[#0E2E59]'
                    : 'bg-white border-slate-200 border-b-[3px] border-b-slate-300 hover:border-[#1677FF] text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                    sortOrder === 'desc' ? 'bg-[#1677FF] text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    <ArrowDownWideNarrow className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-extrabold text-xs sm:text-sm block">
                      По убыванию балла (↘️)
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">
                      От большего балла к меньшему — самые топовые направления
                    </span>
                  </div>
                </div>
                {sortOrder === 'desc' && (
                  <Check className="w-4 h-4 text-[#1677FF] stroke-[3] shrink-0" />
                )}
              </button>
            </div>
          </div>

          {/* 2. Фильтр по вузу */}
          <div>
            <label className="text-xs font-black uppercase tracking-wider text-[#0E2E59] flex items-center gap-1.5 mb-2">
              <Building2 className="w-3.5 h-3.5 text-[#1677FF]" />
              Фильтр по вузу
            </label>

            <div className="relative">
              <select
                value={selectedUniversity}
                onChange={(e) => onSelectUniversity(e.target.value)}
                className="w-full bg-[#F8FAFC] border-2 border-[#CADDF4] focus:border-[#1677FF] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-bold text-[#0E2E59] focus:outline-none cursor-pointer transition-colors appearance-none"
              >
                {universitiesList.map((uni) => (
                  <option key={uni} value={uni}>
                    {uni}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                <Building2 className="w-4 h-4" />
              </div>
            </div>

            {/* Quick popular university chips */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {universitiesList.slice(0, 5).map((uni) => (
                <button
                  key={uni}
                  type="button"
                  onClick={() => onSelectUniversity(uni)}
                  className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
                    selectedUniversity === uni
                      ? 'bg-[#1677FF] text-white border border-[#0A4EA8]'
                      : 'bg-[#F1F6FD] text-slate-600 hover:bg-[#E2EEFC] border border-[#CADDF4]'
                  }`}
                >
                  {uni}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Фильтр по программе */}
          <div>
            <label className="text-xs font-black uppercase tracking-wider text-[#0E2E59] flex items-center gap-1.5 mb-2">
              <GraduationCap className="w-3.5 h-3.5 text-[#1677FF]" />
              Фильтр по программе / специальности
            </label>

            <div className="relative">
              <select
                value={selectedProgram}
                onChange={(e) => onSelectProgram(e.target.value)}
                className="w-full bg-[#F8FAFC] border-2 border-[#CADDF4] focus:border-[#1677FF] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-bold text-[#0E2E59] focus:outline-none cursor-pointer transition-colors appearance-none"
              >
                {programsList.map((prog) => (
                  <option key={prog} value={prog}>
                    {prog}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                <GraduationCap className="w-4 h-4" />
              </div>
            </div>

            {/* Quick program chips */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {programsList.slice(0, 4).map((prog) => (
                <button
                  key={prog}
                  type="button"
                  onClick={() => onSelectProgram(prog)}
                  className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
                    selectedProgram === prog
                      ? 'bg-[#1677FF] text-white border border-[#0A4EA8]'
                      : 'bg-[#F1F6FD] text-slate-600 hover:bg-[#E2EEFC] border border-[#CADDF4]'
                  }`}
                >
                  {prog}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Фильтр по городу */}
          <div>
            <label className="text-xs font-black uppercase tracking-wider text-[#0E2E59] flex items-center gap-1.5 mb-2">
              <MapPin className="w-3.5 h-3.5 text-[#1677FF]" />
              Город обучения
            </label>

            <div className="flex flex-wrap gap-1.5">
              {citiesList.map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => onSelectCity(city)}
                  className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
                    selectedCity === city
                      ? 'bg-[#1677FF] text-white border border-[#0A4EA8]'
                      : 'bg-[#F1F6FD] text-slate-600 hover:bg-[#E2EEFC] border border-[#CADDF4]'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-100 flex items-center justify-between gap-3 bg-[#F8FAFC] shrink-0">
          <DuolingoButton
            variant="secondary"
            onClick={onResetFilters}
            className="!h-10 !px-3.5 !text-xs"
            icon={<RotateCcw className="w-3.5 h-3.5" />}
          >
            Сбросить всё
          </DuolingoButton>

          <DuolingoButton
            variant="primary"
            onClick={onClose}
            className="flex-1 !h-10 !text-xs"
          >
            Показать {filteredCount} {filteredCount === 1 ? 'программу' : filteredCount < 5 ? 'программы' : 'программ'}
          </DuolingoButton>
        </div>
      </div>
    </div>
  );
};
