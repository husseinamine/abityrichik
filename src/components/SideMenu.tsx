import React, { useState, useEffect } from "react";
import type { UserProfile } from "../types/onboarding";
import { CITIES_LIST, UNIVERSITY_PROGRAMS } from "../data/programs";
import { AcademicOwl } from "./AcademicOwl";
import { InteractiveOwlAvatar } from "./InteractiveOwlAvatar";
import { loadFavoritesIds, removeFavoriteId } from "../utils/favoritesStorage";
import {
  X,
  User,
  Heart,
  Trash2,
  GraduationCap,
  ArrowLeftRight,
  Sparkles,
  ExternalLink,
  RotateCcw,
  MapPin,
  Check,
  AlertTriangle,
  ChevronRight,
} from "lucide-react";

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  comparisonCount: number;
  onRetake: () => void;
  onNavigateToComparison: () => void;
  onNavigateToSteps: () => void;
  onNavigateToFavorites?: () => void;
  onRestartOnboarding?: () => void;
  onUpdateProfile?: (updated: Partial<UserProfile>) => void;
}

export const SideMenu: React.FC<SideMenuProps> = ({
  isOpen,
  onClose,
  profile,
  comparisonCount,
  onRetake,
  onNavigateToComparison,
  onNavigateToSteps,
  onNavigateToFavorites,
  onRestartOnboarding,
  onUpdateProfile,
}) => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isLinksModalOpen, setIsLinksModalOpen] = useState(false);
  const [isRestartConfirmOpen, setIsRestartConfirmOpen] = useState(false);
  const [isFavoritesModalOpen, setIsFavoritesModalOpen] = useState(false);
  const [favoritesIds, setFavoritesIds] = useState<string[]>(() => loadFavoritesIds());

  // Listen to favorites updates
  useEffect(() => {
    const handleSync = (e: Event) => {
      const customEvent = e as CustomEvent<string[]>;
      if (customEvent.detail && Array.isArray(customEvent.detail)) {
        setFavoritesIds(customEvent.detail);
      } else {
        setFavoritesIds(loadFavoritesIds());
      }
    };
    window.addEventListener("favorites_updated", handleSync);
    return () => window.removeEventListener("favorites_updated", handleSync);
  }, []);

  // Profile form state inside modal
  const [editName, setEditName] = useState(profile.name);
  const [editCity, setEditCity] = useState(profile.preferredCity || "Все города");
  const [profileSavedToast, setProfileSavedToast] = useState(false);

  const displayName = profile.name.trim() || "Абитуриент";

  // Favorite program objects
  const favoritePrograms = UNIVERSITY_PROGRAMS.filter((p) => favoritesIds.includes(p.id));

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isProfileModalOpen) {
          setIsProfileModalOpen(false);
        } else if (isLinksModalOpen) {
          setIsLinksModalOpen(false);
        } else if (isRestartConfirmOpen) {
          setIsRestartConfirmOpen(false);
        } else if (isFavoritesModalOpen) {
          setIsFavoritesModalOpen(false);
        } else {
          onClose();
        }
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isProfileModalOpen, isLinksModalOpen, isRestartConfirmOpen, isFavoritesModalOpen, onClose]);

  if (!isOpen) return null;

  const handleSaveProfile = () => {
    if (onUpdateProfile) {
      onUpdateProfile({
        name: editName.trim(),
        preferredCity: editCity,
      });
    }
    setProfileSavedToast(true);
    setTimeout(() => setProfileSavedToast(false), 2000);
  };

  const handleConfirmRestart = () => {
    setIsRestartConfirmOpen(false);
    onClose();
    if (onRestartOnboarding) {
      onRestartOnboarding();
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Darkened Backdrop Overlay */}
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        />

        {/* Slide-over Drawer Panel */}
        <div className="relative w-full max-w-[340px] sm:max-w-[380px] bg-white h-full shadow-2xl flex flex-col justify-between z-10 border-l-2 border-[#E2EEFC] animate-in slide-in-from-right duration-250">
          <div className="flex-1 overflow-y-auto">
            {/* Header with User Info & Close Button */}
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5 min-w-0">
                <InteractiveOwlAvatar
                  lookDirection="neutral"
                  className="w-10 h-10 rounded-2xl bg-[#EFF6FF] border-2 border-[#1677FF] border-b-[3px] border-b-[#0A4EA8] shrink-0 shadow-2xs"
                />
                <div className="min-w-0">
                  <h3 className="font-black text-sm sm:text-base text-[#0E2E59] truncate leading-tight">
                    Привет, {displayName}!
                  </h3>
                  <span className="text-[11px] text-slate-400 font-semibold flex items-center gap-1 truncate mt-0.5">
                    <MapPin className="w-3 h-3 text-slate-300 shrink-0" />
                    {profile.preferredCity || "Все города"}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer transition-colors shrink-0"
                aria-label="Закрыть меню"
              >
                <X className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>

            {/* Menu Items List as strictly requested */}
            <div className="p-3.5 sm:p-4 space-y-2">
              {/* 1. Личный кабинет */}
              <button
                type="button"
                onClick={() => {
                  setEditName(profile.name);
                  setEditCity(profile.preferredCity || "Все города");
                  setIsProfileModalOpen(true);
                }}
                className="w-full p-3 rounded-2xl bg-white hover:bg-[#EFF6FF] border-2 border-slate-200 hover:border-[#1677FF] border-b-[3px] border-b-slate-300 hover:border-b-[#0A4EA8] text-slate-700 hover:text-[#0E2E59] font-bold text-xs sm:text-sm flex items-center gap-3 transition-all cursor-pointer text-left group active:translate-y-[1px]"
              >
                <div className="w-8 h-8 rounded-xl bg-[#EFF6FF] text-[#1677FF] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <User className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="font-black block text-[#0E2E59] leading-tight">Личный кабинет</span>
                  <span className="text-[11px] text-slate-400 font-medium truncate block mt-0.5">Имя и город</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#1677FF] transition-colors" />
              </button>

              {/* 2. Избранное */}
              <button
                type="button"
                onClick={() => setIsFavoritesModalOpen(true)}
                className="w-full p-3 rounded-2xl bg-white hover:bg-[#EFF6FF] border-2 border-slate-200 hover:border-[#1677FF] border-b-[3px] border-b-slate-300 hover:border-b-[#0A4EA8] text-slate-700 hover:text-[#0E2E59] font-bold text-xs sm:text-sm flex items-center gap-3 transition-all cursor-pointer text-left group active:translate-y-[1px]"
              >
                <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="font-black block text-[#0E2E59] leading-tight">Избранное</span>
                  <span className="text-[11px] text-slate-400 font-medium truncate block mt-0.5">Сохранённые программы</span>
                </div>
                {favoritesIds.length > 0 ? (
                  <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-black">
                    {favoritesIds.length}
                  </span>
                ) : (
                  <span className="text-[11px] text-slate-400 font-bold">0</span>
                )}
              </button>

              {/* 3. Этапы поступления от Совы */}
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onNavigateToSteps();
                }}
                className="w-full p-3 rounded-2xl bg-white hover:bg-[#EFF6FF] border-2 border-slate-200 hover:border-[#1677FF] border-b-[3px] border-b-slate-300 hover:border-b-[#0A4EA8] text-slate-700 hover:text-[#0E2E59] font-bold text-xs sm:text-sm flex items-center gap-3 transition-all cursor-pointer text-left group active:translate-y-[1px]"
              >
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#1677FF] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="font-black block text-[#0E2E59] leading-tight">Этапы поступления от Совы</span>
                  <span className="text-[11px] text-slate-400 font-medium truncate block mt-0.5">Гид по приёму в вузы РФ</span>
                </div>
                <span className="text-[10px] font-black bg-[#EFF6FF] text-[#1677FF] px-2 py-0.5 rounded-md border border-[#BFDBFE]">
                  Гид
                </span>
              </button>

              {/* 3. Сравнить программы */}
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onNavigateToComparison();
                }}
                className="w-full p-3 rounded-2xl bg-white hover:bg-[#EFF6FF] border-2 border-slate-200 hover:border-[#1677FF] border-b-[3px] border-b-slate-300 hover:border-b-[#0A4EA8] text-slate-700 hover:text-[#0E2E59] font-bold text-xs sm:text-sm flex items-center gap-3 transition-all cursor-pointer text-left group active:translate-y-[1px]"
              >
                <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <ArrowLeftRight className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="font-black block text-[#0E2E59] leading-tight">Сравнить программы</span>
                  <span className="text-[11px] text-slate-400 font-medium truncate block mt-0.5">По учебным планам</span>
                </div>
                {comparisonCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-[#1677FF] text-white text-[10px] font-black flex items-center justify-center">
                    {comparisonCount}
                  </span>
                )}
              </button>

              {/* 4. Изменить баллы ЕГЭ */}
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onRetake();
                }}
                className="w-full p-3 rounded-2xl bg-white hover:bg-[#EFF6FF] border-2 border-slate-200 hover:border-[#1677FF] border-b-[3px] border-b-slate-300 hover:border-b-[#0A4EA8] text-slate-700 hover:text-[#0E2E59] font-bold text-xs sm:text-sm flex items-center gap-3 transition-all cursor-pointer text-left group active:translate-y-[1px]"
              >
                <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="font-black block text-[#0E2E59] leading-tight">Изменить баллы ЕГЭ</span>
                  <span className="text-[11px] text-slate-400 font-medium truncate block mt-0.5">Предметы и достижения</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#1677FF] transition-colors" />
              </button>

              {/* 5. Полезные ссылки */}
              <button
                type="button"
                onClick={() => setIsLinksModalOpen(true)}
                className="w-full p-3 rounded-2xl bg-white hover:bg-[#EFF6FF] border-2 border-slate-200 hover:border-[#1677FF] border-b-[3px] border-b-slate-300 hover:border-b-[#0A4EA8] text-slate-700 hover:text-[#0E2E59] font-bold text-xs sm:text-sm flex items-center gap-3 transition-all cursor-pointer text-left group active:translate-y-[1px]"
              >
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <ExternalLink className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="font-black block text-[#0E2E59] leading-tight">Полезные ссылки</span>
                  <span className="text-[11px] text-slate-400 font-medium truncate block mt-0.5">Госуслуги, Минобрнауки</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#1677FF] transition-colors" />
              </button>

              {/* 6. Начать сначала */}
              <button
                type="button"
                onClick={() => setIsRestartConfirmOpen(true)}
                className="w-full p-3 rounded-2xl bg-white hover:bg-red-50/60 border-2 border-slate-200 hover:border-red-300 border-b-[3px] border-b-slate-300 hover:border-b-red-400 text-slate-700 hover:text-red-700 font-bold text-xs sm:text-sm flex items-center gap-3 transition-all cursor-pointer text-left group active:translate-y-[1px]"
              >
                <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-500 group-hover:bg-red-100 group-hover:text-red-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <RotateCcw className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="font-black block text-[#0E2E59] group-hover:text-red-700 leading-tight">Начать сначала</span>
                  <span className="text-[11px] text-slate-400 font-medium truncate block mt-0.5">Сбросить профиль</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-red-500 transition-colors" />
              </button>
            </div>
          </div>

          {/* Bottom section: "Есть идеи? Свяжитесь с нами" and non-clickable email link */}
          <div className="p-4 border-t border-slate-100 bg-[#F8FAFC] space-y-2">
            <div className="space-y-0.5">
              <span className="text-xs font-black text-[#0E2E59] block">
                Есть идеи? Свяжитесь с нами
              </span>
              <span className="text-xs text-slate-400 font-semibold select-all pointer-events-none cursor-default block">
                contact@uni-aggregator.ru
              </span>
            </div>

            <p className="text-[10px] text-slate-400 font-semibold pt-1">
              СОВА — Сайт Образовательного Выбора Абитуриента
            </p>
          </div>
        </div>
      </div>

      {/* Modal 1: Личный кабинет */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
          <div
            onClick={() => setIsProfileModalOpen(false)}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity animate-in fade-in"
          />

          <div className="relative w-full max-w-md bg-white rounded-3xl border-2 border-[#1677FF] border-b-[5px] border-b-[#0A4EA8] shadow-2xl p-5 sm:p-6 z-10 animate-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => setIsProfileModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer transition-colors"
            >
              <X className="w-4 h-4 stroke-[2.5]" />
            </button>

            <div className="flex items-center gap-3 mb-5 pb-3 border-b border-slate-100">
              <AcademicOwl variant="compact" size="sm" />
              <div>
                <h3 className="text-lg font-black text-[#0E2E59]">Личный кабинет</h3>
                <p className="text-xs text-slate-400 font-semibold">Настройки профиля абитуриента</p>
              </div>
            </div>

            {profileSavedToast && (
              <div className="mb-4 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Изменения успешно сохранены!</span>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="text-xs font-black text-slate-700 block mb-1">
                  Твоё имя:
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="Как к тебе обращаться"
                  className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-200 focus:border-[#1677FF] focus:outline-hidden text-sm font-bold text-[#0E2E59] transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-black text-slate-700 block mb-1">
                  Предпочитаемый город:
                </label>
                <select
                  value={editCity}
                  onChange={(e) => setEditCity(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-200 focus:border-[#1677FF] focus:outline-hidden text-sm font-bold text-[#0E2E59] transition-colors bg-white cursor-pointer"
                >
                  {CITIES_LIST.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between">
                <div>
                  <span className="font-bold text-[#0E2E59] block">Баллы ЕГЭ</span>
                  <span className="text-slate-400 text-[11px]">
                    {profile.knowsScores ? "Баллы внесены в профиль" : "Баллы ещё не указаны"}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsProfileModalOpen(false);
                    onClose();
                    onRetake();
                  }}
                  className="px-2.5 py-1 rounded-lg bg-[#EFF6FF] text-[#1677FF] border border-[#BFDBFE] font-black text-xs hover:bg-[#DBEAFE] transition-colors cursor-pointer"
                >
                  {profile.knowsScores ? "Изменить" : "Ввести"}
                </button>
              </div>
            </div>

            <div className="mt-6 flex gap-2.5">
              <button
                type="button"
                onClick={() => setIsProfileModalOpen(false)}
                className="flex-1 h-10 rounded-xl border-2 border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-xs cursor-pointer"
              >
                Закрыть
              </button>
              <button
                type="button"
                onClick={handleSaveProfile}
                className="flex-1 h-10 rounded-xl bg-[#1677FF] hover:bg-[#156FE6] text-white font-black text-xs border-b-[3px] border-b-[#0A4EA8] active:translate-y-[1px] transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>Сохранить</span>
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 2: Полезные ссылки */}
      {isLinksModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
          <div
            onClick={() => setIsLinksModalOpen(false)}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity animate-in fade-in"
          />

          <div className="relative w-full max-w-lg bg-white rounded-3xl border-2 border-[#1677FF] border-b-[5px] border-b-[#0A4EA8] shadow-2xl p-5 sm:p-6 z-10 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setIsLinksModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer transition-colors"
            >
              <X className="w-4 h-4 stroke-[2.5]" />
            </button>

            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center">
                <ExternalLink className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-lg font-black text-[#0E2E59]">Полезные ссылки</h3>
                <p className="text-xs text-slate-400 font-semibold">Официальные государственные порталы</p>
              </div>
            </div>

            <div className="space-y-2.5">
              {[
                {
                  title: "Суперсервис «Поступление в вуз онлайн»",
                  desc: "Подача заявлений на Госуслугах и электронная подача оригинала",
                  url: "https://www.gosuslugi.ru/vuzonline",
                  badge: "Госуслуги",
                },
                {
                  title: "Министерство науки и высшего образования РФ",
                  desc: "Официальные приказы, порядок приёма и нормативная база",
                  url: "https://minobrnauki.gov.ru",
                  badge: "Минобрнауки",
                },
                {
                  title: "Платформа «Работа в России»",
                  desc: "Предложения работодателей по целевому обучению 2026",
                  url: "https://trudvsem.ru",
                  badge: "Целевое обучение",
                },
                {
                  title: "ФИПИ (Федеральный институт измерений)",
                  desc: "Демоверсии, спецификации и открытый банк заданий ЕГЭ",
                  url: "https://fipi.ru",
                  badge: "ЕГЭ",
                },
                {
                  title: "Официальный информационный портал ЕГЭ",
                  desc: "Расписание экзаменов и проверка официальных результатов",
                  url: "https://checkege.rustest.ru",
                  badge: "Результаты",
                },
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-2xl bg-[#F8FAFC] hover:bg-[#EFF6FF] border border-slate-200 hover:border-[#1677FF] transition-all flex items-center justify-between gap-3 text-xs group"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="font-black text-[#0E2E59] group-hover:text-[#1677FF] transition-colors truncate">
                        {item.title}
                      </span>
                      <span className="text-[10px] font-black bg-white px-2 py-0.5 rounded-md border border-slate-200 text-slate-500 shrink-0">
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-snug">{item.desc}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#1677FF] transition-colors shrink-0" />
                </a>
              ))}
            </div>

            <div className="mt-5">
              <button
                type="button"
                onClick={() => setIsLinksModalOpen(false)}
                className="w-full h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer transition-colors"
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 3: Подтверждение «Начать сначала» */}
      {isRestartConfirmOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
          <div
            onClick={() => setIsRestartConfirmOpen(false)}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity animate-in fade-in"
          />

          <div className="relative w-full max-w-sm bg-white rounded-3xl border-2 border-red-300 border-b-[5px] border-b-red-400 shadow-2xl p-5 sm:p-6 z-10 animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-500 border border-red-200 flex items-center justify-center mx-auto mb-3">
              <AlertTriangle className="w-6 h-6 stroke-[2.5]" />
            </div>

            <h3 className="text-center text-lg font-black text-[#0E2E59] mb-1">
              Начать сначала?
            </h3>
            <p className="text-center text-xs text-slate-500 leading-relaxed mb-5">
              Все введённые баллы ЕГЭ, избранные программы, списки сравнения и настройки профиля будут полностью сброшены.
            </p>

            <div className="flex gap-2.5">
              <button
                type="button"
                onClick={() => setIsRestartConfirmOpen(false)}
                className="flex-1 h-10 rounded-xl border-2 border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-xs cursor-pointer"
              >
                Отмена
              </button>
              <button
                type="button"
                onClick={handleConfirmRestart}
                className="flex-1 h-10 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs border-b-[3px] border-b-red-800 active:translate-y-[1px] transition-all cursor-pointer shadow-sm"
              >
                Сбросить
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 4: Избранные программы */}
      {isFavoritesModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
          <div
            onClick={() => setIsFavoritesModalOpen(false)}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity animate-in fade-in"
          />

          <div className="relative w-full max-w-md bg-white rounded-3xl border-2 border-[#1677FF] border-b-[5px] border-b-[#0A4EA8] shadow-2xl p-5 sm:p-6 z-10 animate-in zoom-in-95 duration-200 max-h-[88vh] flex flex-col">
            <button
              type="button"
              onClick={() => setIsFavoritesModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer transition-colors"
              aria-label="Закрыть"
            >
              <X className="w-4 h-4 stroke-[2.5]" />
            </button>

            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100 shrink-0">
              <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-500 border border-rose-200 flex items-center justify-center shrink-0">
                <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
              </div>
              <div>
                <h3 className="text-lg font-black text-[#0E2E59]">
                  Избранное ({favoritesIds.length})
                </h3>
                <p className="text-xs text-slate-400 font-semibold">
                  Твои сохранённые образовательные программы
                </p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2.5 pr-0.5">
              {favoritePrograms.length === 0 ? (
                <div className="text-center py-8 px-4 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl">
                  <AcademicOwl variant="reading" size="sm" className="mx-auto mb-2" />
                  <h4 className="font-extrabold text-sm text-[#0E2E59] mb-1">
                    В избранном пока пусто
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">
                    Нажимай на сердечко ❤️ на карточке любой программы в каталоге, чтобы сохранить её сюда!
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsFavoritesModalOpen(false);
                      onClose();
                    }}
                    className="px-4 py-2 rounded-xl bg-[#1677FF] text-white font-black text-xs border-b-2 border-[#0A4EA8] cursor-pointer"
                  >
                    Перейти к программам
                  </button>
                </div>
              ) : (
                favoritePrograms.map((prog) => (
                  <div
                    key={prog.id}
                    className="p-3 rounded-2xl bg-[#F8FAFC] border-2 border-slate-200 hover:border-[#1677FF] flex items-center justify-between gap-3 transition-all group"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="px-2 py-0.5 rounded-md bg-white border border-[#BFDBFE] text-[#1677FF] font-black text-[10px]">
                          {prog.university}
                        </span>
                        <span className="text-[10px] text-slate-400 font-bold">
                          • {prog.city}
                        </span>
                      </div>
                      <h5 className="font-bold text-xs sm:text-sm text-[#0E2E59] truncate">
                        {prog.title}
                      </h5>
                      <span className="text-[11px] text-slate-500 font-medium block truncate">
                        Бюджет: {prog.budgetPassingScore} б. · Мест: {prog.budgetPlaces}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFavoriteId(prog.id)}
                      className="w-8 h-8 rounded-xl bg-white border border-slate-200 hover:bg-rose-50 hover:border-rose-300 hover:text-rose-600 text-slate-400 flex items-center justify-center cursor-pointer transition-colors shrink-0"
                      title="Удалить из избранного"
                      aria-label="Удалить из избранного"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {favoritePrograms.length > 0 && onNavigateToFavorites && (
              <div className="pt-3 mt-3 border-t border-slate-100 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setIsFavoritesModalOpen(false);
                    onClose();
                    onNavigateToFavorites();
                  }}
                  className="w-full py-2.5 rounded-xl bg-[#1677FF] hover:bg-[#156FE6] text-white font-black text-xs border-b-[3px] border-b-[#0A4EA8] active:translate-y-[1px] transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Heart className="w-3.5 h-3.5 fill-white" />
                  <span>Показать все в каталоге</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
