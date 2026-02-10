import React from 'react';
import { Zap, Crown } from 'lucide-react';
import { SubscriptionPlan } from '../types';
import { AIQuota, isPROPlan } from '../services/aiQuota';

interface AIQuotaDisplayProps {
    quota: AIQuota;
    subscription: SubscriptionPlan;
    language: 'PT' | 'EN' | 'ES';
    onUpgrade?: () => void;
}

export const AIQuotaDisplay: React.FC<AIQuotaDisplayProps> = ({
    quota,
    subscription,
    language,
    onUpgrade
}) => {
    // PRO users não veem contador
    if (isPROPlan(subscription)) {
        return (
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-2xl border border-amber-500/30">
                <Crown size={16} className="text-amber-400" />
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    {language === 'PT' ? '✨ Perguntas Ilimitadas' :
                        language === 'ES' ? '✨ Preguntas Ilimitadas' :
                            '✨ Unlimited Questions'}
                </span>
            </div>
        );
    }

    const remaining = quota.limit - quota.used;
    const percentage = (remaining / quota.limit) * 100;

    // Cores baseadas no percentual restante
    const getColor = () => {
        if (percentage > 50) return 'emerald';
        if (percentage > 20) return 'amber';
        return 'rose';
    };

    const color = getColor();

    const texts = {
        PT: {
            remaining: 'restantes',
            upgrade: 'Upgrade para ilimitadas'
        },
        EN: {
            remaining: 'remaining',
            upgrade: 'Upgrade for unlimited'
        },
        ES: {
            remaining: 'restantes',
            upgrade: 'Actualiza para ilimitadas'
        }
    };

    const t = texts[language];

    return (
        <div className="space-y-2">
            {/* Contador */}
            <div className="flex items-center justify-between px-4 py-2 bg-slate-800/50 rounded-2xl border border-slate-700/50">
                <div className="flex items-center gap-2">
                    <Zap size={14} className={`text-${color}-400`} />
                    <span className="text-xs font-bold text-slate-300">
                        {remaining}/{quota.limit} {t.remaining}
                    </span>
                </div>

                {/* Barra de progresso */}
                <div className="w-20 h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div
                        className={`h-full bg-gradient-to-r from-${color}-500 to-${color}-400 transition-all duration-300`}
                        style={{ width: `${percentage}%` }}
                    />
                </div>
            </div>

            {/* Botão de upgrade (se não for PRO) */}
            {remaining <= 2 && onUpgrade && (
                <button
                    onClick={onUpgrade}
                    className="w-full px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl text-xs font-black uppercase tracking-wider hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                >
                    <Crown size={14} />
                    {t.upgrade}
                </button>
            )}
        </div>
    );
};
