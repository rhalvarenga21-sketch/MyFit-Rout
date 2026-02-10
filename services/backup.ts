import { supabase } from '../lib/supabase';

/**
 * BACKUP SERVICE
 * Ensures workout data is never lost by maintaining local backup
 * and implementing retry logic for cloud sync
 */

const BACKUP_KEY = 'myfitrout_workout_backup';
const MAX_RETRIES = 3;
const RETRY_DELAY = 2000; // 2 seconds

interface WorkoutBackup {
    id: string;
    userId: string;
    sessionData: any;
    timestamp: string;
    synced: boolean;
    retries: number;
}

// Save workout to local backup
export const backupWorkoutLocally = (userId: string, sessionData: any): string => {
    try {
        const backupId = `${userId}_${Date.now()}`;
        const existingBackups = getLocalBackups();

        const newBackup: WorkoutBackup = {
            id: backupId,
            userId,
            sessionData,
            timestamp: new Date().toISOString(),
            synced: false,
            retries: 0
        };

        existingBackups.push(newBackup);
        localStorage.setItem(BACKUP_KEY, JSON.stringify(existingBackups));

        console.log('💾 Workout backed up locally:', backupId);
        return backupId;
    } catch (err) {
        console.error('❌ Failed to backup workout locally:', err);
        return '';
    }
};

// Get all local backups
export const getLocalBackups = (): WorkoutBackup[] => {
    try {
        const data = localStorage.getItem(BACKUP_KEY);
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
};

// Mark backup as synced
export const markBackupAsSynced = (backupId: string) => {
    try {
        const backups = getLocalBackups();
        const updated = backups.map(b =>
            b.id === backupId ? { ...b, synced: true } : b
        );
        localStorage.setItem(BACKUP_KEY, JSON.stringify(updated));
        console.log('✅ Backup marked as synced:', backupId);
    } catch (err) {
        console.error('❌ Failed to mark backup as synced:', err);
    }
};

// Clean old synced backups (keep last 30 days)
export const cleanOldBackups = () => {
    try {
        const backups = getLocalBackups();
        const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);

        const filtered = backups.filter(b => {
            const backupTime = new Date(b.timestamp).getTime();
            return !b.synced || backupTime > thirtyDaysAgo;
        });

        localStorage.setItem(BACKUP_KEY, JSON.stringify(filtered));
        console.log(`🧹 Cleaned ${backups.length - filtered.length} old backups`);
    } catch (err) {
        console.error('❌ Failed to clean backups:', err);
    }
};

// Sync workout with retry logic
export const syncWorkoutWithRetry = async (
    sessionData: any,
    backupId?: string,
    retryCount = 0
): Promise<{ success: boolean; error?: any }> => {
    try {
        console.log(`☁️ Syncing workout (attempt ${retryCount + 1}/${MAX_RETRIES})...`);

        const { error } = await supabase
            .from('workout_logs')
            .insert({
                user_id: sessionData.userId,
                workout_name: sessionData.workoutName,
                workout_source: sessionData.workoutType,
                duration_minutes: sessionData.durationMinutes,
                total_weight_lifted: sessionData.totalWeightLifted,
                total_sets: sessionData.totalSets,
                total_reps: sessionData.totalReps,
                data: sessionData
            });

        if (error) {
            console.error(`❌ Sync failed (attempt ${retryCount + 1}):`, error);

            // Retry if not max attempts
            if (retryCount < MAX_RETRIES - 1) {
                console.log(`⏳ Retrying in ${RETRY_DELAY / 1000}s...`);
                await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
                return syncWorkoutWithRetry(sessionData, backupId, retryCount + 1);
            }

            return { success: false, error };
        }

        // Mark as synced if we have a backup ID
        if (backupId) {
            markBackupAsSynced(backupId);
        }

        console.log('✅ Workout synced successfully!');
        return { success: true };

    } catch (err) {
        console.error('❌ Unexpected sync error:', err);

        if (retryCount < MAX_RETRIES - 1) {
            await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
            return syncWorkoutWithRetry(sessionData, backupId, retryCount + 1);
        }

        return { success: false, error: err };
    }
};

// Sync all pending backups
export const syncPendingBackups = async (userId: string): Promise<number> => {
    const backups = getLocalBackups().filter(b =>
        b.userId === userId && !b.synced && b.retries < MAX_RETRIES
    );

    if (backups.length === 0) {
        console.log('✅ No pending backups to sync');
        return 0;
    }

    console.log(`📤 Syncing ${backups.length} pending workout(s)...`);
    let syncedCount = 0;

    for (const backup of backups) {
        const result = await syncWorkoutWithRetry(backup.sessionData, backup.id, backup.retries);
        if (result.success) {
            syncedCount++;
        }
    }

    console.log(`✅ Synced ${syncedCount}/${backups.length} pending workouts`);
    cleanOldBackups();

    return syncedCount;
};

// Get sync status
export const getSyncStatus = (userId: string) => {
    const backups = getLocalBackups().filter(b => b.userId === userId);
    const pending = backups.filter(b => !b.synced);
    const synced = backups.filter(b => b.synced);

    return {
        total: backups.length,
        pending: pending.length,
        synced: synced.length,
        hasPending: pending.length > 0
    };
};
