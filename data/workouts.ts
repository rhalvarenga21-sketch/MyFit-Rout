
import { Language, PresetWorkout, WorkoutCategory, BodyAreaTag } from '../types';

export const PRESET_WORKOUTS: PresetWorkout[] = [
  { 
    id: "p-peito-triceps", 
    title: { [Language.PT]: "Peito e Tríceps", [Language.EN]: "Chest and Triceps", [Language.ES]: "Pecho y Tríceps" }, 
    primaryCategory: WorkoutCategory.UPPER,
    tags: [BodyAreaTag.CHEST, BodyAreaTag.TRICEPS],
    duration: 60, 
    description: { [Language.PT]: "Treino focado em empurrar, desenvolvendo peitoral e braços.", [Language.EN]: "Push-focused workout for chest and arm development.", [Language.ES]: "Entrenamiento de empuje para pecho y brazos." }, 
    warmupIds: ["ch-5", "ar-5"], 
    mainBlockIds: ["ch-1", "ch-2", "ch-4"], 
    accessoryIds: ["ar-5", "ar-6"], 
    cooldownIds: ["cr-1"] 
  },
  { 
    id: "p-costas-biceps", 
    title: { [Language.PT]: "Costas e Bíceps", [Language.EN]: "Back and Biceps", [Language.ES]: "Espalda y Bíceps" }, 
    primaryCategory: WorkoutCategory.UPPER,
    tags: [BodyAreaTag.BACK, BodyAreaTag.BICEPS],
    duration: 60, 
    description: { [Language.PT]: "Treino de tração focado em dorsais e flexores de braço.", [Language.EN]: "Pull-focused workout for back and biceps.", [Language.ES]: "Entrenamiento de tracción para espalda y bíceps." }, 
    warmupIds: ["bk-2", "cr-5"], 
    mainBlockIds: ["bk-1", "bk-2", "bk-3", "bk-4"], 
    accessoryIds: ["ar-1", "ar-2"], 
    cooldownIds: ["cr-2"] 
  },
  { 
    id: "p-pernas-completo", 
    title: { [Language.PT]: "Pernas Completo", [Language.EN]: "Full Legs", [Language.ES]: "Piernas Completo" }, 
    primaryCategory: WorkoutCategory.LOWER,
    tags: [BodyAreaTag.LEGS, BodyAreaTag.GLUTES],
    duration: 75, 
    description: { [Language.PT]: "Treino exaustivo para membros inferiores.", [Language.EN]: "Comprehensive lower body workout.", [Language.ES]: "Entrenamiento completo de piernas." }, 
    warmupIds: ["lg-9", "cr-1"], 
    mainBlockIds: ["lg-1", "lg-2", "lg-3", "lg-4", "lg-5"], 
    accessoryIds: ["lg-6", "lg-9"], 
    cooldownIds: ["cr-1"] 
  },
  { 
    id: "p-ombros-abs", 
    title: { [Language.PT]: "Ombros e Abdômen", [Language.EN]: "Shoulders and Abs", [Language.ES]: "Hombros y Abdominales" }, 
    primaryCategory: WorkoutCategory.UPPER,
    tags: [BodyAreaTag.SHOULDERS, BodyAreaTag.CORE],
    duration: 60, 
    description: { [Language.PT]: "Foco em deltoides e fortalecimento do core.", [Language.EN]: "Focus on deltoids and core strengthening.", [Language.ES]: "Enfoque en deltoides y core." }, 
    warmupIds: ["sh-2", "cr-3"], 
    mainBlockIds: ["sh-1", "sh-2", "sh-3", "sh-5"], 
    accessoryIds: ["cr-1", "cr-2", "cr-3"], 
    cooldownIds: ["cr-5"] 
  },
  { 
    id: "p-longevidade", 
    title: { [Language.PT]: "Longevidade e Postura", [Language.EN]: "Longevity and Posture", [Language.ES]: "Longevidad y Postura" }, 
    primaryCategory: WorkoutCategory.FULL_BODY,
    tags: [BodyAreaTag.CORE, BodyAreaTag.BACK, BodyAreaTag.LEGS],
    duration: 45, 
    description: { [Language.PT]: "Foco em movimentos funcionais e saúde articular.", [Language.EN]: "Focus on functional movements and joint health.", [Language.ES]: "Enfoque en movimientos funcionales y salud articular." }, 
    warmupIds: ["cr-5", "lg-9"], 
    mainBlockIds: ["lg-2", "bk-3", "sh-3", "cr-1"], 
    accessoryIds: ["bk-6", "cr-2"], 
    cooldownIds: ["cr-5"] 
  }
];
