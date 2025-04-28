type InputTextAreaProps = {
    label?: string;
    placeholder: string;
    value?: string;
    required?: boolean;
    resizable?: boolean;
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const InputTextArea: React.FC<InputTextAreaProps> = ({ 
    label, 
    placeholder, 
    value, 
    required, 
    resizable, 
    onChange 
}) => {
    return (
        <div className="mb-4">
            {label && (
                <label className="block text-gray-700 text-sm font-semibold mb-1" htmlFor={label}>
                    {label}
                </label>
            )}
            <textarea
                id={label}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                required={required}
                rows={4}
                style={{ resize: (resizable ? 'vertical' : 'none') }}
            />
        </div>
    );
};

export default InputTextArea;