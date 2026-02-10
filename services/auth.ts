import { supabase } from './supabaseClient';

/**
 * Real Supabase Authentication Service
 * Replaces the mock auth with production-ready auth
 */

export interface AuthUser {
  id: string;
  email: string;
}

export interface AuthError {
  message: string;
  status?: number;
}

export interface AuthResponse {
  user: AuthUser | null;
  error: AuthError | null;
}

export const auth = {
  /**
   * Sign up a new user with email and password
   */
  signUp: async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        console.error('❌ Sign up error:', error);
        return { user: null, error: { message: error.message } };
      }

      if (data.user) {
        console.log('✅ User signed up:', data.user.email);
        return {
          user: { id: data.user.id, email: data.user.email || '' },
          error: null,
        };
      }

      return { user: null, error: { message: 'Sign up failed' } };
    } catch (err: any) {
      return { user: null, error: { message: err.message || 'Unknown error' } };
    }
  },

  /**
   * Sign in an existing user
   */
  signIn: async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('❌ Sign in error:', error);
        return { user: null, error: { message: error.message } };
      }

      if (data.user) {
        console.log('✅ User signed in:', data.user.email);
        return {
          user: { id: data.user.id, email: data.user.email || '' },
          error: null,
        };
      }

      return { user: null, error: { message: 'Sign in failed' } };
    } catch (err: any) {
      return { user: null, error: { message: err.message || 'Unknown error' } };
    }
  },

  /**
   * Sign out the current user
   */
  signOut: async (): Promise<{ error: AuthError | null }> => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error('❌ Sign out error:', error);
        return { error: { message: error.message } };
      }

      console.log('✅ User signed out');
      return { error: null };
    } catch (err: any) {
      return { error: { message: err.message || 'Unknown error' } };
    }
  },

  /**
   * Send password reset email
   */
  resetPassword: async (email: string): Promise<{ error: AuthError | null }> => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        console.error('❌ Password reset error:', error);
        return { error: { message: error.message } };
      }

      console.log(`✅ Password reset email sent to ${email}`);
      return { error: null };
    } catch (err: any) {
      return { error: { message: err.message || 'Unknown error' } };
    }
  },

  /**
   * Get the current session
   */
  getSession: async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) {
        console.error('❌ Get session error:', error);
        return { session: null, error };
      }

      return { session, error: null };
    } catch (err: any) {
      return { session: null, error: { message: err.message || 'Unknown error' } };
    }
  },

  /**
   * Get the current user
   */
  getCurrentUser: async (): Promise<AuthResponse> => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error) {
        console.error('❌ Get user error:', error);
        return { user: null, error: { message: error.message } };
      }

      if (user) {
        return {
          user: { id: user.id, email: user.email || '' },
          error: null,
        };
      }

      return { user: null, error: null };
    } catch (err: any) {
      return { user: null, error: { message: err.message || 'Unknown error' } };
    }
  },

  /**
   * Listen to auth state changes
   */
  onAuthStateChange: (callback: (user: AuthUser | null) => void) => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          callback({ id: session.user.id, email: session.user.email || '' });
        } else {
          callback(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  },
};

// Keep mockAuth for backwards compatibility during migration
// TODO: Remove this after updating App.tsx
export const mockAuth = {
  signIn: async (email: string, password: string) => {
    const response = await auth.signIn(email, password);
    if (response.error) throw new Error(response.error.message);
    return response.user!;
  },
  signUp: async (email: string, password: string) => {
    const response = await auth.signUp(email, password);
    if (response.error) throw new Error(response.error.message);
    return response.user!;
  },
  resetPassword: async (email: string) => {
    const response = await auth.resetPassword(email);
    if (response.error) throw new Error(response.error.message);
    return true;
  },
  signOut: async () => {
    await auth.signOut();
  },
};
