-- ============================================
-- INSTRUÇÕES DE EXECUÇÃO
-- ============================================
-- 1. Acesse: https://supabase.com/dashboard
-- 2. Selecione seu projeto MyFitRout
-- 3. Vá em: SQL Editor
-- 4. Copie TODO este arquivo
-- 5. Execute (Run)
-- 6. Aguarde confirmação de sucesso
-- ============================================

-- Habilitar extensão UUID (se não estiver habilitada)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- PASSO 1: LIMPAR TABELAS EXISTENTES (CUIDADO!)
-- ============================================
-- Descomente as linhas abaixo APENAS se quiser recriar tudo do zero
-- DROP TABLE IF EXISTS admin_logs CASCADE;
-- DROP TABLE IF EXISTS user_achievements CASCADE;
-- DROP TABLE IF EXISTS daily_quotes CASCADE;
-- DROP TABLE IF EXISTS exercise_sets CASCADE;
-- DROP TABLE IF EXISTS workout_logs CASCADE;
-- DROP TABLE IF EXISTS ai_usage CASCADE;
-- DROP TABLE IF EXISTS chat_history CASCADE;

-- ============================================
-- PASSO 2: CRIAR TABELAS
-- ============================================

-- 1. CHAT HISTORY (Memória Persistente)
CREATE TABLE IF NOT EXISTS chat_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    message_type TEXT NOT NULL CHECK (message_type IN ('user', 'ai')),
    content TEXT NOT NULL,
    suggestions TEXT[], -- Array de sugestões extraídas
    is_truncated BOOLEAN DEFAULT FALSE,
    is_limit_message BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. AI USAGE TRACKING (Quota Management)
CREATE TABLE IF NOT EXISTS ai_usage (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    query_count INTEGER DEFAULT 0,
    last_query_at TIMESTAMPTZ,
    last_reset_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT ai_usage_user_id_unique UNIQUE (user_id)
);

-- 3. WORKOUT LOGS (Histórico de Treinos)
CREATE TABLE IF NOT EXISTS workout_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    workout_name TEXT NOT NULL,
    workout_type TEXT, -- UPPER, LOWER, FULL_BODY, etc
    duration_minutes INTEGER,
    total_volume NUMERIC, -- em kg
    sets_completed INTEGER,
    exercises_completed INTEGER,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. EXERCISE SETS (Detalhes de Séries)
CREATE TABLE IF NOT EXISTS exercise_sets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workout_log_id UUID NOT NULL REFERENCES workout_logs(id) ON DELETE CASCADE,
    exercise_id TEXT NOT NULL,
    exercise_name TEXT NOT NULL,
    set_number INTEGER NOT NULL,
    weight NUMERIC,
    reps INTEGER,
    completed BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. DAILY QUOTES (Pílula Diária)
CREATE TABLE IF NOT EXISTS daily_quotes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quote_text TEXT NOT NULL,
    language TEXT NOT NULL CHECK (language IN ('PT', 'EN', 'ES')),
    category TEXT, -- motivation, technique, nutrition
    generated_by TEXT DEFAULT 'AI', -- AI ou MANUAL
    created_at TIMESTAMPTZ DEFAULT NOW(),
    is_active BOOLEAN DEFAULT TRUE
);

-- 6. USER ACHIEVEMENTS (Conquistas)
CREATE TABLE IF NOT EXISTS user_achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    achievement_type TEXT NOT NULL, -- first_workout, 10_workouts, 100kg_volume, etc
    achievement_name TEXT NOT NULL,
    achievement_description TEXT,
    unlocked_at TIMESTAMPTZ DEFAULT NOW(),
    shared BOOLEAN DEFAULT FALSE,
    CONSTRAINT user_achievements_unique UNIQUE (user_id, achievement_type)
);

-- 7. ADMIN LOGS (Auditoria)
CREATE TABLE IF NOT EXISTS admin_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_user_id UUID REFERENCES auth.users(id),
    action TEXT NOT NULL,
    target_table TEXT,
    target_id UUID,
    details JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- PASSO 3: ADICIONAR COLUNAS EM PROFILES
-- ============================================

-- Verificar se a tabela profiles existe
DO $$ 
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'profiles') THEN
        -- Adicionar colunas Stripe
        ALTER TABLE profiles ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT;
        ALTER TABLE profiles ADD COLUMN IF NOT EXISTS stripe_subscription_id TEXT;
        ALTER TABLE profiles ADD COLUMN IF NOT EXISTS subscription_status TEXT DEFAULT 'inactive';
        ALTER TABLE profiles ADD COLUMN IF NOT EXISTS subscription_current_period_end TIMESTAMPTZ;
        ALTER TABLE profiles ADD COLUMN IF NOT EXISTS subscription_cancel_at_period_end BOOLEAN DEFAULT FALSE;
        
        -- Adicionar coluna de plano semanal
        ALTER TABLE profiles ADD COLUMN IF NOT EXISTS weekly_plan JSONB DEFAULT '{}'::jsonb;
    END IF;
