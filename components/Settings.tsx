import React from 'react';
import { Moon, Sun, Globe, Bell, Shield, ChevronLeft, LogOut, Download } from 'lucide-react';
import { Language } from '../types';

interface SettingsProps {
    lang: Language;
    setLang: (l: Language) => void;
    theme: 'dark' | 'light';
    setTheme: (t: 'dark' | 'light') => void;
    onBack: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ lang, setLang, theme, setTheme, onBack }) => {
    return (
        <div className="space-y-6 animate-in slide-in-from-right-6 pb-24">
            <div className="flex items-center gap-4">
                <button onClick={onBack} className="p-3 bg-slate-800 rounded-2xl border border-slate-700 text-slate-400">
                    <ChevronLeft size={20} />
                </button>
                <h2 className="text-3xl font-black italic uppercase tracking-tighter">Configurações</h2>
            </div>

            <div className="space-y-6">
                {/* Appearance Section */}
                <section>
                    <h3 className="text-xs font-black uppercase opacity-40 tracking-widest mb-4 ml-2">Aparência</h3>
                    <div className="bg-slate-800 rounded-[35px] border border-slate-700/50 overflow-hidden">
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="w-full p-6 flex items-center justify-between hover:bg-slate-700/50 transition-colors"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-2xl ${theme === 'dark' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-amber-500/20 text-amber-500'}`}>
                                    {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
                                </div>
                                <div className="text-left">
                                    <p className="font-bold text-sm">Tema do App</p>
                                    <p className="text-[10px] opacity-60">
                                        {theme === 'dark' ? 'Modo Escuro (padrão)' : 'Modo Claro (experimental)'}
                                    </p>
                                </div>
                            </div>
                            <div className={`w-12 h-7 rounded-full p-1 transition-colors ${theme === 'dark' ? 'bg-indigo-600' : 'bg-slate-600'}`}>
                                <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${theme === 'dark' ? 'translate-x-5' : 'translate-x-0'}`} />
                            </div>
                        </button>
                    </div>
                </section>

                {/* Language Section */}
                <section>
                    <h3 className="text-xs font-black uppercase opacity-40 tracking-widest mb-4 ml-2">Região e Idioma</h3>
                    <div className="bg-slate-800 rounded-[35px] border border-slate-700/50 overflow-hidden">
                        <div className="p-6 border-b border-slate-700/50 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-2xl">
                                    <Globe size={20} />
                                </div>
                                <div>
                                    <p className="font-bold text-sm">Idioma Principal</p>
                                    <p className="text-[10px] opacity-60">Usado para treinos e interface</p>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 p-4 gap-3">
                            <button
                                onClick={() => setLang('pt')}
                                className={`p-4 rounded-2xl font-black text-xs uppercase border-2 transition-all ${lang === 'pt' ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400' : 'border-slate-700 bg-slate-900 opacity-50'}`}
                            >
                                🇧🇷 Português
                            </button>
                            <button
                                onClick={() => setLang('en')}
                                className={`p-4 rounded-2xl font-black text-xs uppercase border-2 transition-all ${lang === 'en' ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400' : 'border-slate-700 bg-slate-900 opacity-50'}`}
                            >
                                🇺🇸 English
                            </button>
                        </div>
                    </div>
                </section>

                {/* Notifications */}
                <section>
                    <h3 className="text-xs font-black uppercase opacity-40 tracking-widest mb-4 ml-2">Preferências</h3>
                    <div className="bg-slate-800 rounded-[35px] border border-slate-700/50 overflow-hidden">
                        <div className="w-full p-6 flex items-center justify-between hover:bg-slate-700/50 transition-colors border-b border-slate-700/50">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-rose-500/20 text-rose-400 rounded-2xl">
                                    <Bell size={20} />
                                </div>
                                <div className="text-left">
                                    <p className="font-bold text-sm">Notificações</p>
                                    <p className="text-[10px] opacity-60">Lembretes de treino e água</p>
                                </div>
                            </div>
                            <div className="w-12 h-7 bg-indigo-600 rounded-full p-1">
                                <div className="w-5 h-5 bg-white rounded-full shadow-md translate-x-5" />
                            </div>
                        </div>
                        <div className="w-full p-6 flex items-center justify-between hover:bg-slate-700/50 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-blue-500/20 text-blue-400 rounded-2xl">
                                    <Shield size={20} />
                                </div>
                                <div className="text-left">
                                    <p className="font-bold text-sm">Privacidade</p>
                                    <p className="text-[10px] opacity-60">Perfil público no ranking</p>
                                </div>
                            </div>
                            <div className="w-12 h-7 bg-indigo-600 rounded-full p-1">
                                <div className="w-5 h-5 bg-white rounded-full shadow-md translate-x-5" />
                            </div>
                        </div>
                    </div>
                </section>

                <div className="pt-6 text-center">
                    <p className="text-[10px] opacity-30 uppercase font-black">MyFitRout v1.2.0 (Build 2026)</p>
                    <p className="text-[10px] opacity-20 uppercase">Feito com 💜 para atletas</p>
                </div>
            </div>
        </div>
    );
};
