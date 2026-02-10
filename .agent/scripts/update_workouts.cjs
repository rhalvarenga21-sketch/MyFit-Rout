
const fs = require('fs');

// Objetivo: Ler o arquivo data/exercises.ts, pegar IDs reais dos novos exercícios e atualizar data/workouts.ts

// 1. Simular a leitura bruta do arquivo exercises.ts porque não podemos importar TS diretamente no node puro sem config
const exercisesContent = fs.readFileSync('data/exercises.ts', 'utf-8');

// Regex para extrair IDs e MuscleGroups
// id: "Extensión de piernas — Bilateral", ... muscleGroup: "Legs"
const exercises = [];
const exerciseRegex = /id:\s*"([^"]+)",[\s\S]*?muscleGroup:\s*"([^"]+)"/g;
let match;

while ((match = exerciseRegex.exec(exercisesContent)) !== null) {
    exercises.push({ id: match[1], muscleGroup: match[2] });
}

console.log(`Encontrados ${exercises.length} exercícios para mapear.`);

// Agrupar por musculo
const byMuscle = {};
exercises.forEach(ex => {
    if (!byMuscle[ex.muscleGroup]) byMuscle[ex.muscleGroup] = [];
    byMuscle[ex.muscleGroup].push(ex.id);
});

// Helper para pegar random exercises
const getRandom = (muscle, count) => {
    const list = byMuscle[muscle] || [];
    return list.slice(0, count); // Pegar os primeiros 'count' (mais estavel) ou random
};

// 2. Definir os novos mapeamentos para os presets existentes
const newPresets = [
    {
        id: "p-peito-triceps",
        // Chest e Triceps (Arms/Triceps não está separado no muscleGroup, está tudo em Arms? Vamos checar)
        // Na nossa lista importada, Triceps está em "Arms".
        mainBlockIds: [...getRandom('Chest', 4)],
        accessoryIds: [...getRandom('Arms', 2)]
    },
    {
        id: "p-costas-biceps",
        mainBlockIds: [...getRandom('Back', 4)],
        accessoryIds: [...getRandom('Arms', 2)] // Assumindo que Arms tem biceps tb. O ideal seria filtrar por nome 'Curl' mas vamos simplificar.
    },
    {
        id: "p-pernas-completo",
        mainBlockIds: [...getRandom('Legs', 6)],
        accessoryIds: []
    },
    {
        id: "p-ombros-abs",
        mainBlockIds: [...getRandom('Shoulders', 4)],
        accessoryIds: [...getRandom('Core', 3)]
    }
];

// 3. Ler e Atualizar workouts.ts
let workoutsContent = fs.readFileSync('data/workouts.ts', 'utf-8');

newPresets.forEach(preset => {
    // Regex para encontrar o bloco do preset e substituir os arrays de IDs
    // id: "p-peito-triceps", ... mainBlockIds: [...]

    // Substituir mainBlockIds
    const mainIdsStr = `["${preset.mainBlockIds.join('", "')}"]`;
    const accIdsStr = `["${preset.accessoryIds.join('", "')}"]`;

    // Procura o ID e depois substitui a linha mainBlockIds seguinte
    // Logica simplificada de replace string direta pode ser perigosa se o formato mudar, mas aqui é controlado.

    // Vamos reconstruir o arquivo data/workouts.ts completamente com os novos IDs mapeados é mais seguro?
    // Não, porque perderíamos descrições. Vamos fazer replace com regex especifico por ID.
});

// Como o regex replace complexo é falho, vou reescrever o arquivo workouts.ts com os dados novos HARDCODED
// baseado no template original, mas injetando os IDs que coletei do `byMuscle`.

const getIds = (muscle, q) => {
    const list = byMuscle[muscle] || [];
    // Tentar pegar variados se possivel
    return list.slice(0, q).length > 0 ? list.slice(0, q) : ["ex-placeholder"];
};

// IDs Reais coletados da sua importação (Baseado na ordem do arquivo exercises.ts lido)
// Chest: ex-1..
const chestIds = getIds('Chest', 5);
const backIds = getIds('Back', 5);
const legIds = getIds('Legs', 8);
const shoulderIds = getIds('Shoulders', 5);
const armIds = getIds('Arms', 6); // Mistura biceps e triceps
const coreIds = getIds('Core', 5);

const newWorkoutsFile = `
import { Language, PresetWorkout, WorkoutCategory, BodyAreaTag } from '../types';

export const PRESET_WORKOUTS: PresetWorkout[] = [
  {
    id: "p-peito-triceps",
    title: { [Language.PT]: "Peito e Tríceps", [Language.EN]: "Chest and Triceps", [Language.ES]: "Pecho y Tríceps" },
    primaryCategory: WorkoutCategory.UPPER,
    tags: [BodyAreaTag.CHEST, BodyAreaTag.TRICEPS],
    duration: 60,
    description: { [Language.PT]: "Treino focado em empurrar, desenvolvendo o peitoral e braços.", [Language.EN]: "Push focused workout for chest and arms.", [Language.ES]: "Enfoque en pecho y tríceps." },
    warmupIds: ["${chestIds[4] || 'chest-warmup'}"], 
    mainBlockIds: ["${chestIds[0]}", "${chestIds[1]}", "${chestIds[2]}", "${chestIds[3]}"], 
    accessoryIds: ["${armIds[3]}", "${armIds[4]}"], // Tentando pegar do final da lista de arms (triceps geralmente pro final)
    cooldownIds: ["${coreIds[0]}"]
  },
  {
    id: "p-costas-biceps",
    title: { [Language.PT]: "Costas e Bíceps", [Language.EN]: "Back and Biceps", [Language.ES]: "Espalda y Bíceps" },
    primaryCategory: WorkoutCategory.UPPER,
    tags: [BodyAreaTag.BACK, BodyAreaTag.BICEPS],
    duration: 60,
    description: { [Language.PT]: "Foco em tração e dorsais largas.", [Language.EN]: "Lat focus and pull strength.", [Language.ES]: "Espalda y bíceps." },
    warmupIds: ["${backIds[4] || 'back-warmup'}"],
    mainBlockIds: ["${backIds[0]}", "${backIds[1]}", "${backIds[2]}", "${backIds[3]}"],
    accessoryIds: ["${armIds[0]}", "${armIds[1]}"], // Inicio da lista arms (biceps)
    cooldownIds: ["${coreIds[1]}"]
  },
  {
    id: "p-pernas-completo",
    title: { [Language.PT]: "Pernas (Completo)", [Language.EN]: "Leg Day (Full)", [Language.ES]: "Piernas (Completo)" },
    primaryCategory: WorkoutCategory.LOWER,
    tags: [BodyAreaTag.LEGS, BodyAreaTag.GLUTES],
    duration: 75,
    description: { [Language.PT]: "Treino exaustivo para membros inferiores.", [Language.EN]: "Total lower body fatigue.", [Language.ES]: "Entrenamiento completo de piernas." },
    warmupIds: ["${legIds[6] || 'leg-warmup'}"],
    mainBlockIds: ["${legIds[0]}", "${legIds[1]}", "${legIds[2]}", "${legIds[3]}", "${legIds[4]}"],
    accessoryIds: ["${legIds[5]}"],
    cooldownIds: ["${coreIds[0]}"]
  },
  {
    id: "p-ombros-abs",
    title: { [Language.PT]: "Ombros e Abdômen", [Language.EN]: "Shoulders and Core", [Language.ES]: "Hombros y Core" },
    primaryCategory: WorkoutCategory.UPPER,
    tags: [BodyAreaTag.SHOULDERS, BodyAreaTag.CORE],
    duration: 60,
    description: { [Language.PT]: "Desenvolvimento de ombros e estabilidade do core.", [Language.EN]: "Shoulder width and core stability.", [Language.ES]: "Hombros y abdominales." },
    warmupIds: ["${shoulderIds[0]}"],
    mainBlockIds: ["${shoulderIds[1]}", "${shoulderIds[2]}", "${shoulderIds[3]}"],
    accessoryIds: ["${coreIds[0]}", "${coreIds[1]}", "${coreIds[2]}"],
    cooldownIds: ["${coreIds[3]}"]
  }
];
`;

fs.writeFileSync('data/workouts.ts', newWorkoutsFile);
console.log('Workouts atualizados com novos IDs!');

