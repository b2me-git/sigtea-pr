# 🚀 SIGTEA/PR - Guia Executivo Rápido

## ⚡ Primeiros 5 Minutos

```bash
# 1. Instalar dependências
npm install

# 2. Criar arquivo de configuração
cp .env.example .env.local
# Editar .env.local com suas credenciais Supabase

# 3. Testar setup
npm run type-check
```

## 📋 Extensões VS Code (18 + 1 opcional)

### Essenciais (3)
- **ESLint** → `dbaeumer.vscode-eslint`
- **Prettier** → `esbenp.prettier-vscode`
- **React Native Tools** → `xabikos.ReactNativeTools`

### Muito Recomendadas (8)
- **TypeScript** → `ms-vscode.vscode-typescript-next`
- **ES7+ React Snippets** → `dsznajder.es7-react-js-snippets`
- **React Snippets** → `burkeholland.simple-react-snippets`
- **Tailwind CSS** → `bradlc.vscode-tailwindcss` (se usar Nativewind)
- **Material Icons** → `PKief.material-icon-theme`
- **GitLens** → `eamodio.gitlens`
- **Jest** → `orta.vscode-jest`
- **Error Lens** → `usernamehw.errorlens`

### Produtividade (7)
- **Better Comments** → `aaron-bond.better-comments`
- **TODO Highlight** → `wayou.vscode-todo-highlight`
- **Bookmarks** → `alefragnani.bookmarks`
- **Indent Rainbow** → `oderwat.indent-rainbow`
- **.env** → `mikestead.dotenv`
- **VSCode Icons** → `vscode-icons-team.vscode-icons`
- **REST Client** → `humao.rest-client` (opcional)

### Instalação em Massa
```bash
# Copie e cole no terminal:
code --install-extension dbaeumer.vscode-eslint && \
code --install-extension esbenp.prettier-vscode && \
code --install-extension xabikos.ReactNativeTools && \
code --install-extension ms-vscode.vscode-typescript-next && \
code --install-extension dsznajder.es7-react-js-snippets && \
code --install-extension burkeholland.simple-react-snippets && \
code --install-extension bradlc.vscode-tailwindcss && \
code --install-extension PKief.material-icon-theme && \
code --install-extension eamodio.gitlens && \
code --install-extension orta.vscode-jest && \
code --install-extension usernamehw.errorlens && \
code --install-extension aaron-bond.better-comments && \
code --install-extension wayou.vscode-todo-highlight && \
code --install-extension alefragnani.bookmarks && \
code --install-extension oderwat.indent-rainbow && \
code --install-extension mikestead.dotenv && \
code --install-extension vscode-icons-team.vscode-icons
```

Ou simplesmente abra VS Code e vá em Extensions, depois clique em "Install from .vscode/extensions.json"

## ⚙️ Arquivos de Configuração

| Arquivo | Descrição |
|---------|-----------|
| `tsconfig.json` | TypeScript com aliases (@shared, @modules, etc) |
| `.eslintrc.json` | ESLint configurado para React Native + TypeScript |
| `.prettierrc` | Prettier: 100 chars, single quotes, semicolons |
| `.vscode/settings.json` | Auto format on save, ESLint auto-fix |
| `babel.config.js` | Module aliases resolver |
| `jest.config.js` | Testing setup com aliases |
| `app.json` | Expo & app metadata |
| `package.json` | 80+ scripts e dependências |

## 🎯 Scripts Essenciais

```bash
# Desenvolvimento
npm start              # Iniciar app
npm run start:ios      # iOS (macOS)
npm run start:android  # Android

# Qualidade de Código
npm run format         # Formatar
npm run lint:fix       # Corrigir linting
npm run type-check     # Type checking

# Build & Deploy
npm run build          # Build production
npm run build:ios      # iOS apenas
npm run build:android  # Android apenas
```

## 📂 Estrutura de Pastas Criada

