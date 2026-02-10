-- =============================================
-- FIX PROFILES TABLE - ADD MISSING COLUMNS (CLEAN VERSION)
-- Execute this in Supabase SQL Editor
-- =============================================

-- Add missing columns to profiles table
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS age INTEGER;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS gender TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS activity_level TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS training_days JSONB DEFAULT '[]';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS split_style TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS injuries TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS custom_workouts JSONB DEFAULT '[]';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS custom_exercises JSONB DEFAULT '[]';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS trial_start_date TIMESTAMPTZ;

-- Add indexes for better performance (IF NOT EXISTS prevents errors)
CREATE INDEX IF NOT EXISTS idx_profiles_subscription ON public.profiles(subscription);
CREATE INDEX IF NOT EXISTS idx_profiles_subscription_active ON public.profiles(subscription_active);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);

-- Update existing records to have default values
UPDATE public.profiles 
SET 
    training_days = COALESCE(training_days, '[]'::jsonb),
    custom_workouts = COALESCE(custom_workouts, '[]'::jsonb),
    custom_exercises = COALESCE(custom_exercises, '[]'::jsonb)
WHERE 
    training_days IS NULL 
    OR custom_workouts IS NULL 
    OR custom_exercises IS NULL;

-- Add helpful comments
COMMENT ON COLUMN public.profiles.age IS 'User age in years';
COMMENT ON COLUMN public.profiles.gender IS 'User gender (MALE, FEMALE, OTHER)';
COMMENT ON COLUMN public.profiles.activity_level IS 'Activity level (SEDENTARY, LIGHT, MODERATE, ACTIVE, VERY_ACTIVE)';
COMMENT ON COLUMN public.profiles.training_days IS 'Array of training days (mon, tue, wed, etc)';
COMMENT ON COLUMN public.profiles.split_style IS 'Workout split style preference';
COMMENT ON COLUMN public.profiles.injuries IS 'User injuries or limitations';
COMMENT ON COLUMN public.profiles.custom_workouts IS 'User custom workout programs';
COMMENT ON COLUMN public.profiles.custom_exercises IS 'User custom exercises';
COMMENT ON COLUMN public.profiles.trial_start_date IS 'Trial period start date';

-- Verify columns were added
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'profiles' 
  AND table_schema = 'public'
ORDER BY ordinal_position;
