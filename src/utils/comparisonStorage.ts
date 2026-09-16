const COMPARISON_STORAGE_KEY = 'russia_uni_aggregator_comparison_ids';
export const MAX_COMPARISON_COUNT = 4;

export function loadComparisonIds(): string[] {
  try {
    const raw = localStorage.getItem(COMPARISON_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.filter((id) => typeof id === 'string');
    }
  } catch (e) {
    console.error('Failed to load comparison IDs from localStorage', e);
  }
  return [];
}

export function saveComparisonIds(ids: string[]): void {
  try {
    localStorage.setItem(COMPARISON_STORAGE_KEY, JSON.stringify(ids));
    window.dispatchEvent(new CustomEvent('comparison_updated', { detail: ids }));
  } catch (e) {
    console.error('Failed to save comparison IDs to localStorage', e);
  }
}

export function toggleComparisonId(id: string): {
  added: boolean;
  ids: string[];
  error?: string;
} {
  const current = loadComparisonIds();
  const exists = current.includes(id);

  if (exists) {
    const next = current.filter((item) => item !== id);
    saveComparisonIds(next);
    return { added: false, ids: next };
  } else {
    if (current.length >= MAX_COMPARISON_COUNT) {
      return {
        added: false,
        ids: current,
        error: `Максимум ${MAX_COMPARISON_COUNT} программы для сравнения. Удалите одну из выбранных, чтобы добавить новую.`,
      };
    }
    const next = [...current, id];
    saveComparisonIds(next);
    return { added: true, ids: next };
  }
}

export function removeComparisonId(id: string): string[] {
  const current = loadComparisonIds();
  const next = current.filter((item) => item !== id);
  saveComparisonIds(next);
  return next;
}

export function replaceComparisonId(oldId: string, newId: string): string[] {
  const current = loadComparisonIds();
  const next = current.map((item) => (item === oldId ? newId : item));
  saveComparisonIds(next);
  return next;
}

export function clearComparison(): void {
  saveComparisonIds([]);
}
