
import React, { useRef, useState } from 'react';
import { Share2, X, Dumbbell, Flame, Activity, Instagram, Download, Copy, CheckCircle2, Star, Calendar, Facebook } from 'lucide-react';
import { UserProfile, Language } from '../types';
import { translations } from '../translations';

interface SocialShareModalProps {
    profile: UserProfile;
    lang: Language;
    onClose: () => void;
}

type SharePeriod = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';
type CardTheme = 'NEON' | 'MINIMAL' | 'DARK' | 'GOLD';

export const SocialShareModal: React.FC<SocialShareModalProps> = ({ profile, lang, onClose }) => {
    const t = translations[lang] as any;
    const cardRef = useRef<HTMLDivElement>(null);
    const [period, setPeriod] = useState<SharePeriod>('WEEKLY');
    const [theme, setTheme] = useState<CardTheme>('NEON');
    const [copied, setCopied] = useState(false);

    // Dicionário local de traduções para o card
    const dict = {
        [Language.PT]: {
            header: "Partilhar Conquista",
            daily: "Diário",
            weekly: "Semanal",
            monthly: "Mensal",
            yearly: "Anual",
            report: "Relatório",
            workouts: "Treinos",
            days: "Dias",
            join: "Baixe o MyFitRout",
            copy: "Copiar Texto",
            download: "Baixar Cartão",
            quote: "A maior vitória é a consistência diária.",
            instruction: "Personalize seu tema e período acima. Tire um print ou baixe para postar!"
        },
        [Language.EN]: {
            header: "Share Glory",
            daily: "Daily",
            weekly: "Weekly",
            monthly: "Monthly",
            yearly: "Yearly",
            report: "Report",
            workouts: "Workouts",
            days: "Days",
            join: "Join MyFitRout App",
            copy: "Copy Text",
            download: "Download Card",
            quote: "The greatest victory is daily consistency.",
            instruction: "Personalize your theme and period above. Screenshot or Download to post!"
        },
        [Language.ES]: {
            header: "Compartir Logro",
            daily: "Diario",
            weekly: "Semanal",
            monthly: "Mensual",
            yearly: "Anual",
            report: "Reporte",
            workouts: "Entrenamientos",
            days: "Días",
            join: "Descarga MyFitRout",
            copy: "Copiar Texto",
            download: "Descargar Tarjeta",
            quote: "La mayor victoria es la consistencia diaria.",
            instruction: "Personaliza tu tema y período arriba. ¡Toma un print o descarga para publicar!"
        }
    }[lang];

    const getStatsByPeriod = () => {
        const total = profile.completedDays.length;
        switch (period) {
            case 'DAILY':
                return { label: dict.daily, value: '1', sub: lang === Language.PT ? 'Treino Concluído' : 'Workout Done' };
            case 'WEEKLY':
                return { label: dict.weekly, value: Math.min(total, 5).toString(), sub: dict.workouts };
            case 'MONTHLY':
                return { label: dict.monthly, value: Math.min(total, 22).toString(), sub: dict.workouts };
            case 'YEARLY':
                return { label: dict.yearly, value: total.toString(), sub: lang === Language.PT ? 'Conquistas' : 'Achievements' };
            default:
                return { label: 'Progress', value: total.toString(), sub: dict.workouts };
        }
    };

    const stats = getStatsByPeriod();

    const handleCopy = () => {
        const text = `🚀 MyFitRout Progress\n👤 ${profile.name}\n🔥 Streak: ${profile.completedDays.length} ${dict.days}\n🏆 Level: ${profile.level}\n\n${dict.quote}\n\nJoin me on MyFitRout!`;
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleShareNative = async () => {
        const shareData = {
            title: 'MyFitRout Progress',
            text: `Crushing my goals on MyFitRout! Streak: ${profile.completedDays.length} ${dict.days}.`,
            url: 'https://myfitrout-app.vercel.app'
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.log('Error sharing:', err);
            }
        } else {
            handleCopy();
            alert(lang === Language.PT ? "Copiado! Agora você pode colar no seu Instagram ou TikTok." : "Text copied! Now you can paste it on Instagram or TikTok.");
        }
    };

    const handleFacebookShare = () => {
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://myfitrout-app.vercel.app')}`;
        window.open(url, '_blank');
    };

    const themes = {
        NEON: "from-indigo-600 via-purple-600 to-pink-500",
        MINIMAL: "from-slate-100 to-white",
        DARK: "from-slate-800 to-black",
        GOLD: "from-amber-400 via-orange-500 to-yellow-600"
    };

    return (
        <div className="fixed inset-0 z-[60] bg-slate-900/98 backdrop-blur-2xl flex items-center justify-center p-4 animate-in fade-in duration-300 overflow-y-auto">
            <div className="w-full max-w-md my-auto space-y-6 pb-12">
                {/* Header Control */}
                <div className="flex justify-between items-center px-4">
                    <div className="flex items-center gap-2">
                        <div className="bg-indigo-500/20 p-2 rounded-xl">
                            <Share2 size={20} className="text-indigo-400" />
                        </div>
                        <h2 className="text-xl font-black uppercase italic tracking-tighter text-white">{dict.header}</h2>
                    </div>
                    <button onClick={onClose} className="p-2 bg-white/5 rounded-full hover:bg-white/10 text-white transition-all">
                        <X size={24} />
                    </button>
                </div>

                {/* Period Selector */}
                <div className="flex p-1 bg-slate-800/50 rounded-2xl border border-slate-700/50 mx-4">
                    {(['DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY'] as SharePeriod[]).map((p) => (
                        <button
                            key={p}
                            onClick={() => setPeriod(p)}
                            className={`flex-1 py-3 px-1 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${period === p ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'
                                }`}
                        >
                            {dict[p.toLowerCase() as keyof typeof dict]}
                        </button>
                    ))}
                </div>

                {/* The card to share */}
                <div className="relative group px-4">
                    <div
                        ref={cardRef}
                        className={`aspect-[4/5] rounded-[40px] p-1 bg-gradient-to-br ${themes[theme]} shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] transition-all duration-500 relative overflow-hidden`}
                    >
                        <div className={`h-full w-full rounded-[38px] overflow-hidden flex flex-col relative ${theme === 'MINIMAL' ? 'bg-slate-50' : 'bg-slate-900'}`}>

                            {/* Card Header */}
                            <div className={`p-6 flex items-center justify-between ${theme === 'MINIMAL' ? 'text-slate-900' : 'text-white'}`}>
                                <div className="flex items-center gap-2">
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shadow-lg ${theme === 'MINIMAL' ? 'bg-indigo-600' : 'bg-gradient-to-tr from-indigo-500 to-purple-500'}`}>
                                        <Activity size={18} className="text-white" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-tighter leading-none mb-0.5">MyFitRout</p>
                                        <p className={`text-[8px] font-medium opacity-50 uppercase tracking-[0.2em]`}>{stats.label} {dict.report}</p>
                                    </div>
                                </div>
                                <div className="opacity-40"><Calendar size={18} /></div>
                            </div>

                            {/* Center Content */}
                            <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-6">
                                <div className="relative">
                                    <div className={`w-48 h-48 rounded-full flex items-center justify-center relative z-10 ${theme === 'NEON' ? 'bg-indigo-500/10 border-4 border-indigo-400' :
                                            theme === 'GOLD' ? 'bg-amber-500/10 border-4 border-amber-400' :
                                                theme === 'DARK' ? 'bg-white/5 border-4 border-white/20' :
                                                    'bg-indigo-600/5 border-4 border-indigo-600'
                                        }`}>
                                        <div className="text-center">
                                            <p className={`text-6xl font-black italic tracking-tighter ${theme === 'MINIMAL' ? 'text-indigo-600' : 'text-white'}`}>
                                                {stats.value}
                                            </p>
                                            <p className={`text-[10px] font-black uppercase tracking-widest opacity-60 ${theme === 'MINIMAL' ? 'text-slate-600' : 'text-indigo-300'}`}>
                                                {stats.sub}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 border border-white/5 rounded-full scale-110 animate-pulse"></div>
                                    <div className="absolute inset-0 border border-white/5 rounded-full scale-125 animate-pulse delay-75"></div>
                                </div>

                                <div className="text-center space-y-2">
                                    <h3 className={`text-3xl font-black italic uppercase tracking-tighter ${theme === 'MINIMAL' ? 'text-slate-900' : 'text-white'}`}>
                                        {profile.name}
                                    </h3>
                                    <div className="flex gap-2 justify-center">
                                        <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full flex items-center gap-1.5">
                                            <Flame size={12} className="text-orange-500" />
                                            <span className={`text-[9px] font-black uppercase ${theme === 'MINIMAL' ? 'text-slate-600' : 'text-white'}`}>{profile.completedDays.length} {dict.days.toUpperCase()}</span>
                                        </div>
                                        <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full flex items-center gap-1.5">
                                            <Star size={12} className="text-yellow-500" />
                                            <span className={`text-[9px] font-black uppercase ${theme === 'MINIMAL' ? 'text-slate-600' : 'text-white'}`}>{profile.level}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Card Footer */}
                            <div className={`p-8 bg-gradient-to-t ${theme === 'MINIMAL' ? 'from-indigo-50 to-transparent' : 'from-indigo-950/30 to-transparent'} text-center`}>
                                <p className={`text-[10px] font-extrabold italic mb-4 ${theme === 'MINIMAL' ? 'text-slate-500' : 'text-slate-400'}`}>
                                    "{dict.quote}"
                                </p>
                                <div className={`inline-block px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-[0.3em] ${theme === 'MINIMAL' ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-950 shadow-xl shadow-white/5'
                                    }`}>
                                    {dict.join}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Theme Selector */}
                    <div className="absolute -right-2 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-20">
                        {(['NEON', 'GOLD', 'DARK', 'MINIMAL'] as CardTheme[]).map((t) => (
                            <button
                                key={t}
                                onClick={() => setTheme(t)}
                                className={`w-10 h-10 rounded-full border-2 transition-all p-1 ${theme === t ? 'border-white scale-110 shadow-lg' : 'border-white/20'}`}
                            >
                                <div className={`w-full h-full rounded-full bg-gradient-to-br ${themes[t]}`}></div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Social Share Actions */}
                <div className="grid grid-cols-2 gap-4 px-4">
                    <button
                        onClick={handleCopy}
                        className={`flex items-center justify-center gap-3 py-5 rounded-[2rem] font-black uppercase text-xs tracking-widest transition-all active:scale-95 ${copied ? 'bg-green-500 text-white' : 'bg-slate-800 text-white border border-slate-700'
                            }`}
                    >
                        {copied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                        {dict.copy}
                    </button>
                    <button
                        onClick={handleShareNative}
                        className="flex items-center justify-center gap-3 py-5 rounded-[2rem] bg-gradient-to-br from-purple-600 to-pink-500 text-white font-black uppercase text-xs tracking-widest border border-white/10 shadow-xl shadow-pink-500/20 active:scale-95 transition-all"
                    >
                        <Instagram size={18} />
                        IG / TikTok
                    </button>
                </div>

                <div className="px-4 flex gap-3">
                    <button
                        onClick={handleFacebookShare}
                        className="flex-1 flex items-center justify-center gap-3 py-5 rounded-[2rem] bg-[#1877F2] text-white font-black uppercase text-xs tracking-widest active:scale-95 transition-all"
                    >
                        <Facebook size={18} />
                        Facebook
                    </button>
                    <button
                        onClick={() => alert(lang === Language.PT ? "Tire um print (Volume + Botão Lateral) para salvar em alta qualidade!" : "Take a screenshot to save in high quality!")}
                        className="flex-1 flex items-center justify-center gap-3 py-5 rounded-[2rem] bg-white text-indigo-950 font-black uppercase text-xs tracking-widest shadow-xl active:scale-95 transition-all hover:bg-slate-100"
                    >
                        <Download size={20} />
                        {dict.download}
                    </button>
                </div>

                <p className="text-center text-[10px] text-slate-500 uppercase font-black px-8">
                    {dict.instruction}
                </p>
            </div>
        </div>
    );
};
