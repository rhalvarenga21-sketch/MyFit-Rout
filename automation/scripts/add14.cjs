const fs = require('fs');
let content = fs.readFileSync('data/exercises.ts', 'utf8');

const videos = [
  [/Bulgarian Split Squat.*?Dumbbell.*?videoUrl:\s*"[^"]*"/s, 'LT_nelifZ_k'],
  [/Lunge.*?Walking.*?videoUrl:\s*"[^"]*"/s, 'gINMjZAUSRE'],
  [/Reverse Lunge.*?Bodyweight.*?videoUrl:\s*"[^"]*"/s, 'SW_R1y9K_Ns'],
  [/Lying.*?Leg Curl.*?Bilateral.*?videoUrl:\s*"[^"]*"/s, 'K28eNyvdxQM'],
  [/Hip Thrust.*?Machine.*?videoUrl:\s*"[^"]*"/s, 'SY1eYXrCPzg'],
  [/Hip Thrust.*?Dumbbell.*?videoUrl:\s*"[^"]*"/s, 'eLsXLoV3jLM'],
  [/Glute Bridge.*?Floor.*?bilateral.*?videoUrl:\s*"[^"]*"/s, '1nEL_H0lnNc'],
  [/Romanian.*?Deadlift.*?Barbell.*?videoUrl:\s*"[^"]*"/s, 'lp3Nkr05TC8'],
  [/Pendlay.*?Row.*?videoUrl:\s*"[^"]*"/s, 'TD00shuX6hA'],
  [/Overhead Press.*?Barbell.*?standing.*?videoUrl:\s*"[^"]*"/s, '0-UNSkfq-Vw'],
  [/Overhead Press.*?Seated.*?dumbbell.*?videoUrl:\s*"[^"]*"/s, 'Fhrvcqy4hKA'],
  [/Arnold.*?Press.*?videoUrl:\s*"[^"]*"/s, '166waxYDZhg'],
  [/Lateral Raise.*?Cable.*?videoUrl:\s*"[^"]*"/s, 'xNM9hqpQl34'],
  [/Crunch.*?Basic.*?videoUrl:\s*"[^"]*"/s, '4eE2mHdh2wM']
];

let count = 0;
videos.forEach(([pattern, id]) => {
  if (content.match(pattern)) {
    content = content.replace(pattern, (m) => m.replace(/videoUrl:\s*"[^"]*"/, `videoUrl: "${id}"`));
    count++;
  }
});

fs.writeFileSync('data/exercises.ts', content);
console.log(`✅ ${count} vídeos adicionados`);
const total = (content.match(/videoUrl:\s*"[a-zA-Z0-9_-]{5,}"/g) || []).length;
console.log(`📊 Total: ${total} vídeos`);
