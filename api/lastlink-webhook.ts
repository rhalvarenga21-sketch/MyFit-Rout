// MyFitRout - Last Link Webhook Handler
// Agent 4.0 - Payment & Notifications
// Path: /api/lastlink-webhook.ts

import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import crypto from 'crypto';

// Configure Clients
// Note: VITE_ variables are usually client-side, but in this serverless context they act as env vars.
// Ideally, use SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in Vercel project settings.
// Configure Clients
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Fail gracefully if keys are missing (prevents 500 Crash loop without logs)
if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error(`❌ Critical config missing. URL: ${!!SUPABASE_URL}, KEY: ${!!SUPABASE_KEY}`);
}

const supabase = createClient(
    SUPABASE_URL || 'https://placeholder.supabase.co',
    SUPABASE_KEY || 'placeholder-key'
);

const resend = new Resend(process.env.RESEND_API_KEY!);

// Product Mapping (Last Link ID -> App Role)
const PRODUCT_MAP: { [key: string]: string } = {
    // ESSENTIAL
    'CD85C185A': 'ESSENTIAL', // Monthly
    'C00235787': 'ESSENTIAL', // Annual
    // PRO
    'C3A4ECD3D': 'PRO',       // Monthly
    'C35F0D49B': 'PRO',       // Annual
    'CD7968A27': 'PRO',       // Weekly (Trial)
};

// Helper: Generate Secure Password using crypto
function generatePassword(length = 12): string {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    const bytes = crypto.randomBytes(length);
    return Array.from(bytes).map(b => charset[b % charset.length]).join('');
}

const TRANSLATIONS = {
    PT: {
        subject: '🚀 Bem-vindo(a) ao Time! Seu acesso chegou.',
        title: 'Bem-vindo(a) ao Time! 🦍',
        greeting_1: 'Olá! É um prazer ter você conosco. Seu plano',
        greeting_2: 'foi ativado e seu acesso à plataforma já está liberado.',
        credentials_intro: 'Abaixo estão suas credenciais para acessar o app e começar sua transformação hoje mesmo:',
        box_title: 'Suas Credenciais',
        label_login: 'Login:',
        label_pass: 'Senha:',
        pass_hidden: '(Sua senha atual)',
        btn_action: 'Acessar Plataforma',
        tip: 'Recomendamos alterar sua senha após o primeiro acesso.',
        footer: 'Todos os direitos reservados.',
        social_action: 'Siga a gente 📸',
        role: 'MyFitRout - Manager'
    },
    EN: {
        subject: '🚀 Welcome to the Team! Your access is here.',
        title: 'Welcome to the Team! 🦍',
        greeting_1: 'Hello! It\'s a pleasure to have you with us. Your plan',
        greeting_2: 'has been activated and your access is ready.',
        credentials_intro: 'Below are your credentials to access the app and start your transformation today:',
        box_title: 'Your Credentials',
        label_login: 'Login:',
        label_pass: 'Password:',
        pass_hidden: '(Your current password)',
        btn_action: 'Access Platform',
        tip: 'We recommend changing your password after the first login.',
        footer: 'All rights reserved.',
        social_action: 'Follow us 📸',
        role: 'MyFitRout - Manager'
    },
    ES: {
        subject: '🚀 ¡Bienvenido al Equipo! Tu acceso está listo.',
        title: '¡Bienvenido al Equipo! 🦍',
        greeting_1: '¡Hola! Es un placer tenerte con nosotros. Tu plan',
        greeting_2: 'ha sido activado y tu acceso ya está liberado.',
        credentials_intro: 'A continuación, tus credenciales para acceder a la app y comenzar tu transformación hoy:',
        box_title: 'Tus Credenciales',
        label_login: 'Login:',
        label_pass: 'Contraseña:',
        pass_hidden: '(Tu contraseña actual)',
        btn_action: 'Acceder a la Plataforma',
        tip: 'Recomendamos cambiar tu contraseña después del primer acceso.',
        footer: 'Todos los derechos reservados.',
        social_action: 'Síguenos 📸',
        role: 'MyFitRout - Manager'
    }
};

