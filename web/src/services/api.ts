import axios from 'axios';
import {
  AuthResponse,
  LoginDto,
  RegisterDto,
  User,
  Trade,
  CreateTradeDto,
  CreateOfferDto,
  Offer,
  Transaction,
  TradeSearchParams,
  PaginatedResponse
} from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5032';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
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
  getTrades: async (params?: TradeSearchParams): Promise<PaginatedResponse<Trade>> => {
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

  createTrade: async (tradeData: CreateTradeDto): Promise<Trade> => {
    const response = await api.post('/api/trades', tradeData);
    return response.data;
  },

  updateTrade: async (id: number, tradeData: Partial<CreateTradeDto>): Promise<void> => {
    await api.put(`/api/trades/${id}`, tradeData);
  },

  deleteTrade: async (id: number): Promise<void> => {
    await api.delete(`/api/trades/${id}`);
  },
};

export const offersAPI = {
  getOffersByTrade: async (tradeId: number): Promise<Offer[]> => {
    const response = await api.get(`/api/offers/trade/${tradeId}`);
    return response.data;
  },

  getMyOffers: async (): Promise<Offer[]> => {
    const response = await api.get('/api/offers/my-offers');
    return response.data;
  },

  createOffer: async (tradeId: number, offerData: CreateOfferDto): Promise<Offer> => {
    const response = await api.post(`/api/offers/trade/${tradeId}`, offerData);
    return response.data;
  },

  respondToOffer: async (offerId: number, accept: boolean, message?: string): Promise<void> => {
    await api.put(`/api/offers/${offerId}/respond`, {
      accept,
      responseMessage: message,
    });
  },

  withdrawOffer: async (offerId: number): Promise<void> => {
    await api.delete(`/api/offers/${offerId}`);
  },
};

export const transactionsAPI = {
  getMyTransactions: async (): Promise<Transaction[]> => {
    const response = await api.get('/api/transactions/my-transactions');
    return response.data;
  },

  getTransaction: async (id: number): Promise<Transaction> => {
    const response = await api.get(`/api/transactions/${id}`);
    return response.data;
  },

  completeTransaction: async (id: number, notes?: string): Promise<void> => {
    await api.post(`/api/transactions/${id}/complete`, {
      completionNotes: notes,
    });
  },

  rateTransaction: async (id: number, rating: number, review?: string): Promise<void> => {
    await api.post(`/api/transactions/${id}/rate`, {
      rating,
      review,
    });
  },

  cancelTransaction: async (id: number, reason: string): Promise<void> => {
    await api.post(`/api/transactions/${id}/cancel`, {
      reason,
    });
  },
};

export default api;