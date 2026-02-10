-- Add country column if it doesn't exist
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS country TEXT;

-- Verify it was added
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'profiles' 
  AND table_schema = 'public'
  AND column_name IN ('country', 'age', 'gender', 'activity_level', 'training_days', 'injuries');
