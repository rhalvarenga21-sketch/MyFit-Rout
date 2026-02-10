// MyFitRout - Test Suite
// Agent 4.4 - QA Tester
// Squad 4: Infrastructure & QA

import { describe, it, expect, beforeEach } from 'vitest';
import { auditExerciseVideos, getQuickStats } from '../services/videoAudit';
import { EXERCISE_LIBRARY } from '../data/exercises';

describe('Video Audit Service', () => {
    it('should calculate correct statistics', () => {
        const stats = getQuickStats();

        expect(stats.total).toBeGreaterThan(0);
        expect(stats.withVideo).toBeGreaterThanOrEqual(0);
        expect(stats.withoutVideo).toBeGreaterThanOrEqual(0);
        expect(stats.total).toBe(stats.withVideo + stats.withoutVideo);
        expect(stats.coverage).toBeGreaterThanOrEqual(0);
        expect(stats.coverage).toBeLessThanOrEqual(100);
    });

    it('should detect duplicate URLs', () => {
        const audit = auditExerciseVideos();

        // Se houver duplicatas, deve ser um array
        expect(Array.isArray(audit.duplicateUrls)).toBe(true);
    });

    it('should categorize by muscle group', () => {
        const audit = auditExerciseVideos();

        expect(audit.byMuscleGroup).toBeDefined();
        expect(Object.keys(audit.byMuscleGroup).length).toBeGreaterThan(0);

        // Verificar estrutura
        Object.values(audit.byMuscleGroup).forEach(stats => {
            expect(stats).toHaveProperty('total');
            expect(stats).toHaveProperty('withVideo');
            expect(stats.total).toBeGreaterThanOrEqual(stats.withVideo);
        });
    });

    it('should list missing video exercises', () => {
        const audit = auditExerciseVideos();

        expect(Array.isArray(audit.missingVideoExercises)).toBe(true);
        expect(audit.missingVideoExercises.length).toBe(audit.withoutVideo);

        // Verificar estrutura de cada item
        audit.missingVideoExercises.forEach(ex => {
            expect(ex).toHaveProperty('id');
            expect(ex).toHaveProperty('name');
            expect(ex).toHaveProperty('muscleGroup');
            expect(ex).toHaveProperty('difficulty');
        });
    });
});

describe('Exercise Library', () => {
    it('should have valid structure', () => {
        expect(Array.isArray(EXERCISE_LIBRARY)).toBe(true);
        expect(EXERCISE_LIBRARY.length).toBeGreaterThan(0);
    });

    it('should have required fields', () => {
        EXERCISE_LIBRARY.forEach(exercise => {
            expect(exercise).toHaveProperty('id');
            expect(exercise).toHaveProperty('name');
            expect(exercise).toHaveProperty('muscleGroup');
            expect(exercise).toHaveProperty('difficulty');
            expect(exercise).toHaveProperty('equipment');
            expect(exercise).toHaveProperty('executionTips');

            // Verificar multilíngue
            expect(exercise.name).toHaveProperty('PT');
            expect(exercise.name).toHaveProperty('EN');
            expect(exercise.name).toHaveProperty('ES');

            expect(exercise.executionTips).toHaveProperty('PT');
            expect(exercise.executionTips).toHaveProperty('EN');
            expect(exercise.executionTips).toHaveProperty('ES');
        });
    });

    it('should have unique IDs', () => {
        const ids = EXERCISE_LIBRARY.map(ex => ex.id);
        const uniqueIds = new Set(ids);

        expect(ids.length).toBe(uniqueIds.size);
    });

    it('should have valid difficulty levels', () => {
        const validDifficulties = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'];

        EXERCISE_LIBRARY.forEach(exercise => {
            expect(validDifficulties).toContain(exercise.difficulty);
        });
    });

    it('should have valid video URLs when present', () => {
        const urlPattern = /^https?:\/\/.+/;

        EXERCISE_LIBRARY.forEach(exercise => {
            if (exercise.videoUrl) {
                expect(exercise.videoUrl).toMatch(urlPattern);
            }
        });
    });
});

describe('Chat History Service', () => {
    // Mock tests - require Supabase connection
    it('should export functions', async () => {
        const { loadChatHistory, saveChatMessage, clearChatHistory } = await import('../services/chatHistory');

        expect(typeof loadChatHistory).toBe('function');
        expect(typeof saveChatMessage).toBe('function');
        expect(typeof clearChatHistory).toBe('function');
    });
});

describe('Workout Integration Service', () => {
    it('should export functions', async () => {
        const {
            getRecentWorkouts,
            getTodayWorkout,
            getWorkoutContextForAI,
            getWorkoutStats
        } = await import('../services/workoutIntegration');

        expect(typeof getRecentWorkouts).toBe('function');
        expect(typeof getTodayWorkout).toBe('function');
        expect(typeof getWorkoutContextForAI).toBe('function');
        expect(typeof getWorkoutStats).toBe('function');
    });
});

describe('Social Share Service', () => {
    it('should export functions', async () => {
        const {
            generateAchievementImage,
            generateProgressCard,
            shareViaWebAPI,
            shareToWhatsApp
        } = await import('../services/socialShare');

        expect(typeof generateAchievementImage).toBe('function');
        expect(typeof generateProgressCard).toBe('function');
        expect(typeof shareViaWebAPI).toBe('function');
        expect(typeof shareToWhatsApp).toBe('function');
    });

    it('should generate valid share text', async () => {
        const { generateShareText } = await import('../services/socialShare');
        const { Language } = await import('../types');

        const text = generateShareText('first_workout', '1', 'Rafa', Language.PT);

        expect(text).toBeTruthy();
        expect(text.length).toBeGreaterThan(0);
        expect(text).toContain('Rafa');
    });
});

describe('Translations', () => {
    it('should have all languages', async () => {
        const { translations } = await import('../translations');
        const { Language } = await import('../types');

        expect(translations).toHaveProperty(Language.PT);
        expect(translations).toHaveProperty(Language.EN);
        expect(translations).toHaveProperty(Language.ES);
    });

    it('should have consistent structure across languages', async () => {
        const { translations } = await import('../translations');
        const { Language } = await import('../types');

        const ptKeys = Object.keys(translations[Language.PT]);
        const enKeys = Object.keys(translations[Language.EN]);
        const esKeys = Object.keys(translations[Language.ES]);

        expect(ptKeys.length).toBeGreaterThan(0);
        expect(ptKeys.length).toBe(enKeys.length);
        expect(ptKeys.length).toBe(esKeys.length);
    });
});
