type InputTextProps = {
    label?: string;
    placeholder: string;
    value?: string;
    required?: boolean;
    className?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputText: React.FC<InputTextProps> = ({ label, placeholder, value, required, className, onChange }) => {
    const baseInputClass = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500";
    const inputClassName = `${baseInputClass} ${className || ''}`;

    return (
        <div className="my-1">
            {label && (
                <label className="block text-gray-700 text-sm font-semibold mb-1" htmlFor={label}>
                    {label}
                </label>
            )}
            <input
                type="text"
                id={label}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                className={inputClassName}
            />
        </div>
    );
};
export default InputText;