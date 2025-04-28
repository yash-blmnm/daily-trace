// src/components/Calendar.tsx
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay } from 'date-fns';
import { JournalObject, Mood } from '../types/journalTypes';

interface CalendarProps {
  journalEntries: JournalObject[];
}

type WeekRow = JSX.Element[];

export default function Calendar({ journalEntries }: CalendarProps) {
  const navigate = useNavigate();
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const getMoodColor = (mood: Mood): string => {
    const moodColors = {
      [Mood.Happy]: 'bg-green-400',
      [Mood.sad]: 'bg-blue-400',
      [Mood.anxious]: 'bg-yellow-400',
      [Mood.excited]: 'bg-purple-400',
      [Mood.calm]: 'bg-teal-400',
      [Mood.tired]: 'bg-gray-400',
      [Mood.stressed]: 'bg-red-400',
      [Mood.motivated]: 'bg-orange-400'
    };
    return moodColors[mood] || 'bg-gray-400';
  };

  const renderDays = () => {
    const days = [];
    const dateFormat = "EEE";
    const startDate = startOfWeek(currentMonth, { weekStartsOn: 0 });

    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} className="text-center font-semibold text-gray-600">
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="grid grid-cols-7 mb-2">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });

    const rows: WeekRow[] = [];
    let days: WeekRow = [];
    let day = startDate;

    const today = new Date().toISOString().split('T')[0];

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const formattedDate = format(day, 'yyyy-MM-dd');
        const journalEntry = journalEntries.find(entry => entry.date === formattedDate);
        const isInPast = formattedDate < today;

        days.push(
          <div
            key={formattedDate}
            className={`p-2 h-10 border text-center cursor-pointer transition-colors duration-200
              ${!isSameMonth(day, monthStart) ? 'text-gray-400 hover:bg-gray-50' : ''}
              ${isSameDay(day, new Date()) ? 'bg-teal-50' : ''}
              ${isInPast && !journalEntry ? 'cursor-not-allowed bg-gray-50' : ''}`}
            onClick={() => {
              if (isInPast && !journalEntry) return;
              navigate(`/journal/${formattedDate}`);
            }}
            title={journalEntry ? `Mood: ${journalEntry.mood}` : undefined}
          >
            <div>{format(day, 'd')}</div>
            {journalEntry && (
              <div 
                className={`w-2 h-2 mx-auto rounded-full ${getMoodColor(journalEntry.mood)} mt-1`}
                title={`Mood: ${journalEntry.mood}`}
              />
            )}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(days);
      days = [];
    }
    return <div className="space-y-1">{rows.map((week, i) => (
      <div key={i} className="grid grid-cols-7">{week}</div>
    ))}</div>;
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={handlePrevMonth} 
          className="text-xl text-teal-600 hover:text-teal-700 transition-colors"
          aria-label="Previous month"
        >
          &lt;
        </button>
        <h2 className="text-xl font-bold text-teal-600">{format(currentMonth, 'MMMM yyyy')}</h2>
        <button 
          onClick={handleNextMonth} 
          className="text-xl text-teal-600 hover:text-teal-700 transition-colors"
          aria-label="Next month"
        >
          &gt;
        </button>
      </div>
      {renderDays()}
      {renderCells()}
      
      {/* Mood Legend */}
      <div className="mt-4 border-t pt-4">
        <h4 className="text-sm font-semibold mb-2">Mood Legend:</h4>
        <div className="grid grid-cols-4 gap-2 text-xs">
          {Object.values(Mood).map(mood => (
            <div key={mood} className="flex items-center gap-1">
              <div className={`w-3 h-3 rounded-full ${getMoodColor(mood)}`} />
              <span>{mood}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
