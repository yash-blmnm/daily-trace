// src/pages/Dashboard.tsx
import { Link } from 'react-router';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/dBClient';
import Calendar from '../components/Calendar'; // (we'll create this separately)
import DailyStreakChart from '../components/DailyStreakChart'; // (we'll create this too)
import { useJournalContext } from '../context/JournalContext';

export default function Dashboard() {
  const [journalDates, setJournalDates] = useState<string[]>([]);

  const {goals, loading} = useJournalContext();

  if (loading) return <div className="p-6">Loading dashboard...</div>;

  return (
    <div className="p-6 space-y-8">
      
      <div className='flex items-stretch gap-8 w-full'>
        {/* Goals Section */}
        <section className="flex flex-col flex-1 items-start gap-4">
          <h2 className="text-2xl font-bold text-gray-800">🏆 Current Goals</h2>
          <div className="flex flex-col flex-1 gap-2 p-4 bg-white rounded shadow">
            <div className="flex flex-col gap-1  w-full">
              {goals.length > 0 ? goals.map(goal => (
                <div key={goal.id} className="flex flex-col p-2 min-w-sm">
                  <Link to={`/goals/${goal.id}`} className=''>
                    <h4 className="font-semibold text-gray-800 hover:underline">{goal.name}</h4>
                  </Link>
                  <p className="text-sm text-gray-500">{goal.description}</p>
                </div>
              )) : (
                <div className="text-gray-500 w-full">No active goals yet! Start one 🚀</div>
              )}
            </div>
            {goals?.length < 3 ? 
              <Link to="/goals/new" className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-center w-xs">
                  + Create Goal
              </Link>
              : <div className="text-gray-500 w-full">You have reached the maximum number of goals. Please complete or delete one to create a new goal.</div>
            }
          </div>
        </section>

        {/* Daily Streak Section */}
        <section className="flex-1">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">🔥 Daily Streak</h2>
          <DailyStreakChart />
        </section>
      </div>

      {/* Journal Calendar */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">🗓 Your Journal Calendar</h2>
        <Calendar journalDates={journalDates}/>
      </section>

    </div>
  );
}
