# Agent 2: Backend Patterns - MyFitRout

## Stack Atual
- **Supabase**: 2.39.0
- **Database**: PostgreSQL (via Supabase)
- **Auth**: Supabase Auth
- **Storage**: Supabase Storage

## Configuração

### 1. Cliente Supabase
```typescript
// services/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### 2. Autenticação
```typescript
// services/auth.ts
import { supabase } from './supabaseClient';

// Sign In
export const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });
    if (error) throw error;
    return data;
};

// Sign Up
export const signUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
        email,
        password
    });
    if (error) throw error;
    return data;
};

// Sign Out
export const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
};

// Get Current User
export const getCurrentUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
};

// Password Recovery
export const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
};
```

### 3. Database Operations (CRUD)

```typescript
// services/database.ts
import { supabase } from './supabaseClient';
import { UserProfile, Workout, WorkoutLog } from '../types';

// CREATE
export const createProfile = async (profile: Partial<UserProfile>) => {
    const { data, error } = await supabase
        .from('profiles')
        .insert([profile])
        .select()
        .single();
    
    if (error) throw error;
    return data;
};

// READ
export const getProfile = async (userId: string): Promise<UserProfile | null> => {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
    
    if (error) {
        if (error.code === 'PGRST116') return null; // Not found
        throw error;
    }
    return data;
};

// UPDATE
export const updateProfile = async (userId: string, updates: Partial<UserProfile>) => {
    const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId)
        .select()
        .single();
    
    if (error) throw error;
    return data;
};

// DELETE
export const deleteWorkout = async (workoutId: string) => {
    const { error } = await supabase
        .from('workouts')
        .delete()
        .eq('id', workoutId);
    
    if (error) throw error;
};

// LIST with filters
export const getWorkoutLogs = async (userId: string, limit = 10) => {
    const { data, error } = await supabase
        .from('workout_logs')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit);
    
    if (error) throw error;
    return data;
};
```

### 4. Real-time Subscriptions
```typescript
// Exemplo: Escutar mudanças em workout_logs
useEffect(() => {
    const channel = supabase
        .channel('workout_logs_changes')
        .on(
            'postgres_changes',
            {
                event: '*',
                schema: 'public',
                table: 'workout_logs',
                filter: `user_id=eq.${userId}`
            },
            (payload) => {
                console.log('Change received!', payload);
                // Atualizar estado local
            }
        )
        .subscribe();

    return () => {
        supabase.removeChannel(channel);
    };
}, [userId]);
```

### 5. Storage (Arquivos)
```typescript
// Upload de imagem
export const uploadProfileImage = async (userId: string, file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}-${Date.now()}.${fileExt}`;
    const filePath = `profiles/${fileName}`;

    const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

    return data.publicUrl;
};

// Download
export const getFileUrl = (bucket: string, path: string) => {
    const { data } = supabase.storage
        .from(bucket)
        .getPublicUrl(path);
    
    return data.publicUrl;
};
```

## Schema Padrão (Tabelas)

### profiles
```sql
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id),
    name TEXT NOT NULL,
    email TEXT,
    age INTEGER,
    weight NUMERIC,
    height NUMERIC,
    goal TEXT,
    subscription TEXT DEFAULT 'NONE',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### workout_logs
```sql
CREATE TABLE workout_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    workout_name TEXT NOT NULL,
    duration INTEGER, -- em minutos
    volume NUMERIC, -- em kg
    sets_completed INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### ai_usage
```sql
CREATE TABLE ai_usage (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    query_count INTEGER DEFAULT 0,
    last_reset TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Variáveis de Ambiente

```env
# .env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## Regras de Ouro

1. **Sempre use try/catch** - Nunca deixe erros sem tratamento
2. **Validação client-side** - Valide antes de enviar ao backend
3. **RLS (Row Level Security)** - Sempre ativo no Supabase
4. **Tipos TypeScript** - Sincronize com o schema do banco
5. **Transações** - Use quando necessário para operações atômicas
6. **Índices** - Crie índices para queries frequentes

## Anti-Patterns (Evitar)

❌ Queries N+1 (usar joins ou select com relacionamentos)
❌ Dados sensíveis no client (usar RLS)
❌ Polling excessivo (usar real-time subscriptions)
❌ Ignorar erros de conexão
❌ Hardcoded IDs ou URLs
