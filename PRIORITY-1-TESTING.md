# ✅ PRIORITY 1: Test the Database - STEPS

## 🎯 Goal: Deploy database schema and verify everything works

---

## STEP 1: Deploy Database Schema to Supabase

### Instructions:
1. **I've opened Supabase SQL Editor for you** in the browser
2. **Open this file:** `supabase/migrations/001_initial_schema.sql`
3. **Select ALL content** (Ctrl+A)
4. **Copy it** (Ctrl+C)
5. **Go to the Supabase SQL Editor browser tab**
6. **Paste** the SQL code (Ctrl+V)
7. **Click RUN** button (or press Ctrl+Enter)
8. **Wait for "Success" message** (~5 seconds)

### What to Look For:
✅ Green success message at bottom
✅ "Query executed successfully"
✅ No red error messages

### If You See Errors:
- Most common: "relation already exists" - means tables already created (safe to ignore)
- Copy the error message and tell me

---

## STEP 2: Verify Tables Were Created

### Instructions:
1. In Supabase Dashboard, click **"Table Editor"** (left sidebar)
2. You should see **8 new tables:**
   - ✅ user_profiles
   - ✅ workout_sessions
   - ✅ exercises_completed
   - ✅ personal_records
   - ✅ progress_measurements
   - ✅ workout_streaks
   - ✅ ai_conversations
   - ✅ custom_workouts

3. **Click on `user_profiles` table**
4. You should see columns: id, email, name, age, weight, height, etc.

### Success Criteria:
- All 8 tables visible in Table Editor
- Each table has correct columns
- Tables are currently empty (no rows)

---

## STEP 3: Test Signup (Create Real User)

### Instructions:
1. **Go back to your app:** http://localhost:3000
2. **You should see the login screen** (dark purple theme)
3. **Click on sign up** (or create account)
4. **Enter:**
   - Email: your-email@example.com
   - Password: TestPassword123!
5. **Click "Sign Up" or "Criar Conta"**

### What Should Happen:
- ✅ "Success" or "Check your email" message
- ✅ No errors in browser console (F12)
- ✅ Onboarding screen appears

### Troubleshooting:
**Error: "Invalid login credentials"**
- This means auth is working but you might already have an account
- Try signing in instead

**Error: "Failed to fetch"**
- Check `.env` file has correct SUPABASE_URL and SUPABASE_ANON_KEY
- Restart dev server: Ctrl+C, then `npm run dev`

**No errors but nothing happens:**
- Open browser console (F12)
- Look for red errors
- Tell me what you see

---

## STEP 4: Verify User in Supabase

### Instructions:
1. **Go to Supabase Dashboard**
2. **Click "Authentication"** (left sidebar)
3. **Click "Users"**
4. **You should see your new user:**
   - Email address you just used
   - Created timestamp (just now)
   - Status: "Confirmed" or "Unconfirmed"

### Success Criteria:
- ✅ User appears in Authentication → Users list
- ✅ Email matches what you entered
- ✅ User ID is a valid UUID

---

## STEP 5: Complete Onboarding (Create Profile)

### Instructions:
1. **In your app, fill out the onboarding form:**
   - Name: Your Name
   - Age: 25 (or your age)
   - Weight: 70 kg
   - Height: 175 cm
   - Goal: Select one (Lose, Gain, Strengthen, Health)
   - Experience Level: Beginner/Intermediate/Advanced
   - Training Days: Select days you want to workout

2. **Click "Complete" or "Finalizar"**

### What Should Happen:
- ✅ Loading spinner briefly
- ✅ Redirect to dashboard/home screen
- ✅ You see personalized content

---

## STEP 6: Verify Profile in Supabase

### Instructions:
1. **Go back to Supabase Dashboard**
2. **Click "Table Editor"** → **"user_profiles"**
3. **You should see YOUR profile:**
   - Row with your user ID
   - Name you entered
   - Age, weight, height
   - All your selections

### Success Criteria:
- ✅ 1 row in user_profiles table
- ✅ Data matches what you entered
- ✅ User ID matches auth user ID

---

## STEP 7: Test Sign Out & Sign In

### Instructions:
1. **In your app, find logout/sign out button**
2. **Click it**
3. **You should return to login screen**
4. **Sign in with same email/password**
5. **You should go back to dashboard**
6. **Your profile data should still be there**

### Success Criteria:
- ✅ Logout works
- ✅ Login works
- ✅ Profile persists (not lost on logout)
- ✅ Session restored on page refresh

---

## ✅ SUCCESS CHECKLIST

After completing all steps, you should have:

- [x] Database schema deployed to Supabase
- [x] 8 tables visible in Table Editor
- [x] Real user account created
- [x] User visible in Supabase Authentication
- [x] Profile data saved to user_profiles table
- [x] Can logout and login again
- [x] Data persists across sessions

---

## 🎉 WHEN COMPLETE, TELL ME:

**"Database tested successfully!"**

Then I'll proceed to **Priority 2: Implement Workout Tracking**

---

## 🆘 If Something Doesn't Work:

**Tell me:**
- "Schema deployed but..." (describe what happened)
- "Signup not working..." (copy error message)
- "Can't see tables..." (screenshot would help)

**I'll help you troubleshoot immediately!**

---

**Let's make this work! Start with Step 1 in the Supabase browser tab I opened for you.** 🚀
