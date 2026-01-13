
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Dumbbell, User, Settings, Calendar, MessageSquare, Info, CheckCircle2, ChevronRight,
  Globe, Flame, Activity, Award, Scale, Ruler, Target, Trophy, Clock, RotateCcw,
  Zap, Coffee, Star, Users, Play, CreditCard, ShieldCheck, ChevronLeft, Send, Save, X,
  LayoutList, Plus, Trash2, AlertTriangle, BookOpen, Check, Timer, Moon, Sun, ShoppingCart, Lock,
  HeartPulse, TrendingUp, ZapOff, Fingerprint, Lightbulb, ChevronUp, ChevronDown
} from 'lucide-react';
import { 
  Language, ExperienceLevel, UserProfile, WorkoutDay, WorkoutFocus, FitnessGoal, 
  WorkoutPreference, MembershipType, Exercise, DayPlan, Theme 
} from './types';
import { translations } from './translations';
import { getAIFeedback } from './services/gemini';

const DAYS_KEYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const;
const TRIAL_DAYS = 7;

// Significantly Expanded Localized Exercise Catalog
const EXERCISE_CATALOG: Record<string, any[]> = {
  CHEST: [
    {
      [Language.PT]: { id: "ch1", name: "Supino Reto", description: "Foco na porção média do peitoral.", executionTips: ["Controle a descida", "Escápulas retraídas"] },
      [Language.EN]: { id: "ch1", name: "Flat Bench Press", description: "Focus on the middle pectoral region.", executionTips: ["Control the descent", "Retract scapula"] },
      [Language.ES]: { id: "ch1", name: "Press de Banca Plano", description: "Foco en la porción media del pectoral.", executionTips: ["Controla el descenso", "Escápulas retraídas"] },
      common: { videoUrl: "https://www.youtube.com/embed/rT7DgCr-3pg", muscleGroup: "CHEST", sets: 4, reps: "10", tags: ["STRENGTH"] }
    },
    {
      [Language.PT]: { id: "ch2", name: "Supino Inclinado", description: "Foco na porção superior (clavicular).", executionTips: ["Cotovelos a 45 graus", "Barra no peito superior"] },
      [Language.EN]: { id: "ch2", name: "Incline Bench Press", description: "Focus on upper (clavicular) portion.", executionTips: ["Elbows at 45 degrees", "Bar to upper chest"] },
      [Language.ES]: { id: "ch2", name: "Press Inclinado", description: "Foco en la porción superior (clavicular).", executionTips: ["Codos a 45 grados", "Barra al pecho superior"] },
      common: { videoUrl: "https://www.youtube.com/embed/8iPEnn-ltC8", muscleGroup: "CHEST", sets: 3, reps: "12", tags: ["UPPER"] }
    }
  ],
  BACK: [
    {
      [Language.PT]: { id: "bk1", name: "Puxada Alta", description: "Foco na largura das costas (Latissimus).", executionTips: ["Puxe com os cotovelos", "Não balance o corpo"] },
      [Language.EN]: { id: "bk1", name: "Lat Pulldown", description: "Focus on back width (Lats).", executionTips: ["Pull with elbows", "Avoid rocking"] },
      [Language.ES]: { id: "bk1", name: "Jalón al Pecho", description: "Foco en la anchura de la espalda.", executionTips: ["Tira con los codos", "No balancees el cuerpo"] },
      common: { videoUrl: "https://www.youtube.com/embed/CAwf7n6Luuc", muscleGroup: "BACK", sets: 4, reps: "12", tags: ["WIDTH"] }
    },
    {
      [Language.PT]: { id: "bk2", name: "Barra Fixa", description: "Desenvolvimento de força funcional e lats.", executionTips: ["Amplitude máxima", "Peito em direção à barra"] },
      [Language.EN]: { id: "bk2", name: "Pull-ups", description: "Developing functional strength and lats.", executionTips: ["Full range of motion", "Chest toward the bar"] },
      [Language.ES]: { id: "bk2", name: "Dominadas", description: "Desarrollo de fuerza funcional y lats.", executionTips: ["Amplitud máxima", "Pecho hacia la barra"] },
      common: { videoUrl: "https://www.youtube.com/embed/eGo4IYlbE5g", muscleGroup: "BACK", sets: 3, reps: "8", tags: ["STRENGTH"] }
    },
    {
      [Language.PT]: { id: "bk3", name: "Remada Curvada", description: "Foco na espessura das costas e romboides.", executionTips: ["Mantenha o tronco estável", "Puxe em direção ao umbigo"] },
      [Language.EN]: { id: "bk3", name: "Barbell Row", description: "Focus on back thickness and rhomboids.", executionTips: ["Keep torso stable", "Pull toward navel"] },
      [Language.ES]: { id: "bk3", name: "Remo con Barra", description: "Foco en el grosor de la espalda y romboides.", executionTips: ["Mantén el tronco estable", "Tira hacia el ombligo"] },
      common: { videoUrl: "https://www.youtube.com/embed/9efgcAjQW7E", muscleGroup: "BACK", sets: 4, reps: "10", tags: ["WIDTH"] }
    },
    {
      [Language.PT]: { id: "bk4", name: "Levantamento Terra", description: "Exercício de força total para a cadeia posterior.", executionTips: ["Costas seladas", "Empurre o chão com os pés"] },
      [Language.EN]: { id: "bk4", name: "Deadlift", description: "Full power exercise for the posterior chain.", executionTips: ["Keep back neutral", "Push floor away with feet"] },
      [Language.ES]: { id: "bk4", name: "Peso Muerto", description: "Ejercicio de fuerza total para la cadena posterior.", executionTips: ["Espalda neutra", "Empuja el suelo con los pies"] },
      common: { videoUrl: "https://www.youtube.com/embed/op9kVnSso6Q", muscleGroup: "BACK", sets: 3, reps: "5", tags: ["STRENGTH"] }
    }
  ],
  LEGS: [
    {
      [Language.PT]: { id: "lg1", name: "Agachamento Livre", description: "Foco em quadríceps e glúteos.", executionTips: ["Calcanhares no chão", "Joelhos para fora"] },
      [Language.EN]: { id: "lg1", name: "Barbell Squat", description: "Focus on quads and glutes.", executionTips: ["Heels on floor", "Knees out"] },
      [Language.ES]: { id: "lg1", name: "Sentadilla Libre", description: "Foco en cuádriceps y glúteos.", executionTips: ["Talones en suelo", "Rodillas hacia fuera"] },
      common: { videoUrl: "https://www.youtube.com/embed/m0GcZ24pK6k", muscleGroup: "LEGS", sets: 4, reps: "10", tags: ["COMPOUND"] }
    },
    {
      [Language.PT]: { id: "lg2", name: "Afundo", description: "Exercício unilateral para quadríceps e estabilidade.", executionTips: ["Tronco ereto", "Joelhos a 90 graus"] },
      [Language.EN]: { id: "lg2", name: "Lunges", description: "Unilateral exercise for quads and stability.", executionTips: ["Upright torso", "Knees at 90 degrees"] },
      [Language.ES]: { id: "lg2", name: "Zancadas", description: "Ejercicio unilateral para cuádriceps y estabilidad.", executionTips: ["Tronco erguido", "Rodillas a 90 grados"] },
      common: { videoUrl: "https://www.youtube.com/embed/D7KaRcUTQeE", muscleGroup: "LEGS", sets: 3, reps: "12", tags: ["LEGS"] }
    }
  ],
  SHOULDERS: [
    {
      [Language.PT]: { id: "sh1", name: "Desenvolvimento Militar", description: "Foco no deltoide anterior e médio.", executionTips: ["Core firme", "Barra sobe em linha reta"] },
      [Language.EN]: { id: "sh1", name: "Military Press", description: "Focus on anterior and lateral delts.", executionTips: ["Tight core", "Straight bar path"] },
      [Language.ES]: { id: "sh1", name: "Press Militar", description: "Foco en deltoide anterior y medio.", executionTips: ["Core firme", "Trayecto de barra recto"] },
      common: { videoUrl: "https://www.youtube.com/embed/B-aVuyhvLHU", muscleGroup: "SHOULDERS", sets: 4, reps: "10", tags: ["STRENGTH"] }
    },
    {
      [Language.PT]: { id: "sh2", name: "Elevação Lateral", description: "Isolamento do deltoide lateral para largura.", executionTips: ["Cotovelos levemente flexionados", "Não ultrapassar linha dos ombros"] },
      [Language.EN]: { id: "sh2", name: "Lateral Raises", description: "Lateral delt isolation for shoulder width.", executionTips: ["Slightly bent elbows", "Don't exceed shoulder line"] },
      [Language.ES]: { id: "sh2", name: "Elevación Lateral", description: "Aislamiento del deltoide lateral para anchura.", executionTips: ["Codos ligeramente flexionados", "No superar línea de hombros"] },
      common: { videoUrl: "https://www.youtube.com/embed/3VcKaXpzqRo", muscleGroup: "SHOULDERS", sets: 3, reps: "15", tags: ["SHOULDERS"] }
    },
    {
      [Language.PT]: { id: "sh3", name: "Face Pull", description: "Foco no deltoide posterior e saúde dos ombros.", executionTips: ["Puxe em direção ao rosto", "Afaste os cotovelos"] },
      [Language.EN]: { id: "sh3", name: "Face Pulls", description: "Focus on rear delts and shoulder health.", executionTips: ["Pull toward face", "Pull elbows apart"] },
      [Language.ES]: { id: "sh3", name: "Face Pull", description: "Foco en deltoides posteriores y salud del hombro.", executionTips: ["Tira hacia la cara", "Separa los codos"] },
      common: { videoUrl: "https://www.youtube.com/embed/rep-qVhpqE8", muscleGroup: "SHOULDERS", sets: 3, reps: "15", tags: ["SHOULDERS"] }
    }
  ],
  ARMS: [
    {
      [Language.PT]: { id: "ar1", name: "Rosca Direta", description: "Foco no bíceps braquial (massa).", executionTips: ["Cotovelos fixos ao lado do corpo", "Sem balanço"] },
      [Language.EN]: { id: "ar1", name: "Barbell Curls", description: "Focus on biceps brachii (mass).", executionTips: ["Elbows fixed at sides", "No swinging"] },
      [Language.ES]: { id: "ar1", name: "Curl de Bíceps", description: "Foco en bíceps braquial (masa).", executionTips: ["Codos fijos al lado", "Sin balanceo"] },
      common: { videoUrl: "https://www.youtube.com/embed/ykJmrZ5v0Oo", muscleGroup: "ARMS", sets: 3, reps: "12", tags: ["BICEPS"] }
    },
    {
      [Language.PT]: { id: "ar2", name: "Tríceps Pulley", description: "Isolamento da cabeça longa do tríceps.", executionTips: ["Cotovelos colados ao tronco", "Extensão completa"] },
      [Language.EN]: { id: "ar2", name: "Triceps Pushdown", description: "Isolation of the triceps long head.", executionTips: ["Elbows glued to torso", "Full extension"] },
      [Language.ES]: { id: "ar2", name: "Tríceps Polea", description: "Aislamiento de la cabeza larga del tríceps.", executionTips: ["Codos pegados al tronco", "Extensión completa"] },
      common: { videoUrl: "https://www.youtube.com/embed/2-LAMcpzHLU", muscleGroup: "ARMS", sets: 3, reps: "12", tags: ["ARMS"] }
    },
    {
      [Language.PT]: { id: "ar3", name: "Rosca Martelo", description: "Foco no braquial e braquiorradial.", executionTips: ["Pegada neutra", "Sem balanço"] },
      [Language.EN]: { id: "ar3", name: "Hammer Curls", description: "Focus on brachialis and brachioradialis.", executionTips: ["Neutral grip", "Avoid swinging"] },
      [Language.ES]: { id: "ar3", name: "Curl Martillo", description: "Foco en braquial y braquiorradial.", executionTips: ["Agarre neutro", "Sin balanceo"] },
      common: { videoUrl: "https://www.youtube.com/embed/zC3nLlEvin4", muscleGroup: "ARMS", sets: 3, reps: "12", tags: ["BICEPS"] }
    },
    {
      [Language.PT]: { id: "ar4", name: "Extensão Francesa", description: "Foco na cabeça longa do tríceps.", executionTips: ["Cotovelos apontados para cima", "Amplitude total"] },
      [Language.EN]: { id: "ar4", name: "Overhead Triceps Extension", description: "Focus on the long head of the triceps.", executionTips: ["Keep elbows pointing up", "Full range"] },
      [Language.ES]: { id: "ar4", name: "Extensión Francesa", description: "Foco en la cabeza larga del tríceps.", executionTips: ["Codos apuntando hacia arriba", "Rango completo"] },
      common: { videoUrl: "https://www.youtube.com/embed/-Vyt2QdsR7E", muscleGroup: "ARMS", sets: 3, reps: "12", tags: ["ARMS"] }
    }
  ],
  GLUTES: [
    {
      [Language.PT]: { id: "gl1", name: "Elevação Pélvica", description: "Foco máximo em glúteo maior.", executionTips: ["Queixo no peito", "Segure 1s no topo"] },
      [Language.EN]: { id: "gl1", name: "Hip Thrust", description: "Maximum focus on gluteus maximus.", executionTips: ["Chin to chest", "Hold 1s at top"] },
      [Language.ES]: { id: "gl1", name: "Empuje de Cadera", description: "Foco máximo en glúteo mayor.", executionTips: ["Barbilla al pecho", "Aguanta 1s arriba"] },
      common: { videoUrl: "https://www.youtube.com/embed/SEdqBc_z_Yw", muscleGroup: "GLUTES", sets: 4, reps: "10", tags: ["POWER"] }
    },
    {
      [Language.PT]: { id: "gl2", name: "Ponte de Glúteo", description: "Estabilidade de quadril e ativação dos glúteos.", executionTips: ["Calcanhares próximos ao quadril", "Contraia glúteos no topo"] },
      [Language.EN]: { id: "gl2", name: "Glute Bridge", description: "Hip stability and glute activation.", executionTips: ["Heels close to hips", "Squeeze glutes at top"] },
      [Language.ES]: { id: "gl2", name: "Puente de Glúteos", description: "Estabilidad de cadera y activación de glúteos.", executionTips: ["Talones cerca de cadera", "Contrae glúteos arriba"] },
      common: { videoUrl: "https://www.youtube.com/embed/wPM8icPu6H8", muscleGroup: "GLUTES", sets: 3, reps: "15", tags: ["GLUTES"] }
    }
  ],
  CORE: [
    {
      [Language.PT]: { id: "cr1", name: "Prancha Abdominal", description: "Estabilidade estática do core.", executionTips: ["Corpo alinhado", "Respire fundo"] },
      [Language.EN]: { id: "cr1", name: "Plank", description: "Static core stability.", executionTips: ["Aligned body", "Breathe deeply"] },
      [Language.ES]: { id: "cr1", name: "Plancha Abdominal", description: "Estabilidad estática.", executionTips: ["Cuerpo alineado", "Respira profundo"] },
      common: { videoUrl: "https://www.youtube.com/embed/ASdvN_XEl_c", muscleGroup: "CORE", sets: 3, reps: "60s", tags: ["STABILITY"] }
    }
  ],
  BALANCE: [
    {
      [Language.PT]: { id: "bl1", name: "Equilíbrio em Uma Perna", description: "Propriocepção e equilíbrio.", executionTips: ["Olhe fixamente para um ponto"] },
      [Language.EN]: { id: "bl1", name: "Single Leg Stance", description: "Proprioception and balance.", executionTips: ["Stare at a fixed point"] },
      [Language.ES]: { id: "bl1", name: "Equilibrio a una pierna", description: "Propiocepción y equilibrio.", executionTips: ["Mira un punto fijo"] },
      common: { videoUrl: "https://www.youtube.com/embed/XmG-wA-W_44", muscleGroup: "BALANCE", sets: 3, reps: "30s", tags: ["BALANCE"] }
    }
  ]
};

