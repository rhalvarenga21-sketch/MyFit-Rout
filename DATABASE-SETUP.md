# 🗄️ Database Setup Guide

## Quick Setup (5 minutes)

### Step 1: Open Supabase SQL Editor
1. Go to: https://supabase.com/dashboard/project/zlneousinnpetohigdup
2. Click **SQL Editor** in left sidebar
3. Click **New Query**

### Step 2: Run the Schema
1. Open file: `supabase/migrations/001_initial_schema.sql`
2. Copy ALL contents
3. Paste into Supabase SQL Editor
4. Click **Run** (or press Ctrl+Enter)
5. Wait for "Success" message

### Step 3: Verify Tables Created
1. Click **Table Editor** in left sidebar
2. You should see 8 new tables:
   - ✅ user_profiles
   - ✅ workout_sessions
   - ✅ exercises_completed
   - ✅ personal_records
   - ✅ progress_measurements
   - ✅ workout_streaks
   - ✅ ai_conversations
   - ✅ custom_workouts

### Step 4: Test Authentication
1. Your app will now use real Supabase Auth
2. Try signing up with a new email
3. Check Supabase **Authentication** → **Users** to see the new user

---

## What Just Changed

### Before (Mock System)
```typescript
// Fake users, data in localStorage
localStorage.setItem('profile', ...);
```

### After (Real Database)
```typescript
// Real users, data in Supabase cloud
await supabase.from('user_profiles').insert(...);
```

---

## Database Tables Overview

### 1. **user_profiles**
Stores user account info and fitness profile
- Personal info (name, age, weight, height)
- Fitness goals and experience level
- Language preference
- Training schedule
- Subscription status

### 2. **workout_sessions**
Tracks each workout session
- Workout name and type
- Start/end timestamps
- Duration and performance stats
- Total weight lifted, sets, reps

### 3. **exercises_completed**  
Detailed log of every set performed
- Exercise name and muscle group
- Set number, reps, weight
- Rest time between sets
- Difficulty rating per set

### 4. **personal_records**
Tracks personal bests
- Max weight per exercise
- Max reps per exercise
- Max volume (weight × reps)

### 5. **progress_measurements**
Body measurements over time
- Weight, body fat %
- Circumference measurements
- Progress photos (URLs)

### 6. **workout_streaks**
Gamification tracking
- Current streak (consecutive days)
- Longest streak ever
- Total workouts completed

### 7. **ai_conversations**
AI coach chat history
- User questions
- AI responses
- Context data used

### 8. **custom_workouts**
User-created workout templates
- Custom exercise combinations
- Sets/reps schemes
- Favorite workouts

---

## Security (Row Level Security)

**All tables are protected with RLS policies:**
- ✅ Users can ONLY see their own data
- ✅ Users CANNOT see other users' data
- ✅ Automatic user ID validation
- ✅ Protection against SQL injection

**How it works:**
```sql
-- User can only SELECT their own profile
CREATE POLICY "Users can view own profile" 
ON user_profiles FOR SELECT 
USING (auth.uid() = id);
```

---

## Analytics Views

### user_workout_summary
```sql
SELECT * FROM user_workout_summary WHERE user_id = 'your-id';
```
Returns:
- Total workouts
- Total minutes exercised
- Total weight lifted all-time
- Average workout duration
- Last workout date

### exercise_progress
```sql
SELECT * FROM exercise_progress 
WHERE user_id = 'your-id' AND exercise_id = 'ch-1';
```
Returns:
- Progress over time for specific exercise
- Max weight by date
- Total volume by date

---

## Common Queries

### Get user's last 10 workouts
```sql
SELECT * FROM workout_sessions
WHERE user_id = auth.uid()
AND completed_at IS NOT NULL
ORDER BY completed_at DESC
LIMIT 10;
```

### Get workout details
```sql
SELECT * FROM exercises_completed
WHERE session_id = 'workout-session-id';
```

### Get current workout streak
```sql
SELECT current_streak, longest_streak, total_workouts_completed
FROM workout_streaks
WHERE user_id = auth.uid();
```

### Get personal records
```sql
SELECT exercise_name, record_type, value, achieved_at
FROM personal_records
WHERE user_id = auth.uid()
ORDER BY achieved_at DESC;
```

---

## Troubleshooting

### "permission denied for table"
**Problem:** RLS policies not set up correctly

**Fix:**
1. Re-run the migration SQL
2. Make sure you're logged in (auth.uid() exists)
3. Check Supabase logs for details

### "column does not exist"
**Problem:** Table schema not created

**Fix:**
1. Re-run the full migration SQL
2. Check for errors in SQL Editor
3. Verify table exists in Table Editor

### "duplicate key value"
**Problem:** Trying to insert existing record

**Fix:**
- Use UPSERT instead of INSERT
- Or check if record exists first

---

## Next Steps

After database is set up:
1. ✅ Test signup/login in your app
2. ✅ Create a test workout
3. ✅ Log some exercises
4. ✅ Check data in Supabase Table Editor
5. ✅ Verify RLS is working (can't see other users' data)

---

## Backup & Recovery

**Automatic Backups:**
- Supabase automatically backs up your database
- Daily backups for Pro plan
- Point-in-time recovery available

**Manual Backup:**
```bash
# Export all data (from Supabase dashboard)
Project Settings → Database → Connection String
Use pg_dump to export
```

---

**Database is ready! Your app now has a real production backend!** 🎉
