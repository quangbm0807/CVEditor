const STORAGE_KEY = 'cv_editor_data';

export const saveToLocalStorage = (data) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
};

export const loadFromLocalStorage = () => {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error loading from localStorage:', error);
        return null;
    }
};