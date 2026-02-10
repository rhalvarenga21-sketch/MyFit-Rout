import { track } from '@vercel/analytics/react';

/**
 * Rastreia eventos importantes de conversão e engajamento.
 * Wrappa o Vercel Analytics track para adicionar logs e segurança.
 */
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
    try {
        // Log para desenvolvimento
        if (import.meta.env.DEV) {
            console.log(`📊 [Analytics] ${eventName}`, properties);
        }

        // Envio para Vercel Analytics
        track(eventName, properties);

        // Aqui poderíamos adicionar outros trackers (GA4, Facebook Pixel) futuramente
        // window.gtag && window.gtag('event', eventName, ...);

    } catch (error) {
        console.warn('Analytics tracking failed', error);
    }
};
