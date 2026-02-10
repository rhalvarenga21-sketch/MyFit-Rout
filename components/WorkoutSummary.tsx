
import React from 'react';
import { Play, Clock, ShieldCheck, Activity } from 'lucide-react';
import { Exercise, PresetWorkout, Language } from '../types';
import { EXERCISE_LIBRARY } from '../data/exercises';
import { translations } from '../translations';

interface WorkoutSummaryProps {
  workout: PresetWorkout;
  lang: Language;
  onStart: () => void;
}

export const WorkoutSummary: React.FC<WorkoutSummaryProps> = ({ workout, lang, onStart }) => {
  const t = translations[lang] as any;
  
  const getExercise = (id: string) => EXERCISE_LIBRARY.find(e => e.id === id);

  const renderSection = (title: string, ids: string[]) => {
    if (!ids || ids.length === 0) return null;
    return (
      <div className="space-y-3">
        <h4 className="text-xs font-black uppercase tracking-widest text-indigo-400 opacity-60">{title}</h4>
        {ids.map(id => {
          const ex = getExercise(id);
          if (!ex) return null;
          return (
            <div key={id} className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/30 flex justify-between items-center">
              <div>
                <p className="font-bold text-sm">{ex.name[lang]}</p>
                <p className="text-[10px] opacity-40 uppercase font-black">{ex.muscleGroup} • {ex.sets}x{ex.reps}</p>
              </div>
              <div className="w-8 h-8 bg-indigo-500/10 rounded-full flex items-center justify-center text-indigo-400">
                <Activity size={14} />
              </div>
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
          <span className="flex items-center gap-1 text-xs font-black text-indigo-400 uppercase tracking-widest"><Clock size={14}/> {workout.duration} min</span>
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
        onClick={onStart}
        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-6 rounded-[25px] font-black text-xl shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-3 uppercase tracking-widest"
      >
        <Play fill="currentColor" size={24}/> COMEÇAR TREINO
      </button>
    </div>
  );
};
