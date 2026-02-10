import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const APP_PATH = path.join(__dirname, '..', 'App.tsx');

console.log('🔧 FIXING BUILD ERRORS...');

try {
    let content = fs.readFileSync(APP_PATH, 'utf8');

    // 1. Rename destructuring to avoid variable shadowing
    const oldDestructure = "const { saveWorkout, isSyncing, pendingCount } = useAutoSave(currentUser?.id, profile || undefined);";
    const newDestructure = "const { saveWorkout, isSyncing: isBackupSyncing, pendingCount } = useAutoSave(currentUser?.id, profile || undefined);";

    if (content.includes(oldDestructure)) {
        content = content.replace(oldDestructure, newDestructure);
        console.log('✅ Fixed variable shadowing');
    }

    // 2. Fix usage in SyncStatus Component
    // Since we now have isSyncing (app state) and isBackupSyncing (hook state), we probably want to show SyncStatus when BACKUP is syncing.
    // OR maybe both? 
    // The SyncStatus component expects `isSyncing`.
    // Let's pass `isBackupSyncing`.

    // Find: <SyncStatus isSyncing={isSyncing} pendingCount={pendingCount} />
    // Replace with: <SyncStatus isSyncing={isBackupSyncing} pendingCount={pendingCount} />

    const oldComponentUsage = "<SyncStatus isSyncing={isSyncing} pendingCount={pendingCount} />";
    const newComponentUsage = "<SyncStatus isSyncing={isBackupSyncing} pendingCount={pendingCount} />";

    if (content.includes(oldComponentUsage)) {
        content = content.replace(oldComponentUsage, newComponentUsage);
        console.log('✅ Updated SyncStatus usage');
    }

    fs.writeFileSync(APP_PATH, content, 'utf8');
    console.log('✅ BUILD FIXES APPLIED!');

} catch (err) {
    console.error('❌ Failed to fix build:', err);
}
