import { PostgrestError } from '@supabase/supabase-js';
import { GoalObject, NewGoalObject } from '../types/journalTypes';
import { supabase } from './dBClient';
import { convertResponse } from '../utils/postgresHelpers';


export async function createGoal(goalData: NewGoalObject) {
    const { userId, name, description, startDate, targetDate, actions } = goalData;

    try {
        const { data, error } = await supabase.from('goals').insert([
        {
            user_id: userId,
            name,
            description,
            start_date: startDate,
            target_date: targetDate,
            actions,
        }
    ]);

    if (error) {
        return { error: error.message };
    }

    return { data };
    } catch (err) {
        return { error: 'An unexpected error occurred while creating the goal.' };
    }
}

export async function updateGoal(goalId: string, updates: NewGoalObject) {
    const { userId, name, description, startDate, targetDate, actions } = updates;
    try {
        const { data, error } = await supabase
        .from('goals')
        .update({
            user_id: userId,
            name,
            description,
            start_date: startDate,
            target_date: targetDate,
            actions,
        })
        .eq('id', goalId);

        if (error) {
        return { error: error.message };
        }

        return { data };
    } catch (err) {
        return { error: 'An unexpected error occurred while updating the goal.' };
    }
}

export async function fetchAllGoalsByUser(userId: string) {
  try {
    const { data, error }: { data: GoalObject[] | null; error: PostgrestError | null } = await supabase
      .from('goals')
      .select('*')
      .eq('user_id', userId)
      .order('start_date', { ascending: true });

    if (error) {
      return { error: error.message };
    }

    return { data };
  } catch (err) {
    return { error: 'An unexpected error occurred while fetching goals.' };
  }
}

export async function fetchGoalsById(goalId: string) {
  try {
    const { data, error } = await supabase
      .from('goals')
      .select('*')
      .eq('id', goalId);

    if (error) {
      return { error: error.message };
    } else {
      return { data: convertResponse(data?.[0]) };
    }
  } catch (err) {
    return { error: 'An unexpected error occurred while fetching goals.' };
  }
}

