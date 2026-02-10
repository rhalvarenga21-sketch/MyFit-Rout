
import { ExperienceLevel, Exercise, PresetWorkout, Language, WorkoutCategory, BodyAreaTag } from './types';

export const EXERCISE_DATABASE: Exercise[] = [
  // WARMUPS
  { id: "w1", name: { [Language.PT]: "Gato-Vaca", [Language.EN]: "Cat-Cow", [Language.ES]: "Gato-Vaca" }, muscleGroup: "Spine", sets: 1, reps: "10", executionTips: ["Breathe in as you arch", "Breathe out as you round"], commonMistakes: ["Moving too fast"], safetyNotes: "Move within pain-free range", videoUrl: "uGv_L7m0Y_0", equipment: "Mat", difficulty: ExperienceLevel.BEGINNER },
  { id: "w2", name: { [Language.PT]: "Ponte de Glúteo", [Language.EN]: "Glute Bridge", [Language.ES]: "Puente de Glúteo" }, muscleGroup: "Glutes", sets: 1, reps: "15", executionTips: ["Drive through heels", "Squeeze glutes at top"], commonMistakes: ["Arching lower back"], safetyNotes: "Keep core engaged", videoUrl: "8bbE6adA-i0", equipment: "Mat", difficulty: ExperienceLevel.BEGINNER },
  { id: "w3", name: { [Language.PT]: "CARs de Ombro", [Language.EN]: "Shoulder CARs", [Language.ES]: "CARs de Hombro" }, muscleGroup: "Shoulders", sets: 1, reps: "5/side", executionTips: ["Full circular motion", "Keep body still"], commonMistakes: ["Rotating the torso"], safetyNotes: "Avoid sharp pain", videoUrl: "o2M_rW_8v0g", equipment: "None", difficulty: ExperienceLevel.BEGINNER },

  // MAIN MOVEMENTS
  { id: "m1", name: { [Language.PT]: "Agachamento Goblet", [Language.EN]: "Goblet Squat", [Language.ES]: "Sentadilla Goblet" }, muscleGroup: "Legs", sets: 3, reps: "12", executionTips: ["Keep chest up", "Elbows to knees"], commonMistakes: ["Heels lifting off floor"], safetyNotes: "Maintain flat back", videoUrl: "m0GcZ24pK6k", equipment: "Dumbbell", difficulty: ExperienceLevel.BEGINNER },
  { id: "m2", name: { [Language.PT]: "Flexão de Braço", [Language.EN]: "Push Ups", [Language.ES]: "Flexiones" }, muscleGroup: "Chest", sets: 3, reps: "10-15", executionTips: ["Body in straight line", "Elbows at 45 degrees"], commonMistakes: ["Saggie hips"], safetyNotes: "Perform on knees if needed", videoUrl: "IODxDxX7oi4", equipment: "None", difficulty: ExperienceLevel.BEGINNER },
  { id: "m3", name: { [Language.PT]: "Remada Curvada", [Language.EN]: "Bent Over Row", [Language.ES]: "Remo Inclinado" }, muscleGroup: "Back", sets: 3, reps: "10", executionTips: ["Hinge at hips", "Pull to hip bone"], commonMistakes: ["Rounding the back"], safetyNotes: "Brace core tight", videoUrl: "9efgcaj7-p0", equipment: "Dumbbell", difficulty: ExperienceLevel.INTERMEDIATE },
  { id: "m4", name: { [Language.PT]: "Press Militar", [Language.EN]: "Overhead Press", [Language.ES]: "Press Militar" }, muscleGroup: "Shoulders", sets: 3, reps: "10", executionTips: ["Stack wrists over elbows", "No rib flare"], commonMistakes: ["Arching the back"], safetyNotes: "Avoid if shoulder pain exists", videoUrl: "2yjwHeErbqw", equipment: "Dumbbell", difficulty: ExperienceLevel.INTERMEDIATE },
  { id: "m5", name: { [Language.PT]: "Deadbug", [Language.EN]: "Deadbug", [Language.ES]: "Deadbug" }, muscleGroup: "Core", sets: 3, reps: "10/side", executionTips: ["Low back against floor", "Opposite arm/leg move"], commonMistakes: ["Losing back contact"], safetyNotes: "Slow and controlled", videoUrl: "4XLEnwUr1gk", equipment: "None", difficulty: ExperienceLevel.BEGINNER },
  { id: "m6", name: { [Language.PT]: "Levantamento Terra com Halter", [Language.EN]: "Dumbbell Deadlift", [Language.ES]: "Peso Muerto con Mancuernas" }, muscleGroup: "Hamstrings", sets: 3, reps: "10", executionTips: ["Hinge at hips", "Keep weights close"], commonMistakes: ["Bending the knees first"], safetyNotes: "Shoulders above hips", videoUrl: "lJ3QwaXNJfw", equipment: "Dumbbell", difficulty: ExperienceLevel.INTERMEDIATE },
  { id: "m7", name: { [Language.PT]: "Avanço", [Language.EN]: "Lunges", [Language.ES]: "Zancadas" }, muscleGroup: "Legs", sets: 3, reps: "10/side", executionTips: ["90 degree angles", "Tall torso"], commonMistakes: ["Knee caving in"], safetyNotes: "Hold for balance if needed", videoUrl: "QOVaHwm-Q6U", equipment: "None", difficulty: ExperienceLevel.BEGINNER },
  { id: "m8", name: { [Language.PT]: "Elevação de Panturrilha", [Language.EN]: "Calf Raise", [Language.ES]: "Elevación de Talones" }, muscleGroup: "Calves", sets: 4, reps: "15-20", executionTips: ["Full stretch at bottom", "Pause at top"], commonMistakes: ["Bouncing"], safetyNotes: "Hold a wall for balance", videoUrl: "gwLzBJYoWl4", equipment: "Bodyweight", difficulty: ExperienceLevel.BEGINNER },

  // COOL DOWN
  { id: "c1", name: { [Language.PT]: "Postura da Criança", [Language.EN]: "Child's Pose", [Language.ES]: "Postura del Niño" }, muscleGroup: "Back", sets: 1, reps: "60s", executionTips: ["Sit on heels", "Reach forward"], commonMistakes: ["Holding breath"], safetyNotes: "Relax into it", videoUrl: "qYvEA2p2V_c", equipment: "Mat", difficulty: ExperienceLevel.BEGINNER }
];

