const fs = require('fs');
let content = fs.readFileSync('data/exercises.ts', 'utf8');

// patterns will match based on the English name field
const updates = [
  {en: "Back Squat (High bar)", video: "fYvifUC5Nac"},
  {en: "Squat (Bodyweight)", video: "JWFljl14kSc"},
  {en: "Push-Up (Decline feet elevated)", video: "vtnAwuBNGL8"},
  {en: "Push-Up (Wide)", video: "A3g6GD7w87w"},
  {en: "Pec Deck (Machine)", video: "lSV3-8mlUnc"},
  {en: "Dips (Chest lean)", video: "f4YYJfRHGD0"},
  {en: "Dips (Assisted)", video: "kDZMwIuKPgE"},
  {en: "Band Chest Press (Standing)", video: "T0UJ0W-_yIE"}
];

let count = 0;
updates.forEach(u => {
  // locate exercise block containing the EN name, then replace videoUrl inside that block
  const regex = new RegExp(`(\\[Language\.EN\\]:\\s*"${u.en.replace(/[-\\/\\^$*+?.()|[\]{}]/g, '\\$&')}"[\\s\\S]{0,300}?videoUrl:\\s*")([^\"]*)(\")`, 'i');
  const match = content.match(regex);
  if (match) {
    content = content.replace(regex, `$1${u.video}$3`);
    count++;
    console.log(`✓ updated ${u.en}`);
  } else {
    console.log(`✗ not found ${u.en}`);
  }
});

fs.writeFileSync('data/exercises.ts', content);
const total = (content.match(/videoUrl:\s*"[a-zA-Z0-9_-]{5,}"/g) || []).length;
console.log(`\n${count}/${updates.length} vídeos adicionados!`);
console.log(`Total de vídeos: ${total}`);
