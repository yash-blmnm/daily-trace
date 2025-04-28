import { create } from 'zustand';
import { supabase } from '../lib/dBClient';
import { signIn, signUp, resetPassword, signOut, fetchUserSession } from '../lib/authActions';

interface AuthState {
  user: any;
  loading: boolean;
  fetchUser: () => Promise<void>;
  handleSignUp: (email: string, password: string, fullName: string) => Promise<{ authdata?: any; error?: string }>;
  handleSignIn: (email: string, password: string) => Promise<{ data?: any; error?: string }>;
  handleSignOut: () => Promise<{ error?: string }>;
  handleResetPassword: (email: string) => Promise<{ data?: any; error?: string }>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,

  fetchUser: async () => {
    const { session }: any = await fetchUserSession();
    set({ user: session?.user ?? null, loading: false });

    supabase.auth.onAuthStateChange((_event, session) => {
      set({ user: session?.user ?? null });
    });
  },

  handleSignUp: async (email: string, password: string, fullName: string) => {
    const { authdata, error } = await signUp(email, password, fullName);
    return { authdata, error };
  },

  handleSignIn: async (email: string, password: string) => {
    const { data, error } = await signIn(email, password);
    if (!error && data?.user) {
      set({ user: data.user });
    }
    return { data, error };
  },

  handleSignOut: async () => {
    const { error } = await signOut();
    if (!error) {
      set({ user: null });
    }
    return { error };
  },

  handleResetPassword: async (email: string) => {
    const { data, error } = await resetPassword(email);
    return { data, error };
  }
}));
