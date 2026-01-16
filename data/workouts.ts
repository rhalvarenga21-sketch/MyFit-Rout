
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
  },
  // --- NEW VARIANTS ---
  {
    id: "p-gluteos-foco",
    title: { [Language.PT]: "Glúteos e Posterior", [Language.EN]: "Glute & Hamstring", [Language.ES]: "Glúteos y Femoral" },
    primaryCategory: WorkoutCategory.LOWER,
    tags: [BodyAreaTag.GLUTES, BodyAreaTag.LEGS],
    duration: 60,
    description: { [Language.PT]: "Foco total na cadeia posterior e glúteos.", [Language.EN]: "Posterior chain builder.", [Language.ES]: "Enfoque en glúteos." },
    warmupIds: ["lg-13", "cd-11"],
    mainBlockIds: ["lg-8", "lg-5", "lg-14", "lg-10"],
    accessoryIds: ["lg-7", "cr-5"],
    cooldownIds: ["cr-2"]
  },
  {
    id: "p-cardio-hiit",
    title: { [Language.PT]: "HIIT Intenso (20min)", [Language.EN]: "HIIT Burn (20min)", [Language.ES]: "HIIT Intenso" },
    primaryCategory: WorkoutCategory.CARDIO,
    tags: [BodyAreaTag.CARDIO],
    duration: 45,
    description: { [Language.PT]: "Alta intensidade para queimar gordura rápido.", [Language.EN]: "High intensity fat burner.", [Language.ES]: "Quema grasa rápido." },
    warmupIds: ["cd-1"],
    mainBlockIds: ["cd-2", "cd-12", "cd-11", "cd-10", "cd-3"],
    accessoryIds: ["cr-1"],
    cooldownIds: ["cr-5"]
  },
  {
    id: "p-cardio-bike",
    title: { [Language.PT]: "Bike (Resistência)", [Language.EN]: "Cycling Endurance", [Language.ES]: "Ciclismo Resistencia" },
    primaryCategory: WorkoutCategory.CARDIO,
    tags: [BodyAreaTag.CARDIO],
    duration: 45,
    description: { [Language.PT]: "Foco cardiovascular sem impacto.", [Language.EN]: "Low impact cardio.", [Language.ES]: "Cardio sin impacto." },
    warmupIds: ["cd-3"],
    mainBlockIds: ["cd-4"],
    accessoryIds: ["cr-3"],
    cooldownIds: ["lg-12"]
  },
  {
    id: "p-cardio-stair",
    title: { [Language.PT]: "Escada (Definição)", [Language.EN]: "Stair Climber Shred", [Language.ES]: "Escalera Definición" },
    primaryCategory: WorkoutCategory.CARDIO,
    tags: [BodyAreaTag.CARDIO, BodyAreaTag.LEGS],
    duration: 45,
    description: { [Language.PT]: "Alta queima calórica e definição de pernas.", [Language.EN]: "High calorie burn leg toner.", [Language.ES]: "Quema grasa piernas." },
    warmupIds: ["lg-9"],
    mainBlockIds: ["cd-7"],
    accessoryIds: ["lg-12"],
    cooldownIds: ["cr-5"]
  }
];
