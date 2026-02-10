
const fs = require('fs');

const importFile = 'IMPORT_EXERCICIOS.txt';
const outputFile = 'data/exercises.ts';

if (!fs.existsSync(importFile)) {
  console.error(`Erro: Arquivo ${importFile} não encontrado.`);
  process.exit(1);
}

const content = fs.readFileSync(importFile, 'utf-8');
const lines = content.split('\n');

const newExercises = [];
let idCounter = 1;

const difficultyMap = {
  'Beginner': 'ExperienceLevel.BEGINNER',
  'Intermediate': 'ExperienceLevel.INTERMEDIATE',
  'Advanced': 'ExperienceLevel.ADVANCED'
};

const muscleMap = {
  'Chest': 'Chest',
  'Back': 'Back',
  'Legs': 'Legs',
  'Shoulders': 'Shoulders',
  'Arms': 'Arms',
  'Core': 'Core',
  'Cardio': 'Cardio',
  'Full Body': 'Full Body'
};

// Mapa manual de IDs de vídeo para exercícios chave
const videoIdMap = {
  // Legs
  'legs_quadriceps_leg_extension_bilateral_machine_gym_beginner': 'iQ92TuvBqRo',
  'legs_quadriceps_squat_bodyweight_bodyweight_home_gym_beginner': 'PZvsC_L1l8E',
  'legs_quadriceps_leg_press_standard_stance_machine_gym_beginner': 'EotSw18oR9w',

  // Chest
  'chest_chest_bench_press_flat_barbell_gym_intermediate': 'rT7Dg6D6G3E',
  'chest_chest_push_up_standard_bodyweight_home_gym_beginner': 'IODxDxX7oi4',

  // Back
  'back_lats_lat_pulldown_wide_grip_machine_cable_gym_beginner': 'JfP2zogyE8o',
  'back_lats_pull_up_bodyweight_bodyweight_gym_advanced': 'eGo4IYlbE5g',

  // Arms
  'arms_biceps_dumbbell_curl_standing_dumbbell_home_gym_beginner': '13Yv2Bw06A8',
  'arms_triceps_triceps_pushdown_rope_cable_gym_beginner': '-pSpn8GfIeU',
};

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  if (!line || line.startsWith('Nome do Exercício') || line.startsWith('Body') || line.startsWith('[')) continue;

  // STOPPER: Detect secondary header and stop to avoid duplicates
  if (line.startsWith('Exercise (EN)')) break;

  let cols = line.split('\t');

  // Se a linha for menor que o esperado, pular (Main list usually has 15+ cols)
  if (cols.length < 10) continue;

  // Mapeamento Corrigido (Shift +1 a partir da coluna 11 devido aos 2 tabs)
  const bodyArea = cols[0]?.trim() || 'Other';
  const primaryMuscle = cols[1]?.trim() || 'Other';
  const exerciseEn = cols[3]?.trim() || 'Exercise';
  const variation = cols[4]?.trim();
  const equipment = cols[5]?.trim() || 'Bodyweight';
  const levelRaw = cols[7]?.trim() || 'Beginner';

  // Col 11 (YouTube URL Search) - pode ser vazia
  // Col 12 (Notes)
  // Col 13 (PT Name)
  // Col 14 (ES Name)
  // Col 15 (Var PT)
  // Col 16 (Var ES)

  // Correção do deslocamento:
  // Se houver um tab extra (campo vazio) antes do youtube, indices mudam.
  // Vamos assumir o deslocamento observado: Notes está no 13, PT no 14, ES no 15.

  // Ajuste fino baseado na inspeção visual (YouTube link = 12, Notes = 13, PT = 14)
  const notes = cols[13]?.trim() || "Control movement";
  const exercisePt = cols[14]?.trim() || exerciseEn;
  const exerciseEs = cols[15]?.trim() || exerciseEn;

  const variationPt = cols[16]?.trim();
  const variationEs = cols[17]?.trim();

  const exId = cols[19]?.trim() || `ex-${idCounter++}`; // ID original da planilha

  const fullNameEn = variation ? `${exerciseEn} (${variation})` : exerciseEn;
  const fullNamePt = variationPt ? `${exercisePt} (${variationPt})` : (variation ? `${exercisePt} (${variation})` : exercisePt);
  const fullNameEs = variationEs ? `${exerciseEs} (${variationEs})` : (variation ? `${exerciseEs} (${variation})` : exerciseEs);

  const difficulty = difficultyMap[levelRaw] || 'ExperienceLevel.BEGINNER';
  const muscleGroup = muscleMap[bodyArea] || 'Other';

  // Tentar pegar ID mapeado manualmente 
  let videoUrl = videoIdMap[exId] || "";

  // LÓGICA DE PROPAGAÇÃO DE VÍDEO (Hardcode Inteligente)
  // Se não tem vídeo direto, procurar se existe um "ex-pai" com o mesmo nome base que tenha vídeo no map
  if (!videoUrl) {
    // ex: "Leg Extension"
    const myBaseName = exerciseEn.trim();

    // Find any other exercise ID in the map that belongs to this same base name group
    // Vamos varrer o videoIdMap para ver se algum dos IDs lá "pertence" a este grupo
    // Mas o map é ID -> Video. Precisamos saber o nome do ID do map? Não temos aqui facil.
    // Solução: Fazer o match inverso.

    // Vamos checar regras manuais de propagação baseadas no nome em Inglês
    if (myBaseName === 'Leg Extension') videoUrl = 'iQ92TuvBqRo';
    if (myBaseName === 'Squat') videoUrl = 'PZvsC_L1l8E';
    if (myBaseName === 'Leg Press') videoUrl = 'EotSw18oR9w'; // User Choice
    if (myBaseName === 'Lat Pulldown') videoUrl = 'JfP2zogyE8o';
    if (myBaseName === 'Bench Press') videoUrl = 'rT7Dg6D6G3E';
    if (myBaseName === 'Dumbbell Curl' || myBaseName.includes('Bicep Curl')) videoUrl = 'Qemb2cWVOd8'; // DeltaBolic Bicep
    if (myBaseName === 'Push-Up') videoUrl = 'IODxDxX7oi4';
    if (myBaseName === 'Triceps Pushdown') videoUrl = '-pSpn8GfIeU';

    // Novos DeltaBolic Adds
    if (myBaseName.includes('Chest Fly')) videoUrl = 'hKe5WG-zZRM';
    if (myBaseName.includes('Lateral Raise')) videoUrl = 'lMYs7FY8os4';
    if (myBaseName.includes('Rear Delt')) videoUrl = 'H5UxZFl0lgk';

    // Scraper Wave 2
    if (myBaseName === 'Chest Press' || myBaseName.includes('Chest Press')) videoUrl = 'KfDDkDOHO5c';
    if (myBaseName === 'Pull Up' || myBaseName.includes('Pull-Up')) videoUrl = 'a7_k1upEPjc';
    if (myBaseName === 'Lat Pulldown') videoUrl = 'bNmvKpJSWKM';
    if (myBaseName === 'Squat') videoUrl = 'dW3zj79xfrc'; // DeltaBolic Perfect Squat
    if (myBaseName.includes('Incline Curl')) videoUrl = '7dGvfAjiqM4';
    if (myBaseName.includes('Bayesian')) videoUrl = 'w3sXATQzGvc';
    if (myBaseName.includes('Bulgarian')) videoUrl = 'tdOk9XkzGVc';
    if (myBaseName === 'Bench Press') videoUrl = 'NliSiO1AZ_8'; // Angles video
    if (myBaseName.includes('Triceps Pushdown')) videoUrl = 'WbfNbXBc8FA';
  }

  // AUDIT: Coletar faltantes
  if (!videoUrl) {
    if (!global.missingVideos) global.missingVideos = [];
    global.missingVideos.push(`${fullNameEn} (Grupo: ${muscleGroup})`);
  } else {
    if (!global.foundVideos) global.foundVideos = [];
    global.foundVideos.push(`${fullNameEn} [${videoUrl}]`);
  }

  const exerciseObj = `
  { 
    id: "${exId}", 
    name: { 
      [Language.PT]: "${fullNamePt.replace(/"/g, "'")}", 
      [Language.EN]: "${fullNameEn.replace(/"/g, "'")}", 
      [Language.ES]: "${fullNameEs.replace(/"/g, "'")}" 
    }, 
    muscleGroup: "${muscleGroup}", 
    sets: 3, 
    reps: "10-12", 
    executionTips: ["${notes.replace(/"/g, "'")}"],
    commonMistakes: [], 
    safetyNotes: "Maintain good form", 
    videoUrl: "${videoUrl}", 
    equipment: "${equipment}", 
    difficulty: ${difficulty} 
  },`;

  newExercises.push(exerciseObj);
}

const fileContent = `
import { Language, ExperienceLevel, Exercise } from '../types';

export const EXERCISE_LIBRARY: Exercise[] = [
${newExercises.join('\n')}
];
`;

fs.writeFileSync(outputFile, fileContent);
console.log(`Processado ${newExercises.length} exercícios.`);

// Write Audit Report
const auditContent = `
# Relatório de Vídeos de Exercícios

## ✅ Vídeos Implementados (${(global.foundVideos || []).length})
${(global.foundVideos || []).map(v => `- ${v}`).join('\n')}

## ❌ Exercícios Sem Vídeo (${(global.missingVideos || []).length})
${(global.missingVideos || []).map(v => `- ${v}`).join('\n')}
`;

fs.writeFileSync('VIDEO_AUDIT_REPORT.md', auditContent);
console.log(`Relatório de auditoria gerado: VIDEO_AUDIT_REPORT.md`);
