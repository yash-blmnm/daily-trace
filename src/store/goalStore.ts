import { create } from 'zustand';
import { supabase } from '../lib/dBClient';
import { GoalObject } from '../types/journalTypes';

interface GoalState {
  goals: GoalObject[];
  loading: boolean;
  fetchGoals: () => Promise<void>;
}

export const useGoalStore = create<GoalState>((set) => ({
    goals: [],
    loading: true,

    fetchGoals: async () => {
        const { data, error } = await supabase.from('goals').select('*');
        if (error) {
        console.error('Error fetching goals:', error);
        return;
        }
        set({ goals: data || [], loading: false });
    },
}));
