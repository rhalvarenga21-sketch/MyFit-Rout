import React, { useState, useEffect } from 'react';
import { Play, Pause, Check, ChevronLeft, Timer, Weight, Repeat, Plus, Minus, Video, Sparkles, X, MessageSquare, AlertCircle } from 'lucide-react';
import { ExerciseVideoPlayer } from './ExerciseVideoPlayer';
import { PresetWorkout, Language, UserProfile, Exercise, ExperienceLevel } from '../types';
import { EXERCISE_LIBRARY } from '../data/exercises';
import { translations } from '../translations';
import { getRealAIResponse } from '../services/realAI';

interface ActiveWorkoutProps {
    workout: PresetWorkout;
    lang: Language;
    userId: string;
    profile: UserProfile;
    onUpdateProfile: (p: UserProfile) => void;
    onComplete: (sessionData: any) => void;
    onCancel: () => void;
    customExercises?: Exercise[];
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

export const ActiveWorkout: React.FC<ActiveWorkoutProps> = ({ workout, lang, userId, profile, onComplete, onCancel, onUpdateProfile, customExercises }) => {
    const t = translations[lang] as any;
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
    const [exerciseLogs, setExerciseLogs] = useState<ExerciseLog[]>([]);
    const [currentWeight, setCurrentWeight] = useState(20);
    const [currentReps, setCurrentReps] = useState(10);
    const [currentSetIndex, setCurrentSetIndex] = useState(0);
    const [isResting, setIsResting] = useState(false);
    const [restTimeLeft, setRestTimeLeft] = useState(0);

    const [startTime] = useState(new Date());
    const [showVideo, setShowVideo] = useState(false);
    const [restMinimized, setRestMinimized] = useState(false);

    // AI Coach State
    const [aiModalOpen, setAiModalOpen] = useState(false);
    const [aiQuery, setAiQuery] = useState('');
    const [aiResponse, setAiResponse] = useState('');
    const [aiLoading, setAiLoading] = useState(false);

    const handleAskCoach = async (queryType: 'FORM' | 'PAIN' | 'ALTERNATE' | 'CUSTOM', customText?: string) => {
        if (!currentExercise) return;

        setAiLoading(true);
        setAiResponse('');
        const promptContext = `
        User is performing exercise: ${currentExercise.name[lang]} (${currentExercise.name.EN}).
        Set: ${currentSetIndex + 1}/${currentExercise.sets}.
        Reps Goal: ${currentExercise.reps}.
        Weight: ${currentWeight}kg.
        User Profile: ${profile.level} level, Goal: ${profile.goal}.
        `;

        let specificQuery = "";
        switch (queryType) {
            case 'FORM':
                specificQuery = `Explain how to perform ${currentExercise.name[lang]} correctly. Give 3 critical cues for safety. Short and direct.`;
                break;
            case 'PAIN':
                specificQuery = `I feel pain/discomfort doing ${currentExercise.name[lang]}. What should I do? Is there a safer variation? Short answer.`;
                break;
            case 'ALTERNATE':
                specificQuery = `I can't do ${currentExercise.name[lang]} (equipment busy or too hard). Suggest 1 immediate alternative I can do right now.`;
                break;
            case 'CUSTOM':
                specificQuery = customText || "";
                break;
        }

        try {
            const response = await getRealAIResponse(promptContext + "\n" + specificQuery, profile, lang);
            setAiResponse(response);
        } catch (error) {
            setAiResponse("Erro ao conectar com o Coach. Tente novamente.");
        } finally {
            setAiLoading(false);
        }
    };

    // Build complete exercise list from PresetWorkout structure
    const allExerciseIds = [
        ...(workout.warmupIds || []),
        ...(workout.mainBlockIds || []),
        ...(workout.accessoryIds || []),
        ...(workout.cooldownIds || [])
    ];

    // State for exercises list (mutable for swapping)
    const [exercises, setExercises] = useState<Exercise[]>([]);

    useEffect(() => {
        if (typeof customExercises !== 'undefined' && customExercises.length > 0) {
            setExercises(customExercises);
            return;
        }

        const initial = allExerciseIds
            .map(id => {
                // Check both standard library and user's custom exercises
                const standard = EXERCISE_LIBRARY.find(ex => ex.id === id);
                const custom = profile.customExercises?.find(ex => ex.id === id);
                return standard || custom;
            })
            .filter((ex): ex is Exercise => ex !== undefined);
        setExercises(initial);
    }, [workout, customExercises]);

    const currentExercise = exercises[currentExerciseIndex];

    // SWAP & EDIT FEATURES
    const [swapModalOpen, setSwapModalOpen] = useState(false);
    const [swapSearch, setSwapSearch] = useState('');
    const [isCreatingExercise, setIsCreatingExercise] = useState(false);

    const getAvailableExercises = () => {
        // Merge standard library + profile custom exercises
        const fullLib = [...EXERCISE_LIBRARY, ...(profile.customExercises || [])];
        if (!swapSearch) return fullLib.slice(0, 20); // Default first 20

        const lower = swapSearch.toLowerCase();
        return fullLib.filter(ex =>
            ex.name[Language.EN].toLowerCase().includes(lower) ||
            ex.name[Language.PT].toLowerCase().includes(lower) ||
            ex.name[Language.ES].toLowerCase().includes(lower) ||
            ex.muscleGroup.toLowerCase().includes(lower)
        );
    };

    const handleSwapExercise = (newExercise: Exercise) => {
        const updated = [...exercises];
        updated[currentExerciseIndex] = newExercise;
        setExercises(updated);

        // Also update the logs for this slot
        const updatedLogs = [...exerciseLogs];
        const oldLog = updatedLogs[currentExerciseIndex];

        // Reset logs for the new exercise but keep set count if possible, or default to new exercise default
        const setsCount = newExercise.sets || 3;
        updatedLogs[currentExerciseIndex] = {
            exerciseId: newExercise.id,
            exerciseName: newExercise.name[lang] || newExercise.name.EN,
            sets: Array.from({ length: setsCount }, (_, i) => ({
                setNumber: i + 1,
                reps: parseInt((newExercise.reps || "10").split('-')[0]),
                weight: 0,
                completed: false
            }))
        };
        setExerciseLogs(updatedLogs);

        // Reset current set progress for this exercise
        setCurrentSetIndex(0);
        setCurrentReps(parseInt((newExercise.reps || "10").split('-')[0]));
        setSwapModalOpen(false);
        setSwapSearch('');
    };

    const handleCreateCustomExercise = () => {
        if (!swapSearch.trim()) return;

        const newExercise: Exercise = {
            id: `custom_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            name: {
                [Language.EN]: swapSearch,
                [Language.PT]: swapSearch,
                [Language.ES]: swapSearch
            } as any,
            muscleGroup: "CUSTOM", // Default tag
            sets: 3,
            reps: "10-12",
            videoUrl: "",
            description: "Custom exercise created during workout.",
            equipment: "VARIOUS",
            difficulty: ExperienceLevel.INTERMEDIATE,
            executionTips: [],
            commonMistakes: [],
            safetyNotes: ""
        };

        // 1. Add to user profile
        const updatedProfile = {
            ...profile,
            customExercises: [...(profile.customExercises || []), newExercise]
        };
        onUpdateProfile(updatedProfile);

        // 2. Select it immediately
        handleSwapExercise(newExercise);
    };



    // FALLBACK LOGIC: Improved and more aggressive
    // If current variant has no video, try to find ANY video for the same exercise type
    let videoUrl = currentExercise?.videoUrl;

    if ((!videoUrl || videoUrl === "") && currentExercise) {
        // 1. Differentiate by muscle group to limit false positives
        const targetMuscle = currentExercise.muscleGroup;

        // 2. Get core words from English name (remove content in parenthesis)
        // e.g. "Leg Extension (1.5 reps)" -> "Leg Extension"
        const cleanName = currentExercise.name[Language.EN].split('(')[0].trim();

        // 3. Create tokens (words) to match
        // e.g. ["Leg", "Extension"]
        const tokens = cleanName.split(' ').filter(w => w.length > 2); // Filter short words

        // 4. Find best match in library
        const fallbackEx = EXERCISE_LIBRARY.find(e => {
            // Must be same muscle group
            if (e.muscleGroup !== targetMuscle) return false;
            // Must have a video
            if (!e.videoUrl || e.videoUrl === "") return false;

            // Check if it contains ALL core tokens
            const eName = e.name[Language.EN];
            return tokens.every(token => eName.includes(token));
        });

        if (fallbackEx) {
            console.log(`[Video Fallback] Used video from ${fallbackEx.name[Language.EN]} for ${currentExercise.name[Language.EN]}`);
            videoUrl = fallbackEx.videoUrl;
        }
    }

    const exerciseDetails = currentExercise ? { ...currentExercise, videoUrl } : currentExercise;

    // Initialize logs for all exercises
    useEffect(() => {
        if (exercises.length === 0) return;

        const initialLogs: ExerciseLog[] = exercises.map(ex => {
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
    }, [workout, lang, exercises.length]);

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
            const isLastSet = currentSetIndex === (currentExercise.sets || 3) - 1;
            const alreadyCompleted = currentLog.sets[currentSetIndex].completed;

            // Mark as completed immediately
            currentLog.sets[currentSetIndex] = {
                ...currentLog.sets[currentSetIndex],
                reps: currentReps,
                weight: currentWeight,
                completed: true
            };
            setExerciseLogs(updatedLogs);

            // AUTO-ADVANCE LOGIC
            // If it's the last set, we want to show the green check briefly then move on automatically
            if (isLastSet) {
                // If it was ALREADY completed and user clicked again, move immediately (manual override)
                if (alreadyCompleted) {
                    advanceExercise();
                    return;
                }

                // Otherwise, wait 500ms for visual feedback ("Completed!") then advance
                setTimeout(() => {
                    advanceExercise();
                }, 500);
            } else {
                // If NOT last set, advance immediately to rest/next set
                setRestTimeLeft(90);
                setIsResting(true);
                setCurrentSetIndex(currentSetIndex + 1);
            }
        }
    };

    const advanceExercise = () => {
        if (currentExerciseIndex < exercises.length - 1) {
            setCurrentExerciseIndex(prev => prev + 1);
            setCurrentSetIndex(0);
            setRestTimeLeft(90);
            setIsResting(true);
        } else {
            finishWorkout();
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
        } else if (currentExerciseIndex < exercises.length - 1) {
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
    if (!currentExercise || exercises.length === 0) {
        return (
            <div className="min-h-screen bg-slate-900 text-white p-6 flex flex-col items-center justify-center">
                <p className="text-xl font-black mb-4">{t.activeWorkout.noExercises}</p>
                <button onClick={onCancel} className="bg-indigo-600 px-6 py-3 rounded-2xl font-black">
                    {t.activeWorkout.back}
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
                    <p className="text-[10px] font-black uppercase opacity-40 tracking-widest">{t.activeWorkout.activeTraining}</p>
                    <h2 className="font-black text-lg italic uppercase tracking-tighter">{workout.title[lang]}</h2>
                </div>
                <button
                    onClick={() => { setAiModalOpen(true); setAiResponse(''); }}
                    className="p-3 bg-indigo-600 rounded-2xl border border-indigo-400 shadow-lg shadow-indigo-600/20 active:scale-95 transition-all text-white animate-pulse"
                >
                    <Sparkles size={20} />
                </button>
            </div>

            {/* Overall Progress */}
            <div className="bg-slate-800 p-6 rounded-[35px] border border-slate-700/50">
                <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-black uppercase opacity-40">{t.activeWorkout.generalProgress}</span>
                    <span className="text-sm font-black text-indigo-400">{totalSetsCompleted}/{totalSetsTotal} {t.activeWorkout.sets}</span>
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
                restMinimized ? (
                    <div className="fixed bottom-24 left-6 right-6 bg-orange-600 p-4 rounded-2xl flex items-center justify-between shadow-lg z-50 animate-in slide-in-from-bottom border border-orange-400">
                        <div className="flex items-center gap-3">
                            <Timer size={24} className="text-white animate-pulse" />
                            <div>
                                <p className="text-[10px] font-black uppercase text-orange-200 tracking-widest leading-none">Descanso</p>
                                <p className="text-2xl font-black text-white leading-none">{formatTime(restTimeLeft)}</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => setRestMinimized(false)} className="bg-white/20 p-2 rounded-xl text-white font-bold text-xs">Exibir</button>
                            <button onClick={() => setIsResting(false)} className="bg-white text-orange-600 px-4 py-2 rounded-xl font-bold uppercase text-xs">Pular</button>
                        </div>
                    </div>
                ) : (
                    <div className="fixed inset-0 z-50 bg-slate-900/95 backdrop-blur-sm flex flex-col items-center justify-center p-8 animate-in fade-in">
                        <div className="bg-gradient-to-br from-orange-600 to-orange-800 w-full max-w-md p-10 rounded-[50px] text-center shadow-2xl relative border border-orange-500/50">
                            <button onClick={() => setRestMinimized(true)} className="absolute top-6 right-6 p-2 bg-black/20 rounded-full text-white/60 hover:text-white transition-colors">
                                <ChevronLeft className="rotate-[-90deg]" size={24} />
                            </button>

                            <div className="mb-6 relative">
                                <div className="absolute inset-0 bg-white/20 animate-ping rounded-full opacity-20"></div>
                                <Timer size={64} className="mx-auto text-white relative z-10" />
                            </div>

                            <p className="text-xs font-black uppercase opacity-60 mb-2 tracking-widest text-orange-100">{t.activeWorkout.restTime}</p>
                            <p className="text-8xl font-black text-white tracking-tighter mb-8">{formatTime(restTimeLeft)}</p>

                            <div className="space-y-3">
                                <button
                                    onClick={() => setRestTimeLeft(prev => prev + 30)}
                                    className="bg-white/10 w-full py-4 rounded-2xl font-black uppercase text-sm text-white hover:bg-white/20 transition-all"
                                >
                                    + 30s
                                </button>
                                <button
                                    onClick={() => setIsResting(false)}
                                    className="bg-white text-orange-700 w-full py-4 rounded-2xl font-black uppercase text-sm shadow-xl active:scale-95 transition-all"
                                >
                                    {t.activeWorkout.skipRest}
                                </button>
                            </div>
                        </div>
                    </div>
                )
            )}

            {/* Current Exercise */}
            {!isResting && (
                <div className="space-y-6">
                    {/* Exercise Info */}
                    <div className="bg-slate-800 p-8 rounded-[40px] border border-indigo-500/30">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <p className="text-[10px] font-black uppercase opacity-40 mb-1">
                                    {t.activeWorkout.exercise} {currentExerciseIndex + 1}/{exercises.length}
                                </p>
                                <div className="flex items-center gap-3">
                                    <h3 className="text-2xl font-black italic uppercase tracking-tighter">
                                        {exerciseDetails?.name[lang]}
                                    </h3>
                                    <button
                                        onClick={() => setSwapModalOpen(true)}
                                        className="px-3 py-1.5 bg-indigo-600/20 hover:bg-indigo-600/40 border border-indigo-500/30 rounded-lg text-indigo-300 text-[10px] font-black uppercase tracking-wider flex items-center gap-2 transition-all active:scale-95"
                                        title={t.activeWorkout?.swap || "Swap Exercise"}
                                    >
                                        <Repeat size={12} />
                                        {lang === Language.PT ? 'Trocar' : 'Swap'}
                                    </button>
                                </div>
                                <p className="text-xs opacity-60 mt-1">{exerciseDetails?.muscleGroup[lang]}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] font-black uppercase opacity-40">{t.activeWorkout.set}</p>
                                <p className="text-3xl font-black text-indigo-400">
                                    {currentSetIndex + 1}/{currentExercise.sets || 3}
                                </p>
                            </div>
                        </div>

                        {/* Target Reps */}
                        <div className="p-4 bg-slate-900/50 rounded-2xl border border-slate-700">
                            <p className="text-[9px] font-black uppercase opacity-40 mb-1">{t.activeWorkout.target}</p>
                            <p className="font-black">{currentExercise.reps || '10-12'} {t.activeWorkout.reps}</p>
                        </div>

                        {/* Video Toggle */}
                        <button
                            onClick={() => setShowVideo(!showVideo)}
                            className="w-full mt-4 p-4 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center gap-2 font-black uppercase text-xs hover:bg-slate-900/80 transition-colors"
                        >
                            <Video size={16} className="text-indigo-400" />
                            {showVideo ? t.activeWorkout.hideVideo : t.activeWorkout.showVideo}
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
                    <div className="bg-slate-800 p-6 rounded-[35px] border border-slate-700/50 space-y-6">
                        <h4 className="font-black uppercase text-xs opacity-40 tracking-widest">{t.activeWorkout.logSet}</h4>

                        {/* Weight Input */}
                        <div>
                            <label className="text-[10px] font-black uppercase opacity-40 ml-2 mb-2 block">
                                {t.activeWorkout.weight}
                            </label>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setCurrentWeight(Math.max(0, currentWeight - 2.5))}
                                    className="h-12 w-12 flex-shrink-0 flex items-center justify-center bg-slate-900 rounded-2xl border border-slate-700 active:scale-95 transition-all"
                                >
                                    <Minus size={20} />
                                </button>
                                <input
                                    type="number"
                                    value={currentWeight}
                                    onChange={(e) => setCurrentWeight(parseFloat(e.target.value) || 0)}
                                    className="flex-1 bg-slate-900 border-2 border-slate-700 h-12 w-0 rounded-2xl text-center text-xl font-black outline-none focus:border-indigo-500"
                                />
                                <button
                                    onClick={() => setCurrentWeight(currentWeight + 2.5)}
                                    className="h-12 w-12 flex-shrink-0 flex items-center justify-center bg-slate-900 rounded-2xl border border-slate-700 active:scale-95 transition-all"
                                >
                                    <Plus size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Reps Input */}
                        <div>
                            <label className="text-[10px] font-black uppercase opacity-40 ml-2 mb-2 block">
                                {t.activeWorkout.repetitions}
                            </label>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setCurrentReps(Math.max(1, currentReps - 1))}
                                    className="h-12 w-12 flex-shrink-0 flex items-center justify-center bg-slate-900 rounded-2xl border border-slate-700 active:scale-95 transition-all"
                                >
                                    <Minus size={20} />
                                </button>
                                <input
                                    type="number"
                                    value={currentReps}
                                    onChange={(e) => setCurrentReps(parseInt(e.target.value) || 0)}
                                    className="flex-1 bg-slate-900 border-2 border-slate-700 h-12 w-0 rounded-2xl text-center text-xl font-black outline-none focus:border-indigo-500"
                                />
                                <button
                                    onClick={() => setCurrentReps(currentReps + 1)}
                                    className="h-12 w-12 flex-shrink-0 flex items-center justify-center bg-slate-900 rounded-2xl border border-slate-700 active:scale-95 transition-all"
                                >
                                    <Plus size={20} />
                                </button>
                            </div>
                            {/* AI Coach Modal */}
                            {aiModalOpen && (
                                <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-4 animate-in fade-in duration-200">
                                    <div className="bg-slate-900 border border-indigo-500/30 w-full max-w-md rounded-[40px] p-6 shadow-2xl animate-in slide-in-from-bottom duration-300">
                                        <div className="flex justify-between items-center mb-6">
                                            <div className="flex items-center gap-3">
                                                <div className="p-3 bg-indigo-600 rounded-xl">
                                                    <Sparkles size={20} className="text-white" />
                                                </div>
                                                <div>
                                                    <h3 className="font-black text-xl italic uppercase text-white">AI Coach</h3>
                                                    <p className="text-xs text-indigo-400 font-bold uppercase tracking-widest">Powered by Gemini</p>
                                                </div>
                                            </div>
                                            <button onClick={() => setAiModalOpen(false)} className="p-2 bg-slate-800 rounded-full text-slate-400 hover:text-white">
                                                <X size={20} />
                                            </button>
                                        </div>

                                        {aiLoading ? (
                                            <div className="py-12 text-center space-y-4">
                                                <div className="animate-spin w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto" />
                                                <p className="text-sm font-bold animate-pulse text-indigo-300">
                                                    {lang === Language.PT ? 'Consultando o Coach...' : lang === Language.ES ? 'Consultando al Coach...' : 'Asking the Coach...'}
                                                </p>
                                            </div>
                                        ) : aiResponse ? (
                                            <div className="space-y-6">
                                                <div className="bg-slate-800/50 p-4 rounded-3xl border border-slate-700 max-h-[60vh] overflow-y-auto">
                                                    <p className="whitespace-pre-wrap leading-relaxed text-slate-300 text-sm">
                                                        {aiResponse.replace(/\*\*/g, '')}
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() => setAiResponse('')}
                                                    className="w-full py-4 bg-slate-800 rounded-2xl font-black uppercase text-sm hover:bg-slate-700 transition-colors"
                                                >
                                                    {lang === Language.PT ? 'Fazer outra pergunta' : lang === Language.ES ? 'Hacer otra pregunta' : 'Ask another question'}
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="space-y-3">
                                                <p className="text-sm text-slate-400 mb-2">
                                                    {lang === Language.PT ? 'Sobre' : lang === Language.ES ? 'Sobre' : 'About'} {currentExercise?.name[lang]}:
                                                </p>

                                                <button onClick={() => handleAskCoach('FORM')} className="w-full p-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-2xl flex items-center gap-4 transition-all group">
                                                    <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-xl group-hover:scale-110 transition-transform">
                                                        <Check size={20} />
                                                    </div>
                                                    <div className="text-left">
                                                        <p className="font-black uppercase text-sm text-white">
                                                            {lang === Language.PT ? 'Como executar?' : lang === Language.ES ? '¿Cómo ejecutar?' : 'How to perform?'}
                                                        </p>
                                                        <p className="text-xs text-slate-400">
                                                            {lang === Language.PT ? 'Dicas de postura e técnica' : lang === Language.ES ? 'Consejos de postura y técnica' : 'Technique and form tips'}
                                                        </p>
                                                    </div>
                                                </button>

                                                <button onClick={() => handleAskCoach('PAIN')} className="w-full p-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-2xl flex items-center gap-4 transition-all group">
                                                    <div className="p-3 bg-red-500/20 text-red-400 rounded-xl group-hover:scale-110 transition-transform">
                                                        <AlertCircle size={20} />
                                                    </div>
                                                    <div className="text-left">
                                                        <p className="font-black uppercase text-sm text-white">
                                                            {lang === Language.PT ? 'Sinto Dor' : lang === Language.ES ? 'Siento Dolor' : 'I feel pain'}
                                                        </p>
                                                        <p className="text-xs text-slate-400">
                                                            {lang === Language.PT ? 'Segurança e adaptações' : lang === Language.ES ? 'Seguridad y adaptaciones' : 'Safety and adaptations'}
                                                        </p>
                                                    </div>
                                                </button>

                                                <button onClick={() => handleAskCoach('ALTERNATE')} className="w-full p-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-2xl flex items-center gap-4 transition-all group">
                                                    <div className="p-3 bg-amber-500/20 text-amber-400 rounded-xl group-hover:scale-110 transition-transform">
                                                        <Repeat size={20} />
                                                    </div>
                                                    <div className="text-left">
                                                        <p className="font-black uppercase text-sm text-white">
                                                            {lang === Language.PT ? 'Substituir Exercício' : lang === Language.ES ? 'Reemplazar Ejercicio' : 'Substitute Exercise'}
                                                        </p>
                                                        <p className="text-xs text-slate-400">
                                                            {lang === Language.PT ? 'Alternativas imediatas' : lang === Language.ES ? 'Alternativas inmediatas' : 'Immediate alternatives'}
                                                        </p>
                                                    </div>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
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
                                    {currentExerciseIndex < exercises.length - 1 ? (
                                        // Improved UX: Show "Complete Set X" explicitly even on last set
                                        <div className="flex flex-col items-center leading-none">
                                            <span>{t.activeWorkout.completeSet} {currentSetIndex + 1}</span>
                                            <span className="text-[10px] opacity-70 font-bold tracking-widest mt-1">
                                                ({t.activeWorkout.nextExercise})
                                            </span>
                                        </div>
                                    ) : (
                                        t.activeWorkout.finishWorkout
                                    )}
                                </>
                            ) : (
                                <>
                                    <Check size={24} />
                                    {t.activeWorkout.completeSet} {currentSetIndex + 1}
                                </>
                            )}
                        </button>

                        <button
                            onClick={skipSet}
                            className="w-full p-4 rounded-2xl border border-slate-700 font-black uppercase text-xs opacity-60 hover:opacity-100 transition-all"
                        >
                            {t.activeWorkout.skipSet}
                        </button>
                    </div>

                    {/* Sets Completed for Current Exercise */}
                    <div className="bg-slate-800 p-6 rounded-[35px] border border-slate-700/50">
                        <p className="text-[10px] font-black uppercase opacity-40 mb-4">{t.activeWorkout.setsCompleted}</p>
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


            {/* SWAP MODAL */}
            {
                swapModalOpen && (
                    <div className="fixed inset-0 z-[70] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
                        <div className="bg-slate-900 border border-indigo-500/30 w-full max-w-md rounded-[35px] p-6 shadow-2xl h-[80vh] flex flex-col">
                            <div className="flex justify-between items-center mb-6 flex-none">
                                <div>
                                    <h3 className="font-black text-xl italic uppercase text-white">
                                        {lang === Language.PT ? 'Trocar Exercício' : lang === Language.ES ? 'Cambiar Ejercicio' : 'Swap Exercise'}
                                    </h3>
                                    <p className="text-xs text-indigo-400 font-bold uppercase tracking-widest">{t.categories.CUSTOM}</p>
                                </div>
                                <button onClick={() => setSwapModalOpen(false)} className="p-2 bg-slate-800 rounded-full text-slate-400 hover:text-white">
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Search */}
                            <div className="relative mb-4 flex-none">
                                <input
                                    type="text"
                                    value={swapSearch}
                                    onChange={(e) => setSwapSearch(e.target.value)}
                                    placeholder={lang === Language.PT ? 'Buscar ou Criar...' : 'Search or Create...'}
                                    className="w-full bg-slate-950 border border-slate-700 rounded-2xl p-4 pl-10 text-white outline-none focus:border-indigo-500 font-bold"
                                    autoFocus
                                />
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                                    <Repeat size={16} />
                                </div>
                            </div>

                            {/* List */}
                            <div className="flex-1 overflow-y-auto space-y-2 pr-2">
                                {/* Create Option */}
                                {swapSearch && getAvailableExercises().length === 0 && (
                                    <button
                                        onClick={handleCreateCustomExercise}
                                        className="w-full p-4 bg-indigo-600 hover:bg-indigo-500 rounded-2xl flex items-center gap-3 transition-colors animate-in slide-in-from-top-2"
                                    >
                                        <div className="p-2 bg-white/20 rounded-full text-white">
                                            <Plus size={16} />
                                        </div>
                                        <div className="text-left">
                                            <p className="font-black text-white text-sm uppercase">
                                                {lang === Language.PT ? 'Criar:' : 'Create:'} "{swapSearch}"
                                            </p>
                                            <p className="text-[10px] text-indigo-200 font-bold uppercase tracking-widest">
                                                {lang === Language.PT ? 'Adicionar ao meu portfólio' : 'Add to my portfolio'}
                                            </p>
                                        </div>
                                    </button>
                                )}

                                {getAvailableExercises().map(ex => (
                                    <button
                                        key={ex.id}
                                        onClick={() => handleSwapExercise(ex)}
                                        className="w-full p-4 bg-slate-800 hover:bg-slate-700/80 border border-slate-700/50 rounded-2xl flex items-center justify-between group transition-colors"
                                    >
                                        <div className="text-left">
                                            <p className="font-bold text-slate-200 text-sm">{ex.name[lang] || ex.name.EN}</p>
                                            <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{ex.muscleGroup}</p>
                                        </div>
                                        <div className="p-2 bg-slate-900 rounded-full text-slate-500 group-hover:text-indigo-400">
                                            <Repeat size={14} />
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
};
