const fs = require('fs');
const path = require('path');

const workoutsPath = path.join(__dirname, '../../data/workouts.ts');
const generatedPath = 'generated_workouts.txt';

if (!fs.existsSync(generatedPath)) {
    console.error('Generated workouts file not found!');
    process.exit(1);
}

let generatedContent = fs.readFileSync(generatedPath, 'utf-8');
let workoutsContent = fs.readFileSync(workoutsPath, 'utf-8');

// Remove the comments from generated content
generatedContent = generatedContent.replace(/\/\/.*$/gm, '').trim();

// Append logic
// We need to find the closing bracket `];` of existing PRESET_WORKOUTS and insert before it.
// BUT we also need to fix the mess I made in the previous partial append via tool.
// The previous tool call inserted some content but failed to close the array properly or left it in a bad state (lint error).
// So I will read the file, strip the last partial edit if needed, or simply overwrite the whole file content structure if I can parsing it.

// Simpler approach: 
// 1. Read existing workouts fully.
// 2. Identify the insertion point.
// 3. Clean up the generated content to be valid TS object strings (they are valid JSON which is valid TS).
// 4. We need to replace string literals with Enum references to make it clean?
//    "UPPER" -> WorkoutCategory.UPPER
//    "CHEST" -> BodyAreaTag.CHEST
//    "BEGINNER" -> ExperienceLevel.BEGINNER
//    This is important for TS compliance.

function convertJsonToEnum(str) {
    // Categories
    str = str.replace(/"UPPER"/g, 'WorkoutCategory.UPPER');
    str = str.replace(/"LOWER"/g, 'WorkoutCategory.LOWER');
    // Tags
    const tags = ['CHEST', 'BACK', 'LEGS', 'SHOULDERS', 'ARMS', 'CORE', 'GLUTES', 'TRICEPS', 'BICEPS'];
    tags.forEach(t => {
        str = str.replace(new RegExp(`"${t}"`, 'g'), `BodyAreaTag.${t}`);
    });
    // Levels
    str = str.replace(/"BEGINNER"/g, 'ExperienceLevel.BEGINNER');
    str = str.replace(/"INTERMEDIATE"/g, 'ExperienceLevel.INTERMEDIATE');
    str = str.replace(/"ADVANCED"/g, 'ExperienceLevel.ADVANCED');

    return str;
}

generatedContent = convertJsonToEnum(generatedContent);

// Fix the file content which is likely broken now 
// It ends with `];` or `},` and some comments.
// Searching for the start of `PRESET_WORKOUTS` array.

const startMarker = 'export const PRESET_WORKOUTS: PresetWorkout[] = [';
const startIndex = workoutsContent.indexOf(startMarker);

if (startIndex === -1) {
    console.error('Could not find start of PRESET_WORKOUTS');
    process.exit(1);
}

// Just rewrite the whole file structure responsibly.
// I will keep the imports.
// I will keep the manual manual entries (first 4).
// Then append the generated ones.

// Extract imports
const lines = workoutsContent.split('\n');
const importLine = lines.find(l => l.trim().startsWith('import'));

// Extract manual workouts - this is hard to parse robustly without AST.
// Fallback: Just fix the broken array end.

// The broken file likely ends abruptly or with comments I added.
// It looks like:
// ...
// cooldownIds: ["core_abs_reverse_crunch_floor_bodyweight_home_beginner"]
//   },
//   // START OF EXTENDED LIBRARY
//   ...
//   { ... }
// ];   <-- The tool tried to add this but failed to close if content was removed incorrectly.

// The safest way is to REPLACE the whole `PRESET_WORKOUTS` array with:
// [ Manual Workouts... ] + [ Generated Workouts... ]

// Let's rely on the fact that the first 4 workouts end at line ~52 before my edit.
// I'll take lines 0 to 52 (preserving the manually defined ones from previous version of file).

// Wait, I don't have the previous version easily.
// I will attempt to locate the closing brace of the last valid manual workout (p-ombros-abs).

const lastManualId = 'p-ombros-abs';
const manualIndex = workoutsContent.indexOf(lastManualId);
// Find the end of this object. specific property 'cooldownIds' comes last.
const splitPoint = workoutsContent.indexOf('cooldownIds', manualIndex);
const closingBrace = workoutsContent.indexOf('}', splitPoint);

const cleanPrefix = workoutsContent.substring(0, closingBrace + 1);

const newFileContent = `${cleanPrefix},
${generatedContent}
];
`;

fs.writeFileSync(workoutsPath, newFileContent);
console.log('Successfully reconstructed workouts.ts with new matrix.');
