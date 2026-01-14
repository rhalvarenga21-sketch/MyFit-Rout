
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Dumbbell, User, Settings, Calendar,
  Flame, Activity, Trophy, Clock,
  Zap, Play, ShieldCheck, ChevronLeft, Send, X,
  LayoutList, Check, HeartPulse, BarChart3, Droplets, Utensils,
  Scale, Ruler, Users, TrendingUp, MoreVertical, Plus,
  Target, Timer, BookOpen, Layers, AlertCircle, Search, Save, Edit3
} from 'lucide-react';
import { 
  Language, UserProfile, DayPlan, UserRole, PresetWorkout, Gender, ActivityLevel, FitnessGoal, ExperienceLevel, CustomWorkout, Exercise, WorkoutCategory, SplitStyle
} from './types';
import { translations } from './translations';
import { EXERCISE_DATABASE, PRESET_WORKOUTS } from './presets';
import { EXERCISE_LIBRARY } from './data/exercises';
import { getAIFeedback } from './services/gemini';
import { WorkoutSummary } from './components/WorkoutSummary';
import { calculateDailyCalorieTarget, calculateWaterGoal, calculateBMR, calculateTDEE } from './utils/metrics';
import { applyTrainingDaysSelection } from './utils/schedule';
import { TrainingDaysSelector } from './components/TrainingDaysSelector';
import { WorkoutLibrary } from './components/WorkoutLibrary';
import { WorkoutBuilder } from './components/WorkoutBuilder';
import { WorkoutCatalog } from './screens/WorkoutCatalog';

const DAYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const;

