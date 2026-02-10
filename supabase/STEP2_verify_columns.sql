-- =============================================
-- VERIFY COLUMNS WERE ADDED
-- Execute this AFTER running STEP1_add_columns.sql
-- =============================================

SELECT column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_name = 'profiles' 
  AND table_schema = 'public'
ORDER BY ordinal_position;
