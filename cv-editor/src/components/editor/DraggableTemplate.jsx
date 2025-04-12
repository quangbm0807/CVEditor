import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { PencilIcon, GripVertical, Save, X } from 'lucide-react';
import { renderSectionItem } from '../cv-templates/Template1';

const DraggableTemplate = ({ data, onDataChange }) => {
    const [layout, setLayout] = useState('single');
    const [editingItem, setEditingItem] = useState(null);
    const [editFormData, setEditFormData] = useState({});

    // Separate sections by column based on layout
    const getSectionsByColumn = () => {
        const sections = data.sections || [];

        switch (layout) {
            case 'two-column':
                return {
                    left: sections.filter(s => s.column === 'left' || ['skills', 'languages', 'certifications'].includes(s.type)),
                    right: sections.filter(s => s.column === 'right' || ['experience', 'education', 'projects', 'achievements'].includes(s.type))
                };
            case 'three-column':
                return {
                    left: sections.filter(s => s.column === 'left' || ['skills', 'languages'].includes(s.type)),
                    middle: sections.filter(s => s.column === 'middle' || ['experience', 'education'].includes(s.type)),
                    right: sections.filter(s => s.column === 'right' || ['projects', 'certifications', 'achievements'].includes(s.type))
                };
            default:
                return { main: sections };
        }
    };

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const { source, destination } = result;
        const allSections = [...(data.sections || [])];
        const [movedSection] = allSections.splice(source.index, 1);

        // Update column assignment based on destination
        if (source.droppableId !== destination.droppableId) {
            movedSection.column = destination.droppableId;
        }

        allSections.splice(destination.index, 0, movedSection);

        onDataChange({
            ...data,
            sections: allSections
        });
    };

    const startEditing = (sectionId, itemIndex) => {
        const section = data.sections.find(s => s.id === sectionId);
        if (section && section.items && section.items[itemIndex]) {
            setEditingItem(`${sectionId}-${itemIndex}`);
            setEditFormData(section.items[itemIndex]);
        }
    };

    const saveEdit = (sectionId, itemIndex) => {
        const newData = { ...data };
        const sectionIndex = newData.sections.findIndex(s => s.id === sectionId);

        if (sectionIndex !== -1) {
            newData.sections[sectionIndex].items[itemIndex] = editFormData;
            onDataChange(newData);
            setEditingItem(null);
        }
    };

    const cancelEdit = () => {
        setEditingItem(null);
        setEditFormData({});
    };

    const handleInputChange = (field, value) => {
        setEditFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    return (
        <div className="relative">
            {/* Layout Switcher */}
            <div className="absolute top-4 right-4 space-x-2">
                <button
                    className={`px-3 py-1 rounded ${layout === 'single' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => setLayout('single')}
                >
                    1 Cột
                </button>
                <button
                    className={`px-3 py-1 rounded ${layout === 'two-column' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => setLayout('two-column')}
                >
                    2 Cột
                </button>
                <button
                    className={`px-3 py-1 rounded ${layout === 'three-column' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => setLayout('three-column')}
                >
                    3 Cột
                </button>
            </div>

            {/* CV Content */}
            <DragDropContext onDragEnd={handleDragEnd}>
                <div className={`mt-16 ${layout === 'three-column'
                    ? 'grid grid-cols-12 gap-6'
                    : layout === 'two-column'
                        ? 'grid grid-cols-12 gap-6'
                        : ''
                    }`}>
                    {layout === 'single' && (
                        <Droppable droppableId="main">
                            {(provided) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className="space-y-4"
                                >
                                    {getSectionsByColumn().main.map((section, index) => (
                                        <DraggableSection
                                            key={section.id}
                                            section={section}
                                            index={index}
                                            editingItem={editingItem}
                                            startEditing={startEditing}
                                            saveEdit={saveEdit}
                                            cancelEdit={cancelEdit}
                                            editFormData={editFormData}
                                            handleInputChange={handleInputChange}
                                        />
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    )}

                    {layout === 'two-column' && (
                        <>
                            <div className="col-span-4">
                                <Droppable droppableId="left">
                                    {(provided) => (
                                        <div
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            className="space-y-4 bg-gray-50 p-4 rounded-lg min-h-full"
                                        >
                                            {getSectionsByColumn().left.map((section, index) => (
                                                <DraggableSection
                                                    key={section.id}
                                                    section={section}
                                                    index={index}
                                                    editingItem={editingItem}
                                                    startEditing={startEditing}
                                                    saveEdit={saveEdit}
                                                    cancelEdit={cancelEdit}
                                                    editFormData={editFormData}
                                                    handleInputChange={handleInputChange}
                                                />
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </div>
                            <div className="col-span-8">
                                <Droppable droppableId="right">
                                    {(provided) => (
                                        <div
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            className="space-y-4 bg-white p-4 rounded-lg min-h-full"
                                        >
                                            {getSectionsByColumn().right.map((section, index) => (
                                                <DraggableSection
                                                    key={section.id}
                                                    section={section}
                                                    index={index}
                                                    editingItem={editingItem}
                                                    startEditing={startEditing}
                                                    saveEdit={saveEdit}
                                                    cancelEdit={cancelEdit}
                                                    editFormData={editFormData}
                                                    handleInputChange={handleInputChange}
                                                />
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </div>
                        </>
                    )}

                    {layout === 'three-column' && (
                        <>
                            <div className="col-span-3">
                                <Droppable droppableId="left">
                                    {(provided) => (
                                        <div
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            className="space-y-4 bg-gray-50 p-4 rounded-lg min-h-full"
                                        >
                                            {getSectionsByColumn().left.map((section, index) => (
                                                <DraggableSection
                                                    key={section.id}
                                                    section={section}
                                                    index={index}
                                                    editingItem={editingItem}
                                                    startEditing={startEditing}
                                                    saveEdit={saveEdit}
                                                    cancelEdit={cancelEdit}
                                                    editFormData={editFormData}
                                                    handleInputChange={handleInputChange}
                                                />
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </div>
                            <div className="col-span-5">
                                <Droppable droppableId="middle">
                                    {(provided) => (
                                        <div
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            className="space-y-4 bg-white p-4 rounded-lg min-h-full"
                                        >
                                            {getSectionsByColumn().middle.map((section, index) => (
                                                <DraggableSection
                                                    key={section.id}
                                                    section={section}
                                                    index={index}
                                                    editingItem={editingItem}
                                                    startEditing={startEditing}
                                                    saveEdit={saveEdit}
                                                    cancelEdit={cancelEdit}
                                                    editFormData={editFormData}
                                                    handleInputChange={handleInputChange}
                                                />
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </div>
                            <div className="col-span-4">
                                <Droppable droppableId="right">
                                    {(provided) => (
                                        <div
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            className="space-y-4 bg-gray-50 p-4 rounded-lg min-h-full"
                                        >
                                            {getSectionsByColumn().right.map((section, index) => (
                                                <DraggableSection
                                                    key={section.id}
                                                    section={section}
                                                    index={index}
                                                    editingItem={editingItem}
                                                    startEditing={startEditing}
                                                    saveEdit={saveEdit}
                                                    cancelEdit={cancelEdit}
                                                    editFormData={editFormData}
                                                    handleInputChange={handleInputChange}
                                                />
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </div>
                        </>
                    )}
                </div>
            </DragDropContext>
        </div>
    );
};

const DraggableSection = ({ section, index, editingItem, startEditing, saveEdit, cancelEdit, editFormData, handleInputChange }) => (
    <Draggable draggableId={section.id} index={index}>
        {(provided, snapshot) => (
            <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                className={`mb-4 bg-white rounded-lg shadow ${snapshot.isDragging ? 'shadow-lg' : ''}`}
            >
                <div className="p-4">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                            <div {...provided.dragHandleProps} className="mr-3">
                                <GripVertical className="w-5 h-5 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-medium">{section.title}</h3>
                        </div>
                        <PencilIcon className="w-5 h-5 text-gray-400 cursor-pointer" />
                    </div>

                    <div className="space-y-4">
                        {section.items?.map((item, itemIndex) => {
                            const itemId = `${section.id}-${itemIndex}`;
                            const isEditing = editingItem === itemId;

                            return (
                                <div
                                    key={itemIndex}
                                    className={`p-3 rounded ${isEditing ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'}`}
                                >
                                    {isEditing ? (
                                        <div className="space-y-3">
                                            {Object.entries(item).map(([key, value]) => (
                                                <div key={key} className="text-sm mb-2">
                                                    <label className="block font-medium mb-1">{key}:</label>
                                                    {key === 'description' || key === 'achievements' ? (
                                                        <textarea
                                                            value={editFormData[key] || ''}
                                                            onChange={(e) => handleInputChange(key, e.target.value)}
                                                            className="w-full p-2 border rounded"
                                                            rows={3}
                                                        />
                                                    ) : (
                                                        <input
                                                            type="text"
                                                            value={editFormData[key] || ''}
                                                            onChange={(e) => handleInputChange(key, e.target.value)}
                                                            className="w-full p-2 border rounded"
                                                        />
                                                    )}
                                                </div>
                                            ))}
                                            <div className="flex justify-end space-x-2 mt-3">
                                                <button
                                                    onClick={cancelEdit}
                                                    className="p-1 text-gray-600 hover:text-gray-800"
                                                >
                                                    <X className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={() => saveEdit(section.id, itemIndex)}
                                                    className="p-1 text-blue-600 hover:text-blue-800"
                                                >
                                                    <Save className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div onClick={() => startEditing(section.id, itemIndex)}>
                                            {Object.entries(item).map(([key, value]) => (
                                                <div key={key} className="text-sm mb-1">
                                                    <span className="font-medium">{key}: </span>
                                                    <span>{value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        )}
    </Draggable>
);

export default DraggableTemplate;