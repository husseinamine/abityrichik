const FAVORITES_STORAGE_KEY = 'sova_favorites_ids';

export function loadFavoritesIds(): string[] {
  try {
    const raw = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.filter((id) => typeof id === 'string');
    }
  } catch (e) {
    console.error('Failed to load favorites from localStorage', e);
  }
  return [];
}

export function saveFavoritesIds(ids: string[]): void {
  try {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(ids));
    window.dispatchEvent(new CustomEvent('favorites_updated', { detail: ids }));
  } catch (e) {
    console.error('Failed to save favorites to localStorage', e);
  }
}

export function toggleFavoriteId(id: string): {
  isFavorite: boolean;
  ids: string[];
} {
  const current = loadFavoritesIds();
  const exists = current.includes(id);
  const next = exists ? current.filter((item) => item !== id) : [...current, id];
  saveFavoritesIds(next);
  return { isFavorite: !exists, ids: next };
}

export function removeFavoriteId(id: string): string[] {
  const current = loadFavoritesIds();
  const next = current.filter((item) => item !== id);
  saveFavoritesIds(next);
  return next;
}

export function clearFavorites(): void {
  saveFavoritesIds([]);
}
