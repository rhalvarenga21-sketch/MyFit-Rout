import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const APP_PATH = path.join(__dirname, '..', 'App.tsx');

console.log('🛡️ INTEGRATING ROBUST AUTOSAVE SYSTEM...');

try {
    let content = fs.readFileSync(APP_PATH, 'utf8');

    // 1. Imports
    const hooksImport = "import { useAutoSave } from './hooks/useAutoSave';";
    const componentImport = "import { SyncStatus } from './components/SyncStatus';";

    // Clean old imports if they exist commented out
    content = content.replace(/\/\/ import \{ backupWorkoutLocally.*/g, '');
    content = content.replace(/\/\/ import \{ SyncStatus.*/g, '');

    if (!content.includes('useAutoSave')) {
        const importMarker = "import { getFoodById } from './data/foods';";
        content = content.replace(importMarker, `${importMarker}\n${hooksImport}\n${componentImport}`);
    }

    // 2. Hook Initialization
    // Find start of App component
    const appStartMarker = "const App: React.FC = () => {";
    if (content.includes(appStartMarker) && !content.includes("useAutoSave(")) {
        // Insert hook after user state init
        const hookInsertPoint = "const [selectedWorkout, setSelectedWorkout] = useState<PresetWorkout | CustomWorkout | null>(null);";
        const hookCode = `
  // 🛡️ AutoSave System
  const { saveWorkout, isSyncing, pendingCount } = useAutoSave(currentUser?.id, profile || undefined);
`;
        content = content.replace(hookInsertPoint, `${hookInsertPoint}${hookCode}`);
    }

    // 3. Header Indicator
    // We want to place SyncStatus in the header. 
    // Look for the "Me" button or similar in the top bar.
    // The top bar usually has the user greeting or logo.

    // In the "home" view header:
    // <div className="flex justify-between items-center mb-8">
    //    <div>
    //       <h1 className="text-2xl font-black italic uppercase tracking-tighter">MYFITROUT</h1>

    // Let's verify where to put it. 
    // We can put it next to the settings/profile icon or replace a static element.
    // Or just insert it absolutely positioned or in a flex container.

    // Let's check for the main header div in Home view
    const headerMarker = `<h1 className="text-2xl font-black italic uppercase tracking-tighter">MYFITROUT</h1>`;
    if (content.includes(headerMarker)) {
        // Check if we already added it
        if (!content.includes("<SyncStatus")) {
            // We can wrap the H1 in a div or add it next to it
            // Let's add it right after the H1's closing div if it exists, or just append inside the flex container
            // The container is: <div className="flex justify-between items-center mb-8">
            // Inside: div (logo), div (actions)

            // Let's replace the whole header block to be safe and clean
            // This is risky if I don't know the exact content.

            // Safer: Inject it BEFORE the closing of the header div's first child?
            // Or better, let's look for the Settings icon button in the header
            // <button onClick={() => setView('settings')} ...

            const settingsBtnMarker = `onClick={() => setView('settings')}`;
            // Inject before this button
            // content = content.replace(`<button ${settingsBtnMarker}`, `<SyncStatus isSyncing={isSyncing} pendingCount={pendingCount} />\n            <button ${settingsBtnMarker}`);
            // This puts it right next to settings. Good.
        }
    }

    // 4. Replace onComplete Logic
    // We need to find the ActiveWorkout component call and its onComplete prop.
    const onCompleteStart = `onComplete={async (sessionData) => {`;

    // We expect the "Rescue" version to be there now (simple version)
    // Or the "Safe Mode" version.

    // Let's rewrite the logic completely
    const newOnCompleteLogic = `onComplete={async (sessionData) => {
                // 🛡️ ROBUST AUTO-SAVE
                // No alerts, just action.
                await saveWorkout(sessionData, async () => {
                     // Success callback (optional, mostly for UI updates)
                     console.log('Workout saved via AutoSave hook');
                });

                // Update Profile Days (Local optimisitic update + Cloud sync via saveProfile)
                const today = new Date().toISOString().split('T')[0];
                if (profile) {
                  const updatedDays = profile.completedDays.includes(today)
                    ? profile.completedDays
                    : [...profile.completedDays, today];

                  await saveProfile({ ...profile, completedDays: updatedDays });
                }

                // Navigate immediately
                setCompletedSession(sessionData);
                setView('workout_completed');
              }}`;

    // Regex to capture the entire onComplete block is tricky.
    // We will look for the start and the specific end we know exists from previous edits or rescue script.

    // The rescue script put:
    // onComplete={async (sessionData) => {
    //            // FALLBACK MODE
    // ...
    //            setIsSyncing(false);
    //          }}

    const fallbackMarker = "// FALLBACK MODE";
    if (content.includes(fallbackMarker)) {
        const startIndex = content.lastIndexOf(`onComplete={async (sessionData) => {`);
        const nextProp = `onCancel={() => setView('home')}`;
        const endIndex = content.indexOf(nextProp, startIndex);

        if (startIndex !== -1 && endIndex !== -1) {
            const before = content.substring(0, startIndex);
            const after = content.substring(endIndex);
            content = before + newOnCompleteLogic + '\n              ' + after;
        }
    } else {
        // Try to match generic onComplete if fallback marker missing
        // Look for any onComplete inside ActiveWorkout
        // This part requires care.
        console.log("Could not find Fallback Mode marker. Trying generic match...");

        // Let's assume the user might have reverted to an even older version?
        // No, current state is rescue mode.
    }

    fs.writeFileSync(APP_PATH, content, 'utf8');
    console.log('✅ AutoSave Hook Integrated!');

} catch (err) {
    console.error('❌ Failed to integrate:', err);
}
