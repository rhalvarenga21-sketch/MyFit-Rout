import React, { useState, useMemo, useEffect } from 'react';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { trackEvent } from './utils/analytics';
import {
  Dumbbell, User, Flame, Trophy, Clock,
  Play, ShieldCheck, ChevronLeft, Send, X, Share2, Settings as SettingsIcon,
  LayoutList, Check, HeartPulse, Droplets, Utensils, Eye, EyeOff,
  Scale, Target, Timer, BookOpen, Layers, AlertCircle, Save, Edit, Edit3, Calendar, Lock, LogOut, CreditCard, Sparkles, CloudSync, RefreshCw, Mail, MessageCircle, Key, UserCircle, TrendingUp, Copy, Activity, Globe
} from 'lucide-react';
import {
  Language, UserProfile, DayPlan, UserRole, PresetWorkout, Gender, ActivityLevel, FitnessGoal, ExperienceLevel, CustomWorkout, SplitStyle, SubscriptionPlan, Exercise
} from './types';
import { translations } from './translations';
import { PRESET_WORKOUTS } from './data/workouts';
import { EXERCISE_LIBRARY } from './data/exercises';
import { getAIFeedback } from './services/gemini';
import { WorkoutSummary } from './components/WorkoutSummary';
import { ActiveWorkout } from './components/ActiveWorkout';
import { CompletedWorkoutSummary } from './components/CompletedWorkoutSummary';
import { ProgressDashboard } from './components/ProgressDashboard';
import { calculateDailyCalorieTarget, calculateWaterGoal, calculateBMR, calculateTDEE } from './utils/metrics';
import { buildScheduleFromDays } from './utils/schedule';
import { safeStartTodayRoutine } from './utils/safeStart';
import { WorkoutCatalog } from './screens/WorkoutCatalog';
import { WorkoutLibrary } from './components/WorkoutLibrary';
import { ExerciseLibrary } from './screens/ExerciseLibrary';
import { NutritionTracker } from './components/NutritionTracker';
import { SocialLeaderboard } from './components/SocialLeaderboard';
import { ExerciseVideoPlayer } from './components/ExerciseVideoPlayer';
import { PaymentModal } from './components/PaymentModal';
import { SocialShareModal } from './components/SocialShareModal';
import { Settings } from './components/Settings';
import { ApiTester } from './components/ApiTester';
import { CoachChat } from './components/CoachChat';
import { ActivityHistory } from './components/ActivityHistory';
import { authService as mockAuth } from './services/auth';
import { syncProfileToCloud, fetchProfileFromCloud, completeWorkoutSession, logCheckoutAttempt } from './services/database';

import { StorageService } from './services/storage';
import { NotificationService } from './services/notifications'; // Added import
import { getFoodById } from './data/foods';
import { useAutoSave } from './hooks/useAutoSave';
import { SyncStatus } from './components/SyncStatus';
import { DebugConsole } from './components/DebugConsole';

const DAYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const;

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<{ id: string, email: string } | null>(() => {
    const saved = localStorage.getItem('current_user_token');
    return saved ? JSON.parse(saved) : null;
  });

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [lang, setLang] = useState<Language>(Language.PT);
  const [view, setView] = useState<'home' | 'catalog' | 'vital' | 'me' | 'workout_summary' | 'workout_active' | 'workout_completed' | 'exercises' | 'schedule_manager' | 'membership' | 'progress' | 'nutrition' | 'social' | 'exercise_library' | 'settings' | 'api_tester' | 'coach'>('home');
  const [selectedWorkout, setSelectedWorkout] = useState<PresetWorkout | CustomWorkout | null>(null);
  // 🛡️ AutoSave System
  const { saveWorkout, isSyncing: isBackupSyncing, pendingCount } = useAutoSave(currentUser?.id, profile || undefined);


  // Notifications Init
  useEffect(() => {
    NotificationService.requestPermission().then(granted => {
      if (granted) {
        NotificationService.scheduleReminders(lang);
      }
    });
  }, [lang]);
  {/* Pending sync disabled for debugging */ }

  const [completedSession, setCompletedSession] = useState<any>(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [smartStartModal, setSmartStartModal] = useState<{ preset: PresetWorkout } | null>(null);
  const [vitalQuery, setVitalQuery] = useState('');
  const [vitalResp, setVitalResp] = useState('');
  const [vitalLoading, setVitalLoading] = useState(false);
  const [assigningToDay, setAssigningToDay] = useState<string | null>(null);
  const [completeSessionData, setCompleteSessionData] = useState<any>(null);
  const [pendingPlan, setPendingPlan] = useState<{ name: string, price: string, type: SubscriptionPlan } | null>(null);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isSyncing, setIsSyncing] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [waterModalOpen, setWaterModalOpen] = useState(false);
  const [dailyQuoteOpen, setDailyQuoteOpen] = useState(false);

  // Schedule Editing State
  const [editingDay, setEditingDay] = useState<string | null>(null);
  const [tempFocusTags, setTempFocusTags] = useState<string[]>([]);
  const [currency, setCurrency] = useState<'BRL' | 'USD' | 'EUR'>('BRL');

  const PRICES = {
    BRL: { essential: "R$ 12,90", pro: "R$ 24,90", essentialAnnual: "R$ 99,90", proAnnual: "R$ 199,90", test: "R$ 7,90", fullPro: "R$ 49,90" },
    USD: { essential: "$ 12.90", pro: "$ 24.90", essentialAnnual: "$ 99.90", proAnnual: "$ 199.90", test: "$ 7.90", fullPro: "$ 49.90" },
    EUR: { essential: "€ 12.90", pro: "€ 24.90", essentialAnnual: "€ 99.90", proAnnual: "€ 199.90", test: "€ 7.90", fullPro: "€ 49.90" }
  };

  // Currency autodetect logic (Geo-Pricing)
  useEffect(() => {
    // 0. Manual Override for Testing (?currency=USD)
    const params = new URLSearchParams(window.location.search);
    const debugCurrency = params.get('currency');
    if (debugCurrency && ['BRL', 'USD', 'EUR'].includes(debugCurrency.toUpperCase())) {
      setCurrency(debugCurrency.toUpperCase() as any);
      return;
    }

    // 1. Initial guess based on Timezone (Instant)
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz.startsWith('America/Sao_Paulo') || tz.includes('Brazil')) {
      setCurrency('BRL');
    } else if (tz.startsWith('Europe/')) {
      setCurrency('EUR');
    } else {
      setCurrency('USD');
    }

    // 2. Precise check based on IP (Async)
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        // 1. Currency
        if (data.country_code === 'BR') setCurrency('BRL');
        else if (data.continent_code === 'EU' || data.currency === 'EUR') setCurrency('EUR');
        else setCurrency('USD');

        // 2. Language Auto-Detect (Only for new users/no profile)
        // Allows testing "Translations adapting to location"
        if (!localStorage.getItem('myfitrout_profile')) {
          if (['BR', 'PT', 'AO', 'MZ'].includes(data.country_code)) {
            setLang(Language.PT);
          } else if (['ES', 'MX', 'AR', 'CO', 'CL', 'PE'].includes(data.country_code)) {
            setLang(Language.ES);
          } else {
            setLang(Language.EN); // Default Global
          }
        }
      })
      .catch(err => console.log('Geo-pricing fallback used'));
  }, []); // Run only once on mount

  const t = translations[lang] || translations[Language.PT];

  /* New State for Custom Workout Flow */
  const [customWorkoutExercises, setCustomWorkoutExercises] = useState<Exercise[] | undefined>(undefined);

  // Trial Logic (48h) - Moved to top to avoid Hook Errors
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000); // Create "tick" every minute
    return () => clearInterval(timer);
  }, []);

  const trialRemaining = useMemo(() => {
    if (!profile || profile.subscriptionActive) return null;
    const start = new Date(profile.trialStartDate || new Date());
    if (isNaN(start.getTime())) return null; // Safety check
    const elapsedMs = now.getTime() - start.getTime();
    const totalMs = 48 * 60 * 60 * 1000;
    const leftMs = totalMs - elapsedMs;

    if (leftMs <= 0) return { expired: true, h: 0, m: 0 };

    return {
      expired: false,
      h: Math.floor(leftMs / (1000 * 60 * 60)),
      m: Math.floor((leftMs % (1000 * 60 * 60)) / (1000 * 60))
    };
  }, [profile, now]);

  const isTrialExpired = trialRemaining?.expired || false;

  // Force Paywall if Expired
  useEffect(() => {
    if (isTrialExpired && view !== 'membership') {
      setView('membership');
    }
  }, [isTrialExpired, view]);

  // Sync profile when user changes or app loads
  useEffect(() => {
    if (currentUser) {
      // 1. Try to load from localStorage first (Instant UI)
      const localProfile = StorageService.getProfile();
      if (localProfile) {
        if (localProfile && localProfile.id === currentUser.id) {
          console.log('📦 Loaded profile from local storage');
          setProfile(localProfile);
          setLang(localProfile.language || Language.PT);
        }
      }

      // 2. Fetch from cloud (Async sync)
      setIsSyncing(true);
      fetchProfileFromCloud(currentUser.id).then(cloudProfile => {
        if (cloudProfile) {
          console.log('☁️ Synced updated profile from cloud');
          setProfile(cloudProfile);
          setLang(cloudProfile.language);
          StorageService.saveProfile(cloudProfile);
        }
        setIsSyncing(false);
      });
    } else {
      setProfile(null);
    }
  }, [currentUser]);

  const saveProfile = async (newP: UserProfile) => {
    // 1. Save to state
    setProfile(newP);

    // 2. Save to local storage (Instant persistence)
    StorageService.saveProfile(newP);

    // 3. Sync to cloud (Background)
    setIsSyncing(true);
    await syncProfileToCloud(newP);
    setIsSyncing(false);
  };

  const handleAuthSuccess = (user: { id: string, email: string }) => {
    localStorage.setItem('current_user_token', JSON.stringify(user));
    setCurrentUser(user);
  };

  const handleLogout = () => {
    mockAuth.signOut();
    setCurrentUser(null);
    setProfile(null);
  };

  const handleStartRoutine = () => {
    if (!profile) return;
    const result = safeStartTodayRoutine(profile);
    if (result.isRestDay) {
      setSmartStartModal({ preset: result.preset });
    } else {
      setSelectedWorkout(result.preset);
      setView('workout_summary');
    }
  };

  // Daily Tracking State (Source of Truth: StorageService)
  const [hydration, setHydration] = useState(0);
  const [nutritionSummary, setNutritionSummary] = useState({ calories: 0 });
  const [refreshTrigger, setRefreshTrigger] = useState(0); // Hack to force refresh

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const water = StorageService.getWater(today);
    const logs = StorageService.getLogs(today);
    const customFoods = StorageService.getCustomFoods();

    // Calculate total calories
    const totalCals = logs.reduce((acc, log) => {
      const food = getFoodById(log.foodId) || customFoods.find(f => f.id === log.foodId);
      if (!food) return acc;
      return acc + (food.calories * (log.weight / 100));
    }, 0);

    setHydration(water);
    setNutritionSummary({ calories: Math.round(totalCals) });
  }, [view, refreshTrigger, profile]); // Refresh when view changes (e.g. back from Nutrition)

  const addWater = (amount: number) => {
    const today = new Date().toISOString().split('T')[0];
    const newData = hydration + amount;
    setHydration(newData);
    StorageService.saveWater(today, newData);
  };

  // Daily Quote Logic
  const dailyQuote = useMemo(() => {
    const list = (translations[lang] as any).dailyQuote.list || ["Focus on progress."];
    const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
    return list[dayOfYear % list.length];
  }, [lang]);

  const metrics = useMemo(() => {
    if (!profile) return { target: 0, bmr: 0, tdee: 0, labelKey: 'HEALTH', waterTarget: 0, currentWater: 0, currentCalories: 0 };
    const calTarget = calculateDailyCalorieTarget(profile);
    return {
      target: calTarget.target,
      bmr: Math.round(calculateBMR(profile)),
      tdee: calculateTDEE(profile),
      labelKey: calTarget.labelKey as keyof typeof FitnessGoal,
      waterTarget: calculateWaterGoal(profile.weight),
      currentWater: hydration,
      currentCalories: nutritionSummary.calories
    };
  }, [profile, hydration, nutritionSummary]);

  const todayWorkoutTitle = useMemo(() => {
    if (!profile) return "";
    const dayNames = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    const todayKey = dayNames[new Date().getDay()];
    if (!profile.customSchedule) return t.plan.rest;
    const plan = profile.customSchedule[todayKey];
    if (!plan || plan.type === 'REST') return t.plan.rest;
    const workout = PRESET_WORKOUTS.find(p => p.id === plan.presetWorkoutId);
    return workout ? workout.title[lang] : "Workout";
  }, [profile, lang, t]);

  if (!currentUser) return <Login lang={lang} setLang={setLang} onAuth={handleAuthSuccess} />;
  if (isSyncing && !profile) return <SyncLoader lang={lang} />;
  // Force onboarding ONLY if profile doesn't exist (first time user)
  if (!profile) return <Onboarding lang={lang} user={currentUser} setLang={setLang} onComplete={saveProfile} existingProfile={profile} />;

  // Smart Mini-Onboarding: Check for incomplete fields
  const missingFields = [];
  if (!profile.name || profile.name === 'Novo Usuário') missingFields.push('name');
  if (!profile.goal) missingFields.push('goal');
  if (!profile.level) missingFields.push('level');
  if (!profile.country) missingFields.push('country');

  if (missingFields.length > 0) {
    return <MiniOnboarding lang={lang} profile={profile} missingFields={missingFields} onComplete={saveProfile} />;
  }



  const isFullPage = ['coach', 'workout_active', 'workout_completed'].includes(view);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 font-sans pb-24 selection:bg-indigo-500/30">
      {!isFullPage && (
        <header className="px-6 py-5 bg-slate-800 border-b border-slate-700/50 flex justify-between items-center sticky top-0 z-40">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('home')}>
            <img src="/logo-text.png" alt="MyFitRout" className="h-6 w-auto" />

          </div>
          <div className="flex gap-2 items-center">
            <SyncStatus isSyncing={isBackupSyncing} pendingCount={pendingCount} />
            <button onClick={() => {
              const nextLang = lang === Language.PT ? Language.EN : lang === Language.EN ? Language.ES : Language.PT;
              const newProfile = { ...profile, language: nextLang };
              setLang(nextLang);
              saveProfile(newProfile as UserProfile);
            }} className="bg-slate-800 p-2 rounded-xl border border-slate-700 hover:bg-slate-700 transition-colors text-xs font-black w-10 h-10 flex items-center justify-center">
              {lang === Language.PT ? 'PT' : lang === Language.EN ? 'EN' : 'ES'}
            </button>

          </div>
        </header>
      )}



      <main className={isFullPage ? "" : "max-w-md mx-auto p-5 pb-24"}>
        {/* Trial Banner */}
        {trialRemaining && !trialRemaining.expired && (
          <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-indigo-600 text-white px-5 py-2 rounded-full shadow-xl shadow-indigo-500/30 text-xs font-bold animate-pulse whitespace-nowrap border border-indigo-400 flex items-center gap-2">
            <span className="text-indigo-200">🔥 {lang === Language.PT ? 'Teste Grátis: ' : 'Free Trial: '}</span>
            <span className="text-white text-sm font-black tracking-widest font-mono">
              {String(trialRemaining.h).padStart(2, '0')}h {String(trialRemaining.m).padStart(2, '0')}m
            </span>
            <span className="text-indigo-200">{lang === Language.PT ? 'restantes' : 'left'}</span>
          </div>
        )}
        {view === 'home' && (
          <div className="space-y-6 animate-in fade-in">
            <section className="bg-gradient-to-br from-indigo-600 to-indigo-800 p-8 rounded-[40px] text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 rotate-12"><Trophy size={120} /></div>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">{t.home.welcome}, {profile.name.split(' ')[0]}</p>
              <h2 className="text-3xl font-black mb-6">{t.home.focusPerformance}</h2>
              <div className="bg-white/10 p-5 rounded-3xl backdrop-blur-sm flex justify-between items-center border border-white/5">
                <div>
                  <p className="text-[10px] uppercase font-black opacity-50">{t.home.consistency}</p>
                  <p className="text-2xl font-black mb-1">{profile.completedDays.length} {t.home.days}</p>
                  <p className="text-[9px] font-black uppercase text-indigo-200 tracking-widest bg-white/10 inline-block px-2 py-0.5 rounded border border-white/10">
                    {profile.completedDays.filter(d => d.startsWith(new Date().getFullYear().toString())).length} {t.home.in} {new Date().getFullYear()}
                  </p>
                </div>
                <button onClick={() => {
                  const today = new Date().toISOString().split('T')[0];
                  if (!profile.completedDays.includes(today)) saveProfile({ ...profile, completedDays: [...profile.completedDays, today] });
                }} className="bg-white text-indigo-700 px-5 py-3 rounded-2xl font-black text-xs uppercase shadow-lg active:scale-95 transition-all">
                  {profile.completedDays.includes(new Date().toISOString().split('T')[0]) ? <Check /> : t.home.checkIn}
                </button>
              </div>
            </section>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setWaterModalOpen(true)}
                className="text-left bg-slate-800 p-0 rounded-[35px] overflow-hidden border border-slate-700/50 hover:border-blue-400 transition-all"
              >
                <MetricBox icon={Droplets} label={t.home.water} value={`${metrics.currentWater}/${metrics.waterTarget}ml`} color="text-blue-400" />
              </button >

              <button
                onClick={() => setView('nutrition')}
                className="text-left bg-slate-800 p-0 rounded-[35px] overflow-hidden border border-slate-700/50 hover:border-orange-400 transition-all"
              >
                <MetricBox icon={Utensils} label={t.home.nutrition} value={`${metrics.currentCalories}/${metrics.target}kcal`} color="text-orange-400" />
              </button>
            </div >

            <section className="bg-slate-800 p-6 rounded-[35px] border border-slate-700/50 shadow-xl">


              <div className="flex justify-between items-center mb-6">
                <h3 className="font-black text-sm uppercase tracking-widest text-slate-400 flex items-center gap-2"><Clock size={16} /> {t.home.today}</h3>
                <span className="text-[10px] font-black text-indigo-400 uppercase bg-indigo-500/10 px-2 py-1 rounded-md max-w-[150px] truncate">{todayWorkoutTitle}</span>
              </div>

              {(() => {
                const dayNames = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
                const todayKey = dayNames[new Date().getDay()];
                const plan = profile.customSchedule[todayKey];
                const isRest = !plan || plan.type === 'REST';
                const tags = plan?.focusTags || (plan?.presetWorkoutId ? PRESET_WORKOUTS.find(p => p.id === plan.presetWorkoutId)?.tags : []);

                return (
                  <button onClick={() => isRest ? setView('catalog') : handleStartRoutine()} className={`w-full p-6 rounded-3xl flex justify-between items-center shadow-lg transition-all group ${isRest ? 'bg-slate-700/50 hover:bg-slate-700' : 'bg-indigo-600 hover:bg-indigo-500'}`}>
                    <div>
                      <span className={`font-black uppercase tracking-tight text-lg block ${isRest ? 'opacity-50' : 'text-white'}`}>{isRest ? t.home.restDay : t.home.startWorkout}</span>
                      {!isRest && tags && tags.length > 0 && (
                        <div className="flex gap-1 mt-1">
                          {tags.slice(0, 3).map((t: string) => (
                            <span key={t} className="text-[8px] font-black uppercase bg-black/20 px-2 py-0.5 rounded text-white/80">{t}</span>
                          ))}
                        </div>
                      )}
                    </div>
                    <Play size={24} fill="white" className={`transition-transform ${isRest ? 'opacity-20' : 'group-hover:scale-110'}`} />
                  </button>
                );
              })()}
            </section>

            <button onClick={() => setView('schedule_manager')} className="w-full bg-slate-800 p-6 rounded-[35px] border border-slate-700/50 flex items-center justify-between group hover:border-indigo-500 transition-all">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-500/10 rounded-2xl text-indigo-400"><Calendar size={24} /></div>
                <div className="text-left">
                  <p className="font-black uppercase text-xs tracking-widest">{t.plan.title}</p>
                  <div className="flex gap-1 mt-1">
                    {['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].map((d, i) => {
                      const dayPlan = profile.customSchedule[d];
                      const isWorkout = dayPlan && dayPlan.type === 'WORKOUT';
                      return (
                        <div key={i} className={`w-3 h-3 rounded-full transition-all ${isWorkout ? 'bg-indigo-500' : 'bg-slate-700'}`} title={d.toUpperCase()} />
                      );
                    })}
                  </div>
                </div>
              </div>
              <Edit3 size={18} className="opacity-20 group-hover:opacity-100 transition-opacity" />
            </button>
          </div >
        )}

        {
          view === 'membership' && (
            <div className="space-y-6 animate-in slide-in-from-right-6">
              <button onClick={() => setView('me')} className="p-3 bg-slate-800 rounded-2xl border border-slate-700 flex items-center gap-2 font-black text-xs opacity-60"><ChevronLeft size={16} /> {t.nutrition.back}</button>

              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-black italic uppercase tracking-tighter">{t.membership.title}</h2>
                <div className="bg-slate-800 rounded-lg px-2 py-1">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{currency} Zone</span>
                </div>
              </div>

              <div className="bg-slate-800 p-8 rounded-[40px] border border-indigo-500/30 space-y-8">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-[10px] font-black uppercase opacity-40">{t.membership.status}</p>
                    <p className={`text-xl font-black ${profile.subscriptionActive ? 'text-green-400' : 'text-rose-400'}`}>
                      {profile.subscriptionActive ? t.membership.active : t.membership.inactive}
                    </p>
                  </div>
                  <div className="p-3 bg-indigo-500/10 rounded-2xl text-indigo-400"><Sparkles size={24} /></div>
                </div>

                <div className="space-y-8">
                  {/* 1. PLANO ESSENCIAL */}
                  <div onClick={() => setPendingPlan({ name: `${t.membership.plans.essential} (${t.membership.monthly})`, price: PRICES[currency].essential, type: SubscriptionPlan.ESSENTIAL })}
                    className={`p-6 rounded-3xl border-2 cursor-pointer transition-all ${profile.subscription === SubscriptionPlan.ESSENTIAL ? 'border-indigo-500 bg-indigo-500/10' : 'border-slate-700 bg-slate-900/50 hover:bg-slate-800'}`}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="text-[10px] font-black uppercase text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded mb-2 inline-block">{t.membership.plans.founder}</span>
                        <h3 className="text-xl font-black italic uppercase text-white">{t.membership.plans.essential}</h3>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-black text-white">{PRICES[currency].essential}</span>
                        <span className="text-[10px] font-bold text-slate-500 block">/{t.membership.monthly}</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-400 font-bold mb-4">{t.membership.plans.essentialDesc}</p>
                    <ul className="space-y-1">
                      <li className="text-[10px] font-bold text-slate-300 flex items-center gap-2"><Check size={12} className="text-green-400" /> 1 {t.profile.goals.LOSE} (Active)</li>
                      <li className="text-[10px] font-bold text-slate-300 flex items-center gap-2"><Check size={12} className="text-green-400" /> {t.membership.benefits}</li>
                    </ul>
                  </div>

                  {/* 2. PLANO PRO */}
                  <div onClick={() => setPendingPlan({ name: `${t.membership.plans.pro} (${t.membership.monthly})`, price: PRICES[currency].pro, type: SubscriptionPlan.PRO_MONTHLY })}
                    className={`relative p-6 rounded-3xl border-2 border-indigo-500 bg-gradient-to-br from-indigo-900/80 to-slate-900 cursor-pointer hover:scale-[1.02] transition-all shadow-xl shadow-indigo-500/10`}>
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-black uppercase px-3 py-1 rounded-full shadow-lg">
                      {t.membership.plans.moreComplete}
                    </div>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-2xl font-black italic uppercase text-white flex items-center gap-2">{t.membership.plans.pro} <Sparkles size={16} className="text-amber-400" /></h3>
                        <span className="text-[10px] font-black uppercase text-amber-400">{t.membership.plans.earlyAdopter}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold text-slate-500 line-through block">{PRICES[currency].fullPro}</span>
                        <span className="text-3xl font-black text-white">{PRICES[currency].pro}</span>
                        <span className="text-[10px] font-bold text-slate-500 block">/{t.membership.monthly} (50% OFF)</span>
                      </div>
                    </div>
                    <p className="text-xs text-indigo-200 font-bold mb-4">{t.membership.metrics}</p>
                    <ul className="space-y-1 mb-4">
                      <li className="text-[10px] font-bold text-white flex items-center gap-2"><Check size={12} className="text-amber-400" /> {t.aiAssistant} Pro</li>
                      <li className="text-[10px] font-bold text-white flex items-center gap-2"><Check size={12} className="text-amber-400" /> {t.plan.weeklyRoutine} +</li>
                    </ul>

                    {/* 3. TEST DRIVE */}
                    <div onClick={(e) => { e.stopPropagation(); setPendingPlan({ name: 'Test Drive (7 Days)', price: PRICES[currency].test, type: SubscriptionPlan.TEST_PRO }); }}
                      className="mt-4 bg-white/10 p-3 rounded-xl text-center border border-white/10 hover:bg-white/20 transition-all">
                      <p className="text-[10px] font-black uppercase text-white mb-1">{t.membership.plans.stillDoubt}</p>
                      <p className="text-xs font-black text-indigo-300">{t.membership.plans.testPro} - {PRICES[currency].test}</p>
                    </div>
                  </div>

                  {/* ANUAL SECTION */}
                  <div className="pt-4 border-t border-slate-700/50">
                    <h3 className="text-xs font-black uppercase text-slate-500 mb-4 tracking-widest text-center">{t.membership.plans.annualHeader}</h3>

                    <div className="grid grid-cols-2 gap-3">
                      {/* 4. ANUAL BASIC */}
                      <div onClick={() => setPendingPlan({ name: `${t.membership.plans.essential} (${t.membership.annual})`, price: PRICES[currency].essentialAnnual, type: SubscriptionPlan.ESSENTIAL_ANNUAL })}
                        className="bg-slate-900 p-4 rounded-2xl border border-slate-700 hover:border-indigo-500 transition-all cursor-pointer text-center">
                        <p className="text-[9px] font-black uppercase text-green-400 mb-1">{t.membership.plans.save33}</p>
                        <p className="text-sm font-black text-slate-300 mb-1">{t.membership.plans.essentialAnnual}</p>
                        <p className="text-lg font-black text-white">{PRICES[currency].essentialAnnual}</p>
                        <p className="text-[8px] font-bold text-slate-500">{t.membership.plans.oneTime}</p>
                      </div>

                      {/* 5. ANUAL PRO */}
                      <div onClick={() => setPendingPlan({ name: `${t.membership.plans.pro} (${t.membership.annual})`, price: PRICES[currency].proAnnual, type: SubscriptionPlan.PRO_ANNUAL })}
                        className="bg-gradient-to-b from-indigo-900 to-slate-900 p-4 rounded-2xl border border-indigo-500/50 hover:border-amber-400 transition-all cursor-pointer text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-amber-500 text-black text-[8px] font-black px-2 py-0.5 rounded-bl-lg">{t.membership.plans.bestTag}</div>
                        <p className="text-[9px] font-black uppercase text-amber-400 mb-1">{t.membership.plans.bestValue}</p>
                        <p className="text-sm font-black text-white mb-1">{t.membership.plans.proAnnual}</p>
                        <p className="text-lg font-black text-white">{PRICES[currency].proAnnual}</p>
                        <p className="text-[8px] font-bold text-indigo-300">{t.membership.plans.oneTime}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {pendingPlan && (
                  <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in" onClick={() => setPendingPlan(null)}>
                    <div className="bg-slate-800 p-8 rounded-[40px] border border-indigo-500/50 text-center max-w-sm w-full shadow-2xl space-y-6" onClick={e => e.stopPropagation()}>
                      <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto text-white shadow-lg shadow-indigo-500/20">
                        <CreditCard size={32} />
                      </div>
                      <div>
                        <h3 className="text-xl font-black uppercase text-white mb-2">Finalizar Assinatura</h3>
                        <p className="text-sm text-slate-400 font-medium">
                          {currency === 'BRL'
                            ? <span>Checkout seguro via <strong>LastLink</strong> (Pix/Cartão)</span>
                            : <span>Secure checkout via <strong>Revolut</strong> (Global)</span>
                          }
                        </p>
                      </div>
                      <div className="bg-slate-900 p-4 rounded-xl border border-slate-700">
                        <p className="text-[10px] font-black uppercase text-slate-500">Valor do Plano</p>
                        <p className="text-3xl font-black text-white">{pendingPlan.price}</p>
                      </div>
                      <div className="space-y-3">
                        <button
                          onClick={() => {
                            // ===========================================
                            // 🇧🇷 LASTLINK (BRASIL)
                            // ===========================================
                            if (currency === 'BRL') {
                              const LASTLINK_URLS: Record<string, string> = {
                                [SubscriptionPlan.ESSENTIAL]: "https://lastlink.com/p/CD85C185A/checkout-payment/",
                                [SubscriptionPlan.ESSENTIAL_ANNUAL]: "https://lastlink.com/p/C00235787/checkout-payment/",
                                [SubscriptionPlan.PRO_MONTHLY]: "https://lastlink.com/p/C3A4ECD3D/checkout-payment/",
                                [SubscriptionPlan.PRO_ANNUAL]: "https://lastlink.com/p/C35F0D49B/checkout-payment/",
                                [SubscriptionPlan.TEST_PRO]: "https://lastlink.com/p/CD7968A27/checkout-payment/"
                              };
                              const targetUrl = LASTLINK_URLS[pendingPlan.type] || "https://lastlink.com/p/C3A4ECD3D/checkout-payment/";
                              window.open(targetUrl, '_blank');
                            }
                            // ===========================================
                            // 🌍 REVOLUT (GLOBAL)
                            // ===========================================
                            else {
                              // ===========================================
                              // 🌍 REVOLUT (GLOBAL/EUR) Logic
                              // ===========================================
                              const REVOLUT_MAP: any = {
                                EUR: {
                                  [SubscriptionPlan.ESSENTIAL]: "https://checkout.revolut.com/pay/e4aad20a-068b-49e9-adb6-bb48e09da1de",
                                  [SubscriptionPlan.PRO_MONTHLY]: "https://checkout.revolut.com/pay/44bfee78-ac75-4c1b-a3e0-2639be29ef4f",
                                  [SubscriptionPlan.ESSENTIAL_ANNUAL]: "https://checkout.revolut.com/pay/f5514a23-333a-403d-8899-a0458433d466",
                                  [SubscriptionPlan.PRO_ANNUAL]: "https://checkout.revolut.com/pay/3c4dd027-3d72-4c3c-bc75-e264d8f9360f",
                                  [SubscriptionPlan.TEST_PRO]: "https://checkout.revolut.com/pay/be2ef2b1-2774-47ed-ac96-316e8f524238",
                                },
                                USD: {
                                  [SubscriptionPlan.ESSENTIAL]: "https://checkout.revolut.com/pay/c08ffc90-35fe-4701-8029-7a947c0ae1bb",
                                  [SubscriptionPlan.PRO_MONTHLY]: "https://checkout.revolut.com/pay/120ecee5-fb51-4ccf-b8f4-de6ca59df310",
                                  [SubscriptionPlan.ESSENTIAL_ANNUAL]: "https://checkout.revolut.com/pay/4c7f4d85-413f-455a-a753-7c7be9535103",
                                  [SubscriptionPlan.PRO_ANNUAL]: "https://checkout.revolut.com/pay/71190496-e02a-4ebf-bacc-f22bde2e0da1",
                                  [SubscriptionPlan.TEST_PRO]: "https://checkout.revolut.com/pay/371c21b0-020e-4bbf-bc5a-4b2e1cd179fc"
                                }
                              };

                              const currencyMap = REVOLUT_MAP[currency] || REVOLUT_MAP['USD'];
                              const targetUrl = currencyMap[pendingPlan.type];

                              if (targetUrl) {
                                trackEvent('Begin Checkout', { currency, plan: pendingPlan.type, price: pendingPlan.price });
                                logCheckoutAttempt(profile.id, pendingPlan.type, pendingPlan.price, currency);
                                window.open(targetUrl, '_blank');
                              } else {
                                console.error('Link still missing despite update:', currency, pendingPlan.type);
                                alert("Erro temporário: Link indisponível.");
                              }
                            }

                            // Optimistically activate (demo feedback)
                            saveProfile({ ...profile, subscription: pendingPlan.type, subscriptionActive: true });
                            setPendingPlan(null);
                          }}
                          className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-black uppercase py-4 rounded-xl shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
                        >
                          Ir para Pagamento
                        </button>
                        <button onClick={() => setPendingPlan(null)} className="text-xs font-bold text-slate-500 hover:text-white uppercase py-2">Cancelar</button>
                      </div>
                    </div>
                  </div>
                )}

                {profile.subscriptionActive && (
                  <button onClick={() => saveProfile({ ...profile, subscriptionActive: false, subscription: SubscriptionPlan.NONE })} className="w-full p-4 rounded-2xl border border-rose-500/30 text-rose-500 font-black text-xs uppercase hover:bg-rose-500/10 transition-all">
                    {t.membership.cancel}
                  </button>
                )}
              </div>
            </div>
          )
        }

        {
          view === 'me' && (
            <div className="space-y-6 animate-in slide-in-from-right-6">
              <div className="flex justify-between items-center px-1">
                <h2 className="text-2xl font-black uppercase italic tracking-tighter">{t.profile.title}</h2>
                <div className="flex gap-2">
                  <button onClick={() => setView('settings')} className="p-3 bg-slate-800 rounded-2xl border border-slate-700 text-slate-400 hover:text-white transition-colors">
                    <SettingsIcon size={16} />
                  </button>
                  <button onClick={() => setShareModalOpen(true)} className="p-3 bg-indigo-500/10 rounded-2xl text-indigo-400 transition-all hover:bg-indigo-500 hover:text-white">
                    <Share2 size={16} />
                  </button>
                  <button onClick={() => setView('membership')} className="p-3 bg-indigo-500/10 rounded-2xl text-indigo-400 transition-all">
                    <CreditCard size={16} />
                  </button>
                  <button onClick={() => setView('exercise_library')} className="p-3 bg-indigo-500/10 rounded-2xl text-indigo-400 transition-all">
                    <BookOpen size={16} />
                  </button>
                  <button onClick={() => setIsEditingProfile(!isEditingProfile)} className="p-3 bg-slate-800 rounded-2xl border border-slate-700 text-slate-400">
                    {isEditingProfile ? <X size={16} /> : <Edit3 size={16} />}
                  </button>
                </div>
              </div>

              {!isEditingProfile && (
                <div className="space-y-6">
                  <div className="bg-slate-800 p-10 rounded-[45px] text-center border border-slate-700/50 shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity"><User size={80} /></div>
                    <h3 className="text-3xl font-black mb-1 italic uppercase tracking-tighter">{profile.name}</h3>
                    <div className="flex gap-2 justify-center">
                      <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full">{t.profile.levels[profile.level]}</span>
                      {profile.subscriptionActive && <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full flex items-center gap-1"><Sparkles size={10} /> PRO</span>}
                    </div>
                  </div>

                  <ActivityHistory completedDays={profile.completedDays} lang={lang} />

                  <div className="grid grid-cols-2 gap-4">
                    <MetricCard icon={Scale} label={t.profile.weight} value={`${profile.weight}kg`} />
                    <MetricCard icon={Target} label={t.metrics.label} value={`${metrics.target}kcal`} hint={t.metrics.tdeeHint} />
                  </div>

                  <button onClick={() => setView('progress')} className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 p-6 rounded-[35px] flex items-center justify-between group hover:scale-[1.02] transition-all shadow-xl">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white/10 rounded-2xl">
                        <TrendingUp size={24} />
                      </div>
                      <div className="text-left">
                        <p className="font-black uppercase text-sm tracking-widest">{t.profile.progressBtn}</p>
                        <p className="text-[10px] opacity-60 uppercase">{t.profile.statsSubtitle}</p>
                      </div>
                    </div>
                    <Trophy size={20} className="opacity-60 group-hover:opacity-100 transition-opacity" />
                  </button>

                  <div className="bg-slate-800 p-6 rounded-[35px] border border-slate-700/50 flex flex-col gap-4">
                    <button onClick={handleLogout} className="w-full p-5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-500 font-black flex items-center justify-center gap-3 uppercase text-xs">
                      <LogOut size={16} /> {t.profile.logout}
                    </button>
                  </div>
                </div>
              )}

              {isEditingProfile && (
                <div className="bg-slate-800 p-8 rounded-[40px] border border-indigo-500/30 space-y-6 shadow-2xl">
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-1">{t.profile.inputs.name}</label>
                      <input
                        defaultValue={profile.name}
                        onBlur={(e) => saveProfile({ ...profile, name: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 p-4 rounded-2xl outline-none focus:border-indigo-500 font-bold"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-1">{t.profile.weight}</label>
                        <input
                          type="number"
                          defaultValue={profile.weight}
                          onBlur={(e) => saveProfile({ ...profile, weight: parseFloat(e.target.value) })}
                          className="w-full bg-slate-900 border border-slate-700 p-4 rounded-2xl outline-none focus:border-indigo-500 font-bold"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-1">{t.profile.height}</label>
                        <input
                          type="number"
                          defaultValue={profile.height}
                          onBlur={(e) => saveProfile({ ...profile, height: parseFloat(e.target.value) })}
                          className="w-full bg-slate-900 border border-slate-700 p-4 rounded-2xl outline-none focus:border-indigo-500 font-bold"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-1">{t.profile.inputs.goal}</label>
                      <select
                        value={profile.goal}
                        onChange={(e) => saveProfile({ ...profile, goal: e.target.value as FitnessGoal })}
                        className="w-full bg-slate-900 border border-slate-700 p-4 rounded-2xl outline-none focus:border-indigo-500 font-bold appearance-none uppercase text-xs"
                      >
                        {Object.values(FitnessGoal).map(g => (
                          <option key={g} value={g}>{t.profile.goals[g]}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-1">{t.profile.inputs.activity}</label>
                      <select
                        value={profile.activityLevel}
                        onChange={(e) => saveProfile({ ...profile, activityLevel: e.target.value as ActivityLevel })}
                        className="w-full bg-slate-900 border border-slate-700 p-4 rounded-2xl outline-none focus:border-indigo-500 font-bold appearance-none uppercase text-xs"
                      >
                        {Object.values(ActivityLevel).map(act => (
                          <option key={act} value={act}>{t.onboarding.activityLevels[act]}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <button onClick={() => setIsEditingProfile(false)} className="w-full bg-indigo-600 py-6 rounded-3xl font-black uppercase tracking-widest shadow-xl flex items-center justify-center gap-2">
                    <Save size={20} /> {t.profile.save}
                  </button>
                </div>
              )}
            </div>
          )
        }

        {
          view === 'settings' && (
            <Settings
              lang={lang}
              setLang={setLang}
              theme={theme}
              setTheme={setTheme}
              onBack={() => setView('me')}
              onApiTester={() => setView('api_tester')}
              userRole={profile?.role}
            />
          )
        }

        {
          view === 'api_tester' && (
            <ApiTester
              lang={lang}
              onBack={() => setView('settings')}
            />
          )
        }

        {
          view === 'coach' && (
            <CoachChat
              profile={profile}
              lang={lang}
              onBack={() => setView('home')}
              onUpgrade={() => setView('membership')}
              onShare={() => setShareModalOpen(true)}
              onAddExercise={(exerciseName) => {
                alert(`Solicitação para adicionar exercício: ${exerciseName}`);
              }}
            />
          )
        }



        {
          view === 'progress' && (
            <div className="space-y-4">
              <button onClick={() => setView('me')} className="p-3 bg-slate-800 rounded-2xl border border-slate-700 flex items-center gap-2 font-black text-xs opacity-60 mx-6">
                <ChevronLeft size={16} /> {t.nutrition.back}
              </button>
              <ProgressDashboard profile={profile} lang={lang} />
            </div>
          )
        }

        {
          view === 'exercise_library' && (
            <ExerciseLibrary lang={lang} onBack={() => setView('me')} />
          )
        }

        {
          view === 'schedule_manager' && (
            <div className="space-y-6 animate-in slide-in-from-right">
              <div className="flex items-center gap-4 px-2">
                <button onClick={() => setView('home')} className="p-3 bg-slate-800 rounded-2xl border border-slate-700/50 hover:bg-slate-700 text-white transition-all"><ChevronLeft size={16} /></button>
                <div className="flex-1">
                  <h2 className="text-2xl font-black italic uppercase tracking-tighter">{t.plan.title}</h2>
                  <p className="text-xs opacity-50 font-bold uppercase tracking-widest">{t.plan.weeklyRoutine}</p>
                </div>
                <button onClick={() => setView('catalog')} className="p-3 bg-indigo-500/10 rounded-2xl border border-indigo-500/30 text-indigo-400 hover:bg-indigo-500 hover:text-white transition-all">
                  <BookOpen size={20} />
                </button>
              </div>

              <div className="space-y-4 pb-24">
                {['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].map((day) => {
                  const plan = profile.customSchedule[day] || { type: 'REST' };
                  const isRest = plan.type === 'REST';
                  const preset = plan.presetWorkoutId ? PRESET_WORKOUTS.find(p => p.id === plan.presetWorkoutId) : null;

                  return (
                    <div key={day} className={`p-5 rounded-3xl border border-slate-700/30 flex flex-col gap-3 transition-all ${isRest ? 'bg-slate-800/30' : 'bg-slate-800 shadow-lg'}`}>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-2xl text-sm font-black uppercase flex items-center justify-center shadow-lg ${isRest ? 'bg-slate-700 text-slate-500' : 'bg-indigo-600 text-white'}`}>
                            {t[day].substring(0, 3)}
                          </div>
                          <div>
                            <p className={`font-black uppercase text-sm ${isRest ? 'opacity-50' : 'text-white'}`}>{isRest ? t.plan.rest : preset?.title[lang] || t.categories.CUSTOM}</p>

                            {!isRest && (
                              <div className="flex flex-wrap gap-1 mt-1">
                                {plan.focusTags ? plan.focusTags.map((tag: string) => (
                                  <span key={tag} className="text-[9px] font-bold uppercase tracking-widest bg-slate-700/50 text-slate-400 px-2 py-1 rounded border border-slate-600/50">{tag}</span>
                                )) : (
                                  preset?.tags?.map((tag: string) => (
                                    <span key={tag} className="text-[9px] font-bold uppercase tracking-widest bg-slate-700/50 text-slate-400 px-2 py-1 rounded border border-slate-600/50">{tag}</span>
                                  ))
                                )}
                              </div>
                            )}
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            setEditingDay(day);
                            setTempFocusTags(plan.focusTags || preset?.tags || []);
                          }}
                          className="p-3 bg-slate-700/50 rounded-xl text-slate-400 hover:text-white transition-colors"
                        >
                          <Edit3 size={16} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Granular Focus Modal */}
              {editingDay && (
                <div className="fixed inset-0 z-[60] bg-slate-900/90 backdrop-blur-md flex items-end justify-center p-6 animate-in fade-in">
                  <div className="bg-slate-800 w-full max-w-md p-8 rounded-[40px] border border-slate-700 space-y-6 animate-in slide-in-from-bottom h-[80vh] overflow-y-auto">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-2xl font-black uppercase italic tracking-tighter">{t.plan.dayFocus}</h3>
                        <p className="text-xs uppercase font-bold opacity-40 tracking-widest">{t.plan.whatToTrain}</p>
                      </div>
                      <button onClick={() => setEditingDay(null)} className="p-3 bg-slate-700/50 rounded-full text-slate-400"><X size={20} /></button>
                    </div>

                    <div className="space-y-6">
                      {/* Upper Body */}
                      <div>
                        <p className="text-[10px] font-black uppercase text-indigo-400 tracking-widest mb-3">{t.bodyParts.upper}</p>
                        <div className="flex flex-wrap gap-2">
                          {['CHEST', 'BACK', 'SHOULDERS', 'BICEPS', 'TRICEPS', 'CORE'].map(tag => (
                            <button
                              key={tag}
                              onClick={() => {
                                if (tempFocusTags.includes(tag)) setTempFocusTags(prev => prev.filter(t => t !== tag));
                                else setTempFocusTags(prev => [...prev, tag]);
                              }}
                              className={`px-4 py-3 rounded-xl border-2 text-xs font-black uppercase transition-all ${tempFocusTags.includes(tag) ? 'bg-indigo-500 border-indigo-500 text-white' : 'border-slate-700 text-slate-500'}`}
                            >
                              {t.bodyParts[tag]}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Lower Body */}
                      <div>
                        <p className="text-[10px] font-black uppercase text-indigo-400 tracking-widest mb-3">{t.bodyParts.lower}</p>
                        <div className="flex flex-wrap gap-2">
                          {['LEGS', 'GLUTES', 'CALVES'].map(tag => (
                            <button
                              key={tag}
                              onClick={() => {
                                if (tempFocusTags.includes(tag)) setTempFocusTags(prev => prev.filter(t => t !== tag));
                                else setTempFocusTags(prev => [...prev, tag]);
                              }}
                              className={`px-4 py-3 rounded-xl border-2 text-xs font-black uppercase transition-all ${tempFocusTags.includes(tag) ? 'bg-indigo-500 border-indigo-500 text-white' : 'border-slate-700 text-slate-500'}`}
                            >
                              {t.bodyParts[tag]}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Cardio & Rest */}
                      <div>
                        <p className="text-[10px] font-black uppercase text-indigo-400 tracking-widest mb-3">{t.bodyParts.other}</p>
                        <div className="flex flex-wrap gap-2">
                          {['CARDIO'].map(tag => (
                            <button
                              key={tag}
                              onClick={() => {
                                if (tempFocusTags.includes(tag)) setTempFocusTags(prev => prev.filter(t => t !== tag));
                                else setTempFocusTags(prev => [...prev, tag]);
                              }}
                              className={`px-4 py-3 rounded-xl border-2 text-xs font-black uppercase transition-all ${tempFocusTags.includes(tag) ? 'bg-indigo-500 border-indigo-500 text-white' : 'border-slate-700 text-slate-500'}`}
                            >
                              {t.bodyParts[tag]}
                            </button>
                          ))}
                          <button
                            onClick={() => setTempFocusTags([])}
                            className={`px-4 py-3 rounded-xl border-2 text-xs font-black uppercase transition-all ${tempFocusTags.length === 0 ? 'bg-slate-600 border-slate-600 text-white' : 'border-slate-700 text-slate-500'}`}
                          >
                            {t.plan.rest}
                          </button>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        if (!editingDay) return;

                        // Logic to find best matching preset workout
                        let bestMatchId: string | undefined;
                        let maxIntersect = 0;

                        if (tempFocusTags.length > 0) {
                          PRESET_WORKOUTS.forEach(w => {
                            const intersect = w.tags.filter(t => tempFocusTags.includes(t as any)).length;
                            if (intersect > maxIntersect) {
                              maxIntersect = intersect;
                              bestMatchId = w.id;
                            }
                          });
                        }

                        const newSchedule = { ...profile.customSchedule };
                        if (tempFocusTags.length === 0) {
                          newSchedule[editingDay] = { type: 'REST' };
                        } else {
                          newSchedule[editingDay] = {
                            type: 'WORKOUT',
                            workoutSource: bestMatchId ? 'PRESET' : 'CUSTOM',
                            presetWorkoutId: bestMatchId,
                            focusTags: tempFocusTags as any
                          };
                        }

                        saveProfile({ ...profile, customSchedule: newSchedule });
                        setEditingDay(null);
                      }}
                      className="w-full bg-indigo-600 py-5 rounded-2xl text-white font-black uppercase tracking-widest shadow-xl text-sm"
                    >
                      {t.profile.save}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        }

        {
          view === 'catalog' && (
            <div className="space-y-4">
              <button onClick={() => setView(assigningToDay ? 'schedule_manager' : 'coach')} className="p-3 bg-slate-800 rounded-2xl border border-slate-700 flex items-center gap-2 font-black text-xs opacity-60"><ChevronLeft size={16} /> {t.nutrition.back}</button>
              <WorkoutCatalog
                lang={lang}
                profile={profile}
                onSelect={(w) => { setSelectedWorkout(w); setView('workout_summary'); }}
                onAssign={(w, day) => {
                  const updated = { ...profile, customSchedule: { ...profile.customSchedule, [day]: { type: 'WORKOUT', workoutSource: 'PRESET', presetWorkoutId: w.id } as DayPlan } };
                  saveProfile(updated);
                  if (assigningToDay) {
                    setAssigningToDay(null);
                    setView('schedule_manager');
                  }
                }}
              />
            </div>
          )
        }
        {/* Coach Widget Removed */}
        {
          view === 'nutrition' && profile && (
            <div className="space-y-4">
              <button onClick={() => setView('home')} className="p-3 bg-slate-800 rounded-2xl border border-slate-700 flex items-center gap-2 font-black text-xs opacity-60 mx-6">
                <ChevronLeft size={16} /> {t.nutrition.back}
              </button>
              <NutritionTracker profile={profile} lang={lang} />
            </div>
          )
        }

        {
          view === 'social' && (
            <div className="space-y-4">
              <button onClick={() => setView('coach')} className="p-3 bg-slate-800 rounded-2xl border border-slate-700 flex items-center gap-2 font-black text-xs opacity-60 mx-6">
                <ChevronLeft size={16} /> {t.nutrition.back}
              </button>
              <SocialLeaderboard />
            </div>
          )
        }

        {
          view === 'workout_summary' && selectedWorkout && (
            <div className="space-y-4 animate-in slide-in-from-right-10">
              <button onClick={() => setView('catalog')} className="p-3 bg-slate-800 rounded-2xl border border-slate-700 flex items-center gap-2 font-black text-xs opacity-60"><ChevronLeft size={16} /> {t.nutrition.back}</button>
              < WorkoutSummary
                workout={selectedWorkout as PresetWorkout}
                lang={lang}
                profile={profile!}
                onUpdateProfile={saveProfile}
                onStart={(customList) => {
                  setCustomWorkoutExercises(customList);
                  setView('workout_active');
                }}
              />
            </div>
          )
        }

        {
          view === 'workout_active' && selectedWorkout && currentUser && profile && (
            <ActiveWorkout
              workout={selectedWorkout as PresetWorkout}
              lang={lang}
              userId={profile.id}
              profile={profile}
              onUpdateProfile={saveProfile}
              customExercises={customWorkoutExercises}
              onComplete={async (sessionData) => {
                // 🛡️ ROBUST AUTO-SAVE
                // No alerts, just action.
                await saveWorkout(sessionData, async () => {
                  // Success callback (optional, mostly for UI updates)
                  console.log('Workout saved via AutoSave hook');
                });

                // Update Profile Days (Local optimisitic update + Cloud sync via saveProfile)
                const today = new Date().toISOString().split('T')[0];
                if (profile) {
                  const updatedDays = profile.completedDays.includes(today)
                    ? profile.completedDays
                    : [...profile.completedDays, today];

                  await saveProfile({ ...profile, completedDays: updatedDays });
                }

                // Navigate immediately
                setCompletedSession(sessionData);
                setView('workout_completed');
              }}
              onCancel={() => setView('home')}
            />
          )
        }

        {
          view === 'workout_completed' && completedSession && (
            <CompletedWorkoutSummary
              sessionData={completedSession}
              lang={lang}
              onFinish={() => {
                setCompletedSession(null);
                setSelectedWorkout(null);
                setView('home');
              }}
            />
          )
        }
      </main >

      <DebugConsole />
      <Analytics />
      <SpeedInsights />

      {
        shareModalOpen && profile && (
          <SocialShareModal
            profile={profile}
            lang={lang}
            onClose={() => setShareModalOpen(false)}
          />
        )
      }

      {
        !isFullPage && (
          <nav className="fixed bottom-0 left-0 right-0 bg-slate-900/40 backdrop-blur-xl border-t border-white/5 px-8 py-5 flex justify-between items-center max-w-md mx-auto z-40 rounded-t-[45px]">
            <NavBtn icon={Flame} label={t.tabs.home} active={view === 'home'} onClick={() => setView('home')} />
            <NavBtn icon={Calendar} label={t.tabs.plan} active={view === 'schedule_manager' || view === 'catalog' || view === 'exercises'} onClick={() => setView('schedule_manager')} />
            <NavBtn icon={MessageCircle} label={t.tabs.coach} active={view === 'coach'} onClick={() => setView('coach')} />
            <NavBtn icon={User} label={t.tabs.profile} active={view === 'me' || view === 'membership' || view === 'progress' || view === 'nutrition' || view === 'social'} onClick={() => setView('me')} />
          </nav>
        )
      }
      {
        waterModalOpen && (
          <div className="fixed inset-0 z-[60] bg-slate-900/90 backdrop-blur-md flex items-end justify-center p-6 animate-in fade-in">
            <div className="bg-slate-800 w-full max-w-md p-8 rounded-[40px] border border-slate-700 space-y-6 animate-in slide-in-from-bottom">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-500/20 p-3 rounded-2xl text-blue-400"><Droplets size={24} /></div>
                  <div>
                    <h3 className="text-xl font-black uppercase italic tracking-tighter">{t.water.title}</h3>
                    <p className="text-[10px] font-black uppercase opacity-40">{t.water.goal.replace('2450', metrics.waterTarget.toString())}</p>
                  </div>
                </div>
                <button onClick={() => setWaterModalOpen(false)} className="p-2 bg-slate-700/50 rounded-full text-slate-400"><X size={20} /></button>
              </div>

              <div className="flex justify-center py-4">
                <div className="flex items-end gap-1 relative">
                  <input
                    type="number"
                    value={hydration}
                    onChange={(e) => {
                      const val = parseInt(e.target.value) || 0;
                      setHydration(val);
                      StorageService.saveWater(new Date().toISOString().split('T')[0], val);
                    }}
                    className="text-5xl font-black text-blue-400 tracking-tighter bg-transparent text-center outline-none w-[180px] border-b-2 border-transparent focus:border-blue-500/30 transition-all placeholder:text-blue-400/20"
                  />
                  <span className="text-sm font-black opacity-30 uppercase mb-2">ml</span>
                  <Edit3 size={14} className="absolute -right-6 top-1/2 -translate-y-1/2 opacity-20 text-blue-400" />
                </div>

                <button
                  onClick={() => setWaterModalOpen(false)}
                  className="mt-6 bg-blue-600 text-white px-8 py-2 rounded-full font-black uppercase text-xs hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/20 active:scale-95"
                >
                  {t.water.confirm}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => addWater(250)} className="bg-slate-700 hover:bg-blue-600/20 border border-slate-600 hover:border-blue-500 p-4 rounded-2xl font-black uppercase text-xs flex flex-col items-center gap-2 transition-all group">
                  <span className="text-lg opacity-50 group-hover:opacity-100 group-hover:text-blue-400 transition-all">+250ml</span>
                  <span className="opacity-30 text-[8px]">{t.water.glass}</span>
                </button>
                <button onClick={() => addWater(500)} className="bg-slate-700 hover:bg-blue-600/20 border border-slate-600 hover:border-blue-500 p-4 rounded-2xl font-black uppercase text-xs flex flex-col items-center gap-2 transition-all group">
                  <span className="text-lg opacity-50 group-hover:opacity-100 group-hover:text-blue-400 transition-all">+500ml</span>
                  <span className="opacity-30 text-[8px]">{t.water.bottle}</span>
                </button>
              </div>

              <p className="text-center text-[10px] opacity-30 uppercase font-black">
                {t.water.tapToEdit}
              </p>
            </div>
          </div>
        )
      }
      {
        dailyQuoteOpen && (
          <div className="fixed inset-0 z-[60] bg-slate-900/90 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in" onClick={() => setDailyQuoteOpen(false)}>
            <div className="bg-gradient-to-br from-fuchsia-900 to-slate-900 w-full max-w-md p-8 rounded-[40px] border border-fuchsia-500/30 space-y-8 animate-in zoom-in-95 relative overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
              <div className="absolute top-0 right-0 p-12 opacity-10 rotate-12"><Sparkles size={180} /></div>

              <div className="flex justify-between items-start relative z-10">
                <div>
                  <h3 className="text-xl font-black uppercase italic tracking-tighter text-white flex items-center gap-2">
                    <Sparkles className="text-fuchsia-400" /> {t.dailyQuote.title}
                  </h3>
                  <p className="text-[10px] uppercase font-bold text-fuchsia-300/50 tracking-widest mt-1">{t.dailyQuote.subtitle}</p>
                </div>
                <button onClick={() => setDailyQuoteOpen(false)} className="p-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors"><X size={20} /></button>
              </div>

              <div className="py-4 relative z-10">
                <p className="text-2xl font-medium italic text-white leading-relaxed text-center">
                  "{dailyQuote}"
                </p>
              </div>

              <div className="flex justify-center relative z-10">
                <button onClick={() => setDailyQuoteOpen(false)} className="bg-fuchsia-600 text-white px-8 py-3 rounded-2xl font-black uppercase text-xs hover:bg-fuchsia-500 transition-colors shadow-lg shadow-fuchsia-500/20 active:scale-95">
                  {t.dailyQuote.button}
                </button>
              </div>
            </div>
          </div>
        )
      }
    </div >
  );
};


const Login: React.FC<any> = ({ lang, setLang, onAuth }) => {
  const [mode, setMode] = useState<'signIn' | 'signUp' | 'forgotPassword'>('signIn');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const t = translations[lang] as any;

  const handleSignIn = async () => {
    if (!email || !pass) return alert(t.system.fillAllFields);
    setLoading(true);
    try {
      const user = await mockAuth.signIn(email, pass);
      onAuth(user);
    } catch (e) {
      alert(t.system.loginError);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    if (!email || !pass) return alert(t.system.fillAllFields);
    setLoading(true);
    try {
      const user = await mockAuth.signUp(email, pass, 'Novo Usuário');
      onAuth(user);
    } catch (e) {
      alert(t.system.createAccountError);
    } finally {
      setLoading(false);
    }
  };

  const handleRecovery = async () => {
    if (!email) return alert(t.system.enterEmail);
    setLoading(true);
    try {
      await mockAuth.resetPassword(email);
      setMessage(t.login.successReset);
      setTimeout(() => {
        setMessage(null);
        setMode('signIn');
      }, 3000);
    } catch (e) {
      alert(t.system.sendLinkError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col p-10 items-center justify-center">
      <div className="w-full max-w-md space-y-12">
        {/* Language Selector */}
        <div className="flex justify-center mb-4">
          <div className="bg-slate-800/80 p-1.5 rounded-2xl flex gap-1 border border-slate-700/50">
            <button
              onClick={() => setLang(Language.PT)}
              className={`px-5 py-3 rounded-xl font-black text-xs transition-all ${lang === Language.PT ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-700/50'}`}
            >
              BR
            </button>
            <button
              onClick={() => setLang(Language.EN)}
              className={`px-5 py-3 rounded-xl font-black text-xs transition-all ${lang === Language.EN ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-700/50'}`}
            >
              US
            </button>
            <button
              onClick={() => setLang(Language.ES)}
              className={`px-5 py-3 rounded-xl font-black text-xs transition-all ${lang === Language.ES ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-700/50'}`}
            >
              ES
            </button>
          </div>
        </div>

        <div className="text-center space-y-2">
          <div className="w-20 h-20 bg-indigo-600 rounded-[30px] flex items-center justify-center mx-auto shadow-2xl rotate-3 mb-6 transition-transform hover:rotate-0">
            <Dumbbell size={40} className="text-white -rotate-3" />
          </div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter">
            {mode === 'forgotPassword' ? t.login.recovery : t.login.title}
          </h1>
          <p className="text-xs uppercase font-black opacity-30 tracking-widest">
            {mode === 'forgotPassword' ? t.login.recoverySubtitle : t.login.subtitle}
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase opacity-40 ml-4">{t.login.email}</label>
            <div className="relative">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-slate-800 border-2 border-slate-700 p-5 pl-14 rounded-3xl outline-none focus:border-indigo-500 font-bold" placeholder="your@email.com" />
            </div>
          </div>

          {mode !== 'forgotPassword' && (
            <div className="space-y-1 animate-in slide-in-from-top-2">
              <label className="text-[10px] font-black uppercase opacity-40 ml-4">{t.login.password}</label>
              <div className="relative">
                <Key className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={pass}
                  onChange={e => setPass(e.target.value)}
                  className="w-full bg-slate-800 border-2 border-slate-700 p-5 pl-14 pr-12 rounded-3xl outline-none focus:border-indigo-500 font-bold"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-indigo-400 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          )}
        </div>

        {message && (
          <div className="p-4 bg-green-500/10 border border-green-500/20 text-green-400 rounded-2xl text-center text-xs font-black uppercase">
            {message}
          </div>
        )}

        <div className="space-y-4">
          <button
            onClick={mode === 'signIn' ? handleSignIn : mode === 'signUp' ? handleSignUp : handleRecovery}
            disabled={loading}
            className="w-full bg-indigo-600 py-6 rounded-3xl font-black text-2xl shadow-xl active:scale-95 transition-all flex items-center justify-center gap-3"
          >
            {loading ? <RefreshCw className="animate-spin" /> : (
              mode === 'signIn' ? <><Lock size={20} /> {t.login.signIn}</> :
                mode === 'signUp' ? t.login.signUp :
                  t.login.sendLink
            )}
          </button>

          <div className="flex flex-col gap-3 text-center">
            {mode === 'signIn' && (
              <>
                <button onClick={() => setMode('forgotPassword')} className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-indigo-400">
                  {t.login.forgotPass}
                </button>
                <div className="h-px bg-slate-800 w-2/3 mx-auto" />
                <p className="text-[10px] font-black uppercase tracking-widest opacity-40">
                  {t.login.noAccount}
                </p>
                <button onClick={() => setMode('signUp')} className="text-sm font-black text-indigo-400 uppercase tracking-tighter italic">
                  {t.login.signUp}
                </button>
              </>
            )}

            {mode === 'signUp' && (
              <button onClick={() => setMode('signIn')} className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-indigo-400">
                {t.login.haveAccount}
              </button>
            )}

            {mode === 'forgotPassword' && (
              <button onClick={() => setMode('signIn')} className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-indigo-400">
                {t.login.backToLogin}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const SyncLoader: React.FC<any> = ({ lang }) => (
  <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-center p-10">
    <CloudSync size={60} className="text-indigo-500 animate-bounce mb-6" />
    <h2 className="text-2xl font-black italic uppercase mb-2">{translations[lang].login.syncing}</h2>
    <div className="w-48 h-1 bg-slate-800 rounded-full overflow-hidden">
      <div className="h-full bg-indigo-500 animate-[sync_2s_infinite]" />
    </div>
    <style>{`@keyframes sync { 0% { width: 0%; } 100% { width: 100%; } }`}</style>
  </div>
);

const NavBtn = ({ icon: Icon, label, active, onClick }: any) => (
  <button onClick={onClick} className={`flex flex-col items-center gap-1.5 transition-all ${active ? 'text-indigo-400 scale-110' : 'text-slate-500 opacity-60'}`}>
    <div className={active ? 'bg-indigo-500/10 p-2.5 rounded-2xl' : 'p-2.5'}><Icon size={24} /></div>
    <span className="text-[9px] font-black uppercase tracking-widest">{label}</span>
  </button>
);

const MetricBox = ({ icon: Icon, label, value, color }: any) => (
  <div className="bg-slate-800 p-6 rounded-[35px] border border-slate-700/50 flex flex-col items-center text-center shadow-lg transition-all">
    <div className="w-10 h-10 rounded-2xl bg-slate-900 flex items-center justify-center mb-3"><Icon className={color} size={20} /></div>
    <p className="text-[9px] font-black uppercase opacity-40 tracking-widest mb-1">{label}</p>
    <p className="text-xl font-black text-white">{value}</p>
  </div>
);

const MetricCard = ({ icon: Icon, label, value, hint }: any) => (
  <div className="bg-slate-700/30 p-5 rounded-3xl border border-slate-700/30 flex flex-col items-center text-center relative overflow-hidden">
    <Icon className="text-indigo-400 mb-2" size={20} />
    <span className="text-[9px] font-black uppercase opacity-40 tracking-widest mb-1">{label}</span>
    <span className="text-sm font-black text-white">{value}</span>
    {hint && <span className="absolute bottom-1 right-2 text-[6px] font-black opacity-10 uppercase">{hint}</span>}
  </div>
);

// Mini-Onboarding: Smart completion for missing fields only
const MiniOnboarding: React.FC<{ lang: Language, profile: UserProfile, missingFields: string[], onComplete: (p: UserProfile) => void }> = ({ lang, profile, missingFields, onComplete }) => {
  const [formData, setFormData] = useState({ ...profile });
  const t = translations[lang] as any;

  const handleSubmit = () => {
    onComplete(formData);
  };

  return (
    <div className="min-h-screen bg-slate-900 p-10 flex flex-col items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto">
            <UserCircle size={40} className="text-indigo-400" />
          </div>
          <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">
            {lang === Language.PT ? 'Complete seu Perfil' : lang === Language.EN ? 'Complete Your Profile' : 'Completa tu Perfil'}
          </h2>
          <p className="text-sm text-slate-400">
            {lang === Language.PT ? 'Só mais algumas informações para personalizar sua experiência' :
              lang === Language.EN ? 'Just a few more details to personalize your experience' :
                'Solo algunos detalles más para personalizar tu experiencia'}
          </p>
        </div>

        <div className="bg-slate-800 p-8 rounded-[40px] border border-indigo-500/30 space-y-6">
          {missingFields.includes('name') && (
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-1">
                {lang === Language.PT ? 'Seu Nome' : lang === Language.EN ? 'Your Name' : 'Tu Nombre'}
              </label>
              <input
                type="text"
                value={formData.name === 'Novo Usuário' ? '' : formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder={lang === Language.PT ? 'Digite seu nome' : lang === Language.EN ? 'Enter your name' : 'Ingresa tu nombre'}
                className="w-full bg-slate-900 border border-slate-700 p-4 rounded-2xl outline-none focus:border-indigo-500 font-bold text-white"
                autoFocus
              />
            </div>
          )}

          {missingFields.includes('goal') && (
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-1">
                {t.profile.inputs.goal}
              </label>
              <select
                value={formData.goal || FitnessGoal.HEALTH}
                onChange={(e) => setFormData({ ...formData, goal: e.target.value as FitnessGoal })}
                className="w-full bg-slate-900 border border-slate-700 p-4 rounded-2xl outline-none focus:border-indigo-500 font-bold appearance-none uppercase text-xs text-white"
              >
                {Object.values(FitnessGoal).map(g => (
                  <option key={g} value={g}>{t.profile.goals[g]}</option>
                ))}
              </select>
            </div>
          )}

          {missingFields.includes('level') && (
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-1">
                {t.onboarding.experience}
              </label>
              <select
                value={formData.level || ExperienceLevel.BEGINNER}
                onChange={(e) => setFormData({ ...formData, level: e.target.value as ExperienceLevel })}
                className="w-full bg-slate-900 border border-slate-700 p-4 rounded-2xl outline-none focus:border-indigo-500 font-bold appearance-none uppercase text-xs text-white"
              >
                {Object.values(ExperienceLevel).map(l => (
                  <option key={l} value={l}>{t.profile.levels[l]}</option>
                ))}
              </select>
            </div>
          )}

          {missingFields.includes('country') && (
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-1">
                {lang === Language.PT ? 'País' : lang === Language.EN ? 'Country' : 'País'}
              </label>
              <select
                value={formData.country || 'BR'}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 p-4 rounded-2xl outline-none focus:border-indigo-500 font-bold appearance-none text-white"
              >
                <option value="BR">🇧🇷 Brasil</option>
                <option value="US">🇺🇸 United States</option>
                <option value="ES">🇪🇸 España</option>
                <option value="PT">🇵🇹 Portugal</option>
                <option value="MX">🇲🇽 México</option>
                <option value="AR">🇦🇷 Argentina</option>
                <option value="OTHER">🌍 {lang === Language.PT ? 'Outro' : lang === Language.EN ? 'Other' : 'Otro'}</option>
              </select>
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={missingFields.includes('name') && (!formData.name || formData.name === 'Novo Usuário')}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 py-6 rounded-3xl font-black uppercase tracking-widest shadow-xl flex items-center justify-center gap-2 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] transition-all"
          >
            <Check size={20} />
            {lang === Language.PT ? 'Continuar' : lang === Language.EN ? 'Continue' : 'Continuar'}
          </button>
        </div>
      </div>
    </div>
  );
};

const Onboarding: React.FC<any> = ({ lang, user, setLang, onComplete, existingProfile }) => {
  const [step, setStep] = useState(1);
  const [fd, setFd] = useState<any>(existingProfile || {
    name: '', age: 25, weight: 70, height: 175, gender: Gender.MALE, activityLevel: ActivityLevel.MODERATE,
    goal: FitnessGoal.HEALTH, level: ExperienceLevel.BEGINNER, trainingDays: ['mon', 'tue', 'wed', 'thu', 'fri'], splitStyle: SplitStyle.FULL_BODY_MIX,
    country: 'BR'
  });

  const t = translations[lang] as any;

  const next = () => setStep(step + 1);
  const back = () => setStep(step - 1);

  return (
    <div className="min-h-screen bg-slate-900 p-10 flex flex-col items-center justify-center overflow-y-auto">
      <div className="flex-1 space-y-12 max-w-md mx-auto w-full flex flex-col justify-center">

        <div className="flex justify-center gap-1 mb-4">
          {[1, 2, 3, 4, 5, 6].map(s => (
            <div key={s} className={`h-1.5 flex-1 rounded-full transition-all ${s <= step ? 'bg-indigo-500' : 'bg-slate-800'}`} />
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-8 animate-in slide-in-from-right text-white text-center">
            <Globe size={80} className="mx-auto text-indigo-500" />
            <h2 className="text-3xl font-black leading-tight tracking-tighter italic uppercase">
              {lang === Language.PT ? 'Onde você está?' : 'Where are you based?'}
            </h2>

            {existingProfile && (
              <div className="text-sm font-medium text-indigo-300 bg-indigo-500/10 p-4 rounded-2xl border border-indigo-500/20">
                <p className="mb-2">
                  {lang === Language.PT
                    ? "Para melhorar sua experiência com alimentos e medidas locais, precisamos confirmar sua região, agradecemos pela confiança. Obrigado."
                    : "To improve your experience with local foods and units, we need to confirm your region. We appreciate your support. Best Regards."}
                </p>
                <p className="font-black opacity-50 uppercase tracking-widest text-[10px] text-right">
                  - MyFitRout Team
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              {[
                { code: 'BR', label: 'Brasil', flag: '🇧🇷' },
                { code: 'US', label: 'USA', flag: '🇺🇸' },
                { code: 'IE', label: 'Ireland', flag: '🇮🇪' },
                { code: 'UK', label: 'United Kingdom', flag: '🇬🇧' },
                { code: 'PT', label: 'Portugal', flag: '🇵🇹' },
                { code: 'ES', label: 'España', flag: '🇪🇸' },
                { code: 'OTHER', label: 'Other / Outro', flag: '🌍' }
              ].map(c => (
                <button
                  key={c.code}
                  onClick={() => setFd({ ...fd, country: c.code })}
                  className={`p-4 rounded-2xl border-2 font-black transition-all flex items-center gap-3 ${fd.country === c.code ? 'border-indigo-500 bg-indigo-500/10 text-white' : 'border-slate-700 text-slate-500 hover:border-slate-500'}`}
                >
                  <span className="text-2xl">{c.flag}</span>
                  <span className="text-sm uppercase">{c.label}</span>
                </button>
              ))}
            </div>
            <p className="text-[10px] opacity-40 uppercase font-bold tracking-widest">
              {lang === Language.PT ? 'Personaliza dieta e medidas' : 'Personalizes diet & units'}
            </p>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8 animate-in slide-in-from-right text-white text-center">
            <UserCircle size={80} className="mx-auto text-indigo-500" />
            <h2 className="text-4xl font-black leading-tight tracking-tighter italic uppercase">{t.onboarding.step1}</h2>
            <div className="space-y-4">
              <input placeholder="Ex: João Silva" className="w-full bg-slate-800 p-6 rounded-3xl border-2 border-slate-700 font-bold outline-none focus:border-indigo-500 shadow-xl" value={fd.name} onChange={e => setFd({ ...fd, name: e.target.value })} />
              <div className="flex gap-4">
                <div className="flex-1 space-y-2 text-left">
                  <label className="text-[10px] font-black uppercase opacity-40 ml-4">{t.profile.age}</label>
                  <input type="number" className="w-full bg-slate-800 p-4 rounded-2xl border-2 border-slate-700 font-bold outline-none" value={fd.age} onChange={e => setFd({ ...fd, age: parseInt(e.target.value) })} />
                </div>
                <div className="flex-1 space-y-2 text-left">
                  <label className="text-[10px] font-black uppercase opacity-40 ml-4">{t.onboarding.gender}</label>
                  <select className="w-full bg-slate-800 p-4 rounded-2xl border-2 border-slate-700 font-bold outline-none appearance-none" value={fd.gender} onChange={e => setFd({ ...fd, gender: e.target.value })}>
                    <option value={Gender.MALE}>{t.onboarding.male}</option>
                    <option value={Gender.FEMALE}>{t.onboarding.female}</option>
                    <option value={Gender.OTHER}>{t.onboarding.other}</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8 animate-in slide-in-from-right text-white text-center">
            <Scale size={80} className="mx-auto text-indigo-500" />
            <h2 className="text-4xl font-black leading-tight tracking-tighter italic uppercase">{t.onboarding.step2}</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 text-left">
                <label className="text-[10px] font-black uppercase opacity-40 ml-4">{t.profile.weight}</label>
                <input type="number" className="w-full bg-slate-800 p-6 rounded-3xl border-2 border-slate-700 font-bold outline-none focus:border-indigo-500" value={fd.weight} onChange={e => setFd({ ...fd, weight: parseFloat(e.target.value) })} />
              </div>
              <div className="space-y-2 text-left">
                <label className="text-[10px] font-black uppercase opacity-40 ml-4">{t.profile.height}</label>
                <input type="number" className="w-full bg-slate-800 p-6 rounded-3xl border-2 border-slate-700 font-bold outline-none focus:border-indigo-500" value={fd.height} onChange={e => setFd({ ...fd, height: parseFloat(e.target.value) })} />
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-8 animate-in slide-in-from-right text-white">
            <h2 className="text-4xl font-black tracking-tighter italic uppercase text-center">{t.onboarding.step3}</h2>
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase opacity-40 tracking-widest ml-2">{t.onboarding.experience}</label>
                <div className="grid grid-cols-1 gap-2">
                  {Object.values(ExperienceLevel).map(lvl => (
                    <button key={lvl} onClick={() => setFd({ ...fd, level: lvl })} className={`p-4 rounded-2xl border-2 font-black transition-all text-xs ${fd.level === lvl ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400' : 'border-slate-700 text-slate-500'}`}>
                      {t.profile.levels[lvl]}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase opacity-40 tracking-widest ml-2">{t.onboarding.activity}</label>
                <div className="grid grid-cols-1 gap-2">
                  {Object.values(ActivityLevel).map(act => (
                    <button key={act} onClick={() => setFd({ ...fd, activityLevel: act })} className={`p-4 rounded-2xl border-2 font-black transition-all text-xs ${fd.activityLevel === act ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400' : 'border-slate-700 text-slate-500'}`}>
                      {t.onboarding.activityLevels[act]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-8 animate-in slide-in-from-right text-white">
            <h2 className="text-4xl font-black tracking-tighter italic uppercase text-center">{t.onboarding.step4}</h2>
            <div className="grid grid-cols-1 gap-3">
              {Object.values(FitnessGoal).map(g => (
                <button key={g} onClick={() => setFd({ ...fd, goal: g })} className={`w-full p-6 rounded-3xl border-2 text-left font-black transition-all ${fd.goal === g ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400 scale-[1.02]' : 'border-slate-700 text-slate-500'}`}>
                  {t.profile.goals[g]}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 6 && (
          <div className="space-y-8 animate-in slide-in-from-right text-white">
            <h2 className="text-4xl font-black tracking-tighter italic uppercase text-center">{t.onboarding.step5}</h2>
            <div className="grid grid-cols-7 gap-2">
              {['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].map(day => (
                <button key={day} onClick={() => setFd({ ...fd, trainingDays: fd.trainingDays.includes(day) ? fd.trainingDays.filter((d: any) => d !== day) : [...fd.trainingDays, day] })} className={`p-4 rounded-xl font-black text-xs transition-all ${fd.trainingDays.includes(day) ? 'bg-indigo-600 text-white shadow-lg scale-110' : 'bg-slate-700 text-slate-500'}`}>
                  {t.calendar[day]}
                </button>
              ))}
            </div>
            <p className="text-[10px] text-center opacity-30 uppercase font-black tracking-widest">{t.onboarding.selectDays}</p>
          </div>
        )}
      </div>

      <div className="flex gap-4 max-w-md mx-auto w-full mt-10">
        {step > 1 && (
          <button onClick={back} className="p-6 bg-slate-800 rounded-3xl text-slate-400 hover:text-white transition-all">
            <ChevronLeft size={24} />
          </button>
        )}
        <button onClick={() => {
          if (step < 6) next();
          else {
            const profileBase: UserProfile = {
              ...fd, id: user.id, email: user.email, language: lang, role: UserRole.MEMBER, trialStartDate: existingProfile?.trialStartDate || new Date().toISOString(),
              completedDays: [], customWorkouts: [], customExercises: [], customSchedule: {}, subscription: SubscriptionPlan.NONE, subscriptionActive: false, hasPass: true
            };
            const initialSchedule = buildScheduleFromDays(profileBase, fd.trainingDays);
            onComplete({ ...profileBase, customSchedule: initialSchedule });
          }
        }} className="flex-1 bg-indigo-600 text-white py-6 rounded-3xl font-black text-2xl shadow-xl active:scale-95 transition-all uppercase tracking-tighter italic">
          {step < 6 ? t.onboarding.next : t.onboarding.finish}
        </button>
      </div>
    </div>
  );
};

export default App;
