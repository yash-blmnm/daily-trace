import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useAuthStore } from '../store/authStore';
import { useJournalStore } from '../store/journalStore';
import { useGoalStore } from '../store/goalStore';
import { ActionObject, Mood, JournalObject, GoalObject } from '../types/journalTypes';
import { format, isValid, parseISO } from 'date-fns';

type JournalParams = {
  date?: string;
};

export default function JournalPage() {
  const { date } = useParams<JournalParams>();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const { handleCreateJournalEntry, handleUpdateJournalEntry, handleFetchJournalEntriesByUser } = useJournalStore();
  const { handleFetchAllGoalsByUser } = useGoalStore();
  
  const [journalEntry, setJournalEntry] = useState<JournalObject | null>(null);
  const [goals, setGoals] = useState<GoalObject[]>([]);
  const [actions, setActions] = useState<ActionObject[]>([]);
  const [newAction, setNewAction] = useState('');
  const [reflectionText, setReflectionText] = useState('');
  const [selectedMood, setSelectedMood] = useState<Mood>(Mood.Happy);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const today = new Date().toISOString().split('T')[0];
  
  // Validate date parameter and set date flags
  const isToday = date === today;
  const isFutureDate = date ? date > today : false;

  useEffect(() => {
    if (!date || !isValid(parseISO(date))) {
      navigate('/dashboard');
      return;
    }
  }, [date, navigate]);

  useEffect(() => {
    async function fetchData() {
      if (!user || !date) return;
      
      setLoading(true);
      
      // Fetch journal entry
      const { data: entries } = await handleFetchJournalEntriesByUser(user.id);
      const existingEntry = entries?.find(entry => entry.date === date);
      
      if (existingEntry) {
        setJournalEntry(existingEntry);
        setActions(existingEntry.actions || []);
        setReflectionText(existingEntry.reflectionText || '');
        setSelectedMood(existingEntry.mood || Mood.Happy);
      }

      // Fetch goals and their actions
      const { data: userGoals } = await handleFetchAllGoalsByUser(user.id);
      if (userGoals) {
        setGoals(userGoals);
      }
      
      setLoading(false);
    }

    fetchData();
  }, [user, date, handleFetchJournalEntriesByUser, handleFetchAllGoalsByUser]);

  const handleAddAction = () => {
    if (!newAction.trim()) return;
    if (!isToday && !isFutureDate) {
      setError("Cannot add actions to past entries");
      return;
    }
    
    const newActionObj: ActionObject = {
      goalId: '',
      name: newAction.trim(),
      is_completed: false
    };
    
    setActions(prev => [...prev, newActionObj]);
    setNewAction('');
    setError('');
  };

  const toggleAction = (index: number) => {
    if (!isToday) return;
    
    setActions(prev => prev.map((action, i) => 
      i === index ? { ...action, is_completed: !action.is_completed } : action
    ));
  };

  const handleSave = async () => {
    if (!user || !date) return;

    const journalData = {
      userId: user.id,
      date,
      actions,
      reflectionText: reflectionText.trim(),
      mood: selectedMood
    };

    try {
      setError('');
      if (journalEntry?.id) {
        await handleUpdateJournalEntry(journalEntry.id, journalData);
      } else {
        await handleCreateJournalEntry(journalData);
      }
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to save journal entry');
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="text-teal-600 animate-pulse">Loading journal entry...</div>
      </div>
    );
  }

  if (!date || !isValid(parseISO(date))) {
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-teal-600">
          Journal Entry for {format(new Date(date), 'MMMM d, yyyy')}
        </h2>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Side - Actions */}
        <div className="md:w-1/2 space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">🎯 Goal Actions</h3>
            
            {/* Goal Actions Section */}
            <div className="space-y-4 mb-6">
              {goals.map((goal) => (
                <div key={goal.id} className="space-y-2">
                  <h4 className="font-medium text-teal-600">{goal.name}</h4>
                  {goal.actions.map((actionText, idx) => {
                    const existingAction = actions.find(a => a.goalId === goal.id && a.name === actionText);
                    return (
                      <div key={idx} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                        <input
                          type="checkbox"
                          checked={existingAction?.is_completed || false}
                          onChange={() => {
                            if (existingAction) {
                              // Toggle existing action
                              setActions(prev => prev.map(a => 
                                a === existingAction 
                                  ? { ...a, is_completed: !a.is_completed }
                                  : a
                              ));
                            } else {
                              // Add new action
                              setActions(prev => [...prev, {
                                goalId: goal.id,
                                name: actionText,
                                is_completed: true
                              }]);
                            }
                          }}
                          className="w-5 h-5 text-teal-600"
                          disabled={!isToday}
                        />
                        <span className={existingAction?.is_completed ? 'line-through text-gray-500' : ''}>
                          {actionText}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            <h3 className="text-xl font-semibold mb-4">📝 Additional Actions</h3>
            
            {/* Add new action */}
            {(isToday || isFutureDate) && (
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={newAction}
                  onChange={(e) => setNewAction(e.target.value)}
                  placeholder="Add a new action..."
                  className="flex-1 p-2 border rounded"
                />
                <button
                  onClick={handleAddAction}
                  className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
                >
                  Add
                </button>
              </div>
            )}

            {/* Custom Actions list */}
            <div className="space-y-2">
              {actions.filter(action => !action.goalId).map((action, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                  <input
                    type="checkbox"
                    checked={action.is_completed}
                    onChange={() => toggleAction(index)}
                    className="w-5 h-5 text-teal-600"
                    disabled={!isToday}
                  />
                  <span className={action.is_completed ? 'line-through text-gray-500' : ''}>
                    {action.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Reflection and Mood */}
        <div className="md:w-1/2 space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">📖 Reflection</h3>
            
            {/* Mood Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How are you feeling today?
              </label>
              <div className="grid grid-cols-4 gap-2">
                {Object.values(Mood).map((mood) => (
                  <button
                    key={mood}
                    onClick={() => isToday && setSelectedMood(mood)}
                    className={`p-2 rounded ${
                      selectedMood === mood
                        ? 'bg-teal-100 border-2 border-teal-600'
                        : 'bg-gray-50 hover:bg-gray-100'
                    } ${!isToday ? 'cursor-not-allowed' : ''}`}
                    disabled={!isToday}
                  >
                    {mood} {getMoodEmoji(mood)}
                  </button>
                ))}
              </div>
            </div>

            {/* Reflection Text */}
            <textarea
              value={reflectionText}
              onChange={(e) => setReflectionText(e.target.value)}
              placeholder="Write about your day, thoughts, learnings..."
              className="w-full h-[300px] p-4 border rounded resize-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              disabled={!isToday}
            />
          </div>

          {error && (
            <div className="text-red-600 bg-red-50 p-4 rounded">
              {error}
            </div>
          )}

          <button
            onClick={handleSave}
            className="w-full px-6 py-3 bg-teal-600 text-white rounded hover:bg-teal-700 disabled:bg-gray-400"
            disabled={!isToday && !isFutureDate}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

function getMoodEmoji(mood: Mood): string {
  const moodEmojis = {
    [Mood.Happy]: '😊',
    [Mood.sad]: '😢',
    [Mood.anxious]: '😰',
    [Mood.excited]: '🤩',
    [Mood.calm]: '😌',
    [Mood.tired]: '😴',
    [Mood.stressed]: '😓',
    [Mood.motivated]: '💪'
  };
  return moodEmojis[mood] || '';
}
