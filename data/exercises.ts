
import { Language, ExperienceLevel, Exercise } from '../types';

export const EXERCISE_LIBRARY: Exercise[] = [
  // CHEST
  {
    id: "chest-1",
    name: { [Language.PT]: "Supino Reto", [Language.EN]: "Bench Press", [Language.ES]: "Press de Banca" },
    muscleGroup: "Chest",
    secondaryMuscles: ["Triceps", "Shoulders"],
    sets: 3, reps: "10-12",
    executionTips: ["Keep shoulder blades retracted", "Drive heels into ground"],
    commonMistakes: ["Bouncing the bar off chest"],
    safetyNotes: "Always use a spotter or safety bars for heavy loads.",
    videoUrl: "rT7Dg6D6G3E",
    equipment: "Barbell",
    difficulty: ExperienceLevel.INTERMEDIATE
  },
  {
    id: "chest-2",
    name: { [Language.PT]: "Supino Inclinado com Halteres", [Language.EN]: "Incline Dumbbell Press", [Language.ES]: "Press Inclinado con Mancuernas" },
    muscleGroup: "Chest",
    sets: 3, reps: "10-12",
    executionTips: ["45-degree bench angle", "Control the descent"],
    commonMistakes: ["Elbows flared too wide"],
    safetyNotes: "Maintain a stable base with feet flat.",
    videoUrl: "0G2V5S_6I0E",
    equipment: "Dumbbell",
    difficulty: ExperienceLevel.BEGINNER
  },
  // BACK
  {
    id: "back-1",
    name: { [Language.PT]: "Remada Curvada", [Language.EN]: "Bent Over Row", [Language.ES]: "Remo con Barra" },
    muscleGroup: "Back",
    secondaryMuscles: ["Biceps"],
    sets: 3, reps: "10-12",
    executionTips: ["Hinge at hips", "Pull bar to lower stomach"],
    commonMistakes: ["Rounding the lower back"],
    safetyNotes: "Brace core tight to protect spine.",
    videoUrl: "9efgcaj7-p0",
    equipment: "Barbell",
    difficulty: ExperienceLevel.INTERMEDIATE
  },
  {
    id: "back-2",
    name: { [Language.PT]: "Puxada Aberta", [Language.EN]: "Lat Pulldown", [Language.ES]: "Jalón al Pecho" },
    muscleGroup: "Back",
    secondaryMuscles: ["Biceps"],
    sets: 3, reps: "12",
    executionTips: ["Pull bar to upper chest", "Squeeze shoulder blades"],
    commonMistakes: ["Using momentum to pull"],
    safetyNotes: "Sit tall, don't lean back excessively.",
    videoUrl: "0Gf5-30u9vU",
    equipment: "Machine",
    difficulty: ExperienceLevel.BEGINNER
  },
  // LEGS
  {
    id: "leg-1",
    name: { [Language.PT]: "Agachamento Livre", [Language.EN]: "Barbell Squat", [Language.ES]: "Sentadilla con Barra" },
    muscleGroup: "Legs",
    sets: 3, reps: "8-10",
    executionTips: ["Drive through heels", "Keep chest proud"],
    commonMistakes: ["Knees caving inward"],
    safetyNotes: "Go only as deep as you can maintain a flat back.",
    videoUrl: "m0GcZ24pK6k",
    equipment: "Barbell",
    difficulty: ExperienceLevel.INTERMEDIATE
  },
  {
    id: "leg-2",
    name: { [Language.PT]: "Leg Press 45", [Language.EN]: "Leg Press 45", [Language.ES]: "Prensa 45" },
    muscleGroup: "Legs",
    sets: 3, reps: "12-15",
    executionTips: ["Feet shoulder width", "Don't lock knees at top"],
    commonMistakes: ["Lifting lower back off the pad"],
    safetyNotes: "Keep feet flat on the platform.",
    videoUrl: "IZxyjW7MPJQ",
    equipment: "Machine",
    difficulty: ExperienceLevel.BEGINNER
  },
  // SHOULDERS
  {
    id: "sh-1",
    name: { [Language.PT]: "Press Militar", [Language.EN]: "Military Press", [Language.ES]: "Press Militar" },
    muscleGroup: "Shoulders",
    sets: 3, reps: "10",
    executionTips: ["Full extension at top", "Brace core"],
    commonMistakes: ["Arching the back excessively"],
    safetyNotes: "Avoid if you have current rotator cuff issues.",
    videoUrl: "2yjwHeErbqw",
    equipment: "Barbell",
    difficulty: ExperienceLevel.INTERMEDIATE
  },
  {
    id: "sh-2",
    name: { [Language.PT]: "Elevação Lateral", [Language.EN]: "Lateral Raise", [Language.ES]: "Elevación Lateral" },
    muscleGroup: "Shoulders",
    sets: 3, reps: "12-15",
    executionTips: ["Lead with elbows", "Pinkies up slightly"],
    commonMistakes: ["Swinging the body"],
    safetyNotes: "Stop at shoulder height.",
    videoUrl: "3VcKaXpzqRo",
    equipment: "Dumbbell",
    difficulty: ExperienceLevel.BEGINNER
  },
  // CORE
  {
    id: "core-1",
    name: { [Language.PT]: "Plancha Abdominal", [Language.EN]: "Plank", [Language.ES]: "Plancha" },
    muscleGroup: "Core",
    sets: 3, reps: "45s-60s",
    executionTips: ["Straight line head to heels", "Squeeze glutes"],
    commonMistakes: ["Hips sagging or too high"],
    safetyNotes: "Keep neck neutral.",
    videoUrl: "TvxNkmjdhMM",
    equipment: "Bodyweight",
    difficulty: ExperienceLevel.BEGINNER
  }
];
