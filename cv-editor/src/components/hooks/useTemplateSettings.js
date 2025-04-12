import { useState, useEffect } from 'react';
import { loadFromLocalStorage, saveToLocalStorage } from '../utils/storage';

export const useTemplateSettings = (templateId) => {
    const storageKey = `template_settings_${templateId}`;

    const [settings, setSettings] = useState(() => {
        const savedSettings = loadFromLocalStorage(storageKey);
        return savedSettings || getDefaultSettings(templateId);
    });

    useEffect(() => {
        saveToLocalStorage(storageKey, settings);
    }, [settings, storageKey]);

    const updateSettings = (newSettings) => {
        setSettings(prevSettings => ({
            ...prevSettings,
            ...newSettings
        }));
    };

    return {
        settings,
        updateSettings
    };
};
const getDefaultSettings = (templateId) => {
    switch (templateId) {
        case 'template1':
            return {
                fontFamily: 'Arial',
                primaryColor: '#0ea5e9',
                secondaryColor: '#f0f9ff',
                fontSize: 'medium'
            };
        case 'template2':
            return {
                fontFamily: 'Roboto',
                primaryColor: '#0369a1',
                secondaryColor: '#e0f2fe',
                fontSize: 'medium',
                columnRatio: '1:2'
            };
        case 'template3':
            return {
                fontFamily: 'Helvetica',
                primaryColor: '#075985',
                secondaryColor: '#bae6fd',
                fontSize: 'medium',
                columnRatio: '3:5:4'
            };
        default:
            return {
                fontFamily: 'Arial',
                primaryColor: '#0ea5e9',
                secondaryColor: '#f0f9ff',
                fontSize: 'medium'
            };
    }
};
