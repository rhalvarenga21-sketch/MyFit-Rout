// MyFitRout - Gamification Service
// Quick Win #1: Sistema de Streaks e Badges
// Squad: Growth & Retention

import { supabase } from './supabaseClient';

export interface UserStreak {
    user_id: string;
    current_streak: number;
    longest_streak: number;
    last_workout_date: string;
    total_workouts: number;
    total_xp: number;
    level: number;
}

export interface Badge {
    id: string;
    name: string;
    description: string;
    icon: string;
    requirement: number;
    type: 'streak' | 'workout' | 'volume' | 'special';
}

// Badges disponíveis
export const BADGES: Badge[] = [
    { id: 'first_workout', name: 'Primeira Vez', description: 'Completou primeiro treino', icon: '🎯', requirement: 1, type: 'workout' },
    { id: 'streak_7', name: 'Semana Forte', description: '7 dias consecutivos', icon: '🔥', requirement: 7, type: 'streak' },
    { id: 'streak_30', name: 'Mês Imparável', description: '30 dias consecutivos', icon: '💪', requirement: 30, type: 'streak' },
    { id: 'streak_100', name: 'Centenário', description: '100 dias consecutivos', icon: '👑', requirement: 100, type: 'streak' },
    { id: 'workout_10', name: 'Dedicado', description: '10 treinos completados', icon: '⭐', requirement: 10, type: 'workout' },
    { id: 'workout_50', name: 'Comprometido', description: '50 treinos completados', icon: '🌟', requirement: 50, type: 'workout' },
    { id: 'workout_100', name: 'Atleta', description: '100 treinos completados', icon: '🏆', requirement: 100, type: 'workout' },
    { id: 'volume_1000', name: 'Tonelada', description: '1000kg movimentados', icon: '🏋️', requirement: 1000, type: 'volume' },
];

/**
 * Calcular streak atual do usuário
 */
export const calculateStreak = async (userId: string): Promise<number> => {
    try {
        const { data: workouts } = await supabase
            .from('workout_logs')
            .select('created_at')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        if (!workouts || workouts.length === 0) return 0;

        let streak = 0;
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        for (let i = 0; i < workouts.length; i++) {
            const workoutDate = new Date(workouts[i].created_at);
            workoutDate.setHours(0, 0, 0, 0);

            const expectedDate = new Date(today);
            expectedDate.setDate(today.getDate() - streak);

            if (workoutDate.getTime() === expectedDate.getTime()) {
                streak++;
            } else {
                break;
            }
        }

        return streak;
    } catch (error) {
        console.error('Error calculating streak:', error);
        return 0;
    }
};

/**
 * Obter XP e nível do usuário
 */
export const getUserLevel = (totalXP: number): { level: number; nextLevelXP: number } => {
    // Fórmula: Level = floor(sqrt(XP / 100))
    const level = Math.floor(Math.sqrt(totalXP / 100)) + 1;
    const nextLevelXP = Math.pow(level, 2) * 100;

    return { level, nextLevelXP };
};

/**
 * Adicionar XP ao usuário
 */
export const addXP = async (userId: string, xp: number): Promise<number> => {
    try {
        // Buscar XP atual
        const { data: profile } = await supabase
            .from('profiles')
            .select('total_xp')
            .eq('id', userId)
            .single();

        const currentXP = profile?.total_xp || 0;
        const newXP = currentXP + xp;

        // Atualizar
        await supabase
            .from('profiles')
            .update({ total_xp: newXP })
            .eq('id', userId);

        return newXP;
    } catch (error) {
        console.error('Error adding XP:', error);
        return 0;
    }
};

/**
 * Verificar e desbloquear badges
 */
export const checkAndUnlockBadges = async (userId: string): Promise<Badge[]> => {
    try {
        // Buscar dados do usuário
        const [streak, { data: workouts }, { data: profile }] = await Promise.all([
            calculateStreak(userId),
            supabase.from('workout_logs').select('total_volume').eq('user_id', userId),
            supabase.from('profiles').select('*').eq('id', userId).single()
        ]);

        const totalWorkouts = workouts?.length || 0;
        const totalVolume = workouts?.reduce((sum, w) => sum + (w.total_volume || 0), 0) || 0;

        // Verificar quais badges desbloquear
        const unlockedBadges: Badge[] = [];

        for (const badge of BADGES) {
            // Verificar se já tem
            const { data: existing } = await supabase
                .from('user_achievements')
                .select('id')
                .eq('user_id', userId)
                .eq('achievement_type', badge.id)
                .single();

            if (existing) continue;

            // Verificar requisito
            let shouldUnlock = false;

            if (badge.type === 'streak' && streak >= badge.requirement) {
                shouldUnlock = true;
            } else if (badge.type === 'workout' && totalWorkouts >= badge.requirement) {
                shouldUnlock = true;
            } else if (badge.type === 'volume' && totalVolume >= badge.requirement) {
                shouldUnlock = true;
            }

            if (shouldUnlock) {
                await supabase.from('user_achievements').insert({
                    user_id: userId,
                    achievement_type: badge.id,
                    achievement_name: badge.name,
                    achievement_description: badge.description
                });

                unlockedBadges.push(badge);
            }
        }

        return unlockedBadges;
    } catch (error) {
        console.error('Error checking badges:', error);
        return [];
    }
};

/**
 * Registrar treino completo (adiciona XP e verifica badges)
 */
export const completeWorkout = async (userId: string, workoutData: any): Promise<{
    xpGained: number;
    newBadges: Badge[];
    newLevel: boolean;
}> => {
    try {
        // XP base por treino
        const baseXP = 50;
        const volumeBonus = Math.floor((workoutData.total_volume || 0) / 100);
        const totalXP = baseXP + volumeBonus;

        // Adicionar XP
        const oldXP = await addXP(userId, totalXP);
        const newXP = oldXP + totalXP;

        // Verificar level up
        const oldLevel = getUserLevel(oldXP).level;
        const newLevel = getUserLevel(newXP).level;
        const leveledUp = newLevel > oldLevel;

        // Verificar badges
        const newBadges = await checkAndUnlockBadges(userId);

        return {
            xpGained: totalXP,
            newBadges,
            newLevel: leveledUp
        };
    } catch (error) {
        console.error('Error completing workout:', error);
        return { xpGained: 0, newBadges: [], newLevel: false };
    }
};

/**
 * Obter estatísticas de gamificação
 */
export const getGamificationStats = async (userId: string) => {
    try {
        const [streak, { data: profile }, { data: badges }] = await Promise.all([
            calculateStreak(userId),
            supabase.from('profiles').select('total_xp').eq('id', userId).single(),
            supabase.from('user_achievements').select('*').eq('user_id', userId)
        ]);

        const totalXP = profile?.total_xp || 0;
        const { level, nextLevelXP } = getUserLevel(totalXP);

        return {
            streak,
            level,
            totalXP,
            nextLevelXP,
            xpToNextLevel: nextLevelXP - totalXP,
            badges: badges || [],
            badgeCount: badges?.length || 0
        };
    } catch (error) {
        console.error('Error getting gamification stats:', error);
        return null;
    }
};
