import axios from 'axios';
import { getToken } from './axios-helper';

const axiosInstance = axios.create({
    baseURL: 'https://flashmath-production.up.railway.app/api', // Railway backend API base URL
});

// Add Authorization header with token for every request
axiosInstance.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosInstance;
