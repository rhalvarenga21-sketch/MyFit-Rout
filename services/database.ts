import { supabase } from './supabaseClient';
import { UserProfile } from '../types';

/**
 * Real Supabase Database Service
 * Replaces localStorage with production-ready cloud database
 */

// ============================================
// USER PROFILE OPERATIONS
// ============================================

export const syncProfileToCloud = async (profile: UserProfile): Promise<boolean> => {
  try {
    console.log('🚀 Syncing profile to Supabase...', profile.name);

    const { data, error } = await supabase
      .from('user_profiles')
      .upsert({
        id: profile.id,
        email: profile.email,
        name: profile.name,
        age: profile.age,
        gender: profile.gender,
        weight: profile.weight,
        height: profile.height,
        activity_level: profile.activityLevel,
        experience_level: profile.level,
        fitness_goal: profile.goal,
        language: profile.language,
        training_days: profile.trainingDays,
        split_style: profile.splitStyle,
        subscription_plan: profile.subscription,
        subscription_active: profile.subscriptionActive,
        trial_start_date: profile.trialStartDate,
      })
      .select();

    if (error) {
      console.error('❌ Error syncing profile:', error);
      return false;
    }

    console.log('✅ Profile synced successfully:', data);
    return true;
  } catch (err) {
    console.error('❌ Unexpected error syncing profile:', err);
    return false;
  }
};

export const fetchProfileFromCloud = async (userId: string): Promise<UserProfile | null> => {
  try {
    console.log('☁️ Fetching profile from Supabase for user:', userId);

    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // Profile doesn't exist yet
        console.log('ℹ️ No profile found for user');
        return null;
      }
      console.error('❌ Error fetching profile:', error);
      return null;
    }

    if (!data) {
      return null;
    }

    // Map database fields to UserProfile type
    const profile: UserProfile = {
      id: data.id,
      email: data.email,
      name: data.name,
      role: 'MEMBER' as any, // Default role
      age: data.age,
      gender: data.gender,
      weight: data.weight,
      height: data.height,
      activityLevel: data.activity_level,
      level: data.experience_level,
      goal: data.fitness_goal,
      language: data.language,
      customSchedule: {}, // TODO: Implement schedule loading
      trainingDays: data.training_days || [],
      splitStyle: data.split_style,
      customWorkouts: [], // TODO: Implement custom workouts loading
      completedDays: [], // TODO: Implement completed days loading
      subscription: data.subscription_plan,
      subscriptionActive: data.subscription_active,
      hasPass: data.subscription_active,
      trialStartDate: data.trial_start_date,
    };

    console.log('✅ Profile fetched successfully:', profile.name);
    return profile;
  } catch (err) {
    console.error('❌ Unexpected error fetching profile:', err);
    return null;
  }
};

// ============================================
// WORKOUT SESSION OPERATIONS
// ============================================

export interface WorkoutSession {
  id?: string;
  userId: string;
  workoutName: string;
  workoutType: 'PRESET' | 'CUSTOM';
  presetWorkoutId?: string;
  startedAt: string;
  completedAt?: string;
  durationMinutes?: number;
  totalWeightLifted?: number;
  totalSets?: number;
  totalReps?: number;
  notes?: string;
}

export const startWorkoutSession = async (session: WorkoutSession): Promise<string | null> => {
  try {
    console.log('🏋️ Starting workout session:', session.workoutName);

    const { data, error } = await supabase
      .from('workout_sessions')
      .insert({
        user_id: session.userId,
        workout_name: session.workoutName,
        workout_type: session.workoutType,
        preset_workout_id: session.presetWorkoutId,
        started_at: session.startedAt,
      })
      .select()
      .single();

    if (error) {
      console.error('❌ Error starting workout session:', error);
      return null;
    }

    console.log('✅ Workout session started:', data.id);
    return data.id;
  } catch (err) {
    console.error('❌ Unexpected error starting workout:', err);
    return null;
  }
};

export const completeWorkoutSession = async (sessionData: any): Promise<boolean> => {
  try {
    console.log('✅ Saving completed workout session:', sessionData.workoutName);

    // Insert main workout session
    const { data: sessionRecord, error: sessionError } = await supabase
      .from('workout_sessions')
      .insert({
        user_id: sessionData.userId,
        workout_name: sessionData.workoutName,
        workout_type: sessionData.workoutType,
        preset_workout_id: sessionData.presetWorkoutId,
        started_at: sessionData.startedAt,
        completed_at: sessionData.completedAt,
        duration_minutes: sessionData.durationMinutes,
        total_weight_lifted: sessionData.totalWeightLifted,
        total_sets: sessionData.totalSets,
        total_reps: sessionData.totalReps,
      })
      .select()
      .single();

    if (sessionError) {
      console.error('❌ Error saving workout session:', sessionError);
      return false;
    }

    // Insert all exercise sets
    if (sessionData.exercises && sessionData.exercises.length > 0) {
      const exerciseSets: any[] = [];

      sessionData.exercises.forEach((exercise: any) => {
        exercise.sets.forEach((set: any) => {
          if (set.completed) {
            exerciseSets.push({
              session_id: sessionRecord.id,
              exercise_id: exercise.exerciseId,
              exercise_name: exercise.exerciseName,
              muscle_group: 'General', // TODO: Get from exercise library
              set_number: set.setNumber,
              reps_completed: set.reps,
              weight_used: set.weight,
              rest_seconds: 60,
            });
          }
        });
      });

      if (exerciseSets.length > 0) {
        const { error: setsError } = await supabase
          .from('exercises_completed')
          .insert(exerciseSets);

        if (setsError) {
          console.error('❌ Error saving exercise sets:', setsError);
          // Don't return false as the workout session was saved
        }
      }
    }

    // Update workout streak
    await updateWorkoutStreak(sessionData.userId);

    console.log('✅ Workout session and exercises saved successfully');
    return true;
  } catch (err) {
    console.error('❌ Unexpected error saving workout:', err);
    return false;
  }
};

