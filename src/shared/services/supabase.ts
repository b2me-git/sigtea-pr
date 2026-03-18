import { createClient } from '@supabase/supabase-js';
import { env } from '@config/env';

if (!env.supabaseUrl || !env.supabaseAnonKey) {
  console.error(
    'Supabase URL and Anon Key are required. Please check your .env file'
  );
}

export const supabase = createClient(
  env.supabaseUrl,
  env.supabaseAnonKey,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
);
