import { createGoal, fetchAllGoalsByUser, fetchGoalsById, updateGoal } from "../lib/goalActions";
import { GoalObject, NewGoalObject } from "../types/journalTypes";

export function useGoalActions() {
    async function handleCreateGoal(goalData: NewGoalObject) {
        const { data, error } = await createGoal(goalData);
        if (error) {
            return { error };
        }
        return { data };
    }

    async function handleUpdateGoal(goalId: string, updates: any) {
        console.log("Updating goal with ID:", goalId, "and updates:", updates);
        const { data, error } = await updateGoal(goalId, updates);
        if (error) {
            return { error };
        }
        return { data };
    }
    
    async function handleFetchGoalsById(goalId: string) {
        const { data, error }: { data?: GoalObject | null; error?: undefined | string } = await fetchGoalsById(goalId);
        if (error) {
            return { error };
        }
        return { data: data };
    }

    async function handleFetchAllGoalsByUser(userId: string) {
        const { data, error }: { data?: GoalObject[] | null; error?: undefined | string } = await fetchAllGoalsByUser(userId);
        if (error) {
            return { error };
        }
        return { data };
    }
    
    return { handleCreateGoal, handleUpdateGoal, handleFetchGoalsById, handleFetchAllGoalsByUser };
}