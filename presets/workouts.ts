
import { Language, PresetWorkout, WorkoutCategory, BodyAreaTag } from '../types';

export const PRESET_WORKOUTS: PresetWorkout[] = [
  { 
    id: "p-fb-health", 
    title: { [Language.PT]: "Corpo Inteiro – Longevidade", [Language.EN]: "Full Body – Longevity", [Language.ES]: "Cuerpo Completo – Longevidad" }, 
    primaryCategory: WorkoutCategory.FULL_BODY,
    tags: [BodyAreaTag.LEGS, BodyAreaTag.CHEST, BodyAreaTag.BACK, BodyAreaTag.CORE],
    duration: 60, 
    description: { [Language.PT]: "Foco em mobilidade e estabilidade articular.", [Language.EN]: "Focus on mobility and joint stability.", [Language.ES]: "Enfoque en movilidad y estabilidad articular." }, 
    warmupIds: ["core-1"], 
    mainBlockIds: ["leg-2", "chest-2", "back-2"], 
    accessoryIds: ["sh-2"], 
    cooldownIds: ["core-1"] 
  },
  { 
    id: "p-upper-push", 
    title: { [Language.PT]: "Superior – Empurrar (BR1)", [Language.EN]: "Upper – Push Emphasis", [Language.ES]: "Superior – Empuje" }, 
    primaryCategory: WorkoutCategory.UPPER,
    tags: [BodyAreaTag.CHEST, BodyAreaTag.SHOULDERS, BodyAreaTag.TRICEPS],
    duration: 60, 
    description: { [Language.PT]: "Peito, ombros e tríceps.", [Language.EN]: "Chest, shoulders, and triceps focus.", [Language.ES]: "Pecho, hombros y tríceps." }, 
    warmupIds: ["core-1"], 
    mainBlockIds: ["chest-1", "sh-1", "chest-2"], 
    accessoryIds: ["sh-2"], 
    cooldownIds: ["core-1"] 
  },
  { 
    id: "p-lower-quads", 
    title: { [Language.PT]: "Inferior – Quadríceps (BR2)", [Language.EN]: "Lower – Quads Emphasis", [Language.ES]: "Inferior – Cuádriceps" }, 
    primaryCategory: WorkoutCategory.LOWER,
    tags: [BodyAreaTag.LEGS, BodyAreaTag.CORE],
    duration: 75, 
    description: { [Language.PT]: "Força em quadríceps e estabilidade.", [Language.EN]: "Quad strength and stability focus.", [Language.ES]: "Fuerza en cuádriceps y estabilidad." }, 
    warmupIds: ["core-1"], 
    mainBlockIds: ["leg-1", "leg-2"], 
    accessoryIds: ["core-1"], 
    cooldownIds: ["core-1"] 
  },
  { 
    id: "p-upper-pull", 
    title: { [Language.PT]: "Superior – Puxar (BR3)", [Language.EN]: "Upper – Pull Emphasis", [Language.ES]: "Superior – Tracción" }, 
    primaryCategory: WorkoutCategory.UPPER,
    tags: [BodyAreaTag.BACK, BodyAreaTag.BICEPS, BodyAreaTag.SHOULDERS],
    duration: 60, 
    description: { [Language.PT]: "Costas e bíceps.", [Language.EN]: "Back and biceps focus.", [Language.ES]: "Espalda y bíceps." }, 
    warmupIds: ["core-1"], 
    mainBlockIds: ["back-1", "back-2"], 
    accessoryIds: ["sh-2"], 
    cooldownIds: ["core-1"] 
  },
  { 
    id: "p-lower-post", 
    title: { [Language.PT]: "Inferior – Posterior/Glúteo (BR4)", [Language.EN]: "Lower – Glutes & Hams", [Language.ES]: "Inferior – Isquios y Glúteos" }, 
    primaryCategory: WorkoutCategory.LOWER,
    tags: [BodyAreaTag.GLUTES, BodyAreaTag.LEGS, BodyAreaTag.CORE],
    duration: 60, 
    description: { [Language.PT]: "Foco em cadeia posterior.", [Language.EN]: "Posterior chain focus.", [Language.ES]: "Enfoque en cadena posterior." }, 
    warmupIds: ["core-1"], 
    mainBlockIds: ["leg-1", "core-1"], 
    accessoryIds: ["core-1"], 
    cooldownIds: ["core-1"] 
  },
  { 
    id: "p-cardio-zone2", 
    title: { [Language.PT]: "Cardio Zona 2 + Core", [Language.EN]: "Zone 2 Cardio + Core", [Language.ES]: "Cardio Zona 2 + Core" }, 
    primaryCategory: WorkoutCategory.CARDIO,
    tags: [BodyAreaTag.CARDIO, BodyAreaTag.CORE],
    duration: 45, 
    description: { [Language.PT]: "Condicionamento aeróbico de baixa intensidade.", [Language.EN]: "Low intensity aerobic conditioning.", [Language.ES]: "Acondicionamiento aeróbico de baja intensidad." }, 
    warmupIds: ["core-1"], 
    mainBlockIds: ["core-1"], 
    accessoryIds: [], 
    cooldownIds: ["core-1"] 
  }
];
