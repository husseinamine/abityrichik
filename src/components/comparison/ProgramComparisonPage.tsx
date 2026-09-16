import React, { useState, useMemo } from 'react';
import type { Program, UserProfile } from '../../types/onboarding';
import { UNIVERSITY_PROGRAMS } from '../../data/programs';
import { CATEGORY_METAS, STUDY_PLANS } from '../../data/studyPlans';
import {
  getProgramCurriculumStats,
  getComparedCategories,
  generateComparisonInsights,
} from '../../utils/curriculumAnalyzer';
import { DuolingoButton } from '../DuolingoButton';
import { ProgramDetailModal } from '../ProgramDetailModal';
import { ProgramPickerModal } from './ProgramPickerModal';
import {
  ArrowLeft,
  X,
  Plus,
  ArrowLeftRight,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  Sparkles,
  MapPin,
  Trash2,
} from 'lucide-react';

interface ProgramComparisonPageProps {
  comparisonIds: string[];
  onRemoveProgram: (id: string) => void;
  onAddProgram: (id: string) => void;
  onReplaceProgram: (oldId: string, newId: string) => void;
  onClearAll: () => void;
  onBackToCatalog: () => void;
  onNavigateToSteps?: () => void;
  profile?: UserProfile;
}

// Palette with primary blue (Uni 1) and green (Uni 2) matching sketch
const PROGRAM_PALETTE = [
  {
    bg: 'bg-[#2563EB]',
    bar: 'bg-[#3B82F6]',
    track: 'bg-[#EFF6FF]',
    border: 'border-[#1D4ED8]',
    text: 'text-[#2563EB]',
    lightBg: 'bg-[#EFF6FF]',
    dot: 'bg-[#2563EB]',
  }, // Blue (ВШЭ НН)
  {
    bg: 'bg-[#059669]',
    bar: 'bg-[#10B981]',
    track: 'bg-[#ECFDF5]',
    border: 'border-[#047857]',
    text: 'text-[#059669]',
    lightBg: 'bg-[#ECFDF5]',
    dot: 'bg-[#059669]',
  }, // Green (ННГУ)
  {
    bg: 'bg-[#7C3AED]',
    bar: 'bg-[#8B5CF6]',
    track: 'bg-[#F5F3FF]',
    border: 'border-[#6D28D9]',
    text: 'text-[#7C3AED]',
    lightBg: 'bg-[#F5F3FF]',
    dot: 'bg-[#7C3AED]',
  }, // Purple
  {
    bg: 'bg-[#D97706]',
    bar: 'bg-[#F59E0B]',
    track: 'bg-[#FFFBEB]',
    border: 'border-[#B45309]',
    text: 'text-[#D97706]',
    lightBg: 'bg-[#FFFBEB]',
    dot: 'bg-[#D97706]',
  }, // Amber
];

// Short university labels matching sketch: ВШЭ (НН), ННГУ, etc.
function getShortUniversityName(p: Program): string {
  if (p.university === 'НИУ ВШЭ') {
    if (p.campus === 'Нижний Новгород') return 'ВШЭ (НН)';
    if (p.campus === 'Москва') return 'ВШЭ (МСК)';
    if (p.campus === 'Санкт-Петербург') return 'ВШЭ (СПб)';
    if (p.campus === 'Пермь') return 'ВШЭ (Пермь)';
    return 'НИУ ВШЭ';
  }
  if (p.university.includes('ННГУ')) return 'ННГУ';
  if (p.university.includes('МГУ')) return 'МГУ';
  if (p.university.includes('Баумана') || p.university.includes('МГТУ')) return 'МГТУ';
  if (p.university.includes('ИТМО')) return 'ИТМО';
  if (p.university.includes('СПбГУ')) return 'СПбГУ';
  if (p.university.includes('КФУ')) return 'КФУ';
  if (p.university.includes('УрФУ')) return 'УрФУ';
  return p.university;
}

