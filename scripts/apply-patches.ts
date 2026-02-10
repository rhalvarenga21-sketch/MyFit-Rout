import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const APP_TSX_PATH = path.join(__dirname, '..', 'App.tsx');

console.log('🔧 AUTO-APPLYING ZERO DATA LOSS PATCHES...\n');

// Read current App.tsx
let content = fs.readFileSync(APP_TSX_PATH, 'utf8');

// ============================================
// PATCH 1: Add imports
// ============================================
console.log('📝 PATCH 1: Adding imports...');

const backupImport = `import { backupWorkoutLocally, syncWorkoutWithRetry, syncPendingBackups, getSyncStatus } from './services/backup';`;
const syncStatusImport = `import { SyncStatus } from './components/SyncStatus';`;

const databaseImportLine = `import { syncProfileToCloud, fetchProfileFromCloud, completeWorkoutSession } from './services/database';`;

if (content.includes(databaseImportLine)) {
    if (!content.includes('backupWorkoutLocally')) {
        content = content.replace(
            databaseImportLine,
            `${databaseImportLine}\n${backupImport}`
        );
        console.log('✅ Backup import added');
    }

    if (!content.includes('SyncStatus')) {
        // Add after backup import or database import
        const targetLine = content.includes(backupImport) ? backupImport : databaseImportLine;
        content = content.replace(
            targetLine,
            `${targetLine}\n${syncStatusImport}`
        );
        console.log('✅ SyncStatus import added');
    }
} else {
    console.log('⚠️ Database import not found');
}

// ============================================
// PATCH 2: Add pending sync useEffect
// ============================================
console.log('\n📝 PATCH 2: Adding pending sync useEffect...');

const pendingSyncEffect = `
  // Sync pending workouts on app start (ZERO DATA LOSS)
  useEffect(() => {
    if (currentUser && profile && !isSyncing) {
      console.log('🔄 Checking for pending workout backups...');
      const status = getSyncStatus(currentUser.id);
      
      if (status.hasPending) {
        console.log(\`📤 Found \${status.pending} pending workout(s). Syncing...\`);
        syncPendingBackups(currentUser.id)
          .then(syncedCount => {
            if (syncedCount > 0) {
              console.log(\`✅ Successfully synced \${syncedCount} pending workout(s)!\`);
            }
          })
          .catch(err => console.error('⚠️ Failed to sync pending workouts:', err));
      } else {
        console.log('✅ No pending workouts to sync');
      }
    }
  }, [currentUser, profile, isSyncing]);
`;

if (!content.includes('Sync pending workouts on app start')) {
    // Find the App component
    const appComponentIndex = content.indexOf('const App: React.FC = () => {');
    if (appComponentIndex !== -1) {
        // Find the first useEffect after App component
        const firstUseEffectIndex = content.indexOf('useEffect(() => {', appComponentIndex);
        if (firstUseEffectIndex !== -1) {
            // Find the end of this useEffect
            let bracketCount = 0;
            let i = firstUseEffectIndex;
            let inUseEffect = false;

            while (i < content.length) {
                if (content.substring(i, i + 10) === 'useEffect(') {
                    inUseEffect = true;
                }
                if (content[i] === '(' && inUseEffect) {
                    bracketCount++;
                }
                if (content[i] === ')' && inUseEffect) {
                    bracketCount--;
                    if (bracketCount === 0) {
                        // Found end of useEffect, look for the semicolon
                        const semiIndex = content.indexOf(';', i);
                        if (semiIndex !== -1) {
                            content = content.slice(0, semiIndex + 1) + pendingSyncEffect + content.slice(semiIndex + 1);
                            console.log('✅ Pending sync useEffect added');
                            break;
                        }
                    }
                }
                i++;
            }
        }
    }
} else {
    console.log('⚠️ Pending sync useEffect already exists');
}

// Write back to file
fs.writeFileSync(APP_TSX_PATH, content, 'utf8');

console.log('\n✅ PATCHES APPLIED!');
console.log('\n⚠️ MANUAL STEP REQUIRED:');
console.log('You still need to manually replace the workout save logic (PATCH 1)');
console.log('See: .agent/PATCH_1_workout_save.txt');
console.log('\n📋 NEXT STEPS:');
console.log('1. Apply PATCH 1 manually (workout save logic)');
console.log('2. Review all changes in App.tsx');
console.log('3. Test locally: npm run dev');
console.log('4. Deploy: vercel --prod');
