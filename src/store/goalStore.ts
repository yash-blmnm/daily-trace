import { create } from 'zustand';
import { supabase } from '../lib/dBClient';
import { GoalObject, NewGoalObject } from '../types/journalTypes';
import { convertResponse } from '../utils/postgresHelpers';

interface GoalState {
  goals: GoalObject[];
  loading: boolean;
  fetchGoals: () => Promise<void>;
  handleCreateGoal: (goalData: NewGoalObject) => Promise<{ data?: any; error?: string }>;
  handleUpdateGoal: (goalId: string, updates: any) => Promise<{ data?: any; error?: string }>;
  handleDeleteGoal: (goalId: string) => Promise<{ error?: string }>;
  handleFetchGoalsById: (goalId: string) => Promise<{ data?: GoalObject | null; error?: string }>;
  handleFetchAllGoalsByUser: (userId: string) => Promise<{ data?: GoalObject[] | null; error?: string }>;
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
        const convertedData = data?.map(item => convertResponse(item));
        set({ goals: convertedData || [], loading: false });
    },

    handleCreateGoal: async (goalData: NewGoalObject) => {
        const { data, error } = await supabase.from('goals').insert([{
            user_id: goalData.userId,
            name: goalData.name,
            description: goalData.description,
            start_date: goalData.startDate,
            target_date: goalData.targetDate,
            actions: goalData.actions,
        }]).select();
        
        if (error) {
            return { error: error.message };
        }
        
        const convertedData = data?.map(item => convertResponse(item));
        set((state) => ({ goals: [...state.goals, ...convertedData] }));
        return { data: convertedData?.[0] };
    },

    handleUpdateGoal: async (goalId: string, updates: any) => {
        const { data, error } = await supabase
            .from('goals')
            .update({
                user_id: updates.userId,
                name: updates.name,
                description: updates.description,
                start_date: updates.startDate,
                target_date: updates.targetDate,
                actions: updates.actions,
            })
            .eq('id', goalId)
            .select();

        if (error) {
            return { error: error.message };
        }

        const convertedData = data?.map(item => convertResponse(item));
        set((state) => ({
            goals: state.goals.map(goal => 
                goal.id === goalId ? convertedData[0] : goal
            )
        }));
        
        return { data: convertedData?.[0] };
    },

    handleDeleteGoal: async (goalId: string) => {
        const { error } = await supabase
            .from('goals')
            .delete()
            .eq('id', goalId);

        if (error) {
            return { error: error.message };
        }

        set((state) => ({
            goals: state.goals.filter(goal => goal.id !== goalId)
        }));
        
        return {};
    },

    handleFetchGoalsById: async (goalId: string) => {
        const { data, error } = await supabase
            .from('goals')
            .select('*')
            .eq('id', goalId)
            .single();

        if (error) {
            return { error: error.message };
        }
        const convertedData = convertResponse(data);
        return { data: convertedData };
    },

    handleFetchAllGoalsByUser: async (userId: string) => {
        const { data, error } = await supabase
            .from('goals')
            .select('*')
            .eq('user_id', userId)
            .order('start_date', { ascending: true });

        if (error) {
            return { error: error.message };
        }

        const convertedData = data?.map(item => convertResponse(item));
        set({ goals: convertedData || [], loading: false });
        return { data: convertedData };
    }
}));
