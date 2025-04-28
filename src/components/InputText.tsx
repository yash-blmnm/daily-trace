type InputTextProps = {
    label?: string;
    placeholder: string;
    value?: string;
    required?: boolean;
    className?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputText: React.FC<InputTextProps> = ({ label, placeholder, value, required, className, onChange }) => {

    const inputClass = `shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${className}`;
    return (
        <div className="my-1">
            <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor={label}>
                {label}
            </label>
            <input
                type="text"
                id={label}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                className={inputClass}
            />
        </div>
    );
};
export default InputText;