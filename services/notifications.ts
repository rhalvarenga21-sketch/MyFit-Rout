export const NotificationService = {
    requestPermission: async (): Promise<boolean> => {
        if (!('Notification' in window)) {
            console.log('This browser does not support desktop notification');
            return false;
        }

        if (Notification.permission === 'granted') {
            return true;
        }

        if (Notification.permission !== 'denied') {
            const permission = await Notification.requestPermission();
            return permission === 'granted';
        }

        return false;
    },

    scheduleReminders: (lang: string) => {
        // This is a naive implementation using setInterval since we can't do background tasks easily in a simple PWA without Service Workers setup properly.
        // Ideally this should use the Service Worker for push notifications, but for a web app demo, we'll check periodically if the tab is open.

        // Check every minute
        setInterval(() => {
            const now = new Date();
            const currentHour = now.getHours();
            const currentMinute = now.getMinutes();

            // Water Reminder (Every 2 hours between 8 and 22)
            if (currentHour >= 8 && currentHour <= 22 && currentHour % 2 === 0 && currentMinute === 0) {
                NotificationService.send(
                    lang === 'PT' ? 'Hora de beber água! 💧' : 'Time to drink water! 💧',
                    lang === 'PT' ? 'Mantenha-se hidratado para o treino.' : 'Stay hydrated for your workout.'
                );
            }

            // Meal Reminder (12:00, 15:00, 19:00)
            if ((currentHour === 12 || currentHour === 15 || currentHour === 19) && currentMinute === 0) {
                NotificationService.send(
                    lang === 'PT' ? 'Hora da refeição! 🥗' : 'Meal time! 🥗',
                    lang === 'PT' ? 'Não pule sua nutrição.' : 'Don\'t skip your nutrition.'
                );
            }

            // Workout Reminder (07:00)
            if (currentHour === 7 && currentMinute === 0) {
                NotificationService.send(
                    lang === 'PT' ? 'Vamos treinar? 💪' : 'Let\'s workout? 💪',
                    lang === 'PT' ? 'Comece o dia com energia!' : 'Start your day with energy!'
                );
            }

        }, 60000); // Check every minute
    },

    send: (title: string, body: string) => {
        if (Notification.permission === 'granted') {
            new Notification(title, {
                body: body,
                icon: '/logo192.png' // Assuming this exists or generic
            });
        }
    }
};
