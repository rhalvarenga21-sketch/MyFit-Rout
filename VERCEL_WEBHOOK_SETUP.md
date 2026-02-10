# 🚀 Configuração Final: Webhook & E-mails

Seu deploy para a Vercel foi iniciado! 

Para que o sistema de vendas e notificações funcione em produção, você precisa adicionar as chaves de segurança no painel da Vercel.

## 1. Acesse o Painel
Vá para: [Vercel Dashboard > Settings > Environment Variables](https://vercel.com/dashboard)

## 2. Adicione as Variáveis
Adicione exatamente estas chaves (copie os valores do seu arquivo `.env` local):

| Nome (Key) | Valor (Value) | Descrição |
| :--- | :--- | :--- |
| `SUPABASE_SERVICE_ROLE_KEY` | `sb_secret_...` | Chave Mestra do Banco (Security) |
| `RESEND_API_KEY` | `re_...` | Chave de Envio de E-mails |

**Nota:** As chaves `VITE_...` provavelmente já estão configuradas se o app já rodava antes. Se não, adicione elas também.

## 3. Teste em Produção
Após adicionar as chaves:
1. Vá na aba **Deployments** na Vercel.
2. Se o deploy atual falhar ou terminar antes de você por as chaves, clique em **Redeploy** (nos três pontinhos do último deploy).
3. Pegue a URL do Webhook: `https://seu-app.vercel.app/api/lastlink-webhook`
4. Configure essa URL na LastLink/Hotmart.

---
**Status:** O código já foi enviado via CLI (`vercel --prod`).
