
import 'dotenv/config';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const sendUpdateToBruna = async () => {
    console.log('📧 Sending update email to Bruna with BCC to Rafael\n');

    const updateContentPT = `
    <p>É com muita alegria que compartilhamos novidades.</p>
    
    <p>Acabamos de lançar uma <b>grande atualização</b> no MyFitRout. A plataforma está de cara nova, mais rápida e preparada para levar seus treinos para o próximo nível.</p>

    <h2 style="color: #111827; font-size: 18px; font-weight: 700; margin: 30px 0 16px 0;">🚀 O que melhorou?</h2>
    
    <ul style="line-height: 1.8; color: #4b5563; margin: 0; padding-left: 20px;">
      <li><b>Aba Coach (IA)</b> – Agora mais inteligente e personalizado. Tire dúvidas, peça dicas de treino e receba motivação diária. <em>(*nossa IA integrada*)</em></li>
      <li><b>Biblioteca de Exercícios</b> e Pre-set's definidos e editáveis de acordo com as suas necessidades com vídeos demonstrativos para você treinar com segurança.</li>
      <li><b>Rastreamento de Nutrição</b> – Acompanhe calorias, proteínas e macros de forma simples e visual, + listas de receitas para inverno/verão com diversas opções.</li>
    </ul>

    <h2 style="color: #111827; font-size: 18px; font-weight: 700; margin: 30px 0 16px 0;">💪 Como isso impacta você?</h2>
    
    <p><b>Mais resultados, menos tempo perdido.</b> Com essas melhorias, você terá:</p>
    
    <ul style="line-height: 1.8; color: #4b5563; margin: 0; padding-left: 20px;">
      <li><b>Planos Personalizados</b> – Escolha seus dias de treino e grupos musculares. O app se adapta a você.</li>
      <li>Treinos mais eficientes e alinhados com seus objetivos</li>
      <li>Orientação 24/7 através do Coach (IA)</li>
      <li>Controle total sobre sua evolução física e nutricional</li>
      <li>Uma experiência fluida, rápida e sem distrações</li>
    </ul>

    <div class="btn-container">
      <a href="https://myfitrout.com" class="btn">Conferir Novidades</a>
    </div>

    <div class="highlight-box">
      <strong>FEEDBACK</strong><br><br>
      Estamos construindo o MyFitRout <b>junto com você</b>.<br><br>
      Sua opinião é fundamental para nossa evolução. Se tiver sugestões, ideias ou feedbacks sobre a nova versão, por favor, <b>responda a este e-mail</b>. Lemos e valorizamos cada mensagem!
    </div>
  `;

    // Create branded HTML template
    const greeting = 'Olá, Bruna!';
    const footerText = {
        rights: "© 2026 MyFitRout. Todos os direitos reservados.",
        role: "Founder (MyFitRout)"
    };

    const brandedHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f5f5f7; }
    .main-container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); }
    .header { background-color: #1b113d; padding: 40px 0; text-align: center; }
    .header img { max-width: 240px; height: auto; display: inline-block; }
    .content { padding: 40px 40px 20px 40px; color: #4b5563; font-size: 15px; line-height: 1.7; }
    h1 { color: #111827; font-size: 24px; font-weight: 700; margin: 0 0 24px 0; text-align: center; }
    .highlight-box { background-color: #f0fdf4; border-left: 4px solid #22c55e; padding: 20px; margin: 26px 0; border-radius: 6px; font-size: 14px; color: #374151; line-height: 1.7; }
    .highlight-box strong { color: #111827; font-weight: 600; }
    .btn-container { text-align: center; margin: 34px 0; }
    .btn { display: inline-block; background: linear-gradient(135deg, #6366f1 0%, #7c3aed 100%); color: #ffffff !important; padding: 14px 40px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px; box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3); }
    .signature-area { padding: 0 40px 40px 40px; border-top: 1px solid #e5e7eb; margin-top: 24px; padding-top: 30px; }
    .sig-name { margin: 0 0 6px 0; font-size: 16px; font-weight: 700; color: #111827; line-height: 1.4; }
    .sig-role { margin: 0 0 4px 0; font-size: 14px; color: #6366f1; font-weight: 600; line-height: 1.3; }
    .sig-email { margin: 0; font-size: 13px; color: #9ca3af; line-height: 1.3; }
    .bottom-footer { background-color: #1b113d; padding: 30px 20px; text-align: center; font-size: 12px; color: #a78bfa; }
    .bottom-footer a { color: #ffffff; text-decoration: none; }
    .social-link { text-align: center; margin-top: 30px; font-size: 14px; color: #6b7280; }
    .social-link a { color: #6366f1; text-decoration: none; font-weight: 600; }
  </style>
</head>
<body>
  <div class="main-container">
    <div class="header">
        <a href="https://myfitrout.com">
            <img src="https://myfitrout.com/logo-text.png" alt="MyFitRout" />
        </a>
    </div>
    <div class="content">
        <h1>${greeting}</h1>
        ${updateContentPT}
        <div class="social-link">
           Siga a gente 📸 <a href="https://instagram.com/myfitrout">@myfitrout</a>
        </div>
    </div>
    <div class="signature-area">
        <p class="sig-name">Rafael Alvarenga</p>
        <p class="sig-role">${footerText.role}</p>
        <p class="sig-email">r.alvarenga@myfitrout.com</p>
    </div>
    <div class="bottom-footer">
        ${footerText.rights}
    </div>
  </div>
</body>
</html>
  `;

    try {
        const { data, error } = await resend.emails.send({
            from: 'MyFitRout Support <support@myfitrout.com>',
            replyTo: 'r.alvarenga@myfitrout.com',
            to: ['brunaferreirac@hotmail.com'],
            bcc: ['r.alvarenga@myfitrout.com'], // BCC para você ver o e-mail
            subject: '⚡🚀 Novas melhorias no MyFitRout - Ajustes inteligentes para melhores resultados',
            html: brandedHtml,
        });

        if (error) {
            console.error('❌ Failed to send email:', error);
            return;
        }

        console.log('✅ Email sent successfully!');
        console.log('📧 To: brunaferreirac@hotmail.com');
        console.log('📬 BCC: r.alvarenga@myfitrout.com');
        console.log('🎯 Subject: Novas melhorias no MyFitRout');
        console.log('\n💡 Check your inbox to see how it looks!');

    } catch (err) {
        console.error('❌ Exception:', err);
    }
};

sendUpdateToBruna();