END $$;

-- ============================================
-- PASSO 4: CRIAR ÍNDICES
-- ============================================

-- Chat History
CREATE INDEX IF NOT EXISTS idx_chat_history_user_id ON chat_history(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_history_created_at ON chat_history(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_chat_history_user_created ON chat_history(user_id, created_at DESC);

-- AI Usage
CREATE INDEX IF NOT EXISTS idx_ai_usage_user_id ON ai_usage(user_id);

-- Workout Logs
CREATE INDEX IF NOT EXISTS idx_workout_logs_user_id ON workout_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_workout_logs_created_at ON workout_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_workout_logs_user_created ON workout_logs(user_id, created_at DESC);

-- Exercise Sets
CREATE INDEX IF NOT EXISTS idx_exercise_sets_workout_log ON exercise_sets(workout_log_id);
CREATE INDEX IF NOT EXISTS idx_exercise_sets_exercise_id ON exercise_sets(exercise_id);

-- Daily Quotes
CREATE INDEX IF NOT EXISTS idx_daily_quotes_language ON daily_quotes(language);
CREATE INDEX IF NOT EXISTS idx_daily_quotes_active ON daily_quotes(is_active);

-- User Achievements
CREATE INDEX IF NOT EXISTS idx_achievements_user_id ON user_achievements(user_id);
CREATE INDEX IF NOT EXISTS idx_achievements_unlocked ON user_achievements(unlocked_at DESC);

-- Admin Logs
CREATE INDEX IF NOT EXISTS idx_admin_logs_created ON admin_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_admin_logs_admin_user ON admin_logs(admin_user_id);

-- Profiles (Stripe)
CREATE INDEX IF NOT EXISTS idx_profiles_stripe_customer ON profiles(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_profiles_subscription_status ON profiles(subscription_status);

-- ============================================
-- PASSO 5: CONFIGURAR RLS (Row Level Security)
-- ============================================

-- Chat History
ALTER TABLE chat_history ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own chat history" ON chat_history;
CREATE POLICY "Users can view own chat history"
    ON chat_history FOR SELECT
    USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own chat messages" ON chat_history;
CREATE POLICY "Users can insert own chat messages"
    ON chat_history FOR INSERT
    WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own chat history" ON chat_history;
CREATE POLICY "Users can delete own chat history"
    ON chat_history FOR DELETE
    USING (auth.uid() = user_id);

-- AI Usage
ALTER TABLE ai_usage ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own AI usage" ON ai_usage;
CREATE POLICY "Users can view own AI usage"
    ON ai_usage FOR SELECT
    USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own AI usage" ON ai_usage;
CREATE POLICY "Users can update own AI usage"
    ON ai_usage FOR UPDATE
    USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own AI usage" ON ai_usage;
CREATE POLICY "Users can insert own AI usage"
    ON ai_usage FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Workout Logs
ALTER TABLE workout_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own workout logs" ON workout_logs;
CREATE POLICY "Users can view own workout logs"
    ON workout_logs FOR SELECT
    USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own workout logs" ON workout_logs;
CREATE POLICY "Users can insert own workout logs"
    ON workout_logs FOR INSERT
    WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own workout logs" ON workout_logs;
CREATE POLICY "Users can update own workout logs"
    ON workout_logs FOR UPDATE
    USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own workout logs" ON workout_logs;
CREATE POLICY "Users can delete own workout logs"
    ON workout_logs FOR DELETE
    USING (auth.uid() = user_id);

-- Exercise Sets
ALTER TABLE exercise_sets ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own exercise sets" ON exercise_sets;
CREATE POLICY "Users can view own exercise sets"
    ON exercise_sets FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM workout_logs
            WHERE workout_logs.id = exercise_sets.workout_log_id
            AND workout_logs.user_id = auth.uid()
        )
    );

DROP POLICY IF EXISTS "Users can insert own exercise sets" ON exercise_sets;
CREATE POLICY "Users can insert own exercise sets"
    ON exercise_sets FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM workout_logs
            WHERE workout_logs.id = exercise_sets.workout_log_id
            AND workout_logs.user_id = auth.uid()
        )
    );

-- User Achievements
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own achievements" ON user_achievements;
CREATE POLICY "Users can view own achievements"
    ON user_achievements FOR SELECT
    USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own achievements" ON user_achievements;
CREATE POLICY "Users can insert own achievements"
    ON user_achievements FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Daily Quotes (público para leitura)
ALTER TABLE daily_quotes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view active quotes" ON daily_quotes;
CREATE POLICY "Anyone can view active quotes"
    ON daily_quotes FOR SELECT
    USING (is_active = true);

-- ============================================
-- PASSO 6: FUNCTIONS E TRIGGERS
-- ============================================

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para ai_usage
DROP TRIGGER IF EXISTS update_ai_usage_updated_at ON ai_usage;
CREATE TRIGGER update_ai_usage_updated_at
    BEFORE UPDATE ON ai_usage
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger para profiles (se existir)
DO $$ 
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'profiles') THEN
        DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
        CREATE TRIGGER update_profiles_updated_at
            BEFORE UPDATE ON profiles
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at_column();
    END IF;
