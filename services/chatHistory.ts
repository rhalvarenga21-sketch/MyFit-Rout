// MyFitRout - Chat History Service
// Agent 1.1 - Memory & Context Lead
// Squad 1: Core App Enhancement

import { supabase } from './supabaseClient';
import { Language } from '../types';

export interface ChatMessage {
    id: string;
    user_id: string;
    message_type: 'user' | 'ai';
    content: string;
    suggestions?: string[];
    is_truncated?: boolean;
    is_limit_message?: boolean;
    created_at: string;
}

/**
 * Salvar mensagem no histórico
 */
export const saveChatMessage = async (
    userId: string,
    messageType: 'user' | 'ai',
    content: string,
    suggestions: string[] = [],
    isTruncated: boolean = false,
    isLimitMessage: boolean = false
): Promise<ChatMessage | null> => {
    try {
        const { data, error } = await supabase
            .from('chat_history')
            .insert([{
                user_id: userId,
                message_type: messageType,
                content: content,
                suggestions: suggestions.length > 0 ? suggestions : null,
                is_truncated: isTruncated,
                is_limit_message: isLimitMessage
            }])
            .select()
            .single();

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error saving chat message:', error);
        return null;
    }
};

/**
 * Carregar histórico de chat (últimas N mensagens)
 */
export const loadChatHistory = async (
    userId: string,
    limit: number = 50
): Promise<ChatMessage[]> => {
    try {
        const { data, error } = await supabase
            .from('chat_history')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false })
            .limit(limit);

        if (error) throw error;

        // Reverter para ordem cronológica
        return (data || []).reverse();
    } catch (error) {
        console.error('Error loading chat history:', error);
        return [];
    }
};

/**
 * Carregar mensagens paginadas (para scroll infinito)
 */
export const loadChatHistoryPaginated = async (
    userId: string,
    page: number = 0,
    pageSize: number = 20
): Promise<{ messages: ChatMessage[], hasMore: boolean }> => {
    try {
        const offset = page * pageSize;

        const { data, error, count } = await supabase
            .from('chat_history')
            .select('*', { count: 'exact' })
            .eq('user_id', userId)
            .order('created_at', { ascending: false })
            .range(offset, offset + pageSize - 1);

        if (error) throw error;

        const messages = (data || []).reverse();
        const hasMore = count ? (offset + pageSize) < count : false;

        return { messages, hasMore };
    } catch (error) {
        console.error('Error loading paginated chat history:', error);
        return { messages: [], hasMore: false };
    }
};

/**
 * Limpar todo o histórico de chat
 */
export const clearChatHistory = async (userId: string): Promise<boolean> => {
    try {
        const { error } = await supabase
            .from('chat_history')
            .delete()
            .eq('user_id', userId);

        if (error) throw error;
        return true;
    } catch (error) {
        console.error('Error clearing chat history:', error);
        return false;
    }
};

/**
 * Deletar mensagem específica
 */
export const deleteChatMessage = async (messageId: string): Promise<boolean> => {
    try {
        const { error } = await supabase
            .from('chat_history')
            .delete()
            .eq('id', messageId);

        if (error) throw error;
        return true;
    } catch (error) {
        console.error('Error deleting chat message:', error);
        return false;
    }
};

/**
 * Buscar mensagens por conteúdo
 */
export const searchChatHistory = async (
    userId: string,
    query: string
): Promise<ChatMessage[]> => {
    try {
        const { data, error } = await supabase
            .from('chat_history')
            .select('*')
            .eq('user_id', userId)
            .ilike('content', `%${query}%`)
            .order('created_at', { ascending: false })
            .limit(50);

        if (error) throw error;
        return data || [];
    } catch (error) {
        console.error('Error searching chat history:', error);
        return [];
    }
};

/**
 * Obter estatísticas do chat
 */
export const getChatStats = async (userId: string): Promise<{
    totalMessages: number;
    userMessages: number;
    aiMessages: number;
    firstMessageDate: string | null;
    lastMessageDate: string | null;
}> => {
    try {
        const { data, error } = await supabase
            .from('chat_history')
            .select('message_type, created_at')
            .eq('user_id', userId);

        if (error) throw error;

        const messages = data || [];
        const userMessages = messages.filter(m => m.message_type === 'user').length;
        const aiMessages = messages.filter(m => m.message_type === 'ai').length;

        const dates = messages.map(m => new Date(m.created_at).getTime());
        const firstMessageDate = dates.length > 0
            ? new Date(Math.min(...dates)).toISOString()
            : null;
        const lastMessageDate = dates.length > 0
            ? new Date(Math.max(...dates)).toISOString()
            : null;

        return {
            totalMessages: messages.length,
            userMessages,
            aiMessages,
            firstMessageDate,
            lastMessageDate
        };
    } catch (error) {
        console.error('Error getting chat stats:', error);
        return {
            totalMessages: 0,
            userMessages: 0,
            aiMessages: 0,
            firstMessageDate: null,
            lastMessageDate: null
        };
    }
};

/**
 * Exportar histórico de chat (para backup ou análise)
 */
export const exportChatHistory = async (
    userId: string,
    format: 'json' | 'txt' = 'json'
): Promise<string> => {
    try {
        const messages = await loadChatHistory(userId, 1000);

        if (format === 'json') {
            return JSON.stringify(messages, null, 2);
        } else {
            // Formato texto
            return messages.map(m => {
                const timestamp = new Date(m.created_at).toLocaleString();
                const sender = m.message_type === 'user' ? 'Você' : 'Coach';
                return `[${timestamp}] ${sender}: ${m.content}`;
            }).join('\n\n');
        }
    } catch (error) {
        console.error('Error exporting chat history:', error);
        return '';
    }
};

/**
 * Sincronizar mensagens locais com o servidor
 * Útil para quando o usuário estava offline
 */
export const syncLocalMessages = async (
    userId: string,
    localMessages: any[]
): Promise<boolean> => {
    try {
        const messagesToSync = localMessages.map(m => ({
            user_id: userId,
            message_type: m.type,
            content: m.content,
            suggestions: m.suggestions || null,
            is_truncated: m.isTruncated || false,
            is_limit_message: m.isLimitMessage || false,
            created_at: m.timestamp
        }));

        const { error } = await supabase
            .from('chat_history')
            .insert(messagesToSync);

        if (error) throw error;
        return true;
    } catch (error) {
        console.error('Error syncing local messages:', error);
        return false;
    }
};
