export const Button = ({ children, onClick, variant = 'primary', ...props }) => {
    const baseClasses = 'px-4 py-2 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2';
    const variants = {
        primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
        secondary: 'bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-500',
    };

    return (
        <button
            className={`${baseClasses} ${variants[variant]}`}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
};
