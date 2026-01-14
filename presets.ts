
import { ExperienceLevel, Exercise, PresetWorkout, Language, WorkoutCategory, BodyAreaTag } from './types';

export const EXERCISE_DATABASE: Exercise[] = [
  // WARMUPS
  { id: "w1", name: { [Language.PT]: "Gato-Vaca", [Language.EN]: "Cat-Cow", [Language.ES]: "Gato-Vaca" }, muscleGroup: "Spine", sets: 1, reps: "10", description: "Spinal mobility", executionTips: ["Breathe in as you arch", "Breathe out as you round"], commonMistakes: ["Moving too fast"], safetyNotes: "Move within pain-free range", videoUrl: "uGv_L7m0Y_0", equipment: "Mat", difficulty: ExperienceLevel.BEGINNER },
  { id: "w2", name: { [Language.PT]: "Ponte de Glúteo", [Language.EN]: "Glute Bridge", [Language.ES]: "Puente de Glúteo" }, muscleGroup: "Glutes", sets: 1, reps: "15", description: "Glute activation", executionTips: ["Drive through heels", "Squeeze glutes at top"], commonMistakes: ["Arching lower back"], safetyNotes: "Keep core engaged", videoUrl: "8bbE6adA-i0", equipment: "Mat", difficulty: ExperienceLevel.BEGINNER },
  { id: "w3", name: { [Language.PT]: "CARs de Ombro", [Language.EN]: "Shoulder CARs", [Language.ES]: "CARs de Hombro" }, muscleGroup: "Shoulders", sets: 1, reps: "5/side", description: "Controlled articular rotations", executionTips: ["Full circular motion", "Keep body still"], commonMistakes: ["Rotating the torso"], safetyNotes: "Avoid sharp pain", videoUrl: "o2M_rW_8v0g", equipment: "None", difficulty: ExperienceLevel.BEGINNER },
  
  // MAIN MOVEMENTS
  { id: "m1", name: { [Language.PT]: "Agachamento Goblet", [Language.EN]: "Goblet Squat", [Language.ES]: "Sentadilla Goblet" }, muscleGroup: "Legs", sets: 3, reps: "12", description: "Knee dominant lower body", executionTips: ["Keep chest up", "Elbows to knees"], commonMistakes: ["Heels lifting off floor"], safetyNotes: "Maintain flat back", videoUrl: "m0GcZ24pK6k", equipment: "Dumbbell", difficulty: ExperienceLevel.BEGINNER },
  { id: "m2", name: { [Language.PT]: "Flexão de Braço", [Language.EN]: "Push Ups", [Language.ES]: "Flexiones" }, muscleGroup: "Chest", sets: 3, reps: "10-15", description: "Horizontal push", executionTips: ["Body in straight line", "Elbows at 45 degrees"], commonMistakes: ["Saggie hips"], safetyNotes: "Perform on knees if needed", videoUrl: "IODxDxX7oi4", equipment: "None", difficulty: ExperienceLevel.BEGINNER },
  { id: "m3", name: { [Language.PT]: "Remada Curvada", [Language.EN]: "Bent Over Row", [Language.ES]: "Remo Inclinado" }, muscleGroup: "Back", sets: 3, reps: "10", description: "Horizontal pull", executionTips: ["Hinge at hips", "Pull to hip bone"], commonMistakes: ["Rounding the back"], safetyNotes: "Brace core tight", videoUrl: "9efgcaj7-p0", equipment: "Dumbbell", difficulty: ExperienceLevel.INTERMEDIATE },
  { id: "m4", name: { [Language.PT]: "Press Militar", [Language.EN]: "Overhead Press", [Language.ES]: "Press Militar" }, muscleGroup: "Shoulders", sets: 3, reps: "10", description: "Vertical push", executionTips: ["Stack wrists over elbows", "No rib flare"], commonMistakes: ["Arching the back"], safetyNotes: "Avoid if shoulder pain exists", videoUrl: "2yjwHeErbqw", equipment: "Dumbbell", difficulty: ExperienceLevel.INTERMEDIATE },
  { id: "m5", name: { [Language.PT]: "Deadbug", [Language.EN]: "Deadbug", [Language.ES]: "Deadbug" }, muscleGroup: "Core", sets: 3, reps: "10/side", description: "Core stability", executionTips: ["Low back against floor", "Opposite arm/leg move"], commonMistakes: ["Losing back contact"], safetyNotes: "Slow and controlled", videoUrl: "4XLEnwUr1gk", equipment: "None", difficulty: ExperienceLevel.BEGINNER },
  { id: "m6", name: { [Language.PT]: "Levantamento Terra com Halter", [Language.EN]: "Dumbbell Deadlift", [Language.ES]: "Peso Muerto con Mancuernas" }, muscleGroup: "Hamstrings", sets: 3, reps: "10", description: "Hip hinge", executionTips: ["Hinge at hips", "Keep weights close"], commonMistakes: ["Bending the knees first"], safetyNotes: "Shoulders above hips", videoUrl: "lJ3QwaXNJfw", equipment: "Dumbbell", difficulty: ExperienceLevel.INTERMEDIATE },
  { id: "m7", name: { [Language.PT]: "Avanço", [Language.EN]: "Lunges", [Language.ES]: "Zancadas" }, muscleGroup: "Legs", sets: 3, reps: "10/side", description: "Single leg strength", executionTips: ["90 degree angles", "Tall torso"], commonMistakes: ["Knee caving in"], safetyNotes: "Hold for balance if needed", videoUrl: "QOVaHwm-Q6U", equipment: "None", difficulty: ExperienceLevel.BEGINNER },
  
  // NEW SPECIALIZED
  { id: "m8", name: { [Language.PT]: "Elevação de Panturrilha", [Language.EN]: "Calf Raise", [Language.ES]: "Elevación de Talones" }, muscleGroup: "Calves", sets: 4, reps: "15-20", description: "Isolate gastrocnemius", executionTips: ["Full stretch at bottom", "Pause at top"], commonMistakes: ["Bouncing"], safetyNotes: "Hold a wall for balance", videoUrl: "gwLzBJYoWl4", equipment: "Bodyweight", difficulty: ExperienceLevel.BEGINNER },

  // COOL DOWN
  { id: "c1", name: { [Language.PT]: "Postura da Criança", [Language.EN]: "Child's Pose", [Language.ES]: "Postura del Niño" }, muscleGroup: "Back", sets: 1, reps: "60s", description: "Passive stretch", executionTips: ["Sit on heels", "Reach forward"], commonMistakes: ["Holding breath"], safetyNotes: "Relax into it", videoUrl: "qYvEA2p2V_c", equipment: "Mat", difficulty: ExperienceLevel.BEGINNER }
];

