// src/components/hooks/useCV.js
import { useState, useEffect } from 'react';
import { loadFromLocalStorage, saveToLocalStorage } from '../utils/storage';

// Default empty CV structure
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
        const savedCV = loadFromLocalStorage('cv_editor_data');
        return savedCV || DEFAULT_CV;
    });

    useEffect(() => {
        saveToLocalStorage('cv_editor_data', cv);
    }, [cv]);

    // Update the entire CV or parts of it
    const updateCV = (newData) => {
        setCV(prev => ({
            ...prev,
            ...newData
        }));
    };

    // Reset CV to default empty state
    const resetCV = () => {
        if (window.confirm('Are you sure you want to reset your CV? All data will be lost.')) {
            setCV(DEFAULT_CV);
        }
    };

    // Add a new section
    const addSection = (sectionType, title) => {
        const newSection = {
            id: `section-${Date.now()}`,
            type: sectionType,
            title: title || getDefaultTitleForType(sectionType),
            items: []
        };

        setCV(prev => ({
            ...prev,
            data: {
                ...prev.data,
                sections: [
                    ...(prev.data.sections || []),
                    newSection
                ]
            }
        }));

        return newSection.id;
    };

    // Update a section
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

    // Delete a section
    const deleteSection = (sectionId) => {
        setCV(prev => ({
            ...prev,
            data: {
                ...prev.data,
                sections: prev.data.sections.filter(section => section.id !== sectionId)
            }
        }));
    };

    // Add an item to a section
    const addSectionItem = (sectionId, item) => {
        setCV(prev => {
            const sections = [...prev.data.sections];
            const sectionIndex = sections.findIndex(s => s.id === sectionId);

            if (sectionIndex !== -1) {
                sections[sectionIndex] = {
                    ...sections[sectionIndex],
                    items: [...(sections[sectionIndex].items || []), item]
                };
            }

            return {
                ...prev,
                data: {
                    ...prev.data,
                    sections
                }
            };
        });
    };

    // Update an item in a section
    const updateSectionItem = (sectionId, itemIndex, updatedItem) => {
        setCV(prev => {
            const sections = [...prev.data.sections];
            const sectionIndex = sections.findIndex(s => s.id === sectionId);

            if (sectionIndex !== -1 && sections[sectionIndex].items && sections[sectionIndex].items[itemIndex]) {
                const items = [...sections[sectionIndex].items];
                items[itemIndex] = {
                    ...items[itemIndex],
                    ...updatedItem
                };

                sections[sectionIndex] = {
                    ...sections[sectionIndex],
                    items
                };
            }

            return {
                ...prev,
                data: {
                    ...prev.data,
                    sections
                }
            };
        });
    };

    // Delete an item from a section
    const deleteSectionItem = (sectionId, itemIndex) => {
        setCV(prev => {
            const sections = [...prev.data.sections];
            const sectionIndex = sections.findIndex(s => s.id === sectionId);

            if (sectionIndex !== -1 && sections[sectionIndex].items) {
                const items = sections[sectionIndex].items.filter((_, idx) => idx !== itemIndex);

                sections[sectionIndex] = {
                    ...sections[sectionIndex],
                    items
                };
            }

            return {
                ...prev,
                data: {
                    ...prev.data,
                    sections
                }
            };
        });
    };

    // Move a section up or down in the list
    const moveSection = (sectionId, direction) => {
        setCV(prev => {
            const sections = [...prev.data.sections];
            const currentIndex = sections.findIndex(s => s.id === sectionId);

            // If section not found or trying to move out of bounds, return unchanged
            if (
                currentIndex === -1 ||
                (direction === 'up' && currentIndex === 0) ||
                (direction === 'down' && currentIndex === sections.length - 1)
            ) {
                return prev;
            }

            // Calculate target index
            const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;

            // Swap sections
            [sections[currentIndex], sections[targetIndex]] = [sections[targetIndex], sections[currentIndex]];

            return {
                ...prev,
                data: {
                    ...prev.data,
                    sections
                }
            };
        });
    };

    return {
        cv,
        updateCV,
        resetCV,
        addSection,
        updateSection,
        deleteSection,
        addSectionItem,
        updateSectionItem,
        deleteSectionItem,
        moveSection
    };
};

// Helper function to get default title for section type
const getDefaultTitleForType = (type) => {
    const titles = {
        experience: 'Kinh nghiệm làm việc',
        education: 'Học vấn',
        projects: 'Dự án',
        skills: 'Kỹ năng',
        certifications: 'Chứng chỉ',
        languages: 'Ngôn ngữ',
        achievements: 'Thành tích',
        interests: 'Sở thích',
    };

    return titles[type] || 'Phần mới';
};