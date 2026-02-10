import React, { useState, useEffect } from 'react';
import { Play, Pause, Check, ChevronLeft, Timer, Weight, Repeat, Plus, Minus, Video } from 'lucide-react';
import { ExerciseVideoPlayer } from './ExerciseVideoPlayer';
import { PresetWorkout, Language } from '../types';
import { EXERCISE_LIBRARY } from '../data/exercises';

interface ActiveWorkoutProps {
    workout: PresetWorkout;
    lang: Language;
    userId: string;
    onComplete: (sessionData: any) => void;
    onCancel: () => void;
}

interface SetLog {
    setNumber: number;
    reps: number;
    weight: number;
    completed: boolean;
}

interface ExerciseLog {
    exerciseId: string;
    exerciseName: string;
    sets: SetLog[];
}

export const ActiveWorkout: React.FC<ActiveWorkoutProps> = ({ workout, lang, userId, onComplete, onCancel }) => {
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
    const [exerciseLogs, setExerciseLogs] = useState<ExerciseLog[]>([]);
    const [currentWeight, setCurrentWeight] = useState(20);
    const [currentReps, setCurrentReps] = useState(10);
    const [currentSetIndex, setCurrentSetIndex] = useState(0);
    const [isResting, setIsResting] = useState(false);
    const [restTimeLeft, setRestTimeLeft] = useState(0);

    const [startTime] = useState(new Date());
    const [showVideo, setShowVideo] = useState(false);

    // Build complete exercise list from PresetWorkout structure
    const allExerciseIds = [
        ...(workout.warmupIds || []),
        ...(workout.mainBlockIds || []),
        ...(workout.accessoryIds || []),
        ...(workout.cooldownIds || [])
    ];

    const allExercises = allExerciseIds
        .map(id => EXERCISE_LIBRARY.find(ex => ex.id === id))
        .filter((ex): ex is NonNullable<typeof ex> => ex !== undefined);

    const currentExercise = allExercises[currentExerciseIndex];
    const exerciseDetails = currentExercise;

    // Initialize logs for all exercises
    useEffect(() => {
        if (allExercises.length === 0) return;

        const initialLogs: ExerciseLog[] = allExercises.map(ex => {
            // Parse reps - could be "12" or "8-12", take the first number
            const repsValue = typeof ex.reps === 'string' ? parseInt(ex.reps.split('-')[0]) : 10;

            return {
                exerciseId: ex.id,
                exerciseName: ex.name[lang] || ex.name.EN,
                sets: Array.from({ length: ex.sets || 3 }, (_, i) => ({
                    setNumber: i + 1,
                    reps: repsValue,
                    weight: 0,
                    completed: false
                }))
            };
        });
        setExerciseLogs(initialLogs);
    }, [workout, lang, allExercises.length]);

    // Rest timer countdown
    useEffect(() => {
        if (isResting && restTimeLeft > 0) {
            const interval = setInterval(() => {
                setRestTimeLeft(prev => {
                    if (prev <= 1) {
                        setIsResting(false);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [isResting, restTimeLeft]);

    const logSet = () => {
        const updatedLogs = [...exerciseLogs];
        const currentLog = updatedLogs[currentExerciseIndex];

        if (currentLog && currentLog.sets[currentSetIndex]) {
            currentLog.sets[currentSetIndex] = {
                ...currentLog.sets[currentSetIndex],
                reps: currentReps,
                weight: currentWeight,
                completed: true
            };
            setExerciseLogs(updatedLogs);

            // Check if more sets remain for this exercise
            if (currentSetIndex < (currentExercise.sets || 3) - 1) {
                // Start rest timer (default 90 seconds)
                setRestTimeLeft(90);
                setIsResting(true);
                setCurrentSetIndex(currentSetIndex + 1);
            } else {
                // Move to next exercise
                if (currentExerciseIndex < allExercises.length - 1) {
                    setCurrentExerciseIndex(currentExerciseIndex + 1);
                    setCurrentSetIndex(0);
                    setRestTimeLeft(90);
                    setIsResting(true);
                } else {
                    // Workout complete!
                    finishWorkout();
                }
            }
        }
    };

    const finishWorkout = () => {
        const endTime = new Date();
        const durationMinutes = Math.round((endTime.getTime() - startTime.getTime()) / 60000);

        // Calculate total weight lifted, sets, and reps
        let totalWeight = 0;
        let totalSets = 0;
        let totalReps = 0;

        exerciseLogs.forEach(log => {
            log.sets.forEach(set => {
                if (set.completed) {
                    totalWeight += set.weight * set.reps;
                    totalSets += 1;
                    totalReps += set.reps;
                }
            });
        });

        const sessionData = {
            userId,
            workoutName: workout.title[lang],
            workoutType: 'PRESET',
            presetWorkoutId: workout.id,
            startedAt: startTime.toISOString(),
            completedAt: endTime.toISOString(),
            durationMinutes,
            totalWeightLifted: totalWeight,
            totalSets,
            totalReps,
            exercises: exerciseLogs
        };

        onComplete(sessionData);
    };

    const skipSet = () => {
        if (currentSetIndex < (currentExercise.sets || 3) - 1) {
            setCurrentSetIndex(currentSetIndex + 1);
        } else if (currentExerciseIndex < allExercises.length - 1) {
            setCurrentExerciseIndex(currentExerciseIndex + 1);
            setCurrentSetIndex(0);
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const totalSetsCompleted = exerciseLogs.reduce((acc, log) =>
        acc + log.sets.filter(s => s.completed).length, 0
    );
    const totalSetsTotal = exerciseLogs.reduce((acc, log) => acc + log.sets.length, 0);
    const progressPercent = totalSetsTotal > 0 ? (totalSetsCompleted / totalSetsTotal) * 100 : 0;

    // Safety check
    if (!currentExercise || allExercises.length === 0) {
        return (
            <div className="min-h-screen bg-slate-900 text-white p-6 flex flex-col items-center justify-center">
                <p className="text-xl font-black mb-4">Nenhum exercício disponível</p>
                <button onClick={onCancel} className="bg-indigo-600 px-6 py-3 rounded-2xl font-black">
                    Voltar
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-900 text-white  p-6 space-y-6 pb-32">
            {/* Header */}
            <div className="flex items-center justify-between">
                <button onClick={onCancel} className="p-3 bg-slate-800 rounded-2xl border border-slate-700">
                    <ChevronLeft size={20} />
                </button>
                <div className="text-center flex-1">
                    <p className="text-[10px] font-black uppercase opacity-40 tracking-widest">Treino Ativo</p>
                    <h2 className="font-black text-lg italic uppercase tracking-tighter">{workout.title[lang]}</h2>
                </div>
                <div className="w-12" />
            </div>

            {/* Overall Progress */}
            <div className="bg-slate-800 p-6 rounded-[35px] border border-slate-700/50">
                <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-black uppercase opacity-40">Progresso Geral</span>
                    <span className="text-sm font-black text-indigo-400">{totalSetsCompleted}/{totalSetsTotal} séries</span>
                </div>
                <div className="h-3 bg-slate-900 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-indigo-600 to-indigo-400 transition-all duration-500"
                        style={{ width: `${progressPercent}%` }}
                    />
                </div>
            </div>

            {/* Rest Timer */}
            {isResting && (
                <div className="bg-gradient-to-br from-orange-600 to-orange-800 p-8 rounded-[40px] text-center animate-pulse">
                    <Timer size={48} className="mx-auto mb-4" />
                    <p className="text-[10px] font-black uppercase opacity-60 mb-2">Tempo de Descanso</p>
                    <p className="text-6xl font-black">{formatTime(restTimeLeft)}</p>
                    <button
                        onClick={() => setIsResting(false)}
                        className="mt-6 bg-white text-orange-700 px-8 py-3 rounded-2xl font-black uppercase text-sm"
                    >
                        Pular Descanso
                    </button>
                </div>
            )}

            {/* Current Exercise */}
            {!isResting && (
                <div className="space-y-6">
                    {/* Exercise Info */}
                    <div className="bg-slate-800 p-8 rounded-[40px] border border-indigo-500/30">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <p className="text-[10px] font-black uppercase opacity-40 mb-1">
                                    Exercício {currentExerciseIndex + 1}/{allExercises.length}
                                </p>
                                <h3 className="text-2xl font-black italic uppercase tracking-tighter">
                                    {exerciseDetails?.name[lang]}
                                </h3>
                                <p className="text-xs opacity-60 mt-1">{exerciseDetails?.muscleGroup[lang]}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] font-black uppercase opacity-40">Série</p>
                                <p className="text-3xl font-black text-indigo-400">
                                    {currentSetIndex + 1}/{currentExercise.sets || 3}
                                </p>
                            </div>
                        </div>

                        {/* Target Reps */}
                        <div className="p-4 bg-slate-900/50 rounded-2xl border border-slate-700">
                            <p className="text-[9px] font-black uppercase opacity-40 mb-1">Meta</p>
                            <p className="font-black">{currentExercise.reps || '10-12'} repetições</p>
                        </div>

                        {/* Video Toggle */}
                        <button
                            onClick={() => setShowVideo(!showVideo)}
                            className="w-full mt-4 p-4 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center gap-2 font-black uppercase text-xs hover:bg-slate-900/80 transition-colors"
                        >
                            <Video size={16} className="text-indigo-400" />
                            {showVideo ? 'Ocultar Vídeo' : 'Ver Demonstração'}
                        </button>

                        {showVideo && (
                            <div className="mt-4 animate-in slide-in-from-top-4 fade-in duration-300">
                                <ExerciseVideoPlayer
                                    videoUrl={exerciseDetails?.videoUrl}
                                    exerciseName={exerciseDetails?.name[lang] || ''}
                                />
                            </div>
                        )}
                    </div>

                    {/* Log Set Form */}
                    <div className="bg-slate-800 p-8 rounded-[40px] border border-slate-700/50 space-y-6">
                        <h4 className="font-black uppercase text-xs opacity-40 tracking-widest">Registrar Série</h4>

                        {/* Weight Input */}
                        <div>
                            <label className="text-[10px] font-black uppercase opacity-40 ml-2 mb-2 block">
                                Peso (kg)
                            </label>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setCurrentWeight(Math.max(0, currentWeight - 2.5))}
                                    className="h-14 w-14 flex items-center justify-center bg-slate-900 rounded-2xl border border-slate-700 active:scale-95 transition-all"
                                >
                                    <Minus size={20} />
                                </button>
                                <input
                                    type="number"
                                    value={currentWeight}
                                    onChange={(e) => setCurrentWeight(parseFloat(e.target.value) || 0)}
                                    className="flex-1 bg-slate-900 border-2 border-slate-700 h-14 rounded-2xl text-center text-2xl font-black outline-none focus:border-indigo-500"
                                />
                                <button
                                    onClick={() => setCurrentWeight(currentWeight + 2.5)}
                                    className="h-14 w-14 flex items-center justify-center bg-slate-900 rounded-2xl border border-slate-700 active:scale-95 transition-all"
                                >
                                    <Plus size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Reps Input */}
                        <div>
                            <label className="text-[10px] font-black uppercase opacity-40 ml-2 mb-2 block">
                                Repetições
                            </label>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setCurrentReps(Math.max(1, currentReps - 1))}
                                    className="h-14 w-14 flex items-center justify-center bg-slate-900 rounded-2xl border border-slate-700 active:scale-95 transition-all"
                                >
                                    <Minus size={20} />
                                </button>
                                <input
                                    type="number"
                                    value={currentReps}
                                    onChange={(e) => setCurrentReps(parseInt(e.target.value) || 0)}
                                    className="flex-1 bg-slate-900 border-2 border-slate-700 h-14 rounded-2xl text-center text-2xl font-black outline-none focus:border-indigo-500"
                                />
                                <button
                                    onClick={() => setCurrentReps(currentReps + 1)}
                                    className="h-14 w-14 flex items-center justify-center bg-slate-900 rounded-2xl border border-slate-700 active:scale-95 transition-all"
                                >
                                    <Plus size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Complete Set Button */}
                        <button
                            onClick={logSet}
                            className={`w-full h-16 rounded-3xl font-black uppercase text-lg shadow-xl active:scale-95 transition-all flex items-center justify-center gap-3 ${currentSetIndex === (currentExercise.sets || 3) - 1
                                ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white'
                                : 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white'
                                }`}
                        >
                            {currentSetIndex === (currentExercise.sets || 3) - 1 ? (
                                <>
                                    <Check size={28} />
                                    {currentExerciseIndex < allExercises.length - 1 ? 'Próximo Exercício' : 'Finalizar Treino'}
                                </>
                            ) : (
                                <>
                                    <Check size={24} />
                                    Concluir Série {currentSetIndex + 1}
                                </>
                            )}
                        </button>

                        <button
                            onClick={skipSet}
                            className="w-full p-4 rounded-2xl border border-slate-700 font-black uppercase text-xs opacity-60 hover:opacity-100 transition-all"
                        >
                            Pular Série
                        </button>
                    </div>

                    {/* Sets Completed for Current Exercise */}
                    <div className="bg-slate-800 p-6 rounded-[35px] border border-slate-700/50">
                        <p className="text-[10px] font-black uppercase opacity-40 mb-4">Séries Concluídas</p>
                        <div className="grid grid-cols-5 gap-2">
                            {exerciseLogs[currentExerciseIndex]?.sets.map((set, idx) => (
                                <div
                                    key={idx}
                                    className={`p-3 rounded-xl text-center font-black text-xs transition-all ${set.completed
                                        ? 'bg-green-500/20 border-2 border-green-500 text-green-400'
                                        : idx === currentSetIndex
                                            ? 'bg-indigo-500/20 border-2 border-indigo-500 text-indigo-400'
                                            : 'bg-slate-900 border-2 border-slate-700 opacity-40'
                                        }`}
                                >
                                    {set.completed ? <Check size={16} className="mx-auto" /> : idx + 1}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
