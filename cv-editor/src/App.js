// src/App.jsx - Fixed
import React, { useState, useRef } from 'react';
import { useCV } from './components/hooks/useCV';
import { TemplateSelector } from './components/editor/TemplateSelector';
import { CVForm } from './components/editor/CVForm';
import html2canvas from 'html2canvas';
import { Button } from './components/shared/Button';
import jsPDF from 'jspdf';
import DraggableTemplate from './components/editor/DraggableTemplate';
import { CV_TEMPLATES } from './components/constants/templates';

const CVPreview = ({ template, data, isEditing, onDataChange }) => {
  // If we're editing, render the DraggableTemplate component
  if (isEditing) {
    return <DraggableTemplate data={data} onDataChange={onDataChange} />;
  }

  // Find the template component to use
  const Template = CV_TEMPLATES[template]?.component;
  if (!Template) {
    return <div>Template không tồn tại</div>;
  }

  // Ensure data is always defined
  return <Template data={data || {}} />;
};

const App = () => {
  const { cv, updateCV } = useCV();
  const [editMode, setEditMode] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);
  const [exportError, setExportError] = useState(null);
  const previewRef = useRef(null);

  const handleExportPDF = async () => {
    // Turn off edit mode before exporting
    setEditMode(false);
    setExportLoading(true);
    setExportError(null);

    // Wait a moment for the UI to update after turning off edit mode
    setTimeout(async () => {
      try {
        const element = document.getElementById('cv-preview');
        if (!element) {
          throw new Error('Preview element not found');
        }

        const canvas = await html2canvas(element, {
          scale: 2, // Higher quality
          logging: false,
          useCORS: true,
          allowTaint: true
        });

        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgData = canvas.toDataURL('image/png');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('my-cv.pdf');
        setExportLoading(false);
      } catch (error) {
        console.error('Error exporting PDF:', error);
        setExportError('Không thể xuất PDF. Vui lòng thử lại.');
        setExportLoading(false);
      }
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">CV Editor</h1>
            <div className="space-x-4">
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
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {exportError && (
          <div className="mb-4 p-3 bg-red-100 text-red-800 rounded">
            {exportError}
          </div>
        )}

        <div className="grid grid-cols-12 gap-8">
          {/* Sidebar - only show when not in edit mode */}
          {!editMode && (
            <div className="col-span-4">
              <div className="bg-white shadow rounded-lg p-6 mb-6">
                <h2 className="text-lg font-medium mb-4">Chọn mẫu CV</h2>
                <TemplateSelector
                  value={cv.templateId}
                  onChange={(templateId) => updateCV({ templateId })}
                />
              </div>
              <CVForm
                data={cv.data}
                onChange={(data) => updateCV({ data })}
              />
            </div>
          )}

          {/* CV Preview/Edit Area */}
          <div className={editMode ? 'col-span-12' : 'col-span-8'}>
            <div className="bg-white shadow rounded-lg">
              <div id="cv-preview" ref={previewRef} className="w-full p-8">
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