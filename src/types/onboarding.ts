export type SubjectId =
  | 'russian'
  | 'math'
  | 'cs'
  | 'physics'
  | 'social'
  | 'history'
  | 'biology'
  | 'foreign'
  | 'literature';

export interface SubjectInfo {
  id: SubjectId;
  name: string;
  shortName?: string;
  defaultRequired?: boolean;
}

export interface UserProfile {
  name: string;
  preferredCity: string; // e.g. 'Москва', 'Санкт-Петербург', 'Нижний Новгород', 'Все города'
  selectedSubjects: SubjectId[];
  scores: Partial<Record<SubjectId, number>>;
  achievements: number; // 0 - 10
  creativeExam: {
    taking: boolean;
    score: number; // 0 - 100
  };
}

export interface ImportantLink {
  label: string;
  url: string;
}

export interface Program {
  id: string;
  title: string;
  university: string;
  campus?: string;
  city: string;
  faculty: string;
  budgetPassingScore: number;
  paidPassingScore: number;
  budgetPlaces: number;
  paidPlaces: number;
  requiredSubjects: {
    primary: SubjectId[];
    choice?: SubjectId[];
  };
  requiresCreativeExam?: boolean;
  tags: string[];
  description: string;
  vkChatLink: string;
  vkChatDescription: string;
  cityInfo: string;
  importantLinks: ImportantLink[];
}

export interface ProgramMatchResult {
  program: Program;
  userTotalScore: number;
  isEligible: boolean;
  qualifiesBudget: boolean;
  qualifiesPaid: boolean;
  missingSubjects: string[];
  pointsToBudget: number;
}
