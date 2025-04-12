// components/editor/SectionManager.jsx
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { PlusIcon, XIcon, MenuIcon } from 'lucide-react';

const SECTION_TYPES = {
    EXPERIENCE: 'experience',
    EDUCATION: 'education',
    PROJECTS: 'projects',
    SKILLS: 'skills',
    CERTIFICATIONS: 'certifications',
    LANGUAGES: 'languages',
    ACHIEVEMENTS: 'achievements',
    INTERESTS: 'interests'
};

const SECTION_CONFIG = {
    [SECTION_TYPES.EXPERIENCE]: {
        title: 'Kinh nghiệm làm việc',
        fields: [
            { name: 'position', label: 'Vị trí', type: 'text' },
            { name: 'company', label: 'Công ty', type: 'text' },
            { name: 'startDate', label: 'Ngày bắt đầu', type: 'date' },
            { name: 'endDate', label: 'Ngày kết thúc', type: 'date' },
            { name: 'description', label: 'Mô tả công việc', type: 'textarea' },
            { name: 'achievements', label: 'Thành tích', type: 'textarea' }
        ]
    },
    [SECTION_TYPES.EDUCATION]: {
        title: 'Học vấn',
        fields: [
            { name: 'school', label: 'Trường', type: 'text' },
            { name: 'degree', label: 'Bằng cấp', type: 'text' },
            { name: 'field', label: 'Chuyên ngành', type: 'text' },
            { name: 'startDate', label: 'Ngày bắt đầu', type: 'date' },
            { name: 'endDate', label: 'Ngày kết thúc', type: 'date' },
            { name: 'gpa', label: 'GPA', type: 'text' }
        ]
    },
    [SECTION_TYPES.PROJECTS]: {
        title: 'Dự án',
        fields: [
            { name: 'name', label: 'Tên dự án', type: 'text' },
            { name: 'role', label: 'Vai trò', type: 'text' },
            { name: 'startDate', label: 'Ngày bắt đầu', type: 'date' },
            { name: 'endDate', label: 'Ngày kết thúc', type: 'date' },
            { name: 'description', label: 'Mô tả dự án', type: 'textarea' },
            { name: 'technologies', label: 'Công nghệ sử dụng', type: 'text' },
            { name: 'link', label: 'Link dự án', type: 'url' }
        ]
    },
    [SECTION_TYPES.SKILLS]: {
        title: 'Kỹ năng',
        fields: [
            { name: 'name', label: 'Kỹ năng', type: 'text' },
            { name: 'level', label: 'Mức độ thành thạo (1-100)', type: 'range' }
        ]
    },
    [SECTION_TYPES.CERTIFICATIONS]: {
        title: 'Chứng chỉ',
        fields: [
            { name: 'name', label: 'Tên chứng chỉ', type: 'text' },
            { name: 'issuer', label: 'Tổ chức cấp', type: 'text' },
            { name: 'date', label: 'Ngày cấp', type: 'date' },
            { name: 'expiry', label: 'Ngày hết hạn', type: 'date' },
            { name: 'credentialId', label: 'Mã chứng chỉ', type: 'text' }
        ]
    },
    [SECTION_TYPES.LANGUAGES]: {
        title: 'Ngôn ngữ',
        fields: [
            { name: 'language', label: 'Ngôn ngữ', type: 'text' },
            {
                name: 'proficiency', label: 'Trình độ', type: 'select', options: [
                    'Sơ cấp', 'Trung cấp', 'Cao cấp', 'Bản ngữ'
                ]
            }
        ]
    }
};

const SectionItem = ({ section, index, onDelete, onEdit }) => {
    return (
        <Draggable draggableId={section.id} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className="bg-white rounded-lg shadow mb-4 p-4"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div {...provided.dragHandleProps} className="mr-3">
                                <MenuIcon className="w-5 h-5 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-medium">{section.title}</h3>
                        </div>
                        <button
                            onClick={() => onDelete(section.id)}
                            className="text-red-500 hover:text-red-700"
                        >
                            <XIcon className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="mt-4 space-y-4">
                        {section.items?.map((item, itemIndex) => (
                            <div key={itemIndex} className="bg-gray-50 p-3 rounded">
                                {Object.entries(item).map(([key, value]) => (
                                    <div key={key} className="text-sm">
                                        <span className="font-medium">{SECTION_CONFIG[section.type]?.fields.find(f => f.name === key)?.label || key}: </span>
                                        <span>{value}</span>
                                    </div>
                                ))}
                                <div className="mt-2 flex justify-end space-x-2">
                                    <button
                                        onClick={() => onEdit(section.id, itemIndex)}
                                        className="text-sm text-blue-600 hover:text-blue-800"
                                    >
                                        Chỉnh sửa
                                    </button>
                                </div>
                            </div>
                        ))}
                        <button
                            onClick={() => onEdit(section.id)}
                            className="text-sm text-blue-600 hover:text-blue-800"
                        >
                            + Thêm mục mới
                        </button>
                    </div>
                </div>
            )}
        </Draggable>
    );
};

