
import { GoogleGenAI } from "@google/genai";
import { Language, UserProfile, PresetWorkout } from "../types";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

// ============================================
// GENERAL AI COACH
// ============================================

export const getAIFeedback = async (
  query: string,
  profile: UserProfile,
  language: Language
) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-exp',
      contents: query,
      config: {
        systemInstruction: `You are the "MyFitRout Vital Coach", a high-performance specialist in longevity and biomechanics.
        User Profile Context:
        Name: ${profile.name}, Age: ${profile.age}, Weight: ${profile.weight}kg, Gender: ${profile.gender}, Goal: ${profile.goal}.
        Key Metrics: Suggested water ${Math.round(profile.weight * 35)}ml, Maintenance kcal approx ${Math.round(profile.weight * 33)}kcal.
        
        Focus on:
        1. "Quality First": Prioritize technique over load.
        2. "Longevity": Suggest movements that protect joints.
        3. "Scientific basis": Explain the 'why' briefly.
        
        Tone: Professional, calm, encouraging. Avoid excessive hype.
        Language: Respond strictly in ${language === Language.PT ? 'Portuguese' : language === Language.ES ? 'Spanish' : 'English'}.`,
      },
    });
    return response.text || "I'm sorry, I couldn't process your request right now.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Connection error with Vital Coach.";
  }
};

// ============================================
// WORKOUT SUGGESTIONS
// ============================================

export const getWorkoutSuggestion = async (
  profile: UserProfile,
  workoutHistory: any[],
  language: Language
): Promise<string> => {
  try {
    const recentWorkouts = workoutHistory.slice(0, 3).map(w => w.workout_name).join(', ');
    const daysSinceLastWorkout = workoutHistory.length > 0
      ? Math.floor((Date.now() - new Date(workoutHistory[0].completed_at).getTime()) / (1000 * 60 * 60 * 24))
      : 7;

    const prompt = `Based on this user profile:
- Goal: ${profile.goal}
- Experience: ${profile.level}
- Last workouts: ${recentWorkouts || 'None recently'}
- Days since last workout: ${daysSinceLastWorkout}
- Training days per week: ${profile.trainingDays.length}

Suggest the BEST workout focus for today (e.g., "Upper Body Strength", "Full Body Recovery", "Lower Body Power").
Keep it to 2-3 sentences max. Be specific and actionable.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-exp',
      contents: prompt,
      config: {
        systemInstruction: `You are a fitness AI coach. Respond in ${language === Language.PT ? 'Portuguese' : language === Language.ES ? 'Spanish' : 'English'}.`,
      },
    });

    return response.text || "Continue com seu plano atual de treino.";
  } catch (error) {
    console.error("AI Suggestion Error:", error);
    return "Mantenha a consistência no seu treino.";
  }
};

// ============================================
// FORM TIPS & SAFETY
// ============================================

export const getExerciseFormTips = async (
  exerciseName: string,
  userLevel: string,
  language: Language
): Promise<string> => {
  try {
    const prompt = `Give 2-3 CRITICAL form tips for "${exerciseName}" for a ${userLevel} level athlete.
Focus on: 1) Most common mistakes, 2) Safety, 3) Efficiency.
Keep it ultra-concise (max 3 bullet points).`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-exp',
      contents: prompt,
      config: {
        systemInstruction: `You are a biomechanics expert. Respond in ${language === Language.PT ? 'Portuguese' : language === Language.ES ? 'Spanish' : 'English'}.`,
      },
    });

    return response.text || "Mantenha a postura correta e controle o movimento.";
  } catch (error) {
    console.error("Form Tips Error:", error);
    return "Foque na técnica antes do peso.";
  }
};

// ============================================
// RECOVERY ADVICE
// ============================================

export const getRecoveryAdvice = async (
  profile: UserProfile,
  workoutIntensity: 'light' | 'moderate' | 'intense',
  language: Language
): Promise<string> => {
  try {
    const prompt = `User just completed a ${workoutIntensity} intensity workout.
Age: ${profile.age}, Goal: ${profile.goal}.
Give personalized recovery advice (sleep, nutrition, stretching, rest days).
Keep it to 3-4 actionable tips.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-exp',
      contents: prompt,
      config: {
        systemInstruction: `You are a recovery and longevity specialist. Respond in ${language === Language.PT ? 'Portuguese' : language === Language.ES ? 'Spanish' : 'English'}.`,
      },
    });

    return response.text || "Descanse bem e hidrate-se adequadamente.";
  } catch (error) {
    console.error("Recovery Advice Error:", error);
    return "Priorize sono e recuperação muscular.";
  }
};

// ============================================
// NUTRITION SUGGESTIONS
// ============================================

export const getNutritionAdvice = async (
  profile: UserProfile,
  goalContext: 'pre-workout' | 'post-workout' | 'daily',
  language: Language
): Promise<string> => {
  try {
    const calorieTarget = Math.round(profile.weight * 33);
    const proteinTarget = Math.round(profile.weight * 2);

    const prompt = `User profile: ${profile.goal} goal, ${profile.weight}kg.
Daily targets: ${calorieTarget}kcal, ${proteinTarget}g protein.
Context: ${goalContext}

Provide 3 quick nutrition tips or meal ideas for this context.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-exp',
      contents: prompt,
      config: {
        systemInstruction: `You are a sports nutritionist. Respond in ${language === Language.PT ? 'Portuguese' : language === Language.ES ? 'Spanish' : 'English'}.`,
      },
    });

    return response.text || "Mantenha uma dieta balanceada.";
  } catch (error) {
    console.error("Nutrition Advice Error:", error);
    return "Priorize proteínas e vegetais.";
  }
};

// ============================================
// PROGRESS ANALYSIS
// ============================================

export const analyzeProgress = async (
  profile: UserProfile,
  stats: {
    totalWorkouts: number;
    currentStreak: number;
    totalWeightLifted: number;
  },
  language: Language
): Promise<string> => {
  try {
    const prompt = `Analyze this user's fitness progress:
- Total workouts: ${stats.totalWorkouts}
- Current streak: ${stats.currentStreak} days
- Total weight lifted: ${stats.totalWeightLifted}kg
- Goal: ${profile.goal}

Provide encouraging insights and 1-2 actionable next steps to improve.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-exp',
      contents: prompt,
      config: {
        systemInstruction: `You are a motivational fitness analyst. Respond in ${language === Language.PT ? 'Portuguese' : language === Language.ES ? 'Spanish' : 'English'}.`,
      },
    });

    return response.text || "Continue progredindo! Sua consistência é impressionante.";
  } catch (error) {
    console.error("Progress Analysis Error:", error);
    return "Você está no caminho certo!";
  }
};
