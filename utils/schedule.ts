
import { UserProfile, DayPlan, FitnessGoal, SplitStyle } from '../types';
import { PRESET_WORKOUTS } from '../data/workouts';

export const recommendPresetForGoal = (profile: UserProfile, workoutIndex: number): string => {
  const { goal } = profile;
  
  if (goal === FitnessGoal.LOSE) {
    const loseCycle = ["p-longevidade", "p-pernas-completo", "p-peito-triceps", "p-costas-biceps"];
    return loseCycle[workoutIndex % loseCycle.length];
  }

  if (goal === FitnessGoal.HEALTH) {
    const healthCycle = ["p-longevidade", "p-ombros-abs", "p-pernas-completo"];
    return healthCycle[workoutIndex % healthCycle.length];
  }

  if (goal === FitnessGoal.STRENGTHEN || goal === FitnessGoal.GAIN) {
    const strengthCycle = ["p-peito-triceps", "p-pernas-completo", "p-costas-biceps", "p-ombros-abs"];
    return strengthCycle[workoutIndex % strengthCycle.length];
  }

  return "p-longevidade";
};

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
