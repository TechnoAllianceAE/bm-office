
// This file contains client-side API functions for calling the backend
import axios from 'axios';

const API_URL = process.env.BACKEND_URL || 'http://localhost:3000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to request if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear auth state on 401 Unauthorized
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API functions
export const authApi = {
  // Send OTP to email
  sendOTP: async (email) => {
    const response = await api.post('/auth/otp/send', { email });
    return response.data;
  },
  
  // Verify OTP
  verifyOTP: async (email, otp) => {
    const response = await api.post('/auth/otp/verify', { email, otp });
    
    // Store token on successful verification
    if (response.data.data.token) {
      localStorage.setItem('token', response.data.data.token);
    }
    
    return response.data;
  },
  
  // Social login
  socialLogin: async (provider, token, userData) => {
    const response = await api.post('/auth/social', { provider, token, userData });
    
    // Store token on successful login
    if (response.data.data.token) {
      localStorage.setItem('token', response.data.data.token);
    }
    
    return response.data;
  },
  
  // Get current user
  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
  
  // Logout (client-side only)
  logout: () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  },
};

// User API functions
export const userApi = {
  // Get all users
  getAllUsers: async (page = 1, limit = 10, search = '', status = '') => {
    const params = new URLSearchParams();
    params.append('page', page);
    params.append('limit', limit);
    if (search) params.append('search', search);
    if (status) params.append('status', status);
    
    const response = await api.get(`/users?${params.toString()}`);
    return response.data;
  },
  
  // Get user by ID
  getUserById: async (id) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },
  
  // Create new user
  createUser: async (userData) => {
    const response = await api.post('/users', userData);
    return response.data;
  },
  
  // Update user
  updateUser: async (id, userData) => {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  },
  
  // Delete user
  deleteUser: async (id) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },
};

// Role API functions
export const roleApi = {
  // Get all roles
  getAllRoles: async () => {
    const response = await api.get('/roles');
    return response.data;
  },
  
  // Get role by ID
  getRoleById: async (id) => {
    const response = await api.get(`/roles/${id}`);
    return response.data;
  },
  
  // Create new role
  createRole: async (roleData) => {
    const response = await api.post('/roles', roleData);
    return response.data;
  },
  
  // Update role
  updateRole: async (id, roleData) => {
    const response = await api.put(`/roles/${id}`, roleData);
    return response.data;
  },
  
  // Delete role
  deleteRole: async (id) => {
    const response = await api.delete(`/roles/${id}`);
    return response.data;
  },
};

export default api;
