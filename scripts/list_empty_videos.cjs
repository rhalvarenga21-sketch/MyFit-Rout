const fs = require('fs');
const text = fs.readFileSync('data/exercises.ts', 'utf8');
const entries = text.split(/\{\s*id:/).slice(1);
const results = [];
for (const ent of entries) {
  const m_id = ent.match(/^\s*"([^"]+)"/);
  if (!m_id) continue;
  const idval = m_id[1];
  const enlMatch = ent.match(/\[Language\.EN\]:\s*"([^"]+)"/);
  const videoMatch = ent.match(/videoUrl:\s*"([^"]*)"/);
  if (videoMatch && videoMatch[1] === '') {
    results.push({ id: idval, en: enlMatch ? enlMatch[1] : '' });
  }
  if (results.length >= 10) break;
}
for (const r of results) {
  console.log(`ID: ${r.id} | EN: ${r.en}`);
}
console.log('total found', results.length);
