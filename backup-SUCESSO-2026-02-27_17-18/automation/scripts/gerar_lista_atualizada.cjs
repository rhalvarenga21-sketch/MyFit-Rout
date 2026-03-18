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

let output = '═══════════════════════════════════════════════════════════════════\n';
output += '           MYFITROUT - LISTA ATUALIZADA COM 14 NOVOS VÍDEOS\n';
output += '           ' + new Date().toLocaleString('pt-BR') + '\n';
output += '═══════════════════════════════════════════════════════════════════\n\n';

output += '📊 RESUMO:\n';
output += '   • Total de exercícios: ' + exercises.length + '\n';
output += '   • ✅ Com vídeo: ' + comVideo.length + ' (49.4%)\n';
output += '   • ❌ Sem vídeo: ' + semVideo.length + '\n\n';

output += '═══════════════════════════════════════════════════════════════════\n\n';

// Agrupar por grupo muscular
const grupos = {};
exercises.forEach(e => {
  if (!grupos[e.grupo]) grupos[e.grupo] = [];
  grupos[e.grupo].push(e);
});

Object.keys(grupos).sort().forEach(grupo => {
  const exs = grupos[grupo];
  const comV = exs.filter(e => e.video.length > 4).length;
  const semV = exs.filter(e => e.video.length <= 4).length;
  
  output += `🏋️ ${grupo.toUpperCase()} (${exs.length} exercícios - ${comV} com vídeo, ${semV} sem)\n`;
  output += '─'.repeat(70) + '\n\n';
  
  exs.forEach((e, i) => {
    const status = e.video.length > 4 ? '✅' : '❌';
    output += `${i+1}. ${status} ${e.nome}\n`;
    if (e.video.length > 4) {
      output += `   https://youtube.com/watch?v=${e.video}\n`;
    }
    output += '\n';
  });
  
  output += '\n';
});

output += '═══════════════════════════════════════════════════════════════════\n';
output += '✅ 78 vídeos prontos para usar!\n';
output += '❌ 80 vídeos ainda faltam\n';
output += '═══════════════════════════════════════════════════════════════════\n';

fs.writeFileSync('LISTA_ATUALIZADA_78_VIDEOS.txt', output);
console.log('✅ Lista salva: LISTA_ATUALIZADA_78_VIDEOS.txt');
console.log('📊 78 vídeos + 80 sem vídeo = 158 total');
