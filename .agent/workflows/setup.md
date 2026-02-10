---
description: Complete setup and run MyFitRout locally
---

# 🚀 Complete MyFitRout Setup

## ✅ Already Done
- [x] Cloned from GitHub
- [x] Created `.env` file  
- [x] Opened Supabase API keys page
- [x] Opened Gemini AI Studio page

## 📝 Complete These Steps

### Step 1: Fill in API Keys (2 minutes)

**In the Supabase browser tab:**
1. Go to **Settings** → **API Keys** → **Legacy** (or navigate to `https://supabase.com/dashboard/project/zlneousinnpetohigdup/settings/api-keys/legacy`)
2. Find the **"anon public"** key
3. Copy it

**In the AI Studio browser tab:**
1. Look for the **"MyFitRout"** API key (or create a new one)
2. Copy the key

**Open the `.env` file in your editor:**
- Replace `paste_your_gemini_key_here` with your Gemini key
- Replace `paste_your_supabase_anon_key_here` with your Supabase anon key

### Step 2: Install Dependencies
// turbo
Run this command:
```bash
npm install
```

### Step 3: Start Development Server
// turbo
Run this command:
```bash
npm run dev
```

### Step 4: Open in Browser
The dev server will show you a URL like `http://localhost:5173`
Open that in your browser!

## 🎯 What You'll See

✅ MyFitRout landing page  
✅ Sign in / Sign up forms  
✅ Onboarding flow (Name, Age, Height, etc.)  
✅ Dashboard with workout recommendations  
✅ AI Coach chat (powered by Gemini)

## 🔄 Saving Changes to GitHub

After making changes:
```bash
git add .
git commit -m "Updated environment configuration"
git push origin main
```

## 🆘 If Something Goes Wrong

**Port already in use:**
```bash
npm run dev -- --port 3000
```

**Dependency issues:**
```bash
npm cache clean --force
npm install
```

**Environment variables not loading:**
- Make sure `.env` uses `VITE_` prefix
- Restart the dev server after editing `.env`

---

**Tell me when you're done with Step 1 and I'll run Steps 2-3 for you!** 🚀
