// MyFitRout - Admin Panel Component
// Agent 3.3 - Admin Mode Developer
// Squad 3: Content & Media

import React, { useState, useEffect } from 'react';
import { Shield, Video, CheckCircle, XCircle, Edit, Download, BarChart3 } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';
import { auditExerciseVideos, generateAuditReport, downloadAuditReport, downloadMissingVideosCSV, getQuickStats } from '../services/videoAudit';
import { EXERCISE_LIBRARY } from '../data/exercises';

interface AdminPanelProps {
    lang: Language;
    onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ lang, onClose }) => {
    const t = translations[lang] as any;
    const [activeTab, setActiveTab] = useState<'overview' | 'videos' | 'audit' | 'search'>('overview');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [selectedExercise, setSelectedExercise] = useState<any>(null);
    const [stats, setStats] = useState(getQuickStats());

    useEffect(() => {
        setStats(getQuickStats());
    }, []);

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-hidden border border-white/10 shadow-2xl">
                {/* Header */}
                <div className="bg-gradient-to-r from-amber-600 to-orange-600 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                                <Shield size={24} className="text-white" />
                            </div>
                            <div>
                                <h2 className="text-xl font-black text-white uppercase tracking-tighter">
                                    {t?.admin?.title || 'Admin Mode'}
                                </h2>
                                <p className="text-xs text-white/70 font-medium">
                                    Gerenciamento e Curadoria
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-all"
                        >
                            <XCircle size={20} />
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 px-6 pt-6 border-b border-white/5">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`px-4 py-2 rounded-t-xl font-bold text-sm transition-all ${activeTab === 'overview'
                            ? 'bg-slate-800 text-white border-b-2 border-amber-500'
                            : 'text-slate-400 hover:text-white'
                            }`}
                    >
                        <BarChart3 size={16} className="inline mr-2" />
                        Overview
                    </button>
                    <button
                        onClick={() => setActiveTab('videos')}
                        className={`px-4 py-2 rounded-t-xl font-bold text-sm transition-all ${activeTab === 'videos'
                            ? 'bg-slate-800 text-white border-b-2 border-amber-500'
                            : 'text-slate-400 hover:text-white'
                            }`}
                    >
                        <Video size={16} className="inline mr-2" />
                        {t?.admin?.videoAudit || 'Video Audit'}
                    </button>
                    <button
                        onClick={() => setActiveTab('audit')}
                        className={`px-4 py-2 rounded-t-xl font-bold text-sm transition-all ${activeTab === 'audit'
                            ? 'bg-slate-800 text-white border-b-2 border-amber-500'
                            : 'text-slate-400 hover:text-white'
                            }`}
                    >
                        <CheckCircle size={16} className="inline mr-2" />
                        Relatórios
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                    {activeTab === 'overview' && (
                        <div className="space-y-6">
                            <h3 className="text-2xl font-black text-white mb-4">
                                Estatísticas Gerais
                            </h3>

                            {/* Stats Cards */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-slate-800/40 backdrop-blur-xl border border-white/5 rounded-2xl p-4">
                                    <p className="text-xs text-slate-400 uppercase tracking-widest mb-2">
                                        {t?.admin?.stats?.total || 'Total'}
                                    </p>
                                    <p className="text-3xl font-black text-white">
                                        {stats.total}
                                    </p>
                                </div>

                                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4">
                                    <p className="text-xs text-emerald-400 uppercase tracking-widest mb-2">
                                        {t?.admin?.stats?.withVideo || 'With Video'}
                                    </p>
                                    <p className="text-3xl font-black text-emerald-400">
                                        {stats.withVideo}
                                    </p>
                                </div>

                                <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-4">
                                    <p className="text-xs text-rose-400 uppercase tracking-widest mb-2">
                                        {t?.admin?.stats?.withoutVideo || 'Without Video'}
                                    </p>
                                    <p className="text-3xl font-black text-rose-400">
                                        {stats.withoutVideo}
                                    </p>
                                </div>

                                <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-4">
                                    <p className="text-xs text-indigo-400 uppercase tracking-widest mb-2">
                                        {t?.admin?.stats?.coverage || 'Coverage'}
                                    </p>
                                    <p className="text-3xl font-black text-indigo-400">
                                        {stats.coverage.toFixed(0)}%
                                    </p>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="bg-slate-800/40 backdrop-blur-xl border border-white/5 rounded-2xl p-6">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-sm font-bold text-white">
                                        Progresso para Meta (90%)
                                    </span>
                                    <span className="text-sm font-bold text-indigo-400">
                                        {stats.coverage.toFixed(1)}%
                                    </span>
                                </div>
                                <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                                    <div
                                        className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full transition-all duration-500"
                                        style={{ width: `${Math.min(stats.coverage, 100)}%` }}
                                    />
                                </div>
                                <p className="text-xs text-slate-400 mt-2">
                                    Faltam {Math.max(0, Math.ceil((90 / 100 * stats.total) - stats.withVideo))} vídeos para atingir 90%
                                </p>
                            </div>
                        </div>
                    )}

                    {activeTab === 'videos' && (
                        <div className="space-y-4">
                            <h3 className="text-2xl font-black text-white mb-4">
                                Auditoria de Vídeos
                            </h3>

                            <div className="flex gap-3">
                                <button
                                    onClick={downloadAuditReport}
                                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm transition-all"
                                >
                                    <Download size={16} />
                                    {t?.admin?.generateReport || 'Generate Report'}
                                </button>
                                <button
                                    onClick={downloadMissingVideosCSV}
                                    className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-bold text-sm transition-all"
                                >
                                    <Download size={16} />
                                    {t?.admin?.exportCSV || 'Export CSV'}
                                </button>
                            </div>

                            {/* Lista de exercícios sem vídeo (primeiros 20) */}
                            <div className="bg-slate-800/40 backdrop-blur-xl border border-white/5 rounded-2xl p-4">
                                <h4 className="text-lg font-black text-white mb-4">
                                    Exercícios Sem Vídeo (Top 20)
                                </h4>
                                <div className="space-y-2 max-h-96 overflow-y-auto">
                                    {EXERCISE_LIBRARY.filter(ex => !ex.videoUrl).slice(0, 20).map(exercise => (
                                        <div
                                            key={exercise.id}
                                            className="flex items-center justify-between p-3 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-all"
                                        >
                                            <div className="flex-1">
                                                <p className="font-bold text-white text-sm">
                                                    {exercise.name.PT}
                                                </p>
                                                <p className="text-xs text-slate-400">
                                                    {exercise.muscleGroup} • {exercise.difficulty}
                                                </p>
                                            </div>
                                            <div className="flex gap-2">
                                                <button className="p-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white transition-all">
                                                    <Edit size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'audit' && (
                        <div className="space-y-4">
                            <h3 className="text-2xl font-black text-white mb-4">
                                Relatórios e Exportações
                            </h3>

                            <div className="grid gap-4">
                                <div className="bg-slate-800/40 backdrop-blur-xl border border-white/5 rounded-2xl p-6">
                                    <h4 className="text-lg font-black text-white mb-2">
                                        Relatório Completo (Markdown)
                                    </h4>
                                    <p className="text-sm text-slate-400 mb-4">
                                        Análise detalhada com estatísticas por grupo muscular, dificuldade e lista de exercícios sem vídeo.
                                    </p>
                                    <button
                                        onClick={downloadAuditReport}
                                        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all"
                                    >
                                        <Download size={16} className="inline mr-2" />
                                        Baixar Relatório MD
                                    </button>
                                </div>

                                <div className="bg-slate-800/40 backdrop-blur-xl border border-white/5 rounded-2xl p-6">
                                    <h4 className="text-lg font-black text-white mb-2">
                                        Lista de Exercícios (CSV)
                                    </h4>
                                    <p className="text-sm text-slate-400 mb-4">
                                        Planilha com todos os exercícios sem vídeo para facilitar a busca e curadoria.
                                    </p>
                                    <button
                                        onClick={downloadMissingVideosCSV}
                                        className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold transition-all"
                                    >
                                        <Download size={16} className="inline mr-2" />
                                        Baixar CSV
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
