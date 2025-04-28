import { createContext, useContext, useEffect, useState } from 'react';
import { GoalObject } from '../types/journalTypes';
import { useAuthStore } from '../store/authStore';
import { useGoalStore } from '../store/goalStore';

interface JournalContextType {
  goals: GoalObject[];
  loading: boolean;
}

const JournalContext = createContext<JournalContextType>({ goals: [], loading: true });

export function JournalContextProvider({ children }: { children: React.ReactNode }) {
    const [goals, setGoals] = useState<GoalObject[]>([]);
    const [loading, setLoading] = useState(true);

    const user = useAuthStore((state) => state.user);
    const handleFetchAllGoalsByUser = useGoalStore((state) => state.handleFetchAllGoalsByUser);

    useEffect(() => {
        if(user){
            handleFetchAllGoalsByUser(user?.id).then(({ data: fetchedGoals }) => {
                console.log('Fetched Goals:', fetchedGoals);
                setGoals(fetchedGoals || []);
                setLoading(false);
            });
        }
    }, [user]);

    return (
        <JournalContext.Provider value={{ goals, loading }}>
            {children}
        </JournalContext.Provider>
    );
}

export function useJournalContext() {
    return useContext(JournalContext);
}
