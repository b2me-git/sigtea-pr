# Guia Rápido: Primeiros Passos

## 1️⃣ Instalação Inicial

```bash
# Instalar dependências
npm install

# Ou com yarn
yarn install

# Ou com pnpm
pnpm install
```

## 2️⃣ Configurar Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
EXPO_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima
EXPO_PUBLIC_API_URL=https://api.seuservidor.com
EXPO_PUBLIC_APP_ENV=development
```

## 3️⃣ Instalar VS Code Extensions

Use o arquivo `.vscode/extensions.json`:
1. Abra VS Code
2. Extensions (Ctrl+Shift+X)
3. Procure por "extensions.json"
4. Clique para instalar as recomendações

Ou instale manualmente via terminal:
```bash
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
```

## 4️⃣ Iniciar o App

### Opção 1: Emulador iOS (macOS apenas)
```bash
npm run start:ios
```

### Opção 2: Emulador Android
```bash
npm run start:android
```

### Opção 3: Expo Go (física/emulador)
```bash
npm start
```
Escaneie o QR code com Expo Go ou camera Android

### Opção 4: Web
```bash
npm run start:web
```

## 5️⃣ Workflow de Desenvolvimento

```bash
# Terminal 1 - Iniciar Dev Server
npm start

# Terminal 2 - Linting durante desenvolvimento
npm run lint:fix

# Terminal 3 - Type checking
npm run type-check

# Terminal 4 - Testes
npm run test:watch
```

## 6️⃣ Criar um Novo Módulo

### Estrutura Base

```bash
src/modules/novo-modulo/
├── components/
│   └── index.ts
├── hooks/
│   └── index.ts
├── services/
│   └── index.ts
├── store/
├── types/
│   └── novo-modulo.types.ts
└── index.ts
```

### Arquivo index.ts (Public API)

```typescript
// src/modules/novo-modulo/index.ts
export { ComponenteA, ComponenteB } from './components';
export { useCustomHook } from './hooks';
export { servicoA } from './services';
export type { TipoA } from './types';
```

### Uso

```typescript
// Em qualquer arquivo
import { ComponenteA, useCustomHook } from '@modules/novo-modulo';
```

## 7️⃣ Criar um Novo Componente Compartilhado

```bash
src/shared/ui/novo-componente/
├── NovoComponente.tsx
├── NovoComponente.styles.ts (se necessário)
└── index.ts
```

```typescript
// src/shared/ui/novo-componente/index.ts
export { NovoComponente } from './NovoComponente';
export type { NovoComponenteProps } from './NovoComponente';
```

## 8️⃣ Git Workflow

```bash
# 1. Criar branch
git checkout -b feature/nova-funcionalidade

# 2. Fazer alterações...

# 3. Formatar código
npm run format

# 4. Linting
npm run lint:fix

# 5. Commit
git add .
git commit -m "feat: adicionar nova funcionalidade"

# 6. Push
git push origin feature/nova-funcionalidade

# 7. Abrir Pull Request no GitHub
```

## 9️⃣ Build para Produção

```bash
# iOS
npm run build:ios

# Android
npm run build:android

# Preview local (antes de submeter)
npm run preview
```

## 🔟 Troubleshooting Comuns

### Problema: Port 8081 já está em uso
```bash
# Matar processo na porta
npx kill-port 8081

# Ou iniciar em porta diferente
expo start --port 3000
```

### Problema: node_modules quebrado
```bash
npm run clean
npm install
```

### Problema: Expo CLI desatualizado
```bash
npm install -g expo-cli@latest
```

### Problema: Tipos TypeScript não funcionando
```bash
npm run type-check
```

## 📚 Documentos Importantes

- [README.md](./README.md) - Guia completo
- [VSCODE_EXTENSOES.md](./VSCODE_EXTENSOES.md) - Extensões recomendadas
- [MELHORES_PRATICAS.md](./MELHORES_PRATICAS.md) - Padrões de código
- [ESTRUTURA_MODULOS.md](./ESTRUTURA_MODULOS.md) - Exemplos de módulos

## 💡 Dicas de Produtividade

### Snippets Úteis

PascalCase para componentes:
```typescript
export function MeuComponente(): React.ReactElement {
  return <View></View>;
}
```

camelCase para hooks:
```typescript
export function useMeuHook() {
  // ...
}
```

### Navegação Rápida

- `Ctrl+P` - Buscar arquivo
- `Ctrl+Shift+F` - Buscar em todos os arquivos
- `Ctrl+G` - Ir para linha
- `Ctrl+H` - Find and Replace
- `F12` - Ir para definição
- `Ctrl+Shift+L` - Selecionar todas as ocorrências

### Debugging

```typescript
// Adicionar breakpoint no VSCode
// Clique na linha e aperte F9, ou clique na linha número

// Ou no código
debugger; // Pausa aqui quando debugger está ativo
```

## ❓ Perguntas Frequentes

**P: Posso usar JavaScript em vez de TypeScript?**
R: Não recomendado. TypeScript fornece type safety essencial.

**P: Como estruturar uma feature complexa?**
R: Veja [ESTRUTURA_MODULOS.md](./ESTRUTURA_MODULOS.md)

**P: Posso adicionar mais dependências?**
R: Sim, mas revise compatibilidade com React Native.

**P: Como colaborar no projeto?**
R: Use feature branches, siga o format/lint, abra PRs com descrição clara.
