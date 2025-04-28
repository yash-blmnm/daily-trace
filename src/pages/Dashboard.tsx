// src/pages/Dashboard.tsx
import { Link } from 'react-router';
import { useEffect, useState } from 'react';
import Calendar from '../components/Calendar';
import DailyStreakChart from '../components/DailyStreakChart';
import { useGoalStore } from '../store/goalStore';
import { useJournalStore } from '../store/journalStore';
import { useAuthStore } from '../store/authStore';
import { JournalObject } from '../types/journalTypes';

export default function Dashboard() {
  const [journalEntries, setJournalEntries] = useState<JournalObject[]>([]);
  const user = useAuthStore((state) => state.user);
  const { goals, loading: goalsLoading, handleFetchAllGoalsByUser } = useGoalStore();
  const { handleFetchJournalEntriesByUser } = useJournalStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (user) {
        setLoading(true);
        // Fetch goals
        await handleFetchAllGoalsByUser(user.id);
        
        // Fetch journal entries
        const { data: entries } = await handleFetchJournalEntriesByUser(user.id);
        if (entries) {
          setJournalEntries(entries);
        }
        setLoading(false);
      }
    }
    
    fetchData();
  }, [user, handleFetchAllGoalsByUser, handleFetchJournalEntriesByUser]);

  if (loading || goalsLoading) return (
    <div className="p-6 flex items-center justify-center">
      <div className="text-teal-600 animate-pulse">Loading dashboard...</div>
    </div>
  );

  return (
    <div className="p-6 space-y-8 w-[80%]">
      <div className='flex items-stretch gap-8 w-full'>
        {/* Goals Section */}
        <section className="flex flex-col flex-1 basis-1/2 items-start">
          <h2 className="mb-4">🏆 Current Goals</h2>
          <div className="flex flex-col flex-1 gap-2 p-4 w-full bg-white rounded shadow">
            <div className="flex flex-col gap-1  w-full">
              {goals.length > 0 ? goals.map(goal => (
                <div key={goal.id} className="flex flex-col p-2 min-w-sm">
                  <Link to={`/goals/${goal.id}`}>
                    <h3 className="mb-2">{goal.name}</h3>
                  </Link>
                  <p className="text-sm text-gray-500">{goal.description}</p>
                </div>
              )) : (
                <div className="text-gray-500 w-full">No active goals yet! Start one 🚀</div>
              )}
            </div>
            {goals?.length < 3 ? 
              <Link to="/goals/new" className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 text-center w-xs">
                  + Create Goal
              </Link>
              : <div className="text-gray-500 w-full">You have reached the maximum number of goals. <br/> Please complete or delete one to create a new goal.</div>
            }
          </div>
        </section>

        {/* Daily Streak Section */}
        <section className="flex-1 basis-1/2">
          <h2 className="mb-4">🔥 Daily Streak</h2>
          <DailyStreakChart />
        </section>
      </div>

      {/* Journal Calendar */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2>🗓 Your Journal Calendar</h2>
          <Link 
            to={`/journal/${new Date().toISOString().split('T')[0]}`}
            className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
          >
            + Today's Entry
          </Link>
        </div>
        <Calendar journalEntries={journalEntries}/>
      </section>
    </div>
  );
}
