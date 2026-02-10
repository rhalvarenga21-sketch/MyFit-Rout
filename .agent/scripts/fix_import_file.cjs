const fs = require('fs');

const path = 'IMPORT_EXERCICIOS.txt';
let content = fs.readFileSync(path, 'utf-8');
const lines = content.split('\n');

const cleanLines = [];
let foundSummary = false;

// Cardio lines I tried to append
const cardioStart = 'Cardio\tCardio';

for (let line of lines) {
    line = line.trim();
    if (!line) continue;

    // If we hit the summary header, stop adding main lines, enable flag
    if (line.startsWith('Exercise (EN)')) {
        foundSummary = true;
        continue;
    }

    // If we are in summary mode, we skip, UNLESS it's a Cardio line (which I appended after summary)
    // My append added Cardio lines at the end.
    if (foundSummary) {
        if (line.startsWith('Cardio')) {
            cleanLines.push(line);
        }
        // else skip summary line
    } else {
        cleanLines.push(line);
    }
}

// Remove duplicates if any (Cardio might have been added multiple times if I ran script multiple times)
const uniqueLines = [...new Set(cleanLines)];

fs.writeFileSync(path, uniqueLines.join('\n'));
console.log('Cleaned and fixed IMPORT_EXERCICIOS.txt with ' + uniqueLines.length + ' lines.');
