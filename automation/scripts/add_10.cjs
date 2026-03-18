// MyFitRout - Adicionar 10 Vídeos
const fs = require('fs');

const VIDEOS = {
  "lg-14": "LT_nelifZ_k", "lg-6": "gINMjZAUSRE", "lg-4": "K28eNyvdxQM",
  "lg-8": "SY1eYXrCPzg", "bk-7": "lp3Nkr05TC8", "bk-1": "TD00shuX6hA",
  "sh-3": "0-UNSkfq-Vw", "sh-1": "Fhrvcqy4hKA", "sh-8": "xNM9hqpQl34",
  "cr-3": "4eE2mHdh2wM"
};

const file = 'data/exercises.ts';
let content = fs.readFileSync(file, 'utf8');
let count = 0;

for (const [id, url] of Object.entries(VIDEOS)) {
  const regex = new RegExp('(id:\\s*"' + id + '"[\\s\\S]{0,500}?)videoUrl:\\s*"[^"]*"', 'i');
  if (content.match(regex)) {
    content = content.replace(regex, (m) => m.replace(/videoUrl:\s*"[^"]*"/, 'videoUrl: "' + url + '"'));
    count++;
    console.log('✓ ' + id);
  }
}

fs.writeFileSync(file, content);
console.log('\n✅ ' + count + ' vídeos adicionados!');
console.log('📊 Total: ' + (content.match(/videoUrl:\s*"[a-zA-Z0-9_-]{5,}"/g) || []).length + ' vídeos\n');
