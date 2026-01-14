
import React, { useState } from 'react';
import { Search, Filter, X, Calendar } from 'lucide-react';
import { PresetWorkout, CustomWorkout, Language, BodyAreaTag, WorkoutCategory, UserProfile } from '../types';
import { PRESET_WORKOUTS } from '../presets';
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
  
  const t = translations[lang] as any;

  const allWorkouts: (PresetWorkout | CustomWorkout)[] = [
    ...PRESET_WORKOUTS,
    ...profile.customWorkouts
  ];

  const filtered = allWorkouts.filter(w => {
    // FIX: Extract title string based on whether it's a preset or custom workout
    const isPreset = 'tags' in w;
    const titleStr = isPreset ? (w as PresetWorkout).title[lang] : (w as CustomWorkout).title;
    const matchesSearch = titleStr.toLowerCase().includes(search.toLowerCase());
    
    const matchesTag = !tagFilter || (isPreset && (w as PresetWorkout).tags.includes(tagFilter));
    const matchesCat = !catFilter || (isPreset && (w as PresetWorkout).primaryCategory === catFilter) || (!isPreset && catFilter === WorkoutCategory.CUSTOM);
    return matchesSearch && matchesTag && matchesCat;
  });

  return (
    <div className="space-y-6 pb-24 animate-in fade-in duration-300">
      <div className="flex justify-between items-end px-1">
        <div>
          <h2 className="text-3xl font-black italic tracking-tighter">{t.catalog.title}</h2>
          <p className="text-[10px] font-black uppercase opacity-40 tracking-widest">{filtered.length} Workouts Available</p>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18}/>
        <input 
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder={t.catalog.searchWorkouts}
          className="w-full bg-slate-800 border border-slate-700 p-4 pl-12 rounded-[25px] outline-none focus:border-indigo-500 font-bold shadow-inner"
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30 px-2">{t.catalog.filterByArea}</h3>
        <div className="flex gap-2 overflow-x-auto pb-2 custom-scroll px-1">
          <button 
            onClick={() => setTagFilter(null)}
            className={`px-4 py-2 rounded-xl text-[10px] font-black whitespace-nowrap transition-all uppercase tracking-widest ${!tagFilter ? 'bg-indigo-600 shadow-lg shadow-indigo-600/20' : 'bg-slate-800 border border-slate-700 opacity-60'}`}
          >
            {t.catalog.all}
          </button>
          {Object.values(BodyAreaTag).map(tag => (
            <button 
              key={tag}
              onClick={() => setTagFilter(tag)}
              className={`px-4 py-2 rounded-xl text-[10px] font-black whitespace-nowrap transition-all uppercase tracking-widest ${tagFilter === tag ? 'bg-indigo-600 shadow-lg shadow-indigo-600/20' : 'bg-slate-800 border border-slate-700 opacity-60'}`}
            >
              {t.tags[tag]}
            </button>
          ))}
        </div>
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
                {/* FIX: Extract title string based on whether it's a preset or custom workout for ReactNode rendering */}
                <p className="text-[10px] font-black uppercase opacity-40 text-indigo-400">
                  {'tags' in assigningWorkout ? (assigningWorkout as PresetWorkout).title[lang] : (assigningWorkout as CustomWorkout).title}
                </p>
              </div>
              <button onClick={() => setAssigningWorkout(null)} className="p-2 bg-slate-700/50 rounded-full text-slate-400"><X size={20}/></button>
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
