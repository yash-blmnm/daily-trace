
interface DatePickerProps {
  label?: string;
  value: string;
  className?: string;
  onChange: (date: string) => void;
}

function DatePicker({ label = 'Select Date', value, className, onChange }: DatePickerProps) {

  const inputClassName = `w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-700 ${className}`;

  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-semibold text-gray-700">{label}</label>}
      
      <div className="relative">
        <input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={inputClassName}
        />
      </div>
    </div>
  );
}

export default DatePicker;
