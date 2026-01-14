
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Dumbbell, User, Settings, Calendar,
  Flame, Activity, Trophy, Clock,
  Zap, Play, ShieldCheck, ChevronLeft, Send, X,
  LayoutList, Check, HeartPulse, BarChart3, Droplets, Utensils,
  Scale, Ruler, Users, TrendingUp, MoreVertical, Plus,
  Target, Timer, BookOpen, Layers, AlertCircle, Search
} from 'lucide-react';
import { 
  Language, UserProfile, DayPlan, UserRole, PresetWorkout, Gender, ActivityLevel, FitnessGoal, ExperienceLevel, CustomWorkout, Exercise
} from './types';
import { translations } from './translations';
import { EXERCISE_DATABASE, PRESET_WORKOUTS } from './presets';
import { EXERCISE_LIBRARY } from './data/exercises';
import { getAIFeedback } from './services/gemini';
import { WorkoutSummary } from './components/WorkoutSummary';
import { calculateDailyCalorieTarget, calculateWaterGoal } from './utils/metrics';
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
    if (!profile) return { target: 0, labelKey: 'health', water: 0 };
    const calTarget = calculateDailyCalorieTarget(profile);
    return {
      target: calTarget.target,
      labelKey: calTarget.labelKey,
      water: calculateWaterGoal(profile.weight)
    };
  }, [profile]);

  if (!profile) return <Onboarding lang={lang} setLang={setLang} onComplete={saveProfile} />;

  const streak = profile.completedDays.length;

  const handleDayToggle = (days: string[]) => {
    const newSchedule = applyTrainingDaysSelection(profile, days);
    saveProfile({ ...profile, trainingDays: days, customSchedule: newSchedule });
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
        <div className="flex items-center gap-2">
          <Dumbbell className="text-indigo-500" />
          <h1 className="font-black text-lg tracking-tighter italic">MY FIT ROUT</h1>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setView('b2b')} className="p-2 bg-slate-700 rounded-lg text-slate-400 hover:text-indigo-400"><BarChart3 size={18}/></button>
          <button onClick={cycleLang} className="bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-lg text-xs font-black uppercase">{lang}</button>
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
              <div className="relative group">
                <MetricBox icon={Utensils} label={t.metrics[metrics.labelKey] || "Target"} value={`${metrics.target}kcal`} color="text-orange-400" />
                <div className="absolute top-full left-0 right-0 pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                   <div className="bg-slate-800 p-2 rounded-xl text-[8px] font-black text-indigo-300 border border-slate-700 shadow-xl">{t.plan.hint}</div>
                </div>
              </div>
            </div>

            <section className="bg-slate-800 p-6 rounded-[35px] border border-slate-700/50">
               <h3 className="font-black text-sm uppercase tracking-widest mb-4 flex items-center gap-2 text-slate-400"><Clock size={16}/> {lang === 'PT' ? 'HOJE' : 'TODAY'}</h3>
               {profile.customSchedule[getTodayKey()]?.type === 'WORKOUT' ? (
                 <button onClick={() => {
                    const dayKey = getTodayKey();
                    const dayPlan = profile.customSchedule[dayKey];
                    const workout = resolveWorkout(dayPlan);
                    if (workout) {
                      setSelectedWorkout(workout);
                      setView('workout_summary');
                    } else {
                      alert(lang === 'PT' ? "Treino não encontrado para hoje." : "Workout not found for today.");
                    }
                 }} className="w-full bg-indigo-600 hover:bg-indigo-500 p-5 rounded-2xl flex justify-between items-center shadow-lg transition-colors group">
                    <span className="font-black">Start Routine</span>
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
            <h2 className="text-2xl font-black">{t.plan.title}</h2>
            
            <TrainingDaysSelector 
              lang={lang} 
              selectedDays={profile.trainingDays || []} 
              onChange={handleDayToggle} 
            />

            <div className="space-y-3">
              {DAYS.map(day => (
                <div key={day} className="bg-slate-800 p-5 rounded-3xl border border-slate-700/50 flex justify-between items-center group">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center font-black text-[10px] uppercase text-indigo-400">{t[day]?.slice(0,3)}</div>
                      <div>
                         <p className="font-black text-sm">
                           {profile.customSchedule[day]?.type === 'REST' 
                             ? t.plan.rest 
                             : resolveWorkout(profile.customSchedule[day])?.title || (lang === 'PT' ? "Treino não definido" : "Undefined Workout")
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
                            {p.title}
                         </button>
                       ))}

                       <h4 className="text-[10px] font-black uppercase opacity-40 px-2 mt-4">Custom</h4>
                       {profile.customWorkouts.map(w => (
                         <button key={w.id} onClick={() => {
                            const newSched = { ...profile.customSchedule, [editingDay as string]: { type: 'WORKOUT', workoutSource: 'CUSTOM', customWorkoutId: w.id } as DayPlan };
                            saveProfile({ ...profile, customSchedule: newSched });
                            setEditingDay(null);
                         }} className="w-full bg-indigo-500/10 p-4 rounded-2xl text-left font-black border-2 border-transparent hover:border-indigo-500 transition-all">
                            {w.title}
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

        {view === 'library' && (
          <WorkoutLibrary 
            lang={lang} 
            onAddExercise={() => {
              setShowBuilder(true);
            }} 
          />
        )}

        {view === 'workout_summary' && selectedWorkout && (
          <div className="space-y-4">
            <button onClick={() => setView('catalog')} className="p-3 bg-slate-800 rounded-2xl border border-slate-700 flex items-center gap-2 font-black text-xs opacity-60"><ChevronLeft size={16}/> BACK</button>
            {'mainBlockIds' in selectedWorkout ? (
              <WorkoutSummary 
                workout={selectedWorkout as PresetWorkout} 
                lang={lang} 
                onStart={() => setView('workout_active')} 
              />
            ) : (
              <div className="p-10 bg-slate-800 rounded-[40px] text-center space-y-4">
                 <Layers size={48} className="mx-auto text-indigo-400" />
                 <h2 className="text-2xl font-black">{selectedWorkout.title}</h2>
                 <p className="opacity-50 text-sm">Custom workout ready for action.</p>
                 <button onClick={() => setView('workout_active')} className="w-full bg-indigo-600 py-4 rounded-2xl font-black shadow-xl">START CUSTOM WORKOUT</button>
              </div>
            )}
          </div>
        )}

        {view === 'workout_active' && selectedWorkout && (
          <div className="space-y-8 animate-in slide-in-from-right-6 pb-24">
             <header className="flex justify-between items-center">
                <h3 className="font-black text-xl italic text-indigo-400 truncate max-w-[70%]">{selectedWorkout.title}</h3>
                <Timer className="text-indigo-500 animate-pulse" />
             </header>
             <div className="space-y-8">
                {('mainBlockIds' in selectedWorkout ? selectedWorkout.mainBlockIds : selectedWorkout.items.map(i => i.exerciseId)).map(id => {
                  const ex = EXERCISE_DATABASE.find(e => e.id === id) || EXERCISE_LIBRARY.find(e => e.id === id);
                  if (!ex) return (
                    <div key={id} className="bg-slate-800 p-8 rounded-[45px] border border-rose-500/30 flex items-center gap-4">
                      <AlertCircle className="text-rose-500" />
                      <p className="text-xs font-black opacity-60">EXERCISE DATA MISSING (ID: {id})</p>
                    </div>
                  );
                  return (
                    <div key={id} className="bg-slate-800 p-8 rounded-[45px] border border-slate-700/50 space-y-6 shadow-xl">
                       <div className="flex justify-between items-start">
                          <div className="space-y-1">
                            <h4 className="text-2xl font-black leading-tight">{typeof ex.name === 'string' ? ex.name : ex.name[lang]}</h4>
                            <div className="flex gap-2">
                               <span className="text-[10px] font-black uppercase bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-full">{ex.muscleGroup}</span>
                               <span className="text-[10px] font-black uppercase bg-slate-700 text-slate-400 px-3 py-1 rounded-full">{ex.equipment}</span>
                            </div>
                          </div>
                          <div className="bg-indigo-600 px-4 py-2 rounded-2xl font-black text-lg shadow-lg">
                            {('items' in selectedWorkout) 
                              ? selectedWorkout.items.find(i => i.exerciseId === id)?.sets + " x " + selectedWorkout.items.find(i => i.exerciseId === id)?.reps 
                              : ex.sets + " x " + ex.reps
                            }
                          </div>
                       </div>
                       <div className="aspect-video bg-black rounded-3xl overflow-hidden border border-slate-700 shadow-inner group relative">
                          <iframe className="w-full h-full opacity-80" src={`https://www.youtube.com/embed/${ex.videoUrl}`} title="Exercise Video" />
                       </div>
                       <div className="space-y-4">
                          <div className="p-5 bg-indigo-500/5 rounded-3xl border border-indigo-500/10 space-y-3">
                            <p className="text-xs font-black uppercase tracking-widest text-indigo-400 flex items-center gap-2"><ShieldCheck size={16}/> {t.safetyNotes}</p>
                            <p className="text-sm font-medium opacity-80 leading-relaxed italic">{ex.safetyNotes || "Focus on control and breathing."}</p>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                             {ex.executionTips.map((tip, idx) => (
                               <div key={idx} className="bg-slate-700/30 p-3 rounded-2xl text-[10px] font-black flex items-center gap-2"><Check size={12} className="text-indigo-400"/> {tip}</div>
                             ))}
                          </div>
                       </div>
                    </div>
                  );
                })}
             </div>
             <button onClick={() => {
                const today = new Date().toISOString().split('T')[0];
                if (profile && !profile.completedDays.includes(today)) {
                  saveProfile({ ...profile, completedDays: [...profile.completedDays, today] });
                }
                setView('home');
             }} className="fixed bottom-28 left-5 right-5 max-w-md mx-auto bg-green-500 hover:bg-green-400 py-6 rounded-3xl font-black text-2xl shadow-[0_10px_40px_-10px_rgba(34,197,94,0.5)] active:scale-95 transition-all">
                FINISH SESSION
             </button>
          </div>
        )}

        {view === 'vital' && (
          <div className="space-y-6 animate-in fade-in">
             <h2 className="text-2xl font-black">{t.aiAssistant}</h2>
             <section className="bg-slate-800 p-6 rounded-[35px] border border-slate-700/50 flex flex-col h-[65vh] shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                   <div className="w-14 h-14 bg-indigo-500 rounded-3xl flex items-center justify-center shadow-lg rotate-3"><ShieldCheck className="text-white" size={32} /></div>
                   <div>
                      <p className="font-black text-lg">Vital AI Coach</p>
                      <p className="text-[10px] font-black uppercase opacity-40 tracking-widest flex items-center gap-1"><Activity size={10}/> Technical Analysis Active</p>
                   </div>
                </div>
                <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2 custom-scroll text-sm font-medium">
                   <div className="bg-indigo-500/5 p-5 rounded-3xl border-l-4 border-indigo-500 text-indigo-100/80 leading-relaxed">
                      {lang === 'PT' ? `Olá ${profile.name}. Como posso te ajudar?` : `Hello ${profile.name}. How can I help?`}
                   </div>
                   {aiResp && <div className="bg-slate-700 p-5 rounded-[30px] rounded-tl-none shadow-lg whitespace-pre-wrap leading-relaxed border border-slate-600/30">{aiResp}</div>}
                   {aiLoading && <div className="animate-pulse text-indigo-400 font-black text-[10px] uppercase flex items-center gap-2 px-2"><Activity size={12}/> Analyzing bio-data...</div>}
                </div>
                <div className="flex gap-2">
                   <input 
                    placeholder={t.askAi}
                    className="flex-1 bg-slate-900 border border-slate-700 p-5 rounded-2xl outline-none focus:border-indigo-500 font-bold text-sm"
                    onKeyDown={async (e) => {
                      if (e.key === 'Enter') {
                        setAiLoading(true);
                        const val = (e.target as HTMLInputElement).value;
                        (e.target as HTMLInputElement).value = '';
                        const res = await getAIFeedback(val, profile, lang);
                        setAiResp(res);
                        setAiLoading(false);
                      }
                    }}
                   />
                   <button className="bg-indigo-600 p-5 rounded-2xl shadow-lg active:scale-90 transition-all hover:bg-indigo-500"><Send size={20}/></button>
                </div>
             </section>
          </div>
        )}

        {view === 'me' && (
          <div className="space-y-6 animate-in slide-in-from-right-6">
            <h2 className="text-2xl font-black">{t.profile.title}</h2>
            <div className="bg-slate-800 p-10 rounded-[45px] text-center border border-slate-700/50 shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1.5 bg-indigo-500"></div>
               <div className="w-24 h-24 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-slate-700 shadow-inner"><User size={48} className="text-indigo-500"/></div>
               <h3 className="text-3xl font-black mb-1">{profile.name}</h3>
               <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400 bg-indigo-500/10 inline-block px-3 py-1 rounded-full">{profile.level} ATHLETE • {profile.goal}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
               <MetricCard icon={Scale} label={t.profile.weight} value={`${profile.weight}kg`} />
               <MetricCard icon={Ruler} label={t.profile.height} value={`${profile.height}cm`} />
               <MetricCard icon={Calendar} label={t.profile.age} value={`${profile.age}y`} />
               <MetricCard icon={Activity} label={t.profile.bmr} value={`${Math.round(metrics.target)}kcal`} />
               <MetricCard icon={Target} label={t.profile.targetKcal} value={`${metrics.target}kcal`} />
               <MetricCard icon={Droplets} label={t.profile.water} value={`${metrics.water}ml`} />
            </div>
            <button onClick={() => { localStorage.clear(); window.location.reload(); }} className="w-full bg-rose-500/10 text-rose-500 py-5 rounded-3xl font-black text-xs uppercase border border-rose-500/20 hover:bg-rose-500/20 transition-all">Clear Profile & Reset</button>
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

      {showBuilder && (
        <WorkoutBuilder 
          lang={lang} 
          onSave={handleSaveCustomWorkout} 
          onClose={() => setShowBuilder(false)} 
        />
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

const MetricCard = ({ icon: Icon, label, value }: any) => (
  <div className="bg-slate-700/30 p-5 rounded-3xl border border-slate-700/30 flex flex-col items-center text-center group hover:bg-slate-700/50 transition-all">
    <Icon className="text-indigo-400 mb-2 group-hover:rotate-12 transition-transform" size={20}/>
    <span className="text-[9px] font-black uppercase opacity-40 tracking-widest mb-1">{label}</span>
    <span className="text-sm font-black">{value}</span>
  </div>
);

const Onboarding: React.FC<any> = ({ lang, setLang, onComplete }) => {
  const [step, setStep] = useState(0);
  const [fd, setFd] = useState<any>({ name: '', age: 30, weight: 70, height: 170, gender: Gender.MALE, activityLevel: ActivityLevel.MODERATE, goal: FitnessGoal.HEALTH, level: ExperienceLevel.BEGINNER });

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
            <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden shadow-inner"><div className="h-full bg-indigo-500 transition-all duration-500" style={{ width: `${(step/4)*100}%` }} /></div>
            <p className="text-center text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">Step {step} of 4</p>
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
               <h2 className="text-4xl font-black">Activity Level</h2>
               <div className="space-y-3 max-h-[45vh] overflow-y-auto pr-2 custom-scroll">
                  {[ActivityLevel.SEDENTARY, ActivityLevel.LIGHT, ActivityLevel.MODERATE, ActivityLevel.HEAVY, ActivityLevel.ATHLETE].map(l => (
                    <button key={l} onClick={() => setFd({...fd, activityLevel: l})} className={`w-full p-6 rounded-3xl border-2 text-left font-black flex justify-between items-center transition-all ${fd.activityLevel === l ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400 scale-[1.02]' : 'border-slate-700 text-slate-500 hover:border-slate-600'}`}>
                       <span>{l}</span>
                       {fd.activityLevel === l && <Check size={20} className="bg-indigo-500 text-white rounded-full p-1"/>}
                    </button>
                  ))}
               </div>
            </div>
          )}
          {step === 4 && (
            <div className="space-y-8 animate-in slide-in-from-right text-white">
               <h2 className="text-4xl font-black">Main Goal</h2>
               <div className="space-y-3">
                  {[FitnessGoal.HEALTH, FitnessGoal.GAIN, FitnessGoal.LOSE, FitnessGoal.STRENGTHEN].map(g => (
                    <button key={g} onClick={() => setFd({...fd, goal: g})} className={`w-full p-6 rounded-3xl border-2 text-left font-black flex justify-between items-center transition-all ${fd.goal === g ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400 scale-[1.02]' : 'border-slate-700 text-slate-500 hover:border-slate-600'}`}>
                       <span>{g}</span>
                       {fd.goal === g && <Check size={20} className="bg-indigo-500 text-white rounded-full p-1"/>}
                    </button>
                  ))}
               </div>
            </div>
          )}
       </div>
       <div className="flex gap-4 max-w-md mx-auto w-full mt-10">
          {step > 1 && <button onClick={() => setStep(step - 1)} className="p-6 border-2 border-slate-700 rounded-[30px] text-white hover:bg-white/5 transition-all"><ChevronLeft/></button>}
          <button onClick={() => {
            if (step < 4) setStep(step + 1);
            else {
              const profileBase = { ...fd, language: lang, role: UserRole.MEMBER, trialStartDate: new Date().toISOString(), completedDays: [], feedbackHistory: [], customWorkouts: [], trainingDays: ['mon', 'wed', 'fri'], customSchedule: {} };
              const initialSchedule = applyTrainingDaysSelection(profileBase as any, ['mon', 'wed', 'fri']);
              onComplete({ ...profileBase, customSchedule: initialSchedule });
            }
          }} className="flex-1 bg-indigo-600 text-white py-6 rounded-[30px] font-black text-2xl shadow-xl active:scale-95 transition-all">
            {step < 4 ? "PRÓXIMO" : "FINALIZAR"}
          </button>
       </div>
    </div>
  );
};

export default App;
