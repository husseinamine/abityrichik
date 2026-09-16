import type {
  DisciplineCategory,
  ProgramCurriculumStats,
  CategorySummary,
  CourseSummary,
  ComparisonInsight,
} from '../types/comparison';
import { STUDY_PLANS, CATEGORY_METAS } from '../data/studyPlans';

export function getProgramCurriculumStats(programId: string): ProgramCurriculumStats | null {
  const plan = STUDY_PLANS[programId];
  if (!plan) return null;

  const allCategories = Object.keys(CATEGORY_METAS) as DisciplineCategory[];

  const categories = allCategories.reduce((acc, catId) => {
    const meta = CATEGORY_METAS[catId];
    const catDisciplines = plan.disciplines.filter((d) => d.normalizedCategory === catId);
    const credits = catDisciplines.reduce((sum, d) => sum + d.credits, 0);
    const academicHours = catDisciplines.reduce((sum, d) => sum + d.academicHours, 0);
    const percentage = plan.totalCredits > 0 ? Math.round((credits / plan.totalCredits) * 100) : 0;

    acc[catId] = {
      category: catId,
      meta,
      credits,
      academicHours,
      percentage,
      disciplines: catDisciplines,
    };
    return acc;
  }, {} as Record<DisciplineCategory, CategorySummary>);

  const courses: Record<1 | 2 | 3 | 4, CourseSummary> = {
    1: { course: 1, totalCredits: 0, disciplines: [] },
    2: { course: 2, totalCredits: 0, disciplines: [] },
    3: { course: 3, totalCredits: 0, disciplines: [] },
    4: { course: 4, totalCredits: 0, disciplines: [] },
  };

  plan.disciplines.forEach((d) => {
    if (courses[d.course]) {
      courses[d.course].disciplines.push(d);
      courses[d.course].totalCredits += d.credits;
    }
  });

  return {
    programId,
    totalCredits: plan.totalCredits,
    totalHours: plan.totalAcademicHours,
    categories,
    courses,
  };
}

export function getComparedCategories(
  programIds: string[],
  onlyDifferences: boolean = false
): DisciplineCategory[] {
  const statsList = programIds
    .map((id) => getProgramCurriculumStats(id))
    .filter((s): s is ProgramCurriculumStats => s !== null);

  if (statsList.length === 0) return [];

  const allCategories = Object.keys(CATEGORY_METAS) as DisciplineCategory[];

  // Keep categories that have at least 1 credit in at least 1 program
  const relevantCategories = allCategories.filter((cat) =>
    statsList.some((s) => s.categories[cat]?.credits > 0)
  );

  if (!onlyDifferences || statsList.length < 2) {
    return relevantCategories;
  }

  // Filter only categories with significant difference (>= 3% difference or >= 6 credits difference)
  return relevantCategories.filter((cat) => {
    const percentages = statsList.map((s) => s.categories[cat]?.percentage || 0);
    const max = Math.max(...percentages);
    const min = Math.min(...percentages);
    return max - min >= 3;
  });
}

