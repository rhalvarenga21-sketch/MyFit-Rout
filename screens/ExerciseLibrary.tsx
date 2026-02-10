import React, { useState, useMemo } from 'react';
import { Search, Filter, PlayCircle, AlertCircle, ChevronLeft, Check, X } from 'lucide-react';
import { EXERCISE_LIBRARY } from '../data/exercises';
import { ExerciseVideoPlayer } from '../components/ExerciseVideoPlayer';
import { Language } from '../types';

interface ExerciseLibraryProps {
    lang: Language;
    onBack: () => void;
}

// Helper to check valid video
const isValidVideo = (url: string | undefined, id: string, approvedIds: Set<string>) => {
    if (approvedIds.has(id)) return true; // Manually approved
    if (!url) return false;
    return !url.includes('search') && !url.includes('results');
};

export const ExerciseLibrary: React.FC<ExerciseLibraryProps> = ({ lang, onBack }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState<'ALL' | 'VERIFIED' | 'PENDING' | 'NO_VIDEO'>('ALL');
    const [selectedExercise, setSelectedExercise] = useState<typeof EXERCISE_LIBRARY[0] | null>(null);
    const [approvedIds, setApprovedIds] = useState<Set<string>>(new Set());

    const handleApprove = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        const newSet = new Set(approvedIds);
        newSet.add(id);
        setApprovedIds(newSet);
    };

    const handleExport = () => {
        const approvedList = Array.from(approvedIds);
        const json = JSON.stringify(approvedList, null, 2);
        navigator.clipboard.writeText(`Please mark these exercises as verified:\n${json}`)
            .then(() => alert('Lista de aprovados copiada! Cole no chat para atualizar.'))
            .catch(() => alert('Erro ao copiar.'));
    };

    const filteredExercises = useMemo(() => {
        return EXERCISE_LIBRARY.filter(ex => {
            const matchesSearch = ex.name[lang].toLowerCase().includes(searchTerm.toLowerCase()) ||
                ex.name[Language.EN].toLowerCase().includes(searchTerm.toLowerCase());

            const valid = isValidVideo(ex.videoUrl, ex.id, approvedIds);
            const hasUrl = !!ex.videoUrl;

            if (filter === 'VERIFIED' && !valid) return false;
            // Pending: Has URL but NOT valid (search links)
            if (filter === 'PENDING' && (!hasUrl || valid)) return false;
            if (filter === 'NO_VIDEO' && hasUrl) return false;

            return matchesSearch;
        });
    }, [searchTerm, filter, lang, approvedIds]);

    const stats = useMemo(() => {
        const total = EXERCISE_LIBRARY.length;
        const valid = EXERCISE_LIBRARY.filter(e => isValidVideo(e.videoUrl, e.id, approvedIds)).length;
        const noVideo = EXERCISE_LIBRARY.filter(e => !e.videoUrl).length;
        // Pending = Total - Valid - NoVideo
        const pending = total - valid - noVideo;
        return { total, valid, pending, noVideo };
    }, [approvedIds]);

    return (
        <div className="min-h-screen bg-slate-900 text-white p-6 pb-32 animate-in fade-in relative">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
                <button onClick={onBack} className="p-3 bg-slate-800 rounded-2xl border border-slate-700">
                    <ChevronLeft size={20} />
                </button>
                <div>
                    <h2 className="text-2xl font-black italic uppercase tracking-tighter">Biblioteca</h2>
                    <p className="text-[10px] font-black uppercase opacity-40 tracking-widest">
                        {stats.valid} Verificados / {stats.pending} Testar / {stats.noVideo} Sem Vídeo
                    </p>
                </div>
            </div>

            {/* Export Button */}
            {approvedIds.size > 0 && (
                <button
                    onClick={handleExport}
                    className="fixed bottom-24 right-6 z-50 bg-emerald-500 text-white px-6 py-4 rounded-full font-black shadow-2xl flex items-center gap-2 animate-in slide-in-from-bottom"
                >
                    <Check size={20} /> SALVAR ({approvedIds.size})
                </button>
            )}

            {/* Filters */}
            <div className="space-y-4 mb-8">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                    <input
                        type="text"
                        placeholder="Buscar exercício..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-2xl py-4 pl-12 pr-4 font-bold outline-none focus:border-indigo-500"
                    />
                </div>

                <div className="flex gap-2 overflow-x-auto pb-2 custom-scroll">
                    <button
                        onClick={() => setFilter('ALL')}
                        className={`px-4 py-2 rounded-xl font-black text-xs uppercase whitespace-nowrap transition-all ${filter === 'ALL' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-500'}`}
                    >
                        Todos
                    </button>
                    <button
                        onClick={() => setFilter('VERIFIED')}
                        className={`px-4 py-2 rounded-xl font-black text-xs uppercase whitespace-nowrap transition-all flex items-center gap-2 ${filter === 'VERIFIED' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-500'}`}
                    >
                        <Check size={14} /> Videos ({stats.valid})
                    </button>
                    <button
                        onClick={() => setFilter('PENDING')}
                        className={`px-4 py-2 rounded-xl font-black text-xs uppercase whitespace-nowrap transition-all flex items-center gap-2 ${filter === 'PENDING' ? 'bg-yellow-600 text-white' : 'bg-slate-800 text-slate-500'}`}
                    >
                        <AlertCircle size={14} /> Pendente ({stats.pending})
                    </button>
                    <button
                        onClick={() => setFilter('NO_VIDEO')}
                        className={`px-4 py-2 rounded-xl font-black text-xs uppercase whitespace-nowrap transition-all flex items-center gap-2 ${filter === 'NO_VIDEO' ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-500'}`}
                    >
                        <X size={14} /> Sem Vídeo ({stats.noVideo})
                    </button>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 gap-4">
                {filteredExercises.map(ex => {
                    const valid = isValidVideo(ex.videoUrl, ex.id, approvedIds);
                    const pending = filter === 'PENDING' || (!valid && !!ex.videoUrl);

                    return (
                        <div
                            key={ex.id}
                            onClick={() => setSelectedExercise(ex)}
                            className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all group ${valid ? 'bg-slate-800 border-slate-700 hover:border-emerald-500' : pending ? 'bg-yellow-500/5 border-yellow-500/20' : 'bg-slate-800/50 border-rose-900/10'}`}
                        >
                            <div className="flex-1">
                                <h3 className={`font-bold text-sm mb-1 ${!valid && 'opacity-90'}`}>{ex.name[lang]}</h3>
                                <p className="text-[10px] uppercase opacity-40 tracking-wider flex items-center gap-2">
                                    {ex.muscleGroup}
                                    {pending && <span className="text-yellow-500 font-bold">• Análise Necessária</span>}
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                {pending && (
                                    <button
                                        onClick={(e) => handleApprove(e, ex.id)}
                                        className="px-3 py-2 bg-emerald-500/20 text-emerald-500 rounded-lg text-xs font-black uppercase hover:bg-emerald-500 hover:text-white transition-colors border border-emerald-500/30"
                                    >
                                        Aprovar
                                    </button>
                                )}

                                <div className={`p-2 rounded-xl ${valid ? 'bg-emerald-500/10 text-emerald-500' : pending ? 'bg-yellow-500/10 text-yellow-500' : 'bg-rose-500/10 text-rose-500'}`}>
                                    {valid ? <PlayCircle size={20} /> : pending ? <AlertCircle size={20} /> : <X size={20} />}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Modal Preview */}
            {selectedExercise && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-slate-900 w-full max-w-lg rounded-[40px] border border-slate-700 overflow-hidden relative animate-in zoom-in-95">
                        <button
                            onClick={() => setSelectedExercise(null)}
                            className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full text-white backdrop-blur-md"
                        >
                            <X size={20} />
                        </button>

                        <div className="p-6 pb-0">
                            <h3 className="text-xl font-black italic uppercase tracking-tighter mb-4 pr-10">{selectedExercise.name[lang]}</h3>
                        </div>

                        <div className="p-4">
                            <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-700">
                                <ExerciseVideoPlayer
                                    videoUrl={selectedExercise.videoUrl}
                                    exerciseName={selectedExercise.name[lang]}
                                />
                            </div>
                        </div>

                        <div className="p-6 pt-2 space-y-4">
                            <div>
                                <p className="text-[10px] font-black uppercase opacity-40 mb-1">Dicas</p>
                                <ul className="list-disc list-inside text-xs text-slate-300 space-y-1">
                                    {selectedExercise.executionTips.map((tip, i) => (
                                        <li key={i}>{tip}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex gap-2">
                                <div className="bg-slate-800 px-3 py-2 rounded-lg">
                                    <p className="text-[9px] font-black uppercase opacity-40">Grupo</p>
                                    <p className="text-xs font-bold">{selectedExercise.muscleGroup}</p>
                                </div>
                                <div className="bg-slate-800 px-3 py-2 rounded-lg">
                                    <p className="text-[9px] font-black uppercase opacity-40">Equipamento</p>
                                    <p className="text-xs font-bold">{selectedExercise.equipment}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
