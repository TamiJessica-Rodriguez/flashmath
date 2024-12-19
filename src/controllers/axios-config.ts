// axios-config.ts
import axios from 'axios';
import { getToken } from './axios-helper';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api', // Backend API-bas-URL
});

// Lägg till Authorization-header med token i varje begäran
axiosInstance.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosInstance;