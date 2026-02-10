import { supabase } from '../lib/supabase';
import { UserProfile, UserRole, ActivityLevel, SplitStyle, Gender, SubscriptionPlan, ExperienceLevel, FitnessGoal, Language } from '../types';

/**
 * Real Supabase Database Service
 * Matches schema: 
 * - profiles (user data)
 * - workout_logs (history with JSON data)
 */

// ============================================
// USER PROFILE OPERATIONS
// ============================================

export const syncProfileToCloud = async (profile: UserProfile): Promise<boolean> => {
  try {
    console.log('☁️ Syncing COMPLETE profile to cloud...');

    const { data, error } = await supabase
      .from('profiles')
      .upsert({
        id: profile.id,
        email: profile.email,
        name: profile.name,
        age: profile.age,
        gender: profile.gender,
        weight: profile.weight,
        height: profile.height,
        goal: profile.goal,
        level: profile.level,
        activity_level: profile.activityLevel,
        language: profile.language,
        country: profile.country,
        subscription: profile.subscription,
        subscription_active: profile.subscriptionActive,
        completed_days: profile.completedDays,
        custom_schedule: profile.customSchedule,
        training_days: profile.trainingDays,
        split_style: profile.splitStyle,
        injuries: profile.injuries,
        custom_workouts: profile.customWorkouts,
        custom_exercises: profile.customExercises,
        trial_start_date: profile.trialStartDate,
        updated_at: new Date().toISOString()
      })
      .select();

    if (error) {
      console.error('❌ Error syncing profile:', error);
      return false;
    }

    console.log('✅ Profile synced successfully!');
    return true;
  } catch (err) {
    console.error('❌ Unexpected error syncing profile:', err);
    return false;
  }
};

export const fetchProfileFromCloud = async (userId: string): Promise<UserProfile | null> => {
  try {
    console.log('☁️ Fetching COMPLETE profile from cloud...');

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.log('ℹ️ No profile found or error:', error.message);
      return null;
    }

    if (!data) return null;

    // Map database fields to UserProfile type (ALL FIELDS)
    const profile: UserProfile = {
      id: data.id,
      email: data.email,
      name: data.name || 'Novo Usuário',
      role: UserRole.MEMBER,
      age: data.age || 25,
      gender: data.gender || Gender.MALE,
      weight: data.weight || 70,
      height: data.height || 175,
      activityLevel: data.activity_level || ActivityLevel.MODERATE,
      level: data.level || ExperienceLevel.BEGINNER,
      goal: data.goal || FitnessGoal.HEALTH,
      language: data.language as any || Language.PT,
      country: data.country,
      injuries: data.injuries,
      customSchedule: data.custom_schedule || {},
      trainingDays: data.training_days || [],
      splitStyle: data.split_style || SplitStyle.FULL_BODY,
      customWorkouts: data.custom_workouts || [],
      customExercises: data.custom_exercises || [],
      completedDays: data.completed_days || [],
      subscription: data.subscription || SubscriptionPlan.NONE,
      subscriptionActive: data.subscription_active || false,
      hasPass: data.subscription_active || false,
      trialStartDate: data.trial_start_date || data.created_at || new Date().toISOString(),
    };

    console.log('✅ Profile loaded successfully!');
    return profile;
  } catch (err) {
    console.error('❌ Unexpected error fetching profile:', err);
    return null;
  }
};

// ============================================
// WORKOUT SESSION OPERATIONS
// ============================================

export const completeWorkoutSession = async (sessionData: any): Promise<{ success: boolean; error?: any }> => {
  try {
    console.log('✅ Saving completed workout to Supabase...');

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
        data: sessionData // Store full details in JSONB
      });

    if (error) {
      console.error('❌ Error saving workout log:', error);
      return { success: false, error };
    }

    return { success: true };
  } catch (err) {
    console.error('❌ Unexpected error saving workout:', err);
    return { success: false, error: err };
  }
};

// ============================================
// HISTORY & STREAK (Restored)
// ============================================

export const fetchWorkoutHistory = async (userId: string, limit = 50) => {
  const { data } = await supabase
    .from('workout_logs')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);
  return data || [];
};

export const fetchWorkoutStreak = async (userId: string) => {
  // Simplest streak logic: count logs in last 7 days? 
  // For MVP, lets just count total workouts for now
  const { count } = await supabase
    .from('workout_logs')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId);

  return {
    currentStreak: count || 0, // Placeholder
    longestStreak: count || 0, // Placeholder
    totalWorkouts: count || 0
  };
};

// METRICS & LOGS
export const logCheckoutAttempt = async (userId: string, plan: string, price: string, currency: string) => {
  try {
    const { error } = await supabase.from('checkout_logs').insert({
      user_id: userId,
      plan,
      price,
      currency,
      created_at: new Date().toISOString()
    });
    if (error && import.meta.env.DEV) console.warn('Supabase Metric Error:', error.message);
  } catch (err) { /* Silent fail */ }
};
