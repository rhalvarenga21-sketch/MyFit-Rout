
import React from 'react';
import { Play, Clock, ShieldCheck, Activity } from 'lucide-react';
import { Exercise, PresetWorkout, Language } from '../types';
import { EXERCISE_DATABASE } from '../presets';
import { translations } from '../translations';

interface WorkoutSummaryProps {
  workout: PresetWorkout;
  lang: Language;
  onStart: () => void;
}

export const WorkoutSummary: React.FC<WorkoutSummaryProps> = ({ workout, lang, onStart }) => {
  const t = translations[lang] as any;
  
  const getExercise = (id: string) => EXERCISE_DATABASE.find(e => e.id === id);

  const renderSection = (title: string, ids: string[]) => {
    if (ids.length === 0) return null;
    return (
      <div className="space-y-3">
        <h4 className="text-xs font-black uppercase tracking-widest text-indigo-400 opacity-60">{title}</h4>
        {ids.map(id => {
          const ex = getExercise(id);
          if (!ex) return null;
          return (
            <div key={id} className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/30 flex justify-between items-center">
              <div>
                <p className="font-bold text-sm">{ex.name}</p>
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
    <div className="space-y-8 animate-in slide-in-from-right duration-300">
      <div className="space-y-2">
        <h2 className="text-3xl font-black">{workout.title}</h2>
        <div className="flex gap-4">
          <span className="flex items-center gap-1 text-xs font-black text-indigo-400"><Clock size={14}/> {workout.duration} min</span>
          <span className="flex items-center gap-1 text-xs font-black text-green-400"><ShieldCheck size={14}/> {workout.category}</span>
        </div>
        <p className="text-sm opacity-60 italic">{workout.description}</p>
      </div>

      <div className="space-y-6">
        {renderSection(t.warmup, workout.warmupIds)}
        {renderSection(t.mainBlock, workout.mainBlockIds)}
        {renderSection(t.plan.modify, workout.accessoryIds)}
        {renderSection(t.cooldown, workout.cooldownIds)}
      </div>

      <button 
        onClick={onStart}
        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-5 rounded-[25px] font-black text-xl shadow-xl active:scale-95 transition-all flex items-center justify-center gap-3"
      >
        <Play fill="currentColor" size={24}/> START WORKOUT
      </button>
    </div>
  );
};
