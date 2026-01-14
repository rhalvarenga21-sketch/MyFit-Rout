
import React from 'react';
import { BodyAreaTag, WorkoutCategory, Language } from '../types';
import { translations } from '../translations';

interface TagChipProps {
  label: BodyAreaTag | WorkoutCategory;
  lang: Language;
  type?: 'area' | 'category';
}

export const TagChip: React.FC<TagChipProps> = ({ label, lang, type = 'area' }) => {
  const t = translations[lang] as any;
  const labelText = type === 'area' 
    ? t.tags[label as BodyAreaTag] 
    : t.categories[label as WorkoutCategory];

  return (
    <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider ${
      type === 'category' 
        ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' 
        : 'bg-slate-700 text-slate-300'
    }`}>
      {labelText || label}
    </span>
  );
};
