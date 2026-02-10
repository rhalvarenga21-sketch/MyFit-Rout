import React from 'react';
import { Cloud, CheckCircle, WifiOff, RefreshCw } from 'lucide-react';

interface SyncStatusProps {
    isSyncing: boolean;
    pendingCount: number;
}

export const SyncStatus: React.FC<SyncStatusProps> = ({ isSyncing, pendingCount }) => {
    if (isSyncing) {
        return (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-500/10 rounded-full border border-indigo-500/20 animate-pulse">
                <RefreshCw size={14} className="text-indigo-400 animate-spin" />
                <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider">Syncing...</span>
            </div>
        );
    }

    if (pendingCount > 0) {
        return (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 rounded-full border border-amber-500/20" title={`${pendingCount} treinos salvos offline`}>
                <WifiOff size={14} className="text-amber-400" />
                <span className="text-[10px] font-bold text-amber-500 uppercase tracking-wider">Offline ({pendingCount})</span>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 rounded-full border border-emerald-500/20">
            <Cloud size={14} className="text-emerald-400" />
            <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">Saved</span>
        </div>
    );
};
