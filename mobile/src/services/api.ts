import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { AuthResponse, LoginDto, RegisterDto, User, Trade } from '../types';

const API_BASE_URL = __DEV__ ? 'http://localhost:5032' : 'https://your-api-url.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await SecureStore.deleteItemAsync('token');
      await SecureStore.deleteItemAsync('user');
      // Navigate to login screen - would need navigation ref
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: async (credentials: LoginDto): Promise<AuthResponse> => {
    const response = await api.post('/api/auth/login', credentials);
    return response.data;
  },

  register: async (userData: RegisterDto): Promise<AuthResponse> => {
    const response = await api.post('/api/auth/register', userData);
    return response.data;
  },

  getProfile: async (): Promise<User> => {
    const response = await api.get('/api/auth/profile');
    return response.data;
  },
};

export const tradesAPI = {
  getTrades: async (params?: any): Promise<any> => {
    const response = await api.get('/api/trades', { params });
    return response.data;
  },

  getTrade: async (id: number): Promise<Trade> => {
    const response = await api.get(`/api/trades/${id}`);
    return response.data;
  },

  getMyTrades: async (): Promise<Trade[]> => {
    const response = await api.get('/api/trades/my-trades');
    return response.data;
  },

  createTrade: async (tradeData: any): Promise<Trade> => {
    const response = await api.post('/api/trades', tradeData);
    return response.data;
  },
};

export default api;