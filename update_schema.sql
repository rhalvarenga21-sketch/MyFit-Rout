
-- ATUALIZAÇÃO DE SCHEMA PARA SUPORTAR LAST LINK

-- 1. Adicionar colunas necessárias na tabela profiles se não existirem
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS subscription_status text DEFAULT 'inactive',
ADD COLUMN IF NOT EXISTS lastlink_transaction_id text,
ADD COLUMN IF NOT EXISTS updated_at timestamp with time zone DEFAULT timezone('utc'::text, now());

-- 2. Garantir que RLS permita updates
-- (Já deve existir, mas reforçando permissão para service_role que tem bypass automático)
-- O service_role ignora RLS, então não precisa de policy extra para o webhook.

