import axios from 'axios';

const api = axios.create({
    baseURL: typeof window !== 'undefined' ? '/api' : (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'),
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
