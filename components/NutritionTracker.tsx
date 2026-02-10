import React, { useState, useEffect } from 'react';
import { Plus, Utensils, Apple, Coffee, ChevronRight, Zap } from 'lucide-react';
import { supabase } from '../services/supabaseClient';
import { UserProfile, Language } from '../types';
import { getNutritionAdvice } from '../services/gemini';

interface NutritionTrackerProps {
    profile: UserProfile;
    lang: Language;
}

export const NutritionTracker: React.FC<NutritionTrackerProps> = ({ profile, lang }) => {
    const [logs, setLogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [aiTip, setAiTip] = useState<string | null>(null);

    // Quick Add State
    const [showAdd, setShowAdd] = useState(false);
    const [newItem, setNewItem] = useState({ food: '', cal: '', protein: '' });

    useEffect(() => {
        fetchLogs();
        loadAiAdvice();
    }, []);

    const fetchLogs = async () => {
        try {
            const { data, error } = await supabase
                .from('nutrition_logs')
                .select('*')
                .eq('user_id', profile.id)
                .eq('logged_date', new Date().toISOString().split('T')[0]);

            if (data) setLogs(data);
        } catch (e) {
            console.error("Error fetching logs:", e);
        } finally {
            setLoading(false);
        }
    };

    const loadAiAdvice = async () => {
        const advice = await getNutritionAdvice(profile, 'daily', lang);
        setAiTip(advice);
    };

    const handleAddLog = async () => {
        if (!newItem.food || !newItem.cal) return;

        const { error } = await supabase.from('nutrition_logs').insert({
            user_id: profile.id,
            food_name: newItem.food,
            calories: parseInt(newItem.cal),
            protein: parseInt(newItem.protein) || 0,
            meal_type: 'SNACK' // Defaulting for simplicity
        });

        if (!error) {
            setNewItem({ food: '', cal: '', protein: '' });
            setShowAdd(false);
            fetchLogs();
        }
    };

    // Calculations
    const totalCals = logs.reduce((sum, item) => sum + item.calories, 0);
    const totalProtein = logs.reduce((sum, item) => sum + item.protein, 0);
    // Estimate TDEE (Target) roughly if not set
    const targetCals = 2500;

    return (
        <div className="min-h-screen bg-slate-900 text-white pb-24">
            {/* Header */}
            <div className="bg-gradient-to-br from-green-600 to-emerald-800 p-8 mb-6 rounded-b-[40px] shadow-2xl">
                <h1 className="text-3xl font-black italic uppercase tracking-tighter mb-2">Nutrição</h1>
                <div className="flex justify-between items-end">
                    <div>
                        <p className="text-sm opacity-80 mb-1">Calorias Hoje</p>
                        <p className="text-5xl font-black tracking-tighter">{totalCals}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs opacity-60 uppercase tracking-widest mb-1">Meta</p>
                        <p className="text-xl font-bold opacity-80">/ {targetCals} kcal</p>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-black/20 h-2 rounded-full mt-4 overflow-hidden">
                    <div
                        className="h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)] transition-all duration-1000"
                        style={{ width: `${Math.min((totalCals / targetCals) * 100, 100)}%` }}
                    />
                </div>
            </div>

            <div className="max-w-md mx-auto px-6 space-y-6">

                {/* AI Insight */}
                {aiTip && (
                    <div className="bg-slate-800 p-5 rounded-3xl border border-emerald-500/30 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-3 opacity-10"><Zap size={60} /></div>
                        <p className="text-[10px] font-black uppercase text-emerald-400 tracking-widest mb-2 flex items-center gap-2">
                            <Zap size={12} /> AI Coach
                        </p>
                        <p className="text-sm italic opacity-90 leading-relaxed">"{aiTip.slice(0, 120)}..."</p>
                    </div>
                )}

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-3">
                    <div className="bg-slate-800 p-4 rounded-3xl border border-slate-700/50 text-center">
                        <p className="text-[10px] font-black uppercase opacity-40 mb-1">Proteína</p>
                        <p className="text-xl font-black text-blue-400">{totalProtein}g</p>
                    </div>
                    <div className="bg-slate-800 p-4 rounded-3xl border border-slate-700/50 text-center">
                        <p className="text-[10px] font-black uppercase opacity-40 mb-1">Refeições</p>
                        <p className="text-xl font-black text-orange-400">{logs.length}</p>
                    </div>
                    <button
                        onClick={() => setShowAdd(!showAdd)}
                        className="bg-emerald-500 p-4 rounded-3xl border border-emerald-400/50 flex items-center justify-center shadow-lg active:scale-95 transition-transform"
                    >
                        <Plus size={32} className="text-white" />
                    </button>
                </div>

                {/* Add Log Form */}
                {showAdd && (
                    <div className="bg-slate-800 p-6 rounded-[35px] border border-slate-700 animate-in slide-in-from-top-4">
                        <h3 className="text-sm font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Utensils size={16} className="text-emerald-400" /> Adicionar
                        </h3>
                        <div className="space-y-3">
                            <input
                                placeholder="Ex: Frango grelhado"
                                value={newItem.food}
                                onChange={e => setNewItem({ ...newItem, food: e.target.value })}
                                className="w-full bg-slate-900 border border-slate-700 p-4 rounded-2xl outline-none focus:border-emerald-500 text-sm font-bold"
                            />
                            <div className="flex gap-3">
                                <input
                                    type="number"
                                    placeholder="Kcal"
                                    value={newItem.cal}
                                    onChange={e => setNewItem({ ...newItem, cal: e.target.value })}
                                    className="w-1/2 bg-slate-900 border border-slate-700 p-4 rounded-2xl outline-none focus:border-emerald-500 text-sm font-bold"
                                />
                                <input
                                    type="number"
                                    placeholder="Prot (g)"
                                    value={newItem.protein}
                                    onChange={e => setNewItem({ ...newItem, protein: e.target.value })}
                                    className="w-1/2 bg-slate-900 border border-slate-700 p-4 rounded-2xl outline-none focus:border-emerald-500 text-sm font-bold"
                                />
                            </div>
                            <button
                                onClick={handleAddLog}
                                className="w-full bg-emerald-600 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-emerald-500 transition-colors"
                            >
                                Salvar
                            </button>
                        </div>
                    </div>
                )}

                {/* Recent Logs List */}
                <div className="space-y-2">
                    {logs.length === 0 ? (
                        <div className="text-center p-8 opacity-40">
                            <Apple size={48} className="mx-auto mb-2" />
                            <p className="text-xs">Nada registrado hoje</p>
                        </div>
                    ) : (
                        logs.map((log) => (
                            <div key={log.id} className="bg-slate-800/50 p-4 rounded-2xl flex justify-between items-center border border-slate-700/30">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-500">
                                        <Coffee size={16} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm">{log.food_name}</p>
                                        <p className="text-[10px] opacity-50 uppercase">{log.meal_type || 'Snack'}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-black text-sm">{log.calories} <span className="text-[10px] opacity-50 font-normal">kcal</span></p>
                                    {log.protein > 0 && <p className="text-[10px] text-blue-400 font-bold">{log.protein}g prot</p>}
                                </div>
                            </div>
                        ))
                    )}
                </div>

            </div>
        </div>
    );
};
