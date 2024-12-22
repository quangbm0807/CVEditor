// src/App.jsx
import React, { useState } from 'react';
import { useCV } from './components/hooks/useCV';
import { TemplateSelector } from './components/editor/TemplateSelector';
import { CVForm } from './components/editor/CVForm';
import html2canvas from 'html2canvas';
import { Button } from './components/shared/Button';
import jsPDF from 'jspdf';
import DraggableTemplate from './components/editor/DraggableTemplate';
import { CV_TEMPLATES } from './components/constants/templates';

const CVPreview = ({ template, data, isEditing, onDataChange }) => {
  // Nếu đang ở chế độ chỉnh sửa, render DraggableTemplate
  if (isEditing) {
    return <DraggableTemplate data={data} onDataChange={onDataChange} />;
  }

  // Nếu không, render template thông thường
  const Template = CV_TEMPLATES[template]?.component;
  if (!Template) {
    return <div>Template không tồn tại</div>;
  }

  return <Template data={data} />;
};

const App = () => {
  const { cv, updateCV } = useCV();
  const [editMode, setEditMode] = useState(false);

  const handleExportPDF = async () => {
    // Tắt chế độ chỉnh sửa trước khi xuất PDF
    setEditMode(false);

    const element = document.getElementById('cv-preview');
    try {
      const canvas = await html2canvas(element);
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('my-cv.pdf');
    } catch (error) {
      console.error('Error exporting PDF:', error);
    }
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
              <Button onClick={handleExportPDF}>
                Xuất PDF
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Sidebar - chỉ hiển thị khi không ở chế độ kéo thả */}
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
              <div id="cv-preview" className="w-full p-8">
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