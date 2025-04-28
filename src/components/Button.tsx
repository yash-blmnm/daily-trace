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
        buttonClass += ' bg-blue-500 text-white rounded';
    } else if (varient === 'secondary') {
        buttonClass += ' text-blue-500 border border-blue-500 rounded';
    } else if (varient === 'danger') {
        buttonClass += ' bg-red-500 text-white rounded';
    } else {
        buttonClass += ' bg-gray-200 text-gray-800 rounded';
    }

    buttonClass += ` ${className ? className : ''}`;
    
    return (
        <button type={type} className={buttonClass} onClick={onClick}>
            {children}
        </button>
    );
}
export default Button;