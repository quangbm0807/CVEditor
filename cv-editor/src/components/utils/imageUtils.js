export const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
};

export const compressImage = async (base64String, maxWidth = 800) => {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = base64String;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            let width = img.width;
            let height = img.height;

            if (width > maxWidth) {
                height = (maxWidth * height) / width;
                width = maxWidth;
            }

            canvas.width = width;
            canvas.height = height;

            ctx.drawImage(img, 0, 0, width, height);
            resolve(canvas.toDataURL('image/jpeg', 0.7));
        };
    });
};