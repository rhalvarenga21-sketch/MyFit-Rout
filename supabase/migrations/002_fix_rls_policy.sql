-- Fix for RLS Policy Error on user_profiles
-- The issue: INSERT policy is checking auth.uid() = id, but Supabase auth users
-- need to be allowed to create their initial profile

-- Drop the existing INSERT policy
DROP POLICY IF EXISTS "Users can insert own profile" ON user_profiles;

-- Create a new INSERT policy that allows authenticated users to create their profile
CREATE POLICY "Users can insert own profile" ON user_profiles 
FOR INSERT 
WITH CHECK (auth.uid() = id);

-- Also ensure users can read their own profile during signup
-- (This might already exist, but let's make sure)
DROP POLICY IF EXISTS "Users can view own profile" ON user_profiles;
CREATE POLICY "Users can view own profile" ON user_profiles 
FOR SELECT 
USING (auth.uid() = id);
