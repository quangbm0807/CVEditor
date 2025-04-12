// components/hooks/useCV.js - Fixed
import { useState, useEffect } from 'react';
import { loadFromLocalStorage, saveToLocalStorage } from '../utils/storage';

// Default CV structure
const DEFAULT_CV = {
    templateId: 'template1',
    data: {
        personalInfo: {
            fullName: '',
            title: '',
            email: '',
            phone: '',
            address: '',
            profileImage: '',
        },
        sections: []
    }
};

export const useCV = () => {
    const [cv, setCV] = useState(() => {
        // Try to load from localStorage
        const savedData = loadFromLocalStorage();

        // If we have saved data and it's properly structured, use it
        if (savedData && savedData.data && savedData.templateId) {
            return savedData;
        }

        // Otherwise use the default
        return DEFAULT_CV;
    });

    useEffect(() => {
        saveToLocalStorage(cv);
    }, [cv]);

    const updateCV = (newData) => {
        setCV(prev => ({
            ...prev,
            ...newData
        }));
    };

    const addSection = (sectionType) => {
        setCV(prev => ({
            ...prev,
            data: {
                ...prev.data,
                sections: [
                    ...(prev.data.sections || []),
                    {
                        id: `section-${Date.now()}`,
                        type: sectionType,
                        title: '', // Add default title
                        items: []
                    }
                ]
            }
        }));
    };

    const updateSection = (sectionId, updatedData) => {
        setCV(prev => ({
            ...prev,
            data: {
                ...prev.data,
                sections: prev.data.sections.map(section =>
                    section.id === sectionId
                        ? { ...section, ...updatedData }
                        : section
                )
            }
        }));
    };

    const deleteSection = (sectionId) => {
        setCV(prev => ({
            ...prev,
            data: {
                ...prev.data,
                sections: prev.data.sections.filter(section => section.id !== sectionId)
            }
        }));
    };

    return {
        cv,
        updateCV,
        addSection,
        updateSection,
        deleteSection
    };
};