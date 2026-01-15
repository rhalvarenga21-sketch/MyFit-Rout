
import { UserProfile } from "../types";

/**
 * Mock Supabase / API sync service.
 * In a real production app, this would use the @supabase/supabase-js library.
 */
export const syncProfileToCloud = async (profile: UserProfile): Promise<boolean> => {
  console.log("🚀 Syncing to Supabase...", profile);
  
  // Simulate network latency
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  // Save to local as primary storage for this demo environment
  localStorage.setItem('myfitrout_v7_profile', JSON.stringify(profile));
  
  return true;
};

export const fetchProfileFromCloud = async (userId: string): Promise<UserProfile | null> => {
  console.log("☁️ Fetching from Supabase for user:", userId);
  
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const saved = localStorage.getItem('myfitrout_v7_profile');
  if (saved) {
    return JSON.parse(saved);
  }
  return null;
};
