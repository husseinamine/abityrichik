import { useState, useEffect } from 'react';
import { HeaderProgress } from './components/HeaderProgress';
import { WelcomeStep } from './components/steps/WelcomeStep';
import { NameStep } from './components/steps/NameStep';
import { CityStep } from './components/steps/CityStep';
import { KnowsScoresStep } from './components/steps/KnowsScoresStep';
import { SubjectStep } from './components/steps/SubjectStep';
import { ScoresStep } from './components/steps/ScoresStep';
import { AchievementsStep } from './components/steps/AchievementsStep';
import { ProgramsResults } from './components/ProgramsResults';
import { ProgramComparisonPage } from './components/comparison/ProgramComparisonPage';
import { AdmissionStepsPage } from './components/steps/AdmissionStepsPage';
import type { UserProfile, SubjectId } from './types/onboarding';
import { loadUserProfile, saveUserProfile, DEFAULT_PROFILE } from './utils/storage';
import {
  loadComparisonIds,
  toggleComparisonId,
  removeComparisonId,
  replaceComparisonId,
  clearComparison,
} from './utils/comparisonStorage';

const TOTAL_ONBOARDING_STEPS = 7;

export function App() {
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = loadUserProfile();
    return saved && saved.name ? saved : DEFAULT_PROFILE;
  });
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [view, setView] = useState<'onboarding' | 'results' | 'compare' | 'steps'>(() => {
    const saved = loadUserProfile();
    return saved && saved.name ? 'results' : 'onboarding';
  });
  const [comparisonIds, setComparisonIds] = useState<string[]>(() => loadComparisonIds());

  // Sync comparison IDs across windows/events
  useEffect(() => {
    const handleSync = (e: Event) => {
      const customEvent = e as CustomEvent<string[]>;
      if (customEvent.detail && Array.isArray(customEvent.detail)) {
        setComparisonIds(customEvent.detail);
      } else {
        setComparisonIds(loadComparisonIds());
      }
    };
    window.addEventListener('comparison_updated', handleSync);
    return () => window.removeEventListener('comparison_updated', handleSync);
  }, []);

  const handleNext = () => {
    if (currentStepIndex < TOTAL_ONBOARDING_STEPS - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  // Step 4 Decision: User knows their marks or not
  const handleSelectKnowsScores = (knows: boolean) => {
    const updated = { ...profile, knowsScores: knows };
    setProfile(updated);

    if (!knows) {
      // User doesn't know scores: skip marks questions, immediately go to results
      saveUserProfile(updated);
      setView('results');
    } else {
      // User knows scores: proceed to subjects step
      setCurrentStepIndex(4);
    }
  };

  const handleFinishOnboarding = () => {
    const updated = { ...profile, knowsScores: true };
    setProfile(updated);
    saveUserProfile(updated);
    setView('results');
  };

  const handleRetake = () => {
    // Return to onboarding to enter/edit scores
    setProfile((prev) => ({ ...prev, knowsScores: true }));
    setView('onboarding');
    setCurrentStepIndex(4); // Jump straight to subjects selection
  };

  const handleRestartOnboarding = () => {
    localStorage.removeItem('user_onboarding_profile');
    setProfile(DEFAULT_PROFILE);
    setCurrentStepIndex(0);
    setView('onboarding');
  };

  const handleUpdateProfile = (updated: Partial<UserProfile>) => {
    setProfile((prev) => {
      const next = { ...prev, ...updated };
      saveUserProfile(next);
      return next;
    });
  };

  // State update helpers
  const handleUpdateName = (name: string) => {
    setProfile((prev) => ({ ...prev, name }));
  };

  const handleSelectCity = (preferredCity: string) => {
    setProfile((prev) => ({ ...prev, preferredCity }));
  };

  const handleToggleSubject = (subjectId: SubjectId) => {
    setProfile((prev) => {
      const exists = prev.selectedSubjects.includes(subjectId);
      const nextSubjects = exists
        ? prev.selectedSubjects.filter((id) => id !== subjectId)
        : [...prev.selectedSubjects, subjectId];

      // Ensure scores object has a default score for added subject
      const nextScores = { ...prev.scores };
      if (!exists && !nextScores[subjectId]) {
        nextScores[subjectId] = 80;
      }

      return {
        ...prev,
        selectedSubjects: nextSubjects,
        scores: nextScores,
      };
    });
  };

  const handleChangeScore = (subjectId: SubjectId, score: number) => {
    setProfile((prev) => ({
      ...prev,
      scores: {
        ...prev.scores,
        [subjectId]: score,
      },
    }));
  };

  const handleChangeAchievements = (achievements: number) => {
    setProfile((prev) => ({ ...prev, achievements }));
  };

  // Comparison handlers
  const handleToggleComparison = (id: string) => {
    const res = toggleComparisonId(id);
    setComparisonIds(res.ids);
    return res;
  };

  const handleRemoveComparison = (id: string) => {
    const next = removeComparisonId(id);
    setComparisonIds(next);
  };

  const handleAddComparison = (id: string) => {
    const res = toggleComparisonId(id);
    setComparisonIds(res.ids);
  };

  const handleReplaceComparison = (oldId: string, newId: string) => {
    const next = replaceComparisonId(oldId, newId);
    setComparisonIds(next);
  };

  const handleClearAllComparison = () => {
    clearComparison();
    setComparisonIds([]);
  };

  return (
    <div
      className={`h-screen h-[100dvh] min-h-screen w-full bg-white flex flex-col justify-between overflow-hidden ${
        view === 'onboarding' ? 'select-none' : ''
      }`}
    >
      <div className="w-full mx-auto flex-1 flex flex-col justify-between h-full">
        {view === 'results' ? (
          <ProgramsResults
            profile={profile}
            onRetake={handleRetake}
            comparisonIds={comparisonIds}
            onToggleComparison={handleToggleComparison}
            onNavigateToComparison={() => setView('compare')}
            onNavigateToSteps={() => setView('steps')}
            onRestartOnboarding={handleRestartOnboarding}
            onUpdateProfile={handleUpdateProfile}
          />
        ) : view === 'compare' ? (
          <ProgramComparisonPage
            comparisonIds={comparisonIds}
            onRemoveProgram={handleRemoveComparison}
            onAddProgram={handleAddComparison}
            onReplaceProgram={handleReplaceComparison}
            onClearAll={handleClearAllComparison}
            onBackToCatalog={() => setView('results')}
            onNavigateToSteps={() => setView('steps')}
            profile={profile}
          />
        ) : view === 'steps' ? (
          <AdmissionStepsPage
            onBackToCatalog={() => setView('results')}
            onNavigateToComparison={() => setView('compare')}
            comparisonCount={comparisonIds.length}
            userName={profile.name}
          />
        ) : (
          <>
            {/* Top Enlarged Progress Header */}
            <HeaderProgress
              currentStep={currentStepIndex + 1}
              totalSteps={TOTAL_ONBOARDING_STEPS}
              onBack={handleBack}
              canGoBack={currentStepIndex > 0}
            />

            {/* Step 1 (Index 0): Welcome */}
            {currentStepIndex === 0 && (
              <WelcomeStep onNext={handleNext} />
            )}

            {/* Step 2 (Index 1): User Name */}
            {currentStepIndex === 1 && (
              <NameStep
                name={profile.name}
                onChangeName={handleUpdateName}
                onNext={handleNext}
              />
            )}

            {/* Step 3 (Index 2): Preferred City */}
            {currentStepIndex === 2 && (
              <CityStep
                userName={profile.name}
                selectedCity={profile.preferredCity}
                onSelectCity={handleSelectCity}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}

            {/* Step 4 (Index 3): Knows ЕГЭ Scores? */}
            {currentStepIndex === 3 && (
              <KnowsScoresStep
                userName={profile.name}
                onSelectKnowsScores={handleSelectKnowsScores}
                onBack={handleBack}
              />
            )}

            {/* Step 5 (Index 4): EGE Subjects */}
            {currentStepIndex === 4 && (
              <SubjectStep
                userName={profile.name}
                selectedSubjects={profile.selectedSubjects}
                onToggleSubject={handleToggleSubject}
                onNext={handleNext}
                onBack={() => setCurrentStepIndex(3)}
              />
            )}

            {/* Step 6 (Index 5): Subject Scores */}
            {currentStepIndex === 5 && (
              <ScoresStep
                userName={profile.name}
                selectedSubjects={profile.selectedSubjects}
                scores={profile.scores}
                onChangeScore={handleChangeScore}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}

            {/* Step 7 (Index 6): Individual Achievements */}
            {currentStepIndex === 6 && (
              <AchievementsStep
                userName={profile.name}
                achievements={profile.achievements}
                onChangeAchievements={handleChangeAchievements}
                onSubmit={handleFinishOnboarding}
                onBack={handleBack}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
