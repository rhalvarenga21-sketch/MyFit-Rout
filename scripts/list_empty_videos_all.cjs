const fs = require('fs');
const text = fs.readFileSync('data/exercises.ts', 'utf8');
const entries = text.split(/\{\s*id:/).slice(1);
const names = [];
for (const ent of entries) {
  const enlMatch = ent.match(/\[Language\.EN\]:\s*"([^\"]+)"/);
  const videoMatch = ent.match(/videoUrl:\s*"([^\"]*)"/);
  if (videoMatch && videoMatch[1] === '') {
    names.push(enlMatch ? enlMatch[1] : '(no EN name)');
  }
}
console.log(names.join('\n'));
console.log('TOTAL:', names.length);
