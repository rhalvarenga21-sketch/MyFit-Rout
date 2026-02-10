
import fetch from 'node-fetch';

// CONFIGURAÇÃO
const PROD_URL = 'https://myfitrout-app.vercel.app/api/lastlink-webhook';
const TEST_EMAIL = 'rh.alvarenga21@gmail.com'; // Seu email

async function triggerProd() {
    console.log(`🚀 Disparando Webhook para PRODUÇÃO: ${PROD_URL}`);
    console.log(`📧 Email alvo: ${TEST_EMAIL}`);

    try {
        const response = await fetch(PROD_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                event: 'purchase.approved',
                email: TEST_EMAIL,
                product_id: 'C3A4ECD3D', // PRO Mensal
                transaction_id: `PROD-TEST-${Date.now()}`,
                address: { country: 'BR' }
            })
        });

        const rawText = await response.text();
        console.log('\nSTATUS:', response.status);

        try {
            const data = JSON.parse(rawText);
            console.log('RESPOSTA JSON:', data);

            if (response.status === 200) {
                console.log('\n✅ Sucesso! O servidor da Vercel processou o pedido.');
                console.log('📩 Verifique sua caixa de entrada (e spam) agora.');
            }
        } catch (e) {
            console.log('⚠️ A resposta não é JSON (Provável erro de servidor):');
            console.log('CORPO DA RESPOSTA:', rawText);
        }

    } catch (error) {
        console.error('❌ Erro na requisição:', error);
    }
}

triggerProd();
