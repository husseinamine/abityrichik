import React, { useState } from 'react';
import type { Program, UserProfile } from '../types/onboarding';
import { EGE_SUBJECTS } from '../data/programs';
import { DuolingoButton } from './DuolingoButton';
import {
  X,
  Heart,
  MessageCircle,
  MapPin,
  ExternalLink,
  Award,
  CreditCard,
  Trophy,
  Building2,
  BookOpen,
  ArrowRight,
} from 'lucide-react';

interface ProgramDetailModalProps {
  program: Program | null;
  profile?: UserProfile;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
  onClose: () => void;
}

export const ProgramDetailModal: React.FC<ProgramDetailModalProps> = ({
  program,
  profile,
  isFavorite = false,
  onToggleFavorite,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'about' | 'instructions' | 'campus'>('about');
  const [instructionSubTab, setInstructionSubTab] = useState<'scholarship' | 'paid' | 'other'>('scholarship');

  if (!program) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
      {/* Modal Container with Clean Duolingo Borders and Zero Fuzzy Shadows */}
      <div className="bg-white rounded-3xl border-2 border-[#CADDF4] border-b-[6px] border-b-[#A8C6EB] w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Modal Header with Image Cover & Shadowed Gradient Background */}
        <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-900 shrink-0">
          <img
            src={program.imageUrl}
            alt={program.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src =
                'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800&auto=format&fit=crop';
            }}
          />
          {/* Shadowed Gradient Background Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-900/50 to-black/30" />

          {/* Top Bar: Badges & Close Button */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-3 z-10">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-xl bg-white/95 backdrop-blur-md text-xs font-black text-[#1677FF]">
                {program.university}
              </span>
              <span className="px-2.5 py-1 rounded-xl bg-black/50 backdrop-blur-md text-xs font-bold text-white flex items-center gap-1 border border-white/20">
                <MapPin className="w-3.5 h-3.5 text-blue-300" />
                {program.city}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {onToggleFavorite && (
                <button
                  type="button"
                  onClick={() => onToggleFavorite(program.id)}
                  className={`w-9 h-9 rounded-xl backdrop-blur-md border flex items-center justify-center transition-all active:scale-90 cursor-pointer shrink-0 ${
                    isFavorite
                      ? 'bg-rose-500 text-white border-rose-400 shadow-sm'
                      : 'bg-white/90 text-slate-700 hover:text-rose-500 border-white/30 hover:bg-white'
                  }`}
                  title={isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
                  aria-label={isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
                >
                  <Heart
                    className={`w-4 h-4 transition-transform ${
                      isFavorite ? 'fill-white stroke-white scale-110' : 'stroke-[2.2]'
                    }`}
                  />
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="w-9 h-9 rounded-xl bg-white/90 backdrop-blur-md border border-white/30 flex items-center justify-center text-slate-800 hover:bg-white active:scale-95 cursor-pointer shrink-0"
                aria-label="Закрыть"
              >
                <X className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* Bottom Title & Faculty */}
          <div className="absolute bottom-4 left-4 right-4 z-10">
            <h2 className="text-xl sm:text-2xl font-black text-white leading-tight drop-shadow-md">
              {program.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 mt-0.5 font-medium drop-shadow-xs">
              {program.faculty}
            </p>
          </div>
        </div>

        {/* 3 Main Tabs Navigation */}
        <div className="flex border-b-2 border-[#E2EEFC] bg-white px-5 sm:px-6 gap-2 pt-2 shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('about')}
            className={`pb-3 px-3 font-bold text-sm sm:text-base border-b-2 transition-all cursor-pointer ${
              activeTab === 'about'
                ? 'border-[#1677FF] text-[#1677FF]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            О программе
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('instructions')}
            className={`pb-3 px-3 font-bold text-sm sm:text-base border-b-2 transition-all cursor-pointer ${
              activeTab === 'instructions'
                ? 'border-[#1677FF] text-[#1677FF]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Как поступить
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('campus')}
            className={`pb-3 px-3 font-bold text-sm sm:text-base border-b-2 transition-all cursor-pointer ${
              activeTab === 'campus'
                ? 'border-[#1677FF] text-[#1677FF]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Вуз и контакты
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* TAB 1: О ПРОГРАММЕ */}
          {activeTab === 'about' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              {/* Official University Program Page CTA */}
              <a
                href={program.officialProgramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between p-3.5 sm:p-4 bg-[#EFF6FF] border-2 border-[#1677FF] border-b-[4px] border-b-[#0A4EA8] rounded-2xl text-[#0E2E59] hover:bg-[#E0EFFF] active:translate-y-[1px] active:border-b-2 transition-all group select-none"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-[#1677FF] text-white flex items-center justify-center shrink-0">
                    <ExternalLink className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="font-extrabold text-sm sm:text-base text-[#0E2E59] block truncate">
                      Официальная страница программы на сайте вуза
                    </span>
                    <span className="text-xs text-[#1D4ED8] font-semibold truncate block">
                      Перейти на сайт университета →
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-[#1677FF] shrink-0 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>

              {/* Number of Places & Passing Scores (Moved to About Program tab) */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#355278] mb-2 flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-[#1677FF]" />
                  Количество мест и проходные баллы
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#EFF6FF] border-2 border-[#BFDBFE] border-b-[4px] border-b-[#93C5FD] rounded-2xl p-3.5 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] sm:text-[11px] font-extrabold uppercase text-[#1E40AF] block">
                        Бюджетных мест
                      </span>
                      <span className="text-2xl sm:text-3xl font-black text-[#1E3A8A] block mt-0.5">
                        {program.budgetPlaces}
                      </span>
                    </div>
                    <span className="text-xs text-slate-500 font-semibold mt-2 pt-2 border-t border-blue-100">
                      Проходной 2025: <b className="text-[#1E3A8A]">{program.budgetPassingScore}</b>
                    </span>
                  </div>

                  <div className="bg-[#F0FDF4] border-2 border-[#BBF7D0] border-b-[4px] border-b-[#86EFAC] rounded-2xl p-3.5 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] sm:text-[11px] font-extrabold uppercase text-[#166534] block">
                        Платных мест
                      </span>
                      <span className="text-2xl sm:text-3xl font-black text-[#14532D] block mt-0.5">
                        {program.paidPlaces}
                      </span>
                    </div>
                    <span className="text-xs text-slate-500 font-semibold mt-2 pt-2 border-t border-green-100">
                      Проходной 2025: <b className="text-[#14532D]">{program.paidPassingScore}</b>
                    </span>
                  </div>
                </div>
              </div>

              {/* Minimum Marks in Each Subject */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#355278] mb-2 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#1677FF]" />
                  Минимальные баллы ЕГЭ по предметам (для подачи документов)
                </h3>
                <div className="bg-[#F8FAFC] border-2 border-[#E2EEFC] rounded-2xl p-4">
                  <p className="text-xs text-slate-500 mb-3">
                    Пороговые баллы, установленные университетом. Документы принимаются только при достижении каждого порога:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {/* Primary subjects */}
                    {program.requiredSubjects.primary.map((subId) => {
                      const minVal = program.minSubjectScores[subId] ?? 60;
                      const subInfo = EGE_SUBJECTS.find((s) => s.id === subId);
                      const name = subInfo?.name || subId;
                      const userScore = profile?.scores[subId];
                      const meets = profile?.knowsScores && userScore !== undefined && userScore >= minVal;

                      return (
                        <div
                          key={subId}
                          className="bg-white border border-[#CADDF4] rounded-xl p-3 flex items-center justify-between"
                        >
                          <div className="min-w-0 pr-2">
                            <span className="font-bold text-xs sm:text-sm text-[#0E2E59] block truncate">
                              {name}
                            </span>
                            <span className="text-[11px] text-slate-400 font-medium">
                              Минимум: <strong className="text-[#0E2E59]">{minVal} баллов</strong>
                            </span>
                          </div>

                          {profile?.knowsScores && userScore !== undefined && (
                            <span
                              className={`px-2 py-1 rounded-lg text-xs font-black shrink-0 ${
                                meets
                                  ? 'bg-[#DCFCE7] text-[#166534] border border-[#86EFAC]'
                                  : 'bg-[#FEE2E2] text-[#991B1B] border border-[#FECACA]'
                              }`}
                            >
                              {userScore} {meets ? '✓' : '✗'}
                            </span>
                          )}
                        </div>
                      );
                    })}

                    {/* Choice subjects */}
                    {program.requiredSubjects.choice && program.requiredSubjects.choice.length > 0 && (
                      <div className="bg-white border border-[#CADDF4] rounded-xl p-3 flex items-center justify-between sm:col-span-2">
                        <div className="min-w-0 pr-2">
                          <span className="font-bold text-xs sm:text-sm text-[#0E2E59] block">
                            По выбору:{' '}
                            {program.requiredSubjects.choice
                              .map((id) => EGE_SUBJECTS.find((s) => s.id === id)?.name || id)
                              .join(' ИЛИ ')}
                          </span>
                          <span className="text-[11px] text-slate-400 font-medium">
                            Минимум:{' '}
                            <strong className="text-[#0E2E59]">
                              {program.minSubjectScores[program.requiredSubjects.choice[0]] ?? 60} баллов
                            </strong>
                          </span>
                        </div>

                        {profile?.knowsScores && (
                          (() => {
                            const choiceScores = program.requiredSubjects.choice
                              .map((id) => profile.scores[id] || 0)
                              .filter((score) => score > 0);
                            if (choiceScores.length === 0) return null;
                            const best = Math.max(...choiceScores);
                            const minVal = program.minSubjectScores[program.requiredSubjects.choice[0]] ?? 60;
                            const meets = best >= minVal;

                            return (
                              <span
                                className={`px-2 py-1 rounded-lg text-xs font-black shrink-0 ${
                                  meets
                                    ? 'bg-[#DCFCE7] text-[#166534] border border-[#86EFAC]'
                                    : 'bg-[#FEE2E2] text-[#991B1B] border border-[#FECACA]'
                                }`}
                              >
                                {best} {meets ? '✓' : '✗'}
                              </span>
                            );
                          })()
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#355278] mb-2 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-[#1677FF]" />
                  Описание программы
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-[#F8FAFC] border-2 border-[#E2EEFC] rounded-2xl p-4">
                  {program.description}
                </p>
              </div>

              {/* VK Chat Link Box */}
              <div className="bg-[#F0F7FF] border-2 border-[#BFDBFE] border-b-[4px] border-b-[#93C5FD] rounded-2xl p-4 sm:p-5">
                <div className="flex items-center gap-2.5 mb-2 text-[#0E2E59]">
                  <div className="w-9 h-9 rounded-xl bg-[#0077FF] text-white flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm sm:text-base text-[#0E2E59]">
                      Чат абитуриентов и студентов программы в VK
                    </h4>
                    <span className="text-xs text-[#1D4ED8] font-semibold">
                      Сообщество поступивших и поступающих 2026
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 mb-3 leading-relaxed">
                  {program.vkChatDescription}
                </p>

                <a
                  href={program.vkChatLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0077FF] hover:bg-[#0066DD] text-white font-bold text-xs sm:text-sm rounded-xl border-b-[3px] border-[#0055BB] active:translate-y-[2px] active:border-b-0 transition-all select-none"
                >
                  <span>Вступить в чат абитуриентов</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              {/* City & Living Info */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#355278] mb-2 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#1677FF]" />
                  О городе и студенческой жизни ({program.city})
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-[#F8FAFC] border-2 border-[#E2EEFC] rounded-2xl p-4">
                  {program.cityInfo}
                </p>
              </div>

              {/* Important Links */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#355278] mb-2 flex items-center gap-1.5">
                  <ExternalLink className="w-4 h-4 text-[#1677FF]" />
                  Важные ссылки о вузе и программе
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {program.importantLinks.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white border-2 border-[#CADDF4] border-b-[3px] border-b-[#A8C6EB] hover:bg-slate-50 rounded-xl flex items-center justify-between text-xs sm:text-sm font-bold text-[#0E2E59] active:translate-y-[1px] active:border-b-2 transition-all select-none"
                    >
                      <span className="truncate pr-2">{link.label}</span>
                      <ExternalLink className="w-4 h-4 text-slate-400 shrink-0" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: КАК ПОСТУПИТЬ (С 3 ПОДВКЛАДКАМИ) */}
          {activeTab === 'instructions' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              {/* Subtabs Navigation */}
              <div className="flex flex-wrap gap-2 border-b border-slate-100 pb-3">
                <button
                  type="button"
                  onClick={() => setInstructionSubTab('scholarship')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
                    instructionSubTab === 'scholarship'
                      ? 'bg-[#1677FF] text-white border-b-2 border-[#0A4EA8]'
                      : 'bg-[#F1F5F9] text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>Гранты и стипендии</span>
                </button>

                <button
                  type="button"
                  onClick={() => setInstructionSubTab('paid')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
                    instructionSubTab === 'paid'
                      ? 'bg-[#1677FF] text-white border-b-2 border-[#0A4EA8]'
                      : 'bg-[#F1F5F9] text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Платное обучение</span>
                </button>

                <button
                  type="button"
                  onClick={() => setInstructionSubTab('other')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
                    instructionSubTab === 'other'
                      ? 'bg-[#1677FF] text-white border-b-2 border-[#0A4EA8]'
                      : 'bg-[#F1F5F9] text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Trophy className="w-3.5 h-3.5" />
                  <span>Олимпиады и другие способы</span>
                </button>
              </div>

              {/* Subtab 1 Content: Scholarship */}
              {instructionSubTab === 'scholarship' && (
                <div className="border-2 border-dashed border-[#CADDF4] rounded-2xl p-6 text-center bg-[#F8FAFC]">
                  <Award className="w-10 h-10 text-[#1677FF] mx-auto mb-2 opacity-60" />
                  <h4 className="font-bold text-base text-[#0E2E59] mb-1">
                    Стипендии и гранты для программы
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                    Информация о повышенных академических стипендиях, именных грантах индустриальных партнёров и условиях их получения будет заполнена в ближайшее время.
                  </p>
                </div>
              )}

              {/* Subtab 2 Content: Paid */}
              {instructionSubTab === 'paid' && (
                <div className="border-2 border-dashed border-[#CADDF4] rounded-2xl p-6 text-center bg-[#F8FAFC]">
                  <CreditCard className="w-10 h-10 text-[#1677FF] mx-auto mb-2 opacity-60" />
                  <h4 className="font-bold text-base text-[#0E2E59] mb-1">
                    Условия платного обучения и скидки
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                    Информация о критериях скидок (25%, 50%, 70%), стоимости за семестр и льготном образовательном кредите с господдержкой (3%) будет добавлена в ближайшее время.
                  </p>
                </div>
              )}

              {/* Subtab 3 Content: Other ways & Competitions */}
              {instructionSubTab === 'other' && (
                <div className="border-2 border-dashed border-[#CADDF4] rounded-2xl p-6 text-center bg-[#F8FAFC]">
                  <Trophy className="w-10 h-10 text-[#1677FF] mx-auto mb-2 opacity-60" />
                  <h4 className="font-bold text-base text-[#0E2E59] mb-1">
                    Поступление по олимпиадам (БВИ) и квотам
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                    Перечень перечневых олимпиад РСОШ, дающих право поступления без вступительных испытаний (БВИ) или 100 баллов, а также целевой набор будут опубликованы здесь.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: ВУЗ И КОНТАКТЫ (Places moved to Tab 1) */}
          {activeTab === 'campus' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="bg-[#F8FAFC] border-2 border-[#E2EEFC] rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-2 text-[#0E2E59]">
                  <Building2 className="w-5 h-5 text-[#1677FF]" />
                  <h4 className="font-bold text-base">{program.university}</h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  Кампус: {program.campus || program.city}, {program.faculty}.
                </p>

                <div className="border-t border-slate-200 pt-3 flex flex-col gap-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Город расположения:</span>
                    <span className="font-bold text-[#0E2E59]">{program.city}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Официальный сайт программы:</span>
                    <a
                      href={program.officialProgramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-[#1677FF] hover:underline truncate max-w-[200px]"
                    >
                      {program.officialProgramUrl}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t-2 border-[#E2EEFC] flex justify-end">
          <DuolingoButton variant="secondary" onClick={onClose} className="!h-11 !px-6 text-sm">
            Закрыть
          </DuolingoButton>
        </div>
      </div>
    </div>
  );
};
