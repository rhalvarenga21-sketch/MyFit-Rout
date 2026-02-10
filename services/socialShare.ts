// MyFitRout - Social Share Service
// Agent 1.4 - Social Share Developer
// Squad 1: Core App Enhancement

import { UserProfile, Language } from '../types';
import { translations } from '../translations';
declare const gtag: any;
declare const fbq: any;

export interface ShareData {
    title: string;
    text: string;
    url?: string;
    imageUrl?: string;
}

/**
 * Gerar imagem de conquista (Canvas)
 */
export const generateAchievementImage = async (
    achievementData: {
        title: string;
        description: string;
        value: string;
        userName: string;
        date: Date;
    },
    lang: Language
): Promise<string> => {
    return new Promise((resolve) => {
        const canvas = document.createElement('canvas');
        canvas.width = 1080;
        canvas.height = 1080;
        const ctx = canvas.getContext('2d')!;

        // Background gradient
        const gradient = ctx.createLinearGradient(0, 0, 1080, 1080);
        gradient.addColorStop(0, '#1e293b');
        gradient.addColorStop(0.5, '#312e81');
        gradient.addColorStop(1, '#1e293b');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 1080, 1080);

        // Glow effect
        ctx.shadowColor = 'rgba(99, 102, 241, 0.5)';
        ctx.shadowBlur = 50;

        // Logo/Icon area
        ctx.fillStyle = '#6366f1';
        ctx.beginPath();
        ctx.arc(540, 300, 120, 0, Math.PI * 2);
        ctx.fill();

        // Trophy emoji (simplified)
        ctx.font = 'bold 120px Arial';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.fillText('🏆', 540, 340);

        // Reset shadow
        ctx.shadowBlur = 0;

        // Title
        ctx.font = 'bold 60px Inter, sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.fillText(achievementData.title, 540, 520);

        // Description
        ctx.font = '32px Inter, sans-serif';
        ctx.fillStyle = '#cbd5e1';
        ctx.fillText(achievementData.description, 540, 580);

        // Value (big number)
        ctx.font = 'bold 100px Inter, sans-serif';
        ctx.fillStyle = '#6366f1';
        ctx.fillText(achievementData.value, 540, 720);

        // User name
        ctx.font = 'bold 40px Inter, sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(achievementData.userName, 540, 820);

        // Date
        ctx.font = '24px Inter, sans-serif';
        ctx.fillStyle = '#94a3b8';
        const dateStr = achievementData.date.toLocaleDateString(
            lang === Language.PT ? 'pt-BR' : lang === Language.ES ? 'es-ES' : 'en-US'
        );
        ctx.fillText(dateStr, 540, 860);

        // Branding
        ctx.font = 'bold 28px Inter, sans-serif';
        ctx.fillStyle = '#6366f1';
        ctx.fillText('MYFITROUT', 540, 940);

        // Convert to blob
        canvas.toBlob((blob) => {
            if (blob) {
                const url = URL.createObjectURL(blob);
                resolve(url);
            } else {
                resolve('');
            }
        }, 'image/png');
    });
};

/**
 * Gerar card de progresso
 */
export const generateProgressCard = async (
    progressData: {
        metric: string;
        before: string;
        after: string;
        improvement: string;
        userName: string;
    },
    lang: Language
): Promise<string> => {
    return new Promise((resolve) => {
        const canvas = document.createElement('canvas');
        canvas.width = 1080;
        canvas.height = 1080;
        const ctx = canvas.getContext('2d')!;

        // Background
        const gradient = ctx.createLinearGradient(0, 0, 1080, 1080);
        gradient.addColorStop(0, '#0f172a');
        gradient.addColorStop(1, '#1e293b');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 1080, 1080);

        // Title
        ctx.font = 'bold 50px Inter, sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        const t = translations[lang] as any;
        ctx.fillText(t?.share?.progress || 'My Progress', 540, 150);

        // Metric
        ctx.font = 'bold 40px Inter, sans-serif';
        ctx.fillStyle = '#94a3b8';
        ctx.fillText(progressData.metric, 540, 250);

        // Before/After boxes
        const boxY = 350;
        const boxWidth = 400;
        const boxHeight = 300;

        // Before box
        ctx.fillStyle = 'rgba(51, 65, 85, 0.5)';
        ctx.fillRect(100, boxY, boxWidth, boxHeight);
        ctx.font = 'bold 28px Inter, sans-serif';
        ctx.fillStyle = '#94a3b8';
        ctx.fillText(t?.share?.before || 'Before', 300, boxY + 60);
        ctx.font = 'bold 80px Inter, sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(progressData.before, 300, boxY + 180);

        // Arrow
        ctx.font = 'bold 60px Arial';
        ctx.fillStyle = '#10b981';
        ctx.fillText('→', 540, boxY + 150);

        // After box
        ctx.fillStyle = 'rgba(99, 102, 241, 0.2)';
        ctx.fillRect(580, boxY, boxWidth, boxHeight);
        ctx.font = 'bold 28px Inter, sans-serif';
        ctx.fillStyle = '#6366f1';
        ctx.fillText(t?.share?.after || 'After', 780, boxY + 60);
        ctx.font = 'bold 80px Inter, sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(progressData.after, 780, boxY + 180);

        // Improvement badge
        ctx.fillStyle = '#10b981';
        ctx.fillRect(340, 720, 400, 80);
        ctx.font = 'bold 36px Inter, sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(`${progressData.improvement} ${t?.share?.improvement || 'improvement'}`, 540, 770);

        // User name
        ctx.font = 'bold 32px Inter, sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(progressData.userName, 540, 880);

        // Branding
        ctx.font = 'bold 28px Inter, sans-serif';
        ctx.fillStyle = '#6366f1';
        ctx.fillText('MYFITROUT', 540, 980);

        canvas.toBlob((blob) => {
            if (blob) {
                const url = URL.createObjectURL(blob);
                resolve(url);
            } else {
                resolve('');
            }
        }, 'image/png');
    });
};

