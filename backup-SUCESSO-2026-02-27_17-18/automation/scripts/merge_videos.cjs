const fs = require('fs');

// Ler arquivo atual
let content = fs.readFileSync('data/exercises.ts', 'utf8');

// Os 14 vídeos novos para adicionar
const novosVideos = [
  { pattern: /Bulgarian Split Squat.*Dumbbell/i, video: 'LT_nelifZ_k', nome: 'Bulgarian Split Squat (Dumbbells)' },
  { pattern: /Lunge.*Walking/i, video: 'gINMjZAUSRE', nome: 'Lunge (Walking)' },
  { pattern: /Reverse Lunge.*Bodyweight/i, video: 'SW_R1y9K_Ns', nome: 'Reverse Lunge (Bodyweight)' },
  { pattern: /Lying.*Leg Curl.*Bilateral/i, video: 'K28eNyvdxQM', nome: 'Lying Leg Curl (Bilateral)' },
  { pattern: /Hip Thrust.*Barbell(?!.*Dumbbell)/i, video: 'SY1eYXrCPzg', nome: 'Hip Thrust (Barbell)' },
  { pattern: /Hip Thrust.*Dumbbell/i, video: 'eLsXLoV3jLM', nome: 'Hip Thrust (Dumbbell)' },
  { pattern: /Glute Bridge.*Floor.*bilateral/i, video: '1nEL_H0lnNc', nome: 'Glute Bridge (Floor bilateral)' },
  { pattern: /Romanian.*Deadlift.*Barbell/i, video: 'lp3Nkr05TC8', nome: 'Romanian Deadlift (Barbell)' },
  { pattern: /Pendlay.*Row/i, video: 'TD00shuX6hA', nome: 'Pendlay Row (From floor)' },
  { pattern: /Overhead Press.*Barbell.*standing/i, video: '0-UNSkfq-Vw', nome: 'Overhead Press (Barbell standing)' },
  { pattern: /Overhead Press.*Seated.*dumbbell/i, video: 'Fhrvcqy4hKA', nome: 'Overhead Press (Seated dumbbells)' },
  { pattern: /Arnold.*Press/i, video: '166waxYDZhg', nome: 'Arnold Press (Seated)' },
  { pattern: /Lateral Raise.*Cable/i, video: 'xNM9hqpQl34', nome: 'Lateral Raise (Cable)' },
  { pattern: /Crunch.*Basic/i, video: '4eE2mHdh2wM', nome: 'Crunch (Basic)' }
];

let adicionados = 0;
let jaExistiam = 0;
let naoEncontrados = [];

console.log('\n🔄 FAZENDO MERGE DOS VÍDEOS...\n');
console.log('='.repeat(70));

novosVideos.forEach(item => {
  // Procurar o exercício
  const regex = new RegExp(
    `(${item.pattern.source}[\\s\\S]*?videoUrl:\\s*")([^"]*)(")`,
    'i'
  );
  
  const match = content.match(regex);
  
  if (match) {
    const videoAtual = match[2];
    
    if (videoAtual.length < 5) {
      // Vídeo vazio, adicionar
      content = content.replace(regex, `$1${item.video}$3`);
      adicionados++;
      console.log(`✅ ADICIONADO: ${item.nome}`);
      console.log(`   Vídeo: ${item.video}\n`);
    } else if (videoAtual === item.video) {
      // Já tem esse vídeo
      jaExistiam++;
      console.log(`○ JÁ EXISTE: ${item.nome}`);
      console.log(`   Vídeo: ${videoAtual}\n`);
    } else {
      // Tem outro vídeo, substituir
      content = content.replace(regex, `$1${item.video}$3`);
      adicionados++;
      console.log(`🔄 SUBSTITUÍDO: ${item.nome}`);
      console.log(`   Antigo: ${videoAtual}`);
      console.log(`   Novo: ${item.video}\n`);
    }
  } else {
    naoEncontrados.push(item.nome);
    console.log(`❌ NÃO ENCONTRADO: ${item.nome}\n`);
  }
});

// Salvar arquivo atualizado
fs.writeFileSync('data/exercises.ts', content);

// Contar totais
const totalVideos = (content.match(/videoUrl:\s*"[a-zA-Z0-9_-]{5,}"/g) || []).length;
const totalExercicios = (content.match(/\[Language\.EN\]:/g) || []).length;

console.log('='.repeat(70));
console.log('\n📊 RESULTADO DO MERGE:\n');
console.log(`✅ Vídeos adicionados/substituídos: ${adicionados}`);
console.log(`○ Vídeos que já existiam: ${jaExistiam}`);
console.log(`❌ Exercícios não encontrados: ${naoEncontrados.length}`);
if (naoEncontrados.length > 0) {
  console.log(`   ${naoEncontrados.join(', ')}`);
}
console.log(`\n📈 TOTAIS:`);
console.log(`   Total de exercícios: ${totalExercicios}`);
console.log(`   Com vídeo agora: ${totalVideos}`);
console.log(`   Sem vídeo: ${totalExercicios - totalVideos}`);
console.log('\n✅ Arquivo atualizado: data/exercises.ts');
