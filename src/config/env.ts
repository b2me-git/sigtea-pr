export const env = {
  supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL || '',
  supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '',
  apiUrl: process.env.EXPO_PUBLIC_API_URL || '',
  apiTimeout: Number(process.env.EXPO_PUBLIC_API_TIMEOUT || 10000),
  appEnv: process.env.EXPO_PUBLIC_APP_ENV || 'development',
  appVersion: process.env.EXPO_PUBLIC_APP_VERSION || '1.0.0',
  isDevelopment:
    process.env.EXPO_PUBLIC_APP_ENV === 'development',
  isProduction:
    process.env.EXPO_PUBLIC_APP_ENV === 'production',
};