export const PRESET_WORKOUTS: PresetWorkout[] = [
  { 
    id: "p1", 
    title: "Full Body – Health Foundations", 
    category: "BEGINNER", 
    primaryCategory: WorkoutCategory.FULL_BODY,
    tags: [BodyAreaTag.LEGS, BodyAreaTag.CHEST, BodyAreaTag.BACK, BodyAreaTag.CORE],
    duration: 60, 
    description: "Movement patterns and joint stability.", 
    warmupIds: ["w1", "w2"], 
    mainBlockIds: ["m1", "m2", "m3"], 
    accessoryIds: ["m5"], 
    cooldownIds: ["c1"] 
  },
  { 
    id: "p2", 
    title: "Full Body – No Rush / Longevity", 
    category: "LONGEVITY", 
    primaryCategory: WorkoutCategory.FULL_BODY,
    tags: [BodyAreaTag.LEGS, BodyAreaTag.CHEST, BodyAreaTag.BACK, BodyAreaTag.CORE],
    duration: 75, 
    description: "Controlled tempo for high metabolic health.", 
    warmupIds: ["w1", "w3"], 
    mainBlockIds: ["m6", "m2", "m1"], 
    accessoryIds: ["m5"], 
    cooldownIds: ["c1"] 
  },
  { 
    id: "p3", 
    title: "Upper Body Complete", 
    category: "GENERAL", 
    primaryCategory: WorkoutCategory.UPPER,
    tags: [BodyAreaTag.CHEST, BodyAreaTag.BACK, BodyAreaTag.SHOULDERS, BodyAreaTag.BICEPS, BodyAreaTag.TRICEPS],
    duration: 60, 
    description: "Balanced push and pull for upper body.", 
    warmupIds: ["w3"], 
    mainBlockIds: ["m2", "m3", "m4"], 
    accessoryIds: ["m5"], 
    cooldownIds: ["c1"] 
  },
  { 
    id: "p4", 
    title: "Lower Body Complete", 
    category: "STRENGTH", 
    primaryCategory: WorkoutCategory.LOWER,
    tags: [BodyAreaTag.LEGS, BodyAreaTag.GLUTES, BodyAreaTag.CALVES],
    duration: 60, 
    description: "Leg health and posterior chain focus.", 
    warmupIds: ["w2"], 
    mainBlockIds: ["m1", "m6", "m7"], 
    accessoryIds: ["m8"], 
    cooldownIds: ["c1"] 
  },
  { 
    id: "p5", 
    title: "Strength & Longevity", 
    category: "LONGEVITY", 
    primaryCategory: WorkoutCategory.FULL_BODY,
    tags: [BodyAreaTag.LEGS, BodyAreaTag.BACK, BodyAreaTag.CORE, BodyAreaTag.GLUTES],
    duration: 75, 
    description: "Compound movements with longevity focus.", 
    warmupIds: ["w1", "w2", "w3"], 
    mainBlockIds: ["m1", "m6", "m4"], 
    accessoryIds: ["m3"], 
    cooldownIds: ["c1"] 
  },
  { 
    id: "p6", 
    title: "Posture & Core Stability", 
    category: "HEALTH", 
    primaryCategory: WorkoutCategory.UPPER,
    tags: [BodyAreaTag.BACK, BodyAreaTag.SHOULDERS, BodyAreaTag.CORE],
    duration: 45, 
    description: "Fix sitting habits and strengthen core.", 
    warmupIds: ["w1"], 
    mainBlockIds: ["m5", "m3"], 
    accessoryIds: ["m2"], 
    cooldownIds: ["c1"] 
  },
  { 
    id: "p7", 
    title: "Fat Loss – Low Impact", 
    category: "WEIGHT LOSS", 
    primaryCategory: WorkoutCategory.FULL_BODY,
    tags: [BodyAreaTag.LEGS, BodyAreaTag.CHEST, BodyAreaTag.BACK, BodyAreaTag.CARDIO, BodyAreaTag.CORE],
    duration: 60, 
    description: "High volume, low impact burn.", 
    warmupIds: ["w2"], 
    mainBlockIds: ["m7", "m2", "m1"], 
    accessoryIds: ["m5"], 
    cooldownIds: ["c1"] 
  },
  { 
    id: "p8", 
    title: "Cardio Zone 2 + Strength", 
    category: "HEALTH", 
    primaryCategory: WorkoutCategory.CARDIO,
    tags: [BodyAreaTag.CARDIO, BodyAreaTag.LEGS, BodyAreaTag.CORE],
    duration: 75, 
    description: "Build aerobic base and functional strength.", 
    warmupIds: ["w1"], 
    mainBlockIds: ["m1", "m2"], 
    accessoryIds: ["m3"], 
    cooldownIds: ["c1"] 
  },
  { 
    id: "p9", 
    title: "Upper Push / Pull", 
    category: "GENERAL", 
    primaryCategory: WorkoutCategory.UPPER,
    tags: [BodyAreaTag.CHEST, BodyAreaTag.BACK, BodyAreaTag.SHOULDERS, BodyAreaTag.BICEPS, BodyAreaTag.TRICEPS],
    duration: 60, 
    description: "Classic hypertrophy push-pull day.", 
    warmupIds: ["w3"], 
    mainBlockIds: ["m2", "m3", "m4"], 
    accessoryIds: [], 
    cooldownIds: ["c1"] 
  },
  { 
    id: "p10", 
    title: "Lower Body & Glutes Focus", 
    category: "STRENGTH", 
    primaryCategory: WorkoutCategory.LOWER,
    tags: [BodyAreaTag.LEGS, BodyAreaTag.GLUTES, BodyAreaTag.CALVES],
    duration: 75, 
    description: "Enhanced glute and hamstring work.", 
    warmupIds: ["w2"], 
    mainBlockIds: ["m6", "m1", "m7"], 
    accessoryIds: ["m8"], 
    cooldownIds: ["c1"] 
  },
  { 
    id: "p11", 
    title: "Mobility + Strength Blend", 
    category: "LONGEVITY", 
    primaryCategory: WorkoutCategory.RECOVERY,
    tags: [BodyAreaTag.CORE, BodyAreaTag.LEGS, BodyAreaTag.BACK],
    duration: 45, 
    description: "Range of motion meets stability.", 
    warmupIds: ["w1", "w3"], 
    mainBlockIds: ["m5", "m7"], 
    accessoryIds: [], 
    cooldownIds: ["c1"] 
  },
  { 
    id: "p12", 
    title: "Senior Friendly Full Body", 
    category: "SENIOR", 
    primaryCategory: WorkoutCategory.FULL_BODY,
    tags: [BodyAreaTag.LEGS, BodyAreaTag.BACK, BodyAreaTag.CORE],
    duration: 60, 
    description: "Safety-first full body maintenance.", 
    warmupIds: ["w1", "w2"], 
    mainBlockIds: ["m1", "m2"], 
    accessoryIds: ["m5"], 
    cooldownIds: ["c1"] 
  },
  { 
    id: "p13", 
    title: "Express Calm Workout", 
    category: "EXPRESS", 
    primaryCategory: WorkoutCategory.FULL_BODY,
    tags: [BodyAreaTag.LEGS, BodyAreaTag.CHEST, BodyAreaTag.BACK, BodyAreaTag.CORE],
    duration: 45, 
    description: "Quick, effective, and unrushed.", 
    warmupIds: ["w1"], 
    mainBlockIds: ["m1", "m2", "m3"], 
    accessoryIds: [], 
    cooldownIds: ["c1"] 
  },
  { 
    id: "p14", 
    title: "Strength Progression Day", 
    category: "STRENGTH", 
    primaryCategory: WorkoutCategory.FULL_BODY,
    tags: [BodyAreaTag.LEGS, BodyAreaTag.CHEST, BodyAreaTag.BACK, BodyAreaTag.CORE],
    duration: 90, 
    description: "Deep dive into loading and technique.", 
    warmupIds: ["w1", "w2", "w3"], 
    mainBlockIds: ["m1", "m6", "m3", "m4"], 
    accessoryIds: ["m5"], 
    cooldownIds: ["c1"] 
  },
  { 
    id: "p15", 
    title: "Recovery & Movement Session", 
    category: "RECOVERY", 
    primaryCategory: WorkoutCategory.RECOVERY,
    tags: [BodyAreaTag.CORE, BodyAreaTag.LEGS, BodyAreaTag.BACK],
    duration: 45, 
    description: "Active rest for stiff joints.", 
    warmupIds: ["w1", "w3"], 
    mainBlockIds: ["w2", "m5"], 
    accessoryIds: [], 
    cooldownIds: ["c1"] 
  },
  { 
    id: "p16", 
    title: "Calves & Ankles – Strength + Mobility", 
    category: "HEALTH", 
    primaryCategory: WorkoutCategory.LOWER,
    tags: [BodyAreaTag.CALVES, BodyAreaTag.LEGS],
    duration: 45, 
    description: "Targeted lower leg work for joint longevity.", 
    warmupIds: ["w2"], 
    mainBlockIds: ["m8", "m7"], 
    accessoryIds: [], 
    cooldownIds: ["c1"] 
  }
];
