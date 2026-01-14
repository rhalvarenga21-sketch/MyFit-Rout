
import { UserProfile, DayPlan, FitnessGoal, ExperienceLevel } from '../types';

export const recommendDefaultPreset = (profile: UserProfile): string => {
  const { goal, level } = profile;
  if (level === ExperienceLevel.BEGINNER) {
    if (goal === FitnessGoal.LOSE) return 'p7'; // Fat Loss
    return 'p1'; // Health Foundations
  }
  return 'p5'; // Strength & Longevity
};

export const applyTrainingDaysSelection = (
  profile: UserProfile, 
  selectedDays: string[]
): Record<string, DayPlan> => {
  const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  const newSchedule: Record<string, DayPlan> = {};
  const defaultPreset = recommendDefaultPreset(profile);

  days.forEach(day => {
    if (selectedDays.includes(day)) {
      // Keep existing workout if possible, else default
      const existing = profile.customSchedule[day];
      if (existing && existing.type === 'WORKOUT') {
        newSchedule[day] = existing;
      } else {
        newSchedule[day] = { 
          type: 'WORKOUT', 
          workoutSource: 'PRESET', 
          presetWorkoutId: defaultPreset 
        };
      }
    } else {
      newSchedule[day] = { type: 'REST' };
    }
  });

  return newSchedule;
};
