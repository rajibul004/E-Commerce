import axios from "axios";

console.log('VITE_BACKEND_BASE_URL:', import.meta.env.VITE_BACKEND_BASE_URL);

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_BASE_URL 
        ? `${import.meta.env.VITE_BACKEND_BASE_URL}/api` 
        : 'http://localhost:8080/api',
    withCredentials: true,
});

export default api;