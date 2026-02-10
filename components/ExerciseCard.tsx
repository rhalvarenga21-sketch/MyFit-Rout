
import React from 'react';
import { Play, Plus, Info } from 'lucide-react';
import { Exercise, Language } from '../types';

interface ExerciseCardProps {
  exercise: Exercise;
  lang: Language;
  onAdd?: (ex: Exercise) => void;
  onPreview?: (ex: Exercise) => void;
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise, lang, onAdd, onPreview }) => {
  return (
    <div className="bg-slate-800 p-4 rounded-3xl border border-slate-700/50 flex flex-col gap-3 group transition-all hover:border-indigo-500/50">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-bold text-sm leading-tight">{exercise.name[lang]}</h4>
          <span className="text-[10px] uppercase font-black opacity-40">{exercise.muscleGroup}</span>
        </div>
        <div className="flex gap-2">
          {onPreview && (
            <button onClick={() => onPreview(exercise)} className="p-2 bg-slate-700/50 rounded-lg text-slate-400 hover:text-white transition-colors">
              <Play size={14} fill="currentColor"/>
            </button>
          )}
          {onAdd && (
            <button onClick={() => onAdd(exercise)} className="p-2 bg-indigo-600 rounded-lg text-white hover:bg-indigo-500 transition-colors">
              <Plus size={14}/>
            </button>
          )}
        </div>
      </div>
      <div className="flex gap-2 text-[9px] font-bold opacity-60">
        <span className="bg-slate-700 px-2 py-1 rounded-md">{exercise.equipment}</span>
        <span className="bg-slate-700 px-2 py-1 rounded-md">{exercise.difficulty}</span>
      </div>
    </div>
  );
};
