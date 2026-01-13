
import { GoogleGenAI, Type } from "@google/genai";
import { ExperienceLevel, Language, UserProfile } from "../types";

// Initialize GoogleGenAI correctly using the named parameter and process.env.API_KEY directly.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAIFeedback = async (
  query: string, 
  profile: UserProfile, 
  language: Language
) => {
  try {
    // Use ai.models.generateContent to query the model directly as per the latest guidelines.
    // Selecting gemini-3-pro-preview for complex reasoning tasks like personalized coaching.
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: query,
      config: {
        systemInstruction: `You are the "MyFitRoute Coach", an elite virtual personal trainer. 
        Your mission is to help gym members achieve long-term health, joint safety, and perfect movement execution.
        User Details: Name: ${profile.name}, Goal: ${profile.goal}, Level: ${profile.level}, Focus: ${profile.focus}, Membership: ${profile.membership}.
        If they are a HYBRID member, encourage them to sync with their gym's on-site trainers for physical form checks.
        Tone: Professional, supportive, scientific, and health-focused.
        Structure responses into: "Movement Insight", "Pro-Tip for Execution", and "Longevity Strategy".
        Respond in ${language}.`,
      },
    });
    // The .text property (not a method) extracts the generated text.
    return response.text || "Desculpe, não consegui processar seu pedido agora.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Erro ao conectar com o MyFitRoute Coach.";
  }
};
