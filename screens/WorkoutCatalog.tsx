
import React, { useState } from 'react';
import { Search, Filter, X, Calendar } from 'lucide-react';
import { PresetWorkout, CustomWorkout, Language, BodyAreaTag, WorkoutCategory, UserProfile, ExperienceLevel } from '../types';
import { PRESET_WORKOUTS } from '../data/workouts';
import { WorkoutCard } from '../components/WorkoutCard';
import { translations } from '../translations';

interface WorkoutCatalogProps {
  lang: Language;
  profile: UserProfile;
  onSelect: (w: PresetWorkout | CustomWorkout) => void;
  onAssign: (w: PresetWorkout | CustomWorkout, day: string) => void;
}

const DAYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const;

export const WorkoutCatalog: React.FC<WorkoutCatalogProps> = ({ lang, profile, onSelect, onAssign }) => {
  const [search, setSearch] = useState('');
  const [tagFilter, setTagFilter] = useState<BodyAreaTag | null>(null);
  const [catFilter, setCatFilter] = useState<WorkoutCategory | null>(null);
  const [assigningWorkout, setAssigningWorkout] = useState<PresetWorkout | CustomWorkout | null>(null);

  // WIZARD STATE
  const [environment, setEnvironment] = useState<'GYM' | 'HOME' | null>(null);
  const [level, setLevel] = useState<ExperienceLevel | null>(null);
  const [macro, setMacro] = useState<WorkoutCategory | null>(null);

  const t = translations[lang] as any;

  const allWorkouts: (PresetWorkout | CustomWorkout)[] = [
    ...PRESET_WORKOUTS,
    ...profile.customWorkouts
  ];

  // Smart Mapping for Tags
  const RELATED_TAGS: Record<string, BodyAreaTag[]> = {
    [BodyAreaTag.BICEPS]: [BodyAreaTag.ARMS],
    [BodyAreaTag.TRICEPS]: [BodyAreaTag.ARMS],
    [BodyAreaTag.GLUTES]: [BodyAreaTag.LEGS],
    [BodyAreaTag.CALVES]: [BodyAreaTag.LEGS],
    [BodyAreaTag.QUADRICEPS]: [BodyAreaTag.LEGS],
    [BodyAreaTag.HAMSTRINGS]: [BodyAreaTag.LEGS]
  };

  // Macro to Tags Mapping
  const MACRO_TAGS: Partial<Record<WorkoutCategory, BodyAreaTag[]>> = {
    [WorkoutCategory.UPPER]: [BodyAreaTag.CHEST, BodyAreaTag.BACK, BodyAreaTag.SHOULDERS, BodyAreaTag.ARMS, BodyAreaTag.CORE],
    [WorkoutCategory.LOWER]: [BodyAreaTag.LEGS, BodyAreaTag.QUADRICEPS, BodyAreaTag.HAMSTRINGS, BodyAreaTag.GLUTES, BodyAreaTag.CALVES],
    [WorkoutCategory.CARDIO]: [BodyAreaTag.CARDIO],
    [WorkoutCategory.FULL_BODY]: []
  };

  const filtered = allWorkouts.filter(w => {
    const isPreset = 'tags' in w;
    const titleStr = isPreset ? (w as PresetWorkout).title[lang] : (w as CustomWorkout).title;
    const matchesSearch = titleStr.toLowerCase().includes(search.toLowerCase());

    // Enhanced Tag Matching
    let matchesTag = true;
    if (tagFilter && isPreset) {
      const workoutTags = (w as PresetWorkout).tags;
      const targetTags = [tagFilter, ...(RELATED_TAGS[tagFilter] || [])];
      matchesTag = workoutTags.some(t => targetTags.includes(t));
    } else if (tagFilter && !isPreset) {
      matchesTag = false; // Custom workouts might not have tags logic yet, hide if specific tag selected
    }

    const matchesCat = !catFilter || (isPreset && (w as PresetWorkout).primaryCategory === catFilter) || (!isPreset && catFilter === WorkoutCategory.CUSTOM);

    // Wizard Filters
    const matchesEnv = !environment || (isPreset && (w as PresetWorkout).environment === environment) || !isPreset;
    const matchesLevel = !level || (isPreset && (w as PresetWorkout).difficulty === level) || !isPreset;
    const matchesMacro = !macro || (isPreset && (w as PresetWorkout).primaryCategory === macro) || !isPreset;

    // If wizard is active (Env selected), ensure we filter strictly for Presets. 
    // If no Env selected, show everything (or minimal).
    // User wants wizard flow.

    return matchesSearch && matchesTag && matchesCat && matchesEnv && matchesLevel && matchesMacro;
  });

  return (
    <div className="space-y-6 pb-24 animate-in fade-in duration-300">
      <div className="flex justify-between items-end px-1">
        <div>
          <h2 className="text-3xl font-black italic tracking-tighter uppercase">{t.catalog.title}</h2>
          <p className="text-[10px] font-black uppercase opacity-40 tracking-widest">{filtered.length} {t.catalog.availableCount}</p>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder={t.catalog.searchWorkouts}
          className="w-full bg-slate-800 border border-slate-700 p-4 pl-12 rounded-[25px] outline-none focus:border-indigo-500 font-bold shadow-inner"
        />
      </div>

      {/* NEW WIZARD FILTERS */}
      <div className="space-y-6">

        {/* STEP 1: Environment */}
        <div className="space-y-3">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30 px-2">1. {t.catalog.gym} / {t.catalog.home}</h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => { setEnvironment('GYM'); setLevel(null); setMacro(null); setTagFilter(null); }}
              className={`p-4 rounded-3xl border text-center transition-all ${environment === 'GYM' ? 'bg-indigo-600 border-indigo-500 shadow-lg shadow-indigo-600/20' : 'bg-slate-800 border-slate-700 opacity-60'}`}
            >
              <span className="block text-2xl mb-1">🏋️</span>
              <span className="text-xs font-black uppercase tracking-widest">{t.catalog.gym}</span>
            </button>
            <button
              onClick={() => { setEnvironment('HOME'); setLevel(null); setMacro(null); setTagFilter(null); }}
              className={`p-4 rounded-3xl border text-center transition-all ${environment === 'HOME' ? 'bg-indigo-600 border-indigo-500 shadow-lg shadow-indigo-600/20' : 'bg-slate-800 border-slate-700 opacity-60'}`}
            >
              <span className="block text-2xl mb-1">🏠</span>
              <span className="text-xs font-black uppercase tracking-widest">{t.catalog.home}</span>
            </button>
          </div>
        </div>

        {/* STEP 2: Level (Only shows after Env selected) */}
        {environment && (
          <div className="space-y-3 animate-in slide-in-from-left fade-in duration-300">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30 px-2">2. {t.onboarding.step3}</h3>
            <div className="grid grid-cols-3 gap-2">
              {[ExperienceLevel.BEGINNER, ExperienceLevel.INTERMEDIATE, ExperienceLevel.ADVANCED].map(lvl => (
                <button
                  key={lvl}
                  onClick={() => { setLevel(lvl); setMacro(null); setTagFilter(null); }}
                  className={`py-3 rounded-2xl border text-[10px] font-black uppercase tracking-wider transition-all ${level === lvl ? 'bg-indigo-600 border-indigo-500' : 'bg-slate-800 border-slate-700 opacity-60'}`}
                >
                  {t.profile.levels[lvl]}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: Macro Category */}
        {level && (
          <div className="space-y-3 animate-in slide-in-from-left fade-in duration-300">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30 px-2">3. {t.catalog.region}</h3>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => { setMacro(WorkoutCategory.UPPER); setTagFilter(null); }}
                className={`p-3 rounded-2xl border text-center transition-all ${macro === WorkoutCategory.UPPER ? 'bg-indigo-600 border-indigo-500' : 'bg-slate-800 border-slate-700 opacity-60'}`}
              >
                <span className="block text-xl mb-1">⬆️</span>
                <span className="text-[10px] font-black uppercase tracking-widest">{t.categories.UPPER}</span>
              </button>
              <button
                onClick={() => { setMacro(WorkoutCategory.LOWER); setTagFilter(null); }}
                className={`p-3 rounded-2xl border text-center transition-all ${macro === WorkoutCategory.LOWER ? 'bg-indigo-600 border-indigo-500' : 'bg-slate-800 border-slate-700 opacity-60'}`}
              >
                <span className="block text-xl mb-1">⬇️</span>
                <span className="text-[10px] font-black uppercase tracking-widest">{t.categories.LOWER}</span>
              </button>
              <button
                onClick={() => { setMacro(WorkoutCategory.CARDIO); setTagFilter(null); }}
                className={`p-3 rounded-2xl border text-center transition-all ${macro === WorkoutCategory.CARDIO ? 'bg-indigo-600 border-indigo-500' : 'bg-slate-800 border-slate-700 opacity-60'}`}
              >
                <span className="block text-xl mb-1">🏃</span>
                <span className="text-[10px] font-black uppercase tracking-widest">{t.categories.CARDIO}</span>
              </button>
              {/* Full Body or others can go here if needed */}
            </div>
          </div>
        )}

        {/* STEP 4: Focus (Only shows after Macro selected AND if Macro has tags) */}
        {macro && MACRO_TAGS[macro] && MACRO_TAGS[macro]!.length > 0 && (
          <div className="space-y-3 animate-in slide-in-from-left fade-in duration-300">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30 px-2">4. {t.catalog.focus}</h3>
            <div className="flex gap-2 overflow-x-auto pb-2 custom-scroll px-1">
              <button
                onClick={() => setTagFilter(null)}
                className={`px-4 py-3 rounded-xl text-[10px] font-black whitespace-nowrap transition-all uppercase tracking-widest ${!tagFilter ? 'bg-indigo-600 shadow-lg shadow-indigo-600/20' : 'bg-slate-800 border border-slate-700 opacity-60'}`}
              >
                {t.catalog.all}
              </button>
              {MACRO_TAGS[macro]!.map(tag => (
                <button
                  key={tag}
                  onClick={() => setTagFilter(tag)}
                  className={`px-4 py-3 rounded-xl text-[10px] font-black whitespace-nowrap transition-all uppercase tracking-widest ${tagFilter === tag ? 'bg-indigo-600 shadow-lg shadow-indigo-600/20' : 'bg-slate-800 border border-slate-700 opacity-60'}`}
                >
                  {t.tags[tag]}
                </button>
              ))}
            </div>
          </div>
        )}

      </div>

      <div className="grid grid-cols-1 gap-4">
        {filtered.map(w => (
          <WorkoutCard
            key={w.id}
            workout={w}
            lang={lang}
            onStart={onSelect}
            onAssign={setAssigningWorkout}
          />
        ))}
      </div>

      {assigningWorkout && (
        <div className="fixed inset-0 z-[60] bg-slate-900/90 backdrop-blur-md flex items-end justify-center p-6 animate-in fade-in">
          <div className="bg-slate-800 w-full max-w-md p-8 rounded-[40px] border border-slate-700 space-y-6 animate-in slide-in-from-bottom">
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <h3 className="text-xl font-black uppercase">{t.catalog.selectDay}</h3>
                <p className="text-[10px] font-black uppercase opacity-40 text-indigo-400">
                  {'tags' in assigningWorkout ? (assigningWorkout as PresetWorkout).title[lang] : (assigningWorkout as CustomWorkout).title}
                </p>
              </div>
              <button onClick={() => setAssigningWorkout(null)} className="p-2 bg-slate-700/50 rounded-full text-slate-400"><X size={20} /></button>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {DAYS.map(day => (
                <button
                  key={day}
                  onClick={() => {
                    onAssign(assigningWorkout, day);
                    setAssigningWorkout(null);
                  }}
                  className="w-full bg-slate-900 border border-slate-700 p-5 rounded-2xl flex justify-between items-center group hover:border-indigo-500 hover:bg-indigo-500/10 transition-all"
                >
                  <span className="font-black text-sm uppercase tracking-widest group-hover:text-indigo-400">{t[day]}</span>
                  <Calendar size={18} className="opacity-20 group-hover:opacity-100 group-hover:text-indigo-400 transition-all" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
