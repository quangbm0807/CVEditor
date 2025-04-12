// components/editor/DraggableTemplate.jsx - Fixed
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { PencilIcon, GripVertical } from 'lucide-react';

const DraggableTemplate = ({ data = {}, onDataChange }) => {
    const [layout, setLayout] = useState('single');
    const [editingItem, setEditingItem] = useState(null);

    // Ensure we have sections array
    const sections = data?.sections || [];

    // Separate sections by column based on layout
    const getSectionsByColumn = () => {
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
        const allSections = [...sections];
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

    // Handle section and item changes safely
    const handleSectionUpdate = (sectionId, updatedData) => {
        const updatedSections = sections.map(section =>
            section.id === sectionId ? { ...section, ...updatedData } : section
        );

        onDataChange({
            ...data,
            sections: updatedSections
        });
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
                                            key={section.id || `section-${index}`}
                                            section={section}
                                            index={index}
                                            editingItem={editingItem}
                                            setEditingItem={setEditingItem}
                                            onUpdate={handleSectionUpdate}
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
                                            className="space-y-4 bg-gray-50 p-4 rounded-lg min-h-[200px]"
                                        >
                                            {getSectionsByColumn().left.map((section, index) => (
                                                <DraggableSection
                                                    key={section.id || `left-${index}`}
                                                    section={section}
                                                    index={index}
                                                    editingItem={editingItem}
                                                    setEditingItem={setEditingItem}
                                                    onUpdate={handleSectionUpdate}
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
                                            className="space-y-4 bg-white p-4 rounded-lg min-h-[200px]"
                                        >
                                            {getSectionsByColumn().right.map((section, index) => (
                                                <DraggableSection
                                                    key={section.id || `right-${index}`}
                                                    section={section}
                                                    index={index}
                                                    editingItem={editingItem}
                                                    setEditingItem={setEditingItem}
                                                    onUpdate={handleSectionUpdate}
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
                                            className="space-y-4 bg-gray-50 p-4 rounded-lg min-h-[200px]"
                                        >
                                            {getSectionsByColumn().left.map((section, index) => (
                                                <DraggableSection
                                                    key={section.id || `left-${index}`}
                                                    section={section}
                                                    index={index}
                                                    editingItem={editingItem}
                                                    setEditingItem={setEditingItem}
                                                    onUpdate={handleSectionUpdate}
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
                                            className="space-y-4 bg-white p-4 rounded-lg min-h-[200px]"
                                        >
                                            {getSectionsByColumn().middle.map((section, index) => (
                                                <DraggableSection
                                                    key={section.id || `middle-${index}`}
                                                    section={section}
                                                    index={index}
                                                    editingItem={editingItem}
                                                    setEditingItem={setEditingItem}
                                                    onUpdate={handleSectionUpdate}
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
                                            className="space-y-4 bg-gray-50 p-4 rounded-lg min-h-[200px]"
                                        >
                                            {getSectionsByColumn().right.map((section, index) => (
                                                <DraggableSection
                                                    key={section.id || `right-${index}`}
                                                    section={section}
                                                    index={index}
                                                    editingItem={editingItem}
                                                    setEditingItem={setEditingItem}
                                                    onUpdate={handleSectionUpdate}
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

const DraggableSection = ({ section, index, editingItem, setEditingItem, onUpdate }) => {
    if (!section || !section.id) {
        return null;
    }

    return (
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
                                <h3 className="text-lg font-medium">{section.title || 'Untitled Section'}</h3>
                            </div>
                            <PencilIcon className="w-5 h-5 text-gray-400 cursor-pointer" />
                        </div>

                        <div className="space-y-4">
                            {section.items?.map((item, itemIndex) => (
                                <div
                                    key={itemIndex}
                                    className={`p-3 rounded ${editingItem === `${section.id}-${itemIndex}`
                                        ? 'bg-blue-50 border border-blue-200'
                                        : 'bg-gray-50'
                                        }`}
                                    onClick={() => setEditingItem(`${section.id}-${itemIndex}`)}
                                >
                                    {Object.entries(item).map(([key, value]) => (
                                        <div key={key} className="text-sm mb-1">
                                            <span className="font-medium">{key}: </span>
                                            <span>{value}</span>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    );
};

export default DraggableTemplate;