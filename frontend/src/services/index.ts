import axios from 'axios';
import { STORAGE_KEY } from '../constants';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(STORAGE_KEY.TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(STORAGE_KEY.TOKEN);
      localStorage.removeItem(STORAGE_KEY.USER);
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

// Auth
export const authService = {
  login: (data: { email: string; password: string }) =>
    api.post('/api/v1/auth/login', data),
  register: (data: { name: string; email: string; password: string }) =>
    api.post('/api/v1/auth/register', data),
};

// Manhwas
export const manhwaService = {
  getAll: () => api.get('/api/v1/manhwas'),
  getById: (id: string) => api.get(`/api/v1/manhwas/${id}`),
  create: (data: object) => api.post('/api/v1/manhwas', data),
  update: (id: string, data: object) => api.patch(`/api/v1/manhwas/${id}`, data),
  delete: (id: string) => api.delete(`/api/v1/manhwas/${id}`),
};

// Bookmarks
export const bookmarkService = {
  getAll: () => api.get('/api/v1/bookmarks'),
  create: (manhwaId: string) => api.post('/api/v1/bookmarks', { manhwaId }),
  delete: (id: string) => api.delete(`/api/v1/bookmarks/${id}`),
};

// Users
export const userService = {
  getAll: () => api.get('/api/v1/users'),
  updateRole: (id: string, role: string) =>
    api.patch(`/api/v1/users/${id}/role`, { role }),
};
