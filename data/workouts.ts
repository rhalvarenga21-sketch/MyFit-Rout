
import { Language, PresetWorkout, WorkoutCategory, BodyAreaTag } from '../types';

export const PRESET_WORKOUTS: PresetWorkout[] = [
  { 
    id: "p-peito-triceps", 
    title: { [Language.PT]: "Peito e Tríceps", [Language.EN]: "Chest and Triceps", [Language.ES]: "Pecho y Tríceps" }, 
    primaryCategory: WorkoutCategory.UPPER,
    tags: [BodyAreaTag.CHEST, BodyAreaTag.TRICEPS],
    duration: 60, 
    description: { [Language.PT]: "Treino focado em empurrar, desenvolvendo o peitoral e braços.", [Language.EN]: "Push focused workout for chest and arms.", [Language.ES]: "Enfoque en pecho y tríceps." }, 
    warmupIds: ["ch-5", "ar-5"], 
    mainBlockIds: ["ch-1", "ch-2", "ch-8", "ch-4"], 
    accessoryIds: ["ar-5", "ar-6"], 
    cooldownIds: ["cr-1"] 
  },
  { 
    id: "p-costas-biceps", 
    title: { [Language.PT]: "Costas e Bíceps", [Language.EN]: "Back and Biceps", [Language.ES]: "Espalda y Bíceps" }, 
    primaryCategory: WorkoutCategory.UPPER,
    tags: [BodyAreaTag.BACK, BodyAreaTag.BICEPS],
    duration: 60, 
    description: { [Language.PT]: "Foco em tração e dorsais largas.", [Language.EN]: "Lat focus and pull strength.", [Language.ES]: "Espalda y bíceps." }, 
    warmupIds: ["bk-2", "ar-1"], 
    mainBlockIds: ["bk-1", "bk-2", "bk-8", "bk-5"], 
    accessoryIds: ["ar-1", "ar-2"], 
    cooldownIds: ["cr-2"] 
  },
  { 
    id: "p-pernas-completo", 
    title: { [Language.PT]: "Pernas (Completo)", [Language.EN]: "Leg Day (Full)", [Language.ES]: "Piernas (Completo)" }, 
    primaryCategory: WorkoutCategory.LOWER,
    tags: [BodyAreaTag.LEGS, BodyAreaTag.GLUTES],
    duration: 75, 
    description: { [Language.PT]: "Treino exaustivo para membros inferiores.", [Language.EN]: "Total lower body fatigue.", [Language.ES]: "Entrenamiento completo de piernas." }, 
    warmupIds: ["lg-9", "cr-1"], 
    mainBlockIds: ["lg-1", "lg-2", "lg-3", "lg-4", "lg-5"], 
    accessoryIds: ["lg-6", "lg-8"], 
    cooldownIds: ["cr-5"] 
  },
  { 
    id: "p-ombros-abs", 
    title: { [Language.PT]: "Ombros e Abdômen", [Language.EN]: "Shoulders and Core", [Language.ES]: "Hombros y Core" }, 
    primaryCategory: WorkoutCategory.UPPER,
    tags: [BodyAreaTag.SHOULDERS, BodyAreaTag.CORE],
    duration: 60, 
    description: { [Language.PT]: "Desenvolvimento de ombros e estabilidade do core.", [Language.EN]: "Shoulder width and core stability.", [Language.ES]: "Hombros y abdominales." }, 
    warmupIds: ["sh-2", "cr-3"], 
    mainBlockIds: ["sh-1", "sh-2", "sh-3", "sh-5"], 
    accessoryIds: ["cr-1", "cr-2", "cr-4"], 
    cooldownIds: ["cr-5"] 
  },
  { 
    id: "p-full-body", 
    title: { [Language.PT]: "Corpo Inteiro (Mix)", [Language.EN]: "Full Body Mix", [Language.ES]: "Cuerpo Completo" }, 
    primaryCategory: WorkoutCategory.FULL_BODY,
    tags: [BodyAreaTag.CHEST, BodyAreaTag.BACK, BodyAreaTag.LEGS],
    duration: 45, 
    description: { [Language.PT]: "Treino rápido para manutenção geral.", [Language.EN]: "Quick general maintenance workout.", [Language.ES]: "Mantenimiento general." }, 
    warmupIds: ["cd-3"], 
    mainBlockIds: ["ch-1", "bk-2", "lg-2", "sh-1"], 
    accessoryIds: ["cr-1"], 
    cooldownIds: ["cr-5"] 
  }
];
