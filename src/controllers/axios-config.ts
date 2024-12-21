import axios from 'axios';
import { getToken } from './axios-helper';

// Hantera miljöer
const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'; // Lokal fallback om VITE_API_BASE_URL inte finns

// Skapa en Axios-instans
const axiosInstance = axios.create({
    baseURL,
});

// Lägg till en interceptor för att inkludera token i Authorization-headern
axiosInstance.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Logga bas-URL för att säkerställa att rätt används
console.log('API Base URL:', axiosInstance.defaults.baseURL);

export default axiosInstance;
