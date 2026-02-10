# Agent 3: AI/ML Patterns - MyFitRout

## Stack Atual
- **Google Gemini API**: 2.5-flash, 2.0-flash, 1.5-flash, 1.5-pro
- **API Version**: v1 e v1beta
- **Max Tokens**: 2048 (output)

## Arquitetura AI

### 1. Motor Principal (realAI.ts)
```typescript
import { UserProfile, Language } from '../types';
import { translations } from '../translations';

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

        // System Prompt Otimizado
        const systemPrompt = language === Language.PT
            ? `Você é o Coach de Alta Performance MyFitRout. 
DIRETRIZES DE OURO:
1. SEM "FLUFF": Não use frases de preenchimento. Vá direto ao ponto técnico.
2. ESTRUTURA: [Título curto] -> [Lista técnica] -> [Dica prática] -> [3 Sugestões].
3. CONCISÃO: Use o mínimo de palavras possível para máxima profundidade técnica.
4. FORMATO: [SUGGESTION: Pergunta] ao final.
Aluno: ${profile.name}. Objetivo: ${goalLabel}.`
            : `You are the MyFitRout High-Performance Coach.
GOLDEN GUIDELINES:
1. NO FLUFF: Go straight to the technical point.
2. STRUCTURE: [Short Title] -> [Technical List] -> [Practical Tip] -> [3 Suggestions].
3. CONCISION: Minimum words for maximum technical depth.
4. FORMAT: [SUGGESTION: Question] at the end.
Student: ${profile.name}. Goal: ${goalLabel}.`;

        const userContext = `ALUNO: ${profile.goal}, ${profile.weight}kg.`;

        // Rotação de modelos (prioridade)
        const models = [
            'gemini-2.5-flash',
            'gemini-2.0-flash',
            'gemini-1.5-flash',
            'gemini-1.5-flash-8b',
            'gemini-2.0-flash-exp',
            'gemini-1.5-pro',
        ];

        let lastErrorMessage = '';
        let isQuotaIssue = false;

        for (const modelName of models) {
            try {
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
                            console.warn(`Quota excedida para ${modelName}, tentando próximo...`);
                            continue;
                        }
                    }
                }
            } catch (err) {
                lastErrorMessage = err instanceof Error ? err.message : 'Link error';
            }
        }

        if (isQuotaIssue) {
            return `QUOTA_EXCEEDED|${lastErrorMessage}`;
        }
        return `ERROR|${lastErrorMessage || 'Falha na conexão'}`;

    } catch (error) {
        return `ERROR|${error instanceof Error ? error.message : 'Erro crítico'}`;
    }
};
```

### 2. Sistema de Quota (aiQuota.ts)
```typescript
export const getAIQuota = (userId: string, subscription: string, userName: string) => {
    // Master Bypass para desenvolvedores
    if (userName.toLowerCase().includes('rafa') || 
        userId.toLowerCase().includes('dev') || 
        userId.length < 5) {
        return { limit: 9999, used: 0 };
    }

    const quotas = {
        'PRO': 100,
        'ESSENTIAL': 30,
        'TEST_PRO': 9999,
        'NONE': 50
    };

    const limit = quotas[subscription as keyof typeof quotas] || quotas['NONE'];
    const used = getUsageFromStorage(userId);

    return { limit, used };
};

export const shouldUseRealAI = (query: string, userId: string, subscription: string, userName: string) => {
    const quota = getAIQuota(userId, subscription, userName);
    
    // Master Bypass sempre usa Real AI
    if (quota.limit === 9999) {
        return { useRealAI: true, reason: 'MASTER_BYPASS' };
    }

    if (quota.used >= quota.limit) {
        return { useRealAI: false, reason: 'QUOTA_EXCEEDED' };
    }

    return { useRealAI: true, reason: 'OK' };
};

export const incrementAIUsage = (userId: string) => {
    const key = `ai_usage_${userId}`;
    const current = parseInt(localStorage.getItem(key) || '0');
    localStorage.setItem(key, (current + 1).toString());
};
```

### 3. Extração de Metadados
```typescript
// Extração de sugestões
export const extractSuggestions = (response: string): string[] => {
    const suggestions: string[] = [];
    const suggestionRegex = /\[SUGGESTION:(.*?)\]/g;
    let match;
    while ((match = suggestionRegex.exec(response)) !== null) {
        suggestions.push(match[1].trim());
    }
    return suggestions;
};

// Extração de exercícios
export const extractExercises = (response: string): { suggested: string[], missing: string[] } => {
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
    
    return { suggested, missing };
};

// Limpeza de resposta
export const cleanAIResponse = (response: string) => {
    return response
        .replace(/\[EXERCISE:(.*?)\]/g, '$1')
        .replace(/\[SUGGESTION:(.*?)\]/g, '')
        .replace(/\[TRUNCATED_BY_LIMIT\]/g, '')
        .trim();
};
```

### 4. Histórico de Conversação
```typescript
// Filtrar histórico (remover erros e avisos)
const history = messages
    .filter(m => !m.content.startsWith('⚠️') && !m.content.startsWith('❌'))
    .slice(-5) // Últimas 5 mensagens
    .map(m => ({
        role: m.type === 'user' ? 'user' as const : 'model' as const,
        parts: [{ text: m.content }]
    }));
```

## Configuração de Parâmetros

### Temperature (Criatividade)
- **0.3-0.5**: Respostas técnicas e precisas (recomendado para fitness)
- **0.6-0.8**: Respostas balanceadas
- **0.9-1.0**: Respostas criativas (motivação)

### Top-P (Diversidade)
- **0.9**: Recomendado (equilíbrio)
- **0.95**: Mais diversidade
- **0.8**: Mais focado

### Max Output Tokens
- **2048**: Padrão atual (respostas técnicas completas)
- **1024**: Respostas curtas
- **4096**: Respostas muito longas (cuidado com quota)

## Variáveis de Ambiente
```env
VITE_GEMINI_API_KEY=your-api-key-here
```

## Regras de Ouro

1. **Sempre rotacione modelos** - Fallback automático
2. **Filtre histórico** - Remova erros antes de enviar
3. **Detecte truncamento** - Use finishReason
4. **Safety settings** - BLOCK_NONE para conteúdo fitness
5. **System prompt claro** - Estrutura e formato definidos
6. **Contexto do usuário** - Nome, objetivo, peso

## Anti-Patterns (Evitar)

❌ Hardcoded API keys
❌ Histórico sem filtro (incluir erros)
❌ Ignorar finishReason
❌ Temperature muito alta (>0.8) para conteúdo técnico
❌ Não tratar quota exceeded
❌ System prompt genérico
