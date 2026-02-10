
import React from 'react';
import { Language } from '../types';
import { translations } from '../translations';

interface TrainingDaysSelectorProps {
  selectedDays: string[];
  onChange: (days: string[]) => void;
  lang: Language;
}

export const TrainingDaysSelector: React.FC<TrainingDaysSelectorProps> = ({ selectedDays, onChange, lang }) => {
  const t = translations[lang] as any;
  const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

  const toggleDay = (day: string) => {
    if (selectedDays.includes(day)) {
      onChange(selectedDays.filter(d => d !== day));
    } else {
      onChange([...selectedDays, day]);
    }
  };

  return (
    <div className="bg-slate-800 p-6 rounded-[35px] border border-slate-700/50 space-y-4">
      <h3 className="text-xs font-black uppercase tracking-widest text-indigo-400 opacity-60">
        {t.plan.trainingDays}
      </h3>
      <div className="flex justify-between gap-2">
        {days.map(day => (
          <button
            key={day}
            onClick={() => toggleDay(day)}
            className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs transition-all ${
              selectedDays.includes(day)
                ? 'bg-indigo-600 text-white shadow-lg scale-110'
                : 'bg-slate-700 text-slate-500 hover:text-slate-300'
            }`}
          >
            {t[day].charAt(0)}
          </button>
        ))}
      </div>
    </div>
  );
};
