# Integração: Expo Router, Supabase, React Query, Zustand, React Hook Form

## 📦 Stack Recomendado

- **Roteamento**: Expo Router (File-based routing)
- **Estado Global**: Zustand
- **Data Fetching**: React Query (@tanstack/react-query)
- **Formulários**: React Hook Form + Zod (validação)
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **HTTP**: Axios com interceptors

## 🗺️ Expo Router Setup

### Estrutura de Rotas

```
src/app/
├── _layout.tsx              # Layout raiz com providers
├── index.tsx                # Home (rota /)
├── (auth)/                  # Group: Rotas de autenticação
│   ├── _layout.tsx         # Layout do group
│   ├── login.tsx           # /auth/login
│   ├── register.tsx        # /auth/register
│   └── reset-password.tsx  # /auth/reset-password
├── (app)/                   # Group: App autenticado
│   ├── _layout.tsx
│   ├── dashboard.tsx       # /(app)/dashboard
│   ├── profile.tsx         # /(app)/profile
│   └── settings.tsx        # /(app)/settings
└── _not-found.tsx          # 404
```

### Exemplo: _layout.tsx

```typescript
// src/app/_layout.tsx
import React from 'react';
import { Stack } from 'expo-router';
import { RootProviders } from '@/RootProviders';

export default function RootLayout(): React.ReactElement {
  return (
    <RootProviders>
      <Stack screenOptions={{ headerShown: true }}>
        <Stack.Screen
          name="index"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="(auth)"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="(app)"
          options={{ headerShown: false }}
        />
      </Stack>
    </RootProviders>
  );
}
```

### Exemplo: Rota com Parametros

```typescript
// src/app/(app)/user/[id].tsx
import { useLocalSearchParams } from 'expo-router';
import { useUser } from '@modules/users/hooks';

export default function UserDetail(): React.ReactElement {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: user } = useUser(id!);

  return <View>{/* ... */}</View>;
}
```

## 🔐 Supabase Authentication

### Setup Inicial

```typescript
// src/shared/services/supabase.ts
import { createClient } from '@supabase/supabase-js';
import { env } from '@config/env';

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
```

### Serviço de Autenticação

```typescript
// src/modules/auth/services/auth.service.ts
import { supabase } from '@shared/services/supabase';
import { LoginCredentials, RegisterData } from '@modules/auth/types';

export const authService = {
  async login(credentials: LoginCredentials) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });
    if (error) throw error;
    return data.user;
  },

  async register(data: RegisterData) {
    const { error, data: authData } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });
    if (error) throw error;
    return authData.user;
  },

  async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getCurrentUser() {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    return data.user;
  },

  async resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
  },
};
```

### Hook para Auth

```typescript
// src/modules/auth/hooks/useAuthUser.ts
import { useQuery } from '@tanstack/react-query';
import { authService } from '@modules/auth/services';

export function useAuthUser() {
  return useQuery({
    queryKey: ['auth', 'user'],
    queryFn: () => authService.getCurrentUser(),
    staleTime: Infinity,
  });
}
```

## 📡 React Query + Zustand Integration

### Pattern Recomendado

```typescript
// src/modules/dashboard/store/dashboard.store.ts
import { create } from 'zustand';

interface DashboardState {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  filters: Record<string, any>;
  setFilters: (filters: Record<string, any>) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  selectedDate: new Date(),
  filters: {},
  setSelectedDate: (date) => set({ selectedDate: date }),
  setFilters: (filters) => set({ filters }),
}));
```

```typescript
// src/modules/dashboard/hooks/useDashboardData.ts
import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '@modules/dashboard/services';
import { useDashboardStore } from '@modules/dashboard/store';

export function useDashboardData() {
  const { selectedDate, filters } = useDashboardStore();

  return useQuery({
    queryKey: ['dashboard', selectedDate.toISOString(), filters],
    queryFn: () => dashboardService.getData(selectedDate, filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
```

### Usando em Componentes

```typescript
// src/modules/dashboard/components/DashboardScreen.tsx
import { useDashboardData } from '@modules/dashboard/hooks';
import { useDashboardStore } from '@modules/dashboard/store';

export function DashboardScreen(): React.ReactElement {
  const { data, isPending, error } = useDashboardData();
  const { setSelectedDate } = useDashboardStore();

  if (isPending) return <Text>Carregando...</Text>;
  if (error) return <Text>Erro ao carregar</Text>;

  return (
    <View>
      {/* ... */}
    </View>
  );
}
```

## 📝 React Hook Form + Zod

### Definir Schema

```typescript
// src/modules/auth/types/auth.types.ts
import { z } from 'zod';
import { PASSWORD_MIN_LENGTH } from '@config/constants';

export const LoginSchema = z.object({
  email: z
    .string()
    .email('Email inválido')
    .min(1, 'Email é obrigatório'),
  password: z
    .string()
    .min(PASSWORD_MIN_LENGTH, `Mínimo ${PASSWORD_MIN_LENGTH} caracteres`),
});

export const RegisterSchema = LoginSchema.extend({
  name: z
    .string()
    .min(3, 'Nome deve ter pelo menos 3 caracteres')
    .max(100, 'Nome muito longo'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Senhas não conferem',
  path: ['confirmPassword'],
});

export type LoginFormData = z.infer<typeof LoginSchema>;
export type RegisterFormData = z.infer<typeof RegisterSchema>;
```

### Componente com Formulário

```typescript
// src/modules/auth/components/LoginForm.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { LoginSchema, LoginFormData } from '@modules/auth/types';
import { useLogin } from '@modules/auth/hooks';
import { Button } from '@shared/ui/buttons';

interface LoginFormProps {
  onSuccess?: () => void;
}

export function LoginForm({ onSuccess }: LoginFormProps): React.ReactElement {
  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
  });

  const { mutate: login, isPending } = useLogin({
    onSuccess,
  });

  return (
    <View>
      <TextInput
        placeholder="Email"
        placeholderTextColor="#ccc"
      />
      {errors.email && <Text>{errors.email.message}</Text>}

      <TextInput
        placeholder="Senha"
        placeholderTextColor="#ccc"
        secureTextEntry
      />
      {errors.password && <Text>{errors.password.message}</Text>}

      <Button
        label="Entrar"
        onPress={handleSubmit((data) => login(data))}
        disabled={isPending}
        loading={isPending}
      />
    </View>
  );
}
```

## 🎣 Custom Hooks Pattern

### useAsync - Estado Genérico

```typescript
// src/shared/hooks/useAsync.ts
import { useEffect, useState, useCallback } from 'react';

interface UseAsyncState<T> {
  data: T | null;
  error: Error | null;
  isPending: boolean;
}

export function useAsync<T>(
  asyncFunction: () => Promise<T>,
  immediate = true
): UseAsyncState<T> & { execute: () => Promise<void> } {
  const [state, setState] = useState<UseAsyncState<T>>({
    data: null,
    error: null,
    isPending: !immediate,
  });

  const execute = useCallback(async () => {
    setState({ data: null, error: null, isPending: true });
    try {
      const response = await asyncFunction();
      setState({ data: response, error: null, isPending: false });
    } catch (error) {
      setState({ data: null, error: error as Error, isPending: false });
    }
  }, [asyncFunction]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { ...state, execute };
}
```

### usePagination

```typescript
// src/shared/hooks/usePagination.ts
import { useState } from 'react';

interface UsePaginationOptions {
  initialPage?: number;
  pageSize?: number;
}

export function usePagination(options?: UsePaginationOptions) {
  const [page, setPage] = useState(options?.initialPage ?? 1);
  const [pageSize] = useState(options?.pageSize ?? 20);

  const goToPage = (newPage: number) => setPage(Math.max(1, newPage));
  const nextPage = () => setPage((p) => p + 1);
  const prevPage = () => setPage((p) => Math.max(1, p - 1));
  const reset = () => setPage(1);

  return {
    page,
    pageSize,
    offset: (page - 1) * pageSize,
    goToPage,
    nextPage,
    prevPage,
    reset,
  };
}
```

## 🔗 Lazy Loading & Code Splitting

```typescript
// src/app/(app)/_layout.tsx
import React from 'react';
import { Stack } from 'expo-router';

export default function AppLayout(): React.ReactElement {
  return (
    <Stack>
      <Stack.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
        }}
      />
    </Stack>
  );
}
```

## 🧪 Testing Pattern

```typescript
// src/modules/auth/services/__tests__/auth.service.test.ts
import { authService } from '@modules/auth/services/auth.service';

describe('authService', () => {
  describe('login', () => {
    it('should login successfully', async () => {
      const credentials = {
        email: 'test@example.com',
        password: 'password123',
      };

      const result = await authService.login(credentials);
      expect(result).toHaveProperty('id');
    });
  });
});
```

## ⚡ Performance Tips

### 1. Lazy Queries
```typescript
const { data } = useQuery({
  queryKey: ['item', id],
  queryFn: () => fetchItem(id),
  enabled: !!id, // Only run when id exists
});
```

### 2. Select Specific Fields
```typescript
const { data: user } = useQuery({
  queryKey: ['user', id],
  queryFn: () => fetchUser(id),
  select: (data) => ({ id: data.id, email: data.email }), // Only these fields
});
```

### 3. Pagination instead of infinite scroll
```typescript
const { data } = useQuery({
  queryKey: ['items', page, pageSize],
  queryFn: () => fetchItems(page, pageSize),
  keepPreviousData: true, // UI doesn't flicker
});
```

## 📋 Checklist de Integração

- [ ] Supabase configurado com variáveis de env
- [ ] RootProviders com QueryClientProvider em _layout.tsx
- [ ] Auth store criado com Zustand
- [ ] Serviços separados por módulo
- [ ] React Hook Form + Zod para validação
- [ ] React Query com staleTime adequado
- [ ] Tipos exportados de cada módulo
- [ ] Testes básicos escritos
