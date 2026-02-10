import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const APP_PATH = path.join(__dirname, '..', 'App.tsx');

console.log('UI: Injecting SyncStatus Indicator...');

try {
    let content = fs.readFileSync(APP_PATH, 'utf8');

    // Replace the simple spinner with our smart component
    const oldSpinner = `{isSyncing && <RefreshCw size={14} className="animate-spin text-indigo-400" />}`;
    const newComponent = `<SyncStatus isSyncing={isSyncing} pendingCount={pendingCount} />`;

    if (content.includes(oldSpinner)) {
        content = content.replace(oldSpinner, newComponent);
        fs.writeFileSync(APP_PATH, content, 'utf8');
        console.log('✅ SyncStatus Integrated into Header!');
    } else {
        console.log('⚠️ Could not find old spinner to replace. Maybe already updated?');
    }

} catch (err) {
    console.error('❌ Failed to inject UI:', err);
}
