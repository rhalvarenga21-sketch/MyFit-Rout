
import { UserProfile, Gender, ActivityLevel, FitnessGoal } from '../types';

export const calculateBMR = (profile: UserProfile): number => {
  const { weight, height, age, gender } = profile;
  // Mifflin-St Jeor
  if (gender === Gender.MALE) {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  }
  return 10 * weight + 6.25 * height - 5 * age - 161;
};

export const calculateTDEE = (profile: UserProfile): number => {
  const bmr = calculateBMR(profile);
  const multipliers: Record<ActivityLevel, number> = {
    [ActivityLevel.SEDENTARY]: 1.2,
    [ActivityLevel.LIGHT]: 1.375,
    [ActivityLevel.MODERATE]: 1.55,
    [ActivityLevel.HEAVY]: 1.725,
    [ActivityLevel.ATHLETE]: 1.9,
  };
  return Math.round(bmr * multipliers[profile.activityLevel]);
};

// Added water goal calculation based on weight (35ml per kg)
export const calculateWaterGoal = (weight: number): number => {
  return Math.round(weight * 35);
};

export const calculateDailyCalorieTarget = (profile: UserProfile): { target: number; labelKey: string } => {
  const tdee = calculateTDEE(profile);
  let target = tdee;
  let labelKey = 'health';

  switch (profile.goal) {
    case FitnessGoal.LOSE:
      target = tdee * 0.85; // 15% deficit
      const minKcal = profile.gender === Gender.MALE ? 1500 : 1200;
      target = Math.max(target, minKcal);
      labelKey = 'lose';
      break;
    case FitnessGoal.GAIN:
      target = tdee * 1.10; // 10% surplus
      labelKey = 'gain';
      break;
    case FitnessGoal.STRENGTHEN:
      target = tdee * 1.05; // Performance slight surplus
      labelKey = 'strengthen';
      break;
    case FitnessGoal.HEALTH:
    default:
      target = tdee;
      labelKey = 'health';
      break;
  }

  return { target: Math.round(target), labelKey };
};