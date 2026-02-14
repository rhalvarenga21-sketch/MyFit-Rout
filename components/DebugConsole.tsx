import React, { useState, useEffect } from 'react';
import { logger } from '../services/debug';
import { X, Trash, Bug, Copy } from 'lucide-react';

export const DebugConsole: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [logs, setLogs] = useState(logger.getLogs());

    useEffect(() => {
        return logger.subscribe(setLogs);
    }, []);

    // Listen for 'ctrl+m' or specific gesture to toggle
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key === 'm') {
                setOpen(prev => !prev);
            }
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, []);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[100] pointer-events-none flex items-end justify-center sm:items-center p-4">
            <div className="bg-black/95 text-green-400 font-mono text-xs w-full max-w-2xl h-[400px] rounded-xl border border-green-900 pointer-events-auto shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom">
                {/* Header */}
                <div className="p-3 border-b border-green-900/50 flex justify-between items-center bg-green-900/10">
                    <div className="flex items-center gap-2">
                        <Bug size={14} />
                        <span className="font-bold">SYSTEM DIAGNOSTICS</span>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={() => {
                            navigator.clipboard.writeText(JSON.stringify(logs, null, 2));
                            alert('Logs copied to clipboard');
                        }} className="p-1 hover:text-white" title={t.videoPlayer.copyLogs}"><Copy size={14} /></button>
                        <button onClick={() => logger.clear()} className="p-1 hover:text-white" title="Clear"><Trash size={14} /></button>
                        <button onClick={() => setOpen(false)} className="p-1 hover:text-white"><X size={14} /></button>
                    </div>
                </div>

                {/* Console Body */}
                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                    {logs.length === 0 && <p className="opacity-50 italic">System normal. No active logs.</p>}
                    {logs.map((log) => (
                        <div key={log.id} className="border-b border-green-900/30 pb-1 mb-1 last:border-0 hover:bg-white/5 p-1 rounded">
                            <div className="flex gap-2 opacity-70 mb-0.5">
                                <span>[{log.timestamp}]</span>
                                <span className={`font-bold ${log.level === 'ERROR' ? 'text-red-500' :
                                        log.level === 'WARN' ? 'text-yellow-500' :
                                            log.level === 'SUCCESS' ? 'text-blue-400' : 'text-green-300'
                                    }`}>{log.level}</span>
                            </div>
                            <div>{log.message}</div>
                            {log.details && (
                                <pre className="mt-1 text-[10px] opacity-60 bg-black/50 p-2 rounded overflow-x-auto">
                                    {log.details}
                                </pre>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