const getLocalizedExercise = (id: string, lang: Language): Exercise => {
  for (const group of Object.values(EXERCISE_CATALOG)) {
    const found = group.find(item => item[lang].id === id);
    if (found) {
      return { ...found.common, ...found[lang] } as Exercise;
    }
  }
  return { id: "empty", name: "Exercise", description: "", executionTips: [], muscleGroup: "BODY", sets: 3, reps: "10", videoUrl: "", imageUrl: "" };
};

const getLocalizedLibrary = (lang: Language): Record<string, Exercise[]> => {
  const lib: Record<string, Exercise[]> = {};
  for (const [key, exercises] of Object.entries(EXERCISE_CATALOG)) {
    lib[key] = exercises.map(item => ({ ...item.common, ...item[lang] } as Exercise));
  }
  return lib;
};

const generateWeeklySchedule = (profile: UserProfile, lang: Language): WorkoutDay[] => {
  const t = translations[lang] as any;
  const schedule: WorkoutDay[] = [];
  const currentLib = getLocalizedLibrary(lang);

  DAYS_KEYS.forEach((dayKey) => {
    const dayPlan = profile.customSchedule[dayKey];
    const dayName = t[dayKey] || dayKey;

    if (!dayPlan || dayPlan.type === 'REST') {
      schedule.push({ id: dayKey, dayName, title: t.restDay || "Rest", exercises: [], isRestDay: true });
    } else {
      let dailyExercises: Exercise[] = [];
      if (dayPlan.customExerciseIds && dayPlan.customExerciseIds.length > 0) {
        dailyExercises = dayPlan.customExerciseIds.map(id => getLocalizedExercise(id, lang));
      } else {
        const muscleGroup = dayPlan.type;
        if (muscleGroup === 'FULLBODY') {
          const chest = currentLib['CHEST']?.slice(0, 2) || [];
          const back = currentLib['BACK']?.slice(0, 1) || [];
          const legs = currentLib['LEGS']?.slice(0, 2) || [];
          const core = currentLib['CORE']?.slice(0, 1) || [];
          dailyExercises = [...chest, ...back, ...legs, ...core];
        } else if (muscleGroup === 'CHEST') {
          const chest = currentLib['CHEST']?.slice(0, 5) || [];
          const shoulders = currentLib['SHOULDERS']?.slice(0, 2) || [];
          dailyExercises = [...chest, ...shoulders];
        } else if (muscleGroup === 'LEGS') {
          const legs = currentLib['LEGS']?.slice(0, 5) || [];
          const glutes = currentLib['GLUTES']?.slice(0, 2) || [];
          dailyExercises = [...legs, ...glutes];
        } else if (muscleGroup === 'ARMS') {
          const biceps = currentLib['ARMS']?.slice(0, 3) || [];
          const triceps = currentLib['ARMS']?.slice(3, 6) || [];
          dailyExercises = [...biceps, ...triceps];
        } else {
          const pool = currentLib[muscleGroup];
          if (pool) dailyExercises = [...pool].slice(0, 7);
        }
      }
      schedule.push({ id: dayKey, dayName, title: t[dayPlan.type.toLowerCase()] || dayPlan.type, isRestDay: false, exercises: dailyExercises });
    }
  });
  return schedule;
};

