// components/editor/TemplateSelector.jsx - Fixed
import React from "react";
import { CV_TEMPLATES } from "../constants/templates";

export const TemplateSelector = ({ value, onChange }) => {
    // Default to template1 if value is invalid
    const selectedTemplate = CV_TEMPLATES[value] ? value : 'template1';

    return (
        <div className="grid grid-cols-2 gap-4">
            {Object.values(CV_TEMPLATES).map(template => (
                <div
                    key={template.id}
                    className={`
                        cursor-pointer rounded-lg border-2 p-2
                        ${template.id === selectedTemplate ? 'border-primary-500' : 'border-gray-200'}
                        hover:border-primary-300 transition-colors
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