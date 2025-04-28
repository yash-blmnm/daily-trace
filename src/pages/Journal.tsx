// src/pages/JournalPage.tsx
import { useEffect, useState } from 'react';
import { supabase } from '../lib/dBClient';

export default function JournalPage() {
  const [goalActions, setGoalActions] = useState<any[]>([]);
  const [dailyTodos, setDailyTodos] = useState<any[]>([]);
  const [reflection, setReflection] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJournalData() {
      setLoading(true);

      const { data: goalsData } = await supabase
        .from('actions')
        .select('*')
        .eq('isCompleted', false)
        .limit(5);

      const { data: todosData } = await supabase
        .from('daily_actions')
        .select('*')
        .eq('date', new Date().toISOString().split('T')[0]);

      const { data: reflectionData } = await supabase
        .from('reflections')
        .select('reflection_context')
        .eq('date', new Date().toISOString().split('T')[0])
        .single();

      setGoalActions(goalsData || []);
      setDailyTodos(todosData || []);
      setReflection(reflectionData?.reflection_context || '');
      setLoading(false);
    }

    fetchJournalData();
  }, []);

  async function handleSaveReflection() {
    const today = new Date().toISOString().split('T')[0];

    const { data, error } = await supabase
      .from('reflections')
      .upsert([{ date: today, reflection_context: reflection }], { onConflict: 'date' });

    if (error) {
      alert('Error saving reflection: ' + error.message);
    } else {
      alert('Reflection saved! 📝');
    }
  }

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6">

      {/* Left Side */}
      <div className="md:w-1/2 space-y-6">
        {/* Goals Section */}
        <div>
          <h2 className="text-2xl font-bold mb-2">🎯 Goal Actions</h2>
          {goalActions.length > 0 ? (
            goalActions.map((action) => (
              <div key={action.id} className="p-4 bg-white d rounded shadow">
                <h4 className="text-lg font-semibold">{action.name}</h4>
              </div>
            ))
          ) : (
            <div className="p-4 bg-white  rounded shadow text-gray-500">
              No goal actions pending. 🚀 Create a new goal!
            </div>
          )}
        </div>

        {/* Daily Todos Section */}
        <div>
          <h2 className="text-2xl font-bold mb-2">📝 Today's Actions</h2>
          {dailyTodos.length > 0 ? (
            dailyTodos.map((todo) => (
              <div key={todo.id} className="p-4 bg-white rounded shadow">
                <h4 className="text-lg font-semibold">{todo.name}</h4>
              </div>
            ))
          ) : (
            <div className="p-4 bg-white rounded shadow text-gray-500">
              Start your day with a small task 🌱
            </div>
          )}
        </div>

        {/* Motivation Quote */}
        <div className="p-4 bg-indigo-100 rounded shadow text-center mt-6">
          ✨ "One small positive thought can change your whole day." ✨
        </div>
      </div>

      {/* Right Side - Journal Reflection */}
      <div className="md:w-1/2 space-y-6">
        <h2 className="text-2xl font-bold mb-2">📖 Today's Reflection</h2>

        <textarea
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          placeholder="Write about your day, thoughts, learnings..."
          className="w-full h-[400px] p-4 rounded shadow bg-white text-gray-900 resize-none"
        />

        <button
          onClick={handleSaveReflection}
          className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Save Reflection
        </button>
      </div>

    </div>
  );
}
