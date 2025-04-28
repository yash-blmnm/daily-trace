import { create } from 'zustand';
import { supabase } from '../lib/dBClient';
import { fetchUserSession } from '../lib/authActions';
import { Session } from '@supabase/supabase-js';

interface AuthState {
  user: any;
  loading: boolean;
  fetchUser: () => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: any) => void;
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

  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null });
  },

  setUser: (user) => {
    set({ user });
  },
}));
