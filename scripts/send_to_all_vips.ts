
import 'dotenv/config';
import { sendEmail } from '../services/email.ts';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const VIP_RECIPIENTS = [
    { email: 'brunaferreirac@hotmail.com', name: 'Bruna' },
    { email: 'adrianospartano@outlook.com', name: 'Adriano' },
    { email: 'joaokh67@gmail.com', name: 'João' },
    { email: 'mellolaura923@gmail.com', name: 'Laura' }
];

const sendToAllVIPs = async () => {
    console.log('🌟 SENDING LIFETIME MEMBER EMAILS TO ALL VIPs\n');
    console.log(`Total recipients: ${VIP_RECIPIENTS.length}`);
    console.log('Interval: 5 seconds between each email\n');
    console.log('─'.repeat(60));

    const lifetimeContentPT = `
    <p>Queremos começar com um <b>MUITO OBRIGADO</b>! 🙏</p>
    
    <p>Você faz parte de um grupo muito especial: os <b>primeiros membros</b> do MyFitRout. Seu apoio, feedback e confiança foram fundamentais para chegarmos até aqui.</p>

    <div style="background: linear-gradient(135deg, #6366f1 0%, #7c3aed 100%); padding: 24px; border-radius: 12px; text-align: center; margin: 30px 0;">
      <h2 style="color: #ffffff; font-size: 22px; font-weight: 700; margin: 0 0 12px 0;">🏆 MEMBRO VITALÍCIO</h2>
      <p style="color: #e0e7ff; font-size: 15px; margin: 0; line-height: 1.6;">
        Como forma de agradecimento, você tem <b style="color: #ffffff;">acesso PRO GRATUITO PARA SEMPRE</b>. Sem mensalidades, sem cobranças, sem pegadinhas. É nosso presente para você.
      </p>
    </div>

    <h2 style="color: #111827; font-size: 18px; font-weight: 700; margin: 30px 0 16px 0;">🚀 O que acabamos de lançar?</h2>
    
    <ul style="line-height: 1.8; color: #4b5563; margin: 0; padding-left: 20px;">
      <li><b>Aba Coach (IA)</b> – Agora mais inteligente e personalizado. Tire dúvidas, peça dicas de treino e receba motivação diária. <em>(*nossa IA integrada*)</em></li>
      <li><b>Biblioteca de Exercícios</b> e Pre-set's definidos e editáveis de acordo com as suas necessidades com vídeos demonstrativos para você treinar com segurança.</li>
      <li><b>Rastreamento de Nutrição</b> – Acompanhe calorias, proteínas e macros de forma simples e visual, + listas de receitas para inverno/verão com diversas opções.</li>
      <li><b>Planos Personalizados</b> – Escolha seus dias de treino e grupos musculares. O app se adapta a você.</li>
    </ul>

    <h2 style="color: #111827; font-size: 18px; font-weight: 700; margin: 30px 0 16px 0;">💪 Por que você é especial?</h2>
    
    <p>Você não é apenas um usuário. Você é parte da <b>fundação</b> do MyFitRout. Cada sugestão, cada bug reportado, cada palavra de incentivo nos ajudou a construir algo melhor.</p>
    
    <p>Enquanto novos membros precisarão assinar para ter acesso PRO, <b>você tem garantia vitalícia</b>. É nossa forma de dizer: <em>"Obrigado por acreditar em nós desde o início."</em></p>

    <div style="text-align: center; margin: 34px 0;">
      <a href="https://myfitrout.com" style="display: inline-block; background-color: #6366f1; color: #ffffff; padding: 14px 40px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px; box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);">Acessar Plataforma</a>
    </div>

    <div class="highlight-box">
      <strong>CONTINUE COMPARTILHANDO</strong><br><br>
      Sua opinião continua sendo <b>fundamental</b> para nossa evolução. Se tiver sugestões, ideias ou feedbacks sobre a nova versão, por favor, <b>responda a este e-mail</b>. Lemos e valorizamos cada mensagem!
    </div>

    <p style="margin-top: 30px; font-size: 14px; color: #6b7280; line-height: 1.7; text-align: center;">
      <em>Obrigado por fazer parte da nossa história. 💜</em>
    </p>
  `;

    for (let i = 0; i < VIP_RECIPIENTS.length; i++) {
        const recipient = VIP_RECIPIENTS[i];

        console.log(`\n📧 [${i + 1}/${VIP_RECIPIENTS.length}] Sending to ${recipient.name} (${recipient.email})...`);

        try {
            await sendEmail({
                to: recipient.email,
                subject: '🏆 Você é Membro Vitalício do MyFitRout - Obrigado!',
                name: recipient.name,
                html: lifetimeContentPT,
                lang: 'pt'
            });

            console.log(`   ✅ Sent successfully!`);

            // Wait 5 seconds before next email (except for the last one)
            if (i < VIP_RECIPIENTS.length - 1) {
                console.log(`   ⏳ Waiting 5 seconds...`);
                await delay(5000);
            }

        } catch (error) {
            console.error(`   ❌ Error sending to ${recipient.email}:`, error);
        }
    }

    console.log('\n' + '═'.repeat(60));
    console.log('✅ ALL LIFETIME MEMBER EMAILS SENT!');
    console.log('🌟 VIP members notified of their lifetime PRO access!');
    console.log('💜 Thank you for being part of MyFitRout\'s foundation!');
    console.log('═'.repeat(60));
};

sendToAllVIPs();
