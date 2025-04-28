import { createContext, useContext, useEffect, useState } from 'react';
import { GoalObject } from '../types/journalTypes';
import { useGoalActions } from '../hooks/useGoalActions';
import { useAuthStore } from '../store/authStore';

interface JournalContextType {
  goals: GoalObject[];
  loading: boolean;
}

const JournalContext = createContext<JournalContextType>({ goals: [], loading: true });

export function JournalContextProvider({ children }: { children: React.ReactNode }) {
    const [goals, setUser] = useState<GoalObject[]>([]);
    const [loading, setLoading] = useState(true);

    const user = useAuthStore((state) => state.user);
    const { handleFetchAllGoalsByUser } = useGoalActions();

  useEffect(() => {
    if(user){
        handleFetchAllGoalsByUser(user?.id).then(({ data: fetchedGoals }) => {
            console.log('Fetched Goals:', fetchedGoals);
            setUser(fetchedGoals || []);
            setLoading(false);
        });
    }
  }, []);

  return (
    <JournalContext.Provider value={{ goals, loading }}>
      {children}
    </JournalContext.Provider>
  );
}

export function useJournalContext() {
  return useContext(JournalContext);
}
