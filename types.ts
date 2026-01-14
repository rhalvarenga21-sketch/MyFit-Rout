
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

export enum WorkoutCategory {
  FULL_BODY = 'FULL_BODY',
  UPPER = 'UPPER',
  LOWER = 'LOWER',
  RECOVERY = 'RECOVERY',
  CARDIO = 'CARDIO',
  CUSTOM = 'CUSTOM'
}

export enum BodyAreaTag {
  BACK = 'BACK',
  CHEST = 'CHEST',
  SHOULDERS = 'SHOULDERS',
  BICEPS = 'BICEPS',
  TRICEPS = 'TRICEPS',
  LEGS = 'LEGS',
  GLUTES = 'GLUTES',
  CALVES = 'CALVES',
  CORE = 'CORE',
  CARDIO = 'CARDIO'
}

export enum SplitStyle {
  ALTERNATING = 'ALTERNATING', // Upper/Lower
  BRAZIL_4 = 'BRAZIL_4',        // 4-part split
  FULL_BODY_MIX = 'FULL_BODY_MIX'
}

export interface Exercise {
  id: string;
  name: Record<Language, string>;
  muscleGroup: string;
  secondaryMuscles?: string[];
  sets: number;
  reps: string;
  description?: string;
  executionTips: string[];
  commonMistakes: string[];
  safetyNotes: string;
  videoUrl: string;
  equipment: string;
  difficulty: ExperienceLevel;
}

export interface WorkoutItem {
  exerciseId: string;
  sets: number;
  reps: string;
  rest: string;
}

export interface CustomWorkout {
  id: string;
  title: string;
  description?: string;
  items: WorkoutItem[];
  createdAt: string;
}

export interface PresetWorkout {
  id: string;
  title: Record<Language, string>;
  primaryCategory: WorkoutCategory;
  tags: BodyAreaTag[];
  duration: 45 | 60 | 75 | 90;
  description: Record<Language, string>;
  warmupIds: string[];
  mainBlockIds: string[];
  accessoryIds: string[];
  cooldownIds: string[];
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
  customSchedule: Record<string, DayPlan>;
  trainingDays: string[];
  splitStyle: SplitStyle;
  customWorkouts: CustomWorkout[];
  completedDays: string[]; 
  hasPass: boolean;
  trialStartDate: string;
}

export interface DayPlan {
  type: 'WORKOUT' | 'REST';
  workoutSource?: 'PRESET' | 'CUSTOM';
  presetWorkoutId?: string;
  customWorkoutId?: string;
}
