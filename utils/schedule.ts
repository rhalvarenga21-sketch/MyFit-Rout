
import { UserProfile, DayPlan, FitnessGoal, ExperienceLevel, WorkoutCategory, SplitStyle, PresetWorkout } from '../types';
import { PRESET_WORKOUTS } from '../presets';

const DAYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

export const applyTrainingDaysSelection = (
  profile: UserProfile, 
  selectedDays: string[],
  splitStyle: SplitStyle = SplitStyle.FULL_BODY_MIX
): Record<string, DayPlan> => {
  const newSchedule: Record<string, DayPlan> = {};
  
  // Volume rules
  const dayCount = selectedDays.length;

  // Filter pools
  const fbPool = PRESET_WORKOUTS.filter(p => p.primaryCategory === WorkoutCategory.FULL_BODY);
  const upperPool = PRESET_WORKOUTS.filter(p => p.primaryCategory === WorkoutCategory.UPPER);
  const lowerPool = PRESET_WORKOUTS.filter(p => p.primaryCategory === WorkoutCategory.LOWER);
  const cardioPool = PRESET_WORKOUTS.filter(p => p.primaryCategory === WorkoutCategory.CARDIO);

  let upperIndex = 0;
  let lowerIndex = 0;
  let fbIndex = 0;
  let cardioCount = 0;

  let lastCategory: WorkoutCategory | null = null;

  DAYS.forEach((day) => {
    if (!selectedDays.includes(day)) {
      newSchedule[day] = { type: 'REST' };
      return;
    }

    let selectedPreset: PresetWorkout | null = null;

    // 2 Days - Strictly Full Body
    if (dayCount <= 2) {
      selectedPreset = fbPool[fbIndex % fbPool.length];
      fbIndex++;
    } 
    // 3 Days - Mixed or FB
    else if (dayCount === 3) {
      if (profile.goal === FitnessGoal.LOSE && cardioCount === 0) {
        selectedPreset = cardioPool[0] || fbPool[0];
        cardioCount++;
      } else if (lastCategory === WorkoutCategory.FULL_BODY) {
        selectedPreset = upperPool[upperIndex % upperPool.length] || lowerPool[lowerIndex % lowerPool.length];
        upperIndex++;
      } else {
        selectedPreset = fbPool[fbIndex % fbPool.length];
        fbIndex++;
      }
    } 
    // 4+ Days - Split Rotation
    else {
      if (splitStyle === SplitStyle.ALTERNATING) {
        if (lastCategory === WorkoutCategory.UPPER) {
          selectedPreset = lowerPool[lowerIndex % lowerPool.length];
          lowerIndex++;
        } else {
          selectedPreset = upperPool[upperIndex % upperPool.length];
          upperIndex++;
        }
      } else {
        selectedPreset = fbPool[fbIndex % fbPool.length];
        fbIndex++;
      }
    }

    if (selectedPreset) {
      newSchedule[day] = {
        type: 'WORKOUT',
        workoutSource: 'PRESET',
        presetWorkoutId: selectedPreset.id
      };
      lastCategory = selectedPreset.primaryCategory;
    } else {
      newSchedule[day] = { type: 'REST' };
    }
  });

  return newSchedule;
};
