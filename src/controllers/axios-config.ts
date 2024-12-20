import axios from 'axios';
import { getToken } from './axios-helper';

const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`, 
});

// Lägg till Authorization-header med token i varje begäran
axiosInstance.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Testa bas-URL och grundläggande anslutning
console.log('API Base URL:', axiosInstance.defaults.baseURL);

axiosInstance
    .get('/')
    .then((res) => console.log('Connection successful:', res.data))
    .catch((err) => console.error('Connection failed:', err));

export default axiosInstance;
