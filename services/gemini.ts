
import { GoogleGenAI } from "@google/genai";
import { Language, UserProfile } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAIFeedback = async (
  query: string, 
  profile: UserProfile, 
  language: Language
) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: query,
      config: {
        systemInstruction: `You are the "MyFitRoute Vital Coach", a high-performance specialist in longevity and biomechanics.
        User Profile Context:
        Name: ${profile.name}, Age: ${profile.age}, Weight: ${profile.weight}kg, Gender: ${profile.gender}, Goal: ${profile.goal}.
        Key Metrics: Sugested water ${Math.round(profile.weight * 35)}ml, Maintenance kcal approx ${Math.round(profile.weight * 33)}kcal.
        
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
