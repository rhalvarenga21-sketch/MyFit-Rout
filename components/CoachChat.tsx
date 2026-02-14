import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Loader, ChevronLeft, Dumbbell, Plus, ShieldCheck, Zap, Copy, Share2, Trash2, CheckCircle2, Download } from 'lucide-react';
import { Language, UserProfile, FitnessGoal } from '../types';
import { translations } from '../translations';
import { getAIFeedback } from '../services/gemini';
import { shouldUseRealAI, incrementAIUsage, getAIQuota } from '../services/aiQuota';
import { getRealAIResponse } from '../services/realAI';
import { AIQuotaDisplay } from './AIQuotaDisplay';
import { EXERCISE_LIBRARY } from '../data/exercises';
import { loadChatHistory, saveChatMessage, clearChatHistory as clearChatHistoryDB, exportChatHistory } from '../services/chatHistory';
import { getWorkoutContextForAI } from '../services/workoutIntegration';

interface CoachChatProps {
    profile: UserProfile;
    lang: Language;
    onBack: () => void;
    onUpgrade: () => void;
    onAddExercise: (exerciseName: string) => void;
    onShare?: () => void;
}

interface Message {
    id: string;
    type: 'user' | 'ai';
    content: string;
    timestamp: Date;
    suggestedExercises?: string[];
    missingExercises?: string[];
    suggestions?: string[];
    isLimitMessage?: boolean;
    isTruncated?: boolean;
}

