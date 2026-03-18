export const APP_NAME = 'SIGTEA/PR';
export const APP_VERSION = '1.0.0';

export const API_TIMEOUT = Number(
  process.env.EXPO_PUBLIC_API_TIMEOUT || 10000
);

export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || '';

// Supabase
export const SUPABASE_URL =
  process.env.EXPO_PUBLIC_SUPABASE_URL || '';
export const SUPABASE_ANON_KEY =
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

// Features
export const ENABLE_ANALYTICS = true;
export const ENABLE_CRASH_REPORTING = true;

// Cache times (in ms)
export const CACHE_TIMES = {
  SHORT: 5 * 60 * 1000,        // 5 minutes
  MEDIUM: 15 * 60 * 1000,      // 15 minutes
  LONG: 60 * 60 * 1000,        // 1 hour
  VERY_LONG: 24 * 60 * 60 * 1000, // 24 hours
};

// Pagination
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;

// Validation
export const PASSWORD_MIN_LENGTH = 8;
export const NAME_MIN_LENGTH = 3;
export const NAME_MAX_LENGTH = 100;
