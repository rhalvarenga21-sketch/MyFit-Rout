
-- RODE ISSO NO SQL EDITOR DO SUPABASE PARA CRIAR AS TABELAS

-- 1. Tabela de Perfis (Profiles)
-- Vincula dados extras ao usuário do Auth
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text,
  name text,
  weight float,
  height float,
  goal text,
  level text,
  language text default 'PT',
  subscription text default 'NONE',
  subscription_active boolean default false,
  completed_days text[] default '{}',
  custom_schedule jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS (Segurança): Cada usuário só vê/edita o seu
alter table public.profiles enable row level security;

create policy "Users can view own profile" 
on public.profiles for select 
using ( auth.uid() = id );

create policy "Users can update own profile" 
on public.profiles for update 
using ( auth.uid() = id );

create policy "Users can insert own profile" 
on public.profiles for insert 
with check ( auth.uid() = id );

-- 2. Tabela de Treinos Realizados (Workout Logs)
create table public.workout_logs (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  workout_name text,
  workout_source text, -- 'PRESET' or 'CUSTOM'
  duration_minutes integer,
  total_weight_lifted float,
  total_sets integer,
  total_reps integer,
  data jsonb, -- Detalhes completos dos exercícios
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.workout_logs enable row level security;

create policy "Users can view own workouts" 
on public.workout_logs for select 
using ( auth.uid() = user_id );

create policy "Users can insert own workouts" 
on public.workout_logs for insert 
with check ( auth.uid() = user_id );

-- 3. Trigger para criar perfil automático ao cadastrar (Opcional, mas útil)
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, email, name)
  values (new.id, new.email, new.raw_user_meta_data->>'name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
