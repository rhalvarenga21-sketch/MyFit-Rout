
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import dotenv from 'dotenv';
import path from 'path';

// Load env vars
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const RESEND_KEY = process.env.RESEND_API_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY || !RESEND_KEY) {
    console.error('❌ Missing Env Vars. Check .env file.');
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
const resend = new Resend(RESEND_KEY);

const UPDATES_TRANSLATIONS = {
    PT: {
        subject: '🚀 MyFitRout 2.0: Novidades e um convite especial!',
        title: 'Nova Experiência',
        greeting_1: 'Olá',
        greeting_2: '! É com muita alegria que compartilhamos novidades.',
        body: 'Acabamos de lançar uma <strong>grande atualização</strong> no MyFitRout. A plataforma está de cara nova, mais rápida e preparada para levar seus treinos para o próximo nível.',
        btn_action: 'Conferir Novidades',
        feedback_intro: 'Estamos construindo o MyFitRout <strong>junto com você</strong>.',
        feedback_text: 'Sua opinião é fundamental para nossa evolução. Se tiver sugestões, ideias ou feedbacks sobre a nova versão, por favor, <strong>responda a este e-mail</strong>. Lemos e valorizamos cada mensagem!',
        footer: 'Todos os direitos reservados.',
        social_action: 'Siga a gente 📸',
        role: 'MyFitRout - Manager'
    },
    EN: {
        subject: '🚀 MyFitRout 2.0: Big updates & a special invite!',
        title: 'New Experience',
        greeting_1: 'Hello',
        greeting_2: '! We are thrilled to share some news.',
        body: 'We just released a <strong>major update</strong> to MyFitRout. The platform has a brand new look, is faster, and ready to take your workouts to the next level.',
        btn_action: 'Check it Out',
        feedback_intro: 'We are building MyFitRout <strong>together with you</strong>.',
        feedback_text: 'Your opinion is key to our evolution. If you have suggestions, ideas, or feedback about the new version, please <strong>reply to this email</strong>. We read and value every message!',
        footer: 'All rights reserved.',
        social_action: 'Follow us 📸',
        role: 'MyFitRout - Manager'
    },
    ES: {
        subject: '🚀 MyFitRout 2.0: ¡Novedades y una invitación especial!',
        title: 'Nueva Experiencia',
        greeting_1: '¡Hola',
        greeting_2: '! Estamos muy felices de compartir novedades.',
        body: 'Acabamos de lanzar una <strong>gran actualización</strong> en MyFitRout. La plataforma tiene un nuevo diseño, es más rápida y está lista para llevar tus entrenamientos al siguiente nivel.',
        btn_action: 'Ver Novedades',
        feedback_intro: 'Estamos construyendo MyFitRout <strong>junto contigo</strong>.',
        feedback_text: 'Tu opinión es fundamental para nuestra evolución. Si tienes sugerencias, ideas o comentarios sobre la nueva versión, por favor <strong>responde a este correo</strong>. ¡Leemos y valoramos cada mensaje!',
        footer: 'Todos los derechos reservados.',
        social_action: 'Síguenos 📸',
        role: 'MyFitRout - Manager'
    }
};

function getLang(profile: any) {
    // 1. Profile Preference
    if (profile.language) {
        if (profile.language === 'PT' || profile.language === 'pt') return 'PT';
        if (profile.language === 'ES' || profile.language === 'es') return 'ES';
        if (profile.language === 'EN' || profile.language === 'en') return 'EN';
    }
    // 2. Email TLD
    const email = (profile.email || "").toLowerCase();
    if (email.endsWith('.br')) return 'PT';
    if (email.endsWith('.es') || email.endsWith('.mx') || email.endsWith('.ar')) return 'ES';

    // 3. Default
    return 'EN';
}

async function runBroadcast() {
    console.log('📡 Starting Broadcast...');

    // 1. Fetch Users
    const { data: profiles, error } = await supabase.from('profiles').select('*');
    if (error) {
        console.error('❌ Error fetching profiles:', error);
        return;
    }

    console.log(`👥 Found ${profiles.length} users.`);

    // 2. Loop and Send
    for (const user of profiles) {
        if (!user.email) continue;

        const lang = getLang(user);
        const t = (UPDATES_TRANSLATIONS as any)[lang];
        const name = user.name ? user.name.split(' ')[0] : 'Athlete';

        console.log(`\n-------------------------------------------------------------`);
        console.log(`👤 CANDIDATO: ${name}`);
        console.log(`📧 E-MAIL: ${user.email}`);
        console.log(`🌍 IDIOMA DETECTADO: ${lang}`);
        console.log(`📝 ASSUNTO: ${t.subject}`);
        console.log(`📋 TEMPLATE: Utilize o texto em ${lang} fornecido anteriormente.`);
        console.log(`-------------------------------------------------------------\n`);
    }

    console.log('🏁 Lista Gerada com Sucesso!');
}

runBroadcast();
