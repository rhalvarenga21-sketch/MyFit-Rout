
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

export enum WorkoutFocus {
  PERFORMANCE = 'PERFORMANCE',
  QUALITY = 'QUALITY',
  STRENGTH = 'STRENGTH',
  HYPERTROPHY = 'HYPERTROPHY',
  LONGEVITY = 'LONGEVITY',
  BALANCE = 'BALANCE',
  WEIGHT_LOSS = 'WEIGHT_LOSS',
  BODYWEIGHT = 'BODYWEIGHT'
}

export enum FitnessGoal {
  LOSE = 'LOSE',
  GAIN = 'GAIN',
  STRENGTHEN = 'STRENGTHEN'
}

export enum WorkoutPreference {
  SPLIT = 'SPLIT',
  FULLBODY = 'FULLBODY'
}

export enum MembershipType {
  DIGITAL = 'DIGITAL',
  HYBRID = 'HYBRID'
}

export interface Exercise {
  id: string;
  name: string;
  muscleGroup: string;
  sets: number;
  reps: string;
  description: string;
  executionTips: string[];
  imageUrl: string;
  videoUrl: string;
  tags?: string[];
}

export interface WorkoutDay {
  id: string;
  dayName: string;
  title: string;
  exercises: Exercise[];
  isRestDay: boolean;
}

export interface DayPlan {
  type: string; // 'CHEST' | 'LEGS' | 'BACK' | 'SHOULDERS' | 'ARMS' | 'CORE' | 'GLUTES' | 'FULLBODY' | 'REST'
  customExerciseIds?: string[];
}

export interface UserProfile {
  name: string;
  weight: number;
  height: number;
  level: ExperienceLevel;
  focus: WorkoutFocus;
  goal: FitnessGoal;
  preference: WorkoutPreference;
  membership: MembershipType;
  language: Language;
  theme?: Theme;
  weeklyTarget: number;
  availableDays: string[]; 
  customSchedule: Record<string, DayPlan>;
  sessionDuration: number;
  subscriptionActive: boolean;
  nextBillingDate: string;
  hasPass: boolean;
  trialStartDate: string;
}

export interface AppState {
  profile: UserProfile | null;
  currentWorkoutIndex: number;
  language: Language;
}
