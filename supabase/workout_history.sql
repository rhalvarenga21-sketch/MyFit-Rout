-- =============================================
-- WORKOUT HISTORY TABLE
-- Stores complete workout session data
-- =============================================

CREATE TABLE IF NOT EXISTS public.workout_history (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    workout_type TEXT NOT NULL,
    workout_name TEXT,
    exercises JSONB NOT NULL DEFAULT '[]',
    duration_minutes INTEGER,
    total_sets INTEGER,
    total_reps INTEGER,
    total_weight_kg DECIMAL(10, 2),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_workout_history_user_id ON public.workout_history(user_id);
CREATE INDEX IF NOT EXISTS idx_workout_history_created_at ON public.workout_history(created_at DESC);

-- RLS Policies
ALTER TABLE public.workout_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own workout history"
    ON public.workout_history FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own workout history"
    ON public.workout_history FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own workout history"
    ON public.workout_history FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own workout history"
    ON public.workout_history FOR DELETE
    USING (auth.uid() = user_id);
