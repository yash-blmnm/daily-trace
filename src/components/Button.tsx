type ButtonProps = {
    varient: 'primary' | 'secondary' | 'danger' | 'default';
    type?: 'button' | 'submit' | 'reset';
    className?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLButtonElement>) => void;
    children: React.ReactNode;  
}

function Button({ varient, type, className, children, onClick}: ButtonProps) {
    let buttonClass = ' font-bold py-2 px-4';

    if (varient === 'primary') {
        buttonClass += ' bg-teal-600 text-white rounded hover:bg-teal-700';
    } else if (varient === 'secondary') {
        buttonClass += ' text-teal-600 border border-teal-600 rounded hover:bg-teal-50';
    } else if (varient === 'danger') {
        buttonClass += ' bg-red-500 text-white rounded hover:bg-red-600';
    } else {
        buttonClass += ' bg-gray-200 text-gray-800 rounded hover:bg-gray-300';
    }

    buttonClass += ` ${className ? className : ''}`;
    
    return (
        <button type={type} className={buttonClass} onClick={onClick}>
            {children}
        </button>
    );
}
export default Button;