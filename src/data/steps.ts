export interface OnboardingStep {
  id: number;
  speechText: string[];
  mascotPose?: 'wave' | 'happy' | 'thinking';
  backLabel?: string;
  nextLabel?: string;
}

export const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: 1,
    speechText: ['Привет!', 'я X.'],
    mascotPose: 'wave',
    backLabel: 'Назад',
    nextLabel: 'Далее',
  },
  {
    id: 2,
    speechText: ['Я помогу тебе', 'быстро во всем', 'разобраться.'],
    mascotPose: 'happy',
    backLabel: 'Назад',
    nextLabel: 'Далее',
  },
  {
    id: 3,
    speechText: ['Все просто', 'и понятно', 'с первых минут!'],
    mascotPose: 'wave',
    backLabel: 'Назад',
    nextLabel: 'Далее',
  },
  {
    id: 4,
    speechText: ['Остался всего', 'один шаг.'],
    mascotPose: 'thinking',
    backLabel: 'Назад',
    nextLabel: 'Далее',
  },
  {
    id: 5,
    speechText: ['Отлично!', 'Поехали 🚀'],
    mascotPose: 'happy',
    backLabel: 'Назад',
    nextLabel: 'Начать',
  },
];
