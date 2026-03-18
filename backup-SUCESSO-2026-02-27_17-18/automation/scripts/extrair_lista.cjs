const fs = require('fs');
const content = fs.readFileSync('data/exercises.ts', 'utf8');

let output = '';
output += '═══════════════════════════════════════════════════════════\n';
output += 'MYFITROUT - LISTA COMPLETA DE EXERCÍCIOS\n';
output += '═══════════════════════════════════════════════════════════\n\n';

const exercises = [];
const pattern = /\{\s*id:\s*"([^"]+)"[\s\S]*?name:\s*\{[\s\S]*?\[Language\.PT\]:\s*"([^"]+)"[\s\S]*?\[Language\.EN\]:\s*"([^"]+)"[\s\S]*?muscleGroup:\s*"([^"]+)"[\s\S]*?videoUrl:\s*"([^"]*)"/g;

let match;
while ((match = pattern.exec(content)) !== null) {
  exercises.push({
    id: match[1],
    namePT: match[2],
    nameEN: match[3],
    muscle: match[4],
    video: match[5]
  });
}

const comVideo = exercises.filter(e => e.video.length > 4);
const semVideo = exercises.filter(e => e.video.length <= 4);

output += '✅ COM VÍDEO (' + comVideo.length + ')\n\n';
comVideo.forEach((e, i) => {
  output += (i+1) + '. ' + e.nameEN + ' (' + e.muscle + ')\n';
  output += '   https://youtube.com/watch?v=' + e.video + '\n\n';
});

if (semVideo.length > 0) {
  output += '\n❌ SEM VÍDEO (' + semVideo.length + ')\n\n';
  semVideo.forEach((e, i) => {
    output += (i+1) + '. ' + e.nameEN + ' (' + e.muscle + ')\n\n';
  });
}

output += '\n📊 TOTAL: ' + exercises.length + ' exercícios\n';

fs.writeFileSync('LISTA_COMPLETA.txt', output);
console.log('✅ Arquivo criado: LISTA_COMPLETA.txt');
console.log('📊 ' + exercises.length + ' exercícios (' + comVideo.length + ' com vídeo)');
