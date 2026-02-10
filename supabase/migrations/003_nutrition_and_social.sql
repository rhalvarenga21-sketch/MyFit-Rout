-- Migration 003: Nutrition and Social Features

-- 1. NUTRITION TRACKER TABLES
CREATE TABLE IF NOT EXISTS nutrition_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES user_profiles(id) NOT NULL,
  logged_date DATE DEFAULT CURRENT_DATE,
  meal_type TEXT CHECK (meal_type IN ('BREAKFAST', 'LUNCH', 'DINNER', 'SNACK', 'PRE_WORKOUT', 'POST_WORKOUT')),
  food_name TEXT NOT NULL,
  calories INTEGER NOT NULL,
  protein INTEGER DEFAULT 0,
  carbs INTEGER DEFAULT 0,
  fats INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS for Nutrition
ALTER TABLE nutrition_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own nutrition logs" ON nutrition_logs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own nutrition logs" ON nutrition_logs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own nutrition logs" ON nutrition_logs
  FOR DELETE USING (auth.uid() = user_id);


-- 2. SOCIAL & CHALLENGES TABLES
CREATE TABLE IF NOT EXISTS challenges (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  goal_type TEXT CHECK (goal_type IN ('WORKOUT_COUNT', 'TOTAL_VOLUME', 'STREAK', 'WEIGHT_LOSS')),
  goal_target INTEGER NOT NULL,
  duration_days INTEGER DEFAULT 30,
  icon TEXT DEFAULT 'Trophy',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_challenges (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES user_profiles(id) NOT NULL,
  challenge_id UUID REFERENCES challenges(id) NOT NULL,
  current_progress INTEGER DEFAULT 0,
  is_completed BOOLEAN DEFAULT FALSE,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS for Challenges
ALTER TABLE challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_challenges ENABLE ROW LEVEL SECURITY;

-- Everyone can read challenges
CREATE POLICY "Everyone can view challenges" ON challenges
  FOR SELECT USING (true);

-- Users can manage their own challenge progress
CREATE POLICY "Users can view own challenge progress" ON user_challenges
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can join challenges" ON user_challenges
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own challenge progress" ON user_challenges
  FOR UPDATE USING (auth.uid() = user_id);

-- 3. LEADERBOARD VIEW
CREATE OR REPLACE VIEW leaderboard_weekly AS
SELECT 
  up.id as user_id,
  up.name,
  up.level,
  COUNT(ws.id) as workouts_completed,
  COALESCE(SUM(ws.total_weight_lifted), 0) as volume_lifted
FROM user_profiles up
LEFT JOIN workout_sessions ws ON up.id = ws.user_id
WHERE ws.completed_at > (NOW() - INTERVAL '7 days')
GROUP BY up.id, up.name, up.level
ORDER BY workouts_completed DESC, volume_lifted DESC;

-- Insert some default challenges
INSERT INTO challenges (title, description, goal_type, goal_target, duration_days, icon) VALUES
('Iniciante Focado', 'Complete 12 treinos em 30 dias', 'WORKOUT_COUNT', 12, 30, 'Flame'),
('Mestre do Volume', 'Levante 10.000kg no total', 'TOTAL_VOLUME', 10000, 30, 'Dumbbell'),
('Consistência de Ferro', 'Mantenha um streak de 7 dias', 'STREAK', 7, 30, 'Calendar');