const AddSectionModal = ({ isOpen, onClose, onAdd }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-96">
                <h3 className="text-lg font-medium mb-4">Thêm phần mới</h3>
                <div className="grid grid-cols-2 gap-4">
                    {Object.entries(SECTION_CONFIG).map(([type, config]) => (
                        <button
                            key={type}
                            onClick={() => {
                                onAdd({
                                    id: `section-${Date.now()}`,
                                    type,
                                    title: config.title,
                                    items: []
                                });
                                onClose();
                            }}
                            className="p-3 text-left hover:bg-gray-100 rounded"
                        >
                            {config.title}
                        </button>
                    ))}
                </div>
                <button
                    onClick={onClose}
                    className="mt-4 w-full py-2 px-4 bg-gray-200 rounded hover:bg-gray-300"
                >
                    Đóng
                </button>
            </div>
        </div>
    );
};

const EditItemModal = ({ isOpen, onClose, section, itemIndex, onSave }) => {
    const [formData, setFormData] = useState(
        itemIndex >= 0 ? section.items[itemIndex] : {}
    );

    if (!isOpen) return null;

    const fields = SECTION_CONFIG[section.type].fields;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-96 max-h-[90vh] overflow-y-auto">
                <h3 className="text-lg font-medium mb-4">
                    {itemIndex >= 0 ? 'Chỉnh sửa' : 'Thêm'} {section.title}
                </h3>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    onSave(section.id, formData, itemIndex);
                    onClose();
                }}>
                    <div className="space-y-4">
                        {fields.map((field) => (
                            <div key={field.name}>
                                <label className="block text-sm font-medium text-gray-700">
                                    {field.label}
                                </label>
                                {field.type === 'textarea' ? (
                                    <textarea
                                        value={formData[field.name] || ''}
                                        onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                        rows={3}
                                    />
                                ) : field.type === 'select' ? (
                                    <select
                                        value={formData[field.name] || ''}
                                        onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    >
                                        <option value="">Chọn {field.label}</option>
                                        {field.options.map((option) => (
                                            <option key={option} value={option}>{option}</option>
                                        ))}
                                    </select>
                                ) : (
                                    <input
                                        type={field.type}
                                        value={formData[field.name] || ''}
                                        onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border rounded hover:bg-gray-100"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Lưu
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export const SectionManager = ({ sections, onChange }) => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editModal, setEditModal] = useState(null);

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const items = Array.from(sections);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        onChange(items);
    };

    const handleAddSection = (newSection) => {
        onChange([...sections, newSection]);
    };

    const handleDeleteSection = (sectionId) => {
        onChange(sections.filter(section => section.id !== sectionId));
    };

    const handleEditItem = (sectionId, itemIndex) => {
        const section = sections.find(s => s.id === sectionId);
        setEditModal({ section, itemIndex });
    };

    const handleSaveItem = (sectionId, itemData, itemIndex) => {
        const newSections = sections.map(section => {
            if (section.id === sectionId) {
                const newItems = [...(section.items || [])];
                if (itemIndex >= 0) {
                    newItems[itemIndex] = itemData;
                } else {
                    newItems.push(itemData);
                }
                return { ...section, items: newItems };
            }
            return section;
        });
        onChange(newSections);
    };

    return (
        <div>
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="sections">
                    {(provided) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className="space-y-4"
                        >
                            {sections.map((section, index) => (
                                <SectionItem
                                    key={section.id}
                                    section={section}
                                    index={index}
                                    onDelete={handleDeleteSection}
                                    onEdit={handleEditItem}
                                />
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>

            <button
                onClick={() => setIsAddModalOpen(true)}
                className="mt-4 flex items-center justify-center w-full p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400"
            >
                <PlusIcon className="w-5 h-5 mr-2" />
                Thêm phần mới
            </button>

            <AddSectionModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onAdd={handleAddSection}
            />

            {editModal && (
                <EditItemModal
                    isOpen={true}
                    onClose={() => setEditModal(null)}
                    section={editModal.section}
                    itemIndex={editModal.itemIndex}
                    onSave={handleSaveItem}
                />
            )}
        </div>
    );
};