/**
 * Authentication Context
 * Manages global authentication state and provides auth methods
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContextType, AuthState, User, RegisterRequest } from '../types/auth.types';
import { authService } from '../services/authService';
import { AUTH_CONFIG } from '../config/config';

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, setState] = useState<AuthState>(initialState);

  /**
   * Check authentication status on mount
   */
  useEffect(() => {
    checkAuth();
  }, []);

  /**
   * Check if user is authenticated by loading token from storage
   */
  const checkAuth = async (): Promise<void> => {
    try {
      const token = await AsyncStorage.getItem(AUTH_CONFIG.tokenKey);
      const userJson = await AsyncStorage.getItem(AUTH_CONFIG.userKey);

      if (token && userJson) {
        const user: User = JSON.parse(userJson);
        setState({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        setState({
          ...initialState,
          isLoading: false,
        });
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
      setState({
        ...initialState,
        isLoading: false,
      });
    }
  };

  /**
   * Login user
   */
  const login = async (email: string, password: string): Promise<void> => {
    try {
      setState((prev) => ({ ...prev, isLoading: true }));

      const response = await authService.login({ email, password });

      // Store token and user data
      await AsyncStorage.setItem(AUTH_CONFIG.tokenKey, response.token);
      await AsyncStorage.setItem(AUTH_CONFIG.userKey, JSON.stringify({
        id: response.id,
        email: response.email,
        firstName: response.firstName,
        lastName: response.lastName,
      }));

      setState({
        user: {
          id: response.id,
          email: response.email,
          firstName: response.firstName,
          lastName: response.lastName,
        },
        token: response.token,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      setState((prev) => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  /**
   * Register new user
   */
  const register = async (data: RegisterRequest): Promise<void> => {
    try {
      setState((prev) => ({ ...prev, isLoading: true }));

      const response = await authService.register(data);

      // Store token and user data
      await AsyncStorage.setItem(AUTH_CONFIG.tokenKey, response.token);
      await AsyncStorage.setItem(AUTH_CONFIG.userKey, JSON.stringify({
        id: response.id,
        email: response.email,
        firstName: response.firstName,
        lastName: response.lastName,
      }));

      setState({
        user: {
          id: response.id,
          email: response.email,
          firstName: response.firstName,
          lastName: response.lastName,
        },
        token: response.token,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      setState((prev) => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  /**
   * Logout user
   */
  const logout = async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(AUTH_CONFIG.tokenKey);
      await AsyncStorage.removeItem(AUTH_CONFIG.userKey);

      setState({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      });
    } catch (error) {
      console.error('Error during logout:', error);
      throw error;
    }
  };

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Custom hook to use auth context
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