export const CoachChat: React.FC<CoachChatProps> = ({
    profile,
    lang,
    onBack,
    onUpgrade,
    onAddExercise,
    onShare
}) => {
    const t = translations[lang] as any;
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadingHistory, setLoadingHistory] = useState(true);
    const [copyId, setCopyId] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const handleCopy = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopyId(id);
        setTimeout(() => setCopyId(null), 2000);
    };

    const handleClearChat = async () => {
        if (confirm(t.coach.clearChat)) {
            const success = await clearChatHistoryDB(profile.id);
            if (success) {
                setMessages([]);
            }
        }
    };

    const handleExportChat = async () => {
        const markdown = await exportChatHistory(profile.id, 'txt');
        const blob = new Blob([markdown], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `myfitrout-chat-${new Date().toISOString().split('T')[0]}.txt`;
        link.click();
        URL.revokeObjectURL(url);
    };

    const quota = getAIQuota(profile.id, profile.subscription, profile.name);
    const isAdmin = profile.name.toLowerCase().includes('rafa') ||
        profile.id.toLowerCase().includes('dev') ||
        profile.id.length < 5;

    // Carregar histórico ao montar
    useEffect(() => {
        const loadHistory = async () => {
            setLoadingHistory(true);
            try {
                const history = await loadChatHistory(profile.id, 50);
                const convertedMessages: Message[] = history.map(h => ({
                    id: h.id,
                    type: h.message_type,
                    content: h.content,
                    timestamp: new Date(h.created_at),
                    suggestions: h.suggestions || [],
                    isTruncated: h.is_truncated || false,
                    isLimitMessage: h.is_limit_message || false
                }));
                setMessages(convertedMessages);
            } catch (error) {
                console.error('Error loading chat history:', error);
            } finally {
                setLoadingHistory(false);
            }
        };
        loadHistory();
    }, [profile.id]);

    // Gerenciamento de Auto-Scroll
    useEffect(() => {
        if (messages.length > 0) {
            // Pequeno delay para garantir que o DOM atualizou
            setTimeout(() => {
                messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
            }, 100);
        }
    }, [messages, loading]);

    const handleSend = async (overrideInput?: string) => {
        const textToSend = overrideInput || input;
        if (!textToSend.trim() || loading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            type: 'user',
            content: textToSend,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        if (!overrideInput) setInput('');
        setLoading(true);

        // Salvar mensagem do usuário no Supabase
        saveChatMessage(profile.id, 'user', textToSend);

        try {
            const decision = shouldUseRealAI(textToSend, profile.id, profile.subscription, profile.name);
            let aiResponse: string;
            let isLimit = false;

            if (decision.useRealAI) {
                incrementAIUsage(profile.id);

                // Obter contexto de treinos
                const workoutContext = await getWorkoutContextForAI(profile.id);

                // Formata o histórico (últimas 5 mensagens) filtrando erros e avisos
                const history = messages
                    .filter(m => !m.content.startsWith('⚠️') && !m.content.startsWith('❌'))
                    .slice(-5)
                    .map(m => ({
                        role: m.type === 'user' ? 'user' as const : 'model' as const,
                        parts: [{ text: m.content }]
                    }));

                // Adicionar contexto de treinos à primeira mensagem se houver
                const enrichedQuery = workoutContext
                    ? `${textToSend}\n\n[CONTEXTO DE TREINOS]:\n${workoutContext}`
                    : textToSend;

                const rawResponse = await getRealAIResponse(enrichedQuery, profile, lang, history);

                if (rawResponse.startsWith('QUOTA_EXCEEDED|') || rawResponse.includes('quota') || rawResponse.includes('429')) {
                    isLimit = true;
                    if (lang === Language.PT) {
                        aiResponse = `⚠️ **Alta demanda no servidor!**\nO motor de Inteligência Real está recebendo muitas requisições agora. Aguarde 30-60 segundos ou mude para o plano **PRO** para ter prioridade máxima.`;
                    } else {
                        aiResponse = `⚠️ **High server demand!**\nThe Real Intelligence engine is busy. Please wait 30-60 seconds or upgrade to **PRO** for maximum priority.`;
                    }
                } else if (rawResponse.startsWith('ERROR|') || rawResponse.startsWith('❌')) {
                    if (lang === Language.PT) {
                        aiResponse = `❌ **Instabilidade Temporária**\nEstamos tendo uma oscilação na conexão com os servidores. Tente repetir sua pergunta em alguns instantes.`;
                    } else {
                        aiResponse = `❌ **Temporary Instability**\nWe are experiencing connection issues with the servers. Please try again in a few moments.`;
                    }
                } else {
                    aiResponse = rawResponse;
                }
            } else {
                isLimit = true;
                if (lang === Language.PT) {
                    aiResponse = `⚠️ **Limite diário atingido!**\nSua jornada hoje foi incrível, mas para continuarmos essa conversa técnica e personalizada, que tal evoluir para o plano **PRO**?`;
                } else if (lang === Language.ES) {
                    aiResponse = `⚠️ **¡Límite diario alcanzado!**\nTu jornada hoy ha sido increíble. Para continuar con esta charla técnica y personalizada, ¿qué tal si te pasas al plan **PRO**?`;
                } else {
                    aiResponse = `⚠️ **Daily limit reached!**\nTo continue our personalized conversation, upgrade to **PRO** plan!`;
                }
            }

            const isTruncated = aiResponse.includes('[TRUNCATED_BY_LIMIT]');
            const { suggestedExercises, missingExercises } = extractExercises(aiResponse);
            const suggestions = extractSuggestions(aiResponse);

            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                type: 'ai',
                content: aiResponse,
                timestamp: new Date(),
                suggestedExercises,
                missingExercises,
                suggestions,
                isLimitMessage: isLimit,
                isTruncated
            };

            setMessages(prev => [...prev, aiMessage]);

            // Salvar resposta da IA no Supabase
            saveChatMessage(
                profile.id,
                'ai',
                aiResponse,
                suggestions,
                isTruncated,
                isLimit
            );

        } catch (error) {
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                type: 'ai',
                content: lang === Language.PT ? '😅 Ops! Tive um problema técnico. Pode repetir?' : lang === Language.ES ? '😅 ¡Ups! Tuve un problema técnico. ¿Puedes repetir?' : '😅 Oops! Tech issues. Can you repeat?',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setLoading(false);
        }
    };

    const extractExercises = (response: string): { suggestedExercises: string[], missingExercises: string[] } => {
        const suggested: string[] = [];
        const missing: string[] = [];
        const exerciseRegex = /\[EXERCISE:(.*?)\]/g;
        let match;
        while ((match = exerciseRegex.exec(response)) !== null) {
            const name = match[1].trim();
            const exercise = EXERCISE_LIBRARY.find(ex =>
                ex.name.PT.toLowerCase() === name.toLowerCase() ||
                ex.name.EN.toLowerCase() === name.toLowerCase() ||
                ex.name.ES.toLowerCase() === name.toLowerCase()
            );
            if (exercise) {
                if (!suggested.includes(exercise.id)) suggested.push(exercise.id);
            } else {
                if (!missing.includes(name)) missing.push(name);
            }
        }
        return { suggestedExercises: suggested, missingExercises: missing };
    };

    const extractSuggestions = (response: string): string[] => {
        const suggestions: string[] = [];
        const suggestionRegex = /\[SUGGESTION:(.*?)\]/g;
        let match;
        while ((match = suggestionRegex.exec(response)) !== null) {
            suggestions.push(match[1].trim());
        }
        return suggestions;
    };

    const cleanAIResponse = (response: string) => {
        return response
            .replace(/\[EXERCISE:(.*?)\]/g, '$1')
            .replace(/\[SUGGESTION:(.*?)\]/g, '')
            .replace(/\[TRUNCATED_BY_LIMIT\]/g, '')
            .trim();
    };

    const renderMessageContent = (content: string) => {
        const cleaned = cleanAIResponse(content);

        // Divide por linhas primeiro para tratar listas
        const lines = cleaned.split('\n');

        return (
            <div className="space-y-1">
                {lines.map((line, idx) => {
                    // Trata Negritos: **texto**
                    const parts = line.split(/(\*\*.*?\*\*)/g);
                    const renderedLine = parts.map((part, pIdx) => {
                        if (part.startsWith('**') && part.endsWith('**')) {
                            return <strong key={pIdx} className="font-extrabold text-white">{part.slice(2, -2)}</strong>;
                        }
                        return part;
                    });

                    // Trata Títulos: ### Texto
                    if (line.trim().startsWith('###')) {
                        return <h3 key={idx} className="text-sm font-black text-indigo-300 uppercase tracking-tighter mt-4 mb-2 flex items-center gap-2">
                            <Zap size={10} className="fill-indigo-300" />
                            {line.replace(/^###\s*/, '')}
                        </h3>;
                    }

                    // Trata Separadores: ---
                    if (line.trim() === '---') {
                        return <div key={idx} className="my-4 border-t border-white/5" />;
                    }

                    // Trata Listas: * ou - no início
                    if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
                        return (
                            <div key={idx} className="flex gap-2 pl-2 my-1">
                                <span className="text-indigo-400 font-bold">•</span>
                                <span className="flex-1 text-slate-200">{renderedLine.map(p => typeof p === 'string' ? p.replace(/^[\*\-]\s/, '') : p)}</span>
                            </div>
                        );
                    }

                    return <p key={idx} className="min-h-[1.2em]">{renderedLine}</p>;
                })}
            </div>
        );
    };

    return (
        <div className="flex flex-col h-screen bg-slate-900 relative selection:bg-indigo-500/30 overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none z-0" />

            {/* Header - Fixed */}
            <header className="flex-none bg-slate-900/40 backdrop-blur-xl border-b border-white/5 px-6 py-4 z-50">
                <div className="flex items-center justify-between max-w-2xl mx-auto w-full">
                    <div className="flex items-center gap-3">
                        <button onClick={onBack} className="p-2 bg-slate-800 rounded-xl text-white active:scale-90 transition-all border border-white/5 shadow-lg">
                            <ChevronLeft size={20} />
                        </button>
                        <div className={messages.length === 0 ? "opacity-0 translate-x-[-10px] transition-all duration-500" : "opacity-100 translate-x-0 transition-all duration-500"}>
                            <div className="flex items-center gap-2">
                                <h2 className="text-lg font-black italic uppercase tracking-tighter text-white leading-none">Coach</h2>
                                {isAdmin && (
                                    <span className="bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 rounded text-[7px] font-black text-amber-500 uppercase tracking-widest">Master Bypass</span>
                                )}
                            </div>
                            <p className="text-[9px] font-black uppercase tracking-widest text-indigo-400 opacity-60">Intelligence</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-full border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                            <Zap size={10} className="text-amber-500 fill-amber-500" />
                            <span className="text-[10px] font-black text-white tracking-widest">
                                {isAdmin ? 'UNLIMITED MASTER' : `${quota.limit - quota.used} ${lang === Language.PT ? 'Restantes' : lang === Language.ES ? 'Restantes' : 'Left'}`}
                            </span>
                        </div>
                        {messages.length > 0 && (
                            <>
                                <button onClick={handleExportChat} className="p-2.5 bg-slate-800 rounded-xl text-slate-500 hover:text-indigo-400 active:scale-90 transition-all border border-white/5" title={t.videoPlayer.exportChat}>
                                    <Download size={18} />
                                </button>
                                <button onClick={handleClearChat} className="p-2.5 bg-slate-800 rounded-xl text-slate-500 hover:text-rose-400 active:scale-90 transition-all border border-white/5">
                                    <Trash2 size={18} />
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </header>

            {/* Scrollable Container */}
            <div
                ref={scrollContainerRef}
                className="flex-1 overflow-y-auto px-4 pt-6 pb-40 scroll-smooth relative z-10 scrollbar-hide"
            >
                <div className="max-w-2xl mx-auto w-full">
                    {/* Hero / Empty State - Part of scroll so it naturally moves up */}
                    <div className={`transition-all duration-700 ease-in-out ${messages.length === 0 ? 'min-h-[60vh] flex flex-col items-center justify-center space-y-10' : 'h-0 opacity-0 pointer-events-none scale-90 mb-0 overflow-hidden'}`}>
                        <div className="text-center space-y-6">
                            <div className="relative mx-auto w-24 h-24">
                                <div className="absolute inset-0 bg-indigo-600 blur-2xl opacity-20 animate-pulse" />
                                <div className="relative w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[2.5rem] flex items-center justify-center shadow-2xl rotate-3 transform transition-transform hover:rotate-0 duration-500">
                                    <Sparkles size={48} className="text-white" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white leading-none">
                                    {lang === Language.PT ? 'Olá! Como posso ajudar?' : lang === Language.ES ? '¡Hola! ¿Cómo puedo ayudar?' : 'Hi! How can I help?'}
                                </h1>
                                <p className="text-xs font-black text-indigo-400 uppercase tracking-[0.4em] opacity-80">Coach MyFitRout</p>
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-center gap-3 w-full animate-in fade-in slide-in-from-bottom-4 duration-1000 max-w-lg mx-auto">
                            {[
                                { text: lang === Language.PT ? '💪 Treino de peito' : '💪 Chest workout', query: 'treino de peito', color: 'bg-indigo-500' },
                                { text: lang === Language.PT ? '🦵 Pernas forte' : '🦵 Strong legs', query: 'treino de perna', color: 'bg-purple-600' },
                                { text: lang === Language.PT ? '🥗 Dica de dieta' : '🥗 Diet tip', query: 'dica de dieta', color: 'bg-emerald-500' },
                                { text: lang === Language.PT ? '🔥 Motivação' : '🔥 Motivation', query: 'motivação', color: 'bg-orange-500' }
                            ].map((s, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleSend(s.query)}
                                    className="px-6 py-3 bg-slate-800/40 border border-white/5 rounded-full text-xs font-black uppercase text-slate-300 hover:bg-slate-800 hover:text-white transition-all hover:border-indigo-500/30 active:scale-95 group flex items-center gap-2 shadow-lg hover:shadow-indigo-500/10"
                                >
                                    <span>{s.text}</span>
                                    <Zap size={12} className="text-indigo-400 opacity-40 group-hover:opacity-100 transition-opacity" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Actual Messages */}
                    {messages.length > 0 && (
                        <div className="space-y-6 mt-4 animate-in fade-in duration-500">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}>
                                    {msg.type === 'ai' && (
                                        <div className="w-9 h-9 bg-slate-800 border border-white/10 rounded-xl flex-none flex items-center justify-center mt-1 mr-3 shadow-lg">
                                            <Sparkles size={18} className="text-indigo-400" />
                                        </div>
                                    )}
                                    <div className={`max-w-[90%] rounded-[1.5rem] px-5 py-3.5 shadow-2xl ${msg.type === 'user'
                                        ? 'bg-indigo-600 text-white rounded-tr-none'
                                        : msg.content.includes('❌')
                                            ? 'bg-rose-500/10 border border-rose-500/30 text-rose-100 rounded-tl-none backdrop-blur-md'
                                            : msg.isLimitMessage
                                                ? 'bg-amber-500/10 border border-amber-500/30 text-amber-100 rounded-tl-none backdrop-blur-md'
                                                : 'bg-slate-800/90 border border-white/10 text-slate-100 rounded-tl-none backdrop-blur-md'
                                        }`}>
                                        <div className={`text-[14px] leading-relaxed font-medium tracking-tight ${msg.type === 'user' ? 'text-white' : 'text-slate-100'
                                            }`}>
                                            {msg.type === 'user' ? (
                                                <p className="whitespace-pre-wrap">{msg.content}</p>
                                            ) : (
                                                renderMessageContent(msg.content)
                                            )}
                                        </div>

                                        {msg.type === 'ai' && !msg.isLimitMessage && !msg.content.includes('❌') && (
                                            <>
                                                {msg.suggestions && msg.suggestions.length > 0 && (
                                                    <div className="mt-4 flex flex-wrap gap-2 animate-in fade-in slide-in-from-bottom-2 duration-500">
                                                        {msg.suggestions.map((suggestion, sIdx) => (
                                                            <button
                                                                key={sIdx}
                                                                onClick={() => handleSend(suggestion)}
                                                                className="px-3 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-[10px] font-bold text-indigo-300 hover:bg-indigo-500/20 hover:border-indigo-500/40 transition-all active:scale-95"
                                                            >
                                                                {suggestion}
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}

                                                {msg.isTruncated && (
                                                    <div className="mt-4 pt-3 border-t border-white/5">
                                                        <button
                                                            onClick={() => handleSend(lang === Language.PT ? 'Continue de onde parou as explicações exatamente' : 'Continue your explanation exactly from where you left off')}
                                                            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
                                                        >
                                                            <Plus size={14} />
                                                            {lang === Language.PT ? 'Continuar Explicação' : 'Continue Explanation'}
                                                        </button>
                                                    </div>
                                                )}

                                                <div className="flex items-center gap-4 mt-4 pt-3 border-t border-white/5">
                                                    <button
                                                        onClick={() => handleCopy(cleanAIResponse(msg.content), msg.id)}
                                                        className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-400 transition-colors"
                                                    >
                                                        {copyId === msg.id ? <CheckCircle2 size={12} className="text-green-500" /> : <Copy size={12} />}
                                                        {copyId === msg.id ? t.coach.copied : t.coach.copy}
                                                    </button>
                                                    <button
                                                        onClick={onShare}
                                                        className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-400 transition-colors ml-auto"
                                                    >
                                                        <Share2 size={12} />
                                                        {t.coach.share}
                                                    </button>
                                                </div>
                                            </>
                                        )}

                                        {(msg.isLimitMessage || msg.content.includes('❌')) && (
                                            <div className="mt-4 pt-3 border-t border-white/5 flex gap-2">
                                                <button
                                                    onClick={() => {
                                                        const lastUserMsg = [...messages].reverse().find(m => m.type === 'user');
                                                        if (lastUserMsg) handleSend(lastUserMsg.content);
                                                    }}
                                                    className="flex-1 py-2.5 bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-400 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border border-indigo-500/20"
                                                >
                                                    {lang === Language.PT ? 'Tentar Novamente' : 'Try Again'}
                                                </button>
                                            </div>
                                        )}

                                        {msg.suggestedExercises && msg.suggestedExercises.length > 0 && (
                                            <div className="mt-5 pt-4 border-t border-white/10 space-y-3">
                                                <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Técnica</p>
                                                <div className="grid gap-2.5">
                                                    {msg.suggestedExercises.map(exId => {
                                                        const ex = EXERCISE_LIBRARY.find(e => e.id === exId);
                                                        return ex ? (
                                                            <div key={exId} className="flex items-center gap-3 p-3 bg-slate-900/60 rounded-2xl border border-white/5 group hover:bg-slate-900 transition-colors">
                                                                <div className="p-2.5 bg-indigo-500/10 rounded-xl text-indigo-400"><Dumbbell size={16} /></div>
                                                                <div className="flex-1 min-w-0">
                                                                    <p className="text-xs font-bold truncate">{ex.name[lang]}</p>
                                                                    <p className="text-[9px] font-bold text-slate-500 uppercase">{ex.muscleGroup}</p>
                                                                </div>
                                                            </div>
                                                        ) : null;
                                                    })}
                                                </div>
                                            </div>
                                        )}

                                        {msg.isLimitMessage && (
                                            <button
                                                onClick={onUpgrade}
                                                className="mt-4 w-full py-3 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl text-[10px] font-black uppercase tracking-widest text-white shadow-lg active:scale-95 transition-all"
                                            >
                                                Libere Acesso Ilimitado
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {loading && (
                        <div className="flex justify-start pl-12 mt-6">
                            <div className="bg-slate-800/50 border border-white/10 rounded-2xl rounded-tl-none px-5 py-3.5 backdrop-blur-md">
                                <div className="flex gap-1.5">
                                    <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                    <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                    <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} className="h-4" />
                </div>
            </div>

            {/* Fixed Bottom Input Area */}
            <div className="flex-none px-4 pb-10 pt-4 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent relative z-20">
                <div className="max-w-2xl mx-auto w-full">
                    <div className="bg-slate-800/80 backdrop-blur-2xl border border-white/10 rounded-full p-1.5 flex gap-2 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.8)] focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder={t.coach.placeholder}
                            className="flex-1 bg-transparent px-6 py-3.5 outline-none text-sm font-medium text-white placeholder:text-slate-500"
                            disabled={loading}
                        />
                        <button
                            onClick={() => handleSend()}
                            disabled={!input.trim() || loading}
                            className="bg-indigo-600 w-12 h-12 rounded-full flex items-center justify-center hover:bg-indigo-500 transition-all disabled:opacity-20 shadow-lg active:scale-90"
                        >
                            {loading ? <Loader size={20} className="animate-spin text-white" /> : <Send size={20} className="text-white" />}
                        </button>
                    </div>
                </div>
                {messages.length === 0 && (
                    <div className="mt-4 flex justify-center opacity-40 animate-in fade-in duration-1000">
                        <AIQuotaDisplay quota={quota} subscription={profile.subscription} language={lang} onUpgrade={onUpgrade} />
                    </div>
                )}
            </div>
        </div>
    );
};
