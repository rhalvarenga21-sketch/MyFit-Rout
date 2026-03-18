const fs = require('fs');

console.log('ANALISANDO data/workouts.ts...\n');

const content = fs.readFileSync('data/workouts.ts', 'utf8');

// Procurar por IDs com espacos ou caracteres especiais (provavelmente nomes)
const regex = /"mainBlockIds":\s*\[([\s\S]*?)\]/g;
const matches = [...content.matchAll(regex)];

let problemCount = 0;
const problems = [];

matches.forEach((match, index) => {
  const idsBlock = match[1];
  
  // Verificar se tem strings com espacos (sao nomes, nao IDs)
  const lines = idsBlock.split('\n').filter(line => line.trim());
  
  lines.forEach(line => {
    if (line.includes('"') && (line.includes(' ') || line.includes('?') || line.includes('?'))) {
      const extracted = line.match(/"([^"]+)"/);
      if (extracted && extracted[1].includes(' ')) {
        problemCount++;
        problems.push({
          workout: index + 1,
          problematicId: extracted[1]
        });
      }
    }
  });
});

console.log('ENCONTRADOS ' + problemCount + ' IDS PROBLEMATICOS:\n');

problems.forEach((p, idx) => {
  console.log((idx + 1) + '. Workout #' + p.workout + ': "' + p.problematicId + '"');
});

console.log('\nTOTAL: ' + problemCount + ' IDs para corrigir\n');

// Salvar relatorio
fs.writeFileSync('automation/PROBLEMATIC_IDS.txt', 
  problems.map(p => 'Workout #' + p.workout + ': ' + p.problematicId).join('\n')
);

console.log('Relatorio salvo em: automation/PROBLEMATIC_IDS.txt');
