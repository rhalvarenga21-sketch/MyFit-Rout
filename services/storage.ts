
import { UserProfile, MealLog, FoodItem } from '../types';

const KEYS = {
    PROFILE: 'user_profile_local',
    LOGS: (date: string) => `nutrition_logs_${date}`,
    WATER: (date: string) => `nutrition_water_${date}`,
    CUSTOM_FOODS: 'mfr_custom_foods',
    WORKOUT_HISTORY: 'mfr_workout_history'
};

export const StorageService = {
    // Profile
    getProfile: (): UserProfile | null => {
        try {
            const data = localStorage.getItem(KEYS.PROFILE);
            return data ? JSON.parse(data) : null;
        } catch { return null; }
    },
    saveProfile: (profile: UserProfile) => {
        localStorage.setItem(KEYS.PROFILE, JSON.stringify(profile));
    },

    // Nutrition
    getLogs: (date: string): MealLog[] => {
        try {
            const data = localStorage.getItem(KEYS.LOGS(date));
            return data ? JSON.parse(data) : [];
        } catch { return []; }
    },
    saveLogs: (date: string, logs: MealLog[]) => {
        localStorage.setItem(KEYS.LOGS(date), JSON.stringify(logs));
    },
    getWater: (date: string): number => {
        const data = localStorage.getItem(KEYS.WATER(date));
        return data ? parseInt(data, 10) : 0;
    },
    saveWater: (date: string, amount: number) => {
        localStorage.setItem(KEYS.WATER(date), amount.toString());
    },

    // Custom Foods
    getCustomFoods: (): FoodItem[] => {
        try {
            const data = localStorage.getItem(KEYS.CUSTOM_FOODS);
            return data ? JSON.parse(data) : [];
        } catch { return []; }
    },
    addCustomFood: (food: FoodItem) => {
        const current = StorageService.getCustomFoods();
        localStorage.setItem(KEYS.CUSTOM_FOODS, JSON.stringify([...current, food]));
    }
};
