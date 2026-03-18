const fs = require('fs');
const content = fs.readFileSync('data/exercises.ts', 'utf8');

const exercises = [];
const regex = /\[Language\.EN\]:\s*"([^"]+)"[\s\S]*?muscleGroup:\s*"([^"]+)"[\s\S]*?videoUrl:\s*"([^"]*)"/g;

let match;
while ((match = regex.exec(content)) !== null) {
  exercises.push({
    nome: match[1],
    grupo: match[2],
    video: match[3]
  });
}

const comVideo = exercises.filter(e => e.video.length > 4);
const semVideo = exercises.filter(e => e.video.length <= 4);

let output = 'MYFITROUT - LISTA COMPLETA\n';
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
output += '📊 Total: ' + exercises.length + ' | Com vídeo: ' + comVideo.length + ' | Sem vídeo: ' + semVideo.length + '\n';

fs.writeFileSync('LISTA_COMPLETA_FINAL.txt', output);
console.log('✅ Arquivo salvo!');
console.log('📊 ' + exercises.length + ' exercícios (' + comVideo.length + ' com vídeo)');
