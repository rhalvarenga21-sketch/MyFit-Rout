// MyFitRout - Workout Integration Service
// Agent 1.2 - Workout Integration Specialist
// Squad 1: Core App Enhancement

import { supabase } from './supabaseClient';
import { UserProfile } from '../types';

export interface WorkoutLog {
    id: string;
    user_id: string;
    workout_name: string;
    workout_type?: string;
    duration_minutes?: number;
    total_volume?: number;
    sets_completed?: number;
    exercises_completed?: number;
    notes?: string;
    created_at: string;
}

export interface ExerciseSet {
    id: string;
    workout_log_id: string;
    exercise_id: string;
    exercise_name: string;
    set_number: number;
    weight?: number;
    reps?: number;
    completed: boolean;
    created_at: string;
}

/**
 * Obter treinos recentes do usuário
 */
export const getRecentWorkouts = async (
    userId: string,
    limit: number = 5
): Promise<WorkoutLog[]> => {
    try {
        const { data, error } = await supabase
            .from('workout_logs')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false })
            .limit(limit);

        if (error) throw error;
        return data || [];
    } catch (error) {
        console.error('Error fetching recent workouts:', error);
        return [];
    }
};

/**
 * Obter treino de hoje
 */
export const getTodayWorkout = async (userId: string): Promise<WorkoutLog | null> => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const { data, error } = await supabase
            .from('workout_logs')
            .select('*')
            .eq('user_id', userId)
            .gte('created_at', today.toISOString())
            .order('created_at', { ascending: false })
            .limit(1)
            .single();

        if (error) {
            if (error.code === 'PGRST116') return null; // Not found
            throw error;
        }
        return data;
    } catch (error) {
        console.error('Error fetching today workout:', error);
        return null;
    }
};

/**
 * Obter estatísticas de treino para contexto da IA
 */
export const getWorkoutContextForAI = async (userId: string): Promise<string> => {
    try {
        const recentWorkouts = await getRecentWorkouts(userId, 7);
        const todayWorkout = await getTodayWorkout(userId);

        if (recentWorkouts.length === 0) {
            return "O usuário ainda não registrou nenhum treino.";
        }

        let context = "";

        // Treino de hoje
        if (todayWorkout) {
            context += `TREINO DE HOJE: ${todayWorkout.workout_name} (${todayWorkout.workout_type || 'N/A'}). `;
            context += `Volume: ${todayWorkout.total_volume || 0}kg, `;
            context += `Séries: ${todayWorkout.sets_completed || 0}, `;
            context += `Duração: ${todayWorkout.duration_minutes || 0}min.\n`;
        } else {
            context += "O usuário ainda não treinou hoje.\n";
        }

        // Últimos 7 dias
        const last7Days = recentWorkouts.slice(0, 7);
        const totalVolume = last7Days.reduce((sum, w) => sum + (w.total_volume || 0), 0);
        const avgDuration = last7Days.reduce((sum, w) => sum + (w.duration_minutes || 0), 0) / last7Days.length;

        context += `\nÚLTIMOS 7 DIAS: ${last7Days.length} treinos realizados. `;
        context += `Volume total: ${totalVolume.toFixed(0)}kg. `;
        context += `Duração média: ${avgDuration.toFixed(0)}min.\n`;

        // Grupos musculares treinados
        const muscleGroups = last7Days
            .map(w => w.workout_type)
            .filter(Boolean)
            .join(', ');

        if (muscleGroups) {
            context += `Grupos treinados: ${muscleGroups}.\n`;
        }

        return context;
    } catch (error) {
        console.error('Error getting workout context:', error);
        return "Erro ao carregar histórico de treinos.";
    }
};

/**
 * Obter plano de treino da semana
 */
export const getWeeklyPlan = async (userId: string): Promise<{
    [key: string]: string[]; // { 'monday': ['CHEST', 'TRICEPS'], ... }
}> => {
    try {
        const { data: profile, error } = await supabase
            .from('profiles')
            .select('weekly_plan')
            .eq('id', userId)
            .single();

        if (error) throw error;
        return profile?.weekly_plan || {};
    } catch (error) {
        console.error('Error fetching weekly plan:', error);
        return {};
    }
};

/**
 * Verificar se o usuário seguiu o plano hoje
 */
