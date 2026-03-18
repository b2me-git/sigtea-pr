module.exports = {
  preset: 'jest-expo',
  testEnvironment: 'node',
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@app/(.*)$': '<rootDir>/src/app/$1',
    '^@modules/(.*)$': '<rootDir>/src/modules/$1',
    '^@shared/(.*)$': '<rootDir>/src/shared/$1',
    '^@shared/ui/(.*)$': '<rootDir>/src/shared/ui/$1',
    '^@shared/hooks/(.*)$': '<rootDir>/src/shared/hooks/$1',
    '^@shared/utils/(.*)$': '<rootDir>/src/shared/utils/$1',
    '^@shared/services/(.*)$': '<rootDir>/src/shared/services/$1',
    '^@shared/types/(.*)$': '<rootDir>/src/shared/types/$1',
    '^@store/(.*)$': '<rootDir>/src/store/$1',
    '^@config/(.*)$': '<rootDir>/src/config/$1',
    '^@types/(.*)$': '<rootDir>/src/shared/types/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.tsx',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
};
