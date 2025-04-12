// src/components/editor/ImageUploader.jsx
import React, { useRef, useState } from 'react';
import { convertFileToBase64, compressImage } from '../utils/imageUtils';
import { Button } from '../shared/Button';
import { X, Upload, Image } from 'lucide-react';

export const ImageUploader = ({ value, onChange }) => {
    const inputRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setLoading(true);
        setError(null);

        try {
            // Check file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                throw new Error('Kích thước ảnh quá lớn (tối đa 5MB)');
            }

            // Check file type
            if (!file.type.startsWith('image/')) {
                throw new Error('Vui lòng chọn file ảnh hợp lệ');
            }

            const base64 = await convertFileToBase64(file);
            const compressed = await compressImage(base64);
            onChange(compressed);
        } catch (error) {
            console.error('Error processing image:', error);
            setError(error.message || 'Có lỗi xảy ra khi xử lý ảnh');
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveImage = () => {
        onChange('');
        setError(null);
    };

    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
                Ảnh đại diện
            </label>

            <div className="flex items-center space-x-4">
                {value ? (
                    <div className="relative">
                        <img
                            src={value}
                            alt="Profile"
                            className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
                        />
                        <button
                            type="button"
                            onClick={handleRemoveImage}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                            title="Xóa ảnh"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                ) : (
                    <div className="w-24 h-24 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center">
                        <Image className="w-8 h-8 text-gray-400" />
                    </div>
                )}

                <div>
                    <Button
                        variant="secondary"
                        onClick={() => inputRef.current?.click()}
                        disabled={loading}
                    >
                        {loading ? (
                            'Đang tải...'
                        ) : value ? (
                            'Thay đổi ảnh'
                        ) : (
                            <span className="flex items-center">
                                <Upload className="w-4 h-4 mr-2" />
                                Tải ảnh lên
                            </span>
                        )}
                    </Button>
                    <p className="mt-1 text-xs text-gray-500">
                        Định dạng PNG, JPG hoặc GIF (tối đa 5MB)
                    </p>
                </div>
            </div>

            {error && (
                <p className="text-sm text-red-600 mt-1">{error}</p>
            )}

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