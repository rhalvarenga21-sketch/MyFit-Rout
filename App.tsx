
import React, { useState, useMemo, useEffect } from 'react';
import { 
  Dumbbell, User, Flame, Trophy, Clock,
  Play, ShieldCheck, ChevronLeft, Send, X,
  LayoutList, Check, HeartPulse, Droplets, Utensils,
  Scale, Target, Timer, BookOpen, Layers, AlertCircle, Save, Edit3
} from 'lucide-react';
import { 
  Language, UserProfile, DayPlan, UserRole, PresetWorkout, Gender, ActivityLevel, FitnessGoal, ExperienceLevel, CustomWorkout, SplitStyle
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

const DAYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const;

const App: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('myfitrout_v7_profile');
    try {
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [lang, setLang] = useState<Language>(profile?.language || Language.PT);
  const [view, setView] = useState<'home' | 'catalog' | 'vital' | 'me' | 'workout_summary' | 'workout_active' | 'exercises'>('home');
  const [selectedWorkout, setSelectedWorkout] = useState<PresetWorkout | CustomWorkout | null>(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [smartStartModal, setSmartStartModal] = useState<{ preset: PresetWorkout } | null>(null);
  const [vitalQuery, setVitalQuery] = useState('');
  const [vitalResp, setVitalResp] = useState('');
  const [vitalLoading, setVitalLoading] = useState(false);

  // Form states for profile editing
  const [editName, setEditName] = useState('');
  const [editWeight, setEditWeight] = useState(0);
  const [editHeight, setEditHeight] = useState(0);
  const [editAge, setEditAge] = useState(0);

  const t = translations[lang] as any;

  useEffect(() => {
    if (profile) {
      setEditName(profile.name);
      setEditWeight(profile.weight);
      setEditHeight(profile.height);
      setEditAge(profile.age);
    }
  }, [profile, isEditingProfile]);

  const saveProfile = (newP: UserProfile) => {
    setProfile(newP);
    localStorage.setItem('myfitrout_v7_profile', JSON.stringify(newP));
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

  const handleVitalAsk = async () => {
    if (!vitalQuery || !profile) return;
    setVitalLoading(true);
    setVitalResp('');
    const resp = await getAIFeedback(vitalQuery, profile, lang);
    setVitalResp(resp);
    setVitalLoading(false);
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

  const updateProfileData = () => {
    if (!profile) return;
    const updated = {
      ...profile,
      name: editName,
      weight: editWeight,
      height: editHeight,
      age: editAge
    };
    saveProfile(updated);
    setIsEditingProfile(false);
  };

  if (!profile) return <Onboarding lang={lang} setLang={setLang} onComplete={saveProfile} />;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 font-sans pb-24 selection:bg-indigo-500/30">
      <header className="px-6 py-5 bg-slate-800 border-b border-slate-700/50 flex justify-between items-center sticky top-0 z-40">
        <div className="flex items-center gap-2" onClick={() => setView('home')}>
          <Dumbbell className="text-indigo-500" />
          <h1 className="font-black text-lg tracking-tighter italic cursor-pointer uppercase">Westwood Pro</h1>
        </div>
        <div className="flex gap-2">
          <button onClick={() => {
            const nextLang = lang === Language.PT ? Language.EN : lang === Language.EN ? Language.ES : Language.PT;
            setLang(nextLang);
            saveProfile({ ...profile, language: nextLang });
          }} className="bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-lg text-xs font-black uppercase transition-all">{lang}</button>
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
          </div>
        )}

        {view === 'vital' && (
          <div className="space-y-6 animate-in slide-in-from-bottom-6">
            <section className="bg-slate-800 p-8 rounded-[40px] border border-indigo-500/30 shadow-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4 opacity-5"><HeartPulse size={80}/></div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-indigo-500/10 rounded-2xl text-indigo-400"><HeartPulse size={28}/></div>
                <div>
                  <h2 className="text-xl font-black uppercase italic tracking-tighter">{t.aiAssistant}</h2>
                  <p className="text-[10px] font-black opacity-40 uppercase tracking-widest">{t.askAi}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex gap-2">
                  <input 
                    value={vitalQuery}
                    onChange={e => setVitalQuery(e.target.value)}
                    onKeyPress={e => e.key === 'Enter' && handleVitalAsk()}
                    placeholder="Dúvida técnica ou de saúde..."
                    className="flex-1 bg-slate-900 border border-slate-700 p-4 rounded-2xl outline-none focus:border-indigo-500 font-medium text-sm"
                  />
                  <button 
                    onClick={handleVitalAsk}
                    disabled={vitalLoading}
                    className="p-4 bg-indigo-600 rounded-2xl text-white disabled:opacity-50 active:scale-95 transition-all shadow-lg shadow-indigo-600/20"
                  >
                    {vitalLoading ? <Clock className="animate-spin" size={20}/> : <Send size={20}/>}
                  </button>
                </div>
                {vitalResp && (
                  <div className="p-5 bg-slate-900/50 rounded-3xl border border-slate-700/50 animate-in zoom-in-95 duration-200">
                    <p className="text-sm leading-relaxed text-slate-300 whitespace-pre-wrap">{vitalResp}</p>
                  </div>
                )}
              </div>
            </section>

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

        {view === 'exercises' && (
          <div className="space-y-4">
             <button onClick={() => setView('vital')} className="p-3 bg-slate-800 rounded-2xl border border-slate-700 flex items-center gap-2 font-black text-xs opacity-60"><ChevronLeft size={16}/> VOLTAR</button>
             <WorkoutLibrary lang={lang} onAddExercise={(ex) => console.log('Added:', ex.name[lang])} />
          </div>
        )}

        {view === 'catalog' && (
          <div className="space-y-4">
             <button onClick={() => setView('vital')} className="p-3 bg-slate-800 rounded-2xl border border-slate-700 flex items-center gap-2 font-black text-xs opacity-60"><ChevronLeft size={16}/> VOLTAR</button>
             <WorkoutCatalog 
               lang={lang} 
               profile={profile}
               onSelect={(w) => { setSelectedWorkout(w); setView('workout_summary'); }}
               onAssign={(w, day) => {
                 const updated = { ...profile, customSchedule: { ...profile.customSchedule, [day]: { type: 'WORKOUT', workoutSource: 'PRESET', presetWorkoutId: w.id } as DayPlan } };
                 saveProfile(updated);
               }}
             />
          </div>
        )}

        {view === 'workout_summary' && selectedWorkout && (
          <div className="space-y-4">
            <button onClick={() => setView('home')} className="p-3 bg-slate-800 rounded-2xl border border-slate-700 flex items-center gap-2 font-black text-xs opacity-60"><ChevronLeft size={16}/> VOLTAR</button>
            <WorkoutSummary workout={selectedWorkout as PresetWorkout} lang={lang} onStart={() => setView('workout_active')} />
          </div>
        )}

        {view === 'workout_active' && selectedWorkout && (
          <div className="space-y-8 animate-in slide-in-from-right-6 pb-24">
             <header className="flex justify-between items-center">
                <h3 className="font-black text-xl italic text-indigo-400 truncate max-w-[70%]">
                  {('title' in selectedWorkout) ? (selectedWorkout as PresetWorkout).title[lang] : (selectedWorkout as any).title}
                </h3>
                <Timer className="text-indigo-500 animate-pulse" />
             </header>
             <div className="space-y-8">
                {(selectedWorkout as PresetWorkout).mainBlockIds.map(id => {
                  const ex = EXERCISE_LIBRARY.find(e => e.id === id);
                  if (!ex) return null;
                  return (
                    <div key={id} className="bg-slate-800 p-8 rounded-[45px] border border-slate-700/50 space-y-6 shadow-xl">
                       <h4 className="text-2xl font-black leading-tight">{ex.name[lang]}</h4>
                       <div className="aspect-video bg-black rounded-3xl overflow-hidden border border-slate-700 shadow-inner">
                          <iframe className="w-full h-full opacity-80" src={`https://www.youtube.com/embed/${ex.videoUrl}`} title="Video" />
                       </div>
                       <div className="p-5 bg-indigo-500/5 rounded-3xl border border-indigo-500/10 space-y-3">
                          <p className="text-xs font-black uppercase tracking-widest text-indigo-400 flex items-center gap-2"><ShieldCheck size={16}/> {t.safetyNotes}</p>
                          <p className="text-sm font-medium opacity-80 leading-relaxed italic">{ex.safetyNotes}</p>
                       </div>
                    </div>
                  );
                })}
             </div>
             <button onClick={() => setView('home')} className="fixed bottom-28 left-5 right-5 max-w-md mx-auto bg-green-500 hover:bg-green-400 py-6 rounded-3xl font-black text-2xl shadow-xl transition-all">FINALIZAR TREINO</button>
          </div>
        )}

        {view === 'me' && (
          <div className="space-y-6 animate-in slide-in-from-right-6">
            <div className="flex justify-between items-center px-1">
              <h2 className="text-2xl font-black uppercase italic tracking-tighter">{t.profile.title}</h2>
              <button onClick={() => setIsEditingProfile(!isEditingProfile)} className="p-3 bg-indigo-500/10 rounded-2xl text-indigo-400 transition-all">
                {isEditingProfile ? <X size={16}/> : <Edit3 size={16}/>}
              </button>
            </div>

            {isEditingProfile ? (
              <div className="bg-slate-800 p-8 rounded-[40px] border border-indigo-500/30 space-y-6 shadow-2xl">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-1">Nome</label>
                    <input value={editName} onChange={e => setEditName(e.target.value)} className="w-full bg-slate-900 border border-slate-700 p-4 rounded-2xl outline-none focus:border-indigo-500 font-bold" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-1">{t.profile.weight}</label>
                      <input type="number" value={editWeight} onChange={e => setEditWeight(parseFloat(e.target.value))} className="w-full bg-slate-900 border border-slate-700 p-4 rounded-2xl outline-none focus:border-indigo-500 font-bold" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-1">{t.profile.height}</label>
                      <input type="number" value={editHeight} onChange={e => setEditHeight(parseFloat(e.target.value))} className="w-full bg-slate-900 border border-slate-700 p-4 rounded-2xl outline-none focus:border-indigo-500 font-bold" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-1">{t.profile.age}</label>
                    <input type="number" value={editAge} onChange={e => setEditAge(parseInt(e.target.value))} className="w-full bg-slate-900 border border-slate-700 p-4 rounded-2xl outline-none focus:border-indigo-500 font-bold" />
                  </div>
                </div>
                <button onClick={updateProfileData} className="w-full bg-indigo-600 py-6 rounded-3xl font-black uppercase tracking-widest shadow-xl flex items-center justify-center gap-2">
                  <Save size={20}/> {t.profile.save}
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-slate-800 p-10 rounded-[45px] text-center border border-slate-700/50 shadow-2xl relative overflow-hidden group">
                   <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity"><User size={80}/></div>
                   <h3 className="text-3xl font-black mb-1 italic uppercase tracking-tighter">{profile.name}</h3>
                   <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400 bg-indigo-500/10 inline-block px-3 py-1 rounded-full">{t.profile.levels[profile.level]} • {t.profile.goals[profile.goal]}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                   <MetricCard icon={Scale} label={t.profile.weight} value={`${profile.weight}kg`} />
                   <MetricCard icon={Target} label={t.metrics.label} value={`${metrics.target}kcal`} hint={t.metrics.tdeeHint} />
                </div>

                <div className="bg-slate-800 p-6 rounded-[35px] border border-slate-700/50 grid grid-cols-2 gap-4 divide-x divide-slate-700/30">
                  <div className="text-center px-2">
                    <p className="text-[10px] font-black uppercase opacity-40 tracking-widest mb-1">{t.profile.bmr}</p>
                    <p className="text-xl font-black text-indigo-400">{metrics.bmr} <span className="text-[8px] uppercase">kcal</span></p>
                  </div>
                  <div className="text-center px-2">
                    <p className="text-[10px] font-black uppercase opacity-40 tracking-widest mb-1">{t.profile.tdee}</p>
                    <p className="text-xl font-black text-indigo-400">{metrics.tdee} <span className="text-[8px] uppercase">kcal</span></p>
                  </div>
                </div>
                
                <div className="bg-slate-800 p-6 rounded-[35px] border border-slate-700/50">
                  <h3 className="font-black text-xs uppercase tracking-widest mb-4 flex items-center gap-2 text-slate-400"><LayoutList size={16}/> DIAS DE TREINO</h3>
                  <div className="flex gap-2 justify-center">
                    {DAYS.map(d => (
                      <div key={d} className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-[10px] uppercase ${profile.trainingDays.includes(d) ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-600'}`}>
                        {d.charAt(0)}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-slate-800/90 backdrop-blur-xl border-t border-slate-700/30 px-8 py-5 flex justify-between items-center max-w-md mx-auto z-40 rounded-t-[45px] shadow-2xl">
        <NavBtn icon={Flame} label="Home" active={view === 'home'} onClick={() => setView('home')} />
        <NavBtn icon={HeartPulse} label="Vital" active={view === 'vital' || view === 'catalog' || view === 'exercises'} onClick={() => setView('vital')} />
        <NavBtn icon={User} label="Perfil" active={view === 'me'} onClick={() => setView('me')} />
      </nav>

      {smartStartModal && (
        <div className="fixed inset-0 z-[60] bg-slate-900/95 backdrop-blur-md flex items-end p-6">
           <div className="w-full bg-slate-800 p-10 rounded-[45px] border border-slate-700 space-y-8 animate-in slide-in-from-bottom">
              <h3 className="text-3xl font-black leading-tight text-white italic uppercase tracking-tighter">{t.smartStart.isRest}</h3>
              <div className="grid grid-cols-1 gap-4">
                 <button onClick={() => setSmartStartModal(null)} className="w-full bg-slate-700 p-6 rounded-3xl font-black uppercase text-slate-300">{t.smartStart.keepRest}</button>
                 <button onClick={() => { 
                    setSelectedWorkout(smartStartModal.preset); 
                    setView('workout_summary'); 
                    setSmartStartModal(null); 
                  }} className="w-full bg-indigo-600 p-6 rounded-3xl font-black uppercase text-xl shadow-xl text-white">
                    {t.smartStart.startAnyway}
                  </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

const NavBtn = ({ icon: Icon, label, active, onClick }: any) => (
  <button onClick={onClick} className={`flex flex-col items-center gap-1.5 transition-all ${active ? 'text-indigo-400 scale-110' : 'text-slate-500 opacity-60'}`}>
    <div className={active ? 'bg-indigo-500/10 p-2.5 rounded-2xl' : 'p-2.5'}><Icon size={24} /></div>
    <span className="text-[9px] font-black uppercase tracking-widest">{label}</span>
  </button>
);

const MetricBox = ({ icon: Icon, label, value, color }: any) => (
  <div className="bg-slate-800 p-6 rounded-[35px] border border-slate-700/50 flex flex-col items-center text-center shadow-lg group hover:border-indigo-500/30 transition-all">
    <div className="w-10 h-10 rounded-2xl bg-slate-900 flex items-center justify-center mb-3 transition-transform"><Icon className={color} size={20}/></div>
    <p className="text-[9px] font-black uppercase opacity-40 tracking-widest mb-1">{label}</p>
    <p className="text-xl font-black text-white">{value}</p>
  </div>
);

const MetricCard = ({ icon: Icon, label, value, hint }: any) => (
  <div className="bg-slate-700/30 p-5 rounded-3xl border border-slate-700/30 flex flex-col items-center text-center group hover:bg-slate-700/50 transition-all relative overflow-hidden">
    <Icon className="text-indigo-400 mb-2 transition-transform" size={20}/>
    <span className="text-[9px] font-black uppercase opacity-40 tracking-widest mb-1">{label}</span>
    <span className="text-sm font-black text-white">{value}</span>
    {hint && <span className="absolute bottom-1 right-2 text-[6px] font-black opacity-10 uppercase">{hint}</span>}
  </div>
);

const Onboarding: React.FC<any> = ({ lang, setLang, onComplete }) => {
  const [step, setStep] = useState(1);
  const [fd, setFd] = useState<any>({ 
    name: '', age: 30, weight: 70, height: 170, gender: Gender.MALE, activityLevel: ActivityLevel.MODERATE, 
    goal: FitnessGoal.HEALTH, level: ExperienceLevel.BEGINNER, trainingDays: ['mon', 'wed', 'fri'], splitStyle: SplitStyle.FULL_BODY_MIX 
  });

  const t = translations[lang] as any;

  return (
    <div className="min-h-screen bg-slate-900 p-10 flex flex-col items-center justify-center">
       <div className="flex-1 space-y-12 max-w-md mx-auto w-full flex flex-col justify-center">
          {step === 1 && (
            <div className="space-y-8 animate-in slide-in-from-right text-white">
               <h2 className="text-4xl font-black leading-tight tracking-tighter italic uppercase">Qual seu nome?</h2>
               <input placeholder="Ex: João Silva" className="w-full bg-slate-800 p-6 rounded-3xl border-2 border-slate-700 font-bold outline-none focus:border-indigo-500 shadow-xl" value={fd.name} onChange={e => setFd({...fd, name: e.target.value})} />
            </div>
          )}
          {step === 2 && (
            <div className="space-y-8 animate-in slide-in-from-right text-white">
               <h2 className="text-4xl font-black tracking-tighter italic uppercase">Qual seu objetivo?</h2>
               <div className="grid grid-cols-1 gap-3">
                  {Object.values(FitnessGoal).map(g => (
                    <button key={g} onClick={() => setFd({...fd, goal: g})} className={`w-full p-6 rounded-3xl border-2 text-left font-black transition-all ${fd.goal === g ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400 scale-[1.02]' : 'border-slate-700 text-slate-500'}`}>
                       {t.profile.goals[g]}
                    </button>
                  ))}
               </div>
            </div>
          )}
          {step === 3 && (
            <div className="space-y-8 animate-in slide-in-from-right text-white">
               <h2 className="text-4xl font-black tracking-tighter italic uppercase">Dias de Treino</h2>
               <div className="grid grid-cols-7 gap-2">
                  {['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].map(day => (
                    <button key={day} onClick={() => setFd({...fd, trainingDays: fd.trainingDays.includes(day) ? fd.trainingDays.filter((d:any)=>d!==day) : [...fd.trainingDays, day]})} className={`p-4 rounded-xl font-black text-xs transition-all ${fd.trainingDays.includes(day) ? 'bg-indigo-600 text-white shadow-lg scale-110' : 'bg-slate-700 text-slate-500'}`}>
                      {day.charAt(0).toUpperCase()}
                    </button>
                  ))}
               </div>
            </div>
          )}
       </div>
       <div className="flex gap-4 max-w-md mx-auto w-full mt-10">
          <button onClick={() => {
            if (step < 3) setStep(step + 1);
            else {
              const profileBase: UserProfile = { 
                ...fd, language: lang, role: UserRole.MEMBER, trialStartDate: new Date().toISOString(), 
                completedDays: [], customWorkouts: [], customSchedule: {}, hasPass: true 
              };
              const initialSchedule = buildScheduleFromDays(profileBase, fd.trainingDays);
              onComplete({ ...profileBase, customSchedule: initialSchedule });
            }
          }} className="flex-1 bg-indigo-600 text-white py-6 rounded-3xl font-black text-2xl shadow-xl active:scale-95 transition-all">
            {step < 3 ? "PRÓXIMO" : "FINALIZAR"}
          </button>
       </div>
    </div>
  );
};

export default App;
