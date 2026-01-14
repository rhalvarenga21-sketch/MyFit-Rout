
import { ExperienceLevel, Exercise, PresetWorkout } from './types';

export const EXERCISE_DATABASE: Exercise[] = [
  // WARMUPS
  { id: "w1", name: "Cat-Cow", muscleGroup: "Spine", sets: 1, reps: "10", description: "Spinal mobility", executionTips: ["Breathe in as you arch", "Breathe out as you round"], commonMistakes: ["Moving too fast"], safetyNotes: "Move within pain-free range", videoUrl: "uGv_L7m0Y_0", equipment: "Mat", difficulty: ExperienceLevel.BEGINNER },
  { id: "w2", name: "Glute Bridge", muscleGroup: "Glutes", sets: 1, reps: "15", description: "Glute activation", executionTips: ["Drive through heels", "Squeeze glutes at top"], commonMistakes: ["Arching lower back"], safetyNotes: "Keep core engaged", videoUrl: "8bbE6adA-i0", equipment: "Mat", difficulty: ExperienceLevel.BEGINNER },
  { id: "w3", name: "Shoulder CARs", muscleGroup: "Shoulders", sets: 1, reps: "5/side", description: "Controlled articular rotations", executionTips: ["Full circular motion", "Keep body still"], commonMistakes: ["Rotating the torso"], safetyNotes: "Avoid sharp pain", videoUrl: "o2M_rW_8v0g", equipment: "None", difficulty: ExperienceLevel.BEGINNER },
  
  // MAIN MOVEMENTS
  { id: "m1", name: "Goblet Squat", muscleGroup: "Legs", sets: 3, reps: "12", description: "Knee dominant lower body", executionTips: ["Keep chest up", "Elbows to knees"], commonMistakes: ["Heels lifting off floor"], safetyNotes: "Maintain flat back", videoUrl: "m0GcZ24pK6k", equipment: "Dumbbell", difficulty: ExperienceLevel.BEGINNER },
  { id: "m2", name: "Push Ups", muscleGroup: "Chest", sets: 3, reps: "10-15", description: "Horizontal push", executionTips: ["Body in straight line", "Elbows at 45 degrees"], commonMistakes: ["Saggie hips"], safetyNotes: "Perform on knees if needed", videoUrl: "IODxDxX7oi4", equipment: "None", difficulty: ExperienceLevel.BEGINNER },
  { id: "m3", name: "Bent Over Row", muscleGroup: "Back", sets: 3, reps: "10", description: "Horizontal pull", executionTips: ["Hinge at hips", "Pull to hip bone"], commonMistakes: ["Rounding the back"], safetyNotes: "Brace core tight", videoUrl: "9efgcaj7-p0", equipment: "Dumbbell", difficulty: ExperienceLevel.INTERMEDIATE },
  { id: "m4", name: "Overhead Press", muscleGroup: "Shoulders", sets: 3, reps: "10", description: "Vertical push", executionTips: ["Stack wrists over elbows", "No rib flare"], commonMistakes: ["Arching the back"], safetyNotes: "Avoid if shoulder pain exists", videoUrl: "2yjwHeErbqw", equipment: "Dumbbell", difficulty: ExperienceLevel.INTERMEDIATE },
  { id: "m5", name: "Deadbug", muscleGroup: "Core", sets: 3, reps: "10/side", description: "Core stability", executionTips: ["Low back against floor", "Opposite arm/leg move"], commonMistakes: ["Losing back contact"], safetyNotes: "Slow and controlled", videoUrl: "4XLEnwUr1gk", equipment: "None", difficulty: ExperienceLevel.BEGINNER },
  { id: "m6", name: "Dumbbell Deadlift", muscleGroup: "Hamstrings", sets: 3, reps: "10", description: "Hip hinge", executionTips: ["Hinge at hips", "Keep weights close"], commonMistakes: ["Bending the knees first"], safetyNotes: "Shoulders above hips", videoUrl: "lJ3QwaXNJfw", equipment: "Dumbbell", difficulty: ExperienceLevel.INTERMEDIATE },
  { id: "m7", name: "Lunges", muscleGroup: "Legs", sets: 3, reps: "10/side", description: "Single leg strength", executionTips: ["90 degree angles", "Tall torso"], commonMistakes: ["Knee caving in"], safetyNotes: "Hold for balance if needed", videoUrl: "QOVaHwm-Q6U", equipment: "None", difficulty: ExperienceLevel.BEGINNER },
  
  // COOL DOWN
  { id: "c1", name: "Child's Pose", muscleGroup: "Back", sets: 1, reps: "60s", description: "Passive stretch", executionTips: ["Sit on heels", "Reach forward"], commonMistakes: ["Holding breath"], safetyNotes: "Relax into it", videoUrl: "qYvEA2p2V_c", equipment: "Mat", difficulty: ExperienceLevel.BEGINNER }
];

