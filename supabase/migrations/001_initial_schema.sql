-- MyFitRout Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABLE 1: User Profiles
-- ============================================
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  age INTEGER,
  gender TEXT CHECK (gender IN ('MALE', 'FEMALE', 'OTHER')),
  weight DECIMAL(5, 2), -- in kg
  height DECIMAL(5, 2), -- in cm
  activity_level TEXT CHECK (activity_level IN ('SEDENTARY', 'LIGHT', 'MODERATE', 'HEAVY', 'ATHLETE')),
  experience_level TEXT CHECK (experience_level IN ('BEGINNER', 'INTERMEDIATE', 'ADVANCED')),
  fitness_goal TEXT CHECK (fitness_goal IN ('LOSE', 'GAIN', 'STRENGTHEN', 'HEALTH')),
  language TEXT CHECK (language IN ('PT', 'EN', 'ES')) DEFAULT 'EN',
  training_days JSONB DEFAULT '[]'::JSONB, -- ["mon", "wed", "fri"]
  split_style TEXT CHECK (split_style IN ('ALTERNATING', 'BRAZIL_4', 'FULL_BODY_MIX')),
  subscription_plan TEXT CHECK (subscription_plan IN ('MONTHLY', 'QUARTERLY', 'ANNUAL', 'NONE')) DEFAULT 'NONE',
  subscription_active BOOLEAN DEFAULT false,
  trial_start_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- TABLE 2: Workout Sessions
-- ============================================
CREATE TABLE workout_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  workout_name TEXT NOT NULL,
  workout_type TEXT, -- 'PRESET' or 'CUSTOM'
  preset_workout_id TEXT, -- Reference to preset (e.g., 'p1')
  started_at TIMESTAMP NOT NULL,
  completed_at TIMESTAMP,
  duration_minutes INTEGER, -- Calculated: completed_at - started_at
  total_weight_lifted DECIMAL(10, 2), -- Sum of all sets
  total_sets INTEGER,
  total_reps INTEGER,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Index for faster user queries
CREATE INDEX idx_workout_sessions_user_id ON workout_sessions(user_id);
CREATE INDEX idx_workout_sessions_completed_at ON workout_sessions(completed_at);

-- ============================================
-- TABLE 3: Exercises Completed (Sets Detail)
-- ============================================
CREATE TABLE exercises_completed (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID NOT NULL REFERENCES workout_sessions(id) ON DELETE CASCADE,
  exercise_id TEXT NOT NULL, -- Reference to exercise (e.g., 'ch-1')
  exercise_name TEXT NOT NULL,
  muscle_group TEXT NOT NULL,
  set_number INTEGER NOT NULL,
  reps_completed INTEGER,
  weight_used DECIMAL(6, 2), -- in kg or lbs
  rest_seconds INTEGER, -- How long they rested
  difficulty_rating INTEGER CHECK (difficulty_rating >= 1 AND difficulty_rating <= 5), -- 1=too easy, 5=too hard
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Index for faster session queries
CREATE INDEX idx_exercises_completed_session_id ON exercises_completed(session_id);
CREATE INDEX idx_exercises_completed_exercise_id ON exercises_completed(exercise_id);

-- ============================================
-- TABLE 4: Personal Records (PRs)
-- ============================================
CREATE TABLE personal_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  exercise_id TEXT NOT NULL,
  exercise_name TEXT NOT NULL,
  record_type TEXT CHECK (record_type IN ('MAX_WEIGHT', 'MAX_REPS', 'MAX_VOLUME')) NOT NULL,
  value DECIMAL(10, 2) NOT NULL, -- Weight or reps or volume
  achieved_at TIMESTAMP NOT NULL,
  session_id UUID REFERENCES workout_sessions(id),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, exercise_id, record_type)
);

-- Index for faster PR queries
CREATE INDEX idx_personal_records_user_id ON personal_records(user_id);

-- ============================================
-- TABLE 5: User Progress Measurements
-- ============================================
CREATE TABLE progress_measurements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  measurement_date DATE NOT NULL,
  weight DECIMAL(5, 2), -- Body weight in kg
  body_fat_percentage DECIMAL(4, 2),
  chest_cm DECIMAL(5, 2),
  waist_cm DECIMAL(5, 2),
  hips_cm DECIMAL(5, 2),
  arm_left_cm DECIMAL(5, 2),
  arm_right_cm DECIMAL(5, 2),
  thigh_left_cm DECIMAL(5, 2),
  thigh_right_cm DECIMAL(5, 2),
  notes TEXT,
  photo_url TEXT, -- Optional progress photo
  created_at TIMESTAMP DEFAULT NOW()
);

-- Index for faster progress queries
CREATE INDEX idx_progress_measurements_user_id ON progress_measurements(user_id);
CREATE INDEX idx_progress_measurements_date ON progress_measurements(measurement_date);

-- ============================================
-- TABLE 6: Workout Streaks
-- ============================================
CREATE TABLE workout_streaks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_workout_date DATE,
  total_workouts_completed INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id)
);

