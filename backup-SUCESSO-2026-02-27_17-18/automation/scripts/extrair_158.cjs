const fs = require('fs');
const content = fs.readFileSync('data/exercises.ts', 'utf8');
const lines = content.split('\n');

let comVideo = [];
let semVideo = [];

lines.forEach(line => {
  const nameMatch = line.match(/\[Language\.EN\]:\s*"([^"]+)"/);
  const muscleMatch = line.match(/muscleGroup:\s*"([^"]+)"/);
  const videoMatch = line.match(/videoUrl:\s*"([^"]*)"/);
  
  if (nameMatch && muscleMatch && videoMatch) {
    const ex = {
      nome: nameMatch[1],
      grupo: muscleMatch[1],
      video: videoMatch[1]
    };
    
    if (ex.video.length > 4) {
      comVideo.push(ex);
    } else {
      semVideo.push(ex);
    }
  }
});

let output = 'MYFITROUT - 158 EXERCÍCIOS COMPLETOS\n';
output += '='.repeat(70) + '\n\n';
output += '✅ COM VÍDEO (' + comVideo.length + '):\n' + '-'.repeat(70) + '\n\n';
comVideo.forEach((e, i) => {
  output += (i+1) + '. ' + e.nome + ' (' + e.grupo + ')\n';
  output += '   https://youtube.com/watch?v=' + e.video + '\n\n';
});

output += '\n❌ SEM VÍDEO (' + semVideo.length + '):\n' + '-'.repeat(70) + '\n\n';
semVideo.forEach((e, i) => {
  output += (i+1) + '. ' + e.nome + ' (' + e.grupo + ')\n';
});

output += '\n' + '='.repeat(70) + '\n';
output += '📊 64 com vídeo + 94 sem vídeo = 158 total\n';

fs.writeFileSync('LISTA_COMPLETA_158.txt', output);
console.log('✅ Arquivo criado: LISTA_COMPLETA_158.txt');
