
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

export enum WorkoutFocus {
  PERFORMANCE = 'PERFORMANCE',
  QUALITY = 'QUALITY',
  STRENGTH = 'STRENGTH',
  HYPERTROPHY = 'HYPERTROPHY',
  LONGEVITY = 'LONGEVITY'
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
  videoUrl: string; // URL do YouTube ou vídeo curto
}

export interface WorkoutDay {
  id: string;
  dayName: string;
  title: string;
  exercises: Exercise[];
  isRestDay: boolean;
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
  weeklyTarget: number;
  availableDays: string[];
  sessionDuration: number;
  subscriptionActive: boolean;
  nextBillingDate: string;
}

export interface AppState {
  profile: UserProfile | null;
  currentWorkoutIndex: number;
  language: Language;
}
