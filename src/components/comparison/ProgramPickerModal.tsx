import React, { useState, useMemo } from 'react';
import { UNIVERSITY_PROGRAMS, CITIES_LIST } from '../../data/programs';
import { DuolingoButton } from '../DuolingoButton';
import { X, Search, MapPin, Plus } from 'lucide-react';

interface ProgramPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProgram: (programId: string) => void;
  currentlySelectedIds: string[];
  replaceTargetId?: string | null;
}

export const ProgramPickerModal: React.FC<ProgramPickerModalProps> = ({
  isOpen,
  onClose,
  onSelectProgram,
  currentlySelectedIds,
  replaceTargetId,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<string>('Все города');

  const filteredPrograms = useMemo(() => {
    return UNIVERSITY_PROGRAMS.filter((p) => {
      // Exclude if already selected and not being replaced
      if (currentlySelectedIds.includes(p.id) && p.id !== replaceTargetId) {
        return false;
      }

      if (selectedCity !== 'Все города' && p.city !== selectedCity) {
        return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          p.title.toLowerCase().includes(q) ||
          p.university.toLowerCase().includes(q) ||
          p.faculty.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q)
        );
      }

      return true;
    });
  }, [currentlySelectedIds, replaceTargetId, selectedCity, searchQuery]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl border-2 border-[#CADDF4] border-b-[6px] border-b-[#A8C6EB] w-full max-w-xl max-h-[85vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b-2 border-[#E2EEFC] flex items-center justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-black text-[#0E2E59]">
              {replaceTargetId ? 'Заменить программу' : 'Добавить программу в сравнение'}
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Сравнение по дисциплинам официальных учебных планов от ВУЗов
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Filters */}
        <div className="p-3.5 sm:p-4 bg-slate-50 border-b border-slate-200 flex flex-col gap-2">
          <div className="relative flex items-center bg-white border border-[#CADDF4] rounded-xl px-3 py-2">
            <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
            <input
              type="text"
              placeholder="Поиск по вузу или программе..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-xs sm:text-sm font-semibold text-[#0E2E59] placeholder:text-slate-400 placeholder:font-normal focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs flex-nowrap">
            {CITIES_LIST.map((city) => (
              <button
                key={city}
                type="button"
                onClick={() => setSelectedCity(city)}
                className={`px-2.5 py-1 rounded-xl font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  selectedCity === city
                    ? 'bg-[#1677FF] text-white border-b-2 border-[#0A4EA8]'
                    : 'bg-white text-slate-600 border border-[#D0E0F2] hover:bg-slate-100'
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Programs List */}
        <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-2.5">
          {filteredPrograms.length === 0 ? (
            <div className="text-center py-10 text-slate-400 text-xs">
              Программы не найдены. Попробуйте изменить поисковый запрос или фильтр по городу.
            </div>
          ) : (
            filteredPrograms.map((p) => {
              const isCurrent = p.id === replaceTargetId;

              return (
                <div
                  key={p.id}
                  onClick={() => {
                    onSelectProgram(p.id);
                    onClose();
                  }}
                  className={`p-3 sm:p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isCurrent
                      ? 'bg-[#EFF6FF] border-[#1677FF] border-b-[4px] border-b-[#0A4EA8]'
                      : 'bg-white border-[#D3E2F4] border-b-[3px] border-b-[#BACEE5] hover:border-[#1677FF] hover:bg-[#F8FAFC]'
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-black uppercase text-[#1677FF] bg-[#EFF6FF] px-2 py-0.5 rounded-md border border-[#BFDBFE]">
                        {p.university}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-500 flex items-center gap-0.5">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {p.city}
                      </span>
                    </div>

                    <h4 className="font-extrabold text-sm text-[#0E2E59] truncate leading-tight">
                      {p.title}
                    </h4>
                    <span className="text-[11px] text-slate-400 line-clamp-1">
                      {p.faculty}
                    </span>
                  </div>

                  <div className="shrink-0">
                    <button
                      type="button"
                      className="px-3 py-1.5 rounded-xl bg-[#EFF6FF] hover:bg-[#1677FF] text-[#1677FF] hover:text-white border border-[#BFDBFE] font-bold text-xs flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Выбрать</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-slate-50 border-t border-slate-200 flex justify-end">
          <DuolingoButton variant="secondary" onClick={onClose} className="!h-10 !px-5 !text-xs">
            Отмена
          </DuolingoButton>
        </div>
      </div>
    </div>
  );
};
