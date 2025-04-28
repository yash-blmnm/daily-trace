// src/components/Calendar.tsx
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay } from 'date-fns';

interface CalendarProps {
  journalDates: string[]; // ["2025-04-26", "2025-04-27"]
  height?: number; // Height of the calendar in pixels
}

export default function Calendar({ journalDates, height }: CalendarProps) {
  const navigate = useNavigate();
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const renderHeader = () => (
    <div className="flex justify-between items-center mb-4">
      <button onClick={handlePrevMonth} className="text-xl">&lt;</button>
      <h2 className="text-xl font-bold">{format(currentMonth, 'MMMM yyyy')}</h2>
      <button onClick={handleNextMonth} className="text-xl">&gt;</button>
    </div>
  );

  const renderDays = () => {
    const days = [];
    const dateFormat = "EEE";
    const startDate = startOfWeek(currentMonth, { weekStartsOn: 0 });

    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} className="text-center font-semibold">
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

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, 'yyyy-MM-dd');
        const cloneDay = day;
        const hasJournal = journalDates.includes(formattedDate);

        days.push(
          <div
            key={day.toString()}
            className={`p-2 h-10 border text-center cursor-pointer hover:bg-indigo-100
              ${!isSameMonth(day, monthStart) ? 'text-gray-400' : ''}
              ${isSameDay(day, new Date()) ? 'bg-indigo-200' : ''}`}
            onClick={() => hasJournal && navigate(`/journal/${formattedDate}`)}
          >
            <div>{format(day, 'd')}</div>
            {hasJournal && <div className="w-2 h-2 mx-auto rounded-full bg-indigo-500 mt-1"></div>}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }
    return <div>{rows}</div>;
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
}
