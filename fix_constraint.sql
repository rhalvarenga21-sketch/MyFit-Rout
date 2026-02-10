
-- CORREÇÃO PARA UPSERT (ON CONFLICT)

-- Para que o comando "upsert" funcione usando o email como chave, 
-- a coluna email precisa ter uma restrição UNIQUE.

ALTER TABLE public.profiles 
ADD CONSTRAINT profiles_email_key UNIQUE (email);
