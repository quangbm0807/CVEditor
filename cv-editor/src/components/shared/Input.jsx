export const Input = ({ label, error, ...props }) => {
    return (
        <div className="space-y-1">
            {label && (
                <label className="block text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}
            <input
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                {...props}
            />
            {error && (
                <p className="text-sm text-red-600">{error}</p>
            )}
        </div>
    );
};
