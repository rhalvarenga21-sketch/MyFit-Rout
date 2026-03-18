const fs = require('fs');
let content = fs.readFileSync('data/exercises.ts', 'utf8');

const pattern = /\[Language\.EN\]:\s*"Push-Up \(Decline \(feet elevated\)\)"[\s\S]{0,300}?videoUrl:\s*"[^"]*"/i;
if(pattern.test(content)) {
  content = content.replace(pattern, match => {
    return match.replace(/videoUrl:\s*"[^"]*"/, 'videoUrl: "vtnAwuBNGL8"');
  });
  fs.writeFileSync('data/exercises.ts', content);
  console.log('Updated Decline Push-Up video.');
  const total = (content.match(/videoUrl:\s*"[a-zA-Z0-9_-]{5,}"/g) || []).length;
  console.log('Total videos now:', total);
} else {
  console.log('Decline Push-Up entry not found.');
}
