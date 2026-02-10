
import { UserProfile, PresetWorkout, DayPlan } from '../types';
import { PRESET_WORKOUTS } from '../data/workouts';
import { recommendPresetForGoal, buildScheduleFromDays } from './schedule';

export interface SmartStartResult {
  preset: PresetWorkout;
  isRestDay: boolean;
  autoAssigned: boolean;
}

export const safeStartTodayRoutine = (profile: UserProfile): SmartStartResult => {
  const dayNames = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  const todayKey = dayNames[new Date().getDay()];
  
  let schedule = profile.customSchedule;
  if (!schedule || Object.keys(schedule).length === 0) {
    schedule = buildScheduleFromDays(profile, profile.trainingDays);
  }

  const dayPlan = schedule[todayKey] as DayPlan | undefined;
  const fallbackPreset = PRESET_WORKOUTS[0];

  if (!dayPlan || dayPlan.type === 'REST') {
    return {
      preset: fallbackPreset,
      isRestDay: true,
      autoAssigned: false
    };
  }

  if (dayPlan.presetWorkoutId) {
    const found = PRESET_WORKOUTS.find(p => p.id === dayPlan.presetWorkoutId);
    if (found) return { preset: found, isRestDay: false, autoAssigned: false };
  }

  const recommendedId = recommendPresetForGoal(profile, 0);
  const recommendedPreset = PRESET_WORKOUTS.find(p => p.id === recommendedId) || fallbackPreset;

  return {
    preset: recommendedPreset,
    isRestDay: false,
    autoAssigned: true
  };
};
