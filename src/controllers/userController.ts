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
        console.log('User created successfully:', response.data);
        return response.data;
    } catch (error: any) {
        console.error('Error creating user:', error.response || error.message || error);
        throw new Error(error.response?.data?.message || 'Failed to create user');
    }
};

/**
 * Logga in en användare
 */
export const loginUser = async (username: string, password: string) => {
    try {
        const response = await axiosInstance.post('/users/login', { username, password });
        console.log('User logged in successfully:', response.data);
        const { token } = response.data;
        setToken(token); // Spara token i localStorage
        return response.data;
    } catch (error: any) {
        console.error('Error logging in user:', error.response || error.message || error);
        throw new Error(error.response?.data?.message || 'Failed to log in');
    }
};

/**
 * Logga in en admin
 */
export const loginAdmin = async (username: string, password: string) => {
    try {
        const response = await axiosInstance.post('/admin/login', { username, password });
        console.log('Admin logged in successfully:', response.data);
        const { token } = response.data;
        setToken(token); // Spara token i localStorage
        return response.data;
    } catch (error: any) {
        console.error('Error logging in admin:', error.response || error.message || error);
        throw new Error(error.response?.data?.message || 'Failed to log in as admin');
    }
};

/**
 * Logga ut användaren
 */
export const logoutUser = () => {
    try {
        removeToken(); // Ta bort token från localStorage
        console.log('User logged out successfully');
    } catch (error: any) {
        console.error('Error logging out user:', error.message || error);
    }
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
        console.log('Submission uploaded successfully:', response.data);
        return response.data;
    } catch (error: any) {
        console.error('Error uploading submission:', error.response || error.message || error);
        throw new Error(error.response?.data?.message || 'Failed to upload submission');
    }
};
