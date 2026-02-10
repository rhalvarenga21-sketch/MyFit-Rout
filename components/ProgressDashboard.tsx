import React, { useEffect, useState } from 'react';
import { Trophy, Flame, TrendingUp, Calendar, Weight, Repeat } from 'lucide-react';
import { UserProfile, Language } from '../types';
import { getUnifiedDashboardData } from '../services/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { translations } from '../translations';

interface ProgressDashboardProps {
    profile: UserProfile;
    lang: Language;
}

export const ProgressDashboard: React.FC<ProgressDashboardProps> = ({ profile, lang }) => {
    const [workoutHistory, setWorkoutHistory] = useState<any[]>([]);
    const [streakData, setStreakData] = useState({ currentStreak: 0, longestStreak: 0, totalWorkouts: 0 });
    const [loading, setLoading] = useState(true);

    const t = translations[lang] as any;

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            const data = await getUnifiedDashboardData(profile.id);
            setWorkoutHistory(data.history);
            setStreakData(data.streak);
            setLoading(false);
        };
        loadData();
    }, [profile.id]);

    // Calculate total stats
    const totalWeightLifted = workoutHistory.reduce((sum, w) => sum + (w.total_weight_lifted || 0), 0);
    const totalSets = workoutHistory.reduce((sum, w) => sum + (w.total_sets || 0), 0);
    const avgDuration = workoutHistory.length > 0
        ? Math.round(workoutHistory.reduce((sum, w) => sum + (w.duration_minutes || 0), 0) / workoutHistory.length)
        : 0;

    // Prepare chart data  
    const chartData = workoutHistory
        .slice(0, 10)
        .reverse()
        .map(w => {
            const dateStr = w.completed_at || w.created_at || new Date().toISOString();
            const date = new Date(dateStr);
            return {
                date: date.toLocaleDateString(lang === Language.PT ? 'pt-BR' : 'en-US', { day: '2-digit', month: '2-digit' }),
                volume: Math.round((w.total_weight_lifted || 0) / 1000), // Convert to tons
            };
        });

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-900 text-white p-6 flex items-center justify-center">
                <p className="text-xl font-black">{t.progress.loading}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-900 text-white pb-24">
            {/* Header */}
            <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 p-8 mb-6 rounded-b-[45px] shadow-2xl border-b border-indigo-500/20">
                <h1 className="text-3xl font-black italic uppercase tracking-tighter mb-2">{t.progress.title}</h1>
                <p className="text-sm opacity-60">{t.progress.subtitle}</p>
            </div>

            <div className="max-w-md mx-auto px-6 space-y-6">
                {/* Streak Stats */}
                <div className="grid grid-cols-3 gap-3">
                    <StatCard
                        icon={Flame}
                        label={t.progress.streak}
                        value={`${streakData.currentStreak}`}
                        unit={t.progress.days}
                        color="text-orange-400"
                    />
                    <StatCard
                        icon={Trophy}
                        label={t.progress.record}
                        value={`${streakData.longestStreak}`}
                        unit={t.progress.days}
                        color="text-amber-400"
                    />
                    <StatCard
                        icon={Calendar}
                        label={t.progress.total}
                        value={`${streakData.totalWorkouts}`}
                        unit={t.progress.workouts}
                        color="text-indigo-400"
                    />
                </div>

                {/* Volume Stats */}
                <div className="bg-slate-800 p-6 rounded-[35px] border border-slate-700/50">
                    <h3 className="text-[10px] font-black uppercase opacity-40 mb-4 tracking-widest">{t.progress.generalStats}</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-[9px] font-black uppercase opacity-40 mb-1">{t.progress.totalVolume}</p>
                            <p className="text-2xl font-black text-indigo-400">
                                {totalWeightLifted >= 1000
                                    ? `${(totalWeightLifted / 1000).toFixed(1)}t`
                                    : `${totalWeightLifted}kg`}
                            </p>
                        </div>
                        <div>
                            <p className="text-[9px] font-black uppercase opacity-40 mb-1">{t.progress.sets}</p>
                            <p className="text-2xl font-black">{totalSets}</p>
                        </div>
                        <div>
                            <p className="text-[9px] font-black uppercase opacity-40 mb-1">{t.progress.avgDuration}</p>
                            <p className="text-2xl font-black">{avgDuration}min</p>
                        </div>
                        <div>
                            <p className="text-[9px] font-black uppercase opacity-40 mb-1">{t.progress.thisMonth}</p>
                            <p className="text-2xl font-black text-green-400">{workoutHistory.length}</p>
                        </div>
                    </div>
                </div>

                {/* Volume Chart */}
                {chartData.length > 0 && (
                    <div className="bg-slate-800 p-6 rounded-[35px] border border-slate-700/50">
                        <h3 className="text-[10px] font-black uppercase opacity-40 mb-4 tracking-widest">
                            {t.progress.volumeChart}
                        </h3>
                        <ResponsiveContainer width="100%" height={200}>
                            <LineChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                <XAxis dataKey="date" stroke="#94a3b8" fontSize={10} />
                                <YAxis stroke="#94a3b8" fontSize={10} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#1e293b',
                                        border: '1px solid #475569',
                                        borderRadius: '12px',
                                    }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="volume"
                                    stroke="#6366f1"
                                    strokeWidth={3}
                                    dot={{ fill: '#6366f1', r: 4 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                        <p className="text-[9px] text-center opacity-40 mt-2">{t.progress.volumeUnit}</p>
                    </div>
                )}

                {/* Recent Workouts */}
                <div className="bg-slate-800 p-6 rounded-[35px] border border-slate-700/50">
                    <h3 className="text-[10px] font-black uppercase opacity-40 mb-4 tracking-widest">{t.progress.recentWorkouts}</h3>
                    <div className="space-y-3">
                        {workoutHistory.slice(0, 5).map((workout, idx) => {
                            const dateStr = workout.completed_at || workout.created_at || new Date().toISOString();
                            const date = new Date(dateStr);
                            return (
                                <div key={idx} className="flex justify-between items-center p-4 bg-slate-900/50 rounded-2xl">
                                    <div>
                                        <p className="font-black text-sm">{workout.workout_name}</p>
                                        <p className="text-[10px] opacity-40 uppercase">
                                            {date.toLocaleDateString(lang === Language.PT ? 'pt-BR' : 'en-US', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-indigo-400 font-black text-sm">
                                            {Math.round((workout.total_weight_lifted || 0) / 1000)} t
                                        </p>
                                        <p className="text-[9px] opacity-40">{workout.duration_minutes}min</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {workoutHistory.length === 0 && (
                    <div className="bg-slate-800 p-10 rounded-[40px] text-center border border-slate-700/50">
                        <TrendingUp size={48} className="mx-auto mb-4 opacity-20" />
                        <p className="font-black mb-2">{t.progress.noWorkouts}</p>
                        <p className="text-sm opacity-60">{t.progress.noWorkoutsDesc}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const StatCard = ({ icon: Icon, label, value, unit, color }: any) => (
    <div className="bg-slate-800 p-4 rounded-3xl border border-slate-700/50 text-center">
        <Icon className={`${color} mx-auto mb-2`} size={20} />
        <p className="text-[9px] font-black uppercase opacity-40 mb-1">{label}</p>
        <p className="text-xl font-black">{value}</p>
        <p className="text-[8px] opacity-40 uppercase">{unit}</p>
    </div>
);
