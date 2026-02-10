
import { UserProfile, Gender, ActivityLevel, FitnessGoal } from '../types';

export const calculateBMR = (profile: UserProfile): number => {
  const { weight, height, age, gender } = profile;
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
  return Math.round(bmr * (multipliers[profile.activityLevel] || 1.2));
};

export const calculateWaterGoal = (weight: number): number => {
  return Math.round(weight * 35);
};

export const calculateDailyCalorieTarget = (profile: UserProfile): { target: number; labelKey: keyof typeof FitnessGoal } => {
  const tdee = calculateTDEE(profile);
  let target = tdee;
  let labelKey: keyof typeof FitnessGoal = 'HEALTH';

  switch (profile.goal) {
    case FitnessGoal.LOSE:
      target = tdee * 0.85; 
      const minKcal = profile.gender === Gender.MALE ? 1500 : 1200;
      target = Math.max(target, minKcal);
      labelKey = 'LOSE';
      break;
    case FitnessGoal.GAIN:
      target = tdee * 1.10;
      labelKey = 'GAIN';
      break;
    case FitnessGoal.STRENGTHEN:
      target = tdee * 1.05;
      labelKey = 'STRENGTHEN';
      break;
    default:
      target = tdee;
      labelKey = 'HEALTH';
  }

  return { target: Math.round(target), labelKey };
};
