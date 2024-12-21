import axios from 'axios';
import { getToken } from './axios-helper';

// Skapa en Axios-instans
const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`, // Base URL för din backend
});

// Lägg till en interceptor för att inkludera token i Authorization-headern
axiosInstance.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Testa bas-URL och logga eventuella fel vid grundläggande anslutning
console.log('API Base URL:', axiosInstance.defaults.baseURL);

axiosInstance
    .get('/')
    .then((res) => console.log('Connection successful:', res.data))
    .catch((err) => console.error('Connection failed:', err));

export default axiosInstance;
