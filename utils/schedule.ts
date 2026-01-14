
import { UserProfile, DayPlan, FitnessGoal, SplitStyle, WorkoutCategory, ExperienceLevel } from '../types';
import { PRESET_WORKOUTS } from '../presets/workouts';

/**
 * Maps goals to specific preset sequences to ensure user gets the right training stimulus.
 */
export const recommendPresetForGoal = (profile: UserProfile, dayIndex: number): string => {
  const { goal, level, splitStyle } = profile;
  
  // High-level pools
  const fbHealth = "p-fb-health";
  const upperPush = "p-upper-push";
  const lowerQuads = "p-lower-quads";
  const upperPull = "p-upper-pull";
  const lowerPost = "p-lower-post";
  const cardio = "p-cardio-zone2";

  // 1. Goal: HEALTH (Longevity/Mobility)
  if (goal === FitnessGoal.HEALTH) {
    const healthPool = [fbHealth, "p-fb-health", "p-cardio-zone2"]; 
    return healthPool[dayIndex % healthPool.length];
  }

  // 2. Goal: LOSE (Fat Loss/Conditioning)
  if (goal === FitnessGoal.LOSE) {
    // Force a cardio session every 3rd workout day
    if (dayIndex % 3 === 2) return cardio;
    return [fbHealth, upperPush, lowerQuads][dayIndex % 3];
  }

  // 3. Goal: STRENGTHEN or GAIN (Hypertrophy/Performance)
  if (splitStyle === SplitStyle.BRAZIL_4) {
    const brCycle = [upperPush, lowerQuads, upperPull, lowerPost];
    return brCycle[dayIndex % brCycle.length];
  }

  if (splitStyle === SplitStyle.ALTERNATING) {
    return (dayIndex % 2 === 0) ? upperPush : lowerQuads;
  }

  // Default Fallback: Full Body Mix
  return [fbHealth, upperPush, lowerQuads][dayIndex % 3];
};

/**
 * Builds a complete weekly schedule based on selected training days.
 */
export const buildScheduleFromDays = (profile: UserProfile, selectedDays: string[]): Record<string, DayPlan> => {
  const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  const schedule: Record<string, DayPlan> = {};
  let workoutCounter = 0;

  days.forEach((day) => {
    if (selectedDays.includes(day)) {
      schedule[day] = {
        type: 'WORKOUT',
        workoutSource: 'PRESET',
        presetWorkoutId: recommendPresetForGoal(profile, workoutCounter)
      };
      workoutCounter++;
    } else {
      schedule[day] = { type: 'REST' };
    }
  });

  return schedule;
};