export function generateComparisonInsights(programIds: string[]): ComparisonInsight[] {
  const statsList = programIds
    .map((id) => {
      const stats = getProgramCurriculumStats(id);
      const plan = STUDY_PLANS[id];
      return stats && plan ? { stats, plan } : null;
    })
    .filter((item): item is { stats: ProgramCurriculumStats; plan: (typeof STUDY_PLANS)[string] } => item !== null);

  if (statsList.length === 0) return [];
  const insights: ComparisonInsight[] = [];

  // If only 1 program, show general focus
  if (statsList.length === 1) {
    const { stats, plan } = statsList[0];
    const sortedCats = Object.values(stats.categories)
      .filter((c) => c.credits > 0)
      .sort((a, b) => b.percentage - a.percentage);

    if (sortedCats.length >= 2) {
      insights.push({
        type: 'leader',
        title: `Ключевые направления программы ${plan.university}`,
        description: `Наибольшую долю учебного плана занимают «${sortedCats[0].meta.name}» (${sortedCats[0].percentage}%) и «${sortedCats[1].meta.name}» (${sortedCats[1].percentage}%).`,
        icon: sortedCats[0].meta.icon,
      });
    }
    return insights;
  }

  // Multi-program comparison insights:
  // 1. Math contrast
  const mathStats = statsList.map((s) => ({
    name: s.plan.university,
    pct: s.stats.categories['math']?.percentage || 0,
    credits: s.stats.categories['math']?.credits || 0,
  }));
  const maxMath = mathStats.reduce((prev, curr) => (curr.pct > prev.pct ? curr : prev));
  const minMath = mathStats.reduce((prev, curr) => (curr.pct < prev.pct ? curr : prev));

  if (maxMath.pct - minMath.pct >= 4) {
    insights.push({
      type: 'contrast',
      category: 'math',
      title: 'Разница в объёме математики',
      description: `В программе ${maxMath.name} фундаментальная математика занимает ${maxMath.pct}% плана, тогда как в ${minMath.name} — ${minMath.pct}%.`,
      icon: '🧮',
    });
  }

  // 2. Software Engineering / Programming focus
  const seStats = statsList.map((s) => ({
    name: s.plan.university,
    pct: (s.stats.categories['software_eng']?.percentage || 0) + (s.stats.categories['programming']?.percentage || 0),
    credits: (s.stats.categories['software_eng']?.credits || 0) + (s.stats.categories['programming']?.credits || 0),
  }));
  const maxSe = seStats.reduce((prev, curr) => (curr.pct > prev.pct ? curr : prev));
  const minSe = seStats.reduce((prev, curr) => (curr.pct < prev.pct ? curr : prev));

  if (maxSe.pct - minSe.pct >= 5) {
    insights.push({
      type: 'contrast',
      category: 'software_eng',
      title: 'Акцент на разработку ПО и инженерию',
      description: `Программа ${maxSe.name} выделяет больше времени на практическое программирование и архитектуру ПО (${maxSe.pct}% против ${minSe.pct}% в ${minSe.name}).`,
      icon: '💻',
    });
  }

  // 3. AI / Machine Learning & Data Science
  const aiStats = statsList.map((s) => ({
    name: s.plan.university,
    pct: (s.stats.categories['ai_ml']?.percentage || 0) + (s.stats.categories['data_science']?.percentage || 0),
    credits: (s.stats.categories['ai_ml']?.credits || 0) + (s.stats.categories['data_science']?.credits || 0),
  }));
  const maxAi = aiStats.reduce((prev, curr) => (curr.pct > prev.pct ? curr : prev));
  const minAi = aiStats.reduce((prev, curr) => (curr.pct < prev.pct ? curr : prev));

  if (maxAi.pct >= 8 && maxAi.pct - minAi.pct >= 3) {
    insights.push({
      type: 'contrast',
      category: 'ai_ml',
      title: 'Машинное обучение и Data Science',
      description: `В ${maxAi.name} дисциплины искусственного интеллекта и анализа данных составляют ${maxAi.pct}%, что выше, чем в ${minAi.name} (${minAi.pct}%).`,
      icon: '🤖',
    });
  }

  // 4. Computer Systems & Hardware
  const sysStats = statsList.map((s) => ({
    name: s.plan.university,
    pct: s.stats.categories['systems']?.percentage || 0,
    credits: s.stats.categories['systems']?.credits || 0,
  }));
  const maxSys = sysStats.reduce((prev, curr) => (curr.pct > prev.pct ? curr : prev));
  const minSys = sysStats.reduce((prev, curr) => (curr.pct < prev.pct ? curr : prev));

  if (maxSys.pct >= 10 && maxSys.pct - minSys.pct >= 4) {
    insights.push({
      type: 'contrast',
      category: 'systems',
      title: 'Компьютерные системы и низкоуровневое ПО',
      description: `Программа ${maxSys.name} уделяет заметное внимание архитектуре ЭВМ, операционным системам и сетям (${maxSys.pct}% против ${minSys.pct}% в ${minSys.name}).`,
      icon: '⚙️',
    });
  }

  // 5. Similarity check (English / Humanities / Project work)
  const engStats = statsList.map((s) => s.stats.categories['english']?.credits || 0);
  const maxEng = Math.max(...engStats);
  const minEng = Math.min(...engStats);

  if (maxEng - minEng <= 3 && minEng > 0) {
    insights.push({
      type: 'similarity',
      category: 'english',
      title: 'Сопоставимый объём английского языка',
      description: `Во всех сравниваемых программах на иностранный язык отводится примерно одинаковый объём нагрузки.`,
      icon: '🌍',
    });
  }

  // 6. Course progression insight
  const firstYearMath = statsList.map((s) => {
    const dList = s.stats.courses[1].disciplines.filter((d) => d.normalizedCategory === 'math' || d.normalizedCategory === 'programming');
    const cr = dList.reduce((sum, d) => sum + d.credits, 0);
    return { name: s.plan.university, credits: cr };
  });
  if (firstYearMath.length >= 2) {
    insights.push({
      type: 'course_progression',
      title: 'Распределение нагрузки по курсам',
      description: `На 1-м курсе программы формируют базовый фундамент (математика и алгоритмы). Узкоспециализированные треки и командные проекты в большинстве программ начинаются на 2–3 курсах.`,
      icon: '🎯',
    });
  }

  return insights.slice(0, 4); // Limit to top 4 sharpest insights
}