const PRESETS: Record<string, Record<string, DayPlan>> = {
  LONGEVITY: { mon: { type: 'FULLBODY' }, tue: { type: 'REST' }, wed: { type: 'BALANCE' }, thu: { type: 'REST' }, fri: { type: 'FULLBODY' }, sat: { type: 'REST' }, sun: { type: 'CORE' } },
  STRENGTH_SPLIT: { mon: { type: 'CHEST' }, tue: { type: 'BACK' }, wed: { type: 'REST' }, thu: { type: 'LEGS' }, fri: { type: 'REST' }, sat: { type: 'ARMS' }, sun: { type: 'REST' } }
};

const getTrialStatus = (startDate: string) => {
  const start = new Date(startDate).getTime();
  const now = new Date().getTime();
  const diff = now - start;
  const daysPassed = Math.floor(diff / (1000 * 60 * 60 * 24));
  const remaining = TRIAL_DAYS - daysPassed;
  return {
    isExpired: remaining <= 0,
    remainingDays: Math.max(0, remaining)
  };
};

const App: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('myfitroute_profile');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [lang, setLang] = useState<Language>(profile?.language || Language.PT);
  const [theme, setTheme] = useState<Theme>(profile?.theme || 'dark');
  const [view, setView] = useState<'home' | 'workout' | 'schedule' | 'ai' | 'profile' | 'checkout' | 'longevity'>('home');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingSchedule, setIsEditingSchedule] = useState(false);
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [selectedDayId, setSelectedDayId] = useState<string | null>(null);
  const [isAddingExercise, setIsAddingExercise] = useState<{ day: string } | null>(null);

  const t = translations[lang] as any;

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  const schedule = useMemo(() => {
    if (!profile) return [];
    return generateWeeklySchedule(profile, lang);
  }, [profile, lang]);

  const currentDayWorkout = useMemo(() => {
    if (!schedule.length) return null;
    const day = new Date().getDay(); 
    const todayIndex = day === 0 ? 6 : day - 1; 
    return schedule[todayIndex];
  }, [schedule]);

  const activeWorkoutDay = useMemo(() => {
    if (!schedule.length) return null;
    if (selectedDayId) {
      return schedule.find(d => d.id === selectedDayId) || currentDayWorkout;
    }
    return currentDayWorkout;
  }, [schedule, selectedDayId, currentDayWorkout]);

  const trialStatus = useMemo(() => {
    if (!profile) return { isExpired: false, remainingDays: 7 };
    return getTrialStatus(profile.trialStartDate);
  }, [profile]);

  const saveProfile = (newProfile: UserProfile) => {
    setProfile(newProfile);
    localStorage.setItem('myfitroute_profile', JSON.stringify(newProfile));
    setIsEditingProfile(false);
  };

  const purchasePass = () => {
    if (!profile) return;
    saveProfile({ ...profile, hasPass: true });
    setView('home');
  };

  const handleStartJourney = () => {
    if (!profile?.hasPass && trialStatus.isExpired) {
      setView('checkout');
    } else {
      setSelectedDayId(null);
      setView('workout');
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    if (profile) saveProfile({ ...profile, theme: newTheme });
  };

  const handleReset = () => {
    localStorage.clear();
    setProfile(null);
    setView('home');
    window.location.reload();
  };

  const handleRemoveExercise = (dayId: string, exId: string) => {
    if (!profile) return;
    const newSchedule = { ...profile.customSchedule };
    const dayPlan = { ...newSchedule[dayId] };
    
    let currentIds = dayPlan.customExerciseIds;
    if (!currentIds) {
      const generated = (EXERCISE_CATALOG[dayPlan.type] || []).map(e => e[Language.EN].id);
      currentIds = generated;
    }
    
    newSchedule[dayId] = { ...dayPlan, customExerciseIds: currentIds.filter(id => id !== exId) };
    saveProfile({ ...profile, customSchedule: newSchedule });
  };

  const handleAddRandomExercise = (dayId: string) => {
    if (!profile) return;
    const groups = Object.keys(EXERCISE_CATALOG);
    const randomGroup = groups[Math.floor(Math.random() * groups.length)];
    const exercises = EXERCISE_CATALOG[randomGroup];
    const randomEx = exercises[Math.floor(Math.random() * exercises.length)];
    const exId = randomEx[Language.EN].id;

    const newSchedule = { ...profile.customSchedule };
    const dayPlan = { ...newSchedule[dayId] };
    const currentIds = dayPlan.customExerciseIds || (EXERCISE_CATALOG[dayPlan.type] || []).map(e => e[Language.EN].id);
    
    if (!currentIds.includes(exId)) {
      newSchedule[dayId] = { ...dayPlan, customExerciseIds: [...currentIds, exId] };
      saveProfile({ ...profile, customSchedule: newSchedule });
    }
  };

  const handleMoveDay = (index: number, direction: 'up' | 'down') => {
    if (!profile) return;
    const newIndex = index + (direction === 'up' ? -1 : 1);
    if (newIndex < 0 || newIndex >= DAYS_KEYS.length) return;

    const day1 = DAYS_KEYS[index];
    const day2 = DAYS_KEYS[newIndex];

    const newSchedule = { ...profile.customSchedule };
    const temp = newSchedule[day1];
    newSchedule[day1] = newSchedule[day2];
    newSchedule[day2] = temp;

    saveProfile({ ...profile, customSchedule: newSchedule });
  };

  const handleAddExerciseToDay = (dayId: string, exId: string) => {
    if (!profile) return;
    const newSchedule = { ...profile.customSchedule };
    const dayPlan = newSchedule[dayId];
    let currentIds = dayPlan.customExerciseIds || [];
    if (!currentIds.includes(exId)) {
      newSchedule[dayId] = { ...dayPlan, customExerciseIds: [...currentIds, exId] };
      saveProfile({ ...profile, customSchedule: newSchedule });
    }
    setIsAddingExercise(null);
  };

  const handleAskAI = async () => {
    if (!aiQuery.trim() || !profile) return;
    setIsAiLoading(true);
    const feedback = await getAIFeedback(aiQuery, profile, lang);
    setAiResponse(feedback);
    setIsAiLoading(false);
  };

  if (!profile) {
    return <Onboarding onComplete={saveProfile} lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme} />;
  }

  const themeClasses = theme === 'dark' ? 'bg-slate-900 text-slate-50' : 'bg-slate-50 text-slate-900';
  const cardClasses = theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200';

  return (
    <div className={`min-h-screen ${themeClasses} font-sans pb-24 transition-colors duration-300`}>
      <header className={`${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-b'} px-6 py-4 sticky top-0 z-20 flex items-center justify-between shadow-sm`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-md rotate-3">
            <Dumbbell size={24} />
          </div>
          <h1 className="font-extrabold text-xl tracking-tight text-indigo-500 italic">MyFitRoute</h1>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={toggleTheme} className="p-2 hover:bg-indigo-500/10 rounded-full transition-colors border shadow-sm">
            {theme === 'light' ? <Moon size={20} className="text-slate-600" /> : <Sun size={20} className="text-amber-400" />}
          </button>
          <button onClick={() => setView('profile')} className="p-2 hover:bg-indigo-500/10 rounded-full transition-colors border shadow-sm">
            <User size={20} className={theme === 'dark' ? "text-slate-300" : "text-slate-600"} />
          </button>
        </div>
      </header>

      <main className="max-w-md mx-auto p-4 md:p-6 space-y-6">
        {view === 'home' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {!profile.hasPass && (
              <div className={`rounded-2xl p-4 flex items-center justify-between shadow-lg border-2 ${trialStatus.isExpired ? 'bg-red-500/10 border-red-500/40 text-red-500' : 'bg-amber-500/10 border-amber-500/40 text-amber-500'}`}>
                <div className="flex items-center gap-3">
                  {trialStatus.isExpired ? <Lock size={20} /> : <Clock size={20} />}
                  <span className="font-bold text-sm">
                    {trialStatus.isExpired ? "Trial Expired" : `${trialStatus.remainingDays} Days Trial Remaining`}
                  </span>
                </div>
                {!trialStatus.isExpired && (
                  <button onClick={() => setView('checkout')} className="text-xs font-black uppercase tracking-widest bg-amber-500 text-slate-900 px-3 py-1.5 rounded-full shadow-md">
                    Upgrade
                  </button>
                )}
              </div>
            )}

            <section className="bg-gradient-to-br from-indigo-700 via-indigo-600 to-violet-700 rounded-3xl p-7 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Flame size={120} />
              </div>
              <span className="text-indigo-100 text-sm font-semibold uppercase tracking-widest">{t.welcome}, {profile.name}</span>
              <h2 className="text-3xl font-black mt-2 leading-tight">{t.dailyWorkout}</h2>
              <div className="mt-6 flex flex-col gap-4">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                  <p className="text-indigo-100 text-xs font-bold uppercase tracking-wider mb-1">
                    {currentDayWorkout?.isRestDay ? t.restDay : "Session"}
                  </p>
                  <p className="text-xl font-bold">{currentDayWorkout?.title}</p>
                </div>
                <button 
                  onClick={handleStartJourney}
                  className={`w-full bg-white text-indigo-700 py-4 rounded-2xl font-black shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 hover:bg-indigo-50 ${trialStatus.isExpired && !profile.hasPass ? 'opacity-50' : ''}`}
                >
                  {trialStatus.isExpired && !profile.hasPass ? <Lock size={20} /> : <Play fill="currentColor" size={20} />}
                  {t.startJourney.toUpperCase()}
                </button>
              </div>
            </section>

            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => setView('schedule')} className={`${cardClasses} p-5 rounded-2xl border shadow-sm flex flex-col items-center text-center hover:bg-indigo-500/5 transition-colors`}>
                <div className="w-10 h-10 bg-indigo-500/10 rounded-full flex items-center justify-center mb-3">
                  <LayoutList className="text-indigo-500" size={20} />
                </div>
                <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-1">{t.weeklySchedule}</p>
                <p className={`text-sm font-black ${theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}`}>Full Week</p>
              </button>
              <button onClick={() => setView('longevity')} className={`${cardClasses} p-5 rounded-2xl border shadow-sm flex flex-col items-center text-center hover:bg-rose-500/5 transition-colors`}>
                <div className="w-10 h-10 bg-rose-500/10 rounded-full flex items-center justify-center mb-3">
                  <HeartPulse className="text-rose-500" size={20} />
                </div>
                <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-1">{t.healthQuotient}</p>
                <p className={`text-sm font-black ${theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}`}>85/100</p>
              </button>
            </div>
          </div>
        )}

        {view === 'longevity' && (
          <LongevityView theme={theme} lang={lang} />
        )}

        {view === 'checkout' && (
          <CheckoutView onPurchase={purchasePass} onBack={() => setView('home')} theme={theme} />
        )}

        {view === 'schedule' && (
          <div className="space-y-6 animate-in slide-in-from-left-4 duration-400">
            <div className="flex justify-between items-center px-2">
              <button onClick={() => { setView('home'); setIsEditingSchedule(false); }} className={`flex items-center gap-2 font-bold text-sm ${cardClasses} px-4 py-2 rounded-full border shadow-sm`}>
                <ChevronLeft size={18} /> Back
              </button>
              <button 
                onClick={() => setIsEditingSchedule(!isEditingSchedule)} 
                className={`flex items-center gap-2 font-black text-xs uppercase tracking-widest px-6 py-2 rounded-full border shadow-md transition-all ${isEditingSchedule ? 'bg-green-500 text-white border-green-600' : 'bg-indigo-600 text-white border-indigo-700'}`}
              >
                {isEditingSchedule ? <><Save size={14} /> {t.plan.save}</> : <><Settings size={14} /> {t.plan.edit}</>}
              </button>
            </div>

            <div className="px-2">
              <h2 className="text-2xl font-black text-indigo-500">{t.plan.title}</h2>
              <p className="text-xs font-bold opacity-50 uppercase tracking-widest">{t.plan.subtitle}</p>
            </div>

            <div className="grid gap-4">
              {schedule.map((day, idx) => (
                <div 
                  key={day.id}
                  className={`w-full rounded-3xl border transition-all ${day.isRestDay && !isEditingSchedule ? 'opacity-50' : ''} ${cardClasses} p-5 relative`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center font-black text-xs uppercase text-indigo-500 shrink-0">
                        {day.dayName.slice(0, 3)}
                      </div>
                      <div>
                        <h4 className="font-black tracking-tight text-lg">{day.title}</h4>
                        <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest">
                          {day.isRestDay ? t.rest : `${day.exercises.length} Exercises`}
                        </p>
                      </div>
                    </div>

                    {isEditingSchedule ? (
                      <div className="flex items-center gap-1">
                        <button onClick={() => handleMoveDay(idx, 'up')} disabled={idx === 0} className="p-2 hover:bg-slate-500/10 rounded-full disabled:opacity-20"><ChevronUp size={20} /></button>
                        <button onClick={() => handleMoveDay(idx, 'down')} disabled={idx === DAYS_KEYS.length - 1} className="p-2 hover:bg-slate-500/10 rounded-full disabled:opacity-20"><ChevronDown size={20} /></button>
                      </div>
                    ) : (
                      !day.isRestDay && <button onClick={() => { setSelectedDayId(day.id); setView('workout'); }} className="p-2 hover:bg-indigo-500/10 rounded-full"><ChevronRight size={24} className="text-indigo-500" /></button>
                    )}
                  </div>

                  {isEditingSchedule && !day.isRestDay && (
                    <div className="mt-4 space-y-2 border-t border-slate-700/30 pt-4">
                      {day.exercises.map(ex => (
                        <div key={ex.id} className="flex items-center justify-between bg-slate-500/5 p-3 rounded-2xl border border-slate-500/10">
                          <div className="flex items-center gap-3">
                            <Check size={14} className="text-indigo-500" />
                            <span className="text-xs font-black">{ex.name}</span>
                          </div>
                          <button onClick={() => handleRemoveExercise(day.id, ex.id)} className="text-red-500 p-1 hover:bg-red-500/10 rounded-full"><Trash2 size={16} /></button>
                        </div>
                      ))}
                      <button 
                        onClick={() => handleAddRandomExercise(day.id)} 
                        className="w-full mt-2 flex items-center justify-center gap-2 py-3 border-2 border-dashed border-indigo-500/30 rounded-2xl text-[10px] font-black uppercase tracking-widest text-indigo-500 hover:bg-indigo-500/5 transition-all"
                      >
                        <Plus size={14} /> {t.plan.addExercise}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {view === 'workout' && activeWorkoutDay && (
          <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-400">
            <div className="flex justify-between items-center">
              <button onClick={() => setView(selectedDayId ? 'schedule' : 'home')} className={`flex items-center gap-2 font-bold text-sm ${cardClasses} px-4 py-2 rounded-full border shadow-sm`}>
                <ChevronLeft size={18} /> Back
              </button>
              {!activeWorkoutDay.isRestDay && (
                <button onClick={() => setIsAddingExercise({ day: activeWorkoutDay.id })} className="bg-indigo-600 text-white px-4 py-2 rounded-full text-xs font-black shadow-lg flex items-center gap-2">
                  <Plus size={16} /> ADD
                </button>
              )}
            </div>
            
            <div className={`${cardClasses} p-6 rounded-3xl border shadow-sm relative overflow-hidden`}>
              <div className="absolute top-0 right-0 bg-indigo-500/10 p-3 rounded-bl-3xl flex items-center gap-1">
                <Timer size={14} className="text-indigo-500" />
                <span className="text-[10px] font-black text-indigo-500">{activeWorkoutDay.exercises.length * 6} min</span>
              </div>
              <span className="text-[10px] font-black uppercase text-indigo-500 tracking-widest block mb-1">{activeWorkoutDay.dayName}</span>
              <h2 className="text-2xl font-black">{activeWorkoutDay.title}</h2>
            </div>

            {activeWorkoutDay.exercises.map((ex) => (
              <div key={ex.id} className={`${cardClasses} rounded-3xl border p-5 shadow-sm space-y-5 relative group`}>
                <button onClick={() => handleRemoveExercise(activeWorkoutDay.id, ex.id)} className="absolute top-4 right-4 text-slate-400 hover:text-red-500 p-2 transition-colors z-10">
                  <Trash2 size={20} />
                </button>
                <div className="flex justify-between items-start pr-8">
                  <div className="space-y-1">
                    <h4 className="font-black text-xl leading-tight">{ex.name}</h4>
                    <span className="inline-block text-[10px] bg-indigo-500/10 px-3 py-1 rounded-full text-indigo-500 font-black uppercase tracking-wider">
                      {t[ex.muscleGroup?.toLowerCase()] || ex.muscleGroup}
                    </span>
                  </div>
                  <div className="bg-indigo-600 text-white px-4 py-2 rounded-2xl font-black text-sm shadow-md shrink-0">
                    {ex.sets} × {ex.reps}
                  </div>
                </div>

                <div className="aspect-video bg-slate-900 rounded-2xl overflow-hidden relative border-4 border-indigo-500/10 shadow-lg">
                  <iframe className="w-full h-full opacity-90 hover:opacity-100 transition-opacity" src={ex.videoUrl} title={ex.name} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/90 to-transparent p-4 flex justify-between items-end pointer-events-none">
                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] font-black uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded w-fit">
                        {ex.tags?.[0] || 'STRENGTH'}
                      </span>
                      <p className="text-white font-black text-sm truncate max-w-[150px]">{ex.name}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-indigo-500/5 border border-indigo-500/10 rounded-2xl p-3 flex items-center justify-between">
                    <span className="text-[9px] font-black uppercase text-slate-400">{t.repsDuration}</span>
                    <span className="text-xs font-black text-indigo-500">{ex.reps}</span>
                  </div>
                  <div className="bg-orange-500/5 border border-orange-500/10 rounded-2xl p-3 flex items-center justify-between">
                    <span className="text-[9px] font-black uppercase text-slate-400">{t.avgKcal}</span>
                    <span className="text-xs font-black text-orange-500">42 kcal</span>
                  </div>
                </div>

                <div className={`${theme === 'dark' ? 'bg-slate-900' : 'bg-slate-50'} rounded-2xl p-4 space-y-3`}>
                  <h5 className="text-xs font-black text-slate-400 uppercase tracking-widest">{t.executionPriority}</h5>
                  <p className="text-sm font-medium opacity-80">{ex.description}</p>
                  {ex.executionTips.map((tip, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm font-medium opacity-70">
                      <div className="mt-1 w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center shrink-0">
                        <CheckCircle2 size={12} className="text-green-500" />
                      </div>
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-indigo-600/5 border-l-4 border-indigo-600 p-4 rounded-r-2xl space-y-2">
                  <div className="flex items-center gap-2 mb-1">
                    <Lightbulb size={16} className="text-indigo-500" />
                    <h5 className="text-xs font-black uppercase tracking-wider text-indigo-600">{t.coachTips}</h5>
                  </div>
                  <ul className="space-y-1">
                    <li className="text-xs font-medium opacity-70 flex gap-2">
                      <span className="text-indigo-500">•</span>
                      Maintain absolute core tension throughout the range of motion.
                    </li>
                    <li className="text-xs font-medium opacity-70 flex gap-2">
                      <span className="text-indigo-500">•</span>
                      Exhale slowly on the concentric (effort) phase.
                    </li>
                    <li className="text-xs font-medium opacity-70 flex gap-2">
                      <span className="text-indigo-500">•</span>
                      Pause for 1s at the peak contraction point to maximize muscle recruitment.
                    </li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}

        {view === 'ai' && (
          <div className="flex flex-col h-[75vh] space-y-4 animate-in slide-in-from-right-4">
            <button onClick={() => setView('home')} className={`flex items-center gap-2 font-bold text-sm ${cardClasses} px-4 py-2 rounded-full border shadow-sm w-fit`}>
              <ChevronLeft size={18} /> Exit
            </button>
            <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
              <div className={`${cardClasses} border rounded-2xl p-4 text-sm font-medium italic border-l-4 border-l-indigo-500 shadow-sm opacity-80`}>
                "Hello {profile.name}. I'm localized to your language. Ask me about your routine."
              </div>
              {aiResponse && <div className="bg-indigo-600 text-white p-5 rounded-3xl rounded-tl-none self-start shadow-lg whitespace-pre-wrap leading-relaxed font-medium">{aiResponse}</div>}
              {isAiLoading && <div className="flex items-center gap-2 text-indigo-400 font-black animate-pulse text-sm px-4"><Activity size={16} /> Coach is thinking...</div>}
            </div>
            <div className={`${cardClasses} flex gap-3 p-3 rounded-2xl border shadow-lg`}>
              <input value={aiQuery} onChange={(e) => setAiQuery(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAskAI()} placeholder="Ask Coach..." className="flex-1 bg-transparent px-4 py-2 focus:outline-none font-bold placeholder:text-slate-400" />
              <button onClick={handleAskAI} disabled={isAiLoading || !aiQuery.trim()} className="w-12 h-12 bg-indigo-600 text-white rounded-xl flex items-center justify-center shadow-md active:scale-90 transition-transform"><Send size={22} /></button>
            </div>
          </div>
        )}

        {view === 'profile' && (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-400">
            <div className="flex justify-between items-center">
               <button onClick={() => setView('home')} className={`flex items-center gap-2 font-bold text-sm ${cardClasses} px-4 py-2 rounded-full border shadow-sm w-fit`}><ChevronLeft size={18} /> Back</button>
               <button onClick={() => setIsEditingProfile(!isEditingProfile)} className={`px-4 py-2 rounded-full text-sm font-bold transition-all border shadow-sm flex items-center gap-2 ${isEditingProfile ? 'bg-red-500/10 text-red-500 border-red-500/20' : 'bg-indigo-600 text-white border-indigo-700'}`}>
                 {isEditingProfile ? <><X size={16}/> Cancel</> : <><Settings size={16}/> {t.editNeeds}</>}
               </button>
            </div>

            {isEditingProfile ? <ProfileEditor profile={profile} onSave={saveProfile} lang={lang} theme={theme} toggleTheme={toggleTheme} /> : (
              <div className="space-y-6">
                <div className={`text-center p-8 ${cardClasses} rounded-3xl border shadow-sm relative overflow-hidden`}>
                  <div className="absolute top-0 left-0 w-full h-2 bg-indigo-600"></div>
                  <div className="w-24 h-24 bg-indigo-500/10 rounded-3xl flex items-center justify-center mx-auto mb-4 border-4 border-white/10 shadow-xl">
                    <User size={48} className="text-indigo-500" />
                  </div>
                  <h2 className="text-2xl font-black">{profile.name}</h2>
                  <p className="text-indigo-500 font-black uppercase tracking-widest text-[10px] mt-1">{profile.level} ATHLETE • {t[profile.focus?.toLowerCase()] || profile.focus}</p>
                </div>
                
                <div className={`${cardClasses} border rounded-3xl divide-y overflow-hidden shadow-sm`}>
                  <div className="p-5 flex justify-between items-center">
                    <span className="text-slate-400 font-bold uppercase tracking-wider text-xs">Active Days</span>
                    <div className="flex gap-1 flex-wrap justify-end max-w-[50%]">
                      {(Object.entries(profile.customSchedule) as [string, DayPlan][]).filter(([_, p]) => p.type !== 'REST').map(([d]) => (
                        <span key={d} className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-500 flex items-center justify-center text-[10px] font-black uppercase">{d.slice(0,1)}</span>
                      ))}
                    </div>
                  </div>
                  <div className="p-5 flex justify-between items-center">
                    <span className="text-slate-400 font-bold uppercase tracking-wider text-xs">{t.selectMembership}</span>
                    <div className="flex items-center gap-2 text-indigo-500 font-black"><ShieldCheck size={16} />{profile.membership}</div>
                  </div>
                  {!profile.hasPass && (
                    <div className="p-5 flex justify-between items-center">
                      <span className="text-slate-400 font-bold uppercase tracking-wider text-xs">Trial</span>
                      <span className={`font-black ${trialStatus.isExpired ? 'text-red-500' : 'text-amber-500'}`}>
                        {trialStatus.isExpired ? 'Expired' : `${trialStatus.remainingDays} Days Left`}
                      </span>
                    </div>
                  )}
                </div>

                <button onClick={handleReset} className="w-full bg-red-500/10 text-red-500 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all border border-red-500/20 flex items-center justify-center gap-2"><RotateCcw size={18} />{t.resetProfile}</button>
              </div>
            )}
          </div>
        )}
      </main>

      {isAddingExercise && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-end justify-center p-4">
          <div className={`${theme === 'dark' ? 'bg-slate-800' : 'bg-white'} w-full max-w-md rounded-[40px] p-6 space-y-6 shadow-2xl animate-in slide-in-from-bottom duration-300 border-t border-indigo-500/30`}>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-black">{t.plan.addExercise}</h3>
                <p className="text-xs opacity-50 font-bold">Selecting for {t[isAddingExercise.day]}</p>
              </div>
              <button onClick={() => setIsAddingExercise(null)} className="p-2 hover:bg-slate-500/10 rounded-full"><X size={24} /></button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto space-y-3 pr-2 custom-scrollbar">
              {Object.values(getLocalizedLibrary(lang)).flat().map(ex => (
                <button key={ex.id} onClick={() => handleAddExerciseToDay(isAddingExercise.day, ex.id)} className={`w-full flex items-center gap-4 p-4 rounded-2xl border ${theme === 'dark' ? 'border-slate-700 hover:bg-slate-700' : 'border-slate-100 hover:bg-indigo-50'} transition-all text-left group`}>
                   <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors"><Plus size={20} /></div>
                   <div className="flex-1"><p className="font-black">{ex.name}</p><p className="text-[10px] opacity-40 font-black uppercase">{ex.muscleGroup}</p></div>
                   <div className="text-[10px] bg-indigo-500/10 px-2 py-1 rounded font-black text-indigo-500">{ex.tags?.[0]}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <nav className={`fixed bottom-0 left-0 right-0 ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-t'} px-6 py-4 flex justify-between items-center shadow-lg max-w-md mx-auto z-30 rounded-t-[40px]`}>
        {[
          { id: 'home', icon: Flame, label: 'Home' },
          { id: 'schedule', icon: LayoutList, label: 'Plan' },
          { id: 'longevity', icon: HeartPulse, label: 'Vital' },
          { id: 'ai', icon: Activity, label: 'Coach' },
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

const LongevityView: React.FC<{ theme: Theme, lang: Language }> = ({ theme, lang }) => {
  const t = translations[lang] as any;
  const cardClasses = theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200';
  
  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-400 pb-10">
      <div className="flex items-center gap-3 px-2">
        <div className="w-12 h-12 bg-rose-500/10 rounded-2xl flex items-center justify-center text-rose-500 shadow-sm">
          <HeartPulse size={28} />
        </div>
        <div>
          <h2 className="text-2xl font-black leading-tight">{t.longevity}</h2>
          <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{t.insights}</p>
        </div>
      </div>

      <section className="bg-gradient-to-br from-indigo-600 via-indigo-500 to-indigo-700 rounded-[40px] p-8 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5 rotate-12"><Fingerprint size={180} /></div>
        <div className="relative z-10 flex flex-col items-center text-center">
          <p className="text-indigo-100 text-[10px] font-black uppercase tracking-widest mb-2">{t.healthQuotient}</p>
          <div className="relative w-32 h-32 flex items-center justify-center mb-4">
            <svg className="absolute w-full h-full -rotate-90">
              <circle cx="64" cy="64" r="58" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
              <circle 
                cx="64" cy="64" r="58" fill="none" stroke="white" strokeWidth="8" 
                strokeDasharray={`${(85 / 100) * 364} 364`} strokeLinecap="round"
              />
            </svg>
            <span className="text-4xl font-black">85</span>
          </div>
          <p className="text-sm font-medium opacity-90 max-w-[200px]">
            Excellent metabolic and physical state. Consistency is paying off.
          </p>
        </div>
      </section>

      <div className="grid grid-cols-2 gap-4">
        <div className={`${cardClasses} p-5 rounded-3xl border shadow-sm flex flex-col gap-3`}>
          <div className="w-10 h-10 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500"><TrendingUp size={20} /></div>
          <div>
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{t.biologicalAge}</p>
            <p className="text-xl font-black">28.5</p>
          </div>
        </div>
        <div className={`${cardClasses} p-5 rounded-3xl border shadow-sm flex flex-col gap-3`}>
          <div className="w-10 h-10 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-500"><Target size={20} /></div>
          <div>
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{t.mobilityScore}</p>
            <p className="text-xl font-black">92%</p>
          </div>
        </div>
        <div className={`${cardClasses} p-5 rounded-3xl border shadow-sm flex flex-col gap-3`}>
          <div className="w-10 h-10 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-500"><Zap size={20} /></div>
          <div>
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{t.recoveryIndex}</p>
            <p className="text-xl font-black">78/100</p>
          </div>
        </div>
        <div className={`${cardClasses} p-5 rounded-3xl border shadow-sm flex flex-col gap-3`}>
          <div className="w-10 h-10 bg-rose-500/10 rounded-2xl flex items-center justify-center text-rose-500"><Calendar size={20} /></div>
          <div>
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{t.consistency}</p>
            <p className="text-xl font-black">14 Days</p>
          </div>
        </div>
      </div>

      <div className={`${cardClasses} p-6 rounded-[35px] border shadow-sm space-y-4`}>
        <div className="flex items-center gap-2">
          <Lightbulb size={18} className="text-indigo-500" />
          <h3 className="text-sm font-black uppercase tracking-widest">{t.recentInsights}</h3>
        </div>
        <div className="bg-green-500/10 p-4 rounded-2xl flex items-center gap-3">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white shadow-sm">
            <Check size={18} />
          </div>
          <span className="text-sm font-black">{t.hipMobilityImproved}</span>
        </div>
      </div>

      <div className={`${cardClasses} p-6 rounded-[35px] border shadow-sm space-y-4`}>
        <div className="flex items-center gap-2">
          <Activity size={18} className="text-indigo-500" />
          <h3 className="text-sm font-black uppercase tracking-widest">{t.tips}</h3>
        </div>
        <div className="space-y-3">
          {[
            "Focus on eccentric phase to protect joints.",
            "Hydration is at 70% target. Increase water intake.",
            "Consistency in mobility training is key for longevity."
          ].map((tip, i) => (
            <div key={i} className="flex gap-3 text-sm font-medium opacity-70">
              <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5 shrink-0" />
              <span>{tip}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const CheckoutView: React.FC<{ onPurchase: () => void, onBack: () => void, theme: Theme }> = ({ onPurchase, onBack, theme }) => {
  return (
    <div className="space-y-8 animate-in zoom-in-95 duration-300 py-4">
      <header className="flex items-center justify-between">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-indigo-500/10"><ChevronLeft size={24} /></button>
        <h2 className="text-xl font-black uppercase tracking-widest">Premium Pass</h2>
        <div className="w-10"></div>
      </header>

      <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-8 rounded-[40px] text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10 rotate-12"><Trophy size={160} /></div>
        <span className="bg-white/20 text-[10px] font-black uppercase px-3 py-1 rounded-full mb-4 inline-block">Lifetime Membership</span>
        <h3 className="text-4xl font-black mb-2">Unlock Your Best Self</h3>
        <p className="text-indigo-100 font-medium mb-8">Get full access to all specialized routines and the MyFitRoute AI Coach.</p>
        
        <div className="space-y-4 mb-8">
          {[
            { icon: Dumbbell, text: "60+ Localized Exercises" },
            { icon: Activity, text: "AI Movement Insight" },
            { icon: ShieldCheck, text: "Longevity Focused Tracking" },
            { icon: LayoutList, text: "Custom Multi-Group Schedules" }
          ].map((feat, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="bg-white/10 p-2 rounded-xl"><feat.icon size={18} /></div>
              <span className="font-bold text-sm">{feat.text}</span>
            </div>
          ))}
        </div>

        <div className="flex items-end gap-2 mb-8">
          <span className="text-4xl font-black">$29.99</span>
          <span className="text-indigo-200 font-bold mb-1 opacity-60">one-time payment</span>
        </div>

        <button 
          onClick={onPurchase}
          className="w-full bg-white text-indigo-700 py-5 rounded-3xl font-black text-xl shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
        >
          <ShoppingCart size={24} />
          PURCHASE PASS
        </button>
      </div>

      <p className="text-center text-xs font-bold opacity-40 px-8">
        Your purchase supports the development of science-based fitness tools for everyone. 
        Secure encrypted payment.
      </p>
    </div>
  );
};

const ProfileEditor: React.FC<{ profile: UserProfile, onSave: (p: UserProfile) => void, lang: Language, theme: Theme, toggleTheme: () => void }> = ({ profile, onSave, lang, theme, toggleTheme }) => {
  const [formData, setFormData] = useState<UserProfile>(() => ({ ...profile }));
  const t = translations[lang] as any;
  const cardClasses = theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200';
  const inputClasses = theme === 'dark' ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-slate-50 border-slate-100 text-slate-900';

  const updateDayType = (day: string, type: string) => {
    setFormData({ ...formData, customSchedule: { ...formData.customSchedule, [day]: { type, customExerciseIds: [] } } });
  };

  return (
    <div className={`space-y-6 ${cardClasses} border p-6 rounded-3xl shadow-sm animate-in fade-in duration-300`}>
      <div className="flex justify-between items-center mb-2">
        <label className="text-xs font-black uppercase tracking-widest text-slate-400 px-1">{t.themeMode}</label>
        <button onClick={toggleTheme} className={`p-3 rounded-2xl border ${cardClasses} flex items-center gap-2 font-bold text-sm`}>
          {theme === 'dark' ? <><Moon size={16} /> {t.dark}</> : <><Sun size={16} /> {t.light}</>}
        </button>
      </div>
      <div className="space-y-4">
        <div className="space-y-2"><label className="text-xs font-black uppercase tracking-widest text-slate-400 px-1">Display Name</label>
        <input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className={`w-full ${inputClasses} border-2 rounded-2xl p-4 focus:border-indigo-600 outline-none transition-all font-bold shadow-sm`} /></div>
        <div className="space-y-3">
          <label className="text-xs font-black uppercase tracking-widest text-slate-400 px-1">{t.plan.title}</label>
          <div className="space-y-2">
            {DAYS_KEYS.map(dayKey => (
              <div key={dayKey} className="flex gap-2 items-center">
                 <div className={`w-10 h-10 ${inputClasses} rounded-xl flex items-center justify-center font-black text-[10px] uppercase opacity-50 shrink-0`}>{t[dayKey]?.substring(0, 3)}</div>
                 <select value={formData.customSchedule[dayKey]?.type || 'REST'} onChange={(e) => updateDayType(dayKey, e.target.value)} className={`flex-1 ${inputClasses} border-2 rounded-2xl p-3 focus:border-indigo-600 outline-none transition-all font-bold text-xs`}>
                   <option value="REST">{t.restDay}</option><option value="FULLBODY">{t.fullbody}</option><option value="CHEST">{t.chest}</option><option value="BACK">{t.back}</option><option value="LEGS">{t.legs}</option><option value="SHOULDERS">{t.shoulders}</option><option value="ARMS">{t.arms}</option><option value="CORE">{t.core}</option><option value="GLUTES">{t.glutes}</option><option value="BALANCE">{t.balance}</option>
                 </select>
              </div>
            ))}
          </div>
        </div>
      </div>
      <button onClick={() => onSave(formData)} className="w-full bg-indigo-600 text-white py-5 rounded-[25px] font-black text-xl shadow-xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 active:scale-95"><Save size={24} /> {t.plan.save}</button>
    </div>
  );
};

const Onboarding: React.FC<{ onComplete: (p: UserProfile) => void, lang: Language, setLang: (l: Language) => void, theme: Theme, toggleTheme: () => void }> = ({ onComplete, lang, setLang, theme, toggleTheme }) => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    name: '', weight: 70, height: 170, level: ExperienceLevel.BEGINNER, focus: WorkoutFocus.QUALITY, goal: FitnessGoal.STRENGTHEN,
    preference: WorkoutPreference.FULLBODY, membership: MembershipType.DIGITAL, language: lang, theme, customSchedule: PRESETS.LONGEVITY,
    sessionDuration: 45, subscriptionActive: true, nextBillingDate: '2025-01-01', hasPass: false, trialStartDate: new Date().toISOString()
  });
  const t = translations[lang] as any;
  const themeClasses = theme === 'dark' ? 'bg-slate-900 text-slate-50' : 'bg-slate-50 text-slate-900';
  const cardClasses = theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200';
  const inputClasses = theme === 'dark' ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-100 text-slate-900';

  if (step === 0) {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center p-8 ${themeClasses} text-center`}>
        <div className="absolute top-8 right-8"><button onClick={toggleTheme} className="p-3 bg-indigo-500/10 rounded-full">{theme === 'dark' ? <Sun className="text-amber-400" /> : <Moon />}</button></div>
        <div className="w-24 h-24 bg-indigo-600 rounded-[30px] flex items-center justify-center text-white mb-10 shadow-2xl rotate-6"><Dumbbell size={48} /></div>
        <h1 className="text-5xl font-black mb-6 tracking-tight leading-none">{t.onboardingTitle}</h1>
        <div className="flex gap-4 mb-12">
          {[Language.PT, Language.EN, Language.ES].map(l => (
            <button key={l} onClick={() => { setLang(l); setFormData(d => ({ ...d, language: l })); }} className={`w-14 h-14 rounded-2xl border-4 flex items-center justify-center font-black transition-all ${lang === l ? 'border-indigo-600 text-indigo-600 bg-indigo-50 shadow-lg' : 'opacity-20'}`}>{l}</button>
          ))}
        </div>
        <button onClick={() => setStep(1)} className="w-full max-w-xs bg-indigo-600 text-white py-5 rounded-[25px] font-black text-xl shadow-xl active:scale-95">START</button>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${themeClasses} p-8 max-w-md mx-auto flex flex-col transition-colors`}>
      <div className="flex-1 space-y-10">
        <header className="space-y-4">
          <div className="h-2 bg-slate-500/10 rounded-full"><div className="h-full bg-indigo-600 rounded-full transition-all" style={{ width: `${(step / 3) * 100}%` }} /></div>
          <h2 className="text-4xl font-black">Profile</h2>
        </header>
        {step === 1 && (
          <div className="space-y-6">
            <div className="space-y-2"><label className="text-xs font-black uppercase opacity-40">Display Name</label>
            <input value={formData.name || ''} placeholder={t.namePlaceholder} className={`w-full ${inputClasses} border-2 rounded-2xl p-5 focus:border-indigo-600 outline-none transition-all font-bold placeholder:opacity-30 shadow-sm`} onChange={e => setFormData({ ...formData, name: e.target.value })} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><label className="text-xs font-black uppercase opacity-40">Weight (kg)</label>
              <input type="number" value={formData.weight || ''} className={`w-full ${inputClasses} border-2 rounded-2xl p-5 focus:border-indigo-600 outline-none font-bold`} onChange={e => setFormData({ ...formData, weight: Number(e.target.value) })} /></div>
              <div className="space-y-2"><label className="text-xs font-black uppercase opacity-40">Height (cm)</label>
              <input type="number" value={formData.height || ''} className={`w-full ${inputClasses} border-2 rounded-2xl p-5 focus:border-indigo-600 outline-none font-bold`} onChange={e => setFormData({ ...formData, height: Number(e.target.value) })} /></div>
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="space-y-6">
            <p className="font-black text-xl">{t.selectLevel}</p>
            <div className="grid grid-cols-1 gap-4">
              {[ExperienceLevel.BEGINNER, ExperienceLevel.INTERMEDIATE, ExperienceLevel.ADVANCED].map(lvl => (
                <button key={lvl} onClick={() => setFormData({ ...formData, level: lvl })} className={`p-6 rounded-3xl border-2 text-left flex justify-between items-center transition-all ${formData.level === lvl ? 'border-indigo-600 bg-indigo-500/10 shadow-md' : 'border-slate-500/10'}`}>
                  <div className="flex flex-col gap-1"><span className="font-black text-lg">{lvl}</span></div>
                  {formData.level === lvl && <CheckCircle2 className="text-indigo-600" size={24} />}
                </button>
              ))}
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="space-y-8 text-center py-6">
             <div className="w-20 h-20 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto mb-4"><ShieldCheck className="text-indigo-600" size={40} /></div>
             <p className="font-black text-2xl">{t.selectMembership}</p>
             <button onClick={() => onComplete({ ...formData, trialStartDate: new Date().toISOString() } as UserProfile)} className="w-full bg-indigo-600 text-white py-5 rounded-[25px] font-black text-xl shadow-xl mt-10 active:scale-95 transition-transform">FINALIZE</button>
          </div>
        )}
      </div>
      {step < 3 && <button onClick={() => setStep(step + 1)} className="bg-indigo-600 text-white py-5 rounded-[25px] font-black text-xl mt-12 shadow-xl active:scale-95">CONTINUE</button>}
    </div>
  );
};

export default App;
