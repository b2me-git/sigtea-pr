# SIGTEA/PR - Guia de Desenvolvimento

Aplicativo mobile para iOS e Android desenvolvido com **Expo**, **React Native**, **TypeScript**, **Expo Router**, **Supabase**, **React Query**, **Zustand** e **React Hook Form**.

## 📱 Requisitos

- Node.js >= 18.0.0
- npm >= 8.0.0 ou yarn/pnpm
- Expo CLI: `npm install -g expo-cli`
- EAS CLI: `npm install -g eas-cli` (para builds)

## 🚀 Início Rápido

```bash
# Instalar dependências
npm install

# Iniciar em modo desenvolvimento
npm start

# iOS
npm run start:ios

# Android
npm run start:android

# Web
npm run start:web
```

## 📂 Estrutura do Projeto

```
src/
├── app/                      # Expo Router - rotas da aplicação
│   ├── index.tsx             # Home screen
│   ├── (auth)/               # Group de rotas autenticadas
│   │   ├── login.tsx
│   │   ├── register.tsx
│   │   └── _layout.tsx
│   ├── (app)/                # Group de rotas do app
│   │   ├── dashboard.tsx
│   │   ├── profile.tsx
│   │   └── _layout.tsx
│   └── _layout.tsx           # Layout raiz
│
├── modules/                  # Features modularizadas
│   ├── auth/
│   │   ├── components/       # Componentes específicos do módulo
│   │   ├── hooks/            # Custom hooks do módulo
│   │   ├── services/         # Serviços/APIs do módulo
│   │   ├── store/            # Estado Zustand do módulo
│   │   ├── types/            # Types específicos
│   │   └── index.ts          # Re-exports públicos
│   │
│   ├── dashboard/
│   ├── profile/
│   └── [outros módulos]/
│
├── shared/
│   ├── ui/                   # Componentes reutilizáveis
│   │   ├── buttons/
│   │   ├── inputs/
│   │   ├── cards/
│   │   ├── modals/
│   │   ├── loaders/
│   │   └── index.ts
│   │
│   ├── hooks/                # Custom hooks compartilhados
│   │   ├── useAsync.ts
│   │   ├── useForm.ts
│   │   ├── usePagination.ts
│   │   └── index.ts
│   │
│   ├── utils/                # Funções utilitárias
│   │   ├── validators.ts
│   │   ├── formatters.ts
│   │   ├── storage.ts
│   │   └── index.ts
│   │
│   ├── services/             # Serviços globais
│   │   ├── supabase.ts
│   │   ├── api.ts
│   │   ├── logger.ts
│   │   └── index.ts
│   │
│   └── types/                # Types compartilhados
│       ├── index.ts
│       └── api.ts
│
├── store/                    # Estado global (Zustand)
│   ├── auth.store.ts
│   ├── app.store.ts
│   └── index.ts
│
├── config/                   # Configurações da app
│   ├── env.ts                # Env vars
│   ├── theme.ts              # Tema (cores, tipografia)
│   ├── constants.ts          # Constantes
│   └── index.ts
│
└── Root.tsx                  # Componente raiz com providers
```

## 🎨 Convenções de Código

### Nomenclatura de Arquivos

- **Componentes**: `PascalCase.tsx` → `Button.tsx`, `LoginForm.tsx`
- **Hooks**: `camelCase.ts` → `useForm.ts`, `useAsync.ts`
- **Utils/Services**: `camelCase.ts` → `validators.ts`, `api.ts`
- **Types**: `camelCase.ts` → `user.types.ts` ou `api.types.ts`
- **Store (Zustand)**: `kebab-case.store.ts` → `auth.store.ts`, `user-profile.store.ts`
- **Constantes**: `UPPER_SNAKE_CASE`

### Nomenclatura de Pastas

- **Componentes reutilizáveis**: `kebab-case` → `custom-button`, `form-input`
- **Páginas/Screens**: PascalCase → `Dashboard`, `ProfileScreen`
- **Módulos**: `kebab-case` → `auth-module`, `dashboard-module`
- **Types/Interfaces**: `kebab-case.types.ts` → `user.types.ts`

### Componentes

```typescript
// ✅ BOM - Com tipos explícitos
interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  disabled = false
}: ButtonProps): React.ReactElement {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
}

// ❌ EVITAR - Componentes sem tipos
export function Button(props: any) {
  return <TouchableOpacity>{props.children}</TouchableOpacity>;
}
```

### Hooks

```typescript
// ✅ BOM - Hook tipado e com cleanup
interface UseFormOptions {
  initialValues: Record<string, string>;
  onSubmit: (values: Record<string, string>) => Promise<void>;
}

export function useForm({
  initialValues,
  onSubmit
}: UseFormOptions): UseFormReturn {
  const [values, setValues] = React.useState(initialValues);

  React.useEffect(() => {
    return () => {
      // Cleanup
    };
  }, []);

  return { values, setValues, handleSubmit: onSubmit };
}
```

### Imports

```typescript
// ✅ Ordem de imports (agrupados)
import React from 'react';
import { View, Text } from 'react-native';

import { Button } from '@shared/ui/buttons';
import { useForm } from '@shared/hooks';

import { loginUser } from '@modules/auth/services';

import { APP_NAME } from '@config/constants';

// ❌ EVITAR - Imports sem ordem
import { Button } from '@shared/ui/buttons';
import React from 'react';
import { APP_NAME } from '@config/constants';
import { useForm } from '@shared/hooks';
```

## 🗄️ Store (Zustand)

```typescript
// src/modules/auth/store/auth.store.ts
import { create } from 'zustand';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setIsLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  setUser: (user) => set({ user }),
  setIsLoading: (isLoading) => set({ isLoading }),
}));
```

## 📡 Data Fetching (React Query)

```typescript
// src/modules/auth/hooks/useLogin.ts
import { useMutation } from '@tanstack/react-query';
import { loginService } from '@modules/auth/services';

interface LoginInput {
  email: string;
  password: string;
}

export function useLogin() {
  return useMutation({
    mutationFn: (data: LoginInput) => loginService(data),
    onSuccess: (user) => {
      // Handle success
    },
    onError: (error) => {
      // Handle error
    },
  });
}
```

## 📋 Validação (Zod + React Hook Form)

```typescript
// src/modules/auth/types/auth.types.ts
import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'Mínimo 8 caracteres'),
});

export type LoginFormData = z.infer<typeof LoginSchema>;
```

```typescript
// Uso no componente
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema, LoginFormData } from '@modules/auth/types';

export function LoginForm() {
  const { control, handleSubmit } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
  });

  return <>{/* ... */}</>;
}
```

## 🔌 Supabase Setup

```typescript
// src/config/env.ts
export const env = {
  supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL || '',
  supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '',
};

// src/shared/services/supabase.ts
import { createClient } from '@supabase/supabase-js';
import { env } from '@config/env';

export const supabase = createClient(env.supabaseUrl, env.supabaseAnonKey);
```

## ✅ Linting & Formatting

```bash
# Verificar erros
npm run lint

# Corrigir erros automaticamente
npm run lint:fix

# Formatar código
npm run format

# Verificar formatação
npm run format:check

# Type checking
npm run type-check
```

## 🧪 Testes

```bash
# Rodar testes
npm run test

# Modo watch
npm run test:watch

# Coverage
npm run test:coverage
```

## 🏗️ Build & Deploy

```bash
# Build iOS
npm run build:ios

# Build Android
npm run build:android

# Preview (local)
npm run preview
```

## 🔐 Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz:

```
EXPO_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=xxx
EXPO_PUBLIC_API_URL=https://api.example.com
EXPO_PUBLIC_APP_ENV=development
```

## 📚 Recursos Úteis

- [Expo Router Docs](https://docs.expo.dev/router/introduction/)
- [React Native Docs](https://reactnative.dev/)
- [TypeScript in React Native](https://www.typescriptlang.org/)
- [React Query](https://tanstack.com/query/latest)
- [Zustand](https://github.com/pmndrs/zustand)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [Supabase](https://supabase.com/docs)
#   s i g t e a - p r  
 