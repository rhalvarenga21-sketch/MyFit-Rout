
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Dumbbell, User, Settings, Calendar, CheckCircle2, ChevronRight,
  Flame, Activity, Target, Trophy, Clock, RotateCcw,
  Zap, Play, ShieldCheck, ChevronLeft, Send, Save, X,
  LayoutList, Plus, Trash2, Check, Timer, Moon, Sun, ShoppingCart, Lock,
  HeartPulse, TrendingUp, Fingerprint, Lightbulb, ChevronUp, ChevronDown, 
  Eye, Info, AlertTriangle, Users, BarChart3, GraduationCap
} from 'lucide-react';
import { 
  Language, ExperienceLevel, UserProfile, WorkoutDay, WorkoutFocus, FitnessGoal, 
  Exercise, DayPlan, Theme, UserRole, PresetWorkout, PostWorkoutFeedback 
} from './types';
import { translations } from './translations';
import { getAIFeedback } from './services/gemini';

// --- DATABASE: EXTENDED EXERCISE CATALOG ---
const EXERCISE_CATALOG: Record<string, any[]> = {
  WARMUP: [
    { [Language.EN]: { id: "w1", name: "Cat-Cow", description: "Spinal mobility", safetyNotes: "Move with breath", executionTips: ["Inhale arch", "Exhale round"], commonMistakes: ["Fast movement"] }, common: { muscleGroup: "SPINE", sets: 1, reps: "10", videoUrl: "https://www.youtube.com/embed/uGv_L7m0Y_0" } },
    { [Language.EN]: { id: "w2", name: "World's Greatest Stretch", description: "Full body mobilization", safetyNotes: "Keep back heel high", executionTips: ["Rotate chest", "Elbow to instep"], commonMistakes: ["Rounded back"] }, common: { muscleGroup: "FULL", sets: 1, reps: "5/side", videoUrl: "https://www.youtube.com/embed/T6p7uI7zR_U" } }
  ],
  CHEST: [
    { [Language.EN]: { id: "ch1", name: "Flat Bench Press", description: "Horizontal push", safetyNotes: "Don't bounce bar", executionTips: ["Retract scapula", "Leg drive"], commonMistakes: ["Flaring elbows"] }, common: { muscleGroup: "CHEST", sets: 3, reps: "10", videoUrl: "https://www.youtube.com/embed/rT7DgCr-3pg" } }
  ],
  BACK: [
    { [Language.EN]: { id: "bk1", name: "Lat Pulldown", description: "Vertical pull", safetyNotes: "Don't lean too far back", executionTips: ["Pull with elbows", "Squeeze lats"], commonMistakes: ["Pulling to stomach"] }, common: { muscleGroup: "BACK", sets: 3, reps: "12", videoUrl: "https://www.youtube.com/embed/CAwf7n6Luuc" } }
  ],
  LEGS: [
    { [Language.EN]: { id: "lg1", name: "Goblet Squat", description: "Knee dominant lower body", safetyNotes: "Heels flat on floor", executionTips: ["Chest up", "Elbows to knees"], commonMistakes: ["Butt wink"] }, common: { muscleGroup: "LEGS", sets: 3, reps: "12", videoUrl: "https://www.youtube.com/embed/m0GcZ24pK6k" } }
  ],
  MOBILITY: [
    { [Language.EN]: { id: "m1", name: "90/90 Hip Switches", description: "Hip internal/external rotation", safetyNotes: "Keep spine tall", executionTips: ["90 deg angles", "Push knees down"], commonMistakes: ["Leaning too much"] }, common: { muscleGroup: "HIPS", sets: 2, reps: "10", videoUrl: "https://www.youtube.com/embed/v9C9pE_v9O8" } }
  ]
};

