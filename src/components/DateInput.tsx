interface DatePickerProps {
  label?: string;
  value: string;
  className?: string;
  min?: string;
  onChange: (date: string) => void;
}

function DatePicker({ label = 'Select Date', value, className, min, onChange }: DatePickerProps) {
  const baseClassName = "w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 hover:border-teal-300";
  const inputClassName = `${baseClassName} ${className || ''}`;

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-semibold text-gray-700">{label}</label>
      )}
      
      <div className="relative">
        <input
          type="date"
          value={value}
          min={min}
          onChange={(e) => onChange(e.target.value)}
          className={inputClassName}
        />
      </div>
    </div>
  );
}

export default DatePicker;