function detectLanguage(payload: any = {}): 'PT' | 'EN' | 'ES' {
    const address = payload.address || {};
    const country = (address.country || payload.country_code || payload.country || "").toUpperCase();
    const email = (payload.email || "").toLowerCase();

    // Explicit Country Logic
    if (['BR', 'PT', 'AO', 'MZ'].includes(country)) return 'PT';
    if (['ES', 'MX', 'AR', 'CO', 'CL', 'PE', 'UY', 'PY', 'BO', 'EC', 'VE', 'GT', 'CR', 'PA', 'DO'].includes(country)) return 'ES';

    // Email Logic
    if (email.endsWith('.br')) return 'PT';
    if (email.endsWith('.es') || email.endsWith('.mx') || email.endsWith('.ar')) return 'ES';

    // Fallback Default
    // User Audience is primarily BR/Globalmix. Defaulting to PT if unknown country for now is safer for testing transparency 
    // unless strictly .com/US.
    // If country is EMPTY, assume PT for this specific MVP context (user request).
    if (!country) return 'PT';

    return 'EN';
}

export default async function handler(req: any, res: any) {
    // Only allow POST
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    // CRITICAL: Validate webhook signature from Lastlink
    const signature = req.headers['x-lastlink-signature'] || req.headers['x-webhook-signature'];
    const webhookSecret = process.env.LASTLINK_WEBHOOK_SECRET;

    if (webhookSecret && signature) {
        const expectedSignature = crypto
            .createHmac('sha256', webhookSecret)
            .update(JSON.stringify(req.body))
            .digest('hex');
        
        const providedSignature = signature.toString().replace('sha256=', '');
        
        if (expectedSignature !== providedSignature) {
            console.error('❌ Invalid webhook signature');
            return res.status(401).json({ error: 'Invalid signature' });
        }
    } else if (webhookSecret) {
        // Secret configured but no signature provided
        console.error('❌ Webhook signature missing');
        return res.status(401).json({ error: 'Signature required' });
    }
    // If no secret configured, allow for backward compatibility (log warning)
    if (!webhookSecret) {
        console.warn('⚠️  LASTLINK_WEBHOOK_SECRET not configured - webhook unprotected!');
    }

    try {
        const payload = req.body;
        console.log('🔔 Webhook Event Received:', JSON.stringify(payload, null, 2));

        // Extract Data
        // Adapting to common webhook payloads (LastLink/Hotmart/Generic)
        const eventType = payload.event || payload.status;
        const customerEmail = payload.email || payload.customer?.email;
        const productId = payload.product_id || payload.productId;
        const transactionId = payload.id || payload.transaction_id;

        if (!customerEmail) {
            console.warn('⚠️ Webhook missing email. Skipping.');
            return res.status(200).json({ ignored: true, reason: 'no_email' });
        }

        // ===================================
        // 1. PURCHASE APPROVED / PAID
        // ===================================
        if (eventType === 'purchase.approved' || eventType === 'paid' || eventType === 'approved') {
            const subscriptionType = PRODUCT_MAP[productId] || 'PRO';
            const lang = detectLanguage(payload);
            const t = (TRANSLATIONS as any)[lang];
            let finalPassword = null;
            let isNewUser = false;

            console.log(`✅ Approving Access: ${customerEmail} - Plan: ${subscriptionType}`);

            // --- A. Auth User Management ---
            // Try to create user. If fails, they likely exist.
            const tempPassword = generatePassword();
            let userId = null;

            // Note: createUser is an Admin function
            const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
                email: customerEmail,
                password: tempPassword,
                email_confirm: true // Auto-confirm email
            });

            if (createError) {
                // Check if error is "User already registered"
                const msg = createError.message?.toLowerCase();
                if (msg.includes('already registered') || createError.status === 422) {
                    console.log(`👤 User already exists in Auth: ${customerEmail}.`);
                    isNewUser = false;

                    // Fetch existing profile ID to ensure upsert works
                    const { data: distinctProfile } = await supabase.from('profiles').select('id').eq('email', customerEmail).single();
                    if (distinctProfile) {
                        userId = distinctProfile.id;
                    }
                } else {
                    console.error('❌ Error creating user:', createError);
                    throw createError;
                }
            } else {
                console.log(`👤 New User Created: ${newUser.user.id}`);
                isNewUser = true;
                finalPassword = tempPassword;
                userId = newUser.user.id;
            }

            // --- B. Update Profile (Database) ---
            const profilePayload: any = {
                email: customerEmail,
                subscription: subscriptionType,
                subscription_status: 'active',
                lastlink_transaction_id: transactionId,
                updated_at: new Date().toISOString(),
            };
            if (userId) profilePayload.id = userId;

            const { error: profileError } = await supabase
                .from('profiles')
                .upsert(profilePayload, { onConflict: 'email' });

            if (profileError) {
                console.error('❌ Profile update failed:', profileError);
                throw profileError;
            }

            // --- C. Send Notifications (Resend) ---
            if (process.env.RESEND_API_KEY) {
                // 1. Client Email
                const { error: emailError } = await resend.emails.send({
                    from: 'Rafael - MyFitRout <onboarding@resend.dev>', // Sender Name + Verified Domain
                    replyTo: 'myfitrout_app@outlook.com',               // User's Outlook Address
                    to: customerEmail,
                    subject: t.subject,
                    html: `
                        <!DOCTYPE html>
                        <html>
                        <head>
                            <meta charset="utf-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <title>${t.title}</title>
                        </head>
                        <body style="margin: 0; padding: 0; background-color: #f4f4f5; font-family: 'Segoe UI', user-select, sans-serif;">
                            
                            <!-- Container Principal -->
                            <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td align="center" style="padding: 40px 0;">
                                        
                                        <!-- Card do Email -->
                                        <table role="presentation" width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
                                            
                                            <!-- Cabeçalho com Logo -->
                                            <tr>
                                                <td align="center" style="background: linear-gradient(135deg, #312e81 0%, #1e1b4b 100%); padding: 30px;">
                                                    <img src="https://myfitrout-app.vercel.app/logo-text.png" alt="MyFitRout" width="180" style="display: block; border: 0;">
                                                </td>
                                            </tr>

                                            <!-- Conteúdo Principal -->
                                            <tr>
                                                <td style="padding: 40px;">
                                                    <h1 style="color: #1a1a1a; margin: 0 0 20px 0; font-size: 24px; text-align: center;">${t.title}</h1>
                                                    
                                                    <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
                                                        ${t.greeting_1} <strong>${subscriptionType}</strong> ${t.greeting_2}
                                                    </p>
                                                    <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
                                                        ${t.credentials_intro}
                                                    </p>

                                                    <!-- Box de Credenciais -->
                                                    <div style="background-color: #f3f4f6; border-left: 4px solid #6366f1; padding: 20px; border-radius: 4px; margin-bottom: 30px;">
                                                        <p style="margin: 0 0 10px 0; font-size: 14px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em; font-weight: bold;">${t.box_title}</p>
                                                        <p style="margin: 0 0 5px 0; font-size: 16px; color: #1a1a1a;"><strong>${t.label_login}</strong> ${customerEmail}</p>
                                                        ${isNewUser
                            ? `<p style="margin: 0; font-size: 16px; color: #1a1a1a;"><strong>${t.label_pass}</strong> ${finalPassword}</p>`
                            : `<p style="margin: 0; font-size: 16px; color: #1a1a1a;"><strong>${t.label_pass}</strong> <em>${t.pass_hidden}</em></p>`}
                                                    </div>

                                                    <!-- Botão de Ação -->
                                                    <div style="text-align: center; margin-bottom: 30px;">
                                                        <a href="https://myfitrout-app.vercel.app/app" style="background-color: #6366f1; color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; display: inline-block;">${t.btn_action}</a>
                                                        
                                                        <div style="margin-top: 24px;">
                                                            <a href="https://instagram.com/myfitrout" style="color: #4b5563; text-decoration: none; font-size: 14px; font-weight: 600;">
                                                                ${t.social_action} <span style="color: #6366f1;">@myfitrout</span>
                                                            </a>
                                                        </div>
                                                    </div>

                                                    ${isNewUser ? `<p style="color: #6b7280; font-size: 14px; text-align: center; margin-bottom: 30px;"><em>${t.tip}</em></p>` : ''}

                                                    <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 30px 0;">

                                                    <!-- Assinatura Personalizada -->
                                                    <table role="presentation" border="0" cellspacing="0" cellpadding="0">
                                                        <tr>
                                                            <td style="vertical-align: top;">
                                                                <img src="https://myfitrout-app.vercel.app/logo-app.png" alt="Logo" width="48" style="border-radius: 8px; display: block;">
                                                            </td>
                                                            <td style="padding-left: 16px; vertical-align: top;">
                                                                <p style="margin: 0; font-weight: bold; color: #1a1a1a; font-size: 16px;">Rafael Alvarenga</p>
                                                                <p style="margin: 4px 0 0 0; color: #6366f1; font-weight: 600; font-size: 14px;">${t.role}</p>
                                                                <p style="margin: 4px 0 0 0; color: #6b7280; font-size: 14px;">
                                                                    <a href="mailto:myfitrout_app@outlook.com" style="color: #6b7280; text-decoration: none;">myfitrout_app@outlook.com</a>
                                                                </p>
                                                            </td>
                                                        </tr>
                                                    </table>

                                                </td>
                                            </tr>
                                            
                                            <!-- Footer -->
                                            <tr>
                                                <td style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
                                                    <p style="margin: 0; color: #9ca3af; font-size: 12px;">© ${new Date().getFullYear()} MyFitRout. ${t.footer}</p>
                                                </td>
                                            </tr>
                                        </table>
                                        
                                    </td>
                                </tr>
                            </table>

                        </body>
                        </html>
                    `
                });

                if (emailError) console.error("Error sending user email:", emailError);
                else console.log("📧 User email sent.");

                // 2. Admin Notification
                // 'suporte@myfitrout.com' is a placeholder. Using a const or env var logic is better, but hardcoded for now is fine for MVP.
                const adminEmail = process.env.ADMIN_EMAIL || 'suporte@myfitrout.com';
                await resend.emails.send({
                    from: 'MyFitRout System <onboarding@resend.dev>',
                    to: adminEmail,
                    subject: `💰 Nova Venda: ${subscriptionType} - ${customerEmail}`,
                    html: `
                        <h3>Nova Venda Aprovada!</h3>
                        <ul>
                            <li><strong>Cliente:</strong> ${customerEmail}</li>
                            <li><strong>Plano:</strong> ${subscriptionType}</li>
                            <li><strong>Transação:</strong> ${transactionId}</li>
                            <li><strong>Conta Nova?</strong> ${isNewUser ? 'Sim' : 'Não'}</li>
                        </ul>
                    `
                });
                console.log("🔔 Admin notification sent.");
            } else {
                console.warn('⚠️ RESEND_API_KEY missing. Emails not sent.');
            }

            return res.status(200).json({ success: true, created: isNewUser });
        }

        // ===================================
        // 2. REFUND / CANCELLATION
        // ===================================
        if (eventType === 'purchase.refunded' || eventType === 'subscription.canceled') {
            console.log(`🚫 Revoking Access: ${customerEmail}`);
            await supabase.from('profiles').update({
                subscription: 'NONE',
                subscription_status: 'canceled',
                updated_at: new Date().toISOString(),
            }).eq('email', customerEmail);

            if (process.env.RESEND_API_KEY) {
                const adminEmail = process.env.ADMIN_EMAIL || 'suporte@myfitrout.com';
                await resend.emails.send({
                    from: 'MyFitRout System <onboarding@resend.dev>',
                    to: adminEmail,
                    subject: `⚠️ Cancelamento/Reembolso: ${customerEmail}`,
                    html: `<p>O usuário ${customerEmail} teve seu plano cancelado ou reembolsado.</p>`
                });
            }

            return res.status(200).json({ success: true, action: 'revoked' });
        }

        return res.status(200).json({ received: true });

    } catch (error: any) {
        console.error('❌ Handler Error:', error);
        return res.status(500).json({ error: error.message });
    }
}