-- ============================================
-- TABLE 7: AI Coach Conversations (Optional)
-- ============================================
CREATE TABLE ai_conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  user_message TEXT NOT NULL,
  ai_response TEXT NOT NULL,
  context_data JSONB, -- User profile, recent workouts, etc.
  created_at TIMESTAMP DEFAULT NOW()
);

-- Index for conversation history
CREATE INDEX idx_ai_conversations_user_id ON ai_conversations(user_id);

-- ============================================
-- TABLE 8: Custom Workouts
-- ============================================
CREATE TABLE custom_workouts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  workout_name TEXT NOT NULL,
  description TEXT,
  exercises JSONB NOT NULL, -- [{exerciseId, sets, reps, rest}, ...]
  is_favorite BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Index for user's custom workouts
CREATE INDEX idx_custom_workouts_user_id ON custom_workouts(user_id);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE workout_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercises_completed ENABLE ROW LEVEL SECURITY;
ALTER TABLE personal_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress_measurements ENABLE ROW LEVEL SECURITY;
ALTER TABLE workout_streaks ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_workouts ENABLE ROW LEVEL SECURITY;

-- User Profiles: Users can only see/edit their own profile
CREATE POLICY "Users can view own profile" ON user_profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON user_profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON user_profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Workout Sessions: Users can only see/edit their own sessions
CREATE POLICY "Users can view own sessions" ON workout_sessions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own sessions" ON workout_sessions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own sessions" ON workout_sessions FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own sessions" ON workout_sessions FOR DELETE USING (auth.uid() = user_id);

-- Exercises Completed: Users can only access via their sessions
CREATE POLICY "Users can view own exercises" ON exercises_completed FOR SELECT 
  USING (EXISTS (SELECT 1 FROM workout_sessions WHERE workout_sessions.id = exercises_completed.session_id AND workout_sessions.user_id = auth.uid()));
CREATE POLICY "Users can insert own exercises" ON exercises_completed FOR INSERT 
  WITH CHECK (EXISTS (SELECT 1 FROM workout_sessions WHERE workout_sessions.id = exercises_completed.session_id AND workout_sessions.user_id = auth.uid()));

-- Personal Records: Users can only see/edit their own PRs
CREATE POLICY "Users can view own PRs" ON personal_records FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own PRs" ON personal_records FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own PRs" ON personal_records FOR UPDATE USING (auth.uid() = user_id);

-- Progress Measurements: Users can only see/edit their own measurements
CREATE POLICY "Users can view own measurements" ON progress_measurements FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own measurements" ON progress_measurements FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Workout Streaks: Users can only see/edit their own streaks
CREATE POLICY "Users can view own streaks" ON workout_streaks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own streaks" ON workout_streaks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own streaks" ON workout_streaks FOR UPDATE USING (auth.uid() = user_id);

-- AI Conversations: Users can only see their own conversations
CREATE POLICY "Users can view own conversations" ON ai_conversations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own conversations" ON ai_conversations FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Custom Workouts: Users can only see/edit their own workouts
CREATE POLICY "Users can view own custom workouts" ON custom_workouts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own custom workouts" ON custom_workouts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own custom workouts" ON custom_workouts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own custom workouts" ON custom_workouts FOR DELETE USING (auth.uid() = user_id);

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Function to update 'updated_at' timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for user_profiles
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger for custom_workouts
CREATE TRIGGER update_custom_workouts_updated_at BEFORE UPDATE ON custom_workouts
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- VIEWS FOR ANALYTICS
-- ============================================

-- View: User workout summary
CREATE OR REPLACE VIEW user_workout_summary AS
SELECT 
  ws.user_id,
  COUNT(ws.id) as total_workouts,
  SUM(ws.duration_minutes) as total_minutes,
  SUM(ws.total_weight_lifted) as total_weight_all_time,
  AVG(ws.duration_minutes) as avg_workout_duration,
  MAX(ws.completed_at) as last_workout_date
FROM workout_sessions ws
WHERE ws.completed_at IS NOT NULL
GROUP BY ws.user_id;

-- View: Exercise performance over time
CREATE OR REPLACE VIEW exercise_progress AS
SELECT 
  ec.exercise_id,
  ec.exercise_name,
  ws.user_id,
  DATE(ws.completed_at) as workout_date,
  MAX(ec.weight_used) as max_weight,
  SUM(ec.reps_completed) as total_reps,
  SUM(ec.weight_used * ec.reps_completed) as total_volume
FROM exercises_completed ec
JOIN workout_sessions ws ON ec.session_id = ws.id
WHERE ws.completed_at IS NOT NULL
GROUP BY ec.exercise_id, ec.exercise_name, ws.user_id, DATE(ws.completed_at);

-- ============================================
-- SAMPLE DATA (Optional for testing)
-- ============================================

-- This will be populated by the app when users sign up
-- No need to insert sample data here

-- ============================================
-- COMPLETION MESSAGE
-- ============================================

-- Database schema created successfully!
-- Next steps:
-- 1. Go to Supabase Dashboard -> SQL Editor
-- 2. Copy and paste this entire file
-- 3. Click "Run" to create all tables
-- 4. Verify tables were created in "Table Editor"
