
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import dotenv from 'dotenv';

// Carregar variáveis de ambiente
dotenv.config();

// Cores para o console
const colors = {
    reset: "\x1b[0m",
    green: "\x1b[32m",
    red: "\x1b[31m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    cyan: "\x1b[36m"
};

async function testWebhookLogic() {
    console.log(`${colors.cyan}🚀 Iniciando Teste de Integração: Webhook & Notificações${colors.reset}\n`);

    // 1. Validar Variáveis de Ambiente
    const supabaseUrl = process.env.VITE_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const resendApiKey = process.env.RESEND_API_KEY;

    let missing = [];
    if (!supabaseUrl) missing.push("VITE_SUPABASE_URL");
    if (!serviceRoleKey) missing.push("SUPABASE_SERVICE_ROLE_KEY");
    if (!resendApiKey) missing.push("RESEND_API_KEY");

    if (missing.length > 0) {
        console.error(`${colors.red}❌ ERRO FATAL: Variáveis de ambiente faltando no arquivo .env:${colors.reset}`);
        missing.forEach(m => console.log(`   - ${m}`));
        console.log(`\n${colors.yellow}⚠️  Por favor, adicione estas chaves no seu arquivo .env antes de executar.${colors.reset}`);
        return;
    }

    console.log(`${colors.green}✓ Variáveis de ambiente detectadas.${colors.reset}`);

    // 2. Inicializar Clientes
    const supabase = createClient(supabaseUrl!, serviceRoleKey!);
    const resend = new Resend(resendApiKey);

    // 3. Mockar Dados do Webhook (Simulando uma compra LastLink)
    // OBS: Usando seu e-mail real para garantir que o Resend (Modo Teste) aceite o envio.
    const mockEmail = `rh.alvarenga21@gmail.com`;
    const mockPayload = {
        event: 'purchase.approved',
        email: mockEmail,
        product_id: 'C3A4ECD3D', // ID do PRO Mensal
        transaction_id: `TX-${Date.now()}`
    };

    console.log(`\n${colors.blue}ℹ️  Simulando compra para: ${mockEmail}${colors.reset}`);

    try {
        // 4. Testar Criação de Usuário (Auth)
        console.log(`\n${colors.cyan}--- Passo 4: Testando Supabase Admin Auth ---${colors.reset}`);
        const tempPassword = "Password123!";
        let userId = null;
        let isNewUser = false;

        const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
            email: mockEmail,
            password: tempPassword,
            email_confirm: true
        });

        if (createError) {
            console.log(`${colors.yellow}ℹ️  Usuário já existe (Esperado para testes repetidos).${colors.reset}`);
            // Tentamos recuperar o ID do perfil se ele já existir
            const { data: distinctProfile } = await supabase.from('profiles').select('id').eq('email', mockEmail).single();
            if (distinctProfile) {
                userId = distinctProfile.id;
                console.log(`${colors.green}✓ ID recuperado do perfil existente: ${userId}${colors.reset}`);
            } else {
                console.warn(`${colors.red}⚠️  Usuário existe no Auth mas NÃO TEM PERFIL. A atualização de DB pode falhar se não conseguirmos o ID.${colors.reset}`);
                // Fallback: Tentar Update direto sem ID (vai funcionar se a coluna email for única e o registro existir)
            }
        } else {
            console.log(`${colors.green}✓ Usuário criado com sucesso! ID: ${newUser.user.id}${colors.reset}`);
            userId = newUser.user.id;
            isNewUser = true;
        }

        // 5. Testar Atualização de Perfil (DB)
        console.log(`\n${colors.cyan}--- Passo 5: Atualizando Banco de Dados ---${colors.reset}`);

        // Se temos o ID, usamos ele para garantir o Upsert. Se não, confiamos no email (que requer constraint unique).
        const payload: any = {
            email: mockEmail,
            subscription: 'PRO',
            subscription_status: 'active',
            lastlink_transaction_id: mockPayload.transaction_id,
            updated_at: new Date().toISOString(),
        };
        if (userId) payload.id = userId;

        const { error: dbError } = await supabase
            .from('profiles')
            .upsert(payload, { onConflict: 'email' });

        if (dbError) {
            console.error(`${colors.red}❌ Falha ao atualizar perfil:${colors.reset}`, dbError.message);
        } else {
            console.log(`${colors.green}✓ Perfil atualizado/criado no Database.${colors.reset}`);
        }

        // 6. Testar Envio de E-mail (Resend)
        console.log(`\n${colors.cyan}--- Passo 6: Testando Envio de E-mail (Resend) ---${colors.reset}`);
        // Nota: Em contas gratuitas do Resend, você só pode enviar para o e-mail cadastrado (o seu).
        // Vamos usar um email "seguro" de teste se o mockEmail for fictício, mas o ideal é enviar para o admin para teste.
        const adminEmail = process.env.ADMIN_EMAIL || 'seu_email_aqui@exemplo.com'; // Fallback visual

        console.log(`${colors.yellow}⚠️  Nota: Em modo teste, certifique-se que o e-mail de destino é verificado no Resend.${colors.reset}`);

        // Tentativa de envio real
        const { data: emailData, error: emailError } = await resend.emails.send({
            from: 'onboarding@resend.dev', // Domínio padrão de teste do Resend
            to: mockEmail, // Isso vai falhar se mockEmail não for o seu próprio email na conta free do Resend.
            subject: '[TESTE] Acesso Liberado MyFitRout',
            html: `<strong>Teste de Integração OK!</strong><br>Login: ${mockEmail}<br>Senha: ${tempPassword}`
        });

        if (emailError) {
            console.error(`${colors.red}❌ Falha no envio de e-mail:${colors.reset}`);
            console.error(emailError);
            console.log(`${colors.yellow}Dica: Se você está no plano Free do Resend, só pode enviar para seu próprio e-mail.${colors.reset}`);
        } else {
            console.log(`${colors.green}✓ E-mail enviado com sucesso! ID: ${emailData?.id}${colors.reset}`);
        }

        console.log(`\n${colors.green}🏁 Teste Finalizado.${colors.reset}`);
        console.log(`Se tudo deu certo, o usuário ${mockEmail} deve ter sido criado no Supabase.`);

        // Limpeza (Opcional - podemos deletar o usuário de teste para não sujar a base)
        // await supabase.auth.admin.deleteUser(newUser.user.id);

    } catch (err: any) {
        console.error(`${colors.red}❌ Erro inesperado:${colors.reset}`, err.message);
    }
}

testWebhookLogic();
