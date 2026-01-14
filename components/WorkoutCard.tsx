
import React from 'react';
import { Clock, Layers, Calendar, Play } from 'lucide-react';
import { PresetWorkout, CustomWorkout, Language, WorkoutCategory } from '../types';
import { TagChip } from './TagChip';
import { translations } from '../translations';

interface WorkoutCardProps {
  workout: PresetWorkout | CustomWorkout;
  lang: Language;
  onAssign: (w: PresetWorkout | CustomWorkout) => void;
  onStart: (w: PresetWorkout | CustomWorkout) => void;
}

export const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout, lang, onAssign, onStart }) => {
  const t = translations[lang] as any;
  const isPreset = 'tags' in workout;

  const title = isPreset ? (workout as PresetWorkout).title[lang] : (workout as CustomWorkout).title;
  const description = isPreset ? (workout as PresetWorkout).description[lang] : (workout as CustomWorkout).description;

  return (
    <div className="bg-slate-800 p-5 rounded-[30px] border border-slate-700/50 flex flex-col gap-4 group transition-all hover:border-indigo-500/50 shadow-xl">
      <div className="flex justify-between items-start">
        <div className="space-y-1 flex-1">
          <h4 className="font-black text-lg leading-tight group-hover:text-indigo-400 transition-colors uppercase italic tracking-tighter">
            {title}
          </h4>
          <div className="flex items-center gap-3 text-[10px] font-black opacity-40 uppercase tracking-widest">
            <span className="flex items-center gap-1"><Clock size={12}/> {isPreset ? (workout as PresetWorkout).duration : '??'} MIN</span>
            {isPreset && <span className="flex items-center gap-1"><Layers size={12}/> {t.categories[(workout as PresetWorkout).primaryCategory]}</span>}
          </div>
        </div>
        <button 
          onClick={() => onStart(workout)}
          className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg active:scale-90 transition-all hover:bg-indigo-500"
        >
          <Play size={18} fill="white"/>
        </button>
      </div>

      <p className="text-xs opacity-50 line-clamp-2 italic leading-relaxed">
        {description}
      </p>

      <div className="flex flex-wrap gap-1.5 mt-auto pt-2 border-t border-slate-700/30">
        {isPreset && (workout as PresetWorkout).tags.map(tag => (
          <TagChip key={tag} label={tag} lang={lang} />
        ))}
        {!isPreset && <TagChip label={WorkoutCategory.CUSTOM} lang={lang} type="category" />}
      </div>

      <button 
        onClick={() => onAssign(workout)}
        className="mt-2 w-full bg-slate-700/30 hover:bg-indigo-500/10 text-slate-400 hover:text-indigo-400 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-slate-700/50 hover:border-indigo-500/30 transition-all flex items-center justify-center gap-2"
      >
        <Calendar size={14}/> {t.catalog.assign}
      </button>
    </div>
  );
};