export const checkPlanAdherence = async (userId: string): Promise<{
    plannedToday: string[];
    actuallyTrained: boolean;
    adherence: 'yes' | 'no' | 'no_plan';
}> => {
    try {
        const weeklyPlan = await getWeeklyPlan(userId);
        const todayWorkout = await getTodayWorkout(userId);

        const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        const today = daysOfWeek[new Date().getDay()];
        const plannedToday = weeklyPlan[today] || [];

        if (plannedToday.length === 0) {
            return { plannedToday: [], actuallyTrained: !!todayWorkout, adherence: 'no_plan' };
        }

        const adherence = todayWorkout ? 'yes' : 'no';

        return {
            plannedToday,
            actuallyTrained: !!todayWorkout,
            adherence
        };
    } catch (error) {
        console.error('Error checking plan adherence:', error);
        return { plannedToday: [], actuallyTrained: false, adherence: 'no_plan' };
    }
};

/**
 * Gerar sugestões baseadas no histórico
 */
export const generateWorkoutSuggestions = async (userId: string): Promise<string[]> => {
    try {
        const recentWorkouts = await getRecentWorkouts(userId, 14);
        const { plannedToday, actuallyTrained } = await checkPlanAdherence(userId);

        const suggestions: string[] = [];

        // Sugestão 1: Baseada no plano
        if (plannedToday.length > 0 && !actuallyTrained) {
            suggestions.push(`Hoje é dia de ${plannedToday.join(' + ')}. Já treinou?`);
        }

        // Sugestão 2: Baseada em padrões
        const last7Days = recentWorkouts.slice(0, 7);
        const trainedMuscles = new Set(last7Days.map(w => w.workout_type).filter(Boolean));

        const allMuscles = ['CHEST', 'BACK', 'LEGS', 'SHOULDERS', 'ARMS'];
        const notTrained = allMuscles.filter(m => !trainedMuscles.has(m));

        if (notTrained.length > 0) {
            suggestions.push(`Você não treinou ${notTrained[0]} nos últimos 7 dias. Que tal focar nisso?`);
        }

        // Sugestão 3: Baseada em volume
        if (last7Days.length > 0) {
            const avgVolume = last7Days.reduce((sum, w) => sum + (w.total_volume || 0), 0) / last7Days.length;
            suggestions.push(`Seu volume médio é ${avgVolume.toFixed(0)}kg. Vamos aumentar?`);
        }

        return suggestions.slice(0, 3);
    } catch (error) {
        console.error('Error generating suggestions:', error);
        return [];
    }
};

/**
 * Salvar workout log
 */
export const saveWorkoutLog = async (
    userId: string,
    workoutData: Partial<WorkoutLog>
): Promise<WorkoutLog | null> => {
    try {
        const { data, error } = await supabase
            .from('workout_logs')
            .insert([{
                user_id: userId,
                ...workoutData
            }])
            .select()
            .single();

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error saving workout log:', error);
        return null;
    }
};

/**
 * Obter estatísticas gerais
 */
export const getWorkoutStats = async (userId: string): Promise<{
    totalWorkouts: number;
    totalVolume: number;
    totalSets: number;
    avgDuration: number;
    currentStreak: number;
}> => {
    try {
        const { data, error } = await supabase
            .from('workout_logs')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        if (error) throw error;

        const workouts = data || [];
        const totalWorkouts = workouts.length;
        const totalVolume = workouts.reduce((sum, w) => sum + (w.total_volume || 0), 0);
        const totalSets = workouts.reduce((sum, w) => sum + (w.sets_completed || 0), 0);
        const avgDuration = workouts.length > 0
            ? workouts.reduce((sum, w) => sum + (w.duration_minutes || 0), 0) / workouts.length
            : 0;

        // Calcular streak (dias consecutivos)
        let currentStreak = 0;
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        for (let i = 0; i < workouts.length; i++) {
            const workoutDate = new Date(workouts[i].created_at);
            workoutDate.setHours(0, 0, 0, 0);

            const daysDiff = Math.floor((today.getTime() - workoutDate.getTime()) / (1000 * 60 * 60 * 24));

            if (daysDiff === currentStreak) {
                currentStreak++;
            } else {
                break;
            }
        }

        return {
            totalWorkouts,
            totalVolume,
            totalSets,
            avgDuration,
            currentStreak
        };
    } catch (error) {
        console.error('Error getting workout stats:', error);
        return {
            totalWorkouts: 0,
            totalVolume: 0,
            totalSets: 0,
            avgDuration: 0,
            currentStreak: 0
        };
    }
};
