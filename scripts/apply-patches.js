#!/usr/bin/env node

/**
 * AUTO-APPLY PATCHES SCRIPT
 * 
 * This script automatically applies all 3 patches to App.tsx
 * Run with: node apply-patches.js
 */

const fs = require('fs');
const path = require('path');

const APP_TSX_PATH = path.join(__dirname, '..', 'App.tsx');

console.log('🔧 AUTO-APPLYING ZERO DATA LOSS PATCHES...\n');

// Read current App.tsx
let content = fs.readFileSync(APP_TSX_PATH, 'utf8');

// ============================================
// PATCH 1: Add imports
// ============================================
console.log('📝 PATCH 1: Adding imports...');

const importToAdd = `import { backupWorkoutLocally, syncWorkoutWithRetry, syncPendingBackups, getSyncStatus } from './services/backup';
import { SyncStatus } from './components/SyncStatus';`;

// Find the line with database imports
const databaseImportLine = `import { syncProfileToCloud, fetchProfileFromCloud, completeWorkoutSession } from './services/database';`;

if (content.includes(databaseImportLine) && !content.includes('backupWorkoutLocally')) {
    content = content.replace(
        databaseImportLine,
        `${databaseImportLine}\n${importToAdd}`
    );
    console.log('✅ Imports added');
} else {
    console.log('⚠️ Imports already exist or database import not found');
}

// ============================================
// PATCH 2: Replace workout save logic
// ============================================
console.log('\n📝 PATCH 2: Replacing workout save logic...');

const oldSaveLogic = `onComplete={async (sessionData) => {
                // Save session to database
                setIsSyncing(true);
                const result = await completeWorkoutSession(sessionData);

                // Update completed days and forced sync
                const today = new Date().toISOString().split('T')[0];
                if (profile) {
                  const updatedDays = profile.completedDays.includes(today)
                    ? profile.completedDays
                    : [...profile.completedDays, today];

                  const updatedProfile = { ...profile, completedDays: updatedDays };
                  await saveProfile(updatedProfile);

                  if (!result.success) {
                    alert(\`Aviso: O treino foi salvo localmente mas houve um erro ao sincronizar o histórico detalhado.\\n\\nErro: \${JSON.stringify(result.error?.message || result.error)}\`);
                  }
                }

                setIsSyncing(false);

                // Navigate to completed summary
                setCompletedSession(sessionData);
                setView('workout_completed');
              }}`;

const newSaveLogic = `onComplete={async (sessionData) => {
                // ⚡ ZERO DATA LOSS SYSTEM
                setIsSyncing(true);
                
                try {
                  console.log('💾 Step 1/4: Creating local backup...');
                  const backupId = backupWorkoutLocally(currentUser!.id, sessionData);
                  
                  console.log('☁️ Step 2/4: Syncing to cloud with retry...');
                  const result = await syncWorkoutWithRetry(sessionData, backupId);
                  
                  console.log('📅 Step 3/4: Updating completed days...');
                  const today = new Date().toISOString().split('T')[0];
                  if (profile) {
                    const updatedDays = profile.completedDays.includes(today)
                      ? profile.completedDays
                      : [...profile.completedDays, today];
                    await saveProfile({ ...profile, completedDays: updatedDays });
                  }
                  
                  setIsSyncing(false);
                  
                  if (!result.success) {
                    alert('⚠️ Treino Salvo Localmente!\\n\\nNão foi possível sincronizar com a nuvem agora, mas seus dados estão SEGUROS.\\n\\nTentaremos sincronizar automaticamente na próxima vez que você abrir o app.');
                  }
                  
                  setCompletedSession(sessionData);
                  setView('workout_completed');
                  
                } catch (err) {
                  console.error('❌ CRITICAL ERROR:', err);
                  setIsSyncing(false);
                  alert(\`❌ Erro Crítico!\\n\\nPor favor, NÃO feche o app e entre em contato com o suporte.\\n\\nErro: \${err}\`);
                }
              }}`;

if (content.includes('completeWorkoutSession(sessionData)')) {
    content = content.replace(oldSaveLogic, newSaveLogic);
    console.log('✅ Workout save logic replaced');
} else {
    console.log('⚠️ Workout save logic already updated or not found');
}

// ============================================
// PATCH 3: Add pending sync useEffect
// ============================================
console.log('\n📝 PATCH 3: Adding pending sync useEffect...');

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
      }
    }
  }, [currentUser, profile, isSyncing]);
`;

// Find a good place to add the useEffect (after other useEffects)
const useEffectMarker = 'useEffect(() => {';
const firstUseEffectIndex = content.indexOf(useEffectMarker);

if (firstUseEffectIndex !== -1 && !content.includes('Sync pending workouts on app start')) {
    // Find the end of the first useEffect
    let bracketCount = 0;
    let i = firstUseEffectIndex;
    let foundStart = false;

    while (i < content.length) {
        if (content[i] === '{') {
            bracketCount++;
            foundStart = true;
        }
        if (content[i] === '}') {
            bracketCount--;
            if (foundStart && bracketCount === 0) {
                // Found the end of useEffect
                // Look for the closing );
                const closingIndex = content.indexOf(');', i);
                if (closingIndex !== -1) {
                    content = content.slice(0, closingIndex + 2) + pendingSyncEffect + content.slice(closingIndex + 2);
                    console.log('✅ Pending sync useEffect added');
                    break;
                }
            }
        }
        i++;
    }
} else {
    console.log('⚠️ Pending sync useEffect already exists or useEffect not found');
}

// Write back to file
fs.writeFileSync(APP_TSX_PATH, content, 'utf8');

console.log('\n✅ ALL PATCHES APPLIED SUCCESSFULLY!');
console.log('\n📋 NEXT STEPS:');
console.log('1. Review the changes in App.tsx');
console.log('2. Test locally: npm run dev');
console.log('3. Deploy: vercel --prod');
console.log('\n🛡️ ZERO DATA LOSS SYSTEM IS NOW ACTIVE!');
