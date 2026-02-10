const fs = require('fs');
const path = require('path');

// 1. Load EXERCISE_LIBRARY directly from the source if possible, 
// or simpler: recreate a simplified version of the logic to generate workouts.
// Since we can't easily import TS files in CJS node without a build step, 
// I will read the 'exercises.ts' file and parse it quickly to get IDs.

const exercisesPath = path.join(__dirname, '../../data/exercises.ts');
const exercisesContent = fs.readFileSync(exercisesPath, 'utf-8');

// Quick and dirty parser for exercises to get IDs and Tags
// matches { id: "...", ... muscleGroup: "..." ... }
const exerciseRegex = /id:\s*"([^"]+)",[\s\S]*?name:[\s\S]*?muscleGroup:\s*"([^"]+)"/g;
let match;
const exercises = [];

while ((match = exerciseRegex.exec(exercisesContent)) !== null) {
    exercises.push({
        id: match[1],
        muscleGroup: match[2]
    });
}

console.log(`Loaded ${exercises.length} exercises for generation.`);

// Helper to find random exercises for a group
function p(group, count = 3, excludeIds = []) {
    const pool = exercises.filter(e => e.muscleGroup.includes(group) && !excludeIds.includes(e.id));
    // fisher-yates shuffle
    for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    return pool.slice(0, count).map(e => e.id);
}

// DEFINING THE MATRIX
const levels = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'];
const environments = ['GYM', 'HOME'];
const bodyParts = ['Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core', 'Cardio'];

const translations = {
    'Chest': { PT: 'Peito', EN: 'Chest', ES: 'Pecho' },
    'Back': { PT: 'Costas', EN: 'Back', ES: 'Espalda' },
    'Legs': { PT: 'Pernas', EN: 'Legs', ES: 'Piernas' },
    'Shoulders': { PT: 'Ombros', EN: 'Shoulders', ES: 'Hombros' },
    'Arms': { PT: 'Braços', EN: 'Arms', ES: 'Brazos' },
    'Core': { PT: 'Core e Abs', EN: 'Core & Abs', ES: 'Core y Abs' },
    'Cardio': { PT: 'Cardio', EN: 'Cardio', ES: 'Cardio' }
}

const levelTrans = {
    'BEGINNER': { PT: 'Iniciante', EN: 'Beginner', ES: 'Principiante' },
    'INTERMEDIATE': { PT: 'Intermediário', EN: 'Intermediate', ES: 'Intermedio' },
    'ADVANCED': { PT: 'Avançado', EN: 'Advanced', ES: 'Avanzado' }
}

let newWorkouts = [];

levels.forEach(level => {
    bodyParts.forEach(bp => {
        // Create GYM version
        newWorkouts.push(createWorkout(level, 'GYM', bp));
        // Create HOME version
        newWorkouts.push(createWorkout(level, 'HOME', bp));
    });
});

function createWorkout(level, env, focus) {
    const id = `p-${level.toLowerCase()}-${env.toLowerCase()}-${focus.toLowerCase()}`;

    // Select exercises based on focus
    // Simplification: In a real app we would check equipment = Bodyweight for HOME
    // For now we just pick random valid IDs from the pool we parsed.

    const mainIds = p(focus, 4);

    return {
        id: id,
        title: {
            PT: `${translations[focus].PT} (${levelTrans[level].PT})`,
            EN: `${translations[focus].EN} (${levelTrans[level].EN})`,
            ES: `${translations[focus].ES} (${levelTrans[level].ES})`
        },
        primaryCategory: focus === 'Legs' ? 'LOWER' : 'UPPER',
        tags: [focus.toUpperCase()],
        duration: level === 'BEGINNER' ? 45 : 60,
        description: {
            PT: `Treino de ${translations[focus].PT} para nível ${levelTrans[level].PT}.`,
            EN: `${translations[focus].EN} workout for ${levelTrans[level].EN} level.`,
            ES: `Entrenamiento de ${translations[focus].ES} para nivel ${levelTrans[level].ES}.`
        },
        difficulty: level,
        environment: env,
        warmupIds: [],
        mainBlockIds: mainIds,
        accessoryIds: [],
        cooldownIds: []
    };
}

// Generate the TS output
const output = `
// GENERATED MATRIX WORKOUTS
// Copy this into data/workouts.ts inside the array

${newWorkouts.map(w => JSON.stringify(w, null, 2)).join(',\n')}
`;

fs.writeFileSync('generated_workouts.txt', output);
console.log('Generated ' + newWorkouts.length + ' workouts in generated_workouts.txt');
