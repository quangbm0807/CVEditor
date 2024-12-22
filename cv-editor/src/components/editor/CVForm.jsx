// components/editor/CVForm.jsx
import React from 'react';
import { Input } from "../shared/Input";
import { ImageUploader } from "./ImageUploader";
import { SectionManager } from './SectionManager';

export const CVForm = ({ data, onChange }) => {
    const handlePersonalInfoChange = (field, value) => {
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
                        value={data.personalInfo.fullName}
                        onChange={(e) => handlePersonalInfoChange('fullName', e.target.value)}
                    />
                    <Input
                        label="Chức danh"
                        value={data.personalInfo.title}
                        onChange={(e) => handlePersonalInfoChange('title', e.target.value)}
                    />
                    <Input
                        label="Email"
                        type="email"
                        value={data.personalInfo.email}
                        onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                    />
                    <Input
                        label="Số điện thoại"
                        value={data.personalInfo.phone}
                        onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
                    />
                    <Input
                        label="Địa chỉ"
                        value={data.personalInfo.address}
                        onChange={(e) => handlePersonalInfoChange('address', e.target.value)}
                    />
                </div>
            </div>

            {/* Sections */}
            <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-medium mb-4">Nội dung CV</h2>
                <SectionManager
                    sections={data.sections || []}
                    onChange={handleSectionsChange}
                />
            </div>
        </div>
    );
};