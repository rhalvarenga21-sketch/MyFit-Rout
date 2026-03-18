const fs = require('fs');
const content = fs.readFileSync('data/exercises.ts', 'utf8');

const exercises = [];
const lines = content.split('\n');

lines.forEach(line => {
  const idMatch = line.match(/id:\s*"([^"]+)"/);
  const nameENMatch = line.match(/\[Language\.EN\]:\s*"([^"]+)"/);
  const namePTMatch = line.match(/\[Language\.PT\]:\s*"([^"]+)"/);
  const muscleMatch = line.match(/muscleGroup:\s*"([^"]+)"/);
  const videoMatch = line.match(/videoUrl:\s*"([^"]*)"/);
  
  if (idMatch && nameENMatch && videoMatch) {
    exercises.push({
      id: idMatch[1],
      nameEN: nameENMatch[1],
      namePT: namePTMatch ? namePTMatch[1] : '',
      muscle: muscleMatch ? muscleMatch[1] : '',
      video: videoMatch[1]
    });
  }
});

let output = '';
output += '═══════════════════════════════════════════════════════════\n';
output += '          MYFITROUT - LISTA COMPLETA\n';
output += '          ' + new Date().toLocaleString('pt-BR') + '\n';
output += '═══════════════════════════════════════════════════════════\n\n';

const comVideo = exercises.filter(e => e.video.length > 4);
const semVideo = exercises.filter(e => e.video.length <= 4);

output += '✅ EXERCÍCIOS COM VÍDEO (' + comVideo.length + ')\n';
output += '───────────────────────────────────────────────────────────\n\n';

comVideo.forEach((e, i) => {
  output += (i+1) + '. ' + e.nameEN + '\n';
  output += '   PT: ' + e.namePT + '\n';
  output += '   Grupo: ' + e.muscle + '\n';
  output += '   Link: https://youtube.com/watch?v=' + e.video + '\n\n';
});

if (semVideo.length > 0) {
  output += '\n❌ EXERCÍCIOS SEM VÍDEO (' + semVideo.length + ')\n';
  output += '───────────────────────────────────────────────────────────\n\n';
  
  semVideo.forEach((e, i) => {
    output += (i+1) + '. ' + e.nameEN + ' (' + e.muscle + ')\n';
  });
}

output += '\n═══════════════════════════════════════════════════════════\n';
output += '📊 RESUMO FINAL\n';
output += '═══════════════════════════════════════════════════════════\n';
output += 'Total de exercícios: ' + exercises.length + '\n';
output += 'Com vídeo: ' + comVideo.length + '\n';
output += 'Sem vídeo: ' + semVideo.length + '\n';
output += '═══════════════════════════════════════════════════════════\n';

fs.writeFileSync('LISTA_COMPLETA_EXERCICIOS.txt', output);
console.log('✅ Lista salva!');
console.log('📊 ' + exercises.length + ' exercícios total');
console.log('✅ ' + comVideo.length + ' com vídeo');
console.log('❌ ' + semVideo.length + ' sem vídeo');