/**
 * Compartilhar via Web Share API
 */
export const shareViaWebAPI = async (shareData: ShareData): Promise<boolean> => {
    if (!navigator.share) {
        console.warn('Web Share API not supported');
        return false;
    }

    try {
        await navigator.share({
            title: shareData.title,
            text: shareData.text,
            url: shareData.url
        });
        return true;
    } catch (error) {
        if ((error as Error).name !== 'AbortError') {
            console.error('Error sharing:', error);
        }
        return false;
    }
};

/**
 * Compartilhar imagem via Web Share API
 */
export const shareImageViaWebAPI = async (
    imageBlob: Blob,
    title: string,
    text: string
): Promise<boolean> => {
    if (!navigator.share || !navigator.canShare) {
        return false;
    }

    try {
        const file = new File([imageBlob], 'achievement.png', { type: 'image/png' });
        const shareData = {
            title,
            text,
            files: [file]
        };

        if (navigator.canShare(shareData)) {
            await navigator.share(shareData);
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error sharing image:', error);
        return false;
    }
};

/**
 * Compartilhar no WhatsApp
 */
export const shareToWhatsApp = (text: string, url?: string): void => {
    const message = url ? `${text}\n${url}` : text;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
};

/**
 * Compartilhar no Instagram (via clipboard)
 */
export const shareToInstagram = async (imageUrl: string, caption: string): Promise<boolean> => {
    try {
        // Copy caption to clipboard
        await navigator.clipboard.writeText(caption);

        // Download image
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = 'myfitrout-achievement.png';
        link.click();

        alert('Imagem baixada! Cole a legenda que foi copiada ao postar no Instagram.');
        return true;
    } catch (error) {
        console.error('Error sharing to Instagram:', error);
        return false;
    }
};

/**
 * Copiar link para clipboard
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (error) {
        console.error('Error copying to clipboard:', error);
        return false;
    }
};

/**
 * Download de imagem
 */
export const downloadImage = (imageUrl: string, filename: string = 'myfitrout-share.png'): void => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = filename;
    link.click();
};

/**
 * Gerar texto de compartilhamento baseado em conquista
 */
export const generateShareText = (
    achievementType: string,
    value: string,
    userName: string,
    lang: Language
): string => {
    const t = translations[lang] as any;

    const templates: { [key: string]: string } = {
        'first_workout': `🎉 ${userName} completou o primeiro treino no MyFitRout!`,
        '10_workouts': `💪 ${userName} já completou 10 treinos! Rumo aos 100!`,
        '100kg_volume': `🏋️ ${userName} movimentou ${value}kg de volume total!`,
        'streak_7': `🔥 ${userName} está em uma sequência de 7 dias de treino!`,
        'pr_personal': `⚡ ${userName} bateu um novo recorde pessoal: ${value}!`
    };

    return templates[achievementType] || `${userName} está evoluindo no MyFitRout! 💪`;
};

/**
 * Tracking de compartilhamentos (analytics)
 */
export const trackShare = (
    platform: 'whatsapp' | 'instagram' | 'web_share' | 'clipboard',
    contentType: 'achievement' | 'progress' | 'workout'
): void => {
    // Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'share', {
            method: platform,
            content_type: contentType
        });
    }

    // Facebook Pixel
    if (typeof fbq !== 'undefined') {
        fbq('track', 'Share', {
            platform,
            content_type: contentType
        });
    }
};
