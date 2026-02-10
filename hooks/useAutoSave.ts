import { useState, useEffect, useCallback } from 'react';
import { backupWorkoutLocally, syncWorkoutWithRetry, syncPendingBackups, getSyncStatus } from '../services/backup';
import { UserProfile } from '../types';
import { logger } from '../services/debug';

export const useAutoSave = (userId?: string, profile?: UserProfile) => {
    const [isSyncing, setIsSyncing] = useState(false);
    const [lastSyncError, setLastSyncError] = useState<string | null>(null);
    const [pendingCount, setPendingCount] = useState(0);

    // Initial check for pending backups
    useEffect(() => {
        if (!userId) return;

        const checkPending = async () => {
            const status = getSyncStatus(userId);
            setPendingCount(status.pending);

            if (status.hasPending && !isSyncing) {
                logger.log('INFO', 'AutoSave: Found pending backups, syncing in background...', status);
                const processed = await syncPendingBackups(userId);
                if (processed > 0) {
                    // Update status after sync
                    const newStatus = getSyncStatus(userId);
                    setPendingCount(newStatus.pending);
                }
            }
        };

        checkPending();

        // Check periodically (every 2 minutes)
        const interval = setInterval(checkPending, 120000);
        return () => clearInterval(interval);
    }, [userId]);

    const saveWorkout = useCallback(async (sessionData: any, onSuccess?: () => void) => {
        if (!userId) {
            logger.log('ERROR', 'AutoSave: No user ID provided');
            return;
        }

        setIsSyncing(true);
        setLastSyncError(null);

        try {
            // 1. ALWAYS Backup Locally First (Synchronous & Instant)
            logger.log('INFO', 'AutoSave: Creating local backup...');
            const backupId = backupWorkoutLocally(userId, sessionData);

            // Update pending count immediately for UI feedback
            setPendingCount(prev => prev + 1);

            // 2. Try Cloud Sync
            logger.log('INFO', 'AutoSave: Attempting cloud sync...');
            const result = await syncWorkoutWithRetry(sessionData, backupId);

            if (result.success) {
                logger.log('SUCCESS', 'AutoSave: Cloud sync successful');
                setPendingCount(prev => Math.max(0, prev - 1));
            } else {
                logger.log('WARN', 'AutoSave: Cloud sync failed, data safely in local backup', result.error);
                setLastSyncError('Saved offline. Will sync later.');
            }

            if (onSuccess) onSuccess();

        } catch (err) {
            logger.log('ERROR', 'AutoSave: Critical error', err);
            // Even if everything crashes, verify backing up locally via try-catch block inside backup service
            setLastSyncError('Error saving, but local backup attempted.');
        } finally {
            setIsSyncing(false);
        }
    }, [userId]);

    return {
        saveWorkout,
        isSyncing,
        pendingCount,
        lastSyncError
    };
};
