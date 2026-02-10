# 🚀 Guia Rápido de Execução do Schema - MyFitRout

## ⚡ Passo a Passo (5 minutos)

### 1️⃣ Acessar Supabase
1. Abra: https://supabase.com/dashboard
2. Faça login
3. Selecione seu projeto **MyFitRout**

### 2️⃣ Abrir SQL Editor
1. No menu lateral, clique em **SQL Editor**
2. Clique em **New Query**

### 3️⃣ Executar Schema
1. Abra o arquivo: `supabase/EXECUTE-THIS-SCHEMA.sql`
2. **Copie TODO o conteúdo** (Ctrl+A, Ctrl+C)
3. **Cole** no SQL Editor do Supabase (Ctrl+V)
4. Clique em **Run** (ou pressione Ctrl+Enter)

### 4️⃣ Aguardar Confirmação
- Você verá mensagens de sucesso no console
- Verifique se aparece: ✅ Schema MyFitRout criado com sucesso!

### 5️⃣ Validar Criação
Execute esta query para confirmar:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN (
    'chat_history',
    'ai_usage',
    'workout_logs',
    'exercise_sets',
    'daily_quotes',
    'user_achievements',
    'admin_logs'
)
ORDER BY table_name;
```

Você deve ver **7 tabelas** listadas.

---

## 📊 O que foi criado?

### Tabelas (7):
✅ `chat_history` - Histórico de conversas  
✅ `ai_usage` - Controle de quota  
✅ `workout_logs` - Registro de treinos  
✅ `exercise_sets` - Detalhes de séries  
✅ `daily_quotes` - Pílulas diárias  
✅ `user_achievements` - Conquistas  
✅ `admin_logs` - Auditoria  

### Extensões em `profiles`:
✅ `lastlink_transaction_id`  
✅ `subscription_status`  
✅ `subscription_current_period_end`  
✅ `subscription_cancel_at_period_end`  
✅ `weekly_plan` (JSONB)  

### Segurança:
✅ RLS (Row Level Security) habilitado  
✅ Policies configuradas  
✅ Índices otimizados  

### Dados Iniciais:
✅ 12 quotes motivacionais (PT/EN/ES)  

---

## 🔍 Troubleshooting

### Erro: "relation already exists"
**Solução**: As tabelas já existem. Tudo OK!

### Erro: "permission denied"
**Solução**: Você precisa ser owner do projeto no Supabase.

### Erro: "extension uuid-ossp does not exist"
**Solução**: Execute primeiro:
```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

### Erro: "table profiles does not exist"
**Solução**: Crie a tabela profiles primeiro ou ignore os erros relacionados.

---

## ✅ Checklist de Validação

Após executar, verifique:

- [ ] 7 tabelas criadas
- [ ] Colunas de pagamento adicionadas em `profiles`
- [ ] 12 quotes inseridas em `daily_quotes`
- [ ] Nenhum erro crítico no console
- [ ] RLS habilitado (ícone de cadeado nas tabelas)

---

## 🎯 Próximo Passo

Após executar o schema com sucesso:

1. Volte para o terminal do projeto
2. Execute: `npm run dev`
3. Teste o chat - histórico deve ser salvo
4. Recarregue a página - histórico deve carregar

---

## 📞 Suporte

Se encontrar problemas:
1. Verifique os logs do Supabase
2. Consulte: `.agent/FINAL-REPORT.md`
3. Revise: `supabase/schema.sql` (versão comentada)

---

**Tempo estimado**: 5 minutos  
**Dificuldade**: Fácil  
**Reversível**: Sim (via DROP TABLE)

🚀 **Boa sorte!**
