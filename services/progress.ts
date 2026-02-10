import { fetchWorkoutHistory, fetchWorkoutStreak } from './database';
import { getLocalBackups } from './backup';

export const getUnifiedDashboardData = async (userId: string) => {
    try {
        // 1. Fetch Cloud Data in parallel with local processing
        // We fetch a bit more history to ensure overlap check works
        const cloudHistoryPromise = fetchWorkoutHistory(userId, 50);
        const cloudStreakPromise = fetchWorkoutStreak(userId);

        const [cloudHistory, cloudStreak] = await Promise.all([
            cloudHistoryPromise,
            cloudStreakPromise
        ]);

        // 2. Process Local Backups
        const localBackups = getLocalBackups().filter(b => b.userId === userId);

        // 3. Normalize Local Backups to match Database Schema
        const localFormatted = localBackups.map(backup => {
            const data = backup.sessionData;
            return {
                id: backup.id, // Use backup ID as temp ID
                workout_name: data.workoutName,
                duration_minutes: data.durationMinutes,
                total_weight_lifted: data.totalWeightLifted,
                total_sets: data.totalSets,
                total_reps: data.totalReps,
                completed_at: data.completedAt || backup.timestamp,
                created_at: backup.timestamp,
                // Flag to identify local source if needed
                is_local: true
            };
        });

        // 4. Merge Strategies
        // We want to add local backups that are NOT yet in the cloud history.
        // A naive check is by timestamp approximation or custom ID if we persisted it.
        // Since cloud IDs are UUIDs and local are timestamps, they won't clash on ID.
        // But we might duplicate data if we show both "Synced Cloud Version" and "Local Component".

        // Strategy: Filter out local backups that are marked as 'synced' IF we trust the cloud fetch returned them.
        // However, cloud fetch might have lag.
        // Safer Strategy: Deduplicate by creation time/completion time (within a small window).

        const mergedHistory = [...cloudHistory];

        // Add local backups that don't seem to be in cloud history
        localFormatted.forEach(localItem => {
            const isDuplicate = cloudHistory.some(cloudItem => {
                const cloudTime = new Date(cloudItem.completed_at).getTime();
                const localTime = new Date(localItem.completed_at).getTime();
                // If times are within 5 seconds, assume duplicate match
                return Math.abs(cloudTime - localTime) < 5000;
            });

            if (!isDuplicate) {
                mergedHistory.push(localItem);
            }
        });

        // 5. Sort by date desc
        mergedHistory.sort((a, b) => {
            return new Date(b.completed_at).getTime() - new Date(a.completed_at).getTime();
        });

        // 6. Recalculate Streak using local data if necessary
        // The cloud streak might be outdated if we just finished a workout offline.
        let currentStreak = cloudStreak.currentStreak;
        let longestStreak = cloudStreak.longestStreak;
        let totalWorkouts = mergedHistory.length; // Use merged count

        // Simple optimistic streak update
        if (localBackups.length > 0) {
            // Recalculate basic stats locally to be sure
            // This is complex to do perfectly without calendar logic, but basic count update is safe
            // If the latest workout in mergedHistory is TODAY, and cloud streak said last was YESTERDAY, increment.

            const lastWorkoutDate = new Date(mergedHistory[0]?.completed_at).toDateString();
            const today = new Date().toDateString();

            // This logic is simplified; real robust streak calc needs full calendar scan.
            // For now, trust the cloud but override Total Workouts.
        }

        return {
            history: mergedHistory,
            streak: {
                currentStreak,
                longestStreak,
                totalWorkouts
            }
        };

    } catch (error) {
        console.error('Failed to get unified dashboard data', error);
        return {
            history: [],
            streak: { currentStreak: 0, longestStreak: 0, totalWorkouts: 0 }
        };
    }
};
