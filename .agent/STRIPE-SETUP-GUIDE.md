# MyFitRout - Guia de Configuração do Stripe

## 🎯 Objetivo
Integrar sistema de pagamento completo com Stripe para processar assinaturas do MyFitRout.

---

## 📋 Pré-requisitos

1. **Conta no Stripe**: https://dashboard.stripe.com/register
2. **Vercel Account**: Para deploy das serverless functions
3. **Supabase Project**: Database configurado

---

## 🔧 Passo 1: Configurar Produtos no Stripe

### 1.1 Acessar Dashboard
- Ir para: https://dashboard.stripe.com/products

### 1.2 Criar Produtos

#### Produto 1: Essential
- Nome: `MyFitRout Essential`
- Descrição: `Plano essencial com 30 consultas IA/mês`
- Preço: `R$ 29,90/mês`
- Tipo: `Recurring` (Mensal)
- Copiar `Price ID` → `price_xxxxx`

#### Produto 2: PRO
- Nome: `MyFitRout PRO`
- Descrição: `Plano profissional com consultas ilimitadas`
- Preço: `R$ 49,90/mês`
- Tipo: `Recurring` (Mensal)
- Copiar `Price ID` → `price_xxxxx`

#### Produto 3: PRO Anual
- Nome: `MyFitRout PRO Anual`
- Descrição: `Plano anual com 33% de desconto`
- Preço: `R$ 399,90/ano`
- Tipo: `Recurring` (Anual)
- Copiar `Price ID` → `price_xxxxx`

---

## 🔑 Passo 2: Obter Chaves da API

### 2.1 Chaves Públicas e Secretas
- Ir para: https://dashboard.stripe.com/apikeys
- Copiar:
  - **Publishable key** (pk_test_xxx ou pk_live_xxx)
  - **Secret key** (sk_test_xxx ou sk_live_xxx)

### 2.2 Webhook Secret
- Ir para: https://dashboard.stripe.com/webhooks
- Criar endpoint: `https://myfitrout-app.vercel.app/api/stripe-webhook`
- Eventos a escutar:
  - `checkout.session.completed`
  - `customer.subscription.updated`
  - `customer.subscription.deleted`
  - `invoice.payment_succeeded`
  - `invoice.payment_failed`
- Copiar **Signing secret** (whsec_xxx)

---

## 🌍 Passo 3: Configurar Variáveis de Ambiente

### 3.1 Variáveis Locais (.env)
```env
# Stripe Keys
STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx

# Price IDs
STRIPE_PRICE_ESSENTIAL_MONTHLY=price_xxxxx
STRIPE_PRICE_PRO_MONTHLY=price_xxxxx
STRIPE_PRICE_PRO_ANNUAL=price_xxxxx

# Supabase (Service Role para webhook)
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 3.2 Variáveis na Vercel
- Ir para: https://vercel.com/[seu-projeto]/settings/environment-variables
- Adicionar TODAS as variáveis acima
- Marcar para: `Production`, `Preview`, `Development`

---

## 📦 Passo 4: Instalar Dependências

```bash
npm install stripe @stripe/stripe-js
```

---

## 🚀 Passo 5: Deploy

### 5.1 Atualizar landing-checkout.js
```javascript
// Substituir a chave pública
const stripe = Stripe('pk_test_YOUR_KEY'); // Usar sua chave real
```

### 5.2 Deploy para Vercel
```bash
vercel --prod
```

### 5.3 Testar Webhook
- Usar Stripe CLI para testes locais:
```bash
stripe listen --forward-to localhost:3000/api/stripe-webhook
```

---

## ✅ Passo 6: Testar Pagamento

### 6.1 Cartões de Teste (Stripe Test Mode)
- **Sucesso**: `4242 4242 4242 4242`
- **Falha**: `4000 0000 0000 0002`
- **3D Secure**: `4000 0027 6000 3184`
- CVV: Qualquer 3 dígitos
- Data: Qualquer data futura
- CEP: Qualquer

### 6.2 Fluxo de Teste
1. Acessar: https://myfitrout-app.vercel.app/landing/
2. Clicar em "Assinar PRO"
3. Preencher com cartão de teste
4. Confirmar pagamento
5. Verificar redirecionamento para `?success=true`
6. Verificar no Supabase se subscription foi atualizada

---

## 🔍 Passo 7: Monitoramento

### 7.1 Dashboard do Stripe
- Payments: https://dashboard.stripe.com/payments
- Subscriptions: https://dashboard.stripe.com/subscriptions
- Logs: https://dashboard.stripe.com/logs

### 7.2 Vercel Logs
```bash
vercel logs
```

---

## 🛡️ Segurança

### Checklist
- [ ] Nunca expor `STRIPE_SECRET_KEY` no frontend
- [ ] Sempre validar webhook signature
- [ ] Usar HTTPS em produção
- [ ] Implementar rate limiting
- [ ] Validar inputs no backend
- [ ] Usar `SUPABASE_SERVICE_ROLE_KEY` apenas no backend

---

## 📊 Schema do Supabase

### Adicionar colunas na tabela `profiles`:
```sql
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT,
ADD COLUMN IF NOT EXISTS stripe_subscription_id TEXT,
ADD COLUMN IF NOT EXISTS subscription_status TEXT DEFAULT 'inactive';

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_stripe_customer ON profiles(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_subscription_status ON profiles(subscription_status);
```

---

## 🔄 Modo Produção

### Quando estiver pronto para produção:

1. **Ativar conta Stripe**
   - Completar verificação de identidade
   - Adicionar informações bancárias

2. **Trocar chaves**
   - Substituir `pk_test_` por `pk_live_`
   - Substituir `sk_test_` por `sk_live_`

3. **Criar produtos em produção**
   - Repetir Passo 1 no modo Live

4. **Atualizar webhook**
   - Criar novo endpoint para modo Live
   - Atualizar `STRIPE_WEBHOOK_SECRET`

---

## 🆘 Troubleshooting

### Erro: "No such price"
- Verificar se `STRIPE_PRICE_XXX` está correto
- Confirmar que está usando chaves do mesmo ambiente (test/live)

### Webhook não está sendo chamado
- Verificar URL do webhook no Stripe Dashboard
- Testar com Stripe CLI: `stripe trigger checkout.session.completed`

### Subscription não atualiza no Supabase
- Verificar logs da Vercel Function
- Confirmar que `SUPABASE_SERVICE_ROLE_KEY` está correta
- Verificar RLS policies

---

## 📚 Recursos

- [Stripe Docs](https://stripe.com/docs)
- [Stripe Testing](https://stripe.com/docs/testing)
- [Vercel Serverless Functions](https://vercel.com/docs/functions)
- [Supabase Auth](https://supabase.com/docs/guides/auth)

---

**Última Atualização**: 2026-01-23
**Responsável**: Agent 2.3 - Payment Integration Engineer