// ============================================
// EXERCISE LOGGING
// ============================================

export interface ExerciseSet {
  sessionId: string;
  exerciseId: string;
  exerciseName: string;
  muscleGroup: string;
  setNumber: number;
  repsCompleted: number;
  weightUsed: number;
  restSeconds?: number;
  difficultyRating?: number;
  notes?: string;
}

export const logExerciseSet = async (set: ExerciseSet): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('exercises_completed')
      .insert({
        session_id: set.sessionId,
        exercise_id: set.exerciseId,
        exercise_name: set.exerciseName,
        muscle_group: set.muscleGroup,
        set_number: set.setNumber,
        reps_completed: set.repsCompleted,
        weight_used: set.weightUsed,
        rest_seconds: set.restSeconds,
        difficulty_rating: set.difficultyRating,
        notes: set.notes,
      });

    if (error) {
      console.error('❌ Error logging exercise set:', error);
      return false;
    }

    return true;
  } catch (err) {
    console.error('❌ Unexpected error logging set:', err);
    return false;
  }
};

// ============================================
// WORKOUT HISTORY
// ============================================

export const fetchWorkoutHistory = async (userId: string, limit: number = 10) => {
  try {
    const { data, error } = await supabase
      .from('workout_sessions')
      .select('*')
      .eq('user_id', userId)
      .not('completed_at', 'is', null)
      .order('completed_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('❌ Error fetching workout history:', error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error('❌ Unexpected error fetching history:', err);
    return [];
  }
};

// ============================================
// PROGRESS TRACKING
// ============================================

export const fetchExerciseProgress = async (userId: string, exerciseId: string) => {
  try {
    // Get all completed sessions for this exercise
    const { data, error } = await supabase
      .from('exercise_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('exercise_id', exerciseId)
      .order('workout_date', { ascending: true });

    if (error) {
      console.error('❌ Error fetching exercise progress:', error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error('❌ Unexpected error fetching progress:', err);
    return [];
  }
};

// ============================================
// WORKOUT STREAK
// ============================================

export const updateWorkoutStreak = async (userId: string): Promise<boolean> => {
  try {
    const today = new Date().toISOString().split('T')[0];

    // Get current streak
    const { data: streakData } = await supabase
      .from('workout_streaks')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (!streakData) {
      // Create new streak record
      const { error } = await supabase.from('workout_streaks').insert({
        user_id: userId,
        current_streak: 1,
        longest_streak: 1,
        last_workout_date: today,
        total_workouts_completed: 1,
      });

      return !error;
    }

    // Update existing streak
    const lastWorkoutDate = new Date(streakData.last_workout_date);
    const todayDate = new Date(today);
    const daysDiff = Math.floor(
      (todayDate.getTime() - lastWorkoutDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    let newStreak = streakData.current_streak;
    if (daysDiff === 0) {
      // Same day, don't update streak
      return true;
    } else if (daysDiff === 1) {
      // Consecutive day
      newStreak = streakData.current_streak + 1;
    } else {
      // Streak broken
      newStreak = 1;
    }

    const { error } = await supabase
      .from('workout_streaks')
      .update({
        current_streak: newStreak,
        longest_streak: Math.max(newStreak, streakData.longest_streak),
        last_workout_date: today,
        total_workouts_completed: streakData.total_workouts_completed + 1,
      })
      .eq('user_id', userId);

    return !error;
  } catch (err) {
    console.error('❌ Error updating streak:', err);
    return false;
  }
};

export const fetchWorkoutStreak = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('workout_streaks')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error || !data) {
      return { currentStreak: 0, longestStreak: 0, totalWorkouts: 0 };
    }

    return {
      currentStreak: data.current_streak,
      longestStreak: data.longest_streak,
      totalWorkouts: data.total_workouts_completed,
    };
  } catch (err) {
    console.error('❌ Error fetching streak:', err);
    return { currentStreak: 0, longestStreak: 0, totalWorkouts: 0 };
  }
};
