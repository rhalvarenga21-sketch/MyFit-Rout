
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

export enum WorkoutFocus {
  PERFORMANCE = 'PERFORMANCE',
  QUALITY = 'QUALITY',
  STRENGTH = 'STRENGTH',
  HYPERTROPHY = 'HYPERTROPHY',
  LONGEVITY = 'LONGEVITY',
  BALANCE = 'BALANCE',
  WEIGHT_LOSS = 'WEIGHT_LOSS',
  BODYWEIGHT = 'BODYWEIGHT',
  MOBILITY = 'MOBILITY',
  RECOVERY = 'RECOVERY'
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
  tags?: string[];
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
  difficulty: number; // 1-10
  pain: boolean;
  energyLevel: number; // 1-5
  date: string;
}

export interface UserProfile {
  name: string;
  role: UserRole;
  weight: number;
  height: number;
  level: ExperienceLevel;
  focus: WorkoutFocus;
  goal: FitnessGoal;
  language: Language;
  theme?: Theme;
  customSchedule: Record<string, DayPlan>;
  hasPass: boolean;
  trialStartDate: string;
  feedbackHistory: PostWorkoutFeedback[];
  assignedPresetId?: string;
}

export interface DayPlan {
  type: string;
  customExerciseIds?: string[];
  presetWorkoutId?: string;
}

export interface WorkoutDay {
  id: string;
  dayName: string;
  title: string;
  exercises: Exercise[];
  isRestDay: boolean;
  duration?: number;
}
