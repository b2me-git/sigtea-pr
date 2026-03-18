# Guia de Melhores Práticas - SIGTEA/PR

## 🏗️ Arquitetura de Pastas

### Princípios

1. **Modularidade**: Cada feature é um módulo independente
2. **Coesão**: Componentes relacionados ficam juntos
3. **Escalabilidade**: Fácil adicionar novos módulos sem impactar existentes
4. **Reutilização**: Código compartilhado vai em `shared/`

### Exemplo Correto

```
src/modules/auth/
├── components/
│   ├── LoginForm.tsx
│   ├── RegisterForm.tsx
│   └── index.ts
├── hooks/
│   ├── useLogin.ts
│   ├── useRegister.ts
│   └── index.ts
├── services/
│   ├── auth.service.ts
│   └── index.ts
├── store/
│   └── auth.store.ts
├── types/
│   └── auth.types.ts
└── index.ts  # Export público
```

### Export Público via index.ts

```typescript
// src/modules/auth/index.ts
export { LoginForm, RegisterForm } from './components';
export { useLogin, useRegister } from './hooks';
export { authService } from './services';
export type { LoginCredentials } from './types';
```

Uso:
```typescript
import { LoginForm, useLogin } from '@modules/auth';
```

## 🎨 Componentes

### Regra: Componentes Funcionais + TypeScript

```typescript
// ✅ BOM
interface Props {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
}

export function MyButton({
  title,
  onPress,
  variant = 'primary'
}: Props): React.ReactElement {
  return <TouchableOpacity onPress={onPress}>{/* ... */}</TouchableOpacity>;
}

// ❌ RUIM - sem tipos
export const MyButton = ({ title, onPress }: any) => (
  <TouchableOpacity onPress={onPress}>{title}</TouchableOpacity>
);
```

### Componentes Compartilhados

Colocar em `src/shared/ui/`:

```typescript
// src/shared/ui/buttons/Button.tsx
interface ButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost';
}

export function Button(props: ButtonProps): React.ReactElement {
  // Implementação
}
```

## 🎣 Hooks Customizados

### Pattern para Data Fetching

```typescript
// src/modules/auth/hooks/useLogin.ts
import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '@modules/auth/store';

export function useLogin() {
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      return authService.login(credentials);
    },
    onSuccess: (user) => {
      setUser(user);
    },
    onError: (error) => {
      console.error('Login failed:', error);
    },
  });
}
```

Uso:
```typescript
const { mutate: login, isPending } = useLogin();

const handleLogin = () => {
  login({ email, password });
};
```

## 🗄️ Estado com Zustand

### Pattern Simples

```typescript
// src/store/auth.store.ts
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

Uso:
```typescript
const user = useAuthStore((state) => state.user);
const { setUser } = useAuthStore();
```

### Pattern com Actions

```typescript
// src/modules/dashboard/store/dashboard.store.ts
import { create } from 'zustand';

interface DashboardState {
  filters: Filters;
  data: DashboardData | null;
  setFilters: (filters: Filters) => void;
  setData: (data: DashboardData) => void;
  reset: () => void;
}

const initialState = {
  filters: { page: 1, limit: 20 },
  data: null,
};

export const useDashboardStore = create<DashboardState>((set) => ({
  ...initialState,
  setFilters: (filters) => set({ filters }),
  setData: (data) => set({ data }),
  reset: () => set(initialState),
}));
```

## 📝 Validação com Zod

```typescript
// src/modules/auth/types/auth.types.ts
import { z } from 'zod';

export const LoginSchema = z.object({
  email: z
    .string()
    .email('Email inválido')
    .min(1, 'Email é obrigatório'),
  password: z
    .string()
    .min(8, 'Senha deve ter pelo menos 8 caracteres'),
});

export type LoginFormData = z.infer<typeof LoginSchema>;
```

Uso com React Hook Form:
```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export function LoginScreen() {
  const { control, handleSubmit } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
  });

  return <>{/* ... */}</>;
}
```

## 🌐 API & Supabase

### Estrutura de Serviço

```typescript
// src/modules/users/services/users.service.ts
import { supabase, api } from '@shared/services';
import type { User } from '@shared/types';

export const usersService = {
  async getUser(id: string): Promise<User> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  async updateUser(id: string, updates: Partial<User>): Promise<User> {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};
```

## 📱 Exemplo Prático: Tela de Login

### Estrutura de Arquivos

```
src/modules/auth/
├── components/
│   ├── LoginForm.tsx
│   └── index.ts
├── hooks/
│   ├── useLogin.ts
│   └── index.ts
├── services/
│   ├── auth.service.ts
│   └── index.ts
├── store/
│   └── auth.store.ts
├── types/
│   └── auth.types.ts
└── index.ts
```

### Implementação

```typescript
// src/modules/auth/types/auth.types.ts
import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type LoginCredentials = z.infer<typeof LoginSchema>;
```

```typescript
// src/modules/auth/services/auth.service.ts
import { supabase } from '@shared/services';

export const authService = {
  async login(credentials: LoginCredentials) {
    const { data, error } = await supabase.auth.signInWithPassword(credentials);
    if (error) throw error;
    return data.user;
  },
};
```

```typescript
// src/modules/auth/hooks/useLogin.ts
import { useMutation } from '@tanstack/react-query';
import { authService } from '@modules/auth/services';

export function useLogin() {
  return useMutation({
    mutationFn: authService.login,
  });
}
```

```typescript
// src/modules/auth/components/LoginForm.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema } from '@modules/auth/types';
import { useLogin } from '@modules/auth/hooks';

export function LoginForm(): React.ReactElement {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(LoginSchema),
  });
  const { mutate: login } = useLogin();

  return <>{/* Form JSX */}</>;
}
```

## 🚫 Anti-Patterns

### ❌ Imports Absolutos Longos
```typescript
// Ruim
import { Button } from '../../../shared/ui/buttons/Button';

// Bom
import { Button } from '@shared/ui/buttons';
```

### ❌ Criar Novos Types sem Validação
```typescript
// Ruim
interface User {
  id: string;
  name: string;
  email: string;
}

// Bom - com Zod
const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  email: z.string().email(),
});
type User = z.infer<typeof UserSchema>;
```

### ❌ State Desnecessário
```typescript
// Ruim - state desnecessário
const [data, setData] = useState(null);
const [error, setError] = useState(null);
const [loading, setLoading] = useState(false);

// Bom - usar React Query
const { data, error, isPending } = useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers,
});
```

### ❌ Props Sem Tipagem
```typescript
// Ruim
export function Card(props) {
  return <View>{props.children}</View>;
}

// Bom
interface CardProps {
  children: React.ReactNode;
  variant?: 'elevated' | 'outlined';
}

export function Card({ children, variant = 'elevated' }: CardProps) {
  return <View>{children}</View>;
}
```

## ✅ Checklist de Qualidade

- [ ] Todos os componentes têm Props interface tipadas
- [ ] Todos os imports usam aliases (@shared, @modules, etc)
- [ ] Não há console.log() em produção (apenas console.error/warn)
- [ ] Funções async têm try/catch ou error handling
- [ ] Componentes compartilhados estão em @shared/
- [ ] Cada módulo exporta interface pública via index.ts
- [ ] Types são validados com Zod
- [ ] Não há prop drilling profundo (usar store/context)
- [ ] Código foi formatado com Prettier
- [ ] ESLint passou sem erros
