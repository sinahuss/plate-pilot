/**
 * Application configuration
 * Loads environment variables and provides typed configuration
 */

/**
 * API Configuration
 */
export const API_CONFIG = {
  baseUrl: process.env.API_BASE_URL || 'http://localhost:8080/api',
  fastApiUrl: process.env.FASTAPI_BASE_URL || 'http://localhost:8000',
  timeout: 30000, // 30 seconds
};

/**
 * App Configuration
 */
export const APP_CONFIG = {
  name: 'Plate Pilot',
  version: '0.1.0',
  environment: process.env.NODE_ENV || 'development',
};

/**
 * Auth Configuration
 */
export const AUTH_CONFIG = {
  tokenKey: '@plate_pilot_token',
  userKey: '@plate_pilot_user',
};

/**
 * Complete configuration object
 */
export const config = {
  api: API_CONFIG,
  app: APP_CONFIG,
  auth: AUTH_CONFIG,
} as const;

export default config;

