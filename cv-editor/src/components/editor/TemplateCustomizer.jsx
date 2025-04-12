import React from 'react';
import { useTemplateSettings } from '../hooks/useTemplateSettings';

export const TemplateCustomizer = ({ templateId }) => {
    const { settings, updateSettings } = useTemplateSettings(templateId);

    const handleColorChange = (colorType, value) => {
        updateSettings({ [colorType]: value });
    };

    const handleFontChange = (e) => {
        updateSettings({ fontFamily: e.target.value });
    };

    const handleFontSizeChange = (e) => {
        updateSettings({ fontSize: e.target.value });
    };

    return (
        <div className="bg-white shadow rounded-lg p-6 mb-6">
            <h2 className="text-lg font-medium mb-4">Tùy chỉnh mẫu</h2>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Màu chính
                    </label>
                    <div className="flex items-center">
                        <input
                            type="color"
                            value={settings.primaryColor}
                            onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                            className="w-8 h-8 mr-2 rounded"
                        />
                        <input
                            type="text"
                            value={settings.primaryColor}
                            onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                            className="rounded-md border-gray-300 shadow-sm sm:text-sm w-24"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Màu phụ
                    </label>
                    <div className="flex items-center">
                        <input
                            type="color"
                            value={settings.secondaryColor}
                            onChange={(e) => handleColorChange('secondaryColor', e.target.value)}
                            className="w-8 h-8 mr-2 rounded"
                        />
                        <input
                            type="text"
                            value={settings.secondaryColor}
                            onChange={(e) => handleColorChange('secondaryColor', e.target.value)}
                            className="rounded-md border-gray-300 shadow-sm sm:text-sm w-24"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Font chữ
                    </label>
                    <select
                        value={settings.fontFamily}
                        onChange={handleFontChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    >
                        <option value="Arial">Arial</option>
                        <option value="Helvetica">Helvetica</option>
                        <option value="Times New Roman">Times New Roman</option>
                        <option value="Roboto">Roboto</option>
                        <option value="Open Sans">Open Sans</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Cỡ chữ
                    </label>
                    <select
                        value={settings.fontSize}
                        onChange={handleFontSizeChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    >
                        <option value="small">Nhỏ</option>
                        <option value="medium">Trung bình</option>
                        <option value="large">Lớn</option>
                    </select>
                </div>
            </div>
        </div>
    );
};