const App: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('myfitrout_v6_profile');
    try {
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [lang, setLang] = useState<Language>(profile?.language || Language.PT);
  const [view, setView] = useState<'home' | 'planning' | 'vital' | 'me' | 'library' | 'catalog' | 'workout_summary' | 'workout_active' | 'b2b'>('home');
  const [selectedWorkout, setSelectedWorkout] = useState<PresetWorkout | CustomWorkout | null>(null);
  const [editingDay, setEditingDay] = useState<string | null>(null);
  const [showBuilder, setShowBuilder] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResp, setAiResp] = useState('');

  const t = translations[lang] as any;

  const saveProfile = (newP: UserProfile) => {
    setProfile(newP);
    localStorage.setItem('myfitrout_v6_profile', JSON.stringify(newP));
  };

  const getTodayKey = (): typeof DAYS[number] => {
    const day = new Date().getDay();
    const index = day === 0 ? 6 : day - 1;
    return DAYS[index];
  };

  const resolveWorkout = (dayPlan?: DayPlan): PresetWorkout | CustomWorkout | null => {
    if (!dayPlan || dayPlan.type === 'REST') return null;
    if (dayPlan.workoutSource === 'CUSTOM' && dayPlan.customWorkoutId) {
      return profile?.customWorkouts.find(cw => cw.id === dayPlan.customWorkoutId) || null;
    }
    if (dayPlan.presetWorkoutId) {
      return PRESET_WORKOUTS.find(w => w.id === dayPlan.presetWorkoutId) || null;
    }
    return null;
  };

  const cycleLang = () => {
    const langs = Object.values(Language);
    const next = langs[(langs.indexOf(lang) + 1) % langs.length];
    setLang(next);
    if (profile) saveProfile({ ...profile, language: next });
  };

  const metrics = useMemo(() => {
    if (!profile) return { target: 0, bmr: 0, tdee: 0, labelKey: 'health', water: 0 };
    const calTarget = calculateDailyCalorieTarget(profile);
    return {
      target: calTarget.target,
      bmr: Math.round(calculateBMR(profile)),
      tdee: calculateTDEE(profile),
      labelKey: calTarget.labelKey,
      water: calculateWaterGoal(profile.weight)
    };
  }, [profile]);

  if (!profile) return <Onboarding lang={lang} setLang={setLang} onComplete={saveProfile} />;

  const streak = profile.completedDays.length;

  const handleDayToggle = (days: string[]) => {
    const newSchedule = applyTrainingDaysSelection(profile, days, profile.splitStyle);
    saveProfile({ ...profile, trainingDays: days, customSchedule: newSchedule });
  };

  const handleSplitChange = (split: SplitStyle) => {
    const newSchedule = applyTrainingDaysSelection(profile, profile.trainingDays, split);
    saveProfile({ ...profile, splitStyle: split, customSchedule: newSchedule });
  };

  const handleSaveCustomWorkout = (w: CustomWorkout) => {
    const exists = profile.customWorkouts.some(cw => cw.id === w.id);
    const newWorkouts = exists 
      ? profile.customWorkouts.map(cw => cw.id === w.id ? w : cw)
      : [...profile.customWorkouts, w];
    saveProfile({ ...profile, customWorkouts: newWorkouts });
    setShowBuilder(false);
  };

  const handleAssignToDay = (workout: PresetWorkout | CustomWorkout, day: string) => {
    const isPreset = 'tags' in workout;
    const newSchedule = { 
      ...profile.customSchedule, 
      [day]: { 
        type: 'WORKOUT', 
        workoutSource: isPreset ? 'PRESET' : 'CUSTOM',
        [isPreset ? 'presetWorkoutId' : 'customWorkoutId']: workout.id
      } as DayPlan 
    };
    saveProfile({ ...profile, customSchedule: newSchedule });
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 font-sans pb-24 selection:bg-indigo-500/30">
      <header className="px-6 py-5 bg-slate-800 border-b border-slate-700/50 flex justify-between items-center sticky top-0 z-40">
        <div className="flex items-center gap-2" onClick={() => setView('home')}>
          <Dumbbell className="text-indigo-500" />
          <h1 className="font-black text-lg tracking-tighter italic cursor-pointer">MY FIT ROUT</h1>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setView('b2b')} className="p-2 bg-slate-700 rounded-lg text-slate-400 hover:text-indigo-400 transition-colors"><BarChart3 size={18}/></button>
          <button onClick={cycleLang} className="bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-lg text-xs font-black uppercase transition-all">{lang}</button>
        </div>
      </header>

      <main className="max-w-md mx-auto p-5">
        {view === 'home' && (
          <div className="space-y-6 animate-in fade-in">
            <section className="bg-gradient-to-br from-indigo-600 to-indigo-800 p-8 rounded-[40px] text-white shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10 rotate-12"><Trophy size={120} /></div>
               <p className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-1">{t.welcome}</p>
               <h2 className="text-3xl font-black mb-6">{profile.name}</h2>
               <div className="bg-white/10 p-5 rounded-3xl backdrop-blur-sm flex justify-between items-center border border-white/5">
                  <div>
                    <p className="text-[10px] uppercase font-black opacity-50">{t.profile.streak}</p>
                    <p className="text-2xl font-black">{streak} {t.profile.daysActive}</p>
                  </div>
                  <button onClick={() => {
                    const today = new Date().toISOString().split('T')[0];
                    if (!profile.completedDays.includes(today)) saveProfile({ ...profile, completedDays: [...profile.completedDays, today] });
                  }} className="bg-white text-indigo-700 px-5 py-3 rounded-2xl font-black text-xs uppercase shadow-lg active:scale-95 transition-all">
                    {profile.completedDays.includes(new Date().toISOString().split('T')[0]) ? <Check /> : "Finish Day"}
                  </button>
               </div>
            </section>

            <div className="grid grid-cols-2 gap-4">
              <MetricBox icon={Droplets} label={t.profile.water} value={`${metrics.water}ml`} color="text-blue-400" />
              <div className="relative group cursor-help">
                <MetricBox icon={Utensils} label={t.metrics[metrics.labelKey] || "Target"} value={`${metrics.target}kcal`} color="text-orange-400" />
                <div className="absolute top-full left-0 right-0 pt-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                   <div className="bg-slate-800 p-3 rounded-xl text-[10px] font-black text-indigo-300 border border-slate-700 shadow-2xl space-y-1">
                      <p>{t.plan.hint}</p>
                      <p className="opacity-50">BMR: {metrics.bmr} | TDEE: {metrics.tdee}</p>
                   </div>
                </div>
              </div>
            </div>

            <section className="bg-slate-800 p-6 rounded-[35px] border border-slate-700/50">
               <h3 className="font-black text-sm uppercase tracking-widest mb-4 flex items-center gap-2 text-slate-400"><Clock size={16}/> {lang === 'PT' ? 'HOJE' : 'TODAY'}</h3>
               {profile.customSchedule[getTodayKey()]?.type === 'WORKOUT' ? (
                 <button onClick={() => {
                    const workout = resolveWorkout(profile.customSchedule[getTodayKey()]);
                    if (workout) {
                      setSelectedWorkout(workout);
                      setView('workout_summary');
                    }
                 }} className="w-full bg-indigo-600 hover:bg-indigo-500 p-5 rounded-2xl flex justify-between items-center shadow-lg transition-colors group">
                    <span className="font-black uppercase tracking-tight">
                      {resolveWorkout(profile.customSchedule[getTodayKey()])?.title[lang] || "Start Routine"}
                    </span>
                    <Play size={20} fill="white" className="group-hover:scale-125 transition-transform" />
                 </button>
               ) : (
                 <p className="text-sm opacity-40 italic py-2">{t.plan.rest}. Recovery is essential for longevity.</p>
               )}
            </section>
          </div>
        )}

        {view === 'planning' && (
          <div className="space-y-6 animate-in slide-in-from-bottom-6 pb-20">
            <h2 className="text-2xl font-black uppercase italic tracking-tighter">{t.plan.title}</h2>
            
            <TrainingDaysSelector 
              lang={lang} 
              selectedDays={profile.trainingDays || []} 
              onChange={handleDayToggle} 
            />

            {profile.trainingDays.length >= 4 && (
              <div className="bg-slate-800 p-6 rounded-[35px] border border-slate-700/50 space-y-4">
                <h3 className="text-[10px] font-black uppercase opacity-40">{t.plan.splitStyle}</h3>
                <div className="grid grid-cols-2 gap-2">
                  {Object.values(SplitStyle).map(s => (
                    <button
                      key={s}
                      onClick={() => handleSplitChange(s)}
                      className={`p-3 rounded-xl text-[9px] font-black uppercase border-2 transition-all ${profile.splitStyle === s ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400' : 'border-slate-700 opacity-60'}`}
                    >
                      {t.splits[s]}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-3">
              {DAYS.map(day => (
                <div key={day} className="bg-slate-800 p-5 rounded-3xl border border-slate-700/50 flex justify-between items-center group">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center font-black text-[10px] uppercase text-indigo-400">{t[day]?.slice(0,3)}</div>
                      <div>
                         <p className="font-black text-sm">
                           {profile.customSchedule[day]?.type === 'REST' 
                             ? t.plan.rest 
                             : resolveWorkout(profile.customSchedule[day])?.title[lang] || (lang === 'PT' ? "Treino não definido" : "Undefined Workout")
                           }
                         </p>
                      </div>
                   </div>
                   <button onClick={() => setEditingDay(day)} className="p-2 opacity-0 group-hover:opacity-100 transition-all text-slate-500 hover:text-indigo-400 hover:bg-indigo-500/10 rounded-lg"><Settings size={18}/></button>
                </div>
              ))}
            </div>

            {editingDay && (
              <div className="fixed inset-0 z-50 bg-slate-900/90 backdrop-blur-xl flex items-end justify-center p-4">
                 <div className="bg-slate-800 w-full max-w-md p-8 rounded-[40px] border border-slate-700 space-y-6 animate-in slide-in-from-bottom">
                    <div className="flex justify-between items-center">
                       <h3 className="text-xl font-black uppercase">{t.plan.edit}: {t[editingDay as keyof typeof t]}</h3>
                       <button onClick={() => setEditingDay(null)} className="p-2 hover:bg-white/5 rounded-full"><X/></button>
                    </div>
                    <div className="max-h-[50vh] overflow-y-auto space-y-2 pr-2 custom-scroll">
                       <button onClick={() => {
                          const newSched = { ...profile.customSchedule, [editingDay]: { type: 'REST' } as DayPlan };
                          saveProfile({ ...profile, customSchedule: newSched });
                          setEditingDay(null);
                       }} className="w-full bg-slate-700/30 p-5 rounded-2xl text-left font-black border-2 border-transparent hover:border-indigo-500 transition-all flex items-center justify-between">
                         {t.plan.rest} <ShieldCheck size={16} opacity={0.3}/>
                       </button>

                       <h4 className="text-[10px] font-black uppercase opacity-40 px-2 mt-4">Presets</h4>
                       {PRESET_WORKOUTS.map(p => (
                         <button key={p.id} onClick={() => {
                            const newSched = { ...profile.customSchedule, [editingDay as string]: { type: 'WORKOUT', workoutSource: 'PRESET', presetWorkoutId: p.id } as DayPlan };
                            saveProfile({ ...profile, customSchedule: newSched });
                            setEditingDay(null);
                         }} className="w-full bg-slate-700/30 p-4 rounded-2xl text-left font-black border-2 border-transparent hover:border-indigo-500 transition-all">
                            {p.title[lang]}
                         </button>
                       ))}
                    </div>
                 </div>
              </div>
            )}
          </div>
        )}

        {view === 'catalog' && (
          <WorkoutCatalog 
            lang={lang} 
            profile={profile}
            onSelect={(w) => {
              setSelectedWorkout(w);
              setView('workout_summary');
            }}
            onAssign={handleAssignToDay}
          />
        )}

        {view === 'me' && (
          <div className="space-y-6 animate-in slide-in-from-right-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-black uppercase italic tracking-tighter">{t.profile.title}</h2>
              <button 
                onClick={() => setIsEditingProfile(!isEditingProfile)}
                className={`p-3 rounded-2xl flex items-center gap-2 font-black text-xs uppercase transition-all ${isEditingProfile ? 'bg-rose-500/10 text-rose-500' : 'bg-indigo-500/10 text-indigo-400'}`}
              >
                {isEditingProfile ? <X size={16}/> : <Edit3 size={16}/>}
                {isEditingProfile ? 'Cancel' : t.profile.edit}
              </button>
            </div>

            {isEditingProfile ? (
              <div className="bg-slate-800 p-8 rounded-[40px] border border-indigo-500/30 space-y-8 animate-in zoom-in-95 duration-200">
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">{t.profile.goal}</label>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.values(FitnessGoal).map(g => (
                      <button 
                        key={g} 
                        onClick={() => saveProfile({...profile, goal: g})}
                        className={`p-4 rounded-2xl text-[10px] font-black uppercase border-2 transition-all ${profile.goal === g ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400' : 'border-slate-700 opacity-60'}`}
                      >
                        {t.profile.goals[g]}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                   <TrainingDaysSelector 
                    lang={lang} 
                    selectedDays={profile.trainingDays} 
                    onChange={handleDayToggle} 
                   />
                </div>

                <button 
                  onClick={() => setIsEditingProfile(false)}
                  className="w-full bg-indigo-600 py-6 rounded-3xl font-black uppercase tracking-widest shadow-xl flex items-center justify-center gap-2"
                >
                  <Save size={20}/> {t.profile.save}
                </button>
              </div>
            ) : (
              <>
                <div className="bg-slate-800 p-10 rounded-[45px] text-center border border-slate-700/50 shadow-2xl relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-full h-1.5 bg-indigo-500"></div>
                   <div className="w-24 h-24 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-slate-700 shadow-inner"><User size={48} className="text-indigo-500"/></div>
                   <h3 className="text-3xl font-black mb-1">{profile.name}</h3>
                   <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400 bg-indigo-500/10 inline-block px-3 py-1 rounded-full">{t.profile.levels[profile.level]} • {t.profile.goals[profile.goal]}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <MetricCard icon={Scale} label={t.profile.weight} value={`${profile.weight}kg`} />
                   <MetricCard icon={Ruler} label={t.profile.height} value={`${profile.height}cm`} />
                   <MetricCard icon={Calendar} label={t.profile.age} value={`${profile.age}y`} />
                   <MetricCard icon={Activity} label={t.profile.bmr} value={`${metrics.bmr}kcal`} hint={t.metrics.bmrHint} />
                   <MetricCard icon={Target} label={t.profile.targetKcal} value={`${metrics.target}kcal`} hint={t.metrics.tdeeHint} />
                   <MetricCard icon={Droplets} label={t.profile.water} value={`${metrics.water}ml`} />
                </div>
              </>
            )}
          </div>
        )}
      </main>

      {view !== 'workout_active' && view !== 'workout_summary' && (
        <nav className="fixed bottom-0 left-0 right-0 bg-slate-800/90 backdrop-blur-xl border-t border-slate-700/30 px-8 py-5 flex justify-between items-center max-w-md mx-auto z-40 rounded-t-[45px] shadow-[0_-10px_50px_-10px_rgba(0,0,0,0.5)]">
          <NavBtn icon={Flame} label="Home" active={view === 'home'} onClick={() => setView('home')} />
          <NavBtn icon={LayoutList} label="Plan" active={view === 'planning'} onClick={() => setView('planning')} />
          <NavBtn icon={Layers} label="Catalog" active={view === 'catalog'} onClick={() => setView('catalog')} />
          <NavBtn icon={BookOpen} label="Lib" active={view === 'library'} onClick={() => setView('library')} />
          <NavBtn icon={HeartPulse} label="Vital" active={view === 'vital'} onClick={() => setView('vital')} />
          <NavBtn icon={User} label="Me" active={view === 'me'} onClick={() => setView('me')} />
        </nav>
      )}
    </div>
  );
};

const NavBtn = ({ icon: Icon, label, active, onClick }: any) => (
  <button onClick={onClick} className={`flex flex-col items-center gap-1.5 transition-all ${active ? 'text-indigo-400 scale-110' : 'text-slate-500 opacity-60 hover:opacity-100'}`}>
    <div className={active ? 'bg-indigo-500/10 p-2.5 rounded-2xl' : 'p-2.5'}><Icon size={24} /></div>
    <span className="text-[9px] font-black uppercase tracking-widest">{label}</span>
  </button>
);

const MetricBox = ({ icon: Icon, label, value, color }: any) => (
  <div className="bg-slate-800 p-6 rounded-[35px] border border-slate-700/50 flex flex-col items-center text-center shadow-lg group hover:border-indigo-500/30 transition-all">
    <div className="w-10 h-10 rounded-2xl bg-slate-900 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform"><Icon className={color} size={20}/></div>
    <p className="text-[9px] font-black uppercase opacity-40 tracking-widest mb-1">{label}</p>
    <p className="text-xl font-black">{value}</p>
  </div>
);

const MetricCard = ({ icon: Icon, label, value, hint }: any) => (
  <div className="bg-slate-700/30 p-5 rounded-3xl border border-slate-700/30 flex flex-col items-center text-center group hover:bg-slate-700/50 transition-all relative overflow-hidden">
    <Icon className="text-indigo-400 mb-2 group-hover:rotate-12 transition-transform" size={20}/>
    <span className="text-[9px] font-black uppercase opacity-40 tracking-widest mb-1">{label}</span>
    <span className="text-sm font-black">{value}</span>
    {hint && <span className="absolute bottom-1 right-2 text-[6px] font-black opacity-10 uppercase">{hint}</span>}
  </div>
);

const Onboarding: React.FC<any> = ({ lang, setLang, onComplete }) => {
  const [step, setStep] = useState(0);
  const [fd, setFd] = useState<any>({ 
    name: '', 
    age: 30, 
    weight: 70, 
    height: 170, 
    gender: Gender.MALE, 
    activityLevel: ActivityLevel.MODERATE, 
    goal: FitnessGoal.HEALTH, 
    level: ExperienceLevel.BEGINNER,
    trainingDays: ['mon', 'wed', 'fri'],
    splitStyle: SplitStyle.FULL_BODY_MIX
  });

  const handleDayToggle = (day: string) => {
    const next = fd.trainingDays.includes(day) 
      ? fd.trainingDays.filter((d: string) => d !== day)
      : [...fd.trainingDays, day];
    setFd({ ...fd, trainingDays: next });
  };

  if (step === 0) return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-10 text-center relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full -z-10"></div>
      <div className="w-28 h-28 bg-indigo-600 rounded-[35px] flex items-center justify-center mb-10 shadow-2xl rotate-6 ring-8 ring-indigo-500/20"><Dumbbell size={56} className="text-white"/></div>
      <h1 className="text-5xl font-black text-white mb-6 tracking-tighter leading-none">{translations[lang].onboardingTitle}</h1>
      <p className="text-slate-400 font-medium mb-10 leading-relaxed max-w-xs mx-auto">Técnica antes de carga. Saúde antes de estética. Longevidade como meta.</p>
      <div className="flex gap-4 mb-12">
        {Object.values(Language).map(l => (
          <button key={l} onClick={() => setLang(l)} className={`w-16 h-16 rounded-3xl border-2 flex items-center justify-center font-black transition-all ${lang === l ? 'border-indigo-500 text-indigo-500 bg-indigo-500/10 scale-110 shadow-lg' : 'border-slate-700 text-slate-500 hover:border-slate-600'}`}>{l}</button>
        ))}
      </div>
      <button onClick={() => setStep(1)} className="w-full max-w-xs bg-indigo-600 text-white py-6 rounded-3xl font-black text-2xl shadow-[0_10px_40px_-10px_rgba(79,70,229,0.5)] active:scale-95 transition-all uppercase tracking-tight">Começar Agora</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-900 p-10 flex flex-col items-center justify-center">
       <div className="flex-1 space-y-12 max-w-md mx-auto w-full flex flex-col justify-center">
          <div className="space-y-4">
            <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden shadow-inner"><div className="h-full bg-indigo-500 transition-all duration-500" style={{ width: `${(step/5)*100}%` }} /></div>
            <p className="text-center text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">Step {step} of 5</p>
          </div>

          {step === 1 && (
            <div className="space-y-8 animate-in slide-in-from-right">
               <h2 className="text-4xl font-black text-white leading-tight">Basic Profile Info</h2>
               <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-40 px-1">Seu Nome</label>
                    <input placeholder="Ex: John Doe" className="w-full bg-slate-800 p-6 rounded-3xl border-2 border-slate-700 font-bold outline-none focus:border-indigo-500 transition-all shadow-lg" value={fd.name} onChange={e => setFd({...fd, name: e.target.value})} />
                  </div>
                  <div className="flex gap-4">
                    <button onClick={() => setFd({...fd, gender: Gender.MALE})} className={`flex-1 py-6 rounded-3xl border-2 font-black transition-all ${fd.gender === Gender.MALE ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400 scale-[1.02]' : 'border-slate-700 text-slate-500'}`}>MALE</button>
                    <button onClick={() => setFd({...fd, gender: Gender.FEMALE})} className={`flex-1 py-6 rounded-3xl border-2 font-black transition-all ${fd.gender === Gender.FEMALE ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400 scale-[1.02]' : 'border-slate-700 text-slate-500'}`}>FEMALE</button>
                  </div>
               </div>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-8 animate-in slide-in-from-right text-white">
               <h2 className="text-4xl font-black">Body Metrics</h2>
               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Weight (kg)</label>
                    <input type="number" className="w-full bg-slate-800 p-6 rounded-3xl border-2 border-slate-700 font-bold outline-none focus:border-indigo-500 shadow-lg" value={fd.weight} onChange={e => setFd({...fd, weight: Number(e.target.value)})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Height (cm)</label>
                    <input type="number" className="w-full bg-slate-800 p-6 rounded-3xl border-2 border-slate-700 font-bold outline-none focus:border-indigo-500 shadow-lg" value={fd.height} onChange={e => setFd({...fd, height: Number(e.target.value)})} />
                  </div>
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Age</label>
                  <input type="number" className="w-full bg-slate-800 p-6 rounded-3xl border-2 border-slate-700 font-bold outline-none focus:border-indigo-500 shadow-lg" value={fd.age} onChange={e => setFd({...fd, age: Number(e.target.value)})} />
               </div>
            </div>
          )}
          {step === 3 && (
            <div className="space-y-8 animate-in slide-in-from-right text-white">
               <h2 className="text-4xl font-black">Main Goal</h2>
               <div className="space-y-3">
                  {[FitnessGoal.HEALTH, FitnessGoal.GAIN, FitnessGoal.LOSE, FitnessGoal.STRENGTHEN].map(g => (
                    <button key={g} onClick={() => setFd({...fd, goal: g})} className={`w-full p-6 rounded-3xl border-2 text-left font-black flex justify-between items-center transition-all ${fd.goal === g ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400 scale-[1.02]' : 'border-slate-700 text-slate-500 hover:border-slate-600'}`}>
                       <span>{translations[lang].profile.goals[g]}</span>
                       {fd.goal === g && <Check size={20} className="bg-indigo-500 text-white rounded-full p-1"/>}
                    </button>
                  ))}
               </div>
            </div>
          )}
          {step === 4 && (
            <div className="space-y-8 animate-in slide-in-from-right text-white">
               <h2 className="text-4xl font-black">Training Days</h2>
               <div className="bg-slate-800 p-8 rounded-[40px] border border-slate-700 shadow-xl space-y-6">
                 <div className="flex justify-between gap-2">
                    {DAYS.map(day => (
                      <button
                        key={day}
                        onClick={() => handleDayToggle(day)}
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm transition-all ${
                          fd.trainingDays.includes(day)
                            ? 'bg-indigo-600 text-white shadow-lg scale-110 shadow-indigo-500/20'
                            : 'bg-slate-700 text-slate-500'
                        }`}
                      >
                        {day.charAt(0).toUpperCase()}
                      </button>
                    ))}
                 </div>
                 {fd.trainingDays.length >= 4 && (
                   <div className="pt-6 border-t border-slate-700/50 space-y-4">
                     <p className="text-[10px] font-black uppercase opacity-40 text-center tracking-widest">{translations[lang].plan.splitStyle}</p>
                     <div className="grid grid-cols-2 gap-2">
                        {Object.values(SplitStyle).map(s => (
                          <button
                            key={s}
                            onClick={() => setFd({ ...fd, splitStyle: s })}
                            className={`p-3 rounded-xl text-[9px] font-black uppercase border-2 transition-all ${fd.splitStyle === s ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400' : 'border-slate-700 opacity-60'}`}
                          >
                            {translations[lang].splits[s]}
                          </button>
                        ))}
                     </div>
                   </div>
                 )}
               </div>
            </div>
          )}
          {step === 5 && (
            <div className="space-y-8 animate-in slide-in-from-right text-white">
               <h2 className="text-4xl font-black">Experience</h2>
               <div className="space-y-3">
                  {Object.values(ExperienceLevel).map(l => (
                    <button key={l} onClick={() => setFd({...fd, level: l})} className={`w-full p-6 rounded-3xl border-2 text-left font-black flex justify-between items-center transition-all ${fd.level === l ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400 scale-[1.02]' : 'border-slate-700 text-slate-500 hover:border-slate-600'}`}>
                       <span>{translations[lang].profile.levels[l]}</span>
                       {fd.level === l && <Check size={20} className="bg-indigo-500 text-white rounded-full p-1"/>}
                    </button>
                  ))}
               </div>
            </div>
          )}
       </div>
       <div className="flex gap-4 max-w-md mx-auto w-full mt-10">
          {step > 1 && <button onClick={() => setStep(step - 1)} className="p-6 border-2 border-slate-700 rounded-[30px] text-white hover:bg-white/5 transition-all"><ChevronLeft/></button>}
          <button onClick={() => {
            if (step < 5) setStep(step + 1);
            else {
              const profileBase = { 
                ...fd, 
                language: lang, 
                role: UserRole.MEMBER, 
                trialStartDate: new Date().toISOString(), 
                completedDays: [], 
                feedbackHistory: [], 
                customWorkouts: [], 
                customSchedule: {} 
              };
              const initialSchedule = applyTrainingDaysSelection(profileBase as any, fd.trainingDays, fd.splitStyle);
              onComplete({ ...profileBase, customSchedule: initialSchedule });
            }
          }} className="flex-1 bg-indigo-600 text-white py-6 rounded-[30px] font-black text-2xl shadow-xl active:scale-95 transition-all">
            {step < 5 ? "PRÓXIMO" : "FINALIZAR"}
          </button>
       </div>
    </div>
  );
};

export default App;
