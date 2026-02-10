// MyFitRout - Translations Extension
// Agent 1.5 - Localization Master
// Squad 1: Core App Enhancement

import { Language } from '../types';

// Extensões para as novas features
export const translationsExtension = {
    [Language.PT]: {
        chat: {
            continue: 'Continuar Explicação',
            continueLong: 'Continue de onde parou as explicações exatamente',
            clearChat: 'Tem certeza que deseja limpar todo o histórico de conversas?',
            cleared: 'Histórico limpo com sucesso',
            export: 'Exportar Conversa',
            search: 'Buscar no histórico...',
            noHistory: 'Nenhuma conversa anterior',
            loadingHistory: 'Carregando histórico...',
            syncingMessages: 'Sincronizando mensagens...',
            messageSaved: 'Mensagem salva',
            messageDeleted: 'Mensagem deletada',
            stats: {
                total: 'Total de mensagens',
                yours: 'Suas mensagens',
                coach: 'Respostas do Coach',
                since: 'Desde'
            }
        },
        workout: {
            todayWorkout: 'Treino de Hoje',
            noWorkoutToday: 'Você ainda não treinou hoje',
            lastWorkout: 'Último Treino',
            stats: {
                total: 'Total de Treinos',
                volume: 'Volume Total',
                sets: 'Séries Completadas',
                avgDuration: 'Duração Média',
                streak: 'Sequência Atual'
            },
            suggestions: {
                title: 'Sugestões para Você',
                basedOnPlan: 'Baseado no seu plano',
                basedOnHistory: 'Baseado no seu histórico'
            },
            adherence: {
                yes: 'Você seguiu o plano hoje! 🎉',
                no: 'Ainda não treinou hoje',
                noPlan: 'Sem plano definido para hoje'
            }
        },
        share: {
            title: 'Compartilhar Conquista',
            achievement: 'Conquista Desbloqueada!',
            progress: 'Meu Progresso',
            before: 'Antes',
            after: 'Depois',
            improvement: 'de evolução',
            platforms: {
                whatsapp: 'WhatsApp',
                instagram: 'Instagram',
                copy: 'Copiar Link',
                download: 'Baixar Imagem',
                more: 'Mais Opções'
            },
            success: 'Compartilhado com sucesso!',
            copied: 'Link copiado!',
            downloaded: 'Imagem baixada!',
            error: 'Erro ao compartilhar'
        },
        subscription: {
            status: {
                active: 'Ativa',
                inactive: 'Inativa',
                canceled: 'Cancelada',
                past_due: 'Pagamento Pendente',
                trialing: 'Período de Teste'
            },
            manage: 'Gerenciar Assinatura',
            upgrade: 'Fazer Upgrade',
            cancel: 'Cancelar Assinatura',
            renews: 'Renova em',
            expires: 'Expira em',
            cancelConfirm: 'Tem certeza que deseja cancelar sua assinatura?'
        },
        admin: {
            title: 'Modo Admin',
            videoAudit: 'Auditoria de Vídeos',
            generateReport: 'Gerar Relatório',
            exportCSV: 'Exportar CSV',
            stats: {
                coverage: 'Cobertura',
                total: 'Total',
                withVideo: 'Com Vídeo',
                withoutVideo: 'Sem Vídeo'
            },
            actions: {
                approve: 'Aprovar',
                reject: 'Rejeitar',
                edit: 'Editar',
                delete: 'Deletar'
            }
        },
        errors: {
            loadFailed: 'Falha ao carregar dados',
            saveFailed: 'Falha ao salvar',
            networkError: 'Erro de conexão',
            tryAgain: 'Tentar Novamente',
            contactSupport: 'Contatar Suporte'
        }
    },
    [Language.EN]: {
        chat: {
            continue: 'Continue Explanation',
            continueLong: 'Continue your explanation exactly from where you left off',
            clearChat: 'Are you sure you want to clear all conversation history?',
            cleared: 'History cleared successfully',
            export: 'Export Conversation',
            search: 'Search in history...',
            noHistory: 'No previous conversations',
            loadingHistory: 'Loading history...',
            syncingMessages: 'Syncing messages...',
            messageSaved: 'Message saved',
            messageDeleted: 'Message deleted',
            stats: {
                total: 'Total messages',
                yours: 'Your messages',
                coach: 'Coach responses',
                since: 'Since'
            }
        },
        workout: {
            todayWorkout: "Today's Workout",
            noWorkoutToday: "You haven't trained today yet",
            lastWorkout: 'Last Workout',
            stats: {
                total: 'Total Workouts',
                volume: 'Total Volume',
                sets: 'Sets Completed',
                avgDuration: 'Average Duration',
                streak: 'Current Streak'
            },
            suggestions: {
                title: 'Suggestions for You',
                basedOnPlan: 'Based on your plan',
                basedOnHistory: 'Based on your history'
            },
            adherence: {
                yes: 'You followed the plan today! 🎉',
                no: "Haven't trained today yet",
                noPlan: 'No plan defined for today'
            }
        },
        share: {
            title: 'Share Achievement',
            achievement: 'Achievement Unlocked!',
            progress: 'My Progress',
            before: 'Before',
            after: 'After',
            improvement: 'improvement',
            platforms: {
                whatsapp: 'WhatsApp',
                instagram: 'Instagram',
                copy: 'Copy Link',
                download: 'Download Image',
                more: 'More Options'
            },
            success: 'Shared successfully!',
            copied: 'Link copied!',
            downloaded: 'Image downloaded!',
            error: 'Error sharing'
        },
        subscription: {
            status: {
                active: 'Active',
                inactive: 'Inactive',
                canceled: 'Canceled',
                past_due: 'Payment Pending',
                trialing: 'Trial Period'
            },
            manage: 'Manage Subscription',
            upgrade: 'Upgrade',
            cancel: 'Cancel Subscription',
            renews: 'Renews on',
            expires: 'Expires on',
            cancelConfirm: 'Are you sure you want to cancel your subscription?'
        },
        admin: {
            title: 'Admin Mode',
            videoAudit: 'Video Audit',
            generateReport: 'Generate Report',
            exportCSV: 'Export CSV',
            stats: {
                coverage: 'Coverage',
                total: 'Total',
                withVideo: 'With Video',
                withoutVideo: 'Without Video'
            },
            actions: {
                approve: 'Approve',
                reject: 'Reject',
                edit: 'Edit',
                delete: 'Delete'
            }
        },
        errors: {
            loadFailed: 'Failed to load data',
            saveFailed: 'Failed to save',
            networkError: 'Connection error',
            tryAgain: 'Try Again',
            contactSupport: 'Contact Support'
        }
    },
    [Language.ES]: {
        chat: {
            continue: 'Continuar Explicación',
            continueLong: 'Continúa tu explicación exactamente desde donde lo dejaste',
            clearChat: '¿Estás seguro de que quieres borrar todo el historial de conversaciones?',
            cleared: 'Historial borrado con éxito',
            export: 'Exportar Conversación',
            search: 'Buscar en el historial...',
            noHistory: 'Sin conversaciones anteriores',
            loadingHistory: 'Cargando historial...',
            syncingMessages: 'Sincronizando mensajes...',
            messageSaved: 'Mensaje guardado',
            messageDeleted: 'Mensaje eliminado',
            stats: {
                total: 'Total de mensajes',
                yours: 'Tus mensajes',
                coach: 'Respuestas del Coach',
                since: 'Desde'
            }
        },
        workout: {
            todayWorkout: 'Entrenamiento de Hoy',
            noWorkoutToday: 'Aún no has entrenado hoy',
            lastWorkout: 'Último Entrenamiento',
            stats: {
                total: 'Total de Entrenamientos',
                volume: 'Volumen Total',
                sets: 'Series Completadas',
                avgDuration: 'Duración Promedio',
                streak: 'Racha Actual'
            },
            suggestions: {
                title: 'Sugerencias para Ti',
                basedOnPlan: 'Basado en tu plan',
                basedOnHistory: 'Basado en tu historial'
            },
            adherence: {
                yes: '¡Seguiste el plan hoy! 🎉',
                no: 'Aún no has entrenado hoy',
                noPlan: 'Sin plan definido para hoy'
            }
        },
        share: {
            title: 'Compartir Logro',
            achievement: '¡Logro Desbloqueado!',
            progress: 'Mi Progreso',
            before: 'Antes',
            after: 'Después',
            improvement: 'de mejora',
            platforms: {
                whatsapp: 'WhatsApp',
                instagram: 'Instagram',
                copy: 'Copiar Enlace',
                download: 'Descargar Imagen',
                more: 'Más Opciones'
            },
            success: '¡Compartido con éxito!',
            copied: '¡Enlace copiado!',
            downloaded: '¡Imagen descargada!',
            error: 'Error al compartir'
        },
        subscription: {
            status: {
                active: 'Activa',
                inactive: 'Inactiva',
                canceled: 'Cancelada',
                past_due: 'Pago Pendiente',
                trialing: 'Período de Prueba'
            },
            manage: 'Gestionar Suscripción',
            upgrade: 'Actualizar',
            cancel: 'Cancelar Suscripción',
            renews: 'Se renueva el',
            expires: 'Expira el',
            cancelConfirm: '¿Estás seguro de que quieres cancelar tu suscripción?'
        },
        admin: {
            title: 'Modo Admin',
            videoAudit: 'Auditoría de Videos',
            generateReport: 'Generar Informe',
            exportCSV: 'Exportar CSV',
            stats: {
                coverage: 'Cobertura',
                total: 'Total',
                withVideo: 'Con Video',
                withoutVideo: 'Sin Video'
            },
            actions: {
                approve: 'Aprobar',
                reject: 'Rechazar',
                edit: 'Editar',
                delete: 'Eliminar'
            }
        },
        errors: {
            loadFailed: 'Error al cargar datos',
            saveFailed: 'Error al guardar',
            networkError: 'Error de conexión',
            tryAgain: 'Intentar de Nuevo',
            contactSupport: 'Contactar Soporte'
        }
    }
};

/**
 * Merge com translations existentes
 * Usar esta função para integrar as novas traduções
 */
export const mergeTranslations = (existingTranslations: any) => {
    Object.keys(translationsExtension).forEach(lang => {
        existingTranslations[lang] = {
            ...existingTranslations[lang],
            ...translationsExtension[lang as Language]
        };
    });
    return existingTranslations;
};
