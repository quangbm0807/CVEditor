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

    return [cv, updateCV];
};