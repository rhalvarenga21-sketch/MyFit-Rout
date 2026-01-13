
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Dumbbell, User, Settings, Calendar, MessageSquare, Info, CheckCircle2, ChevronRight,
  Globe, Flame, Activity, Award, Scale, Ruler, Target, Trophy, Clock, RotateCcw,
  Zap, Coffee, Star, Users, Play, CreditCard, ShieldCheck, ChevronLeft
} from 'lucide-react';
import { 
  Language, ExperienceLevel, UserProfile, WorkoutDay, WorkoutFocus, FitnessGoal, 
  WorkoutPreference, MembershipType, Exercise 
} from './types';
import { translations } from './translations';
import { getAIFeedback } from './services/gemini';

const DAYS_KEYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const;

// Comprehensive Exercise Library with curated YouTube demonstrations
const EXERCISE_LIBRARY: Record<string, Partial<Exercise>[]> = {
  CHEST: [
    { name: "Bench Press", videoUrl: "https://www.youtube.com/embed/rT7DgCr-3pg", muscleGroup: "Chest", imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400" },
    { name: "Push Ups", videoUrl: "https://www.youtube.com/embed/IODxDxX7oi4", muscleGroup: "Chest", imageUrl: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400" },
    { name: "Chest Fly", videoUrl: "https://www.youtube.com/embed/eGjt4lk6gjw", muscleGroup: "Chest", imageUrl: "https://images.unsplash.com/photo-1581009146145-b5ef03a245a4?w=400" }
  ],
  BACK: [
    { name: "Pull Ups", videoUrl: "https://www.youtube.com/embed/eGo4IYlbE5g", muscleGroup: "Back", imageUrl: "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=400" },
    { name: "Bent Over Row", videoUrl: "https://www.youtube.com/embed/6KA-L6uXQp4", muscleGroup: "Back", imageUrl: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=400" },
    { name: "Lat Pulldown", videoUrl: "https://www.youtube.com/embed/CAwf7n6Luuc", muscleGroup: "Back", imageUrl: "https://images.unsplash.com/photo-1590239062391-76a145893307?w=400" }
  ],
  LEGS: [
    { name: "Barbell Squat", videoUrl: "https://www.youtube.com/embed/m0GcZ24pK6k", muscleGroup: "Legs", imageUrl: "https://images.unsplash.com/photo-1574673139739-c58259b2fadc?w=400" },
    { name: "Romanian Deadlift", videoUrl: "https://www.youtube.com/embed/JCX81dx098w", muscleGroup: "Legs", imageUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400" },
    { name: "Leg Press", videoUrl: "https://www.youtube.com/embed/IZxyjW7MPJQ", muscleGroup: "Legs", imageUrl: "https://images.unsplash.com/photo-1591940746222-e8d2f73b8883?w=400" }
  ],
  SHOULDERS: [
    { name: "Overhead Press", videoUrl: "https://www.youtube.com/embed/B-aVuyhvLHU", muscleGroup: "Shoulders", imageUrl: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=400" },
    { name: "Lateral Raise", videoUrl: "https://www.youtube.com/embed/3VcKaXpzqRo", muscleGroup: "Shoulders", imageUrl: "https://images.unsplash.com/photo-1581009146145-b5ef03a245a4?w=400" }
  ],
  ARMS: [
    { name: "Bicep Curls", videoUrl: "https://www.youtube.com/embed/ykJmrZ5v0Oo", muscleGroup: "Arms", imageUrl: "https://images.unsplash.com/photo-1581009146145-b5ef03a245a4?w=400" },
    { name: "Tricep Pushdown", videoUrl: "https://www.youtube.com/embed/6Fzep104f0s", muscleGroup: "Arms", imageUrl: "https://images.unsplash.com/photo-1583454110551-21f2fa2adfcd?w=400" }
  ],
  CORE: [
    { name: "Plank", videoUrl: "https://www.youtube.com/embed/ASdvN_XEl_c", muscleGroup: "Core", imageUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400" },
    { name: "Russian Twist", videoUrl: "https://www.youtube.com/embed/wkD8rjkodUI", muscleGroup: "Core", imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400" }
  ]
};

const generateWeeklySchedule = (profile: UserProfile, lang: Language): WorkoutDay[] => {
  const t = translations[lang];
  const schedule: WorkoutDay[] = [];
  
  // Define Splits based on availability
  const isFullBody = profile.preference === WorkoutPreference.FULLBODY;
  
  // Create rotation of workout types for Split preference
  const splitRotations = [
    { title: t.chest + " & " + t.arms, groups: ["CHEST", "ARMS"] },
    { title: t.back + " & " + t.core, groups: ["BACK", "CORE"] },
    { title: t.legs, groups: ["LEGS"] },
    { title: t.shoulders + " & " + t.core, groups: ["SHOULDERS", "CORE"] },
  ];

  let workoutCount = 0;

  DAYS_KEYS.forEach((dayKey) => {
    const isAvailable = profile.availableDays.includes(dayKey);
    const dayName = t[dayKey as keyof typeof t];

    if (!isAvailable) {
      schedule.push({ id: dayKey, dayName, title: t.restDay, exercises: [], isRestDay: true });
    } else {
      let dailyExercises: Exercise[] = [];
      let dayTitle = "";

      if (isFullBody) {
        dayTitle = t.fullbody;
        // Select one from each major group for balance
        ["CHEST", "BACK", "LEGS", "SHOULDERS", "CORE"].forEach(group => {
          const pool = EXERCISE_LIBRARY[group];
          const exTemplate = pool[workoutCount % pool.length];
          dailyExercises.push(createExercise(exTemplate, profile, dayKey));
        });
      } else {
        const rotation = splitRotations[workoutCount % splitRotations.length];
        dayTitle = rotation.title;
        rotation.groups.forEach(group => {
          const pool = EXERCISE_LIBRARY[group];
          pool.forEach(exTemplate => {
            dailyExercises.push(createExercise(exTemplate, profile, dayKey));
          });
        });
      }

      schedule.push({
        id: dayKey,
        dayName,
        title: dayTitle,
        isRestDay: false,
        exercises: dailyExercises
      });
      workoutCount++;
    }
  });

  return schedule;
};

const createExercise = (template: Partial<Exercise>, profile: UserProfile, day: string): Exercise => {
  const isBeginner = profile.level === ExperienceLevel.BEGINNER;
  const isStrength = profile.focus === WorkoutFocus.STRENGTH;
  const isLongevity = profile.focus === WorkoutFocus.LONGEVITY;

  return {
    id: `${day}-${template.name}`,
    name: template.name!,
    videoUrl: template.videoUrl!,
    muscleGroup: template.muscleGroup!,
    imageUrl: template.imageUrl!,
    sets: isBeginner ? 2 : (isStrength ? 4 : 3),
    reps: isStrength ? "5-8" : (isLongevity ? "12-15 (Técnica)" : "10-12"),
    description: "Priorize o controle e a amplitude. A qualidade do movimento garante sua longevidade.",
    executionTips: [
      "Mantenha o tempo sob tensão controlado.",
      "Foque na conexão mente-músculo.",
      "Respire fundo durante a fase negativa."
    ]
  };
};

const App: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [lang, setLang] = useState<Language>(Language.PT);
  const [view, setView] = useState<'home' | 'workout' | 'ai' | 'profile' | 'schedule'>('home');
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [tempDays, setTempDays] = useState<string[]>([]);
  const [aiChat, setAiChat] = useState<{ role: 'user' | 'ai', content: string }[]>([]);
  const [aiInput, setAiInput] = useState('');
  const [loadingAi, setLoadingAi] = useState(false);
  const [selectedEx, setSelectedEx] = useState<Exercise | null>(null);
  const [activeDayId, setActiveDayId] = useState<string | null>(null);

  const t = translations[lang];

  const handleOnboarding = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newProfile: UserProfile = {
      name: formData.get('name') as string,
      weight: Number(formData.get('weight')),
      height: Number(formData.get('height')),
      level: formData.get('level') as ExperienceLevel,
      focus: formData.get('focus') as WorkoutFocus,
      goal: formData.get('goal') as FitnessGoal,
      preference: formData.get('preference') as WorkoutPreference,
      membership: formData.get('membership') as MembershipType,
      weeklyTarget: tempDays.length,
      availableDays: tempDays,
      sessionDuration: Number(formData.get('sessionDuration')) || 45,
      language: lang,
      subscriptionActive: true,
      nextBillingDate: "2025-01-15"
    };
    setProfile(newProfile);
    localStorage.setItem('myfitroute_profile', JSON.stringify(newProfile));
  };

  useEffect(() => {
    const saved = localStorage.getItem('myfitroute_profile');
    if (saved) {
      const parsed = JSON.parse(saved);
      setProfile(parsed);
      setLang(parsed.language || Language.PT);
    }
  }, []);

  const weeklySchedule = useMemo(() => profile ? generateWeeklySchedule(profile, lang) : [], [profile, lang]);

  const currentDayKey = useMemo(() => {
    const day = new Date().getDay(); // 0 is Sun, 1 is Mon...
    const map = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    return map[day];
  }, []);

  const activeWorkoutDay = useMemo(() => {
    if (activeDayId) return weeklySchedule.find(d => d.id === activeDayId);
    // Auto-select today if it's a workout day, else find the next one
    const today = weeklySchedule.find(d => d.id === currentDayKey);
    if (today && !today.isRestDay) return today;
    return weeklySchedule.find(d => !d.isRestDay);
  }, [activeDayId, weeklySchedule, currentDayKey]);

  const sendMessage = async () => {
    if (!aiInput.trim() || !profile) return;
    const userMsg = aiInput;
    setAiInput('');
    setAiChat(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoadingAi(true);
    const feedback = await getAIFeedback(userMsg, profile, lang);
    setAiChat(prev => [...prev, { role: 'ai', content: feedback }]);
    setLoadingAi(false);
  };

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-slate-950 font-sans">
        <div className="w-full max-w-lg bg-slate-900/50 backdrop-blur-xl p-8 rounded-[3rem] shadow-2xl border border-slate-800">
          <div className="flex flex-col items-center mb-8 text-center">
            <div className="w-16 h-16 bg-emerald-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-emerald-500/20 mb-6">
              <Zap className="w-10 h-10 text-slate-950" />
            </div>
            <h1 className="text-4xl font-black text-white tracking-tighter mb-2">MYFIT<span className="text-emerald-500">ROUTE</span></h1>
            <p className="text-slate-400 text-sm max-w-xs">{t.onboardingDesc}</p>
          </div>
          
          <form onSubmit={handleOnboarding} className="space-y-6">
            {onboardingStep === 1 && (
              <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
                <input name="name" required placeholder={t.namePlaceholder} className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-6 py-4 text-white outline-none focus:ring-2 focus:ring-emerald-500" />
                <div className="grid grid-cols-2 gap-4">
                  <input name="weight" type="number" required placeholder={t.weightPlaceholder} className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-6 py-4 text-white outline-none" />
                  <input name="height" type="number" required placeholder={t.heightPlaceholder} className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-6 py-4 text-white outline-none" />
                </div>
                <button type="button" onClick={() => setOnboardingStep(2)} className="w-full bg-emerald-500 text-slate-950 font-black py-4 rounded-2xl shadow-xl hover:bg-emerald-400 transition-all">PRÓXIMO</button>
              </div>
            )}

            {onboardingStep === 2 && (
              <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">{t.selectLevel}</label>
                  <select name="level" className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-6 py-4 text-white outline-none">
                    <option value={ExperienceLevel.BEGINNER}>{t.beginner}</option>
                    <option value={ExperienceLevel.INTERMEDIATE}>{t.intermediate}</option>
                    <option value={ExperienceLevel.ADVANCED}>{t.advanced}</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">{t.selectFocus}</label>
                  <select name="focus" className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-6 py-4 text-white outline-none">
                    <option value={WorkoutFocus.LONGEVITY}>{t.longevity}</option>
                    <option value={WorkoutFocus.QUALITY}>{t.quality}</option>
                    <option value={WorkoutFocus.STRENGTH}>{t.strength}</option>
                    <option value={WorkoutFocus.HYPERTROPHY}>{t.hypertrophy}</option>
                  </select>
                </div>
                <button type="button" onClick={() => setOnboardingStep(3)} className="w-full bg-emerald-500 text-slate-950 font-black py-4 rounded-2xl shadow-xl transition-all">CONTINUAR</button>
              </div>
            )}

            {onboardingStep === 3 && (
              <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">{t.selectDays}</label>
                  <div className="grid grid-cols-4 gap-2">
                    {DAYS_KEYS.map(dayKey => (
                      <button key={dayKey} type="button" onClick={() => setTempDays(prev => prev.includes(dayKey) ? prev.filter(d => d !== dayKey) : [...prev, dayKey])}
                        className={`py-2 rounded-xl text-[10px] font-black border transition-colors ${tempDays.includes(dayKey) ? 'bg-emerald-500 border-emerald-500 text-slate-950' : 'bg-slate-800 border-slate-700 text-slate-500'}`}>
                        {t[dayKey as keyof typeof t]}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">{t.selectPreference}</label>
                  <select name="preference" className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-6 py-4 text-white outline-none">
                    <option value={WorkoutPreference.FULLBODY}>{t.fullbody}</option>
                    <option value={WorkoutPreference.SPLIT}>{t.split}</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">{t.selectMembership}</label>
                  <select name="membership" className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-6 py-4 text-white outline-none">
                    <option value={MembershipType.DIGITAL}>{t.digitalMember}</option>
                    <option value={MembershipType.HYBRID}>{t.hybridMember}</option>
                  </select>
                </div>
                <button type="submit" className="w-full bg-emerald-500 text-slate-950 font-black py-4 rounded-2xl shadow-xl transition-all">CRIAR MEU ROTEIRO</button>
              </div>
            )}
            
            <div className="flex gap-4 justify-center">
              {[Language.PT, Language.EN, Language.ES].map(l => (
                <button key={l} type="button" onClick={() => setLang(l)} className={`text-[10px] font-black transition-all ${lang === l ? 'text-emerald-500' : 'text-slate-600'}`}>{l}</button>
              ))}
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 pb-32 text-slate-100 font-sans">
      <header className="sticky top-0 z-50 bg-slate-950/70 backdrop-blur-2xl border-b border-slate-800 p-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Zap className="w-6 h-6 text-slate-950" />
          </div>
          <span className="font-black text-2xl tracking-tighter uppercase leading-none">MYFIT<span className="text-emerald-500">ROUTE</span></span>
        </div>
        <button onClick={() => setView('profile')} className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center border border-slate-800">
          <User className="w-5 h-5 text-slate-500" />
        </button>
      </header>

      <main className="max-w-xl mx-auto p-6 animate-in fade-in duration-500">
        {view === 'home' && (
          <div className="space-y-8">
            <section className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 p-8 rounded-[3rem] relative overflow-hidden shadow-2xl">
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl"></div>
              <h2 className="text-emerald-500 font-black text-[10px] uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                <Flame className="w-4 h-4 fill-current" /> consistency streak: 5 Days
              </h2>
              <h3 className="text-4xl font-black mb-6 tracking-tighter leading-tight">{t.welcome},<br/>{profile.name}!</h3>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-800/40 p-4 rounded-2xl border border-slate-700/30">
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block mb-1">Assinatura</span>
                  <span className="text-sm font-black text-emerald-500 flex items-center gap-2"><ShieldCheck className="w-3 h-3" /> Ativa</span>
                </div>
                <div className="bg-slate-800/40 p-4 rounded-2xl border border-slate-700/30">
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block mb-1">Plano MyFit</span>
                  <span className="text-sm font-black">{t[profile.focus.toLowerCase() as keyof typeof t]}</span>
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <div className="flex justify-between items-end px-2">
                <h2 className="text-2xl font-black uppercase tracking-tighter">{t.dailyWorkout}</h2>
                <button onClick={() => setView('schedule')} className="text-[10px] font-black uppercase text-emerald-500 tracking-widest hover:underline transition-all">Ver Cronograma</button>
              </div>

              {activeWorkoutDay ? (
                <div className="bg-slate-900 border border-slate-800 rounded-[3rem] overflow-hidden group cursor-pointer active:scale-95 transition-all shadow-xl" onClick={() => setView('workout')}>
                  <div className="p-8 flex flex-col sm:flex-row justify-between sm:items-center gap-6">
                    <div>
                      <span className="text-emerald-500 text-[10px] font-black uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full">{activeWorkoutDay.dayName} • {activeWorkoutDay.title}</span>
                      <h3 className="text-3xl font-black tracking-tighter mt-3">{profile.preference === WorkoutPreference.FULLBODY ? 'Full Route Session' : 'Split Focus Session'}</h3>
                      <div className="flex gap-4 mt-4">
                         <span className="bg-slate-950 px-3 py-1.5 rounded-xl text-slate-400 text-[10px] font-black flex items-center gap-2 border border-slate-800"><Activity className="w-3 h-3" /> {activeWorkoutDay.exercises.length} Exercises</span>
                         <span className="bg-slate-950 px-3 py-1.5 rounded-xl text-slate-400 text-[10px] font-black flex items-center gap-2 border border-slate-800"><Clock className="w-3 h-3" /> {profile.sessionDuration}m Plan</span>
                      </div>
                    </div>
                    <div className="w-14 h-14 bg-emerald-500 rounded-3xl flex items-center justify-center text-slate-950 shadow-2xl group-hover:scale-105 transition-transform">
                      <ChevronRight className="w-8 h-8" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-900/40 border border-slate-800 border-dashed p-14 rounded-[3rem] text-center">
                  <Coffee className="w-12 h-12 text-slate-700 mx-auto mb-4" />
                  <h4 className="text-xl font-black text-slate-500 uppercase tracking-tighter">Recuperação Ativa</h4>
                  <p className="text-[10px] text-slate-600 font-bold mt-1">Sua musculatura reconstrói hoje. Priorize o sono.</p>
                </div>
              )}
            </section>
          </div>
        )}

        {view === 'schedule' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-500">
             <button onClick={() => setView('home')} className="flex items-center gap-2 text-emerald-500 font-black text-[10px] uppercase tracking-widest mb-4 bg-emerald-500/5 px-4 py-2 rounded-xl border border-emerald-500/10">
                <ChevronLeft className="w-4 h-4" /> Voltar
             </button>
             <h2 className="text-4xl font-black tracking-tighter uppercase mb-6">Meu Cronograma</h2>
             <div className="grid gap-4">
               {weeklySchedule.map(day => (
                 <div key={day.id} 
                   onClick={() => !day.isRestDay && (setActiveDayId(day.id), setView('workout'))}
                   className={`p-6 rounded-[2rem] border transition-all flex items-center justify-between cursor-pointer ${
                   day.isRestDay ? 'bg-slate-900/20 border-slate-800/40 opacity-50' : 'bg-slate-900 border-slate-800 hover:border-emerald-500/40'
                 }`}>
                   <div className="flex items-center gap-4">
                     <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-[10px] uppercase ${day.isRestDay ? 'bg-slate-800 text-slate-600' : 'bg-emerald-500 text-slate-950'}`}>
                       {day.dayName.substring(0,3)}
                     </div>
                     <div>
                       <h4 className={`font-black ${day.isRestDay ? 'text-slate-600' : 'text-slate-100 uppercase tracking-tight'}`}>{day.title}</h4>
                       {!day.isRestDay && <p className="text-[9px] text-emerald-500 font-black uppercase tracking-widest">{day.exercises.length} EXERCÍCIOS</p>}
                     </div>
                   </div>
                   {!day.isRestDay && <ChevronRight className="w-5 h-5 text-emerald-500" />}
                 </div>
               ))}
             </div>
          </div>
        )}

        {view === 'workout' && activeWorkoutDay && (
          <div className="space-y-8 animate-in fade-in duration-500">
             <div className="flex justify-between items-center">
                <button onClick={() => setView('home')} className="flex items-center gap-2 text-emerald-500 font-black text-[10px] uppercase bg-emerald-500/10 px-5 py-3 rounded-2xl border border-emerald-500/20">
                    <ChevronLeft className="w-4 h-4" /> VOLTAR
                </button>
                <div className="text-right">
                  <span className="text-emerald-500 font-black text-[10px] tracking-widest uppercase">{activeWorkoutDay.dayName}</span>
                </div>
             </div>
             <div className="px-2">
                <h2 className="text-5xl font-black tracking-tighter uppercase leading-tight mb-2">{activeWorkoutDay.title}</h2>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
                    <Dumbbell className="w-4 h-4 text-emerald-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest">{profile.level}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
                    <Activity className="w-4 h-4 text-emerald-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest">{profile.focus}</span>
                  </div>
                </div>
             </div>

             <div className="space-y-8 pt-4 pb-10">
                {activeWorkoutDay.exercises.map((ex, index) => (
                  <div key={ex.id} className="bg-slate-900 rounded-[3rem] border border-slate-800 overflow-hidden shadow-2xl animate-in slide-in-from-bottom-8 duration-500" style={{ animationDelay: `${index * 100}ms` }}>
                    <div className="relative h-56 overflow-hidden group">
                      <img src={ex.imageUrl} alt={ex.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
                      <div className="absolute bottom-6 left-8 flex items-end justify-between right-8">
                        <div>
                          <span className="bg-emerald-500 text-slate-950 text-[9px] font-black px-2.5 py-1 rounded-lg uppercase tracking-widest mb-2 inline-block shadow-lg">{ex.muscleGroup}</span>
                          <h4 className="text-3xl font-black text-white tracking-tighter leading-none">{ex.name}</h4>
                        </div>
                        <button onClick={() => setSelectedEx(ex)} className="bg-white/90 backdrop-blur-md text-slate-950 p-3 rounded-2xl shadow-xl hover:bg-emerald-500 transition-all active:scale-90">
                          <Play className="w-6 h-6 fill-current" />
                        </button>
                      </div>
                    </div>
                    <div className="p-8">
                      <div className="flex justify-between items-center mb-6 bg-slate-950/40 p-5 rounded-[2rem] border border-slate-800/50">
                        <div className="text-center flex-1 border-r border-slate-800/50">
                          <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Séries</p>
                          <p className="text-2xl font-black text-white">{ex.sets}</p>
                        </div>
                        <div className="text-center flex-1">
                          <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Repetições</p>
                          <p className="text-2xl font-black text-white">{ex.reps}</p>
                        </div>
                      </div>
                      <div className="bg-slate-950/20 p-6 rounded-2xl border border-slate-800/30">
                        <h5 className="text-[10px] font-black text-emerald-500 uppercase mb-4 flex items-center gap-2 tracking-[0.2em]"><Zap className="w-3.5 h-3.5" /> FOCO TÉCNICO</h5>
                        <ul className="space-y-3">
                          {ex.executionTips.map((tip, i) => (
                            <li key={i} className="text-xs text-slate-400 font-bold flex items-start gap-3"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>{tip}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        )}

        {selectedEx && (
          <div className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-xl flex items-center justify-center p-6 animate-in fade-in zoom-in-95 duration-300">
            <div className="w-full max-w-2xl bg-slate-900 rounded-[3rem] border border-slate-800 overflow-hidden shadow-3xl">
              <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
                <h4 className="font-black text-xl tracking-tight uppercase leading-none">{selectedEx.name} • <span className="text-emerald-500 text-sm">Técnica MyFit</span></h4>
                <button onClick={() => setSelectedEx(null)} className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-slate-400 hover:text-white transition-colors">✕</button>
              </div>
              <div className="aspect-video w-full bg-black">
                <iframe width="100%" height="100%" src={selectedEx.videoUrl + "?autoplay=1&mute=1"} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
              </div>
              <div className="p-8">
                <p className="text-slate-400 text-sm leading-relaxed font-bold italic">"O controle é mais importante que o peso. Observe a cadência e a postura demonstrada no vídeo."</p>
              </div>
            </div>
          </div>
        )}

        {view === 'ai' && (
          <div className="flex flex-col h-[75vh] animate-in fade-in duration-500">
            <div className="flex-1 overflow-y-auto space-y-6 mb-4 pr-2 custom-scrollbar pb-6">
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 p-8 rounded-[2.5rem] mb-6 shadow-2xl relative">
                <div className="flex gap-6 items-start">
                  <div className="w-14 h-14 bg-emerald-500 rounded-2xl flex items-center justify-center shrink-0 shadow-2xl shadow-emerald-500/20">
                    <MessageSquare className="w-7 h-7 text-slate-950" />
                  </div>
                  <div>
                    <h4 className="font-black text-xl tracking-tight text-white mb-2 uppercase leading-none">MyFit Virtual Coach</h4>
                    <p className="text-[11px] text-slate-400 font-bold leading-relaxed italic">"Olá {profile.name}, sua técnica é minha prioridade. Tem dúvidas sobre algum movimento do treino de {activeWorkoutDay?.title} hoje?"</p>
                  </div>
                </div>
              </div>
              
              {aiChat.map((chat, i) => (
                <div key={i} className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}>
                  <div className={`max-w-[85%] p-5 rounded-[1.8rem] text-sm font-bold leading-relaxed shadow-xl ${
                    chat.role === 'user' 
                      ? 'bg-emerald-600 text-white rounded-tr-none' 
                      : 'bg-slate-900 text-slate-100 border border-slate-800 rounded-tl-none whitespace-pre-wrap'
                  }`}>
                    {chat.content}
                  </div>
                </div>
              ))}
              {loadingAi && (
                <div className="flex justify-start">
                  <div className="bg-slate-900 p-5 rounded-[1.8rem] border border-slate-800 flex gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="bg-slate-950 pt-2 border-t border-slate-800/50">
              <div className="relative group">
                <input 
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Dúvidas sobre a execução?"
                  className="w-full bg-slate-900 border border-slate-800 rounded-[2rem] px-6 py-5 text-white outline-none focus:ring-2 focus:ring-emerald-500 transition-all pr-16 shadow-2xl"
                />
                <button 
                  onClick={sendMessage}
                  className="absolute right-3 top-3 bottom-3 bg-emerald-500 text-slate-950 w-12 rounded-[1.5rem] flex items-center justify-center font-black hover:bg-emerald-400 transition-all active:scale-90"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        )}

        {view === 'profile' && (
          <div className="space-y-10 py-6 animate-in slide-in-from-right-4 duration-500">
            <div className="text-center">
              <div className="w-32 h-32 bg-emerald-500 rounded-[3rem] mx-auto mb-6 flex items-center justify-center border-8 border-slate-950 shadow-2xl relative">
                 <User className="w-16 h-16 text-slate-950" />
                 <div className="absolute -bottom-2 -right-2 bg-slate-900 p-3 rounded-2xl border border-slate-800"><Trophy className="w-6 h-6 text-yellow-500" /></div>
              </div>
              <h3 className="text-4xl font-black text-white tracking-tighter">{profile.name}</h3>
              <p className="text-emerald-500 font-black uppercase text-[10px] tracking-widest mt-2">Plano: {profile.membership === MembershipType.HYBRID ? 'Academia + App' : 'App Digital'}</p>
            </div>

            <div className="bg-slate-900 rounded-[3rem] border border-slate-800 overflow-hidden shadow-2xl">
               <div className="p-8 border-b border-slate-800 bg-emerald-500/5 flex justify-between items-center">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500"><CreditCard className="w-6 h-6" /></div>
                    <div>
                      <h4 className="font-black text-white uppercase tracking-tighter">Subscrição Ativa</h4>
                      <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Renovação: {profile.nextBillingDate}</p>
                    </div>
                 </div>
               </div>
               <div className="p-8 grid gap-4">
                  <div className="flex justify-between items-center bg-slate-950/40 p-5 rounded-2xl border border-slate-800/40">
                    <span className="text-[10px] font-black uppercase text-slate-500">Experiência</span>
                    <span className="font-black text-emerald-500">{profile.level}</span>
                  </div>
                  <div className="flex justify-between items-center bg-slate-950/40 p-5 rounded-2xl border border-slate-800/40">
                    <span className="text-[10px] font-black uppercase text-slate-500">Preferência</span>
                    <span className="font-black text-emerald-500">{profile.preference}</span>
                  </div>
               </div>
               <button className="w-full flex items-center gap-4 p-8 hover:bg-slate-800 transition-all border-t border-slate-800 group" onClick={() => { localStorage.removeItem('myfitroute_profile'); window.location.reload(); }}>
                  <RotateCcw className="w-6 h-6 text-red-500" />
                  <span className="flex-1 text-left font-black text-red-500 tracking-tight text-lg">Resetar Perfil</span>
                  <ChevronRight className="w-6 h-6 text-red-500/30" />
               </button>
            </div>
          </div>
        )}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-slate-950/80 backdrop-blur-3xl border-t border-slate-800/50 p-6 pb-12 z-50">
        <div className="max-w-md mx-auto flex justify-between items-center px-4">
          <button onClick={() => setView('home')} className={`flex flex-col items-center gap-2 transition-all ${view === 'home' ? 'text-emerald-500 scale-110' : 'text-slate-600 hover:text-slate-400'}`}>
            <Calendar className="w-7 h-7" />
            <span className="text-[10px] font-black uppercase tracking-widest leading-none">Início</span>
          </button>
          <button onClick={() => setView('workout')} className={`flex flex-col items-center gap-2 transition-all ${view === 'workout' ? 'text-emerald-500 scale-110' : 'text-slate-600 hover:text-slate-400'}`}>
            <Dumbbell className="w-7 h-7" />
            <span className="text-[10px] font-black uppercase tracking-widest leading-none">Treino</span>
          </button>
          <div className="relative">
            <button onClick={() => setView('ai')} className={`flex flex-col items-center gap-2 -mt-14 transition-transform ${view === 'ai' ? 'scale-110 rotate-6' : 'hover:scale-105'}`}>
              <div className={`w-20 h-20 rounded-[2.5rem] flex items-center justify-center shadow-2xl transition-all duration-300 ${view === 'ai' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>
                <MessageSquare className="w-10 h-10" />
              </div>
            </button>
          </div>
          <button onClick={() => setView('schedule')} className={`flex flex-col items-center gap-2 transition-all ${view === 'schedule' ? 'text-emerald-500 scale-110' : 'text-slate-600 hover:text-slate-400'}`}>
            <Clock className="w-7 h-7" />
            <span className="text-[10px] font-black uppercase tracking-widest leading-none">Tempo</span>
          </button>
          <button onClick={() => setView('profile')} className={`flex flex-col items-center gap-2 transition-all ${view === 'profile' ? 'text-emerald-500 scale-110' : 'text-slate-600 hover:text-slate-400'}`}>
            <User className="w-7 h-7" />
            <span className="text-[10px] font-black uppercase tracking-widest leading-none">Perfil</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default App;
