
import axios from 'axios';

// API URL from environment or default to localhost in development
const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to request if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth service functions
export const authService = {
  // Send OTP to email
  sendOTP: async (email: string) => {
    try {
      const response = await api.post('/auth/otp/send', { email });
      return response.data;
    } catch (error) {
      console.error('Error sending OTP:', error);
      throw error;
    }
  },
  
  // Verify OTP
  verifyOTP: async (email: string, otp: string) => {
    try {
      const response = await api.post('/auth/otp/verify', { email, otp });
      
      // Store token on successful verification
      if (response.data?.data?.token) {
        localStorage.setItem('auth_token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
      }
      
      return response.data;
    } catch (error) {
      console.error('Error verifying OTP:', error);
      throw error;
    }
  },
  
  // Social login
  socialLogin: async (provider: string, userData: any) => {
    try {
      const response = await api.post('/auth/social', { 
        provider, 
        token: 'mock-token', // In a real app, this would be the OAuth token
        userData
      });
      
      // Store token on successful login
      if (response.data?.data?.token) {
        localStorage.setItem('auth_token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
      }
      
      return response.data;
    } catch (error) {
      console.error(`Error with ${provider} login:`, error);
      throw error;
    }
  },
  
  // Get current user profile
  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      console.error('Error getting current user:', error);
      throw error;
    }
  },
  
  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('auth_token');
  },
  
  // Logout
  logout: () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  }
};

export default authService;
