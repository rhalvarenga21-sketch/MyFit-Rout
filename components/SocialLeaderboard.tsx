import React, { useState, useEffect } from 'react';
import { Trophy, Medal, Users, Flame, Share2, Star } from 'lucide-react';
import { supabase } from '../services/supabaseClient';

export const SocialLeaderboard = () => {
    const [leaders, setLeaders] = useState<any[]>([]);
    const [challenges, setChallenges] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            // Fetch Leaderboard (Mocking the view call for now or using direct query)
            // Since view might not be created yet in older migrations, we simulate or query directly
            // Real query: const { data } = await supabase.from('leaderboard_weekly').select('*');

            // Fallback manual query
            const { data: profiles } = await supabase.from('user_profiles').select('id, name, level').limit(10);

            // Mock stats for demo if DB view not ready
            const mockLeaders = (profiles || []).map(p => ({
                ...p,
                workouts: Math.floor(Math.random() * 20),
                volume: Math.floor(Math.random() * 50000)
            })).sort((a, b) => b.workouts - a.workouts);

            setLeaders(mockLeaders);

            // Fetch Challenges
            const { data: challengesData } = await supabase.from('challenges').select('*');
            if (challengesData) setChallenges(challengesData);

        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const getRankIcon = (index: number) => {
        switch (index) {
            case 0: return <Trophy className="text-yellow-400 fill-yellow-400" size={20} />;
            case 1: return <Medal className="text-slate-300 fill-slate-300" size={20} />;
            case 2: return <Medal className="text-amber-600 fill-amber-600" size={20} />;
            default: return <span className="font-black text-slate-500 w-5 text-center">{index + 1}</span>;
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white pb-24">
            {/* Header */}
            <div className="bg-gradient-to-br from-fuchsia-600 to-purple-800 p-8 mb-6 rounded-b-[40px] shadow-2xl">
                <h1 className="text-3xl font-black italic uppercase tracking-tighter mb-2">Comunidade</h1>
                <p className="text-sm opacity-80 flex items-center gap-2"><Users size={16} /> Leaderboard Semanal</p>
            </div>

            <div className="max-w-md mx-auto px-6 space-y-8">

                {/* Active Challenge */}
                <div className="bg-slate-800 p-1 rounded-[35px] border border-slate-700 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-transparent opacity-50" />
                    <div className="p-6 relative">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-orange-500 rounded-2xl text-white shadow-lg shadow-orange-500/30">
                                <Flame fill="white" size={24} />
                            </div>
                            <button className="bg-white/10 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white/20 transition-colors">
                                Aceitar Desafio
                            </button>
                        </div>
                        <h3 className="text-xl font-black uppercase italic tracking-tight mb-1">Queimador de 30 Dias</h3>
                        <p className="text-xs opacity-60 mb-4">Complete 20 treinos este mês para ganhar o badge exclusivo.</p>

                        <div className="w-full bg-slate-900/50 h-3 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-orange-400 to-red-500 w-1/3" />
                        </div>
                        <div className="flex justify-between mt-2 text-[10px] font-bold opacity-40 uppercase tracking-widest">
                            <span>Progresso</span>
                            <span>6 / 20</span>
                        </div>
                    </div>
                </div>

                {/* Leaderboard List */}
                <div>
                    <h3 className="text-[10px] font-black uppercase opacity-40 mb-4 tracking-widest pl-2">Top Atletas da Semana</h3>
                    <div className="space-y-3">
                        {leaders.map((user, idx) => (
                            <div key={user.id} className="bg-slate-800 p-4 rounded-2xl flex items-center gap-4 border border-slate-700/50 hover:bg-slate-700/50 transition-colors">
                                <div className="text-xl font-black min-w-[30px] flex justify-center">{getRankIcon(idx)}</div>

                                <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center font-bold text-xs uppercase overflow-hidden border border-white/10">
                                    {user.name?.slice(0, 2) || 'US'}
                                </div>

                                <div className="flex-1">
                                    <p className="font-bold text-sm truncate">{user.name || 'Atleta Anônimo'}</p>
                                    <p className="text-[10px] opacity-40 uppercase tracking-wide">{user.level}</p>
                                </div>

                                <div className="text-right">
                                    <p className="font-black text-indigo-400">{user.workouts} <span className="text-[10px] opacity-60 text-white">treinos</span></p>
                                    <p className="text-[9px] opacity-30">{Math.round(user.volume / 1000)}t total</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Available Challenges */}
                <div>
                    <h3 className="text-[10px] font-black uppercase opacity-40 mb-4 tracking-widest pl-2">Desafios Disponíveis</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {challenges.map(c => (
                            <div key={c.id} className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/30">
                                <div className="flex justify-between items-start mb-2">
                                    <Star size={16} className="text-purple-400" />
                                    <span className="text-[9px] bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded-full font-bold">{c.duration_days}d</span>
                                </div>
                                <p className="font-bold text-xs mb-1">{c.title}</p>
                                <p className="text-[9px] opacity-50 leading-tight">{c.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};
