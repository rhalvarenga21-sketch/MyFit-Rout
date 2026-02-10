
import React, { useState, useEffect } from 'react';
import { Utensils, Zap, Plus, Search, Trash2, ChevronRight, BookOpen, Sun, Snowflake, X, Copy, MoreHorizontal, Eraser, Save } from 'lucide-react';
import { UserProfile, Language, MealLog, FoodItem, MealType } from '../types';
import { getNutritionAdvice } from '../services/gemini';
import { calculateDailyCalorieTarget, calculateMacros } from '../utils/metrics';
import { translations } from '../translations';
import { getFoodById } from '../data/foods'; // Removed searchFoods direct import
import { RECIPE_DATABASE, Recipe, RecipeCategory } from '../data/recipes';
import { FoodApiService } from '../services/foodApi';
import { StorageService } from '../services/storage';

interface NutritionTrackerProps {
    profile: UserProfile;
    lang: Language;
}

const MEAL_SECTIONS: { id: MealType; label: string; icon: string }[] = [
    { id: 'BREAKFAST', label: 'Café da Manhã', icon: '☕' },
    { id: 'LUNCH', label: 'Almoço', icon: '🍲' },
    { id: 'SNACK', label: 'Lanches', icon: '🥪' },
    { id: 'PRE_WORKOUT', label: 'Pré-Treino', icon: '⚡' },
    { id: 'POST_WORKOUT', label: 'Pós-Treino', icon: '💪' },
    { id: 'DINNER', label: 'Jantar', icon: '🌙' },
];

