const fs = require('fs');
let content = fs.readFileSync('data/exercises.ts', 'utf8');
const updates = [
  { name: 'High Knees (Bodyweight)', video: 'ONRh56YMFaY' },
  { name: 'Elliptical (Steady State)', video: 'umhnurSFp_4' },
  { name: 'Rowing Machine (Intervals)', video: 'yaxveBJGoy8' },
  { name: 'Stationary Bike (Spinning)', video: 'wG7J7dgZsrk' }
];

updates.forEach(({ name, video }) => {
  const idx = content.indexOf(name);
  console.log('searching for', name, '->', idx);
});
