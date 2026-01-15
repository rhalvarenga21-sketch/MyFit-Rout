
import React, { useState, useMemo, useEffect } from 'react';
import { 
  Dumbbell, User, Flame, Trophy, Clock,
  Play, ShieldCheck, ChevronLeft, Send, X,
  LayoutList, Check, HeartPulse, Droplets, Utensils,
  Scale, Target, Timer, BookOpen, Layers, AlertCircle, Save, Edit3, Calendar, Lock, LogOut, CreditCard, Sparkles, CloudSync, RefreshCw, Mail, Key, UserCircle
} from 'lucide-react';
import { 
  Language, UserProfile, DayPlan, UserRole, PresetWorkout, Gender, ActivityLevel, FitnessGoal, ExperienceLevel, CustomWorkout, SplitStyle, SubscriptionPlan
} from './types';
import { translations } from './translations';
import { PRESET_WORKOUTS } from './data/workouts';
import { EXERCISE_LIBRARY } from './data/exercises';
import { getAIFeedback } from './services/gemini';
import { WorkoutSummary } from './components/WorkoutSummary';
import { calculateDailyCalorieTarget, calculateWaterGoal, calculateBMR, calculateTDEE } from './utils/metrics';
import { buildScheduleFromDays } from './utils/schedule';
import { safeStartTodayRoutine } from './utils/safeStart';
import { WorkoutCatalog } from './screens/WorkoutCatalog';
import { WorkoutLibrary } from './components/WorkoutLibrary';
import { mockAuth } from './services/auth';
import { syncProfileToCloud, fetchProfileFromCloud } from './services/database';

const DAYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const;

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<{id: string, email: string} | null>(() => {
    const saved = localStorage.getItem('current_user_token');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [lang, setLang] = useState<Language>(Language.PT);
  const [view, setView] = useState<'home' | 'catalog' | 'vital' | 'me' | 'workout_summary' | 'workout_active' | 'exercises' | 'schedule_manager' | 'membership'>('home');
  const [selectedWorkout, setSelectedWorkout] = useState<PresetWorkout | CustomWorkout | null>(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [smartStartModal, setSmartStartModal] = useState<{ preset: PresetWorkout } | null>(null);
  const [vitalQuery, setVitalQuery] = useState('');
  const [vitalResp, setVitalResp] = useState('');
  const [vitalLoading, setVitalLoading] = useState(false);
  const [assigningToDay, setAssigningToDay] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  const t = translations[lang] as any;

  // Sync profile when user changes or app loads
  useEffect(() => {
    if (currentUser) {
      setIsSyncing(true);
      fetchProfileFromCloud(currentUser.id).then(cloudProfile => {
        if (cloudProfile) {
          setProfile(cloudProfile);
          setLang(cloudProfile.language);
        }
        setIsSyncing(false);
      });
    } else {
      setProfile(null);
    }
  }, [currentUser]);

  const saveProfile = async (newP: UserProfile) => {
    setProfile(newP);
    setIsSyncing(true);
    await syncProfileToCloud(newP);
    setIsSyncing(false);
  };

  const handleAuthSuccess = (user: {id: string, email: string}) => {
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

  const metrics = useMemo(() => {
    if (!profile) return { target: 0, bmr: 0, tdee: 0, labelKey: 'HEALTH', water: 0 };
    const calTarget = calculateDailyCalorieTarget(profile);
    return {
      target: calTarget.target,
      bmr: Math.round(calculateBMR(profile)),
      tdee: calculateTDEE(profile),
      labelKey: calTarget.labelKey as keyof typeof FitnessGoal,
      water: calculateWaterGoal(profile.weight)
    };
  }, [profile]);

  const todayWorkoutTitle = useMemo(() => {
    if (!profile) return "";
    const dayNames = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    const todayKey = dayNames[new Date().getDay()];
    const plan = profile.customSchedule[todayKey];
    if (!plan || plan.type === 'REST') return t.plan.rest;
    const workout = PRESET_WORKOUTS.find(p => p.id === plan.presetWorkoutId);
    return workout ? workout.title[lang] : "Workout";
  }, [profile, lang, t]);

  if (!currentUser) return <Login lang={lang} onAuth={handleAuthSuccess} />;
  if (isSyncing && !profile) return <SyncLoader lang={lang} />;
  if (!profile) return <Onboarding lang={lang} user={currentUser} setLang={setLang} onComplete={saveProfile} />;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 font-sans pb-24 selection:bg-indigo-500/30">
      <header className="px-6 py-5 bg-slate-800 border-b border-slate-700/50 flex justify-between items-center sticky top-0 z-40">
        <div className="flex items-center gap-2" onClick={() => setView('home')}>
          <Dumbbell className="text-indigo-500" />
          <h1 className="font-black text-lg tracking-tighter italic cursor-pointer uppercase">MyFitRout</h1>
        </div>
        <div className="flex gap-2 items-center">
          {isSyncing && <RefreshCw size={14} className="animate-spin text-indigo-400" />}
          <button onClick={() => {
            const nextLang = lang === Language.PT ? Language.EN : lang === Language.EN ? Language.ES : Language.PT;
            setLang(nextLang);
            saveProfile({ ...profile, language: nextLang });
          }} className="bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-lg text-xs font-black uppercase">{lang}</button>
        </div>
      </header>

      <main className="max-w-md mx-auto p-5">
        {view === 'home' && (
          <div className="space-y-6 animate-in fade-in">
            <section className="bg-gradient-to-br from-indigo-600 to-indigo-800 p-8 rounded-[40px] text-white shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10 rotate-12"><Trophy size={120} /></div>
               <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Bem-vindo, {profile.name.split(' ')[0]}</p>
               <h2 className="text-3xl font-black mb-6">Foco na Performance</h2>
               <div className="bg-white/10 p-5 rounded-3xl backdrop-blur-sm flex justify-between items-center border border-white/5">
                  <div>
                    <p className="text-[10px] uppercase font-black opacity-50">Consistência</p>
                    <p className="text-2xl font-black">{profile.completedDays.length} Dias</p>
                  </div>
                  <button onClick={() => {
                    const today = new Date().toISOString().split('T')[0];
                    if (!profile.completedDays.includes(today)) saveProfile({ ...profile, completedDays: [...profile.completedDays, today] });
                  }} className="bg-white text-indigo-700 px-5 py-3 rounded-2xl font-black text-xs uppercase shadow-lg active:scale-95 transition-all">
                    {profile.completedDays.includes(new Date().toISOString().split('T')[0]) ? <Check /> : "Check-in"}
                  </button>
               </div>
            </section>

            <div className="grid grid-cols-2 gap-4">
              <MetricBox icon={Droplets} label="Água" value={`${metrics.water}ml`} color="text-blue-400" />
              <MetricBox icon={Utensils} label={t.metrics[metrics.labelKey.toLowerCase()] || "Meta"} value={`${metrics.target}kcal`} color="text-orange-400" />
            </div>

            <section className="bg-slate-800 p-6 rounded-[35px] border border-slate-700/50 shadow-xl">
               <div className="flex justify-between items-center mb-4">
                  <h3 className="font-black text-sm uppercase tracking-widest text-slate-400 flex items-center gap-2"><Clock size={16}/> HOJE</h3>
                  <span className="text-[10px] font-black text-indigo-400 uppercase bg-indigo-500/10 px-2 py-1 rounded-md">{todayWorkoutTitle}</span>
               </div>
               <button onClick={handleStartRoutine} className="w-full bg-indigo-600 hover:bg-indigo-500 p-6 rounded-3xl flex justify-between items-center shadow-lg transition-colors group">
                  <span className="font-black uppercase tracking-tight text-lg">Iniciar Treino</span>
                  <Play size={24} fill="white" className="group-hover:scale-110 transition-transform" />
               </button>
            </section>

            <button onClick={() => setView('schedule_manager')} className="w-full bg-slate-800 p-6 rounded-[35px] border border-slate-700/50 flex items-center justify-between group hover:border-indigo-500 transition-all">
               <div className="flex items-center gap-4">
                 <div className="p-3 bg-indigo-500/10 rounded-2xl text-indigo-400"><Calendar size={24}/></div>
                 <div className="text-left">
                   <p className="font-black uppercase text-xs tracking-widest">{t.plan.title}</p>
                   <p className="text-[10px] opacity-40 uppercase">Ajuste seu cronograma semanal</p>
                 </div>
               </div>
               <Edit3 size={18} className="opacity-20 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>
        )}

        {view === 'membership' && (
          <div className="space-y-6 animate-in slide-in-from-right-6">
            <button onClick={() => setView('me')} className="p-3 bg-slate-800 rounded-2xl border border-slate-700 flex items-center gap-2 font-black text-xs opacity-60"><ChevronLeft size={16}/> VOLTAR</button>
            <h2 className="text-3xl font-black italic uppercase tracking-tighter">{t.membership.title}</h2>
            
            <div className="bg-slate-800 p-8 rounded-[40px] border border-indigo-500/30 space-y-8">
               <div className="flex justify-between items-center">
                 <div>
                    <p className="text-[10px] font-black uppercase opacity-40">{t.membership.status}</p>
                    <p className={`text-xl font-black ${profile.subscriptionActive ? 'text-green-400' : 'text-rose-400'}`}>
                       {profile.subscriptionActive ? t.membership.active : t.membership.inactive}
                    </p>
                 </div>
                 <div className="p-3 bg-indigo-500/10 rounded-2xl text-indigo-400"><Sparkles size={24}/></div>
               </div>

               <div className="space-y-4">
                  <PlanRow active={profile.subscription === SubscriptionPlan.MONTHLY} name={t.membership.monthly} price="R$ 99,90" onClick={() => saveProfile({...profile, subscription: SubscriptionPlan.MONTHLY, subscriptionActive: true})} />
                  <PlanRow active={profile.subscription === SubscriptionPlan.QUARTERLY} name={t.membership.quarterly} price="R$ 249,90" onClick={() => saveProfile({...profile, subscription: SubscriptionPlan.QUARTERLY, subscriptionActive: true})} />
                  <PlanRow active={profile.subscription === SubscriptionPlan.ANNUAL} name={t.membership.annual} price="R$ 899,90" onClick={() => saveProfile({...profile, subscription: SubscriptionPlan.ANNUAL, subscriptionActive: true})} />
               </div>

               <div className="p-5 bg-slate-900/50 rounded-3xl border border-slate-700/50">
                  <p className="text-xs italic opacity-40 mb-2">{t.membership.benefits}</p>
                  <div className="flex items-center gap-2 text-indigo-400 text-[10px] font-black uppercase">
                     <CreditCard size={14}/> {t.membership.testCard}
                  </div>
               </div>

               {profile.subscriptionActive && (
                 <button onClick={() => saveProfile({...profile, subscriptionActive: false, subscription: SubscriptionPlan.NONE})} className="w-full p-4 rounded-2xl border border-rose-500/30 text-rose-500 font-black text-xs uppercase hover:bg-rose-500/10 transition-all">
                   {t.membership.cancel}
                 </button>
               )}
            </div>
          </div>
        )}

        {view === 'me' && (
          <div className="space-y-6 animate-in slide-in-from-right-6">
            <div className="flex justify-between items-center px-1">
              <h2 className="text-2xl font-black uppercase italic tracking-tighter">{t.profile.title}</h2>
              <div className="flex gap-2">
                <button onClick={() => setView('membership')} className="p-3 bg-indigo-500/10 rounded-2xl text-indigo-400 transition-all">
                  <CreditCard size={16}/>
                </button>
                <button onClick={() => setIsEditingProfile(!isEditingProfile)} className="p-3 bg-slate-800 rounded-2xl border border-slate-700 text-slate-400">
                  {isEditingProfile ? <X size={16}/> : <Edit3 size={16}/>}
                </button>
              </div>
            </div>

            {!isEditingProfile && (
              <div className="space-y-6">
                <div className="bg-slate-800 p-10 rounded-[45px] text-center border border-slate-700/50 shadow-2xl relative overflow-hidden group">
                   <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity"><User size={80}/></div>
                   <h3 className="text-3xl font-black mb-1 italic uppercase tracking-tighter">{profile.name}</h3>
                   <div className="flex gap-2 justify-center">
                     <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full">{t.profile.levels[profile.level]}</span>
                     {profile.subscriptionActive && <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full flex items-center gap-1"><Sparkles size={10}/> PRO</span>}
                   </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                   <MetricCard icon={Scale} label={t.profile.weight} value={`${profile.weight}kg`} />
                   <MetricCard icon={Target} label={t.metrics.label} value={`${metrics.target}kcal`} hint={t.metrics.tdeeHint} />
                </div>

                <div className="bg-slate-800 p-6 rounded-[35px] border border-slate-700/50 flex flex-col gap-4">
                   <button onClick={handleLogout} className="w-full p-5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-500 font-black flex items-center justify-center gap-3 uppercase text-xs">
                     <LogOut size={16}/> Sair da Conta
                   </button>
                </div>
              </div>
            )}
            
            {isEditingProfile && (
               <div className="bg-slate-800 p-8 rounded-[40px] border border-indigo-500/30 space-y-6 shadow-2xl">
                 <div className="space-y-4">
                   <div className="space-y-1">
                     <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-1">Nome</label>
                     <input 
                      defaultValue={profile.name}
                      onBlur={(e) => saveProfile({...profile, name: e.target.value})}
                      className="w-full bg-slate-900 border border-slate-700 p-4 rounded-2xl outline-none focus:border-indigo-500 font-bold" 
                     />
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-1">
                       <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-1">{t.profile.weight}</label>
                       <input 
                        type="number"
                        defaultValue={profile.weight}
                        onBlur={(e) => saveProfile({...profile, weight: parseFloat(e.target.value)})}
                        className="w-full bg-slate-900 border border-slate-700 p-4 rounded-2xl outline-none focus:border-indigo-500 font-bold" 
                       />
                     </div>
                     <div className="space-y-1">
                       <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-1">{t.profile.height}</label>
                       <input 
                        type="number"
                        defaultValue={profile.height}
                        onBlur={(e) => saveProfile({...profile, height: parseFloat(e.target.value)})}
                        className="w-full bg-slate-900 border border-slate-700 p-4 rounded-2xl outline-none focus:border-indigo-500 font-bold" 
                       />
                     </div>
                   </div>
                 </div>
                 <button onClick={() => setIsEditingProfile(false)} className="w-full bg-indigo-600 py-6 rounded-3xl font-black uppercase tracking-widest shadow-xl flex items-center justify-center gap-2">
                   <Save size={20}/> {t.profile.save}
                 </button>
               </div>
            )}
          </div>
        )}
        
        {view === 'catalog' && (
          <div className="space-y-4">
             <button onClick={() => setView(assigningToDay ? 'schedule_manager' : 'vital')} className="p-3 bg-slate-800 rounded-2xl border border-slate-700 flex items-center gap-2 font-black text-xs opacity-60"><ChevronLeft size={16}/> VOLTAR</button>
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
        )}
        {view === 'vital' && (
          <div className="space-y-6">
            <div className="bg-slate-800 p-8 rounded-[40px] border border-indigo-500/30">
               <h2 className="text-xl font-black mb-4 uppercase italic">{t.aiAssistant}</h2>
               <div className="flex gap-2 mb-4">
                  <input value={vitalQuery} onChange={e => setVitalQuery(e.target.value)} className="flex-1 bg-slate-900 p-4 rounded-2xl border border-slate-700" placeholder={t.askAi}/>
                  <button onClick={async () => { setVitalLoading(true); setVitalResp(await getAIFeedback(vitalQuery, profile!, lang)); setVitalLoading(false); }} className="p-4 bg-indigo-600 rounded-2xl">{vitalLoading ? <RefreshCw className="animate-spin" /> : <Send/>}</button>
               </div>
               {vitalResp && <div className="p-5 bg-slate-900 rounded-2xl text-sm italic opacity-80">{vitalResp}</div>}
            </div>
            <div className="grid grid-cols-2 gap-4">
               <button onClick={() => setView('catalog')} className="bg-slate-800 p-6 rounded-[35px] border border-slate-700/50 flex flex-col items-center text-center group hover:bg-slate-700 transition-all">
                  <div className="p-3 bg-indigo-500/10 rounded-2xl text-indigo-400 mb-3"><Layers size={24} /></div>
                  <span className="text-[10px] font-black uppercase tracking-widest">{t.catalog.title}</span>
               </button>
               <button onClick={() => setView('exercises')} className="bg-slate-800 p-6 rounded-[35px] border border-slate-700/50 flex flex-col items-center text-center group hover:bg-slate-700 transition-all">
                  <div className="p-3 bg-indigo-500/10 rounded-2xl text-indigo-400 mb-3"><BookOpen size={24} /></div>
                  <span className="text-[10px] font-black uppercase tracking-widest">{t.library.title}</span>
               </button>
            </div>
          </div>
        )}

        {view === 'workout_summary' && selectedWorkout && (
          <div className="space-y-4 animate-in slide-in-from-right-10">
            <button onClick={() => setView('catalog')} className="p-3 bg-slate-800 rounded-2xl border border-slate-700 flex items-center gap-2 font-black text-xs opacity-60"><ChevronLeft size={16}/> VOLTAR</button>
            <WorkoutSummary 
              workout={selectedWorkout as PresetWorkout} 
              lang={lang} 
              onStart={() => setView('home')} 
            />
          </div>
        )}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-slate-800/90 backdrop-blur-xl border-t border-slate-700/30 px-8 py-5 flex justify-between items-center max-w-md mx-auto z-40 rounded-t-[45px] shadow-2xl">
        <NavBtn icon={Flame} label="Home" active={view === 'home'} onClick={() => setView('home')} />
        <NavBtn icon={HeartPulse} label="Vital" active={view === 'vital' || view === 'catalog' || view === 'exercises' || view === 'schedule_manager'} onClick={() => setView('vital')} />
        <NavBtn icon={User} label="Perfil" active={view === 'me' || view === 'membership'} onClick={() => setView('me')} />
      </nav>
    </div>
  );
};

const PlanRow = ({ active, name, price, onClick }: any) => (
  <button onClick={onClick} className={`w-full p-6 rounded-3xl border-2 flex justify-between items-center transition-all ${active ? 'border-indigo-500 bg-indigo-500/10' : 'border-slate-700 hover:border-slate-600'}`}>
    <div className="text-left">
      <p className="font-black uppercase text-sm">{name}</p>
      <p className="text-[10px] opacity-40 uppercase">Acesso Premium</p>
    </div>
    <div className="text-right">
      <p className="text-lg font-black text-indigo-400">{price}</p>
      {active && <Check size={16} className="text-indigo-500 ml-auto mt-1" />}
    </div>
  </button>
);

const Login: React.FC<any> = ({ lang, onAuth }) => {
  const [mode, setMode] = useState<'signIn' | 'signUp' | 'forgotPassword'>('signIn');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const t = translations[lang] as any;

  const handleSignIn = async () => {
    if (!email || !pass) return alert("Preencha todos os campos.");
    setLoading(true);
    try {
      const user = await mockAuth.signIn(email, pass);
      onAuth(user);
    } catch (e) {
      alert("Erro ao entrar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    if (!email || !pass) return alert("Preencha todos os campos.");
    setLoading(true);
    try {
      const user = await mockAuth.signUp(email, pass);
      onAuth(user);
    } catch (e) {
      alert("Erro ao criar conta.");
    } finally {
      setLoading(false);
    }
  };

  const handleRecovery = async () => {
    if (!email) return alert("Informe seu e-mail.");
    setLoading(true);
    try {
      await mockAuth.resetPassword(email);
      setMessage(t.login.successReset);
      setTimeout(() => {
        setMessage(null);
        setMode('signIn');
      }, 3000);
    } catch (e) {
      alert("Erro ao enviar link.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col p-10 items-center justify-center">
       <div className="w-full max-w-md space-y-12">
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
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" size={18}/>
                  <input value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-slate-800 border-2 border-slate-700 p-5 pl-14 rounded-3xl outline-none focus:border-indigo-500 font-bold" placeholder="your@email.com" />
                </div>
             </div>
             
             {mode !== 'forgotPassword' && (
               <div className="space-y-1 animate-in slide-in-from-top-2">
                  <label className="text-[10px] font-black uppercase opacity-40 ml-4">{t.login.password}</label>
                  <div className="relative">
                    <Key className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" size={18}/>
                    <input type="password" value={pass} onChange={e => setPass(e.target.value)} className="w-full bg-slate-800 border-2 border-slate-700 p-5 pl-14 rounded-3xl outline-none focus:border-indigo-500 font-bold" />
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
                 mode === 'signIn' ? <><Lock size={20}/> {t.login.signIn}</> : 
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
    <div className="w-10 h-10 rounded-2xl bg-slate-900 flex items-center justify-center mb-3"><Icon className={color} size={20}/></div>
    <p className="text-[9px] font-black uppercase opacity-40 tracking-widest mb-1">{label}</p>
    <p className="text-xl font-black text-white">{value}</p>
  </div>
);

const MetricCard = ({ icon: Icon, label, value, hint }: any) => (
  <div className="bg-slate-700/30 p-5 rounded-3xl border border-slate-700/30 flex flex-col items-center text-center relative overflow-hidden">
    <Icon className="text-indigo-400 mb-2" size={20}/>
    <span className="text-[9px] font-black uppercase opacity-40 tracking-widest mb-1">{label}</span>
    <span className="text-sm font-black text-white">{value}</span>
    {hint && <span className="absolute bottom-1 right-2 text-[6px] font-black opacity-10 uppercase">{hint}</span>}
  </div>
);

const Onboarding: React.FC<any> = ({ lang, user, setLang, onComplete }) => {
  const [step, setStep] = useState(1);
  const [fd, setFd] = useState<any>({ 
    name: '', age: 25, weight: 70, height: 175, gender: Gender.MALE, activityLevel: ActivityLevel.MODERATE, 
    goal: FitnessGoal.HEALTH, level: ExperienceLevel.BEGINNER, trainingDays: ['mon', 'wed', 'fri'], splitStyle: SplitStyle.FULL_BODY_MIX 
  });

  const t = translations[lang] as any;

  const next = () => setStep(step + 1);
  const back = () => setStep(step - 1);

  return (
    <div className="min-h-screen bg-slate-900 p-10 flex flex-col items-center justify-center overflow-y-auto">
       <div className="flex-1 space-y-12 max-w-md mx-auto w-full flex flex-col justify-center">
          
          <div className="flex justify-center gap-1 mb-4">
             {[1,2,3,4,5].map(s => (
               <div key={s} className={`h-1.5 flex-1 rounded-full transition-all ${s <= step ? 'bg-indigo-500' : 'bg-slate-800'}`} />
             ))}
          </div>

          {step === 1 && (
            <div className="space-y-8 animate-in slide-in-from-right text-white text-center">
               <UserCircle size={80} className="mx-auto text-indigo-500" />
               <h2 className="text-4xl font-black leading-tight tracking-tighter italic uppercase">{t.onboarding.step1}</h2>
               <div className="space-y-4">
                 <input placeholder="Ex: João Silva" className="w-full bg-slate-800 p-6 rounded-3xl border-2 border-slate-700 font-bold outline-none focus:border-indigo-500 shadow-xl" value={fd.name} onChange={e => setFd({...fd, name: e.target.value})} />
                 <div className="flex gap-4">
                    <div className="flex-1 space-y-2 text-left">
                       <label className="text-[10px] font-black uppercase opacity-40 ml-4">{t.profile.age}</label>
                       <input type="number" className="w-full bg-slate-800 p-4 rounded-2xl border-2 border-slate-700 font-bold outline-none" value={fd.age} onChange={e => setFd({...fd, age: parseInt(e.target.value)})} />
                    </div>
                    <div className="flex-1 space-y-2 text-left">
                       <label className="text-[10px] font-black uppercase opacity-40 ml-4">{t.onboarding.gender}</label>
                       <select className="w-full bg-slate-800 p-4 rounded-2xl border-2 border-slate-700 font-bold outline-none appearance-none" value={fd.gender} onChange={e => setFd({...fd, gender: e.target.value})}>
                          <option value={Gender.MALE}>{t.onboarding.male}</option>
                          <option value={Gender.FEMALE}>{t.onboarding.female}</option>
                          <option value={Gender.OTHER}>{t.onboarding.other}</option>
                       </select>
                    </div>
                 </div>
               </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-in slide-in-from-right text-white text-center">
               <Scale size={80} className="mx-auto text-indigo-500" />
               <h2 className="text-4xl font-black leading-tight tracking-tighter italic uppercase">{t.onboarding.step2}</h2>
               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2 text-left">
                     <label className="text-[10px] font-black uppercase opacity-40 ml-4">{t.profile.weight}</label>
                     <input type="number" className="w-full bg-slate-800 p-6 rounded-3xl border-2 border-slate-700 font-bold outline-none focus:border-indigo-500" value={fd.weight} onChange={e => setFd({...fd, weight: parseFloat(e.target.value)})} />
                  </div>
                  <div className="space-y-2 text-left">
                     <label className="text-[10px] font-black uppercase opacity-40 ml-4">{t.profile.height}</label>
                     <input type="number" className="w-full bg-slate-800 p-6 rounded-3xl border-2 border-slate-700 font-bold outline-none focus:border-indigo-500" value={fd.height} onChange={e => setFd({...fd, height: parseFloat(e.target.value)})} />
                  </div>
               </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8 animate-in slide-in-from-right text-white">
               <h2 className="text-4xl font-black tracking-tighter italic uppercase text-center">{t.onboarding.step3}</h2>
               <div className="space-y-6">
                 <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase opacity-40 tracking-widest ml-2">{t.onboarding.experience}</label>
                    <div className="grid grid-cols-1 gap-2">
                       {Object.values(ExperienceLevel).map(lvl => (
                         <button key={lvl} onClick={() => setFd({...fd, level: lvl})} className={`p-4 rounded-2xl border-2 font-black transition-all text-xs ${fd.level === lvl ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400' : 'border-slate-700 text-slate-500'}`}>
                           {t.profile.levels[lvl]}
                         </button>
                       ))}
                    </div>
                 </div>
                 <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase opacity-40 tracking-widest ml-2">{t.onboarding.activity}</label>
                    <div className="grid grid-cols-1 gap-2">
                       {Object.values(ActivityLevel).map(act => (
                         <button key={act} onClick={() => setFd({...fd, activityLevel: act})} className={`p-4 rounded-2xl border-2 font-black transition-all text-xs ${fd.activityLevel === act ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400' : 'border-slate-700 text-slate-500'}`}>
                           {t.onboarding.activityLevels[act]}
                         </button>
                       ))}
                    </div>
                 </div>
               </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-8 animate-in slide-in-from-right text-white">
               <h2 className="text-4xl font-black tracking-tighter italic uppercase text-center">{t.onboarding.step4}</h2>
               <div className="grid grid-cols-1 gap-3">
                  {Object.values(FitnessGoal).map(g => (
                    <button key={g} onClick={() => setFd({...fd, goal: g})} className={`w-full p-6 rounded-3xl border-2 text-left font-black transition-all ${fd.goal === g ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400 scale-[1.02]' : 'border-slate-700 text-slate-500'}`}>
                       {t.profile.goals[g]}
                    </button>
                  ))}
               </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-8 animate-in slide-in-from-right text-white">
               <h2 className="text-4xl font-black tracking-tighter italic uppercase text-center">{t.onboarding.step5}</h2>
               <div className="grid grid-cols-7 gap-2">
                  {['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].map(day => (
                    <button key={day} onClick={() => setFd({...fd, trainingDays: fd.trainingDays.includes(day) ? fd.trainingDays.filter((d:any)=>d!==day) : [...fd.trainingDays, day]})} className={`p-4 rounded-xl font-black text-xs transition-all ${fd.trainingDays.includes(day) ? 'bg-indigo-600 text-white shadow-lg scale-110' : 'bg-slate-700 text-slate-500'}`}>
                      {day.charAt(0).toUpperCase()}
                    </button>
                  ))}
               </div>
               <p className="text-[10px] text-center opacity-30 uppercase font-black tracking-widest">Selecione os dias que você planeja treinar</p>
            </div>
          )}
       </div>

       <div className="flex gap-4 max-w-md mx-auto w-full mt-10">
          {step > 1 && (
            <button onClick={back} className="p-6 bg-slate-800 rounded-3xl text-slate-400 hover:text-white transition-all">
               <ChevronLeft size={24}/>
            </button>
          )}
          <button onClick={() => {
            if (step < 5) next();
            else {
              const profileBase: UserProfile = { 
                ...fd, id: user.id, email: user.email, language: lang, role: UserRole.MEMBER, trialStartDate: new Date().toISOString(), 
                completedDays: [], customWorkouts: [], customSchedule: {}, subscription: SubscriptionPlan.NONE, subscriptionActive: false, hasPass: true 
              };
              const initialSchedule = buildScheduleFromDays(profileBase, fd.trainingDays);
              onComplete({ ...profileBase, customSchedule: initialSchedule });
            }
          }} className="flex-1 bg-indigo-600 text-white py-6 rounded-3xl font-black text-2xl shadow-xl active:scale-95 transition-all uppercase tracking-tighter italic">
            {step < 5 ? t.onboarding.next : t.onboarding.finish}
          </button>
       </div>
    </div>
  );
};

export default App;
