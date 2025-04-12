// src/App.jsx
import React, { useState, useRef } from 'react';
import { useCV } from './components/hooks/useCV';
import { TemplateSelector } from './components/editor/TemplateSelector';
import { CVForm } from './components/editor/CVForm';
import { Button } from './components/shared/Button';
import DraggableTemplate from './components/editor/DraggableTemplate';
import { CV_TEMPLATES } from './components/constants/templates';
import { TemplateCustomizer } from './components/editor/TemplateCustomizer';
import { ImportExport } from './components/editor/ImportExport';
import { exportToPDF } from './components/utils/pdfUtils';
import './App.css';

const CVPreview = ({ template, data, isEditing, onDataChange }) => {
  // If in editing mode, render DraggableTemplate
  if (isEditing) {
    return <DraggableTemplate data={data} onDataChange={onDataChange} />;
  }

  // Otherwise, render the normal template
  const Template = CV_TEMPLATES[template]?.component;
  if (!Template) {
    return <div>Template không tồn tại</div>;
  }

  return <Template data={data} />;
};

const App = () => {
  const { cv, updateCV, resetCV, addSection, updateSection, deleteSection } = useCV();
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState('template'); // 'template', 'content', 'customize'
  const previewRef = useRef(null);
  const [exportLoading, setExportLoading] = useState(false);
  const [exportError, setExportError] = useState(null);

  const handleExportPDF = async () => {
    setExportLoading(true);
    setExportError(null);
    setEditMode(false); // Turn off edit mode before exporting

    try {
      // Wait for the next render cycle to ensure edit mode is off
      setTimeout(async () => {
        try {
          await exportToPDF('cv-preview', `${cv.data.personalInfo.fullName || 'my-cv'}.pdf`);
          setExportLoading(false);
        } catch (error) {
          setExportError('Failed to export PDF. Please try again.');
          setExportLoading(false);
          console.error('PDF export error:', error);
        }
      }, 300);
    } catch (error) {
      setExportError('Failed to export PDF. Please try again.');
      setExportLoading(false);
      console.error('PDF export error:', error);
    }
  };

  const handleImportData = (importedData) => {
    if (importedData && typeof importedData === 'object') {
      updateCV(importedData);
    }
  };

  // Add/update CSS for better PDF export
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .pdf-export {
        background: white !important;
        padding: 20px !important;
        max-width: 210mm !important;
        margin: 0 auto !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">CV Editor</h1>
            <div className="flex space-x-4">
              <ImportExport
                onImport={handleImportData}
                cvData={cv}
              />
              <Button
                variant={editMode ? 'primary' : 'secondary'}
                onClick={() => setEditMode(!editMode)}
              >
                {editMode ? 'Xem trước' : 'Chỉnh sửa'}
              </Button>
              <Button
                onClick={handleExportPDF}
                disabled={exportLoading}
              >
                {exportLoading ? 'Đang xuất...' : 'Xuất PDF'}
              </Button>
            </div>
          </div>
          {exportError && (
            <div className="mt-2 text-red-600 text-sm">{exportError}</div>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Sidebar - only shown when not in drag & drop mode */}
          {!editMode && (
            <div className="col-span-4">
              {/* Tab navigation */}
              <div className="bg-white shadow rounded-lg mb-6">
                <div className="flex">
                  <button
                    className={`flex-1 py-3 font-medium text-center ${activeTab === 'template' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500 hover:text-gray-700'
                      }`}
                    onClick={() => setActiveTab('template')}
                  >
                    Mẫu CV
                  </button>
                  <button
                    className={`flex-1 py-3 font-medium text-center ${activeTab === 'customize' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500 hover:text-gray-700'
                      }`}
                    onClick={() => setActiveTab('customize')}
                  >
                    Tùy chỉnh
                  </button>
                  <button
                    className={`flex-1 py-3 font-medium text-center ${activeTab === 'content' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500 hover:text-gray-700'
                      }`}
                    onClick={() => setActiveTab('content')}
                  >
                    Nội dung
                  </button>
                </div>
              </div>

              {/* Tab content */}
              {activeTab === 'template' && (
                <div className="bg-white shadow rounded-lg p-6 mb-6">
                  <h2 className="text-lg font-medium mb-4">Chọn mẫu CV</h2>
                  <TemplateSelector
                    value={cv.templateId}
                    onChange={(templateId) => updateCV({ templateId })}
                  />
                  <div className="mt-4 flex justify-end">
                    <Button
                      onClick={() => resetCV()}
                      variant="secondary"
                    >
                      Đặt lại CV
                    </Button>
                  </div>
                </div>
              )}

              {activeTab === 'customize' && (
                <TemplateCustomizer templateId={cv.templateId} />
              )}

              {activeTab === 'content' && (
                <CVForm
                  data={cv.data}
                  onChange={(data) => updateCV({ data })}
                  onAddSection={addSection}
                  onUpdateSection={updateSection}
                  onDeleteSection={deleteSection}
                />
              )}
            </div>
          )}

          {/* CV Preview/Edit Area */}
          <div className={editMode ? 'col-span-12' : 'col-span-8'}>
            <div className="bg-white shadow rounded-lg">
              <div id="cv-preview" className="w-full p-8" ref={previewRef}>
                <CVPreview
                  template={cv.templateId}
                  data={cv.data}
                  isEditing={editMode}
                  onDataChange={(newData) => updateCV({ data: newData })}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;