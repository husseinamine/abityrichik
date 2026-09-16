import type { UserProfile, Program, ProgramMatchResult } from '../types/onboarding';
import { EGE_SUBJECTS } from '../data/programs';

export function matchPrograms(profile: UserProfile, programs: Program[]): ProgramMatchResult[] {
  const subjectNameMap = new Map(EGE_SUBJECTS.map((s) => [s.id, s.name]));

  // If the user doesn't know their marks, show all programs cleanly without qualification filtering
  if (!profile.knowsScores) {
    return programs
      .map((program) => ({
        program,
        userTotalScore: 0,
        isEligible: true,
        qualifiesBudget: false,
        qualifiesPaid: false,
        missingSubjects: [],
        pointsToBudget: program.budgetPassingScore,
      }))
      .sort((a, b) => b.program.budgetPassingScore - a.program.budgetPassingScore);
  }

  return programs.map((program) => {
    const missing: string[] = [];
    let subjectsScore = 0;

    // 1. Check primary required subjects
    for (const subId of program.requiredSubjects.primary) {
      if (!profile.selectedSubjects.includes(subId) || profile.scores[subId] === undefined) {
        missing.push(subjectNameMap.get(subId) || subId);
      } else {
        subjectsScore += profile.scores[subId] || 0;
      }
    }

    // 2. Check choice subject (if any)
    if (program.requiredSubjects.choice && program.requiredSubjects.choice.length > 0) {
      const validChoices = program.requiredSubjects.choice.filter(
        (id) => profile.selectedSubjects.includes(id) && (profile.scores[id] || 0) > 0
      );

      if (validChoices.length === 0) {
        const choiceNames = program.requiredSubjects.choice
          .map((id) => subjectNameMap.get(id) || id)
          .join(' или ');
        missing.push(`Один из: ${choiceNames}`);
      } else {
        // Pick best score among available choices
        const bestChoiceScore = Math.max(
          ...validChoices.map((id) => profile.scores[id] || 0)
        );
        subjectsScore += bestChoiceScore;
      }
    }

    const achievements = Math.min(10, Math.max(0, profile.achievements || 0));
    const userTotalScore = subjectsScore + achievements;

    const isEligible = missing.length === 0;
    const qualifiesBudget = isEligible && userTotalScore >= program.budgetPassingScore;
    const qualifiesPaid = isEligible && userTotalScore >= program.paidPassingScore;
    const pointsToBudget = program.budgetPassingScore - userTotalScore;

    return {
      program,
      userTotalScore,
      isEligible,
      qualifiesBudget,
      qualifiesPaid,
      missingSubjects: missing,
      pointsToBudget,
    };
  }).sort((a, b) => {
    // Sort order:
    // 1. Fully qualified budget
    // 2. Closest to budget
    // 3. Qualified paid
    // 4. Ineligible at the bottom
    if (a.qualifiesBudget && !b.qualifiesBudget) return -1;
    if (!a.qualifiesBudget && b.qualifiesBudget) return 1;
    if (a.isEligible && !b.isEligible) return -1;
    if (!a.isEligible && b.isEligible) return 1;
    return a.pointsToBudget - b.pointsToBudget;
  });
}
