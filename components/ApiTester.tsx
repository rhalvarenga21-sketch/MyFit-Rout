import React, { useState } from 'react';
import { Zap, CheckCircle, XCircle, Loader, ChevronLeft } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface ApiTesterProps {
    lang: Language;
    onBack: () => void;
}

export const ApiTester: React.FC<ApiTesterProps> = ({ lang, onBack }) => {
    const t = translations[lang] as any;
    const [testing, setTesting] = useState(false);
    const [result, setResult] = useState<{
        success: boolean;
        message: string;
        response?: string;
    } | null>(null);

    const testGeminiAPI = async () => {
        setTesting(true);
        setResult(null);

        try {
            const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

            if (!apiKey) {
                setResult({
                    success: false,
                    message: 'API Key não encontrada nas variáveis de ambiente'
                });
                setTesting(false);
                return;
            }

            // PASSO 1: Listar modelos disponíveis
            console.log('🔍 Listando modelos disponíveis...');
            const listResponse = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
            );

            if (!listResponse.ok) {
                const errorData = await listResponse.json();
                throw new Error(`Não foi possível listar modelos: ${errorData.error?.message || listResponse.statusText}`);
            }

            const modelsData = await listResponse.json();
            const availableModels = modelsData.models?.map((m: any) => m.name) || [];
            console.log('📋 Modelos disponíveis:', availableModels);

            // PASSO 2: Encontrar um modelo que funcione
            // Prioridade: gemini-2.5-flash > gemini-flash-latest > gemini-2.0-flash
            let modelToTest = availableModels.find((m: string) => m.includes('gemini-2.5-flash') && !m.includes('preview'));

            if (!modelToTest) {
                modelToTest = availableModels.find((m: string) => m.includes('gemini-flash-latest'));
            }

            if (!modelToTest) {
                modelToTest = availableModels.find((m: string) => m.includes('gemini-2.0-flash') && !m.includes('exp') && !m.includes('lite'));
            }

            if (!modelToTest) {
                throw new Error(`Nenhum modelo Gemini adequado encontrado. Disponíveis: ${availableModels.slice(0, 10).join(', ')}...`);
            }

            console.log('✅ Testando com modelo:', modelToTest);

            // PASSO 3: Testar com o modelo encontrado
            const testResponse = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/${modelToTest}:generateContent?key=${apiKey}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{
                                text: 'Diga "Olá! A API Gemini está funcionando!" de forma amigável.'
                            }]
                        }]
                    })
                }
            );

            if (!testResponse.ok) {
                const errorData = await testResponse.json();
                throw new Error(`Teste falhou: ${errorData.error?.message || testResponse.statusText}`);
            }

            const data = await testResponse.json();
            const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sem resposta';

            setResult({
                success: true,
                message: `✅ API Key funcionando! Modelo: ${modelToTest.split('/').pop()}`,
                response: aiResponse
            });

        } catch (error: any) {
            setResult({
                success: false,
                message: `❌ Erro: ${error.message}`,
                response: `Chave API (primeiros 20 caracteres): ${import.meta.env.VITE_GEMINI_API_KEY?.substring(0, 20)}...`
            });
        } finally {
            setTesting(false);
        }
    };

    return (
        <div className="space-y-6 animate-in slide-in-from-right-6 pb-24">
            <div className="flex items-center gap-4">
                <button onClick={onBack} className="p-3 bg-slate-800 rounded-2xl border border-slate-700 text-slate-400">
                    <ChevronLeft size={20} />
                </button>
                <h2 className="text-3xl font-black italic uppercase tracking-tighter">API Tester</h2>
            </div>

            <div className="space-y-6">
                {/* Info Card */}
                <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-[35px] border border-indigo-500/30 p-6">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-indigo-500/20 text-indigo-400 rounded-2xl">
                            <Zap size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg mb-2">Gemini API Test</h3>
                            <p className="text-sm opacity-70 leading-relaxed">
                                This will test your Google AI Studio API key without affecting the main app.
                                Your colleagues can continue using the simulated responses normally.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Test Button */}
                <button
                    onClick={testGeminiAPI}
                    disabled={testing}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black uppercase tracking-wider py-6 rounded-[35px] shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                    {testing ? (
                        <>
                            <Loader size={24} className="animate-spin" />
                            Testing API...
                        </>
                    ) : (
                        <>
                            <Zap size={24} />
                            Test Gemini API
                        </>
                    )}
                </button>

                {/* Result Display */}
                {result && (
                    <div className={`rounded-[35px] border p-6 animate-in slide-in-from-bottom-4 ${result.success
                        ? 'bg-emerald-500/10 border-emerald-500/30'
                        : 'bg-rose-500/10 border-rose-500/30'
                        }`}>
                        <div className="flex items-start gap-4">
                            <div className={`p-3 rounded-2xl ${result.success
                                ? 'bg-emerald-500/20 text-emerald-400'
                                : 'bg-rose-500/20 text-rose-400'
                                }`}>
                                {result.success ? <CheckCircle size={24} /> : <XCircle size={24} />}
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-lg mb-2">
                                    {result.success ? 'Success!' : 'Failed'}
                                </h4>
                                <p className="text-sm opacity-90 mb-3">{result.message}</p>

                                {result.response && (
                                    <div className="mt-4 p-4 bg-slate-800/50 rounded-2xl border border-slate-700">
                                        <p className="text-xs uppercase font-black opacity-40 mb-2">AI Response:</p>
                                        <p className="text-sm leading-relaxed">{result.response}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* API Info */}
                <div className="bg-slate-800/50 rounded-[35px] border border-slate-700/50 p-6">
                    <h4 className="text-xs font-black uppercase opacity-40 tracking-widest mb-4">API Information</h4>
                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                            <span className="opacity-60">Model:</span>
                            <span className="font-bold">Gemini 1.5 Flash</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="opacity-60">Free Tier Limit:</span>
                            <span className="font-bold">1,500 requests/day</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="opacity-60">Rate Limit:</span>
                            <span className="font-bold">15 requests/minute</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="opacity-60">Billing Required:</span>
                            <span className="font-bold text-emerald-400">No ✓</span>
                        </div>
                    </div>
                </div>

                {/* Note */}
                <div className="text-center text-xs opacity-40 px-6">
                    <p>This test uses a simple prompt to verify your API key is working.</p>
                    <p className="mt-2">The main app will continue using simulated responses until you decide to switch.</p>
                </div>
            </div>
        </div>
    );
};
