# Scripts do package.json - Guia Completo

## 🚀 Scripts de Desenvolvimento

### Iniciar o App

```bash
# Modo desenvolvimento interativo (escolher plataforma)
npm start

# iOS (apenas macOS)
npm run start:ios

# Android
npm run start:android

# Web (Browsers)
npm run start:web
```

**Quando usar:**
- `npm start` - Quando quer escolher a plataforma ou usar Expo Go
- `npm run start:ios` - Desenvolvimento rápido em iPhone
- `npm run start:android` - Desenvolvimento rápido em Android
- `npm run start:web` - Testar em browser para UI/UX

## 🔍 Qualidade de Código

### Type Checking

```bash
# Verificar tipos TypeScript sem compilar
npm run type-check
```

**Quando usar:** Antes de fazer commit ou durante review

### Linting

```bash
# Apenas verificar erros
npm run lint

# Corrigir automaticamente
npm run lint:fix
```

**O que valida:**
- Imports não usados
- Variáveis não declaradas
- Uso de `any`
- console.log em produção
- React hooks rules
- Best practices

### Formatação de Código

```bash
# Formatar todos os arquivos
npm run format

# Verificar se está formatado
npm run format:check
```

**Formata:**
- Indentação
- Aspas simples vs. duplas
- Espaçamento
- Line breaks

## 📦 Build & Deploy

### EAS (Expo Application Services)

```bash
# Build completo do app
# (requer eas-cli: npm install -g eas-cli)
npm run build

# Build apenas iOS
npm run build:ios

# Build apenas Android
npm run build:android

# Preview local (simula build real)
npm run preview
```

### Pre-build (Gerar pasta nativa)

```bash
# Gerar ios/ e android/ folders
npm run prebuild

# Apenas iOS
npm run prebuild:ios

# Apenas Android
npm run prebuild:android
```

**Quando usar:**
- Se precisar editar código nativo (Swift/Kotlin)
- Para plugins que precisam de código nativo
- Antes de enviar para App Store/Google Play

## 🧪 Testes

```bash
# Rodar todos os testes uma vez
npm run test

# Modo watch (roda quando arquivos mudam)
npm run test:watch

# Com coverage (quantos % do código está testado)
npm run test:coverage
```

**Gera relatório de cobertura:**
- Linhas testadas
- Branches testadas
- Funções testadas
- Statements testados

## 🯬 Git & Setup

```bash
# Instalar husky (git hooks)
npm run prepare
```

## 🧹 Limpeza

```bash
# Limpar tudo e reinstalar
npm run clean
```

**Remove:**
- node_modules/
- .expo/
- dist/
- .turbo/

**Quando usar:** Se estiver com modo ou problemas de cache

## 🔄 Workflow Recomendado

### Desenvolvimento Local

```bash
# Terminal 1 - Dev server
npm start

# Terminal 2 - Watch linting (opcional)
npm run lint:fix

# Terminal 3 - Type checking automático
npm run type-check

# Terminal 4 - Testes em watch
npm run test:watch
```

### Antes de Fazer Commit

```bash
# 1. Formatar código
npm run format

# 2. Corrigir linting
npm run lint:fix

# 3. Verificar tipos
npm run type-check

# 4. Rodar testes
npm run test

# 5. Fazer commit
git add .
git commit -m "feat: descrição"
```

### PR/Code Review

```bash
# Verificar tudo que o CI vai verificar
npm run format:check
npm run lint
npm run type-check
npm run test -- --coverage
```

### Build para Produção

```bash
# 1. Update versão em app.json
# 2. Fazer build
npm run build:ios
npm run build:android

# 3. Submeter para stores
npm run submit
```

## 🛠️ Scripts Customizados (para adicionar)

### Formato Geral

```json
{
  "scripts": {
    "custom:command": "comando aqui"
  }
}
```

### Sugestões de Scripts Úteis

```json
{
  "scripts": {
    "dev": "npm start",
    "dev:ios": "npm run start:ios",
    "dev:android": "npm run start:android",
    "ci": "npm run format:check && npm run lint && npm run type-check && npm run test",
    "check": "npm run type-check && npm run lint",
    "fix": "npm run lint:fix && npm run format",
    "prebuild:clean": "rm -rf ios android && npm run prebuild",
    "analyze": "npm run lint && npm run type-check && npm run test:coverage"
  }
}
```

### Usando Scripts Customizados

```bash
# Se adicionar "dev": "npm start"
npm run dev

# Equivalente a npm start
```

## 📊 Monitorar Performance

```bash
# Medir tempo de build
time npm run build

# Medir tamanho do bundle
npm ls
```

## 🚨 Troubleshooting de Scripts

### Erro: "command not found"
```bash
# Reinstalar dependências
npm install
```

### Erro: "port already in use"
```bash
# Matar processo na porta 8081
npx kill-port 8081

# Ou usar porta diferente
npm start -- --port 3000
```

### Error: "React Native not found"
```bash
# Limpar e reinstalar
npm run clean
npm install
```

## 📋 Mapeamento de Scripts vs. Atalhos

| Atalho | Script | Uso |
|--------|--------|-----|
| `npm start` | Inicia dev server | Desenvolvimento geral |
| `npm run build` | Build production | Deploy final |
| `npm run lint` | Verificar código | Qualidade |
| `npm test` | Rodar testes | Validação |
| `ctrl+c` | Para servidor | Parar dev |
| `r` | Reload app | Recarregar em tempo real |
| `i` | Abrir iOS | Emulador iOS |
| `a` | Abrir Android | Emulador Android |
| `w` | Abrir Web | Browser |
| `j` | Toggle debugger | Debug menu |

## ✅ Script Dependencies

```
npm start
├── npm run prebuild (opcional, automático)
└── Inicia Expo server

npm run build
├── npm run prebuild
└── Gera build com EAS

npm run lint:fix
├── ESLint com --fix
└── Modifica arquivos

npm run format
├── Prettier
└── Reformata arquivos

npm run type-check
├── TypeScript compiler
└── Verifica types sem emitir

npm test
├── Jest
└── Roda __tests__ e .test.ts
```

## 🎯 Quick Reference

```bash
# Carregar app
npm start

# Verificar tudo antes de commit
npm run format && npm run lint:fix && npm run type-check

# Preparar para PR
npm run test && npm run format:check && npm run lint

# Deploy
npm run build:android && npm run build:ios
```
