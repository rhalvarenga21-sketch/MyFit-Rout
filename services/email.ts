
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * MYFITROUT OFFICIAL EMAIL TEMPLATE
 * Clean design without avatar - Brand logo only
 */
const createEmailTemplate = (contentHtml: string, lang: 'pt' | 'en' | 'es' = 'en', name?: string) => {

  const greeting = name
    ? (lang === 'pt' ? `Olá, ${name}!` : lang === 'es' ? `¡Hola, ${name}!` : `Hello, ${name}!`)
    : (lang === 'pt' ? 'Olá! Bem-vindo! 👋' : lang === 'es' ? '¡Hola! ¡Bienvenido! 👋' : 'Hello! Welcome! 👋');

  const footerText = {
    pt: { rights: "© 2026 MyFitRout. Todos os direitos reservados.", role: "Founder (MyFitRout)" },
    en: { rights: "© 2026 MyFitRout. All rights reserved.", role: "Founder (MyFitRout)" },
    es: { rights: "© 2026 MyFitRout. Todos los derechos reservados.", role: "Founder (MyFitRout)" }
  }[lang];

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f5f5f7; }
    .main-container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); }
    
    /* Header - Deep Purple Test (#1b113d) */
    .header { background-color: #1b113d; padding: 40px 0; text-align: center; }
    .header img { max-width: 240px; height: auto; display: inline-block; }
    
    /* Content */
    .content { padding: 40px 40px 20px 40px; color: #4b5563; font-size: 15px; line-height: 1.7; }
    h1 { color: #111827; font-size: 24px; font-weight: 700; margin: 0 0 24px 0; text-align: center; }
    
    /* Highlight Box (Credentials) */
    .highlight-box { background-color: #f0fdf4; border-left: 4px solid #22c55e; padding: 20px; margin: 26px 0; border-radius: 6px; font-size: 14px; color: #374151; line-height: 1.7; }
    .highlight-box strong { color: #111827; font-weight: 600; }
    
    /* Button - Brand Purple (Solid for Email Compatibility) */
    .btn-container { text-align: center; margin: 34px 0; }
    .btn { 
      display: inline-block; 
      background-color: #6366f1; 
      color: #ffffff !important; 
      padding: 14px 40px; 
      border-radius: 8px; 
      text-decoration: none !important; 
      font-weight: 600; 
      font-size: 16px; 
      box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
      mso-padding-alt: 0;
      text-align: center;
    }
    
    /* Signature Section - NO AVATAR */
    .signature-area { padding: 0 40px 40px 40px; border-top: 1px solid #e5e7eb; margin-top: 24px; padding-top: 30px; }
    .sig-name { margin: 0 0 6px 0; font-size: 16px; font-weight: 700; color: #111827; line-height: 1.4; }
    .sig-role { margin: 0 0 4px 0; font-size: 14px; color: #6366f1; font-weight: 600; line-height: 1.3; }
    .sig-email { margin: 0; font-size: 13px; color: #9ca3af; line-height: 1.3; }

    /* Footer - Matching Header Color for Visual Closure */
    .bottom-footer { background-color: #1b113d; padding: 30px 20px; text-align: center; font-size: 12px; color: #a78bfa; }
    .bottom-footer a { color: #ffffff; text-decoration: none; }
    
    /* Social Link */
    .social-link { text-align: center; margin-top: 30px; font-size: 14px; color: #6b7280; }
    .social-link a { color: #6366f1; text-decoration: none; font-weight: 600; }
  </style>
</head>
<body>

  <div class="main-container">
    <!-- Header with Real Logo -->
    <div class="header">
        <a href="https://myfitrout.com">
            <img src="https://myfitrout.com/logo-text.png" alt="MyFitRout" />
        </a>
    </div>

    <!-- Content -->
    <div class="content">
        <h1>${greeting}</h1>
        ${contentHtml}
        <div class="social-link">
           Siga a gente 📸 <a href="https://instagram.com/myfitrout">@myfitrout</a>
        </div>
    </div>

    <!-- Founder Signature - NO AVATAR -->
    <div class="signature-area">
        <p class="sig-name">Rafael Alvarenga</p>
        <p class="sig-role">${footerText.role}</p>
        <p class="sig-email">r.alvarenga@myfitrout.com</p>
    </div>

    <!-- Footer -->
    <div class="bottom-footer">
        ${footerText.rights}
    </div>
  </div>

</body>
</html>
    `;
};

export const sendEmail = async ({
  to,
  subject,
  html,
  lang = 'en',
  name
}: {
  to: string,
  subject: string,
  html: string,
  lang?: 'pt' | 'en' | 'es',
  name?: string
}) => {
  try {
    const brandedHtml = createEmailTemplate(html, lang, name);

    const { data, error } = await resend.emails.send({
      from: 'MyFitRout Support <support@myfitrout.com>',
      replyTo: 'r.alvarenga@myfitrout.com',
      to: [to],
      subject: subject,
      html: brandedHtml,
    });

    if (error) {
      console.error('Failed to send email:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    console.error('Exception sending email:', err);
    return { success: false, error: err };
  }
};
