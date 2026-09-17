import React, { useState, useMemo, useRef, useEffect } from 'react';
import type { UserProfile, Program } from '../types/onboarding';
import { UNIVERSITY_PROGRAMS, CITIES_LIST, EGE_SUBJECTS } from '../data/programs';
import { matchPrograms } from '../utils/matcher';
import { DuolingoButton } from './DuolingoButton';
import { ProgramDetailModal } from './ProgramDetailModal';
import { SideMenu } from './SideMenu';
import { InteractiveOwlAvatar, type LookDirection } from './InteractiveOwlAvatar';
import { loadFavoritesIds, toggleFavoriteId } from '../utils/favoritesStorage';
import {
  CheckCircle2,
  AlertCircle,
  Heart,
  Sparkles,
  Search,
  MapPin,
  Building2,
  ChevronRight,
  ArrowLeftRight,
  Check,
  Menu,
} from 'lucide-react';

interface ProgramsResultsProps {
  profile: UserProfile;
  onRetake: () => void;
  comparisonIds: string[];
  onToggleComparison: (id: string) => { added: boolean; error?: string };
  onNavigateToComparison: () => void;
  onNavigateToSteps: () => void;
  onRestartOnboarding?: () => void;
  onUpdateProfile?: (updated: Partial<UserProfile>) => void;
}

