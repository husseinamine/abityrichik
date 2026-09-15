import React, { useState, useMemo } from 'react';
import type { UserProfile, Program } from '../types/onboarding';
import { UNIVERSITY_PROGRAMS, CITIES_LIST } from '../data/programs';
import { matchPrograms } from '../utils/matcher';
import { DuolingoButton } from './DuolingoButton';
import { ProgramDetailModal } from './ProgramDetailModal';
import {
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  GraduationCap,
  Sparkles,
  Search,
  MapPin,
  Building2,
} from 'lucide-react';

interface ProgramsResultsProps {
  profile: UserProfile;
  onRetake: () => void;
}

export const ProgramsResults: React.FC<ProgramsResultsProps> = ({ profile, onRetake }) => {
  const [filterCategory, setFilterCategory] = useState<'all' | 'budget' | 'paid' | 'it'>('all');
  const [selectedCity, setSelectedCity] = useState<string>(profile.preferredCity || 'Все города');
  const [selectedUniversity, setSelectedUniversity] = useState<string>('Все вузы');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalProgram, setActiveModalProgram] = useState<Program | null>(null);

  const displayName = profile.name.trim() || 'Абитуриент';

  // Extract unique university names
  const universitiesList = useMemo(() => {
    const unis = Array.from(new Set(UNIVERSITY_PROGRAMS.map((p) => p.university)));
    return ['Все вузы', ...unis];
  }, []);

  const allMatches = useMemo(() => {
    return matchPrograms(profile, UNIVERSITY_PROGRAMS);
  }, [profile]);

  // Filtered by city, uni, category, and search query
  const filteredMatches = useMemo(() => {
    return allMatches.filter((m) => {
      // City filter
      if (selectedCity !== 'Все города' && m.program.city !== selectedCity) {
        return false;
      }

      // University filter
      if (selectedUniversity !== 'Все вузы' && m.program.university !== selectedUniversity) {
        return false;
      }

      // Category filter
      if (filterCategory === 'budget' && !m.qualifiesBudget) return false;
      if (filterCategory === 'paid' && !m.qualifiesPaid) return false;
      if (
        filterCategory === 'it' &&
        !m.program.tags.some((t) => ['IT', 'Data Science', 'Machine Learning', 'Архитектура ПО'].includes(t))
      ) {
        return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          m.program.title.toLowerCase().includes(q) ||
          m.program.university.toLowerCase().includes(q) ||
          m.program.faculty.toLowerCase().includes(q) ||
          m.program.city.toLowerCase().includes(q) ||
          m.program.tags.some((t) => t.toLowerCase().includes(q))
        );
      }

      return true;
    });
  }, [allMatches, selectedCity, selectedUniversity, filterCategory, searchQuery]);

  const budgetCount = filteredMatches.filter((m) => m.qualifiesBudget).length;
  const paidCount = filteredMatches.filter((m) => m.qualifiesPaid).length;

  return (
    <div className="flex-1 flex flex-col h-full bg-[#F8FAFC] overflow-y-auto">
      {/* Top Sticky Header Banner without specific university branding */}
      <div className="sticky top-0 z-30 bg-white border-b-2 border-[#E2EEFC] px-5 sm:px-8 py-4 sm:py-5">
        <div className="max-w-6xl mx-auto w-full">
          <div className="flex items-center justify-between gap-3 mb-2">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-center text-[#1677FF]">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-[#0E2A54]">
                  {displayName}, твои программы
                </h1>
                <p className="text-xs text-slate-400 font-medium">
                  Агрегатор программ вузов России · Приёмная кампания 2026
                </p>
              </div>
            </div>

            {/* Quick Retake Button */}
            <DuolingoButton
              variant="secondary"
              onClick={onRetake}
              className="!h-10 !px-3.5 !text-xs shrink-0"
              icon={<RotateCcw className="w-3.5 h-3.5" />}
            >
              Пересдать
            </DuolingoButton>
          </div>

          {/* Stats Strip */}
          <div className="grid grid-cols-2 gap-3 mt-3">
            <div className="bg-[#EFF6FF] border-2 border-[#BFDBFE] border-b-[4px] border-b-[#93C5FD] rounded-2xl p-3 sm:p-4 text-center">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#1E40AF]">
                Проходишь на бюджет
              </span>
              <div className="text-2xl sm:text-3xl font-black text-[#1E3A8A] mt-0.5">
                {budgetCount} {budgetCount === 1 ? 'программа' : 'программ'}
              </div>
            </div>

            <div className="bg-[#F0FDF4] border-2 border-[#BBF7D0] border-b-[4px] border-b-[#86EFAC] rounded-2xl p-3 sm:p-4 text-center">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#166534]">
                На коммерцию
              </span>
              <div className="text-2xl sm:text-3xl font-black text-[#14532D] mt-0.5">
                {paidCount} {paidCount === 1 ? 'программа' : 'программ'}
              </div>
            </div>
          </div>

          {/* Search & Filters Section */}
          <div className="mt-3 flex flex-col gap-2.5">
            {/* Search + City/Uni Dropdowns */}
            <div className="flex flex-col sm:flex-row gap-2 items-stretch">
              {/* Search input */}
              <div className="relative flex items-center bg-[#F1F5F9] border border-[#CADDF4] rounded-xl px-3 py-2 flex-1">
                <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
                <input
                  type="text"
                  placeholder="Поиск по названию, вузу, городу..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-sm font-semibold text-[#0E2E59] placeholder:text-slate-400 placeholder:font-normal focus:outline-none"
                />
              </div>

              {/* City Selector */}
              <div className="flex items-center gap-1.5 bg-[#F1F5F9] border border-[#CADDF4] rounded-xl px-3 py-1.5 shrink-0">
                <MapPin className="w-4 h-4 text-[#1677FF]" />
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="bg-transparent text-xs sm:text-sm font-bold text-[#0E2E59] focus:outline-none cursor-pointer"
                >
                  {CITIES_LIST.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              {/* University Selector */}
              <div className="flex items-center gap-1.5 bg-[#F1F5F9] border border-[#CADDF4] rounded-xl px-3 py-1.5 shrink-0">
                <Building2 className="w-4 h-4 text-[#1677FF]" />
                <select
                  value={selectedUniversity}
                  onChange={(e) => setSelectedUniversity(e.target.value)}
                  className="bg-transparent text-xs sm:text-sm font-bold text-[#0E2E59] focus:outline-none cursor-pointer"
                >
                  {universitiesList.map((uni) => (
                    <option key={uni} value={uni}>
                      {uni}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 text-xs">
              <button
                type="button"
                onClick={() => setFilterCategory('all')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                  filterCategory === 'all'
                    ? 'bg-[#1677FF] text-white border-b-2 border-[#0A4EA8]'
                    : 'bg-white text-slate-600 border border-[#D0E0F2]'
                }`}
              >
                Все ({filteredMatches.length})
              </button>
              <button
                type="button"
                onClick={() => setFilterCategory('budget')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                  filterCategory === 'budget'
                    ? 'bg-[#1677FF] text-white border-b-2 border-[#0A4EA8]'
                    : 'bg-white text-slate-600 border border-[#D0E0F2]'
                }`}
              >
                Бюджет ({budgetCount})
              </button>
              <button
                type="button"
                onClick={() => setFilterCategory('paid')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                  filterCategory === 'paid'
                    ? 'bg-[#1677FF] text-white border-b-2 border-[#0A4EA8]'
                    : 'bg-white text-slate-600 border border-[#D0E0F2]'
                }`}
              >
                Коммерция ({paidCount})
              </button>
              <button
                type="button"
                onClick={() => setFilterCategory('it')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                  filterCategory === 'it'
                    ? 'bg-[#1677FF] text-white border-b-2 border-[#0A4EA8]'
                    : 'bg-white text-slate-600 border border-[#D0E0F2]'
                }`}
              >
                IT & Data
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Program Cards Grid */}
      <div className="flex-1 p-5 sm:p-8 max-w-6xl mx-auto w-full">
        {filteredMatches.length === 0 ? (
          <div className="text-center py-12 bg-white border-2 border-dashed border-[#CADDF4] rounded-3xl p-6">
            <AlertCircle className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-[#0E2E59] mb-1">
              Программы не найдены
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Попробуй сбросить город ({selectedCity}) или выбрать «Все вузы».
            </p>
            <div className="flex justify-center gap-2">
              <DuolingoButton
                variant="secondary"
                onClick={() => {
                  setSelectedCity('Все города');
                  setSelectedUniversity('Все вузы');
                  setFilterCategory('all');
                  setSearchQuery('');
                }}
                className="!h-11"
              >
                Сбросить фильтры
              </DuolingoButton>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {filteredMatches.map(
              ({
                program,
                userTotalScore,
                qualifiesBudget,
                qualifiesPaid,
                missingSubjects,
                pointsToBudget,
              }) => {
                return (
                  <div
                    key={program.id}
                    onClick={() => setActiveModalProgram(program)}
                    className="bg-white border-2 border-[#D3E2F4] border-b-[5px] border-b-[#BACEE5] hover:border-[#1677FF] hover:border-b-[#0A4EA8] rounded-2xl overflow-hidden flex flex-col justify-between cursor-pointer active:translate-y-[2px] transition-all group"
                  >
                    {/* Card Image Banner with Shadowed Gradient Background */}
                    <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-200">
                      <img
                        src={program.imageUrl}
                        alt={program.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      {/* Shadowed Gradient Background Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-black/25" />

                      {/* University & City Badges Overlaid at Top */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
                        <span className="px-2.5 py-1 rounded-xl bg-white/95 backdrop-blur-md text-[11px] font-black text-[#1677FF]">
                          {program.university}
                        </span>
                        <span className="px-2.5 py-1 rounded-xl bg-black/50 backdrop-blur-md text-[11px] font-bold text-white flex items-center gap-1 border border-white/20">
                          <MapPin className="w-3 h-3 text-blue-300" />
                          {program.city}
                        </span>
                      </div>

                      {/* Title & Faculty Overlaid on Shadowed Background */}
                      <div className="absolute bottom-3 left-3 right-3 z-10">
                        <h3 className="font-extrabold text-base sm:text-lg text-white leading-snug drop-shadow-md">
                          {program.title}
                        </h3>
                        <span className="text-xs text-slate-200 font-medium line-clamp-1 opacity-90 drop-shadow-xs">
                          {program.faculty}
                        </span>
                      </div>
                    </div>

                    {/* Card Content Body */}
                    <div className="p-4 flex flex-col justify-between gap-3 flex-1">

                    {/* Admission Status Badge */}
                    {missingSubjects.length > 0 ? (
                      <div className="bg-[#FEF2F2] border border-[#FECACA] rounded-xl px-3 py-2 flex items-center gap-2 text-xs font-bold text-[#991B1B]">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>Нужно сдать: {missingSubjects.join(', ')}</span>
                      </div>
                    ) : qualifiesBudget ? (
                      <div className="bg-[#F0FDF4] border border-[#86EFAC] rounded-xl px-3 py-2 flex items-center justify-between text-xs font-bold text-[#166534]">
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
                          <span>Проходишь на бюджет!</span>
                        </div>
                        <span>
                          {userTotalScore} из {program.budgetPassingScore}
                        </span>
                      </div>
                    ) : pointsToBudget <= 15 ? (
                      <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-xl px-3 py-2 flex items-center justify-between text-xs font-bold text-[#92400E]">
                        <div className="flex items-center gap-1.5">
                          <Sparkles className="w-4 h-4 text-[#F59E0B]" />
                          <span>Высокие шансы (до бюджета {pointsToBudget} б.)</span>
                        </div>
                        <span>
                          {userTotalScore} из {program.budgetPassingScore}
                        </span>
                      </div>
                    ) : qualifiesPaid ? (
                      <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-xl px-3 py-2 flex items-center justify-between text-xs font-bold text-[#1E40AF]">
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-[#3B82F6]" />
                          <span>Проходишь на коммерцию</span>
                        </div>
                        <span>
                          {userTotalScore} из {program.paidPassingScore}
                        </span>
                      </div>
                    ) : (
                      <div className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 flex items-center justify-between text-xs font-semibold text-slate-500">
                        <span>Не хватает баллов</span>
                        <span>
                          {userTotalScore} из {program.budgetPassingScore}
                        </span>
                      </div>
                    )}

                    {/* Places & Cutoffs breakdown */}
                    <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-100">
                      <div className="flex flex-col">
                        <span className="text-[11px] text-slate-400">Бюджетных мест:</span>
                        <span className="font-bold text-[#0E2E59]">
                          {program.budgetPlaces} мест (проходной: {program.budgetPassingScore})
                        </span>
                      </div>

                      <div className="flex flex-col">
                        <span className="text-[11px] text-slate-400">Платное обучение:</span>
                        <span className="font-bold text-[#0E2E59]">
                          {program.paidPlaces} мест (проходной: {program.paidPassingScore})
                        </span>
                      </div>
                    </div>

                    {/* Tags & Action prompt */}
                    <div className="flex items-center justify-between pt-1 text-[11px]">
                      <div className="flex flex-wrap gap-1">
                        {program.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded-md bg-slate-100 text-[10px] font-bold text-slate-500"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <span className="text-[#1677FF] font-bold">Подробнее →</span>
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </div>
      )}

        {/* Retake Button at bottom */}
        <div className="pt-2 pb-8 max-w-md mx-auto w-full">
          <DuolingoButton
            variant="secondary"
            onClick={onRetake}
            className="w-full"
            icon={<RotateCcw className="w-4 h-4" />}
          >
            Пересдать тест / Изменить баллы
          </DuolingoButton>
        </div>
      </div>

      {/* 3-Tab Detailed Modal */}
      <ProgramDetailModal
        program={activeModalProgram}
        onClose={() => setActiveModalProgram(null)}
      />
    </div>
  );
};