export const ProgramComparisonPage: React.FC<ProgramComparisonPageProps> = ({
  comparisonIds,
  onRemoveProgram,
  onAddProgram,
  onReplaceProgram,
  onClearAll,
  onBackToCatalog,
  profile,
}) => {
  const [viewMode, setViewMode] = useState<'categories' | 'courses'>('categories');
  const [onlyDifferences, setOnlyDifferences] = useState<boolean>(false);
  const [selectedCourse, setSelectedCourse] = useState<1 | 2 | 3 | 4>(1);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  // Modals state
  const [activeModalProgram, setActiveModalProgram] = useState<Program | null>(null);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [replaceTargetId, setReplaceTargetId] = useState<string | null>(null);

  // Selected programs objects
  const selectedPrograms = useMemo(() => {
    return comparisonIds
      .map((id) => UNIVERSITY_PROGRAMS.find((p) => p.id === id))
      .filter((p): p is Program => p !== undefined);
  }, [comparisonIds]);

  // Statistics for compared programs
  const programsStats = useMemo(() => {
    return selectedPrograms.map((p) => ({
      program: p,
      stats: getProgramCurriculumStats(p.id),
    }));
  }, [selectedPrograms]);

  // Compared categories
  const categoriesList = useMemo(() => {
    return getComparedCategories(comparisonIds, onlyDifferences);
  }, [comparisonIds, onlyDifferences]);

  // Objective insights
  const insights = useMemo(() => {
    return generateComparisonInsights(comparisonIds);
  }, [comparisonIds]);

  const toggleCategoryExpand = (catId: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [catId]: !prev[catId],
    }));
  };

  const handleOpenPicker = (replaceId?: string) => {
    setReplaceTargetId(replaceId || null);
    setPickerOpen(true);
  };

  const handleSelectProgramFromPicker = (programId: string) => {
    if (replaceTargetId) {
      onReplaceProgram(replaceTargetId, programId);
    } else {
      onAddProgram(programId);
    }
  };

  // EMPTY STATE
  if (selectedPrograms.length === 0) {
    return (
      <div className="flex-1 flex flex-col h-full bg-[#F8FAFC] overflow-y-auto">
        {/* Sticky Header */}
        <div className="sticky top-0 z-30 bg-white border-b-2 border-[#E2EEFC] px-4 sm:px-8 py-3.5 sm:py-4">
          <div className="max-w-6xl mx-auto w-full flex items-center justify-between">
            <button
              type="button"
              onClick={onBackToCatalog}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#1677FF] hover:text-[#0A4EA8] cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
              <span>Вернуться в каталог программ</span>
            </button>
          </div>
        </div>

        {/* Empty State Content */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="max-w-md w-full text-center bg-white border-2 border-dashed border-[#CADDF4] rounded-3xl p-8 sm:p-10">
            <div className="w-16 h-16 rounded-2xl bg-[#EFF6FF] border-2 border-[#BFDBFE] border-b-[4px] border-b-[#93C5FD] text-[#1677FF] flex items-center justify-center mx-auto mb-4">
              <SlidersHorizontal className="w-8 h-8 stroke-[2.5]" />
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-[#0E2E59] mb-2">
              Здесь пока ничего нет
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mb-2 leading-relaxed">
              Добавь программы из каталога, чтобы сравнить их по дисциплинам официальных учебных планов от ВУЗов.
            </p>
            <p className="text-xs text-[#1677FF] font-semibold mb-6">
              Для наглядного сопоставления необходимо выбрать минимум 2 программы (до 4 программ).
            </p>

            <div className="flex flex-col gap-2.5 max-w-xs mx-auto">
              <DuolingoButton
                onClick={onBackToCatalog}
                className="w-full"
                icon={<Plus className="w-4 h-4 stroke-[3]" />}
              >
                Найти программы
              </DuolingoButton>

              <button
                type="button"
                onClick={() => {
                  onAddProgram('hse-nn-pmi');
                  onAddProgram('nngu-nn-pmi');
                }}
                className="w-full py-2.5 px-3 rounded-xl border-2 border-[#BFDBFE] hover:bg-[#EFF6FF] text-[#1677FF] font-bold text-xs transition-colors text-center cursor-pointer"
              >
                ⚡ Сравнить пример: ПМИ ВШЭ vs ПМИ ННГУ
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-[#F8FAFC] overflow-y-auto">
      {/* Top Header */}
      <div className="sticky top-0 z-30 bg-white border-b-2 border-[#E2EEFC] px-3.5 sm:px-8 pt-3 pb-3 sm:py-4">
        <div className="max-w-6xl mx-auto w-full">
          <div className="flex items-center justify-between gap-2.5 mb-1.5">
            <button
              type="button"
              onClick={onBackToCatalog}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#1677FF] hover:text-[#0A4EA8] cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
              <span>К каталогу</span>
            </button>

            {comparisonIds.length > 0 && (
              <button
                type="button"
                onClick={onClearAll}
                className="text-xs font-bold text-slate-400 hover:text-red-500 flex items-center gap-1 cursor-pointer transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Очистить список</span>
              </button>
            )}
          </div>

          <div className="flex items-baseline justify-between gap-3">
            <div>
              <h1 className="text-lg sm:text-2xl font-black text-[#0E2A54] leading-tight">
                Сравнение программ ({selectedPrograms.length} из 4)
              </h1>
              <p className="text-[11px] sm:text-xs text-slate-500 font-semibold truncate">
                Сравнение по дисциплинам официальных учебных планов от ВУЗов
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 p-3.5 sm:p-8 max-w-6xl mx-auto w-full space-y-6">
        {/* Top Selected Programs Cards (Horizontal Scroll on mobile, columns on desktop) */}
        <div>
          <div className="flex items-stretch gap-3 overflow-x-auto pb-2 flex-nowrap sm:grid sm:grid-cols-2 lg:grid-cols-4">
            {selectedPrograms.map((p, idx) => {
              const color = PROGRAM_PALETTE[idx % PROGRAM_PALETTE.length];

              return (
                <div
                  key={p.id}
                  className="w-[280px] sm:w-auto shrink-0 bg-white border-2 border-[#D3E2F4] border-b-[4px] border-b-[#BACEE5] rounded-2xl p-3.5 flex flex-col justify-between"
                >
                  <div>
                    {/* Color indicator and top actions */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-3 h-3 rounded-full ${color.bg}`} />
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                          Вуз #{idx + 1}
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleOpenPicker(p.id)}
                          title="Заменить программу"
                          className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer transition-colors"
                        >
                          <ArrowLeftRight className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onRemoveProgram(p.id)}
                          title="Удалить из сравнения"
                          className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-500 flex items-center justify-center cursor-pointer transition-colors"
                        >
                          <X className="w-3.5 h-3.5 stroke-[2.5]" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 mb-1.5">
                      <span className="text-[10px] font-black uppercase text-[#1677FF] bg-[#EFF6FF] px-2 py-0.5 rounded-md border border-[#BFDBFE] truncate">
                        {p.university}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-500 flex items-center gap-0.5 shrink-0">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {p.city}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-sm text-[#0E2E59] leading-snug line-clamp-2 mb-1">
                      {p.title}
                    </h3>
                    <p className="text-[11px] text-slate-400 line-clamp-1 mb-3">
                      {p.faculty}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500 font-semibold">
                      Проходной: <b className="text-[#0E2E59]">{p.budgetPassingScore}</b>
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveModalProgram(p)}
                      className="text-[11px] font-bold text-[#1677FF] hover:underline cursor-pointer"
                    >
                      Детали →
                    </button>
                  </div>
                </div>
              );
            })}

            {/* "+ Add Program" Card if < 4 */}
            {selectedPrograms.length < 4 && (
              <button
                type="button"
                onClick={() => handleOpenPicker()}
                className="w-[240px] sm:w-auto shrink-0 min-h-[160px] bg-[#F8FAFC] border-2 border-dashed border-[#CADDF4] hover:border-[#1677FF] hover:bg-[#EFF6FF] rounded-2xl p-4 flex flex-col items-center justify-center text-center transition-all cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-[#CADDF4] group-hover:border-[#1677FF] text-[#1677FF] flex items-center justify-center mb-2 shadow-xs">
                  <Plus className="w-5 h-5 stroke-[2.5]" />
                </div>
                <span className="font-extrabold text-xs sm:text-sm text-[#0E2E59] group-hover:text-[#1677FF]">
                  + Добавить программу
                </span>
                <span className="text-[10px] text-slate-400 mt-0.5">
                  Сравнить ещё один вуз
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Section: «Чем отличаются программы?» (Objective Auto-Generated Insights) */}
        {insights.length > 0 && (
          <div className="bg-white border-2 border-[#D3E2F4] border-b-[4px] border-b-[#BACEE5] rounded-2xl p-4 sm:p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-[#FFFBEB] border border-[#FDE68A] text-[#D97706] flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-black text-[#0E2E59]">
                  Чем отличаются программы?
                </h3>
                <span className="text-[11px] text-slate-400 font-medium">
                  Автоматический анализ соотношения дисциплин официальных учебных планов
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {insights.map((insight, idx) => (
                <div
                  key={idx}
                  className="bg-[#F8FAFC] border border-[#E2EEFC] rounded-xl p-3 flex items-start gap-2.5"
                >
                  <span className="text-xl shrink-0 mt-0.5">{insight.icon}</span>
                  <div>
                    <h4 className="font-extrabold text-xs text-[#0E2E59] mb-0.5">
                      {insight.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {insight.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Single Program Helper Notice */}
        {selectedPrograms.length === 1 && (
          <div className="bg-[#EFF6FF] border-2 border-[#BFDBFE] rounded-2xl p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="text-xl shrink-0">💡</span>
              <p className="text-xs sm:text-sm text-[#0E2E59] font-medium">
                Выбрана <b>1 программа</b>. Добавьте ещё от 1 до 3 программ для полноценного сопоставления учебных планов.
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleOpenPicker()}
              className="shrink-0 px-3.5 py-1.5 rounded-xl bg-[#1677FF] hover:bg-[#0A4EA8] text-white font-bold text-xs cursor-pointer shadow-xs transition-colors text-center"
            >
              + Добавить вуз
            </button>
          </div>
        )}

        {/* Top Pill Navigation Tabs matching sketch: [ Обзор ] [ Учебный план ] */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100/90 rounded-2xl w-fit">
          <button
            type="button"
            onClick={() => setViewMode('categories')}
            className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
              viewMode === 'categories'
                ? 'bg-[#DCEBFE] text-[#1D4ED8] shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Обзор
          </button>
          <button
            type="button"
            onClick={() => setViewMode('courses')}
            className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
              viewMode === 'courses'
                ? 'bg-[#DCEBFE] text-[#1D4ED8] shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Учебный план
          </button>
        </div>

        {/* MODE 1: ПО КАТЕГОРИЯМ / ОБЗОР (Matching sketch: Общая картина) */}
        {viewMode === 'categories' && (
          <div className="space-y-4">
            {/* Header: Общая картина / Как распределяются дисциплины? + Filter */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pt-1">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-[#0E2E59] tracking-tight">
                  Общая картина
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                  Как распределяются дисциплины?
                </p>
              </div>

              {/* Differences Filter Toggle */}
              <div className="flex items-center gap-1.5 self-start sm:self-auto bg-slate-100 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setOnlyDifferences(false)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    !onlyDifferences
                      ? 'bg-white text-[#1677FF] shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Все направления ({getComparedCategories(comparisonIds, false).length})
                </button>
                <button
                  type="button"
                  onClick={() => setOnlyDifferences(true)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    onlyDifferences
                      ? 'bg-white text-[#1677FF] shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Только различия
                </button>
              </div>
            </div>

            {/* Sketch-style Table */}
            <div className="bg-white border-2 border-[#D3E2F4] border-b-[4px] border-b-[#BACEE5] rounded-3xl p-4 sm:p-7 overflow-hidden shadow-2xs">
              {categoriesList.length === 0 ? (
                <div className="text-center py-10 text-slate-500 text-xs">
                  По фильтру «Только различия» все программы имеют схожие доли дисциплин. Нажмите «Все направления», чтобы увидеть полный список.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[540px]">
                    <thead>
                      <tr className="border-b-2 border-slate-100">
                        <th className="pb-3.5 text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider w-[36%]">
                          Направление/дисциплина
                        </th>
                        {selectedPrograms.map((p, idx) => {
                          const color = PROGRAM_PALETTE[idx % PROGRAM_PALETTE.length];
                          return (
                            <th
                              key={p.id}
                              className="pb-3.5 text-xs sm:text-sm font-black text-[#0E2E59] pl-6"
                            >
                              <div className="flex items-center gap-2">
                                <span className={`w-2.5 h-2.5 rounded-full ${color.bg}`} />
                                <span className="truncate">{getShortUniversityName(p)}</span>
                              </div>
                            </th>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {categoriesList.map((catId) => {
                        const meta = CATEGORY_METAS[catId];
                        const isExpanded = !!expandedCategories[catId];

                        return (
                          <React.Fragment key={catId}>
                            <tr
                              onClick={() => toggleCategoryExpand(catId)}
                              className="hover:bg-slate-50/80 cursor-pointer transition-colors group select-none"
                            >
                              {/* Left Column: Color square badge + Category Name (like sketch) */}
                              <td className="py-4 pr-3">
                                <div className="flex items-center gap-3">
                                  <div
                                    className="w-5 h-5 rounded-md flex items-center justify-center shrink-0 shadow-2xs"
                                    style={{ backgroundColor: meta.accentColor }}
                                  />
                                  <span className="font-extrabold text-xs sm:text-sm text-[#0E2E59] group-hover:text-[#1677FF] transition-colors leading-snug">
                                    {meta.name}
                                  </span>
                                  <span className="text-slate-300 group-hover:text-[#1677FF] transition-colors ml-auto pr-2">
                                    {isExpanded ? (
                                      <ChevronUp className="w-3.5 h-3.5" />
                                    ) : (
                                      <ChevronDown className="w-3.5 h-3.5" />
                                    )}
                                  </span>
                                </div>
                              </td>

                              {/* University Columns: Pill Progress Bar + Percentage (like sketch) */}
                              {selectedPrograms.map((p, idx) => {
                                const color = PROGRAM_PALETTE[idx % PROGRAM_PALETTE.length];
                                const catStat = programsStats[idx].stats?.categories[catId];
                                const percentage = catStat?.percentage || 0;

                                // Proportional fill calculation where 40% fills ~80% of capsule (as in sketch)
                                const fillWidth = Math.min(100, Math.round((percentage / 50) * 100));

                                return (
                                  <td key={p.id} className="py-4 pl-6">
                                    <div className="flex items-center gap-3">
                                      {/* Pill Capsule Bar */}
                                      <div className={`h-3.5 rounded-full ${color.track} w-24 sm:w-32 md:w-40 overflow-hidden shrink-0 flex items-center p-0.5`}>
                                        <div
                                          className={`h-full rounded-full ${color.bar} transition-all duration-500`}
                                          style={{ width: `${fillWidth}%` }}
                                        />
                                      </div>

                                      {/* Percentage */}
                                      <span className="font-black text-xs sm:text-sm text-[#0E2E59] min-w-[32px] text-right">
                                        {percentage}%
                                      </span>
                                    </div>
                                  </td>
                                );
                              })}
                            </tr>

                            {/* Expandable Discipline Drawer */}
                            {isExpanded && (
                              <tr className="bg-[#F8FAFC]">
                                <td
                                  colSpan={selectedPrograms.length + 1}
                                  className="p-4 sm:p-5 border-t border-slate-100"
                                >
                                  <div className="mb-2.5">
                                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                                      Дисциплины из официальных учебных планов
                                    </span>
                                  </div>

                                  <div
                                    className={`grid gap-3 ${
                                      selectedPrograms.length === 2
                                        ? 'grid-cols-1 sm:grid-cols-2'
                                        : selectedPrograms.length === 3
                                        ? 'grid-cols-1 sm:grid-cols-3'
                                        : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
                                    }`}
                                  >
                                    {selectedPrograms.map((p, idx) => {
                                      const color = PROGRAM_PALETTE[idx % PROGRAM_PALETTE.length];
                                      const disciplines =
                                        STUDY_PLANS[p.id]?.disciplines.filter(
                                          (d) => d.normalizedCategory === catId
                                        ) || [];

                                      return (
                                        <div
                                          key={p.id}
                                          className="bg-white border border-slate-200 rounded-xl p-3 shadow-2xs"
                                        >
                                          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                                            <span className="text-xs font-black text-[#0E2E59] flex items-center gap-1.5">
                                              <span className={`w-2 h-2 rounded-full ${color.bg}`} />
                                              {getShortUniversityName(p)}
                                            </span>
                                            <span className="text-[11px] font-bold text-slate-400">
                                              {disciplines.length}{' '}
                                              {disciplines.length === 1 ? 'предмет' : 'предметов'}
                                            </span>
                                          </div>

                                          {disciplines.length === 0 ? (
                                            <div className="text-slate-400 text-xs italic py-1.5">
                                              Нет отдельных дисциплин в этом блоке
                                            </div>
                                          ) : (
                                            <div className="space-y-1.5">
                                              {disciplines.map((d) => (
                                                <div
                                                  key={d.id}
                                                  className="p-2 rounded-lg bg-[#F8FAFC] border border-slate-100 text-xs flex flex-col justify-between"
                                                >
                                                  <span className="font-bold text-[#0E2E59] leading-snug">
                                                    {d.name}
                                                  </span>
                                                  <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-400 font-semibold">
                                                    <span>
                                                      {d.course} курс ({d.semester} сем.)
                                                    </span>
                                                    <span>•</span>
                                                    <span>
                                                      {d.academicHours} ч.
                                                    </span>
                                                  </div>
                                                </div>
                                              ))}
                                            </div>
                                          )}
                                        </div>
                                      );
                                    })}
                                  </div>
                                </td>
                              </tr>
                            )}
                          </React.Fragment>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* MODE 2: ПО КУРСАМ (Course Progression) */}
        {viewMode === 'courses' && (
          <div className="space-y-4">
            {/* Course Selector Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {([1, 2, 3, 4] as const).map((courseNum) => (
                <button
                  key={courseNum}
                  type="button"
                  onClick={() => setSelectedCourse(courseNum)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    selectedCourse === courseNum
                      ? 'bg-[#1677FF] text-white border-b-[3px] border-[#0A4EA8]'
                      : 'bg-white text-slate-600 border border-[#D0E0F2] hover:bg-slate-50'
                  }`}
                >
                  {courseNum} курс обучения
                </button>
              ))}
            </div>

            {/* Side-by-side Course Disciplines */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {programsStats.map(({ program, stats }, pIdx) => {
                const courseData = stats?.courses[selectedCourse];
                const disciplines = courseData?.disciplines || [];
                const color = PROGRAM_PALETTE[pIdx % PROGRAM_PALETTE.length];

                return (
                  <div
                    key={program.id}
                    className="bg-white border-2 border-[#D3E2F4] border-b-[4px] border-b-[#BACEE5] rounded-2xl p-4 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-2 pb-2 border-b border-slate-100">
                        <span className={`w-3 h-3 rounded-full ${color.bg}`} />
                        <div className="min-w-0">
                          <h4 className="font-extrabold text-sm text-[#0E2E59] truncate">
                            {program.university}
                          </h4>
                          <span className="text-[11px] text-slate-400 truncate block">
                            {program.title}
                          </span>
                        </div>
                      </div>

                      <div className="mb-3 text-[11px] font-bold text-[#1677FF] bg-[#EFF6FF] px-2 py-1 rounded-lg">
                        Объём {selectedCourse} курса: ~{((courseData?.totalCredits || 0) * 36)} академических часов
                      </div>

                      <ul className="space-y-2">
                        {disciplines.map((d) => {
                          const meta = CATEGORY_METAS[d.normalizedCategory];

                          return (
                            <li
                              key={d.id}
                              className="bg-[#F8FAFC] border border-[#E2EEFC] rounded-xl p-2.5 text-xs flex flex-col gap-0.5"
                            >
                              <div className="flex items-start justify-between gap-1">
                                <span className="font-extrabold text-[#0E2E59] leading-snug">
                                  {d.name}
                                </span>
                                <span className="text-base shrink-0">{meta?.icon}</span>
                              </div>
                              <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1 pt-1 border-t border-slate-200/60">
                                <span>{d.semester} семестр</span>
                                <strong className="text-[#1677FF]">{d.academicHours} ч.</strong>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Program Detail Modal */}
      <ProgramDetailModal
        program={activeModalProgram}
        profile={profile}
        onClose={() => setActiveModalProgram(null)}
      />

      {/* Program Picker Modal */}
      <ProgramPickerModal
        isOpen={pickerOpen}
        onClose={() => {
          setPickerOpen(false);
          setReplaceTargetId(null);
        }}
        onSelectProgram={handleSelectProgramFromPicker}
        currentlySelectedIds={comparisonIds}
        replaceTargetId={replaceTargetId}
      />
    </div>
  );
};
