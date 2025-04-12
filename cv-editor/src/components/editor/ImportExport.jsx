import React, { useRef } from 'react';
import { Button } from '../shared/Button';

export const ImportExport = ({ onImport, cvData }) => {
    const fileInputRef = useRef(null);

    const handleImportClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const importedData = JSON.parse(event.target.result);
                onImport(importedData);
            } catch (error) {
                console.error('Error parsing imported data:', error);
                alert('Invalid file format. Please import a valid CV JSON file.');
            }
        };
        reader.readAsText(file);
    };

    const handleExport = () => {
        const jsonString = JSON.stringify(cvData, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        // Create download link
        const a = document.createElement('a');
        a.href = url;
        a.download = 'my-cv-data.json';
        document.body.appendChild(a);
        a.click();

        // Clean up
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="flex space-x-2">
            <Button variant="secondary" onClick={handleImportClick}>
                Import CV
            </Button>
            <Button variant="secondary" onClick={handleExport}>
                Export CV
            </Button>
            <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                className="hidden"
                onChange={handleFileChange}
            />
        </div>
    );
};
