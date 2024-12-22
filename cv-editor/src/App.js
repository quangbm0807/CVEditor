import React, { useState } from 'react';
import { useCV } from './components/hooks/useCV';
import { TemplateSelector } from './components/editor/TemplateSelector';
import { CVForm } from './components/editor/CVForm';
import html2canvas from 'html2canvas';
import { Button } from './components/shared/Button';
import jsPDF from 'jspdf';
import templates from './components/cv-templates';

const App = () => {
  const [cv, updateCV] = useCV();
  const [activeTab, setActiveTab] = useState('edit');
  const handleExportPDF = async () => {
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
                variant={activeTab === 'edit' ? 'primary' : 'secondary'}
                onClick={() => setActiveTab('edit')}
              >
                Chỉnh sửa
              </Button>
              <Button
                variant={activeTab === 'preview' ? 'primary' : 'secondary'}
                onClick={() => setActiveTab('preview')}
              >
                Xem trước
              </Button>
              <Button onClick={handleExportPDF}>
                Xuất PDF
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'edit' ? (
          <div className="grid grid-cols-12 gap-8">
            {/* Sidebar */}
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

            {/* Preview */}
            <div className="col-span-8">
              <div className="bg-white shadow rounded-lg">
                <div
                  id="cv-preview"
                  className="w-full aspect-[1/1.414] p-8" // Tỉ lệ A4
                >
                  <CVPreview template={cv.templateId} data={cv.data} />
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Preview mode fullscreen
          <div className="max-w-4xl mx-auto bg-white shadow rounded-lg">
            <div
              id="cv-preview-full"
              className="w-full p-8"
            >
              <CVPreview template={cv.templateId} data={cv.data} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
const CVPreview = ({ template, data }) => {
  const TemplateComponent = templates[template];

  if (!TemplateComponent) {
    return <div>Template không tồn tại</div>;
  }

  return <TemplateComponent data={data} />;
};

export default App;