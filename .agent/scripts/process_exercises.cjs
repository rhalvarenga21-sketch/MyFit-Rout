
const fs = require('fs');
const path = require('path');

// 1. Ler o arquivo de importação
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

// Mapeamento de dificuldade
const difficultyMap = {
    'Beginner': 'ExperienceLevel.BEGINNER',
    'Intermediate': 'ExperienceLevel.INTERMEDIATE',
    'Advanced': 'ExperienceLevel.ADVANCED'
};

// Mapeamento de grupos musculares para o formato do app (normalização)
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

// Função para buscar ID do YouTube (Fake Search para demonstração, na real o vídeo é extraído do link se houver)
// Se a planilha já tivesse o ID do Youtube na coluna certa, usaríamos. 
// Como não tem, vamos gerar IDs temporários ou placeholders, ou tentar extrair de links.
// A planilha fornecida tem colunas:
// 0: Body Area
// 1: Primary Muscle
// 2: Secondary Muscle(s)
// 3: Exercise (EN Name)
// ...
// 11: YouTube Reference (search link) -> Vamos usar o termo de busca aqui talvez?
// 13: Exercise (PT)
// 14: Exercise (ES)

// NOTA: A estrutura colada parece ser TAB separated ou similar. Vamos tentar detectar.
// O usuário colou um dump de excel. 

console.log(`Processando ${lines.length} linhas...`);

let processedCount = 0;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line || line.startsWith('Nome do Exercício') || line.startsWith('Body Area') || line.startsWith('[')) continue;

    // Tentar separar por TAB, se falhar, Pipe.
    let cols = line.split('\t');
    if (cols.length < 5) cols = line.split('|');

    // Se ainda assim tiver poucas colunas, pular (linha vazia ou lixo)
    if (cols.length < 5) continue;

    // Extrair dados baseados na ordem provável das colunas do dump
    // Exemplo da linha 9: Legs | Quadriceps | Glutes | Leg Extension | Bilateral | ...

    const bodyArea = cols[0]?.trim() || 'Other';
    const primaryMuscle = cols[1]?.trim() || 'Other';
    const exerciseEn = cols[3]?.trim() || 'Exercise'; // Exercise Name EN
    const variation = cols[4]?.trim();
    const equipment = cols[5]?.trim() || 'Bodyweight';
    const levelRaw = cols[7]?.trim() || 'Beginner';

    // Traduções (Estão nas colunas 13 e 14 segundo o cabeçalho da linha 7)
    // Mas cuidado, array index 0-based.
    // 0:BodyArea, 1:PriMuscle, 2:SecMuscle, 3:ExName, 4:Var, 5:Equip, 6:Env, 7:Lvl, 8:Pattern, 9:VidStat, 10:Pexels, 11:YoutubeSearch, 12:Notes, 13:ExPT, 14:ExES
    const exercisePt = cols[13]?.trim() || exerciseEn;
    const exerciseEs = cols[14]?.trim() || exerciseEn;

    const youtubeSearchLink = cols[11]?.trim() || '';

    // Gerar nome composto se tiver variação
    const fullNameEn = variation ? `${exerciseEn} (${variation})` : exerciseEn;
    const fullNamePt = variation ? `${exercisePt} (${variation})` : exercisePt; // Idealmente traduziria a variação também, mas vamos manter simples por enquanto ou ver se tem coluna (tem 15 e 16 para variação traduzida!)

    const variationPt = cols[15]?.trim();
    const variationEs = cols[16]?.trim();

    const finalNamePt = variationPt ? `${exercisePt} (${variationPt})` : fullNamePt;
    const finalNameEs = variationEs ? `${exerciseEs} (${variationEs})` : (variation ? `${exerciseEs} (${variation})` : exerciseEs);

    // Gerar ID do exercício (limpo)
    const exId = cols[19]?.trim() || `ex-${idCounter++}`; // Coluna 19 é o ID se existir

    // Tentar encontrar video ID. Se não tiver, usar um placeholder de busca
    // O usuário forneceu links de BUSCA, não links diretos de vídeo.
    // Ex: https://www.youtube.com/results?search_query=leg+extension+machine+proper+form
    // Vamos deixar vazio para o componente mostrar o botão "Buscar no YouTube" que acabei de criar?
    // OU, melhor: Deixamos vazio e o componente vai gerar o link de busca automaticamente.
    const videoUrl = "";

    const difficulty = difficultyMap[levelRaw] || 'ExperienceLevel.BEGINNER';
    const muscleGroup = muscleMap[bodyArea] || 'Other';

    const exerciseObj = `
  { 
    id: "${exId}", 
    name: { 
      [Language.PT]: "${finalNamePt.replace(/"/g, "'")}", 
      [Language.EN]: "${fullNameEn.replace(/"/g, "'")}", 
      [Language.ES]: "${finalNameEs.replace(/"/g, "'")}" 
    }, 
    muscleGroup: "${muscleGroup}", 
    sets: 3, 
    reps: "10-12", 
    executionTips: ["${(cols[12] || 'Control movement').replace(/"/g, "'")}"], 
    commonMistakes: [], 
    safetyNotes: "Maintain good form", 
    videoUrl: "${videoUrl}", 
    equipment: "${equipment}", 
    difficulty: ${difficulty} 
  },`;

    newExercises.push(exerciseObj);
    processedCount++;
}

// Gerar o arquivo final
const fileContent = `
import { Language, ExperienceLevel, Exercise } from '../types';

export const EXERCISE_LIBRARY: Exercise[] = [
${newExercises.join('\n')}
];
`;

fs.writeFileSync(outputFile, fileContent);
console.log(`Sucesso! ${processedCount} exercícios processados e salvos em ${outputFile}`);