// --- DATABASE: 15 PRESET WORKOUTS ---
const PRESET_WORKOUTS: PresetWorkout[] = [
  { id: "p1", title: "Full Body – Health Foundations", category: "BEGINNER", duration: 60, description: "Focus on movement patterns and joint stability.", warmupIds: ["w1", "w2"], mainBlockIds: ["lg1", "ch1", "bk1"], accessoryIds: ["cr1"], cooldownIds: ["m1"] },
  { id: "p2", title: "Full Body – No Rush / Longevity", category: "LONGEVITY", duration: 75, description: "Controlled tempo for high metabolic health.", warmupIds: ["w1", "w2"], mainBlockIds: ["lg1", "ch1", "bk1"], accessoryIds: ["cr1"], cooldownIds: ["m1"] },
  { id: "p3", title: "Upper Body Complete", category: "STRENGTH", duration: 60, description: "Balanced push and pull volume.", warmupIds: ["w1"], mainBlockIds: ["ch1", "bk1"], accessoryIds: ["ar1"], cooldownIds: ["m1"] },
  { id: "p4", title: "Lower Body Complete", category: "STRENGTH", duration: 60, description: "Leg health and glute activation.", warmupIds: ["w2"], mainBlockIds: ["lg1", "lg2"], accessoryIds: ["gl1"], cooldownIds: ["m1"] },
  { id: "p5", title: "Strength & Longevity", category: "LONGEVITY", duration: 75, description: "Heavy compound movements with safety cues.", warmupIds: ["w1", "w2"], mainBlockIds: ["bk4", "sh1"], accessoryIds: ["m1"], cooldownIds: ["m1"] },
  { id: "p6", title: "Posture & Core Stability", category: "HEALTH", duration: 45, description: "Fix desk worker stiffness.", warmupIds: ["w1"], mainBlockIds: ["bk3", "cr1"], accessoryIds: ["sh3"], cooldownIds: ["m1"] },
  { id: "p7", title: "Fat Loss – Low Impact", category: "WEIGHT_LOSS", duration: 60, description: "High heart rate without joint impact.", warmupIds: ["w2"], mainBlockIds: ["lg1", "ch1", "bk1"], accessoryIds: ["cr1"], cooldownIds: ["m1"] },
  { id: "p8", title: "Cardio Zone 2 + Strength", category: "HEALTH", duration: 75, description: "Aerobic base building.", warmupIds: ["w1"], mainBlockIds: ["bk1", "lg2"], accessoryIds: ["cr1"], cooldownIds: ["m1"] },
  { id: "p9", title: "Upper Push / Pull", category: "STRENGTH", duration: 60, description: "Classic split for focused hypertrophy.", warmupIds: ["w1"], mainBlockIds: ["ch1", "bk1"], accessoryIds: ["ar1"], cooldownIds: ["m1"] },
  { id: "p10", title: "Lower Body & Glutes Focus", category: "QUALITY", duration: 75, description: "Posterior chain priority.", warmupIds: ["w2"], mainBlockIds: ["gl1", "lg1"], accessoryIds: ["lg2"], cooldownIds: ["m1"] },
  { id: "p11", title: "Mobility + Strength Blend", category: "LONGEVITY", duration: 45, description: "Dynamic warm-up with core work.", warmupIds: ["w1", "w2"], mainBlockIds: ["m1", "lg1"], accessoryIds: ["cr1"], cooldownIds: ["m1"] },
  { id: "p12", title: "Senior Friendly Full Body", category: "LONGEVITY", duration: 60, description: "Safe range of motion and balance.", warmupIds: ["w1"], mainBlockIds: ["lg1", "bk1"], accessoryIds: ["bl1"], cooldownIds: ["m1"] },
  { id: "p13", title: "Express Calm Workout", category: "RECOVERY", duration: 45, description: "Short, effective, and low stress.", warmupIds: ["w1"], mainBlockIds: ["ch1", "bk1"], accessoryIds: ["m1"], cooldownIds: ["m1"] },
  { id: "p14", title: "Strength Progression Day", category: "PERFORMANCE", duration: 90, description: "Peak intensity with long recovery.", warmupIds: ["w1", "w2"], mainBlockIds: ["bk4", "ch1"], accessoryIds: ["lg1"], cooldownIds: ["m1"] },
  { id: "p15", title: "Recovery & Movement Session", category: "RECOVERY", duration: 45, description: "Active recovery for off days.", warmupIds: ["w1"], mainBlockIds: ["m1", "w2"], accessoryIds: ["cr1"], cooldownIds: ["m1"] }
];

