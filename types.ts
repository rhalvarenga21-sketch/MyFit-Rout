
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
  ARMS = 'ARMS',
  LEGS = 'LEGS',
  QUADRICEPS = 'QUADRICEPS',
  HAMSTRINGS = 'HAMSTRINGS',
  GLUTES = 'GLUTES',
  CALVES = 'CALVES',
  CORE = 'CORE',
  CARDIO = 'CARDIO',
  FULL_BODY = 'FULL_BODY'
}

export enum SplitStyle {
  ALTERNATING = 'ALTERNATING',
  BRAZIL_4 = 'BRAZIL_4',
  FULL_BODY_MIX = 'FULL_BODY_MIX',
  FULL_BODY = 'FULL_BODY'
}

export enum SubscriptionPlan {
  ESSENTIAL = 'ESSENTIAL',
  PRO_MONTHLY = 'PRO_MONTHLY',
  PRO_ANNUAL = 'PRO_ANNUAL',
  ESSENTIAL_ANNUAL = 'ESSENTIAL_ANNUAL',
  TEST_PRO = 'TEST_PRO',
  NONE = 'NONE'
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
  difficulty: ExperienceLevel;
  environment: 'GYM' | 'HOME';
  warmupIds: string[];
  mainBlockIds: string[];
  accessoryIds: string[];
  cooldownIds: string[];
}

export interface UserProfile {
  id: string;
  email: string;
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
  country?: string; // ISO Code: 'BR', 'US', 'IE', 'PT', 'ES', 'UK'
  injuries?: string; // User injuries or limitations
  customSchedule: Record<string, DayPlan>;
  trainingDays: string[];
  splitStyle: SplitStyle;
  customWorkouts: CustomWorkout[];
  customExercises: Exercise[]; // Added for flexible portfolio
  completedDays: string[];
  subscription: SubscriptionPlan;
  subscriptionActive: boolean;
  hasPass: boolean;
  trialStartDate: string;
}

export interface DayPlan {
  type: 'WORKOUT' | 'REST';
  workoutSource?: 'PRESET' | 'CUSTOM';
  presetWorkoutId?: string;
  customWorkoutId?: string;
  focusTags?: BodyAreaTag[];
}

export interface FoodItem {
  id: string;
  name: Record<Language, string>;
  calories: number; // kcal per 100g
  protein: number; // g per 100g
  carbs: number; // g per 100g
  fats: number; // g per 100g
  category: 'PROTEIN' | 'CARB' | 'FAT' | 'VEGETABLE' | 'FRUIT' | 'DRINK' | 'OTHER';
}

export type MealType = 'BREAKFAST' | 'LUNCH' | 'DINNER' | 'SNACK' | 'PRE_WORKOUT' | 'POST_WORKOUT';

export interface MealLog {
  id: string;
  foodId: string;
  weight: number; // grams
  mealType: MealType;
  timestamp: string;
}

export interface DailyNutrition {
  date: string;
  logs: MealLog[];
}
