import axiosInstance from './axios-config';
import { removeToken, setToken } from './axios-helper';

interface UserData {
    firstname: string;
    lastname: string;
    username: string;
    password: string;
    avatar?: string;
}

/**
 * Skapa en ny användare
 */
export const createUser = async (userData: UserData) => {
    try {
        const response = await axiosInstance.post('/users/create', userData);
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw new Error('Failed to create user');
    }
};

/**
 * Logga in en användare
 */
export const loginUser = async (username: string, password: string) => {
    try {
        const response = await axiosInstance.post('/users/login', { username, password });
        const { token } = response.data;
        setToken(token); // Spara token i localStorage
        return response.data;
    } catch (error) {
        console.error('Error logging in user:', error);
        throw new Error('Failed to log in');
    }
};

/**
 * Logga in en admin
 */
export const loginAdmin = async (username: string, password: string) => {
    try {
        const response = await axiosInstance.post('/admin/login', { username, password });
        const { token } = response.data;
        setToken(token); // Spara token i localStorage
        return response.data;
    } catch (error) {
        console.error('Error logging in admin:', error);
        throw new Error('Failed to log in as admin');
    }
};

/**
 * Logga ut användaren
 */
export const logoutUser = () => {
    removeToken(); // Ta bort token från localStorage
};

/**
 * Ladda upp en inlämning
 */
export const uploadSubmission = async (file: File, title: string) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);

    try {
        const response = await axiosInstance.post('/submissions', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error uploading submission:', error);
        throw new Error('Failed to upload submission');
    }
};
