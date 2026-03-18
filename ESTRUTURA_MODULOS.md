/**
 * Exemplo de estrutura de um módulo
 *
 * Estrutura completa:
 * src/modules/auth/
 * ├── components/         # Componentes específicos do módulo
 * │   ├── LoginForm.tsx
 * │   ├── RegisterForm.tsx
 * │   └── index.ts
 * ├── hooks/              # Custom hooks do módulo
 * │   ├── useLogin.ts
 * │   ├── useRegister.ts
 * │   └── index.ts
 * ├── services/           # API/Serviços do módulo
 * │   ├── auth.service.ts
 * │   └── index.ts
 * ├── store/              # Zustand store do módulo
 * │   └── auth.store.ts
 * ├── types/              # Types específicos
 * │   └── auth.types.ts
 * └── index.ts            # Re-exports públicos
 *
 * Arquivo de exemplo: auth.service.ts
 */

import { supabase } from '@shared/services/supabase';
import type { User } from '@shared/types';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData extends LoginCredentials {
  name: string;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<User> {
    const { data, error } = await supabase.auth.signInWithPassword(
      credentials
    );
    if (error) throw error;
    return data.user as User;
  },

  async register(data: RegisterData): Promise<User> {
    const { data: authData, error } = await supabase.auth.signUp(data);
    if (error) throw error;
    return authData.user as User;
  },

  async logout(): Promise<void> {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getCurrentUser(): Promise<User | null> {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    return data.user as User | null;
  },
};
