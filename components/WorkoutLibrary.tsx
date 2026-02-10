
import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Exercise, Language } from '../types';
import { EXERCISE_LIBRARY } from '../data/exercises';
import { ExerciseCard } from './ExerciseCard';
import { translations } from '../translations';

interface WorkoutLibraryProps {
  lang: Language;
  onAddExercise: (ex: Exercise) => void;
}

export const WorkoutLibrary: React.FC<WorkoutLibraryProps> = ({ lang, onAddExercise }) => {
  const [search, setSearch] = useState('');
  const [muscleFilter, setMuscleFilter] = useState<string | null>(null);
  const [previewEx, setPreviewEx] = useState<Exercise | null>(null);
  const t = translations[lang] as any;

  const muscles = Array.from(new Set(EXERCISE_LIBRARY.map(e => e.muscleGroup)));

  const filtered = EXERCISE_LIBRARY.filter(ex => {
    const matchesSearch = ex.name[lang].toLowerCase().includes(search.toLowerCase());
    const matchesMuscle = !muscleFilter || ex.muscleGroup === muscleFilter;
    return matchesSearch && matchesMuscle;
  });

  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-300">
      <div className="flex justify-between items-end">
        <h2 className="text-2xl font-black">{t.library.title}</h2>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18}/>
        <input 
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder={t.library.search}
          className="w-full bg-slate-800 border border-slate-700 p-4 pl-12 rounded-2xl outline-none focus:border-indigo-500 font-bold"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 custom-scroll">
        <button 
          onClick={() => setMuscleFilter(null)}
          className={`px-4 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all ${!muscleFilter ? 'bg-indigo-600' : 'bg-slate-800 border border-slate-700 opacity-60'}`}
        >
          TODOS
        </button>
        {muscles.map(m => (
          <button 
            key={m}
            onClick={() => setMuscleFilter(m)}
            className={`px-4 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all ${muscleFilter === m ? 'bg-indigo-600' : 'bg-slate-800 border border-slate-700 opacity-60'}`}
          >
            {m.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {filtered.map(ex => (
          <ExerciseCard key={ex.id} exercise={ex} lang={lang} onAdd={onAddExercise} onPreview={setPreviewEx} />
        ))}
      </div>

      {previewEx && (
        <div className="fixed inset-0 z-50 bg-slate-900/90 backdrop-blur-md flex items-center justify-center p-6">
          <div className="bg-slate-800 w-full max-w-md p-6 rounded-[40px] border border-slate-700 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-black">{previewEx.name[lang]}</h3>
              <button onClick={() => setPreviewEx(null)}><X/></button>
            </div>
            <div className="aspect-video bg-black rounded-3xl overflow-hidden border border-slate-700">
              <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${previewEx.videoUrl}`} title="Video" />
            </div>
            <div className="text-sm opacity-60">{previewEx.description}</div>
            <button onClick={() => { onAddExercise(previewEx); setPreviewEx(null); }} className="w-full bg-indigo-600 py-4 rounded-2xl font-black">{t.library.add}</button>
          </div>
        </div>
      )}
    </div>
  );
};
