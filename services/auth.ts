
import { supabase } from '../lib/supabase';

export const authService = {
  // Login com Email/Senha
  signIn: async (email: string, pass: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: pass,
    });
    if (error) throw error;
    return data.user;
  },

  // Cadastro
  signUp: async (email: string, pass: string, name: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password: pass,
      options: {
        data: {
          name: name, // Isso vai para o meta_data e pode ser usado no trigger de criação de perfil
        },
      },
    });
    if (error) throw error;
    return data.user;
  },

  // Logout
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  // Recuperar Senha
  resetPassword: async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://myfitrout.com/reset-password', // Ajustar para seu domínio
    });
    if (error) throw error;
  },

  // Verificar Sessão Atual
  getSession: async () => {
    const { data } = await supabase.auth.getSession();
    return data.session;
  },

  // Ouvir mudanças de estado (Login/Logout em tempo real)
  onAuthStateChange: (callback: (user: any) => void) => {
    return supabase.auth.onAuthStateChange((_event, session) => {
      callback(session?.user || null);
    });
  }
};
