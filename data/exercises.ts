
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
    commonMistakes: ["Bouncing the bar"],
    safetyNotes: "Use a spotter for heavy loads.",
    videoUrl: "rT7Dg6D6G3E",
    equipment: "Barbell",
    difficulty: ExperienceLevel.INTERMEDIATE
  },
  {
    id: "chest-3",
    name: { [Language.PT]: "Crucifixo com Halteres", [Language.EN]: "Dumbbell Fly", [Language.ES]: "Aperturas con Mancuernas" },
    muscleGroup: "Chest",
    sets: 3, reps: "12-15",
    executionTips: ["Slight bend in elbows", "Hug a big tree motion"],
    commonMistakes: ["Dropping arms too low"],
    safetyNotes: "Controlled motion to protect shoulders.",
    videoUrl: "eGjt4lk6gJw",
    equipment: "Dumbbell",
    difficulty: ExperienceLevel.BEGINNER
  },
  // BACK
  {
    id: "back-2",
    name: { [Language.PT]: "Puxada Aberta", [Language.EN]: "Lat Pulldown", [Language.ES]: "Jalón al Pecho" },
    muscleGroup: "Back",
    secondaryMuscles: ["Biceps"],
    sets: 3, reps: "10-12",
    executionTips: ["Pull to upper chest", "Squeeze lats"],
    commonMistakes: ["Leaning back too much"],
    safetyNotes: "Control the weight on the way up.",
    videoUrl: "0Gf5-30u9vU",
    equipment: "Machine",
    difficulty: ExperienceLevel.BEGINNER
  },
  {
    id: "back-3",
    name: { [Language.PT]: "Remada Baixa", [Language.EN]: "Seated Row", [Language.ES]: "Remo Sentado" },
    muscleGroup: "Back",
    sets: 3, reps: "12",
    executionTips: ["Sit tall", "Pull handles to stomach"],
    commonMistakes: ["Rounding shoulders"],
    safetyNotes: "Maintain neutral spine.",
    videoUrl: "GZbfZ033f74",
    equipment: "Machine",
    difficulty: ExperienceLevel.BEGINNER
  },
  // SHOULDERS
  {
    id: "sh-2",
    name: { [Language.PT]: "Desenvolvimento com Halteres", [Language.EN]: "Dumbbell Press", [Language.ES]: "Press de Hombros" },
    muscleGroup: "Shoulders",
    sets: 3, reps: "10",
    executionTips: ["Vertical push", "Elbows slightly forward"],
    commonMistakes: ["Arching lower back"],
    safetyNotes: "Stop at ear level.",
    videoUrl: "qEwKCR5JCog",
    equipment: "Dumbbell",
    difficulty: ExperienceLevel.BEGINNER
  },
  // LEGS & GLUTES
  {
    id: "leg-2",
    name: { [Language.PT]: "Leg Press 45", [Language.EN]: "Leg Press", [Language.ES]: "Prensa de Piernas" },
    muscleGroup: "Legs",
    sets: 3, reps: "12-15",
    executionTips: ["Feet shoulder width", "Do not lock knees"],
    commonMistakes: ["Lifting lower back off seat"],
    safetyNotes: "Safety bars always engaged.",
    videoUrl: "IZxyjW7MPJQ",
    equipment: "Machine",
    difficulty: ExperienceLevel.BEGINNER
  },
  {
    id: "glute-1",
    name: { [Language.PT]: "Elevação Pélvica", [Language.EN]: "Hip Thrust", [Language.ES]: "Hip Thrust" },
    muscleGroup: "Glutes",
    sets: 3, reps: "10-12",
    executionTips: ["Chin tucked", "Full lockout at top"],
    commonMistakes: ["Hyperextending back"],
    safetyNotes: "Pad the bar for comfort.",
    videoUrl: "xDmGfelutLY",
    equipment: "Barbell",
    difficulty: ExperienceLevel.INTERMEDIATE
  },
  // ARMS
  {
    id: "arm-2",
    name: { [Language.PT]: "Tríceps Pulley", [Language.EN]: "Triceps Pushdown", [Language.ES]: "Tríceps en Polea" },
    muscleGroup: "Triceps",
    sets: 3, reps: "12-15",
    executionTips: ["Elbows glued to ribs", "Full extension"],
    commonMistakes: ["Moving shoulders"],
    safetyNotes: "Use a weight you can control.",
    videoUrl: "2-LAMcpzHLU",
    equipment: "Cable",
    difficulty: ExperienceLevel.BEGINNER
  },
  {
    id: "arm-3",
    name: { [Language.PT]: "Rosca Direta", [Language.EN]: "Bicep Curl", [Language.ES]: "Curl de Bíceps" },
    muscleGroup: "Biceps",
    sets: 3, reps: "12",
    executionTips: ["No swinging", "Full range"],
    commonMistakes: ["Using momentum"],
    safetyNotes: "Keep chest proud.",
    videoUrl: "ykJmrZ5v0Oo",
    equipment: "Barbell",
    difficulty: ExperienceLevel.BEGINNER
  }
];
