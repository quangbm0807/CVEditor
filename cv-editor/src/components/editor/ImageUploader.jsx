// components/editor/ImageUploader.jsx
import { useRef } from 'react';
import { convertFileToBase64, compressImage } from '../utils/imageUtils';
import { Button } from '../shared/Button';

export const ImageUploader = ({ value, onChange }) => {
    const inputRef = useRef(null);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const base64 = await convertFileToBase64(file);
                const compressed = await compressImage(base64);
                onChange(compressed);
            } catch (error) {
                console.error('Error processing image:', error);
            }
        }
    };

    return (
        <div className="space-y-2">
            <div className="flex items-center space-x-4">
                {value && (
                    <img
                        src={value}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover"
                    />
                )}
                <Button
                    variant="secondary"
                    onClick={() => inputRef.current?.click()}
                >
                    Upload ảnh
                </Button>
            </div>
            <input
                ref={inputRef}
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
            />
        </div>
    );
};