export const NutritionTracker: React.FC<NutritionTrackerProps> = ({ profile, lang }) => {
    const t = translations[lang] as any;
    const [aiTip, setAiTip] = useState<string | null>(null);

    // Calculator State
    const [logs, setLogs] = useState<MealLog[]>([]);

    // UI State
    const [view, setView] = useState<'tracker' | 'recipes'>('tracker');
    const [recipeCategory, setRecipeCategory] = useState<RecipeCategory>('SUMMER');
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
    const [isSearching, setIsSearching] = useState(false);

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isCreateFoodMode, setIsCreateFoodMode] = useState(false);
    const [targetMealType, setTargetMealType] = useState<MealType>('BREAKFAST');
    const [searchTerm, setSearchTerm] = useState('');
    const [localResults, setLocalResults] = useState<FoodItem[]>([]);
    const [externalResults, setExternalResults] = useState<FoodItem[]>([]);
    const [isSearchingExternal, setIsSearchingExternal] = useState(false);
    const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
    const [weightInput, setWeightInput] = useState('100');
    const [waterIntake, setWaterIntake] = useState(0);
    const [customFoods, setCustomFoods] = useState<FoodItem[]>([]);

    // Create Food Form State
    const [newFood, setNewFood] = useState({
        name: '',
        calories: '',
        protein: '',
        carbs: '',
        fats: ''
    });

    // Load data
    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];

        // Load Logs
        const savedLogs = StorageService.getLogs(today);
        setLogs(savedLogs);

        // Load Water
        setWaterIntake(StorageService.getWater(today));

        // Load Custom Foods
        setCustomFoods(StorageService.getCustomFoods());

        loadAiAdvice();
    }, []);

    // Save logs & water
    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        StorageService.saveLogs(today, logs);
        StorageService.saveWater(today, waterIntake);
    }, [logs, waterIntake]);

    const loadAiAdvice = async () => {
        const advice = await getNutritionAdvice(profile, 'daily', lang);
        setAiTip(advice);
    };

    // Metrics Calculation
    const { target: targetCalories } = calculateDailyCalorieTarget(profile);
    const { protein: targetProtein, fats: targetFats, carbs: targetCarbs } = calculateMacros(profile);

    const consumed = logs.reduce((acc, log) => {
        // Try to find in static DB or custom list
        const food = getFoodById(log.foodId) || customFoods.find(f => f.id === log.foodId);

        if (!food) return acc;
        const ratio = log.weight / 100;
        return {
            calories: acc.calories + (food.calories * ratio),
            protein: acc.protein + (food.protein * ratio),
            carbs: acc.carbs + (food.carbs * ratio),
            fats: acc.fats + (food.fats * ratio),
            fiber: (acc as any).fiber + (0 * ratio),
            sodium: (acc as any).sodium + (0 * ratio)
        };
    }, { calories: 0, protein: 0, carbs: 0, fats: 0, fiber: 0, sodium: 0 });

    const remainingCalories = Math.max(0, targetCalories - consumed.calories);

    // Actions
    // Debounced External Search
    useEffect(() => {
        if (searchTerm.length < 3) {
            setExternalResults([]);
            return;
        }

        const timer = setTimeout(async () => {
            setIsSearchingExternal(true);
            try {
                const results = await FoodApiService.searchExternal(searchTerm, lang, profile.country);
                setExternalResults(results);
            } catch (e) {
                console.error(e);
            } finally {
                setIsSearchingExternal(false);
            }
        }, 600);

        return () => clearTimeout(timer);
    }, [searchTerm, lang]);

    const handleSearch = (term: string) => {
        setSearchTerm(term);
        if (term.length > 1) {
            // Instant Local Search
            const local = FoodApiService.searchLocal(term, lang);
            setLocalResults(local);
        } else {
            setLocalResults([]);
            setExternalResults([]);
        }
    };

    const addRecipeToLog = (recipe: Recipe, mealType: MealType) => {
        // Convert Recipe to FoodItem format for the tracker
        const recipeFood: FoodItem = {
            id: recipe.id,
            name: recipe.title,
            calories: recipe.calories,
            protein: recipe.protein,
            carbs: recipe.carbs,
            fats: recipe.fats,
            category: 'OTHER'
        };

        // Add to custom foods (cache) if not present, so metrics work
        if (!customFoods.find(f => f.id === recipe.id)) {
            StorageService.addCustomFood(recipeFood);
            setCustomFoods(prev => [...prev, recipeFood]);
        }

        const newLog: MealLog = {
            id: Date.now().toString(),
            foodId: recipe.id,
            weight: 100, // 1 Unit/Serving treated as 100g in logic (or strictly 1 serving)
            mealType: mealType,
            timestamp: new Date().toISOString()
        };

        setLogs(prev => [...prev, newLog]);
        setSelectedRecipe(null);
        setView('tracker');
    };

    const handleCreateFood = () => {
        if (!newFood.name || !newFood.calories) return;

        const created: FoodItem = {
            id: `custom_${Date.now()}`,
            name: { [Language.PT]: newFood.name, [Language.EN]: newFood.name, [Language.ES]: newFood.name },
            calories: parseFloat(newFood.calories) || 0,
            protein: parseFloat(newFood.protein) || 0,
            carbs: parseFloat(newFood.carbs) || 0,
            fats: parseFloat(newFood.fats) || 0,
            category: 'OTHER'
        };

        StorageService.addCustomFood(created);
        setCustomFoods(prev => [...prev, created]);
        setSelectedFood(created); // Select it immediately
        setIsCreateFoodMode(false);
        setNewFood({ name: '', calories: '', protein: '', carbs: '', fats: '' }); // Reset
    };

    const openAddModal = (mealType: MealType) => {
        setTargetMealType(mealType);
        setIsAddModalOpen(true);
        setIsCreateFoodMode(false);
        setIsCreateFoodMode(false);
        setSearchTerm('');
        setLocalResults([]);
        setExternalResults([]);
        setSelectedFood(null);
        setWeightInput('100');
    };

    const addFood = () => {
        if (!selectedFood) return;
        const weight = parseFloat(weightInput) || 100;
        const newLog: MealLog = {
            id: Date.now().toString(),
            foodId: selectedFood.id,
            weight,
            mealType: targetMealType,
            timestamp: new Date().toISOString()
        };
        setLogs(prev => [...prev, newLog]);
        setIsAddModalOpen(false);
    };

    const removeLog = (id: string) => {
        if (window.confirm('Remover este alimento?')) {
            setLogs(prev => prev.filter(l => l.id !== id));
        }
    };

    const clearDay = () => {
        if (window.confirm('Tem certeza que deseja limpar todo o dia?')) {
            setLogs([]);
            setWaterIntake(0);
        }
    };

    // Circular Progress Component
    const CircularProgress = ({ value, max, size = 160, strokeWidth = 12 }: any) => {
        const radius = (size - strokeWidth) / 2;
        const circumference = radius * 2 * Math.PI;
        const offset = circumference - (Math.min(value / max, 1) * circumference);

        return (
            <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
                <svg className="transform -rotate-90 w-full h-full">
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        stroke="#1e293b"
                        strokeWidth={strokeWidth}
                        fill="transparent"
                    />
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        stroke="url(#gradient)"
                        strokeWidth={strokeWidth}
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                    />
                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#6366f1" />
                            <stop offset="100%" stopColor="#ec4899" />
                        </linearGradient>
                    </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Restam</span>
                    <span className="text-4xl font-black text-white">{Math.round(remainingCalories)}</span>
                    <span className="text-xs font-bold text-slate-500 mt-1">kcal</span>
                </div>
            </div>
        );
    };

    // Macro Bar Component
    const MacroBar = ({ label, current, max, colorClass }: any) => (
        <div className="mb-3">
            <div className="flex justify-between text-xs font-bold uppercase tracking-widest mb-1">
                <span className="text-slate-400">{label}</span>
                <span className="text-slate-300">
                    {Math.round(current)} / {max}g
                </span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                    className={`h-full rounded-full transition-all duration-1000 ${colorClass}`}
                    style={{ width: `${Math.min((current / max) * 100, 100)}%` }}
                ></div>
            </div>
            <div className="text-[10px] text-right text-slate-500 mt-0.5 font-medium">
                restam {Math.max(0, Math.round(max - current))}g
            </div>
        </div>
    );

    // Helper to get localized meal label
    const getMealLabel = (id: MealType) => {
        const map: Record<MealType, string> = {
            'BREAKFAST': t.tracker?.breakfast || 'Breakfast',
            'LUNCH': t.tracker?.lunch || 'Lunch',
            'SNACK': t.tracker?.snack || 'Snack',
            'PRE_WORKOUT': t.tracker?.preWorkout || 'Pre-Workout',
            'POST_WORKOUT': t.tracker?.postWorkout || 'Post-Workout',
            'DINNER': t.tracker?.dinner || 'Dinner',
        };
        return map[id] || id;
    };

    const MEAL_ICONS: Record<MealType, string> = {
        'BREAKFAST': '☕',
        'LUNCH': '🍲',
        'SNACK': '🥪',
        'PRE_WORKOUT': '⚡',
        'POST_WORKOUT': '💪',
        'DINNER': '🌙',
    };

    const MEAL_ORDER: MealType[] = ['BREAKFAST', 'LUNCH', 'SNACK', 'PRE_WORKOUT', 'POST_WORKOUT', 'DINNER'];

    return (
        <div className="min-h-screen bg-black pb-8 text-white font-['Inter']">

            {/* 1. Header & Dashboard */}
            <div className="bg-slate-900 border-b border-white/10 pb-8 pt-4 px-6 rounded-b-[40px] shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-black italic uppercase tracking-tighter text-white">
                        <span className="text-indigo-500">My</span>Diet
                    </h2>
                    <div className="p-2 bg-slate-800 rounded-lg text-slate-400">
                        <Utensils size={20} />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-8 mb-6">
                    {/* Ring */}
                    <div className="relative">
                        <CircularProgress value={consumed.calories} max={targetCalories} />
                        <div className="flex justify-between w-full text-xs font-bold uppercase tracking-widest mt-4 px-2">
                            <div className="text-center">
                                <span className="block text-white">{Math.round(consumed.calories)}</span>
                                <span className="text-slate-500">{t.tracker?.consumed}</span>
                            </div>
                            <div className="text-center">
                                <span className="block text-white">0</span>
                                <span className="text-slate-500">{t.tracker?.burned}</span>
                            </div>
                        </div>
                    </div>

                    {/* Macros */}
                    <div className="flex-1 w-full space-y-2">
                        <MacroBar label={t.nutrition.carbs} current={consumed.carbs} max={targetCarbs} colorClass="bg-amber-500" />
                        <MacroBar label={t.nutrition.protein} current={consumed.protein} max={targetProtein} colorClass="bg-indigo-500" />
                        <MacroBar label={t.nutrition.fats} current={consumed.fats} max={targetFats} colorClass="bg-cyan-500" />

                        <div className="grid grid-cols-2 gap-3 mt-4">
                            <div className="bg-slate-800 p-2 rounded-lg text-center border border-white/5">
                                <span className="block text-[10px] uppercase font-bold text-slate-400">{t.tracker?.fiber}</span>
                                <span className="text-sm font-black text-white">0 g</span>
                            </div>
                            <div className="bg-slate-800 p-2 rounded-lg text-center border border-white/5">
                                <span className="block text-[10px] uppercase font-bold text-slate-400">{t.tracker?.sodium}</span>
                                <span className="text-sm font-black text-white">0 mg</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-4 py-6 space-y-6 max-w-2xl mx-auto">

                {/* 2. Shortcuts */}
                <div className="bg-slate-900 p-4 rounded-2xl border border-white/5 flex gap-2 overflow-x-auto no-scrollbar">
                    <button onClick={() => openAddModal('BREAKFAST')} className="flex flex-col items-center gap-2 min-w-[80px] p-2 hover:bg-slate-800 rounded-xl transition-colors">
                        <div className="w-10 h-10 bg-indigo-500/20 text-indigo-400 rounded-full flex items-center justify-center">
                            <Plus size={20} />
                        </div>
                        <span className="text-[10px] font-bold uppercase text-slate-400">{t.tracker?.addRef}</span>
                    </button>
                    <button className="flex flex-col items-center gap-2 min-w-[80px] p-2 hover:bg-slate-800 rounded-xl transition-colors opacity-50 cursor-not-allowed">
                        <div className="w-10 h-10 bg-slate-800 text-slate-400 rounded-full flex items-center justify-center border border-white/5">
                            <Copy size={20} />
                        </div>
                        <span className="text-[10px] font-bold uppercase text-slate-400">{t.tracker?.copyDay}</span>
                    </button>
                    <button onClick={clearDay} className="flex flex-col items-center gap-2 min-w-[80px] p-2 hover:bg-slate-800 rounded-xl transition-colors">
                        <div className="w-10 h-10 bg-slate-800 text-slate-400 rounded-full flex items-center justify-center border border-white/5">
                            <Eraser size={20} />
                        </div>
                        <span className="text-[10px] font-bold uppercase text-slate-400">{t.tracker?.clear}</span>
                    </button>
                    <button className="flex flex-col items-center gap-2 min-w-[80px] p-2 hover:bg-slate-800 rounded-xl transition-colors opacity-50 cursor-not-allowed">
                        <div className="w-10 h-10 bg-slate-800 text-slate-400 rounded-full flex items-center justify-center border border-white/5">
                            <MoreHorizontal size={20} />
                        </div>
                        <span className="text-[10px] font-bold uppercase text-slate-400">{t.tracker?.options}</span>
                    </button>
                </div>

                {/* 4. Recipes & Water Tracker Row (New Layout) */}
                <div className="grid grid-cols-2 gap-4">
                    {/* Recipes Column */}
                    <div className="space-y-4">
                        <button onClick={() => { setView('recipes'); setRecipeCategory('WINTER'); }} className="w-full text-left group relative bg-slate-900 p-4 rounded-3xl border border-white/5 overflow-hidden hover:border-cyan-500/50 transition-all h-[110px]">
                            <div className="absolute top-0 right-0 p-4 text-cyan-500/10 group-hover:text-cyan-500/20 transition-all"><Snowflake size={50} /></div>
                            <div className="relative z-10 flex flex-col justify-between h-full">
                                <div className="w-8 h-8 bg-cyan-500/10 rounded-lg flex items-center justify-center text-cyan-400">
                                    <BookOpen size={16} />
                                </div>
                                <div>
                                    <h4 className="font-black italic text-sm leading-none mb-1 text-white">Receitas</h4>
                                    <p className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">Inverno Fit</p>
                                </div>
                            </div>
                        </button>

                        <button onClick={() => { setView('recipes'); setRecipeCategory('SUMMER'); }} className="w-full text-left group relative bg-slate-900 p-4 rounded-3xl border border-white/5 overflow-hidden hover:border-amber-500/50 transition-all h-[110px]">
                            <div className="absolute top-0 right-0 p-4 text-amber-500/10 group-hover:text-amber-500/20 transition-all"><Sun size={50} /></div>
                            <div className="relative z-10 flex flex-col justify-between h-full">
                                <div className="w-8 h-8 bg-amber-500/10 rounded-lg flex items-center justify-center text-amber-400">
                                    <BookOpen size={16} />
                                </div>
                                <div>
                                    <h4 className="font-black italic text-sm leading-none mb-1 text-white">Receitas</h4>
                                    <p className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">Verão Go</p>
                                </div>
                            </div>
                        </button>
                    </div>

                    {/* Water Tracker Column */}
                    <div className="bg-slate-900 p-4 rounded-3xl border border-white/5 flex flex-col justify-between h-full">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="font-black italic uppercase text-slate-300 text-xs">{t.tracker?.waterIntake}</h3>
                            <button onClick={() => setWaterIntake(0)} className="text-[10px] text-slate-500 hover:text-white">{t.tracker?.reset}</button>
                        </div>

                        <div className="flex-1 flex flex-col justify-center gap-4">
                            <div className="relative pt-2">
                                <div className="flex justify-between items-end mb-1">
                                    <span className="text-2xl font-black text-cyan-400">{waterIntake}</span>
                                    <span className="text-[10px] font-bold text-slate-500 uppercase mb-1">/ 3000 ml</span>
                                </div>
                                <div className="h-3 bg-slate-800 rounded-full overflow-hidden relative">
                                    <div
                                        className="h-full bg-cyan-500 rounded-full transition-all duration-500 relative overflow-hidden"
                                        style={{ width: `${Math.min((waterIntake / 3000) * 100, 100)}%` }}
                                    >
                                        <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => setWaterIntake(prev => prev + 250)}
                                className="w-full bg-cyan-600/20 hover:bg-cyan-600 text-cyan-400 hover:text-white border border-cyan-500/30 text-xs font-black uppercase py-3 rounded-xl active:scale-95 transition-all flex items-center justify-center gap-2"
                            >
                                <Plus size={14} /> 250ml
                            </button>
                        </div>
                    </div>
                </div>

                {/* 5. Meal Lists (Grid Layout) */}
                <div className="grid grid-cols-2 gap-4">
                    {MEAL_ORDER.map((sectionId) => {
                        const sectionLogs = logs.filter(log => log.mealType === sectionId);
                        const sectionCalories = sectionLogs.reduce((acc, log) => {
                            const f = getFoodById(log.foodId) || customFoods.find(cf => cf.id === log.foodId);
                            return acc + (f ? f.calories * (log.weight / 100) : 0);
                        }, 0);

                        return (
                            <div key={sectionId} className="bg-slate-900 rounded-3xl border border-white/5 overflow-hidden flex flex-col h-full">
                                <div className="p-4 bg-slate-800/30 border-b border-white/5 flex justify-between items-start">
                                    <div>
                                        <div className="text-2xl mb-1">{MEAL_ICONS[sectionId]}</div>
                                        <h4 className="font-black italic text-sm text-white uppercase leading-none">{getMealLabel(sectionId)}</h4>
                                    </div>
                                    <button
                                        onClick={() => openAddModal(sectionId)}
                                        className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white hover:bg-indigo-500 transition-colors shadow-lg active:scale-90"
                                    >
                                        <Plus size={16} />
                                    </button>
                                </div>

                                <div className="flex-1 p-3">
                                    {sectionLogs.length === 0 ? (
                                        <div className="h-full flex flex-col items-center justify-center text-center opacity-40 py-4">
                                            <span className="text-[10px] uppercase font-bold text-slate-500">Vazio</span>
                                        </div>
                                    ) : (
                                        <div className="space-y-2">
                                            {sectionLogs.map(log => {
                                                const food = getFoodById(log.foodId) || customFoods.find(cf => cf.id === log.foodId);
                                                if (!food) return null;
                                                return (
                                                    <div key={log.id} className="flex justify-between items-center group">
                                                        <div className="min-w-0">
                                                            <p className="text-xs font-bold text-slate-300 truncate">{food.name[lang]}</p>
                                                            <p className="text-[9px] text-slate-500 font-bold">{Math.round(food.calories * (log.weight / 100))} kcal</p>
                                                        </div>
                                                        <button onClick={() => removeLog(log.id)} className="text-slate-600 hover:text-rose-500 p-1">
                                                            <Trash2 size={12} />
                                                        </button>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>

                                <div className="p-2 bg-slate-950/30 border-t border-white/5 text-center">
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{Math.round(sectionCalories)} kcal</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* AI Tip Footer */}
                {/* AI Tip Footer Removed */}
            </div>

            {/* Add Food Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 bg-black/95 backdrop-blur-md z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200" onClick={() => setIsAddModalOpen(false)}>
                    <div className="bg-slate-900 w-full max-w-md h-[90vh] sm:h-auto rounded-t-[40px] sm:rounded-[40px] border border-white/10 flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-300 shadow-2xl" onClick={e => e.stopPropagation()}>

                        {/* Modal Header */}
                        <div className="p-6 border-b border-white/5 flex items-center justify-between shrink-0 bg-slate-900 z-10">
                            <div>
                                <h3 className="text-xl font-black italic uppercase tracking-tighter text-white">{t.tracker?.add || 'Adicionar'}</h3>
                                <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest">{getMealLabel(targetMealType)}</p>
                            </div>
                            <button onClick={() => setIsAddModalOpen(false)} className="p-2 bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        {/* MODE: Create Custom Food */}
                        {isCreateFoodMode ? (
                            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-[10px] font-black uppercase opacity-40 ml-2">Nome do Alimento</label>
                                        <input
                                            value={newFood.name}
                                            onChange={e => setNewFood({ ...newFood, name: e.target.value })}
                                            className="w-full bg-slate-800 p-4 rounded-2xl border border-slate-700 outline-none focus:border-indigo-500 font-bold"
                                            placeholder="Ex: Pão de Queijo Caseiro"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-[10px] font-black uppercase opacity-40 ml-2">Calorias (100g)</label>
                                            <input
                                                type="number"
                                                value={newFood.calories}
                                                onChange={e => setNewFood({ ...newFood, calories: e.target.value })}
                                                className="w-full bg-slate-800 p-4 rounded-2xl border border-slate-700 outline-none focus:border-indigo-500 font-bold"
                                                placeholder="kcal"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-black uppercase opacity-40 ml-2">Proteínas (g)</label>
                                            <input
                                                type="number"
                                                value={newFood.protein}
                                                onChange={e => setNewFood({ ...newFood, protein: e.target.value })}
                                                className="w-full bg-slate-800 p-4 rounded-2xl border border-slate-700 outline-none focus:border-indigo-500 font-bold"
                                                placeholder="g"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-black uppercase opacity-40 ml-2">Carboidratos (g)</label>
                                            <input
                                                type="number"
                                                value={newFood.carbs}
                                                onChange={e => setNewFood({ ...newFood, carbs: e.target.value })}
                                                className="w-full bg-slate-800 p-4 rounded-2xl border border-slate-700 outline-none focus:border-indigo-500 font-bold"
                                                placeholder="g"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-black uppercase opacity-40 ml-2">Gorduras (g)</label>
                                            <input
                                                type="number"
                                                value={newFood.fats}
                                                onChange={e => setNewFood({ ...newFood, fats: e.target.value })}
                                                className="w-full bg-slate-800 p-4 rounded-2xl border border-slate-700 outline-none focus:border-indigo-500 font-bold"
                                                placeholder="g"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={handleCreateFood}
                                    className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 rounded-2xl font-black uppercase tracking-widest text-white shadow-lg active:scale-95 transition-all text-sm flex items-center justify-center gap-2"
                                >
                                    <Save size={18} /> Salvar Alimento
                                </button>
                                <button
                                    onClick={() => setIsCreateFoodMode(false)}
                                    className="w-full py-4 bg-slate-800 hover:bg-slate-700 rounded-2xl font-bold uppercase tracking-widest text-slate-400 transition-all text-sm"
                                >
                                    Cancelar
                                </button>
                            </div>
                        ) : (
                            /* MODE: Search & Select */
                            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                                {!selectedFood ? (
                                    <>
                                        <div className="relative">
                                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                            <input
                                                type="text"
                                                placeholder="Buscar alimento..."
                                                className="w-full bg-slate-800 text-white pl-12 pr-4 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 font-medium placeholder:text-slate-600"
                                                value={searchTerm}
                                                onChange={(e) => handleSearch(e.target.value)}
                                                autoFocus
                                            />
                                        </div>

                                        <button
                                            onClick={() => setIsCreateFoodMode(true)}
                                            className="w-full py-4 border-2 border-dashed border-slate-700 rounded-2xl flex items-center justify-center gap-2 text-slate-400 hover:text-white hover:border-indigo-500 transition-all group"
                                        >
                                            <Plus size={20} className="group-hover:scale-110 transition-transform" />
                                            <span className="font-bold uppercase text-xs tracking-widest">Criar meu próprio alimento</span>
                                        </button>

                                        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                            {/* Local Results */}
                                            {localResults.length > 0 && (
                                                <div className="space-y-2">
                                                    <p className="text-[10px] font-black uppercase text-indigo-400 tracking-widest sticky top-0 bg-slate-900 py-2 z-10 border-b border-white/5">
                                                        Meus Alimentos & Favoritos
                                                    </p>
                                                    {localResults.map(food => (
                                                        <button
                                                            key={food.id}
                                                            onClick={() => setSelectedFood(food)}
                                                            className="w-full p-3 bg-slate-800 hover:bg-slate-700 rounded-xl flex items-center justify-between transition-all border border-white/5 text-left group"
                                                        >
                                                            <div>
                                                                <span className="font-bold text-slate-200 block group-hover:text-white text-sm">
                                                                    {food.name[lang]}
                                                                </span>
                                                                <span className="text-[10px] uppercase text-slate-500 block mt-0.5 font-bold">
                                                                    {food.calories} kcal • {food.protein}g P • {food.carbs}g C • {food.fats}g G
                                                                </span>
                                                            </div>
                                                            <div className="w-6 h-6 rounded-full bg-slate-700 group-hover:bg-indigo-500 flex items-center justify-center text-slate-400 group-hover:text-white transition-colors">
                                                                <ChevronRight size={14} />
                                                            </div>
                                                        </button>
                                                    ))}
                                                </div>
                                            )}

                                            {/* External Results */}
                                            {(isSearchingExternal || externalResults.length > 0) && (
                                                <div className="space-y-2">
                                                    <p className="text-[10px] font-black uppercase text-emerald-400 tracking-widest sticky top-0 bg-slate-900 py-2 z-10 border-b border-white/5">
                                                        Banco de Dados Global
                                                    </p>

                                                    {isSearchingExternal && (
                                                        <div className="text-center py-6 animate-pulse">
                                                            <div className="text-xs font-bold text-slate-500">Buscando online...</div>
                                                        </div>
                                                    )}

                                                    {externalResults.map(food => (
                                                        <button
                                                            key={food.id}
                                                            onClick={() => setSelectedFood(food)}
                                                            className="w-full p-3 bg-slate-800/50 hover:bg-slate-800 rounded-xl flex items-center justify-between transition-all border border-white/5 text-left group"
                                                        >
                                                            <div>
                                                                <span className="font-bold text-slate-300 block group-hover:text-white text-sm">
                                                                    {food.name[lang]}
                                                                </span>
                                                                <span className="text-[10px] uppercase text-slate-500 block mt-0.5 font-bold">
                                                                    {food.calories} kcal • {food.protein}g P • {food.carbs}g C • {food.fats}g G
                                                                </span>
                                                            </div>
                                                            <div className="w-6 h-6 rounded-full bg-slate-700/50 group-hover:bg-emerald-500 flex items-center justify-center text-slate-500 group-hover:text-white transition-colors">
                                                                <ChevronRight size={14} />
                                                            </div>
                                                        </button>
                                                    ))}
                                                </div>
                                            )}

                                            {/* Empty State */}
                                            {searchTerm.length > 1 && localResults.length === 0 && externalResults.length === 0 && !isSearchingExternal && (
                                                <div className="text-center py-12">
                                                    <p className="text-slate-500 font-medium text-sm">Nenhum alimento encontrado.</p>
                                                    <button onClick={() => setIsCreateFoodMode(true)} className="text-indigo-400 font-bold text-xs uppercase mt-2 hover:underline">
                                                        Criar Alimento
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </>
                                ) : (
                                    <div className="space-y-8 animate-in slide-in-from-right duration-300">
                                        <div className="bg-gradient-to-br from-indigo-900/50 to-slate-800 p-6 rounded-3xl text-center border border-indigo-500/20">
                                            <h4 className="text-2xl font-black italic text-white mb-2">{selectedFood.name[lang]}</h4>
                                            <div className="flex justify-center gap-4 text-[10px] font-bold uppercase tracking-widest text-indigo-300/80">
                                                <span className="bg-indigo-900/50 px-2 py-1 rounded">P: {selectedFood.protein}g</span>
                                                <span className="bg-indigo-900/50 px-2 py-1 rounded">C: {selectedFood.carbs}g</span>
                                                <span className="bg-indigo-900/50 px-2 py-1 rounded">G: {selectedFood.fats}g</span>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest text-center">Quantidade (gramas)</label>
                                            <div className="flex justify-center items-center gap-4">
                                                <button onClick={() => setWeightInput(String(Math.max(0, parseFloat(weightInput) - 10)))} className="p-3 bg-slate-800 rounded-xl hover:text-white transition-colors"><ChevronRight className="rotate-180" size={20} /></button>
                                                <div className="relative w-32">
                                                    <input
                                                        type="number"
                                                        className="w-full bg-slate-800 text-white text-center text-3xl font-black py-4 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 border border-white/5"
                                                        value={weightInput}
                                                        onChange={(e) => setWeightInput(e.target.value)}
                                                        inputMode="numeric"
                                                    />
                                                </div>
                                                <button onClick={() => setWeightInput(String(Math.min(9999, parseFloat(weightInput) + 10)))} className="p-3 bg-slate-800 rounded-xl hover:text-white transition-colors"><ChevronRight size={20} /></button>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 text-center">
                                            <div className="bg-slate-800/50 p-4 rounded-2xl border border-white/5">
                                                <span className="block text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Total Calorias</span>
                                                <span className="text-2xl font-black text-white">
                                                    {Math.round(selectedFood.calories * (parseFloat(weightInput) || 0) / 100)}
                                                </span>
                                            </div>
                                            <div className="bg-slate-800/50 p-4 rounded-2xl border border-white/5">
                                                <span className="block text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Total Proteína</span>
                                                <span className="text-2xl font-black text-indigo-400">
                                                    {Math.round(selectedFood.protein * (parseFloat(weightInput) || 0) / 100)}g
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Modal Footer */}
                        {!isCreateFoodMode && selectedFood && (
                            <div className="p-6 border-t border-white/10 space-y-3 bg-slate-900 shrink-0">
                                <button
                                    onClick={addFood}
                                    className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 rounded-2xl font-black uppercase tracking-widest text-white shadow-lg shadow-emerald-500/20 active:scale-95 transition-all text-sm"
                                >
                                    Confirmar
                                </button>
                                <button
                                    onClick={() => setSelectedFood(null)}
                                    className="w-full py-4 bg-slate-800 hover:bg-slate-700 rounded-2xl font-bold uppercase tracking-widest text-slate-400 transition-all text-sm"
                                >
                                    Voltar
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
            {/* RECIPE BROWSER OVERLAY */}
            {view === 'recipes' && (
                <div className="fixed inset-0 bg-black z-50 overflow-y-auto animate-in slide-in-from-bottom duration-300">
                    <div className="p-6 max-w-2xl mx-auto space-y-6">
                        {/* Header */}
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <button onClick={() => setView('tracker')} className="p-2 bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors">
                                    <ChevronRight className="rotate-180" size={24} />
                                </button>
                                <h2 className="text-xl font-black italic uppercase tracking-tighter text-white">Livro de Receitas</h2>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setRecipeCategory('WINTER')}
                                    className={`p-2 rounded-xl transition-all ${recipeCategory === 'WINTER' ? 'bg-cyan-500/20 text-cyan-400 ring-2 ring-cyan-500/50' : 'bg-slate-800 text-slate-500'}`}
                                >
                                    <Snowflake size={20} />
                                </button>
                                <button
                                    onClick={() => setRecipeCategory('SUMMER')}
                                    className={`p-2 rounded-xl transition-all ${recipeCategory === 'SUMMER' ? 'bg-amber-500/20 text-amber-400 ring-2 ring-amber-500/50' : 'bg-slate-800 text-slate-500'}`}
                                >
                                    <Sun size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Title Section */}
                        <div className={`p-8 rounded-[32px] bg-gradient-to-br ${recipeCategory === 'SUMMER' ? 'from-amber-500/20 to-orange-600/20 border-amber-500/30' : 'from-cyan-500/20 to-blue-600/20 border-cyan-500/30'} border relative overflow-hidden text-center`}>
                            <div className="relative z-10">
                                <h3 className="text-3xl font-black italic uppercase text-white mb-2">
                                    {recipeCategory === 'SUMMER' ? 'Menu de Verão' : 'Menu de Inverno'}
                                </h3>
                                <p className="text-xs font-bold uppercase tracking-widest opacity-60">
                                    {recipeCategory === 'SUMMER' ? 'Pratos leves e refrescantes' : 'Pratos quentes e reconfortantes'}
                                </p>
                            </div>
                        </div>

                        {/* Recipe Grid */}
                        <div className="space-y-4">
                            {RECIPE_DATABASE
                                .filter(r => r.category === recipeCategory)
                                .map(recipe => (
                                    <button
                                        key={recipe.id}
                                        onClick={() => setSelectedRecipe(recipe)}
                                        className="w-full text-left bg-slate-900 hover:bg-slate-800 p-4 rounded-3xl border border-white/5 flex items-center gap-4 transition-all group"
                                    >
                                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${recipe.color} flex items-center justify-center text-3xl shadow-lg`}>
                                            {recipe.icon}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-white group-hover:text-indigo-400 transition-colors line-clamp-1">
                                                {recipe.title[lang]}
                                            </h4>
                                            <div className="flex gap-2 mt-2">
                                                <span className="text-[10px] font-bold uppercase bg-slate-800 px-2 py-1 rounded text-slate-400">{recipe.timeMinutes} min</span>
                                                <span className="text-[10px] font-bold uppercase bg-slate-800 px-2 py-1 rounded text-slate-400">{recipe.calories} kcal</span>
                                            </div>
                                        </div>
                                        <div className="w-8 h-8 rounded-full bg-slate-800 group-hover:bg-indigo-500 flex items-center justify-center text-slate-500 group-hover:text-white transition-all">
                                            <ChevronRight size={18} />
                                        </div>
                                    </button>
                                ))
                            }
                        </div>
                    </div>

                    {/* RECIPE DETAILS MODAL */}
                    {selectedRecipe && (
                        <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
                            <div className="bg-slate-900 w-full max-w-lg h-[90vh] sm:h-auto rounded-t-[40px] sm:rounded-[40px] border border-white/10 flex flex-col overflow-hidden animate-in slide-in-from-bottom shadow-2xl">
                                {/* Recipe Header */}
                                <div className={`p-8 bg-gradient-to-br ${selectedRecipe.color} relative`}>
                                    <button onClick={() => setSelectedRecipe(null)} className="absolute top-6 right-6 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white backdrop-blur-md transition-all">
                                        <X size={20} />
                                    </button>
                                    <div className="text-6xl mb-4">{selectedRecipe.icon}</div>
                                    <h2 className="text-2xl font-black italic uppercase text-white leading-tight shadow-black drop-shadow-md">
                                        {selectedRecipe.title[lang]}
                                    </h2>
                                    <div className="flex gap-3 mt-4">
                                        <span className="text-[10px] font-bold uppercase bg-black/20 backdrop-blur-md px-3 py-1 rounded-full text-white">
                                            {selectedRecipe.timeMinutes} min
                                        </span>
                                        <span className="text-[10px] font-bold uppercase bg-black/20 backdrop-blur-md px-3 py-1 rounded-full text-white">
                                            {selectedRecipe.difficulty}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                                    {/* Macros Grid */}
                                    <div className="grid grid-cols-4 gap-2">
                                        {[
                                            { l: 'Calorias', v: selectedRecipe.calories },
                                            { l: 'Prot', v: selectedRecipe.protein + 'g' },
                                            { l: 'Carb', v: selectedRecipe.carbs + 'g' },
                                            { l: 'Gord', v: selectedRecipe.fats + 'g' },
                                        ].map((m, i) => (
                                            <div key={i} className="bg-slate-800 p-3 rounded-2xl text-center border border-white/5">
                                                <span className="block text-[9px] font-bold uppercase text-slate-500 mb-1">{m.l}</span>
                                                <span className="text-sm font-black text-white">{m.v}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Ingredients */}
                                    <div>
                                        <h4 className="text-sm font-black uppercase italic text-indigo-400 mb-4 flex items-center gap-2">
                                            <Utensils size={14} /> Ingredientes
                                        </h4>
                                        <ul className="space-y-3">
                                            {selectedRecipe.ingredients[lang].map((ing, i) => (
                                                <li key={i} className="text-sm text-slate-300 font-medium flex items-start gap-3">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0"></span>
                                                    {ing}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Instructions */}
                                    <div>
                                        <h4 className="text-sm font-black uppercase italic text-emerald-400 mb-4 flex items-center gap-2">
                                            <Zap size={14} /> Preparo
                                        </h4>
                                        <div className="space-y-4">
                                            {selectedRecipe.instructions[lang].map((step, i) => (
                                                <div key={i} className="flex gap-4">
                                                    <span className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0">
                                                        {i + 1}
                                                    </span>
                                                    <p className="text-sm text-slate-300 leading-relaxed font-medium">{step}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Action Footer */}
                                <div className="p-6 border-t border-white/10 bg-slate-900">
                                    <h4 className="text-xs font-bold text-slate-500 uppercase text-center mb-4">Adicionar ao Diário</h4>
                                    <div className="grid grid-cols-3 gap-2">
                                        {['BREAKFAST', 'LUNCH', 'DINNER', 'SNACK', 'PRE_WORKOUT', 'POST_WORKOUT'].map((type) => (
                                            <button
                                                key={type}
                                                onClick={() => addRecipeToLog(selectedRecipe, type as MealType)}
                                                className="p-3 bg-slate-800 hover:bg-indigo-600 hover:text-white rounded-xl text-[10px] font-bold uppercase text-slate-400 transition-all border border-white/5"
                                            >
                                                {MEAL_SECTIONS.find(s => s.id === type)?.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
