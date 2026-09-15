import type { UserProfile } from '../types/onboarding';

const STORAGE_KEY = 'russia_uni_aggregator_user_profile';

export const DEFAULT_PROFILE: UserProfile = {
  name: '',
  preferredCity: 'Все города',
  selectedSubjects: ['russian', 'math'],
  scores: {
    russian: 85,
    math: 80,
  },
  achievements: 0,
  creativeExam: {
    taking: false,
    score: 80,
  },
};

export function loadUserProfile(): UserProfile | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object') {
      return {
        ...DEFAULT_PROFILE,
        ...parsed,
      };
    }
  } catch (e) {
    console.error('Failed to load user profile from storage', e);
  }
  return null;
}

export function saveUserProfile(profile: UserProfile): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch (e) {
    console.error('Failed to save user profile to storage', e);
  }
}

export function clearUserProfile(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Failed to clear user profile from storage', e);
  }
}
