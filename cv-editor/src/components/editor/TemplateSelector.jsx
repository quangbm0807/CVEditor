import { CV_TEMPLATES } from "../constants/templates";

export const TemplateSelector = ({ value, onChange }) => {
    return (
        <div className="grid grid-cols-2 gap-4">
            {Object.values(CV_TEMPLATES).map(template => (
                <div
                    key={template.id}
                    className={`
            cursor-pointer rounded-lg border-2 p-2
            ${template.id === value ? 'border-primary-500' : 'border-gray-200'}
          `}
                    onClick={() => onChange(template.id)}
                >
                    <img
                        src={template.thumbnail}
                        alt={template.name}
                        className="w-full rounded-md"
                    />
                    <p className="mt-2 text-center font-medium">
                        {template.name}
                    </p>
                </div>
            ))}
        </div>
    );
};