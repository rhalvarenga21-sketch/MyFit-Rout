const fs = require('fs');
let content = fs.readFileSync('data/exercises.ts', 'utf8');

const updates = [
  { name: 'High Knees (Bodyweight)', video: 'ONRh56YMFaY' },
  { name: 'Elliptical (Steady State)', video: 'umhnurSFp_4' },
  { name: 'Rowing Machine (Intervals)', video: 'yaxveBJGoy8' },
  { name: 'Stationary Bike (Spinning)', video: 'wG7J7dgZsrk' }
];

let count = 0;
updates.forEach(({ name, video }) => {
  const idx = content.indexOf(name);
  if (idx === -1) {
    console.log(`not found ${name}`);
    return;
  }
  const vidPos = content.indexOf('videoUrl', idx);
  if (vidPos === -1) {
    console.log(`videoUrl not found for ${name}`);
    return;
  }
  const startQuote = content.indexOf('"', vidPos);
  const endQuote = content.indexOf('"', startQuote + 1);
  if (startQuote === -1 || endQuote === -1) {
    console.log(`couldn't locate quotes for ${name}`);
    return;
  }
  content = content.slice(0, startQuote + 1) + video + content.slice(endQuote);
  count++;
  console.log(`updated ${name}`);
});

fs.writeFileSync('data/exercises.ts', content);
const total = (content.match(/videoUrl:\s*"[a-zA-Z0-9_-]{5,}"/g) || []).length;
console.log(`\n${count} vídeos adicionados!`);
console.log(`Total: ${total} vídeos`);
