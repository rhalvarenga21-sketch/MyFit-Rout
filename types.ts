
export enum ExperienceLevel {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED'
}

export enum Language {
  PT = 'PT',
  EN = 'EN',
  ES = 'ES'
}

export type Theme = 'light' | 'dark';

export enum UserRole {
  MEMBER = 'MEMBER',
  TRAINER = 'TRAINER',
  GYM_OWNER = 'GYM_OWNER'
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER'
}

export enum ActivityLevel {
  SEDENTARY = 'SEDENTARY',
  LIGHT = 'LIGHT',
  MODERATE = 'MODERATE',
  HEAVY = 'HEAVY',
  ATHLETE = 'ATHLETE'
}

export enum FitnessGoal {
  LOSE = 'LOSE',
  GAIN = 'GAIN',
  STRENGTHEN = 'STRENGTHEN',
  HEALTH = 'HEALTH'
}

export interface Exercise {
  id: string;
  name: string;
  muscleGroup: string;
  secondaryMuscles?: string[];
  sets: number;
  reps: string;
  description: string;
  executionTips: string[];
  commonMistakes: string[];
  safetyNotes: string;
  videoUrl: string;
  equipment: string;
  difficulty: ExperienceLevel;
}

export interface PresetWorkout {
  id: string;
  title: string;
  category: string;
  duration: 45 | 60 | 75 | 90;
  description: string;
  warmupIds: string[];
  mainBlockIds: string[];
  accessoryIds: string[];
  cooldownIds: string[];
}

export interface PostWorkoutFeedback {
  difficulty: number;
  pain: boolean;
  energyLevel: number;
  date: string;
}

export interface UserProfile {
  name: string;
  role: UserRole;
  age: number;
  gender: Gender;
  weight: number;
  height: number;
  activityLevel: ActivityLevel;
  level: ExperienceLevel;
  goal: FitnessGoal;
  language: Language;
  theme?: Theme;
  customSchedule: Record<string, DayPlan>;
  completedDays: string[]; 
  hasPass: boolean;
  trialStartDate: string;
  feedbackHistory: PostWorkoutFeedback[];
}

export interface DayPlan {
  type: 'WORKOUT' | 'REST';
  presetWorkoutId?: string;
  customExerciseIds?: string[]; // Allows modifying the preset or building from scratch
}
