import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const APP_PATH = path.join(__dirname, '..', 'App.tsx');

console.log('🐞 INJECTING DEBUG CONSOLE...');

try {
    let content = fs.readFileSync(APP_PATH, 'utf8');

    // 1. Import
    const importStatement = "import { DebugConsole } from './components/DebugConsole';";
    if (!content.includes(importStatement)) {
        // Find existing imports
        content = content.replace("import { SyncStatus } from './components/SyncStatus';", "import { SyncStatus } from './components/SyncStatus';\n" + importStatement);
    }

    // 2. Add Component before closing div of App
    const componentTag = "<DebugConsole />";
    if (!content.includes(componentTag)) {
        // Look for the end of the return statement
        // Specifically inside the main div
        // Try finding <PaymentModal /> or similar footer components

        // Let's put it right before the closing of the main container div
        // OR alongside SyncStatus/NavBtn usage if easier.
        // Actually, since it's fixed position, it can go anywhere inside the return.

        // Let's insert it before <SocialShareModal
        if (content.includes("<SocialShareModal")) {
            content = content.replace("<SocialShareModal", "<DebugConsole />\n      <SocialShareModal");
            console.log('✅ DebugConsole Injected!');
            fs.writeFileSync(APP_PATH, content, 'utf8');
        } else {
            console.log('⚠️ Could not find injection point. Trying alternate...');
            // Try before close of main div
            // Assuming last line of return has </div>
        }
    }

} catch (err) {
    console.error('❌ Failed to inject debug console:', err);
}
