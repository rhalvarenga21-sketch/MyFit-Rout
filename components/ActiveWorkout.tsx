import React, { useState, useEffect } from 'react';
import { Check, ChevronLeft, Timer, Repeat, Plus, Minus, Sparkles, X, AlertCircle, ChevronRight } from 'lucide-react';
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

export const ActiveWorkout: React.FC<ActiveWorkoutProps> = ({
    workout, lang, userId, profile, onComplete, onCancel, onUpdateProfile, customExercises
}) => {
    const t = translations[lang] as any;
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
    const [currentSetIndex, setCurrentSetIndex] = useState(0);
    const [currentWeight, setCurrentWeight] = useState(20);
    const [currentReps, setCurrentReps] = useState(10);
    const [exerciseLogs, setExerciseLogs] = useState<ExerciseLog[]>([]);
    const [startTime] = useState(new Date());
    const [isResting, setIsResting] = useState(false);
    const [restTimeLeft, setRestTimeLeft] = useState(0);
    const [aiModalOpen, setAiModalOpen] = useState(false);
    const [aiResponse, setAiResponse] = useState('');
    const [aiLoading, setAiLoading] = useState(false);
    const [swapModalOpen, setSwapModalOpen] = useState(false);
    const [swapSearch, setSwapSearch] = useState('');
    const [exercises, setExercises] = useState<Exercise[]>([]);

    const allExerciseIds = [
        ...(workout.warmupIds || []),
        ...(workout.mainBlockIds || []),
        ...(workout.accessoryIds || []),
        ...(workout.cooldownIds || [])
    ];

    useEffect(() => {
        if (typeof customExercises !== 'undefined' && customExercises.length > 0) {
            setExercises(customExercises);
            return;
        }
        const initial = allExerciseIds
            .map(id => {
                const standard = EXERCISE_LIBRARY.find(ex => ex.id === id);
                const custom = profile.customExercises?.find(ex => ex.id === id);
                return standard || custom;
            })
            .filter((ex): ex is Exercise => ex !== undefined);
        setExercises(initial);
    }, [workout, customExercises]);

    const currentExercise = exercises[currentExerciseIndex];

    useEffect(() => {
        if (exercises.length === 0) return;
        const initialLogs: ExerciseLog[] = exercises.map(ex => ({
            exerciseId: ex.id,
            exerciseName: ex.name[lang] || ex.name[Language.EN],
            sets: Array.from({ length: ex.sets || 3 }, (_, i) => ({
                setNumber: i + 1,
                reps: typeof ex.reps === 'string' ? parseInt(ex.reps.split('-')[0]) : 10,
                weight: 0,
                completed: false
            }))
        }));
        setExerciseLogs(initialLogs);
        if (exercises[0]) {
            const r = exercises[0].reps;
            setCurrentReps(typeof r === 'string' ? parseInt(r.split('-')[0]) : 10);
        }
    }, [exercises.length, lang]);

    useEffect(() => {
        if (!currentExercise) return;
        const r = currentExercise.reps;
        setCurrentReps(typeof r === 'string' ? parseInt(r.split('-')[0]) : 10);
        setCurrentWeight(20);
    }, [currentExerciseIndex]);

    useEffect(() => {
        if (isResting && restTimeLeft > 0) {
            const interval = setInterval(() => {
                setRestTimeLeft(prev => {
                    if (prev <= 1) { setIsResting(false); return 0; }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [isResting, restTimeLeft]);

    const getVideoUrl = (exercise: Exercise) => {
        if (exercise?.videoUrl) return exercise.videoUrl;
        const cleanName = exercise?.name[Language.EN].split('(')[0].trim() || '';
        const tokens = cleanName.split(' ').filter(w => w.length > 2);
        const fallback = EXERCISE_LIBRARY.find(e =>
            e.muscleGroup === exercise?.muscleGroup && e.videoUrl &&
            tokens.every(token => e.name[Language.EN].includes(token))
        );
        return fallback?.videoUrl || '';
    };

    const getAvailableExercises = () => {
        const fullLib = [...EXERCISE_LIBRARY, ...(profile.customExercises || [])];
        if (!swapSearch) return fullLib.slice(0, 20);
        const lower = swapSearch.toLowerCase();
        return fullLib.filter(ex =>
            ex.name[Language.EN].toLowerCase().includes(lower) ||
            ex.name[Language.PT].toLowerCase().includes(lower) ||
            ex.muscleGroup.toLowerCase().includes(lower)
        );
    };

    const handleSwapExercise = (newExercise: Exercise) => {
        const updated = [...exercises];
        updated[currentExerciseIndex] = newExercise;
        setExercises(updated);
        const updatedLogs = [...exerciseLogs];
        updatedLogs[currentExerciseIndex] = {
            exerciseId: newExercise.id,
            exerciseName: newExercise.name[lang] || newExercise.name[Language.EN],
            sets: Array.from({ length: newExercise.sets || 3 }, (_, i) => ({
                setNumber: i + 1,
                reps: parseInt((newExercise.reps || '10').split('-')[0]),
                weight: 0,
                completed: false
            }))
        };
        setExerciseLogs(updatedLogs);
        setCurrentSetIndex(0);
        setSwapModalOpen(false);
        setSwapSearch('');
    };

    const handleCreateCustomExercise = () => {
        if (!swapSearch.trim()) return;
        const newExercise: Exercise = {
            id: `custom_${Date.now()}`,
            name: { [Language.EN]: swapSearch, [Language.PT]: swapSearch, [Language.ES]: swapSearch } as any,
            muscleGroup: 'CUSTOM', sets: 3, reps: '10-12', videoUrl: '',
            description: 'Custom exercise.', equipment: 'VARIOUS',
            difficulty: ExperienceLevel.INTERMEDIATE,
            executionTips: [], commonMistakes: [], safetyNotes: ''
        };
        onUpdateProfile({ ...profile, customExercises: [...(profile.customExercises || []), newExercise] });
        handleSwapExercise(newExercise);
    };

    const handleAskCoach = async (queryType: 'FORM' | 'PAIN' | 'ALTERNATE') => {
        if (!currentExercise) return;
        setAiLoading(true);
        setAiResponse('');
        const ctx = `User performing: ${currentExercise.name[lang]}. Set ${currentSetIndex + 1}/${currentExercise.sets}. Weight: ${currentWeight}kg. Level: ${profile.level}.`;
        const queries = {
            FORM: `Explain how to perform ${currentExercise.name[lang]} correctly. 3 critical cues. Short.`,
            PAIN: `I feel pain doing ${currentExercise.name[lang]}. Safer variation? Short.`,
            ALTERNATE: `Can't do ${currentExercise.name[lang]}. 1 immediate alternative.`
        };
        try {
            const response = await getRealAIResponse(ctx + '\n' + queries[queryType], profile, lang);
            setAiResponse(response);
        } catch {
            setAiResponse('Erro ao conectar com o Coach. Tente novamente.');
        } finally {
            setAiLoading(false);
        }
    };

    const logSet = () => {
        const updatedLogs = [...exerciseLogs];
        const currentLog = updatedLogs[currentExerciseIndex];
        if (!currentLog || !currentLog.sets[currentSetIndex]) return;
        const isLastSet = currentSetIndex === (currentExercise.sets || 3) - 1;
        const alreadyCompleted = currentLog.sets[currentSetIndex].completed;
        currentLog.sets[currentSetIndex] = {
            ...currentLog.sets[currentSetIndex],
            reps: currentReps, weight: currentWeight, completed: true
        };
        setExerciseLogs(updatedLogs);
        if (isLastSet) {
            if (alreadyCompleted) { advanceExercise(); return; }
            setTimeout(() => advanceExercise(), 400);
        } else {
            setRestTimeLeft(90);
            setIsResting(true);
            setCurrentSetIndex(currentSetIndex + 1);
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

    const skipSet = () => {
        if (currentSetIndex < (currentExercise.sets || 3) - 1) {
            setCurrentSetIndex(currentSetIndex + 1);
        } else {
            advanceExercise();
        }
    };

    const finishWorkout = () => {
        const endTime = new Date();
        const durationMinutes = Math.round((endTime.getTime() - startTime.getTime()) / 60000);
        let totalWeight = 0, totalSets = 0, totalReps = 0;
        exerciseLogs.forEach(log => {
            log.sets.forEach(set => {
                if (set.completed) { totalWeight += set.weight * set.reps; totalSets++; totalReps += set.reps; }
            });
        });
        onComplete({
            userId, workoutName: workout.title[lang], workoutType: 'PRESET',
            presetWorkoutId: workout.id, startedAt: startTime.toISOString(),
            completedAt: endTime.toISOString(), durationMinutes,
            totalWeightLifted: totalWeight, totalSets, totalReps, exercises: exerciseLogs
        });
    };

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    const totalSetsCompleted = exerciseLogs.reduce((acc, log) => acc + log.sets.filter(s => s.completed).length, 0);
    const totalSetsTotal = exerciseLogs.reduce((acc, log) => acc + log.sets.length, 0);
    const progressPercent = totalSetsTotal > 0 ? (totalSetsCompleted / totalSetsTotal) * 100 : 0;

    if (!currentExercise || exercises.length === 0) {
        return (
            <div className="min-h-screen bg-slate-900 text-blue with truncated code at the bottom**