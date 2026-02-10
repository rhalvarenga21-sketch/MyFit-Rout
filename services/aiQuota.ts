import { UserProfile, SubscriptionPlan } from '../types';

// ============================================
// AI QUOTA SYSTEM
// ============================================

export interface AIQuota {
    used: number;
    limit: number;
    resetAt: string; // ISO date string
}

// Bypasses permanentes para teste e desenvolvimento
const ADMIN_IDS = [
    'rafael',
    'admin',
    'dev',
    'tester',
    'rafa',
    'developer',
    'rhalvarenga21@gmail.com', // E-mail comum do dev
];

const ADMIN_NAMES = [
    'rafa', 'rafael', 'developer', 'admin', 'coach dev'
];

/**
 * Verifica se é um usuário com privilégios de desenvolvedor
 */
const isDevBypass = (profile: { id: string, name: string }): boolean => {
    const id = (profile.id || '').toLowerCase();
    const name = (profile.name || '').toLowerCase();

    return ADMIN_IDS.includes(id) ||
        ADMIN_NAMES.some(n => name.includes(n)) ||
        name.includes('rafa') ||
        id.length < 5;
};

// Limites por plano
const QUOTA_LIMITS = {
    [SubscriptionPlan.NONE]: 50,           // Aumentado para 50 para o USER testar à vontade
    [SubscriptionPlan.ESSENTIAL]: 100,
    [SubscriptionPlan.ESSENTIAL_ANNUAL]: 100,
    [SubscriptionPlan.PRO_MONTHLY]: 9999,
    [SubscriptionPlan.PRO_ANNUAL]: 9999,
    [SubscriptionPlan.TEST_PRO]: 9999
};

/**
 * Verifica se o usuário é ADMIN ou tem plano PRO
 */
export const isPROPlan = (subscription: SubscriptionPlan, profile?: { id: string, name: string }): boolean => {
    if (profile && isDevBypass(profile)) return true;

    return subscription === SubscriptionPlan.PRO_MONTHLY ||
        subscription === SubscriptionPlan.PRO_ANNUAL ||
        subscription === SubscriptionPlan.TEST_PRO;
};

/**
 * Obtém a quota de IA do usuário para hoje
 */
export const getAIQuota = (userId: string, subscription: SubscriptionPlan, userName: string = ''): AIQuota => {
    const today = new Date().toISOString().split('T')[0];
    const storageKey = `ai_quota_${userId}_${today}`;

    // Se for BYPASS, limite é virtualmente infinito
    if (isDevBypass({ id: userId, name: userName })) {
        return { used: 0, limit: 9999, resetAt: today };
    }

    const saved = localStorage.getItem(storageKey);
    const limit = QUOTA_LIMITS[subscription] || QUOTA_LIMITS[SubscriptionPlan.NONE];

    if (saved) {
        const quota = JSON.parse(saved);
        if (quota.resetAt !== today) {
            return { used: 0, limit, resetAt: today };
        }
        return { ...quota, limit };
    }

    return { used: 0, limit, resetAt: today };
};

/**
 * Incrementa o uso de IA do usuário
 */
export const incrementAIUsage = (userId: string): void => {
    const today = new Date().toISOString().split('T')[0];
    const storageKey = `ai_quota_${userId}_${today}`;

    const saved = localStorage.getItem(storageKey);
    if (saved) {
        const quota = JSON.parse(saved);
        quota.used += 1;
        localStorage.setItem(storageKey, JSON.stringify(quota));
    } else {
        localStorage.setItem(storageKey, JSON.stringify({ used: 1, resetAt: today }));
    }
};

/**
 * Verifica se o usuário pode usar IA real
 */
export const canUseRealAI = (userId: string, subscription: SubscriptionPlan, userName: string = ''): boolean => {
    if (isDevBypass({ id: userId, name: userName })) return true;

    const quota = getAIQuota(userId, subscription, userName);
    return quota.used < quota.limit;
};

// ... Classify query e shouldUseRealAI permanecem focados no bypass ...

export const classifyQuery = (query: string): 'SIMPLE' | 'COMPLEX' => {
    const queryLower = query.toLowerCase();

    const simpleKeywords = [
        'treino de peito', 'chest workout', 'entrenamiento de pecho',
        'treino de costas', 'back workout', 'entrenamiento de espalda',
        'treino de pernas', 'leg workout', 'entrenamiento de piernas'
    ];

    const hasSimpleKeyword = simpleKeywords.some(keyword => queryLower.includes(keyword));
    const wordCount = query.trim().split(/\s+/).length;

    // Simplificado para permitir mais IA real
    if (hasSimpleKeyword && wordCount < 4) {
        return 'SIMPLE';
    }

    return 'COMPLEX';
};

export const shouldUseRealAI = (
    query: string,
    userId: string,
    subscription: SubscriptionPlan,
    userName: string = ''
): { useRealAI: boolean; reason: string } => {
    // BYPASS sempre usa IA real
    if (isDevBypass({ id: userId, name: userName })) {
        return { useRealAI: true, reason: 'DEV_BYPASS_FORCE_REAL' };
    }

    // Se tem quota, prioriza SEMPRE a IA Real para uma experiência premium
    const hasQuota = canUseRealAI(userId, subscription, userName);

    if (hasQuota) {
        return { useRealAI: true, reason: 'QUOTA_AVAILABLE' };
    }

    // Fallback apenas se a quota exceder
    return { useRealAI: false, reason: 'QUOTA_EXCEEDED' };
};
