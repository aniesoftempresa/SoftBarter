import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import { User, AuthResponse } from '../types';
import { authAPI } from '../services/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, bio?: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedToken = await SecureStore.getItemAsync('token');
        const storedUser = await SecureStore.getItemAsync('user');

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        } else if (storedToken) {
          try {
            const profile = await authAPI.getProfile();
            setUser(profile);
            await SecureStore.setItemAsync('user', JSON.stringify(profile));
          } catch (error) {
            await SecureStore.deleteItemAsync('token');
            await SecureStore.deleteItemAsync('user');
            setToken(null);
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response: AuthResponse = await authAPI.login({ email, password });
      
      setToken(response.token);
      await SecureStore.setItemAsync('token', response.token);
      
      // Get full user profile
      const profile = await authAPI.getProfile();
      setUser(profile);
      await SecureStore.setItemAsync('user', JSON.stringify(profile));
    } catch (error) {
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string, bio?: string) => {
    try {
      const response: AuthResponse = await authAPI.register({ name, email, password, bio });
      
      setToken(response.token);
      await SecureStore.setItemAsync('token', response.token);
      
      // Get full user profile
      const profile = await authAPI.getProfile();
      setUser(profile);
      await SecureStore.setItemAsync('user', JSON.stringify(profile));
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    setUser(null);
    setToken(null);
    await SecureStore.deleteItemAsync('token');
    await SecureStore.deleteItemAsync('user');
  };

  const value = {
    user,
    token,
    login,
    register,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};