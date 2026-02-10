import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const APP_PATH = path.join(__dirname, '..', 'App.tsx');

console.log('🚑 STARTING APP RESCUE...');

try {
    let content = fs.readFileSync(APP_PATH, 'utf8');

    // 1. Remove imports
    console.log('🧹 Removing imports...');
    content = content.replace(
        "import { backupWorkoutLocally, syncWorkoutWithRetry, syncPendingBackups, getSyncStatus } from './services/backup';",
        "// import { backupWorkoutLocally, syncWorkoutWithRetry, syncPendingBackups, getSyncStatus } from './services/backup';"
    );
    content = content.replace(
        "import { SyncStatus } from './components/SyncStatus';",
        "// import { SyncStatus } from './components/SyncStatus';"
    );

    // 2. Remove useEffect (pending sync)
    console.log('🧹 Removing pending sync useEffect...');
    // This is harder to regex match perfectly, so we'll look for the specific comment
    const useEffectStart = "// Sync pending workouts on app start (ZERO DATA LOSS)";
    if (content.includes(useEffectStart)) {
        const startIndex = content.indexOf(useEffectStart);
        // Find the closure of this useEffect. It ends with "}, [currentUser, profile, isSyncing]);"
        const endMarker = "}, [currentUser, profile, isSyncing]);";
        const endIndex = content.indexOf(endMarker, startIndex);

        if (endIndex !== -1) {
            // Comment out the block
            const block = content.substring(startIndex, endIndex + endMarker.length);
            content = content.replace(block, "{/* Pending sync disabled for debugging */}");
        }
    }

    // 3. Revert onComplete logic to SIMPLE version (but keep local backup if possible)
    console.log('🧹 Reverting onComplete logic...');

    // We'll replace the whole complex block with a simpler safe version
    const newSimpleLogic = `onComplete={async (sessionData) => {
                // FALLBACK MODE
                setIsSyncing(true);
                try {
                   // Try to save profile days at least
                   const today = new Date().toISOString().split('T')[0];
                   if (profile) {
                     const updatedDays = profile.completedDays.includes(today) 
                        ? profile.completedDays 
                        : [...profile.completedDays, today];
                     await saveProfile({ ...profile, completedDays: updatedDays });
                   }
                   
                   // ALERT USER
                   alert('⚠️ Modo de Segurança Ativado!\\n\\nO sistema de backup avançado foi desativado temporariamente para corrigir o erro.\\nSeu treino foi registrado no perfil, mas verifique o histórico depois.');
                   
                   setCompletedSession(sessionData);
                   setView('workout_completed');
                } catch (err) {
                   console.error(err);
                   setIsSyncing(false);
                }
                setIsSyncing(false);
              }}`;

    // Find the current onComplete block
    const startMarker = `onComplete={async (sessionData) => {`;
    const endMarker = `setView('workout_completed');
                  
                } catch (err) {`;

    // This matching is fragile. Let's try to match by the unique comment we added
    const uniqueComment = "// ⚡ ZERO DATA LOSS SYSTEM - Backup local SEMPRE primeiro!";

    if (content.includes(uniqueComment)) {
        const startIndex = content.lastIndexOf(`onComplete={async (sessionData) => {`);
        const nextProp = `onCancel={() => setView('home')}`;
        const endIndex = content.indexOf(nextProp, startIndex);

        if (startIndex !== -1 && endIndex !== -1) {
            const before = content.substring(0, startIndex);
            const after = content.substring(endIndex);
            content = before + newSimpleLogic + '\n              ' + after;
        }
    }

    // 4. Remove SyncStatus component usage
    console.log('🧹 Removing SyncStatus usage...');
    content = content.replace(
        "<SyncStatus userId={currentUser.id} />",
        "{/* <SyncStatus userId={currentUser.id} /> */}"
    );

    fs.writeFileSync(APP_PATH, content, 'utf8');
    console.log('✅ APP RESCUED! Try running it now.');

} catch (err) {
    console.error('❌ Failed to rescue app:', err);
}
