import { useState, useEffect } from 'react';
import { HeaderProgress } from './components/HeaderProgress';
import { WelcomeStep } from './components/steps/WelcomeStep';
import { NameStep } from './components/steps/NameStep';
import { CityStep } from './components/steps/CityStep';
import { SubjectStep } from './components/steps/SubjectStep';
import { ScoresStep } from './components/steps/ScoresStep';
import { AchievementsStep } from './components/steps/AchievementsStep';
import { ProgramsResults } from './components/ProgramsResults';
import type { UserProfile, SubjectId } from './types/onboarding';
import { loadUserProfile, saveUserProfile, DEFAULT_PROFILE } from './utils/storage';

const TOTAL_ONBOARDING_STEPS = 6;

export function App() {
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [view, setView] = useState<'onboarding' | 'results'>('onboarding');

  // Initialize from localStorage
  useEffect(() => {
    const saved = loadUserProfile();
    if (saved && saved.name && saved.selectedSubjects.length > 0) {
      setProfile(saved);
      // If user has saved profile, take them directly to results
      setView('results');
    }
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

  const handleFinishOnboarding = () => {
    saveUserProfile(profile);
    setView('results');
  };

  const handleRetake = () => {
    // Return to onboarding to edit scores, starting at Name
    setView('onboarding');
    setCurrentStepIndex(1);
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

  const handleChangeCreativeExam = (creativeExam: { taking: boolean; score: number }) => {
    setProfile((prev) => ({ ...prev, creativeExam }));
  };

  return (
    <div className="h-screen h-[100dvh] min-h-screen w-full bg-white flex flex-col justify-between overflow-hidden select-none">
      <div className="w-full max-w-6xl mx-auto flex-1 flex flex-col justify-between h-full">
        {view === 'results' ? (
          <ProgramsResults profile={profile} onRetake={handleRetake} />
        ) : (
          <>
            {/* Top Enlarged Progress Header */}
            <HeaderProgress
              currentStep={currentStepIndex + 1}
              totalSteps={TOTAL_ONBOARDING_STEPS}
              onBack={handleBack}
              canGoBack={currentStepIndex > 0}
            />

            {/* Step 1: Welcome */}
            {currentStepIndex === 0 && (
              <WelcomeStep onNext={handleNext} />
            )}

            {/* Step 2: User Name */}
            {currentStepIndex === 1 && (
              <NameStep
                name={profile.name}
                onChangeName={handleUpdateName}
                onNext={handleNext}
              />
            )}

            {/* Step 3: Preferred City */}
            {currentStepIndex === 2 && (
              <CityStep
                userName={profile.name}
                selectedCity={profile.preferredCity}
                onSelectCity={handleSelectCity}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}

            {/* Step 4: EGE Subjects */}
            {currentStepIndex === 3 && (
              <SubjectStep
                userName={profile.name}
                selectedSubjects={profile.selectedSubjects}
                onToggleSubject={handleToggleSubject}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}

            {/* Step 5: Subject Scores */}
            {currentStepIndex === 4 && (
              <ScoresStep
                userName={profile.name}
                selectedSubjects={profile.selectedSubjects}
                scores={profile.scores}
                onChangeScore={handleChangeScore}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}

            {/* Step 6: Individual Achievements & Creative Exam */}
            {currentStepIndex === 5 && (
              <AchievementsStep
                userName={profile.name}
                achievements={profile.achievements}
                creativeExam={profile.creativeExam}
                onChangeAchievements={handleChangeAchievements}
                onChangeCreativeExam={handleChangeCreativeExam}
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
