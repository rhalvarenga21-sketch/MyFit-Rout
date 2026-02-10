import React from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { translations } from '../translations';
import { Language } from '../types';

interface ActivityHistoryProps {
    completedDays: string[];
    lang: Language;
}

export const ActivityHistory: React.FC<ActivityHistoryProps> = ({ completedDays, lang }) => {
    const t = translations[lang] as any;
    const today = new Date();
    const [currentDate, setCurrentDate] = React.useState(new Date(today.getFullYear(), today.getMonth(), 1));

    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    // Adjust for Monday start (0 = Mon, 6 = Sun)
    let firstDayOfWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

    const monthNames = [
        t.calendar.january, t.calendar.february, t.calendar.march, t.calendar.april, t.calendar.may, t.calendar.june,
        t.calendar.july, t.calendar.august, t.calendar.september, t.calendar.october, t.calendar.november, t.calendar.december
    ];

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const renderDays = () => {
        const days = [];

        // Empty slots for days before the 1st
        for (let i = 0; i < firstDayOfWeek; i++) {
            days.push(<div key={`empty-${i}`} className="h-10 w-10" />);
        }

        // Days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            // Format: YYYY-MM-DD
            const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const isActive = completedDays.includes(dateStr);
            const isToday = dateStr === `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

            days.push(
                <div key={day} className="h-10 w-10 flex items-center justify-center relative">
                    <div
                        className={`
              h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold transition-all
              ${isActive ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30' : 'bg-slate-800 text-slate-500'}
              ${isToday && !isActive ? 'border border-indigo-500/50' : ''}
            `}
                    >
                        {day}
                    </div>
                    {isActive && <div className="absolute bottom-0 right-1 w-2 h-2 bg-green-400 rounded-full border-2 border-slate-900"></div>}
                </div>
            );
        }

        return days;
    };

    return (
        <div className="bg-slate-800 p-6 rounded-[35px] border border-slate-700/50 shadow-xl">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-black text-sm uppercase tracking-widest text-slate-400 flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-indigo-500" /> {t.profile.history}
                </h3>
                <div className="flex items-center gap-2 bg-slate-900 rounded-xl p-1">
                    <button onClick={prevMonth} className="p-1 hover:bg-slate-800 rounded-lg text-slate-400"><ChevronLeft size={16} /></button>
                    <span className="text-xs font-black uppercase w-20 text-center">{monthNames[currentDate.getMonth()]}</span>
                    <button onClick={nextMonth} className="p-1 hover:bg-slate-800 rounded-lg text-slate-400"><ChevronRight size={16} /></button>
                </div>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center mb-2">
                {[t.calendar.mon, t.calendar.tue, t.calendar.wed, t.calendar.thu, t.calendar.fri, t.calendar.sat, t.calendar.sun].map((d: string) => (
                    <span key={d} className="text-[10px] font-black opacity-30 uppercase">{d.charAt(0)}</span>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-1 place-items-center">
                {renderDays()}
            </div>

            <div className="mt-4 flex gap-4 justify-center">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-indigo-500" />
                    <span className="text-[10px] uppercase font-bold opacity-50">{t.calendar.workoutCompleted}</span>
                </div>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-700/50 flex justify-between items-center">
                <span className="text-[10px] font-black uppercase opacity-40 tracking-widest">{t.calendar.totalIn} {currentDate.getFullYear()}</span>
                <span className="text-xl font-black text-white">
                    {completedDays.filter(d => d.startsWith(currentDate.getFullYear().toString())).length} <span className="text-xs opacity-50">{t.progress.days}</span>
                </span>
            </div>
        </div>
    );
};
