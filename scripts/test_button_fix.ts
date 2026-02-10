
import 'dotenv/config';
import { sendEmail } from '../services/email.ts';

const GMAIL_TEST = 'rh.alvarenga21@gmail.com';

const runButtonTest = async () => {
    console.log('🎨 Testing FIXED button visibility\n');

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

    <div style="text-align: center; margin: 34px 0;">
      <a href="https://myfitrout.com" style="display: inline-block; background-color: #6366f1; color: #ffffff; padding: 14px 40px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px; box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);">Conferir Novidades</a>
    </div>

    <div class="highlight-box">
      <strong>FEEDBACK</strong><br><br>
      Estamos construindo o MyFitRout <b>junto com você</b>.<br><br>
      Sua opinião é fundamental para nossa evolução. Se tiver sugestões, ideias ou feedbacks sobre a nova versão, por favor, <b>responda a este e-mail</b>. Lemos e valorizamos cada mensagem!
    </div>
  `;

    console.log('📧 Sending test email with FIXED button to Gmail...');
    await sendEmail({
        to: GMAIL_TEST,
        subject: '⚡🚀 Novas melhorias no MyFitRout - Ajustes inteligentes para melhores resultados',
        name: 'Rafael',
        html: updateContentPT,
        lang: 'pt'
    });

    console.log('\n✅ Test email sent!');
    console.log('📬 Check Gmail - button should be VISIBLE now!');
    console.log('🎯 Button has inline styles for maximum compatibility');
};

runButtonTest();
