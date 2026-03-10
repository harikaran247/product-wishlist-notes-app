import axios from 'axios';

const API_URL = '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (userData) => api.post('/auth/login', userData),
  getProfile: () => api.get('/auth/profile'),
};

// Products API
export const productsAPI = {
  getAll: (params) => api.get('/products', { params }),
  getOne: (id) => api.get(`/products/${id}`),
  create: (productData) => api.post('/products', productData),
  update: (id, productData) => api.put(`/products/${id}`, productData),
  delete: (id) => api.delete(`/products/${id}`),
  getStats: () => api.get('/products/stats'),
  purchase: (id) => api.post(`/products/${id}/purchase`),
};

// Notes API
export const notesAPI = {
  getAll: (productId) => api.get(`/notes/${productId}`),
  create: (productId, noteData) => api.post(`/notes/${productId}`, noteData),
  update: (id, noteData) => api.put(`/notes/note/${id}`, noteData),
  delete: (id) => api.delete(`/notes/note/${id}`),
};

// Admin API
export const adminAPI = {
  getStats: () => api.get('/admin/stats'),
  getUsers: () => api.get('/admin/users'),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),
  getProducts: () => api.get('/admin/products'),
};

// Social API
export const socialAPI = {
  getUsers: () => api.get('/social/users'),
  getUserWishlist: (id) => api.get(`/social/users/${id}/wishlist`),
  likeProduct: (id) => api.post(`/social/products/${id}/like`),
  getTrending: () => api.get('/social/trending'),
};

export default api;