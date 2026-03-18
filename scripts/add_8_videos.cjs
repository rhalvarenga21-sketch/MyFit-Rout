const fs = require('fs');
let content = fs.readFileSync('data/exercises.ts', 'utf8');

const novosVideos = [
  { pattern: /Agachamento Costas \(Barra Alta\)/i, video: 'fYvifUC5Nac', nome: 'Agachamento Costas (Barra Alta)' },
  { pattern: /Agachamento Livre \(Peso Corporal\)/i, video: 'JWFljl14kSc', nome: 'Agachamento Livre (Peso Corporal)' },
  { pattern: /Flexão Declinada \(Pés Elevados\)/i, video: 'vtnAwuBNGL8', nome: 'Flexão Declinada (Pés Elevados)' },
  { pattern: /Flexão Aberta \(Mãos Largas\)/i, video: 'A3g6GD7w87w', nome: 'Flexão Aberta (Mãos Largas)' },
  { pattern: /Peck Deck \(Máquina\)/i, video: 'lSV3-8mlUnc', nome: 'Peck Deck (Máquina)' },
  { pattern: /Mergulho \(Inclinação Peito\)/i, video: 'f4YYJfRHGD0', nome: 'Mergulho (Inclinação Peito)' },
  { pattern: /Mergulho Assistido \(Máquina\)/i, video: 'kDZMwIuKPgE', nome: 'Mergulho Assistido (Máquina)' },
  { pattern: /Press Peito com Elástico \(Em Pé\)/i, video: 'T0UJ0W-_yIE', nome: 'Press Peito com Elástico (Em Pé)' }
];

let count = 0;
novosVideos.forEach(item => {
  const regex = new RegExp(`(${item.pattern.source}[\s\S]*?videoUrl:\s*")([^"]*)(")`, 'i');
  if (content.match(regex)) {
    content = content.replace(regex, `$1${item.video}$3`);
    count++;
    console.log(` ${item.nome}`);
  }
});

fs.writeFileSync('data/exercises.ts', content);
const total = (content.match(/videoUrl:\s*"[a-zA-Z0-9_-]{5,}"/g) || []).length;
console.log(`\n ${count} vídeos adicionados!`);
console.log(` Total: ${total} vídeos`);
