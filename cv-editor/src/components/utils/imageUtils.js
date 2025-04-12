// src/components/utils/imageUtils.js
export const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
};

export const compressImage = async (base64String, maxWidth = 800, quality = 0.7) => {
    return new Promise((resolve, reject) => {
        try {
            const img = new Image();
            img.src = base64String;

            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                // Calculate new dimensions
                let width = img.width;
                let height = img.height;

                if (width > maxWidth) {
                    height = (maxWidth * height) / width;
                    width = maxWidth;
                }

                // Set canvas dimensions
                canvas.width = width;
                canvas.height = height;

                // Draw image on canvas
                ctx.fillStyle = 'white'; // Set white background
                ctx.fillRect(0, 0, width, height);
                ctx.drawImage(img, 0, 0, width, height);

                // Convert to base64 with compression
                const compressedBase64 = canvas.toDataURL('image/jpeg', quality);

                resolve(compressedBase64);
            };

            img.onerror = (error) => {
                reject(new Error('Failed to load image for compression'));
            };
        } catch (error) {
            reject(error);
        }
    });
};

export const applyImageFilter = async (base64String, filter) => {
    return new Promise((resolve, reject) => {
        try {
            const img = new Image();
            img.src = base64String;

            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                // Set canvas dimensions
                canvas.width = img.width;
                canvas.height = img.height;

                // Draw image on canvas
                ctx.drawImage(img, 0, 0);

                // Apply filter
                switch (filter) {
                    case 'grayscale':
                        applyGrayscale(ctx, canvas.width, canvas.height);
                        break;
                    case 'sepia':
                        applySepia(ctx, canvas.width, canvas.height);
                        break;
                    case 'brightness':
                        applyBrightness(ctx, canvas.width, canvas.height, 20);
                        break;
                    case 'contrast':
                        applyContrast(ctx, canvas.width, canvas.height, 20);
                        break;
                    default:
                        // No filter
                        break;
                }

                // Convert back to base64
                const filteredBase64 = canvas.toDataURL('image/jpeg', 0.9);

                resolve(filteredBase64);
            };

            img.onerror = () => {
                reject(new Error('Failed to load image for filter application'));
            };
        } catch (error) {
            reject(error);
        }
    });
};

// Filter functions
const applyGrayscale = (ctx, width, height) => {
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = avg; // red
        data[i + 1] = avg; // green
        data[i + 2] = avg; // blue
    }

    ctx.putImageData(imageData, 0, 0);
};

const applySepia = (ctx, width, height) => {
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        data[i] = Math.min(255, (r * 0.393) + (g * 0.769) + (b * 0.189));
        data[i + 1] = Math.min(255, (r * 0.349) + (g * 0.686) + (b * 0.168));
        data[i + 2] = Math.min(255, (r * 0.272) + (g * 0.534) + (b * 0.131));
    }

    ctx.putImageData(imageData, 0, 0);
};

const applyBrightness = (ctx, width, height, percent) => {
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    const factor = 1 + percent / 100;

    for (let i = 0; i < data.length; i += 4) {
        data[i] = Math.min(255, data[i] * factor);
        data[i + 1] = Math.min(255, data[i + 1] * factor);
        data[i + 2] = Math.min(255, data[i + 2] * factor);
    }

    ctx.putImageData(imageData, 0, 0);
};

const applyContrast = (ctx, width, height, percent) => {
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    const factor = (259 * (percent + 255)) / (255 * (259 - percent));

    for (let i = 0; i < data.length; i += 4) {
        data[i] = Math.min(255, Math.max(0, factor * (data[i] - 128) + 128));
        data[i + 1] = Math.min(255, Math.max(0, factor * (data[i + 1] - 128) + 128));
        data[i + 2] = Math.min(255, Math.max(0, factor * (data[i + 2] - 128) + 128));
    }

    ctx.putImageData(imageData, 0, 0);
};