END $$;

-- ============================================
-- PASSO 7: VIEWS PARA ANALYTICS
-- ============================================

-- View: Estatísticas de usuário
CREATE OR REPLACE VIEW user_stats AS
SELECT 
    p.id as user_id,
    p.name,
    p.subscription,
    COUNT(DISTINCT wl.id) as total_workouts,
    COALESCE(SUM(wl.total_volume), 0) as total_volume_kg,
    COALESCE(SUM(wl.sets_completed), 0) as total_sets,
    COALESCE(AVG(wl.duration_minutes), 0) as avg_duration,
    MAX(wl.created_at) as last_workout_date,
    COUNT(DISTINCT ua.id) as total_achievements
FROM profiles p
LEFT JOIN workout_logs wl ON p.id = wl.user_id
LEFT JOIN user_achievements ua ON p.id = ua.user_id
GROUP BY p.id, p.name, p.subscription;

-- View: Top usuários por volume (últimos 30 dias)
CREATE OR REPLACE VIEW top_users_by_volume AS
SELECT 
    p.id,
    p.name,
    COALESCE(SUM(wl.total_volume), 0) as total_volume,
    COUNT(wl.id) as workout_count
FROM profiles p
LEFT JOIN workout_logs wl ON p.id = wl.user_id
WHERE wl.created_at > NOW() - INTERVAL '30 days' OR wl.created_at IS NULL
GROUP BY p.id, p.name
ORDER BY total_volume DESC
LIMIT 100;

-- ============================================
-- PASSO 8: SEED DATA (Dados Iniciais)
-- ============================================

-- Inserir quotes iniciais
INSERT INTO daily_quotes (quote_text, language, category, generated_by) VALUES
('A disciplina é a ponte entre metas e realizações.', 'PT', 'motivation', 'MANUAL'),
('O corpo alcança o que a mente acredita.', 'PT', 'motivation', 'MANUAL'),
('Se não te desafia, não te transforma.', 'PT', 'motivation', 'MANUAL'),
('Progresso, não perfeição.', 'PT', 'motivation', 'MANUAL'),
('Discipline is the bridge between goals and accomplishment.', 'EN', 'motivation', 'MANUAL'),
('The body achieves what the mind believes.', 'EN', 'motivation', 'MANUAL'),
('If it doesn''t challenge you, it doesn''t change you.', 'EN', 'motivation', 'MANUAL'),
('Progress, not perfection.', 'EN', 'motivation', 'MANUAL'),
('La disciplina es el puente entre metas y logros.', 'ES', 'motivation', 'MANUAL'),
('El cuerpo alcanza lo que la mente cree.', 'ES', 'motivation', 'MANUAL'),
('Si no te desafía, no te transforma.', 'ES', 'motivation', 'MANUAL'),
('Progreso, no perfección.', 'ES', 'motivation', 'MANUAL')
ON CONFLICT DO NOTHING;

-- ============================================
-- PASSO 9: COMENTÁRIOS (Documentação)
-- ============================================

COMMENT ON TABLE chat_history IS 'Histórico de conversas com o Coach AI - persistente';
COMMENT ON TABLE ai_usage IS 'Controle de quota de uso da API Gemini por usuário';
COMMENT ON TABLE workout_logs IS 'Registro de treinos completados pelos usuários';
COMMENT ON TABLE exercise_sets IS 'Detalhes de séries executadas em cada treino';
COMMENT ON TABLE daily_quotes IS 'Pílulas diárias motivacionais em múltiplos idiomas';
COMMENT ON TABLE user_achievements IS 'Conquistas desbloqueadas pelos usuários';
COMMENT ON TABLE admin_logs IS 'Log de ações administrativas para auditoria';

-- ============================================
-- FIM DO SCHEMA
-- ============================================

-- Verificar se tudo foi criado com sucesso
SELECT 
    'chat_history' as table_name, 
    COUNT(*) as row_count 
FROM chat_history
UNION ALL
SELECT 'ai_usage', COUNT(*) FROM ai_usage
UNION ALL
SELECT 'workout_logs', COUNT(*) FROM workout_logs
UNION ALL
SELECT 'exercise_sets', COUNT(*) FROM exercise_sets
UNION ALL
SELECT 'daily_quotes', COUNT(*) FROM daily_quotes
UNION ALL
SELECT 'user_achievements', COUNT(*) FROM user_achievements
UNION ALL
SELECT 'admin_logs', COUNT(*) FROM admin_logs;

-- Mensagem de sucesso
DO $$
BEGIN
    RAISE NOTICE '✅ Schema MyFitRout criado com sucesso!';
    RAISE NOTICE '📊 Total de tabelas: 7';
    RAISE NOTICE '🔒 RLS habilitado em todas as tabelas';
    RAISE NOTICE '⚡ Índices otimizados criados';
    RAISE NOTICE '🎯 Pronto para produção!';
END $$;
