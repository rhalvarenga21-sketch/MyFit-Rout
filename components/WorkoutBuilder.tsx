
import React, { useState } from 'react';
import { Trash2, ChevronUp, ChevronDown, Save, X, Plus } from 'lucide-react';
import { CustomWorkout, Exercise, Language, WorkoutItem } from '../types';
import { EXERCISE_LIBRARY } from '../data/exercises';
import { translations } from '../translations';

interface WorkoutBuilderProps {
  lang: Language;
  onSave: (workout: CustomWorkout) => void;
  onClose: () => void;
  initialWorkout?: CustomWorkout;
}

export const WorkoutBuilder: React.FC<WorkoutBuilderProps> = ({ lang, onSave, onClose, initialWorkout }) => {
  const [title, setTitle] = useState(initialWorkout?.title || '');
  const [items, setItems] = useState<WorkoutItem[]>(initialWorkout?.items || []);
  const t = translations[lang] as any;

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const move = (index: number, dir: 'up' | 'down') => {
    const newItems = [...items];
    const target = dir === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= items.length) return;
    [newItems[index], newItems[target]] = [newItems[target], newItems[index]];
    setItems(newItems);
  };

  const handleSave = () => {
    if (!title) return alert("Please enter a title");
    onSave({
      id: initialWorkout?.id || Math.random().toString(36).substr(2, 9),
      title,
      description: "Custom workout created by user",
      items,
      createdAt: new Date().toISOString()
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900 flex flex-col p-6 animate-in slide-in-from-bottom">
      <header className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-black">{t.builder.title}</h2>
        <button onClick={onClose} className="p-2 bg-slate-800 rounded-full"><X/></button>
      </header>

      <div className="flex-1 space-y-6 overflow-y-auto pr-2 custom-scroll">
        <input 
          placeholder="Workout Title (e.g. My Push Day)"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full bg-slate-800 border-2 border-slate-700 p-6 rounded-3xl outline-none focus:border-indigo-500 font-black text-xl"
        />

        <div className="space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-20 opacity-30 italic">{t.builder.empty}</div>
          ) : (
            items.map((item, idx) => {
              const ex = EXERCISE_LIBRARY.find(e => e.id === item.exerciseId);
              return (
                <div key={idx} className="bg-slate-800 p-5 rounded-3xl border border-slate-700/50 flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-black">{ex?.name[lang]}</h4>
                    <div className="flex gap-2">
                      <button onClick={() => move(idx, 'up')} className="p-2 hover:bg-slate-700 rounded-lg"><ChevronUp size={16}/></button>
                      <button onClick={() => move(idx, 'down')} className="p-2 hover:bg-slate-700 rounded-lg"><ChevronDown size={16}/></button>
                      <button onClick={() => removeItem(idx)} className="p-2 hover:bg-rose-500/10 text-rose-500 rounded-lg"><Trash2 size={16}/></button>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <span className="text-[9px] font-black uppercase opacity-40">Sets</span>
                      <input type="number" value={item.sets} onChange={e => {
                        const ni = [...items];
                        ni[idx].sets = parseInt(e.target.value);
                        setItems(ni);
                      }} className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2 text-center text-xs font-bold" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[9px] font-black uppercase opacity-40">Reps</span>
                      <input value={item.reps} onChange={e => {
                        const ni = [...items];
                        ni[idx].reps = e.target.value;
                        setItems(ni);
                      }} className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2 text-center text-xs font-bold" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[9px] font-black uppercase opacity-40">Rest (s)</span>
                      <input value={item.rest} onChange={e => {
                        const ni = [...items];
                        ni[idx].rest = e.target.value;
                        setItems(ni);
                      }} className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2 text-center text-xs font-bold" />
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      <div className="pt-6 space-y-4">
        <button onClick={handleSave} className="w-full bg-indigo-600 py-6 rounded-3xl font-black text-xl flex items-center justify-center gap-3">
          <Save size={20}/> {t.builder.save}
        </button>
      </div>
    </div>
  );
};
