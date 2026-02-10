
import React, { useState } from 'react';
import { Play, Clock, ShieldCheck, Activity, Edit3, X, Search, Plus, Dumbbell } from 'lucide-react';
import { Exercise, PresetWorkout, Language, UserProfile, ExperienceLevel } from '../types';
import { EXERCISE_LIBRARY } from '../data/exercises';
import { translations } from '../translations';


interface WorkoutSummaryProps {
  workout: PresetWorkout;
  lang: Language;
  onStart: (customExercises?: Exercise[]) => void;
  profile: UserProfile;
  onUpdateProfile: (profile: UserProfile) => void;
}

export const WorkoutSummary: React.FC<WorkoutSummaryProps> = ({ workout, lang, onStart, profile, onUpdateProfile }) => {
  const t = translations[lang] as any;
  const [exercises, setExercises] = React.useState<Exercise[]>([]);
  const [swapModalOpen, setSwapModalOpen] = React.useState(false);
  const [editingExerciseIndex, setEditingExerciseIndex] = React.useState<number | null>(null);
  const [swapSearch, setSwapSearch] = React.useState('');

  // Initialize exercises from workout IDs on mount
  React.useEffect(() => {
    const allIds = [
      ...(workout.warmupIds || []),
      ...(workout.mainBlockIds || []),
      ...(workout.accessoryIds || []),
      ...(workout.cooldownIds || [])
    ];

    const loaded = allIds.map(id => {
      const standard = EXERCISE_LIBRARY.find(e => e.id === id);
      const custom = profile.customExercises?.find(e => e.id === id);
      return standard || custom;
    }).filter((e): e is Exercise => !!e);

    setExercises(loaded);
  }, [workout, profile.customExercises]);

  const handleSwapExercise = (newExercise: Exercise) => {
    if (editingExerciseIndex === null) return;

    const updated = [...exercises];
    updated[editingExerciseIndex] = newExercise;
    setExercises(updated);
    setSwapModalOpen(false);
    setSwapSearch('');
    setEditingExerciseIndex(null);
  };

  const handleCreateCustomExercise = () => {
    if (!swapSearch.trim()) return;

    const newExercise: Exercise = {
      id: `custom_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: {
        [Language.EN]: swapSearch,
        [Language.PT]: swapSearch,
        [Language.ES]: swapSearch
      } as any,
      muscleGroup: "CUSTOM",
      sets: 3,
      reps: "10-12",
      videoUrl: "",
      description: "Custom exercise created during workout summary.",
      equipment: "VARIOUS",
      difficulty: ExperienceLevel.INTERMEDIATE,
      executionTips: [],
      commonMistakes: [],
      safetyNotes: []
    };

    const updatedProfile = {
      ...profile,
      customExercises: [...(profile.customExercises || []), newExercise]
    };
    onUpdateProfile(updatedProfile);
    handleSwapExercise(newExercise);
  };

  const getAvailableExercises = () => {
    const fullLib = [...EXERCISE_LIBRARY, ...(profile.customExercises || [])];
    if (!swapSearch) return fullLib.slice(0, 20);

    const lower = swapSearch.toLowerCase();
    return fullLib.filter(ex =>
      ex.name[Language.EN].toLowerCase().includes(lower) ||
      ex.name[Language.PT].toLowerCase().includes(lower) ||
      ex.name[Language.ES].toLowerCase().includes(lower) ||
      ex.muscleGroup.toLowerCase().includes(lower)
    );
  };

  // Helper to map original IDs to current exercises state
  // We need to keep track of indices because IDs might change during swap
  // The renderSection needs to know which range of indices corresponds to which block
  let currentIndex = 0;
  const getNextExercises = (count: number) => {
    const slice = exercises.slice(currentIndex, currentIndex + count);
    const startIdx = currentIndex;
    currentIndex += count;
    return { slice, startIdx };
  };


  const renderSection = (title: string, ids: string[]) => {
    if (!ids || ids.length === 0) return null;

    // Get the corresponding exercises from our state based on the count
    const { slice, startIdx } = getNextExercises(ids.length);

    return (
      <div className="space-y-3">
        <h4 className="text-xs font-black uppercase tracking-widest text-indigo-400 opacity-60">{title}</h4>
        {slice.map((ex, i) => {
          const globalIndex = startIdx + i;
          return (
            <div key={`${ex.id}-${globalIndex}`} className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/30 flex justify-between items-center group">
              <div>
                <p className="font-bold text-sm text-white">{ex.name[lang]}</p>
                <p className="text-[10px] opacity-40 uppercase font-black text-slate-300">{ex.muscleGroup} • {ex.sets}x{ex.reps}</p>
              </div>
              <button
                onClick={() => {
                  setEditingExerciseIndex(globalIndex);
                  setSwapModalOpen(true);
                }}
                className="w-8 h-8 bg-slate-700 hover:bg-indigo-600 rounded-full flex items-center justify-center text-slate-400 hover:text-white transition-all shadow-lg active:scale-95"
              >
                <Edit3 size={14} />
              </button>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-right duration-300 pb-20">
      <div className="space-y-2">
        <h2 className="text-3xl font-black uppercase tracking-tighter italic text-white">{workout.title[lang]}</h2>
        <div className="flex gap-4">
          <span className="flex items-center gap-1 text-xs font-black text-indigo-400 uppercase tracking-widest"><Clock size={14} /> {workout.duration} min</span>
        </div>
        <p className="text-sm opacity-60 italic leading-relaxed text-slate-300">{workout.description[lang]}</p>
      </div>

      <div className="space-y-6">
        {renderSection(t.warmup, workout.warmupIds)}
        {renderSection(t.mainBlock, workout.mainBlockIds)}
        {renderSection(t.plan.modify, workout.accessoryIds)}
        {renderSection(t.cooldown, workout.cooldownIds)}
      </div>

      <button
        onClick={() => onStart(exercises)}
        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-6 rounded-[25px] font-black text-xl shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-3 uppercase tracking-widest"
      >
        <Play fill="currentColor" size={24} /> {t.home.startWorkout}
      </button>

      {/* SWAP EXERCISE MODAL */}
      {swapModalOpen && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
          <div className="bg-slate-900 w-full max-w-lg h-[85vh] sm:h-[600px] rounded-t-[30px] sm:rounded-[30px] border border-white/10 flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-300">
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black italic uppercase text-white tracking-tighter">{lang === Language.PT ? 'Trocar Exercício' : 'Swap Exercise'}</h3>
                <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">
                  {editingExerciseIndex !== null && exercises[editingExerciseIndex]?.name[lang]}
                </p>
              </div>
              <button onClick={() => setSwapModalOpen(false)} className="p-2 bg-slate-800 rounded-full text-slate-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            {/* Search */}
            <div className="p-4 border-b border-white/5 bg-slate-800/30">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input
                  type="text"
                  placeholder={lang === Language.PT ? 'Buscar ou criar novo...' : 'Search or create new...'}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-indigo-500 outline-none font-bold"
                  value={swapSearch}
                  onChange={(e) => setSwapSearch(e.target.value)}
                  autoFocus
                />
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {/* Create New Option */}
              {swapSearch && (
                <button
                  onClick={handleCreateCustomExercise}
                  className="w-full p-4 bg-indigo-600/10 border border-indigo-500/30 rounded-2xl flex items-center gap-3 text-left hover:bg-indigo-600/20 transition-all group mb-4"
                >
                  <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                    <Plus size={20} />
                  </div>
                  <div>
                    <p className="font-black text-indigo-400 uppercase text-xs tracking-wider">{lang === Language.PT ? 'Criar Novo' : 'Create New'}</p>
                    <p className="font-bold text-white text-sm">"{swapSearch}"</p>
                  </div>
                </button>
              )}

              {getAvailableExercises().map(ex => (
                <button
                  key={ex.id}
                  onClick={() => handleSwapExercise(ex)}
                  className="w-full p-4 bg-slate-800/50 hover:bg-slate-800 rounded-2xl border border-white/5 flex items-center gap-4 text-left group transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-slate-700 flex items-center justify-center text-slate-400 group-hover:text-indigo-400 group-hover:bg-slate-900 transition-colors">
                    <Dumbbell size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-slate-200 group-hover:text-white truncate">{ex.name[lang]}</h4>
                    <div className="flex gap-2 mt-1">
                      <span className="text-[9px] font-black uppercase bg-slate-900 px-1.5 py-0.5 rounded text-slate-500">{ex.muscleGroup}</span>
                      {ex.id.startsWith('custom') && (
                        <span className="text-[9px] font-black uppercase bg-indigo-500/20 px-1.5 py-0.5 rounded text-indigo-400">Custom</span>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