const getTrialStatus = (startDate: string) => {
  const start = new Date(startDate).getTime();
  const diff = new Date().getTime() - start;
  const daysPassed = Math.floor(diff / (1000 * 60 * 60 * 24));
  return { isExpired: daysPassed >= 7, remaining: Math.max(0, 7 - daysPassed) };
};

const App: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('myfitrout_v2_profile');
    return saved ? JSON.parse(saved) : null;
  });
  const [lang, setLang] = useState<Language>(profile?.language || Language.PT);
  const [theme, setTheme] = useState<Theme>(profile?.theme || 'dark');
  const [view, setView] = useState<'home' | 'workout' | 'presets' | 'ai' | 'profile' | 'feedback' | 'b2b'>('home');
  const [activePreset, setActivePreset] = useState<PresetWorkout | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState('');

  const t = translations[lang] as any;

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  const saveProfile = (newProfile: UserProfile) => {
    setProfile(newProfile);
    localStorage.setItem('myfitrout_v2_profile', JSON.stringify(newProfile));
  };

  const getExerciseById = (id: string): Exercise => {
    for (const group of Object.values(EXERCISE_CATALOG)) {
      const found = group.find(item => item[Language.EN].id === id);
      if (found) return { ...found.common, ...found[Language.EN] };
    }
    return {} as Exercise;
  };

  const handleFinishWorkout = (feedback: PostWorkoutFeedback) => {
    if (!profile) return;
    saveProfile({
      ...profile,
      feedbackHistory: [...(profile.feedbackHistory || []), feedback]
    });
    setView('home');
  };

  if (!profile) return <Onboarding onComplete={saveProfile} lang={lang} setLang={setLang} />;

  const themeClasses = theme === 'dark' ? 'bg-slate-900 text-slate-50' : 'bg-slate-50 text-slate-900';
  const cardClasses = theme === 'dark' ? 'bg-slate-800 border-slate-700 shadow-xl' : 'bg-white border-slate-200 shadow-md';

  return (
    <div className={`min-h-screen ${themeClasses} font-sans pb-24 transition-all`}>
      <header className={`${theme === 'dark' ? 'bg-slate-800' : 'bg-white'} px-6 py-5 sticky top-0 z-30 flex items-center justify-between border-b border-slate-700/30`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg rotate-6"><Dumbbell size={24} /></div>
          <h1 className="font-black text-xl tracking-tighter italic text-indigo-500">My Fit Rout</h1>
        </div>
        <div className="flex items-center gap-2">
          {profile.role !== UserRole.MEMBER && (
            <button onClick={() => setView('b2b')} className="p-2 bg-indigo-500/10 text-indigo-500 rounded-full"><BarChart3 size={20}/></button>
          )}
          <button onClick={() => setView('profile')} className="p-2 border border-slate-500/20 rounded-full"><User size={20}/></button>
        </div>
      </header>

      <main className="max-w-md mx-auto p-5 space-y-6">
        {view === 'home' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <section className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[35px] p-8 text-white relative overflow-hidden shadow-2xl">
              <div className="absolute -top-10 -right-10 opacity-10 rotate-12"><Activity size={200}/></div>
              <p className="text-indigo-100 text-xs font-black uppercase tracking-widest mb-1">{t.welcome}, {profile.name}</p>
              <h2 className="text-3xl font-black mb-6 leading-tight">Ready for your longevity session?</h2>
              <button onClick={() => setView('presets')} className="w-full bg-white text-indigo-700 py-4 rounded-2xl font-black shadow-lg flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all">
                <Play fill="currentColor" size={20}/> {t.presets.toUpperCase()}
              </button>
            </section>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: HeartPulse, label: t.longevity, val: "85%", color: "text-rose-500" },
                { icon: GraduationCap, label: "Knowledge", val: "Level 4", color: "text-amber-500" }
              ].map((item, i) => (
                <div key={i} className={`${cardClasses} p-5 rounded-3xl border flex flex-col items-center text-center`}>
                  <item.icon className={`${item.color} mb-2`} size={24}/>
                  <p className="text-[10px] font-black uppercase opacity-40">{item.label}</p>
                  <p className="text-lg font-black">{item.val}</p>
                </div>
              ))}
            </div>

            <section className={`${cardClasses} p-6 rounded-[35px] border`}>
              <div className="flex items-center gap-2 mb-4">
                <ShieldCheck className="text-indigo-500" size={20}/>
                <h3 className="text-sm font-black uppercase tracking-widest">{t.aiAssistant}</h3>
              </div>
              <p className="text-sm opacity-60 mb-4">{t.askAi}</p>
              <button onClick={() => setView('ai')} className="w-full py-3 bg-indigo-500/10 text-indigo-500 rounded-2xl font-black text-xs uppercase tracking-widest border border-indigo-500/20">Ask Virtual Coach</button>
            </section>
          </div>
        )}

        {view === 'presets' && (
          <div className="space-y-6 animate-in slide-in-from-bottom-6">
            <button onClick={() => setView('home')} className="flex items-center gap-2 text-sm font-bold opacity-60"><ChevronLeft size={18}/> Back</button>
            <h2 className="text-2xl font-black">{t.presets}</h2>
            <div className="space-y-4">
              {PRESET_WORKOUTS.map(preset => (
                <button 
                  key={preset.id} 
                  onClick={() => { setActivePreset(preset); setView('workout'); }}
                  className={`${cardClasses} w-full text-left p-6 rounded-[30px] border flex items-center justify-between group hover:border-indigo-500 transition-all`}
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">{preset.duration} MIN • {preset.category}</span>
                    <h4 className="text-lg font-black leading-tight">{preset.title}</h4>
                    <p className="text-xs opacity-50 font-medium">{preset.description}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-500 group-hover:bg-indigo-500 group-hover:text-white transition-all"><Play size={20}/></div>
                </button>
              ))}
            </div>
          </div>
        )}

        {view === 'workout' && activePreset && (
          <div className="space-y-8 animate-in slide-in-from-right-6 pb-12">
            <header className="flex items-center justify-between">
              <button onClick={() => setView('presets')} className="p-2 rounded-full border border-slate-500/20"><X/></button>
              <div className="text-center">
                <h3 className="text-lg font-black">{activePreset.title}</h3>
                <p className="text-[10px] font-black uppercase opacity-40">{t.noRush}</p>
              </div>
              <div className="w-10"></div>
            </header>

            {[
              { label: t.warmup, ids: activePreset.warmupIds, icon: Zap },
              { label: t.mainBlock, ids: activePreset.mainBlockIds, icon: Flame },
              { label: t.cooldown, ids: activePreset.cooldownIds, icon: HeartPulse }
            ].map((section, idx) => (
              <div key={idx} className="space-y-4">
                <div className="flex items-center gap-2 px-2">
                  <section.icon className="text-indigo-500" size={18}/>
                  <h4 className="text-xs font-black uppercase tracking-widest opacity-60">{section.label}</h4>
                </div>
                {section.ids.map(id => {
                  const ex = getExerciseById(id);
                  return (
                    <div key={id} className={`${cardClasses} p-6 rounded-[35px] border space-y-6`}>
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <h5 className="text-xl font-black leading-tight">{ex.name}</h5>
                          <span className="inline-block px-3 py-1 bg-indigo-500/10 text-indigo-500 text-[10px] font-black uppercase rounded-full">{ex.muscleGroup}</span>
                        </div>
                        <div className="bg-indigo-600 text-white px-4 py-2 rounded-2xl font-black text-sm">{ex.sets} × {ex.reps}</div>
                      </div>
                      
                      <div className="aspect-video bg-slate-900 rounded-3xl overflow-hidden relative border-2 border-indigo-500/10">
                        <iframe className="w-full h-full" src={ex.videoUrl} title={ex.name}></iframe>
                      </div>

                      <div className="grid grid-cols-1 gap-4">
                        <div className="bg-indigo-500/5 p-4 rounded-2xl space-y-2">
                          <h6 className="text-[10px] font-black uppercase tracking-widest text-indigo-500 flex items-center gap-2"><Info size={14}/> {t.executionPriority}</h6>
                          <ul className="space-y-1">
                            {ex.executionTips.map((tip, i) => <li key={i} className="text-xs font-medium opacity-70 flex gap-2"><span>•</span> {tip}</li>)}
                          </ul>
                        </div>
                        <div className="bg-rose-500/5 p-4 rounded-2xl space-y-2">
                          <h6 className="text-[10px] font-black uppercase tracking-widest text-rose-500 flex items-center gap-2"><AlertTriangle size={14}/> {t.commonMistakes}</h6>
                          <ul className="space-y-1">
                            {ex.commonMistakes.map((m, i) => <li key={i} className="text-xs font-medium opacity-70 flex gap-2"><span>•</span> {m}</li>)}
                          </ul>
                        </div>
                      </div>

                      <div className="bg-amber-500/10 p-4 rounded-2xl border border-amber-500/20">
                         <p className="text-[10px] font-black text-amber-600 uppercase mb-1">{t.safetyNotes}</p>
                         <p className="text-xs font-bold leading-relaxed">{ex.safetyNotes}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}

            <button 
              onClick={() => setView('feedback')}
              className="w-full bg-green-500 text-white py-5 rounded-[25px] font-black text-xl shadow-xl shadow-green-500/20 active:scale-95 transition-all"
            >
              FINISH SESSION
            </button>
          </div>
        )}

        {view === 'feedback' && (
          <div className="space-y-8 animate-in zoom-in-95 duration-400 py-10 text-center">
            <div className="w-20 h-20 bg-green-500 rounded-3xl flex items-center justify-center text-white mx-auto shadow-2xl rotate-12"><Trophy size={40}/></div>
            <h2 className="text-3xl font-black">{t.postWorkoutTitle}</h2>
            
            <div className={`${cardClasses} p-8 rounded-[40px] border text-left space-y-8`}>
              <div className="space-y-4">
                <p className="font-black uppercase text-xs opacity-50 tracking-widest">{t.howHard}</p>
                <div className="flex justify-between gap-1">
                  {[1,2,3,4,5,6,7,8,9,10].map(n => (
                    <button key={n} className="w-8 h-8 rounded-lg border-2 border-slate-500/20 text-[10px] font-black hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all">{n}</button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <p className="font-black uppercase text-xs opacity-50 tracking-widest">{t.anyPain}</p>
                <div className="flex gap-4">
                  <button className="flex-1 py-4 border-2 border-slate-500/20 rounded-2xl font-black uppercase tracking-widest hover:border-indigo-600 transition-all">No</button>
                  <button className="flex-1 py-4 border-2 border-slate-500/20 rounded-2xl font-black uppercase tracking-widest hover:border-rose-600 hover:text-rose-600 transition-all">Yes</button>
                </div>
              </div>

              <div className="space-y-4">
                <p className="font-black uppercase text-xs opacity-50 tracking-widest">{t.energyLevel}</p>
                <div className="flex justify-between gap-2">
                  {['Low', 'Medium', 'High', 'Elite'].map(lvl => (
                    <button key={lvl} className="flex-1 py-3 bg-slate-500/5 border-2 border-transparent rounded-xl text-[10px] font-black uppercase hover:border-indigo-600 transition-all">{lvl}</button>
                  ))}
                </div>
              </div>
            </div>

            <button onClick={() => setView('home')} className="w-full bg-indigo-600 text-white py-5 rounded-[25px] font-black text-xl shadow-xl active:scale-95 transition-all">SAVE & COMPLETE</button>
          </div>
        )}

        {view === 'ai' && (
          <div className="flex flex-col h-[75vh] space-y-4 animate-in slide-in-from-right-4">
            <button onClick={() => setView('home')} className={`flex items-center gap-2 font-bold text-sm ${cardClasses} px-4 py-2 rounded-full border shadow-sm w-fit`}><ChevronLeft size={18} /> Exit</button>
            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
              <div className={`${cardClasses} border rounded-2xl p-4 text-sm font-medium italic border-l-4 border-l-indigo-500 shadow-sm opacity-80`}>
                "Hello {profile.name}. I'm your My Fit Rout Virtual Coach. How can I help you move safer today?"
              </div>
              {aiResponse && <div className="bg-indigo-600 text-white p-5 rounded-3xl rounded-tl-none self-start shadow-lg whitespace-pre-wrap leading-relaxed font-medium">{aiResponse}</div>}
              {isAiLoading && <div className="flex items-center gap-2 text-indigo-400 font-black animate-pulse text-sm px-4"><Activity size={16} /> Analyzing movement...</div>}
            </div>
            <div className={`${cardClasses} flex gap-3 p-3 rounded-2xl border shadow-lg`}>
              <input 
                placeholder="Ask about technique..." 
                className="flex-1 bg-transparent px-4 py-2 focus:outline-none font-bold"
                onKeyDown={async (e) => {
                  if (e.key === 'Enter') {
                    setIsAiLoading(true);
                    const res = await getAIFeedback((e.target as HTMLInputElement).value, profile, lang);
                    setAiResponse(res);
                    setIsAiLoading(false);
                    (e.target as HTMLInputElement).value = '';
                  }
                }}
              />
              <button className="w-12 h-12 bg-indigo-600 text-white rounded-xl flex items-center justify-center shadow-md active:scale-90 transition-transform"><Send size={22} /></button>
            </div>
          </div>
        )}

        {view === 'b2b' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <button onClick={() => setView('home')} className="flex items-center gap-2 text-sm font-bold opacity-60"><ChevronLeft size={18}/> Back</button>
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black">{t.trainerDashboard}</h2>
              <span className="px-3 py-1 bg-green-500/10 text-green-500 text-[10px] font-black uppercase rounded-full">Pro Active</span>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              <div className={`${cardClasses} p-6 rounded-[30px] border flex items-center justify-between`}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-500"><Users size={24}/></div>
                  <div><p className="text-xs opacity-40 font-black uppercase">Active Members</p><p className="text-xl font-black">124</p></div>
                </div>
                <ChevronRight opacity={0.3}/>
              </div>
              <div className={`${cardClasses} p-6 rounded-[30px] border flex items-center justify-between`}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500"><Activity size={24}/></div>
                  <div><p className="text-xs opacity-40 font-black uppercase">Retention Rate</p><p className="text-xl font-black">94%</p></div>
                </div>
                <ChevronRight opacity={0.3}/>
              </div>
            </div>

            <h3 className="text-xs font-black uppercase tracking-widest opacity-40 px-2 mt-8">Recent Alerts</h3>
            <div className="space-y-3">
              <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex gap-4">
                <AlertTriangle className="text-rose-500 shrink-0" size={20}/>
                <div>
                  <p className="text-sm font-black">Pain Alert: Sarah J.</p>
                  <p className="text-xs opacity-60">Reported knee pain during Squats (Level 7).</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <nav className={`fixed bottom-0 left-0 right-0 ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'} border-t border-slate-700/30 px-6 py-4 flex justify-between items-center shadow-2xl max-w-md mx-auto z-40 rounded-t-[40px]`}>
        {[
          { id: 'home', icon: Flame, label: 'Home' },
          { id: 'presets', icon: LayoutList, label: 'Workouts' },
          { id: 'ai', icon: HeartPulse, label: 'Vital' },
          { id: 'profile', icon: User, label: 'Me' }
        ].map(item => (
          <button key={item.id} onClick={() => setView(item.id as any)} className={`flex flex-col items-center gap-1 transition-all ${view === item.id ? 'text-indigo-500 scale-110' : 'opacity-30'}`}>
            <div className={view === item.id ? 'bg-indigo-500/10 p-2 rounded-2xl' : ''}><item.icon size={22} /></div>
            <span className="text-[9px] font-black uppercase tracking-widest">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

const Onboarding: React.FC<{ onComplete: (p: UserProfile) => void, lang: Language, setLang: (l: Language) => void }> = ({ onComplete, lang, setLang }) => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    name: '', role: UserRole.MEMBER, weight: 70, height: 170, level: ExperienceLevel.BEGINNER, 
    focus: WorkoutFocus.QUALITY, goal: FitnessGoal.HEALTH, language: lang, 
    trialStartDate: new Date().toISOString(), hasPass: false, feedbackHistory: []
  });
  const t = translations[lang] as any;

  if (step === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-10 text-center bg-slate-900 text-white">
        <div className="w-24 h-24 bg-indigo-600 rounded-[30px] flex items-center justify-center text-white mb-10 shadow-2xl rotate-6"><Dumbbell size={48}/></div>
        <h1 className="text-5xl font-black mb-6 tracking-tighter leading-none">{t.onboardingTitle}</h1>
        <p className="text-lg opacity-60 mb-10 leading-relaxed max-w-xs mx-auto">{t.onboardingDesc}</p>
        <div className="flex gap-4 mb-12">
          {Object.values(Language).map(l => (
            <button key={l} onClick={() => { setLang(l); setFormData(d => ({ ...d, language: l })); }} className={`w-14 h-14 rounded-2xl border-4 flex items-center justify-center font-black transition-all ${lang === l ? 'border-indigo-600 text-indigo-600 bg-indigo-50' : 'opacity-20 border-white/20'}`}>{l}</button>
          ))}
        </div>
        <button onClick={() => setStep(1)} className="w-full max-w-xs bg-indigo-600 text-white py-5 rounded-[25px] font-black text-xl shadow-xl active:scale-95 transition-all">START JOURNEY</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-10 max-w-md mx-auto flex flex-col">
       <div className="flex-1 space-y-12">
          <header className="space-y-4">
            <div className="h-2 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-indigo-600 w-1/3 transition-all"></div></div>
            <h2 className="text-4xl font-black">Profile</h2>
          </header>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase opacity-40">Full Name</label>
              <input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-slate-800 border-2 border-white/5 rounded-2xl p-5 focus:border-indigo-600 outline-none font-bold text-lg" placeholder="e.g. John Doe"/>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase opacity-40">Role</label>
              <div className="grid grid-cols-2 gap-4">
                {[UserRole.MEMBER, UserRole.TRAINER].map(role => (
                  <button key={role} onClick={() => setFormData({...formData, role})} className={`py-4 rounded-2xl border-2 font-black transition-all ${formData.role === role ? 'bg-indigo-600 border-indigo-600' : 'bg-slate-800 border-white/5'}`}>{role}</button>
                ))}
              </div>
            </div>
          </div>
       </div>
       <button onClick={() => onComplete(formData as UserProfile)} className="bg-indigo-600 text-white py-5 rounded-[25px] font-black text-xl shadow-xl active:scale-95">FINALIZE</button>
    </div>
  );
};

export default App;
