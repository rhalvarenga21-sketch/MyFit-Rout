
import { Language, ExperienceLevel, Exercise } from '../types';

export const EXERCISE_LIBRARY: Exercise[] = [
  // CHEST
  {
    id: "chest-1",
    name: { [Language.PT]: "Supino Reto", [Language.EN]: "Bench Press", [Language.ES]: "Press de Banca" },
    muscleGroup: "Chest",
    secondaryMuscles: ["Triceps", "Shoulders"],
    sets: 3, reps: "10-12",
    description: "Compound push movement.",
    executionTips: ["Keep shoulder blades retracted", "Drive heels into ground"],
    commonMistakes: ["Bouncing the bar"],
    safetyNotes: "Use a spotter for heavy loads.",
    videoUrl: "rT7Dg6D6G3E",
    equipment: "Barbell",
    difficulty: ExperienceLevel.INTERMEDIATE
  },
  {
    id: "chest-2",
    name: { [Language.PT]: "Flexão de Braços", [Language.EN]: "Push Ups", [Language.ES]: "Flexiones" },
    muscleGroup: "Chest",
    sets: 3, reps: "15-20",
    description: "Bodyweight foundation.",
    executionTips: ["Core tight", "Elbows 45 degrees"],
    commonMistakes: ["Sagging hips"],
    safetyNotes: "Perform on knees if needed.",
    videoUrl: "IODxDxX7oi4",
    equipment: "Bodyweight",
    difficulty: ExperienceLevel.BEGINNER
  },
  // BACK
  {
    id: "back-1",
    name: { [Language.PT]: "Remada Curvada", [Language.EN]: "Bent Over Row", [Language.ES]: "Remo Inclinado" },
    muscleGroup: "Back",
    sets: 3, reps: "10-12",
    description: "Horizontal pull.",
    executionTips: ["Flat back", "Pull to hip"],
    commonMistakes: ["Rounding the spine"],
    safetyNotes: "Keep core braced.",
    videoUrl: "9efgcaj7-p0",
    equipment: "Dumbbell",
    difficulty: ExperienceLevel.INTERMEDIATE
  },
  // SHOULDERS
  {
    id: "sh-1",
    name: { [Language.PT]: "Elevação Lateral", [Language.EN]: "Lateral Raise", [Language.ES]: "Elevación Lateral" },
    muscleGroup: "Shoulders",
    sets: 3, reps: "12-15",
    description: "Isolates side delts.",
    executionTips: ["Slight elbow bend", "Control the descent"],
    commonMistakes: ["Using momentum"],
    safetyNotes: "Don't go too heavy.",
    videoUrl: "3VcKaXpzqRo",
    equipment: "Dumbbell",
    difficulty: ExperienceLevel.BEGINNER
  },
  // LEGS
  {
    id: "leg-1",
    name: { [Language.PT]: "Agachamento Goblet", [Language.EN]: "Goblet Squat", [Language.ES]: "Sentadilla Goblet" },
    muscleGroup: "Legs",
    sets: 3, reps: "12",
    description: "Knee dominant lower body.",
    executionTips: ["Chest up", "Heels down"],
    commonMistakes: ["Knees caving in"],
    safetyNotes: "Drive from heels.",
    videoUrl: "m0GcZ24pK6k",
    equipment: "Dumbbell",
    difficulty: ExperienceLevel.BEGINNER
  },
  // CORE
  {
    id: "core-1",
    name: { [Language.PT]: "Prancha Abdominal", [Language.EN]: "Plank", [Language.ES]: "Plancha" },
    muscleGroup: "Core",
    sets: 3, reps: "45s",
    description: "Isometric core stability.",
    executionTips: ["Straight line head to toe", "Squeeze glutes"],
    commonMistakes: ["Looking up"],
    safetyNotes: "Stop if low back hurts.",
    videoUrl: "pSHjTRCQxIw",
    equipment: "Bodyweight",
    difficulty: ExperienceLevel.BEGINNER
  },
  // BICEPS / TRICEPS
  {
    id: "arm-1",
    name: { [Language.PT]: "Rosca Martelo", [Language.EN]: "Hammer Curl", [Language.ES]: "Curl Martillo" },
    muscleGroup: "Biceps",
    sets: 3, reps: "12",
    description: "Brachialis focus.",
    executionTips: ["Neutral grip", "No swinging"],
    commonMistakes: ["Shoulder movement"],
    safetyNotes: "Full range of motion.",
    videoUrl: "zC3nLlEvin4",
    equipment: "Dumbbell",
    difficulty: ExperienceLevel.BEGINNER
  }
];
