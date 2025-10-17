/**
 * Authentication Service
 * Handles all authentication-related API calls
 */

import axios, { AxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginRequest, RegisterRequest, AuthResponse, User } from '../types/auth.types';
import { API_CONFIG, AUTH_CONFIG } from '../config/config';

/**
 * API error response structure
 */
interface ApiErrorResponse {
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
    timestamp: string;
  };
}

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
  code: string;
  statusCode: number;
  details?: Record<string, unknown>;

  constructor(message: string, code: string, statusCode: number, details?: Record<string, unknown>) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
  }
}

/**
 * Create axios instance with base configuration
 */
const api = axios.create({
  baseURL: API_CONFIG.baseUrl,
  timeout: API_CONFIG.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Add token to requests if available
 */
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem(AUTH_CONFIG.tokenKey);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Handle API errors consistently
 */
const handleApiError = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    
    if (axiosError.response?.data?.error) {
      const { code, message, details } = axiosError.response.data.error;
      throw new ApiError(
        message,
        code,
        axiosError.response.status,
        details
      );
    }
    
    if (axiosError.response) {
      throw new ApiError(
        axiosError.response.statusText || 'Request failed',
        'NETWORK_ERROR',
        axiosError.response.status
      );
    }
    
    if (axiosError.request) {
      throw new ApiError(
        'No response from server',
        'NETWORK_ERROR',
        0
      );
    }
  }
  
  throw new ApiError(
    'An unexpected error occurred',
    'UNKNOWN_ERROR',
    0
  );
};

/**
 * Authentication service methods
 */
export const authService = {
  /**
   * Register a new user
   */
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    try {
      const response = await api.post<AuthResponse>('/v1/auth/register', data);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Login user
   */
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    try {
      const response = await api.post<AuthResponse>('/v1/auth/login', data);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Get current authenticated user
   */
  getCurrentUser: async (): Promise<User> => {
    try {
      const response = await api.get<User>('/v1/auth/me');
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Logout user (client-side only, clears local storage)
   */
  logout: async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(AUTH_CONFIG.tokenKey);
      await AsyncStorage.removeItem(AUTH_CONFIG.userKey);
    } catch (error) {
      console.error('Error during logout:', error);
      throw error;
    }
  },
};

export default authService;