export const PRESET_WORKOUTS: PresetWorkout[] = [
  {
    id: "p1",
    title: { [Language.PT]: "Corpo Inteiro – Base de Saúde", [Language.EN]: "Full Body – Health Foundations", [Language.ES]: "Cuerpo Completo – Base de Salud" },
    primaryCategory: WorkoutCategory.FULL_BODY,
    tags: [BodyAreaTag.LEGS, BodyAreaTag.CHEST, BodyAreaTag.BACK, BodyAreaTag.CORE],
    duration: 60,
    description: { [Language.PT]: "Padrões de movimento e estabilidade articular.", [Language.EN]: "Movement patterns and joint stability.", [Language.ES]: "Patrones de movimiento y estabilidad articular." },
    warmupIds: ["w1", "w2"],
    mainBlockIds: ["m1", "m2", "m3"],
    accessoryIds: ["m5"],
    cooldownIds: ["c1"],
    difficulty: ExperienceLevel.BEGINNER,
    environment: 'HOME'
  },
  {
    id: "p2",
    title: { [Language.PT]: "Corpo Inteiro – Longevidade", [Language.EN]: "Full Body – Longevity", [Language.ES]: "Cuerpo Completo – Longevidad" },
    primaryCategory: WorkoutCategory.FULL_BODY,
    tags: [BodyAreaTag.LEGS, BodyAreaTag.CHEST, BodyAreaTag.BACK, BodyAreaTag.CORE],
    duration: 75,
    description: { [Language.PT]: "Ritmo controlado para máxima saúde metabólica.", [Language.EN]: "Controlled tempo for high metabolic health.", [Language.ES]: "Ritmo controlado para máxima salud metabólica." },
    warmupIds: ["w1", "w3"],
    mainBlockIds: ["m6", "m2", "m1"],
    accessoryIds: ["m5"],
    cooldownIds: ["c1"],
    difficulty: ExperienceLevel.BEGINNER,
    environment: 'HOME'
  },
  {
    id: "p3",
    title: { [Language.PT]: "Superior Completo", [Language.EN]: "Upper Body Complete", [Language.ES]: "Superior Completo" },
    primaryCategory: WorkoutCategory.UPPER,
    tags: [BodyAreaTag.CHEST, BodyAreaTag.BACK, BodyAreaTag.SHOULDERS, BodyAreaTag.BICEPS, BodyAreaTag.TRICEPS],
    duration: 60,
    description: { [Language.PT]: "Empurre e puxe equilibrado.", [Language.EN]: "Balanced push and pull.", [Language.ES]: "Empuje y tirón equilibrado." },
    warmupIds: ["w3"],
    mainBlockIds: ["m2", "m3", "m4"],
    accessoryIds: ["m5"],
    cooldownIds: ["c1"],
    difficulty: ExperienceLevel.INTERMEDIATE,
    environment: 'HOME'
  },
  {
    id: "p4",
    title: { [Language.PT]: "Inferior Completo", [Language.EN]: "Lower Body Complete", [Language.ES]: "Inferior Completo" },
    primaryCategory: WorkoutCategory.LOWER,
    tags: [BodyAreaTag.LEGS, BodyAreaTag.GLUTES, BodyAreaTag.CALVES],
    duration: 60,
    description: { [Language.PT]: "Foco em pernas e cadeia posterior.", [Language.EN]: "Focus on legs and posterior chain.", [Language.ES]: "Foco en piernas y cadena posterior." },
    warmupIds: ["w2"],
    mainBlockIds: ["m1", "m6", "m7"],
    accessoryIds: ["m8"],
    cooldownIds: ["c1"],
    difficulty: ExperienceLevel.INTERMEDIATE,
    environment: 'HOME'
  }
];
