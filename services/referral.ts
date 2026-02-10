// MyFitRout - Referral System
// Quick Win #3: Viral Mechanics
// Squad: Growth

import { supabase } from './supabaseClient';

export interface ReferralCode {
    user_id: string;
    code: string;
    uses: number;
    rewards_earned: number;
}

/**
 * Gerar código de referral único
 */
export const generateReferralCode = (userId: string): string => {
    const hash = userId.substring(0, 8).toUpperCase();
    return `FIT${hash}`;
};

/**
 * Obter ou criar código de referral
 */
export const getReferralCode = async (userId: string): Promise<string> => {
    try {
        const { data: profile } = await supabase
            .from('profiles')
            .select('referral_code')
            .eq('id', userId)
            .single();

        if (profile?.referral_code) {
            return profile.referral_code;
        }

        // Criar novo código
        const code = generateReferralCode(userId);

        await supabase
            .from('profiles')
            .update({ referral_code: code })
            .eq('id', userId);

        return code;
    } catch (error) {
        console.error('Error getting referral code:', error);
        return '';
    }
};

/**
 * Aplicar código de referral (novo usuário)
 */
export const applyReferralCode = async (newUserId: string, code: string): Promise<boolean> => {
    try {
        // Buscar dono do código
        const { data: referrer } = await supabase
            .from('profiles')
            .select('id, referral_uses')
            .eq('referral_code', code)
            .single();

        if (!referrer) return false;

        // Incrementar usos
        const newUses = (referrer.referral_uses || 0) + 1;

        await supabase
            .from('profiles')
            .update({
                referral_uses: newUses,
                referred_by: referrer.id
            })
            .eq('id', newUserId);

        // Dar recompensa ao referrer (a cada 3 referrals = 1 mês PRO)
        if (newUses % 3 === 0) {
            await giveReferralReward(referrer.id, 'pro_month');
        }

        return true;
    } catch (error) {
        console.error('Error applying referral code:', error);
        return false;
    }
};

/**
 * Dar recompensa de referral
 */
const giveReferralReward = async (userId: string, rewardType: string) => {
    // Implementar lógica de recompensa
    // Por exemplo: adicionar 30 dias ao plano PRO
    console.log(`Reward ${rewardType} given to ${userId}`);
};

/**
 * Compartilhar conquista (ganha consultas IA)
 */
export const shareAchievement = async (userId: string, achievementId: string): Promise<number> => {
    try {
        // Dar 10 consultas IA extras
        const bonus = 10;

        await supabase
            .from('ai_usage')
            .update({
                query_count: supabase.rpc('increment', { x: -bonus })
            })
            .eq('user_id', userId);

        return bonus;
    } catch (error) {
        console.error('Error sharing achievement:', error);
        return 0;
    }
};

/**
 * Obter estatísticas de referral
 */
export const getReferralStats = async (userId: string) => {
    try {
        const { data: profile } = await supabase
            .from('profiles')
            .select('referral_code, referral_uses')
            .eq('id', userId)
            .single();

        const uses = profile?.referral_uses || 0;
        const nextReward = 3 - (uses % 3);

        return {
            code: profile?.referral_code || '',
            uses,
            nextReward,
            totalRewards: Math.floor(uses / 3)
        };
    } catch (error) {
        console.error('Error getting referral stats:', error);
        return null;
    }
};
