# 🚀 MyFitRout Quick Setup Guide

## Current Status  
✅ Repository cloned from GitHub  
✅ Project structure verified  
✅ `.gitignore` updated to protect API keys  
✅ `.env.example` template created  

## 🔑 Step 1: Get Your API Keys (5 minutes)

### Supabase Keys
I've opened this page for you: https://supabase.com/dashboard/project/zlneousinnpetohigdup/settings/api

**Copy these values:**
1. **Project URL**: `https://zlneousinnpetohigdup.supabase.co` (already filled in template)
2. **anon public** key - Look for the section that says "Project API keys"
3. Scroll down and reveal the **service_role** key (for admin operations)

### Gemini AI Key  
I've opened this page for you: https://aistudio.google.com/app/api-keys

**Get your API key:**
- If you have one, copy it
- If not, click "Create API Key"

## ⚙️ Step 2: Create Your .env File

Run this command in terminal:
```powershell
Copy-Item .env.example .env
```

Then open `.env` and paste your keys:
```env
VITE_GEMINI_API_KEY=paste_your_gemini_key_here
VITE_SUPABASE_URL=https://zlneousinnpetohigdup.supabase.co
VITE_SUPABASE_ANON_KEY=paste_your_supabase_anon_key_here
```

## 📦 Step 3: Install Dependencies

```powershell
npm install
```

## 🎯 Step 4: Start Development Server

```powershell
npm run dev
```

Your app will open at: `http://localhost:5173` (or similar)

## 🔄 Step 5: Real Supabase Integration (Optional but Recommended)

Currently the app uses localStorage (mock). To connect real Supabase:

1. Install Supabase client:
```powershell
npm install @supabase/supabase-js
```

2. I'll update the database service to use real Supabase

## 📱 Your Service Links Reference

- **Supabase Dashboard**: https://supabase.com/dashboard/project/zlneousinnpetohigdup
- **Gemini API Keys**: https://aistudio.google.com/app/api-keys
- **AI Studio App**: https://aistudio.google.com/apps/drive/1d-kBoWY_Zq15DyY2_17k8EJkfOBrk-CA
- **GitHub Repo**: https://github.com/rhalvarenga21-sketch/MyFit-Rout

## 📋 Daily Workflow (Single Station)

### Make Changes
```powershell
# See what changed
git status

# Add changes
git add .

# Commit
git commit -m "Description of changes"

# Push to GitHub
git push origin main
```

### Pull Latest
```powershell
git pull origin main
```

## ✅ Verification Steps

After setup, verify everything works:
- [ ] `.env` file created with real keys
- [ ] Dependencies installed (`npm install` completed)
- [ ] Dev server starts (`npm run dev` works)
- [ ] App opens in browser
- [ ] Can create account / sign in
- [ ] Can fill out profile
- [ ] Can see workout recommendations
- [ ] AI Coach responds to questions

## 🆘 Troubleshooting

### "npm install" fails
```powershell
# Clear cache and retry
npm cache clean --force
npm install
```

### API Keys not working
- Make sure `.env` has `VITE_` prefix (required for Vite)
- Restart dev server after changing `.env`
- Check browser console for specific error messages

### Port already in use
```powershell
# Use different port
npm run dev -- --port 3000
```

## 🎯 Next Steps

Once running locally, we can:
1. ✅ Integrate real Supabase database
2. ✅ Deploy to production (Vercel/Netlify)
3. ✅ Set up authentication properly
4. ✅ Configure workout tracking
5. ✅ Test AI coaching features

---

**Tell me when you're ready and I'll help you with each step!** 🚀