export const ProgramsResults: React.FC<ProgramsResultsProps> = ({
  profile,
  onRetake,
  comparisonIds,
  onToggleComparison,
  onNavigateToComparison,
  onNavigateToSteps,
  onRestartOnboarding,
  onUpdateProfile,
}) => {
  const [filterCategory, setFilterCategory] = useState<'all' | 'favorites' | 'budget' | 'paid' | 'it'>('all');
  const [favoritesIds, setFavoritesIds] = useState<string[]>(() => loadFavoritesIds());
  const [selectedCity, setSelectedCity] = useState<string>(profile.preferredCity || 'Все города');
  const [selectedUniversity, setSelectedUniversity] = useState<string>('Все вузы');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalProgram, setActiveModalProgram] = useState<Program | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState<boolean>(false);
  const [lookDirection, setLookDirection] = useState<LookDirection>('neutral');
  const prevScrollTopRef = useRef<number>(0);
  const scrollTimeoutRef = useRef<number | null>(null);

  // Sync favorites in real time with localStorage and custom events
  useEffect(() => {
    const handleFavoritesSync = (e: Event) => {
      const customEvent = e as CustomEvent<string[]>;
      if (customEvent.detail && Array.isArray(customEvent.detail)) {
        setFavoritesIds(customEvent.detail);
      } else {
        setFavoritesIds(loadFavoritesIds());
      }
    };
    window.addEventListener('favorites_updated', handleFavoritesSync);
    return () => window.removeEventListener('favorites_updated', handleFavoritesSync);
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const currentScrollTop = e.currentTarget.scrollTop;
    const delta = currentScrollTop - prevScrollTopRef.current;

    if (Math.abs(delta) > 3) {
      setLookDirection(delta > 0 ? 'down' : 'up');
      prevScrollTopRef.current = currentScrollTop;

      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = window.setTimeout(() => {
        setLookDirection('neutral');
      }, 700);
    }
  };

  useEffect(() => {
    const handleWindowScroll = () => {
      const currentScrollTop = window.scrollY || document.documentElement.scrollTop;
      const delta = currentScrollTop - prevScrollTopRef.current;
      if (Math.abs(delta) > 3) {
        setLookDirection(delta > 0 ? 'down' : 'up');
        prevScrollTopRef.current = currentScrollTop;

        if (scrollTimeoutRef.current) {
          window.clearTimeout(scrollTimeoutRef.current);
        }
        scrollTimeoutRef.current = window.setTimeout(() => {
          setLookDirection('neutral');
        }, 700);
      }
    };

    window.addEventListener('scroll', handleWindowScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleWindowScroll);
      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const displayName = profile.name.trim() || 'Абитуриент';

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleToggle = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const result = onToggleComparison(id);
    if (result.error) {
      showToast(result.error);
    }
  };

  const handleToggleFavorite = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const result = toggleFavoriteId(id);
    setFavoritesIds(result.ids);
    showToast(result.isFavorite ? 'Программа добавлена в избранное ❤️' : 'Программа удалена из избранного');
  };

  // Extract unique university names
  const universitiesList = useMemo(() => {
    const unis = Array.from(new Set(UNIVERSITY_PROGRAMS.map((p) => p.university)));
    return ['Все вузы', ...unis];
  }, []);

  const allMatches = useMemo(() => {
    return matchPrograms(profile, UNIVERSITY_PROGRAMS);
  }, [profile]);

  // Matches filtered by city, university, and search query
  const baseMatches = useMemo(() => {
    return allMatches.filter((m) => {
      if (selectedCity !== 'Все города' && m.program.city !== selectedCity) return false;
      if (selectedUniversity !== 'Все вузы' && m.program.university !== selectedUniversity) return false;
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
  }, [allMatches, selectedCity, selectedUniversity, searchQuery]);

  // Filtered by category (including favorites)
  const filteredMatches = useMemo(() => {
    return baseMatches.filter((m) => {
      if (filterCategory === 'favorites') return favoritesIds.includes(m.program.id);
      if (filterCategory === 'budget') return m.qualifiesBudget;
      if (filterCategory === 'paid') return m.qualifiesPaid;
      if (filterCategory === 'it') {
        return m.program.tags.some((t) =>
          ['IT', 'Data Science', 'Machine Learning', 'Архитектура ПО', 'Highload', 'AI'].includes(t)
        );
      }
      return true;
    });
  }, [baseMatches, filterCategory, favoritesIds]);

  const allCategoryCount = baseMatches.length;
  const budgetCount = baseMatches.filter((m) => m.qualifiesBudget).length;
  const paidCount = baseMatches.filter((m) => m.qualifiesPaid).length;
  const favoritesCategoryCount = favoritesIds.length;

  return (
    <div
      onScroll={handleScroll}
      className="flex-1 flex flex-col h-full bg-[#F8FAFC] overflow-y-auto relative pb-20"
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#0E2E59] text-white px-4 py-2.5 rounded-2xl shadow-xl border border-blue-400/30 text-xs sm:text-sm font-bold animate-in fade-in slide-in-from-top-3 duration-200 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Sticky Header Banner */}
      <div className="sticky top-0 z-30 bg-white border-b-2 border-[#E2EEFC] px-3.5 sm:px-8 pt-3 pb-2.5 sm:py-4">
        <div className="max-w-6xl mx-auto w-full">
          {/* Header Row: Title & Subtitle + Burger Menu Button */}
          <div className="flex items-center justify-between gap-2.5 mb-2">
            <div className="flex items-center gap-2.5 min-w-0 flex-1">
              <InteractiveOwlAvatar
                lookDirection={lookDirection}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#EFF6FF] border-2 border-[#1677FF] border-b-[3px] border-b-[#0A4EA8] shrink-0 shadow-2xs"
              />
              <div className="min-w-0 flex-1">
                <h1 className="text-base sm:text-xl font-black text-[#0E2A54] leading-tight truncate">
                  Привет, {displayName}!
                </h1>
                <p className="text-[11px] sm:text-xs text-slate-400 font-semibold truncate">
                  Твои программы • СОВА — Сайт Образовательного Выбора Абитуриента
                </p>
              </div>
            </div>

            {/* Burger Menu Button on the very right end */}
            <button
              type="button"
              onClick={() => setIsSideMenuOpen(true)}
              className="w-10 h-10 rounded-2xl bg-white border-2 border-[#D3E2F4] border-b-[3px] border-b-[#BACEE5] hover:border-[#1677FF] hover:bg-[#EFF6FF] text-[#0E2E59] hover:text-[#1677FF] flex items-center justify-center cursor-pointer transition-all active:translate-y-[1px] shrink-0 shadow-2xs group"
              aria-label="Открыть меню профиля"
              title="Меню"
            >
              <Menu className="w-5 h-5 stroke-[2.5] group-hover:scale-105 transition-transform" />
            </button>
          </div>

          {/* Compact Stats Strip */}
          {profile.knowsScores ? (
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="bg-[#EFF6FF] border-2 border-[#BFDBFE] border-b-[3px] border-b-[#93C5FD] rounded-xl px-2.5 py-1.5 sm:px-3 sm:py-2 flex items-center justify-between min-w-0">
                <div className="flex flex-col min-w-0">
                  <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider text-[#1E40AF] truncate">
                    На бюджет
                  </span>
                  <span className="text-sm sm:text-base font-black text-[#1E3A8A] truncate">
                    {budgetCount} {budgetCount === 1 ? 'программа' : 'программ'}
                  </span>
                </div>
                <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0 ml-1 opacity-80" />
              </div>

              <div className="bg-[#F0FDF4] border-2 border-[#BBF7D0] border-b-[3px] border-b-[#86EFAC] rounded-xl px-2.5 py-1.5 sm:px-3 sm:py-2 flex items-center justify-between min-w-0">
                <div className="flex flex-col min-w-0">
                  <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider text-[#166534] truncate">
                    На коммерцию
                  </span>
                  <span className="text-sm sm:text-base font-black text-[#14532D] truncate">
                    {paidCount} {paidCount === 1 ? 'программа' : 'программ'}
                  </span>
                </div>
                <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 ml-1 opacity-80" />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="bg-[#EFF6FF] border-2 border-[#BFDBFE] border-b-[3px] border-b-[#93C5FD] rounded-xl px-2.5 py-1.5 sm:px-3 sm:py-2 flex items-center justify-between min-w-0">
                <div className="flex flex-col min-w-0">
                  <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider text-[#1E40AF] truncate">
                    В каталоге
                  </span>
                  <span className="text-sm sm:text-base font-black text-[#1E3A8A] truncate">
                    {filteredMatches.length} {filteredMatches.length === 1 ? 'программа' : 'программ'}
                  </span>
                </div>
                <Building2 className="w-4 h-4 text-[#2563EB] shrink-0 ml-1 opacity-80" />
              </div>

              <button
                type="button"
                onClick={onRetake}
                className="bg-[#FFFBEB] border-2 border-[#FDE68A] border-b-[3px] border-b-[#FCD34D] rounded-xl px-2.5 py-1.5 sm:px-3 sm:py-2 flex items-center justify-between min-w-0 text-left hover:bg-[#FEF3C7] active:translate-y-[1px] cursor-pointer transition-all"
              >
                <div className="flex flex-col min-w-0">
                  <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider text-[#92400E] truncate">
                    Баллы ЕГЭ
                  </span>
                  <span className="text-xs sm:text-sm font-black text-[#78350F] truncate">
                    Ввести для расчёта шансов →
                  </span>
                </div>
                <Sparkles className="w-4 h-4 text-[#D97706] shrink-0 ml-1 opacity-80" />
              </button>
            </div>
          )}

          {/* Search & Filters Section */}
          <div className="mt-2.5 flex flex-col gap-2">
            {/* Search input (full width) */}
            <div className="relative flex items-center bg-[#F1F5F9] border border-[#CADDF4] rounded-xl px-3 py-1.5 sm:py-2 w-full">
              <Search className="w-3.5 h-3.5 text-slate-400 mr-2 shrink-0" />
              <input
                type="text"
                placeholder="Поиск по названию, вузу, городу..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm font-semibold text-[#0E2E59] placeholder:text-slate-400 placeholder:font-normal focus:outline-none"
              />
            </div>

            {/* City & University Selectors ON THE SAME LINE */}
            <div className="grid grid-cols-2 gap-2 w-full">
              {/* City Selector */}
              <div className="relative flex items-center bg-[#F1F5F9] border border-[#CADDF4] rounded-xl px-2.5 py-1.5 min-w-0">
                <MapPin className="w-3.5 h-3.5 text-[#1677FF] mr-1.5 shrink-0" />
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full bg-transparent text-xs font-bold text-[#0E2E59] focus:outline-none cursor-pointer truncate pr-1"
                >
                  {CITIES_LIST.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              {/* University Selector */}
              <div className="relative flex items-center bg-[#F1F5F9] border border-[#CADDF4] rounded-xl px-2.5 py-1.5 min-w-0">
                <Building2 className="w-3.5 h-3.5 text-[#1677FF] mr-1.5 shrink-0" />
                <select
                  value={selectedUniversity}
                  onChange={(e) => setSelectedUniversity(e.target.value)}
                  className="w-full bg-transparent text-xs font-bold text-[#0E2E59] focus:outline-none cursor-pointer truncate pr-1"
                >
                  {universitiesList.map((uni) => (
                    <option key={uni} value={uni}>
                      {uni}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Filter Pills: ONE LINE ONLY, COMPACT */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 text-xs flex-nowrap">
              <button
                type="button"
                onClick={() => setFilterCategory('all')}
                className={`px-2.5 py-1 rounded-xl font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  filterCategory === 'all'
                    ? 'bg-[#1677FF] text-white border-b-2 border-[#0A4EA8]'
                    : 'bg-white text-slate-600 border border-[#D0E0F2]'
                }`}
              >
                Все ({allCategoryCount})
              </button>

              <button
                type="button"
                onClick={() => setFilterCategory('favorites')}
                className={`px-2.5 py-1 rounded-xl font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                  filterCategory === 'favorites'
                    ? 'bg-rose-500 text-white border-b-2 border-rose-700'
                    : 'bg-white text-slate-600 border border-[#D0E0F2] hover:text-rose-600'
                }`}
              >
                <Heart
                  className={`w-3.5 h-3.5 ${
                    filterCategory === 'favorites' ? 'fill-white stroke-white' : 'fill-rose-500 text-rose-500'
                  }`}
                />
                <span>Избранное ({favoritesCategoryCount})</span>
              </button>

              {profile.knowsScores && (
                <>
                  <button
                    type="button"
                    onClick={() => setFilterCategory('budget')}
                    className={`px-2.5 py-1 rounded-xl font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
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
                    className={`px-2.5 py-1 rounded-xl font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                      filterCategory === 'paid'
                        ? 'bg-[#1677FF] text-white border-b-2 border-[#0A4EA8]'
                        : 'bg-white text-slate-600 border border-[#D0E0F2]'
                    }`}
                  >
                    Коммерция ({paidCount})
                  </button>
                </>
              )}

              <button
                type="button"
                onClick={() => setFilterCategory('it')}
                className={`px-2.5 py-1 rounded-xl font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
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
      <div className="flex-1 p-3.5 sm:p-8 max-w-6xl mx-auto w-full">
        {filteredMatches.length === 0 ? (
          <div className="text-center py-12 bg-white border-2 border-dashed border-[#CADDF4] rounded-3xl p-6">
            {filterCategory === 'favorites' ? (
              <>
                <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-500 border border-rose-200 flex items-center justify-center mx-auto mb-3">
                  <Heart className="w-6 h-6 fill-rose-500 text-rose-500" />
                </div>
                <h3 className="text-lg font-bold text-[#0E2E59] mb-1">
                  {favoritesIds.length === 0 ? 'В избранном пока пусто' : 'Нет избранных программ по заданным фильтрам'}
                </h3>
                <p className="text-xs text-slate-400 mb-4 max-w-sm mx-auto">
                  {favoritesIds.length === 0
                    ? 'Нажимай на сердечко ❤️ на любой карточке программы, чтобы сохранить её и вернуться к ней в любой момент.'
                    : 'Попробуй сбросить город или поисковый запрос, чтобы увидеть все сохранённые программы.'}
                </p>
                <div className="flex justify-center gap-2">
                  <DuolingoButton
                    variant="primary"
                    onClick={() => {
                      setFilterCategory('all');
                      setSelectedCity('Все города');
                      setSelectedUniversity('Все вузы');
                      setSearchQuery('');
                    }}
                    className="!h-11"
                  >
                    Показать все программы
                  </DuolingoButton>
                </div>
              </>
            ) : (
              <>
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
              </>
            )}
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
                const isInComparison = comparisonIds.includes(program.id);

                return (
                  <div
                    key={program.id}
                    onClick={() => setActiveModalProgram(program)}
                    className="bg-white border-2 border-[#D3E2F4] border-b-[5px] border-b-[#BACEE5] hover:border-[#1677FF] hover:border-b-[#0A4EA8] rounded-2xl overflow-hidden flex flex-col justify-between cursor-pointer active:translate-y-[2px] transition-all group"
                  >
                    {/* Card Image Banner with Shadowed Gradient Background */}
                    <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-900">
                      <img
                        src={program.imageUrl}
                        alt={program.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.src =
                            'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800&auto=format&fit=crop';
                        }}
                      />
                      {/* Shadowed Gradient Background Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-black/25" />

                      {/* University & City Badges Overlaid at Top */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
                        <span className="px-2.5 py-1 rounded-xl bg-white/95 backdrop-blur-md text-[11px] font-black text-[#1677FF] truncate max-w-[55%]">
                          {program.university}
                        </span>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className="px-2.5 py-1 rounded-xl bg-black/50 backdrop-blur-md text-[11px] font-bold text-white flex items-center gap-1 border border-white/20">
                            <MapPin className="w-3 h-3 text-blue-300" />
                            {program.city}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => handleToggleFavorite(e, program.id)}
                            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl backdrop-blur-md flex items-center justify-center transition-all cursor-pointer active:scale-90 ${
                              favoritesIds.includes(program.id)
                                ? 'bg-rose-500 text-white shadow-sm border border-rose-400'
                                : 'bg-black/50 text-white/90 hover:bg-black/70 hover:text-rose-400 border border-white/20'
                            }`}
                            title={favoritesIds.includes(program.id) ? "Удалить из избранного" : "Добавить в избранное"}
                            aria-label={favoritesIds.includes(program.id) ? "Удалить из избранного" : "Добавить в избранное"}
                          >
                            <Heart
                              className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform ${
                                favoritesIds.includes(program.id) ? 'fill-white stroke-white scale-110' : 'stroke-[2.2]'
                              }`}
                            />
                          </button>
                        </div>
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
                      {!profile.knowsScores ? (
                        <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-xl px-3 py-2 flex items-center justify-between text-xs font-bold text-[#1E40AF]">
                          <div className="flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
                            <span>Проходные 2025</span>
                          </div>
                          <span className="text-[11px] font-extrabold">
                            Бюджет: {program.budgetPassingScore} · Платно: {program.paidPassingScore}
                          </span>
                        </div>
                      ) : missingSubjects.length > 0 ? (
                        <div className="bg-[#FEF2F2] border border-[#FECACA] rounded-xl px-3 py-2 flex items-center gap-2 text-xs font-bold text-[#991B1B]">
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          <span className="truncate">Нужно сдать: {missingSubjects.join(', ')}</span>
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

                      {/* Minimized Minimum Marks per Subject on Card */}
                      <div className="bg-[#F8FAFC] border border-[#E2EEFC] rounded-xl px-2.5 py-1.5 flex flex-wrap items-center gap-1.5 text-[11px]">
                        <span className="font-extrabold text-slate-400 uppercase text-[9px] tracking-wider shrink-0">
                          Мин. порог:
                        </span>
                        <div className="flex flex-wrap items-center gap-1">
                          {program.requiredSubjects.primary.map((subId) => {
                            const minVal = program.minSubjectScores[subId] ?? 60;
                            const subInfo = EGE_SUBJECTS.find((s) => s.id === subId);
                            const label = subInfo?.shortName || subId;
                            const userScore = profile.scores[subId];
                            const hasPassed =
                              profile.knowsScores && userScore !== undefined && userScore >= minVal;

                            return (
                              <span
                                key={subId}
                                className={`px-1.5 py-0.5 rounded-md font-bold text-[10px] border flex items-center gap-0.5 ${
                                  hasPassed
                                    ? 'bg-[#F0FDF4] border-[#86EFAC] text-[#166534]'
                                    : 'bg-white border-[#CADDF4] text-[#0E2E59]'
                                }`}
                              >
                                <span>{label}</span>
                                <span className="text-slate-400 font-normal">≥</span>
                                <span>{minVal}</span>
                              </span>
                            );
                          })}

                          {program.requiredSubjects.choice &&
                            program.requiredSubjects.choice.length > 0 &&
                            (() => {
                              const choiceLabels = program.requiredSubjects.choice
                                .map((id) => EGE_SUBJECTS.find((s) => s.id === id)?.shortName || id)
                                .join('/');
                              const firstChoiceId = program.requiredSubjects.choice[0];
                              const minVal = program.minSubjectScores[firstChoiceId] ?? 60;
                              const choiceScores = program.requiredSubjects.choice
                                .map((id) => profile.scores[id] || 0)
                                .filter((s) => s > 0);
                              const hasPassed =
                                profile.knowsScores &&
                                choiceScores.length > 0 &&
                                Math.max(...choiceScores) >= minVal;

                              return (
                                <span
                                  className={`px-1.5 py-0.5 rounded-md font-bold text-[10px] border flex items-center gap-0.5 ${
                                    hasPassed
                                      ? 'bg-[#F0FDF4] border-[#86EFAC] text-[#166534]'
                                      : 'bg-white border-[#CADDF4] text-[#0E2E59]'
                                  }`}
                                >
                                  <span>{choiceLabels}</span>
                                  <span className="text-slate-400 font-normal">≥</span>
                                  <span>{minVal}</span>
                                </span>
                              );
                            })()}
                        </div>
                      </div>

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

                      {/* Bottom Action Row: Compare Button + Details Link */}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-100 gap-2">
                        {/* Tactile Compare Button */}
                        <button
                          type="button"
                          onClick={(e) => handleToggle(e, program.id)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer select-none active:translate-y-[1px] ${
                            isInComparison
                              ? 'bg-[#EFF6FF] text-[#1677FF] border-2 border-[#1677FF] border-b-[3px] border-b-[#0A4EA8]'
                              : 'bg-white hover:bg-slate-50 text-slate-700 border-2 border-[#CADDF4] border-b-[3px] border-b-[#BACEE5] hover:border-[#1677FF]'
                          }`}
                        >
                          {isInComparison ? (
                            <>
                              <Check className="w-3.5 h-3.5 stroke-[3] text-[#1677FF]" />
                              <span>В сравнении</span>
                            </>
                          ) : (
                            <>
                              <ArrowLeftRight className="w-3.5 h-3.5 text-[#1677FF]" />
                              <span>Сравнить</span>
                            </>
                          )}
                        </button>

                        <span className="text-[#1677FF] font-bold text-xs flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                          Подробнее <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        )}
      </div>

      {/* Floating Compare Bar (when 1+ programs are selected) */}
      {comparisonIds.length > 0 && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-white/95 backdrop-blur-md border-2 border-[#1677FF] border-b-[4px] border-b-[#0A4EA8] rounded-2xl px-4 py-2.5 shadow-xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#1677FF] text-white flex items-center justify-center font-black text-xs">
              {comparisonIds.length}
            </div>
            <span className="text-xs font-bold text-[#0E2E59] hidden sm:inline">
              {comparisonIds.length === 1 ? '1 программа в сравнении' : `${comparisonIds.length} программы в сравнении`}
            </span>
          </div>

          <DuolingoButton
            onClick={onNavigateToComparison}
            className="!h-8 !px-3.5 !text-xs"
            icon={<ArrowLeftRight className="w-3.5 h-3.5" />}
          >
            Сравнить планы ({comparisonIds.length})
          </DuolingoButton>
        </div>
      )}

      {/* Program Detail Modal */}
      <ProgramDetailModal
        program={activeModalProgram}
        profile={profile}
        isFavorite={activeModalProgram ? favoritesIds.includes(activeModalProgram.id) : false}
        onToggleFavorite={(id) => {
          const res = toggleFavoriteId(id);
          setFavoritesIds(res.ids);
          showToast(res.isFavorite ? 'Программа добавлена в избранное ❤️' : 'Программа удалена из избранного');
        }}
        onClose={() => setActiveModalProgram(null)}
      />

      {/* Slide-over Side Menu */}
      <SideMenu
        isOpen={isSideMenuOpen}
        onClose={() => setIsSideMenuOpen(false)}
        profile={profile}
        comparisonCount={comparisonIds.length}
        onRetake={onRetake}
        onNavigateToComparison={onNavigateToComparison}
        onNavigateToSteps={onNavigateToSteps}
        onNavigateToFavorites={() => {
          setSelectedCity('Все города');
          setSelectedUniversity('Все вузы');
          setFilterCategory('favorites');
        }}
        onRestartOnboarding={onRestartOnboarding}
        onUpdateProfile={onUpdateProfile}
      />
    </div>
  );
};
