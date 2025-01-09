
// Running the application locally 
import axios from 'axios';
import { getToken } from './axios-helper';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api', // Local backend URL
    withCredentials: true, // Include cookies/credentials if needed
});

axiosInstance.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

console.log('API Base URL:', axiosInstance.defaults.baseURL);

export default axiosInstance;

// Running the application through deployment

// import axios from 'axios';
// import { getToken } from './axios-helper';

// const baseURL = import.meta.env.VITE_API_URL;

// const axiosInstance = axios.create({
//     baseURL,
//     withCredentials: true,
// });

// axiosInstance.interceptors.request.use((config) => {
//     const token = getToken();
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// });

// console.log('API Base URL:', baseURL);

// export default axiosInstance;
