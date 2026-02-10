import { UserProfile, Language } from '../types';
import { translations } from '../translations';

/**
 * Motor de IA de Ultra Performance para MyFitRout - VERSÃO RESILIÊNCIA MÁXIMA
 * Implementa rotação agressiva de modelos para contornar limites de quota.
 */
export const getRealAIResponse = async (
    query: string,
    profile: UserProfile,
    language: Language,
    history: { role: 'user' | 'model'; parts: { text: string }[] }[] = []
): Promise<string> => {
    try {
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

        if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY_HERE') {
            return "ERROR|Chave de API não configurada.";
        }

        const goalLabel = translations[language]?.profile?.goals?.[profile.goal] || profile.goal;

        const systemPrompt = language === Language.PT
            ? `Você é o Coach de Alta Performance MyFitRout. 
DIRETRIZES DE OURO:
1. SEM "FLUFF": Não use frases de preenchimento como "Estou animado", "Rafa, campeão", "Sinto sua energia". Vá direto ao ponto técnico.
2. ESTRUTURA PADRÃO: [Título curto] -> [Lista técnica] -> [Dica prática] -> [3 Sugestões].
   (EXCEÇÃO: Se pedido "Motivação", retorne APENAS uma frase estoica/disciplinar poderosa e curto, sem listas).
3. CONCISÃO: Use o mínimo de palavras possível para máxima profundidade técnica.
4. FORMATO: [SUGGESTION: Pergunta] ao final.
Aluno: ${profile.name}. Objetivo: ${goalLabel}.`
            : `You are the MyFitRout High-Performance Coach.
GOLDEN GUIDELINES:
1. NO FLUFF: Do not use filler phrases like "I'm excited", "Go Rafa", "Feel the energy". Go straight to the technical point.
2. STANDARD STRUCTURE: [Short Title] -> [Technical List] -> [Practical Tip] -> [3 Suggestions].
   (EXCEPTION: If asked for "Motivation", return ONLY a powerful, short stoic quote, no lists).
3. CONCISION: Use minimum words for maximum technical depth.
4. FORMAT: [SUGGESTION: Question] at the end.
Student: ${profile.name}. Goal: ${goalLabel}.`;

        const userContext = `ALUNO: ${profile.goal}, ${profile.weight}kg.`;

        // Rotação de modelos do mais eficiente/novo para os mais estáveis - PRIORIDADE 2.5 e 2.0
        const models = [
            'gemini-2.5-flash',         // Novo, alta quota (Auditado)
            'gemini-2.0-flash',         // Estável v2
            'gemini-1.5-flash',         // Backup super estável
            'gemini-1.5-flash-8b',      // Rápido
            'gemini-2.0-flash-exp',     // Experimental
            'gemini-1.5-pro',           // Último recurso
        ];

        let lastErrorMessage = '';
        let isQuotaIssue = false;

        for (const modelName of models) {
            try {
                // Tenta v1 primeiro, v1beta depois
                const versions = ['v1', 'v1beta'];

                for (const version of versions) {
                    const apiUrl = `https://generativelanguage.googleapis.com/${version}/models/${modelName}:generateContent?key=${apiKey}`;

                    const response = await fetch(apiUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            contents: [
                                { role: 'user', parts: [{ text: `${systemPrompt}\n\n${userContext}` }] },
                                ...history,
                                { role: 'user', parts: [{ text: query }] }
                            ],
                            generationConfig: {
                                temperature: 0.5,
                                maxOutputTokens: 2048,
                                topP: 0.9,
                            },
                            safetySettings: [
                                { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
                                { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
                                { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
                                { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" }
                            ]
                        })
                    });

                    if (response.ok) {
                        const data = await response.json();
                        let aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
                        const finishReason = data.candidates?.[0]?.finishReason;

                        if (aiResponse) {
                            if (finishReason === 'MAX_TOKENS') {
                                aiResponse += "\n\n[TRUNCATED_BY_LIMIT]";
                            }
                            return aiResponse.trim();
                        }
                    } else {
                        const err = await response.json();
                        const msg = err.error?.message || response.statusText;
                        lastErrorMessage = msg;

                        if (msg.toLowerCase().includes('quota') || response.status === 429) {
                            isQuotaIssue = true;
                            // Não quebra o loop! Tenta o próximo modelo, pois a quota é por modelo.
                            console.warn(`Quota excedida para ${modelName}, tentando próximo...`);
                            continue;
                        }
                    }
                }
            } catch (err) {
                lastErrorMessage = err instanceof Error ? err.message : 'Link error';
            }
        }

        // Se chegamos aqui, todos falharam
        if (isQuotaIssue) {
            return `QUOTA_EXCEEDED|${lastErrorMessage}`;
        }
        return `ERROR|${lastErrorMessage || 'Falha na conexão'}`;

    } catch (error) {
        return `ERROR|${error instanceof Error ? error.message : 'Erro crítico'}`;
    }
};