```
src/
├── app/                 # Expo Router (file-based routing)
├── modules/             # Features modularizadas
│   ├── auth/
│   ├── dashboard/
│   └── [outros]
├── shared/              # Components & hooks reutilizáveis
│   ├── ui/              # Components
│   ├── hooks/           # Custom hooks
│   ├── utils/           # Utilities
│   ├── services/        # API & Supabase
│   └── types/           # Global types
├── store/               # Zustand stores
├── config/              # Config & constants
└── RootProviders.tsx    # App providers
```

## 🔧 Aliases Disponíveis

```typescript
// Todos esses aliases funcionam:
import { Button } from '@shared/ui/buttons';
import { useForm } from '@shared/hooks';
import { LoginForm } from '@modules/auth/components';
import { authService } from '@modules/auth/services';
import { APP_NAME } from '@config/constants';
import { useAuthStore } from '@store/auth.store';
```

## 📦 Stack Utilizado

```
Framework:      Expo + React Native 0.74
Language:       TypeScript 5.3
Routing:        Expo Router 3.5
State:          Zustand 4.4
Data Fetching:  React Query 5.40
Forms:          React Hook Form + Zod
Backend:        Supabase
Linting:        ESLint
Formatting:     Prettier
Testing:        Jest
```

## ✅ Checklist de Setup

- [ ] `npm install` executado
- [ ] `.env.local` criado com credenciais Supabase
- [ ] Extensões VS Code instaladas
- [ ] `npm start` rodando sem erros
- [ ] `npm run type-check` passou
- [ ] `npm run lint` passou

## 🎓 Documentação Disponível

| Documento | Conteúdo |
|-----------|----------|
| `README.md` | Guia completo do projeto |
| `QUICK_START.md` | Primeiros passos detalhados |
| `VSCODE_EXTENSOES.md` | Extensões com descrição completa |
| `MELHORES_PRATICAS.md` | Padrões e convenções de código |
| `ESTRUTURA_MODULOS.md` | Como criar novos módulos |
| `INTEGRACAO_STACK.md` | Expo Router + Supabase + React Query |
| `SCRIPTS_GUIDE.md` | Guia de todos os npm scripts |
| `RESUMO_CONFIGURACAO.md` | Checklist detalhado |

## 🚀 Começar Agora

```bash
# 1. Abrir projeto no VS Code
code .

# 2. Instalar extensões (Ctrl+Shift+X → Install from extensions.json)

# 3. Criar .env.local
cp .env.example .env.local

# 4. Instalar dependências
npm install

# 5. Iniciar desenvolvimento
npm start
```

## 🎨 Exemplo Prático: Criar Componente Button

```typescript
// src/shared/ui/buttons/Button.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING } from '@config/theme';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

const styles = StyleSheet.create({
  button: {
    padding: SPACING.md,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primary: {
    backgroundColor: COLORS.primary,
  },
  text: {
    ...TYPOGRAPHY.body,
    color: COLORS.white,
  },
});

export function Button({
  label,
  onPress,
  variant = 'primary',
  disabled = false
}: ButtonProps): React.ReactElement {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        variant === 'primary' ? styles.primary : { backgroundColor: COLORS.gray[200] },
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
}
```

## 🔧 Setup do Supabase

1. Criar conta em [supabase.com](https://supabase.com)
2. Criar novo projeto
3. Copiar URL e Anon Key
4. Colar em `.env.local`:
   ```
   EXPO_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
   EXPO_PUBLIC_SUPABASE_ANON_KEY=xxx
   ```

## 📱 Testar em Dispositivo

```bash
# 1. Instalar Expo Go
# iOS: App Store
# Android: Google Play

# 2. Iniciar desenvolvimento
npm start

# 3. Escanear QR code com câmera ou Expo Go
```

## 🚨 Troubleshooting Rápido

| Erro | Solução |
|------|---------|
| Port 8081 em uso | `npx kill-port 8081` |
| node_modules corrompido | `npm run clean && npm install` |
| Types não funcionam | `npm run type-check` |
| Prettier não formata | Reabrir VS Code |
| ESLint não valida | Instalar extension `dbaeumer.vscode-eslint` |

---

**🎉 Ambiente está pronto! Comece a desenvolver.**

Para dúvidas, consulte os documentos listados em "Documentação Disponível".
