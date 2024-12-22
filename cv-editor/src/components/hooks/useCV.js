// components/hooks/useCV.js
import { useState, useEffect } from 'react';
import { loadFromLocalStorage, saveToLocalStorage } from '../utils/storage';

export const useCV = () => {
    const [cv, setCV] = useState(() => loadFromLocalStorage() || {
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