export const PRESET_WORKOUTS: PresetWorkout[] = [
  { id: "p1", title: "Full Body – Health Foundations", category: "BEGINNER", duration: 60, description: "Movement patterns and joint stability.", warmupIds: ["w1", "w2"], mainBlockIds: ["m1", "m2", "m3"], accessoryIds: ["m5"], cooldownIds: ["c1"] },
  { id: "p2", title: "Full Body – No Rush / Longevity", category: "LONGEVITY", duration: 75, description: "Controlled tempo for high metabolic health.", warmupIds: ["w1", "w3"], mainBlockIds: ["m6", "m2", "m1"], accessoryIds: ["m5"], cooldownIds: ["c1"] },
  { id: "p3", title: "Upper Body Complete", category: "GENERAL", duration: 60, description: "Balanced push and pull for upper body.", warmupIds: ["w3"], mainBlockIds: ["m2", "m3", "m4"], accessoryIds: ["m5"], cooldownIds: ["c1"] },
  { id: "p4", title: "Lower Body Complete", category: "STRENGTH", duration: 60, description: "Leg health and posterior chain focus.", warmupIds: ["w2"], mainBlockIds: ["m1", "m6", "m7"], accessoryIds: ["m5"], cooldownIds: ["c1"] },
  { id: "p5", title: "Strength & Longevity", category: "LONGEVITY", duration: 75, description: "Compound movements with longevity focus.", warmupIds: ["w1", "w2", "w3"], mainBlockIds: ["m1", "m6", "m4"], accessoryIds: ["m3"], cooldownIds: ["c1"] },
  { id: "p6", title: "Posture & Core Stability", category: "HEALTH", duration: 45, description: "Fix sitting habits and strengthen core.", warmupIds: ["w1"], mainBlockIds: ["m5", "m3"], accessoryIds: ["m2"], cooldownIds: ["c1"] },
  { id: "p7", title: "Fat Loss – Low Impact", category: "WEIGHT LOSS", duration: 60, description: "High volume, low impact burn.", warmupIds: ["w2"], mainBlockIds: ["m7", "m2", "m1"], accessoryIds: ["m5"], cooldownIds: ["c1"] },
  { id: "p8", title: "Cardio Zone 2 + Strength", category: "HEALTH", duration: 75, description: "Build aerobic base and functional strength.", warmupIds: ["w1"], mainBlockIds: ["m1", "m2"], accessoryIds: ["m3"], cooldownIds: ["c1"] },
  { id: "p9", title: "Upper Push / Pull", category: "GENERAL", duration: 60, description: "Classic hypertrophy push-pull day.", warmupIds: ["w3"], mainBlockIds: ["m2", "m3", "m4"], accessoryIds: [], cooldownIds: ["c1"] },
  { id: "p10", title: "Lower Body & Glutes Focus", category: "STRENGTH", duration: 75, description: "Enhanced glute and hamstring work.", warmupIds: ["w2"], mainBlockIds: ["m6", "m1", "m7"], accessoryIds: ["m2"], cooldownIds: ["c1"] },
  { id: "p11", title: "Mobility + Strength Blend", category: "LONGEVITY", duration: 45, description: "Range of motion meets stability.", warmupIds: ["w1", "w3"], mainBlockIds: ["m5", "m7"], accessoryIds: [], cooldownIds: ["c1"] },
  { id: "p12", title: "Senior Friendly Full Body", category: "SENIOR", duration: 60, description: "Safety-first full body maintenance.", warmupIds: ["w1", "w2"], mainBlockIds: ["m1", "m2"], accessoryIds: ["m5"], cooldownIds: ["c1"] },
  { id: "p13", title: "Express Calm Workout", category: "EXPRESS", duration: 45, description: "Quick, effective, and unrushed.", warmupIds: ["w1"], mainBlockIds: ["m1", "m2", "m3"], accessoryIds: [], cooldownIds: ["c1"] },
  { id: "p14", title: "Strength Progression Day", category: "STRENGTH", duration: 90, description: "Deep dive into loading and technique.", warmupIds: ["w1", "w2", "w3"], mainBlockIds: ["m1", "m6", "m3", "m4"], accessoryIds: ["m5"], cooldownIds: ["c1"] },
  { id: "p15", title: "Recovery & Movement Session", category: "RECOVERY", duration: 45, description: "Active rest for stiff joints.", warmupIds: ["w1", "w3"], mainBlockIds: ["w2", "m5"], accessoryIds: [], cooldownIds: ["c1"] }
];
