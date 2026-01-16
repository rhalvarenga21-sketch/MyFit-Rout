import React from 'react';
import { Trophy, Flame, Weight, Repeat, Clock, Check, Share2, Home } from 'lucide-react';
import { ShareableWorkoutCard } from './ShareableWorkoutCard';
import { useState } from 'react';
import { Language } from '../types';

interface CompletedWorkoutSummaryProps {
    sessionData: any;
    lang: Language;
    onFinish: () => void;
}

export const CompletedWorkoutSummary: React.FC<CompletedWorkoutSummaryProps> = ({ sessionData, lang, onFinish }) => {
    const { workoutName, durationMinutes, totalWeightLifted, totalSets, totalReps, exercises } = sessionData;
    const [showShare, setShowShare] = useState(false);

    const formatWeight = (kg: number) => {
        if (kg >= 1000) return `${(kg / 1000).toFixed(1)}t`;
        return `${kg.toFixed(0)}kg`;
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white p-6 space-y-6 pb-24">
            {/* Celebration Header */}
            <div className="text-center space-y-6 pt-10 pb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center mx-auto shadow-2xl animate-bounce">
                    <Trophy size={48} className="text-white" />
                </div>
                <div>
                    <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-2">
                        Treino Completo!
                    </h1>
                    <p className="text-sm opacity-60 uppercase font-black tracking-widest">
                        Excelente trabalho! 💪
                    </p>
                </div>
            </div>

            {/* Workout Stats */}
            <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 p-8 rounded-[40px] shadow-2xl">
                <h2 className="text-2xl font-black italic uppercase tracking-tighter mb-6">{workoutName}</h2>

                <div className="grid grid-cols-2 gap-4">
                    <StatCard
                        icon={Clock}
                        label="Duração"
                        value={`${durationMinutes}min`}
                        color="text-blue-400"
                    />
                    <StatCard
                        icon={Weight}
                        label="Peso Total"
                        value={formatWeight(totalWeightLifted)}
                        color="text-orange-400"
                    />
                    <StatCard
                        icon={Repeat}
                        label="Séries"
                        value={totalSets.toString()}
                        color="text-green-400"
                    />
                    <StatCard
                        icon={Flame}
                        label="Repetições"
                        value={totalReps.toString()}
                        color="text-red-400"
                    />
                </div>
            </div>

            {/* Exercise Breakdown */}
            <div className="bg-slate-800 p-6 rounded-[35px] border border-slate-700/50 space-y-4">
                <h3 className="font-black uppercase text-xs opacity-40 tracking-widest">Exercícios Concluídos</h3>

                {exercises.map((exercise: any, idx: number) => {
                    const completedSets = exercise.sets.filter((s: any) => s.completed);
                    const totalVolume = completedSets.reduce((acc: number, set: any) =>
                        acc + (set.weight * set.reps), 0
                    );

                    return (
                        <div
                            key={idx}
                            className="bg-slate-900/50 p-5 rounded-3xl border border-slate-700/50"
                        >
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <h4 className="font-black text-sm">{exercise.exerciseName}</h4>
                                    <p className="text-[10px] opacity-40 uppercase font-black">
                                        {completedSets.length} séries
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-indigo-400 font-black text-sm">{formatWeight(totalVolume)}</p>
                                    <p className="text-[9px] opacity-40 uppercase font-black">volume</p>
                                </div>
                            </div>

                            {/* Sets Grid */}
                            <div className="grid grid-cols-5 gap-2">
                                {exercise.sets.map((set: any, setIdx: number) => (
                                    <div
                                        key={setIdx}
                                        className={`p-2 rounded-lg text-center ${set.completed
                                            ? 'bg-green-500/10 border border-green-500/30'
                                            : 'bg-slate-800 border border-slate-700 opacity-40'
                                            }`}
                                    >
                                        {set.completed ? (
                                            <div>
                                                <p className="text-[9px] font-black text-green-400">{set.weight}kg</p>
                                                <p className="text-[8px] opacity-60">×{set.reps}</p>
                                            </div>
                                        ) : (
                                            <Check size={12} className="mx-auto opacity-30" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Actions */}
            <div className="space-y-3">
                <button
                    onClick={onFinish}
                    className="w-full bg-indigo-600 p-6 rounded-3xl font-black uppercase text-lg shadow-xl active:scale-95 transition-all flex items-center justify-center gap-3"
                >
                    <Home size={24} />
                    Voltar ao Início
                </button>

                <button
                    onClick={() => {
                        // In a real app, this would use the Web Share API with the image generated
                        setShowShare(true);
                    }}
                    className="w-full bg-slate-800 border border-slate-700 p-4 rounded-2xl font-black uppercase text-xs opacity-60 hover:opacity-100 transition-all flex items-center justify-center gap-2"
                >
                    <Share2 size={16} />
                    Compartilhar Resultado
                </button>
            </div>

            {showShare && (
                <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-6 animate-in fade-in duration-200">
                    <div className="mb-4 text-center">
                        <h3 className="text-xl font-black italic uppercase tracking-tighter text-white">Pronto para postar!</h3>
                        <p className="text-sm text-slate-400">Capture a tela abaixo para compartilhar</p>
                    </div>

                    <ShareableWorkoutCard
                        username={sessionData.userId ? "Atleta" : "Atleta"} // Would use real name from profile context 
                        workoutName={workoutName}
                        duration={durationMinutes}
                        weight={Math.ceil(totalWeightLifted)}
                        date={new Date().toLocaleDateString('pt-BR')}
                    />

                    <button
                        onClick={() => setShowShare(false)}
                        className="mt-8 bg-white/10 text-white px-8 py-4 rounded-full font-black uppercase text-xs tracking-widest hover:bg-white/20 transition-all"
                    >
                        Fechar
                    </button>
                </div>
            )}

            {/* Motivational Message */}
            <div className="bg-gradient-to-r from-purple-900/20 to-indigo-900/20 p-6 rounded-3xl border border-purple-500/20 text-center">
                <p className="text-sm italic opacity-80">
                    "Cada treino te aproxima do seu objetivo. Continue assim!" 🔥
                </p>
            </div>
        </div>
    );
};

const StatCard = ({ icon: Icon, label, value, color }: any) => (
    <div className="bg-white/10 p-5 rounded-3xl backdrop-blur-sm border border-white/10">
        <Icon className={`${color} mb-2`} size={20} />
        <p className="text-[9px] font-black uppercase opacity-60 tracking-widest mb-1">{label}</p>
        <p className="text-2xl font-black">{value}</p>
    </div>
);
