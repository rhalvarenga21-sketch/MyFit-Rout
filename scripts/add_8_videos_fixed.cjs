const fs = require('fs');
let content = fs.readFileSync('data/exercises.ts', 'utf8');

const novosVideos = [
  { pattern: /Back Squat \(High bar\)/i, video: 'fYvifUC5Nac', nome: 'Back Squat (High bar)' },
  { pattern: /Squat \(Bodyweight\)/i, video: 'JWFljl14kSc', nome: 'Squat (Bodyweight)' },
  { pattern: /Push-Up \(Decline.*feet elevated\)/i, video: 'vtnAwuBNGL8', nome: 'Push-Up (Decline feet elevated)' },
  { pattern: /Push-Up \(Wide\)/i, video: 'A3g6GD7w87w', nome: 'Push-Up (Wide)' },
  { pattern: /Pec Deck \(Machine\)/i, video: 'lSV3-8mlUnc', nome: 'Pec Deck (Machine)' },
  { pattern: /Dips \(Chest lean\)/i, video: 'f4YYJfRHGD0', nome: 'Dips (Chest lean)' },
  { pattern: /Dips \(Assisted\)/i, video: 'kDZMwIuKPgE', nome: 'Dips (Assisted)' },
  { pattern: /Band Chest Press \(Standing\)/i, video: 'T0UJ0W-_yIE', nome: 'Band Chest Press (Standing)' }
];

let count = 0;
novosVideos.forEach(item => {
  const regex = new RegExp(`(${item.pattern.source}[\\s\\S]{0,500}?videoUrl:\s*")([^\"]*)(\")`, 'i');
  const match = content.match(regex);
  if (match) {
    content = content.replace(regex, `$1${item.video}$3`);
    count++;
    console.log(` ${item.nome}`);
  } else {
    console.log(` ${item.nome} - NÃO ENCONTRADO`);
  }
});

fs.writeFileSync('data/exercises.ts', content);
const total = (content.match(/videoUrl:\s*"[a-zA-Z0-9_-]{5,}"/g) || []).length;
console.log(`\n ${count}/8 vídeos adicionados!`);
console.log(` Total: ${total} vídeos`);
