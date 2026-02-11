import React from 'react';
import { Moon, Sun, Globe, Bell, Shield, ChevronLeft, LogOut, Download, Zap } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface SettingsProps {
    lang: Language;
    setLang: (l: Language) => void;
    theme: 'dark' | 'light';
    setTheme: (t: 'dark' | 'light') => void;
    onBack: () => void;
    onApiTester?: () => void;
    userRole?: string;
}

export const Settings: React.FC<SettingsProps> = ({ lang, setLang, theme, setTheme, onBack, onApiTester, userRole }) => {
    const t = translations[lang] as any;

    return (
        <div className="space-y-6 animate-in slide-in-from-right-6 pb-24">
            <div className="flex items-center gap-4">
                <button onClick={onBack} className="p-3 bg-slate-800 rounded-2xl border border-slate-700 text-slate-400">
                    <ChevronLeft size={20} />
                </button>
                <h2 className="text-3xl font-black italic uppercase tracking-tighter">{t.settings.title}</h2>
            </div>

            <div className="space-y-6">
                {/* Preferences only */}
                <section>
                    <h3 className="text-xs font-black uppercase opacity-40 tracking-widest mb-4 ml-2">{t.settings.preferences}</h3>
                    <div className="bg-slate-800 rounded-[35px] border border-slate-700/50 overflow-hidden">
                        <div className="w-full p-6 flex items-center justify-between hover:bg-slate-700/50 transition-colors border-b border-slate-700/50 opacity-80 cursor-not-allowed">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-rose-500/20 text-rose-400 rounded-2xl">
                                    <Bell size={20} />
                                </div>
                                <div className="text-left">
                                    <p className="font-bold text-sm">{t.settings.notifications}</p>
                                    <p className="text-[10px] opacity-60">{t.settings.notificationsDesc}</p>
                                </div>
                            </div>
                            <div className="w-12 h-7 bg-indigo-600 rounded-full p-1 opacity-50">
                                <div className="w-5 h-5 bg-white rounded-full shadow-md translate-x-5" />
                            </div>
                        </div>
                        <div className="w-full p-6 flex items-center justify-between hover:bg-slate-700/50 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-blue-500/20 text-blue-400 rounded-2xl">
                                    <Shield size={20} />
                                </div>
                                <div className="text-left">
                                    <p className="font-bold text-sm">{t.settings.privacy}</p>
                                    <p className="text-[10px] opacity-60">{t.settings.privacyDesc}</p>
                                </div>
                            </div>
                            <button className="w-12 h-7 bg-emerald-500 rounded-full p-1 transition-colors">
                                <div className="w-5 h-5 bg-white rounded-full shadow-md translate-x-5" />
                            </button>
                        </div>
                        {onApiTester && userRole === 'ADMIN' && (
                            <div
                                onClick={onApiTester}
                                className="w-full p-6 flex items-center justify-between hover:bg-slate-700/50 transition-colors cursor-pointer border-t border-slate-700/50"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 text-indigo-400 rounded-2xl">
                                        <Zap size={20} />
                                    </div>
                                    <div className="text-left">
                                        <p className="font-bold text-sm">API Tester</p>
                                        <p className="text-[10px] opacity-60">Test Gemini API connection</p>
                                    </div>
                                </div>
                                <div className="text-indigo-400 text-xs font-bold uppercase">Test →</div>
                            </div>
                        )}
                    </div>
                </section>

                <div className="pt-6 text-center">
                    <p className="text-[10px] opacity-30 uppercase font-black">{t.settings.version}</p>
                    <p className="text-[10px] opacity-20 uppercase">{t.settings.madeWith}</p>
                </div>
            </div>
        </div>
    );
};
