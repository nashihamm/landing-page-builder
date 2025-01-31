// frontend/src/services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const pageService = {
  getPages: () => api.get('/pages'),
  getPage: (id: string) => api.get(`/pages/${id}`),
  createPage: (data: any) => api.post('/pages', data),
  updatePage: (id: string, data: any) => api.put(`/pages/${id}`, data),
  deletePage: (id: string) => api.delete(`/pages/${id}`),
  publishPage: (id: string) => api.post(`/pages/${id}/publish`),
};

export const templateService = {
  getTemplates: () => api.get('/templates'),
  getTemplate: (id: string) => api.get(`/templates/${id}`),
  useTemplate: (id: string) => api.post(`/templates/${id}/use`),
};

export const authService = {
  login: (email: string, password: string) => 
    api.post('/login', { email, password }),
  register: (data: any) => api.post('/register', data),
  logout: () => api.post('/logout'),
  getUser: () => api.get('/user'),
};

export default api;