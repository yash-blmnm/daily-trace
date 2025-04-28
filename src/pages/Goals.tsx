import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { GoalObject, NewGoalObject } from '../types/journalTypes';
import { useGoalStore } from '../store/goalStore';
import { useAuthStore } from '../store/authStore';
import InputText from '../components/InputText';
import InputTextArea from '../components/InputTextArea';
import { RiDeleteBinLine } from "react-icons/ri";
import Button from '../components/Button';
import DatePicker from '../components/DateInput';

interface ActionItem {
  id: number;
  text: string;
}

export default function GoalForm() {
  const { id } = useParams<{ id?: string }>();
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  const { handleCreateGoal, handleFetchGoalsById, handleUpdateGoal } = useGoalStore();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [actions, setActions] = useState<ActionItem[]>([]);
  const [warning, setWarning] = useState('');
  const [dateError, setDateError] = useState('');

  useEffect(() => {
    if (isEditMode && id) {
      (async () => {
        const { data }: { data?: GoalObject | undefined | null } = await handleFetchGoalsById(id);
        if (data) {
          setName(data?.name);
          setDescription(data?.description);
          setStartDate(data?.startDate);
          setTargetDate(data?.targetDate);
          setActions(data?.actions.map((text: string, idx: number) => ({ id: idx, text })));
        }
      })();
    }
  }, [id, isEditMode, handleFetchGoalsById]);

  const validateDates = (start: string, target: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const startDateObj = new Date(start);
    const targetDateObj = new Date(target);

    if (startDateObj < today) {
      setDateError('Start date cannot be in the past');
      return false;
    }

    if (targetDateObj <= startDateObj) {
      setDateError('Target date must be after start date');
      return false;
    }

    setDateError('');
    return true;
  };

  const handleStartDateChange = (date: string) => {
    setStartDate(date);
    if (targetDate) {
      validateDates(date, targetDate);
    }
  };

  const handleTargetDateChange = (date: string) => {
    setTargetDate(date);
    if (startDate) {
      validateDates(startDate, date);
    }
  };

  const handleAddAction = () => {
    if (actions.length >= 3) {
      setWarning('⚠️ You can only add up to 3 actions for a goal.');
      return;
    }
    const newAction: ActionItem = { id: Date.now(), text: '' };
    setActions((prev) => [...prev, newAction]);
  };

  const handleUpdateAction = (id: number, value: string) => {
    setActions((prev) =>
      prev.map((action) => (action.id === id ? { ...action, text: value } : action))
    );
  };

  const handleDeleteAction = (id: number) => {
    setActions((prev) => prev.filter((action) => action.id !== id));
    setWarning(''); // clear warning when one is deleted
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !description || !startDate || !targetDate) return;

    if (!validateDates(startDate, targetDate)) {
      return;
    }

    const actionTexts = actions.map((action) => action.text).filter((text) => text.trim() !== '');

    const goalPayload: NewGoalObject = {
      userId: user?.id,
      name,
      description,
      startDate: startDate,
      targetDate: targetDate,
      actions: actionTexts,
    };

    if (isEditMode && id) {
      await handleUpdateGoal(id, goalPayload);
    } else {
      await handleCreateGoal(goalPayload);
    }

    navigate('/dashboard');
  };

  return (
    <div className="max-w-3xl min-w-2xl mx-auto p-4 text-gray-600 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl text-blue-600 font-bold mb-6">{isEditMode ? 'Edit Goal' : 'Create New Goal'}</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 space-y-4">
        <InputText 
          label='Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Goal Name"
          required={true}
        />
        <InputTextArea 
          label='Description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Goal Description"
          required={true}
          resizable={false}
        />
        <div className="flex gap-12">
          <DatePicker 
            label='Start Date'
            className='flex-1' 
            value={startDate} 
            onChange={handleStartDateChange}
            min={new Date().toISOString().split('T')[0]}
          />
          <DatePicker 
            label='Target Date'
            className='flex-1' 
            value={targetDate} 
            onChange={handleTargetDateChange}
            min={startDate || new Date().toISOString().split('T')[0]}
          />
        </div>
        {dateError && <p className="text-red-500 text-sm">{dateError}</p>}

        <div>
          <h3 className="font-semibold">Actions (up to 3)</h3>
          {warning && <p className="text-yellow-500 text-sm">{warning}</p>}
          <div className="flex flex-col items-start gap-1">
            {actions.map((action) => (
              <div key={action.id} className="flex items-center gap-8">
                <InputText
                  value={action.text}
                  onChange={(e) => handleUpdateAction(action.id, e.target.value)}
                  placeholder="Action description"
                  required={true}
                  className="border-0 border-b rounded-b-none shadow-none"
                />
                <button
                  type="button"
                  onClick={() => handleDeleteAction(action.id)}
                  className="btn btn-sm btn-error text-red-800 cursor-pointer"
                >
                  <RiDeleteBinLine size={20} />
                </button>
              </div>
            ))}
            {actions.length < 3 && (
              <button
                type="button"
                onClick={handleAddAction}
                className="btn btn-sm font-semibold btn-outline mt-2 text-blue-600"
              >
                + Add Action
              </button>
            )}
          </div>
        </div>

        <Button type="submit" varient='primary' className='w-full mt-4 mb-2'>
          {isEditMode ? 'Update Goal' : 'Create Goal'}
        </Button>
      </form>
    </div>
  );
}
