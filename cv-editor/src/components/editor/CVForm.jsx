// src/components/editor/CVForm.
import React, { useState } from 'react';
import { Input } from "../shared/Input";
import { ImageUploader } from "./ImageUploader";
import { SectionManager } from './SectionManager';
import { Button } from '../shared/Button';
import { validateEmail, validatePhone } from '../utils/pdfUtils';

export const CVForm = ({ data, onChange, onAddSection, onUpdateSection, onDeleteSection }) => {
    const [errors, setErrors] = useState({});

    const handlePersonalInfoChange = (field, value) => {
        // Validate fields
        if (field === 'email' && value && !validateEmail(value)) {
            setErrors(prev => ({ ...prev, email: 'Email không hợp lệ' }));
        } else if (field === 'phone' && value && !validatePhone(value)) {
            setErrors(prev => ({ ...prev, phone: 'Số điện thoại không hợp lệ' }));
        } else {
            // Clear error if field was previously in error
            if (errors[field]) {
                setErrors(prev => {
                    const newErrors = { ...prev };
                    delete newErrors[field];
                    return newErrors;
                });
            }
        }

        onChange({
            ...data,
            personalInfo: {
                ...data.personalInfo,
                [field]: value
            }
        });
    };

    const handleSectionsChange = (newSections) => {
        onChange({
            ...data,
            sections: newSections
        });
    };

    // Add a new empty section with default structure for the type
    const handleAddSection = (sectionType, title) => {
        if (onAddSection) {
            onAddSection(sectionType, title);
        } else {
            const newSection = {
                id: `section-${Date.now()}`,
                type: sectionType,
                title: title || getDefaultTitleForType(sectionType),
                items: []
            };

            handleSectionsChange([
                ...(data.sections || []),
                newSection
            ]);
        }
    };

    return (
        <div className="space-y-6">
            <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-medium mb-4">Thông tin cá nhân</h2>
                <div className="space-y-4">
                    <ImageUploader
                        value={data.personalInfo.profileImage}
                        onChange={(value) => handlePersonalInfoChange('profileImage', value)}
                    />
                    <Input
                        label="Họ và tên"
                        value={data.personalInfo.fullName || ''}
                        onChange={(e) => handlePersonalInfoChange('fullName', e.target.value)}
                    />
                    <Input
                        label="Chức danh"
                        value={data.personalInfo.title || ''}
                        onChange={(e) => handlePersonalInfoChange('title', e.target.value)}
                    />
                    <Input
                        label="Email"
                        type="email"
                        value={data.personalInfo.email || ''}
                        onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                        error={errors.email}
                    />
                    <Input
                        label="Số điện thoại"
                        value={data.personalInfo.phone || ''}
                        onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
                        error={errors.phone}
                    />
                    <Input
                        label="Địa chỉ"
                        value={data.personalInfo.address || ''}
                        onChange={(e) => handlePersonalInfoChange('address', e.target.value)}
                    />
                </div>
            </div>

            {/* Sections */}
            <div className="bg-white shadow rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-medium">Nội dung CV</h2>
                </div>

                <SectionManager
                    sections={data.sections || []}
                    onChange={handleSectionsChange}
                    onAddSection={handleAddSection}
                    onUpdateSection={onUpdateSection}
                    onDeleteSection={onDeleteSection}
                />
            </div>
        </div>
    );
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